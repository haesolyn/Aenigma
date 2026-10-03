const fs = require('fs');
const content = fs.readFileSync('./scratch/build_complete_i18n_data.py', 'utf8');

const regex = /D\['([a-zA-Z0-9_]+)'\]\s*=\s*\{[\s\S]*?'voices':\s*\[([\s\S]*?)\]\s*,/g;
let match;
const nodesWithVoicesInPy = [];
while ((match = regex.exec(content)) !== null) {
  nodesWithVoicesInPy.push(match[1]);
}

console.log('Nodes with voices in build_complete_i18n_data.py:', nodesWithVoicesInPy);
