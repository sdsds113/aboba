# Генерирует storyboard.md (промпты для Flow) и timeline.json (для Remotion) из одного источника.
import json, os
D = os.path.dirname(os.path.abspath(__file__))

STYLE_IMG = ("Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, "
             "large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, "
             "35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, "
             "soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.")
STYLE_VID = ("Style: Pixar-style 3D animated feature film, cinematic camera work, weighted natural character acting, subtle secondary "
             "motion in hair and fabric, film look, 16:9. Characters never talk: mouths stay closed except for smiles and laughter. "
             "No text, letters, numbers or logos ever appear on screen. Audio: soft ambience only, no music, no voices.")

CH = {
 "BOSS":    ("Woman_in_tweed_jacket_smiling", "BOSS, a woman in her 40s with dark hair in a sleek low bun, warm brown eyes, gentle smile, cream tweed jacket with black piping, a big black bow on the chest and black round buttons"),
 "GLASSES": ("Man_sitting_at_desk", "GLASSES, a man with voluminous swept-back brown hair, rectangular dark-framed glasses, light stubble and a short goatee, black suit jacket, white open-collar shirt"),
 "VEST":    ("Man_standing_in_corridor", "VEST, a man with short dark side-parted hair, strong eyebrows, short beard, intense serious gaze, dark brown waistcoat over a white shirt"),
 "SMILE":   ("Man_sitting_in_cozy_cafe", "SMILE, a cheerful man with short blond-brown hair, round face and a big toothy grin, brown blazer over a black t-shirt"),
 "BLONDE":  ("Woman_sitting_at_wooden_table", "BLONDE, a woman with long straight blonde hair, blue eyes, calm smile, fitted dark chocolate-brown long-sleeve top, thin long silver necklace"),
 "BEARD":   ("Man_sitting_on_red_chair", "BEARD, a man with light-brown hair with a soft forward fringe, blue-grey eyes, full short brown beard, navy suit jacket, white open shirt, chunky silver watch"),
 "ROUND":   ("Man_smiling_wearing_blazer", "ROUND, a man with short dark textured hair, round thin metal-frame glasses, thick dark beard with grey streaks, black blazer with grey lapel trim, white t-shirt"),
 "SPEAKER": ("Man_speaking_on_stage", "SPEAKER, a man with short dark hair and a receding hairline, rectangular black glasses, stubble, navy suit, white shirt"),
 "BALD":    ("Man_speaking_into_microphone", "BALD, a bald man with light blue eyes, clean-shaven round face, black suit, white shirt, bright red pocket square"),
}
LOC = {
 "BLUE_EXT": "a small cozy one-storey wooden house painted soft sky blue with white window frames and a tiny porch, on a quiet green street",
 "BLUE_INT": "the interior of the small blue house (one cozy room with three old wooden desks, a desk lamp, cardboard boxes, a cork board with blank paper sketches, warm light through small white-framed windows)",
 "RED_EXT":  "a large modern two-storey house painted deep red, big warm-lit windows, dark walnut wood details and black metal frames",
 "RED_INT":  "the interior of the big red house (a spacious open-plan space with walnut wood slat walls, glossy deep red accent walls, black cylindrical pendant lights, a long wooden table, green plants and big windows)",
}

def ch(*names): return "; ".join("{} ({})".format(*CH[n][1].split(", ",1)) for n in names)

# Каждая генерация = один клип Flow (8 с). cuts: (shot_id, tl_in, tl_out, clip_in, VO, описание RU, оверлей Remotion или None)
G = [
 dict(id="G01", scene="1. Пролог", ingr=["RED_EXT (плейт локации)"],
  cuts=[("S01-01",0.0,5.8,0.5,"У каждой большой истории есть свой дом.","Общий план: большой красный дом на рассвете, медленный наезд",
         {"type":"title","text":"Наш дом","in":0.4,"out":1.9,"note":"опционально, до начала голоса"})],
  img=f"Wide establishing shot at early dawn: {LOC['RED_EXT']}, standing on a quiet street with a few trees, soft pink-gold morning sky, light mist, one window already glowing warm. Low camera, slightly heroic angle.",
  vid="Single continuous shot, 8 seconds. Slow cinematic push-in toward the big red house at dawn. Mist drifts, a few leaves fall, windows light up warm one after another, a bird flies across the frame. Calm, magical, opening-of-a-movie feeling."),

 dict(id="G02", scene="2. Синий домик", ingr=["BLUE_EXT","BLUE_INT","BOSS","GLASSES","BLONDE"],
  cuts=[("S02-01",5.8,9.0,0.0,"Наша началась с маленького синего домика.","Синий домик снаружи, кран вниз к крыльцу",{"type":"year","text":"2014","note":"год-заглушка, уточнить"}),
        ("S02-02",9.0,13.8,3.2,"Нас было совсем немного. Несколько столов, одна большая идея —","Внутри: три стола, коробки; Босс прикалывает на доску набросок домика, за двумя столами Глассес и Блонд поднимают головы и улыбаются",{"type":"lower_third_double","note":"GLASSES + BLONDE, две плашки"})],
  img=f"Morning, gentle crane-high view of {LOC['BLUE_EXT']}. Sunlight, a bicycle leaning on the porch, a small potted plant by the door. Cozy, humble, hopeful beginning.",
  vid=("0-3.2s: slow crane down from the treetops to the porch of the small sky-blue wooden house, morning sun, birds. "
       f"CUT TO 3.2-8s: {LOC['BLUE_INT']}. {ch('BOSS')} pins a hand-drawn sketch of a little house (simple lines, no words) onto the cork board, steps back and looks at it with a quiet confident smile. Slow dolly sideways past the desks: at two of them sit {ch('GLASSES')} and {ch('BLONDE')}, who look up from their work and smile at her.")),

 dict(id="G03", scene="2–3. Начало / новые люди", ingr=["BLUE_INT","BOSS","SMILE"],
  cuts=[("S02-03",13.8,16.8,0.3,"и человек, который в неё поверил.","Крупно: Босс у окна, свет на лице, решительная улыбка",{"type":"lower_third","name":"Имя Фамилия","role":"Руководитель","note":"имя именинницы"}),
        ("S03-01",16.8,20.1,4.0,"Потом в доме стали появляться новые люди.","Дверь открывается, в проёме Смайл с коробкой и красной кружкой; Босс встречает",{"type":"lower_third","name":"Имя Фамилия","role":"Департамент","note":"SMILE"})],
  img=f"Close-up portrait of {ch('BOSS')}, standing by a small white-framed window inside the cozy blue house, soft golden morning light on her face, looking outside with a hopeful determined smile. Background: blurred wooden desks and boxes.",
  vid=(f"0-3.5s: close-up of BOSS by the window, she slowly turns her head from the window toward camera, a confident warm smile forms, dust particles glow in the sunbeam. "
       f"CUT TO 3.5-8s: medium shot of the front door of the blue house from inside. The door swings open, bright daylight floods in, {ch('SMILE')} stands in the doorway holding a cardboard box with a red tumbler cup on top, grinning widely; BOSS steps into frame from the left and welcomes him with an open hand gesture.")),

 dict(id="G04", scene="3. Команда собирается", ingr=["VEST","ROUND","SPEAKER"],
  cuts=[("S03-02",20.1,22.0,0.1,"Каждый — со своим характером,","Вест в дверях: скрещённые руки, поднятая бровь",{"type":"lower_third","name":"Имя Фамилия","role":"Департамент","note":"VEST"}),
        ("S03-03",22.0,23.2,2.2,"своим опытом","Раунд входит со стопкой книг, поправляет круглые очки",{"type":"lower_third","name":"Имя Фамилия","role":"Департамент","note":"ROUND"}),
        ("S03-04",23.2,24.4,4.2,"и своей правдой.","Спикер входит, жестикулирует с кликером, увлечённо",{"type":"lower_third","name":"Имя Фамилия","role":"Департамент","note":"SPEAKER"})],
  img=f"Medium shot in the doorway of the small blue house, bright daylight behind: {ch('VEST')}, standing with arms crossed, one eyebrow raised, sizing up the room. Pixar character-introduction framing.",
  vid=("Three character-introduction shots in the same blue-house doorway, quick cuts. "
       f"0-2s: {ch('VEST')} stands in the doorway with arms crossed, slowly raises one eyebrow, then gives a tiny approving nod. "
       f"CUT TO 2-4s: {ch('ROUND')} steps in carrying a tall wobbly stack of books, stops, pushes his round glasses up with one finger and beams. "
       f"CUT TO 4-6.5s: {ch('SPEAKER')} walks in mid-gesture, passionately explaining something with a presentation clicker in his hand, eyes bright (mouth closed, expressive hands only). "
       "6.5-8s: hold on SPEAKER.")),

 dict(id="G05", scene="3–4. По пути / ночи", ingr=["BALD","BEARD","BLUE_INT"],
  cuts=[("S03-05",24.4,25.8,0.4,"Такие разные...","Лысый и Бородач одновременно протискиваются в дверь и застревают плечами",{"type":"lower_third_double","note":"BALD + BEARD, две плашки"}),
        ("S03-06",25.8,28.9,2.7,"Но почему-то нам всем было по пути.","Оба смеются, камера отъезжает: вся команда в тесной комнате вокруг одного стола",None)],
  img=f"Comedic medium shot: {ch('BALD')} and {ch('BEARD')} both trying to squeeze through the narrow front door of the blue house at the same time, stuck shoulder to shoulder, turning their heads to look at each other in surprise.",
  vid=(f"0-2.5s: BALD and BEARD get stuck side by side in the narrow doorway, look at each other, then both burst out laughing. "
       f"CUT TO 2.5-8s: wide shot slowly pulling back: the whole team of nine crammed into the small cozy blue room around one wooden table, laughing together, boxes everywhere, warm daylight.")),

 dict(id="G05N", scene="4. Бессонные ночи", ingr=["BLUE_INT","GLASSES","BLONDE"],
  cuts=[("S04-01",28.9,33.85,0.5,"Были бессонные ночи и задачи, которые казались невозможными.","Ночь, дождь по стеклу, лампы, уставшая команда за столами",None)],
  img=f"Night, view through a rain-streaked small white-framed window into the cozy blue house: desk lamps glowing, coffee mugs, {ch('GLASSES')} and {ch('BLONDE')} working late at the wooden desks, tired but focused.",
  vid="Single continuous shot, 8 seconds. Camera starts outside the rain-streaked window at night and slowly pushes through the glass into the room: desk lamps, stacks of paper, coffee mugs; GLASSES rubs his tired eyes under his glasses, BLONDE keeps working. Quiet late-night mood, blue-and-amber light."),

 dict(id="G06", scene="4. Трудности", ingr=["VEST","SPEAKER","BLONDE","SMILE"],
  cuts=[("S04-02",33.85,35.6,0.05,"Мы спорили,","Вест и Спикер спорят у доски со стрелками (без текста)",None),
        ("S04-03",35.6,37.2,1.9,"ошибались, начинали заново.","Блонд комкает лист и бросает, Смайл ловит, разворачивает, оба смеются",None),
        ("S04-04",37.2,39.05,3.7,"И каждый раз справлялись.","Крупно: руки команды ложатся друг на друга на столе",None),
        ("S04-05",39.05,41.3,5.7,"Потому что вместе.","Рассвет в окне, команда ликует, дают пять",None)],
  img=f"Night, inside the blue house: {ch('VEST')} and {ch('SPEAKER')} face each other in front of a whiteboard covered only with arrows, circles and boxes (no words), both gesturing passionately mid-argument, lamp light, rain on the window.",
  vid=(f"0-1.8s: VEST and SPEAKER argue in front of the whiteboard with big passionate hand gestures (no talking, mouths closed, expressive faces). "
       f"CUT TO 1.8-3.6s: {ch('BLONDE')} crumples a sheet of paper and tosses it over her shoulder; {ch('SMILE')} catches it, unfolds it, they look at each other and laugh. "
       "CUT TO 3.6-5.6s: top-down close-up of the wooden table: hands in different sleeves (cream tweed with black trim, navy suit, brown blazer, black blazer, white shirt) stack one on top of another. "
       "CUT TO 5.6-8s: dawn light bursts through the window, the tired team cheers, high-fives and hugs.")),

 dict(id="G07", scene="5. Красный дом", ingr=["BLUE_EXT","RED_EXT","BOSS"],
  cuts=[("S05-01",41.3,43.6,0.3,"Синий домик стал нам мал.","Синий домик «трещит»: окна распахиваются, локоть торчит, крыша приподнимается",None),
        ("S05-02",43.6,46.3,3.2,"Мы переехали в большой красный дом —","Команда с коробками идёт к красному дому, Босс впереди открывает двери",{"type":"year","text":"2024","note":"год-заглушка"})],
  img=f"Comedic exterior: {LOC['BLUE_EXT']}, visibly overstuffed — boxes pressed against every window, an elbow sticking out of one window, the roof slightly lifted, the door bulging. Daylight.",
  vid=("0-3s: the overstuffed little blue house wobbles, a window pops open and a stack of papers flutters out, the roof lifts a little and settles back. Playful. "
       f"CUT TO 3-8s: wide tracking shot: the team walks up a path carrying cardboard boxes and potted plants toward {LOC['RED_EXT']}; {ch('BOSS')} walks first, reaches the big doors and swings them open, warm golden light pours out onto everyone.")),

 dict(id="G08", scene="5–6. Строить смелее / 2026", ingr=["RED_INT"],
  cuts=[("S05-03",46.3,50.0,0.3,"и начали строить ещё смелее.","Кран вверх: огромное пространство красного дома, команда распаковывается",None),
        ("S06-01",50.0,53.4,4.3,"И вот уже две тысячи двадцать шестой год.","Отрывной календарь на стене, СТАТИЧНАЯ камера, чистый лист",{"type":"calendar","text":"2026","note":"Remotion рисует цифры и перелистывание"})],
  img=f"High wide shot of {LOC['RED_INT']}, the team (small figures) unpacking boxes, hanging lamps, placing plants, sunlight streaming in. Sense of scale and new beginnings.",
  vid=("0-4s: crane shot rising up and back, revealing the huge bright interior of the red house, people unpacking boxes, someone climbs a ladder to hang a pendant lamp, plants placed, sunlight. "
       "CUT TO 4-8s: LOCKED-OFF static camera, close-up of a tear-off wall calendar hanging on a walnut wall: a large completely blank cream page, nothing printed on it. Only soft light shifts slightly; the calendar itself does not move.")),

 dict(id="G09", scene="6. Семья? Клан? Династия?", ingr=["BOSS","RED_INT","(вся команда — лучше стартовый кадр)"],
  cuts=[("S06-03",57.2,58.1,0.4,"Семья?","Поза «семья»: все обнимаются, тёплый смех",{"type":"punch_word","text":"Семья?"}),
        ("S06-04",58.1,58.8,2.4,"Клан?","Поза «клан»: скрещённые руки, суровые лица, рапид, как постер боевика",{"type":"punch_word","text":"Клан?"}),
        ("S06-05",58.8,59.85,4.3,"Династия?","Поза «династия»: парадный портрет, Босс в кресле в центре",{"type":"punch_word","text":"Династия?"}),
        ("S06-06",59.85,62.0,5.85,"Наверное, со стороны виднее.","Снаружи через окно: команда смеётся, на подоконнике голубь наклоняет голову",None)],
  img=f"Group photo pose in {LOC['RED_INT']}: the whole team of nine hugging each other warmly like a big family, {ch('BOSS')} in the center, everyone laughing. Camera at chest height, frontal, symmetrical.",
  vid=("Three poses of the same group, like a photographer changing styles, then an outside view. "
       "0-2s: the whole team hugs like a warm family, laughing, BOSS in the center. "
       "CUT TO 2-4s: same team, now a serious 'clan' movie-poster pose: arms crossed, stern faces, slow-motion step toward camera, dramatic backlight. "
       "CUT TO 4-6s: same team in a formal 'dynasty' royal-portrait pose: BOSS seated in a grand armchair in the center, everyone standing around her, dignified, chins up. "
       "CUT TO 5.8-8s: view from outside through a big window of the red house: the team inside laughing together; a pigeon on the windowsill in the foreground tilts its head, watching them curiously.")),

 dict(id="G10", scene="6. Что хочется сохранить", ingr=["SPEAKER","BEARD","BLONDE"],
  cuts=[("S06-07",62.0,67.35,0.2,"Мы многого добились вместе. Но есть то, что особенно хочется сохранить.","Полка с наградами и монитор с графиками → фокус на команду, смеющуюся с кофе",None),
        ("S06-08",67.35,69.75,5.6,"Мы умеем поддержать друг друга.","Спикер оступается с папками, Бородач и Блонд протягивают руки и подхватывают",None)],
  img=f"Close-up of a shelf in {LOC['RED_INT']}: abstract golden and glass trophies and a monitor showing colorful rising bar charts (shapes only, no numbers or words); behind them, out of focus, the team chatting with coffee mugs.",
  vid=("0-5.6s: slow lateral dolly along the shelf of trophies and the monitor with rising bar charts, then a smooth rack focus to the background where the team shares a warm laugh over coffee; the trophies blur away. "
       f"CUT TO 5.6-8s: {ch('SPEAKER')} trips on a step while carrying a tall stack of folders; {ch('BEARD')} and {ch('BLONDE')} instantly reach out their hands and catch him and the folders; relieved smiles.")),

 dict(id="G11", scene="6. Посмеяться / помочь", ingr=["SMILE","BALD","ROUND"],
  cuts=[("S06-09",69.75,72.5,0.2,"Посмеяться друг над другом — и над собой.","Смайл надевает Лысому праздничный колпак; Лысый видит себя в отражении и хохочет",None),
        ("S06-10",72.5,74.6,3.0,"Заметить, когда кому-то трудно.","Вечер, Раунд один за столом, голова в руках; Вест замечает из дверей",None),
        ("S06-11",74.6,76.3,5.5,"Подхватить. Помочь.","Вест садится рядом, рука на плечо; Глассес приносит две кружки чая",None)],
  img=f"Medium shot in {LOC['RED_INT']}: {ch('SMILE')} sneaks up behind {ch('BALD')} holding a striped paper party hat above his bald head, mischievous grin.",
  vid=("0-3s: SMILE pops the striped party hat onto BALD's head; BALD sees himself in a glass partition reflection and bursts out laughing at himself, SMILE laughs too. "
       f"CUT TO 3-5.5s: evening, warm desk lamp: {ch('ROUND')} sits alone at his desk, head in his hands, exhausted; in the background doorway {ch('VEST')} stops and notices him. "
       f"CUT TO 5.5-8s: VEST sits down next to ROUND and puts a hand on his shoulder; {ch('GLASSES')} arrives with two steaming mugs of tea; ROUND looks up and smiles.")),

 dict(id="G12", scene="6. За один стол", ingr=["RED_INT","BOSS","(вся команда — лучше стартовый кадр)"],
  cuts=[("S06-12",76.3,80.5,0.5,"И после всех споров снова сесть за один стол.","Все садятся за длинный стол, передают тарелки, тепло",None)],
  img=f"Wide warm evening shot of {LOC['RED_INT']}: the long wooden table set with simple dishes, teapots and bread; the team of nine pulling out chairs and sitting down together, {ch('BOSS')} at the head of the table, warm pendant light.",
  vid="Single continuous shot, 8 seconds. Slow dolly along the long table as everyone sits down, passes plates and bread to each other, someone pours tea, friendly laughter, warm pendant light, cozy evening mood."),

 dict(id="G13", scene="7. Человек, который нас собрал", ingr=["BOSS","RED_INT"],
  cuts=[("S07-01",80.5,85.95,0.1,"И всё это стало возможным, потому что однажды ты решила нас собрать.","Босс идёт через пространство красного дома, люди оборачиваются; медленный наезд",None),
        ("S07-02",85.95,88.25,5.65,"Объединить. Вдохновить.","Команда собирается вокруг неё в круг, кран с вращением снизу",None)],
  img=f"Hero shot: {ch('BOSS')} walking toward camera through {LOC['RED_INT']}, warm backlight, people at desks in the soft-focus background turning to look at her.",
  vid=("0-5.6s: slow push-in as BOSS walks confidently toward camera through the red house; team members at their desks look up and turn toward her with smiles; warm backlight, gentle lens flare. "
       "CUT TO 5.6-8s: low-angle shot circling around BOSS as the whole team gathers around her in a circle, everyone looking at her, inspired.")),

 dict(id="G14", scene="7. Доверить задачи", ingr=["BOSS","SPEAKER"],
  cuts=[("S07-03",88.25,90.4,0.2,"Доверить нам большие задачи —","Босс вручает Спикеру большой свёрнутый чертёж с красной лентой",None),
        ("S07-04",90.4,93.6,2.6,"и помочь поверить, что мы с ними справимся.","Крупно Спикер: сомнение → Босс кивает → он улыбается и расправляет плечи",None)],
  img=f"Medium two-shot: {ch('BOSS')} handing a large rolled blueprint tied with a red ribbon to {ch('SPEAKER')}, who looks surprised and slightly unsure.",
  vid=("0-2.5s: BOSS hands the big rolled blueprint with a red ribbon to SPEAKER; he takes it carefully, surprised by its weight. "
       "CUT TO 2.5-8s: close-up of SPEAKER: doubt in his eyes, he glances at BOSS (over-the-shoulder, BOSS out of focus) — she gives a calm reassuring nod — his face changes, he smiles, straightens his shoulders and grips the blueprint with confidence.")),

 dict(id="G15", scene="7. Своё место", ingr=["BOSS","BEARD","ROUND"],
  cuts=[("S07-05",93.6,96.5,0.3,"Ты умеешь находить для каждого своё место.","Босс подводит Бородача к столу у окна в луче солнца — идеально подходит",None),
        ("S07-06",96.5,99.4,4.6,"Видеть, что человеку интересно, что у него получается","Босс за плечом Раунда смотрит на его планшет с яркими формами, гордо кивает",None)],
  img=f"Sunny corner of {LOC['RED_INT']}: {ch('BOSS')} gently guiding {ch('BEARD')} by the shoulder toward a desk by a big window, a beam of sunlight falling exactly on the empty chair.",
  vid=("0-4.5s: BOSS guides BEARD to the sunlit desk by the window; he sits down, looks around, it fits him perfectly, he smiles; sunlight warms the frame. "
       f"CUT TO 4.5-8s: over-the-shoulder: BOSS leans behind {ch('ROUND')} looking at his drawing tablet full of bright abstract colorful shapes (no text); she nods proudly, he turns and smiles back.")),

 dict(id="G16", scene="7. Вырасти / больше чем руководитель", ingr=["(вся команда)","RED_INT"],
  cuts=[("S07-07",99.4,102.35,0.2,"и в чём он ещё может вырасти.","Крупно: росток в горшке на столе вырастает в маленькое цветущее дерево",None),
        ("S07-08",102.35,105.3,4.2,"Мы давно считаем тебя больше, чем руководителем.","Боковой проезд по лицам команды, все смотрят на неё (за кадром) с теплом",None)],
  img="Macro close-up of a tiny green sprout in a small ceramic pot on a walnut desk, warm sunlight, dust particles glowing, red wall softly blurred behind.",
  vid=("0-3.5s: time-lapse-like magical growth: the tiny sprout grows into a small blooming tree with little white flowers, leaves unfurling, warm light. "
       "CUT TO 3.5-8s: slow lateral dolly across the faces of the team members standing side by side, all looking slightly off-camera toward someone they love and respect, warm grateful smiles.")),

 dict(id="G17", scene="7. Путеводная звезда", ingr=["BOSS","RED_EXT"],
  cuts=[("S07-09",105.3,108.45,0.3,"Ты для нас — родной человек. Наставник.","Крупно Босс: тронута, глаза блестят, рука на сердце",None),
        ("S07-10",108.45,111.6,4.3,"Наша путеводная звезда.","Ночь, красный дом, камера поднимается к яркой звезде над крышей",None)],
  img=f"Emotional close-up of {ch('BOSS')}, warm soft light, eyes glistening, touched smile, one hand slowly rising to her heart.",
  vid=("0-4s: close-up of BOSS, deeply touched, her eyes glisten, she places her hand on her heart and smiles warmly. "
       f"CUT TO 4-8s: night exterior: {LOC['RED_EXT']} with all windows glowing; camera slowly tilts up from the roof to the starry sky where one bright star twinkles and gently flares.")),

 dict(id="G18", scene="8. Почему мультик?", ingr=["SMILE","BALD","RED_INT"],
  cuts=[("S08-01",111.6,114.5,0.3,"А почему мы решили подарить тебе мультик?","Смайл поворачивается прямо в камеру, пожимает плечами с хитрой улыбкой (4-я стена)",None),
        ("S08-02",114.5,117.4,3.6,"Потому что сегодня — твой день рождения.","Магия: бумаги взлетают конфетти, графики на мониторе превращаются в гирлянды",None)],
  img=f"Medium close-up in {LOC['RED_INT']}: {ch('SMILE')} turning to look straight into the camera with a playful knowing grin and raised eyebrows, {ch('BALD')} beside him grinning too.",
  vid=("0-3.5s: SMILE turns to look directly into the camera, breaks the fourth wall, shrugs with a mischievous grin and raised eyebrows; BALD next to him nods along. "
       "CUT TO 3.5-8s: magical transformation of an office desk: papers fly up and turn into colorful confetti, the lines of a bar chart on the monitor stretch out of the screen and become glowing string-light garlands across the room, balloons pop into existence. Joyful.")),

 dict(id="G19", scene="8. Возвращает в детство", ingr=["GLASSES","(детские версии — лист персонажей)","RED_INT"],
  cuts=[("S08-03",117.4,120.85,0.2,"А день рождения всегда немного возвращает в детство.","Глассес и его 7-летняя версия синхронно поправляют очки",None),
        ("S08-04",120.85,124.3,4.1,"Туда, где собираются близкие, где ждёшь чуда","Детские версии команды бегут с шарами по праздничному красному дому",None)],
  img=f"Medium shot in the festive red house: {ch('GLASSES')} standing next to a 7-year-old boy version of himself (same hair, same tiny rectangular glasses, tiny suit), both looking at camera.",
  vid=("0-3.8s: GLASSES and his child self standing side by side push their glasses up their noses at exactly the same moment, notice each other and grin. "
       "CUT TO 3.8-8s: the children versions of the team (kids with the same hairstyles, glasses and outfit colors as the adults) run laughing through the festively decorated red house holding balloons; tracking shot at kid height.")),

 dict(id="G20", scene="8. Все рядом / родители", ingr=["BOSS","(детская Босс)","RED_INT"],
  cuts=[("S08-05",124.3,127.8,0.3,"и где особенно важно, чтобы все были рядом.","Взрослые и дети-версии держатся за руки вокруг стола, Босс в центре",None),
        ("S08-06",127.8,131.35,4.3,"И сегодня мы хотим сказать спасибо твоим родителям.","Уютная квартира, винтажный свет: маленькая Босс с бантом бежит к двум взрослым (лица вне кадра), её подхватывают",None)],
  img=f"Festive red house: adults and their child versions holding hands in a big circle around a decorated table, {ch('BOSS')} in the middle, string lights, balloons, everyone smiling.",
  vid=("0-4s: slow circular camera move around the circle of adults and kids holding hands, BOSS in the center laughing, string lights twinkling. "
       "CUT TO 4-8s: warm nostalgic cozy home with vintage furniture and soft golden lamp light: a 6-year-old girl with dark hair, brown eyes and a big black bow in her hair runs toward two adults (seen only from the waist down, faces out of frame) who lift her up into a hug.")),

 dict(id="G21", scene="8. За тебя / традиции", ingr=["BOSS","(детская Босс)","RED_INT"],
  cuts=[("S08-07",131.35,132.3,0.5,"За тебя.","Крупно: девочка улыбается → матч-кат",None),
        ("S08-08",132.3,137.35,2.2,"За твоё чувство семьи, уважение к традициям и умение собирать людей.","Взрослая Босс с той же улыбкой расстилает большую скатерть с орнаментом, команда несёт пироги и чайники",None)],
  img="Close-up of a 6-year-old girl with dark hair, warm brown eyes and a big black bow in her hair, smiling a gentle closed-lip smile, warm vintage lamp light.",
  vid=("0-1.5s: close-up of the little girl smiling. "
       f"MATCH CUT TO 1.5-8s: the same smile on adult {ch('BOSS')}; camera pulls back as she and the team spread a large white tablecloth with a red ornamental folk pattern over the long table; team members bring a big homemade pie and teapots. Warm, traditional, family feeling.")),

 dict(id="G22", scene="8. Тепло", ingr=["BOSS","(вся команда)","RED_INT"],
  cuts=[("S08-09",137.35,142.6,0.5,"За то тепло, которое мы столько лет чувствуем рядом с тобой.","Групповые объятия вокруг Босс, тёплый свет ламп, медленный наезд",None)],
  img=f"Warm lamp-lit group hug: the whole team embracing {ch('BOSS')} in the center, eyes closed, happy, cozy red house interior.",
  vid="Single continuous shot, 8 seconds. The team gently gathers into a group hug around BOSS, she laughs softly with happy tears; slow push-in; warm pendant light, soft bokeh of string lights."),

 dict(id="G23", scene="9. С днём рождения!", ingr=["RED_EXT","RED_INT","SMILE"],
  cuts=[("S09-01",142.6,147.0,0.3,"Пусть в нашем доме всегда горит свет,","Сумерки, лёгкий первый снег, окна красного дома загораются одно за другим",None),
        ("S09-02",147.0,149.4,5.0,"за столом хватает места всем,","Праздничный стол, Смайл и Блонд вносят торт со свечами (без цифр)",None)],
  img=f"Dusk exterior with light first snow falling: {LOC['RED_EXT']}, windows still dark, a few street lamps on, blue-hour sky.",
  vid=("0-4.8s: dusk, gentle snowfall; the windows of the red house light up warm one after another until the whole house glows. "
       f"CUT TO 4.8-8s: inside, the festive long table full of people; {ch('SMILE')} and {ch('BLONDE')} carry in a big birthday cake with plain candles (no numbers), everyone cheers.")),

 dict(id="G24", scene="9. Финал", ingr=["BOSS","BLUE_EXT (модель домика)","RED_INT"],
  cuts=[("S09-03",149.4,151.2,0.15,"а самые смелые идеи сбываются.","Маленькая модель синего домика на полке, свечи, перефокус на праздник",None),
        ("S09-04",151.2,153.1,2.05,"Мы рядом. Всегда.","Крупно Босс задувает свечи, вокруг лица команды",None),
        ("S09-05",153.1,157.0,4.05,"С днём рождения!","Взрыв конфетти, все ликуют, вспышка камеры → стоп-кадр",{"type":"big_title","text":"С днём рождения!"})],
  img="Close-up of a small handmade model of the sky-blue wooden house standing on a walnut shelf, lit by warm candle glow; behind it, out of focus, a festive table with people and string lights.",
  vid=("0-2s: close-up of the little blue house model on the shelf; slow rack focus to the celebrating team behind it. "
       f"CUT TO 2-4s: close-up of {ch('BOSS')} blowing out the birthday candles, team faces leaning in around her, smiling. "
       "CUT TO 4-8s: wide: a burst of confetti, everyone throws their arms up and cheers, a bright camera flash at 7.5s.")),
]

REMOTION_ONLY = [
 dict(id="S06-02", tl_in=53.4, tl_out=57.2, vo="Наш дом стал большим. Наша семья — тоже.",
      desc="Стена с фото: плейт P01 + стоп-кадры S02-02 (2014), S03-06 (2019), S05-02 (2024) в рамках; в конце въезжает новая рамка со стоп-кадром S06-03",
      overlay={"type":"photo_wall","labels":["2014","2019","2024"],"note":"годы-заглушки"}),
 dict(id="S09-06", tl_in=157.0, tl_out=163.0, vo="(музыка)",
      desc="Стоп-кадр S09-05 уменьшается в рамку на стене P01 рядом со старыми фото, подпись 2026, финальная плашка",
      overlay={"type":"end_card","labels":["2026"]}),
]
PLATES = [
 ("P01","Стена с фотографиями (для S06-02 и S09-06, анимирует Remotion)",
  "Straight-on frontal view of a glossy deep red wall in a cozy modern house, with five empty wooden picture frames arranged in a gentle row at eye level; inside each frame a perfectly flat, evenly lit, plain light-grey mat with NOTHING in it (for compositing photos later). A small walnut shelf below with a potted plant. Soft warm side light, no people. Perfectly flat camera angle, no perspective distortion. "+STYLE_IMG),
 ("P02","Лист детских версий персонажей (референс для детских планов сцены 8)",
  "Character lineup sheet on a plain light grey background: nine children aged about 6–8, each a child version of one of the attached reference characters — same face shape, eye color, hairstyle and hair color, glasses where the adult wears glasses, and miniature versions of the same outfits (cream tweed jacket with black bow for the girl version of BOSS). No beards on children. Full body, standing in a row, friendly poses. "+STYLE_IMG),
 ("L01","Локация: синий домик снаружи", f"Establishing view of {LOC['BLUE_EXT']}, morning sun. No people. "+STYLE_IMG),
 ("L02","Локация: синий домик внутри", f"{LOC['BLUE_INT']}. No people. "+STYLE_IMG),
 ("L03","Локация: красный дом снаружи", f"Establishing view of {LOC['RED_EXT']}, daytime. No people. "+STYLE_IMG),
 ("L04","Локация: красный дом внутри", f"{LOC['RED_INT']}. No people. "+STYLE_IMG),
]

for i,g in enumerate(G): g["id"]=f"G{i+1:02d}"

# ---- перевод таймингов v1 -> финальная озвучка (паузы подрезаны, голос ускорен) ----
WA=json.load(open(f"{D}/audio/timewarp.json"))["anchors"]
TOTAL=json.load(open(f"{D}/audio/offsets.json"))["total"]
def warp(t):
    for (x0,y0),(x1,y1) in zip(WA,WA[1:]):
        if x0<=t<=x1: return round(y0 if x1==x0 else y0+(t-x0)*(y1-y0)/(x1-x0),2)
    return round(WA[-1][1],2)
for g in G:
    nc=[]
    for (sid,a_,b_,cin,vo,desc,ov) in g["cuts"]:
        if ov and "in" in ov: ov=dict(ov,**{"in":warp(ov["in"]),"out":warp(ov["out"])})
        nc.append((sid,warp(a_),warp(b_),cin,vo,desc,ov))
    g["cuts"]=nc
for r in REMOTION_ONLY: r["tl_in"],r["tl_out"]=warp(r["tl_in"]),warp(r["tl_out"])

def fmt(t): return f"{int(t//60)}:{t%60:05.2f}"

# ---------- timeline.json ----------
shots=[]
for g in G:
    for (sid,a,b,cin,vo,desc,ov) in g["cuts"]:
        shots.append(dict(id=sid, gen=g["id"], src=f"clips/{g['id']}.mp4", tl_in=a, tl_out=b, dur=round(b-a,2), clip_in=cin, vo=vo, desc=desc, overlay=ov))
for r in REMOTION_ONLY:
    shots.append(dict(id=r["id"], gen=None, src="REMOTION", tl_in=r["tl_in"], tl_out=r["tl_out"], dur=round(r["tl_out"]-r["tl_in"],2), clip_in=None, vo=r["vo"], desc=r["desc"], overlay=r["overlay"]))
shots.sort(key=lambda s:s["tl_in"])
for x,y in zip(shots,shots[1:]):
    assert abs(x["tl_out"]-y["tl_in"])<1e-6, (x["id"],y["id"])
for g in G:
    for (sid,a,b,cin,*_) in g["cuts"]: assert cin+(b-a)<=8.0+1e-6, (sid, cin+(b-a))
offsets=json.load(open(f"{D}/audio/offsets.json"))
json.dump(dict(fps=24,width=1920,height=1080,duration=TOTAL,voiceover="audio/voiceover_full.mp3",vo_offsets=offsets,shots=shots),
          open(f"{D}/timeline.json","w"),ensure_ascii=False,indent=1)

# ---------- storyboard.md ----------
L=[]
w=L.append
w("# Раскадровка и промпты для Google Flow\n")
w(f"Ролик 16:9, **{fmt(TOTAL)[:4]}** ({TOTAL:.0f} с). Озвучка: `audio/voiceover_full.mp3`. Генераций во Flow: **{len(G)}**. Планов на монтаже: **{len(shots)}** (из них {len(REMOTION_ONLY)} собирает Remotion).\n")
w("## Как работать\n")
w("1. **Сначала плейты-референсы** (раздел «Подготовка»): 4 локации и лист детских версий. Генерируйте во Flow как изображения (Nano Banana) и сохраняйте: дальше они идут как ингредиенты.")
w(f"2. **Для каждой генерации G01–G{len(G):02d}:**")
w("   - **Статика:** сгенерируйте стартовый кадр по промпту «Стартовый кадр». Прикрепите ингредиенты из списка: персонажи — это файлы из папки «Мультяшные для прайда».")
w("   - **Анимация:** режим *Frames to Video*. Стартовый кадр — то, что вы получили на шаге выше, промпт — из блока «Анимация». Длина 8 с.")
w("   - Если через «CUT TO» склейки не получились, генерируйте каждый план отдельным клипом. Тайм-коды в промпте — это ориентир для нейросети, а не жёсткое требование.")
w("3. Сохраняйте клипы под именами `G01.mp4`, `G02.mp4`… Я нарежу их по `timeline.json`. Если какой-то план вышел в клипе не на той секунде, скажите, и я поправлю `clip_in`.")
w("4. **Текста в кадре быть не должно.** Годы, календарь, «Семья? Клан? Династия?», плашки с именами и «С днём рождения!» сделает Remotion. Если нейросеть всё же нарисовала буквы, перегенерируйте или скажите мне: закрою на монтаже.")
w("5. Звук из Flow не нужен: на монтаже он будет заглушён.\n")
w("**Стиль. Уже вставлен в каждый промпт, дублировать не нужно.**\n")
w("```\n"+STYLE_IMG+"\n```\n")
w("```\n"+STYLE_VID+"\n```\n")
w("## Персонажи (ингредиенты)\n")
w("| Код в промпте | Файл на Диске | Кто |\n|---|---|---|")
for k,(f,dsc) in CH.items(): w(f"| **{k}** | `{f}` | {dsc.split(', ',1)[1]} |")
w("\n> Если имена героев с плашек есть, пришлите: подставлю в Remotion. Пока стоят заглушки «Имя Фамилия / Департамент».\n")
w("## Подготовка: локации и референсы\n")
for pid,title,p in PLATES:
    w(f"### {pid} — {title}\n```\n{p}\n```\n")
w("---\n## Генерации\n")
for g in G:
    t0=g["cuts"][0][1]; t1=g["cuts"][-1][2]
    w(f"### {g['id']} · {g['scene']} · {fmt(t0)}–{fmt(t1)}\n")
    w("**Ингредиенты:** "+", ".join(g["ingr"])+"\n")
    w("| План | Таймлайн | Дл. | Голос | Что в кадре | Текст (Remotion) |\n|---|---|---|---|---|---|")
    for (sid,a,b,cin,vo,desc,ov) in g["cuts"]:
        ovs = (ov.get("text") or ov.get("note") or ov["type"]) if ov else "—"
        w(f"| {sid} | {fmt(a)}–{fmt(b)} | {b-a:.1f} с | «{vo}» | {desc} | {ovs} |")
    w(f"\n**Стартовый кадр (статика):**\n```\n{g['img']} {STYLE_IMG}\n```")
    w(f"**Анимация (Flow, 8 с):**\n```\n{g['vid']} {STYLE_VID}\n```\n")
w("---\n## Планы, которые собирает Remotion (во Flow не генерировать)\n")
for r in REMOTION_ONLY:
    w(f"- **{r['id']}** {fmt(r['tl_in'])}–{fmt(r['tl_out'])} — «{r['vo']}» — {r['desc']}")
open(f"{D}/storyboard.md","w").write("\n".join(L)+"\n")
print(len(G),"generations,",len(shots),"shots")
