const fs = require('fs');

const casesContent = fs.readFileSync('./src/cases.js', 'utf8');

// Find all dialogue nodes in cases.js
// In cases.js, they are defined in dialogueNodes: { ... }
const startIdx = casesContent.indexOf('dialogueNodes: {');
if (startIdx === -1) {
  console.log('Could not find dialogueNodes in cases.js');
  process.exit(1);
}

// Let's find node names by regex
const nodeRegex = /(\n\s{4}[a-zA-Z0-9_]+:\s*\{[\s\S]*?\n\s{4}\},)/g;
// Actually let's match top-level keys inside dialogueNodes
const nodeKeyRegex = /^\s{4}([a-zA-Z0-9_]+):\s*\{/gm;
let m;
const nodes = [];
while ((m = nodeKeyRegex.exec(casesContent)) !== null) {
  nodes.push(m[1]);
}
console.log(`Found ${nodes.length} nodes:`, nodes);
