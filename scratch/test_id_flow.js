const { spawn } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

async function testIdLangFlow() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const port = 9232;
  const tempDir = path.join(os.tmpdir(), 'edge_id_' + Date.now());

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
      return res?.result?.result?.value;
    }

    // Set Indonesian language
    await evalJs("window.setLanguage && window.setLanguage('id')");

    // Click Guest
    await evalJs("document.getElementById('btn-gate-guest').click()");

    await new Promise(r => setTimeout(r, 2000));
    // Fast-finish
    await evalJs("document.getElementById('loading-stage').click()");

    await new Promise(r => setTimeout(r, 300));
    const btnText = await evalJs("document.getElementById('loader-enter-btn').textContent");
    console.log('Button text in Indonesian:', btnText);

    // Click Enter
    await evalJs("document.getElementById('loader-enter-btn').click()");
    await new Promise(r => setTimeout(r, 3000));

    const creatorState = await evalJs(`({
      creatorHidden: document.getElementById('creator-stage')?.classList.contains('hidden'),
      creatorTitle: document.getElementById('creator-dossier-title')?.textContent,
      btnStartText: document.getElementById('creator-start-btn')?.textContent
    })`);
    console.log('Indonesian Creator State:', creatorState);

    ws.close();
  } finally {
    edgeProc.kill('SIGKILL');
    try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
  }
}

testIdLangFlow().catch(console.error);
