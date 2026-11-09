# Рендер ролика «Первая карта» на своём компьютере

Это инструкция для агента (Codex) на локальной машине. Код готов и проходит `tsc`, ассеты лежат в `public/`. Нужно поставить зависимости, отрендерить и проверить результат.

## Что на выходе

- `out/debit_card.mp4`: 1920×1080, 60 fps, H.264, звук AAC 256 kbps.
- Длительность 2:17 (137,0 с, 8220 кадров).
- Композиция `DebitCard`.

## Требования

- Node.js 20.19+ или 22.13+ (`node -v`).
- Около 2 ГБ свободного места: Remotion при первом запуске сам скачает Chrome Headless Shell.
- Шрифты в `public/fonts/`: `StyreneALC-Medium.otf`, `StyreneALC-Bold.otf`, `StyreneALC-Black.otf`. В архиве они уже лежат. Если папка пустая, взять с Диска (папка со шрифтами Styrene ALC).

## Шаги

Выполнять в папке проекта (где лежит `package.json`).

1. Установить зависимости:

   ```bash
   npm i
   ```

2. Проверить типы:

   ```bash
   npx tsc
   ```

3. Отрендерить:

   ```bash
   npx remotion render DebitCard out/debit_card.mp4 --codec=h264 --crf=18 --audio-bitrate=256k
   ```

   На слабой машине можно ограничить потоки: `--concurrency=4`. На 8+ ядрах Remotion подберёт сам.

4. Если нужен быстрый черновик для проверки, рендер в половинном размере:

   ```bash
   npx remotion render DebitCard out/preview.mp4 --codec=h264 --crf=26 --scale=0.5
   ```

## Проверка после рендера

1. Длительность и параметры:

   ```bash
   ffprobe -v error -show_entries format=duration:stream=width,height,r_frame_rate,codec_name -of default=nw=1 out/debit_card.mp4
   ```

   Ожидается: 1920×1080, `60/1`, h264 и aac, около 137 с.

2. Стоп-кадры в ключевых местах (секунды видео):

   ```bash
   npx remotion still DebitCard out/check_08.jpg --frame=480
   npx remotion still DebitCard out/check_42.jpg --frame=2520
   npx remotion still DebitCard out/check_86.jpg --frame=5190
   npx remotion still DebitCard out/check_134.jpg --frame=8030
   ```

   На каждом кадре должно быть: фон (красный, фиолетовый или светлый), Макс справа, плашка-заголовок слева сверху, 3D-элементы слева, субтитры на тёмной плашке внизу слева. Текст набран Styrene (геометрический гротеск). Если вместо него Arial, шрифты не подхватились: проверить `public/fonts/`.

3. Звук: голос с первых 0,5 с, тихая музыка под ним, короткие звуки при появлении элементов. В конце музыка затихает, кадр уходит в белый.

## Если что-то пошло не так

- `Error: Could not find Chrome` или ошибка скачивания браузера: повторить команду, Remotion докачает. За прокси задать `HTTPS_PROXY`.
- Ошибка про `FontFace` или пустой текст: нет файлов шрифтов в `public/fonts/`.
- Не хватает памяти: добавить `--concurrency=2`.
- Посмотреть ролик живьём и подвигать элементы: `npx remotion studio`, композиция `DebitCard`.

## Где что править

- `src/timeline.ts`: сцены (фон и эмоция Макса), заголовки, элементы (`x`, `y`, `size`, `in`, `out`), звуки. Время в секундах озвучки; в видео к нему прибавляется 0,5 с (`LEAD_IN`).
- `src/captions.ts`: субтитры, слова с таймингами.
- `src/Video.tsx`: внешний вид и анимация.
