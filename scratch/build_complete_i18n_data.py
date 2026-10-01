# -*- coding: utf-8 -*-
"""
build_complete_i18n_data.py
Constructs the full 12-language dataset for all 38 dialogue nodes, 13 clues, and 2 POIs.
Outputs directly to src/dialogue_i18n.js
"""

import json
import os

LANGUAGES = ['en', 'id', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'ru', 'it', 'pt', 'ar']

def tr(en, id_text, zh, ja, ko, es, fr, de, ru, it, pt, ar):
    return {
        'en': en, 'id': id_text, 'zh': zh, 'ja': ja,
        'ko': ko, 'es': es, 'fr': fr, 'de': de,
        'ru': ru, 'it': it, 'pt': pt, 'ar': ar
    }

def voice_item(v_name, b_name, text_dict):
    return {
        'voice': v_name,
        'badge': b_name,
        'text': text_dict
    }

V_RATIO = tr('Ratio', 'Rasio', '理性', '比率', '이성', 'Razón', 'Ratio', 'Ratio', 'Рацио', 'Ragione', 'Razão', 'العقلانية')
B_RATIO = tr('RATIO [Intellect]', 'RASIO [Intelek]', '理性 [智力]', '比率 [知性]', '이성 [지성]', 'RAZÓN [Intelecto]', 'RATIO [Intellect]', 'RATIO [Intellekt]', 'РАЦИО [Интеллект]', 'RAGIONE [Intelletto]', 'RAZÃO [Intelecto]', 'العقلانية [الفكر]')

V_CARNAL = tr('Carnal', 'Insting Karnal', '肉体本能', '肉体', '육체', 'Carnal', 'Carnal', 'Körper', 'Тело', 'Fisico', 'Físico', 'الجسد')
B_CARNAL = tr('CARNAL [Physique]', 'KARNAL [Fisik]', '肉体本能 [体魄]', '肉体 [身体]', '육체 [신체]', 'CARNAL [Físico]', 'CARNAL [Physique]', 'KÖRPER [Physis]', 'ТЕЛО [Телосложение]', 'FISICO [Fisico]', 'FÍSICO [Físico]', 'الجسد [البنية]')

V_ELYSIA = tr('Elysia', 'Elysia', '极乐直觉', 'エリシア', '엘리시아', 'Elysia', 'Élysia', 'Elysia', 'Элизия', 'Elysia', 'Elísia', 'إليزيا')
B_ELYSIA = tr('ELYSIA [Psyche]', 'ELYSIA [Kejiwaan]', '极乐直觉 [心智]', 'エリシア [精神]', '엘리시아 [심리]', 'ELYSIA [Psique]', 'ÉLYSIA [Psyché]', 'ELYSIA [Psyche]', 'ЭЛИЗИЯ [Психика]', 'ELYSIA [Psiche]', 'ELÍSIA [Psique]', 'إليزيا [الروح]')

V_MOTORICS = tr('Reflex', 'Refleks', '反应力', '反射神経', '반사신경', 'Reflejo', 'Réflexe', 'Reflex', 'Рефлекс', 'Riflesso', 'Reflexo', 'رد الفعل')
B_MOTORICS = tr('REFLEX [Motorics]', 'REFLEKS [Motorik]', '反应力 [运动敏捷]', '反射神経 [運動]', '반사신경 [운동]', 'REFLEJO [Motricidad]', 'RÉFLEXE [Motricité]', 'REFLEX [Motorik]', 'РЕФЛЕКС [Моторика]', 'RIFLESSO [Motorica]', 'REFLEXO [Motricidade]', 'رد الفعل [الحركية]')

D = {}

# 1. graves_dialogue_start
D['graves_dialogue_start'] = {
    'speaker': tr('Inspector Graves', 'Inspektur Graves', '格雷夫斯警探', 'グレイヴス警部', '그레이브스 형사', 'Inspector Graves', 'Inspecteur Graves', 'Inspektor Graves', 'Инспектор Грейвс', 'Ispettore Graves', 'Inspetor Graves', 'المفتش غريفز'),
    'text': tr(
        "You finally dragged yourself up six flights of stairs, Detective. You reek like you slept in an open sewer behind the Whirling Gull. Take a look at this mess. The city magistrate is already screaming on the wire.",
        "Kamu akhirnya berhasil menyeret dirimu menaiki enam lantai tangga, Detektif. Baumu seperti tidur di saluran pembuangan Whirling Gull. Lihat kekacauan ini. Hakim kota sudah berteriak histeris di telepon.",
        "你终于拖着沉重的身子爬上这六层阶梯了，探长。你身上的恶臭简直就像在回旋鸥后巷的阴沟里宿醉了一整夜。瞧瞧眼前的烂摊子，市政法官已经在警线那头咆哮了。",
        "ようやく6階分の階段を這い上がってきたか、刑事。ワーリング・ガル裏の側溝で寝ていたかのような酷い臭いだ。この惨状を見ろ。治安判事はすでに電話口で怒鳴り散らしているぞ。",
        "결국 6층 계단을 기어 올라오셨군, 형사님. 회전하는 갈매기 여관 뒷골목 하수구에서 밤을 지새운 것 같은 악취가 진동하오. 이 꼴을 좀 보시오. 시 치안판사가 벌써 전선 너머로 고래고래 소리를 지르고 있소.",
        "Por fin te arrastraste seis tramos de escaleras, detective. Apestas como si hubieras dormido en una cloaca tras la Gaviota Giratoria. Mira este desastre. El magistrado ya está gritando por la línea.",
        "Vous avez enfin daigné gravir les six étages, Inspecteur. Vous empestez comme si vous aviez cuvé dans un égout derrière la Mouette Rieuse. Regardez ce carnage. Le magistrat hurle déjà au bout du fil.",
        "Sie haben sich endlich sechs Stockwerke hochgeschleppt, Detective. Sie stinken, als hätten Sie in der Gosse hinter der Taumelnden Möwe geschlafen. Sehen Sie sich das an. Der Magistrat tobt bereits am Fernsprecher.",
        "Наконец-то ты приволокся на шестой этаж, детектив. От тебя разит так, словно ты ночевал в сточной канаве за «Кружащейся чайкой». Взгляни на этот хаос. Магистрат уже разрывает телефонную линию криками.",
        "Ti sei finalmente trascinato su per sei rampe di scale, detective. Puzzi come se avessi dormito nelle fogne dietro il Gabbiano Volteggiante. Guarda che disastro. Il magistrato urla già all'apparecchio.",
        "Você finalmente se arrastou seis lances de escada, detetive. Você fede como se tivesse dormido num esgoto atrás do Gaivota Giratória. Olhe para este desastre. O magistrado já está berrando na linha.",
        "لقد سحبت نفسك أخيرًا عبر ستة طوابق من السلالم يا حضرة المحقق. تفوح منك رائحة وكأنك نمت في مجاري الحانة الخلفية. انظر إلى هذه الفوضى، قاضي المدينة يصرخ بهستيريا على الخط بالفعل."
    ),
    'voices': [
        voice_item(V_RATIO, B_RATIO, tr(
            "Look at his collar. There's dried tobacco ash on his lapel, but his eyes are darting toward the widow. He's nervous. He wants this closed as an accident before dawn.",
            "Perhatikan kerah bajunya. Ada abu tembakau kering di lapelnya, tapi matanya terus melirik ke arah sang janda. Dia gelisah. Dia ingin kasus ini ditutup sebagai kecelakaan sebelum fajar.",
            "看他的领口。驳领上沾着风干的烟灰，但他的眼神却频频瞥向那位遗孀。他在心虚。他迫不及待想在黎明前将此案草草定性为意外事故。",
            "彼の襟元を見ろ。乾いた煙草の灰が付着しているが、その視線は未亡人へと泳いでいる。動揺しているのだ。夜明け前に事故として処理したがっている。",
            "깃을 보십시오. 옷깃에 마른 담뱃재가 묻어 있지만, 그의 눈은 미망인을 향해 바쁘게 흔들립니다. 초조한 겁니다. 동이 트기 전에 단순 사고로 종결짓고 싶어 합니다.",
            "Mira su cuello. Hay ceniza de tabaco en su solapa, pero sus ojos se desvían hacia la viuda. Está nervioso. Quiere cerrar esto como un accidente antes del amanecer.",
            "Regardez son col. Des cendres froides sur son revers, mais ses yeux fuient vers la veuve. Il est fébrile. Il veut clore l'affaire en accident avant l'aube.",
            "Sehen Sie sich seinen Kragen an. Asche auf dem Revers, doch sein Blick huscht zur Witwe. Er ist nervös. Er will den Fall vor Sonnenaufgang als Unfall abstempeln.",
            "Посмотри на его воротник. На лацкане осыпался пепел, но его глаза то и дело косятся на вдову. Он нервничает. Хочет закрыть дело как несчастный случай до рассвета.",
            "Guarda il suo colletto. C'è cenere secca sul risvolto, ma i suoi occhi saettano verso la vedova. È nervoso. Vuole archiviare tutto come incidente prima dell'alba.",
            "Olhe para o colarinho dele. Há cinzas secas na lapela, mas os olhos dele disparam em direção à viúva. Ele está nervoso. Quer encerrar isso como acidente antes da aurora.",
            "انظر إلى ياقته. هناك رماد تبغ جاف على صدر سترته، لكن عينيه ترمقان الأرملة في توتر. إنه قلق ويريد إغلاق القضية كحادث عرضي قبل بزوغ الفجر."
        ))
    ],
    'options': [
        tr('"What is your preliminary assessment, Graves?"', '"Bagaimana penilaian awalmu, Graves?"', '“格雷夫斯，你的初步现场判断是什么？”', '「グレイヴス、お前の予備的な見立てはどうなんだ？」', '"그레이브스, 자네의 예비 소견은 어떤가?"', '"¿Cuál es tu evaluación preliminar, Graves?"', '"Quelle est votre conclusion préliminaire, Graves ?"', '"Was ist Ihre vorläufige Einschätzung, Graves?"', '«Какова твоя предварительная оценка, Грейвс?»', '"Qual è la tua valutazione preliminar, Graves?"', '"Qual é a sua avaliação preliminar, Graves?"', '"ما هو تقييمك الأولي يا غريفز؟"'),
        tr('[RHETORIC - Medium 10] "You seem in an awful hurry to file this report, Graves. Who called you first?"', '[RETORIKA - Sedang 10] "Terburu-buru sekali kamu menutup laporan ini, Graves. Siapa yang menghubungimu duluan?"', '【修辞学 - 普通 10】“你似乎急着结案提交报告啊，格雷夫斯。今晚到底是谁先给你通风报信的？”', '【修辞学 - 中等 10】「随分と調書を急いでまとめたがっているな、グレイヴス。お前を最初に呼び出したのは誰だ？」', '[수사학 - 보통 10] "보고서를 서둘러 넘기려 안달이 난 모양이군, 그레이브스. 누가 자네에게 먼저 연락했지?"', '[RETÓRICA - Medio 10] "Pareces tener mucha prisa por archivar esto, Graves. ¿Quién te llamó primero?"', '[RHÉTORIQUE - Moyen 10] "Vous semblez bien pressé de clore ce rapport, Graves. Qui vous a contacté en premier ?"', '[RHETORIK - Mittel 10] "Sie scheinen es verdammt eilig zu haben, Graves. Wer hat Sie zuerst alarmiert?"', '[РИТОРИКА - Средне 10] «Ты подозрительно торопишься закрыть отчет, Грейвс. Кто позвонил тебе первым?»', '[RETORICA - Medio 10] "Sembri avere una fretta dannata di archiviare, Graves. Chi ti ha chiamato per primo?"', '[RETÓRICA - Médio 10] "Você parece ter muita pressa para fechar este relatório, Graves. Quem te chamou primeiro?"', '[البلاغة - متوسط 10] "تبدو في عجلة مريبة لإغلاق هذا المحضر يا غريفز. من الذي اتصل بك أولاً؟"'),
        tr('"I need a cigarette before my synapses completely disconnect."', '"Aku butuh sebatang rokok sebelum sinapsis sarafku benar-benar putus."', '“在我脑神经彻底短路前，我需要来根烟提提神。”', '「神経のシナプスが完全に焼き切れる前に、煙草を一本くれ。」', '"시냅스가 완전히 끊기기 전에 담배 한 대 피워야겠소."', '"Necesito un cigarrillo antes de que mis sinapsis se desconecten."', '"J\'ai besoin d\'une cigarette avant que mes neurones ne lâchent."', '"Ich brauche eine Zigarette, bevor meine Synapsen durchbrennen."', '«Мне нужна сигарета, пока мозги окончательно не отключились.»', '"Ho bisogno di una sigaretta prima che le mie sinapsi cedano."', '"Preciso de um cigarro antes que meus neurônios pifem de vez."', '"أحتاج سيجارة قبل أن تنقطع نقاط تشابكي العصبي تمامًا."'),
        tr('[Leave dialogue]', '[Tinggalkan percakapan]', '【离开交谈】', '【会話を終える】', '[대화 종료]', '[Terminar conversación]', '[Quitter le dialogue]', '[Gespräch beenden]', '[Завершить разговор]', '[Termina dialogo]', '[Sair do diálogo]', '[إنهاء الحوار]')
    ]
}

# 2. graves_assessment
D['graves_assessment'] = {
    'speaker': tr('Inspector Graves', 'Inspektur Graves', '格雷夫斯警探', 'グレイヴス警部', '그레이브스 형사', 'Inspector Graves', 'Inspecteur Graves', 'Inspektor Graves', 'Инспектор Грейвс', 'Ispettore Graves', 'Inspetor Graves', 'المفتش غريفز'),
    'text': tr(
        "Old Aurelia was up here tinkering with the escapement at three in the morning. She slipped on machine grease, grabbed the pendulum to catch herself, and the counterweight drove through her ribs. Gruesome, but an industrial accident. Case closed, we go home and dry our boots.",
        "Aurelia tua sedang mengotak-atik roda escapement pukul tiga pagi. Dia terpeleset minyak pelumas mesin, meraih pendulum untuk menahan diri, dan beban penyeimbang menembus tulang rusuknya. Mengerikan, tapi murni kecelakaan kerja. Kasus ditutup, kita bisa pulang dan mengeringkan sepatu kita.",
        "老奥蕾莉亚凌晨三点还在摆弄那套擒纵机构。她在机油上滑了一跤，伸手去抓钟摆想稳住身体，结果沉重的配重臂直接贯穿了她的肋骨。死状惨烈，但这纯粹是工伤意外。案子结了，咱们打道回府烘干鞋子去。",
        "老オレリアは午前3時にここで脱進機をいじっていた。機械油に足を滑らせ、体勢を立て直そうと振り子を掴んだが、そのまま配重ブロックに肋骨を貫かれたんだ。無残だが労働災害だ。事件は終わり、さっさと帰って靴を乾かそうぜ。",
        "늙은 오렐리아는 새벽 3시에 탈진기를 손보고 있었소. 기계 윤활유에 미끄러져 시계추를 붙잡으려다 평형추에 갈비뼈가 꿰뚫린 거지. 끔찍하지만 단순 산업재해요. 사건 종결하고 들어가 장화나 말립시다.",
        "La vieja Aurelia estuvo aquí retocando el escape a las tres de la madrugada. Resbaló con grasa, se agarró al péndulo y el contrapeso le atravesó las costillas. Espantoso, pero un accidente laboral. Caso cerrado, vámonos.",
        "La vieille Aurelia bricolait l'échappement à trois heures du matin. Elle a glissé sur de la graisse, s'est raccrochée au balancier, et le contrepoids lui a transpercé les côtes. Sinistre, mais c'est un accident de travail. Affaire classée.",
        "Die alte Aurelia war um drei Uhr morgens hier oben am Werk. Sie glitt auf Schmierfett aus, griff nach dem Pendel, und das Gegengewicht durchstieß ihre Rippen. Grausam, aber ein Betriebsunfall. Akte zu, Feierabend.",
        "Старуха Аурелия возилась тут со спусковым механизмом в три часа ночи. Поскользнулась на смазке, схватилась за маятник, и противовес пробил ей грудь. Жутко, но это несчастный случай. Дело закрыто, по домам.",
        "La vecchia Aurelia era quassù alle tre di notte. È scivolata sull'olio, si è aggrappata al pendolo e il contrappeso le ha sfondato le costole. Orribile, ma un incidente sul lavoro. Caso chiuso, andiamo ad asciugarci gli stivali.",
        "A velha Aurelia estava aqui mexendo no escape às três da manhã. Escorregou na graxa, agarrou o pêndulo e o contrapeso perfurou suas costelas. Horrível, mas um acidente de trabalho. Caso encerrado, vamos embora.",
        "كانت العجوز أوريليا تعبث بتروس الساعة عند الثالثة فجرًا. انزلقت في شحم الماكينات وأمسكت بالبندول لتسند نفسها فاخترق ثقل الموازنة ضلوعها. مشهد مروع لكنه حادث عمل بحت. أغلقت القضية وهيا لنجفف أحذيتنا."
    ),
    'voices': [
        voice_item(V_CARNAL, B_CARNAL, tr(
            "Lies. A woman who slips forward doesn't land impaled through the back of her shoulder blades with her hands neatly folded. Someone held her down while the heavy iron arm descended.",
            "Bohong. Seseorang yang terpeleset ke depan tidak akan tertusuk dari belakang belikat dengan tangan terlipat rapi. Seseorang menahannya saat lengan besi raksasa itu menghujam ke bawah.",
            "他在说谎。一个向前滑倒的人，绝不可能背部肩胛骨被刺穿、双手还整齐地叠放在胸前。分明是有人在铸铁巨臂砸下时，死死按住了她！",
            "嘘だ。前方に滑った人間が、両手を胸元で揃えたまま肩甲骨の背後から貫かれるはずがない。鉄の腕が降下する間、何者かが彼女を押さえつけていたんだ。",
            "거짓말입니다. 앞으로 넘어진 사람이 양손을 가지런히 모은 채 등 뒤 견갑골을 관통당할 수는 없습니다. 거대한 쇠막대가 내려앉는 동안 누군가 위에서 짓누른 겁니다.",
            "Mentiras. Una mujer que resbala hacia adelante no acaba empalada por la espalda con las manos juntas. Alguien la sujetó mientras bajaba el brazo de hierro.",
            "Mensonges. Une femme glissant en avant ne se retrouve pas empalée par l'omoplate avec les mains jointes. Quelqu'un l'a maintenue au sol.",
            "Lügen. Wer nach vorne rutscht, wird nicht von hinten durch die Schulterblätter durchbohrt, während die Hände gefaltet sind. Jemand hielt sie fest.",
            "Ложь. Человек, поскользнувшись вперед, не упадет так, чтобы маятник пробил спину, пока руки аккуратно сложены. Ее держали силой.",
            "Bugie. Chi scivola in avanti non finisce trapassato da dietro le scapole con le mani composte. Qualcuno l'ha tenuta ferma.",
            "Mentira. Alguém que escorrega para frente não é empalado pelas costas com as mãos postas. Alguém a segurou.",
            "كذب صريح. من ينزلق للأمام لا يُطعن عبر لوحي كتفه من الخلف ويداه مضمومتان بعناية. أحدهم ثبتها قسرًا بينما كان الذراع الحديدي يهوي."
        ))
    ],
    'options': [
        tr('"Accident? Look at the wound entry angle. That is biomechanically impossible."', '"Kecelakaan? Lihat sudut masuk lukanya. Secara biomekanik itu mustahil."', '“意外？看看创口刺入的角度。从生物力学角度来看这绝不可能。”', '「事故だと？創口の刺入角を見ろ。生体力学的にあり得ない。」', '"사고요? 상처가 들어간 각도를 보시오. 생체역학적으로 불가능하오."', '"¿Accidente? Mira el ángulo de la herida. Es biomecánicamente imposible."', '"Un accident ? Regardez l\'angle de la plaie. C\'est biomécaniquement impossible."', '"Unfall? Sehen Sie sich den Einstichwinkel an. Das ist biomechanisch unmöglich."', '«Несчастный случай? Взгляни на угол раны. Биомеханически это невозможно.»', '"Incidente? Guarda l\'angolazione della ferita. È biomeccanicamente impossibile."', '"Acidente? Olhe o ângulo da ferida. Biomecanicamente impossível."', '"حادث؟ انظر لزاوية دخول الجرح، هذا مستحيل ميكانيكيًا وحيويًا."'),
        tr('"Who was the last person to see her alive?"', '"Siapa orang terakhir yang melihatnya hidup?"', '“最后一个见到她活着的人是谁？”', '「彼女の生前最後に会ったのは誰だ？」', '"마지막으로 피해자를 살아서 본 사람이 누구요?"', '"¿Quién fue la última persona en verla viva?"', '"Qui a été la dernière personne à la voir vivante ?"', '"Wer hat sie zuletzt lebend gesehen?"', '«Кто видел ее живой в последний раз?»', '"Chi è stata l\'ultima persona a vederla viva?"', '"Quem foi a última pessoa a vê-la viva?"', '"من كان آخر شخص رآها على قيد الحياة؟"'),
        tr('[Return to main inquiry]', '[Kembali ke penyelidikan utama]', '【返回主要询问】', '【本筋の捜査に戻る】', '[주요 심문으로 복귀]', '[Volver al interrogatorio principal]', '[Retourner à l\'enquête]', '[Zurück zur Hauptbefragung]', '[Вернуться к допросу]', '[Torna all\'indagine principale]', '[Retornar à investigação]', '[العودة للتحقيق الرئيسي]')
    ]
}

# 3. graves_rhetoric_win
D['graves_rhetoric_win'] = {
    'speaker': tr('Inspector Graves', 'Inspektur Graves', '格雷夫斯警探', 'グレイヴス警部', '그레이브스 형사', 'Inspector Graves', 'Inspecteur Graves', 'Inspektor Graves', 'Инспектор Грейвс', 'Ispettore Graves', 'Inspetor Graves', 'المفتش غريفز'),
    'text': tr(
        "Graves flinches, his jaw tightening around the matchstick. 'Lower your damn voice! A courier from the Grand Syndicate arrived at my flat at 02:00. He said Vance had stolen a prototype clockwork ledger. If we recover that ledger, there is a ten-thousand guilder bounty for both of us.'",
        "Graves tersentak, rahangnya mengetat di sekitar batang korek api. 'Kecilkan suaramu! Kurir dari Sindikat Agung datang ke flatku pukul 02:00. Katanya Vance mencuri prototipe buku besar alkimia. Jika kita mengamankannya, ada hadiah sepuluh ribu guilder untuk kita berdua.'",
        "格雷夫斯浑身一震，嘴里叼着的火柴棍几乎被咬断。“把你的嗓门压低点！凌晨两点，辛迪加财阀的密使敲响了我家公寓门。他说奥蕾莉亚偷走了一本绝密的机械炼金总账簿。只要我们帮他们找回那本账，你我能平分整整一万金币的巨额暗红悬赏！”",
        "グレイヴスはたじろぎ、咥えたマッチ軸を噛み締めた。「声を落とせ！午前2時、シンジケートの密使が俺のアパートに来たんだ。オレリアが試作台帳を盗み出したとよ。それを取り戻せば、山分けで1万ギルダーの賞金が手に入るんだよ！」",
        "그레이브스는 흠칫 놀라며 물고 있던 성냥을 바짝 깨물었습니다. '빌어먹을 목소리 낮춰! 새벽 2시에 신디케이트 밀사가 내 하숙집으로 찾아왔단 말이오. 밴스가 프로토타입 장부를 훔쳐 달아났다고 했소. 그 장부만 찾아내면 우리 둘에게 만 길더의 현상금이 떨어져!'",
        "Graves se encoge, apretando la cerilla entre los dientes. '¡Baja la maldita voz! Un mensajero del Gran Sindicato vino a mi piso a las dos. Dijo que Vance había robado un libro de contabilidad prototipo. Hay 10.000 florines de recompensa para los dos.'",
        "Graves tressaille, serrant l'allumette entre ses dents. 'Baissez d'un ton ! Un coursier du Grand Syndicat est venu chez moi à deux heures. Il a dit que Vance avait volé un registre secret. Si on le retrouve, il y a 10 000 florins de prime pour nous deux.'",
        "Graves zuckt zusammen und verbeißt das Streichholz. 'Stimme senken, verdammt! Um zwei Uhr nachts stand ein Bote des Syndikats vor meiner Tür. Vance habe ein Prototyp-Hauptbuch gestohlen. Finden wir es, winken uns zehntausend Gulden Belohnung.'",
        "Грейвс вздрагивает, стискивая зубами спичку. «Да тише ты! В два часа ночи ко мне заявился курьер Синдиката. Сказал, Вэнс украла секретный гроссбух. Если мы вернем его, получим по десять тысяч гульденов на брата!»",
        "Graves trasale, stringendo il fiammifero tra i denti. 'Abbassa la voce! Un corriere del Grande Sindacato è venuto da me alle due. Dice che la Vance ha rubato un mastro segreto. C'è una taglia da diecimila fiorini da spartire.'",
        "Graves estremece e morde o fósforo. 'Abaixe a voz! Um mensageiro do Grande Sindicato bateu no meu apartamento às duas da manhã. Disse que Vance roubou um livro protótipo. São 10.000 florins para nós dois.'",
        "جفل غريفز واشتد فكه حول عود الثقاب هامسًا بذعر: 'اخفض صوتك اللعين! جاءني مبعوث من النقابة الكبرى في شقتي في الثانية فجرًا وقال إن فانس سرقت دفتر حسابات خيميائي سري. إذا عثرنا عليه فثمة مكافأة عشرة آلاف غيلدر نقتسمها سويًا!'"
    ),
    'voices': [
        voice_item(V_ELYSIA, B_ELYSIA, tr(
            "Greed radiates off him like heat from a kiln. But he didn't kill Vance—he arrived too late and found her already cold.",
            "Keserakahan terpancar darinya bagai panas dari tungku pembakaran. Tapi dia tidak membunuh Vance—dia datang terlambat dan menemukannya sudah terbujur kaku.",
            "贪婪的气息如窑炉滚滚热浪般从他周身散发出来。但他并不是杀死奥蕾莉亚的凶手——他来迟了一步，赶到时尸体早已冰凉。",
            "強欲の熱気が陶芸窯のように彼から立ち込めている。だが彼が殺害犯ではない。駆けつけた時にはすでに冷たくなっていたのだ。",
            "가마솥 열기처럼 탐욕이 뿜어져 나옵니다. 하지만 그가 밴스를 살해한 것은 아닙니다. 도착했을 땐 이미 차갑게 식어 있었던 겁니다.",
            "La codicia irradia de él como calor de un horno. Pero no mató a Vance; llegó tarde y ya estaba fría.",
            "L'avidité rayonne de lui comme la chaleur d'un four. Mais il n'a pas tué Vance ; il est arrivé trop tard.",
            "Die Gier strahlt wie die Hitze eines Schmelzofens von ihm ab. Doch er ist nicht der Mörder; er kam zu spät.",
            "Жадность пышет от него, как жар от печи. Но он не убивал Вэнс — он пришел слишком поздно, когда она уже остыла.",
            "L'avidità si irradia da lui come il calore d'una fornace. Ma non ha ucciso la Vance: è arrivato troppo tardi.",
            "A ganância queima nele como o calor de uma fornalha. Mas não foi ele quem matou Vance: chegou tarde demais.",
            "يشع الطمع منه كحرارة الأفران المتأججة. لكنه لم يقتل فانس بل وصل متأخرًا ليجد جثتها قد بردت بالفعل."
        ))
    ],
    'options': [
        tr('"So this was never about an accident. Where is the ledger now?"', '"Jadi ini bukan soal kecelakaan. Di mana buku besar itu sekarang?"', '“所以这根本就不是意外事故。那本绝密账簿现在何处？”', '「やはり事故などではなかったな。台帳は今どこにある？」', '"결국 단순 사고 따위가 아니었군. 그 장부는 지금 어디 있소?"', '"Así que nunca fue un accidente. ¿Dónde está el libro ahora?"', '"Ce n\'a donc jamais été un accident. Où est ce registre ?"', '"Es war also nie ein Unfall. Wo ist das Hauptbuch jetzt?"', '«Значит, никакой это не несчастный случай. Где гроссбух сейчас?»', '"Quindi non è mai stato un incidente. Dov\'è il mastro adesso?"', '"Então nunca foi acidente. Onde está o livro agora?"', '"إذن لم يكن الأمر يومًا حادثًا عرضيًا. أين دفتر الحسابات الآن؟"'),
        tr('[Return to main inquiry]', '[Kembali]', '【返回】', '【戻る】', '[복귀]', '[Volver]', '[Retour]', '[Zurück]', '[Назад]', '[Torna]', '[Retornar]', '[عودة]')
    ]
}

# 4. graves_rhetoric_fail
D['graves_rhetoric_fail'] = {
    'speaker': tr('Inspector Graves', 'Inspektur Graves', '格雷夫斯警探', 'グレイヴス警部', '그레이브스 형사', 'Inspector Graves', 'Inspecteur Graves', 'Inspektor Graves', 'Инспектор Грейвс', 'Ispettore Graves', 'Inspetor Graves', 'المفتش غريفز'),
    'text': tr(
        "Graves laughs harshly, coughing into his fist. 'Don't play grand interrogator with me, partner. You don't even remember your own badge number after last night's binge. Check the body or let me do my job.'",
        "Graves tertawa getir sambil batuk. 'Jangan sok jadi detektif agung di depanku, sobat. Nomor lencanamu saja kamu lupa setelah mabuk semalam. Periksa mayat itu atau biarkan aku yang bekerja.'",
        "格雷夫斯从鼻腔里发出刺耳的冷笑，握拳抵在嘴边咳嗽了几声。“别在我面前摆大审讯官的臭架子了，搭档。昨晚狂灌了那么多马甲酒，你连自己的警徽编号都忘光了吧？去检查尸体，不然就闪一边让我干活。”",
        "グレイヴスは冷ややかに笑い、拳に咳を落とした。「偉そうに尋問官ぶるんじゃねえよ、相棒。昨夜の深酒で自分のバッジ番号すら忘れてるくせに。遺体を調べるか、俺に仕事をさせろ。」",
        "그레이브스는 메마른 헛기침과 함께 냉소했습니다. '나한테 위대한 심문관 흉내 내지 마시오, 이 양반아. 어젯밤 술고래 짓거리로 자기 배지 번호도 까먹은 주제에. 시체나 확인하든가, 내 일이나 방해 말든가 하시오.'",
        "Graves suelta una risa áspera y tose en su puño. 'No te hagas el gran inquisidor conmigo, colega. Ni siquiera recuerdas tu número de placa tras la cogorza de anoche. Revisa el cadáver o déjame trabajar.'",
        "Graves ricane d'un air méprisant et tousse dans son poing. 'Ne jouez pas les grands inquisiteurs avec moi. Vous ne vous souvenez même plus de votre matricule après votre cuite. Examinez le corps ou laissez-moi faire mon travail.'",
        "Graves lacht heiser auf und hustet in die Faust. 'Spielen Sie sich hier nicht als Chef-Ermittler auf, Kollege. Nach dem Vollrausch von gestern wissen Sie nicht mal Ihre Dienstnummer. Untersuchen Sie die Leiche oder lassen Sie mich arbeiten.'",
        "Грейвс сухо усмехается и кашляет в кулак. «Не строй из себя великого инквизитора, напарник. После вчерашней попойки ты даже номер своего жетона не помнишь. Осматривай труп или не мешай мне работать.»",
        "Graves ride amaramente e tossisce nel pugno. 'Non fare il grande inquisitore con me. Dopo la sbronza di ieri sera non ricordi nemmeno il numero del tuo distintivo. Esamina il corpo o lasciami lavorare.'",
        "Graves dá uma risada áspera e tosse no punho. 'Não se faça de grande inquisidor comigo, parceiro. Você nem lembra o número do seu distintivo depois da bebedeira de ontem. Examine o corpo ou me deixe trabalhar.'",
        "ضحك غريفز باستهزاء وسعل في قبضته: 'لا تمارس دور المحقق الأسطوري أمامي يا شريكي. أنت بالكاد تتذكر رقم شارتك بعد ثمالة ليلة أمس! افحص الجثة أو دعني أنجز عملي.'"
    ),
    'options': [
        tr('"Fine. Let me inspect the corpse."', '"Baiklah. Biarkan aku memeriksa jenazahnya."', '“好。我去检查遗体。”', '「いいだろう。遺体を検視する。」', '"좋소. 시신을 직접 확인하겠소."', '"Bien. Dejadme inspeccionar el cuerpo."', '"Bien. Laissez-moi examiner le cadavre."', '"Schön. Ich sehe mir die Leiche an."', '«Ладно. Пойду осмотрю труп.»', '"Va bene. Vado a esaminare il corpo."', '"Certo. Deixe-me examinar o corpo."', '"حسنًا، دعني أفحص الجثة بنفسي."')
    ]
}

# 5. graves_cigarette
D['graves_cigarette'] = {
    'speaker': tr('Inspector Graves', 'Inspektur Graves', '格雷夫斯警探', 'グレイヴス警部', '그레이브스 형사', 'Inspector Graves', 'Inspecteur Graves', 'Inspektor Graves', 'Инспектор Грейвс', 'Ispettore Graves', 'Inspetor Graves', 'المفتش غريفز'),
    'text': tr(
        "Graves tosses you a wrinkled cardboard box. 'Astra Red. Take one. You look like a walking cadaver.'",
        "Graves melemparkan kotak kardus kusut. 'Astra Merah. Ambil satu. Kamu terlihat seperti mayat hidup yang berjalan.'",
        "格雷夫斯漫不经心地抛过来一个皱巴巴的纸盒。“红阿斯特拉，抽一根吧。你现在的脸色简直就像一具活蹦乱跳的停尸房死尸。”",
        "グレイヴスは皺くちゃの紙箱を放り投げてきた。「アストラ・レッドだ。一本吸えよ。歩く死体みたいな顔色してるぞ。」",
        "그레이브스가 구겨진 담뱃갑을 툭 던집니다. '아스트라 레드요. 한 대 피우시오. 걸어 다니는 송장 꼴이구려.'",
        "Graves te lanza una cajetilla arrugada. 'Astra Rojo. Coge uno. Pareces un cadáver andante.'",
        "Graves vous lance un paquet froissé. 'Astra Rouge. Prenez-en une. Vous avez l'air d'un macchabée en marche.'",
        "Graves wirft eine zerknitterte Schachtel zu. 'Astra Rot. Nehmen Sie eine. Sie sehen aus wie eine wandelnde Leiche.'",
        "Грейвс бросает тебе помятую пачку. «Красная Астра. Возьми одну. Вид у тебя краше в гроб кладут.»",
        "Graves ti lancia un pacchetto sgualcito. 'Astra Rossa. Prendine una. Sembri un cadavere che cammina.'",
        "Graves joga um maço amassado. 'Astra Vermelho. Pegue um. Você parece um cadáver ambulante.'",
        "قذف إليك غريفز علبة سجائر مجعدة: 'أسترا الحمراء. خذ واحدة، وجهك يشبه جثة تمشي على قدمين.'"
    ),
    'options': [
        tr('[Blow smoke into the gloom and return]', '[Hembuskan asap ke dalam kegelapan menara dan kembali]', '【在阴暗钟楼中喷吐烟圈，回到调查】', '【薄暗い塔内に紫煙を吐き出し、捜査に戻る】', '[어둠 속에 연기를 내뿜으며 수사로 복귀]', '[Echar el humo en la penumbra y volver]', '[Souffler la fumée dans l\'obscurité et revenir]', '[Rauch in die Dunkelheit blasen und zurückkehren]', '[Выпустить дым в полумрак и вернуться]', '[Soffia il fumo nel buio e torna all\'indagine]', '[Soltar a fumaça na penumbra e retornar]', '[نفث الدخان في عتمة البرج والعودة للتحقيق]')
    ]
}

# 6. graves_debate_wound
D['graves_debate_wound'] = {
    'speaker': tr('Inspector Graves', 'Inspektur Graves', '格雷夫斯警探', 'グレイヴス警部', '그레이브스 형사', 'Inspector Graves', 'Inspecteur Graves', 'Inspektor Graves', 'Инспектор Грейвс', 'Ispettore Graves', 'Inspetor Graves', 'المفتش غريفز'),
    'text': tr(
        "Graves scowls, waving his lantern over the corpse. 'Maybe she fell from the upper gantry! Look, Detective, until you show me a second set of footprints or a weapon with someone else\'s fingerprints, the Captain wants this stamped as accidental death.'",
        "Graves merengut sambil melambaikan lenteranya. 'Mungkin dia jatuh dari lantai atas! Dengar Detektif, sampai kamu bisa menunjukkan jejak kaki kedua atau senjata dengan sidik jari orang lain, Kapten ingin kasus ini dicap sebagai kecelakaan.'",
        "格雷夫斯眉头紧锁，将防风灯在尸体上方晃了晃。“说不定她是从上层的悬空格栅回廊上失足坠落的！听着探长，除非你能找出第二套脚印，或者凶器上有第三方指纹，否则局长吩咐过，必须以意外结案。”",
        "グレイヴスは顔をしかめ、カンテラを遺体の上にかざした。「上層の通路から落ちたのかもしれねえだろ！いいか刑事、第二の足跡か指紋つきの凶器でも見せてくれない限り、警部は事故死の判子を捺したがってるんだよ。」",
        "그레이브스는 찌푸린 얼굴로 등불을 시신 위로 흔들었습니다. '위쪽 통로에서 떨어졌을 수도 있잖소! 형사 양반, 제2의 족적이나 다른 놈의 지문이 묻은 흉기를 찾아내기 전까진 서장님도 단순 사고사로 도장 찍길 원하고 있소.'",
        "Graves frunce el ceño agitando su linterna. '¡Quizás cayó de la pasarela superior! Mira, detective, a menos que me muestres segundas huellas o un arma con huellas dactilares ajenas, el capitán quiere esto sellado como accidente.'",
        "Graves se renfrogne en agitant sa lanterne. 'Peut-être est-elle tombée de la passerelle ! Écoutez, tant que vous n'avez pas de secondes empreintes ou une arme, le Capitaine veut classer cela en accident.'",
        "Graves finstert und schwenkt seine Lampe. 'Vielleicht stürzte sie vom oberen Steg! Hören Sie, solange Sie keine zweiten Fußspuren oder eine Tatwaffe mit fremden Fingerabdrücken haben, will der Captain einen Unfallbericht.'",
        "Грейвс хмурится и машет фонарем. «Может, она упала с верхних мостков! Слушай, пока ты не покажешь мне вторые следы или оружие с чужими отпечатками, капитан требует закрыть это как несчастный случай.»",
        "Graves si acciglia sventolando la lanterna. 'Forse è caduta dal camminamento superiore! Senti, finché non mi trovi un secondo paio d'impronte o un'arma colpevole, il Capitano vuole il timbro di morte accidentale.'",
        "Graves franze a testa balançando a lanterna. 'Talvez ela tenha caído da passarela! Ouça, até que você me mostre pegadas ou uma arma com digitais, o Capitão quer isso carimbado como acidente.'",
        "قطب غريفز حاجبيه ملوحًا بفانوسه: 'ربما سقطت من الممر العلوي! اسمع يا محقق، حتى تحضر لي أثر أقدام ثانية أو سلاحًا يحمل بصمات شخص آخر، يريد رئيس القسم ختم الملف كوفاة عرضية.'"
    ),
    'options': [
        tr('"I will find the evidence. Just stay out of my way."', '"Aku akan temukan buktinya. Menyingkirlah dari jalanku."', '“我会找出确凿铁证的。别挡我的道。”', '「必ず証拠を見つけ出す。邪魔をするな。」', '"내가 그 증거를 찾아내겠소. 걸리적거리지나 마시오."', '"Encontraré las pruebas. Solo no te metas en mi camino."', '"Je trouverai les preuves. Ne restez pas dans mon chemin."', '"Ich werde die Beweise finden. Gehen Sie mir nur aus dem Weg."', '«Я найду улики. Просто не стой у меня на пути.»', '"Troverò le prove. Tu non intralciarmi."', '"Eu encontrarei as provas. Apenas saia do meu caminho."', '"سأجد الدليل القاطع، فقط ابتعد عن طريقي."')
    ]
}

# 7. graves_last_seen
D['graves_last_seen'] = {
    'speaker': tr('Inspector Graves', 'Inspektur Graves', '格雷夫斯警探', 'グレイヴス警部', '그레이브스 형사', 'Inspector Graves', 'Inspecteur Graves', 'Inspektor Graves', 'Инспектор Грейвс', 'Ispettore Graves', 'Inspetor Graves', 'المفتش غريفز'),
    'text': tr(
        "'The widow. Madame Vivienne. She claims she brought him peppermint tea at midnight, then went down to the parish rectory for all-night vigil prayers. Convenient alibi, if you ask me.'",
        "'Sang janda. Nyonya Vivienne. Dia mengaku membawakan teh peppermint untuk Aurelia tengah malam tadi, lalu turun ke kapel untuk doa malam. Alibi yang sangat rapi jika kamu tanya pendapatku.'",
        "“是那位未亡人，薇薇安·梵斯夫人。她坚称自己在午夜时分给奥蕾莉亚送过一壶薄荷热茶，随后就径直下楼前往圣艾琳教区礼拜堂彻夜祈祷。要我说，这不在场证明未免编得太滴水不漏了。”",
        "「未亡人だ。ヴィヴィアン夫人さ。真夜中にペパーミントティーを届けた後、聖アイリーン教区の礼拝堂で徹夜の祈祷に出ていたと主張している。都合のいいアリバイだな。」",
        "\"미망인이오. 비비안 밴스 부인. 자정 무렵 피해자에게 페퍼민트 차를 가져다주고는, 밤샘 철야 기도를 하러 교구 사제관으로 내려갔다고 주장하고 있소. 참 편리한 알리바이 아니오?\"",
        "'La viuda. Madame Vivienne. Dice que le subió té de menta a medianoche y bajó a la capilla para una vigilia. Una coartada muy oportuna, si me preguntas.'",
        "'La veuve. Madame Vivienne. Elle prétend lui avoir apporté une tisane à minuit avant de descendre à la paroisse pour veiller en prières. Bien commode comme alibi.'",
        "'Die Witwe. Madame Vivienne. Sie behauptet, ihr um Mitternacht Pfefferminztee gebracht zu haben und dann zur Nachtwache in die Kapelle gegangen zu sein. Sehr bequemes Alibi.'",
        "«Вдова. Мадам Вивьен. Утверждает, что принесла ей мятный чай в полночь, а затем спустилась в часовню на всенощную молитву. Удобное алиби, если спросишь меня.»",
        "'La vedova. Madame Vivienne. Dice di averle portato il tè alla menta a mezzanotte, poi è scesa alla parrocchia per la veglia. Un alibi fin troppo comodo.'",
        "'A viúva. Madame Vivienne. Ela alega ter trazido chá de hortelã à meia-noite e descido para a capela para vigília. Álibi conveniente, se quer saber.'",
        "'الأرملة السيدة فيفيان. تدعي أنها أحضرت لها شاي النعناع عند منتصف الليل ثم نزلت لمصلى الكنيسة لصلاة قيام الليل. حجة غياب مريحة ومثيرة للشك إن سألتني.'"
    ),
    'options': [
        tr('"I should speak with Madame Vance directly."', '"Aku harus bicara langsung dengan Nyonya Vance."', '“我应该当面和薇薇安夫人谈谈。”', '「直接ヴィヴィアン夫人と話す必要があるな。」', '"비비안 부인과 직접 대면해 봐야겠군."', '"Hablaré con Madame Vance directamente."', '"Je devrais parler à Madame Vance directement."', '"Ich sollte direkt mit Madame Vance sprechen."', '«Мне нужно поговорить с мадам Вэнс лично.»', '"Dovrei parlare direttamente con Madame Vance."', '"Devo falar diretamente com Madame Vance."', '"يجب أن أستجوب السيدة فانس مباشرة."')
    ]
}

# 8. graves_ledger_hunt
D['graves_ledger_hunt'] = {
    'speaker': tr('Inspector Graves', 'Inspektur Graves', '格雷夫斯警探', 'グレイヴス警部', '그레이브스 형사', 'Inspector Graves', 'Inspecteur Graves', 'Inspektor Graves', 'Инспектор Грейвс', 'Ispettore Graves', 'Inspetor Graves', 'المفتش غريفز'),
    'text': tr(
        "'If I knew where it was, I wouldn\'t be freezing my kidneys off in this tower! Vance had a hidden floorboard safe somewhere beneath the secondary escapement. But the lock is an alchemical three-tumbler dial.'",
        "'Kalau aku tahu di mana tempatnya, aku tidak akan kedinginan sampai ke tulang di menara ini! Vance punya brankas tersembunyi di bawah lantai ruang escapement. Tapi kuncinya kombinasi tiga putaran alkimia.'",
        "“要是我知道账簿藏在哪，何苦在这冻死人的鬼钟楼里吹冷风！奥蕾莉亚在副擒纵齿轮下方的地板暗格里藏了个保险箱，但那把锁是三轮同心炼金密码盘，硬撬会触发自毁。”",
        "「隠し場所を知ってりゃ、こんな凍える塔で腎臓を痛めるまで突っ立っちゃいねえよ！ヴァンスは第二脱進機の下の床板に隠し金庫を持っていた。だが鍵は3つの回転盤を持つ錬金ダイヤルだ。」",
        "\"어디 있는지 알았다면 이 얼어붙을 탑에서 콩팥이 시리도록 서성였겠소? 밴스는 보조 탈진기 바닥 밑 어딘가에 비밀 금고를 숨겨뒀소. 하지만 잠금장치는 연금술식 3중 회전 다이얼이오.\"",
        "'¡Si supiera dónde está no me estaría helando aquí arriba! Vance tenía una caja fuerte bajo los tablones tras el escape secundario. Pero tiene una cerradura alquímica de tres diales.'",
        "'Si je savais où il est, je ne me gèlerais pas les reins ici ! Vance avait un coffre secret sous le plancher sous l'échappement. Mais le verrou est un cadran à trois disques alchimiques.'",
        "'Wüsste ich das, würde ich mir hier oben nicht die Nieren abfrieren! Vance hatte einen Bodentresor unter dem Werk. Doch das Schloss ist eine dreifache Alchemiedrehscheibe.'",
        "«Знал бы я, где он, не морозил бы тут почки! У Вэнс был тайник в полу под вторичным спуском. Но там алхимический сейф с тремя дисками.»",
        "'Se sapessi dov'è, non mi congelerei qui sopra! La Vance aveva una cassaforte nel pavimento sotto lo scappamento secondario. Ma ha un quadrante a tre dischi alchemici.'",
        "'Se eu soubesse, não estaria congelando meus rins aqui! Vance tinha um cofre no assoalho sob o escape. Mas a fechadura é um dial de três tambores alquímicos.'",
        "'لو كنت أعلم مكانه لما وقفت أتجمد بردا هنا! كان لدى فانس خزنة أرضية سرية تحت تروس التوازن لكن قفلها مركب من ثلاثة أقراص كيميائية دورانية.'"
    ),
    'options': [
        tr('"I\'ll inspect the floorboards."', '"Aku akan periksa papan lantainya."', '“我去搜查地板暗格。”', '「床板を調べてみる。」', '"바닥판을 살펴보겠소."', '"Inspeccionaré los tablones."', '"Je vais inspecter le plancher."', '"Ich werde die Dielen untersuchen."', '«Я осмотрю половицы.»', '"Ispezionerò le assi del pavimento."', '"Vou inspecionar o assoalho."', '"سأفحص ألواح الأرضية بنفسي."')
    ]
}

# 9. examine_pendulum_start
D['examine_pendulum_start'] = {
    'speaker': tr('Forensic Observation', 'Pengamatan Forensik & Monolog Batin', '法医观察与内心独白', '検死観察と内なる声', '법의학적 관찰과 내면의 독백', 'Observación Forense', 'Observation Médico-Légale', 'Forensische Beobachtung', 'Судебно-медицинский осмотр', 'Osservazione Forense', 'Observação Forense', 'الملاحظة الجنائية المجهرية'),
    'text': tr(
        "The body of Aurelia Vance is pinned like an insect against the brass counterweight. Her linen blouse is stiff with dried crimson. Strangely, the pool of coagulated blood is not directly underneath her—it forms a dark smear six paces toward the window.",
        "Jenazah Aurelia Vance terpaku bagai serangga pada beban kuningan pendulum. Blus linennya mengeras oleh darah yang mengering. Anehnya, genangan darah beku tidak berada persis di bawahnya—melainkan membentuk jejak seretan hitam enam langkah ke arah jendela.",
        "奥蕾莉亚·梵斯的尸体如同被针固定的甲虫标本，被死死钉在青铜配重块上。粗亚麻衬衣早已被风干的血渍浸透发硬。诡异的是，大滩凝固发黑的血泊并不在她身下——而是在六步开外朝着外凸窗户延伸的拖拽痕迹。",
        "オレリア・ヴァンスの遺体は、昆虫の標本のように真鍮の配重ブロックに縫い止められている。麻のブラウスは乾いた赤黒い血で固まっている。奇妙なことに、凝固した血だまりは真下ではなく、窓に向かって6歩ほどの引きずり痕を形成していた。",
        "오렐리아 밴스의 시신은 마치 핀에 꽂힌 곤충처럼 황동 평형추에 고정되어 있습니다. 리넨 블라우스는 굳어버린 피로 뻣뻣합니다. 기이하게도 굳은 핏자국은 바로 밑이 아니라 창가 쪽으로 여섯 걸음 떨어진 곳에서 짙은 끌림 자국을 그리고 있습니다.",
        "El cuerpo de Aurelia Vance está clavado como un insecto contra el contrapeso de latón. Su blusa de lino está rígida de sangre seca. Extrañamente, el charco coagulado está a seis pasos hacia la ventana.",
        "Le corps d'Aurelia Vance est épinglé tel un insecte contre le contrepoids en laiton. Sa blouse de lin est raidie de sang coagulé. Curieusement, la flaque de sang forme une traînée noire à six pas vers la fenêtre.",
        "Die Leiche von Aurelia Vance ist wie ein Insekt an das Messinggegengewicht gepinnt. Ihre Leinenbluse ist starr vor Blut. Seltsamerweise liegt die Blutlache sechs Schritte entfernt am Fenster.",
        "Тело Аурелии Вэнс приколото к латунному противовесу, словно бабочка. Льняная блуза заскорузла от крови. Странно, но лужа свернувшейся крови находится в шести шагах отсюда, у окна.",
        "Il corpo di Aurelia Vance è inchiodato come un insetto contro il contrappeso d'ottone. La camicetta è irrigidita dal sangue secco. Stranamente, la pozza coagulata forma una scia verso la finestra.",
        "O corpo de Aurelia Vance está cravado como um inseto no contrapeso de latão. A blusa de linho está dura de sangue seco. Estranhamente, a poça coagulada forma um rastro em direção à janela.",
        "جثة أوريليا فانس مثبتة كحشرة في مشبك ضد ثقل الموازنة النحاسي. قميصها متيبس بالدماء الجافة. والمثير للريبة أن بقعة الدم المتخثر الكبرى تبعد ست خطوات باتجاه النافذة كأثر سحل واضح."
    ),
    'voices': [
        voice_item(V_RATIO, B_RATIO, tr(
            "Hypostasis deduction: She did not die here on the pendulum. She was killed at the window sill, bled out, and her body was dragged and mounted onto the clock mechanism to make the stoppage seem like an accidental disaster.",
            "Deduksi hipostasis: Korban tidak mati di sini. Dia dibunuh di dekat jendela, kehabisan darah, lalu diseret dan dipasang ke mekanisme jam agar penghentian pendulum tampak seperti kecelakaan.",
            "尸斑重力推演：她的真正死因绝非钟摆压迫。她是在窗台边遇刺身亡、流尽鲜血后，尸体才被凶手拖过来固定在齿轮配重上的，企图制造机械事故假象！",
            "死斑の推論：彼女は振り子の上で死んだのではない。窓際で殺害されて失血死した後、機械事故に見せかけるため遺体を運んで固定したのだ。",
            "시반 추론: 피해자는 시계추 위에서 죽은 것이 아닙니다. 창턱에서 살해당해 피를 흘린 뒤, 시계 정지를 사고처럼 꾸미기 위해 시신을 이곳으로 끌고 와 매달아 놓은 것입니다.",
            "Deducción de hipóstasis: No murió aquí en el péndulo. Fue asesinada en la ventana, se desangró y su cuerpo fue arrastrado y montado para simular un accidente.",
            "Déduction d'hypostase : Elle n'est pas morte sur ce balancier. Elle a été tuée près de la fenêtre, puis son corps a été traîné et monté ici pour simuler un accident.",
            "Livores-Deduktion: Sie starb nicht am Pendel. Sie wurde an der Fensterbank getötet, blutete aus, und ihre Leiche wurde hergeschleift, um einen Unfall vorzutäuschen.",
            "Трупные пятна не врут: она умерла не на маятнике. Ее убили у окна, она истекла кровью, а затем тело приволокли сюда для инсценировки несчастного случая.",
            "Deduzione dell'ipostasi: Non è morta sul pendolo. È stata uccisa al davanzale, e il corpo è stato trascinato e montato qui per simulare un disastro accidentale.",
            "Dedução de hipóstase: Ela não morreu no pêndulo. Foi morta junto à janela, sangrou até morrer e foi arrastada para cá para forjar um acidente mecânico.",
            "استنتاج علمي: لم تمت الضحية هنا على البندول بل قُتلت بجوار حافة النافذة ونزفت حتى الموت، ثم سُحلت جثتها ورُكبت على ثقل الساعة لتزييف الحادث العرضي."
        ))
    ],
    'options': [
        tr('[PERCEPTION - Challenging 12] Pry open her frozen right hand to see what she clenched before dying.', '[PERSEPSI - Sulit 12] Buka paksa tangan kanannya yang membeku untuk melihat apa yang digenggamnya sebelum mati.', '【五感敏锐 - 困难 12】掰开她僵硬痉挛的右手，看清她在临死前死死攥着什么。', '【知覚 - 困難 12】死の直前に握りしめたものを確かめるため、硬直した右手をこじ開ける。', '[지각 - 난이도 12] 죽기 직전 쥐고 있던 것을 확인하기 위해 굳어버린 오른손을 억지로 벌린다.', '[PERCEPCIÓN - Difícil 12] Abrir su mano derecha congelada para ver qué apretaba antes de morir.', '[PERCEPTION - Difficile 12] Forcer sa main droite figée pour voir ce qu\'elle serrait avant de mourir.', '[WAHRNEHMUNG - Schwer 12] Ihre verkrampfte rechte Hand aufbrechen, um zu sehen, was sie festhielt.', '[ВОСПРИЯТИЕ - Сложно 12] Разжать ее окоченевшую правую руку и посмотреть, что она сжимала перед смертью.', '[PERCEZIONE - Difficile 12] Apri la sua mano destra congelata per vedere cosa stringeva prima di morire.', '[PERCEPÇÃO - Difícil 12] Forçar a mão direita congelada para ver o que ela segurava ao morrer.', '[الإدراك الحسي - صعب 12] فتح قبضتها اليمنى المتشنجة لمعرفة ما كانت تقبض عليه قبل أن تلفظ أنفاسها الأخيرة.'),
        tr('[ESOTERICA - Medium 10] Study the strange geometric incision carved into her collarbone.', '[ESOTERIKA - Sedang 10] Teliti ukiran geometris aneh yang tergores di tulang selangkanya.', '【秘教学 - 普通 10】仔细研究刻在她锁骨处怪异的几何炼金符号切口。', '【秘教 - 中等 10】鎖骨に刻まれた奇妙な幾何学的刻印を考察する。', '[오컬트 - 보통 10] 쇄골에 새겨진 기이한 기하학적 절개 문양을 조사한다.', '[ESOTÉRICA - Medio 10] Estudiar la extraña incisión geométrica tallada en su clavícula.', '[ÉSOTÉRISME - Moyen 10] Étudier l\'étrange incision géométrique gravée sur sa clavicule.', '[ESOTERIK - Mittel 10] Die seltsame geometrische Einritzung an ihrem Schlüsselbein studieren.', '[ЭЗОТЕРИКА - Средне 10] Изучить странные геометрические надрезы на ее ключице.', '[ESOTERISMO - Medio 10] Studia la strana incisione geometrica intagliata sulla sua clavicola.', '[ESOTERISMO - Médio 10] Analisar a estranha incisão geométrica gravada em sua clavícula.', '[الباطنية والرموز - متوسط 10] دراسة النقش الهندسي الغريب المحفور بدقة على عظم ترقوتها.'),
        tr('[Step back from the corpse]', '[Mundur dari jenazah]', '【从尸体旁退后】', '【遺体から離れる】', '[시신에서 물러선다]', '[Apartarse del cadáver]', '[S\'éloigner du cadavre]', '[Von der Leiche zurücktreten]', '[Отойти от тела]', '[Allontanati dal cadavere]', '[Afastar-se do cadáver]', '[الابتعاد عن الجثة]')
    ]
}

# 10. pendulum_gear_crush
D['pendulum_gear_crush'] = {
    'speaker': tr('Mechanical Hazard', 'Bahaya Mekanik', '机械齿轮危机', '機械仕掛けの危険', '기계 장치 위협', 'Peligro Mecánico', 'Danger Mécanique', 'Gefahr im Getriebe', 'Механическая ловушка', 'Pericolo Meccanico', 'Perigo Mecânico', 'خطر ميكانيكي داهم'),
    'text': tr(
        "You lean too close to the oscillating gear train. A brass spur catches your sleeve, violently jerking you toward the teeth! You wrench yourself free just in time (-1 Health)!",
        "Kamu membungkuk terlalu dekat ke susunan roda gigi yang berosilasi. Roda gigi kuningan menyambar lengan bajumu, menyentakmu ke arah gerigi tajam! Kamu berhasil melepaskan diri tepat waktu (-1 Daya Tahan)!",
        "你靠得太近，转动的高速齿轮猛地绞住了你的风衣袖口！巨大的咬合力将你整个人往绞肉齿轮里猛拽，千钧一发之际你奋力扯断布料脱险（-1 生命值）！",
        "振動する歯車列に身を乗り出しすぎた。真鍮の突起が袖を捉え、鋭い歯車へ引きずり込もうとする！間一髪で引き剥がしたが腕を痛めた（体力 -1）！",
        "회전하는 기어 축에 너무 가까이 다가갔습니다. 황동 톱니가 소매를 낚아채며 톱니 속으로 무섭게 끌어당깁니다! 필사적으로 찢고 빠져나왔습니다 (-1 체력)!",
        "Te inclinas demasiado. ¡Un diente de latón atrapa tu manga tirando de ti hacia los engranajes! Te liberas en el último segundo (-1 Salud).",
        "Vous vous penchez trop près. Une dent en laiton happe votre manche et vous tire vers le broyeur ! Vous vous dégagez de justesse (-1 Santé).",
        "Sie beugen sich zu weit vor. Ein Messingzahn erfasst Ihren Ärmel und zerrt Sie ins Räderwerk! Sie reißen sich los (-1 Gesundheit).",
        "Ты наклоняешься слишком близко. Зубец шестерни цепляет рукав и дергает в мясорубку механизма! Едва вырываешься (-1 Здоровье).",
        "Ti sporgi troppo. Un dente d'ottone aggancia la manica e ti trascina verso gli ingranaggi! Ti liberi a stento (-1 Salute).",
        "Você se inclina demais. Um dente de latão puxa sua manga em direção às engrenagens! Você se solta no último instante (-1 Saúde).",
        "اقتربت أكثر من اللازم من التروس الدوارة فعلق كم معطفك بأسنان الترس وسحبك بقوة نحو المحور المسنن! انتزعت نفسك بأعجوبة متألمًا (-1 صحة)!"
    ),
    'options': [
        tr('"That was reckless of me."', '"Tindakan yang ceroboh."', '“刚才太鲁莽了。”', '「軽率だったな。」', '"경솔했군."', '"Eso fue imprudente."', '"C\'était imprudent."', '"Das war leichtsinnig."', '«Это было неосторожно.»', '"È stata un\'imprudenza."', '"Isso foi imprudente."', '"كان ذلك تصرفًا طائشًا مني."')
    ]
}

# 11. pendulum_pry_win
D['pendulum_pry_win'] = {
    'speaker': tr('Forensic Discovery', 'Temuan Forensik Krusial', '法医关键突破', '検死の決定的発見', '결정적 법의학 발견', 'Descubrimiento Forense', 'Découverte Cruciale', 'Forensischer Durchbruch', 'Важная находка', 'Scoperta Forense', 'Descoberta Forense', 'اكتشاف جنائي حاسم'),
    'text': tr(
        "With a sharp snap of dried tendons, her fingers yield. Resting inside her palm is a carved ivory chess piece: a Black Queen with a silver needle embedded in its base. The needle tip is stained with a bitter, sweet-smelling violet residue.",
        "Dengan bunyi kertak dari urat yang kaku, jemarinya terbuka. Di dalam telapak tangannya terdapat sebuah bidak catur gading hitam: Ratu Hitam dengan jarum perak terpasang di dasarnya. Ujung jarum berlumur residu ungu berbau manis yang mematikan.",
        "伴随肌腱干瘪脆断的咔哒声，她的手指终于被掰开。掌心中静卧着一枚雕刻精细的黑色象牙国际象棋王后棋子——底座暗藏一根中空银针，针尖还附着带有甜杏仁味的深紫色剧毒残留物！",
        "腱が軋む鋭い音とともに指が開いた。掌に収まっていたのは彫刻された黒い象牙のチェス駒——底面に銀の針が仕込まれた黒のクイーンだった。針先には甘い匂いのする致死性の紫色の残渣が付着している。",
        "굳은 힘줄이 뚝 부러지는 소리와 함께 손가락이 열렸습니다. 손바닥 안에 정교한 상아 체스 말이 놓여 있었습니다. 바닥에 은침이 박힌 검은 퀸이었습니다. 바늘 끝에는 달콤한 냄새를 풍기는 보랏빛 독약 찌꺼기가 묻어 있었습니다.",
        "Con un chasquido de tendones secos, sus dedos ceden. En su palma yace una reina de ajedrez de marfil negro con una aguja de plata en su base, manchada de veneno dulce.",
        "Dans un craquement de tendons, ses doigts cèdent. Au creux de sa paume repose une dame d'échecs en ivoire : une reine noire à l'aiguille d'argent imprégnée de poison.",
        "Mit einem Knacken der Sehnen öffnen sich die Finger. In der Handfläche liegt eine Elfenbeinschachfigur: eine schwarze Dame mit einer vergifteten Silbernadel im Sockel.",
        "С сухим треском сухожилий пальцы разжимаются. На ладони лежит фигура черного ферзя из слоновой кости. В основание вмонтирована серебряная игла с ядовитым фиолетовым налетом.",
        "Con uno scatto di tendini secchi, le dita cedono. Nel palmo giace una regina di scacchi d'avorio nero con un ago d'argento avvelenato nella base.",
        "Com um estalo dos tendões secos, os dedos cedem. Na palma jaz uma rainha de xadrez de marfim negro com uma agulha de prata envenenada na base.",
        "بصوت طقطقة جافة انفرجت أصابعها لتكشف داخل راحة يدها عن قطعة شطرنج عاجية سوداء: الملكة السوداء وفي قاعدتها إبرة فضية مجوفة ملوثة ببقايا مادة بنفسجية حلوة الرائحة وفتاكة."
    ),
    'options': [
        tr('"The killer didn\'t use brute force. They used a parlor trick."', '"Pembunuhnya tidak memakai kekerasan fisik. Mereka menggunakan trik sulap beracun."', '“凶手根本没有使用暴力。这是一场精密伪装的淬毒魔术戏法。”', '「力づくの犯行ではない。毒仕掛けの手品を使ったのだ。」', '"범인은 물리력을 쓰지 않았소. 정교한 독침 트릭을 쓴 거지."', '"El asesino no usó fuerza bruta. Usó un truco envenenado."', '"Le tueur n\'a pas usé de force brute. C\'était un tour empoisonné."', '"Der Mörder nutzte keine rohe Gewalt, sondern einen Gifttrick."', '«Убийца не применял грубую силу. Это был смертельный трюк с ядом.»', '"L\'assassino non ha usato la forza bruta. Ha usato un trucco velenoso."', '"O assassino não usou força bruta. Usou um truque venenoso."', '"لم يستخدم القاتل القوة البدنية، بل استخدم خدعة ألاعيب مسمومة خبيثة."'),
        tr('[Close]', '[Tutup]', '【合拢手掌并收起证物】', '【証拠を収めて閉じる】', '[닫기]', '[Cerrar]', '[Fermer]', '[Schließen]', '[Закрыть]', '[Chiudi]', '[Fechar]', '[إغلاق]')
    ]
}

# 12. pendulum_pry_fail
D['pendulum_pry_fail'] = {
    'speaker': tr('Forensic Attempt', 'Kegagalan Otopsi', '强行掰扯受挫', '検死の失敗', '부검 시도 실패', 'Intento Forense Fallido', 'Tentative Ratée', 'Misslungener Versuch', 'Неудачная попытка', 'Tentativo Fallito', 'Tentativa Fracassada', 'محاولة فحص فاشلة'),
    'text': tr(
        "The cadaveric spasm is like cast iron. As you force her fingers, a concealed needle pricks your index finger, burning your flesh with neurotoxin (-2 Health, -1 Morale)!",
        "Spasme mayat sangat kaku. Saat kamu memaksa membuka jemarinya, jarum beracun yang tersembunyi menyengat jarimu! Kamu tersentak kesakitan saat racun membakar kulitmu (-2 Daya Tahan, -1 Kewarasan).",
        "死后痉挛硬如生铁。当你试图强行掰开她的手指时，暗藏的毒针猛地刺破了你的食指！剧烈的神经毒素如熔融铅水般灼烧你的血管（-2 生命值，-1 士气）！",
        "死後痙攣は鋳鉄のように硬い。無理に指を開こうとした瞬間、隠された針が人差し指を刺し、神経毒が肉を焼き焦がす（体力 -2、正気度 -1）！",
        "시체 경직이 주철처럼 단단합니다. 억지로 손가락을 펴려던 찰나, 숨겨진 바늘이 검지손가락을 찔러 신경독이 타오르듯 퍼집니다 (-2 체력, -1 사기)!",
        "El espasmo cadavérico es como hierro fundido. Al forzar los dedos, una aguja oculta pincha tu índice, quemando tu carne con neurotoxina (-2 Salud, -1 Moral).",
        "Le spasme cadavérique est dur comme du fer. En forçant les doigts, une aiguille cachée pique votre index et vous brûle de neurotoxine (-2 Santé, -1 Moral).",
        "Der Leichenkrampf ist wie Gusseisen. Beim Aufbiegen sticht eine Nadel in Ihren Zeigefinger und brennt mit Neurotoxin (-2 Gesundheit, -1 Moral)!",
        "Трупное окоченение словно железо. Ты силой давишь на пальцы, и скрытая игла впивается тебе в руку, обжигая нейротоксином (-2 Здоровье, -1 Мораль)!",
        "Lo spasmo cadaverico è duro come ghisa. Forzando le dita, un ago nascosto ti punge l'indice, bruciandoti col neurotossico (-2 Salute, -1 Morale).",
        "O espasmo cadavérico é como ferro. Ao forçar os dedos, uma agulha escondida fura seu indicador com neurotoxina (-2 Saúde, -1 Moral)!",
        "التشنج الجنائوي صلب كالفولاذ، وحين حاولت إجبار أصابعها على الفتح انطلقت إبرة خفية فوخزت سبابتك بحرقة السم العصبي (-2 صحة، -1 معنويات)!"
    ),
    'options': [
        tr('"Damn my trembling hands..."', '"Sialan! Tangan terkutuk ini dipasangi perangkap!"', '“该死……这双手里竟装着防拆陷阱！”', '「くそっ、手が罠になっていたとは……」', '"빌어먹을 손에 함정이 설치되어 있었군..."', '"¡Maldición, mis manos temblorosas!"', '"Maudites mains tremblantes..."', '"Verdammt, diese Hände waren eine Falle..."', '«Черт побери... ее рука была заминирована ядом!»', '"Maledette mani tremanti..."', '"Droga de mãos trêmulas..."', '"سحقًا! كانت يدها مفخخة بسم خبيث!"')
    ]
}

# 13. pendulum_esoterica_win
D['pendulum_esoterica_win'] = {
    'speaker': tr('Occult Deduction', 'Deduksi Okultisme Horologis', '钟表秘教玄学推演', '時計神秘主義の推論', '오컬트 시계학적 추론', 'Deducción Oculta', 'Déduction Occulte', 'Okkulte Deduktion', 'Оккультная дедукция', 'Deduzione Occulta', 'Dedução Oculta', 'استنتاج الطوائف الباطنية'),
    'text': tr(
        "Beneath the blood-crusted collar lies an alchemical mark: a circle quartered by three intersecting crescents. The seal of 'The Order of the Pale Meridian'—a secret cabal of horologists who believed time itself could be reversed through mechanical resonance.",
        "Di balik kerahnya yang berlumuran darah terdapat segel alkimia: lingkaran yang dibelah oleh tiga bulan sabit bersilangan. Simbol 'Ordo Meridian Pucat'—perkumpulan rahasia para pembuat jam yang percaya aliran waktu dapat dibalikkan melalui resonansi mekanik.",
        "在血痂凝结的领口之下，显露出一枚暗红色的炼金秘印：一个被三道交错新月切分的正圆。这是“苍白子午线密教”的古老徽章——一个狂热相信只要实现特定的机械共振，就能彻底倒流时间因果的隐秘钟表师教团！",
        "血にまみれた襟の下に錬金術の刻印が現れた。交差する3つの三日月に四分された円盤。機械の共鳴によって時間そのものを逆転できると信じる時計師カルト「蒼白の子午線教団」の証印だ。",
        "피 묻은 옷깃 아래 연금술 표식이 숨겨져 있었습니다. 세 개의 초승달이 교차하는 원형 인장. 기계적 공명을 통해 시간 자체를 되돌릴 수 있다고 믿는 비밀 시계 결사단 '창백한 자오선 교단'의 인장이었습니다.",
        "Bajo el cuello ensangrentado hay una marca alquímica: un círculo cortado por tres lunas crecientes. El sello de la 'Orden del Meridiano Pálido', que creía poder invertir el tiempo.",
        "Sous le col ensanglanté gît une marque alchimique : un cercle divisé par trois croissants. Le sceau de 'L'Ordre du Méridien Pâle', persuadé de pouvoir inverser le temps.",
        "Unter dem Kragen liegt ein alchemistisches Zeichen: ein von drei Mondsicheln geteilter Kreis. Das Siegel des 'Ordens des Bleichen Meridians', der die Zeit umkehren wollte.",
        "Под окровавленным воротником скрыт алхимический символ: круг с тремя полумесяцами. Печать «Ордена Бледного Меридиана» — тайного культа часовщиков, веривших в обращение времени вспять.",
        "Sotto il colletto insanguinato giace un marchio alchemico: un cerchio tagliato da tre mezzelune. Il sigillo dell''Ordine del Meridiano Pallido', che credeva di poter invertire il tempo.",
        "Sob o colarinho ensanguentado repousa uma marca alquímica: o selo da 'Ordem do Meridiano Pálido', que acreditava na reversão do tempo através da ressonância.",
        "تحت ياقة قميصها الملطخ بالدم يكمن نقش كيميائي: دائرة تقطعها ثلاثة أهلة متقاطعة، إنه ختم 'طائفة خط الزوال الشاحب' السرية التي اعتقدت إمكانية عكس انسياب الزمن بالرنين الميكانيكي."
    ),
    'options': [
        tr('"She was trying to build a machine that could un-live hours."', '"Dia sedang merakit mesin yang dapat memutar balik waktu."', '“她竟在试图制造一台能倒流光阴的疯狂永动机……”', '「彼女は過去の時を巻き戻す機械を造ろうとしていたのか。」', '"시간을 되돌리는 기계를 만들려 했던 거요."', '"Estaba intentando construir una máquina para des-vivir las horas."', '"Elle tentait de construire une machine pour remonter le temps."', '"Sie versuchte, eine Maschine zu bauen, die Stunden rückgängig macht."', '«Она пыталась создать машину, способную повернуть время вспять.»', '"Stava cercando di costruire una macchina capace di riavvolgere il tempo."', '"Ela estava tentando construir uma máquina para retroceder o tempo."', '"كانت تحاول بناء آلة خارقة تسترجع الساعات الضائعة في الماضي."')
    ]
}

# 14. pendulum_esoterica_fail
D['pendulum_esoterica_fail'] = {
    'speaker': tr('Occult Deduction', 'Deduksi Buntu', '秘教解读毫无头绪', '神秘解読の行き詰まり', '오컬트 해석 실패', 'Deducción Frustrada', 'Impasse Occulte', 'Rätselhafte Runen', 'Оккультный тупик', 'Deduzione Frustrata', 'Impasse Oculto', 'غموض الرموز'),
    'text': tr(
        "The scratches look like random surgical cuts or lacerations from broken clock springs. You cannot make sense of the geometry; it just produces a throbbing headache in your temples.",
        "Goresan itu tampak seperti luka acak akibat pecahan pegas jam. Kamu tidak bisa memahami geometrinya; kepalamu hanya berdenyut nyeri.",
        "这些划痕看起来不过是崩断的发条碎片造成的混乱切口。你完全无法看穿其背后的几何逻辑，太阳穴深处只传来阵阵宿醉般的偏头痛。",
        "傷痕は壊れた時計ゼンマイによる無秩序な裂傷にしか見えない。幾何学の意味を掴めず、こめかみに鋭い頭痛が走るだけだ。",
        "상처는 부러진 시계 태엽에 긁힌 무작위 흉터처럼 보입니다. 기하학적 의미를 도무지 해독할 수 없으며 관자놀이가 지끈거리기만 합니다.",
        "Los arañazos parecen cortes aleatorios de resortes rotos. No logras entender la geometría; solo te produce un dolor punzante en las sienes.",
        "Les éraflures ressemblent à de banales entailles causées par des ressorts brisés. Impossible d'en tirer un sens géométrique.",
        "Die Kratzer wirken wie Schnittwunden von geborstenen Federn. Sie können der Geometrie keinen Sinn entlocken; die Schläfen pochen nur.",
        "Царапины кажутся случайными порезами от лопнувших пружин. Ты не видишь смысла в этих линиях, только виски ломит от боли.",
        "I graffi sembrano tagli casuali causati da molle spezzate. Non riesci a cogliere la geometria; ricavi solo un forte mal di testa.",
        "Os arranhões parecem cortes de molas partidas. Você não consegue decifrar a geometria, apenas ganha uma dor de cabeça.",
        "تبدو الخدوش كجروح عشوائية ناجمة عن زنبركات محطمة ولم تستطع استيعاب هندستها بل أصابك صداع نابض في صدغيك."
    ),
    'options': [
        tr('[Blink and look away]', '[Kedipkan mata dan berpaling]', '【眨眼揉额，移开目光】', '【瞬きをして視線を逸らす】', '[눈을 깜빡이며 시선을 돌린다]', '[Parpadear y apartar la vista]', '[Cligner des yeux et détourner le regard]', '[Blinzeln und wegschauen]', '[Моргнуть и отвести взгляд]', '[Sbatti le palpebre e guarda altrove]', '[Piscar e desviar o olhar]', '[إشاحة النظر وفرك العينين]')
    ]
}

# 15. examine_watch_start
D['examine_watch_start'] = {
    'speaker': tr('The Alchemical Watch', 'Jam Saku Alkimia', '金黄炼金怀表', '錬金術的懐中時計', '연금술 회중시계', 'El Reloj Alquímico', 'La Montre Alchimique', 'Die Alchemistische Taschenuhr', 'Алхимические карманные часы', 'L\'Orologio Alchemico', 'O Relógio Alquímico', 'ساعة الجيب الخيميائية'),
    'text': tr(
        "The gold pocket watch lies on the catwalk. The crystal face is spiderwebbed with cracks, frozen at 03:42. A faint ticking sound emanates from within, even though the hands are motionless.",
        "Jam saku emas tergeletak di lantai. Kaca kristalnya retak membentuk pola sarang laba-laba, mati tepat pada pukul 03:42. Suara detak samar terdengar dari dalam, meski jarumnya membeku tanpa gerak.",
        "这块金质怀表遗落在走道木板上。表盘水晶玻璃碎裂成蛛网状，指针永久定格在凌晨03:42分。诡异的是，尽管齿轮指针纹丝不动，表壳深处却依旧传来空洞微弱的咔哒走时声。",
        "金の懐中時計が通路に落ちている。風防ガラスは蜘蛛の巣状にひび割れ、03:42で停止している。針が止まっているにもかかわらず、内部から微かなチクタクという音が響く。",
        "황금 회중시계가 바닥에 떨어져 있습니다. 유리면은 거미줄처럼 금이 가 있고 03:42에 멈춰 있습니다. 바늘이 꼼짝도 하지 않는데도 내부에서 희미한 째깍거림이 울려 나옵니다.",
        "El reloj de bolsillo de oro yace en el suelo. El cristal está agrietado en telaraña, congelado a las 03:42. Un leve tictac emana del interior.",
        "La montre à gousset en or gît sur la passerelle. Son verre est étoilé de fissures, figé à 03h42. Un tic-tac sourd s'en échappe.",
        "Die goldene Taschenuhr liegt auf dem Steg. Das Glas ist zersprungen, die Zeiger stehen auf 03:42 Uhr. Dennoch tickt es leise im Inneren.",
        "Золотые карманные часы лежат на мостках. Стекло покрыто паутиной трещин, стрелки замерли на 03:42. Но изнутри доносится слабое тиканье.",
        "L'orologio d'oro giace sulle assi. Il cristallo è incrinato a ragnatela, fermo alle 03:42. Un debole ticchettio echeggia dall'interno.",
        "O relógio de ouro jaz na passarela. O cristal está trincado, congelado às 03:42. Um tique-taque fraco ecoa de dentro.",
        "ساعة الجيب الذهبية ملقاة على الممشى وزجاجها مشروخ كنسيج العنكبوت ومتوقفة عند 03:42 تمامًا. ومع ذلك تنبعث منها دقات خافتة غريبة رغم سكون العقارب."
    ),
    'options': [
        tr('[INTERFACING - Medium 11] Pop open the back casing with your thumbnail to examine the inner movement.', '[PENYELARASAN - Sedang 11] Buka penutup belakangnya untuk memeriksa mekanisme di dalamnya.', '【器械交互 - 普通 11】用指甲挑开后盖卡扣，仔细检视内部的精细机芯构造。', '【連動調整 - 中等 11】親指の爪で裏蓋を弾き開け、内部のムーブメントを調べる。', '[기계연동 - 보통 11] 엄지손톱으로 뒷뚜껑을 열어 내부 무브먼트를 조사한다.', '[INTERACCIÓN - Medio 11] Abrir la tapa trasera para examinar el mecanismo interno.', '[INTERFAÇAGE - Moyen 11] Faire sauter le couvercle arrière pour examiner le mécanisme.', '[BEDIENUNG - Mittel 11] Den Rückdeckel aufdrücken, um das Uhrwerk zu untersuchen.', '[ИНТЕРФЕЙС - Средне 11] Поддеть заднюю крышку ногтем и осмотреть часовой механизм.', '[INTERFACCIAMENTO - Medio 11] Apri il fondello posteriore per esaminare il meccanismo.', '[INTERAÇÃO - Médio 11] Abrir a tampa traseira para examinar o mecanismo interno.', '[التعامل الحركي - متوسط 11] فتح الغطاء الخلفي بظفرك لفحص حركة التروس الدقيقة بالداخل.'),
        tr('[Step back]', '[Mundur]', '【收手后退】', '【後退する】', '[물러선다]', '[Retroceder]', '[Reculer]', '[Zurücktreten]', '[Отойти]', '[Indietggia]', '[Recuar]', '[التراجع]')
    ]
}

# 16. watch_open_win
D['watch_open_win'] = {
    'speaker': tr('Mechanical Revelations', 'Rahasia Mekanik Terbuka', '机械秘辛大白', '暴かれた機械の秘密', '기계적 비밀 규명', 'Revelación Mecánica', 'Révélation Mécanique', 'Mechanische Enthüllung', 'Секрет механизма', 'Rivelazioni Meccaniche', 'Revelações Mecânicas', 'أسرار الميكانيكا المكشوفة'),
    'text': tr(
        "The back plate clicks open with a sweet brass resonance. Inside, engraved into the gold balance cock, is a cipher code: 'V.V. - 7-3-12 - SHE HAS THE CIPHER KEY'. Underneath the balance spring is a miniature portrait of Madame Vivienne Vance, taken thirty years ago when she was an actress in the Grand Opera.",
        "Pelat belakang terbuka dengan dentang kuningan yang merdu. Di dalam, terukir sandi rahasia: 'V.V. - 7-3-12 - KUNCI BRANKAS HOROLOGIS'. Di bawah roda keseimbangan terdapat potret miniatur Nyonya Vivienne Vance dari tiga puluh tahun lalu.",
        "后盖伴随清脆甜美的黄铜鸣响应声弹开。摆轮夹板上深深刻着一行密码密文：“V.V. - 7-3-12 - 她掌握着解密密钥”。在摆轮游丝下方，镶嵌着一幅三十年前薇薇安·梵斯在皇家歌剧院登台时的精致微缩肖像！",
        "真鍮の快い共鳴音とともに裏蓋が開いた。テンプ受けには暗号が刻まれていた。「V.V. - 7-3-12 - 彼女が暗号鍵を持つ」。ゼンマイの下には30年前のヴィヴィアン夫人の肖像画が納められていた。",
        "황동의 경쾌한 소리와 함께 뒷판이 열렸습니다. 밸런스 콕에 암호가 새겨져 있었습니다. 'V.V. - 7-3-12 - 그녀가 암호 열쇠를 쥐고 있다'. 헤어스프링 밑에는 30년 전 대극단 배우 시절 비비안의 초상화가 들어 있었습니다.",
        "La tapa trasera se abre con un chasquido. Dentro, grabado en el volante, hay un código: 'V.V. - 7-3-12 - TIENE LA LLAVE'. Bajo el resorte hay un retrato de Vivienne de hace 30 años.",
        "Le boîtier s'ouvre d'un clic. À l'intérieur, gravé sur le coq, figure un code : 'V.V. - 7-3-12 - ELLE A LA CLÉ'. Sous le spiral se trouve un portrait de Vivienne il y a trente ans.",
        "Der Deckel klickt auf. Eingraviert ist ein Code: 'V.V. - 7-3-12 - SIE HAT DEN SCHLÜSSEL'. Unter der Unruh liegt ein Porträt von Vivienne von vor 30 Jahren.",
        "Крышка открывается с мелодичным щелчком. На мосту баланса выгравирован шифр: «В.В. - 7-3-12 - У НЕЕ КЛЮЧ». Под спиралью спрятан крошечный портрет Вивьен 30-летней давности.",
        "Il fondello si apre con un tocco chiaro. All'interno, sul bilanciere, è inciso un codice: 'V.V. - 7-3-12 - LEI HA LA CHIAVE'. C'è anche un ritratto di Vivienne di trent'anni fa.",
        "A tampa se abre com um clique. No balanço há um código gravado: 'V.V. - 7-3-12 - ELA TEM A CHAVE'. Debaixo da mola há um retrato de Vivienne de trinta anos atrás.",
        "انفتح الغطاء برنين نحاسي عذب، ونُقشت على رقاص التوازن شفرة واضحة: 'ف.ف - 7-3-12 - هي تملك المفتاح'. وتحت الزنبرك توجد صورة مصغرة لفيفيان فانس تعود لثلاثين عامًا مضت."
    ),
    'options': [
        tr('"The combination to her secret safe: 7-3-12. And Vance knew her partner was coming for her."', '"Kombinasi brankas rahasia: 7-3-12. Dan Aurelia tahu pasangannya akan datang mencarinya."', '“金库密码是 7-3-12。奥蕾莉亚早料到了薇薇安今晚会来寻她……”', '「秘密金庫の番号は7-3-12。そしてオレリアは伴侶が来るのを予期していた。」', '"비밀 금고 암호는 7-3-12. 밴스는 그녀가 올 것을 이미 알고 있었군."', '"La combinación de la caja fuerte: 7-3-12. Y Vance sabía que vendría a por ella."', '"La combinaison du coffre : 7-3-12. Et Vance savait que sa partenaire viendrait."', '"Die Kombination für den Tresor: 7-3-12. Vance wusste, dass sie kommen würde."', '«Шифр от сейфа: 7-3-12. И Вэнс знала, что Вивьен придет за ней...»', '"La combinazione della cassaforte: 7-3-12. E Vance sapeva che sarebbe venuta."', '"A combinação do cofre: 7-3-12. E Vance sabia que ela viria."', '"شفرة الخزنة السرية: 7-3-12، وفانس كانت تعلم مسبقًا بقدوم شريكتها لتصفيتها."')
    ]
}

# 17. watch_open_fail
D['watch_open_fail'] = {
    'speaker': tr('Mechanical Mistake', 'Kesalahan Mekanik', '机械拆卸失手', '機械操作の失敗', '기계적 실수', 'Error Mecánico', 'Erreur Mécanique', 'Mechanischer Fehler', 'Механическая оплошность', 'Errore Meccanico', 'Erro Mecânico', 'خطأ ميكانيكي عارض'),
    'text': tr(
        "Your thumbnail slips on the oiled bevel, snapping the delicate hinge. The hairspring flies out like a coiled brass viper and cuts your hand (-1 Health)!",
        "Kukumu tergelincir pada engsel yang berminyak. Pegas rambut melesat bagai ular kuningan yang marah dan menyayat jarimu (-1 Daya Tahan)!",
        "指甲在沾满机油的斜边上一滑，脆弱的精密铰链被当场崩断。游丝如同一条被激怒的黄铜蝮蛇猛烈弹射，狠狠划破了你的手背（-1 生命值）！",
        "油のついた縁で爪が滑り、繊細な蝶番を弾き飛ばした。ヒゲゼンマイが真鍮の毒蛇のように飛び出し、手を切り裂いた（体力 -1）！",
        "기름 묻은 모서리에서 손톱이 미끄러져 경첩이 부러집니다. 헤어스프링이 성난 독사처럼 튀어 올라 손등을 베어버립니다 (-1 체력)!",
        "Tu uña resbala y rompe la bisagra. El espiral salta como una víbora de latón cortando tu mano (-1 Salud).",
        "Votre ongle glisse et brise la charnière. Le spiral jaillit comme une vipère et vous entaille la main (-1 Santé).",
        "Ihr Nagel rutscht ab und bricht das Scharnier. Die Spiralfeder schnellt heraus wie eine Natter und schneidet die Hand (-1 Gesundheit).",
        "Ноготь соскальзывает с масляного края, ломая хрупкую петлю. Волосок баланса вылетает, как змея, и режет ладонь (-1 Здоровье).",
        "L'unghia scivola rompendo la cerniera. La spirale schizza fuori come una vipera tagliandoti la mano (-1 Salute).",
        "Sua unha escorrega e quebra a dobradiça. A mola espiral salta cortando sua mão (-1 Saúde).",
        "انزلق ظفرك على الحافة الزيتية وكسر المفصل الدقيق، فطفر زنبرك الشعر كأفعى نحاسية جارحًا باطن يدك (-1 صحة)!"
    ),
    'options': [
        tr('"Ouch! The spring cut my finger."', '"Aduh! Pegasnya menyayat tanganku."', '“嘶……断裂的发条把我的手划破了。”', '「痛っ！ゼンマイで手を切った。」', '"아야! 스프링에 손이 베였군."', '"¡Ay! El resorte me ha cortado."', '"Aïe ! Le ressort m\'a coupé la main."', '"Autsch! Die Feder hat mich geschnitten."', '«Ай! Пружина порезала палец.»', '"Ahi! La molla mi ha tagliato la mano."', '"Ai! A mola cortou meu dedo."', '"آخ! جرحني الزنبرك الحاد في يدي."')
    ]
}

# 18. examine_watch_done
D['examine_watch_done'] = {
    'speaker': tr('Inventory Update', 'Inventaris Diperbarui', '证物妥善归档', '遺留品保管', '소지품 갱신', 'Inventario Actualizado', 'Inventaire Mis à Jour', 'Inventar Aktualisiert', 'Вещдок сохранен', 'Inventario Aggiornato', 'Inventário Atualizado', 'حفظ المضبوطات'),
    'text': tr(
        "You wrap the pocket watch in a clean silk handkerchief and slip it into your trenchcoat pocket.",
        "Kamu membungkus jam saku dengan saputangan sutra dan menyimpannya di saku mantel detektifmu.",
        "你用一方干净的丝绸手帕将这块刻满秘密的怀表仔细包裹好，贴身收进了侦探风衣的内衬口袋中。",
        "懐中時計を清潔な絹のハンカチで包み、トレンチコートのポケットに大切に収めた。",
        "회중시계를 깨끗한 비단 손수건으로 감싸 트렌치코트 안주머니에 소중히 보관했습니다.",
        "Envuelves el reloj en un pañuelo de seda y lo guardas en tu gabardina.",
        "Vous enveloppez la montre dans un mouchoir de soie propre et la glissez dans votre manteau.",
        "Sie wickeln die Taschenuhr in ein Seidentuch und stecken sie in den Mantel.",
        "Ты заворачиваешь карманные часы в шелковый платок и убираешь во внутренний карман пальто.",
        "Avvolgi l'orologio in un fazzoletto di seta pulito e lo infili nel cappotto.",
        "Você embrulha o relógio num lenço de seda e o guarda no sobretudo.",
        "قمت بلف ساعة الجيب بمنديل حريري نظيف ودسستها بعناية داخل جيب معطفك الداخلي."
    ),
    'options': [
        tr('[Continue investigation]', '[Lanjutkan penyelidikan]', '【继续现场勘验】', '【現場検証を続ける】', '[수사를 계속한다]', '[Continuar investigación]', '[Poursuivre l\'enquête]', '[Untersuchung fortsetzen]', '[Продолжить расследование]', '[Continua l\'indagine]', '[Continuar investigação]', '[مواصلة التحقيق]')
    ]
}

# 19. examine_balcony_start
D['examine_balcony_start'] = {
    'speaker': tr('The Precipice of Saint Irene', 'Tepi Menara Saint Irene', '圣艾琳雨夜露台悬崖', '聖アイリーンの高所テラス', '성 아이린 첨탑 테라스', 'El Precipicio de Saint Irene', 'Le Précipice de Saint Irene', 'Der Abgrund von Saint Irene', 'Карниз башни Сент-Ирен', 'Il Precipizio di Saint Irene', 'O Precipício de Saint Irene', 'شرفة برج القديسة إيرين'),
    'text': tr(
        "Cold wind howls through the stone archway. Below lies the murky chasm of District 7—gas lamps flickering like dying stars across the canal barges. Rain spatters against your face.",
        "Angin dingin melolong melalui lengkungan batu menara. Di bawah terbentang kegelapan Distrik 7—lampu-lampu gas berkelap-kelip seperti bintang yang meredup di atas tongkang kanal. Hujan deras menerpa wajahmu.",
        "凛冽刺骨的狂风在哥特式石拱门间咆哮呼啸。下方是第七区阴暗潮湿的深渊深处——运河驳船上的煤气灯如濒死的星火般在雾气中摇曳闪烁。暴雨冰冷地抽打在你的脸上。",
        "冷たい風が石造りのアーチを吹き抜ける。見下ろせば第7区の暗い深淵——運河の艀に灯るガス灯が死にかけの星のように瞬いている。冷たい雨が顔を打つ。",
        "차가운 비바람이 석조 아치를 통과해 울부짖습니다. 발밑으로는 제7구역의 음산한 심연이 펼쳐져 있고, 운하 바지선 위 가스등이 꺼져가는 별처럼 가물거립니다.",
        "El viento aúlla por el arco de piedra. Abajo yace el abismo del Distrito 7; las farolas titilan como estrellas moribundas. La lluvia azota tu cara.",
        "Le vent hurle sous l'arche de pierre. En bas s'étend le gouffre du District 7, les réverbères vacillant sur les canaux. La pluie cingle votre visage.",
        "Kalter Wind heult durch die Steinbögen. Unten liegt der Abgrund des 7. Distrikts; Gaslaternen flackern wie sterbende Sterne. Regen peitscht ins Gesicht.",
        "Холодный ветер воет в каменных арках. Внизу чернеет бездна 7-го района — газовые фонари мерцают, как угасающие звезды. Дождь хлещет в лицо.",
        "Il vento sibila tra le arcate. Sotto si stende l'abisso del Distretto 7, con lampioni a gas che tremolano sui canali. La pioggia ti sferza il viso.",
        "O vento uiva pelo arco de pedra. Abaixo jaz o abismo do Distrito 7; lâmpadas a gás tremeluzem na neblina. A chuva açoita seu rosto.",
        "تعصف الرياح الباردة عبر الأقواس الحجرية، وتنبسط في الأسفل هوة المنطقة 7 المظلمة حيث تتلألأ فوانيس الغاز كنجوم تحتضر فوق قوارب القناة، والمطر يصفع وجهك بقسوة."
    ),
    'options': [
        tr('[PERCEPTION - Easy 8] Search the wet flagstones for trace evidence.', '[PERSEPSI - Mudah 8] Cari jejak bukti di atas ubin batu yang basah.', '【五感敏锐 - 简单 8】仔细勘察湿滑石砖表面残留的微量物理物证。', '【知覚 - 容易 8】濡れた敷石から微細な痕跡証拠を探す。', '[지각 - 쉬움 8] 젖은 석판 바닥에서 미세 흔적 증거를 찾는다.', '[PERCEPCIÓN - Fácil 8] Buscar indicios en las losas mojadas.', '[PERCEPTION - Facile 8] Fouiller les dalles humides à la recherche d\'indices.', '[WAHRNEHMUNG - Leicht 8] Die nassen Steinplatten nach Spuren absuchen.', '[ВОСПРИЯТИЕ - Легко 8] Осмотреть мокрые каменные плиты в поисках улик.', '[PERCEZIONE - Facile 8] Cerca tracce sulle lastre di pietra bagnate.', '[PERCEPÇÃO - Fácil 8] Procurar vestígios nas lajes molhadas.', '[الإدراك الحسي - سهل 8] فحص البلاط الحجري المبتل بحثًا عن آثار أدلة جنائية.'),
        tr('Look over the railing into the fog.', 'Tatap kabut malam di atas kota.', '凭栏远眺浓雾笼罩的工业烟云。', '手すりから霧の中の街を見下ろす。', '난간 너머 안개 낀 도시를 응시한다.', 'Mirar sobre la barandilla hacia la niebla.', 'Regarder dans le brouillard par-dessus le garde-corps.', 'Über das Geländer in den Nebel blicken.', 'Посмотреть за перила в туманную тьму.', 'Guarda oltre la ringhiera nella nebbia.', 'Olhar pela balaustrada na neblina.', 'التحديق من فوق السياج في أعماق الضباب الكثيف.'),
        tr('[Return inside]', '[Kembali ke dalam]', '【返回钟楼室内】', '【室内へ戻る】', '[실내로 복귀]', '[Volver al interior]', '[Retourner à l\'intérieur]', '[Wieder hineingehen]', '[Вернуться внутрь]', '[Torna all\'interno]', '[Voltar para dentro]', '[الرجوع للداخل]')
    ]
}

# 20. balcony_search_win
D['balcony_search_win'] = {
    'speaker': tr('Trace Evidence Found', 'Bukti Jejak Terungkap', '重大痕迹起获', '痕跡証拠の回収', '결정적 흔적 증거 발견', 'Indicio Encontrado', 'Indice Matériel', 'Spur Gesichert', 'Улика найдена', 'Traccia Trovata', 'Vestígio Encontrado', 'العثور على أثر حاسم'),
    'text': tr(
        "Snagged on the wrought-iron gargoyle is a torn shred of midnight-blue velvet. It matches the high collar of Madame Vance's mourning coat. Next to it, an empty glass ampoule labeled 'Tincture of Somnus & Cyanide'.",
        "Tersangkut pada patung gargoyle besi tempa adalah sobekan beludru biru tua. Warnanya identik dengan kerah mantel berkabung milik Nyonya Vance. Di sebelahnya, tergeletak ampul kaca kosong bertuliskan 'Tinktur Somnus & Sianida'.",
        "在铸铁滴水兽尖角上挂着一片被扯下的深蓝色丝绒布料碎片，其编织与质地与薇薇安夫人的丧服高领别无二致。就在碎布旁，遗弃着一支贴有标签的空玻璃安瓿：“催眠酊剂与高纯氰化物”！",
        "錬鉄のガーゴイルに引っかかっていたのは、引き裂かれた濃紺のビロードの布片。ヴィヴィアン夫人の喪服コートの高襟と完全に一致する。その隣には『ソムヌスチンキと青酸』と書かれた空のアンプルが落ちていた。",
        "단조 철제 가고일에 찢겨 걸려 있던 것은 짙은 남색 벨벳 조각이었습니다. 비비안 부인의 상복 하이칼라와 완벽히 일치합니다. 그 곁에는 '수면 팅크와 청산가리'라고 적힌 빈 유리 앰플이 떨어져 있었습니다.",
        "Enganchado en la gárgola de hierro hay un jirón de terciopelo azul noche. Coincide con el abrigo de luto de Madame Vance. Al lado, una ampolla vacía de 'Cianuro'.",
        "Accroché à la gargouille se trouve un lambeau de velours bleu nuit. Il correspond au manteau de deuil de Madame Vance. À côté, une fiole vide étiquetée 'Cyanure'.",
        "Am eisernen Wasserspeier hängt ein Fetzen mitternachtsblauer Samt. Er passt zu Madame Vances Trauermantel. Daneben ein leeres Glasfläschchen mit 'Zyankali'.",
        "На кованой горгулье зацепился лоскут полуночно-синего бархата от траурного пальто мадам Вэнс. Рядом лежит пустая ампула с надписью «Цианид».",
        "Impigliato nel doccione c'è un brandello di velluto blu notte. Corrisponde all'abito di Vivienne. Accanto, un'ampolla vuota con scritto 'Cianuro'.",
        "Preso na gárgula há um retalho de veludo azul-marinho do casaco de Vivienne. Ao lado, uma ampola vazia rotulada 'Cianeto'.",
        "علق بتمثال المزراب الحديدي شريط مخملي أزرق ممزق يتطابق تمامًا مع معطف حداد السيدة فانس، وبجواره أمبول زجاجي فارغ موسوم بـ 'خلاصة المنوم والسيانيد'."
    ),
    'options': [
        tr('"The smoking gun. She was here on the balcony right after Vance died."', '"Bukti tak terbantahkan. Vivienne berada di balkon ini tepat setelah Aurelia tewas."', '“铁证如山。在奥蕾莉亚咽气的那一刻，薇薇安就在这处露台上。”', '「動かぬ証拠だ。ヴァンスの絶命直後、彼女はここにいた。」', '"결정적 물증이오. 밴스가 숨진 직후 그녀는 이곳 발코니에 있었소."', '"La prueba irrefutable. Estuvo aquí en el balcón justo tras la muerte de Vance."', '"La preuve irréfutable. Elle était sur ce balcon juste après la mort de Vance."',         tr('[RASH ACCUSATION - Dangerous] "I don\'t need evidence, Vivienne! You killed Aurelia and I am arresting you right now!"', '[TUDUHAN GEGABAH - Berbahaya] "Aku tidak butuh bukti, Vivienne! Kamu yang membunuhnya dan aku akan menangkapmu sekarang juga!"', '【鲁莽指控 - 极度危险】“我根本不需要证据，薇薇安！就是你杀了奥蕾莉亚，我现在就要逮捕你！”', '【無謀な告発 - 危険】「証拠など要らん！お前がオレリアを殺したんだ、今すぐ逮捕してやる！」', '[성급한 고발 - 위험] "증거 따윈 필요 없소, 비비안! 당신이 오렐리아를 죽였고 당장 체포하겠소!"', '[ACUSACIÓN TEMERARIA - Peligroso] "¡No necesito pruebas, Vivienne! ¡Usted la mató y queda arrestada!"', '[ACCUSATION TEMÉRAIRE - Dangereux] "Je n\'ai pas besoin de preuves, Vivienne ! Vous l\'avez tuée et je vous arrête !"', '[ÜBEREILTE BESCHULDIGUNG - Gefährlich] "Ich brauche keine Beweise, Vivienne! Sie werden auf der Stelle verhaftet!"', '[ОПРОМЕТЧИВОЕ ОБВИНЕНИЕ - Опасно] «Мне не нужны улики, Вивьен! Вы убили ее, и я арестую вас прямо сейчас!»', '[ACCUSA AZZARDATA - Pericoloso] "Non ho bisogno di prove, Vivienne! Lei l\\\'ha uccisa e la arresto subito!"', '[ACUSAÇÃO PRECIPITADA - Perigoso] "Não preciso de provas, Vivienne! Você a matou e está presa agora mesmo!"', '[اتهام متهور - شديد الخطورة] "لست بحاجة لأدلة يا فيفيان! أنت من قتلت أوريليا وأنا أعتقلك فورًا!"'),�刷殆尽了石板上几乎所有的足迹。你只看到被泥水稀释的烟尘与煤烟水洼。",
        "激しい土砂降りが足跡をほとんど流し去ってしまった。泥の汚れと煤の水たまりしか見当たらない。",
        "거센 폭우가 대부분의 발자국을 씻어내 버렸습니다. 진흙 얼룩과 그을음 웅덩이만 보일 뿐입니다.",
        "El aguacero ha borrado casi todas las huellas. Solo hallas barro y hollín.",
        "La pluie battante a emporté les empreintes. Vous ne trouvez que de la suie boueuse.",
        "Der Wolkenbruch hat fast alle Fußspuren weggespült. Nur Schlamm und Rußpfützen bleiben.",
        "Ливень смыл почти все следы. Вокруг лишь размытая грязь и лужи сажи.",
        "Il rovescio ha cancellato quasi ogni impronta. Trovi solo fango e pozzanghere di fuliggine.",
        "A chuva forte lavou quase todas as pegadas. Você só encontra lama e fuligem.",
        "جرفت الأمطار الغزيرة المتدفقة آثار الأقدام تقريبًا، ولم تترك سوى بقع طين وبرك سخام رمادية."
    ),
    'options': [
        tr('[Step back inside]', '[Melangkah kembali ke dalam]', '【收身退回室内】', '【中へ戻る】', '[실내로 물러선다]', '[Volver adentro]', '[Ranger et rentrer]', '[Wieder eintreten]', '[Шагнуть внутрь]', '[Torna dentro]', '[Voltar para dentro]', '[الرجوع للداخل]')
    ]
}

# 22. balcony_fog_reflection
D['balcony_fog_reflection'] = {
    'speaker': tr('Atmospheric Reverie', 'Renungan Suasana Hujan', '雨夜冷雨形而上沉思', '雨の瞑想', '냉혹한 빗속의 사색', 'Ensueño Atmosférico', 'Rêverie Atmosphérique', 'Atmosphärische Einkehr', 'Атмосферное раздумье', 'Riflessione Notturna', 'Devaneio Noturno', 'تأملات المطر الكئيب'),
    'text': tr(
        "You stare down at the sprawling darkness of Malkuth-on-Thames. You have unlocked a new avenue of introspection: 'Metaphysics of Cold Rain'. You can internalize this thought in your Thought Cabinet.",
        "Kamu menatap kegelapan kota di bawah hujan. Kamu membuka pikiran baru: 'Metafisika Hujan Dingin'. Kamu bisa menginternalisasikannya di Lemari Pikiran.",
        "你俯瞰着脚下雨幕中蔓延无边的工业阴冷深渊。一种深刻的哲思悄然在脑海中觉醒——新思维解锁：“冷雨形而上学”。你可在思维阁中将其深度内化。",
        "雨煙る巨大都市の暗闇を見下ろす。内省の新たな回路が開かれた——新たな思考「冷雨の形而上学」がアンロックされた。思考キャビネットで内面化可能だ。",
        "빗속에 잠긴 도시의 거대한 어둠을 내려다봅니다. 새로운 사색의 길이 열렸습니다: '차가운 비의 형이상학'. 생각 보관함에서 이 생각을 내면화할 수 있습니다.",
        "Miras la oscuridad de la ciudad bajo la lluvia. Desbloqueas: 'Metafísica de la Lluvia Fría'. Puedes interiorizarla en el Gabinete de Pensamientos.",
        "Vous contemplez les ténèbres sous le déluge. Une nouvelle pensée s'éveille : 'Métaphysique de la Pluie Froide'.",
        "Sie blicken in das Dunkel der Stadt im Regen. Sie schalten den Gedanken 'Metaphysik des Kalten Regens' frei.",
        "Ты смотришь в черную бездну города под дождем. Открыта новая мысль: «Метафизика холодного дождя». Ее можно обдумать в Кабинете Мыслей.",
        "Fissi l'oscurità della città sotto la pioggia. Sblocchi un nuovo pensiero: 'Metafisica della Pioggia Fredda'.",
        "Você contempla a escuridão da cidade sob a chuva. Um novo pensamento é desbloqueado: 'Metafísica da Chuva Fria'.",
        "تحدق في ظلام المدينة الممتد تحت المطر، وانفتحت لك فكرة عميقة جديدة: 'ميتافيزيقا المطر البارد' يمكنك تبنيها في خزانة الأفكار."
    ),
    'options': [
        tr('[Return to the gear room]', '[Kembali ke ruang roda gigi]', '【返回钟楼主齿轮室】', '【歯車室へ戻る】', '[톱니바퀴 방으로 복귀]', '[Volver a la sala de engranajes]', '[Retourner à la salle des rouages]', '[Zurück zum Räderwerk]', '[Вернуться в зал шестерен]', '[Torna alla sala degli ingranaggi]', '[Voltar à sala de engrenagens]', '[العودة لغرفة التروس]')
    ]
}

# 23. examine_safe_start
D['examine_safe_start'] = {
    'speaker': tr('The Secret Floorboard Compartment', 'Kompartemen Rahasia Bawah Lantai', '地板暗格隐藏保险箱', '床下の秘密金庫', '바닥 밑 비밀 수납고', 'El Compartimento Secreto del Suelo', 'Le Compartiment Secret du Plancher', 'Das Versteckte Bodenfach', 'Потайной сейф под полом', 'Lo Scomparto Segreto del Pavimento', 'O Compartimento Secreto do Assoalho', 'مخبأ الخزنة الأرضية السري'),
    'text': tr(
        "Under three layers of clock-oil soaked pine lies a heavy steel strongbox with three concentric brass rotary dials. It looks reinforced with lead lining.",
        "Di bawah tiga lapis papan pinus berlumur minyak terdapat kotak baja berat dengan tiga dial putar konsentris kuningan. Brankas ini dirancang dengan mekanisme anti-bongkar yang berbahaya.",
        "在三层浸透机油的松木地板下，赫然嵌着一个厚重的重型精钢金库箱。箱门上有三枚同心圆纯铜旋转密码表盘，内部隐隐嵌有铅质防爆与自毁暗格。",
        "油まみれの松の床板を3枚剥がした下に、同心円状の3つの真鍮製ダイヤルを備えた重厚な鋼鉄金庫が埋め込まれていた。防犯用の鉛の裏打ちが施されている。",
        "기름에 젖은 소나무 바닥판 세 겹 아래, 세 개의 동심원 황동 회전 다이얼이 달린 육중한 강철 금고가 숨겨져 있습니다. 납으로 보강된 함정 장치가 엿보입니다.",
        "Bajo las tablas empapadas de aceite hay una pesada caja de acero con tres diales concéntricos de latón y forro de plomo.",
        "Sous trois couches de pin imbibé d'huile repose un coffre en acier muni de trois cadrans concentriques en laiton.",
        "Unter drei ölgetränkten Dielen liegt ein Stahltresor mit drei konzentrischen Messing-Drehscheiben.",
        "Под масляными сосновыми досками скрыт тяжелый стальной сейф с тремя концентрическими латунными дисками.",
        "Sotto le assi intrise d'olio giace una pesante cassaforte d'acciaio con tre quadranti rotanti d'ottone concentrici.",
        "Sob as tábuas encharcadas de óleo há um cofre de aço pesado com três discos concêntricos de latão.",
        "تحت ثلاث طبقات من خشب الصنوبر المشبع بالزيت تكمن خزنة فولاذية ثقيلة ذات ثلاثة أقراص نحاسية دورانية متحدة المركز ومدعمة بالرصاص."
    ),
    'options': [
        tr('[If combination known (7-3-12)] Enter the code found inside Aurelia\'s watch.', '[Gunakan Kode Sandi (7-3-12)] Masukkan kombinasi yang ditemukan dari jam saku Aurelia.', '【输入已知密码 7-3-12】转动表盘，输入从奥蕾莉亚怀表中破译的组合密匙。', '【判明した暗証番号を入力 (7-3-12)】懐中時計に刻まれていたコードを入力する。', '[알고 있는 암호 입력 (7-3-12)] 회중시계에서 발견한 코드를 다이얼에 맞춘다.', '[Si se conoce el código (7-3-12)] Introducir la combinación hallada en el reloj.', '[Si le code est connu (7-3-12)] Entrer la combinaison trouvée dans la montre.', '[Kombination bekannt (7-3-12)] Code aus Aurelias Taschenuhr eingeben.', '[Если шифр известен (7-3-12)] Ввести комбинацию из часов Аурелии.', '[Se la combinazione è nota (7-3-12)] Inserisci il codice dell\'orologio.', '[Se a combinação for conhecida (7-3-12)] Inserir o código do relógio.', '[إذا كانت الشفرة معلومة (7-3-12)] إدخال الأرقام المستخرجة من ساعة جيب أوريليا.'),
        tr('[LOGIC - Hard 13] Attempt to deduce the tumbler alignment by acoustic vibration.', '[LOGIKA - Sulit 13] Coba deduksikan susunan silinder brankas melalui getaran akustik.', '【逻辑学 - 极难 13】将耳朵贴紧钢板，仅凭听觉与声学震颤推演滚轮弹子排布。', '【論理学 - 困難 13】音響振動を聴き分け、タンブラーの噛み合わせを推論解錠する。', '[논리학 - 어려움 13] 미세한 진동음을 통해 텀블러 배열을 논리적으로 추론한다.', '[LÓGICA - Difícil 13] Deducir la alineación de los tambores por vibración acústica.', '[LOGIQUE - Difficile 13] Déduire l\'alignement des gorges par résonance acoustique.', '[LOGIK - Schwer 13] Die Ausrichtung der Scheiben durch Vibrationen erschließen.', '[ЛОГИКА - Сложно 13] Попытаться разгадать шифр на слух по щелчкам механизма.', '[LOGICA - Difficile 13] Deduci la combinazione dalle vibrazioni acustiche.', '[LÓGICA - Difícil 13] Deduzir a combinação pela vibração acústica.', '[المنطق التحليلي - صعب 13] استنتاج محاذاة الأقراص بدقة عبر الاستماع لاهتزازات الرنين الصوتي.'),
        tr('[BRUTE FORCE - Dangerous] Try to pry open the heavy lid with brute force.', '[PAKSA BUKA - Berbahaya] Coba congkel engsel brankas dengan linggis baja.', '【暴力硬撬 - 极度危险】无视密码，用撬棍野蛮强行破坏合页。', '【力づくでこじ開ける - 危険】バールを使って蝶番を無理やりこじ開ける。', '[물리력 행사 - 위험] 쇠지렛대로 뚜껑을 강제로 뜯어내려 시도한다.', '[FUERZA BRUTA - Peligroso] Intentar forzar la tapa con una palanca.', '[FORCE BRUTE - Dangereux] Tenter de forcer le couvercle au pied-de-biche.', '[ROHE GEWALT - Gefährlich] Versuchen, den Deckel gewaltsam aufzuhebeln.', '[ГРУБАЯ СИЛА - Опасно] Попытаться вскрыть крышку монтировкой.', '[FORZA BRUTA - Pericoloso] Tenta di scardinare il coperchio con la forza.', '[FORÇA BRUTA - Perigoso] Tentar arrombar a tampa com força bruta.', '[القوة الغاشمة - شديد الخطورة] محاولة خلع الغطاء بالعتلة الفولاذية بالقوة.'),
        tr('[Leave safe untouched]', '[Biarkan brankas]', '【暂且不动保险箱】', '【金庫には触れずにおく】', '[금고를 그대로 둔다]', '[Dejar la caja intacta]', '[Laisser le coffre intact]', '[Tresor unberührt lassen]', '[Оставить сейф]', '[Lascia intatta la cassaforte]', '[Deixar o cofre intocado]', '[ترك الخزنة دون لمس]')
    ]
}

# 24. safe_brute_trap
D['safe_brute_trap'] = {
    'speaker': tr('Lethal Anti-Tamper Trap', 'Perangkap Maut Brankas', '致命反盗自毁反噬', '致死性の防犯トラップ', '치명적 방범 트랩 발동', 'Trampa Letal', 'Piège Mortel', 'Tödliche Sicherheitsfalle', 'Смертоносная ловушка', 'Trappola Letale', 'Armadilha Letal', 'فخ الموت الدفاعي بالخزنة'),
    'text': tr(
        "As your crowbar strains against the hinge, an internal shear-pin snaps. A pressurized needle array fires into your forearm, and chlorine gas erupts (-3 Health, -2 Morale)!",
        "Saat linggismu menekan engsel, pin pengaman internal patah. Rangkaian jarum bertekanan menembus lenganmu, dan gas klorin menyembur (-3 Daya Tahan, -2 Kewarasan)!",
        "当你的铁撬死死压住合页时，箱内的保险剪切销骤然崩断！数十枚微型高压毒针激射而出扎进你的前臂，浓烈的氯气自毁毒雾狂喷而出（-3 生命值，-2 士气）！",
        "バールで蝶番に力を込めた瞬間、内部の安全ピンが破断した。加圧式の毒針が無数に前腕へ突き刺さり、塩素ガスが噴出する（体力 -3、正気度 -2）！",
        "쇠지렛대로 경첩을 비트는 순간, 내부 안전 핀이 끊어졌습니다. 가압 침 뭉치가 팔뚝으로 발사되고 염소 가스가 폭발합니다 (-3 체력, -2 사기)!",
        "Al forzar la bisagra, un pasador salta. ¡Una salva de agujas presurizadas te perfora el antebrazo y estalla gas cloro (-3 Salud, -2 Moral)!",
        "Le pied-de-biche force le gond et brise une goupille. Une volée d'aiguilles sous pression vous crible le bras sous un nuage de chlore (-3 Santé, -2 Moral)!",
        "Als Sie hebeln, bricht ein Sicherungsstift. Drucknadeln schießen in Ihren Unterarm und Chlorgas strömt aus (-3 Gesundheit, -2 Moral)!",
        "Монтировка ломает штифт. Залп пружинных игл впивается в предплечье, и ядовитый газ вырывается наружу (-3 Здоровье, -2 Мораль)!",
        "La leva spezza un perno. Una scarica di aghi pressurizzati ti colpisce il braccio ed esplode gas di cloro (-3 Salute, -2 Morale)!",
        "Ao forçar a dobradiça, um pino se rompe. Agulhas pressurizadas perfuram seu antebraço e gás venenoso irrompe (-3 Saúde, -2 Moral)!",
        "حين ضغطت بالعتلة انكسر صمام الأمان الداخلي فانطلقت مصفوفة إبر مضغوطة طعنت ذراعك وتصاعد غاز الكلور الخانق (-3 صحة، -2 معنويات)!"
    ),
    'options': [
        tr('"Coughing blood... what a vicious trap!"', '"Batuk darah... perangkap yang sangat keji!"', '“咳……咳咳！好恶毒的防拆机关……”', '「ゴホッ……なんという凶悪な罠だ……」', '"쿨럭... 끔찍한 함정이었군..."', '"Cof... ¡qué trampa tan perversa!"', '"Toux... quel piège vicieux !"', '"Hust... was für eine bösartige Falle!"', '«Кашляет кровью... ну и дрянь же эта ловушка!»', '"Tosse... che trappola maledetta!"', '"Tosse... que armadilha cruel!"', '"سعال دامٍ... يا له من فخ خبيث وفتاك!"')
    ]
}

# 25. safe_open_code
D['safe_open_code'] = {
    'speaker': tr('Safe Opened', 'Brankas Berhasil Dibuka', '金库成功解密开启', '金庫の解錠成功', '금고 해제 성공', 'Caja Fuerte Abierta', 'Coffre Ouvert', 'Tresor Geöffnet', 'Сейф открыт', 'Cassaforte Aperta', 'Cofre Aberto', 'فُتحت الخزنة بنجاح'),
    'text': tr(
        "The heavy bolts retract with a deep, echoing clunk. Inside the velvet-lined recess lies the legendary 'Perpetuum Ledger'—bound in black goatskin with brass cogwheels embedded in the spine, containing alchemical blueprints and secret syndicate accounts!",
        "Grendel baja berat bergeser mundur dengan bunyi dentam yang dalam. Di dalam ceruk berlapis beludru terbaring 'Buku Besar Rahasia Perpetuum'—dijilid dengan kulit kambing hitam dan roda gigi kuningan pada punggungnya, memuat transaksi rahasia Sindikat dan cetak biru alkimia!",
        "重达十磅的实心钢栓伴随着沉闷雄浑的撞击声缓缓缩回。在天鹅绒衬垫的正中央，静静卧着传奇的《永动机绝密总账簿》——黑色山羊皮封面封脊嵌满黄铜齿轮，详尽记载着辛迪加财阀的纵火黑账与毁灭性定时引爆机密图纸！",
        "重厚なボルトが鈍い音を立てて引き戻された。ビロードが敷かれた窪みの中に、伝説の『永久機関台帳』が収められていた——背表紙に真鍮歯車が象嵌された黒山羊革装丁。シンジケートの裏金と錬金設計図のすべてが記されている！",
        "육중한 빗장이 깊은 울림과 함께 풀렸습니다. 벨벳이 깔린 수납부 안에 전설적인 '영구기관 원장'이 놓여 있었습니다. 검은 염소가죽 표지에 황동 톱니가 박힌 책으로, 신디케이트의 비밀 장부와 알케미 도면이 가득했습니다!",
        "Los pestillos se retraen con un estruendo metálico. Dentro yace el legendario 'Libro Mayor Perpetuum', lleno de planos secretos del Sindicato.",
        "Les lourds verrous se rétractent dans un claquement sourd. À l'intérieur repose le légendaire 'Grand Livre Perpetuum', scellé de rouages de laiton.",
        "Die schweren Riegel weichen mit einem dumpfen Klacken. Im Samtfach liegt das 'Perpetuum-Hauptbuch' voller Geheimnisse des Syndikats.",
        "Тяжелые засовы втягиваются с глухим лязгом. Внутри лежит легендарный гроссбух «Перпетуум» с чертежами и счетами Синдиката!",
        "I pesanti catenacci si ritraggono con un tonfo metallico. All'interno giace il leggendario 'Mastro Perpetuum', con tutti i segreti del Sindacato.",
        "Os trincos pesados recuam com um estrondo. Lá dentro repousa o lendário 'Livro-Razão Perpetuum' com projetos secretos do Sindicato.",
        "تراجعت المزالج الفولاذية الثقيلة بصوت ارتطام عميق، وفي التجويف المبطن بالمخمل يرقد 'دفتر حسابات بيربيتوم الأسطوري' المغلف بجلد الماعز الأسود ويحوي مخططات الكارتل الخطيرة."
    ),
    'options': [
        tr('"Vance knew Vivienne was going to poison her... and she let her do it."', '"Aurelia tahu Vivienne akan meracuninya... dan dia membiarkannya terjadi."', '“奥蕾莉亚早知薇薇安会下毒毒死她……可她却含笑坦然受死。”', '「オレリアは毒殺されることを知っていて……自らそれを受け入れたのか。」', '"밴스는 비비안이 독살할 것을 알면서도... 스스로 허락한 거였군."', '"Vance sabía que Vivienne la envenenaría... y la dejó hacerlo."', '"Vance savait que Vivienne allait l\'empoisonner... et elle l\'a laissée faire."', '"Vance wusste, dass Vivienne sie vergiften würde... und ließ es geschehen."', '«Вэнс знала, что Вивьен ее отравит... и сама позволила этому случиться.»', '"Vance sapeva che Vivienne l\'avrebbe avvelenata... e gliel\'ha lasciato fare."', '"Vance sabia que Vivienne iria envenená-la... e deixou que fizesse."', '"كانت فانس تعلم بأن فيفيان ستسممها... وتركتها تفعل ذلك بمحض إرادتها."')
    ]
}

# 26. safe_logic_fail
D['safe_logic_fail'] = {
    'speaker': tr('Lockpick Attempt', 'Perangkap Brankas Meledak!', '防盗机械闭锁反击', '金庫の防犯機構作動', '금고 잠금 함정 발동', 'Mecanismo Bloqueado', 'Échec du Crochetage', 'Fehlschlag am Tresor', 'Ошибка взлома', 'Tentativo Fallito', 'Falha no Arrombamento', 'تعطل محاولة الفتح'),
    'text': tr(
        "The internal tumblers jam with a harsh screech. An internal anti-tamper glass vial cracks, releasing foul sulfur gas and a spring trap snaps on your hands (-2 Health, -1 Morale)!",
        "Silinder internal macet dengan derit memekakkan telinga. Ampul kaca anti-pencuri pecah, menyemburkan gas belerang beracun dan penjepit baja menghantam jarimu (-2 Daya Tahan, -1 Kewarasan)!",
        "内部滚轮齿槽发出一阵尖锐刺耳的卡死金属摩擦声。内置的防拆玻璃管瞬间碎裂，刺鼻致命的硫磺毒气喷涌而出，弹簧钢夹死死夹碎了你的手指骨节（-2 生命值，-1 士气）！",
        "内部のタンブラーが耳障りな軋み音を立てて噛み合わなくなった。防犯ガラス管が破裂し、猛烈な硫黄ガスとバネ罠が手を直撃する（体力 -2、正気度 -1）！",
        "내부 텀블러가 날카로운 소리를 내며 엇물려 잠깁니다. 방범용 유리 바이알이 깨지며 유황 가스가 뿜어져 나오고 스프링 트랩이 손을 칩니다 (-2 체력, -1 사기)!",
        "Los tambores se atascan con un chirrido. Una ampolla se rompe soltando gas de azufre y una trampa golpea tus manos (-2 Salud, -1 Moral).",
        "Les gorges se bloquent dans un crissement. Une fiole se brise, libérant du soufre gazeux tandis qu'un piège se referme sur vos doigts (-2 Santé, -1 Moral).",
        "Das Werk blockiert kreischend. Eine Glasampulle platzt, Schwefelgas strömt aus und eine Federfalle schnappt zu (-2 Gesundheit, -1 Moral)!",
        "Диски заклинивает со скрежетом. Разбивается защитная колба, серный газ бьет в лицо, а капкан бьет по рукам (-2 Здоровье, -1 Мораль)!",
        "I tamburi si inceppano stridendo. Una fiala si spezza rilasciando gas di zolfo e una trappola scatta sulle tue dita (-2 Salute, -1 Morale).",
        "Os tambores travam com um ruído estridente. Uma ampola quebra liberando gás sulfuroso e a armadilha machuca suas mãos (-2 Saúde, -1 Moral).",
        "تعطلت الأقراص بصرير حاد وانكسرت أسطوانة الزجاج الدفاعية لتنشر غاز الكبريت الخانق وأطبق زنبرك الفخ على يديك بقسوة (-2 صحة، -1 معنويات)!"
    ),
    'options': [
        tr('"Damn anti-tamper traps!"', '"Sialan! Perangkap brankas terkutuk!"', '“可恶……好阴险的防拆机关！”', '「くそっ、厄介な防犯トラップめ！」', '"빌어먹을 방범 장치 같으니!"', '"¡Malditas trampas de seguridad!"', '"Maudits pièges de sécurité !"', '"Verdammte Sicherheitsfallen!"', '«Проклятые ловушки от взлома!»', '"Maledette trappole antimanomissione!"', '"Malditas armadilhas antifurto!"', '"سحقًا لفخاخ الحماية الغادرة!"')
    ]
}

# 27. madame_dialogue_start
D['madame_dialogue_start'] = {
    'speaker': tr('Madame Vivienne Vance', 'Nyonya Vivienne Vance', '薇薇安·梵斯夫人', 'ヴィヴィアン・ヴァンス夫人', '비비안 밴스 부인', 'Madame Vivienne Vance', 'Madame Vivienne Vance', 'Madame Vivienne Vance', 'Мадам Вивьен Вэнс', 'Madame Vivienne Vance', 'Madame Vivienne Vance', 'السيدة فيفيان فانس'),
    'text': tr(
        "Madame Vance turns slowly. Her face is pale as alabaster, framed by wet raven curls and a black silk veil. 'Are you the investigator? You look... unraveled, Detective. Did you come here to solve Aurelia\'s death, or merely to gawk at our ruin?'",
        "Nyonya Vance berbalik perlahan. Wajahnya sepucat marmer, dibingkai ikal rambut hitam basah dan kerudung sutra berkabung. 'Apakah kamu sang penyelidik? Kamu tampak... berantakan, Detektif. Apakah kamu datang untuk mengungkap kematian Aurelia, atau sekadar menonton kehancuran kami?'",
        "薇薇安夫人动作优雅却迟缓地转过身来。她的面孔苍白如雪花石膏雕像，湿漉漉的乌黑卷发被黑色丧服面纱轻柔笼罩。“你就是那位调查官吗？你看起来……衣衫褴褛、神志恍惚呢，探长。你到这狂风呼啸的钟楼来，是为了查清奥蕾莉亚的死因，还是单纯为了围观我们一家的毁灭？”",
        "ヴァンス夫人がゆっくりと振り返る。アラバスターのように青白い顔、濡れた黒髪と黒い絹の喪服のベール。「あなたが捜査官？随分と……ボロボロのようね、刑事さん。オレリアの死の真相を解きに来たの？それとも私たちの破滅を見物しに来たのかしら？」",
        "밴스 부인이 천천히 돌아섭니다. 백옥처럼 창백한 얼굴을 젖은 흑발과 검은 명주 베일이 감싸고 있습니다. '당신이 수사관인가요? 꼴이... 엉망진창이군요, 형사님. 오렐리아의 죽음을 밝히러 오신 건가요, 아니면 그저 우리의 파멸을 구경하러 오신 건가요?'",
        "Madame Vance se gira despacio. Pálida como el alabastro bajo un velo de seda negra. '¿Es usted el investigador? Parece... desmoronado. ¿Viene a resolver la muerte de Aurelia o a regodearse en nuestra ruina?'",
        "Madame Vance se retourne lentement. Pâle comme l'albâtre sous un voile de deuil noir. 'Êtes-vous l'enquêteur ? Vous avez l'air... défait. Venez-vous élucider la mort d'Aurelia ou contempler notre ruine ?'",
        "Madame Vance dreht sich langsam um. Blass wie Alabaster unter schwarzem Schleier. 'Sind Sie der Ermittler? Sie wirken... zerrüttet. Wollen Sie Aurelias Tod aufklären oder sich an unserem Ruin weiden?'",
        "Мадам Вэнс медленно поворачивается. Ее лицо бледно, как алебастр, под черной вуалью. «Вы следователь? Вы выглядите... потрепанным. Вы пришли раскрыть смерть Аурелии или поглазеть на наше крушение?»",
        "Madame Vance si volta lentamente, pallida sotto il velo nero. 'È lei l'investigatore? Sembra... a pezzi. È venuto per svelare la morte di Aurelia o solo per assistere alla nostra rovina?'",
        "Madame Vance vira-se devagar. Pálida como alabastro sob o véu de seda preta. 'É você o investigador? Parece... destruído. Veio resolver a morte de Aurelia ou assistir à nossa ruína?'",
        "التفتت السيدة فانس ببطء ووجهها شاحب كالمرمر تحت حجاب الحداد الأسود الحريري: 'أأنت المحقق؟ تبدو... منهكًا ومبعثرًا يا حضرة المحقق. هل جئت لكشف ملابسات موت أوريليا أم لمجرد التحديق في خرابنا؟'"
    ),
    'voices': [
        voice_item(V_ELYSIA, B_ELYSIA, tr(
            "Her pulse is racing beneath the black lace gloves. She smells of peppermint, damp wool, and the bitter almond scent of prussic acid.",
            "Detak nadinya berpacu di balik sarung tangan renda hitam. Dia berbau peppermint, wol basah, dan aroma almond pahit dari asam prusat.",
            "在黑蕾丝手套之下，她的脉搏正在急促跳动。她身上混杂着薄荷茶、湿羊毛以及……氰化物特有的苦杏仁幽香！",
            "黒いレースの手袋の下で、彼女の脈拍は激しく波打っている。ペパーミント、濡れた羊毛、そして青酸特有の苦いアーモンドの香りが漂う。",
            "검은 레이스 장갑 아래에서 그녀의 맥박이 거칠게 뛰고 있습니다. 박하 향과 젖은 모직, 그리고 청산가리 특유의 씁쓸한 아몬드 냄새가 섞여 풍깁니다.",
            "Su pulso late deprisa bajo el encaje. Huele a menta, lana húmeda y al amargo aroma a almendras del ácido prúsico.",
            "Son pouls s'emballe sous ses gants de dentelle. Elle sent la menthe, la laine mouillée et l'amande amère du cyanure.",
            "Ihr Puls rast unter der schwarzen Spitze. Sie riecht nach Pfefferminze, nasser Wolle und Bittermandel.",
            "Ее пульс бьется под черными перчатками. От нее пахнет мятой, сырой шерстью и горьким миндалем цианида.",
            "Il suo polso batte forte sotto i guanti di pizzo. Odora di menta piperita, lana umida e mandorla amara.",
            "O pulso dela corre sob a renda preta. Ela cheira a hortelã, lã úmida e ao aroma amargo de amêndoas do cianeto.",
            "نبضها يتسارع تحت قفازات الدانتيل السوداء، وتفوح منها رائحة شاي النعناع والصوف المبتل ونفحة اللوز المر المميزة للسيانيد."
        ))
    ],
    'options': [
        tr('"Where were you at 03:42 AM when the tower clock stopped?"', '"Di mana kamu berada pukul 03:42 saat jam menara berhenti?"', '“凌晨03:42分大钟停摆时，你究竟身在何处？”', '「塔の大時計が止まった午前3時42分、あなたはどこにいた？」', '"탑 시계가 멈춘 새벽 3시 42분, 당신은 어디 있었소?"', '"¿Dónde estaba a las 03:42 cuando se paró el reloj?"', '"Où étiez-vous à 03h42 quand l\'horloge s\'est arrêtée ?"', '"Wo waren Sie um 03:42 Uhr, als die Uhr stehenblieb?"', '«Где вы были в 03:42, когда часы башни остановились?»', '"Dov\'era alle 03:42 quando l\'orologio della torre si è fermato?"', '"Onde a senhora estava às 03:42 quando o relógio parou?"', '"أين كنتِ عند الساعة 03:42 فجرًا حين توقفت ساعة البرج؟"'),
        tr('[EMPATHY - Medium 10] "You did not love her, did you, Madame?"', '[EMPATI - Sedang 10] "Kamu tidak mencintainya, bukan, Nyonya?"', '【同理心 - 普通 10】“你其实早已不再爱她了，对吗，夫人？”', '【共感 - 中等 10】「あなたは彼女を愛していなかった。違いますか、夫人？」', '[공감 - 보통 10] "당신은 그녀를 사랑하지 않았군요, 부인?"', '[EMPATÍA - Medio 10] "No la amaba, ¿verdad, Madame?"', '[EMPATHIE - Moyen 10] "Vous ne l\'aimiez pas, n\'est-ce pas, Madame ?"', '[EMPATHIE - Mittel 10] "Sie haben sie nicht geliebt, nicht wahr, Madame?"', '[ЭМПАТИЯ - Средне 10] «Вы не любили ее, верно, мадам?»', '[EMPATIA - Medio 10] "Lei non la amava, vero, Madame?"', '[EMPATIA - Médio 10] "A senhora não a amava, não é, Madame?"', '[التعاطف الوجداني - متوسط 10] "لم تكوني تحبينها يومًا، أليس كذلك يا سيدتي؟"'),
        tr('[RED CHECK] [AUTHORITY - Challenging 13] "Enough theatrics, Vivienne. We found the poisoned chess queen and the torn velvet from your coat on the balcony. You murdered her."', '[UJI MERAH] [OTORITAS - Menantang 13] "Cukup sandiwaranya, Vivienne. Kami menemukan ratu catur beracun dan sobekan mantelmu di balkon. Kamu membunuhnya."', '【不可逆检定】·【威权公信 - 险峻 13】“闹剧该收场了，薇薇安。我们在死者手中起获了淬毒黑后棋，并在露台找到了与你大衣严丝合缝的撕裂蓝丝绒。是你亲手杀了她。”', '【絶対判定】·【権威 - 困難 13】「茶番劇は終わりだ、ヴィヴィアン。遺体の毒針チェス駒も、バルコニーのコートの裂け目も手に入れた。お前が彼女を殺したんだ。」', '[되돌릴 수 없는 판정] [권위 - 난이도 13] "연극은 끝났소, 비비안. 독침이 든 체스 퀸과 발코니에서 당신 코트의 찢긴 벨벳 조각을 찾아냈소. 당신이 오렐리아를 살해했소."', '[CHEQUEO ROJO] [AUTORIDAD - Desafiante 13] "Basta de teatro, Vivienne. Encontramos la reina de ajedrez envenenada y el terciopelo de su abrigo. Usted la asesinó."', '[TEST ROUGE] [AUTORITÉ - Exigeant 13] "Assez de comédie, Vivienne. Nous avons la reine d\'échecs empoisonnée et le velours déchiré de votre manteau. Vous l\'avez tuée."', '[ROTER WURF] [AUTORITÄT - Schwer 13] "Genug Theater, Vivienne. Wir haben die vergiftete Schachfigur und den Samt Ihres Mantels vom Balkon. Sie haben sie ermordet."', '[КРАСНЫЙ БРОСОК] [АВТОРИТЕТ - Сложно 13] «Хватит спектаклей, Вивьен. Мы нашли отравленного ферзя и клочок вашего пальто на балконе. Вы убили ее.»', '[PROVA ROSSA] [AUTORITÀ - Difficile 13] "Basta recite, Vivienne. Abbiamo la regina avvelenata e il velluto strappato del suo cappotto. Lei l\'ha uccisa."', '[TESTE VERMELHO] [AUTORIDADE - Desafiador 13] "Basta de teatro, Vivienne. Encontramos a rainha envenenada e o veludo do seu casaco na sacada. Você a matou."', '[اختبار قاطع] [الهيبة والسلطة - صعب 13] "يكفي مسرحيات يا فيفيان. لقد وجدنا ملكة الشطرنج المسمومة وقطعة المخمل الممزقة من معطفك على الشرفة. أنتِ قتلتِها."'),
        tr('[RASH ACCUSATION - Dangerous] "I don\'t need evidence, Vivienne! You killed Aurelia and I am arresting you right now!"', '[TUDUHAN GEGABAH - Berbahaya] "Aku tidak butuh bukti, Vivienne! Kamu yang membunuhnya dan aku akan menangkapmu sekarang juga!"', '【鲁莽指控 - 极度危险】“我根本不需要证据，薇薇安！就是你杀了奥蕾莉亚，我现在就要逮捕你！”', '【無謀な告発 - 危険】「証拠など要らん！お前がオレリアを殺したんだ、今すぐ逮捕してやる！」', '[성급한 고발 - 위험] "증거 따윈 필요 없소, 비비안! 당신이 오렐리아를 죽였고 당장 체포하겠소!"', '[ACUSACIÓN TEMERARIA - Peligroso] "¡No necesito pruebas, Vivienne! ¡Usted la mató y queda arrestada!"', '[ACCUSATION TEMÉRAIRE - Dangereux] "Je n\'ai pas besoin de preuves, Vivienne ! Vous l\'avez tuée et je vous arrête !"', '[ÜBEREILTE BESCHULDIGUNG - Gefährlich] "Ich brauche keine Beweise, Vivienne! Sie werden auf der Stelle verhaftet!"', '[ОПРОМЕТЧИВОЕ ОБВИНЕНИЕ - Опасно] «Мне не нужны улики, Вивьен! Вы убили ее, и я арестую вас прямо сейчас!»', '[ACCUSA AZZARDATA - Pericoloso] "Non ho bisogno di prove, Vivienne! Lei l'ha uccisa e la arresto subito!"', '[ACUSAÇÃO PRECIPITADA - Perigoso] "Não preciso de provas, Vivienne! Você a matou e está presa agora mesmo!"', '[اتهام متهور - شديد الخطورة] "لست بحاجة لأدلة يا فيفيان! أنت من قتلت أوريليا وأنا أعتقلك فورًا!"'),
        tr('[Step away]', '[Mundur sejenak]', '【暂且退后退开】', '【一旦離れる】', '[물러선다]', '[Apartarse]', '[S\'éloigner]', '[Zurücktreten]', '[Отойти]', '[Allontanati]', '[Afastar-se]', '[الابتعاد مؤقتًا]')
    ]
}

# 28. madame_premature_arrest_fail
D['madame_premature_arrest_fail'] = {
    'speaker': tr('Catastrophic Blunder', 'Tindakan Gegabah yang Fatal', '灾难性的致命渎职', '破滅的な失態', '치명적인 실책', 'Error Catastrófico', 'Bévue Catastrophique', 'Katastrophaler Fehltritt', 'Фатальная ошибка', 'Errore Catastrofico', 'Erro Catastrófico', 'خطأ مهني كارثي'),
    'text': tr(
        "Inspector Graves grabs your shoulder and cocks his service revolver. 'That is enough, Detective! You have no proof, you reek of alcohol, and you are terrorizing a grieving citizen under police protection. Hand over your badge. You are under arrest for extortion and gross misconduct!'",
        "Inspektur Graves mencengkeram bahumu dan mengokang pistol dinasnya. 'Cukup, Detektif! Kamu menuduh warga tanpa selembar pun bukti fisik sambil berbau alkohol. Serahkan lencana dan senjatamu. Kamu ditangkap atas pemerasan dan pelanggaran berat!'",
        "格雷夫斯警探猛地拽住你的肩膀，拔出左轮手枪咔哒一声扳下击锤！“够了，探长！你手里连半张纸质物证都没有，浑身散发着宿醉恶臭，竟敢公然恐吓受警局保护的悲痛家属。交出你的警徽和佩枪，你因勒索罪和严重渎职被正式逮捕了！”",
        "グレイヴス警部があなたの肩を掴み、回転式拳銃の撃鉄を起こした。「そこまでだ、刑事！物的証拠もなしに酒臭い息で市民を脅迫するとはな。警察バッジを渡せ。職権濫用と恐喝で現行犯逮捕する！」",
        "그레이브스 형사가 당신의 어깨를 낚아채며 권총 공이치기를 당겼습니다. '그만하시오, 형사! 물증 하나 없이 술 냄새를 풀풀 풍기며 유족을 협박하다니. 배지와 권총 내놓으시오. 공갈과 중대한 직무 유기로 체포하겠소!'",
        "El inspector Graves te agarra del hombro y amartilla su revólver. '¡Basta, detective! Sin pruebas y oliendo a alcohol está aterrorizando a una ciudadana. Queda arrestado por conducta grave.'",
        "L'inspecteur Graves vous saisit à l'épaule et arme son revolver. 'Ça suffit ! Sans preuves et empestant l'alcool, vous terrorisez une citoyenne. Donnez votre insigne, vous êtes aux arrêts !'",
        "Inspektor Graves packt Sie an der Schulter und spannt den Hahn. 'Es reicht, Detective! Ohne Beweise und stinkend nach Schnaps schikanieren Sie Bürger. Geben Sie die Marke ab, Sie sind verhaftet!'",
        "Грейвс хватает тебя за плечо и взводит курок револьвера. «Хватит, детектив! Без улик, пьяный в стельку, ты терроризируешь потерпевшую. Сдай жетон. Ты арестован за превышение полномочий!»",
        "L'ispettore Graves ti afferra e arma il revolver. 'Basta così! Senza prove e puzzando di alcol stai minacciando una cittadina. Consegna il distintivo, sei in arresto!'",
        "O inspetor Graves agarra seu ombro e engatilha o revólver. 'Chega, detetive! Sem provas e cheirando a álcool você está aterrorizando a viúva. Entregue o distintivo, você está preso!'",
        "أمسك المفتش غريفز بكتفك وسحب مطرقة مسدسه: 'كفى يا حضرة المحقق! ليس معك أي دليل مادي، وتفوح منك رائحة الخمر وترهب مواطنة مفجوعة! سلم شارتك وسلاحك، أنت قيد الاعتقال بتهمة الابتزاز وسوء السلوك الجسيم!'"
    ),
    'options': [
        tr('[Yield to the handcuffs]', '[Pasrah pada borgol baja]', '【认命受缚，戴上冰冷手铐】', '【冷たい手錠を受け入れる】', '[수갑에 순응한다]', '[Ceder ante las esposas]', '[Céder aux menottes]', '[Sich den Handschellen beugen]', '[Смириться с наручниками]', '[Arrenditi alle manette]', '[Render-se às algemas]', '[الاستسلام للقيود الحديدية]')
    ]
}

# 29. madame_alibi
D['madame_alibi'] = {
    'speaker': tr('Madame Vivienne Vance', 'Nyonya Vivienne Vance', '薇薇安·梵斯夫人', 'ヴィヴィアン・ヴァンス夫人', '비비안 밴스 부인', 'Madame Vivienne Vance', 'Madame Vivienne Vance', 'Madame Vivienne Vance', 'Мадам Вивьен Вэнс', 'Madame Vivienne Vance', 'Madame Vivienne Vance', 'السيدة فيفيان فانس'),
    'text': tr(
        "'I told your companion Inspector Graves: I was downstairs in the Saint Irene chapel, lighting candles for the departed souls of the epidemic. The priest can attest to my presence—though he was asleep in his confessional booth.'",
        "'Sudah kukatakan pada rekanmu Inspektur Graves: aku berada di bawah di kapel Saint Irene, menyalakan lilin untuk jiwa-jiwa korban wabah. Romo gereja bisa bersaksi—meski dia tertidur di bilik pengakuan dosanya.'",
        "“我已经向你的同僚格雷夫斯警探说得很清楚了：当时我人在楼下的圣艾琳礼拜堂，为大瘟疫中死难的亡魂点燃白蜡烛祈福。本堂神父可以为我作证——尽管他整晚都在告解室的长椅上打瞌睡。”",
        "「お連れのグレイヴス警部にも話した通りよ。私は下層の礼拝堂で流行病の犠牲者のために蝋燭を灯していたわ。司祭様が証明してくれる——告解室で居眠りしていたけれどね。」",
        "\"동행한 그레이브스 형사에게도 말했듯이, 전 아래층 예배당에서 전염병 희생자들을 위해 촛불을 켜고 있었어요. 사제님께서 증언해 주실 수 있어요. 고해성사실에서 졸고 계셨지만요.\"",
        "'Ya se lo dije al inspector Graves: estuve abajo en la capilla encendiendo velas por los caídos en la epidemia. El párroco puede atestiguarlo, aunque dormitaba en su confesionario.'",
        "'Je l'ai déjà dit à votre collègue : j'étais en bas dans la chapelle, allumant des cierges pour les défunts. Le prêtre peut en attester, même s'il sommeillait dans son confessionnal.'",
        "'Ich sagte es Graves bereits: Ich war unten in der Kapelle und entzündete Kerzen für die Opfer der Seuche. Der Priester kann es bezeugen, obwohl er im Beichtstuhl döste.'",
        "«Я уже сказала Грейвсу: я была внизу в часовне и зажигала свечи за упокой душ жертв эпидемии. Священник может подтвердить, хоть он и дремал в исповедальне.»",
        "'L'ho già detto a Graves: ero giù nella cappella ad accendere candele per le anime dell'epidemia. Il parroco può confermare, anche se dormicchiava nel confessionale.'",
        "'Eu já disse ao inspetor: estava na capela acendendo velas pelas almas da epidemia. O padre pode atestar, embora estivesse cochilando no confessionário.'",
        "'سبق وأخبرت رفيقك المفتش غريفز: كنت في الطابق السفلي بمصلى القديسة إيرين أوقد الشموع لأرواح ضحايا الوباء. وبوسع كاهن الرعية أن يشهد بذلك رغم أنه كان يغفو في مقصورة الاعتراف.'"
    ),
    'options': [
        tr('"Convenient. An alibi witnessed by a sleeping priest."', '"Alibi yang nyaman. Disaksikan seorang pendeta yang tertidur."', '“真方便的不在场证明啊。唯二的证人竟然是一个沉睡的神父。”', '「眠っていた司祭のアリバイか。実に都合がいいな。」', '"참 편리한 알리바이군요. 졸고 있던 사제가 유일한 목격자라니."', '"Conveniente. Una coartada presenciada por un cura dormido."', '"Commode. Un alibi attesté par un prêtre endormi."', '"Praktisch. Ein Alibi, bezeugt von einem schlafenden Priester."', '«Очень удобно. Алиби, подтвержденное спящим священником.»', '"Comodo. Un alibi convalidato da un prete che dormiva."', '"Conveniente. Um álibi testemunhado por um padre dorminhoco."', '"حجة غياب ملائمة للغاية، شاهدها الوحيد كاهن نائم في مقصورته."')
    ]
}

# 30. madame_empathy_win
D['madame_empathy_win'] = {
    'speaker': tr('Madame Vivienne Vance', 'Nyonya Vivienne Vance', '薇薇安·梵斯夫人', 'ヴィヴィアン・ヴァンス夫人', '비비안 밴스 부인', 'Madame Vivienne Vance', 'Madame Vivienne Vance', 'Madame Vivienne Vance', 'Мадам Вивьен Вэнс', 'Madame Vivienne Vance', 'Madame Vivienne Vance', 'السيدة فيفيان فانس'),
    'text': tr(
        "Her eyes widen slightly, and for a split second the porcelain mask drops. 'Love? Aurelia did not love human beings, Detective. She loved springs, escapements, and cold brass gears. For thirty years I was just a domestic pendulum swinging in her hallway. While our daughter died of consumption, she was upstairs building an alchemical chronometer to sell to foreign bankers.'",
        "Matanya membesar sesaat, dan topeng porselennya runtuh. 'Cinta? Aurelia tidak mencintai manusia, Detektif. Dia mencintai pegas, roda gigi, dan kuningan dingin. Selama tiga puluh tahun aku hanyalah pendulum rumah tangga di lorongnya. Saat putri kami meninggal karena penyakit paru-paru, dia malah di lantai atas merakit kronometer alkimia untuk dijual ke bankir asing.'",
        "她的瞳孔猛地收缩，整整三十年精心雕琢的瓷器面具在这一瞬间轰然崩塌。“爱？奥蕾莉亚这个疯子从来就没有爱过任何活人，探长！她爱的只有发条、擒纵器和冷冰冰的黄铜齿轮！整整三十年，我不过是挂在她宅邸回廊上一枚无足轻重的摆锤！当年我们的亲生女儿因肺结核咳血惨死时，她人在哪里？她竟然把自己反锁在阁楼里，通宵达旦地赶制卖给外国寡头军阀的定时引爆精密钟机！”",
        "彼女の目がわずかに見開かれ、磁器の仮面が剥がれ落ちた。「愛？オレリアは人間なんて愛していなかったわ。彼女が愛したのはゼンマイと冷たい歯車だけ。30年間、私は彼女の廊下で揺れる家庭の振り子に過ぎなかった。私たちの娘が結核で死にかけていた時も、彼女は外国の銀行家に売りつける軍用時計を組み立てていたのよ。」",
        "그녀의 눈이 흔들리며 도자기 가면이 무너져 내립니다. '사랑이요? 오렐리아는 인간을 사랑한 적이 없어요. 태엽과 탈진기, 차가운 톱니바퀴만을 사랑했죠. 30년 동안 난 그저 복도에 걸린 시계추에 불과했어요. 우리 딸아이가 폐결핵으로 죽어갈 때도, 그녀는 외국 은행가들에게 팔아넘길 시계를 조립하고 있었단 말입니다.'",
        "Sus ojos se agrandan y cae su máscara. '¿Amor? Aurelia no amaba a las personas. Amaba los engranajes fríos. Mientras nuestra hija moría de tuberculosis, ella armaba un cronómetro para banqueros.'",
        "Ses yeux s'écarquillent et le masque tombe. 'L'amour ? Aurelia n'aimait personne, seulement ses froids engrenages. Quand notre fille mourait de la phtisie, elle fabriquait des armes pour des banquiers.'",
        "Ihre Augen weiten sich, die Maske fällt. 'Liebe? Aurelia liebte keine Menschen, nur Messingräder. Als unsere Tochter an der Schwindsucht starb, baute sie Uhren für ausländische Bankiers.'",
        "Ее глаза расширяются, фарфоровая маска падает. «Любовь? Аурелия не любила людей, детектив. Только шестеренки. Пока наша дочь умирала от чахотки, она собирала механизм для продажи банкирам.»",
        "I suoi occhi si spalancano e la maschera cade. 'Amore? Aurelia non amava le persone. Amava solo gli ingranaggi freddi. Mentre nostra figlia moriva di tisi, lei costruiva congegni per i banchieri.'",
        "Os olhos dela se arregalam e a máscara cai. 'Amor? Aurelia não amava pessoas, apenas engrenagens frias. Enquanto nossa filha morria de tuberculose, ela montava relógios para banqueiros estrangeiros.'",
        "اتسعت عيناها وسقط قناع الخزف البارد في لحظة خاطفة: 'حب؟ لم تكن أوريليا تحب البشر يا حضرة المحقق، بل كانت تعشق الزنبركات وتروس النحاس الميتة! طيلة ثلاثين عامًا كنت مجرد بندول خادم في ممراتها، وحين كانت ابنتنا تلفظ أنفاسها بالسل، كانت هي عاكفة على بيع أسلحة الساعات للبنوك الأجنبية!'"
    ),
    'options': [
        tr('"So you decided to stop her clock once and for all."', '"Jadi kamu memutuskan untuk menghentikan jam hidupnya untuk selamanya."', '“所以你下定决心，要彻底停下她生命的钟摆。”', '「だから彼女の時計の針を永遠に止めてやろうとしたのか。」', '"그래서 그녀의 시계를 영원히 멈추기로 결심했군요."', '"Así que decidió detener su reloj de una vez por todas."', '"Vous avez donc décidé d\'arrêter son horloge une bonne fois pour toutes."', '"Also beschlossen Sie, ihre Lebensuhr für immer anzuhalten."', '«И вы решили остановить ее часы раз и навсегда.»', '"Così ha deciso di fermare il suo orologio una volta per tutte."', '"Então você decidiu parar o relógio dela de uma vez por todas."', '"ولهذا قررتِ إيقاف عقارب ساعة حياتها وإلى الأبد."')
    ]
}

# 31. madame_empathy_fail
D['madame_empathy_fail'] = {
    'speaker': tr('Madame Vivienne Vance', 'Nyonya Vivienne Vance', '薇薇安·梵斯夫人', 'ヴィヴィアン・ヴァンス夫人', '비비안 밴스 부인', 'Madame Vivienne Vance', 'Madame Vivienne Vance', 'Madame Vivienne Vance', 'Мадам Вивьен Вэнс', 'Madame Vivienne Vance', 'Madame Vivienne Vance', 'السيدة فيفيان فانس'),
    'text': tr(
        "'How vulgar. You stumble in here, smelling of gin and cheap tobacco, and dare question thirty years together? Inspector Graves, remove this animal from my presence!'",
        "'Betapa menjijikkan. Kamu tersandung masuk ke sini dengan bau alkohol murahan, dan berani mempertanyakan tiga puluh tahun kebersamaan kami? Inspektur Graves, singkirkan makhluk ini dari hadapanku!'",
        "“粗鄙至极！你一身廉价杜松子酒和下等劣质烟草的恶臭，跌跌撞撞闯进凶案现场，竟然还有胆量质疑我们相濡以沫三十年的羁绊？格雷夫斯警探，把这个下流胚子给我赶出去！”",
        "「下品極まりないわ。安ジンと安煙草の悪臭を漂わせて転がり込んできた分際で、私たちの30年を侮辱する気？グレイヴス警部、この無礼者を追い出してちょうだい！」",
        "\"천박하군요. 싸구려 진과 담배 찌든 내를 풍기며 비틀비틀 기어들어 와선, 우리의 30년 세월을 모욕할 셈인가요? 그레이브스 형사, 이 무례한 자를 당장 치워요!\"",
        "'Qué vulgar. Tropieza aquí oliendo a ginebra barata y se atreve a cuestionar treinta años de matrimonio. ¡Inspector Graves, aparte a este animal!'",
        "'Quelle vulgarité. Vous empestez le gin frelaté et vous osez juger trente ans de vie commune ? Inspecteur Graves, éloignez cet individu !'",
        "'Wie vulgär. Sie torkeln hier herein, riechen nach billigem Schnaps und wagen es, dreißig Jahre Ehe anzuzweifeln? Graves, schaffen Sie diesen Mann fort!'",
        "«Какая пошлость. Вы заваливаетесь сюда, воняя дешевым джином, и смеете судить о тридцати годах брака? Инспектор Грейвс, уберите это существо!»",
        "'Che volgarità. Entra qui puzzando di gin scadente e osa giudicare trent'anni insieme? Ispettore Graves, allontani questo individuo!'",
        "'Que vulgar. Você cambaleia até aqui cheirando a gim barato e ousa questionar trinta anos de união? Inspetor Graves, tire este homem daqui!'",
        "'يا لك من مبتذل وسوقي! تتعثر هنا وتفوح منك رائحة الكحول الرخيصة وتجرؤ على التشكيك في ثلاثين عامًا من زواجنا؟ يا حضرة المفتش غريفز، أبعد هذا الكائن عن ناظري فورًا!'"
    ),
    'options': [
        tr('"Hold your tongue, Madame. I am not finished."', '"Jaga lidahmu, Nyonya. Aku belum selesai."', '“收敛你的言辞，夫人。我的审讯还没结束。”', '「口を慎みなさい、夫人。捜査はまだ終わっていない。」', '"말조심하시오, 부인. 아직 끝나지 않았소."', '"Cuidado con su lengua, señora. No he terminado."', '"Surveillez vos paroles, Madame. Je n\'ai pas fini."', '"Hüten Sie Ihre Zunge, Madame. Ich bin noch nicht fertig."', '«Придержите язык, мадам. Я еще не закончил.»', '"Badi a come parla, Madame. Non ho ancora finito."', '"Cuidado com a língua, senhora. Não terminei."', '"الزمي حدودك يا سيدتي، فاستجوابي لم ينته بعد."')
    ]
}

# 32. madame_confession_win
D['madame_confession_win'] = {
    'speaker': tr('The Breaking of the Ice', 'Runtuhnya Kebohongan', '坚冰消融：终极忏悔', '氷解：哀しき自白', '무너진 얼음: 진실의 고백', 'La Confesión', 'L\'Aveu Ultime', 'Das Brechen des Eises', 'Крушение льда: исповедь', 'La Confessione', 'A Confissão', 'انهيار الجليد: الاعتراف الأخير'),
    'text': tr(
        "Madame Vance staggers backward against the stone arch. Tears cut through the powdered chalk on her cheeks. 'Yes! Yes, I gave her the poisoned queen! But do you know what she did when I pressed the needle into her palm? She smiled. She thanked me. She looked into my eyes and said, *The pendulum is already set, Vivienne. Thank you for freeing me from the winding.* She wanted to die! She rigged the clock so the Syndicate would never get their war machine!'",
        "Nyonya Vance terhuyung ke belakang menabrak lengkungan batu. Air mata membelah bedak tebal di pipinya. 'Ya! Ya, aku memberinya ratu catur beracun itu! Tapi tahukah kamu apa yang dilakukannya saat aku menekan jarum ke telapak tangannya? Dia tersenyum. Dia berterima kasih padaku. Dia berkata: *Pendulumnya sudah disetel, Vivienne. Terima kasih telah membebaskanku.* Dia ingin mati! Dia mengorbankan dirinya agar Sindikat tidak pernah mendapatkan mesin perang itu!'",
        "薇薇安夫人踉跄后退，单薄的后背重重撞在冰冷的石拱门上。滚烫的泪水冲刷着她双颊惨白的白垩粉底。“没错！是我！是我亲手把淬毒的黑后棋递到她手里的！可是……你知道当那枚毒针刺穿她掌心时，她做了什么吗？她竟然在笑！她眼中含着泪对我说：*钟摆早已就绪，薇薇安。谢谢你终于让我从这无休止的残酷发条中解脱出来。* 她是自愿求死的！她亲手改装了钟塔自毁配重，为的就是让辛迪加财阀永远也得不到那台杀戮机器！”",
        "ヴァンス夫人はよろめき、石のアーチに身を預けた。涙が白粉を濡らす。「そうよ！私が毒のクイーンを渡したわ！でも針が掌を刺した時、彼女が何をしたか知ってる？笑ったのよ。私の目を見て言ったわ……『振り子はもうセットしてある。私を永久のゼンマイから解放してくれてありがとう』ってね！彼女は死を望んでいた！シンジケートに兵器を渡さないために！」",
        "밴스 부인은 비틀거리며 석조 아치에 등을 기댔습니다. 눈물이 분칠한 뺨을 타고 흘러내립니다. '맞아요! 내가 그 독침 든 퀸을 쥐여줬어요! 하지만 바늘이 손바닥을 찔렀을 때 그녀가 어떻게 했는지 알아요? 웃었어요. 날 보며 말했죠... *진자는 이미 맞춰두었어, 비비안. 영원한 태엽질에서 날 해방해 줘서 고마워.* 그녀는 죽길 원했던 거예요! 신디케이트가 살인 기계를 차지하지 못하도록 스스로를 희생한 거라고요!'",
        "Madame Vance se tambalea contra el arco. Lágrimas cortan el polvo de sus mejillas. '¡Sí! ¡Le di la reina envenenada! Pero cuando la aguja entró en su palma, ella sonrió y dijo: *El péndulo ya está listo. Gracias por liberarme.* ¡Ella quería morir para que el Sindicato no tuviera su máquina!'",
        "Madame Vance titube contre l'arche. 'Oui ! Je lui ai donné la reine empoisonnée ! Mais quand l'aiguille l'a piquée, elle a souri et m'a dit : *Le balancier est prêt, Vivienne. Merci de me libérer.* Elle voulait mourir pour empêcher le Syndicat d'obtenir sa machine de guerre !'",
        "Madame Vance taumelt gegen den Steinbogen. 'Ja! Ich gab ihr die vergiftete Dame! Doch als die Nadel stach, lächelte sie: *Das Pendel ist gestellt, Vivienne. Danke, dass du mich erlöst.* Sie wollte sterben, damit das Syndikat ihre Kriegsmaschine niemals bekommt!'",
        "Мадам Вэнс отступает к каменной арке. Слезы текут по ее щекам. «Да! Я дала ей отравленного ферзя! Но знаете, что она сделала, когда игла пронзила ладонь? Она улыбнулась и сказала: *Маятник уже запущен. Спасибо, что освободила меня.* Она хотела умереть, чтобы чертежи не достались Синдикату!»",
        "Madame Vance barcolla contro l'arco. 'Sì! Le ho dato la regina avvelenata! Ma quando l'ago è entrato nel palmo, ha sorriso: *Il pendolo è pronto. Grazie di avermi liberata.* Voleva morire per impedire al Sindacato di avere la sua macchina!'",
        "Madame Vance cambaleia contra o arco de pedra. Lágrimas lavam seu rosto. 'Sim! Eu dei a ela a rainha envenenada! Mas quando a agulha furou sua palma, ela sorriu: *O pêndulo já está armado, Vivienne. Obrigada por me libertar.* Ela queria morrer para deter o Sindicato!'",
        "ترنحت السيدة فانس نحو القوس الحجري وانهمرت الدموع على خديها: 'نعم! أنا من أعطاها ملكة الشطرنج المسمومة! لكن أتعلم ماذا فعلت حين انغرست الإبرة في كفها؟ لقد ابتسمت وشكرتني وقالت: *البندول مضبوط بالفعل يا فيفيان، شكرًا لتحريري من هذا القيد الأبدي.* كانت هي من طلبت الموت لمنع النقابة من سرقة آلة الحرب الدموية!'"
    ),
    'options': [
        tr('[DELIVER FINAL JUDGMENT: Arrest Madame Vance for murder]', '[BERIKAN PUTUSAN HUKUM: Tangkap Nyonya Vance atas pembunuhan]', '【定下司法裁决：依法以谋杀罪正式逮捕薇薇安】', '【司法判断：殺人容疑でヴィヴィアンを逮捕する】', '[사법적 판결: 살인 혐의로 비비안 부인을 체포한다]', '[SENTENCIA LEGAL: Arrestar a Madame Vance por asesinato]', '[VERDICT JUDICIAIRE : Arrêter Madame Vance pour meurtre]', '[RECHTSURTEIL: Madame Vance wegen Mordes verhaften]', '[ЗАКОННЫЙ ПРИГОВОР: Арестовать мадам Вэнс за убийство]', '[SENTENZA LEGALE: Arresta Madame Vance per omicidio]', '[VEREDITO LEGAL: Prender Madame Vance por assassinato]', '[إصدار الحكم القانوني: اعتقال السيدة فانس بتهمة القتل العمد]'),
        tr('[DELIVER FINAL JUDGMENT: Hide the Perpetuum Ledger and file it as an accidental death]', '[BERIKAN PUTUSAN MORAL: Sembunyikan Buku Besar dan catat ini sebagai kecelakaan]', '【定下道义裁决：藏匿永动机总账，将此案以工伤意外永久封存】', '【道義的判断：台帳を隠匿し、事故死として処理する】', '[도덕적 판결: 영구기관 장부를 은닉하고 단순 사고사로 처리한다]', '[SENTENCIA MORAL: Ocultar el libro y certificarlo como muerte accidental]', '[VERDICT MORAL : Cacher le registre et classer en mort accidentelle]', '[MORALISCHES URTEIL: Das Hauptbuch verbergen und als Unfall abheften]', '[МОРАЛЬНЫЙ ПРИГОВОР: Скрыть гроссбух и оформить смерть как несчастный случай]', '[SENTENZA MORALE: Nascondi il mastro e archivia come morte accidentale]', '[VEREDITO MORAL: Esconder o livro-razão e arquivar como acidente]', '[إصدار الحكم الأخلاقي: إخفاء دفتر الحسابات وختم القضية كوفاة عرضية]')
    ]
}

# 33. madame_confession_fail
D['madame_confession_fail'] = {
    'speaker': tr('Unshakable Defiance', 'Bantahan Dingin', '寸步不让的冷酷抵抗', '揺るぎなき拒絶', '냉혹한 전면 부인', 'Desafío Inquebrantable', 'Défiance Inébranlable', 'Eiskalte Abweisung', 'Ледяное отрицание', 'Sfida Incrollabile', 'Desafio Inabalável', 'الإنكار الجليدي الصارم'),
    'text': tr(
        "'Are you insane?' Her voice turns to ice. 'Fabricating evidence against a grieving partner in front of another police officer? Graves, arrest this incompetent maniac before this creature desecrates Aurelia\'s remains any further!' Graves steps between you with his hand on his revolver (-2 Morale).",
        "'Apakah kamu sudah gila?' Suaranya membeku bagai es. 'Merekayasa tuduhan terhadap pasangan yang berduka di depan perwira polisi lainnya? Graves, tangkap orang mabuk ini sebelum dia menodai jasad Aurelia lebih jauh!' Graves melangkah maju dengan tangan di gagang pistolnya (-2 Kewarasan).",
        "“你发疯了吗？”她的嗓音在一瞬间降至冰点。“在另一位警官面前，伪造劣质假证陷害受害者的未亡人？格雷夫斯警探，在这条疯狗进一步亵渎奥蕾莉亚的遗体之前，立刻把他抓起来！”格雷夫斯握着枪把挡在了你们两人之间（-2 士气）。",
        "「正気なの？」その声は氷のように冷え切った。「他の警官の面前で遺族を陥れる証拠を捏造するなんて。グレイヴス、これ以上オレリアの遺体を冒涜される前に、この無能を拘束して！」グレイヴスが拳銃に手をかけて割って入る（正気度 -2）。",
        "\"미치셨나요?\" 그녀의 목소리가 얼음처럼 차가워집니다. \"다른 경찰관이 보는 앞에서 유족을 모함하기 위해 증거를 조작하다니요? 그레이브스 형사, 이 작자가 오렐리아의 시신을 더 모독하기 전에 체포해요!\" 그레이브스가 권총을 쥔 채 둘 사이를 막아섭니다 (-2 사기).",
        "'¿Está loco?' Su voz se vuelve hielo. '¿Fabricar pruebas contra una viuda ante otro oficial? ¡Graves, arreste a este loco!' Graves se interpone con la mano en su revólver (-2 Moral).",
        "'Êtes-vous fou ?' Sa voix devient de glace. 'Fabriquer des preuves contre une veuve devant un policier ? Graves, arrêtez ce fou !' Graves s'interpose, la main sur son arme (-2 Moral).",
        "'Sind Sie verrückt?' Ihre Stimme wird zu Eis. 'Beweise gegen eine trauernde Witwe zu fälschen? Graves, verhaften Sie diesen Verrückten!' Graves tritt dazwischen (-2 Moral).",
        "«Вы с ума сошли?» Ее голос звенит льдом. «Фабриковать улики против безутешной вдовы на глазах у полиции? Грейвс, уйми этого безумца!» Грейвс встает между вами (-2 Мораль).",
        "'È impazzito?' La sua voce si gela. 'Fabbricare prove contro una vedova davanti a un collega? Graves, arresti questo pazzo!' Graves si frappone con la mano sull'arma (-2 Morale).",
        "'Está louco?' A voz dela vira gelo. 'Forjando provas contra uma viúva na frente de outro policial? Graves, prenda este louco!' Graves intervém com a mão no revólver (-2 Moral).",
        "'هل جننت تمامًا؟' تحول صوتها إلى جليد قاطع: 'تلفق أدلة رخيصة ضد أرملة مفجوعة أمام ضابط شرطة آخر؟ يا غريفز، اعتقل هذا المعتوه قبل أن يدنس جثمان أوريليا أكثر!' تقدم غريفز بينكما واضعًا يده على مسدسه (-2 معنويات)."
    ),
    'options': [
        tr('"This isn\'t over, Vivienne."', '"Ini belum berakhir, Vivienne."', '“这还没完呢，薇薇安。”', '「まだ終わっていないぞ、ヴィヴィアン。」', '"아직 끝나지 않았소, 비비안."', '"Esto no ha terminado, Vivienne."', '"Ce n\'est pas fini, Vivienne."', '"Das ist noch nicht vorbei, Vivienne."', '«Это еще не конец, Вивьен.»', '"Non è ancora finita, Vivienne."', '"Isso não acabou, Vivienne."', '"لم تنته هذه القضية بعد يا فيفيان."')
    ]
}

# 34. ending_arrest
D['ending_arrest'] = {
    'speaker': tr('Case Concluded: The Letter of the Law', 'Kasus Ditutup: Keadilan Hukum yang Kaku', '案情终结：冰冷铁律的胜利', '事件解決：法と秩序の執行', '사건 종결: 법률의 엄정한 집행', 'Caso Concluido: El Rigor de la Ley', 'Affaire Classée : La Rigueur de la Loi', 'Fall Gelöst: Buchstabe des Gesetzes', 'Дело закрыто: Буква закона', 'Caso Concluso: La Lettera della Legge', 'Caso Concluído: O Rigor da Lei', 'القضية أغلقت: نص القانون الصارم'),
    'text': tr(
        "You snap the cold steel manacles around Vivienne Vance's wrists. Inspector Graves stares in awe and grudging respect as you hand him the poisoned ivory queen. The law has been served. Tomorrow the newspapers will proclaim the brilliance of Precinct 4. But as you walk down into the rain, you wonder if justice was truly done to a woman whose soul died thirty years ago.",
        "Kamu mengunci borgol baja dingin di pergelangan tangan Vivienne Vance. Inspektur Graves menatap takjub dan penuh hormat saat kamu menyerahkan bidak ratu gading beracun. Hukum telah ditegakkan. Besok surat kabar akan memuji kepiawaian Distrik 4. Namun saat kamu menuruni tangga ke dalam hujan, kamu bertanya-tanya apakah keadilan benar-benar telah terwujud bagi seorang wanita yang jiwanya telah mati tiga puluh tahun lalu.",
        "冰冷刺骨的精钢手铐清脆地锁扣在薇薇安·梵斯颤抖的手腕上。当你把那枚沾毒的象牙王后作为呈堂铁证交到格雷夫斯手里时，他眼中闪烁着惊骇与由衷的敬意。法律得到了伸张，明天各大日报的头条将大肆歌颂第四警区的大侦探破案神速。然而，当你顶着风雨走下六层旋转阶梯时，内心却在拷问：对于一个灵魂早在三十年前女儿死时便已死去的女人而言，这算得上是真正的正义吗？",
        "冷たい鋼鉄の手錠がヴィヴィアンの手首に嵌められた。毒針仕込みのクイーンを手渡すと、グレイヴスは畏敬の眼差しを向けた。法は執行された。明日の新聞は第4分署の快挙を讃えるだろう。だが冷たい雨の中を歩きながら、あなたは自問する。30年前に魂が死んでいた女に対して、これは本当に正義だったのだろうか。",
        "차가운 강철 수갑이 비비안의 손목을 단단히 채웠습니다. 독침 퀸을 건네받은 그레이브스는 경외 어린 눈빛으로 쳐다보았습니다. 법은 집행되었습니다. 내일 아침 신문들은 제4구역 경찰의 눈부신 활약을 찬양할 것입니다. 하지만 빗속으로 걸어 내려가는 당신의 가슴 속에는, 이미 30년 전에 영혼이 죽어버린 여인에게 이것이 과연 진정한 정의였는지 무거운 의문이 남습니다.",
        "Cierras los grilletes de acero en las muñecas de Vivienne. Graves te mira con respeto al recibir la reina envenenada. La ley se ha cumplido. Pero bajo la lluvia, te preguntas si hubo verdadera justicia.",
        "Vous passez les menottes aux poignets de Vivienne. Graves vous regarde avec admiration. La loi a triomphé. Mais sous la pluie, vous vous demandez si la justice a vraiment été rendue.",
        "Sie legen Vivienne Handschellen an. Graves blickt mit Respekt auf die Beweisstücke. Das Gesetz siegt. Doch im Regen fragen Sie sich, ob dies wahrhafte Gerechtigkeit war.",
        "Холодные наручники защелкиваются на запястьях Вивьен. Грейвс с уважением принимает отравленного ферзя. Закон восторжествовал. Но под дождем ты думаешь: была ли это настоящая справедливость?",
        "Chiudi le manette ai polsi di Vivienne. Graves ti guarda con rispetto. La legge è servita. Ma sotto la pioggia ti chiedi se sia stata vera giustizia per un'anima morta trent'anni fa.",
        "Você fecha as algemas nos pulsos de Vivienne. Graves te olha com respeito. A lei foi cumprida. Mas sob a chuva, você se pergunta se houve verdadeira justiça.",
        "أطبقت الأصفاد الفولاذية الباردة حول معصمي فيفيان فانس. ينظر إليك غريفز بإكبار واحترام حين سلمته ملكة الشطرنج المسمومة. نُفذ القانون، وستشيد الصحف غدًا بعبقرية القسم 4، لكنك تتساءل في المطر عما إذا كانت العدالة قد تحققت حقًا لامرأة ماتت روحها قبل ثلاثين عامًا."
    ),
    'options': [
        tr('[CASE CONCLUDED: View Final Case Dossier]', '[KASUS SELESAI: Lihat Ringkasan Akhir Dossier]', '【案情终结：查阅终卷档案与调查总结】', '【事件解決：最終事件調書を閲覧する】', '[사건 종결: 최종 사건 기록부 열람]', '[CASO CONCLUIDO: Ver expediente final]', '[AFFAIRE CLASSÉE : Consulter le dossier final]', '[FALL GELÖST: Abschlussbericht ansehen]', '[ДЕЛО ЗАКРЫТО: Просмотреть итоговое досье]', '[CASO CONCLUSO: Visualizza il dossier finale]', '[CASO CONCLUÍDO: Ver dossiê final do caso]', '[القضية أغلقت: استعراض ملف القضية النهائي]')
    ]
}

# 35. ending_coverup
D['ending_coverup'] = {
    'speaker': tr('Case Concluded: The Sovereign Bureaucrat', 'Kasus Ditutup: Sang Penentu Keadilan Moral', '案情终结：仁慈的正义主宰者', '事件解決：慈悲深き主権裁定者', '사건 종결: 자비로운 정의의 중재자', 'Caso Concluido: El Soberano de la Piedad', 'Affaire Classée : L\'Architecte de la Grâce', 'Fall Gelöst: Richter der Barmherzigkeit', 'Дело закрыто: Архитектор милосердия', 'Caso Concluso: Il Sovrano della Misericordia', 'Caso Concluído: O Arquiteto da Piedade', 'القضية أغلقت: مهندس الرحمة'),
    'text': tr(
        "You slide the Perpetuum Ledger into your inner coat pocket and slip the cyanide ampoule into your pocket. You look Graves in the eye and say, 'Industrial grease on the catwalk. Aurelia slipped. Stamp the papers.' Vivienne looks at you through her veil with tears of disbelief. You walk out into the dawn of District 7, not as an officer of the law, but as an architect of mercy.",
        "Kamu menyelipkan Buku Besar Perpetuum dan ampul racun ke dalam saku mantel dalammu. Kamu menatap mata Graves dan berkata: 'Minyak mesin pada titian. Aurelia terpeleset murni kecelakaan. Stempel berkasnya.' Vivienne menatapmu dari balik kerudungnya dengan air mata kelegaan yang tak terkatakan. Kamu melangkah keluar menyambut fajar Distrik 7, bukan sebagai budak hukum tertulis, melainkan sebagai penentu belas kasih.",
        "你神不知鬼不觉地将那本《永动机绝密总账簿》滑入大衣内侧暗袋，将氰化物毒药安瓿悄悄收起。你直视格雷夫斯的双眼，语气不容置疑：“回廊走道机油打滑，奥蕾莉亚纯属意外失足坠亡。盖上工伤结案公章吧。”薇薇安隔着黑面纱凝望着你，泪水中满是难以置信的释怀与感激。你推门迈向第七区的破晓曙光——你不再是死板教条律法的看门犬，而是这残酷人间唯一的仁慈裁决者。",
        "台帳と毒薬アンプルをコートの内ポケットに滑り込ませた。グレイヴスの目をまっすぐ見つめて告げる。「通路の機械油だ。オレリアは滑って転落した純粋な事故だ。書類に判子を捺せ。」ヴィヴィアンは涙を流して感謝した。冷たい法の番犬ではなく、慈悲の調停者として夜明けの街へと歩み出す。",
        "영구기관 장부와 청산가리 앰플을 코트 안주머니 깊숙이 감추었습니다. 그레이브스의 눈을 똑바로 보며 말했습니다. '통로에 묻은 윤활유 때문이오. 발을 헛디딘 명백한 사고사요. 서류에 도장 찍으시오.' 비비안은 믿을 수 없다는 듯 눈물을 흘립니다. 당신은 법의 노예가 아닌, 자비의 설계자로서 제7구역의 여명을 향해 걸어 나갑니다.",
        "Guardas el libro y el cianuro en tu abrigo. Miras a Graves: 'Grasa en la pasarela. Accidente. Sella los papeles.' Vivienne llora de gratitud. Caminas hacia el alba como un arquitecto de la piedad.",
        "Vous glissez le registre et le cyanure dans votre manteau. Vous fixez Graves : 'Graisse sur la passerelle. Accident. Tamponnez le dossier.' Vivienne pleure de soulagement. Vous devenez un architecte de miséricorde.",
        "Sie stecken das Buch und das Gift ein. Sie blicken Graves an: 'Schmierfett auf dem Steg. Reiner Unfall. Stempeln Sie es ab.' Vivienne weint vor Dankbarkeit. Sie gehen als Richter der Gnade in die Morgendämmerung.",
        "Вы прячете гроссбух во внутренний карман пальто. Вы смотрите Грейвсу прямо в глаза: «Машинное масло на мостках. Несчастный случай. Ставь штамп». Вивьен плачет от благодарности. Вы выходите в рассвет 7-го района не просто слугой закона, а вершителем милосердия.",
        "Inscatoli il mastro e l'ampolla nel cappotto. Fissi Graves: 'Olio sui camminamenti. Morte accidentale. Metti il timbro.' Vivienne piange di sollievo. Esci verso l'alba del Distretto 7 come un architetto di misericordia.",
        "Você guarda o livro-razão no casaco e encara Graves: 'Graxa na passarela. Acidente. Carimbe os papéis.' Vivienne chora de alívio. Você caminha para a aurora do Distrito 7 como um arquiteto da misericórdia.",
        "تدس دفتر الحسابات وأمبول السم في جيب معطفك الداخلي. تنظر في عيني غريفز بثبات وتقول: 'شحم ماكينات على الممر، أوريليا انزلقت وماتت بحادث عرضي. اختم الأوراق.' تنهمر دموع فيفيان ممتنة. تمضي نحو فجر المنطقة 7 لا كعبد للنصوص الميتة، بل كمهندس للرحمة الحقيقية."
    ),
    'options': [
        tr('[CASE CONCLUDED: View Final Case Dossier]', '[KASUS SELESAI: Lihat Ringkasan Akhir Dossier]', '【案情终结：查阅终卷档案与调查总结】', '【事件解決：最終事件調書を閲覧する】', '[사건 종결: 최종 사건 기록부 열람]', '[CASO CONCLUIDO: Ver expediente final]', '[AFFAIRE CLASSÉE : Consulter le dossier final]', '[FALL GELÖST: Abschlussbericht ansehen]', '[ДЕЛО ЗАКРЫТО: Просмотреть итоговое досье]', '[CASO CONCLUSO: Visualizza il dossier finale]', '[CASO CONCLUÍDO: Ver dossiê final do caso]', '[القضية أغلقت: استعراض ملف القضية النهائي]')
    ]
}

# 36. ending_syndicate_bust
D['ending_syndicate_bust'] = {
    'speaker': tr('The Revolutionary Firebrand', 'Api Revolusi Rakyat', '燎原革命者', '革命の烽火', '혁명의 불꽃', 'La Chispa Revolucionaria', 'L\'Étincelle Révolutionnaire', 'Der Revolutionäre Funke', 'Искра Революции', 'La Scintilla Rivoluzionaria', 'A Faísca Revolucionária', 'شعلة الثورة الشعبية'),
    'text': tr(
        "You refuse Graves's bribes and Vivienne's fatalism. At dawn, you hand the Perpetuum Ledger and the Syndicate bribery slips directly to the clandestine printing press of the District 7 Worker's Union. By midday, 50,000 gazettes hit the cobblestones. The corrupt precinct captain is ousted, the cartel's factories are paralyzed by general strike, and the truth of Aurelia Vance becomes an indelible spark of liberation.",
        "Kamu menolak suap Graves maupun kepasrahan Vivienne. Saat fajar menyingsing, kamu menyerahkan Buku Besar Perpetuum dan bukti suap langsung ke percetakan gelap Serikat Buruh Distrik 7. Tengah hari, 50.000 surat kabar membanjiri jalanan. Kapten korup digulingkan, pabrik kartel dilumpuhkan oleh pemogokan massal, dan kebenaran Aurelia Vance menjadi martir pembebasan rakyat.",
        "你断然拒绝了格雷夫斯的分赃诱惑，也拒绝了薇薇安悲观的宿命论。黎明时分，你将《永动机总账簿》与警局受贿底单亲手递交给了第七区工人联合会的秘密地下印刷所。正午未至，五万份号外特刊铺天盖地撒满石板路！腐败的警长被当场革职查办，辛迪加财阀的军工流水线在全市总罢工中彻底瘫痪。奥蕾莉亚·梵斯的真相，化作了唤醒整座沉睡工业之城的燎原烈火！",
        "あなたはグレイヴスの賄賂もヴィヴィアンの諦念も拒絶した。夜明け、永久機関の台帳と警官汚職の証拠を第7区労働組合の地下印刷所へ直接持ち込んだ。正午には5万部の号外が街中に撒かれ、腐敗した警察署長は失脚、シンジケートの兵器工場はゼネストで完全に麻痺した。オレリアの死は、解放への消えぬ火花となった。",
        "당신은 그레이브스의 회유도, 비비안의 패배주의도 거부했습니다. 동틀 녘, 당신은 영구기관 장부와 경찰 수뇌부 수뢰 내역을 제7구역 노동조합의 지하 인쇄소로 직접 넘겼습니다. 정오가 되자 5만 부의 호외가 거리를 뒤덮었습니다. 부패한 서장은 쫓겨났고, 카르텔 공장은 총파업으로 마비되었으며, 오렐리아 밴스의 진실은 거대한 해방의 불씨가 되었습니다.",
        "Rechazas los sobornos y el fatalismo. Al alba entregas los libros a la prensa clandestina del Sindicato de Trabajadores. Al mediodía, 50.000 periódicos inundan las calles. El capitán corrupto es destituido y las fábricas del cartel son paralizadas por la huelga.",
        "Vous refusez les pots-de-vin et le fatalisme. À l'aube, vous remettez les registres à l'imprimerie clandestine des travailleurs. À midi, 50 000 journaux inondent la ville. Le commissaire corrompu est déchu et la grève générale paralyse le cartel.",
        "Sie verweigern Schmiergelder und Fatalismus. Im Morgengrauen übergeben Sie das Hauptbuch der Gewerkschaftspresse. Am Mittag überfluten 50.000 Sonderblätter die Straßen. Der korrupte Polizeichef stürzt und die Fabriken stehen still.",
        "Вы отвергаете взятки и фатализм. На рассвете вы передаете гроссбух в подпольную типографию профсоюза рабочих. К полудню 50 000 листовок наводняют город. Коррумпированное начальство смещено, заводы бастуют, а правда об Аурелии Вэнс зажигает восстание.",
        "Rifiuti le tangenti e il fatalismo. All'alba consegni i registri alla tipografia clandestina del sindacato operaio. A mezzogiorno 50.000 copie inondano la città, il capitano corrotto cade e lo sciopero generale paralizza il cartello.",
        "Você rejeita o suborno e o fatalismo. Ao amanhecer entrega os livros à imprensa clandestina dos trabalhadores. Ao meio-dia 50.000 jornais cobrem a cidade, o capitão corrupto é deposto e a greve geral paralisa o cartel.",
        "ترفض رشاوى غريفز وقدرية فيفيان. عند الفجر، تسلم دفتر الحسابات وملفات الفساد إلى المطبعة السرية لنقابة عمال المنطقة 7. بحلول الظهيرة، تنتشر خمسون ألف صحيفة في الشوارع، ويُطاح بالقادة الفاسدين وتشل مصانع الكارتل بإضراب عام تاريخي."
    ),
    'options': [
        tr('[CASE CONCLUDED: View Final Case Dossier]', '[KASUS SELESAI: Lihat Ringkasan Akhir Dossier]', '【案情终结：查阅终卷档案与调查总结】', '【事件解決：最終事件調書を閲覧する】', '[사건 종결: 최종 사건 기록부 열람]', '[CASO CONCLUIDO: Ver expediente final]', '[AFFAIRE CLASSÉE : Consulter le dossier final]', '[FALL GELÖST: Abschlussbericht ansehen]', '[ДЕЛО ЗАКРЫТО: Просмотреть итоговое досье]', '[CASO CONCLUSO: Visualizza il dossier finale]', '[CASO CONCLUÍDO: Ver dossiê final do caso]', '[القضية أغلقت: استعراض ملف القضية النهائي]')
    ]
}

# 37. examine_gantry_lantern
D['examine_gantry_lantern'] = {
    'speaker': tr('Alchemical Lantern Catwalk', 'Anjungan Lentera Alkimia', '上层提灯悬空栈桥', 'ランタン通路の検証', '연금술 등불 통로 조사', 'Pasarela de la Linterna', 'Passerelle de la Lanterne', 'Laternensteg-Untersuchung', 'Мостки алхимического фонаря', 'Camminamento della Lanterna', 'Passarela da Lanterna', 'فحص ممر الفانوس العلوي'),
    'text': tr(
        "A cold draft rushes through the high iron grating. Shards of amber chemical glass crunch beneath your boot. Etched into a broken neck piece is the Grand Syndicate's mercury serpent seal.",
        "Angin dingin berhembus melalui kisi-kisi besi tinggi. Serpihan kaca kimia berwarna kuning kecokelatan berderak di bawah sol sepatumu. Terukir pada pecahan leher botol terdapat lambang ular merkuri milik Sindikat Agung.",
        "冰冷的穿堂风呼啸着刮过镂空的铸铁踏板。脚下传来琥珀色化学试剂瓶碎片的清脆碎裂声。在一枚崩碎的安瓿颈口处，清晰可见辛迪加水银双头蛇的防伪火漆烙印！",
        "高い鉄格子の上を冷たい風が吹き抜ける。琥珀色の化学ガラスの破片が靴の下で砕けた。壊れた瓶の首には大シンジケートの水銀蛇の紋章が刻印されている。",
        "높은 철제 격자 통로 위로 차가운 바람이 휘몰아칩니다. 호박색 화학 약품 유리병 파편이 장화 밑에서 바삭거리며 깨집니다. 깨진 병목에 신디케이트의 수은 뱀 문장이 각인되어 있습니다.",
        "Una corriente fría cruza la rejilla de hierro. Cacos de vidrio ámbar crujen bajo tu bota. En un trozo roto está el sello de la serpiente de mercurio del Sindicato.",
        "Un courant d'air glacé traverse la grille de fer. Des éclats de verre d'ambre crissent sous votre botte, marqués du serpent de mercure du Syndicat.",
        "Kalter Zugwind weht über das Gitter. Bernsteinfarbene Glassplitter knirschen unter der Sohle. Ein Halsstück trägt das Schlangen-Siegel des Syndikats.",
        "Холодный сквозняк свистит сквозь решетку. Осколки янтарного стекла хрустят под сапогом. На горлышке выбита печать ртутного змея Синдиката.",
        "Una corrente gelida sferza la grata. Frammenti di vetro ambrato scricchiolano sotto gli stivali col serpente di mercurio del Sindacato.",
        "Um vento frio sopra pela grade de ferro. Cacos de vidro âmbar estalam sob a bota, marcados com a serpente de mercúrio do Sindicato.",
        "ريح باردة تعصف عبر القضبان الحديدية المرتفعة، وشظايا زجاج الكواشف الكهرماني تطقطق تحت حذائك، ونُقش على عنق الزجاجة ختم أفعى الزئبق الخاص بالنقابة."
    ),
    'voices': [
        voice_item(V_RATIO, B_RATIO, tr(
            "This confirms a clandestine drop hours before the death. The Syndicate delivered the chemical precursors directly to this tower.",
            "Ini mengonfirmasi adanya transaksi rahasia beberapa jam sebelum kematian. Sindikat mengantarkan zat kimia langsung ke menara ini.",
            "这证实了在命案发生前数小时曾有一场秘密交接。辛迪加的密使将这些高浓度化学试剂直接送抵了钟楼高层！",
            "犯行の数時間前に秘密裏の受け渡しがあった決定打だ。シンジケートが化学試薬をこの塔へ直接届けたのだ。",
            "사건 발생 몇 시간 전 은밀한 접선이 있었음을 증명합니다. 신디케이트가 이 화학 시약을 시계탑으로 직접 배달한 것입니다.",
            "Esto confirma una entrega clandestina horas antes de la muerte. El Sindicato trajo los químicos a la torre.",
            "Ceci confirme un échange clandestin quelques heures avant le drame. Le Syndicat a livré les précurseurs ici même.",
            "Das bestätigt eine geheime Übergabe wenige Stunden vor der Tat. Das Syndikat lieferte die Chemikalien direkt hierher.",
            "Это доказывает тайную встречу за пару часов до гибели. Синдикат доставил химикаты прямо в башню.",
            "Ciò conferma una consegna clandestina poche ore prima del delitto. Il Sindacato ha portato qui i precursori.",
            "Isso confirma uma entrega secreta horas antes da morte. O Sindicato entregou os químicos diretamente nesta torre.",
            "يؤكد هذا حدوث تسليم سري قبل الجريمة بساعات، حيث سلمت النقابة المركبات الكيميائية مباشرة إلى أعلى البرج."
        ))
    ],
    'options': [
        tr('[Log clue: Shattered Reagents & Syndicate Crest]', '[Catat bukti: Serpihan Reagen Kimia & Lambang Sindikat]', '【记录线索：碎裂的化学试剂瓶与辛迪加火漆印】', '【手がかりを記録：破壊された試薬瓶とシンジケートの紋章】', '[단서 기록: 깨진 시약병과 신디케이트 문장]', '[Registrar pista: Reactivos Rotos y Emblema]', '[Noter l\'indice : Réactifs Brisés et Sceau du Syndicat]', '[Hinweis aufnehmen: Zerschlagene Reagenzien]', '[Записать улику: Осколки реагентов и печать]', '[Registra indizio: Reagenti Infranti e Sigillo]', '[Registrar pista: Reagentes Quebrados e Brasão]', '[تسجيل الدليل: زجاجات كواشف محطمة وخاتم النقابة]'),
        tr('[Step back down to the main floor]', '[Kembali ke lantai utama]', '【步下栈桥，回到主钟楼】', '【主フロアへ戻る】', '[메인 플로어로 복귀]', '[Bajar al piso principal]', '[Redescendre au niveau principal]', '[Zurück zum Hauptboden]', '[Спуститься на главный этаж]', '[Torna al piano principale]', '[Descer para o piso principal]', '[النزول للطابق الرئيسي]')
    ]
}

# 38. examine_chime_bell
D['examine_chime_bell'] = {
    'speaker': tr('Colossal Bell & Acoustic Escapement', 'Lonceng Raksasa & Escapement Akustik', '圣艾琳青铜巨钟与共振击发机构', '巨大青銅鐘と音響脱進機', '청동 거대 종과 음향 탈진 장치', 'Campana Colosal y Disparador Acústico', 'Cloche Colossale et Déclencheur Acoustique', 'Kolossale Glocke und Auslöser', 'Исполинский колокол и спуск', 'Campana Colossale e Scappamento Acustico', 'Sino Colossal e Escape Acústico', 'الجرس الضخم وآلية الإفلات بالرنين'),
    'text': tr(
        "You look up into the cavernous rim of the eight-ton bronze bell. Tied to the heavy iron clapper is a taut piano wire running through tiny brass pulleys down to the pendulum latch.",
        "Kamu menatap ke dalam rongga lonceng perunggu seberat delapan ton. Terikat pada pemukul besi adalah kawat piano tegang yang menjulur melalui puli kuningan kecil menuju kait pendulum.",
        "你仰头望向重达八吨的圣艾琳青铜大钟内膛。在沉重的铁铸钟锤上，死死拴着一根高张力琴钢丝，通过一系列隐秘精巧的微型黄铜滑轮，笔直延伸贯穿至下方的钟摆主搭扣上！",
        "8トンの巨大な青銅鐘の縁を見上げる。重い鉄の打鐘レバーにピアノ線が結ばれ、極小の滑車を通って振り子の掛け金へと繋がっている。",
        "8톤 무게의 거대한 청동 종 안쪽을 올려다봅니다. 무거운 종 추에 팽팽한 피아노선이 묶여 작은 황동 도르래를 통해 진자 걸쇠까지 이어져 있습니다.",
        "Miras dentro de la campana de bronce de ocho toneladas. Atado al badajo hay un alambre de piano que baja hacia el pestillo del péndulo.",
        "Vous levez les yeux sous la cloche de huit tonnes. Relié au battant, un fil d'acier court jusqu'au loquet du balancier via de petites poulies.",
        "Sie blicken in die Acht-Tonnen-Glocke. Ein Klavierdraht führt vom Klöppel über winzige Rollen zum Pendelriegel.",
        "Ты заглядываешь под свод восьмитонного колокола. К языку привязан стальной тросик, идущий через шкивы к защелке маятника.",
        "Guardi sotto la campana da otto tonnellate. Una corda d'acciaio è legata al battaglio e scende fino al fermo del pendolo.",
        "Você olha sob o sino de oito toneladas. Preso ao badalo há um fio de aço que desce até o trinco do pêndulo.",
        "نظرت لأعلى داخل تجويف الجرس البرونزي الضخم ذي الثمانية أطنان، فرأيت سلك بيانو مشدودًا يربط لسان الجرس الحديدي ببكرات نحاسية صغيرة تتصل مباشرة بسقاطة البندول."
    ),
    'voices': [
        voice_item(V_MOTORICS, B_MOTORICS, tr(
            "Ingenious acoustics. When the clock struck 03:42, the vibration and swing of the clapper yanked the tripwire, releasing the fatal counterweight automatically.",
            "Akustik yang sangat jenius. Saat jam berdentang pukul 03:42, getaran dan ayunan pemukul menarik kawat picu, menjatuhkan beban maut secara otomatis.",
            "鬼斧神工的声学机械联动！当大钟在凌晨03:42分震响敲击的瞬间，钟锤剧烈的晃动和共振瞬间扯断了引线卡笋，配重巨臂完全是机械自动化脱钩斩下的！",
            "見事な音響機械だ。時計が3時42分を打った瞬間、鐘の振動がワイヤーを引き、致命的なカウンターウェイトを自動的に落としたのだ。",
            "기막힌 음향 기계 장치입니다. 시계가 3시 42분을 치는 순간, 종 추의 진동이 와이어를 당겨 평형추를 자동으로 떨어뜨린 겁니다.",
            "Acústica ingeniosa. Al dar las 03:42, la vibración del badajo tiró del cable, soltando el contrapeso automáticamente.",
            "Acoustique ingénieuse. Au coup de 03h42, la vibration du battant a tiré le fil, libérant le contrepoids automatiquement.",
            "Geniale Akustik. Beim Schlag um 03:42 Uhr riss die Schwingung am Draht und löste das Gegengewicht automatisch aus.",
            "Гениальная механика. В 03:42 удар колокола дернул тросик и автоматически спустил противовес на жертву.",
            "Acustica geniale. Al rintocco delle 03:42, la vibrazione del battaglio ha azionato il cavo liberando il contrappeso.",
            "Acústica engenhosa. Às 03:42, a vibração do badalo puxou o fio, soltando o contrapeso automaticamente.",
            "هندسة صوتية بالغة البراعة! حين دقت الساعة عند 03:42 سحب اهتزاز لسان الجرس سلك التفجير وأفلت ثقل الموازنة القاتل آليًا دون وجود أحد بجانبها."
        ))
    ],
    'options': [
        tr('[Log clue: Acoustic Resonance Tripwire Mechanism]', '[Catat bukti: Mekanisme Kawat Picu Akustik]', '【记录线索：钟鸣声学共振触动引线】', '【手がかりを記録：音響共鳴トラップワイヤー機構】', '[단서 기록: 음향 공명 격발 와이어 장치]', '[Registrar pista: Mecanismo de Resonancia Acústica]', '[Noter l\'indice : Mécanisme de Déclenchement Acoustique]', '[Hinweis aufnehmen: Akustischer Resonanz-Auslösedraht]', '[Записать улику: Акустический спусковой механизм]', '[Registra indizio: Meccanismo a Risonanza Acustica]', '[Registrar pista: Mecanismo de Fio Acústico]', '[تسجيل الدليل: آلية سلك التفجير بالرنين الصوتي]'),
        tr('[Step down from the bell housing]', '[Turun dari kubah lonceng]', '【从钟顶支架上走下来】', '【鐘楼から降りる】', '[종탑 하부로 내려간다]', '[Bajar del campanario]', '[Descendre de la cloche]', '[Vom Glockengehäuse herabsteigen]', '[Спуститься из-под колокола]', '[Scendi dalla cella campanaria]', '[Descer da torre do sino]', '[النزول من حجرة الجرس]')
    ]
}

print(f"Total dialogue nodes generated: {len(D)}")

# Import CLUES from generate_complete_i18n.py
from generate_complete_i18n import CLUES, NEW_POIS

output_file = os.path.join(os.path.dirname(__file__), '..', 'src', 'dialogue_i18n.js')

content = f"""// Aenigma Complete 12-Language Story & Clue Localizations
// Fully covers all 38 Dialogue Nodes, 13 Case Clues, and Crime Scene POIs
// Supported Languages: en, id, zh, ja, ko, es, fr, de, ru, it, pt, ar

export const DIALOGUE_I18N_FULL = {json.dumps(D, ensure_ascii=False, indent=2)};

export const CLUES_I18N_FULL = {json.dumps(CLUES, ensure_ascii=False, indent=2)};

export const NEW_POIS_I18N = {json.dumps(NEW_POIS, ensure_ascii=False, indent=2)};
"""

with open(output_file, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Successfully generated {output_file} ({len(content)} bytes)")
