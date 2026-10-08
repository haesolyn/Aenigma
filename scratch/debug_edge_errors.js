const { spawn } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

async function debugErrors() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const port = 9230;
  const tempDir = path.join(os.tmpdir(), 'edge_debug_' + Date.now());

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

    ws.onmessage = (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        console.log('[BROWSER CONSOLE]', msg.params.type, msg.params.args.map(a => a.value || a.description).join(' '));
      } else if (msg.method === 'Runtime.exceptionThrown') {
        console.log('[BROWSER EXCEPTION]', msg.params.exceptionDetails.text, msg.params.exceptionDetails.exception?.description);
      }
    };

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
    await send('Log.enable');

    async function evalJs(expr) {
      const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
      if (res.result?.exceptionDetails) {
        console.log('[EVAL EXCEPTION]', res.result.exceptionDetails.text, res.result.exceptionDetails.exception?.description);
      }
      return res?.result?.result?.value;
    }

    console.log('Clicking guest login...');
    await evalJs("document.getElementById('btn-gate-guest').click()");

    await new Promise(r => setTimeout(r, 3500));

    console.log('Checking state at 3.5s...');
    const state = await evalJs(`({
      pct: document.getElementById('loader-progress-pct')?.textContent,
      fill: document.getElementById('loader-progress-fill')?.style.width,
      btnClasses: document.getElementById('loader-enter-btn')?.className,
      btnOpacity: getComputedStyle(document.getElementById('loader-enter-btn')).opacity,
      btnPointerEvents: getComputedStyle(document.getElementById('loader-enter-btn')).pointerEvents
    })`);
    console.log('State at 3.5s:', state);

    console.log('Clicking enter button...');
    const clickRes = await evalJs(`
      const b = document.getElementById('loader-enter-btn');
      b.click();
      'clicked b, opacity is ' + getComputedStyle(b).opacity
    `);
    console.log('Click res:', clickRes);

    for (let t = 1; t <= 6; t++) {
      await new Promise(r => setTimeout(r, 1000));
      const postState = await evalJs(`({
        sec: ${t},
        loadingDisplay: getComputedStyle(document.getElementById('loading-stage')).display,
        dossierHidden: document.getElementById('detective-case-transition')?.classList.contains('hidden'),
        creatorHidden: document.getElementById('creator-stage')?.classList.contains('hidden'),
        creatorDisplay: getComputedStyle(document.getElementById('creator-stage')).display
      })`);
      console.log(`[T+${t}s]`, postState);
    }

    ws.close();
  } finally {
    edgeProc.kill('SIGKILL');
    try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
  }
}

debugErrors().catch(console.error);
