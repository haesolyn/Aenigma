# PowerShell Headless Edge Verification Script
param()

# Configure console encoding for UTF-8 noir symbols and emojis
try {
    [Console]::OutputEncoding = [System.Text.Encoding]::UTF8
    $OutputEncoding = [System.Text.Encoding]::UTF8
}
catch {}

$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edgePath)) {
    $edgePath = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
}

$port = 9224
$userDir = "$env:TEMP\edge_test_noir_$(Get-Random)"

$edgeProc = Start-Process -FilePath $edgePath -ArgumentList @(
    "--remote-debugging-port=$port",
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "--user-data-dir=$userDir",
    "http://localhost:3000"
) -PassThru

try {
    # 1. Fetch WebSocket debugger URL with robust retry loop
    $tabs = $null
    for ($attempt = 1; $attempt -le 15; $attempt++) {
        try {
            $tabs = Invoke-RestMethod -Uri "http://localhost:$port/json" -ErrorAction Stop
            if ($tabs) { break }
        }
        catch {
            Start-Sleep -Milliseconds 400
        }
    }

    if (-not $tabs) {
        throw "Could not connect to Edge remote debugging at http://localhost:$port/json"
    }

    $gameTab = $tabs | Where-Object { $_.url -like "*3000*" -or $_.title -like "*AENIGMA*" } | Select-Object -First 1
    if (-not $gameTab) { $gameTab = $tabs[0] }
    $wsUrl = $gameTab.webSocketDebuggerUrl
    Write-Host "[TEST] Connected to Edge tab: $($gameTab.title) ($wsUrl)"

    # Use built-in .NET WebSocket client
    $ws = New-Object System.Net.WebSockets.ClientWebSocket
    $ct = New-Object System.Threading.CancellationToken
    $ws.ConnectAsync([Uri]$wsUrl, $ct).Wait()

    function Send-BrowserCommand {
        param(
            [Parameter(Mandatory = $true)]
            $method,
            $params = @{}
        )
        $id = [int](Get-Random)
        $msg = @{ id = $id; method = $method; params = $params } | ConvertTo-Json -Depth 10 -Compress
        $bytes = [System.Text.Encoding]::UTF8.GetBytes($msg)
        $segment = [System.ArraySegment[byte]]::new($bytes)
        $ws.SendAsync($segment, [System.Net.WebSockets.WebSocketMessageType]::Text, $true, $ct).Wait()

        $buffer = [byte[]]::new(65536)
        $resSegment = [System.ArraySegment[byte]]::new($buffer)
        $resultStr = ""
        do {
            $recv = $ws.ReceiveAsync($resSegment, $ct).Result
            $resultStr += [System.Text.Encoding]::UTF8.GetString($buffer, 0, $recv.Count)
        } while (-not $recv.EndOfMessage)

        return ($resultStr | ConvertFrom-Json)
    }

    function Invoke-BrowserScript {
        param(
            [Parameter(Mandatory = $true)]
            $expr
        )
        $res = Send-BrowserCommand "Runtime.evaluate" @{ expression = $expr; returnByValue = $true }
        if ($null -ne $res.result.result.value) {
            return $res.result.result.value
        }
        return $res.result.value
    }

    # Step 1: Check initial gate stage
    Write-Host "`n--- STEP 1: INITIAL CLEARANCE GATE CHECK ---"
    $gateBadge = Invoke-BrowserScript "document.getElementById('gate-badge-text')?.textContent"
    $gateLead = Invoke-BrowserScript "document.getElementById('gate-instructions')?.textContent"
    $hasMysteryCanvas = Invoke-BrowserScript "!!document.getElementById('gate-mystery-canvas')"
    $langBtnText = Invoke-BrowserScript "document.getElementById('gate-lang-btn')?.textContent?.trim()"

    Write-Host "Gate Badge: $gateBadge"
    Write-Host "Gate Lead: $gateLead"
    Write-Host "Has Gate Mystery Canvas: $hasMysteryCanvas"
    Write-Host "Language Button Text: $langBtnText"

    # Step 2: Test Language Modal Click from Gate Screen
    Write-Host "`n--- STEP 2: OPEN LANGUAGE MODAL FROM GATE SCREEN ---"
    $clickRes = Invoke-BrowserScript "
        const btn = document.getElementById('gate-lang-btn');
        btn.click();
        const modal = document.getElementById('language-modal');
        const isOpen = modal.classList.contains('open');
        const cardsCount = document.querySelectorAll('#language-options-grid .lang-card').length;
        const modalZIndex = window.getComputedStyle(modal).zIndex;
        const gateZIndex = window.getComputedStyle(document.getElementById('auth-gate-stage')).zIndex;
        JSON.stringify({ isOpen, cardsCount, modalZIndex, gateZIndex });
    "
    Write-Host "Language Modal Status: $clickRes"

    # Step 3: Switch Language to English from Gate Screen
    Write-Host "`n--- STEP 3: SELECT ENGLISH LANGUAGE ---"
    $switchEnRes = Invoke-BrowserScript "
        const enCard = Array.from(document.querySelectorAll('#language-options-grid .lang-card')).find(c => c.textContent.includes('English'));
        if (enCard) enCard.click();
        const newBadge = document.getElementById('gate-badge-text')?.textContent;
        const newLead = document.getElementById('gate-instructions')?.textContent;
        const newEmailLabel = document.getElementById('lbl-gate-email')?.textContent;
        const newPasswordLabel = document.getElementById('lbl-gate-password')?.textContent;
        const newSubmitBtn = document.getElementById('btn-gate-submit-login')?.textContent;
        const newGuestBtn = document.getElementById('gate-guest-btn-title')?.textContent;
        JSON.stringify({ newBadge, newLead, newEmailLabel, newPasswordLabel, newSubmitBtn, newGuestBtn });
    "
    Write-Host "Switched to English Gate: $switchEnRes"

    # Step 4: Switch Language to Japanese from Gate Screen to verify full multilingual sync
    Write-Host "`n--- STEP 4: SWITCH TO JAPANESE & TEST SYNC ---"
    $switchJaRes = Invoke-BrowserScript "
        document.getElementById('gate-lang-btn').click();
        const jaCard = Array.from(document.querySelectorAll('#language-options-grid .lang-card')).find(c => c.textContent.includes('日本語'));
        if (jaCard) jaCard.click();
        const jaBadge = document.getElementById('gate-badge-text')?.textContent;
        const jaGuest = document.getElementById('gate-guest-btn-title')?.textContent;
        JSON.stringify({ jaBadge, jaGuest });
    "
    Write-Host "Switched to Japanese Gate: $switchJaRes"

    # Switch back to English or Indonesian
    Invoke-BrowserScript "
        document.getElementById('gate-lang-btn').click();
        const enCard = Array.from(document.querySelectorAll('#language-options-grid .lang-card')).find(c => c.textContent.includes('English'));
        if (enCard) enCard.click();
    "

    # Step 5: Click Guest Mode to enter Loading Stage
    Write-Host "`n--- STEP 5: ENTER LOADING STAGE VIA GUEST INQUIRY ---"
    $enterRes = Invoke-BrowserScript "
        const guestBtn = document.getElementById('btn-gate-guest');
        guestBtn.click();
        const gateExiting = document.getElementById('auth-gate-stage').classList.contains('transition-exit');
        const loaderDisplay = document.getElementById('loading-stage').style.display;
        JSON.stringify({ gateExiting, loaderDisplay });
    "
    Write-Host "Enter Loading Stage: $enterRes"

    Start-Sleep -Seconds 1
    $loaderState = Invoke-BrowserScript "
        const gateDisplay = document.getElementById('auth-gate-stage').style.display;
        const loaderHasCanvas = !!document.getElementById('loader-glitch-canvas');
        const loaderEntering = document.getElementById('loading-stage').classList.contains('loader-entering');
        const progressPct = document.getElementById('loader-progress-pct')?.textContent;
        JSON.stringify({ gateDisplay, loaderHasCanvas, loaderEntering, progressPct });
    "
    Write-Host "Loading Stage Active: $loaderState"

    # Step 6: Wait for progress to hit 100%
    Write-Host "`n--- STEP 6: WAIT FOR LOADING PROGRESS COMPLETION ---"
    Start-Sleep -Seconds 3
    $completionState = Invoke-BrowserScript "
        const pct = document.getElementById('loader-progress-pct')?.textContent;
        const enterBtnReady = document.getElementById('loader-enter-btn')?.classList.contains('ready');
        const telemetry = document.getElementById('loader-telemetry-text')?.textContent;
        JSON.stringify({ pct, enterBtnReady, telemetry });
    "
    Write-Host "Completion State: $completionState"

    $ws.CloseAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure, "Done", $ct).Wait()
}
finally {
    if ($edgeProc -and -not $edgeProc.HasExited) {
        Stop-Process -Id $edgeProc.Id -Force
    }
    if (Test-Path $userDir) {
        Remove-Item -Path $userDir -Recurse -Force -ErrorAction SilentlyContinue
    }
}
