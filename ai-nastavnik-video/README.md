# AI-наставник: ролик на Remotion

1920×1080, 60 fps, 96 с. План и раскадровка лежат в `docs/PLAN.md`, промпты для элементов — в `docs/PROMPTS_CHATGPT.md`.

## Запуск

```bash
npm i
```

Шрифты Styrene коммерческие, поэтому в git не лежат. Перед запуском нужно положить в `public/fonts/` файлы:
`StyreneALC-Black.otf`, `StyreneALC-Bold.otf`, `StyreneALC-Medium.otf`, `StyreneALC-Regular.otf`, `StyreneBLC-Medium.otf`, `StyreneBLC-Regular.otf`.

```bash
npx remotion studio
```

```bash
npx remotion render AINastavnik out/ai-nastavnik.mp4 --concurrency=4 --crf=18
```

`AINastavnikNoSubs` — та же композиция без вшитых субтитров.

```bash
python3 scripts/make_srt.py data/words_timing.json out/ai-nastavnik.srt
```

```bash
node scripts/stills.mjs 42.4 58.9
```

Последняя команда рендерит контрольные кадры во времени озвучки в `out/stills/`.

## Как устроено

- `src/lib/core.tsx`: палитра, шрифты, время. Всё анимируется по **времени озвучки** (`useVT()`, озвучка стартует на 3,0 с видео, до неё идёт заставка).
- `src/components/`: кляксы на шуме со слипанием (`Blobs`), белая нить (`Thread`), стикер, предметы и кинетический текст (`Elements`), окно macOS с камерой, затемнением вокруг элемента, петлями и кликами (`MacWindow`), субтитры (`Subtitles`).
- `src/scenes/`: акты A–H (сцены 1–14) и общая дорожка персонажа (`CharacterTrack`: смены эмоций и перемещения).
- Скринкаст заранее перемонтирован под озвучку: `scripts/build_screencast_clips.py` → `public/video/sc07_setup.mp4`, `sc09_answer.mp4`, `sc11_route.mp4`. Подсветки рисуются в координатах исходника (`srcBox`) внутри той же камеры, что и видео, поэтому не съезжают.
- Озвучка: `public/audio/voice_edit.wav` (паузы подрезаны, ×1,06). Музыка: `public/audio/music_chill.mp3`.

## Временная заглушка

Сцена 12 (виджет в «Рабочем»): записи этого раздела нет, поэтому вместо виджета показана иконка AI-наставника с кликом. Когда будет запись, её нужно положить в `public/video/` и заменить компонент `Widget` в `src/scenes/ActF.tsx`.
