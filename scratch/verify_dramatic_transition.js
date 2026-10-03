const fs = require('fs');

console.log('--- Verifying Dramatic Transition & Dark Ambience Audio ---');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

// 1. Check index.html
const indexHtml = fs.readFileSync('index.html', 'utf8');
assert(indexHtml.includes('loader-dark-ambience'), 'index.html has loader-dark-ambience');
assert(indexHtml.includes('walker-detective'), 'index.html has walker-detective silhouette');
assert(indexHtml.includes('walker-umbrella'), 'index.html has walker-umbrella silhouette');
assert(indexHtml.includes('walker-witness'), 'index.html has walker-witness silhouette');
assert(indexHtml.includes('cigarette-ember'), 'index.html has cigarette-ember');
assert(indexHtml.includes('dossier-camera-flash'), 'index.html has dossier-camera-flash');
assert(indexHtml.includes('dossier-polaroid-pin'), 'index.html has dossier-polaroid-pin');
assert(indexHtml.includes('dossier-caution-tape'), 'index.html has dossier-caution-tape');
assert(indexHtml.includes('stamp-ink-splatter'), 'index.html has stamp-ink-splatter');

// 2. Check styles/loader.css
const loaderCss = fs.readFileSync('styles/loader.css', 'utf8');
assert(loaderCss.includes('.loader-dark-ambience'), 'loader.css has .loader-dark-ambience');
assert(loaderCss.includes('walkLeftToRight'), 'loader.css has walkLeftToRight animation');
assert(loaderCss.includes('screen-shake-violent'), 'loader.css has screen-shake-violent');
assert(loaderCss.includes('cameraFlashAnimation'), 'loader.css has cameraFlashAnimation');
assert(loaderCss.includes('stamp-ink-splatter.splattered'), 'loader.css has stamp splatter wave');
assert(loaderCss.includes('dossier-caution-tape-strip.ripped'), 'loader.css has tape rip animation');
assert(loaderCss.includes('detective-case-transition.burst-open'), 'loader.css has 3D burst open');

// 3. Check src/audio.js
const audioJs = fs.readFileSync('src/audio.js', 'utf8');
assert(audioJs.includes('startLoadingScreenAmbience'), 'audio.js has startLoadingScreenAmbience');
assert(audioJs.includes('stopLoadingScreenAmbience'), 'audio.js has stopLoadingScreenAmbience');
assert(audioJs.includes('playDeskSlam'), 'audio.js has playDeskSlam');
assert(audioJs.includes('playCameraFlashBurst'), 'audio.js has playCameraFlashBurst');
assert(audioJs.includes('playTapeTear'), 'audio.js has playTapeTear');

// 4. Check src/main.js
const mainJs = fs.readFileSync('src/main.js', 'utf8');
assert(mainJs.includes('startLoadingScreenAmbience'), 'main.js triggers startLoadingScreenAmbience');
assert(mainJs.includes('playDeskSlam'), 'main.js triggers playDeskSlam');
assert(mainJs.includes('playCameraFlashBurst'), 'main.js triggers playCameraFlashBurst');
assert(mainJs.includes('playTapeTear'), 'main.js triggers playTapeTear');
assert(mainJs.includes('burst-open'), 'main.js applies burst-open');

// 5. Check dist/bundle.js
const bundleJs = fs.readFileSync('dist/bundle.js', 'utf8');
assert(bundleJs.includes('startLoadingScreenAmbience'), 'bundle.js has startLoadingScreenAmbience');
assert(bundleJs.includes('playDeskSlam'), 'bundle.js has playDeskSlam');
assert(bundleJs.includes('playCameraFlashBurst'), 'bundle.js has playCameraFlashBurst');

console.log(`\nResult: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
