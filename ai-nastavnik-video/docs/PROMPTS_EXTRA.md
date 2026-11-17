# Догенерация элементов (версия без персонажа)

Макса и всплывающих слов в ролике больше нет: всё рассказывают предметы. Из уже сделанного пакета хватает почти всего, кроме пяти предметов ниже.

**Как генерировать.** В том же чате ChatGPT, где делали предметы P01–P18 (там уже есть «Библия предметов»), пишем: «Prop N01: …». Если чата больше нет, сначала отправляем раздел 2.0 из `PROMPTS_CHATGPT.md`.

Формат как у P-серии: PNG 1024×1024, прозрачный фон, один объект по центру, отступ около 10 %. Без текста, теней на полу и обводки. Только цвета `#FF2D1F`, `#0C8CF0`, `#A84CFC` и белый.

**Куда класть:** `public/assets/props/`, имя файла как в таблице. Подставлять ничего не нужно: ролик сам возьмёт файл, если он есть. Пока файла нет, на его месте стоит временная замена (последний столбец).

| ID и файл | Где в ролике | Промпт (после «Prop N01:») | Временная замена |
|---|---|---|---|
| **N01** `N01_headset.png` | сц. 1 «проводишь пару консультаций»; финал «на следующей консультации» | A chunky call-center headset with a microphone boom, glossy red (#FF2D1F) ear cups and white padded headband, three-quarter view. | P01 синее облачко |
| **N02** `N02_bell.png` | сц. 3 «просто сигнал» | A chunky notification bell, glossy violet (#A84CFC) body with a white clapper, slightly tilted as if ringing, two small white motion arcs on the sides. | P02 песочные часы |
| **N03** `N03_refresh.png` | сц. 3 «пора освежить» | A thick 3D circular "refresh" arrow (two curved arrows forming a circle), glossy electric blue (#0C8CF0), rounded inflated shape. | P10 иконка наставника |
| **N04** `N04_snail.png` | сц. 4 «долго и скучно» | A cute toy snail crawling slowly, white soft body with sleepy half-closed eyes, glossy violet (#A84CFC) spiral shell, side view facing right. | P02 песочные часы |
| **N05** `N05_check_badge.png` | финал «спокойно и без лишнего стресса» | A round 3D badge, glossy electric blue (#0C8CF0) with a thick white rounded check mark in the center, slightly tilted. | P10 иконка наставника |

Проверка та же, что для остальных предметов: прозрачный фон без ореола, нет текста, цвета только из палитры.
