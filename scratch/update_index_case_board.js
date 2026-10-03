const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update header case button
const oldBtn = `<button id="hud-btn-case" class="hud-btn case-badge-btn" title="View Case Dossier">
          📋 <span id="case-badge-text" class="case-badge-text">CASE #04: THE SILENT WATCHMAKER</span>
        </button>`;

const newBtn = `<button id="hud-btn-case" class="hud-btn case-badge-btn" title="View Case Dossier & Master Investigation Board">
          📋 <span id="case-badge-text" class="case-badge-text">KASUS #D4-04</span>
        </button>`;

// Normalize newlines for replace
content = content.replace(oldBtn.replace(/\r?\n/g, '\r\n'), newBtn.replace(/\n/g, '\r\n'));
if (!content.includes('KASUS #D4-04')) {
  content = content.replace(oldBtn.replace(/\r?\n/g, '\n'), newBtn);
}

// 2. Update clues-modal with case-board tabs and content container
const oldCluesModal = `  <div id="clues-modal" class="modal-backdrop">
    <div class="modal-window">
      <div class="modal-header">
        <h2 class="modal-title" id="clues-modal-title">CASE DOSSIER · EVIDENCE DEDUCTION MATRIX</h2>
        <button class="modal-close-btn">&times;</button>
      </div>
      <div class="modal-body">
        <div id="clues-list-container" class="clue-matrix-list"></div>
      </div>
    </div>
  </div>`;

const newCluesModal = `  <div id="clues-modal" class="modal-backdrop">
    <div class="modal-window case-board-modal-window" style="max-width: 860px;">
      <div class="modal-header">
        <h2 class="modal-title" id="clues-modal-title">PAPAN INVESTIGASI & ARSIP KASUS</h2>
        <button class="modal-close-btn">&times;</button>
      </div>
      <div class="case-board-tab-bar" id="case-board-tab-bar">
        <button class="case-tab-btn active" data-tab="active" id="tab-btn-case-active">
          <span>🔍</span> <span id="tab-case-active-label">KASUS AKTIF [#D4-04]</span>
        </button>
        <button class="case-tab-btn" data-tab="archive" id="tab-btn-case-archive">
          <span>📁</span> <span id="tab-case-archive-label">ARSIP KASUS (3)</span>
        </button>
        <button class="case-tab-btn master-tab" data-tab="master" id="tab-btn-case-master">
          <span>👑</span> <span id="tab-case-master-label">KASUS UTAMA [#PRIME-00]</span>
        </button>
      </div>
      <div class="modal-body case-board-modal-body" id="case-board-modal-body">
        <div id="case-board-content"></div>
        <div id="clues-list-container" class="clue-matrix-list" style="display: none;"></div>
      </div>
    </div>
  </div>`;

content = content.replace(oldCluesModal.replace(/\r?\n/g, '\r\n'), newCluesModal.replace(/\n/g, '\r\n'));
if (!content.includes('case-board-tab-bar')) {
  content = content.replace(oldCluesModal.replace(/\r?\n/g, '\n'), newCluesModal);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated index.html with shortened header case button and case board modal tabs!');
