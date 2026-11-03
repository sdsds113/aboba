# Раскадровка: один план = одна генерация

Ролик 16:9, 2:16. Генераций: **53**, по одной на план, без склеек внутри. Ещё 2 плана (стена с фото и финал) собирает Remotion из графики.

## Почему так
Когда в одну генерацию просят несколько планов через «CUT TO», после склейки модель рисует кадр заново, и лица со стилем уплывают. Здесь каждая генерация — это **один непрерывный план от готового стартового кадра**, а склейки делает монтаж.

## Как генерировать каждый план

1. **Стартовый кадр (картинка).** Nano Banana Pro во Flow, ChatGPT или Kling Image. Прикрепить референсы из столбца «Референсы»: персонажи — файлы из папки «Мультяшные для прайда», локации L01–L04 и лист детей P02 — из прошлых генераций. Для планов «все 9 персонажей» прикрепить всех девятерых: Nano Banana Pro принимает до 14 картинок.
2. **Проверить картинку.** Лица похожи, стиль Pixar, текста нет. Если не так, перегенерировать: исправлять дальше на видео поздно.
3. **Анимация.** Image-to-video, стартовый кадр — эта картинка, промпт — из блока «Анимация». Длина **5 с** (во Flow можно 8 с, лишнее обрежется).
   - **Kling:** режим Image to Video. Если есть Elements, загрузить туда персонажей, тогда лица держатся ещё лучше.
   - **Flow (Veo):** режим Frames to Video, только стартовый кадр.
4. **Сохранить клип** под именем плана: `S03-02.mp4` и т. д. Положить в `pride-cartoon/clips/`. Монтаж подхватит его сам.

**Главное правило:** в анимации одно действие и одно движение камеры. Если план очень короткий (меньше 1,5 с, отмечено ⚡), действие должно начинаться сразу.

**Стиль стартового кадра** (уже вставлен в каждый промпт):
```
Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```

**Хвост промпта анимации** (уже вставлен):
```
Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

## Персонажи

| Код | Файл на Диске |
|---|---|
| BOSS | `Woman_in_tweed_jacket_smiling` |
| GLASSES | `Man_sitting_at_desk` |
| VEST | `Man_standing_in_corridor` |
| SMILE | `Man_sitting_in_cozy_cafe` |
| BLONDE | `Woman_sitting_at_wooden_table` |
| BEARD | `Man_sitting_on_red_chair` |
| ROUND | `Man_smiling_wearing_blazer` |
| SPEAKER | `Man_speaking_on_stage` |
| BALD | `Man_speaking_into_microphone` |

Локации L01–L04 и лист детских версий P02 — промпты в `legacy/storyboard_v1_multicut.md`, раздел «Подготовка». Сгенерировать их один раз и прикладывать как референсы.

---
## Планы


### Сцена 1

#### S01-01 · 0:00.00 · 4.7 с

Голос: «У каждой большой истории есть свой дом.»  
Референсы: L03 красный дом снаружи

**Стартовый кадр:**
```
Wide establishing shot at early dawn: a large modern two-storey house painted deep red, big warm-lit windows, dark walnut wood details and black metal frames, on a quiet street with a few trees, soft pink-gold sky, light mist, one window glowing warm. Low camera, slightly heroic angle. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
Slow cinematic push-in toward the red house. Mist drifts, a few leaves fall, windows light up warm one after another, a bird flies across the sky. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```


### Сцена 2

#### S02-01 · 0:04.71 · 2.7 с

Голос: «Наша началась с маленького синего домика.»  
Референсы: L01 синий домик снаружи

**Стартовый кадр:**
```
Morning, high view from the treetops toward a small cozy one-storey wooden house painted soft sky blue with white window frames and a tiny porch, on a quiet green street. Sunlight, a bicycle leaning on the porch, a small potted plant by the door. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
Slow crane down from the treetops to the porch of the sky-blue house, sun flickers through leaves, birds. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S02-02 · 0:07.40 · 4.2 с

Голос: «Нас было совсем немного. Несколько столов, одна большая идея —»  
Референсы: L02 синий домик внутри, BOSS (`Woman_in_tweed_jacket_smiling`), GLASSES (`Man_sitting_at_desk`), BLONDE (`Woman_sitting_at_wooden_table`)

**Стартовый кадр:**
```
the interior of the small blue house (one cozy room with three old wooden desks, a desk lamp, cardboard boxes, a cork board with blank paper sketches, warm light through small white-framed windows). BOSS (a woman in her 40s with dark hair in a sleek low bun, warm brown eyes, gentle smile, cream tweed jacket with black piping, a big black bow on the chest and black round buttons) stands at the cork board pinning a hand-drawn sketch of a little house (simple lines, no words). Behind her at two desks sit GLASSES (a man with voluminous swept-back brown hair, rectangular dark-framed glasses, light stubble and a short goatee, black suit jacket, white open-collar shirt) and BLONDE (a woman with long straight blonde hair, blue eyes, calm smile, fitted dark chocolate-brown long-sleeve top, thin long silver necklace). Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
BOSS pins the sketch, steps back and looks at it with a quiet confident smile; GLASSES and BLONDE look up from their work and smile at her. Slow sideways dolly. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S02-03 · 0:11.60 · 2.3 с

Голос: «и человек, который в неё поверил.»  
Референсы: L02 синий домик внутри, BOSS (`Woman_in_tweed_jacket_smiling`)

**Стартовый кадр:**
```
Close-up portrait of BOSS (a woman in her 40s with dark hair in a sleek low bun, warm brown eyes, gentle smile, cream tweed jacket with black piping, a big black bow on the chest and black round buttons) by a small white-framed window inside the cozy blue house, golden morning light on her face, looking out of the window. Blurred desks and boxes behind. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
She slowly turns her head from the window toward camera and a confident warm smile forms. Dust particles glow in the sunbeam. Very slow push-in. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```


### Сцена 3

#### S03-01 · 0:13.93 · 2.7 с

Голос: «Потом в доме стали появляться новые люди.»  
Референсы: L02 синий домик внутри, BOSS (`Woman_in_tweed_jacket_smiling`), SMILE (`Man_sitting_in_cozy_cafe`)

**Стартовый кадр:**
```
Medium shot of the front door of the blue house from inside, the door half-open with bright daylight pouring in; in the doorway SMILE (a cheerful man with short blond-brown hair, round face and a big toothy grin, brown blazer over a black t-shirt) holding a cardboard box with a red tumbler cup on top, grinning; BOSS (a woman in her 40s with dark hair in a sleek low bun, warm brown eyes, gentle smile, cream tweed jacket with black piping, a big black bow on the chest and black round buttons) at the left edge of frame. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
SMILE steps inside grinning widely; BOSS steps toward him and welcomes him with an open hand gesture. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S03-02 · 0:16.63 · 1.8 с

Голос: «Каждый — со своим характером,»  
Референсы: L02 синий домик внутри, VEST (`Man_standing_in_corridor`)

**Стартовый кадр:**
```
Medium shot in the doorway of the blue house, bright daylight behind: VEST (a man with short dark side-parted hair, strong eyebrows, short beard, intense serious gaze, dark brown waistcoat over a white shirt) standing with arms crossed, sizing up the room. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
Right away he slowly raises one eyebrow, then gives a tiny approving nod. Camera holds, very slight push-in. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S03-03 · 0:18.40 · 1.1 с ⚡

Голос: «своим опытом»  
Референсы: L02 синий домик внутри, ROUND (`Man_smiling_wearing_blazer`)

**Стартовый кадр:**
```
Medium shot in the doorway of the blue house: ROUND (a man with short dark textured hair, round thin metal-frame glasses, thick dark beard with grey streaks, black blazer with grey lapel trim, white t-shirt) stepping in carrying a tall wobbly stack of books. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
Right away he stops, the book stack wobbles, he pushes his round glasses up with one finger and beams. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S03-04 · 0:19.52 · 0.9 с ⚡

Голос: «и своей правдой.»  
Референсы: L02 синий домик внутри, SPEAKER (`Man_speaking_on_stage`)

**Стартовый кадр:**
```
Medium shot in the doorway of the blue house: SPEAKER (a man with short dark hair and a receding hairline, rectangular black glasses, stubble, navy suit, white shirt) walking in mid-gesture, a presentation clicker in his hand, eyes bright with enthusiasm. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
He walks in passionately explaining something with expressive hand gestures (mouth closed), eyebrows raised. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S03-05 · 0:20.42 · 1.1 с ⚡

Голос: «Такие разные...»  
Референсы: L02 синий домик внутри, BALD (`Man_speaking_into_microphone`), BEARD (`Man_sitting_on_red_chair`)

**Стартовый кадр:**
```
Comedic medium shot: BALD (a bald man with light blue eyes, clean-shaven round face, black suit, white shirt, bright red pocket square) and BEARD (a man with light-brown hair with a soft forward fringe, blue-grey eyes, full short brown beard, navy suit jacket, white open shirt, chunky silver watch) both trying to squeeze through the narrow front door of the blue house at the same time, stuck shoulder to shoulder. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
They wiggle, turn their heads to look at each other in surprise, and both burst out laughing. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S03-06 · 0:21.54 · 2.4 с

Голос: «Но почему-то нам всем было по пути.»  
Референсы: L02 синий домик внутри, все 9 персонажей

**Стартовый кадр:**
```
Wide shot: the whole team of nine characters from the references (BOSS, GLASSES, VEST, SMILE, BLONDE, BEARD, ROUND, SPEAKER, BALD) crammed into the small cozy blue room around one wooden table, boxes everywhere, warm daylight, everyone laughing. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
Slow pull-back revealing the crowded little room; everyone laughs together, someone pats a shoulder. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```


### Сцена 4

#### S04-01 · 0:23.90 · 4.3 с

Голос: «Были бессонные ночи и задачи, которые казались невозможными.»  
Референсы: L02 синий домик внутри, GLASSES (`Man_sitting_at_desk`), BLONDE (`Woman_sitting_at_wooden_table`)

**Стартовый кадр:**
```
Night, view through a rain-streaked small white-framed window into the cozy blue house: desk lamps glowing, coffee mugs, GLASSES (a man with voluminous swept-back brown hair, rectangular dark-framed glasses, light stubble and a short goatee, black suit jacket, white open-collar shirt) and BLONDE (a woman with long straight blonde hair, blue eyes, calm smile, fitted dark chocolate-brown long-sleeve top, thin long silver necklace) working late at the wooden desks, tired but focused. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
Slow push-in through the rainy glass; GLASSES rubs his tired eyes under his glasses, BLONDE keeps working. Quiet blue-and-amber late-night mood. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S04-02 · 0:28.22 · 1.6 с

Голос: «Мы спорили,»  
Референсы: L02 синий домик внутри, VEST (`Man_standing_in_corridor`), SPEAKER (`Man_speaking_on_stage`)

**Стартовый кадр:**
```
Night, inside the blue house: VEST (a man with short dark side-parted hair, strong eyebrows, short beard, intense serious gaze, dark brown waistcoat over a white shirt) and SPEAKER (a man with short dark hair and a receding hairline, rectangular black glasses, stubble, navy suit, white shirt) facing each other in front of a whiteboard covered only with arrows, circles and boxes (no words), lamp light. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
They argue with big passionate hand gestures and expressive faces (mouths closed). Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S04-03 · 0:29.86 · 1.4 с ⚡

Голос: «ошибались, начинали заново.»  
Референсы: L02 синий домик внутри, BLONDE (`Woman_sitting_at_wooden_table`), SMILE (`Man_sitting_in_cozy_cafe`)

**Стартовый кадр:**
```
Night, inside the blue house: BLONDE (a woman with long straight blonde hair, blue eyes, calm smile, fitted dark chocolate-brown long-sleeve top, thin long silver necklace) crumpling a sheet of paper, SMILE (a cheerful man with short blond-brown hair, round face and a big toothy grin, brown blazer over a black t-shirt) next to her. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
BLONDE tosses the crumpled paper over her shoulder; SMILE catches it, unfolds it, they look at each other and laugh. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S04-04 · 0:31.21 · 1.6 с

Голос: «И каждый раз справлялись.»  
Референсы: BOSS (`Woman_in_tweed_jacket_smiling`), VEST (`Man_standing_in_corridor`), SMILE (`Man_sitting_in_cozy_cafe`), ROUND (`Man_smiling_wearing_blazer`)

**Стартовый кадр:**
```
Top-down close-up of a wooden table at night: several hands in different sleeves (cream tweed with black trim, navy suit, brown blazer, black blazer, white shirt) about to stack on top of each other. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
The hands stack one on top of another, then press down together. Warm lamp light. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S04-05 · 0:32.84 · 1.6 с

Голос: «Потому что вместе.»  
Референсы: L02 синий домик внутри, все 9 персонажей

**Стартовый кадр:**
```
Dawn light bursting through the window of the blue house: the whole team of nine characters from the references (BOSS, GLASSES, VEST, SMILE, BLONDE, BEARD, ROUND, SPEAKER, BALD), tired, at their desks. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
Everyone cheers, high-fives and hugs as the golden dawn light fills the room. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```


### Сцена 5

#### S05-01 · 0:34.42 · 1.9 с

Голос: «Синий домик стал нам мал.»  
Референсы: L01 синий домик снаружи

**Стартовый кадр:**
```
Comedic exterior: a small cozy one-storey wooden house painted soft sky blue with white window frames and a tiny porch, on a quiet green street, visibly overstuffed — boxes pressed against every window, an elbow sticking out of one window, the roof slightly lifted. Daylight. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
The overstuffed little house wobbles, a window pops open and papers flutter out, the roof lifts a little and settles back. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S05-02 · 0:36.31 · 2.4 с

Голос: «Мы переехали в большой красный дом —»  
Референсы: L03 красный дом снаружи, BOSS (`Woman_in_tweed_jacket_smiling`), все 9 персонажей

**Стартовый кадр:**
```
Wide shot: the whole team of nine characters from the references (BOSS, GLASSES, VEST, SMILE, BLONDE, BEARD, ROUND, SPEAKER, BALD) walking up a path carrying cardboard boxes and potted plants toward a large modern two-storey house painted deep red, big warm-lit windows, dark walnut wood details and black metal frames; BOSS (a woman in her 40s with dark hair in a sleek low bun, warm brown eyes, gentle smile, cream tweed jacket with black piping, a big black bow on the chest and black round buttons) walks first, reaching the big doors. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
BOSS swings the big doors open, warm golden light pours out onto everyone; tracking shot. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S05-03 · 0:38.71 · 2.8 с

Голос: «и начали строить ещё смелее.»  
Референсы: L04 красный дом внутри

**Стартовый кадр:**
```
High wide shot of the interior of the big red house (a spacious open-plan space with walnut wood slat walls, glossy deep red accent walls, black cylindrical pendant lights, a long wooden table, green plants and big windows), the team as small figures unpacking boxes, hanging lamps, placing plants, sunlight streaming in. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
Crane shot rising up and back, revealing the huge bright space; someone on a ladder hangs a pendant lamp. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```


### Сцена 6

#### S06-01 · 0:41.46 · 2.8 с

Голос: «И вот уже две тысячи двадцать шестой год.»  
Референсы: L04 красный дом внутри

**Стартовый кадр:**
```
Close-up of a warm walnut wood wall inside the red house with a plain empty spot in the center, soft window light, shallow depth of field. (Remotion puts a calendar on top.) Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
Locked-off static camera. Only soft light shifts slightly; dust particles float. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S06-02 · 0:44.22 · 3.1 с — собирает Remotion, не генерировать
«Наш дом стал большим. Наша семья — тоже.» — Стена с фото: плейт P01 + стоп-кадры S02-02 (2014), S03-06 (2019), S05-02 (2024) в рамках; в конце въезжает новая рамка со стоп-кадром S06-03

#### S06-03 · 0:47.37 · 0.6 с ⚡

Голос: «Семья?»  
Референсы: L04 красный дом внутри, BOSS (`Woman_in_tweed_jacket_smiling`), все 9 персонажей

**Стартовый кадр:**
```
Group photo pose in the interior of the big red house (a spacious open-plan space with walnut wood slat walls, glossy deep red accent walls, black cylindrical pendant lights, a long wooden table, green plants and big windows): the whole team of nine characters from the references (BOSS, GLASSES, VEST, SMILE, BLONDE, BEARD, ROUND, SPEAKER, BALD) hugging each other warmly like a big family, BOSS in the center, everyone laughing. Frontal, symmetrical, chest-height camera. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
Everyone squeezes closer in a warm family hug and laughs; tiny camera push-in. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S06-04 · 0:47.99 · 0.6 с ⚡

Голос: «Клан?»  
Референсы: L04 красный дом внутри, все 9 персонажей

**Стартовый кадр:**
```
Same group in the interior of the big red house (a spacious open-plan space with walnut wood slat walls, glossy deep red accent walls, black cylindrical pendant lights, a long wooden table, green plants and big windows), now a serious 'clan' movie-poster pose: the whole team of nine characters from the references (BOSS, GLASSES, VEST, SMILE, BLONDE, BEARD, ROUND, SPEAKER, BALD) with arms crossed, stern faces, dramatic backlight. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
Slow-motion step toward camera, stern faces, coats sway; dramatic backlight. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S06-05 · 0:48.57 · 0.8 с ⚡

Голос: «Династия?»  
Референсы: L04 красный дом внутри, BOSS (`Woman_in_tweed_jacket_smiling`), все 9 персонажей

**Стартовый кадр:**
```
Formal 'dynasty' royal-portrait pose in the interior of the big red house (a spacious open-plan space with walnut wood slat walls, glossy deep red accent walls, black cylindrical pendant lights, a long wooden table, green plants and big windows): BOSS (a woman in her 40s with dark hair in a sleek low bun, warm brown eyes, gentle smile, cream tweed jacket with black piping, a big black bow on the chest and black round buttons) seated in a grand armchair in the center, the rest of the whole team of nine characters from the references (BOSS, GLASSES, VEST, SMILE, BLONDE, BEARD, ROUND, SPEAKER, BALD) standing around her, dignified, chins up. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
Everyone holds the dignified pose; a tiny proud chin-lift; soft painterly light. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S06-06 · 0:49.38 · 1.8 с

Голос: «Наверное, со стороны виднее.»  
Референсы: L03 красный дом снаружи, все 9 персонажей

**Стартовый кадр:**
```
View from outside through a big window of the red house: the team inside laughing together; a pigeon on the windowsill in the foreground. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
The pigeon tilts its head, watching them curiously; the team keeps laughing inside. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S06-07 · 0:51.20 · 4.7 с

Голос: «Мы многого добились вместе. Но есть то, что особенно хочется сохранить.»  
Референсы: L04 красный дом внутри

**Стартовый кадр:**
```
Close-up of a shelf in the interior of the big red house (a spacious open-plan space with walnut wood slat walls, glossy deep red accent walls, black cylindrical pendant lights, a long wooden table, green plants and big windows): abstract golden and glass trophies and a monitor with colorful rising bar charts (shapes only, no numbers or words); behind them, out of focus, the team chatting with coffee mugs. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
Slow lateral dolly along the shelf, then a smooth rack focus to the background where the team shares a warm laugh over coffee. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S06-08 · 0:55.93 · 2.1 с

Голос: «Мы умеем поддержать друг друга.»  
Референсы: L04 красный дом внутри, SPEAKER (`Man_speaking_on_stage`), BEARD (`Man_sitting_on_red_chair`), BLONDE (`Woman_sitting_at_wooden_table`)

**Стартовый кадр:**
```
SPEAKER (a man with short dark hair and a receding hairline, rectangular black glasses, stubble, navy suit, white shirt) tripping on a step while carrying a tall stack of folders; BEARD (a man with light-brown hair with a soft forward fringe, blue-grey eyes, full short brown beard, navy suit jacket, white open shirt, chunky silver watch) and BLONDE (a woman with long straight blonde hair, blue eyes, calm smile, fitted dark chocolate-brown long-sleeve top, thin long silver necklace) beside him. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
BEARD and BLONDE instantly reach out and catch him and the folders; relieved smiles. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S06-09 · 0:58.02 · 2.4 с

Голос: «Посмеяться друг над другом — и над собой.»  
Референсы: L04 красный дом внутри, SMILE (`Man_sitting_in_cozy_cafe`), BALD (`Man_speaking_into_microphone`)

**Стартовый кадр:**
```
Medium shot in the interior of the big red house (a spacious open-plan space with walnut wood slat walls, glossy deep red accent walls, black cylindrical pendant lights, a long wooden table, green plants and big windows): SMILE (a cheerful man with short blond-brown hair, round face and a big toothy grin, brown blazer over a black t-shirt) sneaking up behind BALD (a bald man with light blue eyes, clean-shaven round face, black suit, white shirt, bright red pocket square) holding a striped paper party hat above his bald head, mischievous grin. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
SMILE pops the hat onto BALD's head; BALD sees himself in a glass partition reflection and bursts out laughing at himself, SMILE laughs too. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S06-10 · 1:00.44 · 1.9 с

Голос: «Заметить, когда кому-то трудно.»  
Референсы: L04 красный дом внутри, ROUND (`Man_smiling_wearing_blazer`), VEST (`Man_standing_in_corridor`)

**Стартовый кадр:**
```
Evening, warm desk lamp: ROUND (a man with short dark textured hair, round thin metal-frame glasses, thick dark beard with grey streaks, black blazer with grey lapel trim, white t-shirt) sitting alone at his desk, head in his hands, exhausted; in the background doorway VEST (a man with short dark side-parted hair, strong eyebrows, short beard, intense serious gaze, dark brown waistcoat over a white shirt). Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
VEST stops in the doorway and notices him, concern on his face; ROUND sighs. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S06-11 · 1:02.30 · 1.4 с ⚡

Голос: «Подхватить. Помочь.»  
Референсы: L04 красный дом внутри, VEST (`Man_standing_in_corridor`), ROUND (`Man_smiling_wearing_blazer`), GLASSES (`Man_sitting_at_desk`)

**Стартовый кадр:**
```
Evening: VEST (a man with short dark side-parted hair, strong eyebrows, short beard, intense serious gaze, dark brown waistcoat over a white shirt) sitting down next to ROUND (a man with short dark textured hair, round thin metal-frame glasses, thick dark beard with grey streaks, black blazer with grey lapel trim, white t-shirt) at his desk, hand on his shoulder; GLASSES (a man with voluminous swept-back brown hair, rectangular dark-framed glasses, light stubble and a short goatee, black suit jacket, white open-collar shirt) approaching with two steaming mugs of tea. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
GLASSES sets the tea down; ROUND looks up and smiles gratefully. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S06-12 · 1:03.72 · 3.5 с

Голос: «И после всех споров снова сесть за один стол.»  
Референсы: L04 красный дом внутри, BOSS (`Woman_in_tweed_jacket_smiling`), все 9 персонажей

**Стартовый кадр:**
```
Wide warm evening shot of the interior of the big red house (a spacious open-plan space with walnut wood slat walls, glossy deep red accent walls, black cylindrical pendant lights, a long wooden table, green plants and big windows): the long wooden table set with simple dishes, teapots and bread; the whole team of nine characters from the references (BOSS, GLASSES, VEST, SMILE, BLONDE, BEARD, ROUND, SPEAKER, BALD) pulling out chairs and sitting down, BOSS at the head of the table. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
Slow dolly along the table as everyone sits down and passes plates; someone pours tea; friendly laughter. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```


### Сцена 7

#### S07-01 · 1:07.17 · 4.6 с

Голос: «И всё это стало возможным, потому что однажды ты решила нас собрать.»  
Референсы: L04 красный дом внутри, BOSS (`Woman_in_tweed_jacket_smiling`)

**Стартовый кадр:**
```
Hero shot: BOSS (a woman in her 40s with dark hair in a sleek low bun, warm brown eyes, gentle smile, cream tweed jacket with black piping, a big black bow on the chest and black round buttons) walking toward camera through the interior of the big red house (a spacious open-plan space with walnut wood slat walls, glossy deep red accent walls, black cylindrical pendant lights, a long wooden table, green plants and big windows), warm backlight, people at desks in the soft-focus background. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
Slow push-in as she walks confidently; team members look up and turn toward her with smiles; gentle lens flare. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S07-02 · 1:11.81 · 2.0 с

Голос: «Объединить. Вдохновить.»  
Референсы: L04 красный дом внутри, BOSS (`Woman_in_tweed_jacket_smiling`), все 9 персонажей

**Стартовый кадр:**
```
Low-angle shot: BOSS (a woman in her 40s with dark hair in a sleek low bun, warm brown eyes, gentle smile, cream tweed jacket with black piping, a big black bow on the chest and black round buttons) in the center, the whole team of nine characters from the references (BOSS, GLASSES, VEST, SMILE, BLONDE, BEARD, ROUND, SPEAKER, BALD) gathered around her in a circle, looking at her, inspired. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
Camera slowly circles around her; the team leans in, inspired smiles. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S07-03 · 1:13.77 · 1.9 с

Голос: «Доверить нам большие задачи —»  
Референсы: L04 красный дом внутри, BOSS (`Woman_in_tweed_jacket_smiling`), SPEAKER (`Man_speaking_on_stage`)

**Стартовый кадр:**
```
Medium two-shot: BOSS (a woman in her 40s with dark hair in a sleek low bun, warm brown eyes, gentle smile, cream tweed jacket with black piping, a big black bow on the chest and black round buttons) handing a large rolled blueprint tied with a red ribbon to SPEAKER (a man with short dark hair and a receding hairline, rectangular black glasses, stubble, navy suit, white shirt). Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
He takes it carefully, surprised by its weight, and looks at her. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S07-04 · 1:15.70 · 2.7 с

Голос: «и помочь поверить, что мы с ними справимся.»  
Референсы: L04 красный дом внутри, SPEAKER (`Man_speaking_on_stage`), BOSS (`Woman_in_tweed_jacket_smiling`)

**Стартовый кадр:**
```
Close-up of SPEAKER (a man with short dark hair and a receding hairline, rectangular black glasses, stubble, navy suit, white shirt) holding the rolled blueprint, doubt in his eyes; BOSS out of focus in the foreground (over-the-shoulder). Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
BOSS gives a calm reassuring nod; his face changes, he smiles, straightens his shoulders and grips the blueprint with confidence. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S07-05 · 1:18.44 · 2.6 с

Голос: «Ты умеешь находить для каждого своё место.»  
Референсы: L04 красный дом внутри, BOSS (`Woman_in_tweed_jacket_smiling`), BEARD (`Man_sitting_on_red_chair`)

**Стартовый кадр:**
```
Sunny corner of the interior of the big red house (a spacious open-plan space with walnut wood slat walls, glossy deep red accent walls, black cylindrical pendant lights, a long wooden table, green plants and big windows): BOSS (a woman in her 40s with dark hair in a sleek low bun, warm brown eyes, gentle smile, cream tweed jacket with black piping, a big black bow on the chest and black round buttons) gently guiding BEARD (a man with light-brown hair with a soft forward fringe, blue-grey eyes, full short brown beard, navy suit jacket, white open shirt, chunky silver watch) by the shoulder toward a desk by a big window, a beam of sunlight on the empty chair. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
He sits down, looks around — it fits him perfectly — and smiles; sunlight warms the frame. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S07-06 · 1:21.08 · 2.7 с

Голос: «Видеть, что человеку интересно, что у него получается»  
Референсы: L04 красный дом внутри, BOSS (`Woman_in_tweed_jacket_smiling`), ROUND (`Man_smiling_wearing_blazer`)

**Стартовый кадр:**
```
Over-the-shoulder: BOSS (a woman in her 40s with dark hair in a sleek low bun, warm brown eyes, gentle smile, cream tweed jacket with black piping, a big black bow on the chest and black round buttons) leaning behind ROUND (a man with short dark textured hair, round thin metal-frame glasses, thick dark beard with grey streaks, black blazer with grey lapel trim, white t-shirt), looking at his drawing tablet full of bright abstract colorful shapes (no text). Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
She nods proudly; he turns and smiles back. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S07-07 · 1:23.79 · 2.5 с

Голос: «и в чём он ещё может вырасти.»  
Референсы: L04 красный дом внутри

**Стартовый кадр:**
```
Macro close-up of a tiny green sprout in a small ceramic pot on a walnut desk, warm sunlight, dust particles glowing, red wall softly blurred behind. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
Magical time-lapse growth: the sprout grows into a small blooming tree with little white flowers, leaves unfurling. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S07-08 · 1:26.32 · 2.6 с

Голос: «Мы давно считаем тебя больше, чем руководителем.»  
Референсы: L04 красный дом внутри, все 9 персонажей

**Стартовый кадр:**
```
Close shot of several team members standing side by side, all looking slightly off-camera toward someone they love and respect, warm grateful smiles. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
Slow lateral dolly across their faces; warm light. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S07-09 · 1:28.97 · 2.8 с

Голос: «Ты для нас — родной человек. Наставник.»  
Референсы: BOSS (`Woman_in_tweed_jacket_smiling`)

**Стартовый кадр:**
```
Emotional close-up of BOSS (a woman in her 40s with dark hair in a sleek low bun, warm brown eyes, gentle smile, cream tweed jacket with black piping, a big black bow on the chest and black round buttons), warm soft light, eyes glistening, touched smile. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
Her eyes glisten, she slowly places her hand on her heart and smiles warmly. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S07-10 · 1:31.80 · 2.1 с

Голос: «Наша путеводная звезда.»  
Референсы: L03 красный дом снаружи

**Стартовый кадр:**
```
Night exterior: a large modern two-storey house painted deep red, big warm-lit windows, dark walnut wood details and black metal frames with all windows glowing, starry sky above. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
Camera slowly tilts up from the roof to the starry sky. (Remotion adds the bright star.) Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```


### Сцена 8

#### S08-01 · 1:33.92 · 2.2 с

Голос: «А почему мы решили подарить тебе мультик?»  
Референсы: L04 красный дом внутри, SMILE (`Man_sitting_in_cozy_cafe`), BALD (`Man_speaking_into_microphone`)

**Стартовый кадр:**
```
Medium close-up in the interior of the big red house (a spacious open-plan space with walnut wood slat walls, glossy deep red accent walls, black cylindrical pendant lights, a long wooden table, green plants and big windows): SMILE (a cheerful man with short blond-brown hair, round face and a big toothy grin, brown blazer over a black t-shirt) with BALD (a bald man with light blue eyes, clean-shaven round face, black suit, white shirt, bright red pocket square) beside him. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
SMILE turns to look directly into the camera, breaks the fourth wall, shrugs with a mischievous grin and raised eyebrows; BALD nods along. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S08-02 · 1:36.16 · 2.5 с

Голос: «Потому что сегодня — твой день рождения.»  
Референсы: L04 красный дом внутри

**Стартовый кадр:**
```
An office desk in the red house with papers and a monitor showing a simple bar chart (shapes only). Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
Magical transformation: papers fly up and turn into colorful confetti, the bar chart lines stretch out of the screen and become glowing string-light garlands, balloons pop into existence. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S08-03 · 1:38.67 · 3.1 с

Голос: «А день рождения всегда немного возвращает в детство.»  
Референсы: L04 красный дом внутри, GLASSES (`Man_sitting_at_desk`), P02 детские версии

**Стартовый кадр:**
```
Medium shot in the festive red house: GLASSES (a man with voluminous swept-back brown hair, rectangular dark-framed glasses, light stubble and a short goatee, black suit jacket, white open-collar shirt) standing next to a 7-year-old boy version of himself (same hair, tiny rectangular glasses, tiny suit), both looking at camera. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
They push their glasses up their noses at exactly the same moment, notice each other and grin. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S08-04 · 1:41.77 · 3.2 с

Голос: «Туда, где собираются близкие, где ждёшь чуда»  
Референсы: L04 красный дом внутри, P02 детские версии

**Стартовый кадр:**
```
Festively decorated red house: the child versions of the team (from the kids lineup reference P02: same faces, hairstyles, glasses and outfit colors as the adults, no beards) running laughing with balloons, kid-height camera. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
Tracking shot at kid height as they run past laughing, balloons bobbing. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S08-05 · 1:44.98 · 3.0 с

Голос: «и где особенно важно, чтобы все были рядом.»  
Референсы: L04 красный дом внутри, BOSS (`Woman_in_tweed_jacket_smiling`), P02 детские версии, все 9 персонажей

**Стартовый кадр:**
```
Festive red house: the adults and their child versions holding hands in a big circle around a decorated table, BOSS (a woman in her 40s with dark hair in a sleek low bun, warm brown eyes, gentle smile, cream tweed jacket with black piping, a big black bow on the chest and black round buttons) in the middle, string lights, balloons. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
Slow circular camera move around the circle; BOSS laughs; string lights twinkle. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S08-06 · 1:47.93 · 3.1 с

Голос: «И сегодня мы хотим сказать спасибо твоим родителям.»  
Референсы: P02 детские версии

**Стартовый кадр:**
```
Warm nostalgic cozy home with vintage furniture and soft golden lamp light: a 6-year-old girl version of BOSS from the kids lineup reference P02 (dark hair, warm brown eyes, a big black bow in her hair) running toward two adults seen only from the waist down (faces out of frame). Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
The adults crouch and lift her up into a hug; she laughs. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S08-07 · 1:51.07 · 0.8 с ⚡

Голос: «За тебя.»  
Референсы: P02 детские версии

**Стартовый кадр:**
```
Close-up of a 6-year-old girl version of BOSS from the kids lineup reference P02 (dark hair, warm brown eyes, a big black bow in her hair), gentle closed-lip smile, warm vintage lamp light. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
She smiles a little wider; soft light flickers. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S08-08 · 1:51.84 · 4.6 с

Голос: «За твоё чувство семьи, уважение к традициям и умение собирать людей.»  
Референсы: L04 красный дом внутри, BOSS (`Woman_in_tweed_jacket_smiling`), все 9 персонажей

**Стартовый кадр:**
```
Close-up of BOSS (a woman in her 40s with dark hair in a sleek low bun, warm brown eyes, gentle smile, cream tweed jacket with black piping, a big black bow on the chest and black round buttons) smiling gently, in the red house, holding the edge of a large white tablecloth with a red ornamental folk pattern. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
Camera pulls back as she and the team spread the tablecloth over the long table; team members bring a big homemade pie and teapots. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S08-09 · 1:56.41 · 4.1 с

Голос: «За то тепло, которое мы столько лет чувствуем рядом с тобой.»  
Референсы: L04 красный дом внутри, BOSS (`Woman_in_tweed_jacket_smiling`), все 9 персонажей

**Стартовый кадр:**
```
Warm lamp-lit group hug: the whole team of nine characters from the references (BOSS, GLASSES, VEST, SMILE, BLONDE, BEARD, ROUND, SPEAKER, BALD) embracing BOSS (a woman in her 40s with dark hair in a sleek low bun, warm brown eyes, gentle smile, cream tweed jacket with black piping, a big black bow on the chest and black round buttons) in the center, cozy red house interior, string lights bokeh. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
The hug tightens, she laughs softly with happy tears; slow push-in. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```


### Сцена 9

#### S09-01 · 2:00.49 · 3.9 с

Голос: «Пусть в нашем доме всегда горит свет,»  
Референсы: L03 красный дом снаружи

**Стартовый кадр:**
```
Dusk exterior with light first snow falling: a large modern two-storey house painted deep red, big warm-lit windows, dark walnut wood details and black metal frames, windows still dark, blue-hour sky, a few street lamps on. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
Gentle snowfall; the windows light up warm one after another until the whole house glows. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S09-02 · 2:04.34 · 2.1 с

Голос: «за столом хватает места всем,»  
Референсы: L04 красный дом внутри, SMILE (`Man_sitting_in_cozy_cafe`), BLONDE (`Woman_sitting_at_wooden_table`), все 9 персонажей

**Стартовый кадр:**
```
Festive long table full of people in the red house: SMILE (a cheerful man with short blond-brown hair, round face and a big toothy grin, brown blazer over a black t-shirt) and BLONDE (a woman with long straight blonde hair, blue eyes, calm smile, fitted dark chocolate-brown long-sleeve top, thin long silver necklace) carrying in a big birthday cake with plain candles (no numbers). Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
Everyone at the table turns and cheers as the cake arrives. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S09-03 · 2:06.44 · 1.5 с

Голос: «а самые смелые идеи сбываются.»  
Референсы: E13 (модель домика), L04 красный дом внутри

**Стартовый кадр:**
```
Close-up of a small handmade model of the sky-blue wooden house on a walnut shelf, warm candle glow; behind it, out of focus, a festive table with people and string lights. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
Slow rack focus from the little house to the celebrating team behind it. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S09-04 · 2:07.96 · 1.5 с

Голос: «Мы рядом. Всегда.»  
Референсы: L04 красный дом внутри, BOSS (`Woman_in_tweed_jacket_smiling`)

**Стартовый кадр:**
```
Close-up of BOSS (a woman in her 40s with dark hair in a sleek low bun, warm brown eyes, gentle smile, cream tweed jacket with black piping, a big black bow on the chest and black round buttons) leaning toward the birthday cake candles, team faces around her, smiling. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
She blows out the candles, everyone around smiles and cheers softly. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S09-05 · 2:09.50 · 3.0 с

Голос: «С днём рождения!»  
Референсы: L04 красный дом внутри, все 9 персонажей

**Стартовый кадр:**
```
Wide festive shot in the red house: the whole team of nine characters from the references (BOSS, GLASSES, VEST, SMILE, BLONDE, BEARD, ROUND, SPEAKER, BALD) around the table under string lights. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**Анимация (5 с):**
```
A burst of confetti, everyone throws their arms up and cheers; a bright camera flash at the very end. Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, numbers or logos appear. Audio: none needed.
```

#### S09-06 · 2:12.46 · 4.2 с — собирает Remotion, не генерировать
«(музыка)» — Стоп-кадр S09-05 уменьшается в рамку на стене P01 рядом со старыми фото, подпись 2026, финальная плашка

