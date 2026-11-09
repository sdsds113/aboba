# Ролик «Первая карта» (Remotion)

Детский ролик про дебетовую карту для Телеграм-канала. 1920×1080, 60 fps, 2:17.

## Запуск

```bash
npm i
npx remotion studio
npx remotion render DebitCard out/debit_card.mp4 --codec=h264 --crf=18
```

Шрифты Styrene ALC (`public/fonts/*.otf`) в git не лежат: это коммерческий шрифт. Перед рендером положи `StyreneALC-Medium.otf`, `StyreneALC-Bold.otf`, `StyreneALC-Black.otf` в `public/fonts/` (они есть на Диске).

## Файлы

| Файл | Что там |
|---|---|
| `src/timeline.ts` | Весь монтаж данными: сцены (фон и эмоция Макса), плашки, элементы с координатами и таймингами, звуки |
| `src/Video.tsx` | Отрисовка: фоны, Макс, элементы с появлением и парением, плашки, аудио |
| `public/vo.m4a` | Озвучка (паузы сокращены, ускорена на 8%) |
| `public/music.mp3` | Музыка `music_v2_chillpop` |
| `public/sfx/` | Звуки ElevenLabs |
| `public/el/`, `public/char/` | Элементы и эмоции Макса из Codex |
| `public/bg_*.png` | Фоны из папки «03_графика» |

Тайминги в `timeline.ts` указаны в секундах озвучки, перед первой фразой 0,5 с тишины (`LEAD_IN`). Чтобы сдвинуть элемент, правь его `in`/`out`, координаты `x`, `y`, размер `size`.
