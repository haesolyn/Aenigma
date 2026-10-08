const { spawn } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

async function run() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const port = 9228;
  const tempDir = path.join(os.tmpdir(), 'edge_test_' + Date.now());

  const edgeProc = spawn(edgePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${tempDir}`,
    'http://localhost:3000/'
  ], { detached: false });

  await new Promise(r => setTimeout(r, 2500));

  try {
    const listRes = await fetch(`http://localhost:${port}/json`);
    const tabs = await listRes.json();
    const gameTab = tabs.find(t => t.url.includes('localhost:3000') || t.title.includes('AENIGMA'));
    if (!gameTab) {
      console.error('Game tab not found among tabs:', tabs.map(t => t.url));
      return;
    }
    console.log('[TEST] Found game tab:', gameTab.title, gameTab.url);

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

    // Wait for document ready
    let ready = false;
    for (let i = 0; i < 20; i++) {
      const state = await evalJs("document.readyState");
      if (state === 'complete' || state === 'interactive') {
        ready = true;
        break;
      }
      await new Promise(r => setTimeout(r, 200));
    }
    console.log('Document readyState:', ready);

    console.log('\n--- STEP 1: INITIAL CLEARANCE GATE & DETECTIVE NOIR TEXTS ---');
    const badgeText = await evalJs("document.getElementById('gate-badge-text')?.textContent");
    const leadText = await evalJs("document.getElementById('gate-instructions')?.textContent?.trim()");
    const langBtn = await evalJs("document.getElementById('gate-lang-btn')?.textContent?.trim()");
    const hasGateCanvas = await evalJs("!!document.getElementById('gate-mystery-canvas')");
    console.log('Badge text:', badgeText);
    console.log('Lead instructions:', leadText);
    console.log('Language button text:', langBtn);
    console.log('Has mystery canvas on gate:', hasGateCanvas);

    console.log('\n--- STEP 2: CLICK LANGUAGE BUTTON ON GATE SCREEN ---');
    const modalCheck = await evalJs(`
      const btn = document.getElementById('gate-lang-btn');
      btn.click();
      const modal = document.getElementById('language-modal');
      const isOpen = modal.classList.contains('open');
      const cards = Array.from(document.querySelectorAll('#language-options-grid .lang-card')).map(c => c.textContent.trim().replace(/\\s+/g, ' '));
      const zIndex = window.getComputedStyle(modal).zIndex;
      JSON.stringify({ isOpen, cardsCount: cards.length, cards, zIndex });
    `);
    console.log('Language modal state:', modalCheck);

    console.log('\n--- STEP 3: SWITCH TO ENGLISH FROM GATE SCREEN ---');
    const enSwitch = await evalJs(`
      const enCard = Array.from(document.querySelectorAll('#language-options-grid .lang-card')).find(c => c.textContent.includes('English'));
      enCard.click();
      JSON.stringify({
        badge: document.getElementById('gate-badge-text')?.textContent,
        instructions: document.getElementById('gate-instructions')?.textContent,
        emailLabel: document.getElementById('lbl-gate-email')?.textContent,
        passwordLabel: document.getElementById('lbl-gate-password')?.textContent,
        submitBtn: document.getElementById('btn-gate-submit-login')?.textContent,
        guestTitle: document.getElementById('gate-guest-btn-title')?.textContent
      });
    `);
    console.log('English translation on Gate Screen:', enSwitch);

    console.log('\n--- STEP 4: SWITCH TO JAPANESE TO VERIFY MULTILINGUAL SYNC ---');
    const jaSwitch = await evalJs(`
      document.getElementById('gate-lang-btn').click();
      const jaCard = Array.from(document.querySelectorAll('#language-options-grid .lang-card')).find(c => c.textContent.includes('日本語'));
      jaCard.click();
      JSON.stringify({
        badge: document.getElementById('gate-badge-text')?.textContent,
        instructions: document.getElementById('gate-instructions')?.textContent,
        guestTitle: document.getElementById('gate-guest-btn-title')?.textContent
      });
    `);
    console.log('Japanese translation on Gate Screen:', jaSwitch);

    console.log('\n--- STEP 5: PROCEED WITH GUEST INQUIRY INTO LOADING STAGE ---');
    const enterStage = await evalJs(`
      const guestBtn = document.getElementById('btn-gate-guest');
      guestBtn.click();
      const gateExit = document.getElementById('auth-gate-stage').classList.contains('transition-exit');
      const loaderDisplay = document.getElementById('loading-stage').style.display;
      JSON.stringify({ gateExit, loaderDisplay });
    `);
    console.log('Transition initiation:', enterStage);

    await new Promise(r => setTimeout(r, 800));

    const loaderState = await evalJs(`
      const gateDisplay = document.getElementById('auth-gate-stage').style.display;
      const loaderEntering = document.getElementById('loading-stage').classList.contains('loader-entering');
      const hasLoaderCanvas = !!document.getElementById('loader-glitch-canvas');
      const pct = document.getElementById('loader-progress-pct')?.textContent;
      JSON.stringify({ gateDisplay, loaderEntering, hasLoaderCanvas, pct });
    `);
    console.log('Loader Stage active:', loaderState);

    console.log('\n--- STEP 6: WAIT FOR LOADING PROGRESS TO REACH 100% ---');
    await new Promise(r => setTimeout(r, 3500));

    const finalState = await evalJs(`
      const pct = document.getElementById('loader-progress-pct')?.textContent;
      const enterBtnReady = document.getElementById('loader-enter-btn')?.classList.contains('ready');
      const enterBtnText = document.getElementById('loader-enter-btn')?.textContent?.trim();
      const telemetry = document.getElementById('loader-telemetry-text')?.textContent;
      JSON.stringify({ pct, enterBtnReady, enterBtnText, telemetry });
    `);
    console.log('Loader completion state:', finalState);

    ws.close();
  } finally {
    edgeProc.kill('SIGKILL');
    try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch (e) {}
  }
}

run().catch(console.error);
