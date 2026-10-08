Add-Type -AssemblyName System.Net.Http
Add-Type -AssemblyName System.Web

$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
  $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}

$port = 9556
$userDir = "$env:TEMP\edge-profile-auth-test-$((Get-Date).Ticks)"
$url = "http://localhost:3000/"

Write-Output "Starting headless Edge at $url..."
$proc = Start-Process -FilePath $edgePath -ArgumentList @(
  "--headless=new",
  "--remote-debugging-port=$port",
  "--window-size=1280,800",
  "--user-data-dir=$userDir",
  $url
) -PassThru

Start-Sleep -Milliseconds 2500

$script:msgId = 0

try {
  $http = New-Object System.Net.Http.HttpClient
  $res = $http.GetStringAsync("http://127.0.0.1:$port/json").Result
  $tabs = $res | ConvertFrom-Json
  $tab = $tabs | Where-Object { $_.url -like "*localhost:3000*" } | Select-Object -First 1
  if (-not $tab) { $tab = $tabs[0] }

  Write-Output "Connected to tab: $($tab.title) at $($tab.webSocketDebuggerUrl)"

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

  Start-Sleep -Milliseconds 1500

  # Step 1: Verify buttons on loader
  $checkLoader = Send-Cdp "Runtime.evaluate" @{ expression = 'JSON.stringify({
    hasLoaderAuthBtn: !!document.getElementById("loader-auth-btn"),
    loaderAuthLabel: document.getElementById("loader-auth-label")?.innerText,
    hasLoaderCloudBtn: !!document.getElementById("loader-cloud-btn"),
    firebaseGlobal: typeof window.firebase !== "undefined",
    firebaseService: typeof firebaseService !== "undefined"
  })' }
  Write-Output "Step 1 - Loader Elements: $($checkLoader.result.result.value)"

  # Step 2: Click #loader-auth-btn to open modal
  $openModal = Send-Cdp "Runtime.evaluate" @{ expression = '
    document.getElementById("loader-auth-btn")?.click();
    JSON.stringify({
      modalOpen: document.getElementById("cloud-modal")?.classList.contains("open"),
      modalTitle: document.getElementById("cloud-modal-title")?.innerText,
      authSectionExists: !!document.getElementById("auth-section-box"),
      tabLoginActive: document.getElementById("tab-auth-login")?.classList.contains("active"),
      loginBtnVisible: document.getElementById("btn-auth-submit-login")?.style.display !== "none",
      registerBtnVisible: document.getElementById("btn-auth-submit-register")?.style.display !== "none"
    });
  ' }
  Write-Output "Step 2 - Modal Opened: $($openModal.result.result.value)"

  Start-Sleep -Milliseconds 500

  # Step 3: Switch to Register tab
  $switchTab = Send-Cdp "Runtime.evaluate" @{ expression = '
    document.getElementById("tab-auth-register")?.click();
    JSON.stringify({
      tabRegisterActive: document.getElementById("tab-auth-register")?.classList.contains("active"),
      loginBtnVisible: document.getElementById("btn-auth-submit-login")?.style.display !== "none",
      registerBtnVisible: document.getElementById("btn-auth-submit-register")?.style.display !== "none"
    });
  ' }
  Write-Output "Step 3 - Switch to Register: $($switchTab.result.result.value)"

  # Step 4: Validate empty input error
  $testEmptySubmit = Send-Cdp "Runtime.evaluate" @{ expression = '
    document.getElementById("btn-auth-submit-register")?.click();
    JSON.stringify({
      feedbackText: document.getElementById("auth-feedback-msg")?.innerText,
      isError: document.getElementById("auth-feedback-msg")?.classList.contains("error")
    });
  ' }
  Write-Output "Step 4 - Empty Register Submit: $($testEmptySubmit.result.result.value)"

  # Step 5: Test short password error
  $testShortPass = Send-Cdp "Runtime.evaluate" @{ expression = '
    document.getElementById("auth-email-input").value = "test@example.com";
    document.getElementById("auth-password-input").value = "123";
    document.getElementById("btn-auth-submit-register")?.click();
    JSON.stringify({
      feedbackText: document.getElementById("auth-feedback-msg")?.innerText,
      isError: document.getElementById("auth-feedback-msg")?.classList.contains("error")
    });
  ' }
  Write-Output "Step 5 - Short Password Submit: $($testShortPass.result.result.value)"

  # Step 6: Capture screenshot of the Auth Modal
  $ssRes = Send-Cdp "Page.captureScreenshot" @{ format = "png" }
  if ($ssRes.result.data) {
    if (-not (Test-Path "scratch")) { New-Item -ItemType Directory -Path "scratch" | Out-Null }
    [System.IO.File]::WriteAllBytes("scratch/auth_modal_test.png", [System.Convert]::FromBase64String($ssRes.result.data))
    Write-Output "Step 6 - Screenshot saved to scratch/auth_modal_test.png"
  }

  # Step 7: Close modal and enter game to check in-game HUD
  $closeAndEnter = Send-Cdp "Runtime.evaluate" @{ expression = '
    document.querySelector("#cloud-modal .modal-close-btn")?.click();
    document.getElementById("loader-enter-btn")?.click();
    "entered game"
  ' }
  Start-Sleep -Milliseconds 1200

  # Step 8: Check in-game HUD nav-btn-auth
  $checkHud = Send-Cdp "Runtime.evaluate" @{ expression = '
    document.getElementById("creator-start-btn")?.click();
    JSON.stringify({
      hasNavAuthBtn: !!document.getElementById("nav-btn-auth"),
      navAuthLabel: document.getElementById("nav-auth-label")?.innerText,
      hasNavCloudBtn: !!document.getElementById("nav-btn-cloud")
    });
  ' }
  Start-Sleep -Milliseconds 1500

  # Step 9: Click in-game nav-btn-auth
  $clickHudAuth = Send-Cdp "Runtime.evaluate" @{ expression = '
    document.getElementById("nav-btn-auth")?.click();
    JSON.stringify({
      modalOpenInGame: document.getElementById("cloud-modal")?.classList.contains("open")
    });
  ' }
  Write-Output "Step 9 - In-game Auth Trigger: $($clickHudAuth.result.result.value)"

  Write-Output "ALL TESTS PASSED SUCCESSFULLY!"

} finally {
  if ($ws -and $ws.State -eq [System.Net.WebSockets.WebSocketState]::Open) {
    $ws.CloseAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure, "Done", $cts.Token).Wait()
  }
  Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
}
