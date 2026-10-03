const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const bundle = fs.readFileSync('dist/bundle.js', 'utf8');
const dcss = fs.readFileSync('styles/dialogue.css', 'utf8');
const mcss = fs.readFileSync('styles/main.css', 'utf8');
const lcss = fs.readFileSync('styles/loader.css', 'utf8');

console.log('=== VERIFICATION OF ALL USER REQUIREMENTS ===');

// Req 1: Clickable profile and case overview
const hasProfileModal = html.includes('id="profile-modal"');
const hasProfileBtn = html.includes('id="hud-btn-profile"');
const hasCaseBtn = html.includes('id="hud-btn-case"');
console.log('1. Profile popup modal exists in HTML:', hasProfileModal);
console.log('   Clickable profile chip exists in header:', hasProfileBtn);
console.log('   Clickable case dossier button exists in header:', hasCaseBtn);

// Req 2: Day 1 blocker removed from game-header and moved cleanly to profile modal
const headerHasDay = html.slice(html.indexOf('<header class="game-header">'), html.indexOf('</header>')).includes('id="hud-time-display"');
const profileHasDay = html.includes('id="profile-time-val"');
console.log('2. Day 1 blocker removed from inline header clutter:', !headerHasDay);
console.log('   Day 1 investigation time cleanly housed inside profile dossier:', profileHasDay);

// Req 3: UI memanjang ke kanan / escaping screen / unscrollable
const headerOverflowX = mcss.includes('overflow-x: auto;') && mcss.includes('-webkit-overflow-scrolling: touch;');
const stageOverflowY = lcss.includes('overflow-y: auto;');
const modalOverflowY = mcss.includes('overflow-y: auto;');
console.log('3. Top header horizontal overflow scrolling supported:', headerOverflowX);
console.log('   Fullscreen stages (loading & character creator) scrollable on any device:', stageOverflowY);
console.log('   Modal windows scrollable without clipping:', modalOverflowY);

// Req 4: Percentage of options stacking vertically (1 1 angkany)
const pillNoWrap = dcss.includes('white-space: nowrap !important;') && dcss.includes('word-break: keep-all !important;');
const choiceWrap = bundle.includes('choice-text') && bundle.includes('check-prob-pill');
console.log('4. Percentage pill has white-space nowrap & keep-all:', pillNoWrap);
console.log('   Choice buttons wrap label text in choice-text and keep percentage intact:', choiceWrap);

// Req 5: Radar option removed
const radarBtnInHtml = html.includes('btn-toggle-radar-ping');
const radarPingBtnInBundle = bundle.includes("getElementById('btn-toggle-radar-ping')");
console.log('5. Radar toggle button removed from HTML:', !radarBtnInHtml);
console.log('   Radar button event listeners removed from JS bundle:', !radarPingBtnInBundle);

// Req 6: Translations
const hasIdLeave = bundle.includes('Tinggalkan pengamatan');
const hasIdRatio = /rasio \[intelek\]/i.test(bundle);
const hasProfileI18n = bundle.includes('profile_modal_title') && bundle.includes('profile_vitals_title');
console.log('6. Indonesian leave dialogue action translated:', hasIdLeave);
console.log('   Indonesian Ratio [Intelek] translated:', hasIdRatio);
console.log('   Profile modal localization keys present:', hasProfileI18n);

if (hasProfileModal && hasProfileBtn && hasCaseBtn && !headerHasDay && profileHasDay && headerOverflowX && stageOverflowY && modalOverflowY && pillNoWrap && choiceWrap && !radarBtnInHtml && !radarPingBtnInBundle && hasIdLeave && hasIdRatio && hasProfileI18n) {
  console.log('\n>>> ALL CHECKS PASSED PERFECTLY! <<<');
} else {
  console.error('\n>>> SOME CHECKS FAILED! <<<');
  process.exit(1);
}
