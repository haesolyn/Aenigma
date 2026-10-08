const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

async function testAll() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const port = 9229;
  const tempDir = path.join(os.tmpdir(), 'edge_test_gate_langs_' + Date.now());

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
    if (!gameTab) throw new Error('Game tab not found');

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

    async function inspectGate() {
      return await evalJs(`
        JSON.stringify({
          langBtn: document.getElementById('gate-lang-btn')?.textContent?.trim(),
          badge: document.getElementById('gate-badge-text')?.textContent?.trim(),
          lead: document.getElementById('gate-instructions')?.textContent?.trim().slice(0, 45) + '...',
          emailLabel: document.getElementById('lbl-gate-email')?.textContent?.trim(),
          emailPlaceholder: document.getElementById('gate-email-input')?.placeholder,
          passwordLabel: document.getElementById('lbl-gate-password')?.textContent?.trim(),
          loginBtn: document.getElementById('btn-gate-submit-login')?.textContent?.trim(),
          divider: document.getElementById('gate-divider-text')?.textContent?.trim(),
          guestTitle: document.getElementById('gate-guest-btn-title')?.textContent?.trim()
        })
      `);
    }

    console.log('\n--- 1. INITIAL BOOT STATE ---');
    console.log(JSON.parse(await inspectGate()));

    console.log('\n--- 2. SWITCH TO INDONESIAN ---');
    await evalJs(`
      document.getElementById('gate-lang-btn').click();
      const card = Array.from(document.querySelectorAll('#language-options-grid .lang-card')).find(c => c.textContent.includes('Indonesia'));
      if (card) card.click();
    `);
    const idState = JSON.parse(await inspectGate());
    console.log(idState);

    // Test empty submit in Indonesian
    await evalJs(`document.getElementById('btn-gate-submit-login').click()`);
    const idFeedback = await evalJs(`document.getElementById('gate-auth-feedback')?.textContent`);
    console.log('Indonesian Feedback on empty submit:', idFeedback);

    console.log('\n--- 3. SWITCH TO ENGLISH ---');
    const switchRes = await evalJs(`
      (() => {
        const btn = document.getElementById('gate-lang-btn');
        btn.click();
        const cards = Array.from(document.querySelectorAll('#language-options-grid .lang-card'));
        const card = cards.find(c => c.textContent.includes('English'));
        if (card) {
          card.click();
          return 'found and clicked English card';
        }
        return 'card not found! total cards: ' + cards.length;
      })()
    `);
    console.log('Switch result:', switchRes);
    const enState = JSON.parse(await inspectGate());
    console.log(enState);

    // Test empty submit in English
    await evalJs(`document.getElementById('btn-gate-submit-login').click()`);
    const enFeedback = await evalJs(`document.getElementById('gate-auth-feedback')?.textContent`);
    console.log('English Feedback on empty submit:', enFeedback);

    console.log('\n--- 4. SWITCH TO JAPANESE ---');
    await evalJs(`
      (() => {
        document.getElementById('gate-lang-btn').click();
        const card = Array.from(document.querySelectorAll('#language-options-grid .lang-card')).find(c => c.textContent.includes('日本語'));
        if (card) card.click();
      })()
    `);
    const jaState = JSON.parse(await inspectGate());
    console.log(jaState);

    // Test empty submit in Japanese
    await evalJs(`document.getElementById('btn-gate-submit-login').click()`);
    const jaFeedback = await evalJs(`document.getElementById('gate-auth-feedback')?.textContent`);
    console.log('Japanese Feedback on empty submit:', jaFeedback);

    console.log('\n--- 5. RELOAD WITH SAVED LANGUAGE PREFERENCE (PERSISTENCE CHECK) ---');
    // Currently in Japanese, localStorage has 'ja'
    await evalJs(`location.reload()`);
    await new Promise(r => setTimeout(r, 2500));
    const reloadedJaState = JSON.parse(await inspectGate());
    console.log('After page reload with ja preference:', reloadedJaState);

    ws.close();
    console.log('\n[SUCCESS] ALL CHECKS COMPLETED!');
  } finally {
    edgeProc.kill();
  }
}

testAll().catch(err => {
  console.error('[ERROR]', err);
  process.exit(1);
});
