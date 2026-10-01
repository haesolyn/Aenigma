const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9446',
  '--window-size=1280,800',
  '--user-data-dir=c:\\Users\\Student\\AppData\\Local\\Temp\\chrome-debug-profile3',
  'file:///c:/Users/Student/Documents/firstapp-20260930T015825Z-1-001/firstapp/index.html'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9446/json', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', async () => {
      const tabs = JSON.parse(data);
      const tab = tabs.find(t => t.url.includes('index.html')) || tabs[0];
      const ws = new WebSocket(tab.webSocketDebuggerUrl);
      ws.onopen = () => {
        ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
        ws.send(JSON.stringify({ id: 2, method: 'Page.enable' }));
      };

      ws.onmessage = (msg) => {
        const payload = JSON.parse(msg.data);
        if (payload.id === 60) {
          fs.writeFileSync('scratch/screenshot3.png', Buffer.from(payload.result.data, 'base64'));
          console.log('SCREENSHOT 3 SAVED');
        } else if (payload.method === 'Runtime.exceptionThrown') {
          console.error('EXCEPTION:', payload.params.exceptionDetails);
        }
      };

      // Click Enter button after 1s
      setTimeout(() => {
        console.log('Clicking enterBtn');
        ws.send(JSON.stringify({
          id: 10,
          method: 'Runtime.evaluate',
          params: { expression: 'document.getElementById("loader-enter-btn").click()' }
        }));
      }, 1000);

      // Click Commence Inquiry after 2s
      setTimeout(() => {
        console.log('Clicking creator-start-btn');
        ws.send(JSON.stringify({
          id: 20,
          method: 'Runtime.evaluate',
          params: { expression: 'document.getElementById("creator-start-btn").click()' }
        }));
      }, 2000);

      // Take screenshot at 3.5s
      setTimeout(() => {
        ws.send(JSON.stringify({
          id: 60,
          method: 'Page.captureScreenshot',
          params: { format: 'png' }
        }));
      }, 3500);

      setTimeout(() => {
        chrome.kill();
        process.exit(0);
      }, 5000);
    });
  });
}, 1200);
