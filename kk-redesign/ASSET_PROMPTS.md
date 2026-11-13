# Пакет элементов для ролика «Короткая карточка»: промты для ChatGPT

Ролик 2D. Элементы плоские, смотрят прямо в камеру, но **с объёмом**: мягкие градиенты, блик сверху, мягкая тень. Ориентир — apple.com и иконки приложений Apple.

Как генерировать:

1. Всё делайте **в одном чате**, по одному запросу на элемент. Первым сообщением отправьте «Общий стиль».
2. Нужен **PNG с прозрачным фоном**. Если фон всё же появился, ответьте: «same image, transparent background, PNG».
3. Назовите файлы, как указано ниже. Неудачный элемент сгенерируйте в 2–3 вариантах и пришлите все, я выберу.

---

## Общий стиль (первое сообщение)

```
I'm making a pack of visual elements for a premium 2D corporate motion video. Keep ONE consistent style for every image in this chat:

- Front-facing 2D composition, no isometric view, no 3D scene, no pedestal, no floor.
- Soft VOLUME: smooth subtle gradients, soft glossy highlight on the top edge, gentle inner glow, very soft drop shadow underneath. Apple keynote / apple.com aesthetic: premium, minimal, clean.
- Colors ONLY: white, black (soft charcoal #141416), and one accent red #EF3124 (from #FF5A4E highlight to #B8180F shade). No gold, no blue, no other colors.
- Simple bold shapes, rounded corners, centered, generous padding.
- No text, no letters, no numbers, no logos, no watermark.
- PNG with fully transparent background.

Reply "ok" and wait for my first request.
```

---

## 1. `macbook.png`: MacBook для показа интерфейса (главный элемент)

```
A modern Apple MacBook Pro 14-inch in Space Black, shown straight from the front at eye level, lid open, screen facing the camera directly (no perspective tilt, no rotation). Thin black screen bezels with the camera notch at the top center. Only a thin sliver of the keyboard base is visible below the screen, like on apple.com product shots.
The ENTIRE screen area must be filled with a perfectly flat, uniform pure green #00FF00: no reflections, no gradient, no texture, no glare, sharp clean edges.
No Apple logo, no text. Soft realistic shadow under the base. Transparent background, landscape, 2048x1365.
```

Важно: экран **ровно зелёный, без бликов**. По этому цвету я вырежу экран и вставлю туда запись интерфейса.

### 1а. `macbook_angle.png` (по желанию): тот же MacBook в лёгком повороте

```
The same Space Black MacBook Pro 14-inch, same style and lighting, but rotated about 20 degrees to the left so we see it in a gentle three-quarter view, lid open. Screen again filled with flat uniform pure green #00FF00, no reflections. Transparent background, 2048x1365.
```

---

## 2. Иконки глав (1024×1024)

### `fl.png`: физические лица

```
Icon: a single person silhouette (rounded head and shoulders) in soft white with volume, on a rounded-square red tile (#EF3124, soft gradient, glossy top highlight). 1024x1024.
```

### `ul.png`: уполномоченное лицо

```
Icon: a white person silhouette (head and shoulders) with a small black ID card in front of the chest that carries a red checkmark, on a rounded-square charcoal tile (#141416, soft gradient, subtle glossy highlight). 1024x1024.
```

### `yl.png`: юридические лица

```
Icon: a modern office building, simple white tower with a neat grid of small windows and one red accent stripe on the side, on a rounded-square red tile (#EF3124, soft gradient, glossy highlight). 1024x1024.
```

---

## 3. Иконки функций (1024×1024)

### `switch.png`: переключение ФЛ / УЛ / ЮЛ

```
Icon: a segmented switch, three rounded segments in a row inside a white pill-shaped track with soft volume; the right segment is active and filled with glossy red. No letters. 1024x1024.
```

### `cursor.png`: подсказки при наведении

```
Icon: a white mouse pointer arrow with a thin charcoal outline, its tip touching a small empty charcoal rounded tooltip bubble. Soft volume and soft shadow. 1024x1024.
```

### `copy.png`: копирование в один клик

```
Icon: two overlapping rounded document sheets (copy symbol), back sheet charcoal, front sheet white with soft volume, small red round badge with a white checkmark in the corner. 1024x1024.
```

### `bell.png`: уведомления и маркеры

```
Icon: a notification bell in soft white with volume, small glossy red dot badge at the top right. 1024x1024.
```

### `link.png`: «Полезные ссылки»

```
Icon: two interlocking chain links, front-facing, one white and one glossy red, soft volume. 1024x1024.
```

---

## 4. Символ ролика

### `card.png`: «короткая карточка» (титул и финал)

```
A wide horizontal rounded white panel (about 6:1) with soft volume and glossy top edge, like a premium UI bar floating in space. Inside on the left: a small red circle, then two short charcoal rounded lines like text placeholders; on the right: three small charcoal round dots. Front-facing, no perspective. Transparent background, 2048x512.
```

---

Пришлите `macbook.png` и иконки (`macbook_angle.png` по желанию). Если какую-то иконку пропустите, на её месте останется векторная, которую я нарисую сам.
