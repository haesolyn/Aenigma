const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'i18n.js');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update case_badge in each language
content = content.replace("case_badge: 'KASUS #04: SANG PEMBUAT JAM YANG BISU',", "case_badge: 'KASUS #D4-04',");
content = content.replace("case_badge: 'CASE #04: THE SILENT WATCHMAKER',", "case_badge: 'CASE #D4-04',");
content = content.replace("case_badge: '事件 #04: 沈黙の時計師',", "case_badge: '事件 #D4-04',");
content = content.replace("case_badge: '案件 #04: 沉默的钟表宗师',", "case_badge: '案件 #D4-04',");
content = content.replace("case_badge: '사건 #04: 침묵의 시계 장인',", "case_badge: '사건 #D4-04',");

// 2. Update modal_clues_title in each language
content = content.replace("modal_clues_title: 'DOSSIER KASUS · MATRIKS DEDUKSI BUKTI',", "modal_clues_title: 'PAPAN INVESTIGASI & ARSIP KASUS',");
content = content.replace("modal_clues_title: 'CASE DOSSIER · EVIDENCE DEDUCTION MATRIX',", "modal_clues_title: 'CASE DOSSIER & MASTER INVESTIGATION BOARD',");
content = content.replace("modal_clues_title: '事件調書 · 証拠演繹マトリクス',", "modal_clues_title: '事件調書＆合同捜査盤',");
content = content.replace("modal_clues_title: '案情档案 · 线索演绎矩阵',", "modal_clues_title: '案件档案与主调查板',");
content = content.replace("modal_clues_title: '사건 조서 · 증거 연역 매트릭스',", "modal_clues_title: '사건 서류철 및 종합 수사 본부',");

// 3. Add case tab keys to each language
const idKeys = `    case_tab_active: 'KASUS AKTIF [#D4-04]',
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
`;

const enKeys = `    case_tab_active: 'ACTIVE INQUIRY [#D4-04]',
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
`;

const jaKeys = `    case_tab_active: '担当事件 [#D4-04]',
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
`;

const zhKeys = `    case_tab_active: '当前案件 [#D4-04]',
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
`;

const koKeys = `    case_tab_active: '진행 사건 [#D4-04]',
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
`;

content = content.replace("case_badge: 'KASUS #D4-04',\r\n", "case_badge: 'KASUS #D4-04',\r\n" + idKeys);
content = content.replace("case_badge: 'CASE #D4-04',\r\n", "case_badge: 'CASE #D4-04',\r\n" + enKeys);
content = content.replace("case_badge: '事件 #D4-04',\r\n", "case_badge: '事件 #D4-04',\r\n" + jaKeys);
content = content.replace("case_badge: '案件 #D4-04',\r\n", "case_badge: '案件 #D4-04',\r\n" + zhKeys);
content = content.replace("case_badge: '사건 #D4-04',\r\n", "case_badge: '사건 #D4-04',\r\n" + koKeys);

// 4. Append CASES_I18N and tCase at end of file if not already present
if (!content.includes('export const CASES_I18N')) {
  const casesCode = `

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
`;
  content += casesCode;
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated i18n.js with multi-case translations and code #D4-04!');
