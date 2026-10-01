const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const htmlPath = 'file:///c:/Users/CHRISTOPHER/Documents/firstapp-20261001T081304Z-1-001/firstapp/index.html';

const edge = spawn(edgePath, [
  '--headless=new',
  '--remote-debugging-port=9455',
  '--window-size=1280,800',
  '--user-data-dir=c:\\Users\\CHRISTOPHER\\AppData\\Local\\Temp\\edge-debug-test',
  htmlPath
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9455/json', (res) => {
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
          fs.writeFileSync('scratch/browser_test_shot.png', Buffer.from(payload.result.data, 'base64'));
          console.log('Saved scratch/browser_test_shot.png');
        }
        if (payload.result && payload.result.result && payload.result.result.value !== undefined) {
          console.log(`[EVAL RES ${payload.id}]:`, JSON.stringify(payload.result.result.value, null, 2));
        }
      };

      // Step 1: Skip directly into main gameplay dashboard
      setTimeout(() => {
        console.log('Starting inquiry...');
        send('Runtime.evaluate', {
          expression: `
            (function() {
              document.getElementById('loading-stage').classList.add('hidden');
              document.getElementById('creator-stage').classList.add('hidden');
              document.getElementById('app-container').classList.remove('hidden');
              document.getElementById('app-container').style.display = 'flex';
              return 'Game dashboard shown';
            })()
          `
        });
      }, 1000);

      // Step 2: Test language change to Japanese
      setTimeout(() => {
        console.log('Switching language to Japanese (ja)...');
        send('Runtime.evaluate', {
          expression: `
            (function() {
              window.state.setLanguage('ja');
              const poi = window.CASE_DATA.pointsOfInterest[0]; // poi_pendulum
              // Inspect pendulum
              const uiController = window.aenigma ? window.aenigma : null;
              const marker = document.querySelector('.poi-marker[data-poi-id="poi_pendulum"]');
              if (marker) marker.click();

              const lastEntry = document.querySelector('.dialogue-entry');
              const prose = lastEntry ? lastEntry.querySelector('.speaker-prose').textContent : '';
              const firstChoice = document.querySelector('.choice-btn');
              const choiceText = firstChoice ? firstChoice.textContent.trim() : '';
              const progTitle = document.getElementById('hud-progress-title').textContent;
              const progVal = document.getElementById('hud-progress-val').textContent;

              return {
                lang: window.state.currentLanguage,
                progressTitle: progTitle,
                progressVal: progVal,
                dialogueSample: prose.substring(0, 80),
                choiceSample: choiceText
              };
            })()
          `
        });
      }, 2000);

      // Step 3: Test language change to Russian
      setTimeout(() => {
        console.log('Switching language to Russian (ru)...');
        send('Runtime.evaluate', {
          expression: `
            (function() {
              window.state.setLanguage('ru');
              const lastEntry = document.querySelector('.dialogue-entry');
              const prose = lastEntry ? lastEntry.querySelector('.speaker-prose').textContent : '';
              const firstChoice = document.querySelector('.choice-btn');
              const choiceText = firstChoice ? firstChoice.textContent.trim() : '';
              const progTitle = document.getElementById('hud-progress-title').textContent;

              return {
                lang: window.state.currentLanguage,
                progressTitle: progTitle,
                dialogueSample: prose.substring(0, 80),
                choiceSample: choiceText
              };
            })()
          `
        });
      }, 3000);

      // Step 4: Click a choice to verify visited mark and progress update
      setTimeout(() => {
        console.log('Clicking a choice to verify visited status...');
        send('Runtime.evaluate', {
          expression: `
            (function() {
              const choices = document.querySelectorAll('.choice-btn');
              if (choices.length > 0) {
                choices[0].click();
              }
              const visitedBtns = document.querySelectorAll('.choice-btn.visited');
              const progVal = document.getElementById('hud-progress-val').textContent;
              return {
                visitedCount: visitedBtns.length,
                progressVal: progVal
              };
            })()
          `
        });
      }, 4000);

      // Step 5: Capture screenshot and exit
      setTimeout(() => {
        send('Page.captureScreenshot');
        setTimeout(() => {
          edge.kill();
          process.exit(0);
        }, 1000);
      }, 5000);
    });
  });
}, 800);
