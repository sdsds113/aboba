# Сцена 6 «Три кита»: промты статики

Формат 16:9. Генерировать каждую часть отдельно.

## Какие референсы прикрепить (одинаково для всех трёх)

1. **Её оригинальное фото** (портрет в красном жакете) — для лица.
2. **`hg/refs/scene1_ref.png`** — кадр из сцены 1: тот же тёмно-синий костюм, белая блузка, серьги, причёска.

Больше ничего не прикладывать: логотипы и картинки фона не нужны.

## Аудио для HeyGen (новая озвучка)

| Часть | Файл | Длина |
|---|---|---|
| 6а | `hg/voice/v2/scene06a_voice_v2.mp3` | 18,1 с |
| 6б | `hg/voice/v2/scene06b_voice_v2.mp3` | 10,6 с |
| 6в | `hg/voice/v2/scene06c_voice_v2.mp3` | 11,5 с |

---

## 6а. Технологии — ИИ-лаборатория, она слева, по пояс

```
Use the woman from the reference images: keep her exact face, blue eyes, eyebrows, lips, skin tone, long dark brown wavy hair, the same dark navy blazer with a white blouse with a closed collar and small gold earrings. Medium shot framed from the waist up, body turned slightly to the right, face turned to the camera, looking straight into the lens, face clearly visible and sharp. Confident, inspired expression with a soft closed-mouth smile, lips together, teeth not visible, head upright. Arms relaxed and lowered, hands loosely clasped at waist level at the bottom edge of the frame. Background: a modern bright tech training space, a young employee in a headset at a large monitor showing abstract soft glowing voice waveforms, glass walls, cool daylight, white surfaces with subtle red accents, everything softly and deeply blurred. Soft key light from the right, natural skin texture, photorealistic, shallow depth of field. 16:9 landscape frame, subject on the left third, the right half calm for titles. No text, no logos, no readable screens.
```

## 6б. Азарт — зона геймификации, она справа, по грудь

```
Use the woman from the reference images: keep her exact face, blue eyes, eyebrows, lips, skin tone, long dark brown wavy hair, the same dark navy blazer with a white blouse with a closed collar and small gold earrings. Close medium shot framed from the chest up, body turned slightly to the left, face turned to the camera, looking straight into the lens, face large and sharp. Energetic, playful, bright expression with a wide closed-mouth smile, lips together, teeth not visible, head upright. Hands not visible. Background: a vibrant modern team space, a small group of young colleagues laughing together in front of a large screen with colorful abstract progress bars and badges, warm lively light, white and light-wood interior with red accents, everything softly and deeply blurred. Soft key light from the left, natural skin texture, photorealistic, shallow depth of field. 16:9 landscape frame, subject on the right third, the left half calm for titles. No text, no logos, no readable screens.
```

## 6в. Забота — лаунж для отдыха, она слева, крупно

```
Use the woman from the reference images: keep her exact face, blue eyes, eyebrows, lips, skin tone, long dark brown wavy hair, the same dark navy blazer with a white blouse with a closed collar and small gold earrings. Close-up portrait framed from the chest up, body turned slightly to the right, face turned to the camera, looking straight into the lens, face large and sharp. Warm, caring, gentle expression with a soft closed-mouth smile, lips together, teeth not visible, head upright. Hands not visible. Background: a calm cozy office lounge for rest, soft sofas, lots of green plants, warm golden afternoon light from large windows, light wood and soft beige tones with a subtle red accent, everything softly and deeply blurred. Warm soft key light from the right, natural skin texture, photorealistic, shallow depth of field. 16:9 landscape frame, subject on the left third, the right half calm for titles. No text, no logos.
```

---

## Проверить в каждой статике

- Лицо похоже на сцену 1.
- Рот закрыт, зубов не видно (важно для HeyGen).
- Руки либо внизу сцеплены (6а), либо не в кадре (6б, 6в).
- Свободная половина кадра чистая: там будут титры.
- Нет случайного текста на экранах и стенах.
