// Aenigma Master UI Controller & Interaction Engine
import { audio } from './audio.js';
import { SUPPORTED_LANGUAGES, PROGRESS_LABELS, DISTRICT_LABELS, t, tItem, tPoi, tClue, tSkill, tGameOver, getLocalizedDialogueNode } from './i18n.js';
import { THOUGHTS_CATALOG } from './thoughts.js';
import { CASE_DATA } from './cases.js';
import { DiceEngine } from './dice.js';

export class UIController {
  constructor(state) {
    this.state = state;
    this.caseData = CASE_DATA;
    this.diceEngine = new DiceEngine(state);
    this.currentNodeId = null;
    this.currentInterlocutor = 'Forensic Observation';
    this.activePoi = null;

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

    // Header meters & stats
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
      el.textContent = langObj.native;
    });

    // Update Stage 1 texts
    const quoteEl = document.getElementById('loader-quote-text');
    if (quoteEl) quoteEl.textContent = t('loader_quote', currentLang);
    const telemetryEl = document.getElementById('loader-telemetry-text');
    if (telemetryEl) telemetryEl.textContent = t('loader_telemetry', currentLang);
    const enterBtn = document.getElementById('loader-enter-btn');
    if (enterBtn) enterBtn.textContent = t('loader_enter', currentLang);

    // Update Stage 2 Character Creator texts
    const creatorTitle = document.querySelector('.creator-section-title span:first-child');
    if (creatorTitle) creatorTitle.textContent = t('creator_title', currentLang);
    const creatorSub = document.querySelector('.creator-section-title span:last-child');
    if (creatorSub) creatorSub.textContent = t('creator_subtitle', currentLang);
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

    const tabCabinetText = document.getElementById('tab-cabinet-text');
    if (tabCabinetText) tabCabinetText.textContent = t('nav_cabinet', currentLang);
    const tabCluesText = document.getElementById('tab-clues-text');
    if (tabCluesText) tabCluesText.textContent = t('nav_clues', currentLang);
    const tabInvText = document.getElementById('tab-inv-text');
    if (tabInvText) tabInvText.textContent = t('nav_inventory', currentLang);

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

    // Update Modals Titles
    const cabTitle = document.querySelector('#cabinet-modal .modal-title');
    if (cabTitle) cabTitle.textContent = t('modal_cabinet_title', currentLang);
    const invTitle = document.querySelector('#inventory-modal .modal-title');
    if (invTitle) invTitle.textContent = t('modal_inventory_title', currentLang);
    const clueTitle = document.querySelector('#clues-modal .modal-title');
    if (clueTitle) clueTitle.textContent = t('modal_clues_title', currentLang);
    const langModalTitle = document.getElementById('language-modal-title');
    if (langModalTitle) langModalTitle.textContent = t('modal_language_title', currentLang);
    const vicTitle = document.querySelector('#victory-modal .modal-title');
    if (vicTitle) vicTitle.textContent = t('modal_victory_title', currentLang);
    const restartBtn = document.getElementById('btn-restart-inquiry');
    if (restartBtn) restartBtn.textContent = t('btn_restart', currentLang);

    // Refresh dynamic scene markers & tooltips
    this.renderSceneMarkers();

    // Refresh active inspection banner if open
    if (this.activePoi) {
      const bannerTitle = document.querySelector('.evidence-poi-title');
      if (bannerTitle) bannerTitle.textContent = tPoi(this.activePoi, 'title', currentLang);
      const bannerDesc = document.querySelector('.evidence-poi-desc');
      if (bannerDesc) bannerDesc.textContent = tPoi(this.activePoi, 'description', currentLang);
    }

    // Refresh active dialogue node if currently interacting
    if (this.currentNodeId) {
      this.retranslateCurrentDialogue();
    }

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
    if (!this.currentNodeId) return;
    const baseNode = this.caseData.dialogueNodes[this.currentNodeId];
    if (!baseNode) return;

    const node = getLocalizedDialogueNode(this.currentNodeId, this.state.currentLanguage, baseNode);

    // Update speaker label
    if (this.interlocutorNameEl) {
      this.interlocutorNameEl.textContent = node.speaker || t('speaker_forensic', this.state.currentLanguage);
    }

    // Update last dialogue entry in feed
    const entries = this.dialogueFeed.querySelectorAll('.dialogue-entry');
    if (entries.length > 0) {
      const lastEntry = entries[entries.length - 1];
      const speakerLabel = lastEntry.querySelector('.speaker-label');
      if (speakerLabel) speakerLabel.textContent = node.speaker || 'Narrative';
      const prose = lastEntry.querySelector('.speaker-prose');
      if (prose) prose.textContent = node.text;

      // Update inner voices
      const voiceBlocks = lastEntry.querySelectorAll('.inner-voice-block');
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

    // Re-render dialogue choices
    this.renderChoices(node.options);
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

    // Scene Toolbar Controls: Show/Hide POI Indicators & Sonar Radar Ping
    const toggleMarkersBtn = document.getElementById('btn-toggle-poi-markers');
    const radarPingBtn = document.getElementById('btn-toggle-radar-ping');
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

    if (radarPingBtn) {
      radarPingBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        audio.playPoiHover();
        document.querySelectorAll('.poi-pulse-radar').forEach(p => {
          p.style.animation = 'none';
          void p.offsetWidth;
          p.style.animation = 'radarPing 1.2s ease-out';
        });
      });
    }

    // Keyboard Hotkeys: 'M' for Markers toggle, 'Space' for Radar Ping
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

  updateHUD() {
    if (!this.detNameEl) return;
    this.detNameEl.textContent = this.state.detective.name;
    this.detAliasEl.textContent = this.state.detective.alias;

    // Render Health Pips
    this.healthPipsContainer.innerHTML = '';
    for (let i = 0; i < this.state.detective.maxHealth; i++) {
      const pip = document.createElement('div');
      pip.className = `segment-pip health ${i < this.state.detective.health ? 'active' : ''}`;
      this.healthPipsContainer.appendChild(pip);
    }

    // Render Morale Pips
    this.moralePipsContainer.innerHTML = '';
    for (let i = 0; i < this.state.detective.maxMorale; i++) {
      const pip = document.createElement('div');
      pip.className = `segment-pip morale ${i < this.state.detective.morale ? 'active' : ''}`;
      this.moralePipsContainer.appendChild(pip);
    }

    // Time display
    const h = String(this.state.time.hour).padStart(2, '0');
    const m = String(this.state.time.minute).padStart(2, '0');
    const dayLabel = t('day_prefix', this.state.currentLanguage);
    this.hudTimeEl.textContent = `${dayLabel} ${this.state.time.day} · ${h}:${m}`;

    // Counters
    const cabBadge = document.getElementById('cabinet-count-badge');
    if (cabBadge) cabBadge.textContent = this.state.thoughtCabinet.internalized.length;

    const clueBadge = document.getElementById('clues-count-badge');
    if (clueBadge) clueBadge.textContent = this.state.clues.length;

    const invBadge = document.getElementById('inv-count-badge');
    if (invBadge) invBadge.textContent = this.state.inventory.length;

    // Refresh Investigation Progress Meter
    this.updateProgressMeter();
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
      closeBtn.innerHTML = `<span class="choice-num">[1]</span> <span>[${t('speaker_forensic', this.state.currentLanguage)}]</span>`;
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
          <span>${visitedPrefix}${opt.text}</span>
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
          <span>${visitedPrefix}${opt.text}</span>
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
        outcomeEl.textContent = `★ ${t('dice_passed', this.state.currentLanguage)} (EPIPHANY)`;
        outcomeEl.className = 'outcome-announcement critical';
        audio.playSuccess();
      } else if (result.isCriticalFailure) {
        outcomeEl.textContent = `☠ ${t('dice_failed', this.state.currentLanguage)} (SNAKE EYES)`;
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

      const nodeCard = document.createElement('div');
      nodeCard.className = `thought-node-card ${statusClass}`;
      nodeCard.innerHTML = `
        <span class="node-icon">${icon}</span>
        <div class="node-info">
          <div class="node-title">${thought.name}</div>
          <span class="node-category">${thought.category}</span>
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

    let actionBtnHtml = '';
    if (isInternalized) {
      actionBtnHtml = `<div style="color:var(--gold-accent);font-family:var(--font-mono);font-size:0.85rem;text-align:center;">✨ PERMANENT BREAKTHROUGH ACTIVE</div>`;
    } else if (isCooking) {
      actionBtnHtml = `<div style="color:var(--color-psyche);font-family:var(--font-mono);font-size:0.85rem;text-align:center;">⏳ Internalizing... (${isCooking.progress}/${thought.requiredTicks} case moments)</div>`;
    } else if (isKnown) {
      actionBtnHtml = `<button class="internalize-action-btn" id="btn-start-internalize">INTERNALIZE THIS THOUGHT</button>`;
    } else {
      actionBtnHtml = `<div style="color:var(--text-muted);font-style:italic;font-size:0.85rem;text-align:center;">Investigate further in Saint Irene to unlock this thought.</div>`;
    }

    this.thoughtInspector.innerHTML = `
      <span class="category-tag">${thought.category}</span>
      <h3 class="thought-heading">${thought.name}</h3>
      <div class="thought-flavor-quote">"${thought.flavor}"</div>
      <div class="thought-deep-explanation">${thought.explanation}</div>

      <div class="thought-stat-box">
        <span class="box-title">Temporary Contemplation Effect</span>
        <span class="penalty-text">${thought.tempDrawback}</span>
      </div>

      <div class="thought-stat-box">
        <span class="box-title">Permanent Psychological Breakthrough</span>
        <span class="bonus-text">${thought.solution}</span>
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

    this.state.inventory.forEach(item => {
      const card = document.createElement('div');
      card.className = 'inv-card';

      let bonusText = '';
      if (item.bonus) {
        bonusText = Object.entries(item.bonus).map(([k, v]) => `+${v} ${k.toUpperCase()}`).join(', ');
      }

      const itemName = tItem(item.id, 'name', lang) || item.name;
      const itemDesc = tItem(item.id, 'description', lang) || item.description;

      let actionLabel = t('btn_use', lang);
      if (item.id === 'perpetuum_ledger') actionLabel = t('btn_read', lang);
      else if (item.id === 'broken_pocketwatch' || item.id === 'poison_chess_queen') actionLabel = t('btn_inspect', lang);

      card.innerHTML = `
        <div class="inv-header">
          <span class="inv-icon">${item.icon}</span>
          <div>
            <div class="inv-name">${itemName}</div>
            <span class="inv-type-pill">${item.type}</span>
          </div>
        </div>
        <div class="inv-description">${itemDesc}</div>
        ${bonusText ? `<div class="inv-bonus-text">Buff: ${bonusText}</div>` : ''}
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

  // Clues Modal
  openCluesModal() {
    this.openModal(this.cluesModal);
    this.renderClues();
  }

  renderClues() {
    this.cluesContainer.innerHTML = '';
    const lang = this.state.currentLanguage;
    if (this.state.clues.length === 0) {
      this.cluesContainer.innerHTML = `<div style="color:var(--text-muted);font-style:italic;padding:16px;">${t('scene_location', lang)}</div>`;
      return;
    }

    this.state.clues.forEach(clue => {
      const card = document.createElement('div');
      card.className = 'clue-card';
      const clueTitle = tClue(clue.id, 'title', lang) || clue.title;
      const clueDesc = tClue(clue.id, 'desc', lang) || clue.desc;

      card.innerHTML = `
        <div class="clue-title-line">📌 ${clueTitle}</div>
        <div class="clue-detail-text">${clueDesc}</div>
      `;
      this.cluesContainer.appendChild(card);
    });
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
        Lead Investigator: <em>${this.state.detective.name}</em> ("${this.state.detective.alias}")<br>
        Signature Facet: <em>${this.state.detective.signatureSkill.toUpperCase()}</em><br>
        Clues Uncovered: <em>${this.state.clues.length} pieces of evidence</em><br>
        Thoughts Internalized: <em>${this.state.thoughtCabinet.internalized.length}</em><br><br>
        ${t('ending_coverup', lang) || 'The inquiry is closed. Justice has been wrought in Saint Irene.'}
      `;
    }
  }
}
