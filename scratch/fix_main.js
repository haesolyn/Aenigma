const fs = require('fs');

let s = fs.readFileSync('src/main.js', 'utf8');
const idxStart = s.indexOf('const cypherChars =');
const badEnd = "*@%¥§';";
const idxEnd = s.indexOf(badEnd);

if (idxStart !== -1 && idxEnd !== -1) {
  const clean = "const cypherChars = '0123456789ABCDEF!#$&*@%¥§';";
  s = s.slice(0, idxStart) + clean + s.slice(idxEnd + badEnd.length);
  fs.writeFileSync('src/main.js', s, 'utf8');
  console.log('src/main.js fixed cleanly!');
} else {
  console.error('Could not find indices:', idxStart, idxEnd);
  process.exit(1);
}
