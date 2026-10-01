const fs = require('fs');
const path = require('path');

function tr(en, id, zh, ja, ko, es, fr, de, ru, it, pt, ar) {
  return { en, id, zh, ja, ko, es, fr, de, ru, it, pt, ar };
}

const CLUES = {
  clue_syndicate_bounty: {
    title: tr(
      "The Grand Syndicate Ledger Bounty",
      "Hadiah Sayembara Sindikat Jam",
      "辛迪加黑金悬赏令",
      "大シンジケートの賞金首調書",
      "거대 신디케이트의 현상금 장부",
      "La Recompensa del Gran Sindicato",
      "La Prime du Grand Syndicat",
      "Das Kopfgeld des Großen Syndikats",
      "Награда Великого Синдиката",
      "La Taglia del Grande Sindacato",
      "A Recompensa do Grande Sindicato",
      "مكافأة دفتر النقابة الكبرى"
    ),
    desc: tr(
      "Inspector Graves was paid off by the Syndicate to retrieve an alchemical prototype ledger stolen by Vance.",
      "Inspektur Graves disuap oleh Sindikat untuk mengamankan buku besar alkimia rahasia yang dicuri Vance.",
      "格雷夫斯警探收受了辛迪加巨额贿赂，奉命追回奥蕾莉亚偷走的炼金原型秘密账簿。",
      "グレイヴス警部は、ヴァンスが持ち出した錬金術試作台帳を回収するためシンジケートから買収されていた。",
      "그레이브스 형사는 밴스가 빼돌린 프로토타입 장부를 회수하는 대가로 신디케이트에 매수되었습니다.",
      "El inspector Graves fue sobornado por el Sindicato para recuperar un libro prototipo robado por Vance.",
      "L'inspecteur Graves a été soudoyé par le Syndicat pour récupérer un registre secret dérobé par Vance.",
      "Inspektor Graves wurde vom Syndikat bestochen, um ein von Vance gestohlenes Prototyp-Buch zu beschaffen.",
      "Инспектор Грейвс был подкуплен Синдикатом, чтобы вернуть украденный Вэнс чертежный гроссбух.",
      "L'ispettore Graves è stato corrotto dal Sindacato per recuperare un mastro prototipo rubato dalla Vance.",
      "O inspetor Graves foi subornado pelo Sindicato para recuperar um livro protótipo roubado por Vance.",
      "تلقى المفتش غريفز رشوة من النقابة لاستعادة دفتر الحسابات الخيميائي المسروق من فانس."
    )
  },
  clue_poison_needle: {
    title: tr(
      "The Poisoned Ivory Queen",
      "Bidak Ratu Catur Beracun",
      "淬毒象牙黑后棋子",
      "毒針仕込みの象牙クイーン",
      "독침이 장치된 상아 퀸",
      "La Reina de Marfil Envenenada",
      "La Reine d'Ivoire Empoisonnée",
      "Die Vergiftete Elfenbein-Dame",
      "Отравленный ферзь из слоновой кости",
      "La Regina d'Avorio Avvelenata",
      "A Rainha de Marfim Envenenada",
      "ملكة الشطرنج العاجية المسمومة"
    ),
    desc: tr(
      "Aurelia Vance was paralyzed by a hollow needle concealed in a chess piece before being hung on the pendulum.",
      "Aurelia Vance dilumpuhkan dengan jarum berongga beracun di dalam bidak catur sebelum digantung di pendulum.",
      "奥蕾莉亚·梵斯在被挂上大钟摆前，遭人利用棋子暗藏的中空毒针注入致命神经毒素瘫痪。",
      "オレリア・ヴァンスは大振り子に吊るされる前に、チェス駒に隠された毒針で麻痺させられていた。",
      "오렐리아 밴스는 시계추에 매달리기 전, 체스 말에 숨겨진 독침에 찔려 마비되었습니다.",
      "Aurelia Vance fue paralizada con una aguja hueca oculta en una pieza de ajedrez antes de ser colgada del péndulo.",
      "Aurelia Vance a été paralysée par une aiguille empoisonnée dissimulée dans une pièce d'échecs avant d'être pendue au balancier.",
      "Aurelia Vance wurde durch eine in einer Schachfigur versteckte Nadel gelähmt, bevor man sie ans Pendel hängte.",
      "Аурелия Вэнс была парализована полой иглой с ядом, скрытой в шахматной фигуре, перед тем как ее повесили на маятник.",
      "Aurelia Vance è stata paralizzata da un ago avvelenato celato in un pezzo degli scacchi prima di essere appesa al pendolo.",
      "Aurelia Vance foi paralisada por uma agulha oca com veneno oculta na peça de xadrez antes de ser presa ao pêndulo.",
      "شُلت حركة أوريليا فانس بإبرة مجوفة مسمومة كانت مخبأة داخل قطعة شطرنج قبل تعليقها على البندول."
    )
  },
  clue_meridian_seal: {
    title: tr(
      "The Pale Meridian Seal",
      "Segel Meridian Pucat",
      "苍白子午线密教印记",
      "蒼白の子午線教団の刻印",
      "창백한 자오선 교단의 인장",
      "El Sello del Meridiano Pálido",
      "Le Sceau du Méridien Pâle",
      "Das Siegel des Bleichen Meridians",
      "Печать Бледного Меридиана",
      "Il Sigillo del Meridiano Pallido",
      "O Selo do Meridiano Pálido",
      "ختم خط الزوال الشاحب"
    ),
    desc: tr(
      "The victim was initiated into an occult horological order attempting to reverse the entropy of time.",
      "Korban merupakan anggota sekte horologis rahasia yang terobsesi membalikkan aliran waktu.",
      "受害者加入了崇尚机械逆熵、企图倒转时光流向的狂热秘密钟表教派。",
      "被害者は時間の不可逆性を覆そうと試みる神秘主義の時計結社に深く関与していた。",
      "피해자는 시간의 엔트로피를 역전시키려던 오컬트 시계 교단에 입단한 상태였습니다.",
      "La víctima pertenecía a una orden horológica oculta que intentaba revertir la entropía del tiempo.",
      "La victime avait été initiée à un ordre horloger occulte tentant d'inverser l'entropie temporelle.",
      "Das Opfer war Mitglied eines okkulten Uhrmacher-Ordens, der die Zeit umkehren wollte.",
      "Жертва состояла в оккультном ордене часовщиков, пытавшемся повернуть время вспять.",
      "La vittima faceva parte di un ordine orologico occulto che tentava di invertire l'entropia del tempo.",
      "A vítima foi iniciada em uma ordem horológica oculta que tentava reverter a entropia do tempo.",
      "كانت الضحية منتمية لجماعة ساعاتيّة باطنية سرية تسعى لعكس انسياب الزمن."
    )
  },
  clue_watch_code: {
    title: tr(
      "Floorboard Safe Combination (7-3-12)",
      "Kombinasi Brankas Lantai (7-3-12)",
      "暗格金库密码 (7-3-12)",
      "床下金庫の暗証コード (7-3-12)",
      "바닥 금고 암호 (7-3-12)",
      "Combinación de la Caja Fuerte (7-3-12)",
      "Combinaison du Coffre (7-3-12)",
      "Kombination des Bodentresors (7-3-12)",
      "Шифр сейфа в полу (7-3-12)",
      "Combinazione della Cassaforte (7-3-12)",
      "Combinação do Cofre (7-3-12)",
      "شفرة الخزنة الأرضية (7-3-12)"
    ),
    desc: tr(
      "The victim inscribed the safe combination code inside her watch balance cock, linking it to Madame Vivienne Vance.",
      "Korban mengukir kode kombinasi brankas rahasia di dalam jam sakunya, menghubungkannya ke Vivienne Vance.",
      "死者将暗格金库的三位密码深深刻在随身怀表内，并刻下了对薇薇安·梵斯的深情题词。",
      "被害者は懐中時計のテンプ受けに金庫の解錠コードを刻み、未亡人ヴィヴィアンへの献辞を遺していた。",
      "피해자는 회중시계 무브먼트 내부에 금고 암호를 새겨 넣었으며, 이는 비비안 밴스 부인과 직결됩니다.",
      "La víctima grabó el código de la caja fuerte en su reloj de bolsillo, vinculándolo a Vivienne Vance.",
      "La victime avait gravé le code du coffre dans sa montre à gousset, le liant directement à Vivienne Vance.",
      "Das Opfer ritzte den Tresorcode in seine Taschenuhr und verknüpfte ihn mit Vivienne Vance.",
      "Жертва выгравировала код от сейфа внутри своих карманных часов, связав его с Вивьен Вэнс.",
      "La vittima ha inciso il codice della cassaforte nel bilanciere dell'orologio, legandolo a Vivienne Vance.",
      "A vítima gravou o código do cofre em seu relógio de bolso, ligando-o a Vivienne Vance.",
      "نقشت الضحية شفرة فتح الخزنة داخل ساعة جيبها وربطتها بإهداء صريح لفيفيان فانس."
    )
  },
  clue_velvet_cyanide: {
    title: tr(
      "Torn Blue Velvet & Cyanide Vial",
      "Sobekan Beludru Biru & Ampul Sianida",
      "撕裂的蓝丝绒碎片与剧毒氰化安瓿",
      "裂けた青いビロードと青酸アンプル",
      "찢겨진 청색 벨벳 조각과 청산가리 앰플",
      "Terciopelo Azul Rasgado y Vial de Cianuro",
      "Velours Bleu Déchiré et Fiole de Cyanure",
      "Zerrissener Blauer Samt und Zyankali-Fläschchen",
      "Оторванный синий бархат и ампула с цианидом",
      "Velluto Blu Strappato e Fiala di Cianuro",
      "Veludo Azul Rasgado e Frasco de Cianeto",
      "قطعة مخمل أزرق ممزقة وأمبول سيانيد"
    ),
    desc: tr(
      "Found on the rain balcony. A direct physical match to Madame Vivienne Vance's mourning dress.",
      "Ditemukan di balkon hujan. Cocok secara fisik dengan mantel beludru Nyonya Vivienne Vance.",
      "在风雨露台栏杆起获。其纤维编织与磨损破口与薇薇安·梵斯夫人身上的丧服大衣完全吻合。",
      "雨のバルコニーで発見。ヴィヴィアン・ヴァンス夫人の喪服コートの裂け目と完全に一致する。",
      "빗물 고인 발코니에서 발견되었습니다. 비비안 밴스 부인의 상복 코트 찢긴 자국과 정확히 일치합니다.",
      "Hallado en el balcón. Coincide exactamente con el abrigo de luto de Madame Vivienne Vance.",
      "Découvert sur le balcon. Correspond parfaitement au manteau de deuil de Madame Vivienne Vance.",
      "Auf dem Regen-Balkon gefunden. Passt exakt zum Trauermantel von Madame Vivienne Vance.",
      "Найдено на мокром балконе. Физически совпадает с разрывом на траурном пальто мадам Вивьен Вэнс.",
      "Trovato sul balcone bagnato di pioggia. Corrisponde perfettamente all'abito di Vivienne Vance.",
      "Encontrado na sacada de chuva. Corresponde perfeitamente ao casaco de luto de Madame Vivienne Vance.",
      "عُثر عليه بشرفة المطر، ويتطابق تمامًا مع معطف حداد السيدة فيفيان فانس."
    )
  },
  clue_perpetuum_ledger: {
    title: tr(
      "The Perpetuum Cartel Ledger",
      "Buku Besar Perpetuum Sindikat",
      "永动机辛迪加绝密总账簿",
      "永久機関カルテルの秘密台帳",
      "영구기관 카르텔의 비밀 원장",
      "El Libro Mayor del Cartel Perpetuum",
      "Le Grand Livre du Cartel Perpetuum",
      "Das Hauptbuch des Perpetuum-Kartells",
      "Секретный гроссбух картеля «Перпетуум»",
      "Il Mastro del Cartello Perpetuum",
      "O Livro-Razão do Cartel Perpetuum",
      "دفتر حسابات كارتل بيربيتوم السري"
    ),
    desc: tr(
      "Definitive proof that Vance was silenced to prevent her from exposing the Grand Syndicate arson conspiracy.",
      "Bukti definitif bahwa Vance dibungkam agar tidak membongkar konspirasi pembakaran kota oleh Sindikat.",
      "铁证如山：辛迪加为了阻止奥蕾莉亚揭露全市延迟纵火爆炸黑幕，雇佣杀手将她彻底灭口。",
      "シンジケートの大規模放火陰謀の告発を防ぐため、ヴァンスが口封じされた決定的な物証。",
      "신디케이트의 도시 방화 음모를 폭로하려던 밴스를 침묵시키기 위해 입막음 살해했다는 확증입니다.",
      "Prueba definitiva de que Vance fue silenciada para encubrir la conspiración incendiaria del Sindicato.",
      "Preuve accablante que Vance a été assassinée pour étouffer le complot d'incendie du Grand Syndicat.",
      "Der endgültige Beweis, dass Vance mundtot gemacht wurde, um die Brandstiftungsverschwörung zu decken.",
      "Главное доказательство того, что Вэнс устранили, дабы скрыть заговор Синдиката о поджоге города.",
      "La prova schiacciante che la Vance è stata messa a tacere per coprire i roghi dolosi del Sindacato.",
      "Prova definitiva de que Vance foi silenciada para abafar a conspiração incendiária do Sindicato.",
      "الدليل القاطع على تصفية فانس لمنعها من كشف مؤامرة حرائق النقابة الكبرى المدمرة."
    )
  },
  clue_madame_motive: {
    title: tr(
      "Vivienne's Motive: Vengeance & Neglect",
      "Motif Vivienne: Dendam & Pengabaian",
      "薇薇安的杀意动机：复仇与冷酷漠视",
      "ヴィヴィアンの動機：復讐と長年の冷遇",
      "비비안의 범행 동기: 복수와 오랜 방치",
      "El Motivo de Vivienne: Venganza y Negligencia",
      "Le Mobile de Vivienne : Vengeance et Abandon",
      "Viviennes Motiv: Rache und Vernachlässigung",
      "Мотив Вивьен: месть за пренебрежение",
      "Il Movente di Vivienne: Vendetta e Abbandono",
      "O Motivo de Vivienne: Vingança e Desprezo",
      "دافع فيفيان: الانتقام والمرارة والإهمال"
    ),
    desc: tr(
      "Aurelia neglected their dying daughter to finish the clockwork war machine for the Syndicate.",
      "Aurelia menelantarkan putri mereka yang sekarat demi menyelesaikan mesin pesanan Sindikat.",
      "奥蕾莉亚当年为了替辛迪加赶制致命军火，冷血抛下重病垂危的亲生女儿不顾。",
      "オレリアは兵器製造に没头し、結核で瀕死だった一人娘の看病を放棄していた。",
      "오렐리아는 신디케이트의 전쟁 기계를 완성하느라 결핵으로 죽어가던 친딸을 외면했습니다.",
      "Aurelia desatendió a su hija moribunda para terminar la máquina bélica del Sindicato.",
      "Aurelia avait délaissé leur fille mourante pour achever la machine de guerre du Syndicat.",
      "Aurelia vernachlässigte ihre sterbende Tochter, um die Kriegsmaschine fertigzustellen.",
      "Аурелия бросила умирающую дочь ради завершения военной машины для Синдиката.",
      "Aurelia ha trascurato la figlia morente per terminare la macchina da guerra del Sindacato.",
      "Aurelia negligenciou a filha doente para terminar a máquina bélica do Sindicato.",
      "أهملت أوريليا ابنتهما المحتضرة لإتمام آلة الحرب لحساب النقابة الكبرى."
    )
  },
  clue_confession_full: {
    title: tr(
      "THE FULL TRUTH: A Mutual Martyrdom",
      "KEBENARAN PENUH: Perjanjian Kematian Bersama",
      "终极真相：互谋殉道之死",
      "真実の全貌：同意の上の殉教的暗殺",
      "완전한 진실: 상호 합의된 순교적 결말",
      "LA VERDAD TOTAL: Un Martirio Consentido",
      "LA VÉRITÉ COMPLÈTE : Un Martyre Partagé",
      "DIE VOLLE WAHRHEIT: Ein Gegenseitiges Martyrium",
      "ВСЯ ПРАВДА: Взаимное мученичество",
      "LA VERITÀ COMPLETA: Un Martirio Consensuale",
      "A VERDADE COMPLETA: Um Martírio Consensual",
      "الحقيقة الكاملة: استشهاد متبادل بالاتفاق"
    ),
    desc: tr(
      "Vivienne poisoned Aurelia with her full consent to prevent the Syndicate from seizing her delay-detonation blueprints.",
      "Vivienne meracuni Aurelia atas persetujuannya agar rancangan bom penunda waktu tidak jatuh ke tangan Sindikat.",
      "薇薇安是在奥蕾莉亚的含笑请求下亲手下毒，借此让绝密军火图纸与钟表大师一同长眠，阻止辛迪加屠杀工人。",
      "ヴィヴィアンはオレリア本人の合意のもと毒を盛り、軍事兵器の設計図を道連れにして時計塔を永久に止めた。",
      "비비안은 신디케이트가 살상 무기 도면을 탈취하지 못하도록, 오렐리아 본인의 간곡한 동의 하에 독침을 찔렀습니다.",
      "Vivienne envenenó a Aurelia con su consentimiento para evitar que el Sindicato obtuviera los planos.",
      "Vivienne a empoisonné Aurelia avec son plein accord pour que le Syndicat ne s'empare pas des plans.",
      "Vivienne vergiftete Aurelia mit deren Einverständnis, um die Entführung der Pläne zu vereiteln.",
      "Вивьен отравила Аурелию с ее полного согласия, чтобы чертежи не достались Синдикату.",
      "Vivienne ha avvelenato Aurelia con il suo consenso per impedire al Sindacato di prendere i piani.",
      "Vivienne envenenou Aurelia com o consentimento dela para impedir que o Sindicato tomasse as plantas.",
      "سممت فيفيان أوريليا بموافقتها التامة لمنع النقابة من الاستيلاء على مخططات السلاح الكارثي."
    )
  },
  clue_shattered_reagents: {
    title: tr(
      "Shattered Reagents & Syndicate Crest",
      "Serpihan Reagen Kimia & Lambang Sindikat",
      "碎裂的化学试剂瓶与辛迪加火漆印",
      "破壊された試薬瓶とシンジケートの紋章",
      "깨진 시약병과 신디케이트 문장",
      "Reactivos Rotos y Emblema del Sindicato",
      "Réactifs Brisés et Sceau du Syndicat",
      "Zerschlagene Reagenzien und Syndikats-Wappen",
      "Осколки реагентов и печать Синдиката",
      "Reagenti Infranti e Sigillo del Sindacato",
      "Reagentes Quebrados e Brasão do Sindicato",
      "زجاجات كواشف محطمة وخاتم النقابة"
    ),
    desc: tr(
      "Discovered on the lantern catwalk. Chemical glass vials bearing the Grand Syndicate mercury seal, confirming delivery hours before death.",
      "Ditemukan di anjungan lentera. Botol kaca kimia berstempel segel merkuri Sindikat Agung, membuktikan kurir datang beberapa jam sebelum maut.",
      "在提灯走廊铁网间寻获。带有辛迪加水银火漆印的化学安瓿碎片，证实凶案发生前数小时曾有暗部信使出入钟楼。",
      "ランタン通路で回収。シンジケートの水銀刻印が施された薬瓶の破片で、犯行直前に密使が接触した証拠。",
      "등불 통로에서 발견되었습니다. 신디케이트의 수은 인장이 찍힌 시약병 파편으로, 사건 직전 밀사가 다녀간 흔적입니다.",
      "Hallado en la pasarela de la linterna. Viales químicos con el sello de mercurio del Gran Sindicato entregados horas antes.",
      "Découvert sur la passerelle. Des fioles chimiques portant le sceau du Syndicat, livrées quelques heures avant le drame.",
      "Auf dem Laternensteg gefunden. Glasfläschchen mit dem Siegel des Syndikats, wenige Stunden zuvor geliefert.",
      "Найдено на мостках фонаря. Осколки ампул с печатью Синдиката, доставленные за пару часов до трагедии.",
      "Trovato sul camminamento della lanterna. Fiale chimiche col sigillo del Syndacato consegnate poche ore prima.",
      "Encontrado na passarela da lanterna. Frascos químicos com o selo do Sindicato entregues horas antes.",
      "عُثر عليها بممر الفانوس، زجاجات كيميائية ممهورة بختم النقابة الزئبقي سُلمت قبل ساعات من الجريمة."
    )
  },
  clue_acoustic_tripwire: {
    title: tr(
      "Acoustic Resonance Tripwire Mechanism",
      "Mekanisme Kawat Picu Akustik",
      "钟鸣声学共振触动引线",
      "音響共鳴トラップワイヤー機構",
      "음향 공명 격발 와이어 장치",
      "Mecanismo de Resonancia Acústica",
      "Mécanisme de Déclenchement Acoustique",
      "Akustischer Resonanz-Auslösedraht",
      "Акустический спусковой механизм колокола",
      "Meccanismo a Risonanza Acustica",
      "Mecanismo de Fio de Ressonância Acústica",
      "آلية سلك التفجير بالرنين الصوتي"
    ),
    desc: tr(
      "Fastened inside the Saint Irene bronze bell. It explains how the pendulum was mechanically tripped precisely on the 42nd minute stroke.",
      "Terpasang di dalam lonceng perunggu Saint Irene. Menjelaskan bagaimana pendulum dijatuhkan secara mekanis tepat di menit ke-42.",
      "巧妙固定在圣艾琳青铜大钟内部。完美解释了钟摆为何能在无人触碰的情况下，精准在第42分钟钟锤敲击时自行脱钩切断！",
      "聖アイリーンの青銅鐘の内部に結ばれていた。人の手を介さず、42分の鐘の打撃で振り子が機械的に停止した仕掛けを証明する。",
      "청동 종 안쪽에 설치된 장치입니다. 사람이 없었음에도 42분 종소리의 진동으로 진자가 스스로 탈착된 트릭을 설명해 줍니다.",
      "Fijado dentro de la campana de bronce. Explica cómo el péndulo se soltó mecánicamente en el golpe del minuto 42.",
      "Fixé dans la cloche en bronze. Explique comment le balancier s'est déclenché mécaniquement au 42e coup de cloche.",
      "In der Bronzeglocke befestigt. Erklärt, wie das Pendel mechanisch exakt zur 42. Minute ausgelöst wurde.",
      "Закреплен внутри бронзового колокола. Объясняет, как маятник сработал точно на 42-й минуте от вибрации удара колокола.",
      "Fissato all'interno della campana di bronzo. Spiega come il pendolo sia scattato meccanicamente al rintocco del 42° minuto.",
      "Preso dentro do sino de bronze. Explica como o pêndulo foi acionado mecanicamente na batida do 42º minuto.",
      "مثبت داخل الجرس البرونزي الضخم، ويفسر كيفية إفلات البندول آليًا عبر اهتزاز دقة الدقيقة 42 دون حضور بشري."
    )
  },
  clue_needle_puncture: {
    title: tr(
      "Microscopic Cyanide Puncture",
      "Luka Suntikan Mikroskopis di Leher Korban",
      "颈后微型氰化物注射针孔",
      "首筋の微細なシアン化物注射創",
      "목 뒤의 미세한 청산가리 주사 상흔",
      "Punción Microscópica de Cianuro",
      "Piqûre Microscopique de Cyanure",
      "Mikroskopische Zyankali-Einstichstelle",
      "Микроскопический след инъекции цианида",
      "Puntura Microscopica di Cianuro",
      "Perfuração Microscópica de Cianeto",
      "أثر وخز مجهري لسيانيد في الرقبة"
    ),
    desc: tr(
      "Precision magnification reveals a tiny blue puncture wound on Aurelia's neck, confirming lethal injection before the fall.",
      "Lensa presisi membuktikan racun disuntikkan ke leher Aurelia sebelum tubuhnya dipindahkan ke pendulum.",
      "高倍放大镜显现出死者颈椎凹陷处有一枚细如牛毛的浅蓝淤血点，证实她在钟摆坠落前已遭毒杀。",
      "高倍率ルーペにより、遺体の首筋に青く変色した微細な注射痕を発見。落下前の薬殺を決定づける。",
      "정밀 돋보기로 목 뒤에서 푸르스름한 미세 주사 바늘 자국을 확인하여 추락 전 독살되었음을 증명합니다.",
      "Un aumento preciso revela una diminuta punción azulada en el cuello de Aurelia, confirmando la inyección letal.",
      "Un examen minutieux révèle une minuscule piqûre bleutée au cou d'Aurelia, confirmant une injection létale.",
      "Präzise Vergrößerung enthüllt eine winzige Einstichstelle am Nacken, die die tödliche Injektion beweist.",
      "Увеличение выявило крошечный след укола на шее Аурелии, подтверждающий смертельную инъекцию до падения.",
      "Un ingrandimento rivela una minuscola puntura bluastra sul collo di Aurelia, confermando l'iniezione letale.",
      "Uma ampliação precisa revela uma minúscula marca de picada azul no pescoço, confirmando injeção letal.",
      "الفحص المجهري الدقيق يكشف عن وخزة إبرة زرقاء دقيقة في عنق أوريليا، مما يؤكد حقنها بالسم القاتل قبل سقوطها."
    )
  },
  clue_syndicate_bribe: {
    title: tr(
      "Syndicate Payoff Ledger",
      "Catatan Suap Sindikat ke Vivienne Vance",
      "辛迪加致薇薇安密约收据",
      "シンジケートの買収受領書",
      "신디케이트의 비비안 매수 영수증",
      "Recibo de Soborno del Sindicato",
      "Reçu de Pot-de-Vin du Syndicat",
      "Bestechungsbeleg des Syndikats",
      "Расписка о взятке Синдиката",
      "Ricevuta di Corruzione del Sindacato",
      "Recibo de Suborno do Sindicato",
      "إيصال رشوة النقابة لفيفيان"
    ),
    desc: tr(
      "Records prove Vivienne Vance accepted 50,000 guilders to deliver Aurelia's delay-detonation blueprints.",
      "Catatan membuktikan Vivienne menerima 50.000 guilder untuk menyerahkan rancangan Aurelia kepada kartel.",
      "账目存根证明薇薇安曾被许诺五万金币报酬，条件是将奥蕾莉亚的定时引爆专利全盘交给军火财阀。",
      "ヴィヴィアンが5万ギルダーの報酬と引き換えに、オレリアの起爆装置設計図を渡す約束を交わしていた証拠。",
      "비비안이 5만 길더의 대가를 받고 오렐리아의 지연 기폭장치 도면을 넘기기로 합의했던 서류입니다.",
      "Los registros demuestran que Vivienne aceptó 50.000 florines para entregar los planos de Aurelia.",
      "Les registres prouvent que Vivienne a accepté 50 000 florins pour livrer les plans d'Aurelia.",
      "Dokumente belegen, dass Vivienne 50.000 Gulden annahm, um Aurelias Pläne an das Kartell auszuliefern.",
      "Записи доказывают, что Вивьен приняла 50 000 гульденов за передачу чертежей Аурелии картелю.",
      "I registri provano che Vivienne ha accettato 50.000 fiorini per consegnare i progetti di Aurelia al cartello.",
      "Registros comprovam que Vivienne aceitou 50.000 florins para entregar as plantas de Aurelia.",
      "الوثائق تثبت قبول فيفيان خمسين ألف غيلدر لتسليم مخططات أوريليا للتفجير المؤجل إلى كارتل النقابة."
    )
  },
  clue_poison_mechanism: {
    title: tr(
      "Spring-Loaded Needle Mechanism",
      "Mekanisme Jarum Pegas Ratu Gading",
      "黑后棋底座暗藏微簧棘刺弹簧针",
      "チェス駒内蔵のバネ仕掛け毒針機構",
      "체스 퀸 스프링 암살 독침 메커니즘",
      "Mecanismo de Resorte de la Reina de Marfil",
      "Mécanisme à Ressort de la Reine d'Ivoire",
      "Federmechanismus der Elfenbein-Dame",
      "Пружинный механизм шахматной фигуры",
      "Meccanismo a Scatto della Regina d'Avorio",
      "Mecanismo de Mola da Rainha de Marfim",
      "آلية الإبرة الزنبركية بملكة الشطرنج"
    ),
    desc: tr(
      "The ivory queen conceals a pressurized needle chamber loaded with fatal prussic acid.",
      "Ratu catur gading menyembunyikan jarum bertekanan pegas yang diisi asam prusat mematikan.",
      "雕刻象牙黑后棋子中空内部嵌有精密的微型气压弹簧针室，灌注了足以十秒见血封喉的纯氢氰酸液。",
      "象牙のクイーン内部には極小の加圧バネ針室が仕込まれており、致死性の青酸が充填されていた。",
      "상아 체스 퀸 내부에는 미세 스프링 압축 챔버가 숨겨져 치명적인 청산가리가 채워져 있었습니다.",
      "La reina de marfil oculta una cámara de aguja presurizada cargada con ácido prúsico fatal.",
      "La reine d'ivoire dissimule une chambre à aiguille sous pression remplie d'acide prussique mortel.",
      "Die Elfenbein-Dame verbirgt eine druckbelastete Nadelkammer voller Blausäure.",
      "Внутри фигуры ферзя спрятана полость с пружинной иглой, заряженная синильной кислотой.",
      "La regina d'avorio cela una camera d'ago pressurizzata carica di acido cianidrico letale.",
      "A rainha de marfim oculta uma câmara de agulha pressurizada carregada com ácido prússico fatal.",
      "تخفي قطعة ملكة الشطرنج العاجية حجرة إبرة مضغوطة بزنبرك معبأة بحمض البروسيك القاتل."
    )
  }
};

const NEW_POIS = {
  poi_gantry_lantern: {
    title: tr(
      "Upper Gantry & Alchemical Lantern",
      "Anjungan Atas & Lentera Alkimia",
      "提灯上层悬空回廊与炼金探灯",
      "上層キャットウォークと錬金ランタン",
      "상층 통로와 연금술 등불",
      "Pasarela Superior y Linterna Alquímica",
      "Passerelle Supérieure et Lanterne Alchimique",
      "Oberer Laufsteg und Alchemielaterne",
      "Верхние мостки и алхимический фонарь",
      "Passerella Superiore e Lanterna Alchemica",
      "Passarela Superior e Lanterna Alquímica",
      "الممر العلوي وفانوس الكيمياء"
    ),
    description: tr(
      "A narrow iron grating over the gear abyss. Broken glass and alchemical soot mark where a clandestine visitor waited.",
      "Kisi besi sempit di atas jurang roda gigi. Pecahan kaca dan jelaga alkimia menandai tempat kurir rahasia mengintai.",
      "悬空于齿轮深渊上方的狭窄铁栅回廊。碎玻璃与炼金煤烟残留在此，暴露出曾有秘密访客在暗中窥伺。",
      "歯車の深淵に架かる細い鉄格子通路。割れたガラスと錬金術の煤が、何者かが潜んでいた痕跡を物語る。",
      "톱니바퀴 심연 위에 놓인 좁은 철제 격자 통로. 깨진 유리와 연금술 그을음이 밀사의 잠복 흔적을 보여줍니다.",
      "Una estrecha rejilla de hierro sobre el abismo de engranajes. Restos de vidrio y hollín alquímico marcan una visita secreta.",
      "Une étroite grille de fer au-dessus des engrenages. Du verre brisé et de la suie alchimique trahissent un intrus.",
      "Ein schmaler Eisensteg über den Zahnrädern. Glasscherben und Ruß beweisen einen heimlichen Besucher.",
      "Узкая железная решетка над пропастью шестерен. Осколки стекла и сажа выдают присутствие тайного гостя.",
      "Una stretta grata di ferro sull'abisso di ingranaggi. Vetri rotti e fuliggine alchemica indicano una presenza segreta.",
      "Uma estreita grade de ferro sobre o abismo de engrenagens. Cacos de vidro e fuligem revelam uma visita clandestina.",
      "ممر حديدي ضيق فوق هاوية التروس. زجاج محطم وسخام كيميائي يشيران إلى ترصد زائر سري قبل الحادث."
    )
  },
  poi_clock_chime_bell: {
    title: tr(
      "Colossal Bronze Bell & Chime Gearing",
      "Lonceng Perunggu Raksasa & Gigi Dentang",
      "圣艾琳青铜大钟与共振撞锤齿轮",
      "聖アイリーンの巨鐘と鐘打撃歯車",
      "성 아이린 청동 거대 종과 타종 기어",
      "Campana Monumental y Engranajes del Carrillón",
      "Cloche Colossale et Engrenages de Sonnerie",
      "Kolossale Bronzeglocke und Schlagwerk",
      "Исполинский бронзовый колокол и бойный механизм",
      "Campana Monumentale e Meccanismo del Rintocco",
      "Sino Colossal de Bronze e Engrenagens do Carrilhão",
      "الجرس البرونزي الضخم وتروس دق الساعات"
    ),
    description: tr(
      "The eight-ton bell that tolls for District 7. A fine steel wire is wrapped through the clapper linkage down into the pendulum escapement.",
      "Lonceng delapan ton yang berdentang bagi Distrik 7. Kawat baja tipis terlilit dari pemukul lonceng menuju mekanisme pendulum.",
      "重达八吨的圣艾琳主钟。一根极细的高张力钢丝从钟锤连杆悄然延伸至下方的钟摆脱扣装置上！",
      "第7区に時を告げる8トンの大鐘。打鐘レバーから振り子の脱進機へと細い鋼鉄ワイヤーが巧みに結ばれている。",
      "제7구역에 시각을 알리는 8톤 청동 종. 종 치는 추의 연결부에서 진자 탈착부까지 정교한 강철 와이어가 이어져 있습니다.",
      "La campana de ocho toneladas que dobla para el Distrito 7. Un fino cable de acero conecta el badajo al péndulo.",
      "La cloche de huit tonnes qui sonne pour le District 7. Un fil d'acier fin relie le battant au balancier.",
      "Die Acht-Tonnen-Glocke des Distrikts 7. Ein dünner Stahldraht verbindet den Klöppel mit dem Pendelwerk.",
      "Восьмитонный колокол 7-го района. Тонкий стальной тросик тянется от языка колокола к спусковому механизму маятника.",
      "La campana da otto tonnellate del Distretto 7. Un sottile cavo d'acciaio collega il battaglio allo scappamento.",
      "O sino de oito toneladas que toca pelo Distrito 7. Um fino fio de aço liga o badalo ao escape do pêndulo.",
      "الجرس الضخم البالغ وزنه ثمانية أطنان. سلك فولاذي رفيع يربط لسان الجرس بآلية فك قفل البندول بدقة ميكانيكية."
    )
  }
};

let dContent = fs.readFileSync(path.join(__dirname, '..', 'src', 'dialogue_i18n.js'), 'utf8');

// Append CLUES_I18N_FULL and NEW_POIS_I18N
dContent += `
export const CLUES_I18N_FULL = ${JSON.stringify(CLUES, null, 2)};

export const NEW_POIS_I18N = ${JSON.stringify(NEW_POIS, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'dialogue_i18n.js'), dContent, 'utf8');
console.log('Appended CLUES_I18N_FULL and NEW_POIS_I18N to src/dialogue_i18n.js!');
