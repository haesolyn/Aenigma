const fs = require('fs');
const path = require('path');

const casesPath = path.join(__dirname, '..', 'src', 'cases.js');
const i18nPath = path.join(__dirname, '..', 'src', 'dialogue_i18n.js');
const mainI18nPath = path.join(__dirname, '..', 'src', 'i18n.js');

let casesContent = fs.readFileSync(casesPath, 'utf8');
let dI18nContent = fs.readFileSync(i18nPath, 'utf8');
let mI18nContent = fs.readFileSync(mainI18nPath, 'utf8');

casesContent = casesContent.replace(/^export\s+(const|let|var|class|function)\s+/gm, '$1 ');
dI18nContent = dI18nContent.replace(/^export\s+(const|let|var|class|function)\s+/gm, '$1 ');
mI18nContent = mI18nContent.replace(/^import\s+[\s\S]*?from\s+['"][^'"]+['"];?\r?\n/gm, '');
mI18nContent = mI18nContent.replace(/^export\s+(const|let|var|class|function)\s+/gm, '$1 ');

const sandbox = {};
const fn = new Function('sandbox', dI18nContent + '\n' + mI18nContent + '\n' + casesContent + '\nsandbox.CASE_DATA = CASE_DATA;\nsandbox.getLocalizedDialogueNode = getLocalizedDialogueNode;\nsandbox.DIALOGUE_I18N = DIALOGUE_I18N;\nsandbox.UI_TRANSLATIONS = UI_TRANSLATIONS;');
fn(sandbox);

const caseNodes = sandbox.CASE_DATA.dialogueNodes;

// Test Indonesian
console.log('Testing "id" translation on all 38 nodes...');
let untranslatedVoices = [];
let untranslatedOptions = [];

for (const [nodeId, baseNode] of Object.entries(caseNodes)) {
  const locNode = sandbox.getLocalizedDialogueNode(nodeId, 'id', baseNode);
  
  // check voices
  if (locNode.voices) {
    locNode.voices.forEach((v, idx) => {
      const origVoice = baseNode.voices[idx];
      if (v.badge === origVoice.badge) {
        untranslatedVoices.push({ nodeId, type: 'badge', orig: origVoice.badge, current: v.badge });
      }
      if (v.text === origVoice.text) {
        untranslatedVoices.push({ nodeId, type: 'text', orig: origVoice.text, current: v.text });
      }
    });
  }

  // check options
  if (locNode.options) {
    locNode.options.forEach((opt, idx) => {
      const origOpt = baseNode.options[idx];
      if (opt.text === origOpt.text) {
        untranslatedOptions.push({ nodeId, idx, text: opt.text });
      }
    });
  }
}

console.log('Untranslated voices count:', untranslatedVoices.length);
if (untranslatedVoices.length > 0) {
  console.log('Samples of untranslated voices:', untranslatedVoices.slice(0, 10));
}
console.log('Untranslated options count:', untranslatedOptions.length);
if (untranslatedOptions.length > 0) {
  console.log('Samples of untranslated options:', untranslatedOptions.slice(0, 10));
}
