# Статика, раунд 4: новая хронология, Вова, слёзы, «Прайд»

Ветка `claude/beautiful-dirac-5o387h`, папка `pride-cartoon/`.

## Сюжет теперь такой

| Год | Дом | Кто |
|---|---|---|
| 2007 · Секвойя | **маленький зелёный домик** (новый) | Нино, Маша |
| 2014 · Восточный | синий домик (он **больше** зелёного) | + Миша, Лёша, Антон, Витя, **Вова Кудряшов** |
| 2019 · Альфа | красный дом | эти же **7 человек** (Серёжи нет) |
| 2023 | красный дом | + Серёжа, Таня |
| 2025 | красный дом | + Женя |

**Синий домик не перегенерируем.** Зелёный домик делаем заметно меньше синего: крошечный коттедж. Тогда существующий синий дом сам читается как «побольше».

## Где лежат файлы

- **Исходники для правок:** `assets/statics_r4_src/`. Это те кадры, которые правим, плюс два стоп-кадра из старых клипов: `G03_frame.png` (Нино у окна) и `G18_frame.png` (Нино тронута).
- **Персонажи:** `assets/characters/final/` (`01_NINO.jpg` … `10_ZHENYA.jpg`, `TEAM_CLOSE_v2.png`).
- **Локации:** `L01`–`L04`.

## Два вида работы

- **ПРАВКА.** Прикладываем готовый кадр первой картинкой и меняем в нём только одно. Лица и свет сохраняются. Это дешевле и надёжнее.
- **НОВЫЙ.** Генерация с нуля.

## Правила

- 16:9, 2048×1152. Имя файла как в заголовке, с суффиксом `_r4`.
- Без текста, букв и цифр.
- Нино: рука не у подбородка, **слёз нет нигде**.
- Если в правке поплыло лицо, приложить ещё и портрет этого человека.

**Описание Вовы для всех промптов:**
`KUDRYASHOV (bald head, light blue eyes, clean-shaven round friendly face, black suit, white shirt, red pocket square)`

---

## А. Зелёный домик, 2007 · Секвойя (сцена 2)

### 1. `G02g_ext_r4.png`: НОВЫЙ. Зелёный домик снаружи (S02-01)
**Рефы:** `L01.jpg`, только как образец стиля и улицы.
```
Exterior of a TINY, humble mint-green wooden cottage, much smaller and simpler than the house in the reference image: one storey, a single small window on each side of a narrow front door, a tiny porch with two steps, a little pitched roof, a small potted plant by the door, a young sapling in the front yard. Same cozy suburban street, same warm morning sunlight, soft golden haze and lush greenery as in the reference, but this house is clearly a modest beginning. Gentle crane shot composition, house in the center, room for a sign overlay in the upper part of the frame (sky and tree branches). Palette of mint green, warm wood and cream. STYLE: still frame from a modern Pixar-style 3D animated feature film, soft rounded forms, cinematic 16:9, shallow depth of field, filmic color grading, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere.
```

### 2. `G02_last_r4.png`: ПРАВКА. Нино и Маша внутри зелёного домика (S02-02)
**Картинки:** 1 = `G02_last_v2.png`, 2 = `01_NINO.jpg`, 3 = `02_MASHA.jpg`.
```
Edit image 1. Keep both women, their faces, poses, outfits, the cork board, the sketch, the desks, the camera angle and the warm morning light EXACTLY the same (faces as in images 2 and 3). Change ONLY the room: repaint all the sky-blue walls, window frames and blue accents into a soft mint / sage GREEN, so this is the interior of a small green cottage. Make the room feel a little smaller and more modest: remove the third desk. Pixar-style 3D render, same style as image 1. No text, letters or numbers anywhere.
```

### 3. `G03g_r4.png`: ПРАВКА. Нино у окна в зелёном домике (S02-03)
**Картинки:** 1 = `G03_frame.png`, 2 = `01_NINO.jpg`.
```
Edit image 1. Keep the woman exactly as she is: face (as in image 2), hairstyle, cream tweed jacket with the big black bow, crossed arms, pose, expression, camera angle and the warm sunlight from the window. Change ONLY the room around her: repaint the sky-blue walls and blue accents into a soft mint / sage GREEN, matching a small green cottage interior. Everything else unchanged. Pixar-style 3D render, same style as image 1. No text, letters or numbers anywhere.
```

**Склейка:** S03-01 (Миша в дверях синего домика) остаётся из старого клипа G03. А синий домик снаружи (старый клип G02) встаёт первым планом сцены 3 под фразу «Дальше был синий домик побольше…». Генерировать для этого ничего не нужно.

---

## Б. Синий домик, 2014 · Восточный: добавляем Вову (сцены 3–5)

### 4. `G04_k_vova_r4.png`: НОВЫЙ. Вова входит (новый план в сцене 3, после Вити)
**Рефы:** `08_KUDRYASHOV.jpg`, `L02.jpg`.
```
Medium shot in the doorway of the small sky-blue wooden house, bright daylight behind, the cozy room with wooden desks and boxes as in the location reference. KUDRYASHOV (the man from image 1: bald head, light blue eyes, clean-shaven round friendly face, black suit, white shirt, red pocket square) steps in with confident charm, straightening his red pocket square with one hand and flashing a big friendly grin, sunlight gleaming on his bald head. Pixar character-introduction framing, palette of sky blue, warm wood and cream. STYLE: still frame from a modern Pixar-style 3D animated feature film, soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric, cinematic 16:9, shallow depth of field, filmic color grading, soft volumetric light. The character keeps his face and outfit EXACTLY as in the reference. Absolutely no text, letters, numbers, logos, signs or captions anywhere.
```

### 5. `G05_last_r4.png`: ПРАВКА. Вся команда Восточного за столом, 7 человек (S03-06)
**Картинки:** 1 = `G05_last_r3.png`, 2 = `08_KUDRYASHOV.jpg`.
```
Edit image 1. Keep all six people, their faces, poses, the table, the room and the light EXACTLY the same. ADD one more person squeezed in naturally at the table among them, leaning in and laughing with the group: KUDRYASHOV, the man from image 2 (bald head, light blue eyes, clean-shaven round friendly face, black suit, white shirt, red pocket square). His face must be fully visible, the same size as the others, and he must not cover anyone's face. Now there are exactly seven people. Pixar-style 3D render, same style as image 1. No text, letters or numbers anywhere.
```

### 6. `G07_k_hands_r4.png`: ПРАВКА. Руки, теперь 7 (S04-04)
**Картинки:** 1 = `G07_k_hands_r3.png`.
```
Edit image 1. Keep the table, the light and all six stacked hands with their sleeves EXACTLY the same. ADD a seventh hand on top of the stack: a man's hand in a black suit sleeve with a crisp white shirt cuff. Now there are exactly seven hands. Same Pixar-style 3D render. No text, letters or numbers anywhere.
```

### 7. `G07_last_r4.png`: ПРАВКА. Рассвет, ликуют всемером (S04-05)
**Картинки:** 1 = `G07_last_r3.png`, 2 = `08_KUDRYASHOV.jpg`.
```
Edit image 1. Keep all six people, their faces, poses, the window with the golden dawn light and the table EXACTLY the same. ADD KUDRYASHOV, the man from image 2 (bald head, light blue eyes, clean-shaven round friendly face, black suit, white shirt, red pocket square), cheering with both fists up among them, face fully visible, same size as the others, not covering anyone. Exactly seven people. Pixar-style 3D render, same style as image 1. No text, letters or numbers anywhere.
```

### 8. `G08_plan2_start_r4.png`: ПРАВКА. Идут с коробками к красному дому, 7 человек (S05-02, начало)
**Картинки:** 1 = `G08_plan2_start_r3.png`, 2 = `08_KUDRYASHOV.jpg`.
```
Edit image 1. Keep all six people, their faces, poses, boxes, the path and the red house in the background EXACTLY the same. ADD KUDRYASHOV, the man from image 2 (bald head, light blue eyes, clean-shaven round friendly face, black suit, white shirt, red pocket square), walking with them in the group carrying a cardboard box with a potted plant on top, smiling, face fully visible, same size as the others. Exactly seven people. Pixar-style 3D render, same style as image 1. No text, letters or numbers anywhere.
```

---

## В. Красный дом, 2019 · Альфа: без Серёжи и без встречи у дверей

### 9. `G08_last_r4.png`: НОВЫЙ. Нино распахивает двери (S05-02, хвост)
Заменяет старый кадр, где Нино встречали Серёжа и Вова.
**Рефы:** `TEAM_CLOSE_v2.png`, `L03.jpg`, `L04.jpg`.
```
The attached team photo (TEAM_CLOSE_v2) is the character reference (take ONLY faces, hairstyles and outfits, NOT poses). Use ONLY seven of them: NINO (dark low bun, cream tweed jacket, big black bow), MASHA (long straight blonde hair, chocolate-brown top), LESHA (short neat black side-parted hair, short goatee, dark brown waistcoat over white shirt), ANTON (full dark beard, NO glasses, beige t-shirt), MISHA (blond-brown hair, round face, brown blazer), VITYA (auburn hair with fringe, short beard, navy suit), KUDRYASHOV (bald, black suit, red pocket square). Do NOT include SERGEY, TANYA or ZHENYA. Shot from INSIDE the big empty red house looking toward the entrance: NINO has just swung both big wooden doors wide open and stands in the doorway, golden sunlight flooding in around her; right behind her the six others peek in over her shoulders holding cardboard boxes, eyes wide with delight, discovering their huge new home. The spacious empty interior with walnut slat walls, glossy deep red accents and black pendant lights in the foreground, as in the location reference. Medium shot, every face recognizable. STYLE: still frame from a modern Pixar-style 3D animated feature film, soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric, cinematic 16:9, shallow depth of field, filmic color grading, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere.
```

### 10. `G09_r4.png`: ПРАВКА. Обживают красный дом всемером (S05-03)
**Картинки:** 1 = `G09_r3.png`, 2 = `08_KUDRYASHOV.jpg`.
```
Edit image 1. REMOVE the man with rectangular glasses and a receding hairline in a navy suit (the one holding the ladder). In his place, the bald man in a black suit with a red pocket square (KUDRYASHOV, as in image 2) now holds the ladder, smiling up; remove him from his old spot and fill that spot naturally with the room and boxes. Keep everyone else, their faces, poses, the room and the light EXACTLY the same. Exactly seven people: no man with glasses anywhere. Pixar-style 3D render, same style as image 1. No text, letters or numbers anywhere.
```
Если правка не выходит, нужен полный промпт `G09_r3` из `FIX_STATICS_ROUND3.md`, переписанный так: `use ONLY seven of them: NINO, MASHA, LESHA, VITYA, ANTON, MISHA, KUDRYASHOV. Do NOT include SERGEY, TANYA or ZHENYA`, и `KUDRYASHOV holds the ladder`.

### 11–12. Фото для стены (S06-02). Только картинки, анимировать не надо
Стена станет такой: 2007 → 2014 → 2019 → **2023** → **2025**. Первые три рамки берём из уже готовых кадров, для 2023 и 2025 нужны два снимка.

**`PHOTO_2023_r4.png`: НОВЫЙ.** Приходят Серёжа и Таня. **Рефы:** `TEAM_CLOSE_v2.png`, `L04.jpg`.
```
The attached team photo (TEAM_CLOSE_v2) is the character reference (take ONLY faces, hairstyles, glasses, facial hair and outfits, NOT poses). Use NINE of them: everyone EXCEPT ZHENYA. A warm, slightly candid "welcome to the team" group snapshot in the big red house: NINO in the center with one arm around SERGEY (receding hairline, rectangular glasses, navy suit) and the other around TANYA (wavy golden-blonde hair, black blazer over white t-shirt), the two newcomers smiling a bit shyly; the other six crowd around them cheering and clapping. Medium shot, chest up, every face large and recognizable, camera at eye level like a real team photo. STYLE: still frame from a modern Pixar-style 3D animated feature film, soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric, 16:9, filmic color grading, warm light. Absolutely no text, letters, numbers, logos, signs or captions anywhere.
```

**`PHOTO_2025_r4.png`: НОВЫЙ.** Приходит Женя. **Рефы:** `TEAM_CLOSE_v2.png`, `10_ZHENYA.jpg`, `L04.jpg`.
```
The attached team photo (TEAM_CLOSE_v2) is the character reference (take ONLY faces, hairstyles, glasses, facial hair and outfits, NOT poses). All TEN of them. A joyful "welcome" group snapshot in the big red house: ZHENYA (voluminous brown hair swept up and back, rectangular black glasses, short goatee, black blazer over white shirt, a bit shorter and stockier) in the front, being given a playful group hug from all sides, laughing; NINO next to him with a warm proud smile, hand on his shoulder. Medium shot, chest up, every face large and recognizable, eye-level camera like a real team photo. STYLE: still frame from a modern Pixar-style 3D animated feature film, soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric, 16:9, filmic color grading, warm light. Absolutely no text, letters, numbers, logos, signs or captions anywhere.
```

---

## Г. Маленький Вова с волосами (сцена 8)

Волосы у мальчика Вовы: **короткие мягкие светло-русые с небольшой чёлкой**. Если есть детское фото, приложите его последней картинкой и пишите «hair as in the last image».

### 13. `P02_kids_r4.png`: ПРАВКА детского листа (делать первым в разделе)
**Картинки:** 1 = `P02_kids_r3.png`, 2 = `08_KUDRYASHOV.jpg`.
```
Edit image 1. Find the bald boy in the small black suit with a red pocket square (the child version of the man in image 2). Give him a full head of short, soft light-brown hair with a small fringe, like a normal 7-year-old boy. Keep his face, eyes, smile, outfit and pose, and keep all the other nine children and the background EXACTLY the same. Pixar-style 3D render, same style as image 1. No text, letters or numbers anywhere.
```

### 14. `G20_last_r4.png`: ПРАВКА. Дети бегут (S08-04)
**Картинки:** 1 = `G20_last_r3.png`, 2 = `P02_kids_r4.png`.
```
Edit image 1. The bald boy in the small black suit with a red pocket square must now have short soft light-brown hair with a small fringe, exactly like the boy in the black suit in image 2. Change ONLY his hair; keep his face, pose and everything else in image 1 EXACTLY the same. Same Pixar-style 3D render. No text, letters or numbers anywhere.
```

### 15. `G21_r4.png`: ПРАВКА. Взрослые и дети (S08-05)
**Картинки:** 1 = `G21_r3.png`, 2 = `P02_kids_r4.png`.
```
Edit image 1. The bald little boy in the small black suit with a red pocket square (standing in front of the bald adult man) must now have short soft light-brown hair with a small fringe, exactly like the boy in the black suit in image 2. Change ONLY the child's hair; the ADULT bald man stays bald. Keep everything else in image 1 EXACTLY the same. Same Pixar-style 3D render. No text, letters or numbers anywhere.
```

---

## Д. Нино без слёз

### 16. `G23_r4.png`: ПРАВКА. Общие объятия (S08-09)
**Картинки:** 1 = `G23_r3.png`, 2 = `01_NINO.jpg`.
```
Edit image 1. Keep the group hug, every person, face, pose, outfit and the warm light EXACTLY the same. Change ONLY the expressions: NO tears on anyone, completely dry eyes and cheeks. The woman in the center with the big black bow (as in image 2) has her eyes OPEN and smiles warmly and joyfully, a happy laughing smile, not crying. Same Pixar-style 3D render. No text, letters or numbers anywhere.
```

### 17. `G18_r4.png`: ПРАВКА. Нино тронута, крупно (S07-09)
**Картинки:** 1 = `G18_frame.png`, 2 = `01_NINO.jpg`.
```
Edit image 1. Keep the woman, her face (as in image 2), hand on her heart, pose, outfit, background and light EXACTLY the same. Change ONLY her eyes: completely dry, no tears, no watery shine; a warm, touched, grateful smile with soft happy eyes. Same Pixar-style 3D render. No text, letters or numbers anywhere.
```

---

## Е. «Прайд» (новая сцена перед финалом)

Под фразу «Тут появился тот самый Прайд — твоя преданная, смелая и неустрашимая первая линия». В кадре строй **клином (галкой)**, во главе вожак. Это 2–3 плана, примерно 6 секунд.

### 18. `PRIDE_lions_r4.png`: НОВЫЙ. Львиный прайд идёт клином
```
A proud lion pride walks straight toward the camera across a golden savanna at sunset in a perfect V-formation (a wedge like flying geese): a strong, graceful lioness leads at the very tip of the V, and behind her on both sides the other lions and lionesses follow in two diagonal lines, heads high, confident and fearless. Low camera angle near the grass, slight slow-motion feel, warm backlight, golden dust and grass seeds glowing in the air, long shadows, epic heroic mood. Original stylized animal designs. STYLE: still frame from a modern Pixar-style 3D animated feature film, soft rounded stylized forms, detailed fur, cinematic 16:9, anamorphic lens, shallow depth of field, filmic color grading, volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere.
```

### 19. `PRIDE_team_r4.png`: НОВЫЙ. Команда идёт тем же клином, Нино впереди
**Рефы:** `TEAM_CLOSE_v2.png`, `PRIDE_lions_r4.png` (как образец композиции и света), `L03.jpg`.
```
The attached team photo (TEAM_CLOSE_v2) is the character reference (take ONLY faces, hairstyles, glasses, facial hair and outfits, NOT poses). All TEN of them: NINO (dark low bun, cream tweed jacket, big black bow), MASHA (long straight blonde hair, chocolate-brown top), LESHA (short neat black side-parted hair, short goatee, dark brown waistcoat over white shirt), ANTON (full dark beard, NO glasses, beige t-shirt, black jeans), MISHA (blond-brown hair, round face, brown blazer), VITYA (auburn hair with fringe, short beard, navy suit), SERGEY (receding hairline, rectangular glasses, navy suit), KUDRYASHOV (bald, black suit, red pocket square), TANYA (wavy golden-blonde hair, black blazer), ZHENYA (voluminous swept-up brown hair, rectangular glasses, short goatee, black blazer). Match the composition and light of the lion image: the team walks straight toward the camera in the SAME V-formation (wedge), NINO at the very tip of the V in front, confident and calm, a warm determined smile; behind her on the left diagonal MASHA, MISHA, VITYA, SERGEY; on the right diagonal ANTON, LESHA, KUDRYASHOV, TANYA, ZHENYA. Everyone walks in step, heads high, fearless, slight smiles, like a hero shot. Low camera angle, slight slow-motion feel, golden sunset backlight, warm dust in the air, wind in hair and jackets, the big deep red house softly out of focus far behind them. Full figures, but faces large enough to be recognizable. STYLE: still frame from a modern Pixar-style 3D animated feature film, soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric, cinematic 16:9, anamorphic lens, shallow depth of field, filmic color grading, volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere.
```

### 20. `PRIDE_nino_r4.png`: НОВЫЙ, по желанию. Крупно Нино во главе клина
**Рефы:** `PRIDE_team_r4.png`, `01_NINO.jpg`.
```
Same scene, same light and formation as image 1. Low-angle medium close-up of NINO (face exactly as in image 2) at the tip of the V, walking toward the camera with a calm, proud, warm smile, wind in her hair, golden backlight; behind her, softly out of focus, the team following in the V-formation. Pixar-style 3D render, same style as image 1. No text, letters or numbers anywhere.
```

---

## Итого

| Раздел | Новые | Правки |
|---|---|---|
| А. Зелёный домик | 1 | 2 |
| Б. Вова в синем домике | 1 | 4 |
| В. Красный дом 2019 | 1 (+2 фото на стену) | 1 |
| Г. Маленький Вова | | 3 |
| Д. Без слёз | | 2 |
| Е. Прайд | 2 (+1 по желанию) | |
| **Всего** | **8** | **12** |

Получается 20 картинок. Если генерирую я в Kling, это около 700 кредитов.

**Что потом оживлять** (Kling 4.0, 1080p): S02-01, S02-02, S02-03, Вова в дверях, S03-06, S04-04, S04-05, S05-02, S05-03, S07-09, S08-04, S08-05, S08-09, прайд (2–3 плана). Это около 16 клипов, примерно 60 секунд видео, около 900 кредитов. Два фото для стены не оживляем, их анимирует Remotion.

**Порядок:** сначала `P02_kids_r4` (по нему делаются №14 и №15), затем `PRIDE_lions_r4` (по нему делаются №19 и №20). Остальные кадры в любом порядке.

---

## Заметки к оживлению (не статика)

- **S05-02** (`G08_plan2_start_r4`: команда с коробками на фоне красного дома, табличка «2019 · Альфа»). Сейчас при анимации они **идут вперёд, от входа**, а это неправильно. Нужно, чтобы стояли **на месте**: только приехали, смотрят на дом или в камеру, улыбаются, переминаются, перехватывают коробки. **Никакой ходьбы.** Камера статичная или с лёгким наездом. Промпт для Kling: `They stand still in place, just arrived, no walking, subtle natural motion only (breathing, smiling, adjusting boxes), static camera`.
- **S08-08** (`G22_last_r4`, перегенерируется Кодексом): стол со скатертью. В старом кадре стол выглядел разрезанным надвое, а Таня стояла под скатертью. Анимация: Нино в торце стола набрасывает скатерть, та плавно ложится на **весь** стол; камера статичная.
- **S09-02** (`G24_last_r4`, перегенерируется Кодексом): Маша и Миша вносят торт. В старом клипе торт ставили на листья. Анимация: идут с тортом к Нино, **на стол не ставят** (план короткий, 2 с); камера статичная или с лёгким наездом.
- **PRIDE_team_r4** перегенерируется Кодексом: нужен глубокий клин, Нино заметно впереди.
