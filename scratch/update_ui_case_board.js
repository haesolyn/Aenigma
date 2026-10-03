const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'ui.js');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update imports in src/ui.js
content = content.replace(
  "import { CASE_DATA } from './cases.js';",
  "import { CASE_DATA, ALL_CASES_ARCHIVE } from './cases.js';"
);
content = content.replace(
  "getLocalizedDialogueNode, tVice, tThought } from './i18n.js';",
  "getLocalizedDialogueNode, tVice, tThought, tCase } from './i18n.js';"
);

// 2. Add activeCaseTab in constructor
if (!content.includes('this.activeCaseTab =')) {
  content = content.replace(
    "this.activePoi = null;\r\n",
    "this.activePoi = null;\r\n    this.activeCaseTab = 'active';\r\n"
  );
  if (!content.includes('this.activeCaseTab =')) {
    content = content.replace(
      "this.activePoi = null;\n",
      "this.activePoi = null;\n    this.activeCaseTab = 'active';\n"
    );
  }
}

// 3. Add caseBoardContent and caseBoardTabBar in initElements
if (!content.includes('this.caseBoardContent =')) {
  content = content.replace(
    "this.cluesContainer = document.getElementById('clues-list-container');\r\n",
    "this.cluesContainer = document.getElementById('clues-list-container');\r\n    this.caseBoardContent = document.getElementById('case-board-content');\r\n    this.caseBoardTabBar = document.getElementById('case-board-tab-bar');\r\n"
  );
  if (!content.includes('this.caseBoardContent =')) {
    content = content.replace(
      "this.cluesContainer = document.getElementById('clues-list-container');\n",
      "this.cluesContainer = document.getElementById('clues-list-container');\n    this.caseBoardContent = document.getElementById('case-board-content');\n    this.caseBoardTabBar = document.getElementById('case-board-tab-bar');\n"
    );
  }
}

// 4. Add case tab click listeners in bindEvents
const tabClickBind = `    // Case Board Tabs Switcher
    document.querySelectorAll('.case-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.dataset.tab;
        if (tab) {
          this.activeCaseTab = tab;
          audio.playTabSwitch();
          this.renderCaseBoard();
        }
      });
    });\r\n\r\n`;

if (!content.includes('Case Board Tabs Switcher')) {
  content = content.replace(
    "    // Header Quick Triggers: Profile Dossier & Case Overview\r\n",
    tabClickBind + "    // Header Quick Triggers: Profile Dossier & Case Overview\r\n"
  );
  if (!content.includes('Case Board Tabs Switcher')) {
    content = content.replace(
      "    // Header Quick Triggers: Profile Dossier & Case Overview\n",
      tabClickBind.replace(/\r\n/g, '\n') + "    // Header Quick Triggers: Profile Dossier & Case Overview\n"
    );
  }
}

// 5. Update openCluesModal & add renderCaseBoard
const oldOpenClues = `  // Clues Modal
  openCluesModal() {
    this.openModal(this.cluesModal);
    this.renderClues();
  }

  renderClues() {
    this.cluesContainer.innerHTML = '';
    const lang = this.state.currentLanguage;
    if (this.state.clues.length === 0) {
      this.cluesContainer.innerHTML = \`<div style="color:var(--text-muted);font-style:italic;padding:16px;">\${t('clues_empty', lang)}</div>\`;
      return;
    }

    this.state.clues.forEach(clue => {
      const card = document.createElement('div');
      card.className = 'clue-card';
      const clueTitle = tClue(clue.id, 'title', lang) || clue.title;
      const clueDesc = tClue(clue.id, 'desc', lang) || clue.desc;

      card.innerHTML = \`
        <div class="clue-title-line">📌 \${clueTitle}</div>
        <div class="clue-detail-text">\${clueDesc}</div>
      \`;
      this.cluesContainer.appendChild(card);
    });
  }`;

const newOpenClues = `  // Clues & Multi-Case Board Modal
  openCluesModal() {
    this.openModal(this.cluesModal);
    this.renderCaseBoard();
  }

  renderClues() {
    this.renderCaseBoard();
  }

  renderCaseBoard() {
    if (!this.caseBoardContent) {
      this.caseBoardContent = document.getElementById('case-board-content');
    }
    if (!this.caseBoardContent) return;
    this.caseBoardContent.innerHTML = '';
    const lang = this.state.currentLanguage;
    const tab = this.activeCaseTab || 'active';

    // Update tab button visual active state
    document.querySelectorAll('.case-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });

    if (tab === 'active') {
      // Render Active Inquiry: Case #D4-04
      const activeCase = (typeof ALL_CASES_ARCHIVE !== 'undefined' ? ALL_CASES_ARCHIVE.find(c => c.id === 'case_d4_04') : null) || {
        code: '#D4-04/HOR',
        date: '03:42 AM',
        isKeystoneUnlocked: () => false
      };
      const title = tCase('case_d4_04', 'title', lang);
      const victim = tCase('case_d4_04', 'victim', lang);
      const loc = tCase('case_d4_04', 'location', lang);
      const summary = tCase('case_d4_04', 'summary', lang);
      const pct = this.state.getProgressPercentage();

      const caseHtml = \`
        <div class="case-dossier-hero active-case">
          <div class="case-hero-header">
            <span class="case-hero-code">\${activeCase.code}</span>
            <span class="case-hero-status active">\${t('case_status_active', lang)}</span>
          </div>
          <h3 class="case-hero-title">\${title}</h3>
          <div class="case-hero-meta">
            <span>👤 <strong>\${victim}</strong></span>
            <span>📍 <strong>\${loc}</strong></span>
            <span>⏱️ <strong>\${activeCase.date}</strong></span>
          </div>
          <p class="case-hero-summary">\${summary}</p>
          <div class="case-hero-progress">
            <div class="hud-progress-info">
              <span>\${(typeof PROGRESS_LABELS !== 'undefined' && PROGRESS_LABELS[lang]) || 'PROGRESS'}:</span>
              <span>\${pct}%</span>
            </div>
            <div class="hud-progress-track">
              <div class="hud-progress-fill" style="width: \${pct}%;"></div>
            </div>
          </div>
        </div>

        <div class="case-evidence-section">
          <div class="case-section-heading">
            <span>📌 \${t('modal_clues_title', lang)} (\${this.state.clues.length})</span>
          </div>
          <div class="case-clues-grid" id="active-case-clues-grid">
            \${this.state.clues.length === 0 ? \`
              <div class="case-empty-notice">\${t('clues_empty', lang)}</div>
            \` : this.state.clues.map(clue => {
              const cTitle = tClue(clue.id, 'title', lang) || clue.title;
              const cDesc = tClue(clue.id, 'desc', lang) || clue.desc;
              return \`
                <div class="case-evidence-card">
                  <div class="evidence-card-title">🔍 \${cTitle}</div>
                  <div class="evidence-card-desc">\${cDesc}</div>
                </div>
              \`;
            }).join('')}
          </div>
        </div>
      \`;
      this.caseBoardContent.innerHTML = caseHtml;

    } else if (tab === 'archive') {
      // Render Solved Archive: Cases #D4-01, #D4-02, #D4-03
      const solvedCases = (typeof ALL_CASES_ARCHIVE !== 'undefined' ? ALL_CASES_ARCHIVE.filter(c => c.status === 'solved') : []);
      const solvedListHtml = solvedCases.map(c => {
        const title = tCase(c.id, 'title', lang);
        const victim = tCase(c.id, 'victim', lang);
        const loc = tCase(c.id, 'location', lang);
        const summary = tCase(c.id, 'summary', lang);
        const kName = tCase(c.id, 'keystoneName', lang);
        const kDesc = tCase(c.id, 'keystoneDesc', lang);

        return \`
          <div class="solved-case-dossier-card">
            <div class="solved-case-head">
              <span class="case-hero-code">\${c.code}</span>
              <span class="case-hero-status solved">\${t('case_status_solved', lang)}</span>
            </div>
            <h4 class="solved-case-title">\${c.icon} \${title}</h4>
            <div class="case-hero-meta">
              <span>👤 \${victim}</span>
              <span>📍 \${loc}</span>
              <span>📅 \${c.date}</span>
            </div>
            <p class="solved-case-summary">\${summary}</p>
            <div class="solved-case-keystone">
              <div class="keystone-tag">\${t('keystone_secured', lang)}:</div>
              <div class="keystone-name">\${c.keystoneIcon} \${kName}</div>
              <div class="keystone-desc">\${kDesc}</div>
            </div>
          </div>
        \`;
      }).join('');

      this.caseBoardContent.innerHTML = \`
        <div class="solved-archive-container">
          <div class="archive-intro-box">
            <span>📁 \${t('case_tab_archive', lang)}</span>
            <p>Arsip kasus yang berhasil dipecahkan sebelumnya oleh Detektif Renata Vance di Sektor 7. Setiap kasus yang selesai meninggalkan bukti kunci (Keystone Evidence) yang mengarah pada dalang sindikat rahasia yang sama.</p>
          </div>
          <div class="solved-cases-list">
            \${solvedListHtml}
          </div>
        </div>
      \`;

    } else if (tab === 'master') {
      // Render Grand Master Case: #PRIME-00/OMEGA
      const omegaTitle = tCase('case_prime_omega', 'title', lang);
      const omegaVictim = tCase('case_prime_omega', 'victim', lang);
      const omegaLoc = tCase('case_prime_omega', 'location', lang);
      const omegaSummary = tCase('case_prime_omega', 'summary', lang);

      const k1Name = tCase('case_d4_01', 'keystoneName', lang);
      const k2Name = tCase('case_d4_02', 'keystoneName', lang);
      const k3Name = tCase('case_d4_03', 'keystoneName', lang);
      const k4Name = tCase('case_d4_04', 'keystoneName', lang);

      const k4Unlocked = !!(this.state && (this.state.hasClue('clue_confession_full') || this.state.hasClue('clue_perpetuum_ledger') || (this.state.flags && this.state.flags.case_solved)));

      const masterHtml = \`
        <div class="master-case-hero">
          <div class="case-hero-header">
            <span class="case-hero-code gold">#PRIME-00/OMEGA</span>
            <span class="case-hero-status master">\${t('case_status_master', lang)}</span>
          </div>
          <h3 class="master-hero-title">👑 \${omegaTitle}</h3>
          <div class="case-hero-meta">
            <span>🎯 <strong>\${omegaVictim}</strong></span>
            <span>📍 <strong>\${omegaLoc}</strong></span>
          </div>
          <p class="master-hero-summary">\${omegaSummary}</p>
        </div>

        <div class="master-keystone-network">
          <div class="case-section-heading">
            <span>🕸️ MATRIKS BENANG MERAH KONSPIRASI (KEYSTONE EVIDENCE WEB)</span>
          </div>
          <div class="keystone-grid">
            
            <div class="keystone-node secured">
              <div class="keystone-node-head">
                <span class="keystone-source-code">DARI #D4-01/DRF</span>
                <span class="keystone-status-badge secured">✓ AMAN</span>
              </div>
              <div class="keystone-node-title">📜 \${k1Name}</div>
              <div class="keystone-node-info">Rekening bayangan sindikat & rute kontraband pelabuhan.</div>
            </div>

            <div class="keystone-node secured">
              <div class="keystone-node-head">
                <span class="keystone-source-code">DARI #D4-02/ARS</span>
                <span class="keystone-status-badge secured">✓ AMAN</span>
              </div>
              <div class="keystone-node-title">📄 \${k2Name}</div>
              <div class="keystone-node-info">Keterlibatan Hakim Magistrat kota dalam pencaplokan Menara Irene.</div>
            </div>

            <div class="keystone-node secured">
              <div class="keystone-node-head">
                <span class="keystone-source-code">DARI #D4-03/TNC</span>
                <span class="keystone-status-badge secured">✓ AMAN</span>
              </div>
              <div class="keystone-node-title">🩸 \${k3Name}</div>
              <div class="keystone-node-info">Formula racun sianida prusat pembungkam saksi kunci.</div>
            </div>

            <div class="keystone-node \${k4Unlocked ? 'secured' : 'pending'}">
              <div class="keystone-node-head">
                <span class="keystone-source-code">DARI #D4-04/HOR</span>
                <span class="keystone-status-badge \${k4Unlocked ? 'secured' : 'pending'}">\${k4Unlocked ? '✓ TERBONGKAR' : '⏳ DALAM INKUIRI'}</span>
              </div>
              <div class="keystone-node-title">🗝️ \${k4Name}</div>
              <div class="keystone-node-info">\${k4Unlocked ? 'Pengakuan pembunuhan & bukti transaksi suap 50.000 guilder terbongkar!' : 'Sedang diselidiki di Menara Irene: brankas rahasia & pengakuan dalang.'}</div>
            </div>

          </div>

          <div class="master-action-box">
            <button id="btn-synthesize-master-case" class="action-btn-large \${k4Unlocked ? 'ready' : ''}" style="width: 100%;">
              ⚖️ \${t('btn_synthesize_master', lang)}
            </button>
            <div class="master-synthesis-hint">
              \${k4Unlocked ? t('master_synthesis_ready', lang) : t('master_synthesis_not_ready', lang)}
            </div>
          </div>
        </div>
      \`;

      this.caseBoardContent.innerHTML = masterHtml;

      document.getElementById('btn-synthesize-master-case')?.addEventListener('click', () => {
        if (k4Unlocked) {
          audio.playVictoryChime();
          this.showToast(\`👑 \${t('master_synthesis_ready', lang)}\`);
        } else {
          audio.playUiClick();
          this.showToast(\`⚠️ \${t('master_synthesis_not_ready', lang)}\`);
        }
      });
    }
  }`;

content = content.replace(oldOpenClues.replace(/\r?\n/g, '\r\n'), newOpenClues.replace(/\n/g, '\r\n'));
if (!content.includes('renderCaseBoard()')) {
  content = content.replace(oldOpenClues.replace(/\r?\n/g, '\n'), newOpenClues);
}

// 6. In applyLanguage, update case tabs labels
const oldApplyClues = `    const clueTitle = document.querySelector('#clues-modal .modal-title');
    if (clueTitle) clueTitle.textContent = t('modal_clues_title', currentLang);`;

const newApplyClues = `    const clueTitle = document.querySelector('#clues-modal .modal-title');
    if (clueTitle) clueTitle.textContent = t('modal_clues_title', currentLang);
    const tabActiveLabel = document.getElementById('tab-case-active-label');
    if (tabActiveLabel) tabActiveLabel.textContent = t('case_tab_active', currentLang);
    const tabArchiveLabel = document.getElementById('tab-case-archive-label');
    if (tabArchiveLabel) tabArchiveLabel.textContent = t('case_tab_archive', currentLang);
    const tabMasterLabel = document.getElementById('tab-case-master-label');
    if (tabMasterLabel) tabMasterLabel.textContent = t('case_tab_master', currentLang);
    if (this.cluesModal && this.cluesModal.classList.contains('open')) {
      this.renderCaseBoard();
    }`;

content = content.replace(oldApplyClues.replace(/\r?\n/g, '\r\n'), newApplyClues.replace(/\n/g, '\r\n'));
if (!content.includes('tab-case-active-label')) {
  content = content.replace(oldApplyClues.replace(/\r?\n/g, '\n'), newApplyClues);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated ui.js with renderCaseBoard and multi-case navigation!');
