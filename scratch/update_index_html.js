const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'index.html');
let content = fs.readFileSync(htmlPath, 'utf8');

// 1. Replace header section
const oldHeaderRegex = /<header class="game-header">[\s\S]*?<\/header>/;
const newHeader = `<header class="game-header">
      <div class="brand-section">
        <h1 class="game-title">AENIGMA</h1>
        <button id="hud-btn-case" class="hud-btn case-badge-btn" title="View Case Dossier">
          📋 <span id="case-badge-text" class="case-badge-text">CASE #04: THE SILENT WATCHMAKER</span>
        </button>
      </div>

      <!-- Compact Clickable Detective Profile Chip -->
      <button id="hud-btn-profile" class="hud-btn detective-profile-btn" title="View Detective Dossier & Vitals">
        <div class="detective-mini-avatar">
          <img id="hud-avatar-img" src="assets/portrait_female.jpg" alt="Avatar">
        </div>
        <div class="detective-chip-info">
          <span id="hud-detective-name" class="detective-name-display">Renata Vance</span>
          <div class="hud-vitals-mini">
            <span class="vital-chip hp">🩸 <span id="hud-hp-preview">4/4</span></span>
            <span class="vital-chip sp">🧠 <span id="hud-sp-preview">4/4</span></span>
          </div>
        </div>
      </button>

      <!-- Navigation Tab Buttons -->
      <nav class="nav-tab-group" id="nav-tab-group">
        <button id="nav-btn-cabinet" class="hud-btn">
          <span id="tab-cabinet-text">🧠 THOUGHT CABINET</span> <span id="cabinet-count-badge" class="badge-counter">0</span>
        </button>
        <button id="nav-btn-clues" class="hud-btn">
          <span id="tab-clues-text">📌 CASE DOSSIER</span> <span id="clues-count-badge" class="badge-counter">0</span>
        </button>
        <button id="nav-btn-inventory" class="hud-btn">
          <span id="tab-inv-text">💼 INVENTORY</span> <span id="inv-count-badge" class="badge-counter">3</span>
        </button>
        <button id="nav-btn-audio" class="hud-btn" title="Toggle Sound">
          🔊 <span class="btn-label" id="audio-btn-label">AUDIO: ON</span>
        </button>
        <button id="nav-btn-language" class="hud-btn" title="Select Language">
          🌐 <span id="current-lang-label">ENGLISH</span>
        </button>
      </nav>
    </header>`;

content = content.replace(oldHeaderRegex, newHeader);

// 2. Remove radar ping button from scene-viewport-controls
const oldControlsRegex = /<div class="scene-viewport-controls">[\s\S]*?<\/div>/;
const newControls = `<div class="scene-viewport-controls">
          <button id="btn-toggle-poi-markers" class="scene-ctrl-chip" title="Toggle POI Indicators (M / Click)">
            <span class="ctrl-icon">👁️</span> <span class="ctrl-text" id="toggle-markers-label">MARKERS</span>
          </button>
        </div>`;
content = content.replace(oldControlsRegex, newControls);

// 3. Add Modal 8 (Detective Dossier Modal) before <script src="dist/bundle.js">
const profileModalHtml = `  <!-- ========================================================================
       MODAL 8: DETECTIVE DOSSIER & PSYCHOLOGICAL PROFILE (POPUP ON CLICK)
       ======================================================================== -->
  <div id="profile-modal" class="modal-backdrop">
    <div class="modal-window profile-modal-window" style="max-width: 720px;">
      <div class="modal-header">
        <h2 class="modal-title" id="profile-modal-title">DOSSIER DETEKTIF & PROFIL PSIKOLOGIS</h2>
        <button class="modal-close-btn">&times;</button>
      </div>
      <div class="modal-body profile-modal-body">
        <div class="profile-layout-grid">
          
          <!-- Left Column: Portrait & Identity -->
          <div class="profile-col-identity">
            <div class="profile-portrait-frame">
              <img id="profile-avatar-img" src="assets/portrait_female.jpg" alt="Detective Portrait">
            </div>
            <h3 id="profile-name-text" class="profile-name-text">Renata Vance</h3>
            <div id="profile-alias-text" class="profile-alias-text">The Dissolute Inspector</div>
            <div id="profile-precinct-text" class="profile-precinct-text">Divisi Pembunuhan Distrik 4 · Sektor Timur 7</div>

            <!-- Investigation Time Card -->
            <div class="profile-time-badge">
              <span class="profile-time-icon">⏱️</span>
              <div class="profile-time-info">
                <span class="profile-time-label" id="profile-time-label">WAKTU INVESTIGASI</span>
                <span id="profile-time-val" class="profile-time-val">HARI 1 · 04:20</span>
              </div>
            </div>
          </div>

          <!-- Right Column: Vitals, Progress, Facets, Signature, Vice -->
          <div class="profile-col-details">
            
            <!-- Vitals -->
            <div class="profile-section-title" id="profile-vitals-title">KONDISI VITAL & KETAHANAN</div>
            <div class="profile-vitals-grid">
              <div class="profile-meter-card health">
                <div class="profile-meter-head">
                  <span id="profile-health-title">DAYA TAHAN (HP)</span>
                  <span id="profile-health-count" class="profile-pip-val">4 / 4</span>
                </div>
                <div id="profile-health-pips" class="segmented-bar full-width"></div>
              </div>

              <div class="profile-meter-card morale">
                <div class="profile-meter-head">
                  <span id="profile-morale-title">KEWARASAN (SP)</span>
                  <span id="profile-morale-count" class="profile-pip-val">4 / 4</span>
                </div>
                <div id="profile-morale-pips" class="segmented-bar full-width"></div>
              </div>
            </div>

            <!-- Case Progress -->
            <div class="profile-section-title" style="margin-top: 14px;" id="profile-progress-header">RESOLUSI KASUS</div>
            <div class="profile-progress-box">
              <div class="hud-progress-info">
                <span id="profile-progress-title">PROGRES PENYELIDIKAN</span>
                <span id="profile-progress-val">5%</span>
              </div>
              <div class="hud-progress-track">
                <div id="profile-progress-fill" class="hud-progress-fill" style="width: 5%;"></div>
              </div>
            </div>

            <!-- Facets of Psyche -->
            <div class="profile-section-title" style="margin-top: 14px;" id="profile-facets-title">ASPEK KEJIWAAN</div>
            <div class="profile-facets-grid">
              <div class="profile-facet-chip intellect">
                <span class="facet-label" id="profile-facet-intellect-label">INTELEK</span>
                <span class="facet-val" id="profile-facet-intellect-val">4</span>
              </div>
              <div class="profile-facet-chip psyche">
                <span class="facet-label" id="profile-facet-psyche-label">KEJIWAAN</span>
                <span class="facet-val" id="profile-facet-psyche-val">5</span>
              </div>
              <div class="profile-facet-chip physique">
                <span class="facet-label" id="profile-facet-physique-label">FISIK</span>
                <span class="facet-val" id="profile-facet-physique-val">2</span>
              </div>
              <div class="profile-facet-chip motorics">
                <span class="facet-label" id="profile-facet-motorics-label">MOTORIK</span>
                <span class="facet-val" id="profile-facet-motorics-val">3</span>
              </div>
            </div>

            <!-- Signature Skill & Vice summary -->
            <div class="profile-perks-row" style="margin-top: 14px;">
              <div class="profile-perk-card">
                <div class="profile-perk-label" id="profile-sig-label">KEAHLIAN KHUSUS</div>
                <div class="profile-perk-title" id="profile-sig-val">🔮 ESOTERIKA</div>
              </div>
              <div class="profile-perk-card">
                <div class="profile-perk-label" id="profile-vice-label">KEBIASAAN BURUK</div>
                <div class="profile-perk-title" id="profile-vice-val">🚬 Perokok Berat Astra Red</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>\n\n`;

if (!content.includes('id="profile-modal"')) {
  content = content.replace(/(<!-- JavaScript Entry Point)/, `${profileModalHtml}$1`);
}

fs.writeFileSync(htmlPath, content, 'utf8');
console.log('index.html updated successfully with Profile Modal & reorganized header!');
