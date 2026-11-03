# Пакет графических элементов для ролика (ChatGPT)

Здесь элементы, которые Remotion накладывает поверх анимации: календарь, рамки, таблички, эмблемы, конфетти, ленты. Генерировать в ChatGPT (создание изображений), каждый элемент отдельным запросом.

## Правила для всех элементов

1. **Без текста.** Цифры, буквы и надписи рисует Remotion. Если ChatGPT всё-таки добавил текст, попросите: «remove all text, keep everything else identical».
2. **Прозрачный фон.** В конце каждого промпта уже стоит «transparent background». Если фон получился белым или шахматным, попросите: «make the background fully transparent, export as PNG».
3. **Единый стиль с мультиком.** Блок стиля ниже уже вставлен в каждый промпт.
4. Сохраняйте в папку `pride-cartoon/assets/` под именем из заголовка (`E01_calendar_page.png` и т. д.). Codex возьмёт их оттуда.
5. Если элемент нужен в нескольких вариантах, генерируйте в том же чате: «same style, now ...». Так стиль не уплывёт.

**Общий стиль (уже в промптах):**
```
Stylized 3D asset in the style of a modern Pixar animated feature film: soft rounded forms, subtle bevels, tactile materials, soft studio lighting from the top left, gentle contact shadow, palette of deep red (#C8102E), warm walnut wood, cream and soft gold. Clean isolated object, centered, generous empty margin around it. Absolutely no text, letters, numbers, logos or watermarks.
```

---

## 1. Календарь — сцена 6 («И вот уже 2026 год»)

### E01_calendar_page.png — лист отрывного календаря
Remotion нарисует на нём «2025», оторвёт лист и покажет под ним «2026».
```
A single tear-off wall calendar page seen straight-on, cream paper with a subtle paper texture, a deep red header strip at the top with two small metal binding rings, a softly perforated top edge, the main area completely blank and evenly lit (no numbers, no lines). Slight paper curl at the bottom corners. Flat frontal view, no perspective. Stylized 3D asset in the style of a modern Pixar animated feature film: soft rounded forms, subtle bevels, tactile materials, soft studio lighting from the top left, gentle contact shadow, palette of deep red (#C8102E), warm walnut wood, cream and soft gold. Clean isolated object, centered, generous empty margin around it. Absolutely no text, letters, numbers, logos or watermarks. Transparent background, PNG, 1536x1536.
```

### E02_calendar_page_torn.png — оторванный лист (улетает)
```
The same tear-off calendar page as before but torn off: the top edge is ragged and torn along the perforation, no red header and no rings, the page is slightly bent and curled as if flying through the air. Main area completely blank. Same style. Stylized 3D asset in the style of a modern Pixar animated feature film, soft studio lighting, cream paper texture. Absolutely no text, letters, numbers, logos or watermarks. Transparent background, PNG, 1536x1536.
```

---

## 2. Стена с фото — сцены 6 и 9

### P01_photo_wall.png — фон стены (16:9, без прозрачности)
```
Straight-on frontal view of a glossy deep red wall in a cozy modern house, with five empty wooden picture frames arranged in a gentle row at eye level; inside each frame a perfectly flat, evenly lit, plain light-grey mat with nothing in it. A small walnut shelf below with a potted plant. Soft warm side light, no people. Perfectly flat camera angle, no perspective distortion. Still frame from a modern Pixar-style 3D animated film. Absolutely no text, letters, numbers, logos or captions. 16:9, 1920x1080.
```

### E03_photo_frame.png — отдельная рамка (для фото, которое «вешают» и которое улетает в финале)
```
A single empty wooden picture frame in warm walnut with a thin gold inner edge and a cream passe-partout mat, the inner photo area fully transparent (a clean rectangular hole), a small brass nail hook and a short twine string at the top. Landscape 3:2 proportions. Flat frontal view. Stylized 3D asset in the style of a modern Pixar animated feature film: soft rounded forms, subtle bevels, tactile materials, soft studio lighting from the top left, gentle contact shadow. Absolutely no text, letters, numbers, logos or watermarks. Transparent background, PNG, 1536x1024.
```

### E04_year_plaque.png — табличка для года под рамкой
```
A small horizontal brass plaque with rounded corners and two tiny screws, brushed soft-gold metal, completely blank engraving area. Flat frontal view. Stylized 3D asset in the style of a modern Pixar animated feature film, soft studio lighting from the top left, gentle contact shadow. Absolutely no text, letters, numbers, logos or watermarks. Transparent background, PNG, 1024x512.
```

---

## 3. Годы и плашки с именами — сцены 2–3, 5

### E05_year_sign.png — подвесная деревянная табличка для года (S02-01 «2014», S05-02 «2024»)
```
A small hanging wooden sign in warm walnut, rounded rectangle, hanging on two short ropes from the top, a thin deep red painted border, the center completely blank and smooth. Slight gentle tilt. Stylized 3D asset in the style of a modern Pixar animated feature film: soft rounded forms, subtle bevels, tactile wood grain, soft studio lighting from the top left. Absolutely no text, letters, numbers, logos or watermarks. Transparent background, PNG, 1536x1024.
```

### E06_lower_third_plate.png — подложка для плашки с именем
```
A long horizontal soft cream card with rounded corners, slightly raised like a thick paper label, a vertical deep red accent stripe on the left edge, a very subtle soft shadow beneath. The card is completely blank. Wide proportions about 5:1. Flat frontal view. Stylized 3D asset in the style of a modern Pixar animated feature film, soft studio lighting. Absolutely no text, letters, numbers, logos or watermarks. Transparent background, PNG, 2048x410.
```

---

## 4. «Семья? Клан? Династия?» — сцена 6

Три эмблемы появляются рядом с каждым словом и «ударяют» в кадр вместе с ним. Генерируйте в одном чате подряд, чтобы стиль совпал.

### E07_emblem_family.png
```
A cute 3D emblem: a small cozy house with a red roof whose shape forms a heart, warm light glowing from its tiny window, a little puff of smoke from the chimney. Stylized 3D asset in the style of a modern Pixar animated feature film: soft rounded forms, subtle bevels, tactile materials, soft studio lighting from the top left, palette of deep red (#C8102E), warm walnut wood, cream and soft gold. Clean isolated object, centered. Absolutely no text, letters, numbers, logos or watermarks. Transparent background, PNG, 1024x1024.
```

### E08_emblem_clan.png
```
Same style: a heraldic shield emblem, deep red enamel with a soft gold rim, two crossed stylized keys in the middle, slightly battle-worn but friendly. Stylized 3D asset in the style of a modern Pixar animated feature film, soft studio lighting. Clean isolated object, centered. Absolutely no text, letters, numbers, logos or watermarks. Transparent background, PNG, 1024x1024.
```

### E09_emblem_dynasty.png
```
Same style: a royal crown in soft gold with small deep red gems, resting on a laurel wreath, gentle sparkle highlights. Stylized 3D asset in the style of a modern Pixar animated feature film, soft studio lighting. Clean isolated object, centered. Absolutely no text, letters, numbers, logos or watermarks. Transparent background, PNG, 1024x1024.
```

---

## 5. Праздник и финал — сцены 8–9

### E10_confetti_sheet.png — набор конфетти (Remotion размножит частицы)
```
A sprite sheet of about 24 separate confetti pieces laid out in a loose grid with space between them: small rectangles, curly ribbons, stars and circles in deep red, cream, soft gold and a touch of sky blue, slightly glossy, each piece at a different angle. Stylized 3D asset in the style of a modern Pixar animated feature film, soft studio lighting. No overlap between pieces. Absolutely no text, letters, numbers, logos or watermarks. Transparent background, PNG, 2048x2048.
```

### E11_ribbon_banner.png — лента-баннер под «С днём рождения!»
```
A wide festive ribbon banner in deep red satin with soft gold edges, the two ends folded back with swallowtail cuts, gently waving, the central area smooth, wide and completely blank. Stylized 3D asset in the style of a modern Pixar animated feature film: soft rounded forms, tactile satin material, soft studio lighting from the top left. Absolutely no text, letters, numbers, logos or watermarks. Transparent background, PNG, 2048x768.
```

### E12_guiding_star.png — путеводная звезда (сцена 7, свечение поверх неба)
```
A single bright magical five-pointed star with a soft warm golden glow, gentle lens flare rays and a few tiny sparkles around it, soft and friendly, not sharp. Stylized 3D asset in the style of a modern Pixar animated feature film. Absolutely no text, letters, numbers, logos or watermarks. Transparent background, PNG, 1024x1024.
```

### E13_house_blue.png и E14_house_red.png — иконки домиков (переходы и финальная плашка)
```
A small cute isometric 3D icon of a cozy one-storey wooden house painted soft sky blue with white window frames, a tiny porch and a warm light in the window. Stylized 3D asset in the style of a modern Pixar animated feature film: soft rounded forms, subtle bevels, soft studio lighting from the top left, gentle contact shadow. Clean isolated object, centered. Absolutely no text, letters, numbers, logos or watermarks. Transparent background, PNG, 1024x1024.
```
```
Same style and same isometric angle: a large modern two-storey house painted deep red (#C8102E) with big warm-glowing windows, dark walnut wood details and black window frames. Clean isolated object, centered. Absolutely no text, letters, numbers, logos or watermarks. Transparent background, PNG, 1024x1024.
```

### E15_string_lights.png — гирлянда поверх кадра (сцена 8–9, верх кадра)
```
A horizontal string of warm glowing round bulb lights on a dark twisted wire, hanging in a gentle double sag across the full width, soft bokeh glow around each bulb. Stylized 3D asset in the style of a modern Pixar animated feature film. Absolutely no text, letters, numbers, logos or watermarks. Transparent background, PNG, 3840x600.
```

---

## Где что используется

| Файл | План(ы) | Что делает Remotion |
|---|---|---|
| E01, E02 | S06-01 | Corner-pin на календарь в кадре или поверх него. «2025» на E02 отрывается, под ним «2026» на E01 |
| P01, E03, E04 | S06-02, S09-06 | Стена с фото. Стоп-кадры вставляются в рамки, годы пишутся на табличках |
| E05 | S02-01, S05-02 | Табличка «2014» / «2024» въезжает сверху на верёвочках с покачиванием |
| E06 | S02-03, S03-01…S03-05 | Подложка под имя и департамент |
| E07–E09 | S06-03…S06-05 | Эмблема плюс слово, удар в кадр |
| E10 | S08-02, S09-05 | Частицы конфетти |
| E11 | S09-05, S09-06 | Лента под «С днём рождения!» |
| E12 | S07-10 | Дополнительное свечение звезды |
| E13, E14 | S05-02, финальная плашка | Иконки «было → стало» на финальной плашке |
| E15 | S08-02…S09-05 | Гирлянда по верху кадра, лёгкое покачивание |
