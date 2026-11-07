# Сцена 4 «Миссия» (супергероиня): промт статики

Текст сцены: «Моя главная миссия как тренера — превратить выгорание в вовлечённость, а страх перед сложными звонками — в азарт и мастерство.»

Делаем по той же схеме, что остальные сцены: статика → HeyGen (Avatar III, 720p, её голос) → титры в новом стиле. Без взрыва букв: на экране плавно сменяется «От страха и выгорания» → «к азарту и мастерству».

## Референсы

1. **Её оригинальное фото** — для лица.
2. **`hg/refs/scene1_ref.png`** — для лица и причёски (одежду не брать).
3. **`hg/refs/scene04_costume_ref.png`** — костюм супергероини, который уже сделали: красно-белый, логотип «А» на груди, гарнитура с микрофоном, плащ.
4. (по желанию) **логотип Альфа-Банка** — если «А» на груди начнёт искажаться.

## Аудио для HeyGen (новая озвучка)

`hg/voice/v2/scene04_voice_v2.mp3` — 7,5 с.

## Промт (16:9)

Отличие от прошлой статики: она смотрит **прямо в камеру**, рот закрыт, руки не в кадре — так HeyGen аккуратно делает липсинк. Героичность передаём ракурсом, плащом, ветром и взрывом.

```
Use the woman from reference images 1 and 2: keep her exact face, blue eyes, eyebrows, lips, skin tone and long dark brown wavy hair. She wears exactly the superhero costume from reference image 3: red and white armored suit with glowing red lines, the white Alfa-Bank "A" logo with a bar underneath on the chest, white shoulder armor, short flowing red cape, and a sleek headset with a glowing red microphone. Keep the chest logo exact and undistorted. Heroic close medium shot framed from the chest up, slight low angle, standing in the center of the frame, facing the camera and looking straight into the lens, face large and sharp. Confident, determined, inspiring expression with a soft closed-mouth smile, lips together, teeth not visible, chin slightly raised. Hands not visible. Her long hair and red cape move in a strong wind behind her. Background: a huge fiery explosion with dark smoke, glowing red and orange sparks and embers in the air, dramatic warm backlight. Cinematic rim light on hair and armor, soft key light on the face, photorealistic, high detail, sharp skin texture. 16:9 landscape frame, subject centered, calm darker areas of smoke on the left and right sides for titles. No text, no other logos.
```

## Проверить

- Лицо похоже на сцены 1–9.
- Смотрит в камеру, рот закрыт, зубов не видно.
- Руки не в кадре.
- Логотип «А» на груди ровный.
- Слева и справа есть более тёмные спокойные зоны дыма под текст.
