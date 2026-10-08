const { spawn } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

async function testMobile() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const port = 9232;
  const tempDir = path.join(os.tmpdir(), 'edge_mobile_' + Date.now());

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

    // Set mobile device viewport 375 x 667 (iPhone SE / standard mobile)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      mobile: true
    });

    await new Promise(r => setTimeout(r, 500));

    // Capture mobile gate
    const shot1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(__dirname, 'shot_mobile_gate.png'), Buffer.from(shot1.result.data, 'base64'));
    console.log('Saved shot_mobile_gate.png');

    // Enter loader on mobile
    await send('Runtime.evaluate', { expression: "document.getElementById('btn-gate-guest').click()" });
    await new Promise(r => setTimeout(r, 1200));

    const shot2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(__dirname, 'shot_mobile_loader.png'), Buffer.from(shot2.result.data, 'base64'));
    console.log('Saved shot_mobile_loader.png');

    ws.close();
  } finally {
    edgeProc.kill('SIGKILL');
    try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
  }
}

testMobile().catch(console.error);
