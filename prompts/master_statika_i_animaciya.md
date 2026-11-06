# Мастер-файл: статика и анимация (ролик Юлианы Неверовой, ХГ)

## Схема ролика
- **Голос:** весь текст сценария идёт сплошной закадровой дорожкой (её голос или клон).
- **Видео:** Юлиана в кадре **молчит**: губы сомкнуты, лёгкая улыбка, жесты, кивки, взгляд. Липсинка нет.
- **Графика** (голограммы, цифры, титры, логотип, слоган) накладывается потом в монтаже. В генерации текст не просим.
- Формат **16:9**, 1080p. Звук из генераторов не используем.

## Главные правила (против «плывущего» лица)
1. **Никаких общих планов.** Самый дальний план — **по пояс** (waist-up). Основные — **по грудь** (chest-up) и **крупный** (close-up).
2. Лицо в кадре должно быть крупным: не меньше ~1/4 высоты кадра.
3. Камера двигается медленно: лёгкий наезд / отъезд / плавный сдвиг. Без резких поворотов головы и пролётов.
4. Клипы короткие: **5–8 с**. Длинные реплики режем на несколько клипов с разными планами — это и динамичнее.
5. В каждый промт анимации добавлять блок «не говорит» (см. ниже).
6. Для статики референсы: **её оригинальное фото + готовый крупный план (S1)**, чтобы лицо было одинаковым во всех образах.

### Блок «не говорит» — добавлять в конец КАЖДОГО промта анимации
```
She does not speak: lips stay gently closed the whole time, no mouth movement, no talking. Natural blinking, subtle breathing. Face stays sharp and consistent, no morphing. No text, no subtitles, no dialogue audio.
```

### Блок идентичности — добавлять в начало КАЖДОГО промта статики с Юлианой
```
Use the woman from the reference photos: keep her exact face, blue eyes, eyebrows, lips, skin tone and long dark brown wavy hair.
```

---

# ЧАСТЬ 1. СТАТИКА (стартовые кадры)

Всего 8 стартовых кадров. Все 16:9, без текста и логотипов.

### S1. Костюм, крупный план, офис
Можно оставить уже готовый `01_Костюм_крупный_план.png` — он подходит (рот закрыт, улыбка).
Если перегенерить:
```
[блок идентичности] Close-up portrait framed from the chest up, facing the camera, face large in frame. Tailored dark navy business blazer over a white blouse with a closed collar, minimal gold earrings. Warm friendly smile with lips closed. Bright modern office background softly blurred, red and white accents. Soft key light, natural skin texture, photorealistic, shallow depth of field. 16:9 landscape, subject slightly left of center, space on the right for titles. No text, no logos.
```

### S2. Костюм, по пояс, офис (открытый жест)
```
[блок идентичности] Medium shot framed from the waist up, face clearly visible and large. Dark navy tailored blazer, white blouse with closed collar. One hand raised at chest height in an open, explaining palm-up gesture, lips closed, calm confident friendly expression, looking at the camera. Bright modern office background softly blurred, red and white accents. Soft even light, photorealistic, sharp face. 16:9 landscape, subject slightly left of center. No text, no logos.
```

### S3. Костюм, по пояс, голографическая сцена (жест к голограммам)
Основной кадр для кадров 5–9.
```
[блок идентичности] Medium shot framed from the waist up, face clearly visible and large. Dark navy tailored blazer, white blouse with closed collar. She stands on the left third of the frame, body turned slightly to the right, one hand raised to shoulder height pointing with an open palm toward the empty space on the right, lips closed, confident expert smile. Background: dark futuristic stage, deep black-red gradient, soft glowing red and white holographic grid, faint floating particles, volumetric light. Rim light on her hair, soft key light on the face, photorealistic, cinematic. 16:9 landscape, right half of the frame left empty for holograms. No text, no logos.
```

### S4. Костюм, крупный план, голографическая сцена
Для перебивок в длинных кадрах 5–9.
```
[блок идентичности] Close-up framed from the chest up, face large and sharp, looking at the camera with a warm confident smile, lips closed. Dark navy blazer, white blouse with closed collar. Background: dark futuristic stage with soft red and white holographic glow and floating particles, softly blurred. Soft key light on the face, red rim light, photorealistic, cinematic, shallow depth of field. 16:9 landscape, subject slightly left of center. No text, no logos.
```

### S5. Супергероиня, по пояс
```
[блок идентичности] Heroic medium shot framed from the waist up, slight low angle, face large and sharp. Original superhero suit in red and white with a stylized abstract emblem on the chest (not any existing brand), short red cape flowing behind, armor-style shoulder details. Fists slightly clenched at chest level, chin up, determined inspiring look, lips closed. Hair flowing in the wind. Background: fiery explosion, glowing red sparks and embers, dark smoke. Cinematic rim light, photorealistic, high detail. 16:9 landscape, subject centered. No text, no copyrighted characters, no logos.
```

### S6. Вечернее платье, по пояс, пустая наградная сцена
```
[блок идентичности] Medium shot framed from the waist up, face large and sharp. Elegant deep red evening gown with a modest neckline and subtle sparkle, hair in soft glamorous waves. She stands on an award stage, holding a framed certificate in both hands at chest level, proud warm smile, lips closed, looking at the camera. Background: empty award ceremony stage, warm golden spotlights, dark red velvet curtains, a large dark LED screen behind her, glitter in the air, softly blurred. Photorealistic, cinematic. 16:9 landscape, subject slightly left of center, the LED screen visible on the right. No text, no logos, no audience.
```

### S7. Вручение: Юлиана и мужчина в смокинге, по пояс
```
[блок идентичности] Two-shot, medium framing from the waist up, both faces clearly visible. On the left: the woman in an elegant deep red evening gown, hair in soft waves, smiling with lips closed. On the right: a distinguished fictional man around 50, short grey-brown hair, neat beard, classic black tuxedo with bow tie. He is handing her a framed certificate; both hold the frame between them at chest level. Award ceremony stage, warm golden spotlights, dark red velvet curtains, softly blurred background. Photorealistic, cinematic. 16:9 landscape. No text on the certificate, no logos, no audience. The man is a generic fictional person, no resemblance to any real individual.
```
Надпись на грамоте заменим в монтаже на её настоящий диплом.

### S8. Вечернее платье, крупный план, финал
```
[блок идентичности] Close-up framed from the chest up, face large and sharp, deep red evening gown, hair in soft glamorous waves, small gold earrings. Radiant proud smile, lips closed, eyes slightly glistening with joy, looking at the camera. Background: award stage with warm golden spotlights and a large bright red LED screen behind her, softly blurred bokeh. Photorealistic, cinematic. 16:9 landscape, subject on the left third, space on the right for the final slogan. No text, no logos.
```

### Б-ролл без лица Юлианы (необязательно, для перебивок)
- **B1. Оператор на линии:**
```
Medium close-up of a young female call-center operator with a headset in a bright modern office, calm empathetic expression, listening attentively, hand gently on the desk, soft daylight, red and white accents, photorealistic, shallow depth of field. 16:9. No text, no logos.
```
- **B2. Рукопожатие:**
```
Close-up of two people shaking hands over an office desk, one in a business suit, warm soft light, sense of trust and agreement, photorealistic, shallow depth of field. 16:9. No text, no logos.
```
- **B3. Обучение с ИИ:**
```
Over-the-shoulder shot of a young employee with a headset practicing a call with an AI assistant on a computer screen showing abstract glowing voice waveforms, modern office, red and white accents, photorealistic. 16:9. No readable text, no logos.
```
- **B4. Геймификация:**
```
Close-up of a team of three young colleagues smiling and high-fiving in front of a large screen with abstract colorful game-style progress bars and badges, bright modern office, energetic mood, photorealistic. 16:9. No readable text, no logos.
```

---

# ЧАСТЬ 2. АНИМАЦИЯ (image-to-video)

Формат записи: **клип → стартовый кадр → длительность → промт**. К каждому промту дописать блок «не говорит».

## Кадр 1. Знакомство (~7 с)
**1.1 → S1 → 7 с**
```
She looks into the camera with a warm friendly smile, gives a small gentle nod, raises one hand in a soft welcoming greeting wave and lowers it. Hair moves slightly. Very slow camera push-in. Office background stays softly blurred.
```

## Кадр 2. «Взыскание — это…» (~13 с)
**2.1 → S2 → 7 с**
```
She tilts her head slightly and gives a light ironic shake of the head, as if gently disagreeing with a stereotype, then opens her palm toward the camera in an explaining gesture. Calm confident expression. Slow lateral camera drift to the right.
```
**2.2 → S2 → 6 с**
```
She counts on her fingers one, two, three at chest height, with a warm sincere smile, then places her hand lightly on her heart. Slow camera push-in.
```

## Кадр 3. Баланс (~11 с)
**3.1 → S1 → 6 с**
```
Her expression becomes soft and empathetic, she lowers her gaze for a moment, then looks back at the camera with warm understanding, a slight nod, one hand rising gently to her chest. Very slow camera push-in.
```
**3.2 → B1 или B2 → 5 с**
```
B1: The operator listens attentively and nods with calm empathy, a gentle reassuring smile. Slow camera push-in.
B2: The two people firmly and warmly shake hands, slow motion, slight camera orbit.
```

## Кадр 4. Миссия, супергероиня (~8 с)
**4.1 → S5 → 8 с**
```
Epic heroic moment: her cape flutters strongly in the wind, she slowly lifts her chin and clenches her fist in front of her chest with determination, a confident smile appears. Behind her the explosion flares up, sparks and embers fly past the camera. Slow cinematic camera push-in from a low angle. Face stays sharp and clearly visible.
```

## Кадр 5. Цифры (~13 с)
**5.1 → S3 → 8 с**
```
She turns slightly toward the empty space on the right and raises her open palm as if presenting floating holographic numbers appearing one after another, then moves her hand a little higher as if revealing the next number. Confident expert smile. Holographic particles drift around. Slow camera drift to the right.
```
**5.2 → S4 → 5 с**
```
She looks at the camera with quiet pride and gives a firm confident nod, a subtle satisfied smile. Slow camera push-in.
```

## Кадр 6. Три кита (~35 с — режем на 5 клипов)
**6.1 → S3 → 7 с** («прорыв на трёх китах»)
```
She raises her hand and counts three fingers at shoulder height while looking at the empty space on the right, as if three holographic panels are appearing. Energetic but calm expression. Slow camera push-in.
```
**6.2 → S3 → 7 с** («Технологии: AI-тренажёры»)
```
She points with her index finger toward the upper right as if touching a floating holographic panel, then makes a small swipe gesture in the air. Focused, enthusiastic expression. Soft glowing particles react to her hand. Slow lateral camera drift.
```
(перебивка по желанию: **B3 → 5 с** — `The employee confidently talks with the AI assistant, the waveform on the screen pulses, he smiles with relief. Slow push-in.`)

**6.3 → S4 → 7 с** («Азарт: геймификация»)
```
Her face lights up with a bright playful smile, she raises her eyebrows slightly and gives a quick enthusiastic nod, one hand making a small celebratory fist near her shoulder. Slow camera push-in.
```
(перебивка по желанию: **B4 → 5 с** — `The colleagues laugh and high-five, the progress bars on the screen fill up. Slight handheld energy.`)

**6.4 → S4 → 7 с** («Забота: выгорание»)
```
Her expression becomes gentle and caring, she places her hand softly on her heart, slowly tilts her head and gives a reassuring nod. Warm soft light. Very slow camera push-in.
```
**6.5 → S3 → 6 с** (итог)
```
She opens both palms toward the space on the right as if presenting all three panels together, confident satisfied smile. Slow camera pull-back, staying waist-up.
```

## Кадр 7. 35 учебных единиц (~11 с)
**7.1 → S3 → 7 с**
```
She makes a wide sweeping gesture with her open hand across the empty space on the right, as if scattering many floating holographic cards in the air, following them with her eyes, impressed smile. Particles swirl around. Slow lateral camera drift.
```
**7.2 → S4 → 4 с**
```
She looks back at the camera with a proud confident smile and a small nod. Slow push-in.
```

## Кадр 8. Бизнес-эффект (~15 с)
**8.1 → S3 → 8 с** («посмотрите на эти цифры за моей спиной»)
```
She glances over her shoulder toward the space on the right and gestures toward it with an open palm, inviting the viewer to look, then looks back at the camera with a knowing smile. Slow camera push-in.
```
**8.2 → S3 → 7 с** (столбики растут)
```
She raises her hand step by step higher in the air, as if lifting invisible growing bar-chart columns one after another, rhythmic confident movements, pleased expression. Holographic particles rise upward. Slow camera drift.
```

## Кадр 9. Срок жизни и eNPS (~20 с)
**9.1 → S3 → 8 с** (стрелка вверх)
```
She slowly moves her open hand from her waist upward along a diagonal toward the upper right, as if guiding a rising arrow, following it with her eyes, a growing happy smile. Particles stream upward along her hand. Slow camera tilt up, staying waist-up.
```
**9.2 → S4 → 6 с** («довольный сотрудник — довольный клиент»)
```
Warm sincere smile, she nods softly and places her hand on her heart. Slow camera push-in.
```
**9.3 → S4 → 6 с** («нам есть чем гордиться»)
```
She lifts her chin with quiet pride, a confident bright smile, a small firm nod, eyes sparkling. Very slow camera push-in.
```

## Кадр 10. Финал, вручение (~8 с + слоган)
**10.1 → S7 → 6 с**
```
The man smiles and hands her the framed certificate; she accepts it with both hands, smiles brightly and gives a grateful nod. Golden spotlights shimmer, glitter falls softly. Slow camera push-in. Both faces stay sharp. Neither of them speaks.
```
**10.2 → S8 → 6 с**
```
She looks at the camera with a radiant proud smile, eyes glistening with joy, a small gracious nod. Golden glitter falls slowly, the red screen behind her glows brighter. Slow camera push-in.
```
**10.3 → монтаж → 3 с** — на экране сзади появляется логотип и «НЕ ЗА ЧТО КРАСНЕТЬ!» (делаем в Remotion).

---

# ЧАСТЬ 3. ТАЙМИНГ

| Кадр | Реплика | Клипы | Старт. кадр | Итого |
|---|---|---|---|---|
| 1 | Знакомство | 1.1 (7) | S1 | ~7 с |
| 2 | Взыскание — это… | 2.1 (7), 2.2 (6) | S2 | ~13 с |
| 3 | Баланс | 3.1 (6), 3.2 (5) | S1, B1/B2 | ~11 с |
| 4 | Миссия | 4.1 (8) | S5 | ~8 с |
| 5 | Цифры | 5.1 (8), 5.2 (5) | S3, S4 | ~13 с |
| 6 | Три кита | 6.1–6.5 (7+7+7+7+6) + B3/B4 | S3, S4, B3, B4 | ~35 с |
| 7 | 35 единиц | 7.1 (7), 7.2 (4) | S3, S4 | ~11 с |
| 8 | Бизнес-эффект | 8.1 (8), 8.2 (7) | S3 | ~15 с |
| 9 | Срок жизни, eNPS | 9.1 (8), 9.2 (6), 9.3 (6) | S3, S4 | ~20 с |
| 10 | Финал | 10.1 (6), 10.2 (6), 10.3 (3) | S7, S8 | ~15 с |
| | | | **Всего** | **~2 мин 30 с** |

Тайминг примерный (по ~2,2 слова/с). Точный подгоню, когда будет готова голосовая дорожка: клипы можно подрезать или чуть замедлить.

## Чек-лист на каждый сгенерированный клип
- [ ] Рот не открывается, нет «немого разговора».
- [ ] Лицо не плывёт и похоже на S1.
- [ ] Руки без лишних пальцев и «каши».
- [ ] Справа в кадрах 5–9 осталось свободное место под голограммы.
- [ ] Нет случайного текста и логотипов.
