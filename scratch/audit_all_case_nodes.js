const cases = require('../src/cases.js');
const i18n = require('../src/dialogue_i18n.js');

const cNodes = cases.CASE_DATA.dialogueNodes;
const dNodes = i18n.DIALOGUE_I18N_FULL;

console.log('--- AUDIT REPORT ---');
for (const [nodeId, cNode] of Object.entries(cNodes)) {
  const dNode = dNodes[nodeId];
  if (!dNode) {
    console.log(`[MISSING NODE] ${nodeId}`);
    continue;
  }
  // Check text
  if (!dNode.text || !dNode.text.id) {
    console.log(`[MISSING ID TEXT] ${nodeId}`);
  }
  // Check voices
  const cVoicesCount = (cNode.voices || []).length;
  const dVoicesCount = (dNode.voices || []).length;
  if (cVoicesCount !== dVoicesCount) {
    console.log(`[VOICE COUNT MISMATCH] ${nodeId}: cases has ${cVoicesCount}, i18n has ${dVoicesCount}`);
  }
  // Check options
  const cOptsCount = (cNode.options || []).length;
  const dOptsCount = (dNode.options || []).length;
  if (cOptsCount !== dOptsCount) {
    console.log(`[OPTIONS COUNT MISMATCH] ${nodeId}: cases has ${cOptsCount}, i18n has ${dOptsCount}`);
  }
}
console.log('--- END AUDIT ---');
