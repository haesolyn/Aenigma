const fs = require('fs');
const bundle = fs.readFileSync('dist/bundle.js', 'utf8');

// Test that all required keys are in the bundle
const keys = [
  'gate_toast_dossier_loaded_short',
  'profile_toast_welcome',
  'profile_toast_registered',
  'profile_toast_logout',
  'profile_toast_saved_cloud',
  'profile_toast_loaded_cloud',
  'profile_cloud_upload_success',
  'profile_cloud_download_success'
];

for (const k of keys) {
  const count = (bundle.match(new RegExp(k, 'g')) || []).length;
  console.log(`Key ${k}: found ${count} occurrences`);
}
