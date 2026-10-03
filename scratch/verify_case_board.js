const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const bundle = fs.readFileSync('dist/bundle.js', 'utf8');
const mcss = fs.readFileSync('styles/main.css', 'utf8');

console.log('=== MULTI-CASE & SHORTENED HEADER VERIFICATION ===');

// 1. Shortened header case button
const hasShortenedCaseBadge = html.includes('KASUS #D4-04');
const hasOldClutteredBadge = html.includes('CASE #04: THE SILENT WATCHMAKER');
console.log('1. Header case badge shortened to #D4-04:', hasShortenedCaseBadge);
console.log('   Old cluttered header title removed:', !hasOldClutteredBadge);

// 2. Case Dossier modal tabs and content area
const hasCaseTabs = html.includes('id="case-board-tab-bar"') &&
                    html.includes('id="tab-btn-case-active"') &&
                    html.includes('id="tab-btn-case-archive"') &&
                    html.includes('id="tab-btn-case-master"');
const hasBoardContent = html.includes('id="case-board-content"');
console.log('2. Multi-case tabs exist in Case Dossier modal:', hasCaseTabs);
console.log('   Dynamic case board content container exists:', hasBoardContent);

// 3. Multi-case archive data in bundle
const hasCase01 = bundle.includes('#D4-01/DRF');
const hasCase02 = bundle.includes('#D4-02/ARS');
const hasCase03 = bundle.includes('#D4-03/TNC');
const hasCase04 = bundle.includes('#D4-04/HOR');
const hasMasterOmega = bundle.includes('#PRIME-00/OMEGA');
console.log('3. Cases present in bundle:');
console.log('   - Case #D4-01/DRF (Canal Drifter):', hasCase01);
console.log('   - Case #D4-02/ARS (Civic Vault Arson):', hasCase02);
console.log('   - Case #D4-03/TNC (Apothecary Tincture):', hasCase03);
console.log('   - Case #D4-04/HOR (Silent Watchmaker):', hasCase04);
console.log('   - Master Case #PRIME-00/OMEGA (Grand Conspiracy):', hasMasterOmega);

// 4. Keystone evidence web in bundle
const hasKeystones = bundle.includes('keystone-grid') &&
                     bundle.includes('MATRIKS BENANG MERAH KONSPIRASI') &&
                     bundle.includes('btn-synthesize-master-case');
console.log('4. Keystone Evidence Connection Web in bundle:', hasKeystones);

// 5. CSS styling for case board
const hasCaseBoardCss = mcss.includes('.case-board-tab-bar') &&
                        mcss.includes('.case-tab-btn') &&
                        mcss.includes('.solved-case-dossier-card') &&
                        mcss.includes('.master-case-hero') &&
                        mcss.includes('.keystone-grid');
console.log('5. Case Board CSS classes present:', hasCaseBoardCss);

// 6. Header space preserved (case badge button max-width)
const hasCompactBadgeCss = mcss.includes('max-width: 150px;');
console.log('6. Case badge button has compact max-width constraint:', hasCompactBadgeCss);

if (hasShortenedCaseBadge && !hasOldClutteredBadge && hasCaseTabs && hasBoardContent && hasCase01 && hasCase02 && hasCase03 && hasCase04 && hasMasterOmega && hasKeystones && hasCaseBoardCss && hasCompactBadgeCss) {
  console.log('\n>>> ALL MULTI-CASE REQUIREMENTS MET WITH 100% SUCCESS! <<<');
} else {
  console.error('\n>>> SOME CHECKS FAILED! <<<');
  process.exit(1);
}
