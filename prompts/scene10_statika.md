# Сцена 10 «Финал»: промты статики

Текст сцены: «Моя главная награда — это благодарность от бизнеса и признание своего вклада в обучение и развитие сотрудников.» Дальше на экране за ней — логотип Альфа-Банка и «НЕ ЗА ЧТО КРАСНЕТЬ!», конец ролика.

## Как устроен финал

1. **10а. Вручение (без слов, ~4 с).** Мужчина в смокинге вручает ей грамоту на сцене. Статика → оживляешь в Kling / Flow (image-to-video). Звука голоса нет, только музыка.
2. **10б. Речь (6,9 с).** Она на сцене в вечернем платье с грамотой в руках, говорит финальную фразу. Статика → HeyGen (как раньше, Avatar III 720p), аудио `hg/voice/v2/scene10_voice_v2.mp3`.
3. **Слоган.** Камера в HeyGen неподвижна, поэтому большой тёмный LED-экран за её спиной я «включаю» в монтаже: на нём проявляется логотип Альфы и «НЕ ЗА ЧТО КРАСНЕТЬ!». Затем мягкий уход в финальную плашку.

Поэтому в обеих статиках важен **большой ровный тёмный экран** за ней, без надписей.

## Референсы

1. **Её оригинальное фото** — для лица.
2. **`hg/refs/scene1_ref.png`** — для лица и причёски. **Одежду из него НЕ брать** (в промте сказано: вечернее платье).

Логотип в генерацию не прикладывать — ставлю его сам в монтаже.

---

## 10а. Вручение (для оживления, без речи)

```
Use the woman from the reference images: keep her exact face, blue eyes, eyebrows, lips, skin tone and long dark brown wavy hair styled in soft glamorous waves; ignore the clothing in the references. Elegant award ceremony on a stage, medium two-shot framed from the waist up, both faces clearly visible and sharp. On the left: the woman in an elegant floor-length deep red evening gown with a modest neckline and subtle sparkle, small gold earrings, a radiant happy smile with lips closed. On the right: a distinguished fictional man around 50, short grey-brown hair, neat beard, classic black tuxedo with a bow tie, warm smile. He is handing her a framed certificate; both hold the frame between them at chest level, the certificate seen at an angle so no text is readable. Background: a dark elegant stage with warm golden spotlights, soft glitter in the air, and a large blank dark LED screen behind them. Cinematic warm lighting, photorealistic, shallow depth of field. 16:9 landscape. No text, no logos, no audience in focus. The man is a generic fictional person with no resemblance to any real individual.
```

**Промт оживления 10а (Kling / Flow, 4–5 с):**
```
The man smiles and hands her the framed certificate; she accepts it with both hands, smiles brightly and gives a small grateful nod, then holds the certificate close to her chest. Warm golden spotlights shimmer, glitter falls slowly. Very slow camera push-in. Neither of them speaks: lips stay closed, no mouth movement. Faces stay sharp and consistent, no morphing. No text, no subtitles, no dialogue audio.
```

## 10б. Речь (для HeyGen)

```
Use the woman from the reference images: keep her exact face, blue eyes, eyebrows, lips, skin tone and long dark brown wavy hair styled in soft glamorous waves; ignore the clothing in the references. Close medium shot framed from the chest up, standing on an award stage on the left third of the frame, body turned slightly to the right, face turned to the camera, looking straight into the lens, face large and sharp. She wears an elegant deep red evening gown with a modest neckline and subtle sparkle, small gold earrings, and holds a framed certificate against her chest with both hands, the certificate seen at an angle so no text is readable. Radiant, proud, grateful expression with a soft closed-mouth smile, lips together, teeth not visible, head upright. Background: a dark elegant stage, warm golden spotlights and soft bokeh, and on the right half a large blank dark LED screen, flat and evenly lit, facing the camera. Warm cinematic key light from the left, natural skin texture, photorealistic, shallow depth of field. 16:9 landscape frame, subject on the left third, the right half is the blank dark screen. No text, no logos.
```

## Проверить

- Лицо похоже на сцены 1–9.
- Платье красное вечернее, без откровенного декольте.
- В 10б рот закрыт, зубов не видно (для HeyGen).
- На грамоте нет читаемого текста.
- Экран за ней большой, ровный, тёмный, без надписей — особенно в 10б.
