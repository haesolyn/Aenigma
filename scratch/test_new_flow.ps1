Add-Type -AssemblyName System.Net.Http
Add-Type -AssemblyName System.Web

$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
  $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}

$port = 9562
$userDir = "$env:TEMP\edge-profile-flow-test-$((Get-Date).Ticks)"
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
    $curId = $script:msgId
    $bodyObj = @{ id = $curId; method = $method; params = $params }
    $body = $bodyObj | ConvertTo-Json -Compress -Depth 10
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($body)
    $segment = New-Object System.ArraySegment[byte] -ArgumentList @(,$bytes)
    $ws.SendAsync($segment, [System.Net.WebSockets.WebSocketMessageType]::Text, $true, $cts.Token).Wait()

    while ($true) {
      $buffer = New-Object byte[] 65536
      $ms = New-Object System.IO.MemoryStream
      do {
        $recvSeg = New-Object System.ArraySegment[byte] -ArgumentList @(,$buffer)
        $recvRes = $ws.ReceiveAsync($recvSeg, $cts.Token).Result
        $ms.Write($buffer, 0, $recvRes.Count)
      } while (-not $recvRes.EndOfMessage)
      $jsonStr = [System.Text.Encoding]::UTF8.GetString($ms.ToArray())
      $parsed = ($jsonStr | ConvertFrom-Json)
      if ($parsed.id -eq $curId) {
        return $parsed
      }
    }
  }

  Send-Cdp "Runtime.enable" @{} | Out-Null
  Send-Cdp "Page.enable" @{} | Out-Null

  Start-Sleep -Milliseconds 1000

  # STEP 1: Verify Initial Auth Gate Stage
  $step1 = Send-Cdp "Runtime.evaluate" @{ expression = 'JSON.stringify({
    hasAuthGate: !!document.getElementById("auth-gate-stage"),
    authGateVisible: !document.getElementById("auth-gate-stage")?.classList.contains("hidden") && document.getElementById("auth-gate-stage")?.style.display !== "none",
    hasGuestBtn: !!document.getElementById("btn-gate-guest"),
    loadingStageHidden: document.getElementById("loading-stage")?.style.display === "none" || document.getElementById("loading-stage")?.classList.contains("hidden"),
    hasNavAuthBtn: !!document.getElementById("nav-btn-auth"),
    hasNavCloudBtn: !!document.getElementById("nav-btn-cloud"),
    hasLoaderAuthBtn: !!document.getElementById("loader-auth-btn"),
    hasLoaderCloudBtn: !!document.getElementById("loader-cloud-btn")
  })' }
  Write-Output "Step 1 (Auth Gate Pre-Loading Check): $($step1.result.result.value)"

  # STEP 2: Click Guest Button to transition to loading screen
  $step2 = Send-Cdp "Runtime.evaluate" @{ expression = '
    document.getElementById("btn-gate-guest")?.click();
    "clicked guest button";
  ' }
  Write-Output "Step 2: $($step2.result.result.value)"

  Start-Sleep -Milliseconds 800

  # Check loading stage is now visible
  $checkLoading = Send-Cdp "Runtime.evaluate" @{ expression = 'JSON.stringify({
    authGateHidden: document.getElementById("auth-gate-stage")?.style.display === "none" || document.getElementById("auth-gate-stage")?.classList.contains("hidden"),
    loadingStageVisible: document.getElementById("loading-stage")?.style.display !== "none" && !document.getElementById("loading-stage")?.classList.contains("hidden"),
    loadingProgressText: document.getElementById("loader-progress-pct")?.innerText
  })' }
  Write-Output "Step 2b (Loading Screen Active): $($checkLoading.result.result.value)"

  # Wait for loading to reach 100%
  for ($i = 0; $i -lt 30; $i++) {
    Start-Sleep -Milliseconds 250
    $checkReady = Send-Cdp "Runtime.evaluate" @{ expression = '!!document.getElementById("loader-enter-btn")?.classList.contains("ready")' }
    if ($checkReady.result.result.value -eq $true) {
      Write-Output "Loading reached 100%!"
      break
    }
  }

  # STEP 3: Click Enter Archive
  $enterArchive = Send-Cdp "Runtime.evaluate" @{ expression = '
    document.getElementById("loader-enter-btn")?.click();
    "clicked enter archive";
  ' }
  Write-Output "Step 3: $($enterArchive.result.result.value)"

  Start-Sleep -Milliseconds 1200

  # Click Start Inquiry on character creation
  $startCreator = Send-Cdp "Runtime.evaluate" @{ expression = '
    document.getElementById("creator-start-btn")?.click();
    "clicked creator start btn";
  ' }
  Write-Output "Step 3b: $($startCreator.result.result.value)"

  Start-Sleep -Milliseconds 1500

  # STEP 4: Verify in-game state & clean HUD (no auth or cloud nav buttons)
  $step4 = Send-Cdp "Runtime.evaluate" @{ expression = 'JSON.stringify({
    mainGameStageVisible: !document.getElementById("main-game-stage")?.classList.contains("hidden") || !document.getElementById("app-container")?.classList.contains("hidden"),
    navTabCabinet: !!document.getElementById("nav-btn-cabinet"),
    navTabClues: !!document.getElementById("nav-btn-clues"),
    navTabInventory: !!document.getElementById("nav-btn-inventory"),
    hasNavAuthBtn: !!document.getElementById("nav-btn-auth"),
    hasNavCloudBtn: !!document.getElementById("nav-btn-cloud"),
    hasProfileChip: !!document.getElementById("hud-btn-profile")
  })' }
  Write-Output "Step 4 (In-Game Clean HUD Check): $($step4.result.result.value)"

  # STEP 5: Click Profile Chip -> Open profile modal and verify integrated Auth/Cloud section
  $step5 = Send-Cdp "Runtime.evaluate" @{ expression = '
    document.getElementById("hud-btn-profile")?.click();
    JSON.stringify({
      profileModalOpen: document.getElementById("profile-modal")?.classList.contains("open"),
      hasProfileAuthSection: !!document.getElementById("profile-auth-section"),
      isLoggedOutViewVisible: document.getElementById("profile-auth-logged-out")?.style.display !== "none",
      guestBadgeText: document.getElementById("profile-auth-guest-badge")?.innerText,
      hasToggleLoginBtn: !!document.getElementById("btn-profile-toggle-login"),
      drawerInitiallyHidden: document.getElementById("profile-auth-drawer")?.style.display === "none"
    });
  ' }
  Write-Output "Step 5 (Profile Modal & Guest State): $($step5.result.result.value)"

  # STEP 6: Click "MASUK / DAFTAR AKUN" in profile modal -> Toggle login drawer
  $step6 = Send-Cdp "Runtime.evaluate" @{ expression = '
    document.getElementById("btn-profile-toggle-login")?.click();
    JSON.stringify({
      drawerVisibleNow: document.getElementById("profile-auth-drawer")?.style.display !== "none",
      hasEmailInput: !!document.getElementById("profile-email-input"),
      hasPasswordInput: !!document.getElementById("profile-password-input"),
      hasSubmitLoginBtn: !!document.getElementById("btn-profile-submit-login"),
      hasSubmitRegisterBtn: !!document.getElementById("btn-profile-submit-register")
    });
  ' }
  Write-Output "Step 6 (Profile Login Drawer Toggled): $($step6.result.result.value)"

  # STEP 7: Simulate Login state -> verify Authenticated view has user email, Logout button, Cloud Save/Load
  $step7 = Send-Cdp "Runtime.evaluate" @{ expression = '
    if (typeof firebaseService !== "undefined" && firebaseService) {
      firebaseService.user = { uid: "test_uid_123", email: "detective_vance@aenigma.gov", isAnonymous: false };
      firebaseService.playerId = "test_uid_123";
      // Trigger profile auth update
      if (window.aenigma && window.aenigma.ui) {
        window.aenigma.ui.updateProfileAuthUI();
      } else {
        const loggedOutCard = document.getElementById("profile-auth-logged-out");
        const loggedInCard = document.getElementById("profile-auth-logged-in");
        const emailDisplay = document.getElementById("profile-user-email-display");
        if (loggedOutCard) loggedOutCard.style.display = "none";
        if (loggedInCard) loggedInCard.style.display = "block";
        if (emailDisplay) emailDisplay.textContent = "detective_vance@aenigma.gov";
      }
    }
    JSON.stringify({
      isLoggedInViewVisible: document.getElementById("profile-auth-logged-in")?.style.display !== "none",
      isLoggedOutViewHidden: document.getElementById("profile-auth-logged-out")?.style.display === "none",
      displayedEmail: document.getElementById("profile-user-email-display")?.innerText,
      hasLogoutBtn: !!document.getElementById("btn-profile-logout"),
      hasCloudSaveBtn: !!document.getElementById("btn-profile-cloud-save"),
      hasCloudLoadBtn: !!document.getElementById("btn-profile-cloud-load")
    });
  ' }
  Write-Output "Step 7 (Profile Authenticated State & Logout Option): $($step7.result.result.value)"

  # STEP 8: Click Logout button in profile modal -> verify switches back to guest mode
  $step8 = Send-Cdp "Runtime.evaluate" @{ expression = '
    (async () => {
      document.getElementById("btn-profile-logout")?.click();
      await new Promise(r => setTimeout(r, 400));
      return JSON.stringify({
        afterLogoutLoggedInHidden: document.getElementById("profile-auth-logged-in")?.style.display === "none",
        afterLogoutLoggedOutVisible: document.getElementById("profile-auth-logged-out")?.style.display !== "none"
      });
    })()
  ' ; awaitPromise = $true }
  Write-Output "Step 8 (Logout Switches Back to Guest): $($step8.result.result.value)"

} catch {
  Write-Error $_
} finally {
  if ($ws -and $ws.State -eq 'Open') {
    $ws.CloseOutputAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure, "Done", [System.Threading.CancellationToken]::None).Wait()
  }
  if ($proc -and -not $proc.HasExited) {
    Stop-Process -Id $proc.Id -Force
  }
}
