// Simple bundler to combine modular ES scripts into a universal standalone bundle
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const fileOrder = [
  'audio.js',
  'dialogue_i18n.js',
  'i18n.js',
  'thoughts.js',
  'cases.js',
  'firebase.js',
  'state.js',
  'dice.js',
  'ui.js',
  'main.js'
];

let bundleContent = `/* Aenigma Detective Mystery RPG - Universal Standalone Bundle */\n(function() {\n'use strict';\n\n`;

for (const file of fileOrder) {
  const filePath = path.join(srcDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove import statements
  content = content.replace(/^import\s+[\s\S]*?from\s+['"][^'"]+['"];?\r?\n/gm, '');

  // Remove export keywords (export class -> class, export const -> const, export default -> )
  content = content.replace(/^export\s+default\s+/gm, '');
  content = content.replace(/^export\s+(const|let|var|class|function)\s+/gm, '$1 ');
  content = content.replace(/^export\s*\{[\s\S]*?\};?\r?\n/gm, '');

  bundleContent += `// --- BEGIN: ${file} ---\n` + content + `\n// --- END: ${file} ---\n\n`;
}

bundleContent += `\n})();\n`;

fs.writeFileSync(path.join(distDir, 'bundle.js'), bundleContent, 'utf8');
console.log('Bundle created successfully at dist/bundle.js (' + bundleContent.length + ' bytes)');
