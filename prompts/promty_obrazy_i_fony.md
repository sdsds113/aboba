# Промты: образы Юлианы Неверовой и фоны (ролик для «Хрустальной гарнитуры»)

## Как использовать
- Во всех образах нужна референсная фотография Юлианы (HeyGen `create_prompt_avatar`, до 3 референсов, либо image-to-image в Kling).
- Генерировать по одному образу, начать с образа 1, проверить сходство лица, затем остальные.
- Логотип Альфа-Банка и фразу «НЕ ЗА ЧТО КРАСНЕТЬ!» у ИИ не заказывать: генераторы искажают кириллицу. Рисуем сами в Remotion.
- Супергероиня без знаков Marvel/DC (чужие персонажи).
- Мужчина в смокинге: вымышленный персонаж. Если нужен Епифанов, требуются его фото и согласие.

---

## ОБРАЗЫ

### Образ 1. Деловой костюм, крупный план (кадры 1, 3)
```
Use the woman from the reference photo: keep her exact face, blue eyes, eyebrows, lips, skin tone and long dark brown wavy hair. Close-up portrait, framed from the chest up, facing the camera. She wears a tailored dark navy business blazer over a white blouse, collar closed, minimal gold earrings. Warm, friendly, confident smile, soft eye contact. Bright modern office background, softly blurred, accents of red and white. Soft key light, natural skin texture, photorealistic, 4K, shallow depth of field. No text, no logos.
```

### Образ 2. Деловой костюм, в полный рост (кадры 2, 5, 6, 7, 8, 9)
```
Use the woman from the reference photo: keep her exact face, blue eyes and long dark brown wavy hair. Full-body shot, standing straight, head to shoes visible, slight three-quarter turn, one hand relaxed and the other raised in an open explaining gesture. She wears the same dark navy tailored blazer, matching trousers, white blouse and low heels. Confident expert pose, calm friendly expression. Plain light-grey studio backdrop, even soft lighting, photorealistic, sharp, 4K. No text, no logos.
```
Для удаления фона лучше однотонный: `plain light-grey studio backdrop` или чистый зелёный.

### Образ 3. Супергероиня (кадр 4)
```
Use the woman from the reference photo: keep her exact face, blue eyes and long dark brown wavy hair, flowing as if in a light wind. Full-body heroic pose, legs apart, fists slightly clenched, chin up, determined and inspiring look. She wears an original superhero suit in red and white with a stylized abstract emblem on the chest (not any existing brand), a short red cape, fitted armor-style details, boots. Dramatic low-angle shot, cinematic rim light, glowing red sparks and embers in the air. Photorealistic, high detail, 4K. No text, no copyrighted characters.
```

### Образ 4. Вечернее платье (кадр 10)
```
Use the woman from the reference photo: keep her exact face, blue eyes and long dark brown wavy hair styled in soft glamorous waves. Full-body shot, walking on a red carpet toward a stage, elegant and radiant, holding a small gold clutch. She wears an elegant floor-length deep red evening gown with a modest neckline, subtle sparkle, long train. Warm smile, proud look. Award-ceremony atmosphere, soft warm spotlights, photorealistic, cinematic, 4K. No text, no logos.
```

### Мужчина в смокинге (кадр 10, без реплик)
```
A distinguished man around 50 years old, short grey-brown hair, neat stylish beard, kind confident expression. He wears a classic black tuxedo with a bow tie and a white shirt. Standing on an award stage, holding a framed certificate with both hands, ready to hand it over. Warm stage lighting, photorealistic, cinematic, 4K. A generic fictional person, no resemblance to any real individual.
```

---

## ФОНЫ

### Фон А. Офис (кадры 1–3)
```
Bright modern open-space office, large windows with soft daylight, clean white walls and light wood, subtle red accents, blurred depth of field, calm professional atmosphere, no people, no text, no logos, 16:9, photorealistic.
```

### Фон Б. Голографическая сцена (кадры 4–9, поверх рисуется графика в Remotion)
```
Dark futuristic stage, deep black-red gradient, soft glowing red and white holographic grid on the floor, faint floating particles, subtle volumetric light, empty center space for a presenter, cinematic, no text, no logos, 16:9, high detail.
```

### Фон В. Сцена «Оскара» (кадр 10)
```
Grand award ceremony stage, red carpet, warm golden spotlights, dark velvet curtains, a huge empty LED screen at the back center, a small golden statuette podium on the left, glitter in the air, cinematic, no text, no logos, 16:9, photorealistic.
```

---

## Соответствие кадров сценария

| Кадр | Образ | Фон |
|---|---|---|
| 1 | 1. Костюм, крупно | А. Офис |
| 2 | 2. Костюм, в рост | А. Офис |
| 3 | 1. Костюм, крупно | А. Офис (или рукопожатие) |
| 4 | 3. Супергероиня | Б. Голографическая сцена + взрыв фразы |
| 5 | 2. Костюм, в рост | Б. Голограммы с цифрами |
| 6 | 2. Костюм, в рост | Б. Три плашки |
| 7 | 2. Костюм, в рост | Б. Облако голограмм |
| 8 | 2. Костюм, в рост | Б. Гистограмма |
| 9 | 2. Костюм, в рост | Б. Стрелка роста |
| 10 | 4. Вечернее платье + мужчина в смокинге | В. Сцена «Оскара» |
