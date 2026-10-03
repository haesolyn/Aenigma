const fs = require('fs');
const content = fs.readFileSync('./scratch/build_complete_i18n_data.py', 'utf8');

const target = "D['examine_pendulum_start']";
const idx = content.indexOf(target);
if (idx !== -1) {
  console.log(content.substring(idx + 1500, idx + 4500));
}
