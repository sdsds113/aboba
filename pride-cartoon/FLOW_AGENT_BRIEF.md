# Инструкция агенту для Google Flow: статика и анимация

Нужно сделать **53 коротких клипа** для мультика в стиле Pixar. Каждый клип — **один план, один непрерывный кадр, без склеек внутри**. Склеивать клипы между собой будет другой человек на монтаже. Твоя задача — на каждый план сделать **стартовый кадр (картинку)** и **оживить его**.

## Файлы
- `storyboard.md` — **главный файл**: 53 плана, у каждого номер (`S03-02`), длительность, референсы, промпт стартового кадра и промпт анимации. Копируй промпты из него дословно.
- Папка «Мультяшные для прайда» на Google Диске — 9 портретов персонажей (референсы лиц). Имена файлов и коды персонажей — в начале `storyboard.md`.

## Порядок работы

### Шаг 1. Один раз: 4 локации и лист детей
Сгенерируй картинками (Nano Banana во Flow, 16:9) и сохрани как `L01.png` … `L04.png`, `P02.png`. Они потом прикладываются как референсы, чтобы фон не менялся от плана к плану. Выбери по одному удачному варианту на каждую. В кадре **не должно быть людей и текста**.

**L01:**
```
Establishing view of a small cozy one-storey wooden house painted soft sky blue with white window frames and a tiny porch, on a quiet green street, morning sun. No people. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**L02:**
```
The interior of the small blue house (one cozy room with three old wooden desks, a desk lamp, cardboard boxes, a cork board with blank paper sketches, warm light through small white-framed windows). No people. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**L03:**
```
Establishing view of a large modern two-storey house painted deep red, big warm-lit windows, dark walnut wood details and black metal frames, daytime. No people. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**L04:**
```
The interior of the big red house (a spacious open-plan space with walnut wood slat walls, glossy deep red accent walls, black cylindrical pendant lights, a long wooden table, green plants and big windows). No people. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```
**P02 (лист детских версий, прикладываются все 9 портретов):**
```
Character lineup sheet on a plain light grey background: nine children aged about 6–8, each a child version of one of the attached reference characters — same face shape, eye color, hairstyle and hair color, glasses where the adult wears glasses, and miniature versions of the same outfits (cream tweed jacket with black bow for the girl version of BOSS). No beards on children. Full body, standing in a row, friendly poses. Still frame from a modern Pixar-style 3D animated feature film. Stylized characters with soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric textures. Cinematic 16:9 composition, 35mm anamorphic lens look, shallow depth of field, filmic color grading, palette of deep red, warm walnut wood and cream, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere in the image.
```

### Шаг 2. Для каждого плана `SXX-YY` из `storyboard.md`, по порядку

1. **Стартовый кадр.** Сгенерируй картинку 16:9 по блоку «Стартовый кадр». Прикрепи референсы из строки «Референсы»: портреты нужных персонажей, нужную локацию (`L01`–`L04`), для детей `P02`. Для планов «все 9 персонажей» прикрепи всех девятерых.
2. **Проверь картинку, прежде чем оживлять.** Лица узнаваемо похожи на портреты, стиль 3D Pixar, фон совпадает с эталонной локацией, нет текста и букв, нет лишних людей и пальцев. Если нет — перегенерируй картинку. Исправлять лица на видео уже поздно. Сохрани как `SXX-YY_start.png`.
3. **Анимация.** Режим **Frames to Video**: стартовый кадр — эта картинка, промпт — блок «Анимация». Длительность: 6 с, если Flow даёт такой выбор, иначе 8 с (нужно минимум 5 с). Звук не важен, он будет убран.
4. **Проверь видео.** Лица и одежда не меняются, нет склейки и смены сцены, нет текста, действие из промпта произошло. Если нет — перегенерируй. Не оставляй клип «почти нормальный»: лица, плывущие внутри плана, видны на экране.
5. **Сохрани** как `SXX-YY.mp4` (точное имя плана) и перейди к следующему.

## Правила

- **Одно действие и одно движение камеры в клипе.** Не добавляй склеек, «CUT TO», смены локаций, даже если модель предлагает.
- **Никакого текста в кадре:** ни надписей, ни цифр, ни логотипов. Календарь, годы, названия и поздравление накладываются при монтаже. Если в кадре появились буквы, перегенерируй.
- **Не меняй промпты по своему усмотрению.** Если план не получается три раза подряд, пометь его в отчёте и иди дальше.
- **Очень короткие планы** (помечены ⚡, меньше 1,5 с): действие в клипе должно начинаться сразу, с первого кадра.
- Если в плане есть дети (`P02`), у них те же лица и причёски, что у взрослых, но без бород.
- Планы `S06-02` и `S09-06` во Flow не генерировать: их собирают из графики на монтаже.

## Что вернуть
- Папка `clips/`: 53 файла `SXX-YY.mp4`.
- Папка `starts/`: стартовые кадры `SXX-YY_start.png` и `L01`–`L04`, `P02`.
- Список планов, которые не получились, с причиной одной строкой.

## Порядок генерации, если ограничены лимиты
Сначала самые важные планы: `S01-01`, `S02-03`, `S06-03`…`S06-05`, `S07-09`, `S07-10`, `S09-04`, `S09-05`, затем остальные по порядку номеров.
