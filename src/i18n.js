import { DIALOGUE_I18N_FULL, CLUES_I18N_FULL, NEW_POIS_I18N } from './dialogue_i18n.js';
// Aenigma Multi-Language Localization System (5 Native Languages)
// Supported: en (English - Default), id (Bahasa Indonesia), zh (Chinese Simplified),
// ja (Japanese), ko (Korean)

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'id', name: 'Bahasa Indonesia', native: 'Bahasa Indonesia', flag: '🇮🇩', dir: 'ltr' },
  { code: 'zh', name: 'Chinese', native: '简体中文', flag: '🇨🇳', dir: 'ltr' },
  { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵', dir: 'ltr' },
  { code: 'ko', name: 'Korean', native: '한국어', flag: '🇰🇷', dir: 'ltr' }
];

export const PROGRESS_LABELS = {
  en: 'PROGRESS',
  id: 'PROGRES',
  zh: '破案进度',
  ja: '捜査進捗',
  ko: '수사 진행'
};

export const SKILL_NAMES_I18N = {
  logic: { en: 'Logic', id: 'Logika', zh: '逻辑', ja: '論理', ko: '논리', es: 'Lógica', fr: 'Logique', de: 'Logik', ru: 'Логика', it: 'Logica', pt: 'Lógica', ar: 'المنطق' },
  encyclopedia: { en: 'Encyclopedia', id: 'Ensiklopedia', zh: '百科', ja: '百科事典', ko: '백과사전', es: 'Enciclopedia', fr: 'Encyclopédie', de: 'Enzyklopädie', ru: 'Энциклопедия', it: 'Enciclopedia', pt: 'Enciclopédia', ar: 'الموسوعة' },
  rhetoric: { en: 'Rhetoric', id: 'Retorika', zh: '修辞', ja: '修辞学', ko: '수사학', es: 'Retórica', fr: 'Rhétorique', de: 'Rhetorik', ru: 'Риторика', it: 'Retorica', pt: 'Retórica', ar: 'البلاغة' },
  conceptualization: { en: 'Conceptualization', id: 'Konseptualisasi', zh: '概念化', ja: '概念化', ko: '개념화', es: 'Conceptualización', fr: 'Conceptualisation', de: 'Konzeptualisierung', ru: 'Концептуализация', it: 'Concettualizzazione', pt: 'Conceptualização', ar: 'المفاهيم' },
  empathy: { en: 'Empathy', id: 'Empati', zh: '共情', ja: '共感', ko: '공감', es: 'Empatía', fr: 'Empathie', de: 'Empathie', ru: 'Эмпатия', it: 'Empatia', pt: 'Empatia', ar: 'التعاطف' },
  esoterica: { en: 'Esoterica', id: 'Esoterika', zh: '秘教', ja: '秘教', ko: '비전', es: 'Esotérica', fr: 'Ésotérisme', de: 'Esoterik', ru: 'Эзотерика', it: 'Esoterismo', pt: 'Esoterismo', ar: 'الباطنية' },
  authority: { en: 'Authority', id: 'Otoritas', zh: '威信', ja: '威信', ko: '권위', es: 'Autoridad', fr: 'Autorité', de: 'Autorität', ru: 'Авторитет', it: 'Autorità', pt: 'Autoridade', ar: 'السلطة' },
  suggestion: { en: 'Suggestion', id: 'Sugesti', zh: '暗示', ja: '暗示', ko: '암시', es: 'Sugestión', fr: 'Suggestion', de: 'Suggestion', ru: 'Внушение', it: 'Suggestione', pt: 'Sugestão', ar: 'الإيحاء' },
  endurance: { en: 'Endurance', id: 'Daya Tahan', zh: '耐力', ja: '耐久力', ko: '인내력', es: 'Resistencia', fr: 'Endurance', de: 'Ausdauer', ru: 'Стойкость', it: 'Resistenza', pt: 'Resistência', ar: 'التحمل' },
  painThreshold: { en: 'Pain Threshold', id: 'Ambang Rasa Sakit', zh: '疼痛阈值', ja: '痛覚閾値', ko: '통증 역치', es: 'Umbral de Dolor', fr: 'Seuil de Douleur', de: 'Schmerzgrenze', ru: 'Болевой порог', it: 'Soglia del Dolore', pt: 'Limiar de Dor', ar: 'عتبة الألم' },
  electrochemistry: { en: 'Electrochemistry', id: 'Elektrokimia', zh: '生化反应', ja: '生化学', ko: '생체화학', es: 'Electroquímica', fr: 'Électrochimie', de: 'Elektrochemie', ru: 'Электрохимия', it: 'Elettrochimica', pt: 'Eletroquímica', ar: 'الكيمياء الحيوية' },
  physicalInstrument: { en: 'Physical Instrument', id: 'Kekuatan Fisik', zh: '肉体器械', ja: '身体能力', ko: '신체적 도구', es: 'Instrumento Físico', fr: 'Instrument Physique', de: 'Körperkraft', ru: 'Физический инструмент', it: 'Strumento Fisico', pt: 'Instrumento Físico', ar: 'الأداة البدنية' },
  perception: { en: 'Perception', id: 'Persepsi', zh: '知觉', ja: '知覚', ko: '지각', es: 'Percepción', fr: 'Perception', de: 'Wahrnehmung', ru: 'Внимательность', it: 'Percezione', pt: 'Percepção', ar: 'الإدراك' },
  handEyeCoord: { en: 'Hand-Eye Coord', id: 'Koordinasi Tangan-Mata', zh: '手眼协调', ja: '手眼協調', ko: '협응력', es: 'Coord. Ojo-Mano', fr: 'Coord. Œil-Main', de: 'Hand-Auge-Koord.', ru: 'Координация', it: 'Coord. Occhio-Mano', pt: 'Coord. Mão-Olho', ar: 'التناسق الحركي' },
  savoirFaire: { en: 'Savoir Faire', id: 'Savoir Faire', zh: '处世之道', ja: '処世術', ko: '기민성', es: 'Savoir Faire', fr: 'Savoir-Faire', de: 'Savoir Faire', ru: 'Самообладание', it: 'Savoir-Faire', pt: 'Savoir-Faire', ar: 'الكياسة' },
  interfacing: { en: 'Interfacing', id: 'Penyelarasan Mesin', zh: '机构连动', ja: '機構連動', ko: '기계 조율', es: 'Conexión Mecánica', fr: 'Interfaçage', de: 'Mechanik', ru: 'Взаимодействие', it: 'Interazione', pt: 'Interação', ar: 'التعامل الميكانيكي' }
};

export function tSkill(skillKey, lang = 'en') {
  if (SKILL_NAMES_I18N[skillKey]) {
    return SKILL_NAMES_I18N[skillKey][lang] || SKILL_NAMES_I18N[skillKey]['en'] || skillKey.toUpperCase();
  }
  return skillKey.toUpperCase();
}

export const DISTRICT_LABELS = {
  en: 'DISTRICT 7',
  id: 'SEKTOR 7',
  zh: '第七区',
  ja: '第7管区',
  ko: '제7구역'
};

export const UI_TRANSLATIONS = {
  id: {
    toast_case_opened: 'Berkas Kasus Dibuka: Aurelia Vance · Selamat datang di Sektor 7, Detektif {name}',
    game_title: 'A E N I G M A',
    case_badge: 'KASUS #D4-04',
    archive_intro_text: 'Arsip kasus yang berhasil dipecahkan sebelumnya oleh Detektif Renata Vance di Sektor 7. Setiap kasus yang selesai meninggalkan bukti kunci (Keystone Evidence) yang mengarah pada dalang sindikat rahasia yang sama.',
    keystone_network_title: 'MATRIKS BENANG MERAH KONSPIRASI (KEYSTONE EVIDENCE WEB)',
    from_prefix: 'DARI',
    status_secured: '✓ AMAN',
    status_unmasked: '✓ TERBONGKAR',
    status_inquiry: '⏳ DALAM INKUIRI',
    k4_unlocked_desc: 'Pengakuan pembunuhan & bukti transaksi suap 50.000 guilder terbongkar!',
    k4_pending_desc: 'Sedang diselidiki di Menara Irene: brankas rahasia & pengakuan dalang.',
    case_date_today: 'Hari Ini · 03:42 AM',
    case_date_final: 'Sintesis Penyelidikan Terakhir',
    case_tab_active: 'KASUS AKTIF [#D4-04]',
    case_tab_archive: 'ARSIP KASUS (3)',
    case_tab_master: 'KASUS UTAMA [#PRIME-00]',
    case_status_active: '⚡ AKTIF / SEDANG DISELIDIKI',
    case_status_solved: '✓ TERPECAHKAN',
    case_status_master: '👑 KASUS UTAMA',
    keystone_secured: '✓ KUNCI BUKTI DIPEROLEH',
    keystone_pending: '⏳ BELUM TERUNGKAP',
    btn_synthesize_master: 'HUBUNGKAN SELURUH BENANG MERAH KONSPIRASI',
    master_synthesis_ready: 'SELURUH 4 KUNCI BUKTI TERHIMPUN! KONSORSIUM BAYANGAN SEKTOR 7 TERBONGKAR!',
    master_synthesis_not_ready: 'Masih membutuhkan bukti konklusif dari Kasus #D4-04 untuk mengungkap dalang.',
    loader_quote: '“Detik jam tak pernah berhenti. Hanya daging di dalamnya yang lupa cara berdetak.”',
    loader_telemetry: 'Menginisialisasi telemetri saraf...',
    loader_enter: 'MASUK KE ARSIP',
    creator_title: 'DOSSIER PENYELIDIK',
    creator_subtitle: 'PEMBUATAN KARAKTER',
    gender_female: '♀ WANITA',
    gender_male: '♂ PRIA',
    randomize_dossier: '🎲 ACAK DOSSIER',
    precinct_label: 'Divisi Pembunuhan Distrik 4 · Sektor Timur 7',
    name_label: 'NAMA LENGKAP DETEKTIF',
    alias_label: 'JULUKAN / GELAR PSIKOLOGIS',
    facets_title: 'ASPEK KEJIWAAN',
    points_available: 'Poin Tersedia',
    intellect_name: 'INTELEK',
    intellect_desc: 'Logika, Ensiklopedia, Retorika, Konseptualisasi. Deduksi dingin dan analisis rasional.',
    psyche_name: 'KEJIWAAN',
    psyche_desc: 'Esoterika, Empati, Otoritas, Sugesti. Firasat supranatural dan gravitasi emosional.',
    physique_name: 'FISIK',
    physique_desc: 'Daya Tahan, Ambang Rasa Sakit, Elektrokimia. Adrenalin, naluri purba, dan stamina bertahan hidup.',
    motorics_name: 'MOTORIK',
    motorics_desc: 'Persepsi, Koordinasi Tangan-Mata, Penyelarasan, Savoir Faire. Kepekaan panca indra dan petunjuk mikro.',
    signature_title: 'KEAHLIAN KHUSUS (+2 BONUS & SUARA BATIN)',
    vices_title: 'KEBIASAAN BURUK & CACAT KEJIWAAN',
    start_inquiry: 'MULAI INVESTIGASI',
    endurance_label: 'DAYA TAHAN',
    morale_label: 'KEWARASAN',
    hp_pip: 'HP',
    sp_pip: 'SP',
    day_prefix: 'HARI',
    nav_cabinet: '🧠 LEMARI PIKIRAN',
    nav_clues: '📌 DOSSIER BUKTI',
    nav_inventory: '💼 INVENTARIS',
    nav_audio: 'AUDIO',
    nav_language: 'BAHASA',
    scene_location: 'Menara Jam Saint Irene · Sektor 7',
    scene_timestamp: 'Nyonya Horologis Aurelia Vance · Jenazah ditemukan pukul 03:42 di tengah dentang jam',
    speaker_forensic: 'Pengamatan Forensik',
    interlocutor_active: 'INTERAKSI AKTIF',
    modal_cabinet_title: 'LEMARI PIKIRAN · THOUGHT CABINET',
    modal_inventory_title: 'MANTEL DETEKTIF & KANTONG BUKTI',
    modal_clues_title: 'PAPAN INVESTIGASI & ARSIP KASUS',
    modal_dice_title: 'UJI KEAHLIAN',
    modal_language_title: 'PILIH BAHASA TERJEMAHAN',
    modal_victory_title: 'KASUS SELESAI',
    modal_gameover_title: 'INVESTIGASI GAGAL: TERMINASI',
    dice_tally: 'LEMPARAN 2D6 + MODIFIKASI:',
    dice_rolling: 'MEMUTAR DADU...',
    dice_passed: 'UJI KEAHLIAN BERHASIL!',
    dice_failed: 'UJI KEAHLIAN GAGAL!',
    dice_proceed: 'LANJUTKAN DENGAN HASIL INI',
    btn_restart: 'MULAI INVESTIGASI BARU',
    btn_retry: 'MULAI ULANG INVESTIGASI',
    btn_use: 'GUNAKAN',
    btn_inspect: 'PERIKSA',
    btn_read: 'BACA',
    badge_passive: 'PASIF',
    badge_uses: 'tersisa',
    toast_item_acquired: 'BARANG DIDAPATKAN:',
    toast_item_used: 'BARANG DIGUNAKAN:',
    toast_clue_discovered: 'BUKTI KRUSIAL TERUNGKAP:',
    toast_thought_unlocked: 'PIKIRAN BARU DITEMUKAN:',
    toast_thought_internalized: 'PIKIRAN TELAH DIINTERNALISASI:',
    toast_xp_gained: 'PENGALAMAN BERTAMBAH:',
    toast_level_up: 'NAIK TINGKAT! POIN KEAHLIAN DIDAPATKAN',
    toast_damage_health: 'TERLUKA! DAYA TAHAN BERKURANG',
    toast_damage_morale: 'TERGUNCANG! KEWARASAN BERKURANG',
    audio_on: 'AUDIO: AKTIF',
    audio_off: 'AUDIO: MATI',
    scene_btn_markers: 'TITIK BUKTI',
    scene_btn_hidden: 'DISEMBUNYIKAN',
    scene_btn_radar: 'RADAR',
    scene_inspect_hint: 'PERIKSA BUKTI',
    dice_epiphany: 'PENCERAHAN MUTLAK! SUKSES KRITIS (ANGKA KEMBAR ENAM)',
    dice_snake_eyes: 'MATA ULAR! KEGAGALAN FATAL (ANGKA KEMBAR SATU)',
    cabinet_empty: 'Belum ada pikiran yang diendapkan. Renungkan bukti di tempat kejadian untuk memicu gagasan.',
    cabinet_researching: 'Sedang diinternalisasi...',
    cabinet_internalized_status: '✨ TEROBOSAN PSIKOLOGIS PERMANEN AKTIF',
    cabinet_btn_internalize: 'INTERNALISASI PIKIRAN INI',
    cabinet_locked_hint: 'Selidiki lebih lanjut di Menara Saint Irene untuk membuka pikiran ini.',
    cabinet_temp_box: 'Efek Perenungan Sementara',
    cabinet_perm_box: 'Terobosan Kejiwaan Permanen',
    inventory_empty: 'Kantong mantelmu hanya berisi serpihan kain dan penyesalan dingin.',
    clues_empty: 'Belum ada bukti penting yang tercatat. Teliti menara jam dengan cermat.',
    victory_lead: 'Penyelidik Utama:',
    victory_facet: 'Keahlian Utama:',
    victory_clues: 'Bukti Terkumpul:',
    victory_thoughts: 'Pikiran Diinternalisasi:',
    ending_coverup: 'Kebenaran di balik kematian Aurelia Vance telah terungkap. Lonceng keadilan berdentang melintasi Sektor 7.',
    dialogue_idle_prompt: 'Periksa titik bukti atau buka dossier kasus untuk melanjutkan penyelidikan.',
    dialogue_leave: '[Tinggalkan pengamatan & kembali ke TKP]',
    item_type_tool: 'ALAT',
    item_type_consumable: 'KONSUMSI',
    item_type_clue: 'BUKTI',
    item_type_relic: 'RELIK',
    buff_label: 'Bonus Keahlian:',
    profile_modal_title: 'DOSSIER DETEKTIF & PROFIL PSIKOLOGIS',
    profile_vitals_title: 'KONDISI VITAL & KETAHANAN',
    profile_progress_header: 'RESOLUSI KASUS',
    profile_time_label: 'WAKTU INVESTIGASI'
  },
  en: {
    toast_case_opened: 'Case File Opened: Aurelia Vance · Welcome to District 7, Detective {name}',
    game_title: 'A E N I G M A',
    case_badge: 'CASE #D4-04',
    archive_intro_text: 'Archive of previous homicide cases solved by Detective Renata Vance in District 7. Each resolved case uncovered a vital Keystone Evidence connecting to the same covert syndicate.',
    keystone_network_title: 'KEYSTONE EVIDENCE & CONSPIRACY WEB',
    from_prefix: 'FROM',
    status_secured: '✓ SECURED',
    status_unmasked: '✓ EXPOSED',
    status_inquiry: '⏳ IN INQUIRY',
    k4_unlocked_desc: 'Murder confession & 50,000 guilder bribery records fully exposed!',
    k4_pending_desc: 'Active inquiry in Saint Irene: search floorboard safe & extract suspect confession.',
    case_date_today: 'Today · 03:42 AM',
    case_date_final: 'Grand Inquiry Synthesis',
    case_tab_active: 'ACTIVE INQUIRY [#D4-04]',
    case_tab_archive: 'SOLVED ARCHIVE (3)',
    case_tab_master: 'MASTER CASE [#PRIME-00]',
    case_status_active: '⚡ ACTIVE INQUIRY',
    case_status_solved: '✓ SOLVED',
    case_status_master: '👑 MASTER CASE',
    keystone_secured: '✓ KEYSTONE CLUE SECURED',
    keystone_pending: '⏳ PENDING DISCOVERY',
    btn_synthesize_master: 'SYNTHESIZE CONSPIRACY EVIDENCE WEB',
    master_synthesis_ready: 'ALL 4 KEYSTONES SECURED! THE DISTRICT 7 SYNDICATE STANDS EXPOSED!',
    master_synthesis_not_ready: 'Conclusive evidence from Case #D4-04 still required to finalize synthesis.',
    loader_quote: '“The clock never stops. Only the flesh within it forgets how to beat.”',
    loader_telemetry: 'Initializing neural telemetry...',
    loader_enter: 'ENTER THE ARCHIVE',
    creator_title: 'INVESTIGATOR DOSSIER',
    creator_subtitle: 'CHARACTER CREATION',
    gender_female: '♀ FEMALE',
    gender_male: '♂ MALE',
    randomize_dossier: '🎲 RANDOMIZE DOSSIER',
    precinct_label: 'Precinct 4 Homicide Division · Eastern District 7',
    name_label: 'DETECTIVE FULL NAME',
    alias_label: 'ALIAS / PSYCHOLOGICAL TITLE',
    facets_title: 'FACETS OF PSYCHE',
    points_available: 'Points Available',
    intellect_name: 'INTELLECT',
    intellect_desc: 'Logic, Encyclopedia, Rhetoric, Conceptualization. Cold deduction and rational analysis.',
    psyche_name: 'PSYCHE',
    psyche_desc: 'Esoterica, Empathy, Authority, Suggestion. Supernatural hunches and emotional gravity.',
    physique_name: 'PHYSIQUE',
    physique_desc: 'Endurance, Pain Threshold, Electrochemistry. Adrenaline, gut instinct, and survival stamina.',
    motorics_name: 'MOTORICS',
    motorics_desc: 'Perception, Hand-Eye Coordination, Interfacing, Savoir Faire. Senses and micro-clues.',
    signature_title: 'SIGNATURE SKILL (+2 BONUS & INTRUSIVE VOICE)',
    vices_title: 'PERSONAL VICE & PSYCHOLOGICAL FLAW',
    start_inquiry: 'COMMENCE THE INQUIRY',
    endurance_label: 'ENDURANCE',
    morale_label: 'MORALE',
    hp_pip: 'HP',
    sp_pip: 'SP',
    day_prefix: 'DAY',
    nav_cabinet: '🧠 THOUGHT CABINET',
    nav_clues: '📌 CASE DOSSIER',
    nav_inventory: '💼 INVENTORY',
    nav_audio: 'AUDIO',
    nav_language: 'LANGUAGE',
    scene_location: 'Saint Irene Clocktower · District 7',
    scene_timestamp: 'Mistress Horologist Aurelia Vance · Body discovered at 03:42 AM mid-stroke',
    speaker_forensic: 'Forensic Observation',
    interlocutor_active: 'ACTIVE INTERACTION',
    modal_cabinet_title: 'THOUGHT CABINET',
    modal_inventory_title: 'DETECTIVE COAT & EVIDENCE BAG',
    modal_clues_title: 'CASE DOSSIER & MASTER INVESTIGATION BOARD',
    modal_dice_title: 'SKILL CHECK',
    modal_language_title: 'CHOOSE SUBTITLE & UI LANGUAGE',
    modal_victory_title: 'CASE CONCLUDED',
    modal_gameover_title: 'INVESTIGATION TERMINATED',
    dice_tally: '2D6 ROLL + MODIFIERS:',
    dice_rolling: 'ROLLING...',
    dice_passed: 'SKILL CHECK PASSED!',
    dice_failed: 'SKILL CHECK FAILED!',
    dice_proceed: 'PROCEED WITH OUTCOME',
    btn_restart: 'BEGIN A NEW INQUIRY',
    btn_retry: 'RETRY INVESTIGATION',
    btn_use: 'USE',
    btn_inspect: 'INSPECT',
    btn_read: 'READ',
    badge_passive: 'PASSIVE',
    badge_uses: 'uses left',
    toast_item_acquired: 'ITEM ACQUIRED:',
    toast_item_used: 'ITEM USED:',
    toast_clue_discovered: 'CRITICAL CLUE UNLOCKED:',
    toast_thought_unlocked: 'NEW THOUGHT DISCOVERED:',
    toast_thought_internalized: 'THOUGHT INTERNALIZED:',
    toast_xp_gained: 'EXPERIENCE GAINED:',
    toast_level_up: 'LEVEL UP! SKILL POINT GAINED',
    toast_damage_health: 'INJURED! ENDURANCE REDUCED',
    toast_damage_morale: 'SHAKEN! MORALE COMPROMISED',
    audio_on: 'AUDIO: ON',
    audio_off: 'AUDIO: OFF',
    scene_btn_markers: 'MARKERS',
    scene_btn_hidden: 'HIDDEN',
    scene_btn_radar: 'RADAR',
    scene_inspect_hint: 'INVESTIGATE',
    dice_epiphany: 'EPIPHANY! CRITICAL SUCCESS (DOUBLE SIX)',
    dice_snake_eyes: 'SNAKE EYES! CRITICAL FAILURE (DOUBLE ONES)',
    cabinet_empty: 'No thoughts currently incubating. Contemplate crime scene evidence to spark ideas.',
    cabinet_researching: 'Internalizing...',
    cabinet_internalized_status: '✨ PERMANENT BREAKTHROUGH ACTIVE',
    cabinet_btn_internalize: 'INTERNALIZE THIS THOUGHT',
    cabinet_locked_hint: 'Investigate further in Saint Irene to unlock this thought.',
    cabinet_temp_box: 'Temporary Contemplation Effect',
    cabinet_perm_box: 'Permanent Psychological Breakthrough',
    inventory_empty: 'Your coat pockets contain only lint and cold regret.',
    clues_empty: 'No critical evidence cataloged yet. Scrutinize the clocktower.',
    victory_lead: 'Lead Investigator:',
    victory_facet: 'Signature Facet:',
    victory_clues: 'Evidence Gathered:',
    victory_thoughts: 'Thoughts Internalized:',
    ending_coverup: 'The truth behind Aurelia Vance has been brought into the light. Justice tolls across District 7.',
    dialogue_idle_prompt: 'Examine points of interest or consult your clues dossier to proceed.',
    dialogue_leave: '[Step back & return to crime scene]',
    item_type_tool: 'TOOL',
    item_type_consumable: 'CONSUMABLE',
    item_type_clue: 'CLUE',
    item_type_relic: 'RELIC',
    buff_label: 'Skill Buff:',
    profile_modal_title: 'DETECTIVE DOSSIER & PSYCHOLOGICAL PROFILE',
    profile_vitals_title: 'VITALS & ENDURANCE',
    profile_progress_header: 'CASE RESOLUTION',
    profile_time_label: 'INVESTIGATION TIME'
  },
  ja: {
    toast_case_opened: '捜査ファイル開封：オレリア・ヴァンス · 第7管区へようこそ、{name}刑事',
    game_title: 'エ ニ グ マ',
    case_badge: '事件 #D4-04',
    archive_intro_text: 'レナータ・ヴァンス刑事が第7区で以前に解決した殺人事件の記録。解決した各事件は、同一の地下組織へと繋がる決定的な鍵証拠を残している。',
    keystone_network_title: '決定的証拠の相関陰謀網',
    from_prefix: '出処',
    status_secured: '✓ 確保済',
    status_unmasked: '✓ 暴露済',
    status_inquiry: '⏳ 捜査中',
    k4_unlocked_desc: '暗殺の自白と5万ギルダーの買収台帳が完全に露呈！',
    k4_pending_desc: '聖アイリーン塔にて捜査中：床下の金庫を捜索し、容疑者の自白を引き出せ。',
    case_date_today: '本日 · 午前03:42',
    case_date_final: '全事件総合立証',
    case_tab_active: '担当事件 [#D4-04]',
    case_tab_archive: '解決済調書 (3)',
    case_tab_master: '大事件 [#PRIME-00]',
    case_status_active: '⚡ 捜査中',
    case_status_solved: '✓ 解決済',
    case_status_master: '👑 大事件',
    keystone_secured: '✓ 決定的鍵証拠確保',
    keystone_pending: '⏳ 未解明',
    btn_synthesize_master: '陰謀の全相関関係を演繹統合する',
    master_synthesis_ready: '全4つの重要証拠が集結！第7区の暗黒組織を完全暴露！',
    master_synthesis_not_ready: '事件#D4-04の決定的な証拠がまだ不足しています。',
    loader_quote: '「時計の針は止まらない。止まるのは、鼓動を忘れた肉体だけだ。」',
    loader_telemetry: '神経テレメトリ初期化中...',
    loader_enter: 'アーカイブへアクセス',
    creator_title: '捜査官調書',
    creator_subtitle: 'キャラクター作成',
    gender_female: '♀ 女性',
    gender_male: '♂ 男性',
    randomize_dossier: '🎲 調書をランダム生成',
    precinct_label: '第4分署 凶悪犯罪課 · 東部第7区',
    name_label: '捜査官 氏名',
    alias_label: '通称 / 精神的肩書',
    facets_title: '精神の諸相',
    points_available: '割り振り可能ポイント',
    intellect_name: '知性',
    intellect_desc: '論理、百科事典、修辞学、概念化。冷徹な演繹と合理的分析。',
    psyche_name: '精神',
    psyche_desc: '秘教、共感、威信、暗示。超常的な予感と感情的重力。',
    physique_name: '肉体',
    physique_desc: '耐久力、痛覚閾値、生化学。アドレナリンと生存本能。',
    motorics_name: '運動神経',
    motorics_desc: '知覚、手眼協調、機構連動、処世術。鋭敏な五感と微小痕跡。',
    signature_title: '象徴技能 (+2 ボーナス & 内なる声)',
    vices_title: '個人的悪癖 & 精神の綻び',
    start_inquiry: '捜査を開始する',
    endurance_label: '肉体耐久',
    morale_label: '精神力',
    hp_pip: 'HP',
    sp_pip: 'SP',
    day_prefix: '日目',
    nav_cabinet: '🧠 思考の閣僚',
    nav_clues: '📌 証拠調書',
    nav_inventory: '💼 所持品',
    nav_audio: '音響',
    nav_language: '言語',
    scene_location: '聖アイリーン時計塔 · 第7区',
    scene_timestamp: '時計師オレリア・ヴァンス · 午前3時42分 鐘の途上で発見',
    speaker_forensic: '法医学的観察',
    interlocutor_active: '接触中',
    modal_cabinet_title: '思考の閣僚 · THOUGHT CABINET',
    modal_inventory_title: '捜査官コート & 証拠品袋',
    modal_clues_title: '事件調書＆合同捜査盤',
    modal_dice_title: '技能判定',
    modal_language_title: '字幕および表示言語を選択',
    modal_victory_title: '事件解決',
    modal_gameover_title: '捜査終了: 殉職 / 破滅',
    dice_tally: '2D6 ダイス + 修正値:',
    dice_rolling: 'ダイス回転中...',
    dice_passed: '判定成功！',
    dice_failed: '判定失敗！',
    dice_proceed: '結果を受け入れて続行',
    btn_restart: '新たな捜査を開始',
    btn_retry: '事件を再捜査する',
    btn_use: '使用',
    btn_inspect: '調査',
    btn_read: '読了',
    badge_passive: '常時発動',
    badge_uses: '回使用可能',
    toast_item_acquired: '証拠品入手:',
    toast_item_used: 'アイテム使用:',
    toast_clue_discovered: '決定的手掛かり発見:',
    toast_thought_unlocked: '新たな思考が芽生えた:',
    toast_thought_internalized: '思考の内面化が完了:',
    toast_xp_gained: '経験値獲得:',
    toast_level_up: 'レベル上昇！技能ポイント獲得',
    toast_damage_health: '負傷！耐久値減少',
    toast_damage_morale: '精神動揺！精神力減少',
    audio_on: '音響: オン',
    audio_off: '音響: オフ',
    scene_btn_markers: '証拠マーカー',
    scene_btn_hidden: '非表示',
    scene_btn_radar: 'レーダー',
    scene_inspect_hint: '詳しく調べる',
    dice_epiphany: '神聖なる啓示！クリティカル成功 (ゾロ目 6)',
    dice_snake_eyes: 'スネークアイズ！痛恨のファンブル (ゾロ目 1)',
    cabinet_empty: '現在醸成中の思考はありません。事件現場の証拠を熟考し、閃きを得てください。',
    cabinet_researching: '内面化の進行中...',
    cabinet_internalized_status: '✨ 恒久的な精神の覚醒が有効',
    cabinet_btn_internalize: 'この思考を内面化する',
    cabinet_locked_hint: '聖アイリーン時計塔をさらに捜査することで、この思考が閃きます。',
    cabinet_temp_box: '一時的な熟考による影響',
    cabinet_perm_box: '内面化完了による恒久覚醒',
    inventory_empty: 'コートのポケットには埃と冷えた後悔しか残されていない。',
    clues_empty: '決定的証拠はまだ調書に記録されていません。時計塔を精査してください。',
    victory_lead: '主任捜査官:',
    victory_facet: '象徴的技能:',
    victory_clues: '収集された決定的証拠:',
    victory_thoughts: '内面化された思考閣僚:',
    ending_coverup: 'オレリア・ヴァンスの死の真相は白日の下に晒された。第7区に真実の鐘が鳴り響く。',
    dialogue_idle_prompt: '捜査対象を調べるか、証拠調書を確認して捜査を進めてください。',
    dialogue_leave: '[観察を終えて現場に戻る]',
    item_type_tool: '道具',
    item_type_consumable: '消耗品',
    item_type_clue: '手掛かり',
    item_type_relic: '遺物',
    buff_label: 'スキル強化:',
    profile_modal_title: '刑事調書・精神プロファイル',
    profile_vitals_title: 'バイタル＆耐久状態',
    profile_progress_header: '事件解決進捗',
    profile_time_label: '捜査経過時間'
  },
  zh: {
    toast_case_opened: '案件档案已开启：奥蕾莉亚·梵斯 · 欢迎来到第七区，{name}探长',
    game_title: 'A E N I G M A',
    case_badge: '案件 #D4-04',
    archive_intro_text: '雷娜塔·万斯探长此前在第七区成功告破的谋杀案卷。每起案件结案后均留下一项关键铁证，直指同一幕后黑金结社。',
    keystone_network_title: '核心罪证与全域阴谋网络',
    from_prefix: '来自',
    status_secured: '✓ 已锁定',
    status_unmasked: '✓ 彻底曝光',
    status_inquiry: '⏳ 侦查中',
    k4_unlocked_desc: '谋杀买凶自白与5万盾巨额贿赂账目已彻底浮出水面！',
    k4_pending_desc: '圣艾琳钟楼现场侦查中：搜查暗格保险箱并撬开嫌疑人口供。',
    case_date_today: '今日 · 凌晨03:42',
    case_date_final: '终极调查综合研判',
    case_tab_active: '当前案件 [#D4-04]',
    case_tab_archive: '已破结案档案 (3)',
    case_tab_master: '终极主案 [#PRIME-00]',
    case_status_active: '⚡ 调查中',
    case_status_solved: '✓ 已告破',
    case_status_master: '👑 终极主案',
    keystone_secured: '✓ 核心罪证已锁定',
    keystone_pending: '⏳ 尚未揭晓',
    btn_synthesize_master: '梳理并串联全域阴谋证据链',
    master_synthesis_ready: '全部4项核心罪证已齐备！第七区黑金结社黑幕彻底揭露！',
    master_synthesis_not_ready: '仍需第#D4-04案的关键铁证方可串联全网。',
    loader_quote: '“钟摆永不停歇。唯有齿轮间的血肉，遗忘了跳动的律动。”',
    loader_telemetry: '神经遥测初始化中...',
    loader_enter: '进入档案库',
    creator_title: '调查员档案',
    creator_subtitle: '角色塑造',
    gender_female: '♀ 女性',
    gender_male: '♂ 男性',
    randomize_dossier: '🎲 随机生成档案',
    precinct_label: '第四警区凶杀科 · 东部第七区',
    name_label: '侦探全名',
    alias_label: '化名 / 心理头衔',
    facets_title: '心智维度',
    points_available: '可用属性点',
    intellect_name: '智力',
    intellect_desc: '逻辑、百科全书、修辞、概念化。冷酷演绎与理性洞察。',
    psyche_name: '心智',
    psyche_desc: '秘教、同理心、权威、暗示。通灵直觉与情感引力。',
    physique_name: '体魄',
    physique_desc: '忍耐力、痛觉阈值、电化学。肾上腺素与原始生存本能。',
    motorics_name: '身手',
    motorics_desc: '感知、手眼协调、机械交互、从容自若。敏锐感官与微观痕迹。',
    signature_title: '专精技能 (+2 增益与心之低语)',
    vices_title: '人格缺陷与恶习',
    start_inquiry: '开启侦查',
    endurance_label: '体能',
    morale_label: '理智',
    hp_pip: 'HP',
    sp_pip: 'SP',
    day_prefix: '第',
    nav_cabinet: '🧠 思维内阁',
    nav_clues: '📌 案卷证据',
    nav_inventory: '💼 物品栏',
    nav_audio: '音频',
    nav_language: '语言',
    scene_location: '圣艾琳钟楼 · 第七区',
    scene_timestamp: '钟表宗师奥蕾莉亚·梵斯 · 凌晨03:42于钟摆撞击间身亡',
    speaker_forensic: '法医现场观察',
    interlocutor_active: '交互中',
    modal_cabinet_title: '思维内阁 · THOUGHT CABINET',
    modal_inventory_title: '风衣内衬与物证袋',
    modal_clues_title: '案件档案与主调查板',
    modal_dice_title: '技能检定',
    modal_language_title: '选择字幕及交互语言',
    modal_victory_title: '案情告破',
    modal_gameover_title: '调查溃败: 绝境终结',
    dice_tally: '2D6 掷骰 + 修正值:',
    dice_rolling: '掷骰中...',
    dice_passed: '检定通过！',
    dice_failed: '检定失败！',
    dice_proceed: '承接检定后果',
    btn_restart: '开启新案调查',
    btn_retry: '重启案情调查',
    btn_use: '使用',
    btn_inspect: '检视',
    btn_read: '研读',
    badge_passive: '被动生效',
    badge_uses: '次剩余',
    toast_item_acquired: '获得证物:',
    toast_item_used: '使用物品:',
    toast_clue_discovered: '揭示关键线索:',
    toast_thought_unlocked: '解锁新思绪:',
    toast_thought_internalized: '思绪已完全内化:',
    toast_xp_gained: '获得经验:',
    toast_level_up: '等级提升！获得技能点',
    toast_damage_health: '受伤！体能扣减',
    toast_damage_morale: '精神受创！理智扣减',
    audio_on: '音频: 开启',
    audio_off: '音频: 关闭',
    scene_btn_markers: '证据标点',
    scene_btn_hidden: '隐藏',
    scene_btn_radar: '雷达扫描',
    scene_inspect_hint: '勘查取证',
    dice_epiphany: '顿悟神启！大获全胜 (双六满点)',
    dice_snake_eyes: '蛇眼绝境！惨痛败北 (双一骰灾)',
    cabinet_empty: '暂无正在孕育的思绪。仔细推敲现场线索以激发心智火花。',
    cabinet_researching: '深度推演沉淀中...',
    cabinet_internalized_status: '✨ 恒久心智顿悟已激活',
    cabinet_btn_internalize: '内化此项心智思绪',
    cabinet_locked_hint: '在圣艾琳钟楼展开更深层的调查以解锁此思绪。',
    cabinet_temp_box: '沉思期间的暂时代价',
    cabinet_perm_box: '彻底内化后的心智质变',
    inventory_empty: '风衣口袋里空空如也，只剩下冷雨与悔恨。',
    clues_empty: '案卷尚未收录关键物证。请仔细勘查钟楼。',
    victory_lead: '首席调查官:',
    victory_facet: '核心心智专精:',
    victory_clues: '破案关键物证:',
    victory_thoughts: '已内化思维格言:',
    ending_coverup: '奥蕾莉亚·梵斯离奇命案的真相终见天日。正义之钟在第七区上空悲鸣回荡。',
    dialogue_idle_prompt: '调查现场标点或查阅证据档案以继续推演案情。',
    dialogue_leave: '[暂离此处，返回现场]',
    item_type_tool: '工具',
    item_type_consumable: '消耗品',
    item_type_clue: '线索',
    item_type_relic: '遗物',
    buff_label: '技能增益:',
    profile_modal_title: '侦探档案与心理侧写',
    profile_vitals_title: '生命体征与生存状态',
    profile_progress_header: '案情推进进度',
    profile_time_label: '调查历时'
  },
  ko: {
    toast_case_opened: '사건 파일 개시: 오렐리아 밴스 · 제7구역에 오신 것을 환영합니다, {name} 형사님',
    game_title: 'A E N I G M A',
    case_badge: '사건 #D4-04',
    archive_intro_text: '레나타 반스 형사가 제7구역에서 이전에 해결한 살인 사건 기록입니다. 해결된 각 사건은 동일한 암흑 신디케이트로 이어지는 결정적 핵심 단서를 남겼습니다.',
    keystone_network_title: '핵심 증거 연계 및 거대 음모망',
    from_prefix: '출처',
    status_secured: '✓ 확보됨',
    status_unmasked: '✓ 진상 규명',
    status_inquiry: '⏳ 수사 진행 중',
    k4_unlocked_desc: '살인 청부 자백과 5만 길더 뇌물 장부가 완전히 드러났습니다!',
    k4_pending_desc: '성 아이린 탑 현장 수사 중: 바닥 금고를 수색하고 용의자의 자백을 확보하십시오.',
    case_date_today: '오늘 · 오전 03:42',
    case_date_final: '최종 종합 수사 결론',
    case_tab_active: '진행 사건 [#D4-04]',
    case_tab_archive: '해결된 사건철 (3)',
    case_tab_master: '최종 주 사건 [#PRIME-00]',
    case_status_active: '⚡ 수사 진행 중',
    case_status_solved: '✓ 해결 완료',
    case_status_master: '👑 최종 주 사건',
    keystone_secured: '✓ 핵심 단서 확보',
    keystone_pending: '⏳ 미해결',
    btn_synthesize_master: '음모의 모든 연결 고리를 연역 종합',
    master_synthesis_ready: '4대 핵심 증거 확보 완료! 제7구역 암흑 신디케이트의 전모가 드러났습니다!',
    master_synthesis_not_ready: '종합 수사를 완성하려면 사건 #D4-04의 결정적 단서가 더 필요합니다.',
    loader_quote: '“시계는 결코 멈추지 않는다. 멈추는 것은 고동을 잊은 육신뿐.”',
    loader_telemetry: '신경 원격 측정 초기화 중...',
    loader_enter: '기록 보관소 진입',
    creator_title: '수사관 기록부',
    creator_subtitle: '캐릭터 생성',
    gender_female: '♀ 여성',
    gender_male: '♂ 남성',
    randomize_dossier: '🎲 기록부 무작위 생성',
    precinct_label: '제4관할서 강력계 · 동부 제7구역',
    name_label: '형사 성명',
    alias_label: '이명 / 심리적 직함',
    facets_title: '심리적 특성',
    points_available: '잔여 포인트',
    intellect_name: '지성',
    intellect_desc: '논리, 백과사전, 수사학, 개념화. 냉철한 연역과 이성적 분석.',
    psyche_name: '정신',
    psyche_desc: '비전, 공감, 권위, 암시. 초자연적 직관과 감정적 중력.',
    physique_name: '신체',
    physique_desc: '인내력, 통증 역치, 전기화학. 아드레날린과 원초적 생존 본능.',
    motorics_name: '운동능력',
    motorics_desc: '지각, 손-눈 협응, 기계연동, 처세술. 미세한 단서 포착력.',
    signature_title: '시그니처 기술 (+2 보너스 & 내면의 목소리)',
    vices_title: '개인적 악벽과 정신적 결함',
    start_inquiry: '본격 수사 착수',
    endurance_label: '체력',
    morale_label: '사기',
    hp_pip: 'HP',
    sp_pip: 'SP',
    day_prefix: '일차',
    nav_cabinet: '🧠 생각의 방',
    nav_clues: '📌 증거 서류',
    nav_inventory: '💼 소지품',
    nav_audio: '오디오',
    nav_language: '언어',
    scene_location: '성 아이린 시계탑 · 제7구역',
    scene_timestamp: '시계 장인 오렐리아 밴스 · 오전 03:42 진자 궤적에서 피살체 발견',
    speaker_forensic: '법의학적 관찰',
    interlocutor_active: '상호작용 중',
    modal_cabinet_title: '생각의 방 · THOUGHT CABINET',
    modal_inventory_title: '외투 주머니 & 증거물 가방',
    modal_clues_title: '사건 서류철 및 종합 수사 본부',
    modal_dice_title: '기술 판정',
    modal_language_title: '자막 및 인터페이스 언어 선택',
    modal_victory_title: '사건 종결',
    modal_gameover_title: '수사 파탄: 파멸',
    dice_tally: '2D6 굴림 + 보정치:',
    dice_rolling: '주사위 굴리는 중...',
    dice_passed: '판정 성공!',
    dice_failed: '판정 실패!',
    dice_proceed: '결과 수용 및 진행',
    btn_restart: '새로운 수사 개시',
    btn_retry: '수사 재시도',
    btn_use: '사용',
    btn_inspect: '조사',
    btn_read: '열독',
    badge_passive: '지속 효과',
    badge_uses: '회 남음',
    toast_item_acquired: '증거물 획득:',
    toast_item_used: '아이템 사용:',
    toast_clue_discovered: '결정적 단서 발견:',
    toast_thought_unlocked: '새로운 발상 해금:',
    toast_thought_internalized: '발상 내면화 완료:',
    toast_xp_gained: '경험치 획득:',
    toast_level_up: '레벨 업! 기술 포인트 획득',
    toast_damage_health: '부상! 체력 감소',
    toast_damage_morale: '충격! 사기 저하',
    audio_on: '오디오: 켜짐',
    audio_off: '오디오: 꺼짐',
    scene_btn_markers: '증거 표식',
    scene_btn_hidden: '숨김',
    scene_btn_radar: '레이더 탐지',
    scene_inspect_hint: '단서 조사',
    dice_epiphany: '번뜩이는 영감! 대성공 (주사위 6 더블)',
    dice_snake_eyes: '뱀의 눈! 치명적 대실패 (주사위 1 더블)',
    cabinet_empty: '현재 내면화 중인 생각이 없습니다. 사건 현장의 단서를 곱씹어 새로운 발상을 떠올리세요.',
    cabinet_researching: '생각을 내면화하는 중...',
    cabinet_internalized_status: '✨ 영구적 심리 각성 효과 활성화',
    cabinet_btn_internalize: '이 생각을 내면화하기',
    cabinet_locked_hint: '성 아이린 시계탑을 더 깊이 조사하여 이 생각을 떠올리십시오.',
    cabinet_temp_box: '임시 사색 상태 이상',
    cabinet_perm_box: '영구적 정신적 돌파구',
    inventory_empty: '외투 주머니에는 차가운 후회와 먼지뿐입니다.',
    clues_empty: '아직 기록된 핵심 증거가 없습니다. 시계탑을 철저히 수색하십시오.',
    victory_lead: '수석 수사관:',
    victory_facet: '특화 기술:',
    victory_clues: '수집된 핵심 증거:',
    victory_thoughts: '내면화 완료된 사유:',
    ending_coverup: '오렐리아 밴스의 죽음에 얽힌 진실이 마침내 밝혀졌습니다. 제7구역 전역에 정의의 종소리가 울려 퍼집니다.',
    dialogue_idle_prompt: '현장 증거를 조사하거나 사건 조서를 열어 수사를 진행하십시오.',
    dialogue_leave: '[관찰을 마치고 현장으로 돌아간다]',
    item_type_tool: '도구',
    item_type_consumable: '소모품',
    item_type_clue: '단서',
    item_type_relic: '유물',
    buff_label: '스킬 강화:',
    profile_modal_title: '형사 조서 및 심리 프로필',
    profile_vitals_title: '활력 징후 및 생존 상태',
    profile_progress_header: '사건 해결 진행',
    profile_time_label: '수사 경과 시간'
  },
  es: {
    toast_case_opened: 'Expediente del caso abierto: Aurelia Vance · Bienvenido al Distrito 7, Detective {name}',
    game_title: 'A E N I G M A',
    case_badge: 'CASO #04: LA RELOJERA SILENCIOSA',
    loader_quote: '“El reloj nunca se detiene. Solo la carne en su interior olvida cómo latir.”',
    loader_telemetry: 'Iniciando telemetría neuronal...',
    loader_enter: 'ACCEDER AL ARCHIVO',
    creator_title: 'EXPEDIENTE DE INVESTIGADOR',
    creator_subtitle: 'CREACIÓN DE PERSONAJE',
    gender_female: '♀ FEMENINO',
    gender_male: '♂ MASCULINO',
    randomize_dossier: '🎲 EXPEDIENTE ALEATORIO',
    precinct_label: 'División de Homicidios Precinto 4 · Distrito Oriental 7',
    name_label: 'NOMBRE COMPLETO DEL DETECTIVE',
    alias_label: 'ALIAS / TÍTULO PSICOLÓGICO',
    facets_title: 'FACETAS DE LA PSIQUE',
    points_available: 'Puntos Disponibles',
    intellect_name: 'INTELECTO',
    intellect_desc: 'Lógica, Enciclopedia, Retórica, Conceptualización. Deducción fría y análisis racional.',
    psyche_name: 'PSIQUE',
    psyche_desc: 'Esoterismo, Empatía, Autoridad, Sugestión. Corazonadas sobrenaturales y peso emocional.',
    physique_name: 'FÍSICO',
    physique_desc: 'Aguante, Umbral de Dolor, Electroquímica. Adrenalina, instinto visceral y supervivencia.',
    motorics_name: 'MOTRICIDAD',
    motorics_desc: 'Percepción, Coordinación Ojo-Mano, Interfaz, Savoir Faire. Sentidos agudos y micro-pistas.',
    signature_title: 'HABILIDAD DISTINTIVA (+2 BONO Y VOZ INTRUSIVA)',
    vices_title: 'VICIOS PERSONALES Y GRIETAS PSÍQUICAS',
    start_inquiry: 'COMENZAR LA INDAGATORIA',
    endurance_label: 'AGUANTE',
    morale_label: 'MORAL',
    hp_pip: 'HP',
    sp_pip: 'SP',
    day_prefix: 'DÍA',
    nav_cabinet: '🧠 GABINETE DE IDEAS',
    nav_clues: '📌 EXPEDIENTE DE PISTAS',
    nav_inventory: '💼 INVENTARIO',
    nav_audio: 'AUDIO',
    nav_language: 'IDIOMA',
    scene_location: 'Torre del Reloj de Santa Irene · Distrito 7',
    scene_timestamp: 'Maestra Horóloga Aurelia Vance · Cuerpo hallado a las 03:42 AM a medio toque',
    speaker_forensic: 'Observación Forense',
    interlocutor_active: 'INTERACCIÓN ACTIVA',
    modal_cabinet_title: 'GABINETE DE IDEAS · THOUGHT CABINET',
    modal_inventory_title: 'ABRIGO DE DETECTIVE Y BOLSA DE PRUEBAS',
    modal_clues_title: 'EXPEDIENTE DEL CASO · MATRIZ DE DEDUCCIÓN',
    modal_dice_title: 'TIRADA DE HABILIDAD',
    modal_language_title: 'SELECCIONAR IDIOMA DE SUBTÍTULOS E INTERFAZ',
    modal_victory_title: 'CASO CONCLUIDO',
    modal_gameover_title: 'INVESTIGACIÓN TERMINADA: COLAPSO',
    dice_tally: 'TIRADA 2D6 + MODIFICADORES:',
    dice_rolling: 'RODANDO DADOS...',
    dice_passed: '¡TIRADA SUPERADA!',
    dice_failed: '¡TIRADA FALLIDA!',
    dice_proceed: 'CONTINUAR CON EL RESULTADO',
    btn_restart: 'INICIAR NUEVA PESQUISA',
    btn_retry: 'REINTENTAR INVESTIGACIÓN',
    btn_use: 'USAR',
    btn_inspect: 'INSPECCIONAR',
    btn_read: 'LEER',
    badge_passive: 'PASIVO',
    badge_uses: 'usos restantes',
    toast_item_acquired: 'OBJETO OBTENIDO:',
    toast_item_used: 'OBJETO USADO:',
    toast_clue_discovered: 'PISTA CRUCIAL DESCUBIERTA:',
    toast_thought_unlocked: 'NUEVA IDEA DESBLOQUEADA:',
    toast_thought_internalized: 'IDEA INTERIORIZADA:',
    toast_xp_gained: 'EXPERIENCIA OBTENIDA:',
    toast_level_up: '¡SUBIDA DE NIVEL! PUNTO DE HABILIDAD',
    toast_damage_health: '¡HERIDO! AGUANTE REDUCIDO',
    toast_damage_morale: '¡IMPACTO! MORAL COMPROMETIDA'
  },
  fr: {
    toast_case_opened: 'Dossier de l\'affaire ouvert : Aurelia Vance · Bienvenue dans le District 7, Détective {name}',
    game_title: 'A E N I G M A',
    case_badge: 'DOSSIER #04: L\'HORLOGÈRE SILENCIEUSE',
    loader_quote: '« L\'horloge ne s\'arrête jamais. Seule la chair en son sein oublie comment battre. »',
    loader_telemetry: 'Initialisation de la télémétrie neurale...',
    loader_enter: 'ACCÉDER AUX ARCHIVES',
    creator_title: 'DOSSIER D\'ENQUÊTEUR',
    creator_subtitle: 'CRÉATION DE PERSONNAGE',
    gender_female: '♀ FEMME',
    gender_male: '♂ HOMME',
    randomize_dossier: '🎲 DOSSIER ALÉATOIRE',
    precinct_label: 'Division des Homicides · 4e District Est 7',
    name_label: 'NOM COMPLET DU DÉTECTIVE',
    alias_label: 'ALIAS / TITRE PSYCHOLOGIQUE',
    facets_title: 'FACETTES DE LA PSYCHÉ',
    points_available: 'Points Disponibles',
    intellect_name: 'INTELLECT',
    intellect_desc: 'Logique, Encyclopédie, Rhétorique, Conceptualisation. Froide déduction et analyse rationnelle.',
    psyche_name: 'PSYCHÉ',
    psyche_desc: 'Ésotérisme, Empathie, Autorité, Suggestion. Intuitions surnaturelles et gravité émotionnelle.',
    physique_name: 'PHYSIQUE',
    physique_desc: 'Endurance, Seuil de Douleur, Électrochimie. Adrénaline, instinct viscéral et survie.',
    motorics_name: 'MOTRICITÉ',
    motorics_desc: 'Perception, Coordination Main-Œil, Interfaçage, Savoir-Faire. Sens affûtés et micro-indices.',
    signature_title: 'COMPÉTENCE SIGNATURE (+2 BONUS & VOIX INTRUSIVE)',
    vices_title: 'VICES PERSONNELS & FAILLES PSYCHIQUES',
    start_inquiry: 'OUVRIR L\'ENQUÊTE',
    endurance_label: 'ENDURANCE',
    morale_label: 'MORAL',
    hp_pip: 'PV',
    sp_pip: 'PM',
    day_prefix: 'JOUR',
    nav_cabinet: '🧠 CABINET DE RÉFLEXION',
    nav_clues: '📌 REGISTRE D\'INDICES',
    nav_inventory: '💼 INVENTAIRE',
    nav_audio: 'AUDIO',
    nav_language: 'LANGUE',
    scene_location: 'Tour de l\'Horloge Sainte-Irène · 7e District',
    scene_timestamp: 'Maîtresse Horlogère Aurelia Vance · Corps découvert à 03h42 au milieu du carillon',
    speaker_forensic: 'Constatations Médico-Légales',
    interlocutor_active: 'INTERACTION EN COURS',
    modal_cabinet_title: 'CABINET DE RÉFLEXION · THOUGHT CABINET',
    modal_inventory_title: 'MANTEAU DE DÉTECTIVE & SACHET DE PREUVES',
    modal_clues_title: 'DOSSIER D\'AFFAIRE · MATRICE DE DÉDUCTION',
    modal_dice_title: 'TEST DE COMPÉTENCE',
    modal_language_title: 'CHOISIR LA LANGUE DES SOUS-TITRES & INTERFACE',
    modal_victory_title: 'AFFAIRE CLÔTURÉE',
    modal_gameover_title: 'ENQUÊTE INTERROMPUE: EFFONDREMENT',
    dice_tally: 'LANCER 2D6 + MODIFICATEURS:',
    dice_rolling: 'LANCER EN COURS...',
    dice_passed: 'TEST RÉUSSI !',
    dice_failed: 'TEST ÉCHOUÉ !',
    dice_proceed: 'ACCEPTER LE RÉSULTAT',
    btn_restart: 'OUVRIR UNE NOUVELLE ENQUÊTE',
    btn_retry: 'RECOMMENCER L\'ENQUÊTE',
    btn_use: 'UTILISER',
    btn_inspect: 'INSPECTER',
    btn_read: 'LIRE',
    badge_passive: 'PASSIF',
    badge_uses: 'utilisations restantes',
    toast_item_acquired: 'OBJET REÇU:',
    toast_item_used: 'OBJET CONSOMMÉ:',
    toast_clue_discovered: 'INDICE MAJEUR IDENTIFIÉ:',
    toast_thought_unlocked: 'NOUVELLE PENSÉE ÉVEILLÉE:',
    toast_thought_internalized: 'PENSÉE INTERNALISÉE:',
    toast_xp_gained: 'EXPÉRIENCE ENGRANGÉE:',
    toast_level_up: 'MONTÉE DE NIVEAU ! POINT DE COMPÉTENCE',
    toast_damage_health: 'BLESSURE ! ENDURANCE DIMINUÉE',
    toast_damage_morale: 'CHOC MENTAL ! MORAL COMPROMIS'
  },
  de: {
    toast_case_opened: 'Fallakte geöffnet: Aurelia Vance · Willkommen im Bezirk 7, Detective {name}',
    game_title: 'A E N I G M A',
    case_badge: 'FALL #04: DIE STUMME UHRMACHERIN',
    loader_quote: '„Die Uhr hält niemals an. Nur das Fleisch in ihrem Inneren vergisst das Schlagen.“',
    loader_telemetry: 'Neuraltelemetrie wird initialisiert...',
    loader_enter: 'DAS ARCHIV BETRETEN',
    creator_title: 'ERMITTLER-DOSSIER',
    creator_subtitle: 'CHARAKTERERSTELLUNG',
    gender_female: '♀ WEIBLICH',
    gender_male: '♂ MÄNNLICH',
    randomize_dossier: '🎲 DOSSIER ZUFÄLLIG WÄHLEN',
    precinct_label: 'Mordkommission Revier 4 · Östlicher Distrikt 7',
    name_label: 'VOLLSTÄNDIGER NAME',
    alias_label: 'BEINAME / PSYCHOLOGISCHER TITEL',
    facets_title: 'FACETTEN DER PSYCHE',
    points_available: 'Verfügbare Punkte',
    intellect_name: 'INTELLEKT',
    intellect_desc: 'Logik, Enzyklopädie, Rhetorik, Konzeptualisierung. Kühle Deduktion und rationale Analyse.',
    psyche_name: 'PSYCHE',
    psyche_desc: 'Esoterik, Empathie, Autorität, Suggestion. Übernatürliche Ahnungen und emotionale Schwere.',
    physique_name: 'PHYSIS',
    physique_desc: 'Ausdauer, Schmerzgrenze, Elektrochemie. Adrenalin, Urinstinkt und Überlebenswille.',
    motorics_name: 'MOTORIK',
    motorics_desc: 'Wahrnehmung, Hand-Auge-Koordination, Mechanik, Savoir-Faire. Schärfe der Sinne und Mikrohinweise.',
    signature_title: 'SIGNATURFÄHIGKEIT (+2 BONUS & INNERE STIMME)',
    vices_title: 'PERSÖNLICHE LASTER & PSYCHISCHE RISSE',
    start_inquiry: 'ERMITTLUNG AUFNEHMEN',
    endurance_label: 'AUSDAUER',
    morale_label: 'MORAL',
    hp_pip: 'HP',
    sp_pip: 'MP',
    day_prefix: 'TAG',
    nav_cabinet: '🧠 GEDANKENKABINETT',
    nav_clues: '📌 BEWEISDOSSIER',
    nav_inventory: '💼 INVENTAR',
    nav_audio: 'AUDIO',
    nav_language: 'SPRACHE',
    scene_location: 'Sankt-Irene-Uhrturm · Distrikt 7',
    scene_timestamp: 'Meister-Horologin Aurelia Vance · Leichnam um 03:42 Uhr im Glockenschlag aufgefunden',
    speaker_forensic: 'Forensische Beobachtung',
    interlocutor_active: 'AKTIVE INTERAKTION',
    modal_cabinet_title: 'GEDANKENKABINETT · THOUGHT CABINET',
    modal_inventory_title: 'ERMITTLERMANTEL & ASSERVATENBEUTEL',
    modal_clues_title: 'FALLAKTE · INDIZIEN-DEDUKTIONSMATRIX',
    modal_dice_title: 'FÄHIGKEITSPROBE',
    modal_language_title: 'UNTERTITEL & BENUTZEROBERFLÄCHE WÄHLEN',
    modal_victory_title: 'FALL ABGESCHLOSSEN',
    modal_gameover_title: 'ERMITTLUNG GESCHEITERT: ZUSAMMENBRUCH',
    dice_tally: '2D6 WURF + MODIFIKATOREN:',
    dice_rolling: 'WÜRFEL ROLLEN...',
    dice_passed: 'PROBE BESTANDEN!',
    dice_failed: 'PROBE MISSLUNGEN!',
    dice_proceed: 'MIT ERGEBNIS FORTFAHREN',
    btn_restart: 'NEUE ERMITTLUNG BEGINNEN',
    btn_retry: 'FALL NEU AUFROLLEN',
    btn_use: 'NUTZEN',
    btn_inspect: 'UNTERSUCHEN',
    btn_read: 'LESEN',
    badge_passive: 'PASSIV',
    badge_uses: 'Nutzungen übrig',
    toast_item_acquired: 'GEGENSTAND GEFUNDEN:',
    toast_item_used: 'GEGENSTAND GENUTZT:',
    toast_clue_discovered: 'ENTSCHEIDENDER HINWEIS:',
    toast_thought_unlocked: 'NEUER GEDANKE ENTHÜLLT:',
    toast_thought_internalized: 'GEDANKE VERINNERLICHT:',
    toast_xp_gained: 'ERFAHRUNG GEWONNEN:',
    toast_level_up: 'STUFENAUFSTIEG! FÄHIGKEITSPUNKT',
    toast_damage_health: 'VERLETZT! AUSDAUER GESUNKEN',
    toast_damage_morale: 'ERSCHÜTTERT! MORAL GESCHWÄCHT'
  },
  ru: {
    toast_case_opened: 'Дело открыто: Аурелия Вэнс · Добро пожаловать в Седьмой Район, детектив {name}',
    game_title: 'А Э Н И Г М А',
    case_badge: 'ДЕЛО #04: БЕЗМОЛВНЫЙ ЧАСОВЩИК',
    loader_quote: '«Часы никогда не останавливаются. Лишь плоть внутри них забывает, как биться».',
    loader_telemetry: 'Инициализация нейротелеметрии...',
    loader_enter: 'ВОЙТИ В АРХИВ',
    creator_title: 'ДОСЬЕ СЛЕДОВАТЕЛЯ',
    creator_subtitle: 'СОЗДАНИЕ ПЕРСОНАЖА',
    gender_female: '♀ ЖЕНЩИНА',
    gender_male: '♂ МУЖЧИНА',
    randomize_dossier: '🎲 СЛУЧАЙНОЕ ДОСЬЕ',
    precinct_label: 'Убойный отдел 4-го участка · Восточный сектор 7',
    name_label: 'ПОЛНОЕ ИМЯ ДЕТЕКТИВА',
    alias_label: 'ПСЕВДОНИМ / ПСИХОЛОГИЧЕСКИЙ ТИТУЛ',
    facets_title: 'ГРАНИ ПСИХИКИ',
    points_available: 'Доступно очков',
    intellect_name: 'ИНТЕЛЛЕКТ',
    intellect_desc: 'Логика, Энциклопедия, Риторика, Концептуализация. Холодная дедукция и рациональный анализ.',
    psyche_name: 'ПСИХИКА',
    psyche_desc: 'Эзотерика, Эмпатия, Авторитет, Внушение. Сверхъестественные предчувствия и эмоциональный вес.',
    physique_name: 'ФИЗИОЛОГИЯ',
    physique_desc: 'Стойкость, Болевой порог, Электрохимия. Адреналин, нутряное чутье и выживание.',
    motorics_name: 'МОТОРИКА',
    motorics_desc: 'Восприятие, Координация, Взаимодействие, Сноровка. Острые чувства и микро-улики.',
    signature_title: 'КОРОННЫЙ НАВЫК (+2 БОНУС И ВНУТРЕННИЙ ГОЛОС)',
    vices_title: 'ЛИЧНЫЕ ПОРОКИ И ПСИХИЧЕСКИЕ НАДЛОМЫ',
    start_inquiry: 'НАЧАТЬ РАССЛЕДОВАНИЕ',
    endurance_label: 'СТОЙКОСТЬ',
    morale_label: 'БОЕВОЙ ДУХ',
    hp_pip: 'ЗДР',
    sp_pip: 'ДУХ',
    day_prefix: 'ДЕНЬ',
    nav_cabinet: '🧠 КАБИНЕТ МЫСЛЕЙ',
    nav_clues: '📌 ДОСЬЕ УЛИК',
    nav_inventory: '💼 ИНВЕНТАРЬ',
    nav_audio: 'ЗВУК',
    nav_language: 'ЯЗЫК',
    scene_location: 'Часовая башня Святой Ирины · Сектор 7',
    scene_timestamp: 'Мастер-часовщик Аурелия Вэнс · Тело обнаружено в 03:42 посреди боя курантов',
    speaker_forensic: 'Судебно-медицинский осмотр',
    interlocutor_active: 'АКТИВНЫЙ ДИАЛОГ',
    modal_cabinet_title: 'КАБИНЕТ МЫСЛЕЙ · THOUGHT CABINET',
    modal_inventory_title: 'ПАЛЬТО ДЕТЕКТИВА И МЕШОК С ВЕЩДОКАМИ',
    modal_clues_title: 'МАТРИЦА ДЕДУКЦИИ И УЛИК',
    modal_dice_title: 'ПРОВЕРКА НАВЫКА',
    modal_language_title: 'ВЫБОР ЯЗЫКА СУБТИТРОВ И ИНТЕРФЕЙСА',
    modal_victory_title: 'ДЕЛО РАСКРЫТО',
    modal_gameover_title: 'РАССЛЕДОВАНИЕ ПРОВАЛЕНО: ГИБЕЛЬ',
    dice_tally: 'БРОСОК 2D6 + МОДИФИКАТОРЫ:',
    dice_rolling: 'БРОСОК КОСТЕЙ...',
    dice_passed: 'ПРОВЕРКА УСПЕШНА!',
    dice_failed: 'ПРОВЕРКА ПРОВАЛЕНА!',
    dice_proceed: 'ПРИНЯТЬ РЕЗУЛЬТАТ',
    btn_restart: 'НАЧАТЬ НОВОЕ ДЕЛО',
    btn_retry: 'ПОВТОРИТЬ РАССЛЕДОВАНИЕ',
    btn_use: 'ПРИМЕНИТЬ',
    btn_inspect: 'ОСМОТРЕТЬ',
    btn_read: 'ПРОЧЕСТЬ',
    badge_passive: 'ПАССИВНО',
    badge_uses: 'исп. осталось',
    toast_item_acquired: 'ПОЛУЧЕН ПРЕДМЕТ:',
    toast_item_used: 'ИСПОЛЬЗОВАН ПРЕДМЕТ:',
    toast_clue_discovered: 'НАЙДЕНА КЛЮЧЕВАЯ УЛИКА:',
    toast_thought_unlocked: 'ОТКРЫТА НОВАЯ МЫСЛЬ:',
    toast_thought_internalized: 'МЫСЛЬ УСВОЕНА:',
    toast_xp_gained: 'ПОЛУЧЕН ОПЫТ:',
    toast_level_up: 'НОВЫЙ УРОВЕНЬ! ПОЛУЧЕНО ОЧКО НАВЫКА',
    toast_damage_health: 'РАНЕНИЕ! СТОЙКОСТЬ СНИЖЕНА',
    toast_damage_morale: 'ШОК! БОЕВОЙ ДУХ ПОДОРВАН'
  },
  it: {
    toast_case_opened: 'Fascicolo del caso aperto: Aurelia Vance · Benvenuto nel Distretto 7, Detective {name}',
    game_title: 'A E N I G M A',
    case_badge: 'CASO #04: L\'OROLOGIAIA SILENZIOSA',
    loader_quote: '“L\'orologio non si ferma mai. È solo la carne al suo interno che dimentica come battere.”',
    loader_telemetry: 'Inizializzazione telemetria neurale...',
    loader_enter: 'ACCEDI ALL\'ARCHIVIO',
    creator_title: 'DOSSIER DELL\'INVESTIGATORE',
    creator_subtitle: 'CREAZIONE PERSONAGGIO',
    gender_female: '♀ DONNA',
    gender_male: '♂ UOMO',
    randomize_dossier: '🎲 DOSSIER CASUALE',
    precinct_label: 'Sezione Omicidi Distretto 4 · Settore Orientale 7',
    name_label: 'NOME COMPLETO DETECTIVE',
    alias_label: 'ALIAS / TITOLO PSICOLOGICO',
    facets_title: 'FACETTE DELLA PSICHE',
    points_available: 'Punti Disponibili',
    intellect_name: 'INTELLETTO',
    intellect_desc: 'Logica, Enciclopedia, Retorica, Concettualizzazione. Fredda deduzione e analisi razionale.',
    psyche_name: 'PSICHE',
    psyche_desc: 'Esoterismo, Empatia, Autorità, Suggestione. Intuizioni sovrannaturali e gravità emotiva.',
    physique_name: 'FISICO',
    physique_desc: 'Tempra, Soglia del Dolore, Elettrochimica. Adrenalina, istinto viscerale e sopravvivenza.',
    motorics_name: 'MOTORICA',
    motorics_desc: 'Percezione, Coordinazione Occhio-Mano, Interfaccia, Savoir-Faire. Sensi acuti e micro-indizi.',
    signature_title: 'ABILITÀ DISTINTIVA (+2 BONUS E VOCE INTERIORE)',
    vices_title: 'VIZI PERSONALI E CREPE PSICHICHE',
    start_inquiry: 'AVVIA L\'INDAGINE',
    endurance_label: 'TEMPRA',
    morale_label: 'MORALE',
    hp_pip: 'PV',
    sp_pip: 'PM',
    day_prefix: 'GIORNO',
    nav_cabinet: '🧠 GABINETTO DEI PENSIERI',
    nav_clues: '📌 FASCICOLO PROVE',
    nav_inventory: '💼 INVENTARIO',
    nav_audio: 'AUDIO',
    nav_language: 'LINGUA',
    scene_location: 'Torre dell\'Orologio di Sant\'Irene · Distretto 7',
    scene_timestamp: 'Maestra Orologiaia Aurelia Vance · Corpo rinvenuto alle 03:42 durante i rintocchi',
    speaker_forensic: 'Rilievi Medico-Legali',
    interlocutor_active: 'INTERAZIONE ATTIVA',
    modal_cabinet_title: 'GABINETTO DEI PENSIERI · THOUGHT CABINET',
    modal_inventory_title: 'CAPPOTTO DA DETECTIVE E SACCA PROVE',
    modal_clues_title: 'DOSSIER DEL CASO · MATRICE DI DEDUZIONE',
    modal_dice_title: 'PROVA DI ABILITÀ',
    modal_language_title: 'SELEZIONA LINGUA SOTTOTITOLI E INTERFACCIA',
    modal_victory_title: 'CASO CHIUSO',
    modal_gameover_title: 'INDAGINE INTERROTTA: COLLASSO',
    dice_tally: 'LANCIO 2D6 + MODIFICATORI:',
    dice_rolling: 'LANCIO IN CORSO...',
    dice_passed: 'PROVA SUPERATA!',
    dice_failed: 'PROVA FALLITA!',
    dice_proceed: 'PROCEDI CON IL RISULTATO',
    btn_restart: 'INIZIA NUOVA INDAGINE',
    btn_retry: 'RIPROVA INDAGINE',
    btn_use: 'USA',
    btn_inspect: 'ESAMINA',
    btn_read: 'LEGGI',
    badge_passive: 'PASSIVO',
    badge_uses: 'usi rimasti',
    toast_item_acquired: 'OGGETTO OTTENUTO:',
    toast_item_used: 'OGGETTO CONSUMATO:',
    toast_clue_discovered: 'INDIZIO CRUCIALE SVELATO:',
    toast_thought_unlocked: 'NUOVO PENSIERO AFFIORATO:',
    toast_thought_internalized: 'PENSIERO INTERIORIZZATO:',
    toast_xp_gained: 'ESPERIENZA ACQUISITA:',
    toast_level_up: 'LIVELLO SUPERIORE! PUNTO ABILITÀ',
    toast_damage_health: 'FERITO! TEMPRA RIDOTTA',
    toast_damage_morale: 'SCIOCCATO! MORALE COMPROMESSO'
  },
  pt: {
    toast_case_opened: 'Dossiê do caso aberto: Aurelia Vance · Bem-vindo ao Distrito 7, Detetive {name}',
    game_title: 'A E N I G M A',
    case_badge: 'CASO #04: A RELOJOEIRA SILENCIOSA',
    loader_quote: '“O relógio nunca para. Apenas a carne em seu interior esquece como bater.”',
    loader_telemetry: 'Inicializando telemetria neural...',
    loader_enter: 'ACESSAR O ARQUIVO',
    creator_title: 'DOSSIÊ DO INVESTIGADOR',
    creator_subtitle: 'CRIAÇÃO DE PERSONAGEM',
    gender_female: '♀ FEMININO',
    gender_male: '♂ MASCULINO',
    randomize_dossier: '🎲 DOSSIÊ ALEATÓRIO',
    precinct_label: 'Divisão de Homicídios Distrito 4 · Setor Leste 7',
    name_label: 'NOME COMPLETO DO DETETIVE',
    alias_label: 'ALCUNHA / TÍTULO PSICOLÓGICO',
    facets_title: 'FACETAS DA PSIQUE',
    points_available: 'Pontos Disponíveis',
    intellect_name: 'INTELECTO',
    intellect_desc: 'Lógica, Enciclopédia, Retórica, Conceitualização. Dedução fria e análise racional.',
    psyche_name: 'PSIQUE',
    psyche_desc: 'Esoterismo, Empatia, Autoridade, Sugestão. Intuições sobrenaturais e peso emocional.',
    physique_name: 'FÍSICO',
    physique_desc: 'Resistência, Limiar de Dor, Eletroquímica. Adrenalina, instinto visceral e sobrevivência.',
    motorics_name: 'MOTRICIDADE',
    motorics_desc: 'Percepção, Coordenação Olho-Mão, Interface, Savoir-Faire. Sentidos afiados e micro-pistas.',
    signature_title: 'HABILIDADE ASSINATURA (+2 BÔNUS E VOZ INTRUSIVA)',
    vices_title: 'VÍCIOS PESSOAIS E FRATURAS PSÍQUICAS',
    start_inquiry: 'INICIAR INVESTIGAÇÃO',
    endurance_label: 'RESISTÊNCIA',
    morale_label: 'MORAL',
    hp_pip: 'PV',
    sp_pip: 'PM',
    day_prefix: 'DIA',
    nav_cabinet: '🧠 GABINETE DE PENSAMENTOS',
    nav_clues: '📌 DOSSIÊ DE PISTAS',
    nav_inventory: '💼 INVENTÁRIO',
    nav_audio: 'ÁUDIO',
    nav_language: 'IDIOMA',
    scene_location: 'Torre do Relógio de Santa Irene · Distrito 7',
    scene_timestamp: 'Mestra Horóloga Aurelia Vance · Corpo encontrado às 03:42 durante o badalar do sino',
    speaker_forensic: 'Observação Forense',
    interlocutor_active: 'INTERAÇÃO ATIVA',
    modal_cabinet_title: 'GABINETE DE PENSAMENTOS · THOUGHT CABINET',
    modal_inventory_title: 'CASACO DO DETETIVE E SACO DE EVIDÊNCIAS',
    modal_clues_title: 'DOSSIÊ DO CASO · MATRIZ DE DEDUÇÃO',
    modal_dice_title: 'TESTE DE HABILIDADE',
    modal_language_title: 'SELECIONAR IDIOMA DAS LEGENDAS E INTERFACE',
    modal_victory_title: 'CASO CONCLUÍDO',
    modal_gameover_title: 'INVESTIGAÇÃO ENCERRADA: COLAPSO',
    dice_tally: 'ROLANDO 2D6 + MODIFICADORES:',
    dice_rolling: 'ROLANDO DADOS...',
    dice_passed: 'TESTE BEM-SUCEDIDO!',
    dice_failed: 'TESTE FALHOU!',
    dice_proceed: 'AVANÇAR COM O RESULTADO',
    btn_restart: 'INICIAR NOVA INVESTIGAÇÃO',
    btn_retry: 'RECOMEÇAR INVESTIGAÇÃO',
    btn_use: 'USAR',
    btn_inspect: 'INSPECIONAR',
    btn_read: 'LER',
    badge_passive: 'PASSIVO',
    badge_uses: 'usos restantes',
    toast_item_acquired: 'ITEM ADQUIRIDO:',
    toast_item_used: 'ITEM UTILIZADO:',
    toast_clue_discovered: 'PISTA CRUCIAL ENCONTRADA:',
    toast_thought_unlocked: 'NOVO PENSAMENTO DESPERTO:',
    toast_thought_internalized: 'PENSAMENTO INTERNALIZADO:',
    toast_xp_gained: 'EXPERIÊNCIA ADQUIRIDA:',
    toast_level_up: 'SUBIU DE NÍVEL! PONTO DE HABILIDADE',
    toast_damage_health: 'FERIDO! RESISTÊNCIA REDUZIDA',
    toast_damage_morale: 'ABALADO! MORAL COMPROMETIDO'
  },
  ar: {
    toast_case_opened: 'تم فتح ملف القضية: أوريليا فانس · مرحبًا بك في المقاطعة 7، أيها المحقق {name}',
    game_title: 'إ ي ن ي ج م ا',
    case_badge: 'القضية #04: صانعة الساعات الصامتة',
    loader_quote: '«عقارب الساعة لا تتوقف أبدًا. وحده الجسد بين تروسها ينسى كيف ينبض.»',
    loader_telemetry: 'تهيئة القياس العصبي عن بُعد...',
    loader_enter: 'الدخول إلى الأرشيف',
    creator_title: 'ملف المحقق',
    creator_subtitle: 'إنشاء الشخصية',
    gender_female: '♀ أنثى',
    gender_male: '♂ ذكر',
    randomize_dossier: '🎲 توليد ملف عشوائي',
    precinct_label: 'قسم الجرائم بالدائرة 4 · القطاع الشرقي 7',
    name_label: 'الاسم الكامل للمحقق',
    alias_label: 'اللقب / المسمى النفسي',
    facets_title: 'أبعاد النفس البشرية',
    points_available: 'النقاط المتاحة',
    intellect_name: 'العقل والذكاء',
    intellect_desc: 'المنطق، الموسوعة، البلاغة، المفاهيم. استنتاج بارد وتحليل عقلاني صارم.',
    psyche_name: 'النفس والروح',
    psyche_desc: 'الباطنية، التعاطف، الهيبة والسلطة، الإيحاء. حدس غيبي وثقل وجداني.',
    physique_name: 'البنية الجسدية',
    physique_desc: 'قوة التحمل، عتبة الألم، الكيمياء العضوية. الأدرينالين وغريزة البقاء الفطرية.',
    motorics_name: 'المهارات الحركية',
    motorics_desc: 'الإدراك الحسي، التناسق، التفاعل الميكانيكي، الحنكة. حواس ثاقبة وقراءة الآثار الدقيقة.',
    signature_title: 'المهارة المميزة (+2 نقاط وصوت باطني عميق)',
    vices_title: 'الرذائل الشخصية والشروخ النفسية',
    start_inquiry: 'بدء التحقيق الجنائي',
    endurance_label: 'التحمل الجسدي',
    morale_label: 'المعنويات',
    hp_pip: 'صحة',
    sp_pip: 'روح',
    day_prefix: 'اليوم',
    nav_cabinet: '🧠 خزانة الأفكار',
    nav_clues: '📌 ملف الأدلة',
    nav_inventory: '💼 الحقيبة',
    nav_audio: 'الصوت',
    nav_language: 'اللغة',
    scene_location: 'برج ساعات القديسة إيرين · القطاع 7',
    scene_timestamp: 'كبيرة صانعي الساعات أوريليا فانس · عُثر على الجثمان الساعة 03:42 فجرًا بين دقات البندول',
    speaker_forensic: 'معاينة الطب الشرعي',
    interlocutor_active: 'تفاعل نشط',
    modal_cabinet_title: 'خزانة الأفكار · THOUGHT CABINET',
    modal_inventory_title: 'معطف المحقق وحقيبة الأحراز',
    modal_clues_title: 'ملف القضية · مصفوفة الاستنتاج الجنائي',
    modal_dice_title: 'اختبار المهارة والفرصة',
    modal_language_title: 'اختر لغة الترجمة وواجهة المستخدم',
    modal_victory_title: 'إغلاق القضية بنجاح',
    modal_gameover_title: 'فشل التحقيق: انهيار مأساوي',
    dice_tally: 'رمي النرد 2D6 + المكافآت:',
    dice_rolling: 'تدوير النرد...',
    dice_passed: 'نجح الاختبار!',
    dice_failed: 'فشل الاختبار!',
    dice_proceed: 'متابعة النتيجة',
    btn_restart: 'فتح تحقيق جديد',
    btn_retry: 'إعادة المحاولة',
    btn_use: 'استخدام',
    btn_inspect: 'فحص دقيق',
    btn_read: 'قراءة',
    badge_passive: 'تأثير دائم',
    badge_uses: 'استخدامات متبقية',
    toast_item_acquired: 'تم تحريز أداة:',
    toast_item_used: 'تم استخدام:',
    toast_clue_discovered: 'كشف دليل حاسم:',
    toast_thought_unlocked: 'بزغت فكرة جديدة:',
    toast_thought_internalized: 'تم استيعاب الفكرة:',
    toast_xp_gained: 'اكتساب خبرة:',
    toast_level_up: 'ترقية المستوى! نقطة مهارة جديدة',
    toast_damage_health: 'إصابة جسدية! تراجع التحمل',
    toast_damage_morale: 'صدمة نفسية! تراجع المعنويات'
  }
};

// Item, Clue, Thought, and POI Localizations for 12 Languages
export const ITEMS_I18N = {
  detective_badge: {
    name: {
      id: 'Lencana Kusam Distrik 4',
      en: 'Tarnished Precinct 4 Badge',
      ja: '変色した第4分署の警察バッジ',
      zh: '褪色的第四警区警徽',
      ko: '변색된 제4관할서 배지',
      es: 'Placa Deslustrada del Precinto 4',
      fr: 'Insigne Terni du 4e District',
      de: 'Verblasste Dienstmarke von Revier 4',
      ru: 'Потускневший жетон 4-го участка',
      it: 'Distintivo Sbiadito del Distretto 4',
      pt: 'Distintivo Desgastado do Distrito 4',
      ar: 'شارة الدائرة 4 الباهتة'
    },
    description: {
      id: 'Lencana perak dengan lambang keadilan yang tergores. Mengibaskannya di depan saksi memberikan +2 Otoritas.',
      en: 'Bent silver badge with imperial scales scratched off. Flashing it commands obedience (+2 Authority bonus).',
      ja: '天秤の紋章が削り取られた銀のバッジ。相手に見せつけることで威信+2を得る。',
      zh: '磨损的银质警徽。向嫌疑人出示可施加心理威慑（获得+2权威加成）。',
      ko: '천칭 문양이 긁혀나간 은제 배지. 상대에게 과시하여 권위 +2 보너스를 얻습니다.',
      es: 'Placa de plata doblada con la balanza rayada. Mostrarla impone obediencia (+2 Autoridad).',
      fr: 'Insigne d\'argent courbé. Le brandir impose l\'autorité (+2 Autorité).',
      de: 'Verbeulte Silbermarke. Ihr Vorzeigen verschafft Respekt (+2 Autorität).',
      ru: 'Погнутый серебряный жетон. Демонстрация внушает уважение (+2 к Авторитету).',
      it: 'Distintivo d\'argento piegato. Mostrarlo incute timore (+2 Autorità).',
      pt: 'Distintivo de prata amassado. Exibi-lo impõe respeito (+2 Autoridade).',
      ar: 'شارة فضية ملتوية. إبرازها يفرض الهيبة وسلطة التحقيق (+2 سلطة).'
    }
  },
  astra_cigarettes: {
    name: {
      id: 'Sebungkus Rokok Astra Merah',
      en: 'Pack of Astra Red Filterless',
      ja: 'アストラ・レッド（両切り煙草）',
      zh: '阿斯特拉无嘴红烟',
      ko: '아스트라 레드 필터리스 담배',
      es: 'Paquete de Astra Rojo sin Filtro',
      fr: 'Paquet d\'Astra Rouge sans Filtre',
      de: 'Schachtel Astra Rot ohne Filter',
      ru: 'Пачка крепких сигарет «Астра Красная»',
      it: 'Pacchetto di Astra Rosse senza Filtro',
      pt: 'Maço de Astra Vermelho sem Filtro',
      ar: 'علبة سجائر أسترا الحمراء بلا فلتر'
    },
    description: {
      id: 'Tembakau belerang murah dari dermaga selatan. Menghisapnya memulihkan +2 Kewarasan, namun mengurangi -1 Daya Tahan.',
      en: 'Cheap sulfur-cured tobacco from the docks. Inhaling restores +2 Morale, but costs -1 Endurance.',
      ja: '安価な硫黄燻製タバコ。吸い込むと精神力+2回復するが、耐久値-1を消耗する。',
      zh: '码头廉价硫熏烟草。深吸一口可恢复+2理智，但损耗-1体能。',
      ko: '싸구려 유황 훈제 담배. 흡연 시 사기 +2 회복, 체력 -1 소모.',
      es: 'Tabaco curado con azufre barato de los muelles. Fumar restaura +2 Moral, pero cuesta -1 Aguante.',
      fr: 'Tabac bon marché des docks. Fumer restaure +2 Moral, mais coûte -1 Endurance.',
      de: 'Billiger schwefelgetränkter Hafentabak. Rauchen stellt +2 Moral her, kostet -1 Ausdauer.',
      ru: 'Дешевый ядреный табак из доков. Восстанавливает +2 Духа, но отнимает -1 Стойкости.',
      it: 'Tabacco zolfato economico dei moli. Fumarlo ripristina +2 Morale, ma costa -1 Tempra.',
      pt: 'Tabaco barato do cais. Fumar restaura +2 Moral, mas custa -1 Resistência.',
      ar: 'تبغ رخيص معالج بالكبريت. تدخينها يستعيد +2 معنويات لكن يكلف -1 من التحمل الجسدي.'
    }
  },
  medicinal_flask: {
    name: {
      id: 'Labu Tinktur Laudanum Medis',
      en: 'Medicinal Laudanum Tincture',
      ja: '医療用アヘンチンキ瓶',
      zh: '医用阿片酊药剂瓶',
      ko: '의료용 라우다넘 팅크병',
      es: 'Frasco de Tintura de Láudano Medicinal',
      fr: 'Flacon de Teinture de Laudanum Médicinal',
      de: 'Medizinische Laudanum-Tinktur',
      ru: 'Флакон медицинской настойки опия (Лауданум)',
      it: 'Fiala di Tintura di Laudano Medicinale',
      pt: 'Frasco de Tintura de Láudano Medicinal',
      ar: 'قارورة صبغة اللودانوم الطبية المخدرة'
    },
    description: {
      id: 'Cairan kental berwarna amber. Meminumnya memulihkan +2 Daya Tahan & +1 Esoterika, meredakan trauma fisik seketika.',
      en: 'Amber sedative fluid. Drinking restores +2 Health and boosts +1 Esoterica, numbing visceral agony.',
      ja: '琥珀色の鎮痛薬液。服用すると耐久力+2回復、秘教+1、激痛を即座に麻痺させる。',
      zh: '琥珀色镇痛酊剂。饮用恢复+2体能并提升+1秘教，瞬间麻痹剧痛。',
      ko: '호박색 진통 약제. 복용 시 체력 +2 회복 및 비전 +1, 육체적 격통 완화.',
      es: 'Líquido sedante ambarino. Beber restaura +2 Salud y otorga +1 Esoterismo, aliviando el dolor.',
      fr: 'Liquide sédatif ambré. Boire restaure +2 Santé et confère +1 Ésotérisme.',
      de: 'Bernsteinfarbene Tinktur. Stellt +2 Ausdauer her und verleiht +1 Esoterik, betäubt Qualen.',
      ru: 'Янтарный седативный раствор. Восстанавливает +2 Здоровья и дает +1 к Эзотерике, глуша боль.',
      it: 'Liquido sedativo ambrato. Bere ripristina +2 Salute e conferisce +1 Esoterismo.',
      pt: 'Líquido sedativo âmbar. Beber restaura +2 Saúde e concede +1 Esoterismo.',
      ar: 'سائل مسكن كهرماني. شربه يستعيد +2 صحة ويمنح +1 باطنية، مخدرًا الألم الفظيع.'
    }
  },
  broken_pocketwatch: {
    name: {
      id: 'Jam Saku Horologis yang Retak',
      en: 'Cracked Horologist Pocket Watch',
      ja: 'ひび割れた時計師の懐中時計',
      zh: '破裂的宗师怀表',
      ko: '균열된 시계 장인의 회중시계',
      es: 'Reloj de Bolsillo Roto de la Horóloga',
      fr: 'Montre à Gousset Fendue de l\'Horlogère',
      de: 'Gesprungene Taschenuhr der Uhrmacherin',
      ru: 'Разбитые карманные часы мастера',
      it: 'Orologio da Taschino Incrinato dell\'Orologiaia',
      pt: 'Relógio de Bolso Quebrado da Horóloga',
      ar: 'ساعة جيب صانعة الساعات المتصدعة'
    },
    description: {
      id: 'Mati tepat pada 03:42. Memeriksa mekanisme engsel gandanya mengungkap ukiran sandi rahasia: "7 - 3 - 12".',
      en: 'Frozen precisely at 03:42. Inspecting the bezel mechanism reveals the engraved safe cipher: "7 - 3 - 12".',
      ja: '03:42で針が停止。外枠の歯車機構を調べると、金庫の暗号「7 - 3 - 12」が刻まれている。',
      zh: '精准停在03:42。拆解内嵌齿轮可发现镌刻的秘密保险箱密码：“7 - 3 - 12”。',
      ko: '정확히 03:42에 멈춤. 톱니를 점검하면 금고 비밀번호 "7 - 3 - 12"가 각인되어 있습니다.',
      es: 'Detenido a las 03:42. Inspeccionar el mecanismo revela la clave grabada de la caja fuerte: "7 - 3 - 12".',
      fr: 'Figée à 03h42. Examiner le boîtier révèle le chiffre gravé du coffre-fort: « 7 - 3 - 12 ».',
      de: 'Präzise um 03:42 stehengeblieben. Die Untersuchung offenbart die eingravierte Kombination: „7 - 3 - 12“.',
      ru: 'Застыли ровно в 03:42. Осмотр механизма открывает выгравированный шифр сейфа: «7 - 3 - 12».',
      it: 'Fermo alle 03:42. Esaminando la ghiera si scopre la combinazione incisa: "7 - 3 - 12".',
      pt: 'Travado às 03:42. Inspecionar as engrenagens revela o código gravado do cofre: "7 - 3 - 12".',
      ar: 'توقفت بدقة عند 03:42. فحص تروسها يكشف شفرة الخزنة المنقوشة: «7 - 3 - 12».'
    }
  },
  magnifying_loupe: {
    name: {
      id: 'Kaca Pembesar Monokel Presisi',
      en: 'Precision Horologist Loupe',
      ja: '精密時計師用ルーペ',
      zh: '钟表匠精密目镜',
      ko: '정밀 시계공 루페',
      es: 'Lupa Monocular de Precisión',
      fr: 'Loupe de Précision d\'Horloger',
      de: 'Präzisions-Uhrmacherlupe',
      ru: 'Прецизионная часовая лупа-монокль',
      it: 'Lente d\'Ingrandimento di Precisione',
      pt: 'Lupa Monocular de Precisão',
      ar: 'عدسة فحص الساعات الدقيقة'
    },
    description: {
      id: 'Lensa akromatik kuningan. Menggunakannya memberikan +2 Persepsi & mengungkap luka tusuk mikroskopis di leher korban.',
      en: 'Achromatic brass loupe. Equipping grants +2 Perception and reveals microscopic puncture wounds on the victim\'s neck.',
      ja: '色消し真鍮製ルーペ。使用すると知覚+2、被害者の首筋にある微小な注射針痕を発見できる。',
      zh: '消色差黄铜目镜。装备获得+2感知，并能洞察受害者颈部极其细微的毒针孔。',
      ko: '황동제 색지움 루페. 장착 시 지각 +2 부여 및 피해자 목덜미의 미세한 독침 바늘구멍 발견 가능.',
      es: 'Lupa acromática de latón. Otorga +2 Percepción y revela punciones microscópicas en el cuello de la víctima.',
      fr: 'Loupe achromatique en laiton. Confère +2 Perception et révèle des piqûres microscopiques sur le cou de la victime.',
      de: 'Messinglupe. Gewährt +2 Wahrnehmung und offenbart mikroskopische Einstichstellen am Hals des Opfers.',
      ru: 'Ахроматическая латунная лупа. Дает +2 к Восприятию и позволяет различить микроскопический укол на шее жертвы.',
      it: 'Lente acromatica in ottone. Conferisce +2 Percezione e rivela fori di spillo microscopici sul collo della vittima.',
      pt: 'Lupa acromática de latão. Concede +2 Percepção e revela picadas microscópicas no pescoço da vítima.',
      ar: 'عدسة نحاسية دقيقة. استخدامها يمنح +2 إدراك ويكشف ثقوب وخز مجهرية على رقبة الضحية.'
    }
  },
  perpetuum_ledger: {
    name: {
      id: 'Buku Besar Rahasia Perpetuum',
      en: 'The Perpetuum Cartel Ledger',
      ja: '永久機関カルテルの秘密台帳',
      zh: '永动机密会秘密账簿',
      ko: '영구기관 카르텔의 비밀 원장',
      es: 'Libro Mayor del Cartel Perpetuum',
      fr: 'Grand Livre Secret du Cartel Perpetuum',
      de: 'Geheimbuch des Perpetuum-Kartells',
      ru: 'Секретный гроссбух картеля «Перпетуум»',
      it: 'Mastro Segreto del Cartello Perpetuum',
      pt: 'Livro-Razão Secreto do Cartel Perpetuum',
      ar: 'دفتر حسابات كارتل بيربيتوم السري'
    },
    description: {
      id: 'Ditemukan di brankas tersembunyi. Membacanya mengungkap suap jutaan guilder dari Sindikat ke rekening Vivienne Vance (+50 XP).',
      en: 'Found in the floorboard safe. Reading deciphers illicit payoffs from the Syndicate to Madame Vance\'s account (+50 XP).',
      ja: '隠し金庫から発見。読了するとシンジケートからヴィヴィアンへの巨額賄賂が判明（+50 XP）。',
      zh: '在暗格保险箱中起获。研读可破译联合阵线向薇薇安账户汇款的巨额贿赂记录（获得+50经验）。',
      ko: '마루 밑 비밀 금고에서 발견. 열독 시 신디케이트가 비비안 밴스에게 건넨 거액의 뇌물 내역 해독 (+50 XP).',
      es: 'Hallado en la caja oculta. Leerlo descifra sobornos ilícitos del Sindicato a Madame Vance (+50 XP).',
      fr: 'Trouvé dans le coffre du plancher. Le lire déchiffre les pots-de-vin du Syndicat versés à Vivienne (+50 XP).',
      de: 'Im Bodentresor gefunden. Das Lesen entschlüsselt Schmiergelder des Syndikats an Madame Vance (+50 XP).',
      ru: 'Найден в тайнике под полом. Прочтение раскрывает подкуп мадам Вэнс Синдикатом на огромные суммы (+50 опыта).',
      it: 'Trovato nella cassaforte segreta. Leggerlo svela le tangenti versate dal Sindacato a Madame Vance (+50 XP).',
      pt: 'Encontrado no cofre sob o piso. Lê-lo decifra propinas do Sindicato pagas a Madame Vance (+50 XP).',
      ar: 'عُثر عليه بالخزنة الأرضية. قراءته تفك شفرة رشاوى طائلة حُوّلت من النقابة لحساب فيفيان فانس (+50 خبرة).'
    }
  },
  poison_chess_queen: {
    name: {
      id: 'Bidak Ratu Catur Gading Beracun',
      en: 'The Poisoned Ivory Queen',
      ja: '毒針が仕込まれた象牙のクイーン',
      zh: '藏有毒针的象牙黑后棋子',
      ko: '독침이 장치된 상아 흑색 퀸 기물',
      es: 'Reina de Ajedrez Envenenada',
      fr: 'Reine d\'Échecs en Ivoire Empoisonnée',
      de: 'Vergiftete Elfenbein-Schachdame',
      ru: 'Отравленный ферзь из слоновой кости',
      it: 'Regina di Scacchi Avvelenata',
      pt: 'Rainha de Xadrez Envenenada',
      ar: 'قطعة وزير الشطرنج العاجية المسمومة'
    },
    description: {
      id: 'Tergenggam erat di tangan korban. Membongkar dasarnya mengungkap jarum berpegas dengan residu asam prusat mematikan.',
      en: 'Clenched in Aurelia\'s corpse. Unscrewing the hollow base reveals a spring-loaded needle with dried prussic poison.',
      ja: '被害者が握りしめていた物。底を回すと、青酸毒の結晶が付着したスプリング式極細針が飛び出す。',
      zh: '死者手中紧攥之物。拧开中空底座，赫然露出一枚带有干燥氢氰酸剧毒残留的弹簧暗针。',
      ko: '시신의 손에 쥐여 있던 기물. 밑바닥을 돌리면 건조된 청산 독극물이 묻은 스프링 독침이 노출됩니다.',
      es: 'Apretada en la mano del cadáver. Desenroscar la base revela una aguja con residuos de cianuro letal.',
      fr: 'Serrée dans la main de la victime. Dévisser la base creuse révèle une aiguille à ressort souillée de cyanure.',
      de: 'Umklammert in der Hand der Toten. Das Aufschrauben enthüllt eine Federnadel mit Blausäurerückständen.',
      ru: 'Была зажата в руке жертвы. Отвинтив основание, вы обнажаете пружинную иглу со следами цианистого яда.',
      it: 'Stretta nella mano della vittima. Svitando la base cava si rivela un ago a molla con residui di cianuro.',
      pt: 'Apertada na mão do cadáver. Desenroscar a base revela uma agulha com resíduos de cianeto mortal.',
      ar: 'كانت الضحية تقبض عليها بإحكام. فك قاعدتها المجوفة يكشف عن إبرة نابضة ملوثة ببلورات سم السيانيد القاتل.'
    }
  }
};

// Points of Interest (POIs) Translations
export const POI_I18N = {
  poi_pendulum: {
    title: {
      id: 'Pendulum Raksasa & Beban Penyeimbang',
      en: 'The Great Pendulum & Counterweight',
      ja: '大振り子と鋳鉄カウンターウェイト',
      zh: '巨型钟摆与铸铁配重块',
      ko: '거대 진자와 주철 평형추',
      es: 'El Gran Péndulo y Contrapeso',
      fr: 'Le Grand Balancier et Contrepoids',
      de: 'Das Große Pendel und Gegengewicht',
      ru: 'Исполинский маятник и противовес',
      it: 'Il Grande Pendolo e Contrappeso',
      pt: 'O Grande Pêndulo e Contrapeso',
      ar: 'البندول الضخم وثقل الموازنة الحديدي'
    },
    description: {
      id: 'Pendulum kuningan raksasa berayun di kegelapan menara, menggantung tepat di atas jurang roda gigi tempat jenazah Aurelia Vance tertancap.',
      en: 'The colossal brass pendulum hanging in the gloom, swinging like a gilded blade above the gear abyss where Aurelia Vance was impaled.',
      ja: '薄暗がりの中に吊るされた巨大な真鍮製振り子。オレリア・ヴァンスの遺体が貫かれた歯車の深淵の上で揺れている。',
      zh: '悬垂于阴暗高处的青铜巨型钟摆，如同一把悬在深渊之上的断头巨刃，受害者正被贯穿在下方的铸铁配重臂上。',
      ko: '어둠 속에 매달린 거대한 황동 진자. 오렐리아 밴스의 시신이 꿰뚫린 톱니바퀴 심연 위로 번뜩입니다.',
      es: 'El colosal péndulo de latón colgando en la penumbra, oscilando sobre el abismo de engranajes donde yacía ensartada Aurelia Vance.',
      fr: 'Le colossal balancier de laiton suspendu dans la pénombre, oscillant au-dessus des engrenages où repose le corps d\'Aurelia Vance.',
      de: 'Das kolossale Messingpendel im Düsteren, schwingend über dem Zahnradabgrund, wo Aurelia Vance aufgespießt wurde.',
      ru: 'Колоссальный латунный маятник в полумраке, качающийся над бездной шестерен, где насажено тело Аурелии Вэнс.',
      it: 'Il colossale pendolo d\'ottone sospeso nel buio, oscillante sopra l\'abisso di ingranaggi dove giace trapassata Aurelia Vance.',
      pt: 'O colossal pêndulo de latão na escuridão, oscilando sobre o abismo de engrenagens onde jaz empalada Aurelia Vance.',
      ar: 'البندول النحاسي العملاق المعلق في الظلام، يتأرجح كنصل قاطع فوق هاوية التروس حيث طُعنت أوريليا فانس.'
    }
  },
  poi_pocketwatch: {
    title: {
      id: 'Jam Saku Alkimia & Garis Kapur Jenazah',
      en: 'The Alchemical Pocket Watch & Chalk Outline',
      ja: '錬金術的懐中時計とチョークの遺体輪郭',
      zh: '炼金怀表与血迹白垩轮廓',
      ko: '연금술 회중시계와 혈흔 백묵 선',
      es: 'El Reloj Alquímico y Contorno de Tiza',
      fr: 'La Montre Alchimique et Tracé à la Craie',
      de: 'Die Alchemistische Taschenuhr und Kreidelinie',
      ru: 'Алхимические карманные часы и меловой контур',
      it: 'L\'Orologio Alchemico e Sagoma di Gesso',
      pt: 'O Relógio Alquímico e Contorno de Giz',
      ar: 'ساعة الجيب الخيميائية ورسم الطباشير'
    },
    description: {
      id: 'Tergeletak di lantai kayu berlumuran darah di dekat tas kerja korban yang berserakan di tengah hembusan angin dingin.',
      en: 'Lying on the blood-soaked boards next to the victim\'s scattered belongings and dropped briefcase in the drafty rain.',
      ja: '血染めの床板に落ちた遺留品。冷たい風雨が吹き込む中、散乱した書類鞄の横に転がっている。',
      zh: '静卧在浸透血渍的木地板上，旁边散落着死者的随身公文包与风雨侵袭的演算手稿。',
      ko: '피로 물든 바닥에 뒹구는 유품. 찬 바람과 비가 들이치는 가운데 흩어진 가방 곁에 놓여 있습니다.',
      es: 'Tirado sobre las tablas ensangrentadas junto al maletín caído y las pertenencias dispersas de la víctima.',
      fr: 'Gisant sur les planches ensanglantées près des effets éparpillés et de la mallette abandonnée de la victime.',
      de: 'Liegt auf den blutgetränkten Dielen neben der verstreuten Aktentasche der Ermordeten.',
      ru: 'Лежат на залитых кровью досках рядом с рассыпанными вещами и портфелем жертвы под каплями дождя.',
      it: 'Giacente sulle assi insanguinate accanto alla valigetta rovesciata e agli effetti personali della vittima.',
      pt: 'Caído sobre as tábuas ensanguentadas ao lado da pasta revirada e dos pertences da vítima.',
      ar: 'ملقاة على الألواح الخشبية المخضبة بالدماء بجوار حقيبة الضحية المتناثرة تحت زخات المطر العاصف.'
    }
  },
  poi_balcony: {
    title: {
      id: 'Wajah Jam Kaca & Terpaan Hujan Malam',
      en: 'The Luminous Clock Face & Rain Vista',
      ja: '大時計のステンドグラス文字盤と雨夜の眺望',
      zh: '透光巨钟表盘与雨夜鸟瞰',
      ko: '투광 시계 문자판과 비바람 전경',
      es: 'La Esfera Luminosa y Vista Lluviosa',
      fr: 'Le Cadran Lumineux et Vue Pluvieuse',
      de: 'Das Leuchtende Zifferblatt und Regenpanorama',
      ru: 'Светящийся циферблат и вид на дождливый город',
      it: 'Il Quadrante Luminoso e la Pioggia Notturna',
      pt: 'O Mostrador Iluminado e Vista Chuvosa',
      ar: 'وجه الساعة الزجاجي المضيء ومشهد المطر'
    },
    description: {
      id: 'Kaca patri jam raksasa yang bercahaya redup. Hujan deras menghantam angka-angka Romawi tinggi di atas atap Distrik 7.',
      en: 'The monumental round stained-glass clock, rain beating violently against the Roman numerals high above the city.',
      ja: '巨大なステンドグラス時計の文字盤。第7区の街並みを見下ろすローマ数字に冷たい雨が激しく叩きつけている。',
      zh: '巍峨的巨大彩色玻璃钟盘，暴风雨正疯狂击打着镶嵌在城市上空的古老罗马数字。',
      ko: '거대한 원형 스테인드글라스 시계판. 제7구역 상공에서 로마 숫자를 때리는 거친 비바람이 내다보입니다.',
      es: 'El monumental reloj de vidriera redonda, con la lluvia golpeando los números romanos sobre los tejados del Distrito 7.',
      fr: 'L\'immense horloge en vitrail rond, où la pluie s\'abat contre les chiffres romains dominant le 7e District.',
      de: 'Das monumentale runde Buntglaszifferblatt, an dessen römische Ziffern der Regen hoch über Distrikt 7 prallt.',
      ru: 'Монументальный витражный циферблат. Капли дождя яростно хлещут по римским цифрам высоко над крышами Сектора 7.',
      it: 'Il monumentale orologio di vetro istoriato, con la pioggia battente sui numeri romani che dominano la città.',
      pt: 'O monumental relógio de vitral redondo, com a chuva fustigando os números romanos no alto do Distrito 7.',
      ar: 'قرص الساعة الزجاجي التذكاري الضخم، تصفعه أمطار الليل الغزيرة فوق الأرقام الرومانية المطلة على القطاع 7.'
    }
  },
  poi_graves: {
    title: {
      id: 'Inspektur Graves (Mitra Sektor 4)',
      en: 'Inspector Graves (Precinct 4 Partner)',
      ja: 'グレイヴス警部（第4分署相棒）',
      zh: '格雷夫斯警探（第四警区分署搭档）',
      ko: '그레이브스 형사 (제4관할서 파트너)',
      es: 'Inspector Graves (Compañero del Precinto 4)',
      fr: 'Inspecteur Graves (Partenaire du 4e District)',
      de: 'Inspektor Graves (Partner aus Revier 4)',
      ru: 'Инспектор Грейвс (Напарник из 4-го участка)',
      it: 'Ispettore Graves (Partner del Distretto 4)',
      pt: 'Inspetor Graves (Parceiro do Distrito 4)',
      ar: 'المفتش غريفز (شريك التحقيق بالدائرة 4)'
    },
    description: {
      id: 'Rekan seniormu berlutut memegang senter, mencatat bukti forensik dengan gelisah sambil menggerutu di tengah dinginnya malam.',
      en: 'Your cynical partner kneeling with a flashlight, taking forensic notes and grumbling in the freezing drizzle.',
      ja: '懐中電灯を手に膝をつく相棒刑事。冷たい雨の中で愚痴をこぼしながら現場の検分メモを取っている。',
      zh: '你的资深搭档正手持手电筒蹲在死者旁记录现场，在刺骨寒雨中烦躁地吐着烟圈。',
      ko: '손전등을 들고 웅크린 파트너 형사. 차가운 빗속에서 불평하며 현장 메모를 작성하고 있습니다.',
      es: 'Tu compañero arrodillado con una linterna, tomando notas forenses y refunfuñando bajo la lluvia gélida.',
      fr: 'Votre coéquipier agenouillé avec une torche, consignant les indices tout en pestant contre la pluie glaciale.',
      de: 'Ihr mürrischer Partner kniet mit der Taschenlampe nieder und kritzelt Notizen im eisigen Nieselregen.',
      ru: 'Ваш напарник с фонарем осматривает пол, делая пометки в протоколе и раздраженно ворча под дождем.',
      it: 'Il tuo collega inginocchiato con una torcia, annotando rilievi e borbottando sotto la pioggia sferzante.',
      pt: 'Seu parceiro ajoelhado com uma lanterna, anotando observações e resmungando na garoa congelante.',
      ar: 'شريكك المخضرم جاثٍ بمصباحه اليدوي، يدون ملاحظات المعاينة ويتذمر تحت قطرات البرد القارس.'
    }
  },
  poi_madame: {
    title: {
      id: 'Nyonya Vivienne Vance (Janda Berkerudung Hitam)',
      en: 'Madame Vivienne Vance (The Shadowed Widow)',
      ja: 'ヴィヴィアン・ヴァンス夫人（喪服の未亡人）',
      zh: '薇薇安·梵斯夫人（黑纱下的未亡人）',
      ko: '비비안 밴스 부인 (검은 면사의 미망인)',
      es: 'Madame Vivienne Vance (La Viuda Sombría)',
      fr: 'Madame Vivienne Vance (La Veuve Voilée)',
      de: 'Madame Vivienne Vance (Die Verhüllte Witwe)',
      ru: 'Мадам Вивьен Вэнс (Овдовевшая за черной вуалью)',
      it: 'Madame Vivienne Vance (La Vedova Velata)',
      pt: 'Madame Vivienne Vance (A Viúva Enlutada)',
      ar: 'السيدة فيفيان فانس (الأرملة ذات الوشاح الأسود)'
    },
    description: {
      id: 'Berdiri mematung di dekat lentera anjungan atas. Kerudung sutra hitamnya berkibar pelan diterpa angin menara.',
      en: 'Standing motionless by the upper lantern gantry, her dark mourning veil fluttering gently in the draft.',
      ja: '上層のランタン通路に佇む未亡人。冷たい風に黒い喪服のベールが微かに揺れている。',
      zh: '伫立在上层铁梯走廊的幽光中，黑色的丝质丧服面纱在回旋的寒风中静静飘动。',
      ko: '상층 등불 난간 곁에 미동 없이 선 여인. 검은 상복 면사가 차가운 바람에 흩날립니다.',
      es: 'Inmóvil junto a la galería de la linterna superior, su velo de luto ondeando suavemente en la corriente.',
      fr: 'Debout, immobile près de la rambarde de la lanterne, son voile de deuil noir flottant au vent glacial.',
      de: 'Reglos an der oberen Laternenbrücke stehend, ihr dunkler Trauerschleier weht im kalten Zugluftstrom.',
      ru: 'Неподвижно стоит на верхней галерее фонаря; ее темная траурная вуаль слегка колышется от сквозняка.',
      it: 'Ferma immobile accanto alla ringhiera superiore, con il velo nero da lutto che ondeggia nel vento.',
      pt: 'De pé, imóvel junto à galeria superior, seu véu negro de luto ondulando suavemente no vento.',
      ar: 'تقف بلا حراك عند منصة الفانوس العلوية، ووشاح حدادها الأسود يرفرف بهدوء مع تيارات الهواء الباردة.'
    }
  },
  poi_floorboard: {
    title: {
      id: 'Brankas Rahasia di Balik Papan Lantai',
      en: 'Concealed Floorboard Safe',
      ja: '床下に隠された秘密金庫',
      zh: '地板暗格下的机械保险箱',
      ko: '바닥 판자 아래 숨겨진 비밀 금고',
      es: 'Caja Fuerte Oculta bajo el Suelo',
      fr: 'Coffre Secret sous le Plancher',
      de: 'Verborgenes Bodenschließfach',
      ru: 'Потайной сейф под половицами',
      it: 'Cassaforte Nascosta sotto il Pavimento',
      pt: 'Cofre Oculto sob o Assoalho',
      ar: 'خزنة سرية مطمورة تحت ألواح الأرضية'
    },
    description: {
      id: 'Papan lantai yang sedikit longgar di balik kain pelumas mesin. Kunci kombinasi tiga putaran terpasang kuat.',
      en: 'A loose plank hidden beneath machine grease rags. Secured with a heavy alchemical three-tumbler dial.',
      ja: '油まみれのウエスに隠された緩んだ床板。三連ダイヤル式の重厚な錬金術ロックで施錠されている。',
      zh: '遮掩在油污抹布下的一处松动木板，暗格内嵌有一口坚固的三位炼金转盘保险箱。',
      ko: '기계 기름걸레 아래 숨겨진 헐거운 바닥 판자. 3중 회전식 연금술 다이얼 자물쇠로 굳게 잠겨 있습니다.',
      es: 'Una tabla suelta oculta bajo trapos con grasa. Protegida por un dial alquímico de tres combinaciones.',
      fr: 'Une latte de plancher dissimulée sous des chiffons gras. Verrouillée par un cadran alchimique à trois crans.',
      de: 'Eine lose Diele unter öligen Putzlappen. Gesichert mit einem massiven alchemistischen Dreiradschloss.',
      ru: 'Шаткая половица под замасленным тряпьем. Заперта тяжелым трехдисковым алхимическим замком.',
      it: 'Un\'asse traballante coperta da stracci unti. Chiusa da una pesante combinazione alchemica a tre ghiere.',
      pt: 'Uma tábua solta oculta sob panos engraxados. Protegida por um pesado disco alquímico de três cilindros.',
      ar: 'لوح خشبي متخلخل تحت خرق شحم الماكينات، موصد بخزنة ثقيلة ذات قرص خيميائي ثلاثي التروس.'
    }
  ,
  poi_gantry_lantern: {
    title: {
      en: "Upper Gantry & Alchemical Lantern",
      id: "Anjungan Atas & Lentera Alkimia",
      zh: "提灯上层悬空回廊与炼金探灯",
      ja: "上層キャットウォークと錬金ランタン",
      ko: "상층 통로와 연금술 등불",
      es: "Pasarela Superior y Linterna Alquímica",
      fr: "Passerelle Supérieure et Lanterne Alchimique",
      de: "Oberer Laufsteg und Alchemielaterne",
      ru: "Верхние мостки и алхимический фонарь",
      it: "Passerella Superiore e Lanterna Alchemica",
      pt: "Passarela Superior e Lanterna Alquímica",
      ar: "الممر العلوي وفانوس الكيمياء"
    },
    description: {
      en: "A narrow iron grating over the gear abyss. Broken glass and alchemical soot mark where a clandestine visitor waited.",
      id: "Kisi besi sempit di atas jurang roda gigi. Pecahan kaca dan jelaga alkimia menandai tempat kurir rahasia mengintai.",
      zh: "悬空于齿轮深渊上方的狭窄铁栅回廊。碎玻璃与炼金煤烟残留在此，暴露出曾有秘密访客在暗中窥伺。",
      ja: "歯車の深淵に架かる細い鉄格子通路。割れたガラスと錬金術の煤が、何者かが潜んでいた痕跡を物語る。",
      ko: "톱니바퀴 심연 위에 놓인 좁은 철제 격자 통로. 깨진 유리와 연금술 그을음이 밀사의 잠복 흔적을 보여줍니다.",
      es: "Una estrecha rejilla de hierro sobre el abismo de engranajes. Restos de vidrio y hollín alquímico marcan una visita secreta.",
      fr: "Une étroite grille de fer au-dessus des engrenages. Du verre brisé et de la suie alchimique trahissent un intrus.",
      de: "Ein schmaler Eisensteg über den Zahnrädern. Glasscherben und Ruß beweisen einen heimlichen Besucher.",
      ru: "Узкая железная решетка над пропастью шестерен. Осколки стекла и сажа выдают присутствие тайного гостя.",
      it: "Una stretta grata di ferro sull'abisso di ingranaggi. Vetri rotti e fuliggine alchemica indicano una presenza segreta.",
      pt: "Uma estreita grade de ferro sobre o abismo de engrenagens. Cacos de vidro e fuligem revelam uma visita clandestina.",
      ar: "ممر حديدي ضيق فوق هاوية التروس. زجاج محطم وسخام كيميائي يشيران إلى ترصد زائر سري قبل الحادث."
    }
  },
  poi_clock_chime_bell: {
    title: {
      en: "Colossal Bronze Bell & Chime Gearing",
      id: "Lonceng Perunggu Raksasa & Gigi Dentang",
      zh: "圣艾琳青铜大钟与共振撞锤齿轮",
      ja: "聖アイリーンの巨鐘と鐘打撃歯車",
      ko: "성 아이린 청동 거대 종과 타종 기어",
      es: "Campana Monumental y Engranajes del Carrillón",
      fr: "Cloche Colossale et Engrenages de Sonnerie",
      de: "Kolossale Bronzeglocke und Schlagwerk",
      ru: "Исполинский бронзовый колокол и бойный механизм",
      it: "Campana Monumentale e Meccanismo del Rintocco",
      pt: "Sino Colossal de Bronze e Engrenagens do Carrilhão",
      ar: "الجرس البرونزي الضخم وتروس دق الساعات"
    },
    description: {
      en: "The eight-ton bell that tolls for District 7. A fine steel wire is wrapped through the clapper linkage down into the pendulum escapement.",
      id: "Lonceng delapan ton yang berdentang bagi Distrik 7. Kawat baja tipis terlilit dari pemukul lonceng menuju mekanisme pendulum.",
      zh: "重达八吨的圣艾琳主钟。一根极细的高张力钢丝从钟锤连杆悄然延伸至下方的钟摆脱扣装置上！",
      ja: "第7区に時を告げる8トンの大鐘。打鐘レバーから振り子の脱進機へと細い鋼鉄ワイヤーが巧みに結ばれている。",
      ko: "제7구역에 시각을 알리는 8톤 청동 종. 종 치는 추의 연결부에서 진자 탈착부까지 정교한 강철 와이어가 이어져 있습니다.",
      es: "La campana de ocho toneladas que dobla para el Distrito 7. Un fino cable de acero conecta el badajo al péndulo.",
      fr: "La cloche de huit tonnes qui sonne pour le District 7. Un fil d'acier fin relie le battant au balancier.",
      de: "Die Acht-Tonnen-Glocke des Distrikts 7. Ein dünner Stahldraht verbindet den Klöppel mit dem Pendelwerk.",
      ru: "Восьмитонный колокол 7-го района. Тонкий стальной тросик тянется от языка колокола к спусковому механизму маятника.",
      it: "La campana da otto tonnellate del Distretto 7. Un sottile cavo d'acciaio collega il battaglio allo scappamento.",
      pt: "O sino de oito toneladas que toca pelo Distrito 7. Um fino fio de aço liga o badalo ao escape do pêndulo.",
      ar: "الجرس الضخم البالغ وزنه ثمانية أطنان. سلك فولاذي رفيع يربط لسان الجرس بآلية فك قفل البندول بدقة ميكانيكية."
    }
  }
  }
};

export const GAMEOVER_I18N = {
  physical: {
    title: {
      id: 'KERUNTUHAN FISIK & SERANGAN JANTUNG',
      en: 'PHYSICAL COLLAPSE & CARDIAC ARREST',
      ja: '肉体的崩壊と心臓麻痺',
      zh: '肉体崩溃与急性心搏骤停',
      ko: '육체적 붕괴 및 심장마비',
      es: 'COLAPSO FÍSICO Y PARO CARDÍACO',
      fr: 'EFFONDREMENT PHYSIQUE ET ARRÊT CARDIAQUE',
      de: 'PHYSISCHER ZUSAMMENBRUCH UND HERZSTILLSTAND',
      ru: 'ФИЗИЧЕСКИЙ КОЛЛАПС И ОСТАНОВКА СЕРДЦА',
      it: 'COLLASSO FISICO E ARRESTO CARDIACO',
      pt: 'COLAPSO FÍSICO E PARADA CARDÍACA',
      ar: 'انهيار جسدي وتوقف عضلة القلب'
    },
    description: {
      id: 'Jantungmu yang lelah akhirnya menyerah. Vena di pelipismu berdenyut perih saat lantai menara jam yang dingin menyambut wajahmu. Roda gigi raksasa di atas terus berputar tanpa belas kasihan. Penyelidikan ini terkubur bersamamu.',
      en: 'Your strained heart finally gives out. Cold rain spatters against your face as your body collapses onto the clocktower floorboards. The brass gears churn unfeelingly overhead. The inquiry dies with you.',
      ja: '酷使された心臓がついに停止する。時計塔の冷たい床板に崩れ落ちるあなたの顔を冷雨が叩く。頭上で巨大な真鍮の歯車が無慈悲に回り続ける中、事件の真相はあなたと共に闇へと葬られた。',
      zh: '重压之下的衰竭心脏彻底停止跳动。冰冷的寒雨拍打在你的脸颊上，身躯沉重地倒在钟楼湿滑的木板上。头顶上巨大的青铜齿轮依旧冷酷轰鸣，这桩惊天悬案随你一同长眠。',
      ko: '한계에 달했던 심장이 결국 멎어버립니다. 차가운 빗물이 얼굴을 때리는 가운데 당신의 몸은 시계탑 바닥으로 붕괴합니다. 머리 위의 황동 톱니바퀴는 무자비하게 돌아가고, 진실은 당신과 함께 매장됩니다.',
      es: 'Tu corazón agotado finalmente se rinde. La lluvia fría golpea tu rostro mientras tu cuerpo colapsa sobre las tablas. Los engranajes de latón siguen girando sin piedad. La investigación muere contigo.',
      fr: 'Votre cœur à bout de souffle finit par céder. La pluie glaciale cingle votre visage tandis que votre corps s\'effondre sur le plancher. Les engrenages continuent de tourner, indifférents. L\'enquête meurt avec vous.',
      de: 'Ihr überlastetes Herz gibt endgültig auf. Kaltes Regenwasser klatscht auf Ihr Gesicht, als Sie auf die Dielen stürzen. Die Messingräder mahlen gefühllos weiter. Die Ermittlung stirbt mit Ihnen.',
      ru: 'Истерзанное сердце замирает. Холодные капли дождя хлещут по лицу, когда вы падаете на дощатый пол башни. Латунные шестерни безучастно продолжают ход. Дело похоронено вместе с вами.',
      it: 'Il tuo cuore affaticato infine cede. La pioggia gelida sferza il tuo viso mentre crolli sulle assi della torre. Gli ingranaggi continuano a girare incuranti. L\'indagine sprofonda con te.',
      pt: 'Seu coração exausto finalmente cede. A chuva fria fustiga seu rosto enquanto seu corpo colapsa no assoalho da torre. As engrenagens continuam girando implacáveis. A investigação morre com você.',
      ar: 'قلبك المنهك يستسلم في النهاية. تصفع قطرات المطر وجهك وأنت تهوي على ألواح برج الساعة الباردة. التروس النحاسية العملاقة تدور بلا رحمة فوقك، وتدفن الحقيقة معك إلى الأبد.'
    }
  },
  psychological: {
    title: {
      id: 'KEGILAAN TOTAL & AMNESIA KEJIWAAN',
      en: 'EXISTENTIAL PSYCHOSIS & HYSTERIA',
      ja: '実存的恐慌と完全なる精神崩壊',
      zh: '存在主义狂乱与彻底的精神崩溃',
      ko: '실존적 광기와 정신적 붕괴',
      es: 'PSICOSIS EXISTENCIAL Y COLAPSO MENTAL',
      fr: 'PSYCHOSE EXISTENTIELLE ET EFFONDREMENT',
      de: 'EXISTENZIELLE PSYCHOSE UND ZUSAMMENBRUCH',
      ru: 'ЭКЗИСТЕНЦИАЛЬНЫЙ ПСИХОЗ И ПОМЕШАТЕЛЬСТВО',
      it: 'PSICOSI ESISTENZIALE E CROLLO MENTALE',
      pt: 'PSICOSE EXISTENCIAL E COLAPSO MENTAL',
      ar: 'ذهان وجودي حاد وانهيار نفسي تام'
    },
    description: {
      id: 'Suara-suara di kepalamu menjerit serentak, menenggelamkan sisa logikamu dalam keputusasaan yang pekat. Kamu melempar lencanamu ke dalam jurang mesin dan tertawa lepas dalam hujan. Kamu bukan lagi seorang detektif.',
      en: 'The chorus of intrusive inner voices shrieks in deafening unison, drowning your last shred of reason in delirium. You fling your badge into the churn of gears and wander aimlessly into the rain.',
      ja: '脳内の内なる声が一斉に悲鳴を上げ、理性の最後の一片を狂気の渦へと沈める。あなたは警察バッジを歯車の狭間へと投げ捨て、冷たい雨の中へと高笑いしながら彷徨い去った。',
      zh: '潜意识深处的无数臆语尖叫轰鸣，将你仅存的一丝理性彻底淹没在可悲的谵妄中。你狂笑着将警徽掷入轰鸣的齿轮裂隙，漫无目的地遁入风雨之中。',
      ko: '내면의 목소리들이 일제히 귀청이 찢어지도록 비명을 지르며, 마지막 남은 이성의 끈을 광기의 심연으로 밀어 넣습니다. 당신은 경찰 배지를 톱니바퀴 틈새로 던져버리고 빗속으로 실성한 듯 사라집니다.',
      es: 'El coro de voces interiores grita al unísono, ahogando tu último ápice de razón en el delirio. Arrojas tu placa a los engranajes y te alejas riendo bajo la lluvia.',
      fr: 'Le chœur de vos voix intérieures hurle à l\'unisson, noyant votre dernier souffle de raison dans le délire. Vous jetez votre insigne dans les rouages et vous perdez sous la pluie.',
      de: 'Der Chor Ihrer inneren Stimmen kreischt ohrenbetäubend auf und ertränkt jeden Rest von Vernunft im Delirium. Sie schleudern Ihre Marke ins Getriebe und taumeln lachend in den Regen.',
      ru: 'Хор внутренних голосов взрывается оглушительным визгом, топя последние крупицы разума в безумии. Вы швыряете свой жетон в шестерни и бесцельно уходите в дождь.',
      it: 'Il coro di voci interiori esplode in un urlo assordante, annegando l\'ultimo barlume di ragione nel delirio. Getti il distintivo tra gli ingranaggi e svanisci ridendo nella pioggia.',
      pt: 'O coro de vozes interiores berra em uníssono, afogando sua última réstia de sanidade no delírio. Você atira seu distintivo nas engrenagens e caminha sem rumo na chuva.',
      ar: 'تتعالى أصواتك الباطنية في صرخة مدوية تصم الآذان، مغرقةً آخر ذرة من عقلك في دوامة الهذيان. تقذف شارتك بين تروس الماكينات وتمضي ضاحكًا بهستيريا تحت وطأة المطر.'
    }
  },
  arrest: {
    title: {
      id: 'PENANGKAPAN & PEMECATAN MEMALUKAN',
      en: 'DISGRACED ARREST & IMMEDIATE DISMISSAL',
      ja: '不名誉な逮捕と即時罷免',
      zh: '当场逮捕与革职查办',
      ko: '불명예 체포 및 즉각 파면',
      es: 'ARRESTO VERGONZOSO Y DESTITUCIÓN INMEDIATA',
      fr: 'ARRESTATION DÉSHONORANTE ET DESTITUTION',
      de: 'SCHMÄHLICHE VERHAFTUNG UND SUSPENDIERUNG',
      ru: 'ПОЗОРНЫЙ АРЕСТ И НЕМЕДЛЕННОЕ УВОЛЬНЕНИЕ',
      it: 'ARRESTO IGNOMINIOSO E RIMOZIONE IMMEDIATA',
      pt: 'PRISÃO DESONROSA E DEMISSÃO IMEDIATA',
      ar: 'اعتقال مخزٍ وعزل فوري من الخدمة'
    },
    description: {
      id: 'Menuduh tanpa bukti fisik adalah bunuh diri bagi seorang perwira hukum. Inspektur Graves menodongkan pistol dinasnya dan memborgolmu di depan Madame Vance. Kariermu berakhir dalam aib.',
      en: 'Accusing a high-profile citizen without material proof was career suicide. Inspector Graves draws his revolver, snaps cold manacles around your wrists, and marches you down in handcuffs.',
      ja: '物証なきまま有力者を告発したのは致命的な過ちだった。グレイヴス警部は拳銃を抜き、未亡人の前であなたを手錠で拘束した。あなたの刑事としての経歴は汚名と共に終わった。',
      zh: '在缺乏确凿物证的情况下鲁莽指控显赫市民无异于自取灭亡。格雷夫斯警探拔出警用左轮手枪，当众将你铐上带走，你的探长生涯在耻辱中彻底断送。',
      ko: '물증 없는 섣부른 추궁은 치명적인 자멸이었습니다. 그레이브스 형사는 권총을 겨누며 비비안 부인 앞에서 당신에게 수갑을 채웠고, 당신의 수사관 경력은 치욕 속에 끝장났습니다.',
      es: 'Acusar a una ciudadana influyente sin pruebas fue un suicidio profesional. El inspector Graves saca su revólver y te pone las esposas en el acto.',
      fr: 'Accuser sans preuve matérielle était un suicide professionnel. L\'inspecteur Graves braque son revolver et vous passe les fers sur-le-champ.',
      de: 'Ohne handfeste Beweise anzuklagen war fataler Leichtsinn. Inspektor Graves zieht die Waffe, legt Ihnen Handschellen an und führt Sie in Schande ab.',
      ru: 'Обвинение без улик оказалось фатальным. Инспектор Грейвс взводит курок револьвера и защелкивает на ваших запястьях наручники. Ваша карьера растоптана.',
      it: 'Accusare senza prove è stato un suicidio professionale. L\'ispettore Graves estrae il revolver e ti stringe le manette ai polsi seduta stante.',
      pt: 'Acusar sem provas materiais foi um suicídio profissional. O inspetor Graves saca o revólver e coloca algemas em você na mesma hora.',
      ar: 'توجيه الاتهام دون أدلة ملموسة كان انتحارًا مهنيًا صريحًا. سحب المفتش غريفز مسدسه وكبل معصميك بالأصفاد مقتادًا إياك في خزي وعار.'
    }
  }
};

// Clues Translations
export const CLUES_I18N = (typeof CLUES_I18N_FULL !== 'undefined') ? CLUES_I18N_FULL : {};

// Dialogue Nodes Localizations
export const DIALOGUE_I18N = (typeof DIALOGUE_I18N_FULL !== 'undefined') ? DIALOGUE_I18N_FULL : {};

// Helper to get fully localized dialogue node
export function getLocalizedDialogueNode(nodeId, lang = 'en', baseNode) {
  if (!baseNode) return null;
  const currentLang = UI_TRANSLATIONS[lang] ? lang : 'en';

  const node = {
    ...baseNode,
    voices: baseNode.voices ? baseNode.voices.map(v => ({ ...v })) : [],
    options: baseNode.options ? baseNode.options.map(o => ({ ...o })) : []
  };

  const nodeTrans = DIALOGUE_I18N[nodeId];
  if (nodeTrans) {
    if (nodeTrans.speaker) {
      node.speaker = nodeTrans.speaker[currentLang] || nodeTrans.speaker['en'] || nodeTrans.speaker['id'] || baseNode.speaker;
    }
    if (nodeTrans.text) {
      node.text = nodeTrans.text[currentLang] || nodeTrans.text['en'] || nodeTrans.text['id'] || baseNode.text;
    }
    if (nodeTrans.voices && Array.isArray(nodeTrans.voices)) {
      nodeTrans.voices.forEach((vTrans, idx) => {
        if (node.voices[idx]) {
          if (vTrans.voice) node.voices[idx].voice = vTrans.voice[currentLang] || vTrans.voice['en'] || vTrans.voice['id'] || node.voices[idx].voice;
          if (vTrans.badge) node.voices[idx].badge = vTrans.badge[currentLang] || vTrans.badge['en'] || vTrans.badge['id'] || node.voices[idx].badge;
          if (vTrans.text) node.voices[idx].text = vTrans.text[currentLang] || vTrans.text['en'] || vTrans.text['id'] || node.voices[idx].text;
        }
      });
    }
    if (nodeTrans.options && Array.isArray(nodeTrans.options)) {
      node.options.forEach((opt, idx) => {
        let oTrans = null;
        if (opt.id) {
          oTrans = nodeTrans.options.find(o => o && o.id === opt.id);
        }
        if (!oTrans) {
          oTrans = nodeTrans.options[idx];
        }
        if (oTrans) {
          const transText = oTrans[currentLang] || oTrans['en'] || oTrans['id'];
          if (transText) {
            opt.text = transText;
          }
        }
      });
    }
  }

  return node;
}

export function tClue(clueId, field = 'title', lang = 'en') {
  const clue = CLUES_I18N[clueId];
  if (!clue) return null;
  const currentLang = clue[field] && clue[field][lang] ? lang : 'en';
  return clue[field][currentLang] || clue[field]['en'] || clue[field]['id'] || '';
}

export function tGameOver(type, field = 'title', lang = 'en') {
  const g = GAMEOVER_I18N[type] || GAMEOVER_I18N['physical'];
  const currentLang = g[field] && g[field][lang] ? lang : 'en';
  return g[field][currentLang] || g[field]['en'] || g[field]['id'] || '';
}

// Translation lookup helper
export function t(key, lang = 'en') {
  const currentLang = UI_TRANSLATIONS[lang] ? lang : 'en';
  if (UI_TRANSLATIONS[currentLang] && UI_TRANSLATIONS[currentLang][key]) {
    return UI_TRANSLATIONS[currentLang][key];
  }
  if (UI_TRANSLATIONS['en'] && UI_TRANSLATIONS['en'][key]) {
    return UI_TRANSLATIONS['en'][key];
  }
  if (UI_TRANSLATIONS['id'] && UI_TRANSLATIONS['id'][key]) {
    return UI_TRANSLATIONS['id'][key];
  }
  return key;
}

export function tItem(itemId, field = 'name', lang = 'en') {
  const item = ITEMS_I18N[itemId];
  if (!item) return null;
  const currentLang = item[field] && item[field][lang] ? lang : 'en';
  return item[field][currentLang] || item[field]['en'] || item[field]['id'] || '';
}

export function tPoi(poiId, field = 'title', lang = 'en') {
  const poi = (typeof NEW_POIS_I18N !== 'undefined' && NEW_POIS_I18N[poiId]) || POI_I18N[poiId];
  if (!poi) return null;
  const currentLang = poi[field] && poi[field][lang] ? lang : 'en';
  return poi[field][currentLang] || poi[field]['en'] || poi[field]['id'] || '';
}

// --------------------------------------------------------------------------
// Character Creator Vices Localization (5 Native Languages)
// --------------------------------------------------------------------------
export const VICES_I18N = {
  smoker: {
    title: {
      en: '🚬 Chain-Smoker of Astra Red',
      id: '🚬 Perokok Berat Astra Merah',
      zh: '🚬 阿斯特拉红烟重度烟瘾',
      ja: '🚬 アストラ・レッドのヘビースモーカー',
      ko: '🚬 아스트라 레드 골초'
    },
    desc: {
      en: 'Perception +1, but chronic cough lowers Endurance maximum by 1.',
      id: 'Persepsi +1, namun batuk menahun mengurangi batas maksimal Daya Tahan sebesar 1.',
      zh: '感知+1，但慢性剧烈咳嗽导致体能上限减少1。',
      ja: '知覚+1、だが慢性的な咳き込みにより耐久力上限が1低下。',
      ko: '지각 +1, 하지만 만성 기침으로 인해 최대 체력이 1 감소합니다.'
    }
  },
  laudanum: {
    title: {
      en: '🧪 Tincture of Laudanum Addict',
      id: '🧪 Ketergantungan Tinktur Laudanum',
      zh: '🧪 阿片酊化学成瘾',
      ja: '🧪 医療用アヘンチンキ中毒',
      ko: '🧪 라우다넘 팅크제 중독'
    },
    desc: {
      en: 'Esoterica +2, but sudden withdrawals inflict periodic Logic penalties.',
      id: 'Esoterika +2, namun gejala sakau mendadak menimbulkan penalti Logika berkala.',
      zh: '秘教+2，但突发的戒断反应会带来阶段性逻辑惩罚。',
      ja: '秘教+2、だが禁断症状による定期的な論理ペナルティを受ける。',
      ko: '비전 +2, 하지만 금단 현상 발생 시 주기적인 논리 페널티를 받습니다.'
    }
  },
  insomniac: {
    title: {
      en: '🕯️ Insomniac Philosopher',
      id: '🕯️ Filsuf Pengidap Insomnia',
      zh: '🕯️ 失眠梦魇哲学家',
      ja: '🕯️ 不眠症の思索家',
      ko: '🕯️ 불면증에 시달리는 철학자'
    },
    desc: {
      en: 'Conceptualization +2, but sleep deprivation heightens susceptibility to panic.',
      id: 'Konseptualisasi +2, namun kurang tidur kronis memperparah kerentanan terhadap panik.',
      zh: '概念化+2，但长期严重睡眠不足大幅加剧恐慌脆弱性。',
      ja: '概念化+2、だが慢性的睡眠不足によりパニック耐性が低下。',
      ko: '개념화 +2, 하지만 수면 부족으로 인해 정신적 패닉에 취약해집니다.'
    }
  },
  klepto: {
    title: {
      en: '🗝️ Compulsive Relic Hoarder',
      id: '🗝️ Pengumpul Relik Kompulsif',
      zh: '🗝️ 强迫症古物囤积癖',
      ja: '🗝️ 強迫的遺物蒐集癖',
      ko: '🗝️ 강박적 유물 수집벽'
    },
    desc: {
      en: 'Interfacing +2, but precinct colleagues view you with suspicion.',
      id: 'Penyelarasan Mesin +2, namun rekan detektif memandangmu dengan curiga.',
      zh: '机构连动+2，但警区同僚始终以怀疑甚至提防的目光注视着你。',
      ja: '機構連動+2、だが分署の同僚たちから常に不審の目で見られる。',
      ko: '기계 조율 +2, 하지만 관할서 동료들이 당신을 의심스럽게 바라봅니다.'
    }
  }
};

export function tVice(viceKey, field = 'title', lang = 'en') {
  const v = VICES_I18N[viceKey];
  if (!v) return '';
  const currentLang = v[field] && v[field][lang] ? lang : 'en';
  return v[field][currentLang] || v[field]['en'] || v[field]['id'] || '';
}

// --------------------------------------------------------------------------
// Thought Cabinet Database Localization (5 Native Languages)
// --------------------------------------------------------------------------
export const THOUGHTS_I18N = {
  clockmakers_paradox: {
    name: {
      en: "The Clockmaker's Paradox",
      id: "Paradoks Sang Pembuat Jam",
      zh: "钟表宗师的逆时悖论",
      ja: "時計師の逆理",
      ko: "시계 장인의 역설"
    },
    category: {
      en: 'Dialectic Horology',
      id: 'Dialektika Horologis',
      zh: '辩证钟表学',
      ja: '弁証法的時計学',
      ko: '변증법적 시계학'
    },
    flavor: {
      en: 'If Aurelia Vance designed pendulum escapements that measured moments before they physically transpired, did she build her own execution mechanism?',
      id: 'Jika Aurelia Vance merancang mekanisme pendulum yang mengukur momen sebelum terjadi, apakah ia merancang mesin eksekusinya sendiri?',
      zh: '如果奥蕾莉亚·梵斯所设计的擒纵机构能够在物理时刻降临前便预先记录，那她是否亲手铸造了自己的死刑机械？',
      ja: 'もしオレリア・ヴァンスが物理的に刻まれる前の瞬間を測定する脱進機を設計していたなら、彼女は自らの処刑装置を組み立てたのだろうか？',
      ko: '만약 오렐리아 밴스가 사건이 물리적으로 발생하기도 전에 그 순간을 측정하는 진자 탈착기를 설계했다면, 그녀는 자신의 처형 기계를 직접 만든 것인가?'
    },
    explanation: {
      en: 'You find yourself staring at rotating brass gears until your retinas imprint with Roman numerals. Time is not a linear river; it is a coiled torsion spring waiting to snap backward.',
      id: 'Kau menatap roda gigi kuningan hingga retinamu tercap angka Romawi. Waktu bukan aliran sungai linier; waktu adalah pegas torsi yang siap tersentak ke belakang.',
      zh: '你凝视着轰鸣旋转的黄铜齿轮，直到罗马数字灼刻在你的视网膜上。时间绝非奔涌的单向长河；它是一根紧绷的扭力弹簧，随时可能疯狂倒卷。',
      ja: '網膜にローマ数字が焼き付くまで、回転する真鍮の歯車を見つめ続ける。時間は直線的な川ではない。いつでも激しく逆回転しうる圧縮された捩りバネなのだ。',
      ko: '망막에 로마 숫자가 각인될 때까지 회전하는 황동 톱니를 응시합니다. 시간은 선형적인 강물이 아닙니다. 언제든 거꾸로 튕겨 나갈 준비가 된 비틀림 용수철입니다.'
    },
    tempDrawback: {
      en: 'Logic -1 (Migraine from impossible gear ratios)',
      id: 'Logika -1 (Migrain akibat rasio roda gigi mustahil)',
      zh: '逻辑 -1 (解析荒谬齿轮比引发的剧烈偏头痛)',
      ja: '論理 -1 (不可能な歯車比による激しい偏頭痛)',
      ko: '논리 -1 (불가능한 기어비로 인한 극심한 편두통)'
    },
    solution: {
      en: 'Time is malleable when measured by murder. You perceive mechanical flaws in suspects testimonies before they even finish speaking.',
      id: 'Waktu menjadi lentur saat diukur melalui pembunuhan. Kau mengenali cacat logis dalam kesaksian tersangka sebelum mereka selesai bicara.',
      zh: '以谋杀为刻度时，时间展现出奇异的延展性。在嫌疑人话音未落之前，你已洞悉其供词中的逻辑致命断裂。',
      ja: '殺人によって測定される時、時間は歪み始める。容疑者が言葉を結ぶ前に、その証言に潜む機械的欠陥を看破できる。',
      ko: '살인으로 측정될 때 시간은 가변적이 됩니다. 용의자가 말을 끝마치기도 전에 그 증언의 기계적 모순을 간파합니다.'
    }
  },
  amnesia_as_defense: {
    name: {
      en: 'Amnesia as Self-Defense',
      id: 'Amnesia sebagai Pertahanan Diri',
      zh: '作为自卫壁垒的失忆',
      ja: '自己防衛としての記憶喪失',
      ko: '자기 방어로서의 기억상실'
    },
    category: {
      en: 'Psychological Splinter',
      id: 'Serpihan Kejiwaan',
      zh: '心理防御碎片',
      ja: '精神的破片',
      ko: '심리적 파편'
    },
    flavor: {
      en: "Why did you drink yourself into oblivion last night? Perhaps your amnesia wasn't an accident, but an act of mercy by your subconscious.",
      id: 'Mengapa kau menenggelamkan diri dalam alkohol semalam? Mungkin amnesiamu bukan ketidaksengajaan, melainkan tindakan belas kasih dari alam bawah sadarmu.',
      zh: '昨夜你为何狂饮至神智全无？或许突如其来的失忆并非酒醉的意外，而是潜意识为拯救理智所施舍的慈悲。',
      ja: '昨夜、なぜ意識を失うまで酒を呷ったのか？その記憶喪失は過失ではなく、潜在意識による慈悲深き自衛だったのではないか。',
      ko: '어젯밤 당신은 왜 인사불성이 되도록 술을 마셨을까요? 기억상실은 실수가 아니라, 잠재의식이 베푼 자비였을지도 모릅니다.'
    },
    explanation: {
      en: 'The past is a carnivorous beast in the dark. By forgetting your own name and yesterday\'s horrors, you rendered the predator toothless.',
      id: 'Masa lalu adalah binatang buas di kegelapan. Dengan melupakan namamu dan kengerian kemarin, kau mencabut taring pemangsa itu.',
      zh: '过去是一头潜伏在幽暗深处的食肉巨兽。遗忘自己的姓名与昨日的惨剧，正是你卸下巨兽利齿的唯一法门。',
      ja: '過去とは暗闇に潜む肉食獣だ。己の名と昨日の惨劇を忘却することで、その牙を根こそぎ奪い去ったのだ。',
      ko: '과거는 어둠 속의 육식수입니다. 이름과 어제의 공포를 망각함으로써 포식자의 이빨을 뽑아버린 것입니다.'
    },
    tempDrawback: {
      en: 'Morale -1 (Empty mirrors produce cold vertigo)',
      id: 'Kewarasan -1 (Cermin kosong memicu vertigo dingin)',
      zh: '理智 -1 (凝视陌生空洞的镜影引发冰冷晕眩)',
      ja: '精神力 -1 (空虚な鏡が冷酷な眩暈を引き起こす)',
      ko: '사기 -1 (텅 빈 거울이 차가운 현기증을 유발함)'
    },
    solution: {
      en: 'You accept the blank slate. What you forgot cannot be used to break your spirit.',
      id: 'Kau menerima lembaran kosong ini. Hal yang terlupakan tak lagi dapat meremukkan jiwamu.',
      zh: '你欣然接纳了这张空白画卷。已被遗忘的深渊之物，便再也无法击垮你坚硬如铁的意志。',
      ja: '白紙の精神を受け入れる。忘却した過去は、もはやあなたの魂を打ち砕く刃にはなり得ない。',
      ko: '백지상태를 온전히 수용합니다. 잊어버린 과거는 더 이상 당신의 영혼을 꺾을 수 없습니다.'
    }
  },
  metaphysics_of_rain: {
    name: {
      en: 'Metaphysics of Cold Rain',
      id: 'Metafisika Hujan Dingin',
      zh: '寒雨的形而上学',
      ja: '冷雨の形而上学',
      ko: '차가운 비의 형이상학'
    },
    category: {
      en: 'Atmospheric Melancholy',
      id: 'Melankolia Atmosferik',
      zh: '氛围忧郁',
      ja: '大気的憂鬱',
      ko: '대기적 우울'
    },
    flavor: {
      en: 'The rain drumming on the clocktower roof sounds identical to a Morse code transmission from an extinct civilization.',
      id: 'Hujan yang memukuli atap seng menara jam terdengar persis seperti transmisi kode Morse dari peradaban yang telah punah.',
      zh: '雨点击打在钟楼锌铁屋顶上的闷响，听上去宛如某个早已覆灭的失落文明发来的莫尔斯电码。',
      ja: '時計塔の屋根を叩く雨音は、滅亡した古代文明からのモールス信号と完全に一致している。',
      ko: '시계탑 지붕을 두드리는 빗소리는 멸망한 문명이 보내는 모스 부호 통신과 똑같이 들립니다.'
    },
    explanation: {
      en: 'Water carries electrical charges, industrial soot, and whispered regrets. If you listen closely, the storm tells you where the killer stepped.',
      id: 'Air membawa muatan listrik, jelaga pabrik, dan bisikan penyesalan. Jika kau mendengarkan seksama, badai memberitahumu ke mana pembunuh melangkah.',
      zh: '雨水承载着静电荷、工业烟尘与七百万码头工人的叹息。只要静心凝神，风暴自会低吟凶徒潜逃的足迹。',
      ja: '雨水は電荷、煤煙、労働者たちの悔恨を運ぶ。耳を澄ませば、嵐そのものが犯人の足取りを囁いてくれる。',
      ko: '빗물은 전하, 매연, 부두 노동자들의 후회를 실어 나릅니다. 귀를 기울이면 폭풍이 살인자의 발자취를 알려줍니다.'
    },
    tempDrawback: {
      en: 'Conceptualization -1 (Distracted by dripping eaves)',
      id: 'Konseptualisasi -1 (Terganggu oleh tetesan air atap)',
      zh: '概念化 -1 (屋檐连绵的水滴声极度分散思绪)',
      ja: '概念化 -1 (滴る雨垂れの音に思考を乱される)',
      ko: '개념화 -1 (처마 밑 물방울 소리에 정신이 분산됨)'
    },
    solution: {
      en: 'The atmospheric pressure sharpens your intuitive sixth sense. The city speaks directly into your ear canal.',
      id: 'Tekanan atmosferik menajamkan indra keenammu. Kota ini berbisik langsung ke saluran telingamu.',
      zh: '压抑的气压反常地淬炼了你的第六感直觉。整座工业都市的阴影正在贴着你的耳廓低语。',
      ja: '気圧の変化が直観の第六感を研ぎ澄ます。街そのものが、あなたの耳朶へ直接語りかけてくる。',
      ko: '대기압이 육감을 날카롭게 벼려냅니다. 도시 자체가 당신의 귓가에 직접 속삭입니다.'
    }
  },
  sovereign_bureaucrat: {
    name: {
      en: 'The Sovereign Bureaucrat',
      id: 'Birokrat Berdaulat',
      zh: '至高无上的官僚专制',
      ja: '絶対的官僚主義',
      ko: '절대적 관료주의'
    },
    category: {
      en: 'Civic Authority',
      id: 'Otoritas Sipil',
      zh: '公权权威',
      ja: '市民権力',
      ko: '시민 권위'
    },
    flavor: {
      en: 'The chiefs think power resides in bayonets. But real power resides in the rubber stamp of an inspector who simply refuses to sign.',
      id: 'Para petinggi mengira kekuasaan ada pada bayonet. Namun kekuasaan sejati ada pada stempel inspektur yang menolak bertanda tangan.',
      zh: '高层误以为强权来自刺刀。然而至高权力实则蕴含在一位冷酷探长坚决拒签尸检移交文件的印章中。',
      ja: '上層部は権力が銃剣に宿ると信じている。だが真の権力とは、移送書類への署名を冷淡に拒否する捜査官のゴム印にある。',
      ko: '서장들은 권력이 총검에서 나온다고 믿습니다. 하지만 진정한 권력은 서명을 단호히 거부하는 검시관의 고무 직인에 있습니다.'
    },
    explanation: {
      en: 'A badge is just tin. But procedural stubbornness? That is the immutable bedrock of civilization.',
      id: 'Lencana hanyalah timah. Namun keteguhan prosedur? Itulah pondasi peradaban yang tak tergoyahkan.',
      zh: '警徽不过是镀锡薄片。但程序上的铁面执拗？那才是人类文明不可撼动的基石。',
      ja: 'バッジなどただのブリキ板だ。だが規程を盾にした頑迷さこそ、文明の不変の岩盤なのだ。',
      ko: '배지는 양철 조각에 불과합니다. 그러나 절차적 고집이야말로 문명의 확고부동한 반석입니다.'
    },
    tempDrawback: {
      en: 'Savoir Faire -1 (Stiff, unyielding posture)',
      id: 'Savoir Faire -1 (Postur kaku dan tak kenal kompromi)',
      zh: '从容自若 -1 (僵硬傲慢、难以妥协的官僚姿态)',
      ja: '処世術 -1 (柔軟性を欠く強情な官僚的態度)',
      ko: '기민성 -1 (타협을 모르는 뻣뻣하고 완고한 태도)'
    },
    solution: {
      en: 'You exude the unshakeable weight of administrative dread. Witnesses fold before you even raise your voice.',
      id: 'Kau memancarkan bobot intimidasi administratif. Saksi runtuh bahkan sebelum kau meninggikan suara.',
      zh: '你浑身散发着窒息般的行政威压感。甚至在你拔高语调前，目击证人便已在心理防线前彻底溃败。',
      ja: '圧倒的な行政的重圧を漂わせる。声を荒らげるまでもなく、目撃者は自ら心理的に屈服する。',
      ko: '행정적 위압감의 서늘한 무게를 발산합니다. 목소리를 높이기도 전에 증인들이 먼저 무너집니다.'
    }
  },
  nicotine_shroud: {
    name: {
      en: 'The Nicotine Shroud',
      id: 'Selubung Nikotin',
      zh: '尼古丁迷烟之幕',
      ja: 'ニコチンの帳',
      ko: '니코틴 장막'
    },
    category: {
      en: 'Vice & Nerve',
      id: 'Cacat & Keberanian',
      zh: '恶癖与心性',
      ja: '悪癖と胆力',
      ko: '악벽과 담력'
    },
    flavor: {
      en: 'The smoke from an Astra Red does not merely coat your alveoli; it forms a defensive aerosol boundary between your soul and the decaying world.',
      id: 'Asap dari Astra Merah bukan sekadar melapisi paru-parumu; ia membentuk batas pelindung aerosol antara jiwamu dan dunia yang membusuk.',
      zh: '阿斯特拉红烟的辛辣烟雾不仅附着在你的肺泡间；更在你疲惫的灵魂与这腐朽世界之间构筑起一道绝缘屏障。',
      ja: 'アストラ・レッドの紫煙は肺を燻すだけでなく、魂と荒廃した世界との間に防壁を張り巡らせる。',
      ko: '아스트라 레드의 연기는 폐를 감쌀 뿐만 아니라, 영혼과 부패한 세계 사이에 방어막을 형성합니다.'
    },
    explanation: {
      en: 'Every inhalation is a tiny flame against the frost of District 7. You exhale gray clouds that obscure your trembling hands.',
      id: 'Setiap hisapan adalah nyala api kecil melawan dinginnya Sektor 7. Kau menghembuskan awan kelabu yang menyamarkan tanganmu yang gemetar.',
      zh: '每一次深吸，都是在第七区的刺骨寒霜中点燃微弱篝火。呼出的灰白烟雾，恰好遮掩了你不住颤抖的指尖。',
      ja: '一服ごとに、第7区の凍てつく寒気へ抗う小さな炎を灯す。吐き出す灰色の煙が、震える指先を覆い隠す。',
      ko: '들이마시는 한 모금마다 제7구역의 서리에 맞서는 작은 불씨가 됩니다. 내뿜는 회색 연기는 떨리는 손을 가려줍니다.'
    },
    tempDrawback: {
      en: 'Endurance -1 (Rattling smoker cough)',
      id: 'Daya Tahan -1 (Batuk perokok yang parau)',
      zh: '体能 -1 (剧烈嘶哑的烟民抽搐咳嗽)',
      ja: '耐久力 -1 (嗄れた激しい咳込み)',
      ko: '체력 -1 (거칠게 쌕쌕거리는 흡연자 기침)'
    },
    solution: {
      en: 'Steely nerves. In moments of panic, a single puff restores total tactical clarity.',
      id: 'Keteguhan saraf baja. Di saat panik, satu hisapan memulihkan kejernihan taktis sepenuhnya.',
      zh: '钢铁般的神经稳定性。在恐慌濒临失控的临界点，仅需深吸一口，便能瞬间重构缜密的战术冷静。',
      ja: '鋼の胆力。パニックに陥る瞬間も、一服の煙が完全なる戦術的明晰さを取り戻させる。',
      ko: '강철 같은 신경. 공황의 순간에도 단 한 모금의 흡연이 전술적 명석함을 되찾아줍니다.'
    }
  }
};

export function tThought(thoughtId, field = 'name', lang = 'en') {
  const thought = THOUGHTS_I18N[thoughtId];
  if (!thought) return '';
  const currentLang = thought[field] && thought[field][lang] ? lang : 'en';
  return thought[field][currentLang] || thought[field]['en'] || thought[field]['id'] || '';
}

// --------------------------------------------------------------------------
// Loading Screen & Detective Randomizer Localizations (5 Native Languages)
// --------------------------------------------------------------------------
export const LOADER_QUOTES_I18N = {
  en: [
    "“The clock never stops. Only the flesh within it forgets how to beat.”",
    "“There is a place where every unanswered question gathers like dead skin.”",
    "“You cannot interrogate the fog. It already knows what you did.”",
    "“Amnesia is not an absence of memory, but a presence of self-preservation.”",
    "“In District 7, even the statues have pawn shop tags tied to their wrists.”"
  ],
  id: [
    "“Detik jam tak pernah berhenti. Hanya daging di dalamnya yang lupa cara berdetak.”",
    "“Ada tempat di mana pertanyaan tanpa jawaban berkumpul seperti kulit mati.”",
    "“Kau tak bisa menginterogasi kabut. Ia telah tahu apa yang kau perbuat.”",
    "“Amnesia bukanlah ketiadaan ingatan, melainkan kehadiran naluri pertahanan diri.”",
    "“Di Sektor 7, bahkan patung-patung kota memiliki label rumah gadai di pergelangan tangannya.”"
  ],
  zh: [
    "“钟摆永不停歇。唯有齿轮间的血肉，遗忘了跳动的律动。”",
    "“每个悬而未决的疑问，终将在某个幽暗角落如死皮般堆积。”",
    "“你无法审问迷雾。它早已窥见了你的一切罪孽。”",
    "“失忆绝非记忆的缺席，而是求生本能的慈悲降临。”",
    "“在第七区，就连广场上的大理石雕像，手腕上也系着当铺的标签。”"
  ],
  ja: [
    "「時計の針は止まらない。止まるのは、鼓動を忘れた肉体だけだ。」",
    "「答えの出ぬ問いが、死んだ皮膚のように降り積もる場所がある。」",
    "「霧を尋問することはできない。霧は既に、お前の犯した罪を知っている。」",
    "「記憶喪失とは記憶の欠如ではない。自己防衛本能の存在証明だ。」",
    "「第7区では、街の石像の手首にさえ質屋の札が結びつけられている。」"
  ],
  ko: [
    "“시계는 결코 멈추지 않는다. 멈추는 것은 고동을 잊은 육신뿐.”",
    "“해답 없는 의문들이 각질처럼 쌓여가는 장소가 있다.”",
    "“안개를 심문할 수는 없다. 안개는 이미 네가 한 일을 알고 있다.”",
    "“기억상실은 기억의 부재가 아니라, 자기보존 본능의 엄연한 실재다.”",
    "“제7구역에서는 석상의 손목에조차 전당포 전표가 묶여 있다.”"
  ]
};

export const TELEMETRY_PHASES_I18N = {
  en: [
    { at: 15, text: "Calibrating fractured synapses..." },
    { at: 35, text: "Waking internal faculties: Ratio, Elysia, Carnal, Reflex..." },
    { at: 60, text: "Loading forensic archives: Precinct 4..." },
    { at: 85, text: "Reconstructing crime scene: Saint Irene Clocktower, 04:17 AM..." },
    { at: 100, text: "Consciousness restored. Ready to investigate." }
  ],
  id: [
    { at: 15, text: "Mengalibrasi sinapsis saraf yang retak..." },
    { at: 35, text: "Membangunkan fakultas batin: Intelek, Kejiwaan, Fisik, Motorik..." },
    { at: 60, text: "Memuat arsip forensik: Distrik 4..." },
    { at: 85, text: "Merekonstruksi TKP: Menara Jam Saint Irene, 04:17..." },
    { at: 100, text: "Kesadaran pulih. Siap memulai penyelidikan." }
  ],
  zh: [
    { at: 15, text: "正在校准受损的神经突触..." },
    { at: 35, text: "唤醒核心心智维次：理智、通灵、体魄、反应..." },
    { at: 60, text: "载入第四警区法医绝密档案..." },
    { at: 85, text: "现场全息重构：圣艾琳钟楼，凌晨04:17..." },
    { at: 100, text: "深层意识已锚定。准备开启调查。" }
  ],
  ja: [
    { at: 15, text: "断片化したシナプスを較正中..." },
    { at: 35, text: "内なる精神機能を覚醒：知性、霊性、肉体、反射..." },
    { at: 60, text: "第4分署の法医学記録をロード中..." },
    { at: 85, text: "事件現場を再構築：聖アイリーン時計塔 午前04:17..." },
    { at: 100, text: "意識の回復完了。捜査を開始せよ。" }
  ],
  ko: [
    { at: 15, text: "분열된 신경 시냅스 보정 중..." },
    { at: 35, text: "내면의 기능성 활성화: 이성, 영성, 육체, 반사..." },
    { at: 60, text: "제4관할서 법의학 기록 적재 중..." },
    { at: 85, text: "현장 재구성: 성 아이린 시계탑, 새벽 04:17..." },
    { at: 100, text: "의식 회복 완료. 수사를 개시하십시오." }
  ]
};

export const ALIASES_I18N = {
  en: [
    'The Dissolute Inspector',
    'The Ghost of Precinct 4',
    'The Broken Dialectician',
    'The Saint of Hangovers',
    'The Clockwork Cynic',
    'The Desolate Poet'
  ],
  id: [
    'Inspektur yang Hancur',
    'Hantu dari Distrik 4',
    'Ahli Dialektika yang Patah',
    'Santo Pemabuk Berat',
    'Sinikus Roda Gigi',
    'Penyair yang Sunyi'
  ],
  zh: [
    '沉沦落魄的探长',
    '第四警区的幽灵',
    '支离破碎的辩证学者',
    '宿醉弥撒的圣徒',
    '机械发条犬儒者',
    '荒原绝境的哀歌诗人'
  ],
  ja: [
    '放蕩の警部',
    '第4分署の亡霊',
    '失意の弁証法家',
    '二日酔いの聖者',
    '時計仕掛けの冷笑家',
    '荒涼たる詩人'
  ],
  ko: [
    '방탕한 수사관',
    '제4관할서의 유령',
    '망가진 변증론자',
    '숙취의 성자',
    '태엽 장치의 냉소주의자',
    '황량한 방랑 시인'
  ]
};




// ============================================================================
// Multi-Case Dossiers & Grand Conspiracy Localization Data
// ============================================================================
export const CASES_I18N = {
  case_d4_01: {
    title: {
      en: 'The Canal Drifter',
      id: 'Mayat Mengapung di Kanal Distrik 4',
      zh: '运河沉尸案',
      ja: '運河の漂流死体',
      ko: '운하의 표류 시신 사건'
    },
    victim: {
      en: 'Tomas Karr (32, Dock Courier)',
      id: 'Tomas Karr (32, Kurir Penyelundup)',
      zh: '托马斯·卡尔 (32岁，码头走私信使)',
      ja: 'トマス・カー (32歳、港湾密輸配達人)',
      ko: '토마스 카 (32세, 부두 밀수 운반책)'
    },
    location: {
      en: 'West Basin Canal, District 7',
      id: 'Dermaga Kanal Barat Sektor 7',
      zh: '第七区西蓄水运河码头',
      ja: '第7区 西部運河船溜まり',
      ko: '제7구역 서부 운하 선착장'
    },
    summary: {
      en: 'The body of a dock courier was found bobbing in the tidal mud. Hidden in his oilskin lining was a secret silver wax seal and an encrypted Syndicate cargo manifest.',
      id: 'Mayat kurir dermaga ditemukan mengapung di kanal berlumpur. Di balik lapisan mantelnya tersimpan segel lilin perak rahasia berlogo jam patah dan manifes klandestin.',
      zh: '一名港口信使的浮尸在潮泥中被发现。其油布大衣夹层中缝藏着一枚刻有断裂齿轮的纯银蜡封及加密走私清单。',
      ja: '運河の泥濘に浮かぶ波止場配達人の遺体。オイルスキンの裏地には、折れた歯車の刻まれた秘密の銀蝋印と暗号化された密輸目録が隠されていた。',
      ko: '개펄에 떠오른 부두 운반책의 시신. 방수 외투 안감에서 부러진 톱니 문양의 은빛 밀랍 인장과 암호화된 밀수 목록이 발견되었습니다.'
    },
    keystoneName: {
      en: 'Silver Syndicate Wax Seal',
      id: 'Segel Lilin Sindikat Perak',
      zh: '银色辛迪加蜡封印信',
      ja: '銀色シンジケートの蝋印',
      ko: '은빛 신디케이트 밀랍 인장'
    },
    keystoneDesc: {
      en: 'Proves clandestine parts shipments routed to District 7 under corporate front accounts.',
      id: 'Membuktikan pengiriman suku cadang terlarang ke Sektor 7 di bawah rekening bayangan konsorsium.',
      zh: '证实违禁走私机械零件假借虚构商会账户正源源不断运入第七区。',
      ja: 'ペーパーカンパニーの口座を通じ、第7区へ禁制品の機械部品が密輸されていた事実を証明する。',
      ko: '유령 회사 계좌를 통해 제7구역으로 금지된 기계 부품이 밀수입되고 있었음을 증명합니다.'
    }
  },
  case_d4_02: {
    title: {
      en: 'The Civic Vault Arson',
      id: 'Kebakaran Gudang Arsip Catatan Sipil',
      zh: '民政档案金库纵火案',
      ja: '民政局保管庫放火事件',
      ko: '민정 기록 보관소 방화 사건'
    },
    victim: {
      en: 'Leonard Finch (64, Chief Archivist)',
      id: 'Leonard Finch (64, Kepala Arsiparis)',
      zh: '伦纳德·芬奇 (64岁，首席档案管理员)',
      ja: 'レナード・フィンチ (64歳、筆頭記録保管官)',
      ko: '레너드 핀치 (64세, 수석 기록보관관)'
    },
    location: {
      en: 'Civic Records Sub-Vault, District 4',
      id: 'Gudang Catatan Sipil Bawah Tanah Sektor 4',
      zh: '第四警区民政档案地窖',
      ja: '第4区 民政局地下記録庫',
      ko: '제4구역 민정 기록 지하 보관소'
    },
    summary: {
      en: 'A premeditated incendiary blast incinerated municipal land deeds. Finch died from smoke inhalation clutching charred titles to the Saint Irene clocktower foundations.',
      id: 'Ledakan pembakaran berencana menghanguskan akta tanah kota. Finch tewas lemas sambil mendekap sisa lembaran akta pondasi Menara Jam Saint Irene.',
      zh: '一场蓄谋已久的纵火爆炸彻底焚毁了市政土地契约。芬奇窒息身亡，怀中死死护着圣艾琳钟楼地基的焦黑地契。',
      ja: '綿密に計画された放火により市政土地権利書が焼失。フィンチは聖アイリーン時計塔の基礎部分に関する焦げた権利書を抱きしめたまま窒息死していた。',
      ko: '철저히 계획된 방화 폭발로 시의 토지 증서들이 전소되었습니다. 핀치는 성 아이린 시계탑 부지의 그을린 권리증을 품에 안은 채 질식사했습니다.'
    },
    keystoneName: {
      en: 'Charred Vault Land Deed',
      id: 'Halaman Akta Hangus Sektor Barat',
      zh: '过火焦黑的特权土地地契',
      ja: '焼け焦げた特権地権書',
      ko: '불에 탄 특권 토지 권리증'
    },
    keystoneDesc: {
      en: 'Names the City Magistrate as the secret beneficiary of Saint Irene clocktower acquisitions.',
      id: 'Membuktikan Hakim Magistrat kota adalah penerima manfaat rahasia atas pembelian tanah Menara Irene.',
      zh: '直接揭示市政大法官正是侵吞钟楼所有权幕后神秘财阀的最终收益人。',
      ja: '時計塔周辺の買収劇における真の受益者が市政治安判事であることを露呈させる。',
      ko: '시계탑 부지 매입의 배후에 있는 최종 수혜자가 시 치안판사임을 직접적으로 입증합니다.'
    }
  },
  case_d4_03: {
    title: {
      en: "The Apothecary's Tincture",
      id: 'Racun Belladonna Sang Kolektor Antik',
      zh: '药剂师的淬毒酊剂案',
      ja: '薬種商の毒劇薬事件',
      ko: '약제사의 독성 팅크제 사건'
    },
    victim: {
      en: 'Dr. Silas Vance (59, Horological Chemist)',
      id: 'Dr. Silas Vance (59, Kurator Kimia Antik)',
      zh: '塞拉斯·万斯博士 (59岁，钟表化学家)',
      ja: 'サイラス・ヴァンス博士 (59歳、時計生化学者)',
      ko: '사일러스 반스 박사 (59세, 시계 생화학자)'
    },
    location: {
      en: 'Saint Jude Apothecary, East District',
      id: 'Apotek Saint Jude, Sektor Timur',
      zh: '东区圣犹大药局地下工坊',
      ja: '東部地区 聖ユダ薬種店',
      ko: '동부 구역 성 유다 약국 지하 공방'
    },
    summary: {
      en: 'Killed in his laboratory by an odorless synthetic cyanide alkaloid. A clandestine serial numbered vial was recovered beneath his distilling alembic.',
      id: 'Tewas di laboratoriumnya akibat racun alkaloid sianida sintetis tanpa bau. Ditemukan botol obat bernomor seri klandestin di bawah alat destilasi.',
      zh: '在密闭实验室中被无色无味的合成氰化物毒杀。蒸馏器残骸下方散落着带有军规序列号的暗中调配试剂瓶。',
      ja: '無臭の合成シアン化アルカロイドによって自室で毒殺。蒸留器の下から闇ルートの識別刻印が刻まれた小瓶が押収された。',
      ko: '무취의 합성 시안화 알칼로이드에 의해 밀실에서 독살당했습니다. 증류기 아래에서 군용 암호 번호가 각인된 시약병이 발견되었습니다.'
    },
    keystoneName: {
      en: 'Clandestine Serial Tincture Vial',
      id: 'Vial Tinktur Berkode Klandestin',
      zh: '军规黑市毒物试剂瓶',
      ja: '闇市場の軍用薬瓶',
      ko: '암시장 군용 독약 시약병'
    },
    keystoneDesc: {
      en: 'Matches the chemical compound found in the puncture wound on Aurelia Vance.',
      id: 'Formula sianida biru eksklusif yang sama persis dengan racun jarum pada Aurelia Vance.',
      zh: '化学指纹与奥蕾莉亚·万斯颈部微型针孔中残留的致命毒素完全一致。',
      ja: 'オウレリア・ヴァンスの首元に残された微小針孔の毒素と完全に同一の化学組成。',
      ko: '오렐리아 반스의 목덜미에 남은 미세 주사 바늘 자국의 독소와 화학적으로 정확히 일치합니다.'
    }
  },
  case_d4_04: {
    title: {
      en: 'The Silent Watchmaker of Saint Irene',
      id: 'Sang Pembuat Jam yang Bisu di Menara Irene',
      zh: '圣艾琳钟楼的无声制表师',
      ja: '聖アイリーン時計塔の沈黙せる時計師',
      ko: '성 아이린 시계탑의 침묵하는 시계 장인'
    },
    victim: {
      en: 'Mistress Horologist Aurelia Vance (Age 56)',
      id: 'Nyonya Horologis Aurelia Vance (Usia 56)',
      zh: '首席钟表宗师 奥蕾莉亚·万斯 (56岁)',
      ja: '主任時計師 オウレリア・ヴァンス (56歳)',
      ko: '수석 시계 장인 오렐리아 반스 (56세)'
    },
    location: {
      en: 'The Grand Pendulum Chamber, Tower of Saint Irene, District 7',
      id: 'Ruang Bandul Raksasa, Menara Irene, Sektor 7',
      zh: '第七区圣艾琳钟楼巨钟摆室',
      ja: '第7区 聖アイリーン時計塔 巨大振子室',
      ko: '제7구역 성 아이린 시계탑 대형 진자실'
    },
    summary: {
      en: 'At 03:42 AM, the city clock stopped mid-stroke. Aurelia was impaled upon the pendulum in a room locked from within. Corrupt officials seek to bury it as an industrial accident.',
      id: 'Pukul 03:42 pagi, lonceng kota terhenti mendadak. Aurelia tertusuk bandul raksasa dalam ruangan terkunci dari dalam. Petinggi korup berusaha menutupinya sebagai kecelakaan kerja.',
      zh: '凌晨03:42分，巨大市钟戛然而止。奥蕾莉亚在密室中被大钟摆重锤贯穿胸膛。腐败官僚试图将其草草判定为机械工伤意外。',
      ja: '午前03:42、大時計が突如停止。密室となった振子室でオウレリアが串刺し死体で発見された。腐敗した警察上層部は事故死として葬ろうとしている。',
      ko: '새벽 03:42, 거대한 도시 시계가 멈췄습니다. 오렐리아는 밀실에서 진자 균형추에 꿰뚫린 채 발견되었습니다. 부패한 관료들은 이를 단순 안전사고로 위장하려 합니다.'
    },
    keystoneName: {
      en: 'Perpetuum Blueprints & Syndicate Confession',
      id: 'Cetak Biru Orloge & Pengakuan Dalang',
      zh: '逆时发条设计图与贿赂自白',
      ja: '永久機関設計図と買収自白',
      ko: '영구시계 설계도 및 매수 자백'
    },
    keystoneDesc: {
      en: 'Documents proving the murder was commissioned to facilitate complete temporal blackout for the Syndicate heist.',
      id: 'Dokumen bukti pembunuhan dirancang untuk melumpuhkan kronometer kota demi sabotase sindikat.',
      zh: '证明这起谋杀案是受幕后辛迪加雇佣，旨在瘫痪全市统一授时系统以便进行大规模洗劫。',
      ja: '都市全域の標準時を停止させ、暗黒街の大規模略奪を容易にするための計画的暗殺であったことを立証する。',
      ko: '도시 전역의 표준시를 마비시켜 대규모 약탈을 감행하기 위해 신디케이트가 사주한 청부 살인임을 증명합니다.'
    }
  },
  case_prime_omega: {
    title: {
      en: 'THE GRAND PERPETUUM SYNDICATE CONSPIRACY',
      id: 'KASUS UTAMA: KONSPIRASI SINDIKAT ORLOGE PERPETUUM',
      zh: '终极主案：永恒钟表辛迪加大阴谋',
      ja: '大事件：時計結社ペルペトゥームの巨大陰謀',
      ko: '최종 주 사건: 영구시계 신디케이트의 거대 음모'
    },
    victim: {
      en: 'The Temporal Sovereignty & Civilians of District 7',
      id: 'Kedaulatan Waktu & Warga Sektor 7',
      zh: '第七区全体民众与城市时间主权',
      ja: '第7区市民の生命と都市の時間主権',
      ko: '제7구역 시민의 안전과 도시 시간 주권'
    },
    location: {
      en: 'Underworld Cartel Hub & High Magistrate Citadel',
      id: 'Jaringan Sindikat Bawah Tanah & Balai Magistrat Sektor 7',
      zh: '地下黑帮总枢纽与市政最高裁判所',
      ja: '地下カルテル中枢および市政最高裁判所',
      ko: '지하 카르텔 총본부 및 시 최고 재판소'
    },
    summary: {
      en: 'Cases 01 through 04 form an unbroken chain of treason. The canal courier smuggled forbidden mechanisms, the archive fire erased paper trails, the apothecary brewed execution toxins, and Aurelia Vance was killed to seize the clocktower master switch. The syndicate planned to paralyze District 7 and seize perpetual power.',
      id: 'Keempat kasus yang diselidiki Renata Vance adalah rantai konspirasi tunggal yang terencana: Kurir kanal mengangkut suku cadang, pembakaran arsip melenyapkan jejak tanah, racun apoteker mengeksekusi para saksi, dan pembunuhan sang pembuat jam bertujuan menguasai saklar menara kota demi kudeta waktu sindikat.',
      zh: '自第01案至第04案是一张环环相扣的罪恶蛛网：运河走私走火入魔的禁忌部件、金库纵火抹杀土地证据、药剂师调制致命无痕毒素、谋杀制表大师以夺取全城授时总闸。幕后辛迪加企图趁时间瘫痪彻底掌控第七区。',
      ja: '第01事件から第04事件までは全て一本の糸で繋がっていた。密輸、放火、毒殺、そして時計師暗殺による時限装置の強奪。時計結社は第7区の時間そのものを人質に取り、完全な支配を企てていた。',
      ko: '제01호부터 제04호까지의 사건은 하나의 거대한 음모 사슬입니다. 부두 밀수, 방화 은폐, 독약 제조, 그리고 표준시 장악을 위한 시계 장인 살해까지. 신디케이트는 제7구역의 시간을 마비시키고 영구적인 권력을 장악하려 했습니다.'
    },
    keystoneName: {
      en: 'Conspiracy Synthesis Dossier',
      id: 'Sintesis Penyelidikan Sektor 7',
      zh: '第七区全域大阴谋终审结论',
      ja: '第7区全域巨大陰謀の総合立証',
      ko: '제7구역 종합 수사 결론'
    },
    keystoneDesc: {
      en: 'All 4 Keystone Evidence pieces align. The Syndicate Cartel and corrupt Magistrates stand fully unmasked.',
      id: 'Keempat kunci bukti terhubung sempurna! Sindikat bayangan dan petinggi korup berhasil dibongkar total.',
      zh: '全部4项关键拼图严丝合缝闭合！黑金结社与腐败法官的罪证已被彻底焊死。',
      ja: '4つの決定的証拠が全て合致。結社の黒幕と買収された司法当局の罪状が白日の下に晒された。',
      ko: '4가지 핵심 증거가 모두 완벽히 결합되었습니다. 암흑 신디케이트와 부패한 사법 당국의 진상이 완전히 밝혀졌습니다.'
    }
  }
};

export function tCase(caseId, field, lang = 'en') {
  const c = CASES_I18N[caseId];
  if (!c) return '';
  const currentLang = c[field] && c[field][lang] ? lang : 'en';
  return c[field][currentLang] || c[field]['en'] || c[field]['id'] || '';
}
