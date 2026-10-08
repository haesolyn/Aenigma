const { spawn } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

async function testCompleteFlow() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const port = 9231;
  const tempDir = path.join(os.tmpdir(), 'edge_flow_' + Date.now());

  const edgeProc = spawn(edgePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    `--user-data-dir=${tempDir}`,
    'http://localhost:3000/'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const listRes = await fetch(`http://localhost:${port}/json`);
    const tabs = await listRes.json();
    const gameTab = tabs.find(t => t.url.includes('localhost:3000') || t.title.includes('AENIGMA'));

    const ws = new WebSocket(gameTab.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const curId = id++;
        const handler = (evt) => {
          const msg = JSON.parse(evt.data);
          if (msg.id === curId) {
            ws.removeEventListener('message', handler);
            resolve(msg);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: curId, method, params }));
      });
    }

    await send('Runtime.enable');

    async function evalJs(expr) {
      const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
      if (res.result?.exceptionDetails) {
        console.error('[PAGE EXCEPTION]', res.result.exceptionDetails);
      }
      return res?.result?.result?.value;
    }

    console.log('--- 1. Testing Gate & Guest Login ---');
    await evalJs("document.getElementById('btn-gate-guest').click()");

    console.log('--- 2. Wait 1 second (loading in progress), click loading stage to quick-finish ---');
    await new Promise(r => setTimeout(r, 1000));
    const midLoad = await evalJs(`({
      pct: document.getElementById('loader-progress-pct')?.textContent,
      btnReady: document.getElementById('loader-enter-btn')?.classList.contains('ready')
    })`);
    console.log('Mid-load state:', midLoad);

    // Fast-complete via clicking stage
    await evalJs("document.getElementById('loading-stage').click()");
    await new Promise(r => setTimeout(r, 200));

    const fastFinished = await evalJs(`({
      pct: document.getElementById('loader-progress-pct')?.textContent,
      btnReady: document.getElementById('loader-enter-btn')?.classList.contains('ready')
    })`);
    console.log('State after stage click (should be 100% & ready):', fastFinished);

    console.log('--- 3. Click "ENTER THE ARCHIVE" button ---');
    await evalJs("document.getElementById('loader-enter-btn').click()");

    // Wait 3.2s for transition
    await new Promise(r => setTimeout(r, 3200));

    const creatorState = await evalJs(`({
      loadingDisplay: getComputedStyle(document.getElementById('loading-stage')).display,
      creatorHidden: document.getElementById('creator-stage')?.classList.contains('hidden'),
      creatorDisplay: getComputedStyle(document.getElementById('creator-stage')).display,
      nameInput: document.getElementById('creator-name-input')?.value,
      pointsPool: document.getElementById('creator-points-pool')?.textContent
    })`);
    console.log('Creator state reached:', creatorState);

    console.log('--- 4. In Character Creator, click Start Investigation ---');
    await evalJs("document.getElementById('creator-start-btn').click()");

    await new Promise(r => setTimeout(r, 1000));

    const gameState = await evalJs(`({
      creatorDisplay: getComputedStyle(document.getElementById('creator-stage')).display,
      gameDisplay: getComputedStyle(document.getElementById('main-game-stage') || document.getElementById('app-container')).display,
      dialogueActive: !!document.querySelector('.dialogue-container') || !!document.getElementById('dialogue-overlay'),
      detectiveName: window.gameState?.detective?.name || 'Vance'
    })`);
    console.log('Main Game stage reached:', gameState);

    ws.close();
  } finally {
    edgeProc.kill('SIGKILL');
    try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
  }
}

testCompleteFlow().catch(console.error);
