const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9444',
  '--window-size=1280,800',
  '--user-data-dir=c:\\Users\\Student\\AppData\\Local\\Temp\\chrome-debug-profile',
  'file:///c:/Users/Student/Documents/firstapp-20260930T015825Z-1-001/firstapp/index.html'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9444/json', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', async () => {
      const tabs = JSON.parse(data);
      const tab = tabs.find(t => t.url.includes('index.html')) || tabs[0];
      if (!tab) {
        console.error('No tab found');
        chrome.kill();
        return;
      }
      const ws = new WebSocket(tab.webSocketDebuggerUrl);
      ws.onopen = () => {
        ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
        ws.send(JSON.stringify({ id: 2, method: 'Log.enable' }));
        ws.send(JSON.stringify({ id: 3, method: 'Page.enable' }));
      };

      ws.onmessage = (msg) => {
        const payload = JSON.parse(msg.data);
        if (payload.method === 'Runtime.consoleAPICalled') {
          console.log('CONSOLE:', payload.params.type, payload.params.args.map(a => a.value || a.description));
        } else if (payload.method === 'Runtime.exceptionThrown') {
          console.error('EXCEPTION:', payload.params.exceptionDetails.text, payload.params.exceptionDetails.exception?.description);
        } else if (payload.id === 20) {
          console.log('PAGE STATE AT START:\n', JSON.parse(payload.result?.result?.value || '{}'));
        } else if (payload.id === 30) {
          console.log('PAGE STATE AFTER 3 SECONDS:\n', JSON.parse(payload.result?.result?.value || '{}'));
        } else if (payload.id === 40) {
          console.log('SCREENSHOT 1 CAPTURED');
          fs.writeFileSync('scratch/screenshot1.png', Buffer.from(payload.result.data, 'base64'));
        }
      };

      // Check state at start (0.5s)
      setTimeout(() => {
        ws.send(JSON.stringify({
          id: 20,
          method: 'Runtime.evaluate',
          params: {
            expression: `JSON.stringify({
              loadingDisplay: getComputedStyle(document.getElementById('loading-stage')).display,
              loadingOpacity: getComputedStyle(document.getElementById('loading-stage')).opacity,
              progressPct: document.getElementById('loader-progress-pct')?.textContent,
              progressFillWidth: document.getElementById('loader-progress-fill')?.style.width,
              enterBtnClass: document.getElementById('loader-enter-btn')?.className,
              enterBtnVisible: getComputedStyle(document.getElementById('loader-enter-btn')).opacity,
              creatorDisplay: getComputedStyle(document.getElementById('creator-stage')).display,
              creatorOpacity: getComputedStyle(document.getElementById('creator-stage')).opacity
            })`,
            returnByValue: true
          }
        }));
      }, 500);

      // Check state at 3s
      setTimeout(() => {
        ws.send(JSON.stringify({
          id: 30,
          method: 'Runtime.evaluate',
          params: {
            expression: `JSON.stringify({
              progressPct: document.getElementById('loader-progress-pct')?.textContent,
              progressFillWidth: document.getElementById('loader-progress-fill')?.style.width,
              enterBtnClass: document.getElementById('loader-enter-btn')?.className,
              enterBtnOpacity: getComputedStyle(document.getElementById('loader-enter-btn')).opacity,
              enterBtnPointerEvents: getComputedStyle(document.getElementById('loader-enter-btn')).pointerEvents
            })`,
            returnByValue: true
          }
        }));
        // Capture screenshot
        ws.send(JSON.stringify({
          id: 40,
          method: 'Page.captureScreenshot',
          params: { format: 'png' }
        }));
      }, 3000);

      setTimeout(() => {
        chrome.kill();
        process.exit(0);
      }, 4500);
    });
  }).on('error', (e) => {
    console.error('HTTP connect error:', e);
    chrome.kill();
  });
}, 1200);
