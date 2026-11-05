# Мастер-файл 1. Мультяшные портреты: Витя, Женя, Таня

Генерировать в ChatGPT (GPT-Image 2). Формат портрета 4:5 или 1:1, максимальное качество. Все исходники лежат в папке Google Диска «Мультяшные для прайда».

## Состав команды (коды для промптов)

| Код | Кто | Файл в папке | Что нужно сделать |
|---|---|---|---|
| **NINO** | Нино, именинница | `НИНО ИМЕННИЦА.jpg` | ничего, портрет готов |
| **MASHA** | Маша Миронова | `МИРОНОВА МАША.jpg` | ничего |
| **LESHA** | Лёша Египко | `ЕГИПКО ЛЁША.jpg` | ничего |
| **ANTON** | Антон Юрченко | `АНТОН ЮРЧЕНКО.jpg` | ничего |
| **MISHA** | Миша Бугров | `БУГРОВ МИША.jpg` | ничего |
| **SERGEY** | Серёжа Евграшин | `ЕВГРАШИН СЕРГЕЙ.jpg` | ничего |
| **KUDRYASHOV** | Кудряшов | `КУДРЯШОВ.jpg` | ничего (место в истории уточнить, см. файл 2) |
| **VITYA** | Витя Забалуев | фото `ЗАБАЛУЕВ ВИТЯ.jpg` | **перегенерировать**, сохранить как `ЗАБАЛУЕВ ВИТЯ_pixar.png` |
| **ZHENYA** | Женя Винокуров | фото `ВИНОКУРОВ ЖЕНЯ.webp` | **перегенерировать**, сохранить как `ВИНОКУРОВ ЖЕНЯ_pixar.png` |
| **TANYA** | Таня Трофимова | фото `Таня Трофимова.jpg` | **сделать новый**, сохранить как `ТРОФИМОВА ТАНЯ_pixar.png` |

Готовые PNG положите в ту же папку. После этого надо сделать ещё лист «вся команда» (шаг 3): он понадобится для групповых сцен.

---

## Шаг 1. Что прикладывать

1. **Фото человека.** Чем больше фото, тем точнее сходство: 2–3 штуки, анфас и вполоборота.
2. **Стилевой референс:** `НИНО ИМЕННИЦА.jpg` и `АНТОН ЮРЧЕНКО.jpg`. Это готовые мультяшки, по ним GPT подстроит рендер, свет и пропорции, и новый портрет не будет выбиваться из команды.

В начале промпта уже указано, какая картинка за что отвечает.

## Шаг 2. Промпты для портретов

### VITYA — Витя Забалуев (прошлый вариант был не похож, важнее всего сходство лица)

```
Image 1 (and any other photos of this man) = the IDENTITY reference. Images with the cartoon woman and the cartoon man with round glasses = the STYLE reference only — do not copy their faces.

Turn the man from the photo into a 3D animated character in exactly the same style as the style references: modern Pixar-style 3D animated feature film, soft rounded forms, subsurface-scattering skin, detailed hair and fabric, slightly enlarged expressive eyes, cinematic soft key light, filmic color grading.

LIKENESS IS THE TOP PRIORITY. Keep his real facial structure recognizable at first glance: exact face shape and jawline, forehead height and hairline, nose shape and size, eye shape, eye color and eyelids, eyebrow shape and thickness, mouth and lip shape, ears, facial hair exactly as in the photo (or clean-shaven if he is), skin tone, real age. Same hairstyle, hair color and hair length as in the photo. Do not make him younger, slimmer or more generic; do not beautify. Stylize only the rendering, not his anatomy — the caricature level must be as gentle as in the style references.

Outfit: the same type of clothes as in the photo, adapted to a smart business look that fits the team (suit jacket or blazer, shirt), same colors as in the photo.

Waist-up portrait, three-quarter view, warm friendly confident smile with closed lips, soft warm neutral background with gentle bokeh in deep red and walnut tones. No text, letters, numbers or logos anywhere.
```

### ZHENYA — Женя Винокуров (ниже ростом и чуть плотнее остальных)

```
Image 1 (and any other photos of this man) = the IDENTITY reference. Images with the cartoon woman and the cartoon man with round glasses = the STYLE reference only — do not copy their faces.

Turn the man from the photo into a 3D animated character in exactly the same style as the style references: modern Pixar-style 3D animated feature film, soft rounded forms, subsurface-scattering skin, detailed hair and fabric, slightly enlarged expressive eyes, cinematic soft key light, filmic color grading.

LIKENESS IS THE TOP PRIORITY. Keep his real facial structure recognizable at first glance: exact face shape and fullness of the cheeks, jawline, hairline, nose shape and size, eye shape and color, eyebrows, mouth and lips, ears, facial hair exactly as in the photo, skin tone, real age. Same hairstyle and hair color as in the photo. Body type: a bit shorter and slightly stockier than average — a solid, sturdy, friendly build (not exaggerated, not cartoon-fat). Do not make him younger, slimmer or more generic; do not beautify. Stylize only the rendering, not his anatomy.

Outfit: the same type of clothes as in the photo, adapted to a smart business look that fits the team, same colors as in the photo.

Waist-up portrait, three-quarter view, warm friendly smile with closed lips, soft warm neutral background with gentle bokeh in deep red and walnut tones. No text, letters, numbers or logos anywhere.
```

### TANYA — Таня Трофимова (новый персонаж, в команде с 2021 года)

```
Image 1 (and any other photos of this woman) = the IDENTITY reference. Images with the cartoon woman and the cartoon man with round glasses = the STYLE reference only — do not copy their faces.

Turn the woman from the photo into a 3D animated character in exactly the same style as the style references: modern Pixar-style 3D animated feature film, soft rounded forms, subsurface-scattering skin, detailed hair and fabric, slightly enlarged expressive eyes, cinematic soft key light, filmic color grading.

LIKENESS IS THE TOP PRIORITY. Keep her real facial structure recognizable at first glance: oval face with a soft defined chin, straight nose, almond-shaped hazel-brown eyes, well-defined arched brown eyebrows, full natural lips, fair warm skin, real age. Hair: shoulder-length wavy golden-blonde hair with loose natural waves and a side part, darker roots, exactly as in the photo. Outfit: black tailored blazer over a plain white t-shirt. Do not make her younger or generic; do not beautify. Stylize only the rendering, not her anatomy.

Waist-up portrait, three-quarter view, calm confident gentle smile with closed lips, soft warm neutral background with gentle bokeh in deep red and walnut tones. No text, letters, numbers or logos anywhere.
```

**Если сходство слабое**, допишите отдельным сообщением в тот же чат: `Make the face closer to the photo: same nose, same eye shape and distance between the eyes, same jaw. Keep the style.` Обычно хватает 1–2 итераций.

**Таня и Маша.** Обе блондинки, поэтому их надо различать. У Маши прямые длинные волосы и коричневый топ. У Тани волнистые волосы до плеч и чёрный блейзер. Эти признаки держим во всех сценах.

---

## Шаг 3. Лист «вся команда» (рост и пропорции)

Это главный референс для групповых сцен. В GPT неудобно прикладывать 10 портретов в каждую сцену, а одна картинка со всеми сразу и держит лица, и показывает рост: Женя ниже и плотнее, остальные в своих пропорциях.

Приложить все 10 мультяшных портретов: 7 старых и 3 новых. Сохранить как `TEAM_LINEUP.png`, формат 16:9.

```
Character lineup sheet for an animated film: all ten characters from the attached reference portraits standing side by side in one row, full body, front view, relaxed friendly poses, on a plain light warm-grey studio background. Keep every face, hairstyle, glasses, facial hair and outfit EXACTLY as in their own reference portrait — each character must be instantly recognizable. Realistic relative heights: ZHENYA is noticeably shorter and a bit stockier than the other men. Order left to right: the cream-tweed woman with the black bow in the center (the birthday woman), others around her. Even soft studio light, no shadows overlapping, every face clearly visible, nobody overlaps anybody. Modern Pixar-style 3D animated feature film look, 16:9. No text, letters, numbers, name tags or logos anywhere.
```

Если GPT не принимает 10 картинок за раз, сделайте два листа по 5 человек (`TEAM_LINEUP_A.png`, `TEAM_LINEUP_B.png`) и в групповых сценах прикладывайте оба.

Готовые портреты и лист пришлите мне или положите в папку. Тогда я впишу точные описания Вити и Жени в промпты сцен (файл 2) и проверю сходство.
