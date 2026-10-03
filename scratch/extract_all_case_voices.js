const cases = require('../src/cases.js');
const nodes = cases.CASE_DATA.dialogueNodes;

const voiceSummary = [];

for (const [nodeId, node] of Object.entries(nodes)) {
  if (node.voices && node.voices.length > 0) {
    voiceSummary.push({
      nodeId,
      speaker: node.speaker,
      voices: node.voices.map(v => ({
        voice: v.voice,
        badge: v.badge,
        text: v.text
      }))
    });
  }
}

console.log(JSON.stringify(voiceSummary, null, 2));
