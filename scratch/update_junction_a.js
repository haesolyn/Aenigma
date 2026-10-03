const fs = require('fs');

console.log('--- Updating aenigmArchive connecting A styling ---');

// 1. UPDATE src/main.js
let mainJs = fs.readFileSync('src/main.js', 'utf8');

const oldTargetDefs = `    const targetStem = 'aenigm';
    const targetSuffix = 'Archive';
    const targetFull = 'aenigmArchive';`;

const newTargetDefs = `    const targetStem = 'aenigm';
    const targetPivot = 'A';
    const targetSuffix = 'rchive';
    const targetFull = 'aenigmArchive';`;

const oldInnerHtml = `          titleEl.innerHTML = \`
            <div class="brand-decrypted-wrapper">
              <span class="brand-stem">\${targetStem}</span><span class="brand-suffix">\${targetSuffix}</span>
            </div>
            <div class="archive-decrypt-badge">◈ SECTOR 7 CASE DOSSIER DECRYPTED ◈</div>
          \`;`;

const newInnerHtml = `          titleEl.innerHTML = \`
            <div class="brand-decrypted-wrapper">
              <span class="brand-stem">\${targetStem}</span><span class="brand-junction" title="Connecting Nexus">\${targetPivot}</span><span class="brand-suffix">\${targetSuffix}</span>
            </div>
            <div class="archive-decrypt-badge">◈ SECTOR 7 CASE DOSSIER DECRYPTED ◈</div>
          \`;`;

// CRLF normalization for safety
mainJs = mainJs.replace(/\r\n/g, '\n');

if (mainJs.includes(oldTargetDefs)) {
  mainJs = mainJs.replace(oldTargetDefs, newTargetDefs);
  console.log('1a. Updated target definitions in src/main.js');
} else {
  console.warn('Could not find oldTargetDefs');
}

if (mainJs.includes(oldInnerHtml)) {
  mainJs = mainJs.replace(oldInnerHtml, newInnerHtml);
  console.log('1b. Updated brand-junction in src/main.js innerHTML');
} else {
  console.warn('Could not find oldInnerHtml');
}

fs.writeFileSync('src/main.js', mainJs, 'utf8');


// 2. UPDATE styles/loader.css
let loaderCss = fs.readFileSync('styles/loader.css', 'utf8').replace(/\r\n/g, '\n');

const brandStemCss = `.brand-stem {
  font-family: var(--font-title);
  color: var(--gold-accent);
  letter-spacing: clamp(2px, 0.8vw, 4px);
  text-shadow: 0 0 20px rgba(212, 175, 55, 0.85);
  font-weight: 700;
  text-transform: none;
}`;

const brandJunctionCss = `.brand-stem {
  font-family: var(--font-title);
  color: var(--gold-accent);
  letter-spacing: clamp(2px, 0.8vw, 4px);
  text-shadow: 0 0 20px rgba(212, 175, 55, 0.85);
  font-weight: 700;
  text-transform: none;
}

/* Connecting pivot letter 'A' in aenigmArchive */
.brand-junction {
  font-family: var(--font-title);
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1.22em;
  line-height: 1;
  margin: 0 clamp(2px, 0.5vw, 6px);
  color: #ff2a6d;
  background: linear-gradient(180deg, #ff2a6d 0%, #ff6b35 50%, #f7c531 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 10px rgba(255, 42, 109, 0.95)) drop-shadow(0 0 24px rgba(255, 107, 53, 0.75));
  animation: junctionPulse 2.2s infinite alternate ease-in-out;
  transform: translateY(-2px);
  letter-spacing: clamp(1px, 0.3vw, 3px);
}

/* Precision optical nexus reticle brackets framing the connecting 'A' */
.brand-junction::before {
  content: '▼';
  position: absolute;
  top: -0.55em;
  left: 50%;
  transform: translateX(-50%) scale(0.65);
  font-size: 0.38em;
  color: #ff2a6d;
  opacity: 0.9;
  filter: drop-shadow(0 0 4px #ff2a6d);
  pointer-events: none;
}

.brand-junction::after {
  content: '▲';
  position: absolute;
  bottom: -0.45em;
  left: 50%;
  transform: translateX(-50%) scale(0.65);
  font-size: 0.38em;
  color: #f7c531;
  opacity: 0.9;
  filter: drop-shadow(0 0 4px #f7c531);
  pointer-events: none;
}

@keyframes junctionPulse {
  0% {
    transform: translateY(-2px) scale(1);
    filter: drop-shadow(0 0 8px rgba(255, 42, 109, 0.85)) drop-shadow(0 0 18px rgba(255, 107, 53, 0.6));
  }
  100% {
    transform: translateY(-3px) scale(1.1);
    filter: drop-shadow(0 0 16px rgba(255, 42, 109, 1)) drop-shadow(0 0 28px rgba(247, 197, 49, 0.9));
  }
}`;

if (loaderCss.includes(brandStemCss)) {
  loaderCss = loaderCss.replace(brandStemCss, brandJunctionCss);
  fs.writeFileSync('styles/loader.css', loaderCss, 'utf8');
  console.log('2. Updated styles/loader.css with brand-junction styles');
} else {
  console.warn('Could not find brandStemCss in styles/loader.css');
}

console.log('Done updating connecting A!');
