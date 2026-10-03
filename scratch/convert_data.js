const fs = require('fs');
const path = require('path');

let py = fs.readFileSync(path.join(__dirname, 'build_complete_i18n_data.py'), 'utf8');

// Strip out everything from 'print(f"Total dialogue nodes' to end
const cutIdx = py.indexOf('print(f"Total dialogue nodes');
if (cutIdx !== -1) {
  py = py.substring(0, cutIdx);
}

// Convert python docstrings """ to /* */
py = py.replace(/"""([\s\S]*?)"""/g, '/* $1 */');

// Convert python comments to JS comments
py = py.replace(/^#(.*)$/gm, '//$1');

// Remove python imports
py = py.replace(/import\s+[a-zA-Z0-9_]+\r?\n/g, '');

// Remove python def tr and voice_item
py = py.replace(/def tr[\s\S]*?def voice_item[\s\S]*?return\s*\{[\s\S]*?\}\r?\n/m, '');

// Replace D = {}
py = py.replace(/D\s*=\s*\{\}/g, '');

const jsPrelude = `
const LANGUAGES = ['en', 'id', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'ru', 'it', 'pt', 'ar'];

function tr(en, id_text, zh, ja, ko, es, fr, de, ru, it, pt, ar) {
    return {
        'en': en, 'id': id_text, 'zh': zh, 'ja': ja,
        'ko': ko, 'es': es, 'fr': fr, 'de': de,
        'ru': ru, 'it': it, 'pt': pt, 'ar': ar
    };
}

function voice_item(v_name, b_name, text_dict) {
    return {
        'voice': v_name,
        'badge': b_name,
        'text': text_dict
    };
}

const D = {};
`;

const fullScript = jsPrelude + '\n' + py + '\nmodule.exports = { D };';
fs.writeFileSync(path.join(__dirname, 'temp_py_to_js.js'), fullScript, 'utf8');

try {
  const result = require('./temp_py_to_js.js');
  console.log('Success! D keys count:', Object.keys(result.D).length);
  console.log('examine_pendulum_start voices count:', result.D['examine_pendulum_start'].voices.length);
  console.log('examine_pendulum_start voices[0] badge [id]:', result.D['examine_pendulum_start'].voices[0].badge.id);
  console.log('examine_pendulum_start voices[0] text [id]:', result.D['examine_pendulum_start'].voices[0].text.id);
  console.log('examine_pendulum_start voices[1] badge [id]:', result.D['examine_pendulum_start'].voices[1].badge.id);
  console.log('examine_pendulum_start voices[1] text [id]:', result.D['examine_pendulum_start'].voices[1].text.id);
} catch (err) {
  console.error('Error running converted script:', err);
}
