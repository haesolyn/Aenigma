const { spawn } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

async function testToastLocalization() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const port = 9238;
  const tempDir = path.join(os.tmpdir(), 'edge_toast_' + Date.now());

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

    // Set to English
    await evalJs(`
      const card = Array.from(document.querySelectorAll('#language-options-grid .lang-card')).find(c => c.textContent.includes('English'));
      if (card) card.click();
    `);

    // Click Continue Active if visible, or simulate Continue Active click
    const enToast = await evalJs(`(() => {
      const btn = document.getElementById('btn-gate-continue-active');
      btn.click();
      return document.getElementById('toast-notification')?.textContent;
    })()`);
    console.log('English Toast on Continue Active:', enToast);

    // Now switch to Japanese
    await evalJs(`
      const card = Array.from(document.querySelectorAll('#language-options-grid .lang-card')).find(c => c.textContent.includes('日本語'));
      if (card) card.click();
    `);

    const jaToast = await evalJs(`(() => {
      const btn = document.getElementById('btn-gate-continue-active');
      btn.click();
      return document.getElementById('toast-notification')?.textContent;
    })()`);
    console.log('Japanese Toast on Continue Active:', jaToast);

    ws.close();
  } finally {
    edgeProc.kill('SIGKILL');
    try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
  }
}

testToastLocalization().catch(console.error);
