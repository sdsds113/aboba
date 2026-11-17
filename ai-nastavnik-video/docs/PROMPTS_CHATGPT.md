# Пакет элементов для ролика «AI-наставник»: промпты для ChatGPT

Промпты написаны на английском: генератор изображений лучше держит по ним стиль. Пояснения на русском.
Куда кладём результат: `public/assets/stickers/`, `public/assets/props/`, `public/assets/fx/`. Имена файлов указаны у каждого промпта.

---

## 0. Как генерировать, чтобы всё совпало

1. **Персонажа делаем в одном чате ChatGPT от начала до конца.** Первым сообщением прикрепляем `docs/refs/character_reference.jpg` и отправляем «Библию персонажа» (раздел 1). Дальше один стикер на одно сообщение.
2. Если внешность «поплыла» (другое лицо, другой оттенок худи, другой масштаб), заново прикрепляем референс и лучший из уже готовых стикеров и пишем: *«Match the character in these two images exactly»*.
3. **Предметы делаем во втором чате.** Первым сообщением идёт «Библия предметов» (раздел 2), к ней прикрепляем `docs/refs/palette_reference_posts.webp` и `character_reference.jpg` как референс света и материала.
4. Формат: **PNG с прозрачным фоном.** Если ChatGPT нарисовал шахматку вместо прозрачности или фон получился сплошным, просим *«Same image, but with a truly transparent background (alpha channel), no checkerboard»*. Если и это не помогло, просим сплошной фон `#7F7F7F` и вырезаем вручную (remove.bg или Photoshop: Select Subject).
5. Цвета предметов строго такие: красный `#FF2D1F`, синий `#0C8CF0`, фиолетовый `#A84CFC`, белый. Других цветов нет.

### Проверка каждого файла перед тем, как класть в проект
- [ ] Фон действительно прозрачный, без ореола и без белой обводки по контуру.
- [ ] На изображении нет текста, логотипов и надписей (кроме «?» на облачках).
- [ ] У стикеров: тот же масштаб и кадрирование, макушка на одной высоте (8–10 % от верха), срез на уровне пояса по нижнему краю.
- [ ] Пять пальцев, руки анатомичны.
- [ ] Худи того же красного цвета, без шнурков и принтов.

---

## 1. Персонаж-стикер (E01–E23)

### 1.0 Библия персонажа (первое сообщение в чате, с прикреплённым референсом)

```
I'm producing a set of emotion "stickers" of ONE character for an animated explainer video. Attached is the reference image of the character. Study it carefully — every image I ask for must show exactly this same character.

CHARACTER (must stay identical in every image):
- Stylized 3D animated-film look (Pixar-like): soft subsurface skin, large expressive eyes, clean rounded forms, high-quality render.
- Man around 30, fair skin with a few faint freckles, blue-grey eyes, thick brown eyebrows.
- Brown hair: short on the sides, voluminous on top, swept up and back.
- Short trimmed reddish-brown beard and moustache.
- Oversized bright red hoodie (#D53127), hood lying around the neck, NO drawstrings, NO logos, NO prints, NO text.

FRAMING (identical for every sticker, so they can be swapped without jumping):
- Portrait canvas 1024x1536.
- Waist-up shot, front-facing at eye level, 50mm lens look, no perspective distortion.
- Character centered horizontally. Top of the hair at ~9% from the top edge. The body is cut by the bottom edge of the canvas at waist height.
- Same scale as the reference: head width ≈ 26% of canvas width.
- Hands, when used, stay inside the canvas (no cropped fingers), except where the pose obviously needs it.

LIGHTING & RENDER:
- Soft studio key light from front-left, gentle fill, subtle warm rim light from behind. Same light in every image.
- Clean render, no motion blur, no depth-of-field blur on the character.

OUTPUT RULES:
- PNG with a fully TRANSPARENT background (real alpha channel).
- NO white outline, NO sticker border, NO drop shadow, NO ground shadow, NO background elements.
- NO text, NO logos anywhere.
- Hands anatomically correct, five fingers.

Reply "Ready" and wait — I will send the poses one by one.
```

### 1.1 Стикеры

В каждом сообщении шаблон такой: *«Sticker [ID]. Same character, same framing, same lighting, transparent background, no outline. Pose & emotion: …»*. Ниже только строка «Pose & emotion». Её и вставляем.

| ID и файл | Где в ролике | Pose & emotion (вставить в шаблон) |
|---|---|---|
| **E01** `E01_tired_rubbing_forehead.png` | 0.07 сц.1 | Tired after a long day of consultations: eyes half-closed, rubbing his forehead with the fingertips of his right hand, slight sigh, shoulders a bit dropped. |
| **E02** `E02_frozen.png` | 6.98 сц.1 | "Frozen / buffering": completely stiff, eyes wide and round, pupils small, mouth slightly open in a tiny "o", eyebrows raised, arms down, comically motionless. |
| **E03** `E03_overwhelmed_looking_around.png` | 7.83 сц.2, 37.85 сц.6 | Overwhelmed and confused: head turned slightly to his left, eyes darting sideways, eyebrows up and together, awkward half-smile, leaning back a little. |
| **E04** `E04_scratching_head.png` | 10.34 сц.2 | Trying to remember: scratching the back of his head with his right hand, squinting one eye, lips pressed to one side, looking up-left. |
| **E05** `E05_relaxed_shrug.png` | 13.99 сц.3 | Relaxed reassuring shrug: both palms open and up at chest height, shoulders lifted, warm easy smile, eyebrows slightly raised — "it's no big deal". |
| **E06** `E06_surprised_looking_up.png` | 18.39 сц.4 | Surprised, looking straight up at something falling from above: chin raised, mouth open in an "o", eyebrows high, hands slightly raised in front of the chest. |
| **E07** `E07_bored.png` | 25.04 сц.4 | Very bored: cheek resting on his right fist (elbow out of frame), heavy half-lidded eyes looking sideways, mouth flat, slouching — reading endless documents. |
| **E08** `E08_idea_finger_up.png` | 27.63 сц.5 | "I've got an idea": right index finger pointing straight up next to his head, eyes bright and wide, eyebrows up, confident small smile. |
| **E09** `E09_presenting_open_palm.png` | 33.92 сц.6 | Proudly presenting something to his right side (viewer's left): right arm extended sideways with an open palm facing up, body slightly turned, big friendly smile looking at the camera. |
| **E10** `E10_flex_dumbbell.png` | 35.43 сц.6 | Playful "personal trainer": holding a small glossy blue (#0C8CF0) dumbbell in his raised right hand, flexing the biceps through the hoodie, cheeky grin, one eyebrow raised. |
| **E11** `E11_thumbs_up.png` | 31.59 сц.5, 38.74 сц.6 | Confident thumbs up with the right hand at chest height, relaxed confident smile, looking at camera. |
| **E12** `E12_pointing_side.png` | 40.10 сц.7 | Tutorial guide: pointing horizontally to his left (viewer's right) with the extended index finger of his left arm, head turned to the same side, friendly "look here" smile. Keep the pose symmetric enough to be mirrored. |
| **E13** `E13_tea_mug.png` | 47.42 сц.8 | Cozy: holding a big glossy red (#FF2D1F) ceramic mug with a white handle in both hands near his chest, eyes softly half-closed, content smile. No steam (steam will be animated). |
| **E14** `E14_fist_pump.png` | 51.37 сц.8 | Determined "Yes!": right fist pumped at shoulder height, eyes focused, big determined grin with teeth. |
| **E15** `E15_amazed_wow.png` | 53.00 сц.9 | Genuinely impressed "wow": eyebrows high, eyes wide and shining, open-mouth smile, both hands slightly raised at chest height with fingers spread. |
| **E16** `E16_phone_chatting.png` | 59.67 сц.10 | Relaxed chatting: holding a dark smartphone in his right hand at chest height, looking down at the screen with an amused smile, thumb on the screen. Phone screen blank dark, no UI. |
| **E17** `E17_watch_wink.png` | 62.35 сц.10 | Checking time: left wrist raised showing a simple dark wristwatch, he looks at the camera and winks with a sly smile. |
| **E18** `E18_pointing_up.png` | 63.89 сц.11 | Guide explaining: right index finger pointing up and slightly to his left, looking at the camera, open friendly smile, mouth mid-speech. |
| **E19** `E19_tap_click.png` | 70.79 сц.12 | Playful "one click": right index finger pushing forward toward the camera as if pressing a button, one eye squinted, tongue slightly out of the corner of the mouth. |
| **E20** `E20_hand_on_chest.png` | 79.31 сц.13 | Sincere and warm: right hand flat on his chest, gentle sincere smile, head slightly tilted, looking straight into the camera. |
| **E21** `E21_pointing_at_viewer.png` | 82.40 сц.13 | Friendly call to action: pointing straight at the viewer with the right index finger (foreshortened toward the camera), confident encouraging smile. |
| **E22** `E22_chill_hands_behind_head.png` | 86.31 сц.13 | Totally calm: leaning back, both hands behind his head, elbows out, eyes closed, peaceful content smile. Elbows may touch the canvas edges. |
| **E23** `E23_wink_thumbs_up.png` | 88.73 сц.14 | Final: winking at the camera, thumbs up with the right hand, big warm smile. |

Если генерация мимики даётся тяжело, порядок важности такой: E01, E02, E05, E08, E09, E12, E13, E15, E18, E20, E23 — **обязательные**. Остальные можно заменить повтором ближайшей по смыслу эмоции.

---

## 2. Предметы (P01–P18)

### 2.0 Библия предметов (первое сообщение во втором чате)

```
I'm creating a set of 3D props for an animated explainer video. They will float around a Pixar-style 3D character (reference attached) on a pure black background next to flat liquid-paint blobs (palette reference attached).

STYLE FOR EVERY PROP:
- Stylized 3D, Pixar-like toy quality: soft rounded edges, chunky friendly proportions, slightly inflated forms.
- Material: smooth satin plastic / soft clay with a subtle glossy highlight. No realistic textures, no dirt.
- Lighting: soft studio key from front-left, soft fill, gentle rim light — same as the character reference.
- Camera: three-quarter view, slightly from above, no extreme perspective.
- STRICT COLOR PALETTE: red #FF2D1F, electric blue #0C8CF0, violet #A84CFC, white #FFFFFF, plus darker/lighter shades of these for shading only. No other hues (no yellow, no green, no orange).

OUTPUT RULES:
- PNG, square 1024x1024, ONE object per image, centered, ~10% padding around it.
- Fully TRANSPARENT background (real alpha channel).
- NO ground shadow, NO reflections on a floor, NO outline, NO background.
- NO text, NO letters, NO numbers, NO logos (unless I explicitly ask for a symbol).

Reply "Ready" and wait for the list.
```

### 2.1 Список предметов

| ID и файл | Сцена | Промпт (вставить после «Prop [ID]:») |
|---|---|---|
| **P01** `P01_bubble_red.png`, `P01_bubble_violet.png`, `P01_bubble_blue.png` | 2 | A puffy 3D speech bubble with a short tail at the bottom-left, with a big white rounded 3D question mark "?" embossed in the center. Color: red #FF2D1F. *(Затем «Same bubble, color violet #A84CFC» и «… blue #0C8CF0».)* |
| **P02** `P02_hourglass.png` | 1 | A chunky toy hourglass: violet (#A84CFC) rounded frame with two thick pillars, clear glass bulbs, white sand mostly in the top bulb, a thin stream falling. |
| **P03** `P03_browser_tabs_stack.png` | 2 | A fanned stack of 5 thick, rounded browser-window cards (like playing cards), each card white with a colored top bar (alternating red #FF2D1F and violet #A84CFC), three tiny dots in the bar, the body shows only abstract light-grey rounded lines instead of text. |
| **P04** `P04_folder_red.png`, `P04_folder_violet.png`, `P04_folder_blue.png` | 4 | A chunky rounded office folder, slightly open, with two white sheets of paper sticking out. Color: red #FF2D1F. *(Затем фиолетовая и синяя.)* |
| **P05** `P05_paper_sheet_a.png`, `P05_paper_sheet_b.png` | 4 | A single white sheet of paper, gently curled at one corner, covered with abstract light-grey rounded lines instead of text. *(Вариант b: «same, curled differently, slightly folded in the middle».)* |
| **P06** `P06_sticky_note_violet.png`, `P06_sticky_note_blue.png` | 4 | A square sticky note with a slightly lifted curled corner, with an abstract white scribble (no readable letters). Color: violet #A84CFC. *(Затем синий.)* |
| **P07** `P07_magnifier.png` | 5 | A chunky toy magnifying glass: thick electric blue (#0C8CF0) ring and handle, white tip on the handle. The lens is EMPTY — fully transparent inside the ring, only a thin white highlight arc on the rim. |
| **P08** `P08_puzzle_board_with_piece.png` | 5 | A thick 3x3 jigsaw puzzle panel made of glossy electric blue (#0C8CF0) pieces, slightly tilted, with ONE piece missing in the center-right position — the hole goes all the way through (transparent). The missing piece floats separately to the right of the panel, same shape, glossy red (#FF2D1F). Keep a clear gap between panel and piece so they can be cut apart. *(Потом режем на `P08_puzzle_board.png` и `P09_puzzle_piece_red.png`.)* |
| **P10** `P10_ai_nastavnik_icon_hd.png` | 6, 14 | *(Прикрепить `docs/refs/ai_nastavnik_icon_crop.png`.)* Recreate this exact app icon in high resolution: a cute glossy glass robot head in translucent electric blue with big round eyes and a small antenna, inside a soft lavender circle. Keep the design, colors and proportions identical to the attached icon, just sharp and detailed. Transparent background outside the circle. ⚠ Лучше взять оригинальную иконку у команды продукта. |
| **P11** `P11_dumbbell_blue.png` *(опц.)* | 6 | A small chunky toy dumbbell, glossy electric blue (#0C8CF0) weights, white handle. |
| **P12** `P12_lifebuoy.png` | 6 | A classic life ring: thick glossy torus with four alternating red (#FF2D1F) and white segments, a white rope looped around the outside. |
| **P13** `P13_graduation_cap.png` *(опц.)* | 7 | A chunky toy graduation cap (mortarboard), violet (#A84CFC) with a red (#FF2D1F) tassel. |
| **P14** `P14_tea_mug.png` *(опц.)* | 8 | The same glossy red (#FF2D1F) ceramic mug with a white handle as in sticker E13, empty top view tilted slightly, no steam. |
| **P15** `P15_highlighter.png` | 9 | A chunky highlighter marker with the cap off, violet (#A84CFC) body, white grip band, chisel tip glowing violet. Lying diagonally, tip pointing to the bottom-left. |
| **P16** `P16_open_book.png` | 9 | An open hardcover book seen from the front-top, electric blue (#0C8CF0) cover, white pages fanning slightly, abstract grey lines instead of text, a red (#FF2D1F) ribbon bookmark. |
| **P17** `P17_stopwatch.png` | 10, 13 | A chunky toy stopwatch: glossy red (#FF2D1F) body, white button on top, clean white face with simple tick marks only — NO numbers and NO hands (hands will be animated). Face turned toward the camera. |
| **P18** `P18_cursor_hand.png` | 12 | A 3D mouse-pointer hand (index finger extended, "click" gesture) made of glossy white plastic with a thin electric blue (#0C8CF0) edge, slightly tilted. |

---

## 3. Эффекты и текстуры (B01–B03)

Кляксы **в ролике процедурные (SVG и шум)**, потому что их нужно анимировать: растекание, слипание, дыхание краёв. Картинки ниже нужны для капель и брызг, а B01 — как референс формы, чтобы задать характер кляксам в коде.

Эти три делаем в чате с предметами, но с припиской: *«Flat graphic style this time, NOT 3D»* для B01 и *«3D glossy paint»* для B02.

| ID и файл | Промпт |
|---|---|
| **B01** `B01_blob_shapes_reference.png` *(референс)* | Flat graphic design: 6 organic liquid paint spill shapes on a pure black background, arranged in a 3x2 grid with space between them. Solid flat fills, no gradients, no gloss — like spilled poster paint seen from above, soft rounded lobes, some with tiny satellite droplets. Colors: 2 red #FF2D1F, 2 electric blue #0C8CF0, 2 violet #A84CFC. Style reference: attached posts. |
| **B02** `B02_drops_red.png`, `B02_drops_blue.png`, `B02_drops_violet.png` | A small cluster of 6–8 glossy 3D liquid paint droplets of different sizes flying outward, like a splash frozen in mid-air, some elongated with motion. Color red #FF2D1F. Transparent background, no ground. *(Затем синий и фиолетовый.)* |
| **B03** `B03_paint_splat_red.png`, `B03_paint_splat_blue.png`, `B03_paint_splat_violet.png` | A single flat top-view paint splat with a crown of small spikes and a few satellite droplets, solid flat fill, crisp edges, NO gloss, NO 3D. Color red #FF2D1F. Transparent background. *(Для ударов: «10» в сцене 8, клик в сцене 12.)* |

---

## 4. Что делаем НЕ в ChatGPT (для понимания)

| Элемент | Чем делаем |
|---|---|
| Кляксы, их растекание и слипание | SVG + `@remotion/noise` + gooey-фильтр |
| Белая нить, петли обводки, пар, путь | SVG path + stroke-dashoffset |
| Текст | Styrene LC (Drive), кинетика в коде |
| Цифры «3», «5», «10» | Styrene A Black в коде. «3» из пара рисует нить |
| Рамка macOS, подсветки, клики | CSS/SVG в коде |
| Стрелка секундомера | SVG поверх P17 |
| Зерно, виньетка, глубина резкости | `feTurbulence`, CSS `filter: blur()` |
| Карточки UI в сцене 10 | Кропы из скринкаста |

---

## 5. Сводка файлов

```
public/assets/stickers/  E01…E23  (23 шт., 1024×1536 PNG, обязательных 11)
public/assets/props/     P01×3, P02, P03, P04×3, P05×2, P06×2, P07, P08, P09, P10, P12, P15, P16, P17, P18
                         опционально: P11, P13, P14
public/assets/fx/        B01 (референс), B02×3, B03×3
```
