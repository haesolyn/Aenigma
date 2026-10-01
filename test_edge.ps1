Add-Type -AssemblyName System.Net.Http
Add-Type -AssemblyName System.Web

$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$port = 9555
$userDir = "$env:TEMP\edge-profile-test-$((Get-Date).Ticks)"
$url = "file:///c:/Users/Grego/Downloads/firstapp-20260930T015825Z-1-001-20260930T174520Z-1-001/firstapp-20260930T015825Z-1-001/firstapp/index.html"

$proc = Start-Process -FilePath $edgePath -ArgumentList @(
  "--headless=new",
  "--remote-debugging-port=$port",
  "--window-size=1280,800",
  "--user-data-dir=$userDir",
  $url
) -PassThru

Start-Sleep -Milliseconds 2000

$script:msgId = 0

try {
  $http = New-Object System.Net.Http.HttpClient
  $res = $http.GetStringAsync("http://127.0.0.1:$port/json").Result
  $tabs = $res | ConvertFrom-Json
  $tab = $tabs | Where-Object { $_.url -like "*index.html*" } | Select-Object -First 1
  if (-not $tab) { $tab = $tabs[0] }

  Write-Output "Connecting to tab: $($tab.title) at $($tab.webSocketDebuggerUrl)"

  $ws = New-Object System.Net.WebSockets.ClientWebSocket
  $uri = New-Object System.Uri($tab.webSocketDebuggerUrl)
  $cts = New-Object System.Threading.CancellationTokenSource
  $ws.ConnectAsync($uri, $cts.Token).Wait()

  function Send-Cdp($method, $params) {
    $script:msgId = $script:msgId + 1
    $bodyObj = @{ id = $script:msgId; method = $method; params = $params }
    $body = $bodyObj | ConvertTo-Json -Compress -Depth 10
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($body)
    $segment = New-Object System.ArraySegment[byte] -ArgumentList @(,$bytes)
    $ws.SendAsync($segment, [System.Net.WebSockets.WebSocketMessageType]::Text, $true, $cts.Token).Wait()

    # Receive response
    $buffer = New-Object byte[] 65536
    $ms = New-Object System.IO.MemoryStream
    do {
      $recvSeg = New-Object System.ArraySegment[byte] -ArgumentList @(,$buffer)
      $recvRes = $ws.ReceiveAsync($recvSeg, $cts.Token).Result
      $ms.Write($buffer, 0, $recvRes.Count)
    } while (-not $recvRes.EndOfMessage)
    
    $jsonStr = [System.Text.Encoding]::UTF8.GetString($ms.ToArray())
    return ($jsonStr | ConvertFrom-Json)
  }

  Send-Cdp "Runtime.enable" @{} | Out-Null
  Send-Cdp "Page.enable" @{} | Out-Null

  Start-Sleep -Milliseconds 1200
  # Click Enter button
  $r1 = Send-Cdp "Runtime.evaluate" @{ expression = 'document.getElementById("loader-enter-btn") ? (document.getElementById("loader-enter-btn").click(), "clicked enter") : "no enter btn"' }
  Write-Output "Enter btn: $($r1.result.result.value)"

  Start-Sleep -Milliseconds 1200
  # Click Commence Inquiry
  $r2 = Send-Cdp "Runtime.evaluate" @{ expression = 'document.getElementById("creator-start-btn") ? (document.getElementById("creator-start-btn").click(), "clicked start") : "no start btn"' }
  Write-Output "Start btn: $($r2.result.result.value)"

  Start-Sleep -Milliseconds 1500

  # Check Victim text & Scene overlay
  $checkScene = Send-Cdp "Runtime.evaluate" @{ expression = 'JSON.stringify({
    sceneTimeStamp: document.querySelector(".scene-time-stamp") ? document.querySelector(".scene-time-stamp").innerText : null,
    speakerTitle: document.getElementById("current-speaker-title") ? document.getElementById("current-speaker-title").innerText : null,
    evidenceBanner: document.querySelector(".evidence-poi-title") ? document.querySelector(".evidence-poi-title").innerText : null,
    dialogueEntriesCount: document.querySelectorAll(".dialogue-entry").length,
    activePoi: document.querySelector(".poi-marker.active") ? document.querySelector(".poi-marker.active").dataset.poiId : null
  })' }
  Write-Output "Initial Game State: $($checkScene.result.result.value)"

  # TEST 1: Click the pendulum indicator again -> verify duplicate does NOT happen
  $clickAgain = Send-Cdp "Runtime.evaluate" @{ expression = '
    const pendulumMarker = document.querySelector(".poi-marker[data-poi-id=\"poi_pendulum\"]");
    if (pendulumMarker) pendulumMarker.click();
    JSON.stringify({
      afterClickEntriesCount: document.querySelectorAll(".dialogue-entry").length
    });
  ' }
  Write-Output "After clicking pendulum again: $($clickAgain.result.result.value)"

  # TEST 2: Click the Pocket Watch indicator
  $clickWatch = Send-Cdp "Runtime.evaluate" @{ expression = '
    const watchMarker = document.querySelector(".poi-marker[data-poi-id=\"poi_pocketwatch\"]");
    if (watchMarker) watchMarker.click();
    JSON.stringify({
      watchBannerTitle: document.querySelector(".evidence-poi-title") ? document.querySelector(".evidence-poi-title").innerText : null,
      dialogueEntriesCount: document.querySelectorAll(".dialogue-entry").length,
      proseTextSnippet: document.querySelector(".speaker-prose") ? document.querySelector(".speaker-prose").innerText.substring(0, 60) : null
    });
  ' }
  Write-Output "After clicking pocket watch: $($clickWatch.result.result.value)"

  # TEST 3: Take screenshot
  $ssRes = Send-Cdp "Page.captureScreenshot" @{ format = "png" }
  if ($ssRes.result.data) {
    [System.IO.File]::WriteAllBytes("scratch/fixed_gameplay.png", [System.Convert]::FromBase64String($ssRes.result.data))
    Write-Output "Screenshot saved to scratch/fixed_gameplay.png"
  }

} finally {
  if ($ws -and $ws.State -eq [System.Net.WebSockets.WebSocketState]::Open) {
    $ws.CloseAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure, "Done", $cts.Token).Wait()
  }
  Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
}
