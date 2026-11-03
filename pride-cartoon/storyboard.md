# Раскадровка и промпты для Google Flow

Ролик 16:9, **2:43** (163 с). Озвучка: `audio/voiceover_full.mp3`. Генераций во Flow: **25**. Планов на монтаже: **55** (из них 2 собирает Remotion).

## Как работать

1. **Сначала плейты-референсы** (раздел «Подготовка»): 4 локации и лист детских версий. Генерируйте во Flow как изображения (Nano Banana) и сохраняйте: дальше они идут как ингредиенты.
2. **Для каждой генерации G01–G25:**
   - **Статика:** сгенерируйте стартовый кадр по промпту «Стартовый кадр». Прикрепите ингредиенты из списка: персонажи — это файлы из папки «Мультяшные для прайда».
   - **Анимация:** режим *Frames to Video*. Стартовый кадр — то, что вы получили на шаге выше, промпт — из блока «Анимация». Длина 8 с.
   - Если через «CUT TO» склейки не получились, генерируйте каждый план отдельным клипом. Тайм-коды в промпте — это ориентир для нейросети, а не жёсткое требование.
3. Сохраняйте клипы под именами `G01.mp4`, `G02.mp4`… Я нарежу их по `timeline.json`. Если какой-то план вышел в клипе не на той секунде, скажите, и я поправлю `clip_in`.
4. **Текста в кадре быть не должно.** Годы, календарь, «Семья? Клан? Династия?», плашки с именами и «С днём рождения!» сделает Remotion. Если нейросеть всё же нарисовала буквы, перегенерируйте или скажите мне: закрою на монтаже.
5. Звук из Flow не нужен: на монтаже он будет заглушён.

**Стиль. Уже вставлен в каждый промпт, дублировать не нужно.**

```
Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```

```
Style: Pixar-style 3D animated feature film, cinematic camera work, weighted natural character acting, subtle secondary motion in hair and fabric, film look, 16:9. Characters never talk: mouths stay closed except for smiles and laughter. No text, letters, numbers or logos ever appear on screen. Audio: soft ambience only, no music, no voices.
```

## Персонажи (ингредиенты)

| Код в промпте | Файл на Диске | Кто |
|---|---|---|
| **BOSS** | `Woman_in_tweed_jacket_smiling` | a woman in her 40s with dark hair in a sleek low bun, warm brown eyes, gentle smile, cream tweed jacket with black piping, a big black bow on the chest and black round buttons |
| **GLASSES** | `Man_sitting_at_desk` | a man with voluminous swept-back brown hair, rectangular dark-framed glasses, light stubble and a short goatee, black suit jacket, white open-collar shirt |
| **VEST** | `Man_standing_in_corridor` | a man with short dark side-parted hair, strong eyebrows, short beard, intense serious gaze, dark brown waistcoat over a white shirt |
| **SMILE** | `Man_sitting_in_cozy_cafe` | a cheerful man with short blond-brown hair, round face and a big toothy grin, brown blazer over a black t-shirt |
| **BLONDE** | `Woman_sitting_at_wooden_table` | a woman with long straight blonde hair, blue eyes, calm smile, fitted dark chocolate-brown long-sleeve top, thin long silver necklace |
| **BEARD** | `Man_sitting_on_red_chair` | a man with light-brown hair with a soft forward fringe, blue-grey eyes, full short brown beard, navy suit jacket, white open shirt, chunky silver watch |
| **ROUND** | `Man_smiling_wearing_blazer` | a man with short dark textured hair, round thin metal-frame glasses, thick dark beard with grey streaks, black blazer with grey lapel trim, white t-shirt |
| **SPEAKER** | `Man_speaking_on_stage` | a man with short dark hair and a receding hairline, rectangular black glasses, stubble, navy suit, white shirt |
| **BALD** | `Man_speaking_into_microphone` | a bald man with light blue eyes, clean-shaven round face, black suit, white shirt, bright red pocket square |

> Если имена героев с плашек есть, пришлите: подставлю в Remotion. Пока стоят заглушки «Имя Фамилия / Департамент».

## Подготовка: локации и референсы

### P01 — Стена с фотографиями (для S06-02 и S09-06, анимирует Remotion)
```
Straight-on frontal view of a glossy deep red wall in a cozy modern house, with five empty wooden picture frames arranged in a gentle row at eye level; inside each frame a perfectly flat, evenly lit, plain light-grey mat with NOTHING in it (for compositing photos later). A small walnut shelf below with a potted plant. Soft warm side light, no people. Perfectly flat camera angle, no perspective distortion. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```

### P02 — Лист детских версий персонажей (референс для детских планов сцены 8)
```
Character lineup sheet on a plain light grey background: nine children aged about 6–8, each a child version of one of the attached reference characters — same face shape, eye color, hairstyle and hair color, glasses where the adult wears glasses, and miniature versions of the same outfits (cream tweed jacket with black bow for the girl version of BOSS). No beards on children. Full body, standing in a row, friendly poses. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```

### L01 — Локация: синий домик снаружи
```
Establishing view of a small cozy one-storey wooden house painted soft sky blue with white window frames and a tiny porch, on a quiet green street, morning sun. No people. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```

### L02 — Локация: синий домик внутри
```
the interior of the small blue house (one cozy room with three old wooden desks, a desk lamp, cardboard boxes, a cork board with blank paper sketches, warm light through small white-framed windows). No people. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```

### L03 — Локация: красный дом снаружи
```
Establishing view of a large modern two-storey house painted deep red, big warm-lit windows, dark walnut wood details and black metal frames, daytime. No people. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```

### L04 — Локация: красный дом внутри
```
the interior of the big red house (a spacious open-plan space with walnut wood slat walls, glossy deep red accent walls, black cylindrical pendant lights, a long wooden table, green plants and big windows). No people. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```

---
## Генерации

### G01 · 1. Пролог · 0:00.00–0:05.80

**Ингредиенты:** RED_EXT (плейт локации)

| План | Таймлайн | Дл. | Голос | Что в кадре | Текст (Remotion) |
|---|---|---|---|---|---|
| S01-01 | 0:00.00–0:05.80 | 5.8 с | «У каждой большой истории есть свой дом.» | Общий план: большой красный дом на рассвете, медленный наезд | Наш дом |

**Стартовый кадр (статика):**
```
Wide establishing shot at early dawn: a large modern two-storey house painted deep red, big warm-lit windows, dark walnut wood details and black metal frames, standing on a quiet street with a few trees, soft pink-gold morning sky, light mist, one window already glowing warm. Low camera, slightly heroic angle. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (Flow, 8 с):**
```
Single continuous shot, 8 seconds. Slow cinematic push-in toward the big red house at dawn. Mist drifts, a few leaves fall, windows light up warm one after another, a bird flies across the frame. Calm, magical, opening-of-a-movie feeling. Style: Pixar-style 3D animated feature film, cinematic camera work, weighted natural character acting, subtle secondary motion in hair and fabric, film look, 16:9. Characters never talk: mouths stay closed except for smiles and laughter. No text, letters, numbers or logos ever appear on screen. Audio: soft ambience only, no music, no voices.
```

### G02 · 2. Синий домик · 0:05.80–0:13.80

**Ингредиенты:** BLUE_EXT, BLUE_INT, BOSS

| План | Таймлайн | Дл. | Голос | Что в кадре | Текст (Remotion) |
|---|---|---|---|---|---|
| S02-01 | 0:05.80–0:09.00 | 3.2 с | «Наша началась с маленького синего домика.» | Синий домик снаружи, кран вниз к крыльцу | 2014 |
| S02-02 | 0:09.00–0:13.80 | 4.8 с | «Нас было совсем немного. Несколько столов, одна большая идея —» | Внутри: три стола, коробки; Босс прикалывает на пробковую доску набросок домика | — |

**Стартовый кадр (статика):**
```
Morning, gentle crane-high view of a small cozy one-storey wooden house painted soft sky blue with white window frames and a tiny porch, on a quiet green street. Sunlight, a bicycle leaning on the porch, a small potted plant by the door. Cozy, humble, hopeful beginning. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (Flow, 8 с):**
```
0-3.2s: slow crane down from the treetops to the porch of the small sky-blue wooden house, morning sun, birds. CUT TO 3.2-8s: the interior of the small blue house (one cozy room with three old wooden desks, a desk lamp, cardboard boxes, a cork board with blank paper sketches, warm light through small white-framed windows). BOSS (a woman in her 40s with dark hair in a sleek low bun, warm brown eyes, gentle smile, cream tweed jacket with black piping, a big black bow on the chest and black round buttons) pins a hand-drawn sketch of a little house (simple lines, no words) onto the cork board, steps back and looks at it with a quiet confident smile. Slow dolly sideways past the three empty desks. Style: Pixar-style 3D animated feature film, cinematic camera work, weighted natural character acting, subtle secondary motion in hair and fabric, film look, 16:9. Characters never talk: mouths stay closed except for smiles and laughter. No text, letters, numbers or logos ever appear on screen. Audio: soft ambience only, no music, no voices.
```

### G03 · 2–3. Начало / новые люди · 0:13.80–0:20.10

**Ингредиенты:** BLUE_INT, BOSS, SMILE

| План | Таймлайн | Дл. | Голос | Что в кадре | Текст (Remotion) |
|---|---|---|---|---|---|
| S02-03 | 0:13.80–0:16.80 | 3.0 с | «и человек, который в неё поверил.» | Крупно: Босс у окна, свет на лице, решительная улыбка | имя именинницы |
| S03-01 | 0:16.80–0:20.10 | 3.3 с | «Потом в доме стали появляться новые люди.» | Дверь открывается, в проёме Смайл с коробкой и красной кружкой; Босс встречает | SMILE |

**Стартовый кадр (статика):**
```
Close-up portrait of BOSS (a woman in her 40s with dark hair in a sleek low bun, warm brown eyes, gentle smile, cream tweed jacket with black piping, a big black bow on the chest and black round buttons), standing by a small white-framed window inside the cozy blue house, soft golden morning light on her face, looking outside with a hopeful determined smile. Background: blurred wooden desks and boxes. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (Flow, 8 с):**
```
0-3.5s: close-up of BOSS by the window, she slowly turns her head from the window toward camera, a confident warm smile forms, dust particles glow in the sunbeam. CUT TO 3.5-8s: medium shot of the front door of the blue house from inside. The door swings open, bright daylight floods in, SMILE (a cheerful man with short blond-brown hair, round face and a big toothy grin, brown blazer over a black t-shirt) stands in the doorway holding a cardboard box with a red tumbler cup on top, grinning widely; BOSS steps into frame from the left and welcomes him with an open hand gesture. Style: Pixar-style 3D animated feature film, cinematic camera work, weighted natural character acting, subtle secondary motion in hair and fabric, film look, 16:9. Characters never talk: mouths stay closed except for smiles and laughter. No text, letters, numbers or logos ever appear on screen. Audio: soft ambience only, no music, no voices.
```

### G04 · 3. Команда собирается · 0:20.10–0:24.40

**Ингредиенты:** VEST, ROUND, SPEAKER

| План | Таймлайн | Дл. | Голос | Что в кадре | Текст (Remotion) |
|---|---|---|---|---|---|
| S03-02 | 0:20.10–0:22.00 | 1.9 с | «Каждый — со своим характером,» | Вест в дверях: скрещённые руки, поднятая бровь | VEST |
| S03-03 | 0:22.00–0:23.20 | 1.2 с | «своим опытом» | Раунд входит со стопкой книг, поправляет круглые очки | ROUND |
| S03-04 | 0:23.20–0:24.40 | 1.2 с | «и своей правдой.» | Спикер входит, жестикулирует с кликером, увлечённо | SPEAKER |

**Стартовый кадр (статика):**
```
Medium shot in the doorway of the small blue house, bright daylight behind: VEST (a man with short dark side-parted hair, strong eyebrows, short beard, intense serious gaze, dark brown waistcoat over a white shirt), standing with arms crossed, one eyebrow raised, sizing up the room. Pixar character-introduction framing. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (Flow, 8 с):**
```
Three character-introduction shots in the same blue-house doorway, quick cuts. 0-2s: VEST (a man with short dark side-parted hair, strong eyebrows, short beard, intense serious gaze, dark brown waistcoat over a white shirt) stands in the doorway with arms crossed, slowly raises one eyebrow, then gives a tiny approving nod. CUT TO 2-4s: ROUND (a man with short dark textured hair, round thin metal-frame glasses, thick dark beard with grey streaks, black blazer with grey lapel trim, white t-shirt) steps in carrying a tall wobbly stack of books, stops, pushes his round glasses up with one finger and beams. CUT TO 4-6.5s: SPEAKER (a man with short dark hair and a receding hairline, rectangular black glasses, stubble, navy suit, white shirt) walks in mid-gesture, passionately explaining something with a presentation clicker in his hand, eyes bright (mouth closed, expressive hands only). 6.5-8s: hold on SPEAKER. Style: Pixar-style 3D animated feature film, cinematic camera work, weighted natural character acting, subtle secondary motion in hair and fabric, film look, 16:9. Characters never talk: mouths stay closed except for smiles and laughter. No text, letters, numbers or logos ever appear on screen. Audio: soft ambience only, no music, no voices.
```

### G05 · 3–4. По пути / ночи · 0:24.40–0:28.90

**Ингредиенты:** BALD, BEARD, BLUE_INT

| План | Таймлайн | Дл. | Голос | Что в кадре | Текст (Remotion) |
|---|---|---|---|---|---|
| S03-05 | 0:24.40–0:25.80 | 1.4 с | «Такие разные...» | Лысый и Бородач одновременно протискиваются в дверь и застревают плечами | BALD + BEARD, две плашки |
| S03-06 | 0:25.80–0:28.90 | 3.1 с | «Но почему-то нам всем было по пути.» | Оба смеются, камера отъезжает: вся команда в тесной комнате вокруг одного стола | — |

**Стартовый кадр (статика):**
```
Comedic medium shot: BALD (a bald man with light blue eyes, clean-shaven round face, black suit, white shirt, bright red pocket square) and BEARD (a man with light-brown hair with a soft forward fringe, blue-grey eyes, full short brown beard, navy suit jacket, white open shirt, chunky silver watch) both trying to squeeze through the narrow front door of the blue house at the same time, stuck shoulder to shoulder, turning their heads to look at each other in surprise. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (Flow, 8 с):**
```
0-2.5s: BALD and BEARD get stuck side by side in the narrow doorway, look at each other, then both burst out laughing. CUT TO 2.5-8s: wide shot slowly pulling back: the whole team of nine crammed into the small cozy blue room around one wooden table, laughing together, boxes everywhere, warm daylight. Style: Pixar-style 3D animated feature film, cinematic camera work, weighted natural character acting, subtle secondary motion in hair and fabric, film look, 16:9. Characters never talk: mouths stay closed except for smiles and laughter. No text, letters, numbers or logos ever appear on screen. Audio: soft ambience only, no music, no voices.
```

### G06 · 4. Бессонные ночи · 0:28.90–0:33.85

**Ингредиенты:** BLUE_INT, GLASSES, BLONDE

| План | Таймлайн | Дл. | Голос | Что в кадре | Текст (Remotion) |
|---|---|---|---|---|---|
| S04-01 | 0:28.90–0:33.85 | 5.0 с | «Были бессонные ночи и задачи, которые казались невозможными.» | Ночь, дождь по стеклу, лампы, уставшая команда за столами | — |

**Стартовый кадр (статика):**
```
Night, view through a rain-streaked small white-framed window into the cozy blue house: desk lamps glowing, coffee mugs, GLASSES (a man with voluminous swept-back brown hair, rectangular dark-framed glasses, light stubble and a short goatee, black suit jacket, white open-collar shirt) and BLONDE (a woman with long straight blonde hair, blue eyes, calm smile, fitted dark chocolate-brown long-sleeve top, thin long silver necklace) working late at the wooden desks, tired but focused. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (Flow, 8 с):**
```
Single continuous shot, 8 seconds. Camera starts outside the rain-streaked window at night and slowly pushes through the glass into the room: desk lamps, stacks of paper, coffee mugs; GLASSES rubs his tired eyes under his glasses, BLONDE keeps working. Quiet late-night mood, blue-and-amber light. Style: Pixar-style 3D animated feature film, cinematic camera work, weighted natural character acting, subtle secondary motion in hair and fabric, film look, 16:9. Characters never talk: mouths stay closed except for smiles and laughter. No text, letters, numbers or logos ever appear on screen. Audio: soft ambience only, no music, no voices.
```

### G07 · 4. Трудности · 0:33.85–0:41.30

**Ингредиенты:** VEST, SPEAKER, BLONDE, SMILE

| План | Таймлайн | Дл. | Голос | Что в кадре | Текст (Remotion) |
|---|---|---|---|---|---|
| S04-02 | 0:33.85–0:35.60 | 1.8 с | «Мы спорили,» | Вест и Спикер спорят у доски со стрелками (без текста) | — |
| S04-03 | 0:35.60–0:37.20 | 1.6 с | «ошибались, начинали заново.» | Блонд комкает лист и бросает, Смайл ловит, разворачивает, оба смеются | — |
| S04-04 | 0:37.20–0:39.05 | 1.8 с | «И каждый раз справлялись.» | Крупно: руки команды ложатся друг на друга на столе | — |
| S04-05 | 0:39.05–0:41.30 | 2.2 с | «Потому что вместе.» | Рассвет в окне, команда ликует, дают пять | — |

**Стартовый кадр (статика):**
```
Night, inside the blue house: VEST (a man with short dark side-parted hair, strong eyebrows, short beard, intense serious gaze, dark brown waistcoat over a white shirt) and SPEAKER (a man with short dark hair and a receding hairline, rectangular black glasses, stubble, navy suit, white shirt) face each other in front of a whiteboard covered only with arrows, circles and boxes (no words), both gesturing passionately mid-argument, lamp light, rain on the window. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (Flow, 8 с):**
```
0-1.8s: VEST and SPEAKER argue in front of the whiteboard with big passionate hand gestures (no talking, mouths closed, expressive faces). CUT TO 1.8-3.6s: BLONDE (a woman with long straight blonde hair, blue eyes, calm smile, fitted dark chocolate-brown long-sleeve top, thin long silver necklace) crumples a sheet of paper and tosses it over her shoulder; SMILE (a cheerful man with short blond-brown hair, round face and a big toothy grin, brown blazer over a black t-shirt) catches it, unfolds it, they look at each other and laugh. CUT TO 3.6-5.6s: top-down close-up of the wooden table: hands in different sleeves (cream tweed with black trim, navy suit, brown blazer, black blazer, white shirt) stack one on top of another. CUT TO 5.6-8s: dawn light bursts through the window, the tired team cheers, high-fives and hugs. Style: Pixar-style 3D animated feature film, cinematic camera work, weighted natural character acting, subtle secondary motion in hair and fabric, film look, 16:9. Characters never talk: mouths stay closed except for smiles and laughter. No text, letters, numbers or logos ever appear on screen. Audio: soft ambience only, no music, no voices.
```

### G08 · 5. Красный дом · 0:41.30–0:46.30

**Ингредиенты:** BLUE_EXT, RED_EXT, BOSS

| План | Таймлайн | Дл. | Голос | Что в кадре | Текст (Remotion) |
|---|---|---|---|---|---|
| S05-01 | 0:41.30–0:43.60 | 2.3 с | «Синий домик стал нам мал.» | Синий домик «трещит»: окна распахиваются, локоть торчит, крыша приподнимается | — |
| S05-02 | 0:43.60–0:46.30 | 2.7 с | «Мы переехали в большой красный дом —» | Команда с коробками идёт к красному дому, Босс впереди открывает двери | 2024 |

**Стартовый кадр (статика):**
```
Comedic exterior: a small cozy one-storey wooden house painted soft sky blue with white window frames and a tiny porch, on a quiet green street, visibly overstuffed — boxes pressed against every window, an elbow sticking out of one window, the roof slightly lifted, the door bulging. Daylight. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (Flow, 8 с):**
```
0-3s: the overstuffed little blue house wobbles, a window pops open and a stack of papers flutters out, the roof lifts a little and settles back. Playful. CUT TO 3-8s: wide tracking shot: the team walks up a path carrying cardboard boxes and potted plants toward a large modern two-storey house painted deep red, big warm-lit windows, dark walnut wood details and black metal frames; BOSS (a woman in her 40s with dark hair in a sleek low bun, warm brown eyes, gentle smile, cream tweed jacket with black piping, a big black bow on the chest and black round buttons) walks first, reaches the big doors and swings them open, warm golden light pours out onto everyone. Style: Pixar-style 3D animated feature film, cinematic camera work, weighted natural character acting, subtle secondary motion in hair and fabric, film look, 16:9. Characters never talk: mouths stay closed except for smiles and laughter. No text, letters, numbers or logos ever appear on screen. Audio: soft ambience only, no music, no voices.
```

### G09 · 5–6. Строить смелее / 2026 · 0:46.30–0:53.40

**Ингредиенты:** RED_INT

| План | Таймлайн | Дл. | Голос | Что в кадре | Текст (Remotion) |
|---|---|---|---|---|---|
| S05-03 | 0:46.30–0:50.00 | 3.7 с | «и начали строить ещё смелее.» | Кран вверх: огромное пространство красного дома, команда распаковывается | — |
| S06-01 | 0:50.00–0:53.40 | 3.4 с | «И вот уже две тысячи двадцать шестой год.» | Отрывной календарь на стене, СТАТИЧНАЯ камера, чистый лист | 2026 |

**Стартовый кадр (статика):**
```
High wide shot of the interior of the big red house (a spacious open-plan space with walnut wood slat walls, glossy deep red accent walls, black cylindrical pendant lights, a long wooden table, green plants and big windows), the team (small figures) unpacking boxes, hanging lamps, placing plants, sunlight streaming in. Sense of scale and new beginnings. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (Flow, 8 с):**
```
0-4s: crane shot rising up and back, revealing the huge bright interior of the red house, people unpacking boxes, someone climbs a ladder to hang a pendant lamp, plants placed, sunlight. CUT TO 4-8s: LOCKED-OFF static camera, close-up of a tear-off wall calendar hanging on a walnut wall: a large completely blank cream page, nothing printed on it. Only soft light shifts slightly; the calendar itself does not move. Style: Pixar-style 3D animated feature film, cinematic camera work, weighted natural character acting, subtle secondary motion in hair and fabric, film look, 16:9. Characters never talk: mouths stay closed except for smiles and laughter. No text, letters, numbers or logos ever appear on screen. Audio: soft ambience only, no music, no voices.
```

### G10 · 6. Семья? Клан? Династия? · 0:57.20–1:02.00

**Ингредиенты:** BOSS, RED_INT, (вся команда — лучше стартовый кадр)

| План | Таймлайн | Дл. | Голос | Что в кадре | Текст (Remotion) |
|---|---|---|---|---|---|
| S06-03 | 0:57.20–0:58.10 | 0.9 с | «Семья?» | Поза «семья»: все обнимаются, тёплый смех | Семья? |
| S06-04 | 0:58.10–0:58.80 | 0.7 с | «Клан?» | Поза «клан»: скрещённые руки, суровые лица, рапид, как постер боевика | Клан? |
| S06-05 | 0:58.80–0:59.85 | 1.1 с | «Династия?» | Поза «династия»: парадный портрет, Босс в кресле в центре | Династия? |
| S06-06 | 0:59.85–1:02.00 | 2.1 с | «Наверное, со стороны виднее.» | Снаружи через окно: команда смеётся, на подоконнике голубь наклоняет голову | — |

**Стартовый кадр (статика):**
```
Group photo pose in the interior of the big red house (a spacious open-plan space with walnut wood slat walls, glossy deep red accent walls, black cylindrical pendant lights, a long wooden table, green plants and big windows): the whole team of nine hugging each other warmly like a big family, BOSS (a woman in her 40s with dark hair in a sleek low bun, warm brown eyes, gentle smile, cream tweed jacket with black piping, a big black bow on the chest and black round buttons) in the center, everyone laughing. Camera at chest height, frontal, symmetrical. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (Flow, 8 с):**
```
Three poses of the same group, like a photographer changing styles, then an outside view. 0-2s: the whole team hugs like a warm family, laughing, BOSS in the center. CUT TO 2-4s: same team, now a serious 'clan' movie-poster pose: arms crossed, stern faces, slow-motion step toward camera, dramatic backlight. CUT TO 4-6s: same team in a formal 'dynasty' royal-portrait pose: BOSS seated in a grand armchair in the center, everyone standing around her, dignified, chins up. CUT TO 5.8-8s: view from outside through a big window of the red house: the team inside laughing together; a pigeon on the windowsill in the foreground tilts its head, watching them curiously. Style: Pixar-style 3D animated feature film, cinematic camera work, weighted natural character acting, subtle secondary motion in hair and fabric, film look, 16:9. Characters never talk: mouths stay closed except for smiles and laughter. No text, letters, numbers or logos ever appear on screen. Audio: soft ambience only, no music, no voices.
```

### G11 · 6. Что хочется сохранить · 1:02.00–1:09.75

**Ингредиенты:** SPEAKER, BEARD, BLONDE

| План | Таймлайн | Дл. | Голос | Что в кадре | Текст (Remotion) |
|---|---|---|---|---|---|
| S06-07 | 1:02.00–1:07.35 | 5.3 с | «Мы многого добились вместе. Но есть то, что особенно хочется сохранить.» | Полка с наградами и монитор с графиками → фокус на команду, смеющуюся с кофе | — |
| S06-08 | 1:07.35–1:09.75 | 2.4 с | «Мы умеем поддержать друг друга.» | Спикер оступается с папками, Бородач и Блонд протягивают руки и подхватывают | — |

**Стартовый кадр (статика):**
```
Close-up of a shelf in the interior of the big red house (a spacious open-plan space with walnut wood slat walls, glossy deep red accent walls, black cylindrical pendant lights, a long wooden table, green plants and big windows): abstract golden and glass trophies and a monitor showing colorful rising bar charts (shapes only, no numbers or words); behind them, out of focus, the team chatting with coffee mugs. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (Flow, 8 с):**
```
0-5.6s: slow lateral dolly along the shelf of trophies and the monitor with rising bar charts, then a smooth rack focus to the background where the team shares a warm laugh over coffee; the trophies blur away. CUT TO 5.6-8s: SPEAKER (a man with short dark hair and a receding hairline, rectangular black glasses, stubble, navy suit, white shirt) trips on a step while carrying a tall stack of folders; BEARD (a man with light-brown hair with a soft forward fringe, blue-grey eyes, full short brown beard, navy suit jacket, white open shirt, chunky silver watch) and BLONDE (a woman with long straight blonde hair, blue eyes, calm smile, fitted dark chocolate-brown long-sleeve top, thin long silver necklace) instantly reach out their hands and catch him and the folders; relieved smiles. Style: Pixar-style 3D animated feature film, cinematic camera work, weighted natural character acting, subtle secondary motion in hair and fabric, film look, 16:9. Characters never talk: mouths stay closed except for smiles and laughter. No text, letters, numbers or logos ever appear on screen. Audio: soft ambience only, no music, no voices.
```

### G12 · 6. Посмеяться / помочь · 1:09.75–1:16.30

**Ингредиенты:** SMILE, BALD, ROUND

| План | Таймлайн | Дл. | Голос | Что в кадре | Текст (Remotion) |
|---|---|---|---|---|---|
| S06-09 | 1:09.75–1:12.50 | 2.8 с | «Посмеяться друг над другом — и над собой.» | Смайл надевает Лысому праздничный колпак; Лысый видит себя в отражении и хохочет | — |
| S06-10 | 1:12.50–1:14.60 | 2.1 с | «Заметить, когда кому-то трудно.» | Вечер, Раунд один за столом, голова в руках; Вест замечает из дверей | — |
| S06-11 | 1:14.60–1:16.30 | 1.7 с | «Подхватить. Помочь.» | Вест садится рядом, рука на плечо; Глассес приносит две кружки чая | — |

**Стартовый кадр (статика):**
```
Medium shot in the interior of the big red house (a spacious open-plan space with walnut wood slat walls, glossy deep red accent walls, black cylindrical pendant lights, a long wooden table, green plants and big windows): SMILE (a cheerful man with short blond-brown hair, round face and a big toothy grin, brown blazer over a black t-shirt) sneaks up behind BALD (a bald man with light blue eyes, clean-shaven round face, black suit, white shirt, bright red pocket square) holding a striped paper party hat above his bald head, mischievous grin. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (Flow, 8 с):**
```
0-3s: SMILE pops the striped party hat onto BALD's head; BALD sees himself in a glass partition reflection and bursts out laughing at himself, SMILE laughs too. CUT TO 3-5.5s: evening, warm desk lamp: ROUND (a man with short dark textured hair, round thin metal-frame glasses, thick dark beard with grey streaks, black blazer with grey lapel trim, white t-shirt) sits alone at his desk, head in his hands, exhausted; in the background doorway VEST (a man with short dark side-parted hair, strong eyebrows, short beard, intense serious gaze, dark brown waistcoat over a white shirt) stops and notices him. CUT TO 5.5-8s: VEST sits down next to ROUND and puts a hand on his shoulder; GLASSES (a man with voluminous swept-back brown hair, rectangular dark-framed glasses, light stubble and a short goatee, black suit jacket, white open-collar shirt) arrives with two steaming mugs of tea; ROUND looks up and smiles. Style: Pixar-style 3D animated feature film, cinematic camera work, weighted natural character acting, subtle secondary motion in hair and fabric, film look, 16:9. Characters never talk: mouths stay closed except for smiles and laughter. No text, letters, numbers or logos ever appear on screen. Audio: soft ambience only, no music, no voices.
```

### G13 · 6. За один стол · 1:16.30–1:20.50

**Ингредиенты:** RED_INT, BOSS, (вся команда — лучше стартовый кадр)

| План | Таймлайн | Дл. | Голос | Что в кадре | Текст (Remotion) |
|---|---|---|---|---|---|
| S06-12 | 1:16.30–1:20.50 | 4.2 с | «И после всех споров снова сесть за один стол.» | Все садятся за длинный стол, передают тарелки, тепло | — |

**Стартовый кадр (статика):**
```
Wide warm evening shot of the interior of the big red house (a spacious open-plan space with walnut wood slat walls, glossy deep red accent walls, black cylindrical pendant lights, a long wooden table, green plants and big windows): the long wooden table set with simple dishes, teapots and bread; the team of nine pulling out chairs and sitting down together, BOSS (a woman in her 40s with dark hair in a sleek low bun, warm brown eyes, gentle smile, cream tweed jacket with black piping, a big black bow on the chest and black round buttons) at the head of the table, warm pendant light. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (Flow, 8 с):**
```
Single continuous shot, 8 seconds. Slow dolly along the long table as everyone sits down, passes plates and bread to each other, someone pours tea, friendly laughter, warm pendant light, cozy evening mood. Style: Pixar-style 3D animated feature film, cinematic camera work, weighted natural character acting, subtle secondary motion in hair and fabric, film look, 16:9. Characters never talk: mouths stay closed except for smiles and laughter. No text, letters, numbers or logos ever appear on screen. Audio: soft ambience only, no music, no voices.
```

### G14 · 7. Человек, который нас собрал · 1:20.50–1:28.25

**Ингредиенты:** BOSS, RED_INT

| План | Таймлайн | Дл. | Голос | Что в кадре | Текст (Remotion) |
|---|---|---|---|---|---|
| S07-01 | 1:20.50–1:25.95 | 5.5 с | «И всё это стало возможным, потому что однажды ты решила нас собрать.» | Босс идёт через пространство красного дома, люди оборачиваются; медленный наезд | — |
| S07-02 | 1:25.95–1:28.25 | 2.3 с | «Объединить. Вдохновить.» | Команда собирается вокруг неё в круг, кран с вращением снизу | — |

**Стартовый кадр (статика):**
```
Hero shot: BOSS (a woman in her 40s with dark hair in a sleek low bun, warm brown eyes, gentle smile, cream tweed jacket with black piping, a big black bow on the chest and black round buttons) walking toward camera through the interior of the big red house (a spacious open-plan space with walnut wood slat walls, glossy deep red accent walls, black cylindrical pendant lights, a long wooden table, green plants and big windows), warm backlight, people at desks in the soft-focus background turning to look at her. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (Flow, 8 с):**
```
0-5.6s: slow push-in as BOSS walks confidently toward camera through the red house; team members at their desks look up and turn toward her with smiles; warm backlight, gentle lens flare. CUT TO 5.6-8s: low-angle shot circling around BOSS as the whole team gathers around her in a circle, everyone looking at her, inspired. Style: Pixar-style 3D animated feature film, cinematic camera work, weighted natural character acting, subtle secondary motion in hair and fabric, film look, 16:9. Characters never talk: mouths stay closed except for smiles and laughter. No text, letters, numbers or logos ever appear on screen. Audio: soft ambience only, no music, no voices.
```

### G15 · 7. Доверить задачи · 1:28.25–1:33.60

**Ингредиенты:** BOSS, SPEAKER

| План | Таймлайн | Дл. | Голос | Что в кадре | Текст (Remotion) |
|---|---|---|---|---|---|
| S07-03 | 1:28.25–1:30.40 | 2.2 с | «Доверить нам большие задачи —» | Босс вручает Спикеру большой свёрнутый чертёж с красной лентой | — |
| S07-04 | 1:30.40–1:33.60 | 3.2 с | «и помочь поверить, что мы с ними справимся.» | Крупно Спикер: сомнение → Босс кивает → он улыбается и расправляет плечи | — |

**Стартовый кадр (статика):**
```
Medium two-shot: BOSS (a woman in her 40s with dark hair in a sleek low bun, warm brown eyes, gentle smile, cream tweed jacket with black piping, a big black bow on the chest and black round buttons) handing a large rolled blueprint tied with a red ribbon to SPEAKER (a man with short dark hair and a receding hairline, rectangular black glasses, stubble, navy suit, white shirt), who looks surprised and slightly unsure. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (Flow, 8 с):**
```
0-2.5s: BOSS hands the big rolled blueprint with a red ribbon to SPEAKER; he takes it carefully, surprised by its weight. CUT TO 2.5-8s: close-up of SPEAKER: doubt in his eyes, he glances at BOSS (over-the-shoulder, BOSS out of focus) — she gives a calm reassuring nod — his face changes, he smiles, straightens his shoulders and grips the blueprint with confidence. Style: Pixar-style 3D animated feature film, cinematic camera work, weighted natural character acting, subtle secondary motion in hair and fabric, film look, 16:9. Characters never talk: mouths stay closed except for smiles and laughter. No text, letters, numbers or logos ever appear on screen. Audio: soft ambience only, no music, no voices.
```

### G16 · 7. Своё место · 1:33.60–1:39.40

**Ингредиенты:** BOSS, BEARD, ROUND

| План | Таймлайн | Дл. | Голос | Что в кадре | Текст (Remotion) |
|---|---|---|---|---|---|
| S07-05 | 1:33.60–1:36.50 | 2.9 с | «Ты умеешь находить для каждого своё место.» | Босс подводит Бородача к столу у окна в луче солнца — идеально подходит | — |
| S07-06 | 1:36.50–1:39.40 | 2.9 с | «Видеть, что человеку интересно, что у него получается» | Босс за плечом Раунда смотрит на его планшет с яркими формами, гордо кивает | — |

**Стартовый кадр (статика):**
```
Sunny corner of the interior of the big red house (a spacious open-plan space with walnut wood slat walls, glossy deep red accent walls, black cylindrical pendant lights, a long wooden table, green plants and big windows): BOSS (a woman in her 40s with dark hair in a sleek low bun, warm brown eyes, gentle smile, cream tweed jacket with black piping, a big black bow on the chest and black round buttons) gently guiding BEARD (a man with light-brown hair with a soft forward fringe, blue-grey eyes, full short brown beard, navy suit jacket, white open shirt, chunky silver watch) by the shoulder toward a desk by a big window, a beam of sunlight falling exactly on the empty chair. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (Flow, 8 с):**
```
0-4.5s: BOSS guides BEARD to the sunlit desk by the window; he sits down, looks around, it fits him perfectly, he smiles; sunlight warms the frame. CUT TO 4.5-8s: over-the-shoulder: BOSS leans behind ROUND (a man with short dark textured hair, round thin metal-frame glasses, thick dark beard with grey streaks, black blazer with grey lapel trim, white t-shirt) looking at his drawing tablet full of bright abstract colorful shapes (no text); she nods proudly, he turns and smiles back. Style: Pixar-style 3D animated feature film, cinematic camera work, weighted natural character acting, subtle secondary motion in hair and fabric, film look, 16:9. Characters never talk: mouths stay closed except for smiles and laughter. No text, letters, numbers or logos ever appear on screen. Audio: soft ambience only, no music, no voices.
```

### G17 · 7. Вырасти / больше чем руководитель · 1:39.40–1:45.30

**Ингредиенты:** (вся команда), RED_INT

| План | Таймлайн | Дл. | Голос | Что в кадре | Текст (Remotion) |
|---|---|---|---|---|---|
| S07-07 | 1:39.40–1:42.35 | 2.9 с | «и в чём он ещё может вырасти.» | Крупно: росток в горшке на столе вырастает в маленькое цветущее дерево | — |
| S07-08 | 1:42.35–1:45.30 | 3.0 с | «Мы давно считаем тебя больше, чем руководителем.» | Боковой проезд по лицам команды, все смотрят на неё (за кадром) с теплом | — |

**Стартовый кадр (статика):**
```
Macro close-up of a tiny green sprout in a small ceramic pot on a walnut desk, warm sunlight, dust particles glowing, red wall softly blurred behind. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (Flow, 8 с):**
```
0-3.5s: time-lapse-like magical growth: the tiny sprout grows into a small blooming tree with little white flowers, leaves unfurling, warm light. CUT TO 3.5-8s: slow lateral dolly across the faces of the team members standing side by side, all looking slightly off-camera toward someone they love and respect, warm grateful smiles. Style: Pixar-style 3D animated feature film, cinematic camera work, weighted natural character acting, subtle secondary motion in hair and fabric, film look, 16:9. Characters never talk: mouths stay closed except for smiles and laughter. No text, letters, numbers or logos ever appear on screen. Audio: soft ambience only, no music, no voices.
```

### G18 · 7. Путеводная звезда · 1:45.30–1:51.60

**Ингредиенты:** BOSS, RED_EXT

| План | Таймлайн | Дл. | Голос | Что в кадре | Текст (Remotion) |
|---|---|---|---|---|---|
| S07-09 | 1:45.30–1:48.45 | 3.2 с | «Ты для нас — родной человек. Наставник.» | Крупно Босс: тронута, глаза блестят, рука на сердце | — |
| S07-10 | 1:48.45–1:51.60 | 3.1 с | «Наша путеводная звезда.» | Ночь, красный дом, камера поднимается к яркой звезде над крышей | — |

**Стартовый кадр (статика):**
```
Emotional close-up of BOSS (a woman in her 40s with dark hair in a sleek low bun, warm brown eyes, gentle smile, cream tweed jacket with black piping, a big black bow on the chest and black round buttons), warm soft light, eyes glistening, touched smile, one hand slowly rising to her heart. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (Flow, 8 с):**
```
0-4s: close-up of BOSS, deeply touched, her eyes glisten, she places her hand on her heart and smiles warmly. CUT TO 4-8s: night exterior: a large modern two-storey house painted deep red, big warm-lit windows, dark walnut wood details and black metal frames with all windows glowing; camera slowly tilts up from the roof to the starry sky where one bright star twinkles and gently flares. Style: Pixar-style 3D animated feature film, cinematic camera work, weighted natural character acting, subtle secondary motion in hair and fabric, film look, 16:9. Characters never talk: mouths stay closed except for smiles and laughter. No text, letters, numbers or logos ever appear on screen. Audio: soft ambience only, no music, no voices.
```

### G19 · 8. Почему мультик? · 1:51.60–1:57.40

**Ингредиенты:** SMILE, BALD, RED_INT

| План | Таймлайн | Дл. | Голос | Что в кадре | Текст (Remotion) |
|---|---|---|---|---|---|
| S08-01 | 1:51.60–1:54.50 | 2.9 с | «А почему мы решили подарить тебе мультик?» | Смайл поворачивается прямо в камеру, пожимает плечами с хитрой улыбкой (4-я стена) | — |
| S08-02 | 1:54.50–1:57.40 | 2.9 с | «Потому что сегодня — твой день рождения.» | Магия: бумаги взлетают конфетти, графики на мониторе превращаются в гирлянды | — |

**Стартовый кадр (статика):**
```
Medium close-up in the interior of the big red house (a spacious open-plan space with walnut wood slat walls, glossy deep red accent walls, black cylindrical pendant lights, a long wooden table, green plants and big windows): SMILE (a cheerful man with short blond-brown hair, round face and a big toothy grin, brown blazer over a black t-shirt) turning to look straight into the camera with a playful knowing grin and raised eyebrows, BALD (a bald man with light blue eyes, clean-shaven round face, black suit, white shirt, bright red pocket square) beside him grinning too. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (Flow, 8 с):**
```
0-3.5s: SMILE turns to look directly into the camera, breaks the fourth wall, shrugs with a mischievous grin and raised eyebrows; BALD next to him nods along. CUT TO 3.5-8s: magical transformation of an office desk: papers fly up and turn into colorful confetti, the lines of a bar chart on the monitor stretch out of the screen and become glowing string-light garlands across the room, balloons pop into existence. Joyful. Style: Pixar-style 3D animated feature film, cinematic camera work, weighted natural character acting, subtle secondary motion in hair and fabric, film look, 16:9. Characters never talk: mouths stay closed except for smiles and laughter. No text, letters, numbers or logos ever appear on screen. Audio: soft ambience only, no music, no voices.
```

### G20 · 8. Возвращает в детство · 1:57.40–2:04.30

**Ингредиенты:** GLASSES, (детские версии — лист персонажей), RED_INT

| План | Таймлайн | Дл. | Голос | Что в кадре | Текст (Remotion) |
|---|---|---|---|---|---|
| S08-03 | 1:57.40–2:00.85 | 3.4 с | «А день рождения всегда немного возвращает в детство.» | Глассес и его 7-летняя версия синхронно поправляют очки | — |
| S08-04 | 2:00.85–2:04.30 | 3.5 с | «Туда, где собираются близкие, где ждёшь чуда» | Детские версии команды бегут с шарами по праздничному красному дому | — |

**Стартовый кадр (статика):**
```
Medium shot in the festive red house: GLASSES (a man with voluminous swept-back brown hair, rectangular dark-framed glasses, light stubble and a short goatee, black suit jacket, white open-collar shirt) standing next to a 7-year-old boy version of himself (same hair, same tiny rectangular glasses, tiny suit), both looking at camera. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (Flow, 8 с):**
```
0-3.8s: GLASSES and his child self standing side by side push their glasses up their noses at exactly the same moment, notice each other and grin. CUT TO 3.8-8s: the children versions of the team (kids with the same hairstyles, glasses and outfit colors as the adults) run laughing through the festively decorated red house holding balloons; tracking shot at kid height. Style: Pixar-style 3D animated feature film, cinematic camera work, weighted natural character acting, subtle secondary motion in hair and fabric, film look, 16:9. Characters never talk: mouths stay closed except for smiles and laughter. No text, letters, numbers or logos ever appear on screen. Audio: soft ambience only, no music, no voices.
```

### G21 · 8. Все рядом / родители · 2:04.30–2:11.35

**Ингредиенты:** BOSS, (детская Босс), RED_INT

| План | Таймлайн | Дл. | Голос | Что в кадре | Текст (Remotion) |
|---|---|---|---|---|---|
| S08-05 | 2:04.30–2:07.80 | 3.5 с | «и где особенно важно, чтобы все были рядом.» | Взрослые и дети-версии держатся за руки вокруг стола, Босс в центре | — |
| S08-06 | 2:07.80–2:11.35 | 3.5 с | «И сегодня мы хотим сказать спасибо твоим родителям.» | Уютная квартира, винтажный свет: маленькая Босс с бантом бежит к двум взрослым (лица вне кадра), её подхватывают | — |

**Стартовый кадр (статика):**
```
Festive red house: adults and their child versions holding hands in a big circle around a decorated table, BOSS (a woman in her 40s with dark hair in a sleek low bun, warm brown eyes, gentle smile, cream tweed jacket with black piping, a big black bow on the chest and black round buttons) in the middle, string lights, balloons, everyone smiling. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (Flow, 8 с):**
```
0-4s: slow circular camera move around the circle of adults and kids holding hands, BOSS in the center laughing, string lights twinkling. CUT TO 4-8s: warm nostalgic cozy home with vintage furniture and soft golden lamp light: a 6-year-old girl with dark hair, brown eyes and a big black bow in her hair runs toward two adults (seen only from the waist down, faces out of frame) who lift her up into a hug. Style: Pixar-style 3D animated feature film, cinematic camera work, weighted natural character acting, subtle secondary motion in hair and fabric, film look, 16:9. Characters never talk: mouths stay closed except for smiles and laughter. No text, letters, numbers or logos ever appear on screen. Audio: soft ambience only, no music, no voices.
```

### G22 · 8. За тебя / традиции · 2:11.35–2:17.35

**Ингредиенты:** BOSS, (детская Босс), RED_INT

| План | Таймлайн | Дл. | Голос | Что в кадре | Текст (Remotion) |
|---|---|---|---|---|---|
| S08-07 | 2:11.35–2:12.30 | 1.0 с | «За тебя.» | Крупно: девочка улыбается → матч-кат | — |
| S08-08 | 2:12.30–2:17.35 | 5.0 с | «За твоё чувство семьи, уважение к традициям и умение собирать людей.» | Взрослая Босс с той же улыбкой расстилает большую скатерть с орнаментом, команда несёт пироги и чайники | — |

**Стартовый кадр (статика):**
```
Close-up of a 6-year-old girl with dark hair, warm brown eyes and a big black bow in her hair, smiling a gentle closed-lip smile, warm vintage lamp light. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (Flow, 8 с):**
```
0-1.5s: close-up of the little girl smiling. MATCH CUT TO 1.5-8s: the same smile on adult BOSS (a woman in her 40s with dark hair in a sleek low bun, warm brown eyes, gentle smile, cream tweed jacket with black piping, a big black bow on the chest and black round buttons); camera pulls back as she and the team spread a large white tablecloth with a red ornamental folk pattern over the long table; team members bring a big homemade pie and teapots. Warm, traditional, family feeling. Style: Pixar-style 3D animated feature film, cinematic camera work, weighted natural character acting, subtle secondary motion in hair and fabric, film look, 16:9. Characters never talk: mouths stay closed except for smiles and laughter. No text, letters, numbers or logos ever appear on screen. Audio: soft ambience only, no music, no voices.
```

### G23 · 8. Тепло · 2:17.35–2:22.60

**Ингредиенты:** BOSS, (вся команда), RED_INT

| План | Таймлайн | Дл. | Голос | Что в кадре | Текст (Remotion) |
|---|---|---|---|---|---|
| S08-09 | 2:17.35–2:22.60 | 5.2 с | «За то тепло, которое мы столько лет чувствуем рядом с тобой.» | Групповые объятия вокруг Босс, тёплый свет ламп, медленный наезд | — |

**Стартовый кадр (статика):**
```
Warm lamp-lit group hug: the whole team embracing BOSS (a woman in her 40s with dark hair in a sleek low bun, warm brown eyes, gentle smile, cream tweed jacket with black piping, a big black bow on the chest and black round buttons) in the center, eyes closed, happy, cozy red house interior. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (Flow, 8 с):**
```
Single continuous shot, 8 seconds. The team gently gathers into a group hug around BOSS, she laughs softly with happy tears; slow push-in; warm pendant light, soft bokeh of string lights. Style: Pixar-style 3D animated feature film, cinematic camera work, weighted natural character acting, subtle secondary motion in hair and fabric, film look, 16:9. Characters never talk: mouths stay closed except for smiles and laughter. No text, letters, numbers or logos ever appear on screen. Audio: soft ambience only, no music, no voices.
```

### G24 · 9. С днём рождения! · 2:22.60–2:29.40

**Ингредиенты:** RED_EXT, RED_INT, SMILE

| План | Таймлайн | Дл. | Голос | Что в кадре | Текст (Remotion) |
|---|---|---|---|---|---|
| S09-01 | 2:22.60–2:27.00 | 4.4 с | «Пусть в нашем доме всегда горит свет,» | Сумерки, лёгкий первый снег, окна красного дома загораются одно за другим | — |
| S09-02 | 2:27.00–2:29.40 | 2.4 с | «за столом хватает места всем,» | Праздничный стол, Смайл и Блонд вносят торт со свечами (без цифр) | — |

**Стартовый кадр (статика):**
```
Dusk exterior with light first snow falling: a large modern two-storey house painted deep red, big warm-lit windows, dark walnut wood details and black metal frames, windows still dark, a few street lamps on, blue-hour sky. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (Flow, 8 с):**
```
0-4.8s: dusk, gentle snowfall; the windows of the red house light up warm one after another until the whole house glows. CUT TO 4.8-8s: inside, the festive long table full of people; SMILE (a cheerful man with short blond-brown hair, round face and a big toothy grin, brown blazer over a black t-shirt) and BLONDE (a woman with long straight blonde hair, blue eyes, calm smile, fitted dark chocolate-brown long-sleeve top, thin long silver necklace) carry in a big birthday cake with plain candles (no numbers), everyone cheers. Style: Pixar-style 3D animated feature film, cinematic camera work, weighted natural character acting, subtle secondary motion in hair and fabric, film look, 16:9. Characters never talk: mouths stay closed except for smiles and laughter. No text, letters, numbers or logos ever appear on screen. Audio: soft ambience only, no music, no voices.
```

### G25 · 9. Финал · 2:29.40–2:37.00

**Ингредиенты:** BOSS, BLUE_EXT (модель домика), RED_INT

| План | Таймлайн | Дл. | Голос | Что в кадре | Текст (Remotion) |
|---|---|---|---|---|---|
| S09-03 | 2:29.40–2:31.20 | 1.8 с | «а самые смелые идеи сбываются.» | Маленькая модель синего домика на полке, свечи, перефокус на праздник | — |
| S09-04 | 2:31.20–2:33.10 | 1.9 с | «Мы рядом. Всегда.» | Крупно Босс задувает свечи, вокруг лица команды | — |
| S09-05 | 2:33.10–2:37.00 | 3.9 с | «С днём рождения!» | Взрыв конфетти, все ликуют, вспышка камеры → стоп-кадр | С днём рождения! |

**Стартовый кадр (статика):**
```
Close-up of a small handmade model of the sky-blue wooden house standing on a walnut shelf, lit by warm candle glow; behind it, out of focus, a festive table with people and string lights. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (Flow, 8 с):**
```
0-2s: close-up of the little blue house model on the shelf; slow rack focus to the celebrating team behind it. CUT TO 2-4s: close-up of BOSS (a woman in her 40s with dark hair in a sleek low bun, warm brown eyes, gentle smile, cream tweed jacket with black piping, a big black bow on the chest and black round buttons) blowing out the birthday candles, team faces leaning in around her, smiling. CUT TO 4-8s: wide: a burst of confetti, everyone throws their arms up and cheers, a bright camera flash at 7.5s. Style: Pixar-style 3D animated feature film, cinematic camera work, weighted natural character acting, subtle secondary motion in hair and fabric, film look, 16:9. Characters never talk: mouths stay closed except for smiles and laughter. No text, letters, numbers or logos ever appear on screen. Audio: soft ambience only, no music, no voices.
```

---
## Планы, которые собирает Remotion (во Flow не генерировать)

- **S06-02** 0:53.40–0:57.20 — «Наш дом стал большим. Наша семья — тоже.» — Стена с фото: плейт P01 + стоп-кадры S02-02 (2014), S03-06 (2019), S05-02 (2024) в рамках; в конце въезжает новая рамка со стоп-кадром S06-03
- **S09-06** 2:37.00–2:43.00 — «(музыка)» — Стоп-кадр S09-05 уменьшается в рамку на стене P01 рядом со старыми фото, подпись 2026, финальная плашка
