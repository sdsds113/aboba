# Промпты: портреты в стиле 3D-мультфильма (Pixar-like)

## Как пользоваться

1. **Обязательно прикладывайте оригинальное фото** как референс (image-to-image). Без фото нейросеть не сохранит черты лица — текст описывает только стиль и детали.
   - **ChatGPT / GPT-Image**: загрузите фото и вставьте промпт.
   - **Gemini (Nano Banana)**, **Flux Kontext**: загрузите фото и вставьте промпт как инструкцию по редактированию.
   - **Midjourney**: `/imagine <ссылка на фото> <промпт> --oref <ссылка на фото> --ow 100 --ar 2:3` (в v6 вместо `--oref` используйте `--cref <ссылка> --cw 100`).
   - **Stable Diffusion / SDXL**: img2img (denoise 0.45–0.6) + IP-Adapter FaceID / InstantID для сохранения лица.
2. Промпты на английском — так модели понимают их точнее.
3. Если лицо «уплывает» — добавьте фразу из блока «Усилитель сходства» в конце файла.
4. Если получилось слишком реалистично — усильте стилизацию: `more stylized, bigger expressive eyes, softer rounded shapes`.

---

## Базовый стиль (уже включён в каждый промпт ниже)

```
3D animated movie character in the style of a modern Pixar/Disney feature film, stylized but recognizable caricature of the person in the reference photo, preserve facial structure, face shape, nose, eyes, eyebrows, hairline, facial hair and expression, slightly larger expressive eyes, soft subsurface-scattering skin, smooth rounded forms, detailed hair strands, cinematic soft lighting, rich color, high detail, Octane/RenderMan render, 8k
```

**Негативный промпт** (для SD/Flux, где он поддерживается):

```
photorealistic, real photo, anime, 2D, flat illustration, cartoon sketch, deformed face, different person, extra fingers, distorted hands, blurry, low quality, text, watermark, uncanny
```

---

## 1. Мужчина в очках за столом (фото 1)

```
Transform the person in the reference photo into a 3D animated movie character in the style of a modern Pixar film, keeping the face clearly recognizable. A man in his late 30s with short brown hair styled up and swept back with volume, rectangular dark-framed glasses, light stubble with a short goatee and mustache, a confident slight smirk, head slightly tilted, calm intelligent look. He wears a black suit jacket over a crisp white open-collar shirt, a smartwatch on his left wrist, hands clasped on a dark wood desk. He sits in a black leather executive lounge chair with wooden trim. Background: grey-blue wall with geometric triangle panels and brown satin curtains on the left. Soft cinematic office lighting, stylized proportions, slightly larger expressive eyes, soft skin shading, high detail, 3D render, vertical portrait 2:3.
```

## 2. Женщина в светлом жакете с бантом (фото 2)

```
Transform the person in the reference photo into a 3D animated movie character in the style of a modern Pixar film, keeping the face clearly recognizable. A woman in her 40s with dark hair pulled back into a sleek low bun with a center part, warm brown eyes, defined arched dark eyebrows, gentle closed-lip smile, small sparkling stud earrings, elegant and composed. She wears a cream ivory textured tweed jacket with black piping trim, a large black fabric bow on the chest, double-breasted black round buttons. Hands calmly clasped in front of her, a thin gold bracelet and a ring. Plain light grey studio background, soft even studio lighting, stylized proportions, slightly larger expressive eyes, soft skin shading, high detail, 3D render, vertical portrait 2:3.
```

## 3. Мужчина в жилете в красном коридоре (фото 3)

```
Transform the person in the reference photo into a 3D animated movie character in the style of a modern Pixar film, keeping the face clearly recognizable. A man in his 30s with short dark brown hair neatly side-parted, strong straight eyebrows, intense serious focused gaze looking straight at the camera, a short well-groomed beard with goatee and mustache, defined jawline. He wears a dark brown herringbone waistcoat buttoned over a white shirt with an open collar, hands in trouser pockets, confident upright stance. Background: a long narrow corridor with glossy red walls on the left and warm wood paneling on the right, a row of black pendant ceiling lights fading into the distance, dramatic red rim lighting. Cinematic moody lighting, stylized proportions, slightly larger expressive eyes, soft skin shading, high detail, 3D render, vertical portrait 2:3.
```

## 4. Улыбающийся мужчина в кафе с досками для серфинга (фото 4)

```
Transform the person in the reference photo into a 3D animated movie character in the style of a modern Pixar film, keeping the face clearly recognizable. A cheerful man around 40 with short light brown-blond hair, shorter on the sides and swept to the side on top, light eyes, a round friendly face and a big warm toothy smile. He wears a brown blazer over a black t-shirt and sits in a cozy wooden booth at a small square dark wood table, his hand resting next to a red metal tumbler cup. Background: curved dark wood wall panels with a glowing light strip above, a red wall panel, and two white surfboards with black graphics leaning against the wall on the right. Warm cozy café lighting, stylized proportions, slightly larger expressive eyes, soft skin shading, high detail, 3D render, vertical portrait 2:3.
```

## 5. Женщина со светлыми волосами за столом (фото 5)

```
Transform the person in the reference photo into a 3D animated movie character in the style of a modern Pixar film, keeping the face clearly recognizable. A woman in her late 30s with long straight blonde hair with slightly darker roots, parted near the center and falling past her shoulders, bright blue eyes, a subtle calm closed-lip smile, gentle confident expression. She wears a fitted dark chocolate-brown long-sleeve top, a thin long silver lariat necklace, a silver bracelet and a ring. She sits on a teal upholstered chair at a round light wood table, hands resting on top of a phone. Background: tall light wood wall panels, soft window light from the right, moody shallow depth of field. Stylized proportions, slightly larger expressive eyes, soft skin shading, high detail, 3D render, vertical portrait 2:3.
```

## 6. Мужчина с бородой на красном стуле в зале (фото 6)

```
Transform the person in the reference photo into a 3D animated movie character in the style of a modern Pixar film, keeping the face clearly recognizable. A man in his 30s with short light brown hair with a soft fringe swept forward, blue-grey eyes, a full short brown beard and mustache, a friendly open slight smile, looking at the camera over his shoulder. He wears a navy blue suit jacket over a white open-collar shirt and a large chunky silver wristwatch. He sits sideways on a bright red wooden chair with a curved backrest, his arm resting on it. Background: a presentation hall with rows of red chairs, a big glowing red screen on the left, warm wooden slat wall on the right, a few blurred audience members from behind. Shallow depth of field, warm cinematic lighting, stylized proportions, slightly larger expressive eyes, soft skin shading, high detail, 3D render, horizontal 3:2, no text on the screen.
```

## 7. Мужчина в круглых очках с густой бородой (фото 7)

```
Transform the person in the reference photo into a 3D animated movie character in the style of a modern Pixar film, keeping the face clearly recognizable. A man around 40 with short dark brown textured hair brushed up, slightly receding at the temples, round thin dark metal-frame glasses, warm hazel eyes, a full thick dark beard with grey streaks on the chin, a big warm smile showing teeth. He wears a black blazer with grey contrast trim on the lapels over a plain white t-shirt. Background: a light grey wall with a large dark screen above showing a blurred red image, a hint of a light wooden chair on the right. Soft bright lighting, stylized proportions, slightly larger expressive eyes, soft skin shading, high detail, 3D render, vertical portrait 2:3, no text on the screen.
```

## 8. Спикер в очках с микрофоном (фото 8)

```
Transform the person in the reference photo into a 3D animated movie character in the style of a modern Pixar film, keeping the face clearly recognizable. A man around 40 with short dark hair and a receding hairline, rectangular black-framed glasses, light stubble beard and mustache, focused engaged expression, speaking on stage. He holds a microphone in his right hand near his mouth and a presentation clicker in his left hand, gesturing toward the audience; a ring on his finger. He wears a navy blue suit with a white shirt, no tie, and a black belt. Background: white perforated wall panels and a large dark-blue LED screen above with thin glowing white lines. Bright even stage lighting, stylized proportions, slightly larger expressive eyes, soft skin shading, high detail, 3D render, horizontal 3:2, no text.
```

## 9. Спикер с красным платком в кармане (фото 9)

```
Transform the person in the reference photo into a 3D animated movie character in the style of a modern Pixar film, keeping the face clearly recognizable. A man in his 40s with a fully shaved bald head, light blue-grey eyes, clean-shaven round face, slight smile while speaking confidently into a handheld microphone in his right hand. He wears a black suit jacket, a white shirt with small dark buttons and open collar, and a bright red folded pocket square. Background: a big presentation screen with blurred red graphics and a white wall below. Bright stage lighting, stylized proportions, slightly larger expressive eyes, soft skin shading, high detail, 3D render, horizontal 3:2, no text on the screen.
```

---

## Варианты

**Единый стиль для всей команды** (чтобы все 5 картинок выглядели как кадры из одного мультфильма) — добавьте в конец каждого промпта:

```
consistent character design across a series, same rendering style, same lighting quality, same level of stylization
```

**Общий фон вместо оригинального** (например, для слайда/постера) — замените блок `Background: ...` на:

```
Background: clean soft gradient in warm neutral tones, subtle studio lighting
```

**Усилитель сходства** (если лицо получается непохожим):

```
the character must look exactly like the person in the reference image, same face proportions, same eye shape, same nose shape, same lips, same eyebrows, same hairstyle and hairline, same facial hair, only the rendering style changes
```
