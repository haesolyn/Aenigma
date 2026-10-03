const fs = require('fs');
const path = require('path');

// ============================================================================
// 1. Update src/cases.js dates
// ============================================================================
const casesPath = path.join(__dirname, '..', 'src', 'cases.js');
let casesContent = fs.readFileSync(casesPath, 'utf8');

casesContent = casesContent.replace(
  "date: 'Hari Ini · 03:42 AM',",
  "dateKey: 'case_date_today',\r\n    date: 'Today · 03:42 AM',"
);
casesContent = casesContent.replace(
  "date: 'Sintesis Penyelidikan Terakhir',",
  "dateKey: 'case_date_final',\r\n    date: 'Grand Synthesis',"
);

fs.writeFileSync(casesPath, casesContent, 'utf8');
console.log('1. Updated src/cases.js with dateKeys.');

// ============================================================================
// 2. Update src/i18n.js with localized strings for all languages
// ============================================================================
const i18nPath = path.join(__dirname, '..', 'src', 'i18n.js');
let i18nContent = fs.readFileSync(i18nPath, 'utf8');

const idAdditions = `    archive_intro_text: 'Arsip kasus yang berhasil dipecahkan sebelumnya oleh Detektif Renata Vance di Sektor 7. Setiap kasus yang selesai meninggalkan bukti kunci (Keystone Evidence) yang mengarah pada dalang sindikat rahasia yang sama.',
    keystone_network_title: 'MATRIKS BENANG MERAH KONSPIRASI (KEYSTONE EVIDENCE WEB)',
    from_prefix: 'DARI',
    status_secured: '✓ AMAN',
    status_unmasked: '✓ TERBONGKAR',
    status_inquiry: '⏳ DALAM INKUIRI',
    k4_unlocked_desc: 'Pengakuan pembunuhan & bukti transaksi suap 50.000 guilder terbongkar!',
    k4_pending_desc: 'Sedang diselidiki di Menara Irene: brankas rahasia & pengakuan dalang.',
    case_date_today: 'Hari Ini · 03:42 AM',
    case_date_final: 'Sintesis Penyelidikan Terakhir',
`;

const enAdditions = `    archive_intro_text: 'Archive of previous homicide cases solved by Detective Renata Vance in District 7. Each resolved case uncovered a vital Keystone Evidence connecting to the same covert syndicate.',
    keystone_network_title: 'KEYSTONE EVIDENCE & CONSPIRACY WEB',
    from_prefix: 'FROM',
    status_secured: '✓ SECURED',
    status_unmasked: '✓ EXPOSED',
    status_inquiry: '⏳ IN INQUIRY',
    k4_unlocked_desc: 'Murder confession & 50,000 guilder bribery records fully exposed!',
    k4_pending_desc: 'Active inquiry in Saint Irene: search floorboard safe & extract suspect confession.',
    case_date_today: 'Today · 03:42 AM',
    case_date_final: 'Grand Inquiry Synthesis',
`;

const jaAdditions = `    archive_intro_text: 'レナータ・ヴァンス刑事が第7区で以前に解決した殺人事件の記録。解決した各事件は、同一の地下組織へと繋がる決定的な鍵証拠を残している。',
    keystone_network_title: '決定的証拠の相関陰謀網',
    from_prefix: '出処',
    status_secured: '✓ 確保済',
    status_unmasked: '✓ 暴露済',
    status_inquiry: '⏳ 捜査中',
    k4_unlocked_desc: '暗殺の自白と5万ギルダーの買収台帳が完全に露呈！',
    k4_pending_desc: '聖アイリーン塔にて捜査中：床下の金庫を捜索し、容疑者の自白を引き出せ。',
    case_date_today: '本日 · 午前03:42',
    case_date_final: '全事件総合立証',
`;

const zhAdditions = `    archive_intro_text: '雷娜塔·万斯探长此前在第七区成功告破的谋杀案卷。每起案件结案后均留下一项关键铁证，直指同一幕后黑金结社。',
    keystone_network_title: '核心罪证与全域阴谋网络',
    from_prefix: '来自',
    status_secured: '✓ 已锁定',
    status_unmasked: '✓ 彻底曝光',
    status_inquiry: '⏳ 侦查中',
    k4_unlocked_desc: '谋杀买凶自白与5万盾巨额贿赂账目已彻底浮出水面！',
    k4_pending_desc: '圣艾琳钟楼现场侦查中：搜查暗格保险箱并撬开嫌疑人口供。',
    case_date_today: '今日 · 凌晨03:42',
    case_date_final: '终极调查综合研判',
`;

const koAdditions = `    archive_intro_text: '레나타 반스 형사가 제7구역에서 이전에 해결한 살인 사건 기록입니다. 해결된 각 사건은 동일한 암흑 신디케이트로 이어지는 결정적 핵심 단서를 남겼습니다.',
    keystone_network_title: '핵심 증거 연계 및 거대 음모망',
    from_prefix: '출처',
    status_secured: '✓ 확보됨',
    status_unmasked: '✓ 진상 규명',
    status_inquiry: '⏳ 수사 진행 중',
    k4_unlocked_desc: '살인 청부 자백과 5만 길더 뇌물 장부가 완전히 드러났습니다!',
    k4_pending_desc: '성 아이린 탑 현장 수사 중: 바닥 금고를 수색하고 용의자의 자백을 확보하십시오.',
    case_date_today: '오늘 · 오전 03:42',
    case_date_final: '최종 종합 수사 결론',
`;

i18nContent = i18nContent.replace("case_badge: 'KASUS #D4-04',\r\n", "case_badge: 'KASUS #D4-04',\r\n" + idAdditions);
i18nContent = i18nContent.replace("case_badge: 'CASE #D4-04',\r\n", "case_badge: 'CASE #D4-04',\r\n" + enAdditions);
i18nContent = i18nContent.replace("case_badge: '事件 #D4-04',\r\n", "case_badge: '事件 #D4-04',\r\n" + jaAdditions);
i18nContent = i18nContent.replace("case_badge: '案件 #D4-04',\r\n", "case_badge: '案件 #D4-04',\r\n" + zhAdditions);
i18nContent = i18nContent.replace("case_badge: '사건 #D4-04',\r\n", "case_badge: '사건 #D4-04',\r\n" + koAdditions);

fs.writeFileSync(i18nPath, i18nContent, 'utf8');
console.log('2. Updated src/i18n.js with localized strings.');

// ============================================================================
// 3. Update src/ui.js renderCaseBoard to use localized strings
// ============================================================================
const uiPath = path.join(__dirname, '..', 'src', 'ui.js');
let uiContent = fs.readFileSync(uiPath, 'utf8');

// Replace renderCaseBoard in ui.js with fully localized logic
const oldRenderCaseBoardRegex = /renderCaseBoard\(\)\s*\{[\s\S]*?document\.getElementById\('btn-synthesize-master-case'\)\?\.addEventListener\('click'[\s\S]*?\}\);\s*\}\s*\}/;

const newRenderCaseBoard = `renderCaseBoard() {
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
        dateKey: 'case_date_today',
        date: 'Today · 03:42 AM',
        isKeystoneUnlocked: () => false
      };
      const title = tCase('case_d4_04', 'title', lang);
      const victim = tCase('case_d4_04', 'victim', lang);
      const loc = tCase('case_d4_04', 'location', lang);
      const summary = tCase('case_d4_04', 'summary', lang);
      const dateText = t(activeCase.dateKey, lang) || activeCase.date;
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
            <span>⏱️ <strong>\${dateText}</strong></span>
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
        const dateText = t(c.dateKey, lang) || c.date;

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
              <span>📅 \${dateText}</span>
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
            <p>\${t('archive_intro_text', lang)}</p>
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
      const k1Desc = tCase('case_d4_01', 'keystoneDesc', lang);
      const k2Name = tCase('case_d4_02', 'keystoneName', lang);
      const k2Desc = tCase('case_d4_02', 'keystoneDesc', lang);
      const k3Name = tCase('case_d4_03', 'keystoneName', lang);
      const k3Desc = tCase('case_d4_03', 'keystoneDesc', lang);
      const k4Name = tCase('case_d4_04', 'keystoneName', lang);

      const k4Unlocked = !!(this.state && (this.state.hasClue('clue_confession_full') || this.state.hasClue('clue_perpetuum_ledger') || (this.state.flags && this.state.flags.case_solved)));
      const k4Desc = k4Unlocked ? t('k4_unlocked_desc', lang) : t('k4_pending_desc', lang);

      const fromPrefix = t('from_prefix', lang);
      const statusSecured = t('status_secured', lang);
      const statusK4 = k4Unlocked ? t('status_unmasked', lang) : t('status_inquiry', lang);

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
            <span>🕸️ \${t('keystone_network_title', lang)}</span>
          </div>
          <div class="keystone-grid">
            
            <div class="keystone-node secured">
              <div class="keystone-node-head">
                <span class="keystone-source-code">\${fromPrefix} #D4-01/DRF</span>
                <span class="keystone-status-badge secured">\${statusSecured}</span>
              </div>
              <div class="keystone-node-title">📜 \${k1Name}</div>
              <div class="keystone-node-info">\${k1Desc}</div>
            </div>

            <div class="keystone-node secured">
              <div class="keystone-node-head">
                <span class="keystone-source-code">\${fromPrefix} #D4-02/ARS</span>
                <span class="keystone-status-badge secured">\${statusSecured}</span>
              </div>
              <div class="keystone-node-title">📄 \${k2Name}</div>
              <div class="keystone-node-info">\${k2Desc}</div>
            </div>

            <div class="keystone-node secured">
              <div class="keystone-node-head">
                <span class="keystone-source-code">\${fromPrefix} #D4-03/TNC</span>
                <span class="keystone-status-badge secured">\${statusSecured}</span>
              </div>
              <div class="keystone-node-title">🩸 \${k3Name}</div>
              <div class="keystone-node-info">\${k3Desc}</div>
            </div>

            <div class="keystone-node \${k4Unlocked ? 'secured' : 'pending'}">
              <div class="keystone-node-head">
                <span class="keystone-source-code">\${fromPrefix} #D4-04/HOR</span>
                <span class="keystone-status-badge \${k4Unlocked ? 'secured' : 'pending'}">\${statusK4}</span>
              </div>
              <div class="keystone-node-title">🗝️ \${k4Name}</div>
              <div class="keystone-node-info">\${k4Desc}</div>
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

uiContent = uiContent.replace(oldRenderCaseBoardRegex, newRenderCaseBoard);
fs.writeFileSync(uiPath, uiContent, 'utf8');
console.log('3. Updated src/ui.js renderCaseBoard without hardcoded Indonesian.');
