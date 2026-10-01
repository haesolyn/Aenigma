const { spawn } = require('child_process');
const http = require('http');

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9447',
  '--window-size=1280,800',
  '--user-data-dir=c:\\Users\\Student\\AppData\\Local\\Temp\\chrome-debug-profile4',
  'file:///c:/Users/Student/Documents/firstapp-20260930T015825Z-1-001/firstapp/index.html'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9447/json', (res) => {
    let d = ''; res.on('data', c => d += c); res.on('end', () => {
      const tabs = JSON.parse(d);
      const tab = tabs.find(t => t.url.includes('index.html')) || tabs[0];
      const ws = new WebSocket(tab.webSocketDebuggerUrl);
      ws.onopen = () => {
        ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
        setTimeout(() => {
          ws.send(JSON.stringify({ id: 10, method: 'Runtime.evaluate', params: { expression: 'document.getElementById("loader-enter-btn").click()' } }));
        }, 500);
        setTimeout(() => {
          ws.send(JSON.stringify({ id: 20, method: 'Runtime.evaluate', params: { expression: 'document.getElementById("creator-start-btn").click()' } }));
        }, 1200);
        setTimeout(() => {
          ws.send(JSON.stringify({
            id: 30,
            method: 'Runtime.evaluate',
            params: {
              expression: `JSON.stringify({
                feedH: document.getElementById("dialogue-feed").offsetHeight,
                feedScrollH: document.getElementById("dialogue-feed").scrollHeight,
                choicesH: document.getElementById("dialogue-choices").offsetHeight,
                choicesHTML: document.getElementById("dialogue-choices").innerHTML,
                choicesRect: document.getElementById("dialogue-choices").getBoundingClientRect(),
                wrapperRect: document.querySelector(".dialogue-column-wrapper").getBoundingClientRect(),
                viewportH: window.innerHeight
              })`,
              returnByValue: true
            }
          }));
        }, 2200);
      };
      ws.onmessage = (msg) => {
        const p = JSON.parse(msg.data);
        if (p.id === 30) {
          console.log('CHOICES INSPECT:\n', JSON.parse(p.result?.result?.value || '{}'));
          chrome.kill();
          process.exit(0);
        }
      };
    });
  });
}, 1200);
