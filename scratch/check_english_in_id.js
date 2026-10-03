const fs = require('fs');
const path = require('path');

const i18nPath = path.join(__dirname, '..', 'src', 'dialogue_i18n.js');
let dI18nContent = fs.readFileSync(i18nPath, 'utf8');
dI18nContent = dI18nContent.replace(/^export\s+(const|let|var|class|function)\s+/gm, '$1 ');

const sandbox = {};
const fn = new Function('sandbox', dI18nContent + '\nsandbox.DIALOGUE_I18N_FULL = DIALOGUE_I18N_FULL;');
fn(sandbox);

const nodes = sandbox.DIALOGUE_I18N_FULL;
const englishLookingOptionsInId = [];
const englishLookingVoicesInId = [];

for (const [nodeId, node] of Object.entries(nodes)) {
  if (node.options) {
    node.options.forEach((opt, idx) => {
      const idText = opt.id || opt['id'];
      const enText = opt.en || opt['en'];
      if (!idText) {
        englishLookingOptionsInId.push({ nodeId, idx, issue: 'missing id' });
      } else if (idText === enText) {
        englishLookingOptionsInId.push({ nodeId, idx, text: idText });
      }
    });
  }

  if (node.voices) {
    node.voices.forEach((v, idx) => {
      const vBadgeId = v.badge ? v.badge.id : null;
      const vBadgeEn = v.badge ? v.badge.en : null;
      const vTextId = v.text ? v.text.id : null;
      const vTextEn = v.text ? v.text.en : null;

      if (!vBadgeId || vBadgeId === vBadgeEn) {
        englishLookingVoicesInId.push({ nodeId, idx, field: 'badge', id: vBadgeId, en: vBadgeEn });
      }
      if (!vTextId || vTextId === vTextEn) {
        englishLookingVoicesInId.push({ nodeId, idx, field: 'text', id: vTextId, en: vTextEn });
      }
    });
  }
}

console.log('Options with identical id and en in ID:', englishLookingOptionsInId);
console.log('Voices with identical id and en in ID:', englishLookingVoicesInId);
