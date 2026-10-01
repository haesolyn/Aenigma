const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const htmlPath = 'file:///c:/Users/CHRISTOPHER/Documents/firstapp-20261001T081304Z-1-001/firstapp/index.html';

const edge = spawn(edgePath, [
  '--headless=new',
  '--remote-debugging-port=9456',
  '--window-size=1280,800',
  '--user-data-dir=c:\\Users\\CHRISTOPHER\\AppData\\Local\\Temp\\edge-debug-dialogue',
  htmlPath
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9456/json', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', async () => {
      const tabs = JSON.parse(data);
      const tab = tabs.find(t => t.url.includes('index.html')) || tabs[0];
      const ws = new WebSocket(tab.webSocketDebuggerUrl);

      let msgId = 1;
      function send(method, params = {}) {
        const id = msgId++;
        ws.send(JSON.stringify({ id, method, params }));
        return id;
      }

      ws.onopen = () => {
        send('Runtime.enable');
        send('Page.enable');
      };

      ws.onmessage = (msg) => {
        const payload = JSON.parse(msg.data);
        if (payload.result && payload.result.data) {
          fs.writeFileSync('scratch/japanese_gameplay_shot.png', Buffer.from(payload.result.data, 'base64'));
          console.log('Saved scratch/japanese_gameplay_shot.png');
        }
        if (payload.result && payload.result.result && payload.result.result.value !== undefined) {
          console.log(`[TEST RESULT ${payload.id}]:\n`, JSON.stringify(payload.result.result.value, null, 2));
        }
      };

      // Step 1: Skip to main dashboard and switch to Japanese
      setTimeout(() => {
        console.log('--- Step 1: Navigating to main inquiry in Japanese ---');
        send('Runtime.evaluate', {
          returnByValue: true,
          expression: `
            (function() {
              document.getElementById('loading-stage').classList.add('hidden');
              document.getElementById('creator-stage').classList.add('hidden');
              const app = document.getElementById('app-container');
              app.classList.remove('hidden');
              app.style.display = 'flex';

              window.state.setLanguage('id');

              // Click Graves marker
              const gravesMarker = document.querySelector('.poi-marker[data-poi-id="poi_graves"]');
              if (gravesMarker) gravesMarker.click();

              const lastEntry = document.querySelector('.dialogue-entry');
              const speaker = lastEntry ? lastEntry.querySelector('.speaker-label').textContent : '';
              const prose = lastEntry ? lastEntry.querySelector('.speaker-prose').textContent : '';
              const choices = Array.from(document.querySelectorAll('.choice-btn')).map(b => b.textContent.trim().replace(/\\s+/g, ' '));
              const progressVal = document.getElementById('hud-progress-val').textContent;
              const progressTitle = document.getElementById('hud-progress-title').textContent;

              return {
                lang: window.state.currentLanguage,
                speaker,
                prose,
                choices,
                progressTitle,
                progressVal
              };
            })()
          `
        });
      }, 1200);

      // Step 2: Click cigarette option (once: true)
      setTimeout(() => {
        console.log('--- Step 2: Clicking cigarette option (once: true) ---');
        send('Runtime.evaluate', {
          returnByValue: true,
          expression: `
            (function() {
              const choices = Array.from(document.querySelectorAll('.choice-btn'));
              const cigBtn = choices.find(c => c.textContent.includes('煙草') || c.textContent.includes('cigarette') || c.textContent.includes('Astra'));
              if (cigBtn) {
                cigBtn.click();
              } else if (choices.length > 2) {
                choices[2].click();
              }

              const lastEntry = document.querySelector('.dialogue-entry:last-child');
              const speaker = lastEntry ? lastEntry.querySelector('.speaker-label').textContent : '';
              const prose = lastEntry ? lastEntry.querySelector('.speaker-prose').textContent : '';
              const progressVal = document.getElementById('hud-progress-val').textContent;

              return {
                clicked: true,
                speaker,
                prose,
                progressVal
              };
            })()
          `
        });
      }, 2500);

      // Step 3: Return to Graves main dialogue and verify cigarette option is now HIDDEN (no repeat loop)
      setTimeout(() => {
        console.log('--- Step 3: Returning to Graves dialogue start to verify deduplication ---');
        send('Runtime.evaluate', {
          returnByValue: true,
          expression: `
            (function() {
              // Click return option
              const returnBtn = document.querySelector('.choice-btn');
              if (returnBtn) returnBtn.click();

              const currentChoices = Array.from(document.querySelectorAll('.choice-btn')).map(b => b.textContent.trim().replace(/\\s+/g, ' '));
              const hasCigaretteRepeated = currentChoices.some(c => c.includes('煙草') || c.includes('cigarette'));

              return {
                currentChoices,
                hasCigaretteRepeated,
                deduplicationWorking: !hasCigaretteRepeated,
                isCigaretteVisited: window.state.isChoiceVisited('graves_opt_cigarette')
              };
            })()
          `
        });
      }, 3800);

      // Step 4: Take screenshot of the gameplay in Japanese
      setTimeout(() => {
        send('Page.captureScreenshot');
        setTimeout(() => {
          edge.kill();
          process.exit(0);
        }, 1200);
      }, 5000);
    });
  });
}, 800);
