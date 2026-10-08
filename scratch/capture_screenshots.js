const { spawn } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

async function capture() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const port = 9230;
  const tempDir = path.join(os.tmpdir(), 'edge_test_shots_' + Date.now());

  const edgeProc = spawn(edgePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--window-size=1280,800',
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

    async function takeScreenshot(filename) {
      const res = await send('Page.captureScreenshot', { format: 'png' });
      const buf = Buffer.from(res.result.data, 'base64');
      fs.writeFileSync(path.join(__dirname, filename), buf);
      console.log(`Saved screenshot: ${filename} (${buf.length} bytes)`);
    }

    // Wait for initial render and particles
    await new Promise(r => setTimeout(r, 1200));
    await takeScreenshot('shot_1_gate_screen.png');

    // Open language modal
    await evalJs("document.getElementById('gate-lang-btn').click()");
    await new Promise(r => setTimeout(r, 400));
    await takeScreenshot('shot_2_language_modal.png');

    // Switch to English
    await evalJs(`
      const enCard = Array.from(document.querySelectorAll('#language-options-grid .lang-card')).find(c => c.textContent.includes('English'));
      if (enCard) enCard.click();
    `);
    await new Promise(r => setTimeout(r, 400));
    await takeScreenshot('shot_3_gate_english.png');

    // Click Guest to enter Loading Stage
    await evalJs("document.getElementById('btn-gate-guest').click()");
    await new Promise(r => setTimeout(r, 900));
    await takeScreenshot('shot_4_loader_in_progress.png');

    // Wait for progress to hit 100%
    await new Promise(r => setTimeout(r, 2800));
    await takeScreenshot('shot_5_loader_ready.png');

    ws.close();
  } finally {
    edgeProc.kill('SIGKILL');
    try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
  }
}

capture().catch(console.error);
