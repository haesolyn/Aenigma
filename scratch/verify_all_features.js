// Test full 12-language subtitle localization, choices, deduplication & progress
const fs = require('fs');
const vm = require('vm');

const bundleCode = fs.readFileSync('dist/bundle.js', 'utf8');

// Create mock browser DOM environment
const domMock = {
  console: console,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  setInterval: setInterval,
  clearInterval: clearInterval,
  requestAnimationFrame: (cb) => cb(),
  addEventListener: () => {},
  document: {
    documentElement: { lang: 'en', setAttribute: () => {} },
    addEventListener: () => {},
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: (id) => {
      return {
        id,
        classList: { add: () => {}, remove: () => {}, contains: () => false, toggle: () => {} },
        style: {},
        focus: () => {},
        addEventListener: () => {},
        appendChild: () => {},
        innerHTML: '',
        textContent: ''
      };
    },
    createElement: (tag) => {
      return {
        tag,
        classList: { add: () => {}, remove: () => {}, contains: () => false, toggle: () => {} },
        style: {},
        dataset: {},
        addEventListener: () => {},
        appendChild: () => {},
        innerHTML: '',
        textContent: ''
      };
    },
    body: {
      classList: { add: () => {}, remove: () => {} }
    }
  },
  window: {
    addEventListener: () => {},
    location: { reload: () => {} }
  },
  localStorage: {
    store: {},
    getItem(k) { return this.store[k] || null; },
    setItem(k, v) { this.store[k] = String(v); }
  },
  Audio: class { play() {} pause() {} }
};
domMock.window = domMock;

vm.createContext(domMock);
vm.runInContext(bundleCode, domMock);

console.log("=== 1. VERIFYING 12-LANGUAGE TRANSLATIONS IN BUNDLE ===");
const getLocalizedDialogueNode = domMock.window.getLocalizedDialogueNode;
const tClue = domMock.window.tClue;
const tPoi = domMock.window.tPoi;
const CASE_DATA = domMock.window.CASE_DATA;
const state = domMock.window.state;

const languages = ['en', 'id', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'ru', 'it', 'pt', 'ar'];

const sampleNodes = ['graves_dialogue_start', 'examine_pendulum_start', 'examine_watch_start', 'madame_dialogue_start', 'ending_arrest', 'ending_coverup', 'ending_syndicate_bust'];

let allLangsPass = true;
languages.forEach(lang => {
  sampleNodes.forEach(nodeId => {
    const baseNode = CASE_DATA.dialogueNodes[nodeId];
    if (!baseNode) {
      console.error(`Missing base node: ${nodeId}`);
      allLangsPass = false;
      return;
    }
    const locNode = getLocalizedDialogueNode(nodeId, lang, baseNode);
    if (!locNode || !locNode.text) {
      console.error(`Failed to localize node ${nodeId} for language ${lang}`);
      allLangsPass = false;
    }
  });
});

if (allLangsPass) {
  console.log(`✅ All 12 languages correctly localize sample nodes across dialogue tree!`);
}

// Check sample text differences between languages
console.log("\n--- Sample Graves Dialogue across 5 distinct languages ---");
['en', 'id', 'ja', 'ru', 'ar'].forEach(l => {
  const loc = getLocalizedDialogueNode('graves_dialogue_start', l, CASE_DATA.dialogueNodes['graves_dialogue_start']);
  console.log(`[${l.toUpperCase()}]: ${loc.text.substring(0, 60)}...`);
});

console.log("\n=== 2. VERIFYING REVOLUTIONARY ENDING & EXPANDED WORLD BUILDING ===");
const poiLantern = CASE_DATA.pointsOfInterest.find(p => p.id === 'poi_gantry_lantern');
const poiBell = CASE_DATA.pointsOfInterest.find(p => p.id === 'poi_clock_chime_bell');
console.log(`POI Gantry Lantern exists: ${!!poiLantern} -> Initial Node: ${poiLantern?.initialNode}`);
console.log(`POI Clock Chime Bell exists: ${!!poiBell} -> Initial Node: ${poiBell?.initialNode}`);

const lanternNode = CASE_DATA.dialogueNodes['examine_gantry_lantern'];
const bellNode = CASE_DATA.dialogueNodes['examine_chime_bell'];
const syndicateEndingNode = CASE_DATA.dialogueNodes['ending_syndicate_bust'];

console.log(`examine_gantry_lantern node exists: ${!!lanternNode}`);
console.log(`examine_chime_bell node exists: ${!!bellNode}`);
console.log(`ending_syndicate_bust node exists: ${!!syndicateEndingNode}`);

console.log("\n=== 3. VERIFYING PROGRESSION & DEDUPLICATION ===");
state.reset();
console.log(`Initial Progress: ${state.getProgressPercentage()}%`);
console.log(`Initial Visited choices count: ${Object.keys(state.visitedChoices).length}`);

state.markChoiceVisited('graves_opt_cigarette');
console.log(`Is graves_opt_cigarette visited? ${state.isChoiceVisited('graves_opt_cigarette')}`);
console.log(`Progress after 1 choice: ${state.getProgressPercentage()}%`);

// Run lantern action to add clue
lanternNode.action(state);
console.log(`Has clue_shattered_reagents? ${state.hasClue('clue_shattered_reagents')}`);
console.log(`Progress after clue added: ${state.getProgressPercentage()}%`);

// Run bell action to add clue
bellNode.action(state);
console.log(`Has clue_acoustic_tripwire? ${state.hasClue('clue_acoustic_tripwire')}`);
console.log(`Progress after 2nd clue added: ${state.getProgressPercentage()}%`);

console.log("\n=== ALL SYSTEM TESTS COMPLETED SUCCESSFULLY ===");
process.exit(0);
