// Aenigma Multi-Language Localization System (12 Native Languages)
// Supported: id (Indonesian), en (English), ja (Japanese), zh (Chinese Simplified),
// ko (Korean), es (Spanish), fr (French), de (German), ru (Russian),
// it (Italian), pt (Portuguese), ar (Arabic)

export const SUPPORTED_LANGUAGES = [
  { code: 'id', name: 'Bahasa Indonesia', native: 'Bahasa Indonesia', flag: '🇮🇩', dir: 'ltr' },
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵', dir: 'ltr' },
  { code: 'zh', name: 'Chinese', native: '简体中文', flag: '🇨🇳', dir: 'ltr' },
  { code: 'ko', name: 'Korean', native: '한국어', flag: '🇰🇷', dir: 'ltr' },
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'ru', name: 'Russian', native: 'Русский', flag: '🇷🇺', dir: 'ltr' },
  { code: 'it', name: 'Italian', native: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
  { code: 'pt', name: 'Portuguese', native: 'Português', flag: '🇵🇹', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦', dir: 'rtl' }
];

export const UI_TRANSLATIONS = {
  id: {
    game_title: 'A E N I G M A',
    case_badge: 'KASUS #04: SANG PEMBUAT JAM YANG BISU',
    loader_quote: '“Detik jam tak pernah berhenti. Hanya daging di dalamnya yang lupa cara berdetak.”',
    loader_telemetry: 'Menginisialisasi telemetri saraf...',
    loader_enter: 'MASUKI PIKIRAN',
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
    modal_clues_title: 'DOSSIER KASUS · MATRIKS DEDUKSI BUKTI',
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
    toast_damage_morale: 'TERGUNCANG! KEWARASAN BERKURANG'
  },
  en: {
    game_title: 'A E N I G M A',
    case_badge: 'CASE #04: THE SILENT WATCHMAKER',
    loader_quote: '“The clock never stops. Only the flesh within it forgets how to beat.”',
    loader_telemetry: 'Initializing neural telemetry...',
    loader_enter: 'ENTER THE MIND',
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
    modal_clues_title: 'CASE DOSSIER · EVIDENCE DEDUCTION MATRIX',
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
    toast_damage_morale: 'SHAKEN! MORALE COMPROMISED'
  },
  ja: {
    game_title: 'エ ニ グ マ',
    case_badge: '事件 #04: 沈黙の時計師',
    loader_quote: '「時計の針は止まらない。止まるのは、鼓動を忘れた肉体だけだ。」',
    loader_telemetry: '神経テレメトリ初期化中...',
    loader_enter: '深層意識へ潜行',
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
    modal_clues_title: '事件調書 · 証拠演繹マトリクス',
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
    toast_damage_morale: '精神動揺！精神力減少'
  },
  zh: {
    game_title: 'A E N I G M A',
    case_badge: '案件 #04: 沉默的钟表宗师',
    loader_quote: '“钟摆永不停歇。唯有齿轮间的血肉，遗忘了跳动的律动。”',
    loader_telemetry: '神经遥测初始化中...',
    loader_enter: '步入深层意识',
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
    modal_clues_title: '案情档案 · 线索演绎矩阵',
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
    toast_damage_morale: '精神受创！理智扣减'
  },
  ko: {
    game_title: 'A E N I G M A',
    case_badge: '사건 #04: 침묵의 시계 장인',
    loader_quote: '“시계는 결코 멈추지 않는다. 멈추는 것은 고동을 잊은 육신뿐.”',
    loader_telemetry: '신경 원격 측정 초기화 중...',
    loader_enter: '심상으로 진입',
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
    modal_clues_title: '사건 조서 · 증거 연역 매트릭스',
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
    toast_damage_morale: '충격! 사기 저하'
  },
  es: {
    game_title: 'A E N I G M A',
    case_badge: 'CASO #04: LA RELOJERA SILENCIOSA',
    loader_quote: '“El reloj nunca se detiene. Solo la carne en su interior olvida cómo latir.”',
    loader_telemetry: 'Iniciando telemetría neuronal...',
    loader_enter: 'ENTRAR EN LA MENTE',
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
    game_title: 'A E N I G M A',
    case_badge: 'DOSSIER #04: L\'HORLOGÈRE SILENCIEUSE',
    loader_quote: '« L\'horloge ne s\'arrête jamais. Seule la chair en son sein oublie comment battre. »',
    loader_telemetry: 'Initialisation de la télémétrie neurale...',
    loader_enter: 'PÉNÉTRER L\'ESPRIT',
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
    game_title: 'A E N I G M A',
    case_badge: 'FALL #04: DIE STUMME UHRMACHERIN',
    loader_quote: '„Die Uhr hält niemals an. Nur das Fleisch in ihrem Inneren vergisst das Schlagen.“',
    loader_telemetry: 'Neuraltelemetrie wird initialisiert...',
    loader_enter: 'DEN GEIST BETRETEN',
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
    game_title: 'А Э Н И Г М А',
    case_badge: 'ДЕЛО #04: БЕЗМОЛВНЫЙ ЧАСОВЩИК',
    loader_quote: '«Часы никогда не останавливаются. Лишь плоть внутри них забывает, как биться».',
    loader_telemetry: 'Инициализация нейротелеметрии...',
    loader_enter: 'ВОЙТИ В СОЗНАНИЕ',
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
    game_title: 'A E N I G M A',
    case_badge: 'CASO #04: L\'OROLOGIAIA SILENZIOSA',
    loader_quote: '“L\'orologio non si ferma mai. È solo la carne al suo interno che dimentica come battere.”',
    loader_telemetry: 'Inizializzazione telemetria neurale...',
    loader_enter: 'ENTRA NELLA MENTE',
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
    game_title: 'A E N I G M A',
    case_badge: 'CASO #04: A RELOJOEIRA SILENCIOSA',
    loader_quote: '“O relógio nunca para. Apenas a carne em seu interior esquece como bater.”',
    loader_telemetry: 'Inicializando telemetria neural...',
    loader_enter: 'ENTRAR NA MENTE',
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
    game_title: 'إ ي ن ي ج م ا',
    case_badge: 'القضية #04: صانعة الساعات الصامتة',
    loader_quote: '«عقارب الساعة لا تتوقف أبدًا. وحده الجسد بين تروسها ينسى كيف ينبض.»',
    loader_telemetry: 'تهيئة القياس العصبي عن بُعد...',
    loader_enter: 'ادخل إلى أعماق العقل',
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
export const CLUES_I18N = {
  clue_syndicate_bounty: {
    title: {
      id: 'Hadiah Sayembara Sindikat Jam',
      en: 'The Grand Syndicate Ledger Bounty'
    },
    desc: {
      id: 'Inspektur Graves disuap oleh Sindikat untuk mengamankan buku besar alkimia rahasia yang dicuri Vance.',
      en: 'Inspector Graves was paid off by the Syndicate to retrieve an alchemical prototype ledger stolen by Vance.'
    }
  },
  clue_poison_needle: {
    title: {
      id: 'Bidak Ratu Catur Beracun',
      en: 'The Poisoned Queen'
    },
    desc: {
      id: 'Aurelia Vance dilumpuhkan dengan jarum berongga beracun di dalam bidak catur sebelum digantung di pendulum.',
      en: 'Aurelia Vance was paralyzed by a hollow needle concealed in a chess piece before being hung on the pendulum.'
    }
  },
  clue_meridian_seal: {
    title: {
      id: 'Segel Meridian Pucat',
      en: 'The Pale Meridian Seal'
    },
    desc: {
      id: 'Korban merupakan anggota sekte horologis rahasia yang terobsesi membalikkan aliran waktu.',
      en: 'The victim was initiated into an occult horological order attempting to reverse time.'
    }
  },
  clue_watch_code: {
    title: {
      id: 'Kombinasi Brankas Lantai (7-3-12)',
      en: 'Floorboard Safe Combination (7-3-12)'
    },
    desc: {
      id: 'Korban mengukir kode kombinasi brankas rahasia di dalam jam sakunya, menghubungkannya ke Vivienne Vance.',
      en: 'The victim inscribed the safe code inside her watch balance cock, linking it to Madame Vivienne Vance.'
    }
  },
  clue_velvet_cyanide: {
    title: {
      id: 'Sobekan Beludru Biru & Ampul Sianida',
      en: 'Torn Blue Velvet & Cyanide Vial'
    },
    desc: {
      id: 'Ditemukan di balkon hujan. Cocok secara fisik dengan mantel beludru Nyonya Vivienne Vance.',
      en: 'Found on the rain balcony. A direct physical match to Madame Vivienne Vance.'
    }
  },
  clue_perpetuum_ledger: {
    title: {
      id: 'Buku Besar Perpetuum',
      en: 'The Perpetuum Ledger'
    },
    desc: {
      id: 'Bukti definitif bahwa Vance dibungkam agar tidak membongkar konspirasi pembakaran kota oleh Sindikat.',
      en: 'The definitive proof that Vance was silenced to prevent her from exposing the Grand Syndicate arson conspiracy.'
    }
  },
  clue_madame_motive: {
    title: {
      id: 'Motif Vivienne: Dendam & Pengabaian',
      en: 'Vivienne\'s Motive: Vengeance & Neglect'
    },
    desc: {
      id: 'Aurelia menelantarkan putri mereka yang sekarat demi menyelesaikan mesin pesanan Sindikat.',
      en: 'Aurelia neglected their dying daughter to finish her machine for the Syndicate.'
    }
  },
  clue_confession_full: {
    title: {
      id: 'KEBENARAN PENUH: Perjanjian Kematian Bersama',
      en: 'THE FULL TRUTH: A Mutual Murder-Martyrdom'
    },
    desc: {
      id: 'Vivienne meracuni Aurelia atas persetujuannya agar rancangan bom penunda waktu tidak jatuh ke tangan Sindikat.',
      en: 'Vivienne poisoned Aurelia with her consent to prevent the Syndicate from seizing her time-delay incendiary blueprints.'
    }
  },
  clue_needle_puncture: {
    title: {
      id: 'Luka Suntikan Mikroskopis di Leher Korban',
      en: 'Microscopic Cyanide Puncture'
    },
    desc: {
      id: 'Lensa presisi membuktikan racun disuntikkan ke leher Aurelia sebelum tubuhnya dipindahkan ke pendulum.',
      en: 'Precision magnification reveals a tiny blue puncture wound on Aurelia\'s neck, confirming lethal injection before the fall.'
    }
  },
  clue_syndicate_bribe: {
    title: {
      id: 'Catatan Suap Sindikat ke Vivienne Vance',
      en: 'Syndicate Payoff Ledger'
    },
    desc: {
      id: 'Catatan membuktikan Vivienne menerima 50.000 guilder untuk menyerahkan rancangan Aurelia kepada kartel.',
      en: 'Records prove Vivienne Vance accepted 50,000 guilders to deliver Aurelia\'s delay-detonation blueprints.'
    }
  },
  clue_poison_mechanism: {
    title: {
      id: 'Mekanisme Jarum Pegas Ratu Gading',
      en: 'Spring-Loaded Needle Mechanism'
    },
    desc: {
      id: 'Ratu catur gading menyembunyikan jarum bertekanan pegas yang diisi asam prusat mematikan.',
      en: 'The ivory queen conceals a pressurized needle chamber loaded with fatal prussic acid.'
    }
  }
};

// Dialogue Nodes Localizations
export const DIALOGUE_I18N = {
  graves_dialogue_start: {
    speaker: {
      id: 'Inspektur Graves',
      en: 'Inspector Graves',
      ja: 'グレイヴス警部',
      zh: '格雷夫斯警探',
      ko: '그레이브스 형사',
      es: 'Inspector Graves',
      fr: 'Inspecteur Graves',
      de: 'Inspektor Graves',
      ru: 'Инспектор Грейвс',
      it: 'Ispettore Graves',
      pt: 'Inspetor Graves',
      ar: 'المفتش غريفز'
    },
    text: {
      id: 'Kamu akhirnya berhasil menyeret dirimu menaiki enam lantai tangga, Detektif. Baumu seperti tidur di saluran pembuangan Whirling Gull. Lihat kekacauan ini. Hakim kota sudah berteriak histeris di telepon.',
      en: 'You finally dragged yourself up six flights of stairs, Detective. You reek like you slept in an open sewer behind the Whirling Gull. Take a look at this mess. The city magistrate is already screaming on the wire.'
    },
    voices: [
      {
        voice: { id: 'Rasio', en: 'Ratio' },
        badge: { id: 'RASIO [Intelek]', en: 'RATIO [Intellect]' },
        text: {
          id: 'Perhatikan kerah bajunya. Ada abu tembakau kering di lapelnya, tapi matanya terus melirik ke arah sang janda. Dia gelisah. Dia ingin kasus ini ditutup sebagai kecelakaan sebelum fajar.',
          en: 'Look at his collar. There\'s dried tobacco ash on his lapel, but his eyes are darting toward the widow. He\'s nervous. He wants this closed as an accident before dawn.'
        }
      }
    ],
    options: [
      { id: '"Bagaimana penilaian awalmu, Graves?"', en: '"What is your preliminary assessment, Graves?"' },
      { id: '[RETORIKA - Sedang 10] "Terburu-buru sekali kamu menutup laporan ini, Graves. Siapa yang menghubungimu duluan?"', en: '[RHETORIC - Medium 10] "You seem in an awful hurry to file this report, Graves. Who called you first?"' },
      { id: '"Aku butuh sebatang rokok sebelum sinapsis sarafku benar-benar putus."', en: '"I need a cigarette before my synapses completely disconnect."' },
      { id: '[Tinggalkan percakapan]', en: '[Leave dialogue]' }
    ]
  },

  graves_assessment: {
    speaker: { id: 'Inspektur Graves', en: 'Inspector Graves' },
    text: {
      id: 'Aurelia tua sedang mengotak-atik roda escapement pukul tiga pagi. Dia terpeleset minyak pelumas mesin, meraih pendulum untuk menahan diri, dan beban penyeimbang menembus tulang rusuknya. Mengerikan, tapi murni kecelakaan kerja. Kasus ditutup, kita bisa pulang dan mengeringkan sepatu kita.',
      en: 'Old Aurelia was up here tinkering with the escapement at three in the morning. She slipped on machine grease, grabbed the pendulum to catch herself, and the counterweight drove through her ribs. Gruesome, but an industrial accident. Case closed, we go home and dry our boots.'
    },
    voices: [
      {
        voice: { id: 'Insting Karnal', en: 'Carnal' },
        badge: { id: 'KARNAL [Fisik]', en: 'CARNAL [Physique]' },
        text: {
          id: 'Bohong. Seseorang yang terpeleset ke depan tidak akan tertusuk dari belakang belikat dengan tangan terlipat rapi. Seseorang menahannya saat lengan besi raksasa itu menghujam ke bawah.',
          en: 'Lies. A woman who slips forward doesn\'t land impaled through the back of her shoulder blades with her hands neatly folded. Someone held her down while the heavy iron arm descended.'
        }
      }
    ],
    options: [
      { id: '"Kecelakaan? Lihat sudut masuk lukanya. Secara biomekanik itu mustahil."', en: '"Accident? Look at the wound entry angle. That is biomechanically impossible."' },
      { id: '"Siapa orang terakhir yang melihatnya hidup?"', en: '"Who was the last person to see him alive?"' },
      { id: '[Kembali ke penyelidikan utama]', en: '[Return to main inquiry]' }
    ]
  },

  graves_rhetoric_win: {
    speaker: { id: 'Inspektur Graves', en: 'Inspector Graves' },
    text: {
      id: 'Graves tersentak, rahangnya mengetat di sekitar batang korek api. "Kecilkan suaramu! Kurir dari Sindikat Agung datang ke flatku pukul 02:00. Katanya Vance mencuri prototipe buku besar alkimia. Jika kita mengamankannya, ada hadiah sepuluh ribu guilder untuk kita berdua."',
      en: 'Graves flinches, his jaw tightening around the matchstick. "Lower your damn voice! A courier from the Grand Syndicate arrived at my flat at 02:00. He said Vance had stolen a prototype clockwork ledger. If we recover that ledger, there is a ten-thousand guilder bounty for both of us."'
    },
    options: [
      { id: '"Jadi ini bukan soal kecelakaan. Di mana buku besar itu sekarang?"', en: '"So this was never about an accident. Where is the ledger now?"' },
      { id: '[Kembali]', en: '[Return]' }
    ]
  },

  graves_rhetoric_fail: {
    speaker: { id: 'Inspektur Graves', en: 'Inspector Graves' },
    text: {
      id: 'Graves tertawa getir sambil batuk. "Jangan sok jadi detektif agung di depanku, sobat. Nomor lencanamu saja kamu lupa setelah mabuk semalam. Periksa mayat itu atau biarkan aku yang bekerja."',
      en: 'Graves laughs harshly, coughing into his fist. "Don\'t play grand interrogator with me, partner. You don\'t even remember your own badge number after last night\'s binge. Check the body or let me do my job."'
    },
    options: [
      { id: '"Baiklah. Biarkan aku memeriksa jenazahnya."', en: '"Fine. Let me inspect the corpse."' }
    ]
  },

  graves_cigarette: {
    speaker: { id: 'Inspektur Graves', en: 'Inspector Graves' },
    text: {
      id: 'Graves melemparkan kotak kardus kusut. "Astra Merah. Ambil satu. Kamu terlihat seperti mayat hidup yang berjalan."',
      en: 'Graves tosses you a wrinkled cardboard box. "Astra Red. Take one. You look like a walking cadaver."'
    },
    options: [
      { id: '[Hembuskan asap ke dalam kegelapan menara dan kembali]', en: '[Blow smoke into the gloom and return]' }
    ]
  },

  graves_debate_wound: {
    speaker: { id: 'Inspektur Graves', en: 'Inspector Graves' },
    text: {
      id: 'Graves merengut sambil melambaikan lenteranya. "Mungkin dia jatuh dari lantai atas! Dengar Detektif, sampai kamu bisa menunjukkan jejak kaki kedua atau senjata dengan sidik jari orang lain, Kapten ingin kasus ini dicap sebagai kecelakaan."',
      en: 'Graves scowls, waving his lantern over the corpse. "Maybe he fell from the upper gantry! Look, Detective, until you show me a second set of footprints or a weapon with someone else\'s fingerprints, the Captain wants this stamped as accidental death."'
    },
    options: [
      { id: '"Aku akan temukan buktinya. Menyingkirlah dari jalanku."', en: '"I will find the evidence. Just stay out of my way."' }
    ]
  },

  graves_last_seen: {
    speaker: { id: 'Inspektur Graves', en: 'Inspector Graves' },
    text: {
      id: '"Sang janda. Nyonya Vivienne. Dia mengaku membawakan teh peppermint untuk Aurelia tengah malam tadi, lalu turun ke kapel untuk doa malam. Alibi yang sangat rapi jika kamu tanya pendapatku."',
      en: '"The widow. Madame Vivienne. She claims she brought him peppermint tea at midnight, then went down to the parish rectory for all-night vigil prayers. Convenient alibi, if you ask me."'
    },
    options: [
      { id: '"Aku harus bicara langsung dengan Nyonya Vance."', en: '"I should speak with Madame Vance directly."' }
    ]
  },

  graves_ledger_hunt: {
    speaker: { id: 'Inspektur Graves', en: 'Inspector Graves' },
    text: {
      id: '"Kalau aku tahu di mana tempatnya, aku tidak akan kedinginan sampai ke tulang di menara ini! Vance punya brankas tersembunyi di bawah lantai ruang escapement. Tapi kuncinya kombinasi tiga putaran alkimia."',
      en: '"If I knew where it was, I wouldn\'t be freezing my kidneys off in this tower! Vance had a hidden floorboard safe somewhere beneath the secondary escapement. But the lock is an alchemical three-tumbler dial."'
    },
    options: [
      { id: '"Aku akan periksa papan lantainya."', en: '"I\'ll inspect the floorboards."' }
    ]
  },

  examine_pendulum_start: {
    speaker: { id: 'Pengamatan Forensik & Monolog Batin', en: 'Internal Monologue & Forensic Observation' },
    text: {
      id: 'Jenazah Aurelia Vance terpaku bagai serangga pada beban kuningan pendulum. Blus linennya mengeras oleh darah yang mengering. Anehnya, genangan darah beku tidak berada persis di bawahnya—melainkan membentuk jejak seretan hitam enam langkah ke arah jendela.',
      en: 'The body of Aurelia Vance is pinned like an insect against the brass counterweight. Her linen blouse is stiff with dried crimson. Strangely, the pool of coagulated blood is not directly underneath her—it forms a dark smear six paces toward the window.'
    },
    voices: [
      {
        voice: { id: 'Rasio', en: 'Ratio' },
        badge: { id: 'RASIO [Intelek]', en: 'RATIO [Intellect]' },
        text: {
          id: 'Deduksi hipostasis: Korban tidak mati di sini. Dia dibunuh di dekat jendela, kehabisan darah, lalu diseret dan dipasang ke mekanisme jam agar penghentian pendulum tampak seperti kecelakaan.',
          en: 'Hypostasis deduction: She did not die here on the pendulum. She was killed at the window sill, bled out, and her body was dragged and mounted onto the clock mechanism to make the stoppage seem like an accidental disaster.'
        }
      }
    ],
    options: [
      { id: '[PERSEPSI - Sulit 12] Buka paksa tangan kanannya yang membeku untuk melihat apa yang digenggamnya sebelum mati.', en: '[PERCEPTION - Challenging 12] Pry open her frozen right hand to see what she clenched before dying.' },
      { id: '[ESOTERIKA - Sedang 10] Teliti ukiran geometris aneh yang tergores di tulang selangkanya.', en: '[ESOTERICA - Medium 10] Study the strange geometric incision carved into her collarbone.' },
      { id: '[Mundur dari jenazah]', en: '[Step back from the corpse]' }
    ]
  },

  pendulum_pry_win: {
    speaker: { id: 'Temuan Forensik Krusial', en: 'Forensic Discovery' },
    text: {
      id: 'Dengan bunyi kertak dari urat yang kaku, jemarinya terbuka. Di dalam telapak tangannya terdapat sebuah bidak catur gading hitam: Ratu Hitam dengan jarum perak terpasang di dasarnya. Ujung jarum berlumur residu ungu berbau manis yang mematikan.',
      en: 'With a sharp snap of dried tendons, her fingers yield. Resting inside her palm is a carved ivory chess piece: a Black Queen with a silver needle embedded in its base. The needle tip is stained with a bitter, sweet-smelling violet residue.'
    },
    options: [
      { id: '"Pembunuhnya tidak memakai kekerasan fisik. Mereka menggunakan trik sulap beracun."', en: '"The killer didn\'t use brute force. They used a parlor trick."' },
      { id: '[Tutup]', en: '[Close]' }
    ]
  },

  pendulum_pry_fail: {
    speaker: { id: 'Kegagalan Otopsi', en: 'Forensic Attempt' },
    text: {
      id: 'Spasme mayat sangat kaku. Saat kamu memaksa membuka jemarinya, jarum beracun yang tersembunyi menyengat jarimu! Kamu tersentak kesakitan saat racun membakar kulitmu (-2 Daya Tahan, -1 Kewarasan).',
      en: 'The cadaveric spasm is like cast iron. As you force her fingers, a concealed needle pricks your index finger, burning your flesh with neurotoxin (-2 Health, -1 Morale)!'
    },
    options: [
      { id: '"Sialan! Tangan terkutuk ini dipasangi perangkap!"', en: '"Damn my trembling hands..."' }
    ]
  },

  pendulum_esoterica_win: {
    speaker: { id: 'Deduksi Okultisme Horologis', en: 'Occult Deduction' },
    text: {
      id: 'Di balik kerahnya yang berlumuran darah terdapat segel alkimia: lingkaran yang dibelah oleh tiga bulan sabit bersilangan. Simbol "Ordo Meridian Pucat"—perkumpulan rahasia para pembuat jam yang percaya aliran waktu dapat dibalikkan melalui resonansi mekanik.',
      en: 'Beneath the blood-crusted collar lies an alchemical mark: a circle quartered by three intersecting crescents. The seal of "The Order of the Pale Meridian"—a secret cabal of horologists who believed time itself could be reversed through mechanical resonance.'
    },
    options: [
      { id: '"Dia sedang merakit mesin yang dapat memutar balik waktu."', en: '"She was trying to build a machine that could un-live hours."' }
    ]
  },

  pendulum_esoterica_fail: {
    speaker: { id: 'Deduksi Buntu', en: 'Occult Deduction' },
    text: {
      id: 'Goresan itu tampak seperti luka acak akibat pecahan pegas jam. Kamu tidak bisa memahami geometrinya; kepalamu hanya berdenyut nyeri.',
      en: 'The scratches look like random surgical cuts or lacerations from broken clock springs. You cannot make sense of the geometry; it just produces a throbbing headache in your temples.'
    },
    options: [
      { id: '[Kedipkan mata dan berpaling]', en: '[Blink and look away]' }
    ]
  },

  examine_watch_start: {
    speaker: { id: 'Jam Saku Alkimia', en: 'The Alchemical Watch' },
    text: {
      id: 'Jam saku emas tergeletak di lantai. Kaca kristalnya retak membentuk pola sarang laba-laba, mati tepat pada pukul 03:42. Suara detak samar terdengar dari dalam, meski jarumnya membeku tanpa gerak.',
      en: 'The gold pocket watch lies on the catwalk. The crystal face is spiderwebbed with cracks, frozen at 03:42. A faint ticking sound emanates from within, even though the hands are motionless.'
    },
    options: [
      { id: '[PENYELARASAN - Sedang 11] Buka penutup belakangnya untuk memeriksa mekanisme di dalamnya.', en: '[INTERFACING - Medium 11] Pop open the back casing with your thumbnail to examine the inner movement.' },
      { id: '[Masukkan jam ke dalam kantong bukti]', en: '[Put the watch in evidence bag]' },
      { id: '[Mundur]', en: '[Step back]' }
    ]
  },

  watch_open_win: {
    speaker: { id: 'Rahasia Mekanik Terbuka', en: 'Mechanical Revelations' },
    text: {
      id: 'Pelat belakang terbuka dengan dentang kuningan yang merdu. Di dalam, terukir sandi rahasia: "V.V. - 7-3-12 - KUNCI BRANKAS HOROLOGIS". Di bawah roda keseimbangan terdapat potret miniatur Nyonya Vivienne Vance dari tiga puluh tahun lalu.',
      en: 'The back plate clicks open with a sweet brass resonance. Inside, engraved into the gold balance cock, is a cipher code: "V.V. - 7-3-12 - SHE HAS THE CIPHER KEY". Underneath the balance spring is a miniature portrait of Madame Vivienne Vance, taken thirty years ago when she was an actress in the Grand Opera.'
    },
    options: [
      { id: '"Kombinasi brankas rahasia: 7-3-12. Dan Aurelia tahu pasangannya akan datang mencarinya."', en: '"The combination to her secret safe: 7-3-12. And Vance knew her partner was coming for her."' }
    ]
  },

  watch_open_fail: {
    speaker: { id: 'Kesalahan Mekanik', en: 'Mechanical Mistake' },
    text: {
      id: 'Kukumu tergelincir pada engsel yang berminyak. Pegas rambut melesat bagai ular kuningan yang marah dan menyayat jarimu (-1 Daya Tahan)!',
      en: 'Your thumbnail slips on the oiled bevel, snapping the delicate hinge. The hairspring flies out like a coiled brass viper and cuts your hand (-1 Health)!'
    },
    options: [
      { id: '"Aduh! Pegasnya menyayat tanganku."', en: '"Ouch! The spring cut my finger."' }
    ]
  },

  examine_watch_done: {
    speaker: { id: 'Inventaris Diperbarui', en: 'Inventory Update' },
    text: {
      id: 'Kamu membungkus jam saku dengan saputangan sutra dan menyimpannya di saku mantel detektifmu.',
      en: 'You wrap the pocket watch in a clean silk handkerchief and slip it into your trenchcoat pocket.'
    },
    options: [
      { id: '[Lanjutkan penyelidikan]', en: '[Continue investigation]' }
    ]
  },

  examine_balcony_start: {
    speaker: { id: 'Tepi Menara Saint Irene', en: 'The Precipice of Saint Irene' },
    text: {
      id: 'Angin dingin melolong melalui lengkungan batu menara. Di bawah terbentang kegelapan Distrik 7—lampu-lampu gas berkelap-kelip seperti bintang yang meredup di atas tongkang kanal. Hujan deras menerpa wajahmu.',
      en: 'Cold wind howls through the stone archway. Below lies the murky chasm of District 7—gas lamps flickering like dying stars across the canal barges. Rain spatters against your face.'
    },
    options: [
      { id: '[PERSEPSI - Mudah 8] Cari jejak bukti di atas ubin batu yang basah.', en: '[PERCEPTION - Easy 8] Search the wet flagstones for trace evidence.' },
      { id: 'Tatap kabut malam di atas kota.', en: 'Look over the railing into the fog.' },
      { id: '[Kembali ke dalam]', en: '[Return inside]' }
    ]
  },

  balcony_search_win: {
    speaker: { id: 'Bukti Jejak Terungkap', en: 'Trace Evidence Found' },
    text: {
      id: 'Tersangkut pada patung gargoyle besi tempa adalah sobekan beludru biru tua. Warnanya identik dengan kerah mantel berkabung milik Nyonya Vance. Di sebelahnya, tergeletak ampul kaca kosong bertuliskan "Tinktur Somnus & Sianida".',
      en: 'Snagged on the wrought-iron gargoyle is a torn shred of midnight-blue velvet. It matches the high collar of Madame Vance\'s mourning coat. Next to it, an empty glass ampoule labeled "Tincture of Somnus & Cyanide".'
    },
    options: [
      { id: '"Bukti tak terbantahkan. Vivienne berada di balkon ini tepat setelah Aurelia tewas."', en: '"The smoking gun. She was here on the balcony right after Vance died."' }
    ]
  },

  balcony_search_fail: {
    speaker: { id: 'Jejak Terhapus', en: 'Diluted Traces' },
    text: {
      id: 'Hujan deras telah menghapus hampir semua jejak kaki. Kamu hanya menemukan noda lumpur dan genangan jelaga mesin.',
      en: 'The driving downpour has washed away almost all footsteps. You only find muddy smears and puddles of soot.'
    },
    options: [
      { id: '[Melangkah kembali ke dalam]', en: '[Step back inside]' }
    ]
  },

  balcony_fog_reflection: {
    speaker: { id: 'Renungan Suasana Hujan', en: 'Atmospheric Reverie' },
    text: {
      id: 'Kamu menatap kegelapan kota di bawah hujan. Kamu membuka pikiran baru: "Metafisika Hujan Dingin". Kamu bisa menginternalisasikannya di Lemari Pikiran.',
      en: 'You stare down at the sprawling darkness of Malkuth-on-Thames. You have unlocked a new avenue of introspection: "Metaphysics of Cold Rain". You can internalize this thought in your Thought Cabinet.'
    },
    options: [
      { id: '[Kembali ke ruang roda gigi]', en: '[Return to the gear room]' }
    ]
  },

  examine_safe_start: {
    speaker: { id: 'Kompartemen Rahasia Bawah Lantai', en: 'The Secret Floorboard Compartment' },
    text: {
      id: 'Di bawah tiga lapis papan pinus berlumur minyak terdapat kotak baja berat dengan tiga dial putar konsentris kuningan. Brankas ini dirancang dengan mekanisme anti-bongkar yang berbahaya.',
      en: 'Under three layers of clock-oil soaked pine lies a heavy steel strongbox with three concentric brass rotary dials. It looks reinforced with lead lining.'
    },
    options: [
      { id: '[Gunakan Kode Sandi (7-3-12)] Masukkan kombinasi yang ditemukan dari jam saku Aurelia.', en: '[If combination known (7-3-12)] Enter the code found inside Aurelia\'s watch.' },
      { id: '[LOGIKA - Sulit 13] Coba deduksikan susunan silinder brankas melalui getaran akustik.', en: '[LOGIC - Hard 13] Attempt to deduce the tumbler alignment by acoustic vibration.' },
      { id: '[PAKSA BUKA - Berbahaya] Coba congkel engsel brankas dengan linggis baja.', en: '[BRUTE FORCE - Dangerous] Try to pry open the heavy lid with brute force.' },
      { id: '[Biarkan brankas]', en: '[Leave safe untouched]' }
    ]
  },

  safe_open_code: {
    speaker: { id: 'Brankas Berhasil Dibuka', en: 'Safe Opened' },
    text: {
      id: 'Grendel baja berat bergeser mundur dengan bunyi dentam yang dalam. Di dalam ceruk berlapis beludru terbaring "Buku Besar Rahasia Perpetuum"—dijilid dengan kulit kambing hitam dan roda gigi kuningan pada punggungnya, memuat transaksi rahasia Sindikat dan cetak biru alkimia!',
      en: 'The heavy bolts retract with a deep, echoing clunk. Inside the velvet-lined recess lies the legendary "Perpetuum Ledger"—bound in black goatskin with brass cogwheels embedded in the spine, containing alchemical blueprints and secret syndicate accounts!'
    },
    options: [
      { id: '"Aurelia tahu Vivienne akan meracuninya... dan dia membiarkannya terjadi."', en: '"Vance knew Vivienne was going to poison her... and she let her do it."' }
    ]
  },

  safe_logic_fail: {
    speaker: { id: 'Perangkap Brankas Meledak!', en: 'Lockpick Attempt' },
    text: {
      id: 'Silinder internal macet dengan derit memekakkan telinga. Ampul kaca anti-pencuri pecah, menyemburkan gas belerang beracun dan penjepit baja menghantam jarimu (-2 Daya Tahan, -1 Kewarasan)!',
      en: 'The internal tumblers jam with a harsh screech. An internal anti-tamper glass vial cracks, releasing foul sulfur gas and a spring trap snaps on your hands (-2 Health, -1 Morale)!'
    },
    options: [
      { id: '"Sialan! Perangkap brankas terkutuk!"', en: '"Damn anti-tamper traps!"' }
    ]
  },

  madame_dialogue_start: {
    speaker: { id: 'Nyonya Vivienne Vance', en: 'Madame Vivienne Vance' },
    text: {
      id: 'Nyonya Vance berbalik perlahan. Wajahnya sepucat marmer, dibingkai ikal rambut hitam basah dan kerudung sutra berkabung. "Apakah kamu sang penyelidik? Kamu tampak... berantakan, Detektif. Apakah kamu datang untuk mengungkap kematian Aurelia, atau sekadar menonton kehancuran kami?"',
      en: 'Madame Vance turns slowly. Her face is pale as alabaster, framed by wet raven curls and a black silk veil. "Are you the investigator? You look... unraveled, Detective. Did you come here to solve Aurelia\'s death, or merely to gawk at our ruin?"'
    },
    options: [
      { id: '"Di mana kamu berada pukul 03:42 saat jam menara berhenti?"', en: '"Where were you at 03:42 AM when the tower clock stopped?"' },
      { id: '[EMPATI - Sedang 10] "Kamu tidak mencintainya, bukan, Nyonya?"', en: '[EMPATHY - Medium 10] "You did not love her, did you, Madame?"' },
      { id: '[UJI MERAH] [OTORITAS - Menantang 13] "Cukup sandiwaranya, Vivienne. Kami menemukan ratu catur beracun dan sobekan mantelmu di balkon. Kamu membunuhnya."', en: '[RED CHECK] [AUTHORITY - Challenging 13] "Enough theatrics, Vivienne. We found the poisoned chess queen and the torn velvet from your coat on the balcony. You murdered her."' },
      { id: '[TUDUHAN GEGABAH - Berbahaya] "Aku tidak butuh bukti, Vivienne! Kamu yang membunuhnya dan aku akan menangkapmu sekarang juga!"', en: '[RASH ACCUSATION - Dangerous] "I don\'t need evidence, Vivienne! You killed Aurelia and I am arresting you right now!"' },
      { id: '[Mundur sejenak]', en: '[Step away]' }
    ]
  },

  madame_alibi: {
    speaker: { id: 'Nyonya Vivienne Vance', en: 'Madame Vivienne Vance' },
    text: {
      id: '"Sudah kukatakan pada rekanmu Inspektur Graves: aku berada di bawah di kapel Saint Irene, menyalakan lilin untuk jiwa-jiwa korban wabah. Romo gereja bisa bersaksi—meski dia tertidur di bilik pengakuan dosanya."',
      en: '"I told your companion Inspector Graves: I was downstairs in the Saint Irene chapel, lighting candles for the departed souls of the epidemic. The priest can attest to my presence—though he was asleep in his confessional booth."'
    },
    options: [
      { id: '"Alibi yang nyaman. Disaksikan seorang pendeta yang tertidur."', en: '"Convenient. An alibi witnessed by a sleeping priest."' }
    ]
  },

  madame_empathy_win: {
    speaker: { id: 'Nyonya Vivienne Vance', en: 'Madame Vivienne Vance' },
    text: {
      id: 'Matanya membesar sesaat, dan topeng porselennya runtuh. "Cinta? Aurelia tidak mencintai manusia, Detektif. Dia mencintai pegas, roda gigi, dan kuningan dingin. Selama tiga puluh tahun aku hanyalah pendulum rumah tangga di lorongnya. Saat putri kami meninggal karena penyakit paru-paru, dia malah di lantai atas merakit kronometer alkimia untuk dijual ke bankir asing."',
      en: 'Her eyes widen slightly, and for a split second the porcelain mask drops. "Love? Aurelia did not love human beings, Detective. She loved springs, escapements, and cold brass gears. For thirty years I was just a domestic pendulum swinging in her hallway. While our daughter died of consumption, she was upstairs building an alchemical chronometer to sell to foreign bankers."'
    },
    options: [
      { id: '"Jadi kamu memutuskan untuk menghentikan jam hidupnya untuk selamanya."', en: '"So you decided to stop her clock once and for all."' }
    ]
  },

  madame_empathy_fail: {
    speaker: { id: 'Nyonya Vivienne Vance', en: 'Madame Vivienne Vance' },
    text: {
      id: '"Betapa menjijikkan. Kamu tersandung masuk ke sini dengan bau alkohol murahan, dan berani mempertanyakan tiga puluh tahun kebersamaan kami? Inspektur Graves, singkirkan makhluk ini dari hadapanku!"',
      en: '"How vulgar. You stumble in here, smelling of gin and cheap tobacco, and dare question thirty years together? Inspector Graves, remove this animal from my presence!"'
    },
    options: [
      { id: '"Jaga lidahmu, Nyonya. Aku belum selesai."', en: '"Hold your tongue, Madame. I am not finished."' }
    ]
  },

  madame_confession_win: {
    speaker: { id: 'Runtuhnya Kebohongan', en: 'The Breaking of the Ice' },
    text: {
      id: 'Nyonya Vance terhuyung ke belakang menabrak lengkungan batu. Air mata membelah bedak tebal di pipinya. "Ya! Ya, aku memberinya ratu catur beracun itu! Tapi tahukah kamu apa yang dilakukannya saat aku menekan jarum ke telapak tangannya? Dia tersenyum. Dia berterima kasih padaku. Dia berkata: *Pendulumnya sudah disetel, Vivienne. Terima kasih telah membebaskanku.* Dia ingin mati! Dia mengorbankan dirinya agar Sindikat tidak pernah mendapatkan mesin perang itu!"',
      en: 'Madame Vance staggers backward against the stone arch. Tears cut through the powdered chalk on her cheeks. "Yes! Yes, I gave her the poisoned queen! But do you know what she did when I pressed the needle into her palm? She smiled. She thanked me. She looked into my eyes and said, *The pendulum is already set, Vivienne. Thank you for freeing me from the winding.* She wanted to die! She rigged the clock so the Syndicate would never get their war machine!"'
    },
    options: [
      { id: '[BERIKAN PUTUSAN HUKUM: Tangkap Nyonya Vance atas pembunuhan]', en: '[DELIVER FINAL JUDGMENT: Arrest Madame Vance for murder]' },
      { id: '[BERIKAN PUTUSAN MORAL: Sembunyikan Buku Besar dan catat ini sebagai kecelakaan]', en: '[DELIVER FINAL JUDGMENT: Hide the Perpetuum Ledger and file it as an accidental death]' }
    ]
  },

  madame_confession_fail: {
    speaker: { id: 'Bantahan Dingin', en: 'Unshakable Defiance' },
    text: {
      id: '"Apakah kamu sudah gila?" Suaranya membeku bagai es. "Merekayasa tuduhan terhadap pasangan yang berduka di depan perwira polisi lainnya? Graves, tangkap orang mabuk ini sebelum dia menodai jasad Aurelia lebih jauh!" Graves melangkah maju dengan tangan di gagang pistolnya (-2 Kewarasan).',
      en: '"Are you insane?" Her voice turns to ice. "Fabricating evidence against a grieving partner in front of another police officer? Graves, arrest this incompetent maniac before this creature desecrates Aurelia\'s remains any further!" Graves steps between you with his hand on his revolver (-2 Morale).'
    },
    options: [
      { id: '"Ini belum berakhir, Vivienne."', en: '"This isn\'t over, Vivienne."' }
    ]
  },

  madame_premature_arrest_fail: {
    speaker: { id: 'Tindakan Gegabah yang Fatal', en: 'Catastrophic Blunder' },
    text: {
      id: 'Inspektur Graves mencengkeram bahumu dan mengokang pistol dinasnya. "Cukup, Detektif! Kamu menuduh warga tanpa selembar pun bukti fisik sambil berbau alkohol. Serahkan lencana dan senjatamu. Kamu ditangkap atas pemerasan dan pelanggaran berat!"',
      en: 'Inspector Graves grabs your shoulder and cocks his service revolver. "That is enough, Detective! You have no proof, you reek of alcohol, and you are terrorizing a grieving citizen under police protection. Hand over your badge. You are under arrest for extortion and gross misconduct!"'
    },
    options: [
      { id: '[Pasrah pada borgol baja]', en: '[Yield to the handcuffs]' }
    ]
  },

  ending_arrest: {
    speaker: { id: 'Kasus Ditutup: Keadilan Hukum yang Kaku', en: 'Case Concluded: The Letter of the Law' },
    text: {
      id: 'Kamu mengunci borgol baja dingin di pergelangan tangan Vivienne Vance. Inspektur Graves menatap takjub dan penuh hormat saat kamu menyerahkan bidak ratu gading beracun. Hukum telah ditegakkan. Besok surat kabar akan memuji kepiawaian Distrik 4. Namun saat kamu menuruni tangga ke dalam hujan, kamu bertanya-tanya apakah keadilan benar-benar telah terwujud bagi seorang wanita yang jiwanya telah mati tiga puluh tahun lalu.',
      en: 'You snap the cold steel manacles around Vivienne Vance\'s wrists. Inspector Graves stares in awe and grudging respect as you hand him the poisoned ivory queen. The law has been served. Tomorrow the newspapers will proclaim the brilliance of Precinct 4. But as you walk down into the rain, you wonder if justice was truly done to a woman whose soul died thirty years ago.'
    },
    options: [
      { id: '[KASUS SELESAI: Lihat Ringkasan Akhir Dossier]', en: '[CASE CLOSED: View Case Summary Dossier]' }
    ]
  },

  ending_coverup: {
    speaker: { id: 'Kasus Ditutup: Sang Penentu Keadilan Moral', en: 'Case Concluded: The Sovereign Bureaucrat' },
    text: {
      id: 'Kamu menyelipkan Buku Besar Perpetuum dan ampul racun ke dalam saku mantel dalammu. Kamu menatap mata Graves dan berkata: "Minyak mesin pada titian. Aurelia terpeleset murni kecelakaan. Stempel berkasnya." Vivienne menatapmu dari balik kerudungnya dengan air mata kelegaan yang tak terkatakan. Kamu melangkah keluar menyambut fajar Distrik 7, bukan sebagai budak hukum tertulis, melainkan sebagai penentu belas kasih.',
      en: 'You slide the Perpetuum Ledger into your inner coat pocket and slip the cyanide ampoule into your pocket. You look Graves in the eye and say, "Industrial grease on the catwalk. Aurelia slipped. Stamp the papers." Vivienne looks at you through her veil with tears of disbelief. You walk out into the dawn of District 7, not as an officer of the law, but as an architect of mercy.'
    },
    options: [
      { id: '[KASUS SELESAI: Lihat Ringkasan Akhir Dossier]', en: '[CASE CLOSED: View Case Summary Dossier]' }
    ]
  }
};

// Helper to get fully localized dialogue node
export function getLocalizedDialogueNode(nodeId, lang = 'id', baseNode) {
  if (!baseNode) return null;
  const currentLang = UI_TRANSLATIONS[lang] ? lang : 'id';

  const node = {
    ...baseNode,
    voices: baseNode.voices ? baseNode.voices.map(v => ({ ...v })) : [],
    options: baseNode.options ? baseNode.options.map(o => ({ ...o })) : []
  };

  const nodeTrans = DIALOGUE_I18N[nodeId];
  if (nodeTrans) {
    if (nodeTrans.speaker) {
      node.speaker = nodeTrans.speaker[currentLang] || nodeTrans.speaker['en'] || baseNode.speaker;
    }
    if (nodeTrans.text) {
      node.text = nodeTrans.text[currentLang] || nodeTrans.text['en'] || baseNode.text;
    }
    if (nodeTrans.voices && Array.isArray(nodeTrans.voices)) {
      nodeTrans.voices.forEach((vTrans, idx) => {
        if (node.voices[idx]) {
          if (vTrans.voice) node.voices[idx].voice = vTrans.voice[currentLang] || vTrans.voice['en'] || node.voices[idx].voice;
          if (vTrans.badge) node.voices[idx].badge = vTrans.badge[currentLang] || vTrans.badge['en'] || node.voices[idx].badge;
          if (vTrans.text) node.voices[idx].text = vTrans.text[currentLang] || vTrans.text['en'] || node.voices[idx].text;
        }
      });
    }
    if (nodeTrans.options && Array.isArray(nodeTrans.options)) {
      nodeTrans.options.forEach((oTrans, idx) => {
        if (node.options[idx]) {
          const transText = oTrans[currentLang] || oTrans['en'];
          if (transText) {
            node.options[idx].text = transText;
          }
        }
      });
    }
  }

  return node;
}

export function tClue(clueId, field = 'title', lang = 'id') {
  const clue = CLUES_I18N[clueId];
  if (!clue) return null;
  const currentLang = clue[field] && clue[field][lang] ? lang : 'id';
  return clue[field][currentLang] || clue[field]['en'] || '';
}

export function tGameOver(type, field = 'title', lang = 'id') {
  const g = GAMEOVER_I18N[type] || GAMEOVER_I18N['physical'];
  const currentLang = g[field] && g[field][lang] ? lang : 'id';
  return g[field][currentLang] || g[field]['en'] || '';
}

// Translation lookup helper
export function t(key, lang = 'id') {
  const currentLang = UI_TRANSLATIONS[lang] ? lang : 'id';
  if (UI_TRANSLATIONS[currentLang] && UI_TRANSLATIONS[currentLang][key]) {
    return UI_TRANSLATIONS[currentLang][key];
  }
  if (UI_TRANSLATIONS['en'] && UI_TRANSLATIONS['en'][key]) {
    return UI_TRANSLATIONS['en'][key];
  }
  return key;
}

export function tItem(itemId, field = 'name', lang = 'id') {
  const item = ITEMS_I18N[itemId];
  if (!item) return null;
  const currentLang = item[field] && item[field][lang] ? lang : 'id';
  return item[field][currentLang] || item[field]['en'] || '';
}

export function tPoi(poiId, field = 'title', lang = 'id') {
  const poi = POI_I18N[poiId];
  if (!poi) return null;
  const currentLang = poi[field] && poi[field][lang] ? lang : 'id';
  return poi[field][currentLang] || poi[field]['en'] || '';
}

