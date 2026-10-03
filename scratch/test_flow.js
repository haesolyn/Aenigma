// Mock DOM environment
global.document = {
  body: {
    classList: {
      classes: new Set(),
      add(c) { this.classes.add(c); },
      remove(c) { this.classes.delete(c); },
      contains(c) { return this.classes.has(c); },
      toggle(c, force) {
        if (force === undefined) {
          if (this.classes.has(c)) this.classes.delete(c);
          else this.classes.add(c);
        } else if (force) {
          this.classes.add(c);
        } else {
          this.classes.delete(c);
        }
      }
    }
  },
  getElementById(id) {
    return {
      id,
      classList: {
        add() {},
        remove() {},
        toggle() {},
        contains() { return false; }
      },
      textContent: '',
      innerHTML: '',
      style: {},
      addEventListener() {},
      querySelectorAll() { return []; },
      querySelector() { return null; }
    };
  },
  querySelector() { return null; },
  querySelectorAll() { return []; }
};

global.window = {
  document: global.document,
  addEventListener() {}
};

global.audio = {
  setHeartbeatActive(v) { this.heartbeat = v; },
  playUiClick() {},
  playRadioTune() {},
  playDiscovery() {},
  playDossierStamp() {},
  heartbeat: false
};

// Import modules
const { state } = require('../src/state.js');

console.log('--- TEST 1: Damage & in-danger class ---');
state.reset();
console.log('Initial health:', state.detective.health);
console.log('in-danger initially:', document.body.classList.contains('in-danger'));

state.takeDamage(2);
console.log('Health after 2 damage:', state.detective.health);
console.log('in-danger at 2 HP:', document.body.classList.contains('in-danger'));
console.log('heartbeat at 2 HP:', audio.heartbeat);

state.takeDamage(2);
console.log('Health at 0 HP:', state.detective.health);
console.log('in-danger at 0 HP:', document.body.classList.contains('in-danger'));

console.log('--- TEST 2: Reset / Retry clears in-danger & restores stats ---');
state.reset();
console.log('Health after reset:', state.detective.health);
console.log('in-danger after reset:', document.body.classList.contains('in-danger'));
console.log('heartbeat after reset:', audio.heartbeat);

if (!document.body.classList.contains('in-danger') && state.detective.health === 4 && audio.heartbeat === false) {
  console.log('[SUCCESS] Reset correctly and cleanly removed in-danger red vignette and stopped heartbeat!');
} else {
  console.error('[FAILED] in-danger or health check failed!');
  process.exit(1);
}
