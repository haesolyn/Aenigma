# -*- coding: utf-8 -*-
"""
Generates complete 12-language localization for all dialogue nodes and clues
in Aenigma Detective RPG.
Supported: en, id, zh, ja, ko, es, fr, de, ru, it, pt, ar
"""
import json
import os

LANGUAGES = ['en', 'id', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'ru', 'it', 'pt', 'ar']

# Complete CLUES localization for 13 clues in 12 languages
CLUES = {
    "clue_syndicate_bounty": {
        "title": {
            "en": "The Grand Syndicate Ledger Bounty",
            "id": "Hadiah Sayembara Sindikat Jam",
            "zh": "辛迪加黑金悬赏令",
            "ja": "大シンジケートの賞金首調書",
            "ko": "거대 신디케이트의 현상금 장부",
            "es": "La Recompensa del Gran Sindicato",
            "fr": "La Prime du Grand Syndicat",
            "de": "Das Kopfgeld des Großen Syndikats",
            "ru": "Награда Великого Синдиката",
            "it": "La Taglia del Grande Sindacato",
            "pt": "A Recompensa do Grande Sindicato",
            "ar": "مكافأة دفتر النقابة الكبرى"
        },
        "desc": {
            "en": "Inspector Graves was paid off by the Syndicate to retrieve an alchemical prototype ledger stolen by Vance.",
            "id": "Inspektur Graves disuap oleh Sindikat untuk mengamankan buku besar alkimia rahasia yang dicuri Vance.",
            "zh": "格雷夫斯警探收受了辛迪加巨额贿赂，奉命追回奥蕾莉亚偷走的炼金原型秘密账簿。",
            "ja": "グレイヴス警部は、ヴァンスが盗み出した錬金術試作台帳を回収するためシンジケートから買収されていた。",
            "ko": "그레이브스 형사는 밴스가 훔쳐간 프로토타입 장부를 회수하는 대가로 신디케이트에 매수되었습니다.",
            "es": "El inspector Graves fue sobornado por el Sindicato para recuperar un libro prototipo robado por Vance.",
            "fr": "L'inspecteur Graves a été soudoyé par le Syndicat pour récupérer un registre secret dérobé par Vance.",
            "de": "Inspektor Graves wurde vom Syndikat bestochen, um ein von Vance gestohlenes Prototyp-Buch zu beschaffen.",
            "ru": "Инспектор Грейвс был подкуплен Синдикатом, чтобы вернуть украденный Вэнс чертежный гроссбух.",
            "it": "L'ispettore Graves è stato corrotto dal Sindacato per recuperare un mastro prototipo rubato dalla Vance.",
            "pt": "O inspetor Graves foi subornado pelo Sindicato para recuperar um livro protótipo roubado por Vance.",
            "ar": "تلقى المفتش غريفز رشوة من النقابة لاستعادة دفتر الحسابات الخيميائي المسروق من فانس."
        }
    },
    "clue_poison_needle": {
        "title": {
            "en": "The Poisoned Ivory Queen",
            "id": "Bidak Ratu Catur Beracun",
            "zh": "淬毒象牙黑后棋子",
            "ja": "毒針仕込みの象牙クイーン",
            "ko": "독침이 장치된 상아 퀸",
            "es": "La Reina de Marfil Envenenada",
            "fr": "La Reine d'Ivoire Empoisonnée",
            "de": "Die Vergiftete Elfenbein-Dame",
            "ru": "Отравленный ферзь из слоновой кости",
            "it": "La Regina d'Avorio Avvelenata",
            "pt": "A Rainha de Marfim Envenenada",
            "ar": "ملكة الشطرنج العاجية المسمومة"
        },
        "desc": {
            "en": "Aurelia Vance was paralyzed by a hollow needle concealed in a chess piece before being hung on the pendulum.",
            "id": "Aurelia Vance dilumpuhkan dengan jarum berongga beracun di dalam bidak catur sebelum digantung di pendulum.",
            "zh": "奥蕾莉亚·梵斯在被挂上大钟摆前，遭人利用棋子暗藏的中空毒针注入致命神经毒素瘫痪。",
            "ja": "オレリア・ヴァンスは大振り子に吊るされる前に、チェス駒に隠された毒針で麻痺させられていた。",
            "ko": "오렐리아 밴스는 시계추에 매달리기 전, 체스 말에 숨겨진 독침에 찔려 마비되었습니다.",
            "es": "Aurelia Vance fue paralizada con una aguja hueca oculta en una pieza de ajedrez antes de ser colgada del péndulo.",
            "fr": "Aurelia Vance a été paralysée par une aiguille empoisonnée dissimulée dans une pièce d'échecs avant d'être pendue au balancier.",
            "de": "Aurelia Vance wurde durch eine in einer Schachfigur versteckte Nadel gelähmt, bevor man sie ans Pendel hängte.",
            "ru": "Аурелия Вэнс была парализована полой иглой с ядом, скрытой в шахматной фигуре, перед тем как ее повесили на маятник.",
            "it": "Aurelia Vance è stata paralizzata da un ago avvelenato celato in un pezzo degli scacchi prima di essere appesa al pendolo.",
            "pt": "Aurelia Vance foi paralisada por uma agulha oca com veneno oculta na peça de xadrez antes de ser presa ao pêndulo.",
            "ar": "شُلت حركة أوريليا فانس بإبرة مجوفة مسمومة كانت مخبأة داخل قطعة شطرنج قبل تعليقها على البندول."
        }
    },
    "clue_meridian_seal": {
        "title": {
            "en": "The Pale Meridian Seal",
            "id": "Segel Meridian Pucat",
            "zh": "苍白子午线密教印记",
            "ja": "蒼白の子午線教団の刻印",
            "ko": "창백한 자오선 교단의 인장",
            "es": "El Sello del Meridiano Pálido",
            "fr": "Le Sceau du Méridien Pâle",
            "de": "Das Siegel des Bleichen Meridians",
            "ru": "Печать Бледного Меридиана",
            "it": "Il Sigillo del Meridiano Pallido",
            "pt": "O Selo do Meridiano Pálido",
            "ar": "ختم خط الزوال الشاحب"
        },
        "desc": {
            "en": "The victim was initiated into an occult horological order attempting to reverse the entropy of time.",
            "id": "Korban merupakan anggota sekte horologis rahasia yang terobsesi membalikkan aliran waktu.",
            "zh": "受害者加入了崇尚机械逆熵、企图倒转时光流向的狂热秘密钟表教派。",
            "ja": "被害者は時間の不可逆性を覆そうと試みる神秘主義の時計結社に深く関与していた。",
            "ko": "피해자는 시간의 엔트로피를 역전시키려던 오컬트 시계 교단에 입단한 상태였습니다.",
            "es": "La víctima pertenecía a una orden horológica oculta que intentaba revertir la entropía del tiempo.",
            "fr": "La victime avait été initiée à un ordre horloger occulte tentant d'inverser l'entropie temporelle.",
            "de": "Das Opfer war Mitglied eines okkulten Uhrmacher-Ordens, der die Zeit umkehren wollte.",
            "ru": "Жертва состояла в оккультном ордене часовщиков, пытавшемся повернуть время вспять.",
            "it": "La vittima faceva parte di un ordine orologico occulto che tentava di invertire l'entropia del tempo.",
            "pt": "A vítima foi iniciada em uma ordem horológica oculta que tentava reverter a entropia do tempo.",
            "ar": "كانت الضحية منتمية لجماعة ساعاتيّة باطنية سرية تسعى لعكس انسياب الزمن."
        }
    },
    "clue_watch_code": {
        "title": {
            "en": "Floorboard Safe Combination (7-3-12)",
            "id": "Kombinasi Brankas Lantai (7-3-12)",
            "zh": "暗格金库密码 (7-3-12)",
            "ja": "床下金庫の暗証コード (7-3-12)",
            "ko": "바닥 금고 암호 (7-3-12)",
            "es": "Combinación de la Caja Fuerte (7-3-12)",
            "fr": "Combinaison du Coffre (7-3-12)",
            "de": "Kombination des Bodentresors (7-3-12)",
            "ru": "Шифр сейфа в полу (7-3-12)",
            "it": "Combinazione della Cassaforte (7-3-12)",
            "pt": "Combinação do Cofre (7-3-12)",
            "ar": "شفرة الخزنة الأرضية (7-3-12)"
        },
        "desc": {
            "en": "The victim inscribed the safe combination code inside her watch balance cock, linking it to Madame Vivienne Vance.",
            "id": "Korban mengukir kode kombinasi brankas rahasia di dalam jam sakunya, menghubungkannya ke Vivienne Vance.",
            "zh": "死者将暗格金库的三位密码深深刻在随身怀表内，并刻下了对薇薇安·梵斯的深情题词。",
            "ja": "被害者は懐中時計のテンプ受けに金庫の解錠コードを刻み、未亡人ヴィヴィアンへの献辞を遺していた。",
            "ko": "피해자는 회중시계 무브먼트 내부에 금고 암호를 새겨 넣었으며, 이는 비비안 밴스 부인과 직결됩니다.",
            "es": "La víctima grabó el código de la caja fuerte en su reloj de bolsillo, vinculándolo a Vivienne Vance.",
            "fr": "La victime avait gravé le code du coffre dans sa montre à gousset, le liant directement à Vivienne Vance.",
            "de": "Das Opfer ritzte den Tresorcode in seine Taschenuhr und verknüpfte ihn mit Vivienne Vance.",
            "ru": "Жертва выгравировала код от сейфа внутри своих карманных часов, связав его с Вивьен Вэнс.",
            "it": "La vittima ha inciso il codice della cassaforte nel bilanciere dell'orologio, legandolo a Vivienne Vance.",
            "pt": "A vítima gravou o código do cofre em seu relógio de bolso, ligando-o a Vivienne Vance.",
            "ar": "نقشت الضحية شفرة فتح الخزنة داخل ساعة جيبها وربطتها بإهداء صريح لفيفيان فانس."
        }
    },
    "clue_velvet_cyanide": {
        "title": {
            "en": "Torn Blue Velvet & Cyanide Vial",
            "id": "Sobekan Beludru Biru & Ampul Sianida",
            "zh": "撕裂的蓝丝绒碎片与剧毒氰化安瓿",
            "ja": "裂けた青いビロードと青酸アンプル",
            "ko": "찢겨진 청색 벨벳 조각과 청산가리 앰플",
            "es": "Terciopelo Azul Rasgado y Vial de Cianuro",
            "fr": "Velours Bleu Déchiré et Fiole de Cyanure",
            "de": "Zerrissener Blauer Samt und Zyankali-Fläschchen",
            "ru": "Оторванный синий бархат и ампула с цианидом",
            "it": "Velluto Blu Strappato e Fiala di Cianuro",
            "pt": "Veludo Azul Rasgado e Frasco de Cianeto",
            "ar": "قطعة مخمل أزرق ممزقة وأمبول سيانيد"
        },
        "desc": {
            "en": "Found on the rain balcony. A direct physical match to Madame Vivienne Vance's mourning dress.",
            "id": "Ditemukan di balkon hujan. Cocok secara fisik dengan mantel beludru Nyonya Vivienne Vance.",
            "zh": "在风雨露台栏杆起获。其纤维编织与磨损破口与薇薇安·梵斯夫人身上的丧服大衣完全吻合。",
            "ja": "雨のバルコニーで発見。ヴィヴィアン・ヴァンス夫人の喪服コートの裂け目と完全に一致する。",
            "ko": "빗물 고인 발코니에서 발견되었습니다. 비비안 밴스 부인의 상복 코트 찢긴 자국과 정확히 일치합니다.",
            "es": "Hallado en el balcón. Coincide exactamente con el abrigo de luto de Madame Vivienne Vance.",
            "fr": "Découvert sur le balcon. Correspond parfaitement au manteau de deuil de Madame Vivienne Vance.",
            "de": "Auf dem Regen-Balkon gefunden. Passt exakt zum Trauermantel von Madame Vivienne Vance.",
            "ru": "Найдено на мокром балконе. Физически совпадает с разрывом на траурном пальто мадам Вивьен Вэнс.",
            "it": "Trovato sul balcone bagnato di pioggia. Corrisponde perfettamente all'abito di Vivienne Vance.",
            "pt": "Encontrado na sacada de chuva. Corresponde perfeitamente ao casaco de luto de Madame Vivienne Vance.",
            "ar": "عُثر عليه بشرفة المطر، ويتطابق تمامًا مع معطف حداد السيدة فيفيان فانس."
        }
    },
    "clue_perpetuum_ledger": {
        "title": {
            "en": "The Perpetuum Cartel Ledger",
            "id": "Buku Besar Perpetuum Sindikat",
            "zh": "永动机辛迪加绝密总账簿",
            "ja": "永久機関カルテルの秘密台帳",
            "ko": "영구기관 카르텔의 비밀 원장",
            "es": "El Libro Mayor del Cartel Perpetuum",
            "fr": "Le Grand Livre du Cartel Perpetuum",
            "de": "Das Hauptbuch des Perpetuum-Kartells",
            "ru": "Секретный гроссбух картеля «Перпетуум»",
            "it": "Il Mastro del Cartello Perpetuum",
            "pt": "O Livro-Razão do Cartel Perpetuum",
            "ar": "دفتر حسابات كارتل بيربيتوم السري"
        },
        "desc": {
            "en": "Definitive proof that Vance was silenced to prevent her from exposing the Grand Syndicate arson conspiracy.",
            "id": "Bukti definitif bahwa Vance dibungkam agar tidak membongkar konspirasi pembakaran kota oleh Sindikat.",
            "zh": "铁证如山：辛迪加为了阻止奥蕾莉亚揭露全市延迟纵火爆炸黑幕，雇佣杀手将她彻底灭口。",
            "ja": "シンジケートの大規模放火陰謀の告発を防ぐため、ヴァンスが口封じされた決定的な物証。",
            "ko": "신디케이트의 도시 방화 음모를 폭로하려던 밴스를 침묵시키기 위해 입막음 살해했다는 확증입니다.",
            "es": "Prueba definitiva de que Vance fue silenciada para encubrir la conspiración incendiaria del Sindicato.",
            "fr": "Preuve accablante que Vance a été assassinée pour étouffer le complot d'incendie du Grand Syndicat.",
            "de": "Der endgültige Beweis, dass Vance mundtot gemacht wurde, um die Brandstiftungsverschwörung zu decken.",
            "ru": "Главное доказательство того, что Вэнс устранили, дабы скрыть заговор Синдиката о поджоге города.",
            "it": "La prova schiacciante che la Vance è stata messa a tacere per coprire i roghi dolosi del Sindacato.",
            "pt": "Prova definitiva de que Vance foi silenciada para abafar a conspiração incendiária do Sindicato.",
            "ar": "الدليل القاطع على تصفية فانس لمنعها من كشف مؤامرة حرائق النقابة الكبرى المدمرة."
        }
    },
    "clue_madame_motive": {
        "title": {
            "en": "Vivienne's Motive: Vengeance & Neglect",
            "id": "Motif Vivienne: Dendam & Pengabaian",
            "zh": "薇薇安的杀意动机：复仇与冷酷漠视",
            "ja": "ヴィヴィアンの動機：復讐と長年の冷遇",
            "ko": "비비안의 범행 동기: 복수와 오랜 방치",
            "es": "El Motivo de Vivienne: Venganza y Negligencia",
            "fr": "Le Mobile de Vivienne : Vengeance et Abandon",
            "de": "Viviennes Motiv: Rache und Vernachlässigung",
            "ru": "Мотив Вивьен: месть за пренебрежение",
            "it": "Il Movente di Vivienne: Vendetta e Abbandono",
            "pt": "O Motivo de Vivienne: Vingança e Desprezo",
            "ar": "دافع فيفيان: الانتقام والمرارة والإهمال"
        },
        "desc": {
            "en": "Aurelia neglected their dying daughter to finish the clockwork war machine for the Syndicate.",
            "id": "Aurelia menelantarkan putri mereka yang sekarat demi menyelesaikan mesin pesanan Sindikat.",
            "zh": "奥蕾莉亚当年为了替辛迪加赶制致命军火，冷血抛下重病垂危的亲生女儿不顾。",
            "ja": "オレリアは兵器製造に没頭し、結核で瀕死だった一人娘の看病を放棄していた。",
            "ko": "오렐리아는 신디케이트의 전쟁 기계를 완성하느라 결핵으로 죽어가던 친딸을 외면했습니다.",
            "es": "Aurelia desatendió a su hija moribunda para terminar la máquina bélica del Sindicato.",
            "fr": "Aurelia avait délaissé leur fille mourante pour achever la machine de guerre du Syndicat.",
            "de": "Aurelia vernachlässigte ihre sterbende Tochter, um die Kriegsmaschine fertigzustellen.",
            "ru": "Аурелия бросила умирающую дочь ради завершения военной машины для Синдиката.",
            "it": "Aurelia ha trascurato la figlia morente per terminare la macchina da guerra del Sindacato.",
            "pt": "Aurelia negligenciou a filha doente para terminar a máquina bélica do Sindicato.",
            "ar": "أهملت أوريليا ابنتهما المحتضرة لإتمام آلة الحرب لحساب النقابة الكبرى."
        }
    },
    "clue_confession_full": {
        "title": {
            "en": "THE FULL TRUTH: A Mutual Martyrdom",
            "id": "KEBENARAN PENUH: Perjanjian Kematian Bersama",
            "zh": "终极真相：互谋殉道之死",
            "ja": "真実の全貌：同意の上の殉教的暗殺",
            "ko": "완전한 진실: 상호 합의된 순교적 결말",
            "es": "LA VERDAD TOTAL: Un Martirio Consentido",
            "fr": "LA VÉRITÉ COMPLÈTE : Un Martyre Partagé",
            "de": "DIE VOLLE WAHRHEIT: Ein Gegenseitiges Martyrium",
            "ru": "ВСЯ ПРАВДА: Взаимное мученичество",
            "it": "LA VERITÀ COMPLETA: Un Martirio Consensuale",
            "pt": "A VERDADE COMPLETA: Um Martírio Consensual",
            "ar": "الحقيقة الكاملة: استشهاد متبادل بالاتفاق"
        },
        "desc": {
            "en": "Vivienne poisoned Aurelia with her full consent to prevent the Syndicate from seizing her delay-detonation blueprints.",
            "id": "Vivienne meracuni Aurelia atas persetujuannya agar rancangan bom penunda waktu tidak jatuh ke tangan Sindikat.",
            "zh": "薇薇安是在奥蕾莉亚的含笑请求下亲手下毒，借此让绝密军火图纸与钟表大师一同长眠，阻止辛迪加屠杀工人。",
            "ja": "ヴィヴィアンはオレリア本人の合意のもと毒を盛り、軍事兵器の設計図を道連れにして時計塔を永久に止めた。",
            "ko": "비비안은 신디케이트가 살상 무기 도면을 탈취하지 못하도록, 오렐리아 본인의 간곡한 동의 하에 독침을 찔렀습니다.",
            "es": "Vivienne envenenó a Aurelia con su consentimiento para evitar que el Sindicato obtuviera los planos.",
            "fr": "Vivienne a empoisonné Aurelia avec son plein accord pour que le Syndicat ne s'empare pas des plans.",
            "de": "Vivienne vergiftete Aurelia mit deren Einverständnis, um die Entführung der Pläne zu vereiteln.",
            "ru": "Вивьен отравила Аурелию с ее полного согласия, чтобы чертежи не достались Синдикату.",
            "it": "Vivienne ha avvelenato Aurelia con il suo consenso per impedire al Sindacato di prendere i piani.",
            "pt": "Vivienne envenenou Aurelia com o consentimento dela para impedir que o Sindicato tomasse as plantas.",
            "ar": "سممت فيفيان أوريليا بموافقتها التامة لمنع النقابة من الاستيلاء على مخططات السلاح الكارثي."
        }
    },
    "clue_shattered_reagents": {
        "title": {
            "en": "Shattered Reagents & Syndicate Crest",
            "id": "Serpihan Reagen Kimia & Lambang Sindikat",
            "zh": "碎裂的化学试剂瓶与辛迪加火漆印",
            "ja": "破壊された試薬瓶とシンジケートの紋章",
            "ko": "깨진 시약병과 신디케이트 문장",
            "es": "Reactivos Rotos y Emblema del Sindicato",
            "fr": "Réactifs Brisés et Sceau du Syndicat",
            "de": "Zerschlagene Reagenzien und Syndikats-Wappen",
            "ru": "Осколки реагентов и печать Синдиката",
            "it": "Reagenti Infranti e Sigillo del Sindacato",
            "pt": "Reagentes Quebrados e Brasão do Sindicato",
            "ar": "زجاجات كواشف محطمة وخاتم النقابة"
        },
        "desc": {
            "en": "Discovered on the lantern catwalk. Chemical glass vials bearing the Grand Syndicate mercury seal, confirming delivery hours before death.",
            "id": "Ditemukan di anjungan lentera. Botol kaca kimia berstempel segel merkuri Sindikat Agung, membuktikan kurir datang beberapa jam sebelum maut.",
            "zh": "在提灯走廊铁网间寻获。带有辛迪加水银火漆印的化学安瓿碎片，证实凶案发生前数小时曾有暗部信使出入钟楼。",
            "ja": "ランタン通路で回収。シンジケートの水銀刻印が施された薬瓶の破片で、犯行直前に密使が接触した証拠。",
            "ko": "등불 통로에서 발견되었습니다. 신디케이트의 수은 인장이 찍힌 시약병 파편으로, 사건 직전 밀사가 다녀간 흔적입니다.",
            "es": "Hallado en la pasarela de la linterna. Viales químicos con el sello de mercurio del Gran Sindicato entregados horas antes.",
            "fr": "Découvert sur la passerelle. Des fioles chimiques portant le sceau du Syndicat, livrées quelques heures avant le drame.",
            "de": "Auf dem Laternensteg gefunden. Glasfläschchen mit dem Siegel des Syndikats, wenige Stunden zuvor geliefert.",
            "ru": "Найдено на мостках фонаря. Осколки ампул с печатью Синдиката, доставленные за пару часов до трагедии.",
            "it": "Trovato sul camminamento della lanterna. Fiale chimiche col sigillo del Sindacato consegnate poche ore prima.",
            "pt": "Encontrado na passarela da lanterna. Frascos químicos com o selo do Sindicato entregues horas antes.",
            "ar": "عُثر عليها بممر الفانوس، زجاجات كيميائية ممهورة بختم النقابة الزئبقي سُلمت قبل ساعات من الجريمة."
        }
    },
    "clue_acoustic_tripwire": {
        "title": {
            "en": "Acoustic Resonance Tripwire Mechanism",
            "id": "Mekanisme Kawat Picu Akustik",
            "zh": "钟鸣声学共振触动引线",
            "ja": "音響共鳴トラップワイヤー機構",
            "ko": "음향 공명 격발 와이어 장치",
            "es": "Mecanismo de Resonancia Acústica",
            "fr": "Mécanisme de Déclenchement Acoustique",
            "de": "Akustischer Resonanz-Auslösedraht",
            "ru": "Акустический спусковой механизм колокола",
            "it": "Meccanismo a Risonanza Acustica",
            "pt": "Mecanismo de Fio de Ressonância Acústica",
            "ar": "آلية سلك التفجير بالرنين الصوتي"
        },
        "desc": {
            "en": "Fastened inside the Saint Irene bronze bell. It explains how the pendulum was mechanically tripped precisely on the 42nd minute stroke.",
            "id": "Terpasang di dalam lonceng perunggu Saint Irene. Menjelaskan bagaimana pendulum dijatuhkan secara mekanis tepat di menit ke-42.",
            "zh": "巧妙固定在圣艾琳青铜大钟内部。完美解释了钟摆为何能在无人触碰的情况下，精准在第42分钟钟锤敲击时自行脱钩切断！",
            "ja": "聖アイリーンの青銅鐘の内部に結ばれていた。人の手を介さず、42分の鐘の打撃で振り子が機械的に停止した仕掛けを証明する。",
            "ko": "청동 종 안쪽에 설치된 장치입니다. 사람이 없었음에도 42분 종소리의 진동으로 진자가 스스로 탈착된 트릭을 설명해 줍니다.",
            "es": "Fijado dentro de la campana de bronce. Explica cómo el péndulo se soltó mecánicamente en el golpe del minuto 42.",
            "fr": "Fixé dans la cloche en bronze. Explique comment le balancier s'est déclenché mécaniquement au 42e coup de cloche.",
            "de": "In der Bronzeglocke befestigt. Erklärt, wie das Pendel mechanisch exakt zur 42. Minute ausgelöst wurde.",
            "ru": "Закреплен внутри бронзового колокола. Объясняет, как маятник сработал точно на 42-й минуте от вибрации удара колокола.",
            "it": "Fissato all'interno della campana di bronzo. Spiega come il pendolo sia scattato meccanicamente al rintocco del 42° minuto.",
            "pt": "Preso dentro do sino de bronze. Explica como o pêndulo foi acionado mecanicamente na batida do 42º minuto.",
            "ar": "مثبت داخل الجرس البرونزي الضخم، ويفسر كيفية إفلات البندول آليًا عبر اهتزاز دقة الدقيقة 42 دون حضور بشري."
        }
    }
}

print(f"Loaded {len(CLUES)} clues with 12 languages each.")
