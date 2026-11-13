# Ролик «Редизайн КК» (Remotion, 1920×1080, 60 fps)

Объясняет операторам новую короткую карточку клиента в SFACall: шапки ФЛ, УЛ и ЮЛ, подсказки, копирование, маркер IMSI, переключалка, «Полезные ссылки».

## Файлы, которых нет в git

| Путь | Что это | Откуда |
|---|---|---|
| `public/fonts/StyreneALC-*.otf` | Styrene A LC (Light, Regular, Medium, Bold) | Google Drive |
| `public/fonts/InterVariable.woff2` | Inter для макета интерфейса | github.com/rsms/inter |
| `public/vo/voice.wav` | озвучка заказчика, паузы между фразами ужаты до 0,18 с | от пользователя |
| `public/music/music.mp3` | фоновая музыка, 96 с | ElevenLabs Music |
| `public/els/*.png` | иконки и мокап MacBook; `macbook_keyed.png` с вырезанным зелёным экраном | ChatGPT по `ASSET_PROMPTS.md` |
| `public/shots/workspace_mac.jpg` | кадр записи SFACall, дополненный до 16:10 | запись «Редизайн КК.mp4» |

Таймкоды слов озвучки лежат в `src/vo.json`, сцены и анимации привязаны к ним (`src/timeline.ts`).

## Рендер

```bash
npx remotion render KK out/kk_redesign.mp4 --codec=h264 --crf=16 --concurrency=1
```

**Только `--concurrency=1`.** Движущиеся элементы рисуются на GPU-слоях (иначе текст при медленном движении ползёт ступеньками по целому пикселю). Разные вкладки браузера растеризуют такие слои чуть по-разному, и при нескольких вкладках соседние кадры приходят из разных вкладок: неподвижный текст мелко пульсирует. С одной вкладкой все кадры одинаковы.

После рендера громкость выравнивается до −16 LUFS (`ffmpeg loudnorm`, двухпроходно, видео копируется без перекодирования).

## Проверка плавности

```bash
python3 -I tools/smoothness.py out/kk_redesign.mp4   # дубли кадров посреди движения и рывки
python3 -I tools/pops.py out/kk_redesign.mp4         # одиночные «щелчки» в неподвижных местах
```
