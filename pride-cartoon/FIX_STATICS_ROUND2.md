# Статика, раунд 2: перегенерировать 3 кадра

Задание для генерации (GPT-Image 2 / `image_gen`). Остальные 33 кадра из `PRIDE_STATICS_33.zip` принимаются как есть, их не трогать.

## Общие правила

- Формат 16:9, 2048×1152, имена файлов строго как в заголовках ниже.
- Референс персонажей: `assets/characters/TEAM_CLOSE.png` (ветка `claude/beautiful-dirac-5o387h`, репозиторий `sdsds113/aboba`). Если лицо уплывает, дополнительно приложить отдельный портрет из `assets/characters/` (`NINO.jpg`, `VITYA.jpg` и т. д.).
- Локация L04 (красный дом внутри): `L04_RED_INT.png` из папки storyboard.
- С фото `TEAM_CLOSE` брать **только** лица, причёски, очки, бороды и одежду. **Не** копировать его расстановку в два ряда и позы. В прошлом раунде это была главная ошибка: групповые кадры повторили композицию фото.
- **У Нино (женщина в кремовом твидовом жакете с бантом) рука НЕ у подбородка.** Эта поза взята с портрета Жени и уже повторилась в пяти кадрах. Её позу задаёт промпт.
- Без текста, букв, цифр и логотипов.
- После генерации каждый кадр просмотреть: правильный состав, все лица узнаются, действие соответствует промпту.

---

## 1. `G09_v2.png`: 2019, команда обживает красный дом

**Почему переделываем:** в старом кадре есть персонаж, которого больше нет в команде (мужчина в очках с бородкой), а Вити, Серёжи и Кудряшова нет. Кроме того, фигуры слишком мелкие.

**Состав:** 8 человек. Нино, Маша, Лёша, Витя, Антон, Миша, Серёжа, Кудряшов. **Тани и Жени нет**, они придут позже.

**Референсы:** `TEAM_CLOSE.png`, `L04_RED_INT.png`.

```
The attached team photo is the character reference (take ONLY faces, hairstyles, glasses, facial hair and outfits from it, NOT its poses or composition). In that photo, back row left to right: MASHA (long straight blonde hair, chocolate-brown top), LESHA (dark side-parted hair, short beard, brown waistcoat), MISHA (blond-brown hair, round face, brown blazer), VITYA (auburn hair with fringe, short beard, navy suit), SERGEY (receding hairline, rectangular glasses, navy suit); front row left to right: ANTON (round metal glasses, grey-streaked beard, black blazer), ZHENYA, NINO (the birthday woman: dark low bun, cream tweed jacket, big black bow), KUDRYASHOV (bald, black suit, red pocket square), TANYA. In THIS frame use ONLY eight of them: NINO, MASHA, LESHA, VITYA, ANTON, MISHA, SERGEY, KUDRYASHOV. Do NOT include TANYA or ZHENYA. Moving-in day in the huge bright interior of the big red house (walnut slat walls, glossy deep red accent walls, black cylindrical pendant lights, long wooden table, big windows, sunlight), as in the location reference: they unpack cardboard boxes together, spread naturally through the room in small groups, not in a row; LESHA on a ladder hangs a pendant lamp while SERGEY holds the ladder; NINO and MASHA place a big potted plant together; VITYA and MISHA carry a box between them, laughing; ANTON unpacks books at the table; KUDRYASHOV opens a box with a big grin. Medium-wide shot, camera close enough that every face is clearly recognizable, nobody tiny in the far background. Cheerful, hopeful new-beginning mood. STYLE: still frame from a modern Pixar-style 3D animated feature film, soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric, cinematic 16:9, shallow depth of field, filmic color grading, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere.
```

**Проверить:** ровно 8 человек, нет женщины с волнистыми золотыми волосами (Таня) и мужчины в тёмно-синем поло (Женя), нет посторонних людей.

---

## 2. `G14_last_v3.png`: все в кругу вокруг Нино, вид снизу

**Почему переделываем:** вместо круга получился групповой портрет в два ряда, как на фото `TEAM_CLOSE`.

**Состав:** все 10.

**Референсы:** `TEAM_CLOSE.png`, `L04_RED_INT.png`.

```
The attached team photo is the character reference (take ONLY faces, hairstyles, glasses, facial hair and outfits from it, NOT its poses or composition). In that photo, back row left to right: MASHA (long straight blonde hair, chocolate-brown top), LESHA (dark side-parted hair, short beard, brown waistcoat), MISHA (blond-brown hair, round face, brown blazer), VITYA (auburn hair with fringe, short beard, navy suit), SERGEY (receding hairline, rectangular glasses, navy suit); front row left to right: ANTON (round metal glasses, grey-streaked beard, black blazer), ZHENYA (rectangular black glasses, navy polo, shorter and stockier), NINO (the birthday woman: dark low bun, cream tweed jacket, big black bow), KUDRYASHOV (bald, black suit, red pocket square), TANYA (wavy golden-blonde hair, black blazer). Dramatic LOW-ANGLE shot from below, camera near the floor looking UP: the nine team members stand in a tight CIRCLE, shoulder to shoulder, all LOOKING DOWN toward the center of the circle at NINO and smiling warmly, inspired; NINO stands in the middle of the circle, closest to the camera, looking around at them with a warm proud smile, her hands relaxed at her sides (NOT touching her chin). Their faces form a ring around the frame against the walnut ceiling with black cylindrical pendant lights glowing above them, warm light. Every face visible and recognizable. STYLE: still frame from a modern Pixar-style 3D animated feature film, soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric, cinematic 16:9, shallow depth of field, filmic color grading, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere.
```

**Проверить:** камера снизу, люди стоят кругом и смотрят вниз, над ними потолок и лампы. Это не два ряда лицом в камеру.

---

## 3. `G10_k2_dynasty_v3.png`: «Династия?»

**Почему переделываем:** кадр почти не отличается от «Клана» (у всех те же скрещённые руки), а у Нино рука у подбородка. Нужен торжественный «королевский» портрет.

**Состав:** все 10.

**Референсы:** `TEAM_CLOSE.png`, `L04_RED_INT.png`. Желательно ещё `G10_start_v2.png` и `G10_k1_clan_v2.png` из прошлого раунда, чтобы совпадали интерьер и свет.

```
The attached team photo is the character reference (take ONLY faces, hairstyles, glasses, facial hair and outfits from it, NOT its poses or composition). In that photo, back row left to right: MASHA (long straight blonde hair, chocolate-brown top), LESHA (dark side-parted hair, short beard, brown waistcoat), MISHA (blond-brown hair, round face, brown blazer), VITYA (auburn hair with fringe, short beard, navy suit), SERGEY (receding hairline, rectangular glasses, navy suit); front row left to right: ANTON (round metal glasses, grey-streaked beard, black blazer), ZHENYA (rectangular black glasses, navy polo, shorter and stockier), NINO (the birthday woman: dark low bun, cream tweed jacket, big black bow), KUDRYASHOV (bald, black suit, red pocket square), TANYA (wavy golden-blonde hair, black blazer). A grand, slightly humorous royal-dynasty style portrait, like a classical oil-painting family portrait of a noble dynasty: NINO sits upright on a high-backed red velvet throne-like chair in the center, chin raised, hands resting elegantly on the armrests (NOT touching her chin), a regal calm smile. The other nine stand around and behind her in dignified formal poses, NO crossed arms: some with one hand on the back of her chair, some with a hand on their chest, some standing straight with hands behind their backs, chins up, solemn proud expressions with a hint of a smile. Behind them a deep red wall with a big ornate golden frame holding a blank canvas, heavy drapes, warm golden light. Medium shot, everyone framed from the waist up except seated NINO, every face large and recognizable. STYLE: still frame from a modern Pixar-style 3D animated feature film, soft rounded forms, large expressive eyes, subsurface-scattering skin, detailed hair and fabric, cinematic 16:9, shallow depth of field, filmic color grading, soft volumetric light. Absolutely no text, letters, numbers, logos, signs or captions anywhere.
```

**Проверить:** ни у кого нет скрещённых рук, Нино на троне и её рука не у подбородка, рама пустая, без надписей.

---

## Что сдать

Папку или архив с тремя файлами `G09_v2.png`, `G14_last_v3.png`, `G10_k2_dynasty_v3.png` и короткий отчёт: сколько попыток ушло на каждый кадр и что видно в финальной версии.
