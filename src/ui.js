// Aenigma Master UI Controller & Interaction Engine
import { audio } from './audio.js';
import { SUPPORTED_LANGUAGES, PROGRESS_LABELS, DISTRICT_LABELS, t, tItem, tPoi, tClue, tSkill, tGameOver, getLocalizedDialogueNode, tVice, tThought, tCase } from './i18n.js';
import { THOUGHTS_CATALOG } from './thoughts.js';
import { CASE_DATA, ALL_CASES_ARCHIVE } from './cases.js';
import { DiceEngine } from './dice.js';

export class UIController {
  constructor(state) {
    this.state = state;
    this.caseData = CASE_DATA;
    this.diceEngine = new DiceEngine(state);
    this.currentNodeId = null;
    this.currentInterlocutor = 'Forensic Observation';
    this.activePoi = null;
    this.activeCaseTab = 'active';

    this.initElements();
    this.initLanguageSelector();
    this.bindEvents();
    this.applyLanguage(this.state.currentLanguage);
  }

  initElements() {
    // Stage views
    this.loadingStage = document.getElementById('loading-stage');
    this.creatorStage = document.getElementById('creator-stage');
    this.gameStage = document.getElementById('main-game-stage') || document.getElementById('app-container');

    // Modals
    this.cabinetModal = document.getElementById('cabinet-modal');
    this.inventoryModal = document.getElementById('inventory-modal');
    this.cluesModal = document.getElementById('clues-modal');
    this.diceModal = document.getElementById('dice-modal');
    this.victoryModal = document.getElementById('victory-modal');
    this.languageModal = document.getElementById('language-modal');
    this.gameoverModal = document.getElementById('gameover-modal');
    this.profileModal = document.getElementById('profile-modal');

    // Header buttons & preview stats
    this.hudBtnProfile = document.getElementById('hud-btn-profile');
    this.hudBtnCase = document.getElementById('hud-btn-case');
    this.hudHpPreview = document.getElementById('hud-hp-preview');
    this.hudSpPreview = document.getElementById('hud-sp-preview');
    this.hudAvatarImg = document.getElementById('hud-avatar-img');
    this.detNameEl = document.getElementById('hud-detective-name');
    this.detAliasEl = document.getElementById('hud-detective-alias');
    this.healthPipsContainer = document.getElementById('health-pips');
    this.moralePipsContainer = document.getElementById('morale-pips');
    this.hudTimeEl = document.getElementById('hud-time-display');

    // Scene & Dialogue
    this.sceneCanvas = document.getElementById('scene-markers-layer');
    this.dialogueFeed = document.getElementById('dialogue-feed');
    this.dialogueChoices = document.getElementById('dialogue-choices');
    this.interlocutorNameEl = document.getElementById('current-speaker-title');

    // Modals content containers
    this.thoughtNodesContainer = document.getElementById('thought-nodes-container');
    this.thoughtInspector = document.getElementById('thought-inspector');
    this.inventoryContainer = document.getElementById('inventory-items-container');
    this.cluesContainer = document.getElementById('clues-list-container');
    this.caseBoardContent = document.getElementById('case-board-content');
    this.caseBoardTabBar = document.getElementById('case-board-tab-bar');
    this.toastContainer = document.getElementById('notification-toast-container');
  }

  initLanguageSelector() {
    // Nav & stage language trigger buttons
    document.getElementById('nav-btn-language')?.addEventListener('click', () => {
      this.openLanguageModal();
    });
    document.getElementById('loader-lang-btn')?.addEventListener('click', () => {
      this.openLanguageModal();
    });
    document.getElementById('creator-lang-btn')?.addEventListener('click', () => {
      this.openLanguageModal();
    });

    // Game over restart button
    document.getElementById('btn-retry-inquiry')?.addEventListener('click', () => {
      this.closeModal(this.gameoverModal);
      this.state.reset();

      // Cleanly clear red vignette & critical pulse
      if (typeof document !== 'undefined' && document.body) {
        document.body.classList.remove('in-danger');
      }
      if (typeof audio !== 'undefined' && audio) {
        if (audio.setHeartbeatActive) audio.setHeartbeatActive(false);
        if (audio.playUiClick) audio.playUiClick();
      }

      this.updateHUD();
      this.activePoi = null;
      this.currentNodeId = null;
      this.applyLanguage(this.state.currentLanguage);
      this.renderSceneMarkers();
      this.dialogueFeed.innerHTML = '';
      this.dialogueChoices.innerHTML = `<div style="color:var(--text-muted);font-style:italic;padding:12px;">${t('scene_location', this.state.currentLanguage)}</div>`;
    });
  }

  openLanguageModal() {
    this.openModal(this.languageModal);
    this.renderLanguageList();
  }

  renderLanguageList() {
    const grid = document.getElementById('language-options-grid');
    if (!grid) return;
    grid.innerHTML = '';

    SUPPORTED_LANGUAGES.forEach(langObj => {
      const card = document.createElement('div');
      card.className = `lang-card ${this.state.currentLanguage === langObj.code ? 'active' : ''}`;
      card.innerHTML = `
        <span class="lang-flag">${langObj.flag}</span>
        <div class="lang-names">
          <span class="lang-native">${langObj.native}</span>
          <span class="lang-code">${langObj.name} · [${langObj.code.toUpperCase()}]</span>
        </div>
      `;
      card.addEventListener('click', () => {
        audio.playRadioTune();
        this.state.setLanguage(langObj.code);
        this.applyLanguage(langObj.code);
        this.closeModal(this.languageModal);
        this.showToast(`🌐 ${t('modal_language_title', langObj.code)}: ${langObj.native}`);
      });
      grid.appendChild(card);
    });
  }

  applyLanguage(lang) {
    const currentLang = UI_TRANSLATIONS[lang] ? lang : 'en';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = (currentLang === 'ar') ? 'rtl' : 'ltr';

    // Update active language labels in buttons
    const langObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLang) || SUPPORTED_LANGUAGES[0];
    const langLabel = document.getElementById('current-lang-label');
    if (langLabel) {
      langLabel.textContent = `${t('nav_language', currentLang).toUpperCase()}: ${langObj.native.toUpperCase()}`;
    }
    document.querySelectorAll('.stage-lang-btn .lang-label').forEach(el => {
      el.textContent = langObj.native.toUpperCase();
    });

    // Update Stage 1 texts & loading indicators in active language
    const quoteEl = document.getElementById('loader-quote-text');
    if (quoteEl) quoteEl.textContent = t('loader_quote', currentLang);
    const telemetryEl = document.getElementById('loader-telemetry-text');
    if (telemetryEl) {
      const enterBtn = document.getElementById('loader-enter-btn');
      if (enterBtn && enterBtn.classList.contains('ready') && typeof TELEMETRY_PHASES_I18N !== 'undefined') {
        const activePhases = TELEMETRY_PHASES_I18N[currentLang] || TELEMETRY_PHASES_I18N['en'];
        const finalPhase = activePhases[activePhases.length - 1];
        if (finalPhase) telemetryEl.textContent = finalPhase.text;
      } else {
        telemetryEl.textContent = t('loader_telemetry', currentLang);
      }
    }
    const enterBtn = document.getElementById('loader-enter-btn');
    if (enterBtn) enterBtn.textContent = t('loader_enter', currentLang);
    const sectorBadge = document.querySelector('.loader-sector-badge');
    if (sectorBadge && typeof LOADER_DECRYPT_I18N !== 'undefined') {
      const dec = LOADER_DECRYPT_I18N[currentLang] || LOADER_DECRYPT_I18N['en'];
      if (dec && dec.sector_badge) sectorBadge.textContent = dec.sector_badge;
    }

    // Update Stage 2 Character Creator texts
    const creatorTitle = document.getElementById('creator-dossier-title') || document.querySelector('.creator-section-title span:first-child');
    if (creatorTitle) creatorTitle.textContent = t('creator_title', currentLang);
    const creatorSub = document.getElementById('creator-dossier-subtitle') || document.querySelector('.creator-section-title span:last-child');
    if (creatorSub) creatorSub.textContent = t('creator_subtitle', currentLang);
    const precinctSubtext = document.getElementById('creator-precinct-subtext');
    if (precinctSubtext) precinctSubtext.textContent = t('precinct_label', currentLang);
    const nameLabel = document.getElementById('creator-name-label');
    if (nameLabel) nameLabel.textContent = t('name_label', currentLang);
    const aliasLabel = document.getElementById('creator-alias-label');
    if (aliasLabel) aliasLabel.textContent = t('alias_label', currentLang);
    const facetsTitle = document.getElementById('creator-facets-title');
    if (facetsTitle) facetsTitle.textContent = t('facets_title', currentLang);
    const pointsPool = document.getElementById('creator-points-pool');
    if (pointsPool) {
      const match = pointsPool.textContent.match(/\d+/);
      const pts = match ? match[0] : '4';
      pointsPool.textContent = `${pts} ${t('points_available', currentLang)}`;
    }

    // Attributes labels & descriptions
    const attrPairs = [
      { id: 'intellect', name: 'intellect_name', desc: 'intellect_desc' },
      { id: 'psyche', name: 'psyche_name', desc: 'psyche_desc' },
      { id: 'physique', name: 'physique_name', desc: 'physique_desc' },
      { id: 'motorics', name: 'motorics_name', desc: 'motorics_desc' }
    ];
    attrPairs.forEach(a => {
      const nameEl = document.getElementById(`attr-name-${a.id}`);
      if (nameEl) nameEl.textContent = t(a.name, currentLang);
      const descEl = document.getElementById(`attr-desc-${a.id}`);
      if (descEl) descEl.textContent = t(a.desc, currentLang);
    });

    // Signature skill section
    const sigTitle = document.getElementById('creator-signature-title');
    if (sigTitle) sigTitle.textContent = t('signature_title', currentLang);
    const skillIcons = { esoterica: '🔮', logic: '🟦', empathy: '💜', perception: '👁️', endurance: '🩸', authority: '⚖️' };
    document.querySelectorAll('.sig-skill-btn').forEach(btn => {
      const skillKey = btn.dataset.skill;
      if (skillKey) {
        const icon = skillIcons[skillKey] || '✨';
        btn.textContent = `${icon} ${tSkill(skillKey, currentLang).toUpperCase()}`;
      }
    });

    // Vices section
    const vicesTitle = document.getElementById('creator-vices-title');
    if (vicesTitle) vicesTitle.textContent = t('vices_title', currentLang);
    document.querySelectorAll('.vice-card').forEach(card => {
      const vKey = card.dataset.vice;
      if (vKey) {
        const vTitle = card.querySelector('.vice-title');
        if (vTitle) vTitle.textContent = tVice(vKey, 'title', currentLang);
        const vDesc = card.querySelector('.vice-desc');
        if (vDesc) vDesc.textContent = tVice(vKey, 'desc', currentLang);
      }
    });

    const btnFemale = document.getElementById('btn-gender-female');
    if (btnFemale) btnFemale.textContent = t('gender_female', currentLang);
    const btnMale = document.getElementById('btn-gender-male');
    if (btnMale) btnMale.textContent = t('gender_male', currentLang);
    const btnRand = document.getElementById('btn-randomize-identity');
    if (btnRand) btnRand.textContent = t('randomize_dossier', currentLang);
    const startInquiryBtn = document.getElementById('creator-start-btn');
    if (startInquiryBtn) startInquiryBtn.textContent = t('start_inquiry', currentLang);

    // Update Header HUD
    const caseBadge = document.querySelector('.case-badge');
    if (caseBadge) caseBadge.textContent = t('case_badge', currentLang);
    const caseBadgeText = document.getElementById('case-badge-text');
    if (caseBadgeText) caseBadgeText.textContent = t('case_badge', currentLang);

    const tabCabinetText = document.getElementById('tab-cabinet-text');
    if (tabCabinetText) tabCabinetText.textContent = t('nav_cabinet', currentLang);
    const tabCluesText = document.getElementById('tab-clues-text');
    if (tabCluesText) tabCluesText.textContent = t('nav_clues', currentLang);
    const tabInvText = document.getElementById('tab-inv-text');
    if (tabInvText) tabInvText.textContent = t('nav_inventory', currentLang);

    const audioLabel = document.getElementById('audio-btn-label');
    if (audioLabel) {
      audioLabel.textContent = audio.isMuted ? t('audio_off', currentLang) : t('audio_on', currentLang);
    }
    const interlocutorStatus = document.getElementById('interlocutor-status-text');
    if (interlocutorStatus) interlocutorStatus.textContent = t('interlocutor_active', currentLang);

    const healthLabel = document.querySelector('.meter-label-row.health span:first-child');
    if (healthLabel) healthLabel.textContent = t('endurance_label', currentLang);
    const moraleLabel = document.querySelector('.meter-label-row.morale span:first-child');
    if (moraleLabel) moraleLabel.textContent = t('morale_label', currentLang);

    // Update Progress Title & Meter
    const progressTitle = document.getElementById('hud-progress-title');
    if (progressTitle) {
      progressTitle.textContent = PROGRESS_LABELS ? (PROGRESS_LABELS[currentLang] || 'PROGRESS') : 'PROGRESS';
    }
    this.updateProgressMeter();

    // Update Scene Overlay
    const sceneLoc = document.querySelector('.scene-location-title');
    if (sceneLoc) sceneLoc.textContent = t('scene_location', currentLang);
    const sceneTime = document.querySelector('.scene-time-stamp');
    if (sceneTime) sceneTime.textContent = t('scene_timestamp', currentLang);
    const hudToggleTitle = document.querySelector('.hud-toggle-title');
    if (hudToggleTitle) hudToggleTitle.textContent = DISTRICT_LABELS ? (DISTRICT_LABELS[currentLang] || 'DISTRICT 7') : 'DISTRICT 7';

    const markersLabel = document.getElementById('toggle-markers-label');
    if (markersLabel) {
      const isHidden = document.getElementById('scene-viewport')?.classList.contains('markers-hidden');
      markersLabel.textContent = isHidden ? t('scene_btn_hidden', currentLang) : t('scene_btn_markers', currentLang);
    }
    const diceTallyLabel = document.getElementById('dice-tally-label');
    if (diceTallyLabel) diceTallyLabel.textContent = t('dice_tally', currentLang);

    // Update Profile Modal Static Labels
    const profTitle = document.getElementById('profile-modal-title');
    if (profTitle) profTitle.textContent = t('profile_modal_title', currentLang);
    const profVitalsTitle = document.getElementById('profile-vitals-title');
    if (profVitalsTitle) profVitalsTitle.textContent = t('profile_vitals_title', currentLang);
    const profProgHeader = document.getElementById('profile-progress-header');
    if (profProgHeader) profProgHeader.textContent = t('profile_progress_header', currentLang);
    const profTimeLabel = document.getElementById('profile-time-label');
    if (profTimeLabel) profTimeLabel.textContent = t('profile_time_label', currentLang);
    const profFacetsTitle = document.getElementById('profile-facets-title');
    if (profFacetsTitle) profFacetsTitle.textContent = t('facets_title', currentLang);
    const profSigLabel = document.getElementById('profile-sig-label');
    if (profSigLabel) profSigLabel.textContent = t('signature_title', currentLang);
    const profViceLabel = document.getElementById('profile-vice-label');
    if (profViceLabel) profViceLabel.textContent = t('vices_title', currentLang);
    const profPrecinctText = document.getElementById('profile-precinct-text');
    if (profPrecinctText) profPrecinctText.textContent = t('precinct_label', currentLang);
    const profHpTitle = document.getElementById('profile-health-title');
    if (profHpTitle) profHpTitle.textContent = `${t('endurance_label', currentLang)} (HP)`;
    const profSpTitle = document.getElementById('profile-morale-title');
    if (profSpTitle) profSpTitle.textContent = `${t('morale_label', currentLang)} (SP)`;
    const profProgTitle = document.getElementById('profile-progress-title');
    if (profProgTitle) profProgTitle.textContent = PROGRESS_LABELS ? (PROGRESS_LABELS[currentLang] || 'PROGRESS') : 'PROGRESS';

    const fIntLabel = document.getElementById('profile-facet-intellect-label');
    if (fIntLabel) fIntLabel.textContent = t('intellect_name', currentLang).toUpperCase();
    const fPsyLabel = document.getElementById('profile-facet-psyche-label');
    if (fPsyLabel) fPsyLabel.textContent = t('psyche_name', currentLang).toUpperCase();
    const fPhyLabel = document.getElementById('profile-facet-physique-label');
    if (fPhyLabel) fPhyLabel.textContent = t('physique_name', currentLang).toUpperCase();
    const fMotLabel = document.getElementById('profile-facet-motorics-label');
    if (fMotLabel) fMotLabel.textContent = t('motorics_name', currentLang).toUpperCase();

    this.renderProfile();

    // Update Modals Titles
    const cabTitle = document.querySelector('#cabinet-modal .modal-title');
    if (cabTitle) cabTitle.textContent = t('modal_cabinet_title', currentLang);
    const invTitle = document.querySelector('#inventory-modal .modal-title');
    if (invTitle) invTitle.textContent = t('modal_inventory_title', currentLang);
    const clueTitle = document.querySelector('#clues-modal .modal-title');
    if (clueTitle) clueTitle.textContent = t('modal_clues_title', currentLang);
    const tabActiveLabel = document.getElementById('tab-case-active-label');
    if (tabActiveLabel) tabActiveLabel.textContent = t('case_tab_active', currentLang);
    const tabArchiveLabel = document.getElementById('tab-case-archive-label');
    if (tabArchiveLabel) tabArchiveLabel.textContent = t('case_tab_archive', currentLang);
    const tabMasterLabel = document.getElementById('tab-case-master-label');
    if (tabMasterLabel) tabMasterLabel.textContent = t('case_tab_master', currentLang);
    if (this.cluesModal && this.cluesModal.classList.contains('open')) {
      this.renderCaseBoard();
    }
    const langModalTitle = document.getElementById('language-modal-title');
    if (langModalTitle) langModalTitle.textContent = t('modal_language_title', currentLang);
    const vicTitle = document.querySelector('#victory-modal .modal-title');
    if (vicTitle) vicTitle.textContent = t('modal_victory_title', currentLang);
    const restartBtn = document.getElementById('btn-restart-inquiry');
    if (restartBtn) restartBtn.textContent = t('btn_restart', currentLang);

    // Refresh dynamic scene markers & tooltips
    this.renderSceneMarkers();

    // Refresh all evidence banners in feed
    this.dialogueFeed.querySelectorAll('.inspection-evidence-banner').forEach(banner => {
      const poiId = banner.dataset.poiId;
      if (poiId) {
        const bTitle = banner.querySelector('.evidence-poi-title');
        if (bTitle) bTitle.textContent = tPoi(poiId, 'title', currentLang);
        const bDesc = banner.querySelector('.evidence-poi-desc');
        if (bDesc) bDesc.textContent = tPoi(poiId, 'description', currentLang);
      }
    });

    // Refresh active dialogue node and all past feed entries
    this.retranslateCurrentDialogue();

    // Refresh open modals
    if (this.inventoryModal && this.inventoryModal.classList.contains('open')) {
      this.renderInventory();
    }
    if (this.cluesModal && this.cluesModal.classList.contains('open')) {
      this.renderClues();
    }
    if (this.cabinetModal && this.cabinetModal.classList.contains('open')) {
      this.renderCabinet();
    }
  }

  retranslateCurrentDialogue() {
    const currentLang = this.state.currentLanguage;

    // Retranslate ALL past dialogue entries in feed
    this.dialogueFeed.querySelectorAll('.dialogue-entry').forEach(entry => {
      const nodeId = entry.dataset.nodeId;
      if (nodeId && this.caseData.dialogueNodes[nodeId]) {
        const baseNode = this.caseData.dialogueNodes[nodeId];
        const node = getLocalizedDialogueNode(nodeId, currentLang, baseNode);
        const speakerLabel = entry.querySelector('.speaker-label');
        if (speakerLabel) speakerLabel.textContent = node.speaker || 'Narrative';
        const prose = entry.querySelector('.speaker-prose');
        if (prose) prose.textContent = node.text;

        const voiceBlocks = entry.querySelectorAll('.inner-voice-block');
        if (node.voices && node.voices.length > 0) {
          node.voices.forEach((v, idx) => {
            if (voiceBlocks[idx]) {
              const badge = voiceBlocks[idx].querySelector('.voice-badge');
              if (badge) badge.textContent = v.badge;
              const voiceProse = voiceBlocks[idx].querySelector('.voice-prose');
              if (voiceProse) voiceProse.textContent = `"${v.text}"`;
            }
          });
        }
      }
    });

    // Update current active interlocutor bar
    if (this.currentNodeId) {
      const baseNode = this.caseData.dialogueNodes[this.currentNodeId];
      if (baseNode) {
        const node = getLocalizedDialogueNode(this.currentNodeId, currentLang, baseNode);
        if (this.interlocutorNameEl) {
          this.interlocutorNameEl.textContent = node.speaker || t('speaker_forensic', currentLang);
        }
        // Re-render active options in current language
        this.renderChoices(node.options);
      }
    } else {
      if (this.interlocutorNameEl) {
        this.interlocutorNameEl.textContent = t('speaker_forensic', currentLang);
      }
      this.dialogueChoices.innerHTML = `<div style="color:var(--text-muted);font-style:italic;padding:12px;">${t('dialogue_idle_prompt', currentLang)}</div>`;
    }
  }

  bindEvents() {
    // Close modal buttons
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal-backdrop');
        if (modal) this.closeModal(modal);
      });
    });

    // Close on backdrop click
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeModal(modal);
      });
    });

    // Tab buttons with tactile paper audio
    document.getElementById('nav-btn-cabinet')?.addEventListener('click', () => {
      audio.playTabSwitch();
      this.openCabinetModal();
    });
    document.getElementById('nav-btn-inventory')?.addEventListener('click', () => {
      audio.playTabSwitch();
      this.openInventoryModal();
    });
    document.getElementById('nav-btn-clues')?.addEventListener('click', () => {
      audio.playTabSwitch();
      this.openCluesModal();
    });
    document.getElementById('nav-btn-audio')?.addEventListener('click', (e) => {
      const isMuted = audio.toggleMute();
      e.currentTarget.classList.toggle('muted', isMuted);
      const label = document.getElementById('audio-btn-label');
      if (label) {
        label.textContent = isMuted ? 'AUDIO: OFF' : 'AUDIO: ON';
      }
    });

    // Collapsible, Transparent & Dismissible Bottom-Left Scene HUD Toggle
    const toggleSceneHudBtn = document.getElementById('btn-toggle-scene-hud');
    const dismissSceneHudBtn = document.getElementById('btn-dismiss-scene-hud');
    const restoreSceneHudBtn = document.getElementById('btn-restore-scene-hud');
    const sceneHud = document.getElementById('scene-overlay-hud');

    if (toggleSceneHudBtn && sceneHud) {
      toggleSceneHudBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sceneHud.classList.toggle('minimized');
        audio.playHudToggle();
      });
      sceneHud.addEventListener('click', (e) => {
        if (e.target.closest('#btn-dismiss-scene-hud')) return;
        if (sceneHud.classList.contains('minimized')) {
          sceneHud.classList.remove('minimized');
          audio.playHudToggle();
        }
      });
    }

    if (dismissSceneHudBtn && sceneHud && restoreSceneHudBtn) {
      dismissSceneHudBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sceneHud.classList.add('dismissed');
        restoreSceneHudBtn.classList.remove('hidden');
        audio.playHudToggle();
      });

      restoreSceneHudBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sceneHud.classList.remove('dismissed');
        sceneHud.classList.remove('minimized');
        restoreSceneHudBtn.classList.add('hidden');
        audio.playHudToggle();
      });
    }

    // Case Board Tabs Switcher
    document.querySelectorAll('.case-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.dataset.tab;
        if (tab) {
          this.activeCaseTab = tab;
          audio.playTabSwitch();
          this.renderCaseBoard();
        }
      });
    });

    // Header Quick Triggers: Profile Dossier & Case Overview
    document.getElementById('hud-btn-profile')?.addEventListener('click', () => {
      audio.playTabSwitch();
      this.openProfileModal();
    });
    document.getElementById('hud-btn-case')?.addEventListener('click', () => {
      audio.playTabSwitch();
      this.openCluesModal();
    });

    // Scene Toolbar Controls: Show/Hide POI Indicators
    const toggleMarkersBtn = document.getElementById('btn-toggle-poi-markers');
    const sceneViewport = document.getElementById('scene-viewport');

    if (toggleMarkersBtn && sceneViewport) {
      toggleMarkersBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = sceneViewport.classList.toggle('markers-hidden');
        toggleMarkersBtn.classList.toggle('active', isHidden);
        const label = document.getElementById('toggle-markers-label');
        if (label) {
          label.textContent = isHidden ? 'HIDDEN' : 'MARKERS';
        }
        audio.playPoiClick();
      });
    }

    // Keyboard Hotkeys: 'M' for Markers toggle
    document.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (e.key === 'm' || e.key === 'M') {
        toggleMarkersBtn?.click();
      }
    });

    // Global subtle audio hover feedback on buttons, choices & interactive nodes
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('.hud-btn, .action-btn-large, .choice-btn, .lang-card, .vice-card, .sig-skill-btn, .thought-node, .stepper-btn, .scene-hud-toggle-btn, .scene-ctrl-chip');
      if (target) {
        audio.playUiHover();
      }
    });

    // State change listeners
    this.state.subscribe((event, payload) => {
      if (event === 'language_changed') {
        this.applyLanguage(payload);
      }
      this.updateHUD();
      const lang = this.state.currentLanguage;
      if (event === 'clue_added') {
        const title = tClue(payload.id, 'title', lang) || payload.title;
        this.showToast(`🔍 ${t('toast_clue_discovered', lang)} ${title}`);
        audio.playDossierStamp();
        setTimeout(() => audio.playDiscovery(), 120);
      } else if (event === 'thought_unlocked') {
        this.showToast(`💡 ${t('toast_thought_unlocked', lang)} "${payload.name}"`);
        audio.playDiscovery();
      } else if (event === 'thought_internalized') {
        this.showToast(`✨ ${t('toast_thought_internalized', lang)} "${payload.name}"`);
        audio.playThoughtInternalize();
      } else if (event === 'item_added') {
        const name = tItem(payload.id, 'name', lang) || payload.name;
        this.showToast(`📦 ${t('toast_item_acquired', lang)} ${name}`);
        audio.playDiscovery();
      } else if (event === 'item_used') {
        const name = tItem(payload.item.id, 'name', lang) || payload.item.name;
        this.showToast(`✨ ${t('toast_item_used', lang)} ${name}\n${payload.desc || ''}`);
        this.renderInventory();
      } else if (event === 'health_changed') {
        if (payload.delta < 0) {
          audio.playDamageHit();
          this.showToast(`🩸 ${t('toast_damage_health', lang)} (${payload.delta} HP)`);
        }
        if (payload.current <= 1) {
          audio.playHeartbeatThump();
        }
      } else if (event === 'morale_changed') {
        if (payload.delta < 0) {
          audio.playMoraleDrain();
          this.showToast(`🧠 ${t('toast_damage_morale', lang)} (${payload.delta} SP)`);
        }
        if (payload.current <= 1) {
          audio.playHeartbeatThump();
        }
      } else if (event === 'game_over') {
        this.showGameOver(payload);
      }
    });
  }

  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `<span>${message.replace(/\n/g, '<br>')}</span>`;
    this.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.transition = 'opacity 0.5s';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 500);
    }, 4500);
  }

  openModal(modal) {
    if (!modal) return;
    audio.playUiClick();
    modal.classList.add('open');
  }

  closeModal(modal) {
    if (!modal) return;
    audio.playUiClick();
    modal.classList.remove('open');
  }

  openProfileModal() {
    this.openModal(this.profileModal);
    this.renderProfile();
  }

  renderProfile() {
    if (!this.profileModal) return;
    const lang = this.state.currentLanguage;
    const det = this.state.detective;
    const portraitSrc = det.portrait || (det.gender === 'male' ? 'assets/portrait_male.jpg' : 'assets/portrait_female.jpg');

    const avatarEl = document.getElementById('profile-avatar-img');
    if (avatarEl) avatarEl.src = portraitSrc;
    const nameEl = document.getElementById('profile-name-text');
    if (nameEl) nameEl.textContent = det.name;
    const aliasEl = document.getElementById('profile-alias-text');
    if (aliasEl) aliasEl.textContent = `"${det.alias}"`;
    const precinctEl = document.getElementById('profile-precinct-text');
    if (precinctEl) precinctEl.textContent = t('precinct_label', lang);

    // Time
    const h = String(this.state.time.hour).padStart(2, '0');
    const m = String(this.state.time.minute).padStart(2, '0');
    const timeVal = document.getElementById('profile-time-val');
    if (timeVal) timeVal.textContent = `${t('day_prefix', lang)} ${this.state.time.day} · ${h}:${m}`;

    // Vitals text & pips
    const hpCount = document.getElementById('profile-health-count');
    if (hpCount) hpCount.textContent = `${det.health} / ${det.maxHealth}`;
    const spCount = document.getElementById('profile-morale-count');
    if (spCount) spCount.textContent = `${det.morale} / ${det.maxMorale}`;

    const hpPips = document.getElementById('profile-health-pips');
    if (hpPips) {
      hpPips.innerHTML = '';
      for (let i = 0; i < det.maxHealth; i++) {
        const pip = document.createElement('div');
        pip.className = `segment-pip health ${i < det.health ? 'active' : ''}`;
        hpPips.appendChild(pip);
      }
    }

    const spPips = document.getElementById('profile-morale-pips');
    if (spPips) {
      spPips.innerHTML = '';
      for (let i = 0; i < det.maxMorale; i++) {
        const pip = document.createElement('div');
        pip.className = `segment-pip morale ${i < det.morale ? 'active' : ''}`;
        spPips.appendChild(pip);
      }
    }

    // Progress
    const pct = this.state.getProgressPercentage();
    const progVal = document.getElementById('profile-progress-val');
    if (progVal) progVal.textContent = `${pct}%`;
    const progFill = document.getElementById('profile-progress-fill');
    if (progFill) progFill.style.width = `${pct}%`;

    // Facets
    const fIntellect = document.getElementById('profile-facet-intellect-val');
    if (fIntellect) fIntellect.textContent = det.attributes.intellect;
    const fPsyche = document.getElementById('profile-facet-psyche-val');
    if (fPsyche) fPsyche.textContent = det.attributes.psyche;
    const fPhysique = document.getElementById('profile-facet-physique-val');
    if (fPhysique) fPhysique.textContent = det.attributes.physique;
    const fMotorics = document.getElementById('profile-facet-motorics-val');
    if (fMotorics) fMotorics.textContent = det.attributes.motorics;

    // Signature skill & Vice
    const skillIcons = { esoterica: '🔮', logic: '🟦', empathy: '💜', perception: '👁️', endurance: '🩸', authority: '⚖️' };
    const sigVal = document.getElementById('profile-sig-val');
    if (sigVal) {
      const icon = skillIcons[det.signatureSkill] || '✨';
      sigVal.textContent = `${icon} ${tSkill(det.signatureSkill, lang).toUpperCase()}`;
    }
    const viceVal = document.getElementById('profile-vice-val');
    if (viceVal) {
      viceVal.textContent = tVice(det.vice, 'title', lang);
    }
  }

  updateHUD() {
    if (this.detNameEl) this.detNameEl.textContent = this.state.detective.name;
    if (this.detAliasEl) this.detAliasEl.textContent = this.state.detective.alias;

    // Mini vitals preview chip in header
    if (this.hudHpPreview) {
      this.hudHpPreview.textContent = `${this.state.detective.health}/${this.state.detective.maxHealth}`;
    }
    if (this.hudSpPreview) {
      this.hudSpPreview.textContent = `${this.state.detective.morale}/${this.state.detective.maxMorale}`;
    }
    const portraitSrc = this.state.detective.portrait || (this.state.detective.gender === 'male' ? 'assets/portrait_male.jpg' : 'assets/portrait_female.jpg');
    if (this.hudAvatarImg) {
      this.hudAvatarImg.src = portraitSrc;
    }

    // Render Health Pips (if containers present)
    if (this.healthPipsContainer) {
      this.healthPipsContainer.innerHTML = '';
      for (let i = 0; i < this.state.detective.maxHealth; i++) {
        const pip = document.createElement('div');
        pip.className = `segment-pip health ${i < this.state.detective.health ? 'active' : ''}`;
        this.healthPipsContainer.appendChild(pip);
      }
    }

    // Render Morale Pips (if containers present)
    if (this.moralePipsContainer) {
      this.moralePipsContainer.innerHTML = '';
      for (let i = 0; i < this.state.detective.maxMorale; i++) {
        const pip = document.createElement('div');
        pip.className = `segment-pip morale ${i < this.state.detective.morale ? 'active' : ''}`;
        this.moralePipsContainer.appendChild(pip);
      }
    }

    // Time display (if present in header)
    if (this.hudTimeEl) {
      const h = String(this.state.time.hour).padStart(2, '0');
      const m = String(this.state.time.minute).padStart(2, '0');
      const dayLabel = t('day_prefix', this.state.currentLanguage);
      this.hudTimeEl.textContent = `${dayLabel} ${this.state.time.day} · ${h}:${m}`;
    }

    // Counters
    const cabBadge = document.getElementById('cabinet-count-badge');
    if (cabBadge) cabBadge.textContent = this.state.thoughtCabinet.internalized.length;

    const clueBadge = document.getElementById('clues-count-badge');
    if (clueBadge) clueBadge.textContent = this.state.clues.length;

    const invBadge = document.getElementById('inv-count-badge');
    if (invBadge) invBadge.textContent = this.state.inventory.length;

    // Refresh Investigation Progress Meter
    this.updateProgressMeter();

    // Also update full profile modal if it is active/rendered
    this.renderProfile();
  }

  updateProgressMeter() {
    const pct = this.state.getProgressPercentage();
    const fillEl = document.getElementById('hud-progress-fill');
    const valEl = document.getElementById('hud-progress-val');
    const titleEl = document.getElementById('hud-progress-title');
    if (fillEl) fillEl.style.width = `${pct}%`;
    if (valEl) valEl.textContent = `${pct}%`;
    if (titleEl) {
      titleEl.textContent = PROGRESS_LABELS ? (PROGRESS_LABELS[this.state.currentLanguage] || 'PROGRESS') : 'PROGRESS';
    }
  }

  renderSceneMarkers() {
    this.sceneCanvas.innerHTML = '';
    const hasActive = !!this.activePoi;
    this.sceneCanvas.classList.toggle('has-active-poi', hasActive);

    this.caseData.pointsOfInterest.forEach(poi => {
      const marker = document.createElement('div');
      
      // Calculate smart tooltip collision avoidance
      let placementClass = '';
      if (poi.y < 35) placementClass += ' tooltip-below';
      if (poi.x > 72) placementClass += ' tooltip-right';
      else if (poi.x < 28) placementClass += ' tooltip-left';

      marker.className = `poi-marker ${this.activePoi === poi.id ? 'active' : ''}${placementClass}`;
      marker.style.left = `${poi.x}%`;
      marker.style.top = `${poi.y}%`;
      marker.dataset.poiId = poi.id;

      const localizedTitle = tPoi(poi.id, 'title', this.state.currentLanguage) || poi.title;
      const inspectText = t('btn_inspect', this.state.currentLanguage) || 'INVESTIGATE';

      marker.innerHTML = `
        <div class="poi-pulse-radar"></div>
        <div class="poi-pin-circle">${poi.icon}</div>
        <div class="poi-tooltip-card">
          <div class="poi-tooltip-title">${localizedTitle}</div>
          <div class="poi-tooltip-hint">[ ${inspectText} ]</div>
        </div>
      `;

      marker.addEventListener('mouseenter', () => {
        audio.playPoiHover();
      });

      marker.addEventListener('click', (e) => {
        e.stopPropagation();
        this.inspectPointOfInterest(poi);
      });

      this.sceneCanvas.appendChild(marker);
    });
  }

  inspectPointOfInterest(poi) {
    // If clicking same active POI, do not duplicate
    if (this.activePoi === poi.id && this.currentNodeId === poi.initialNode) {
      return;
    }

    this.activePoi = poi.id;
    this.sceneCanvas.classList.add('has-active-poi');
    document.querySelectorAll('.poi-marker').forEach(m => {
      m.classList.toggle('active', m.dataset.poiId === poi.id);
    });

    audio.playPoiClick();
    audio.playFootsteps();

    // Contextual atmospheric sound based on inspected artifact
    if (poi.id === 'poi_pendulum' || poi.id === 'poi_pocketwatch') {
      setTimeout(() => audio.playClockworkChime(), 200);
    } else if (poi.id === 'poi_floorboard') {
      setTimeout(() => audio.playChalkScratch(), 250);
    } else if (poi.id === 'poi_clock_chime_bell') {
      setTimeout(() => audio.playCathedralBell(), 200);
    } else if (poi.id === 'poi_balcony') {
      setTimeout(() => audio.playThunderCrack(), 300);
    }

    this.state.advanceTime(10);

    const localizedTitle = tPoi(poi.id, 'title', this.state.currentLanguage) || poi.title;
    const localizedDesc = tPoi(poi.id, 'description', this.state.currentLanguage) || poi.description;

    // Insert Evidence Banner with matching artwork
    if (poi.image) {
      const existingBanner = this.dialogueFeed.querySelector(`.inspection-evidence-banner[data-poi-id="${poi.id}"]`);
      if (!existingBanner) {
        const banner = document.createElement('div');
        banner.className = 'inspection-evidence-banner';
        banner.dataset.poiId = poi.id;
        banner.innerHTML = `
          <div class="evidence-poi-photo-wrap">
            <img src="${poi.image}" alt="${localizedTitle}" class="evidence-poi-photo">
          </div>
          <div class="evidence-poi-details">
            <div class="evidence-poi-header">
              <span class="evidence-poi-icon">${poi.icon || '🔍'}</span>
              <span class="evidence-poi-title">${localizedTitle}</span>
            </div>
            <div class="evidence-poi-desc">${localizedDesc}</div>
          </div>
        `;
        this.dialogueFeed.appendChild(banner);
      }
    }

    this.renderDialogueNode(poi.initialNode);
  }

  renderScene() {
    this.renderSceneMarkers();
  }

  startDialogue(nodeId, speakerTitle, poi) {
    if (poi) {
      this.inspectPointOfInterest(poi);
    } else if (nodeId) {
      this.renderDialogueNode(nodeId);
    }
  }

  renderDialogueNode(nodeId) {
    this.currentNodeId = nodeId;
    const baseNode = this.caseData.dialogueNodes[nodeId];
    if (!baseNode) return;

    // Get fully localized node
    const node = getLocalizedDialogueNode(nodeId, this.state.currentLanguage, baseNode);

    // Execute node action if defined
    if (baseNode.action) {
      baseNode.action(this.state);
    }

    // Update Speaker Bar
    this.currentInterlocutor = node.speaker || t('speaker_forensic', this.state.currentLanguage);
    if (this.interlocutorNameEl) {
      this.interlocutorNameEl.textContent = this.currentInterlocutor;
    }

    audio.playTypewriter();
    if (node.voices && node.voices.length > 0) {
      audio.playInnerVoice();
    }

    // Create Entry in Feed
    const entry = document.createElement('div');
    entry.className = 'dialogue-entry';
    entry.dataset.nodeId = nodeId;
    entry.innerHTML = `
      <div class="speaker-title-row">
        <span class="speaker-avatar">${node.avatar || '👤'}</span>
        <span class="speaker-label">${node.speaker || 'Narrative'}</span>
        <span class="speaker-equalizer"><span></span><span></span><span></span><span></span></span>
      </div>
      <div class="speaker-prose">${node.text}</div>
    `;

    // Inner voices
    if (node.voices && node.voices.length > 0) {
      node.voices.forEach(v => {
        const voiceDiv = document.createElement('div');
        voiceDiv.className = 'inner-voice-block';
        voiceDiv.style.borderColor = v.color;
        voiceDiv.innerHTML = `
          <div class="voice-badge" style="color: ${v.color}">${v.badge}</div>
          <div class="voice-prose">"${v.text}"</div>
        `;
        entry.appendChild(voiceDiv);
      });
    }

    this.dialogueFeed.appendChild(entry);
    this.renderChoices(node.options);

    requestAnimationFrame(() => {
      this.dialogueFeed.scrollTop = this.dialogueFeed.scrollHeight;
    });
  }

  renderChoices(options) {
    this.dialogueChoices.innerHTML = '';
    const renderCloseBtn = () => {
      const closeBtn = document.createElement('button');
      closeBtn.className = 'choice-btn';
      closeBtn.innerHTML = `<span class="choice-num">[1]</span> <span class="choice-text">[${t('dialogue_leave', this.state.currentLanguage)}]</span>`;
      closeBtn.addEventListener('click', () => {
        this.currentNodeId = null;
        this.activePoi = null;
        document.querySelectorAll('.poi-marker').forEach(m => m.classList.remove('active'));
        this.dialogueChoices.innerHTML = `<div style="color:var(--text-muted);font-style:italic;padding:12px;">${t('scene_location', this.state.currentLanguage)}</div>`;
      });
      this.dialogueChoices.appendChild(closeBtn);
    };

    if (!options || options.length === 0) {
      renderCloseBtn();
      return;
    }

    let choiceCounter = 1;
    options.forEach((opt) => {
      const choiceKey = opt.id || (opt.check ? opt.check.checkId : (opt.nextNode || (typeof opt.action === 'string' ? opt.action : null)));

      if (opt.condition && !opt.condition(this.state)) {
        return;
      }
      if (opt.once && choiceKey && this.state.isChoiceVisited(choiceKey)) {
        return;
      }

      const isVisited = !!(choiceKey && this.state.isChoiceVisited(choiceKey));
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      if (isVisited) {
        btn.classList.add('visited');
      }

      const currentNum = choiceCounter++;
      const visitedPrefix = isVisited ? '<span class="visited-check">✓ </span>' : '';

      if (opt.check) {
        const check = opt.check;
        const skillBonus = this.state.getSkillTotal(check.skill);
        const prob = this.diceEngine.calculateSuccessProbability(skillBonus, check.difficulty);

        btn.classList.add(check.type === 'red' ? 'red-check' : 'white-check');
        btn.innerHTML = `
          <span class="choice-num">[${currentNum}]</span>
          <span class="choice-text">${visitedPrefix}${opt.text}</span>
          <span class="check-prob-pill">${prob}%</span>
        `;

        btn.addEventListener('click', () => {
          if (choiceKey) this.state.markChoiceVisited(choiceKey);
          if (typeof opt.action === 'function') opt.action(this.state);
          this.updateProgressMeter();
          this.executeSkillCheck(opt, check);
        });
      } else {
        btn.innerHTML = `
          <span class="choice-num">[${currentNum}]</span>
          <span class="choice-text">${visitedPrefix}${opt.text}</span>
        `;

        btn.addEventListener('click', () => {
          audio.playUiClick();
          if (choiceKey) this.state.markChoiceVisited(choiceKey);
          if (typeof opt.action === 'function') opt.action(this.state);
          this.updateProgressMeter();

          if (opt.action === 'close_dialogue') {
            this.currentNodeId = null;
            this.activePoi = null;
            document.querySelectorAll('.poi-marker').forEach(m => m.classList.remove('active'));
            this.dialogueChoices.innerHTML = `<div style="color:var(--text-muted);font-style:italic;padding:12px;">${t('scene_location', this.state.currentLanguage)}</div>`;
          } else if (opt.action === 'trigger_victory') {
            this.showVictoryScreen();
          } else if (opt.nextNode) {
            this.renderDialogueNode(opt.nextNode);
          }
        });
      }

      this.dialogueChoices.appendChild(btn);
    });

    if (this.dialogueChoices.children.length === 0) {
      renderCloseBtn();
    }
  }

  // 3D Skill Check Roll Execution
  executeSkillCheck(opt, checkConfig) {
    this.openModal(this.diceModal);

    const checkHeader = document.getElementById('dice-check-header');
    const d1El = document.getElementById('die-1');
    const d2El = document.getElementById('die-2');
    const scoreVal = document.getElementById('dice-score-val');
    const outcomeEl = document.getElementById('dice-outcome-text');
    const proceedBtn = document.getElementById('dice-proceed-btn');

    const skillLabel = tSkill(checkConfig.skill, this.state.currentLanguage);
    checkHeader.textContent = `${skillLabel} (DC ${checkConfig.difficulty})`;
    const tallyLabel = document.getElementById('dice-tally-label');
    if (tallyLabel) tallyLabel.textContent = t('dice_tally', this.state.currentLanguage);
    d1El.classList.add('rolling');
    d2El.classList.add('rolling');
    outcomeEl.textContent = t('dice_rolling', this.state.currentLanguage);
    outcomeEl.className = 'outcome-announcement';
    scoreVal.textContent = '?';
    proceedBtn.style.display = 'none';

    audio.playDiceRoll();

    const result = this.diceEngine.rollCheck(checkConfig);

    setTimeout(() => {
      d1El.classList.remove('rolling');
      d2El.classList.remove('rolling');

      this.renderDiePips(d1El, result.d1);
      this.renderDiePips(d2El, result.d2);

      scoreVal.textContent = `${result.diceSum} + ${result.totalBonus} = ${result.totalScore}`;

      if (result.isCriticalSuccess) {
        outcomeEl.textContent = `★ ${t('dice_epiphany', this.state.currentLanguage)}`;
        outcomeEl.className = 'outcome-announcement critical';
        audio.playSuccess();
      } else if (result.isCriticalFailure) {
        outcomeEl.textContent = `☠ ${t('dice_snake_eyes', this.state.currentLanguage)}`;
        outcomeEl.className = 'outcome-announcement failed';
        audio.playFailure();
      } else if (result.passed) {
        outcomeEl.textContent = t('dice_passed', this.state.currentLanguage);
        outcomeEl.className = 'outcome-announcement passed';
        audio.playSuccess();
      } else {
        outcomeEl.textContent = t('dice_failed', this.state.currentLanguage);
        outcomeEl.className = 'outcome-announcement failed';
        audio.playFailure();
      }

      proceedBtn.textContent = t('dice_proceed', this.state.currentLanguage);
      proceedBtn.style.display = 'block';
      proceedBtn.onclick = () => {
        this.closeModal(this.diceModal);
        const nextNode = result.passed ? checkConfig.successNode : checkConfig.failNode;
        if (nextNode) {
          this.renderDialogueNode(nextNode);
        }
      };
    }, 1100);
  }

  renderDiePips(dieElement, number) {
    dieElement.innerHTML = '';
    const patterns = {
      1: [4],
      2: [0, 8],
      3: [0, 4, 8],
      4: [0, 2, 6, 8],
      5: [0, 2, 4, 6, 8],
      6: [0, 2, 3, 5, 6, 8]
    };

    const pips = patterns[number] || [4];
    for (let i = 0; i < 9; i++) {
      const pip = document.createElement('div');
      pip.className = `pip ${pips.includes(i) ? 'visible' : ''}`;
      dieElement.appendChild(pip);
    }
  }

  // Thought Cabinet Modal
  openCabinetModal() {
    this.openModal(this.cabinetModal);
    this.renderCabinet();
  }

  renderCabinet() {
    this.thoughtNodesContainer.innerHTML = '';
    const lang = this.state.currentLanguage;
    THOUGHTS_CATALOG.forEach(thought => {
      const isInternalized = this.state.thoughtCabinet.internalized.some(t => t.id === thought.id);
      const isCooking = this.state.thoughtCabinet.internalizing.find(t => t.id === thought.id);
      const isKnown = this.state.thoughtCabinet.known.some(t => t.id === thought.id);

      let statusClass = 'locked';
      let icon = '🔒';
      if (isInternalized) {
        statusClass = 'internalized';
        icon = '✨';
      } else if (isCooking) {
        statusClass = 'internalizing';
        icon = '⏳';
      } else if (isKnown) {
        statusClass = 'unlocked';
        icon = '💡';
      }

      const thoughtName = tThought(thought.id, 'name', lang) || thought.name;
      const thoughtCat = tThought(thought.id, 'category', lang) || thought.category;

      const nodeCard = document.createElement('div');
      nodeCard.className = `thought-node-card ${statusClass}`;
      nodeCard.innerHTML = `
        <span class="node-icon">${icon}</span>
        <div class="node-info">
          <div class="node-title">${thoughtName}</div>
          <span class="node-category">${thoughtCat}</span>
        </div>
      `;

      nodeCard.addEventListener('click', () => {
        audio.playThoughtNode();
        this.inspectThought(thought, { isInternalized, isCooking, isKnown });
      });

      this.thoughtNodesContainer.appendChild(nodeCard);
    });

    // Default inspect first known or internalized
    const firstKnown = THOUGHTS_CATALOG.find(t =>
      this.state.thoughtCabinet.known.some(k => k.id === t.id) ||
      this.state.thoughtCabinet.internalized.some(k => k.id === t.id)
    ) || THOUGHTS_CATALOG[0];

    this.inspectThought(firstKnown, {
      isInternalized: this.state.thoughtCabinet.internalized.some(t => t.id === firstKnown.id),
      isCooking: this.state.thoughtCabinet.internalizing.find(t => t.id === firstKnown.id),
      isKnown: this.state.thoughtCabinet.known.some(t => t.id === firstKnown.id)
    });
  }

  inspectThought(thought, status) {
    const { isInternalized, isCooking, isKnown } = status;
    const lang = this.state.currentLanguage;

    const tName = tThought(thought.id, 'name', lang) || thought.name;
    const tCat = tThought(thought.id, 'category', lang) || thought.category;
    const tFlav = tThought(thought.id, 'flavor', lang) || thought.flavor;
    const tExp = tThought(thought.id, 'explanation', lang) || thought.explanation;
    const tTemp = tThought(thought.id, 'tempDrawback', lang) || thought.tempDrawback;
    const tSol = tThought(thought.id, 'solution', lang) || thought.solution;

    let actionBtnHtml = '';
    if (isInternalized) {
      actionBtnHtml = `<div style="color:var(--gold-accent);font-family:var(--font-mono);font-size:0.85rem;text-align:center;">${t('cabinet_internalized_status', lang)}</div>`;
    } else if (isCooking) {
      actionBtnHtml = `<div style="color:var(--color-psyche);font-family:var(--font-mono);font-size:0.85rem;text-align:center;">⏳ ${t('cabinet_researching', lang)} (${isCooking.progress}/${thought.requiredTicks})</div>`;
    } else if (isKnown) {
      actionBtnHtml = `<button class="internalize-action-btn" id="btn-start-internalize">${t('cabinet_btn_internalize', lang)}</button>`;
    } else {
      actionBtnHtml = `<div style="color:var(--text-muted);font-style:italic;font-size:0.85rem;text-align:center;">${t('cabinet_locked_hint', lang)}</div>`;
    }

    this.thoughtInspector.innerHTML = `
      <span class="category-tag">${tCat}</span>
      <h3 class="thought-heading">${tName}</h3>
      <div class="thought-flavor-quote">"${tFlav}"</div>
      <div class="thought-deep-explanation">${tExp}</div>

      <div class="thought-stat-box">
        <span class="box-title">${t('cabinet_temp_box', lang)}</span>
        <span class="penalty-text">${tTemp}</span>
      </div>

      <div class="thought-stat-box">
        <span class="box-title">${t('cabinet_perm_box', lang)}</span>
        <span class="bonus-text">${tSol}</span>
      </div>

      ${actionBtnHtml}
    `;

    const startBtn = document.getElementById('btn-start-internalize');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        const res = this.state.startInternalizing(thought.id);
        if (res.success) {
          audio.playUiClick();
          this.renderCabinet();
        } else {
          alert(res.reason);
        }
      });
    }
  }

  // Inventory Modal with genuine usable consequences
  openInventoryModal() {
    this.openModal(this.inventoryModal);
    this.renderInventory();
  }

  renderInventory() {
    this.inventoryContainer.innerHTML = '';
    const lang = this.state.currentLanguage;
    if (this.state.inventory.length === 0) {
      this.inventoryContainer.innerHTML = `<div style="color:var(--text-muted);font-style:italic;padding:16px;">${t('inventory_empty', lang)}</div>`;
      return;
    }

    this.state.inventory.forEach(item => {
      const card = document.createElement('div');
      card.className = 'inv-card';

      let bonusText = '';
      if (item.bonus) {
        bonusText = Object.entries(item.bonus).map(([k, v]) => `+${v} ${tSkill(k, lang).toUpperCase()}`).join(', ');
      }

      const itemName = tItem(item.id, 'name', lang) || item.name;
      const itemDesc = tItem(item.id, 'description', lang) || item.description;
      const itemTypeLabel = t(`item_type_${item.type}`, lang) || item.type;
      const buffLabel = t('buff_label', lang) || 'Buff';

      let actionLabel = t('btn_use', lang);
      if (item.id === 'perpetuum_ledger') actionLabel = t('btn_read', lang);
      else if (item.id === 'broken_pocketwatch' || item.id === 'poison_chess_queen') actionLabel = t('btn_inspect', lang);

      card.innerHTML = `
        <div class="inv-header">
          <span class="inv-icon">${item.icon}</span>
          <div>
            <div class="inv-name">${itemName}</div>
            <span class="inv-type-pill">${itemTypeLabel}</span>
          </div>
        </div>
        <div class="inv-description">${itemDesc}</div>
        ${bonusText ? `<div class="inv-bonus-text">${buffLabel}: ${bonusText}</div>` : ''}
        <div class="inv-action-row">
          ${item.isUsable ? `
            <button class="inv-use-btn" data-id="${item.id}">
              ${actionLabel} ${item.uses ? `(${item.uses} ${t('badge_uses', lang)})` : ''}
            </button>
          ` : `
            <span class="inv-passive-badge">${t('badge_passive', lang)}</span>
          `}
        </div>
      `;

      card.querySelector('.inv-use-btn')?.addEventListener('click', () => {
        this.state.useItem(item.id);
      });

      this.inventoryContainer.appendChild(card);
    });
  }

  // Clues & Multi-Case Board Modal
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

      const caseHtml = `
        <div class="case-dossier-hero active-case">
          <div class="case-hero-header">
            <span class="case-hero-code">${activeCase.code}</span>
            <span class="case-hero-status active">${t('case_status_active', lang)}</span>
          </div>
          <h3 class="case-hero-title">${title}</h3>
          <div class="case-hero-meta">
            <span>👤 <strong>${victim}</strong></span>
            <span>📍 <strong>${loc}</strong></span>
            <span>⏱️ <strong>${dateText}</strong></span>
          </div>
          <p class="case-hero-summary">${summary}</p>
          <div class="case-hero-progress">
            <div class="hud-progress-info">
              <span>${(typeof PROGRESS_LABELS !== 'undefined' && PROGRESS_LABELS[lang]) || 'PROGRESS'}:</span>
              <span>${pct}%</span>
            </div>
            <div class="hud-progress-track">
              <div class="hud-progress-fill" style="width: ${pct}%;"></div>
            </div>
          </div>
        </div>

        <div class="case-evidence-section">
          <div class="case-section-heading">
            <span>📌 ${t('modal_clues_title', lang)} (${this.state.clues.length})</span>
          </div>
          <div class="case-clues-grid" id="active-case-clues-grid">
            ${this.state.clues.length === 0 ? `
              <div class="case-empty-notice">${t('clues_empty', lang)}</div>
            ` : this.state.clues.map(clue => {
              const cTitle = tClue(clue.id, 'title', lang) || clue.title;
              const cDesc = tClue(clue.id, 'desc', lang) || clue.desc;
              return `
                <div class="case-evidence-card">
                  <div class="evidence-card-title">🔍 ${cTitle}</div>
                  <div class="evidence-card-desc">${cDesc}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
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

        return `
          <div class="solved-case-dossier-card">
            <div class="solved-case-head">
              <span class="case-hero-code">${c.code}</span>
              <span class="case-hero-status solved">${t('case_status_solved', lang)}</span>
            </div>
            <h4 class="solved-case-title">${c.icon} ${title}</h4>
            <div class="case-hero-meta">
              <span>👤 ${victim}</span>
              <span>📍 ${loc}</span>
              <span>📅 ${dateText}</span>
            </div>
            <p class="solved-case-summary">${summary}</p>
            <div class="solved-case-keystone">
              <div class="keystone-tag">${t('keystone_secured', lang)}:</div>
              <div class="keystone-name">${c.keystoneIcon} ${kName}</div>
              <div class="keystone-desc">${kDesc}</div>
            </div>
          </div>
        `;
      }).join('');

      this.caseBoardContent.innerHTML = `
        <div class="solved-archive-container">
          <div class="archive-intro-box">
            <span>📁 ${t('case_tab_archive', lang)}</span>
            <p>${t('archive_intro_text', lang)}</p>
          </div>
          <div class="solved-cases-list">
            ${solvedListHtml}
          </div>
        </div>
      `;

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

      const masterHtml = `
        <div class="master-case-hero">
          <div class="case-hero-header">
            <span class="case-hero-code gold">#PRIME-00/OMEGA</span>
            <span class="case-hero-status master">${t('case_status_master', lang)}</span>
          </div>
          <h3 class="master-hero-title">👑 ${omegaTitle}</h3>
          <div class="case-hero-meta">
            <span>🎯 <strong>${omegaVictim}</strong></span>
            <span>📍 <strong>${omegaLoc}</strong></span>
          </div>
          <p class="master-hero-summary">${omegaSummary}</p>
        </div>

        <div class="master-keystone-network">
          <div class="case-section-heading">
            <span>🕸️ ${t('keystone_network_title', lang)}</span>
          </div>
          <div class="keystone-grid">
            
            <div class="keystone-node secured">
              <div class="keystone-node-head">
                <span class="keystone-source-code">${fromPrefix} #D4-01/DRF</span>
                <span class="keystone-status-badge secured">${statusSecured}</span>
              </div>
              <div class="keystone-node-title">📜 ${k1Name}</div>
              <div class="keystone-node-info">${k1Desc}</div>
            </div>

            <div class="keystone-node secured">
              <div class="keystone-node-head">
                <span class="keystone-source-code">${fromPrefix} #D4-02/ARS</span>
                <span class="keystone-status-badge secured">${statusSecured}</span>
              </div>
              <div class="keystone-node-title">📄 ${k2Name}</div>
              <div class="keystone-node-info">${k2Desc}</div>
            </div>

            <div class="keystone-node secured">
              <div class="keystone-node-head">
                <span class="keystone-source-code">${fromPrefix} #D4-03/TNC</span>
                <span class="keystone-status-badge secured">${statusSecured}</span>
              </div>
              <div class="keystone-node-title">🩸 ${k3Name}</div>
              <div class="keystone-node-info">${k3Desc}</div>
            </div>

            <div class="keystone-node ${k4Unlocked ? 'secured' : 'pending'}">
              <div class="keystone-node-head">
                <span class="keystone-source-code">${fromPrefix} #D4-04/HOR</span>
                <span class="keystone-status-badge ${k4Unlocked ? 'secured' : 'pending'}">${statusK4}</span>
              </div>
              <div class="keystone-node-title">🗝️ ${k4Name}</div>
              <div class="keystone-node-info">${k4Desc}</div>
            </div>

          </div>

          <div class="master-action-box">
            <button id="btn-synthesize-master-case" class="action-btn-large ${k4Unlocked ? 'ready' : ''}" style="width: 100%;">
              ⚖️ ${t('btn_synthesize_master', lang)}
            </button>
            <div class="master-synthesis-hint">
              ${k4Unlocked ? t('master_synthesis_ready', lang) : t('master_synthesis_not_ready', lang)}
            </div>
          </div>
        </div>
      `;

      this.caseBoardContent.innerHTML = masterHtml;

      document.getElementById('btn-synthesize-master-case')?.addEventListener('click', () => {
        if (k4Unlocked) {
          audio.playVictoryChime();
          this.showToast(`👑 ${t('master_synthesis_ready', lang)}`);
        } else {
          audio.playUiClick();
          this.showToast(`⚠️ ${t('master_synthesis_not_ready', lang)}`);
        }
      });
    }
  }

  // Atmospheric Game Over Horror Modal
  showGameOver(payload) {
    this.openModal(this.gameoverModal);
    if (typeof audio !== 'undefined' && audio.playGameOver) {
      audio.playGameOver();
    }
    const lang = this.state.currentLanguage;
    const type = payload.type || 'physical';

    const iconEl = document.getElementById('gameover-status-icon');
    const titleEl = document.getElementById('gameover-title-text');
    const reasonEl = document.getElementById('gameover-reason-text');
    const proseEl = document.getElementById('gameover-prose-text');
    const retryBtn = document.getElementById('btn-retry-inquiry');

    if (type === 'physical') {
      iconEl.textContent = '💀';
    } else if (type === 'psychological') {
      iconEl.textContent = '🧠';
    } else if (type === 'arrest') {
      iconEl.textContent = '🚨';
    } else {
      iconEl.textContent = '⏱️';
    }

    titleEl.textContent = tGameOver(type, 'title', lang);
    reasonEl.textContent = payload.reason || tGameOver(type, 'title', lang);
    proseEl.textContent = payload.description || tGameOver(type, 'description', lang);
    retryBtn.textContent = t('btn_retry', lang);
  }

  // Victory / Case Closed Modal
  showVictoryScreen() {
    this.openModal(this.victoryModal);
    audio.playVictoryChime();
    const sum = document.getElementById('victory-summary-text');
    const lang = this.state.currentLanguage;
    if (sum) {
      sum.innerHTML = `
        <strong>${t('case_badge', lang)}</strong><br><br>
        ${t('victory_lead', lang)} <em>${this.state.detective.name}</em> ("${this.state.detective.alias}")<br>
        ${t('victory_facet', lang)} <em>${tSkill(this.state.detective.signatureSkill, lang).toUpperCase()}</em><br>
        ${t('victory_clues', lang)} <em>${this.state.clues.length}</em><br>
        ${t('victory_thoughts', lang)} <em>${this.state.thoughtCabinet.internalized.length}</em><br><br>
        ${t('ending_coverup', lang)}
      `;
    }
  }
}
