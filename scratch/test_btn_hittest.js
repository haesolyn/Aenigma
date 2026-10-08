const { spawn } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

async function testButtonHitTest() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const port = 9236;
  const tempDir = path.join(os.tmpdir(), 'edge_hittest2_' + Date.now());

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
    
    // Wait for transition to loading stage
    await new Promise(r => setTimeout(r, 800));

    // Hit test while loading
    const hitDuringLoad = await evalJs(`(() => {
      const btn = document.getElementById('loader-enter-btn');
      const rect = btn.getBoundingClientRect();
      const elAtPoint = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
      return {
        btnClass: btn.className,
        elAtPointTag: elAtPoint?.tagName,
        elAtPointId: elAtPoint?.id,
        isSame: elAtPoint === btn,
        btnPointerEvents: getComputedStyle(btn).pointerEvents,
        btnOpacity: getComputedStyle(btn).opacity
      };
    })()`);
    console.log('Hit test DURING loading (1s):', hitDuringLoad);

    // Wait until loader reaches 100%
    for (let i = 0; i < 10; i++) {
      await new Promise(r => setTimeout(r, 400));
      const isReady = await evalJs("document.getElementById('loader-enter-btn')?.classList.contains('ready')");
      if (isReady) break;
    }

    const hitAtReady = await evalJs(`(() => {
      const btn = document.getElementById('loader-enter-btn');
      const rect = btn.getBoundingClientRect();
      const elAtPoint = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
      return {
        btnClass: btn.className,
        elAtPointTag: elAtPoint?.tagName,
        elAtPointId: elAtPoint?.id,
        isSame: elAtPoint === btn,
        btnPointerEvents: getComputedStyle(btn).pointerEvents,
        btnOpacity: getComputedStyle(btn).opacity
      };
    })()`);
    console.log('Hit test AT READY (100%):', hitAtReady);

    // Now click the button via simulated mouse click at coordinates!
    console.log('Dispatching click at button coordinates...');
    const clickSimResult = await evalJs(`(() => {
      const btn = document.getElementById('loader-enter-btn');
      const rect = btn.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const el = document.elementFromPoint(x, y);
      el.click();
      return 'clicked ' + el.id;
    })()`);
    console.log('Click dispatch result:', clickSimResult);

    // Wait 2.5s for transition
    await new Promise(r => setTimeout(r, 2500));

    const postClickState = await evalJs(`({
      loadingDisplay: getComputedStyle(document.getElementById('loading-stage')).display,
      creatorHidden: document.getElementById('creator-stage')?.classList.contains('hidden'),
      creatorDisplay: getComputedStyle(document.getElementById('creator-stage')).display
    })`);
    console.log('Post-click state:', postClickState);

    ws.close();
  } finally {
    edgeProc.kill('SIGKILL');
    try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
  }
}

testButtonHitTest().catch(console.error);
