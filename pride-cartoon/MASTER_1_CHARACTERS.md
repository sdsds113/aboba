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
| **SERGEY** | Серёжа Евграшин | `ЕВГРАШИН СЕРГЕЙ.jpg` | ничего (у него тоже прямоугольные очки: отличаем по залысинам и тёмно-синему костюму, у Жени поло и круглое лицо) |
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

LIKENESS IS THE TOP PRIORITY. Keep his real facial structure recognizable at first glance: broad slightly square face with full cheeks, strong jaw, straight medium nose, light blue-grey eyes with slightly heavy upper lids, straight light-brown eyebrows, short light-brown hair with a short straight fringe and slightly higher temples, short neat darker-brown beard and moustache, open friendly smile, real age (mid-30s), sturdy broad-shouldered build. Exactly as in the photo. Do not make him younger, slimmer or more generic; do not beautify. Stylize only the rendering, not his anatomy — the caricature level must be as gentle as in the style references.

Outfit: a plain bright red hoodie with a lime-green hood lining and lime-green drawstrings, exactly like in the photo but WITHOUT any print, letters or logo on it.

Waist-up portrait, three-quarter view, arms crossed like in the photo, warm friendly confident smile, soft warm neutral background with gentle bokeh in deep red and walnut tones. No text, letters, numbers or logos anywhere.
```

### ZHENYA — Женя Винокуров (ниже ростом и чуть плотнее остальных)

```
Image 1 (and any other photos of this man) = the IDENTITY reference. Images with the cartoon woman and the cartoon man with round glasses = the STYLE reference only — do not copy their faces.

Turn the man from the photo into a 3D animated character in exactly the same style as the style references: modern Pixar-style 3D animated feature film, soft rounded forms, subsurface-scattering skin, detailed hair and fabric, slightly enlarged expressive eyes, cinematic soft key light, filmic color grading.

LIKENESS IS THE TOP PRIORITY. Keep his real facial structure recognizable at first glance: round full face with soft cheeks, short neck, straight nose, dark brown eyes, dark eyebrows, dark brown hair swept up and back with short sides, thin rectangular black-framed glasses, clean-shaven, calm sly closed-mouth half-smile, real age (mid-30s). Exactly as in the photo. Body type: a bit shorter and slightly stockier than average — a solid, sturdy, friendly build (not exaggerated, not cartoon-fat). Do not make him younger, slimmer or more generic; do not beautify. Stylize only the rendering, not his anatomy.

Outfit: dark navy polo shirt with thin blue trim, dark jeans, black smartwatch, exactly as in the photo, no logos.

Waist-up portrait, three-quarter view, relaxed pose with his chin resting on his fist like in the photo, calm sly half-smile, soft warm neutral background with gentle bokeh in deep red and walnut tones. No text, letters, numbers or logos anywhere.
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
