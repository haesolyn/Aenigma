const { spawn } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

async function testLoadingAndEnter() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const port = 9229;
  const tempDir = path.join(os.tmpdir(), 'edge_test_' + Date.now());

  const edgeProc = spawn(edgePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    `--user-data-dir=${tempDir}`,
    'http://localhost:3000/'
  ]);

  await new Promise(r => setTimeout(r, 2500));

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

    async function evalJs(expr) {
      const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
      return res?.result?.result?.value;
    }

    // Click guest button to enter loader
    await evalJs("document.getElementById('btn-gate-guest').click()");

    // Monitor loader progress for 4 seconds
    for (let i = 0; i < 8; i++) {
      await new Promise(r => setTimeout(r, 500));
      const status = await evalJs(`
        const pct = document.getElementById('loader-progress-pct')?.textContent;
        const btnReady = document.getElementById('loader-enter-btn')?.classList.contains('ready');
        const telemetry = document.getElementById('loader-telemetry-text')?.textContent;
        JSON.stringify({ pct, btnReady, telemetry });
      `);
      console.log(`[T+${(i+1)*500}ms] Progress:`, status);
      if (status && status.includes('"btnReady":true')) {
        console.log('Loader successfully reached 100% and Enter button is ready!');
        break;
      }
    }

    // Click Enter button to test decryption sequence and character creator entrance
    const enterRes = await evalJs(`
      const btn = document.getElementById('loader-enter-btn');
      btn.click();
      JSON.stringify({ clicked: true });
    `);
    console.log('Enter button clicked:', enterRes);

    await new Promise(r => setTimeout(r, 2200));

    const sceneState = await evalJs(`
      const dossierTransition = document.getElementById('detective-case-transition')?.classList.contains('hidden');
      const creatorStage = document.getElementById('creator-stage')?.classList.contains('hidden');
      JSON.stringify({ dossierTransitionHidden: dossierTransition, creatorStageHidden: creatorStage });
    `);
    console.log('Post-enter scene state:', sceneState);

    ws.close();
  } finally {
    edgeProc.kill('SIGKILL');
    try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
  }
}

testLoadingAndEnter().catch(console.error);
