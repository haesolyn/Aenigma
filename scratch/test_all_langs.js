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

// Test all supported languages: id, zh, ja, ko
const langs = ['id', 'zh', 'ja', 'ko'];

for (const lang of langs) {
  console.log(`\n=================== TESTING LANG: ${lang} ===================`);
  for (const [nodeId, baseNode] of Object.entries(caseNodes)) {
    const locNode = sandbox.getLocalizedDialogueNode(nodeId, lang, baseNode);

    // Check speaker
    if (locNode.speaker === baseNode.speaker && locNode.speaker !== 'Inspector Graves' && locNode.speaker !== 'Renata Vance') {
      console.log(`[${lang}] Node ${nodeId}: Speaker not translated: "${locNode.speaker}"`);
    }

    // Check voices
    if (locNode.voices) {
      locNode.voices.forEach((v, idx) => {
        const origV = baseNode.voices[idx];
        if (v.badge === origV.badge) {
          console.log(`[${lang}] Node ${nodeId} Voice ${idx} BADGE not translated: "${v.badge}"`);
        }
        if (v.text === origV.text) {
          console.log(`[${lang}] Node ${nodeId} Voice ${idx} TEXT not translated: "${v.text.substring(0, 40)}..."`);
        }
      });
    }

    // Check options
    if (locNode.options) {
      locNode.options.forEach((opt, idx) => {
        const origOpt = baseNode.options[idx];
        if (opt.text === origOpt.text) {
          console.log(`[${lang}] Node ${nodeId} Option ${idx} not translated: "${opt.text}"`);
        }
      });
    }
  }
}
