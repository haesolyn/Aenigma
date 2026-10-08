const { spawn } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

async function testEarlyClick() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const port = 9237;
  const tempDir = path.join(os.tmpdir(), 'edge_early_' + Date.now());

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

    // Click Guest
    await evalJs("document.getElementById('btn-gate-guest').click()");
    
    // Only wait 800ms (loader is ~25-40%)
    await new Promise(r => setTimeout(r, 800));

    const progressMid = await evalJs("document.getElementById('loader-progress-pct')?.textContent");
    console.log('Progress when clicked early:', progressMid);

    // Click Enter button while progress is still in progress!
    const clickRes = await evalJs(`(() => {
      const btn = document.getElementById('loader-enter-btn');
      const rect = btn.getBoundingClientRect();
      const el = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
      el.click();
      return 'clicked early on ' + el.id;
    })()`);
    console.log(clickRes);

    await new Promise(r => setTimeout(r, 2500));

    const finalState = await evalJs(`({
      loadingDisplay: getComputedStyle(document.getElementById('loading-stage')).display,
      creatorHidden: document.getElementById('creator-stage')?.classList.contains('hidden'),
      creatorDisplay: getComputedStyle(document.getElementById('creator-stage')).display,
      appContainerHidden: document.getElementById('app-container')?.classList.contains('hidden'),
      appContainerDisplay: getComputedStyle(document.getElementById('app-container')).display
    })`);
    console.log('Final state after early enter click:', finalState);

    ws.close();
  } finally {
    edgeProc.kill('SIGKILL');
    try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
  }
}

testEarlyClick().catch(console.error);
