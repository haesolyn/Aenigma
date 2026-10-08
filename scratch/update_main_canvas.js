const fs = require('fs');
const path = require('path');

const mainPath = path.join(__dirname, '..', 'src', 'main.js');
let code = fs.readFileSync(mainPath, 'utf8');

// The new atmospheric mystery canvas implementation
const newCanvasCode = `// ----------------------------------------------------------------------------
// ATMOSPHERIC MYSTERY & NOIR FORENSIC CANVAS ENGINE
// Replaces stick walkers with cinematic esoteric runes, golden ember dust,
// synaptic clue filaments (evidence web), and volumetric clocktower beacon sweep.
// ----------------------------------------------------------------------------
function initAtmosphericMysteryCanvas(canvasTarget = 'loader-glitch-canvas') {
  const canvas = (typeof canvasTarget === 'string') 
    ? document.getElementById(canvasTarget) 
    : canvasTarget;
  if (!canvas) return () => {};
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  let animId = null;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0;
  let height = 0;

  const handleResize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth || window.innerWidth;
    height = canvas.clientHeight || window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  handleResize();
  window.addEventListener('resize', handleResize);

  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 32 : 56;
  const runeCount = isMobile ? 8 : 15;

  // 1. Floating Mystery & Forensic Particles (Golden embers + Phosphor cyan motes)
  const particles = [];
  for (let i = 0; i < particleCount; i++) {
    const isCyan = Math.random() < 0.22;
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: -(Math.random() * 0.55 + 0.25),
      radius: Math.random() * 1.8 + 0.8,
      baseAlpha: Math.random() * 0.45 + 0.25,
      currentAlpha: 0.3,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.025 + 0.015,
      isCyan: isCyan,
      colorRgb: isCyan ? '77, 240, 255' : '212, 175, 55',
      swayAmp: Math.random() * 0.35 + 0.1,
      swayFreq: Math.random() * 0.02 + 0.01
    });
  }

  // 2. Esoteric Mystery Runes & Clue Glyphs
  const RUNE_GLYPHS = ['⎊', '⧖', '◈', '🜂', '🜄', '✦', '⚖', '👁', '⚙', '⌘', '⌬', '🜁', '⚔', '⚝', '⨀', '🜃'];
  const runes = [];
  for (let i = 0; i < runeCount; i++) {
    runes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      char: RUNE_GLYPHS[Math.floor(Math.random() * RUNE_GLYPHS.length)],
      vy: -(Math.random() * 0.35 + 0.18),
      vx: (Math.random() - 0.5) * 0.2,
      fontSize: Math.floor(Math.random() * 12 + 14),
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.006,
      baseAlpha: Math.random() * 0.25 + 0.12,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      isCyan: Math.random() < 0.25
    });
  }

  // 3. Volumetric Clocktower Light Sweep
  let beaconSweep = 0;
  let lastTime = performance.now();

  function render(time) {
    const dt = Math.min((time - lastTime) / 1000, 0.1);
    lastTime = time;

    ctx.clearRect(0, 0, width, height);

    // Dynamic beacon sweep from midnight clocktower
    beaconSweep += dt * 0.15;
    const sweepAngle = Math.sin(beaconSweep) * 0.45;
    const originX = width * 0.5;
    const originY = -30;

    const grad = ctx.createRadialGradient(
      originX + Math.sin(sweepAngle) * (width * 0.2), 
      originY, 
      20,
      originX + Math.sin(sweepAngle) * (width * 0.35), 
      height * 0.65, 
      height * 0.8
    );
    grad.addColorStop(0, 'rgba(212, 175, 55, 0.045)');
    grad.addColorStop(0.5, 'rgba(77, 240, 255, 0.015)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Update & draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.pulsePhase += p.pulseSpeed;
      p.currentAlpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.18;
      p.currentAlpha = Math.max(0.08, Math.min(0.95, p.currentAlpha));

      p.x += p.vx + Math.sin(p.pulsePhase * 0.5) * p.swayAmp;
      p.y += p.vy;

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      } else if (p.y > height + 10) {
        p.y = -10;
      }
      if (p.x < -10) p.x = width + 10;
      else if (p.x > width + 10) p.x = -10;

      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = \`rgba(\${p.colorRgb}, \${p.currentAlpha})\`;
      ctx.shadowBlur = p.radius * 4;
      ctx.shadowColor = \`rgba(\${p.colorRgb}, 0.7)\`;
      ctx.fill();
      ctx.restore();
    }

    // Synaptic Clue Filaments (Evidence Web between nearby embers)
    const maxLinkDist = isMobile ? 70 : 95;
    ctx.save();
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < maxLinkDist * maxLinkDist) {
          const dist = Math.sqrt(distSq);
          const linkAlpha = (1 - dist / maxLinkDist) * 0.22 * Math.min(p1.currentAlpha, p2.currentAlpha);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = p1.isCyan 
            ? \`rgba(77, 240, 255, \${linkAlpha})\` 
            : \`rgba(212, 175, 55, \${linkAlpha})\`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    ctx.restore();

    // Floating Esoteric Mystery Runes
    ctx.save();
    for (let i = 0; i < runes.length; i++) {
      const r = runes[i];
      r.pulsePhase += r.pulseSpeed;
      r.rot += r.rotSpeed;
      const alpha = Math.max(0.06, Math.min(0.45, r.baseAlpha + Math.sin(r.pulsePhase) * 0.12));

      r.y += r.vy;
      r.x += r.vx + Math.sin(r.pulsePhase * 0.7) * 0.25;

      if (r.y < -30) {
        r.y = height + 30;
        r.x = Math.random() * width;
      }
      if (r.x < -30) r.x = width + 30;
      else if (r.x > width + 30) r.x = -30;

      ctx.save();
      ctx.translate(r.x, r.y);
      ctx.rotate(r.rot);
      ctx.font = \`\${r.fontSize}px "Cinzel", "Cinzel Decorative", Georgia, serif\`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const color = r.isCyan ? \`rgba(77, 240, 255, \${alpha})\` : \`rgba(212, 175, 55, \${alpha})\`;
      ctx.fillStyle = color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = r.isCyan ? 'rgba(77, 240, 255, 0.4)' : 'rgba(212, 175, 55, 0.4)';
      ctx.fillText(r.char, 0, 0);
      ctx.restore();
    }
    ctx.restore();

    animId = requestAnimationFrame(render);
  }

  animId = requestAnimationFrame(render);

  return function stop() {
    if (animId) cancelAnimationFrame(animId);
    window.removeEventListener('resize', handleResize);
  };
}`;

// Replace function initGlitchSilhouetteCanvas up to function bootGame
const walkerStart = code.indexOf('function initGlitchSilhouetteCanvas()');
const bootStart = code.indexOf('function bootGame()');

if (walkerStart === -1 || bootStart === -1) {
  console.error('Could not find markers in main.js');
  process.exit(1);
}

const beforeCanvas = code.substring(0, code.lastIndexOf('// ----------------------------------------------------------------------------', walkerStart));
const fromBoot = code.substring(bootStart);

let updatedCode = beforeCanvas + newCanvasCode + '\n\n' + fromBoot;

// Update startLoadingScreen inside bootGame to smoothly transition and use mystery canvas
updatedCode = updatedCode.replace(
  `    if (authGateStage) {
      authGateStage.classList.add('hidden');
      setTimeout(() => {
        authGateStage.style.display = 'none';
      }, 600);
    }

    const loadingStageEl = document.getElementById('loading-stage');
    if (loadingStageEl) {
      loadingStageEl.style.display = 'flex';
      setTimeout(() => {
        loadingStageEl.classList.remove('hidden');
      }, 50);
    }

    // Initialize animated glitch silhouette walkers
    stopGlitchCanvas = initGlitchSilhouetteCanvas();`,
  `    if (stopGateCanvas) stopGateCanvas();

    if (authGateStage) {
      authGateStage.classList.add('transition-exit');
      setTimeout(() => {
        authGateStage.style.display = 'none';
      }, 650);
    }

    const loadingStageEl = document.getElementById('loading-stage');
    if (loadingStageEl) {
      loadingStageEl.style.display = 'flex';
      setTimeout(() => {
        loadingStageEl.classList.remove('hidden');
        loadingStageEl.classList.add('loader-entering');
      }, 40);
    }

    // Initialize atmospheric mystery canvas with floating runes, embers, and synaptic filaments
    stopGlitchCanvas = initAtmosphericMysteryCanvas('loader-glitch-canvas');`
);

// Add gate mystery canvas boot in bootGame
updatedCode = updatedCode.replace(
  `  // Immediately apply active language to entire interface & clearance gate
  ui.applyLanguage(state.currentLanguage);`,
  `  // Immediately apply active language to entire interface & clearance gate
  ui.applyLanguage(state.currentLanguage);

  // Initialize Atmospheric Mystery Canvas immediately on Gate Stage
  const stopGateCanvas = initAtmosphericMysteryCanvas('gate-mystery-canvas');`
);

// Remove duplicate gateLangBtn event listener
updatedCode = updatedCode.replace(
  `  gateLangBtn?.addEventListener('click', () => {
    ui.openLanguageModal();
  });\n`,
  ''
);

// Update feedback messages to pure detective noir
updatedCode = updatedCode.replace(
  `gateAuthFeedback.textContent = 'Memverifikasi kredensial investigator...';`,
  `gateAuthFeedback.textContent = 'Memverifikasi kredensial lencana ke Komisi Sektor 7...';`
);
updatedCode = updatedCode.replace(
  `gateAuthFeedback.textContent = 'Mendaftarkan akun investigator ke Firebase...';`,
  `gateAuthFeedback.textContent = 'Mendaftarkan lencana penyelidik ke Komisi Pusat...';`
);

fs.writeFileSync(mainPath, updatedCode, 'utf8');
console.log('main.js successfully updated with atmospheric mystery canvas and smooth transitions!');
