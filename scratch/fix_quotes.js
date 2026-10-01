const fs = require('fs');

let s = fs.readFileSync('scratch/generate_i18n_json.js', 'utf8');
// In JS files, \' inside a single-quoted string represents an escaped apostrophe.
// If it was written as \\' in the source text, it became a literal backslash followed by a single quote, which closed the string!
// Let's replace \\' with \'
s = s.split("\\\\'").join("\\'");
fs.writeFileSync('scratch/generate_i18n_json.js', s, 'utf8');
console.log('Fixed quotes in generate_i18n_json.js');
