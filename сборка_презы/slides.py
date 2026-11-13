# 20 слайдов по шаблону Юли. Скин задаётся темой в kit.TH и словарём BG.
from kit import *

BG = dict(cover='bg01.png', clean='bg05.png', right='bg01.png', left='bg02.png', glow='bg13.png')


def S(prs, bgkey='clean'):
    sl = blank(prs)
    bg(sl, BG[bgkey])
    logo(sl)
    return sl


def num(sl, x, y, w, big, cap, size=44, color=None, capw=None, capsize=13, gap=0.08, align='l'):
    txt(sl, x, y, w, size / 72 * 1.15, big, size=size, bold=True, font=TH['head'], color=color or TH['ink'],
        align=align)
    txt(sl, x, y + size / 72 * 1.15 + gap, capw or w, 0.6, cap, size=capsize, color=TH['sub'], align=align, ls=1.05)


# 1 ─ Обложка
def s01(prs):
    sl = blank(prs)
    bg(sl, BG['cover'])
    logo(sl)
    pic(sl, gen('hero_kristall_garnitura.png', 's01_b761f21e.png'), 7.05, 0.45, w=6.6, fit='contain')
    txt(sl, 0.75, 2.05, 6.4, 0.35, '«Хрустальная гарнитура» · XXII сезон 2026–2027', size=14, color=TH['red'],
        med=True)
    txt(sl, 0.72, 2.5, 7.6, 2.0, ['Системная работа', 'с талантами'], size=48, bold=True, font=TH['head'],
        ls=0.95)
    txt(sl, 0.75, 4.55, 5.8, 0.9, ['Лучшая практика сохранения талантов', 'и сокращения текучки персонала'],
        size=19, color=TH['sub'], ls=1.1)


# 2 ─ КЦ Альфа это
def s02(prs):
    sl = S(prs, 'clean')
    title(sl, 'Контактный центр Альфа — это')
    num(sl, 0.62, 1.75, 4.4, '>6 500', 'сотрудников по всей России', size=54, color=TH['red'])
    num(sl, 0.62, 3.45, 4.4, '>500', 'линейных руководителей', size=54)
    num(sl, 0.62, 5.15, 4.4, '3 года подряд', 'лучший большой контактный центр\nпо версии CCGuru Awards', size=40)
    pic(sl, 's02_1c2bc780.jpg', 5.35, 1.55, 7.4, 5.45, r=0.3, sh=True, border=('FFFFFF', 3))


# 3 ─ Ключевые цели: лестница на фундаменте
def s03(prs):
    sl = S(prs, 'right')
    title(sl, 'Наши ключевые цели')
    goals = [('ic_lupa.png', 'Не ошибиться\nна старте'), ('ic_raketa.png', 'Быстро вывести\nна продуктивность'),
             ('ic_serdce_ladoni.png', 'Сохранить\nперсонал'), ('ic_lestnica.png', 'Развивать\nталанты')]
    base = 5.72
    for i, (ic, t) in enumerate(goals):
        w = 2.82
        x = 0.62 + i * (w + 0.27)
        h = 1.75 + i * 0.5
        y = base - h
        card(sl, x, y, w, h, r=0.26)
        pic(sl, ic, x + w / 2 - 0.68, y - 0.92, 1.36, 1.36, fit='contain')
        txt(sl, x + 0.25, y + 0.6, w - 0.5, 1.0, t.split('\n'), size=18, bold=True, font=TH['head'], ls=1.0)
    s = rect(sl, 0.62, 5.95, 12.08, 0.95, fill=TH['red'], r=0.475)
    shadow(s, a=28, color=TH['red2'])
    txt(sl, 0.62, 5.95, 12.08, 0.95, [[('Талантоцентричность', {'bold': True}),
                                       (' — фундамент нашего подхода', {})]], size=22, color='FFFFFF',
        align='c', anchor='m', font=TH['head'])


# 4 ─ Цель 1
def s04(prs):
    sl = S(prs, 'clean')
    title(sl, 'Цель 1. Не ошибиться на старте')
    pts = ['Все инструменты связаны и ведут сотрудника от отклика до новой должности',
           'ML-модель ранжирует резюме и даёт рекомендации руководителю',
           'ИИ-ассистент подсказывает вопросы на собеседовании',
           'Чек-лист и личный кабинет руководителя на единой платформе']
    y = 1.6
    for p in pts:
        dot(sl, 0.64, y + 0.1, 0.12)
        txt(sl, 0.92, y, 4.5, 0.6, p, size=14, ls=1.05)
        y += 0.66
    card(sl, 0.6, 4.4, 4.95, 2.6)
    txt(sl, 0.85, 4.58, 4.5, 0.3, 'Воронка подбора', size=13, med=True, color=TH['sub'])
    txt(sl, 0.85, 4.85, 4.5, 0.75, [[('18% → ', {'color': TH['ink']}), ('27%', {'color': TH['red']})]], size=40,
        bold=True, font=TH['head'])
    txt(sl, 3.55, 4.62, 1.8, 0.3, '+9 п.п.', size=16, bold=True, color=TH['red'], align='r')
    line_chart(sl, 0.7, 5.6, 4.75, 1.35,
               ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя'],
               [('% принятых от приглашённых', [0.18, 0.2, 0.15, 0.15, 0.15, 0.19, 0.21, 0.27, 0.26, 0.26, 0.27])],
               labels='ends', fmt='0%', ymin=0.1, ymax=0.3)
    laptop(sl, 's04_448d0feb.png', 5.85, 1.35, 6.95)
    shot(sl, 's04_0b14834b.png', 10.55, 3.05, w=2.25, h=2.38, crop=(0.228, 0.045, 0.232, 0.041))
    shot(sl, 's04_1fb8f22a.png', 6.05, 5.62, w=4.95)
    shot(sl, 's04_b07ca50c.png', 11.15, 5.62, w=1.62, h=1.37, crop=(0.413, 0.397, 0.403, 0.327))


# 5 ─ Цель 2
def s05(prs):
    sl = S(prs, 'clean')
    title(sl, 'Цель 2. Быстро вывести на продуктивность')
    # левая колонка: базовое обучение
    card(sl, 0.6, 1.5, 6.0, 3.3)
    txt(sl, 0.85, 1.68, 5.5, 0.35, 'Трансформация базового обучения', size=17, bold=True, font=TH['head'])
    txt(sl, 3.05, 2.15, 1.5, 0.3, 'было', size=11, color=TH['mute'], med=True)
    txt(sl, 4.7, 2.15, 1.7, 0.3, 'стало', size=11, color=TH['red'], med=True)
    rows = [('Собеседование', '×', '—'), ('Трудоустройство', '4–5 день', '0 день'),
            ('Обучение', 'с тренером', 'в траектории')]
    y = 2.45
    for a, b, c in rows:
        txt(sl, 0.85, y, 2.2, 0.3, a, size=13)
        txt(sl, 3.05, y, 1.6, 0.3, b, size=13, color=TH['sub'])
        txt(sl, 4.7, y, 1.8, 0.3, c, size=13, bold=True)
        y += 0.36
    rect(sl, 0.85, 3.6, 5.5, 0.01, fill=TH['grid'])
    txt(sl, 0.85, 3.72, 2.6, 0.3, 'Доживаемость', size=12, color=TH['sub'], med=True)
    txt(sl, 0.85, 3.98, 2.9, 0.6, [[('52% → ', {}), ('67%', {'color': TH['red']})]], size=30, bold=True,
        font=TH['head'])
    txt(sl, 3.75, 3.72, 2.6, 0.3, 'Экономия', size=12, color=TH['sub'], med=True)
    txt(sl, 3.75, 3.98, 2.75, 0.6, '27 млн ₽', size=30, bold=True, font=TH['head'], color=TH['red'])
    shot(sl, 's05_246b3d86.png', 0.6, 5.0, 3.0, 2.0)
    txt(sl, 3.85, 5.25, 2.75, 1.4, [[('Ежедневный план адаптации', {'bold': True})],
                                     'помогает новичку быстрее пройти адаптацию'], size=13, ls=1.1, sp_after=3)
    # правая колонка: наставничество
    card(sl, 6.85, 1.5, 5.9, 2.55)
    txt(sl, 7.1, 1.68, 5.4, 0.35, 'Институт наставничества', size=17, bold=True, font=TH['head'])
    pts = ['Собственная программа развития наставников', 'Личный наставник на весь срок адаптации',
           'Мотивация наставников зависит от KPI стажёра', 'AI-ассистент наставника и отчётность']
    y = 2.2
    for p in pts:
        dot(sl, 7.12, y + 0.09, 0.1)
        txt(sl, 7.35, y, 5.2, 0.32, p, size=13)
        y += 0.43
    shot(sl, 's05_a9bc899e.png', 6.85, 4.25, 2.85, 2.75)
    shot(sl, 's05_d0b6b386.png', 9.9, 4.25, 2.85, 2.75, fit='cover', align_y=0.0)


# 6 ─ Цель 3: ELTV
def s06(prs):
    sl = S(prs, 'clean')
    title(sl, 'Цель 3. Сохранить персонал', kicker='Сервис рекомендаций для руководителя')
    txt(sl, 0.62, 1.48, 3.8, 0.3, 'Два ELTV-параметра сотрудника', size=12, med=True, color=TH['sub'])
    card(sl, 0.6, 1.85, 3.65, 1.95)
    txt(sl, 0.85, 2.02, 3.2, 0.35, 'Эффективность', size=17, bold=True, font=TH['head'])
    txt(sl, 0.85, 2.45, 3.2, 1.2, 'Сумма показателей сотрудника за месяц и их отношение к нормативным значениям',
        size=12.5, color=TH['sub'], ls=1.08)
    card(sl, 0.6, 3.95, 3.65, 2.1)
    txt(sl, 0.85, 4.12, 3.2, 0.35, 'Склонность к оттоку', size=17, bold=True, font=TH['head'])
    txt(sl, 0.85, 4.52, 3.2, 0.6, 'Данные предиктивной аналитики', size=12.5, color=TH['sub'])
    txt(sl, 0.85, 4.85, 3.2, 0.7, [[('>2 000', {'color': TH['red']}), (' переменных', {'size': 14, 'bold': False,
                                                                                        'color': TH['ink']})]],
        size=30, bold=True, font=TH['head'])
    # матрица приоритетов
    mx, my, cw, chh, g = 4.85, 1.85, 2.0, 2.0, 0.1
    txt(sl, mx, 1.48, 4.2, 0.3, 'Приоритеты работы', size=12, med=True, color=TH['sub'])
    cells = [
        (0, 0, None, 'эффективные\nи не склонные к оттоку', '×2', 'рост числа'),
        (1, 0, 'Удерживаем', 'эффективные\nи склонные к оттоку', None, None),
        (0, 1, 'Развиваем', 'неэффективные\nи не склонные к оттоку', None, None),
        (1, 1, None, 'неэффективные\nи склонные к оттоку', None, None),
    ]
    for cx, cy, head, desc, big, bigcap in cells:
        x = mx + cx * (cw + g)
        y = my + cy * (chh + g)
        hot = head == 'Удерживаем'
        card(sl, x, y, cw, chh, tint=TH['tint_red'] if hot else None, a=70 if hot else None, r=0.2)
        yy = y + 0.2
        if head:
            txt(sl, x + 0.2, yy, cw - 0.3, 0.35, head, size=17, bold=True, font=TH['head'],
                color=TH['red'] if hot else TH['ink'])
            yy += 0.42
        if big:
            txt(sl, x + 0.2, yy - 0.08, 0.8, 0.6, big, size=30, bold=True, font=TH['head'], color=TH['red'])
            txt(sl, x + 0.95, yy + 0.08, cw - 1.05, 0.4, bigcap, size=11.5, color=TH['red'], med=True)
            yy += 0.62
        txt(sl, x + 0.2, yy, cw - 0.3, 0.9, desc.split('\n'), size=12, color=TH['sub'], ls=1.05)
    # подписи осей
    txt(sl, mx, my + 2 * chh + g + 0.08, 2 * cw + g, 0.3, 'склонность к оттоку  →', size=10.5, color=TH['mute'],
        align='r')
    tb = txt(sl, mx - 1.2, my + chh - 0.15, 2.0, 0.3, 'эффективность  →', size=10.5, color=TH['mute'], align='c')
    tb.rotation = -90
    # экран и робот
    shot(sl, 's06_116b40b0.png', 9.15, 1.85, 3.6, 2.66)
    pic(sl, gen('ai_robot_kniga.png', 's06_6c48e2d5.png'), 11.7, 3.75, w=1.25, fit='contain')
    num(sl, 9.2, 4.85, 3.5, '>800', 'сохранённых сотрудников в год', size=34, capsize=12)
    num(sl, 9.2, 5.95, 3.6, '>80 млн ₽', 'экономия на подборе и обучении в год', size=34, capsize=12,
        color=TH['red'])


# 7 ─ Цель 4: карьера
def s07(prs):
    sl = S(prs, 'clean')
    title(sl, 'Цель 4. Карьерное развитие', kicker='Процесс непрерывного развития')
    st = gen('karera_stupeni.png', None)
    if st:
        card(sl, 0.6, 1.65, 4.95, 3.85)
        pic(sl, st, 0.75, 1.95, 4.65, 3.4, fit='contain')
        txt(sl, 0.85, 1.82, 4.4, 0.3, 'Прозрачные маршруты для каждого', size=13, bold=True)
        for (lx, ly, a1, a2) in [(0.85, 4.6, 'Шаг 1', 'Наставник'), (2.35, 3.75, 'Шаг 2', 'Кадровый актив'),
                                 (3.85, 2.9, 'Шаг 3', 'Руководитель')]:
            txt(sl, lx, ly, 1.6, 0.5, [[(a1, {'bold': True, 'color': TH['red']})], a2], size=11, ls=1.0)
    else:
        pic(sl, 's07_b2609dd7.png', 0.6, 1.65, 4.95, 3.85, crop=(0.0, 0.254, 0.486, 0.0), r=0.25, sh=True,
            border=('FFFFFF', 3))
    stats = [('7 дней', 'срок закрытия\nвакансий'), ('×2', 'короче срок\nадаптации'),
             ('99%', 'выросли из\nсотрудников КЦ')]
    for i, (n, c) in enumerate(stats):
        x = 0.6 + i * 1.69
        pic(sl, 's07_635efb54.png', x + 0.27, 5.68, 1.1, 1.1, fit='contain')
        txt(sl, x - 0.1, 5.68, 1.84, 1.1, n, size=19 if i == 0 else 24, bold=True, font=TH['head'], align='c',
            anchor='m', color=TH['red'] if i == 0 else TH['ink'])
        txt(sl, x - 0.1, 6.82, 1.84, 0.5, c.split('\n'), size=10, color=TH['sub'], align='c', ls=0.95)
    h = laptop(sl, 's07_feb93134.png', 5.95, 1.45, 6.85)
    shot(sl, 's07_fd835351.png', 9.05, 4.95, w=3.7, h=2.05, align_y=0.0)


# 8 ─ Влияние на бизнес
def s08(prs):
    sl = S(prs, 'clean')
    title(sl, 'Влияние на бизнес')
    # A: отток новичков
    card(sl, 0.6, 1.5, 4.15, 2.7)
    txt(sl, 0.82, 1.65, 3.8, 0.3, 'Отток новичков на базовом обучении', size=12.5, med=True, color=TH['sub'])
    txt(sl, 0.82, 1.95, 3.8, 0.6, [[('44% → ', {}), ('17%', {'color': TH['red']})]], size=27, bold=True,
        font=TH['head'])
    chip(sl, 3.5, 2.03, 1.08, 0.36, '−27 п.п.', size=11.5)
    line_chart(sl, 0.7, 2.6, 3.95, 1.5, ['4Q25', '1Q26', '2Q26', '3Q26', '4Q26'],
               [('отсев', [0.44, 0.41, 0.33, 0.25, 0.17])], labels='all', ymin=0.0, ymax=0.55)
    # B: экзамен
    card(sl, 0.6, 4.35, 4.15, 2.65)
    txt(sl, 0.82, 4.5, 3.8, 0.3, 'Сдали экзамен, % от трудоустроенных', size=12.5, med=True, color=TH['sub'])
    txt(sl, 0.82, 4.8, 3.8, 0.6, [[('92% → ', {}), ('97%', {'color': TH['red']})]], size=27, bold=True,
        font=TH['head'])
    chip(sl, 3.5, 4.88, 1.08, 0.36, '+5 п.п.', size=11.5)
    line_chart(sl, 0.7, 5.42, 3.95, 1.5, ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт'],
               [('сдали', [0.92, 0.92, 0.91, 0.93, 0.90, 0.95, 0.93, 0.93, 0.94, 0.97])], labels='ends', ymin=0.8,
               ymax=1.0, target=0.85)
    txt(sl, 0.82, 6.3, 1.5, 0.25, 'таргет 85%', size=9.5, color=TH['mute'])
    # C: КЗШР
    card(sl, 4.95, 1.5, 7.8, 2.05)
    txt(sl, 5.17, 1.65, 3.0, 0.3, 'КЗШР', size=12.5, med=True, color=TH['sub'])
    txt(sl, 5.17, 1.92, 3.0, 0.9, ['всегда', 'на высоком уровне'], size=17, bold=True, font=TH['head'], ls=1.0)
    yrs = [('2023', '90,5%'), ('2024', '92,7%'), ('2025', '92,2%'), ('2026', '93,3%')]
    for i, (yv, v) in enumerate(yrs):
        x = 8.05 + i * 1.17
        txt(sl, x, 1.68, 1.1, 0.3, yv, size=11, color=TH['mute'])
        txt(sl, x, 1.92, 1.15, 0.45, v, size=20, bold=True, font=TH['head'],
            color=TH['red'] if i == 3 else TH['ink'])
    kz = [0.925, 0.919, 0.942, 0.921, 0.925, 0.921, 0.910, 0.930, 0.916, 0.913, 0.932, 0.936, 0.938, 0.945, 0.935,
          0.908, 0.907, 0.896, 0.929, 0.945, 0.946, 0.953, 0.940]
    line_chart(sl, 5.05, 2.65, 7.6, 0.85, ['']*23, [('кзшр', kz)], labels=None, ymin=0.86, ymax=0.97,
               cat_labels=False, lw=2)
    # D: текучесть
    card(sl, 4.95, 3.7, 7.8, 1.55)
    txt(sl, 5.17, 3.85, 3.0, 0.3, 'Текучесть персонала', size=12.5, med=True, color=TH['sub'])
    txt(sl, 5.17, 4.12, 3.0, 0.6, [[('4,9% → ', {}), ('4,2%', {'color': TH['red']})]], size=28, bold=True,
        font=TH['head'])
    txt(sl, 5.17, 4.7, 3.0, 0.3, '2024 → 2025', size=11, color=TH['mute'])
    tk = [0.0406, 0.0455, 0.0462, 0.0517, 0.0342, 0.0483, 0.0603, 0.0443, 0.0396, 0.0340, 0.0421, 0.0373, 0.0315,
          0.0345, 0.0396, 0.041, 0.0418, 0.0464, 0.0403, 0.0289, 0.0357, 0.0361, 0.0172]
    line_chart(sl, 8.0, 3.8, 4.65, 1.35, ['янв.25'] + [''] * 11 + ['янв.26'] + [''] * 9 + ['ноя.26'],
               [('текучесть', tk)], labels=None, ymin=0.0, ymax=0.07, lw=2, colors=['9A8FC4'])
    # E: экономия
    card(sl, 4.95, 5.4, 7.8, 1.6, tint=TH['tint_red'], a=62)
    txt(sl, 5.17, 5.55, 3.0, 0.3, 'Экономия', size=12.5, med=True, color=TH['sub'])
    num(sl, 5.17, 5.85, 3.6, '29 млн ₽', 'hard-эффект', size=32, capsize=12, color=TH['red'], gap=0.02)
    num(sl, 8.9, 5.85, 3.8, '160 млн ₽', 'soft-эффект', size=32, capsize=12, color=TH['red'], gap=0.02)


# 9 ─ Операционная эффективность
def s09(prs):
    sl = S(prs, 'clean')
    title(sl, 'Операционная эффективность')
    m = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя']
    card(sl, 0.6, 1.5, 7.25, 1.8)
    txt(sl, 0.82, 1.63, 3.5, 0.3, 'Service level, total', size=12.5, med=True, color=TH['sub'])
    txt(sl, 5.6, 1.63, 2.05, 0.3, 'таргет 80%', size=11, color=TH['mute'], align='r')
    line_chart(sl, 0.7, 1.88, 7.05, 1.38, m, [('SL', [0.8, 0.87, 0.86, 0.83, 0.82, 0.82, 0.8, 0.81, 0.83, 0.86,
                                                      0.86])],
               labels='all', ymin=0.7, ymax=0.92, target=0.8, label_size=9.5)
    card(sl, 0.6, 3.45, 7.25, 2.0)
    txt(sl, 0.82, 3.58, 3.0, 0.3, 'АНТ в голосе и чате, сек', size=12.5, med=True, color=TH['sub'])
    chip(sl, 3.55, 3.55, 1.95, 0.36, '−14 сек · стаж 0–3', size=11)
    chip(sl, 5.62, 3.55, 2.05, 0.36, '−48 сек · total', fill='9A8FC4', size=11)
    line_chart(sl, 0.7, 3.95, 7.05, 1.3, m,
               [('стаж 0–3', [336, 320, 332, 331, 349, 321, 324, 314, 300, 318, 322]),
                ('total', [315, 287, 292, 282, 283, 275, 268, 258, 267, 268, 267])],
               labels='last', fmt='0', ymin=230, ymax=370, label_size=9.5, colors=[TH['red'], '9A8FC4'])
    card(sl, 0.6, 5.6, 7.25, 1.4)
    txt(sl, 0.82, 5.73, 4.5, 0.3, 'Сохранение страховых продуктов', size=12.5, med=True, color=TH['sub'])
    q = [('1Q26', 0.371, '37,1%', ''), ('2Q26', 0.392, '39,2%', '+2,1 п.п.'), ('3Q26', 0.400, '40,0%', '+2,9 п.п.')]
    for i, (k, v, s, d) in enumerate(q):
        x = 0.82 + i * 2.33
        txt(sl, x, 6.08, 0.6, 0.3, k, size=11, color=TH['mute'])
        txt(sl, x + 0.55, 6.0, 1.2, 0.4, s, size=19, bold=True, font=TH['head'],
            color=TH['red'] if i == 2 else TH['ink'])
        if d:
            txt(sl, x + 0.55, 6.42, 1.5, 0.3, d, size=11, bold=True, color=TH['red'])
        bw = 2.05 * v / 0.45
        rect(sl, x, 6.72, 2.05, 0.08, fill=TH['grid'], r=0.04)
        rect(sl, x, 6.72, bw, 0.08, fill=TH['red'] if i == 2 else '9A8FC4', r=0.04)
    # справа: новички
    card(sl, 8.05, 1.5, 4.7, 2.4)
    txt(sl, 8.27, 1.63, 4.2, 0.3, 'Показатели новичков', size=12.5, med=True, color=TH['sub'])
    for i, (k, v) in enumerate([('АНТ', '−16 сек'), ('FCR', '+4%'), ('VOC', '+0,1 п.п.')]):
        x = 8.27 + i * 1.5
        txt(sl, x, 1.95, 1.45, 0.3, k, size=11, color=TH['mute'])
        txt(sl, x, 2.2, 1.5, 0.45, v, size=19, bold=True, font=TH['head'], color=TH['red'])
    rect(sl, 8.27, 2.8, 4.25, 0.01, fill=TH['grid'])
    txt(sl, 8.27, 2.95, 2.0, 0.3, 'Доживаемость', size=11, color=TH['mute'])
    txt(sl, 8.27, 3.18, 3.0, 0.5, [[('52% → ', {}), ('67%', {'color': TH['red']})]], size=22, bold=True,
        font=TH['head'])
    txt(sl, 10.9, 3.22, 1.65, 0.4, '+15 п.п.', size=16, bold=True, color=TH['red'], align='r')
    # справа: антитоп
    card(sl, 8.05, 4.05, 4.7, 2.95)
    txt(sl, 8.27, 4.18, 4.3, 0.3, 'Работа с антитопом', size=12.5, med=True, color=TH['sub'])
    txt(sl, 8.27, 4.45, 4.3, 0.3, 'AI-тренажёры и интенсивы', size=14, bold=True, font=TH['head'])
    txt(sl, 9.6, 4.85, 1.0, 0.25, 'контроль', size=9.5, color=TH['mute'], align='r')
    txt(sl, 10.6, 4.85, 0.85, 0.25, 'тест', size=9.5, color=TH['mute'], align='r')
    rows = [('АНТ, сек', '850', '805', '−45'), ('FCR, %', '82,24', '82,89', '+0,65'), ('VOC', '4,36', '4,55', '+0,2')]
    y = 5.12
    for a, b, c, d in rows:
        txt(sl, 8.27, y, 1.3, 0.3, a, size=12)
        txt(sl, 9.6, y, 1.0, 0.3, b, size=12, color=TH['sub'], align='r')
        txt(sl, 10.6, y, 0.85, 0.3, c, size=12, bold=True, align='r')
        txt(sl, 11.5, y - 0.04, 1.05, 0.35, d, size=15, bold=True, color=TH['red'], align='r', font=TH['head'])
        y += 0.4
    rect(sl, 8.27, 6.33, 4.25, 0.01, fill=TH['grid'])
    txt(sl, 8.27, 6.48, 2.6, 0.3, 'Некорректные обращения', size=12)
    txt(sl, 10.6, 6.43, 1.95, 0.4, '−1 440', size=17, bold=True, color=TH['red'], align='r', font=TH['head'])


# 10 ─ CX
def s10(prs):
    sl = S(prs, 'clean')
    title(sl, 'CX: персональный подход к клиенту')
    shot(sl, 's10_81d15687.png', 0.6, 1.5, w=6.15, h=2.7, fit='cover', align_y=0.5)
    card(sl, 0.6, 4.4, 6.15, 2.6)
    txt(sl, 0.82, 4.55, 3.0, 0.3, 'Проект благодарности', size=12.5, med=True, color=TH['sub'])
    txt(sl, 0.82, 4.8, 2.4, 0.7, '3 112', size=40, bold=True, font=TH['head'], color=TH['red'])
    txt(sl, 0.82, 5.45, 2.4, 0.6, ['благодарностей клиентов', 'за 2 года, с сентября 2024'], size=11.5,
        color=TH['sub'], ls=1.05)
    txt(sl, 0.82, 6.08, 3.2, 0.85, 'Лучшие благодарности квартала уходят в «Благодарность CEO»: '
                                    'Владимир Верхошинский пишет сотрудникам именные письма', size=10.5,
        color=TH['ink'], ls=1.05)
    shot(sl, 's10_f6b4bc75.png', 4.1, 4.6, w=1.55, h=2.2, align_y=0.0)
    pic(sl, 's10_d6163f3d.png', 5.75, 4.6, 0.85, 0.85, crop=(0.095, 0.0, 0.124, 0.0), r=0.14, sh=True)
    card(sl, 6.95, 1.5, 5.8, 1.7)
    txt(sl, 7.17, 1.63, 3.0, 0.3, 'Новые операции', size=12.5, med=True, color=TH['sub'])
    txt(sl, 7.17, 1.92, 1.5, 0.8, '+30', size=44, bold=True, font=TH['head'], color=TH['red'])
    txt(sl, 8.75, 1.95, 3.85, 1.2, ['новых функций для оператора, в том числе активные операции:',
                                     'больше вопросов закрываем сразу в КЦ, клиенту не нужно идти в отделение'],
        size=11.5, ls=1.05, sp_after=3)
    card(sl, 6.95, 3.35, 5.8, 3.65)
    txt(sl, 7.17, 3.48, 5.0, 0.3, 'Пилот: удержание коробочного страхования', size=12.5, med=True,
        color=TH['sub'])
    txt(sl, 7.17, 3.76, 2.8, 0.8, '+129%', size=44, bold=True, font=TH['head'], color=TH['red'])
    txt(sl, 7.17, 4.5, 2.3, 0.6, ['сохранение:', 'с 24% до 55%'], size=12, color=TH['sub'], ls=1.05)
    txt(sl, 9.6, 3.82, 3.0, 1.3, 'Удерживаем клиентов в период охлаждения и сравниваем текущего вендора '
                                 'с процессом внутри банка', size=11, ls=1.08, color=TH['ink'])
    bar_chart(sl, 7.05, 5.1, 5.6, 1.85, ['апр', 'май', 'июн', 'июл', 'авг', 'сен'],
              [0.24, 0.24, 0.27, 0.30, 0.40, 0.55], hi=[5], ymax=0.66, color='DCD3F5')


# 11 ─ Растим таланты
def s11(prs):
    sl = S(prs, 'clean')
    title(sl, 'Растим таланты', w=6)
    pic(sl, 'ic_medal.png', 6.55, 0.42, 0.78, 0.78, fit='contain')
    txt(sl, 7.35, 0.5, 4.4, 0.7, [[('Alfa Award · 1 место', {'bold': True, 'color': TH['red']})],
                                  'в номинации «Горячее сердце», ALFA KIDS'], size=12.5, ls=1.05)
    card(sl, 0.6, 1.5, 7.15, 5.5)
    pic(sl, 's11_263a79ce.png', 0.85, 1.72, 1.15, 0.88, r=0.12)
    txt(sl, 2.2, 1.72, 3.6, 0.35, 'Дети помогают детям', size=18, bold=True, font=TH['head'])
    txt(sl, 2.2, 2.1, 2.6, 0.9, 'Дети сотрудников Альфы поддерживают клиентов в детском чате', size=12,
        color=TH['sub'], ls=1.05)
    num(sl, 0.85, 3.05, 2.2, '90', 'операторов\n14–17 лет', size=34, capsize=11.5, color=TH['red'])
    num(sl, 2.85, 3.05, 2.4, '>70%', 'обращений клиентов\n6–17 лет закрывают они', size=34, capsize=11.5)
    rect(sl, 0.85, 4.65, 4.3, 0.01, fill=TH['grid'])
    txt(sl, 0.85, 4.78, 4.3, 0.3, 'Понимают клиентов лучше взрослых', size=12, med=True, color=TH['sub'])
    for i, (k, a, c) in enumerate([('FCR', '89%', '91%'), ('АНТ', '177 сек', '132 сек')]):
        x = 0.85 + i * 2.2
        txt(sl, x, 5.15, 2.0, 0.3, k, size=11, color=TH['mute'])
        txt(sl, x, 5.42, 2.2, 0.5, [[(c, {'color': TH['red']})]], size=24, bold=True, font=TH['head'])
        txt(sl, x, 5.9, 2.2, 0.3, 'дети · у взрослых ' + a, size=10.5, color=TH['sub'])
    phone(sl, 's11_86d62daa.jpg', 4.75, 2.75, 3.6, align_y=0.0)
    phone(sl, 's11_93ca2bdb.jpg', 5.55, 3.2, 3.6, align_y=0.0)
    card(sl, 7.95, 1.5, 4.8, 5.5)
    txt(sl, 8.2, 1.72, 4.3, 0.35, 'Детский лагерь «Альфёнок»', size=18, bold=True, font=TH['head'])
    txt(sl, 8.2, 2.1, 4.3, 0.3, 'для детей сотрудников ДКЦ до 14 лет', size=12, color=TH['sub'])
    for i, (n, c) in enumerate([('3', 'недели'), ('8', 'игр'), ('7', 'мастер-\nклассов')]):
        x = 8.2 + i * 1.45
        txt(sl, x, 2.5, 1.3, 0.7, n, size=36, bold=True, font=TH['head'], color=TH['red'] if i == 0 else TH['ink'])
        txt(sl, x, 3.15, 1.4, 0.5, c.split('\n'), size=11.5, color=TH['sub'], ls=1.0)
    chip(sl, 8.2, 3.75, 2.55, 0.38, 'свой бизнес-проект', size=11.5)
    shot(sl, 's11_ca6d92d5.png', 8.2, 4.4, w=4.3, h=2.2, align_y=0.0)
    txt(sl, 8.2, 6.65, 4.3, 0.3, 'Запустили электронные дневники', size=11, color=TH['sub'])


# 12 ─ Инструменты оператора
def s12(prs):
    sl = S(prs, 'clean')
    title(sl, 'Инструменты для оператора')
    txt(sl, 0.62, 1.75, 6.2, 0.4, 'Экономия за 2 года работы Альфа-Помощника (АПО)', size=14, color=TH['sub'],
        med=True)
    txt(sl, 0.6, 2.15, 6.6, 1.1, '178 973 952 ₽', size=54, bold=True, font=TH['head'], color=TH['red'])
    card(sl, 0.6, 3.75, 2.95, 1.8)
    num(sl, 0.85, 3.95, 2.6, '−92 сек', 'время диалога\nэффект АПО', size=34, capsize=12)
    card(sl, 3.75, 3.75, 2.95, 1.8)
    num(sl, 4.0, 3.95, 2.6, '−65 сек', 'среднее время\nэффект Радаров', size=34, capsize=12)
    shot(sl, 's12_e80b63ab.png', 7.15, 1.5, w=2.55, h=5.5, crop=(0.609, 0.004, 0.0, 0.027), align_y=0.0)
    shot(sl, 's12_eb82ae27.png', 9.9, 1.5, w=2.85, h=5.5, align_y=0.0)


# 13 ─ AI-ментор
def s13(prs):
    sl = S(prs, 'clean')
    title(sl, 'AI-ментор как часть экосистемы', kicker='Цикл персонального обучения')
    xs = [0.6, 3.75, 6.9, 10.05]
    w = 2.7
    y, h = 1.75, 3.25
    data = [
        (gen('ai_sotrudnik.png', 's13_f2f14bea.png'), 'Сотрудник', ['каждый контакт даёт', 'материал для роста']),
        (None, 'QMS', ['анализирует все диалоги', 'передаёт данные', 'в AI-ментор']),
        (gen('ai_mentor_yadro.png', 's13_f7bee128.png'), 'AI-ментор', ['триггерное событие', 'модель формирует', 'рекомендации',
                                           'генерация контента']),
        (None, 'Персональный\nконтент', ['цифровой аватар', 'AI-тренажёры', 'подкасты, ролики, курсы',
                                        'статьи ABook']),
    ]
    for i, (im, t, pts) in enumerate(data):
        x = xs[i]
        hot = i == 2
        card(sl, x, y, w, h, tint=TH['tint_red'] if hot else None, a=66 if hot else None)
        if im:
            pic(sl, im, x + 0.2, y + 0.18, w - 0.4, 1.15, fit='contain')
            ty = y + 1.42
        else:
            ty = y + 0.3
        txt(sl, x + 0.22, ty, w - 0.4, 0.4, t.split('\n'), size=17, bold=True, font=TH['head'],
            color=TH['red'] if hot else TH['ink'], ls=1.0)
        yy = ty + 0.42 + 0.3 * t.count('\n')
        for p in pts:
            txt(sl, x + 0.22, yy, w - 0.4, 0.3, p, size=11.5, color=TH['sub'])
            yy += 0.27
        if i < 3:
            arrow(sl, x + w + 0.05, y + h / 2, xs[i + 1] - 0.05, y + h / 2)
    # обратная связь
    yb = y + h + 0.22
    c = sl.shapes.add_connector(MSO_CONNECTOR.ELBOW, I(xs[3] + w / 2), I(y + h), I(xs[0] + w / 2), I(y + h))
    for xx in (xs[3] + w / 2, xs[0] + w / 2):
        pass
    sl.shapes._spTree.remove(c._element)
    rect(sl, xs[0] + w / 2, y + h, 0.02, 0.28, fill=TH['red'])
    rect(sl, xs[3] + w / 2, y + h, 0.02, 0.28, fill=TH['red'])
    rect(sl, xs[0] + w / 2, y + h + 0.27, xs[3] - xs[0] + 0.02, 0.02, fill=TH['red'])
    tri = sl.shapes.add_shape(MSO_SHAPE.ISOSCELES_TRIANGLE, I(xs[0] + w / 2 - 0.08), I(y + h + 0.0), I(0.18),
                              I(0.14))
    set_fill(tri, TH['red'])
    set_line(tri, None)
    chip(sl, 4.45, y + h + 0.12, 4.4, 0.34, 'контент возвращается сотруднику', size=11, fill='FFFFFF',
         color=TH['red'], a=95)
    # AI-наставник
    card(sl, 0.6, 5.6, 12.15, 1.4)
    pic(sl, gen('ai_nastavnik_robot.png', 's13_3b6932e1.png'), 0.75, 5.62, h=1.36, w=1.0, fit='contain')
    txt(sl, 1.85, 5.8, 3.0, 0.4, [[('AI-наставник', {}), ('  24/7', {'color': TH['red']})]], size=18, bold=True,
        font=TH['head'])
    txt(sl, 1.85, 6.22, 3.0, 0.4, 'рядом на всём пути сотрудника', size=12, color=TH['sub'])
    for i, t in enumerate(['объясняет в моменте', 'отвечает на вопросы', 'проактивно выходит сам']):
        x = 5.25 + i * 2.5
        chip(sl, x, 6.0, 2.35, 0.42, t, fill='FFFFFF', color=TH['ink'], size=12, a=90, bold=False)


# 14 ─ Мастера игры
def s14(prs):
    sl = S(prs, 'right')
    title(sl, ['Мастера игры: вопрос клиента', 'решаем за один контакт'], kicker='Геймификация КЦ', size=28)
    num(sl, 0.62, 2.55, 3.3, '1 511', 'решённых кейсов', size=50, color=TH['red'])
    num(sl, 0.62, 4.05, 3.3, '290', 'участников чемпионата', size=50)
    shot(sl, 's14_29a3c409.png', 0.6, 5.45, w=3.1, h=1.55, align_y=0.0)
    laptop(sl, 's14_2855a8ba.png', 3.95, 1.75, 6.0)
    phone(sl, 's14_744a16ae.jpg', 10.05, 1.6, 4.4, align_y=0.0)
    shot(sl, 's14_8883cc1a.png', 6.3, 5.55, w=3.3, h=1.45, align_y=0.0)


# 15 ─ eNPS, VOE, RHI
def s15(prs):
    sl = S(prs, 'clean')
    title(sl, 'Слышим каждого: eNPS, VOE и индекс честности', size=28)
    card(sl, 0.6, 1.5, 5.45, 1.95)
    txt(sl, 0.82, 1.63, 3, 0.3, 'eNPS', size=12.5, med=True, color=TH['sub'])
    for i, (yv, v) in enumerate([('2024', '72,3%'), ('2025', '77%'), ('2026', '77,8%')]):
        x = 0.82 + i * 1.42
        txt(sl, x, 1.95, 1.4, 0.5, v, size=24, bold=True, font=TH['head'], color=TH['red'] if i == 2 else TH['ink'])
        txt(sl, x, 2.45, 1.4, 0.3, yv, size=11, color=TH['mute'])
    chip(sl, 0.82, 2.85, 1.25, 0.36, '+5,5 п.п.', size=12)
    card(sl, 6.25, 1.5, 6.5, 2.75)
    txt(sl, 6.47, 1.63, 4, 0.3, 'VOE · опыт сотрудника по точкам контакта', size=12.5, med=True, color=TH['sub'])
    txt(sl, 10.6, 1.63, 2.0, 0.3, 'таргет 4,88', size=11, color=TH['mute'], align='r')
    pts = [('4,84', 'приём'), ('4,99', 'обучение'), ('4,89', 'адаптация'), ('4,94', 'ЛК APeople'),
           ('4,88', 'база знаний'), ('4,89', 'SFA-Call')]
    for i, (v, k) in enumerate(pts):
        x = 6.47 + i * 1.03
        txt(sl, x, 1.95, 1.0, 0.45, v, size=19, bold=True, font=TH['head'], color=TH['red'] if v == '4,99' else
            TH['ink'])
        txt(sl, x, 2.38, 1.02, 0.3, k, size=9.5, color=TH['sub'])
    pic(sl, 's15_0d53bdf1.png', 6.42, 2.8, 6.2, 1.17, fit='contain')
    txt(sl, 6.47, 3.93, 6, 0.25, 'общий уровень удовлетворённости операторов', size=9.5, color=TH['mute'])
    card(sl, 0.6, 3.6, 5.45, 3.4)
    txt(sl, 0.82, 3.73, 3, 0.3, 'Ачивки и Alfa-коины', size=12.5, med=True, color=TH['sub'])
    txt(sl, 0.82, 4.0, 2.4, 0.7, [[('>150', {'color': TH['red']}), (' ачивок', {'size': 14, 'bold': False})]],
        size=34, bold=True, font=TH['head'])
    pic(sl, 's15_fe89d88d.png', 3.05, 4.0, 2.85, 1.0, fit='contain', r=0.08)
    pic(sl, 's15_e3489b02.png', 0.82, 5.0, 0.42, 0.42, fit='contain')
    txt(sl, 1.32, 5.03, 2.5, 0.35, 'Коины — внутренняя валюта', size=13, bold=True)
    for i, t in enumerate(['за сверхрезультат в обучении', 'за активность в ТГ-каналах', 'за конкурсы и мероприятия']):
        txt(sl, 1.32, 5.42 + i * 0.3, 2.6, 0.3, t, size=11, color=TH['sub'])
    txt(sl, 1.32, 6.38, 2.6, 0.3, 'меняются на мерч →', size=11, bold=True, color=TH['red'])
    pic(sl, 's15_ae79a94c.png', 3.95, 5.0, 1.9, 1.85, r=0.14, sh=True)
    card(sl, 6.25, 4.4, 6.5, 2.6, tint=TH['tint_lav'], a=62)
    txt(sl, 6.47, 4.53, 3.2, 0.3, 'Индекс честности (RHI)', size=12.5, med=True, color=TH['sub'])
    txt(sl, 6.47, 4.82, 3.1, 0.7, 'Первыми в банке начали замерять честность ответов', size=13, bold=True, ls=1.05)
    txt(sl, 6.47, 5.48, 3.1, 0.55, 'RHI = (1 − идеальные анкеты / все анкеты) × 100%', size=10, color=TH['sub'],
        ls=1.05)
    num(sl, 6.47, 6.05, 1.5, '50,5%', 'факт', size=22, capsize=10.5, gap=0.0)
    num(sl, 8.05, 6.05, 1.6, '>70%', 'цель 2027', size=22, capsize=10.5, color=TH['red'], gap=0.0)
    pic(sl, 's15_14004967.png', 9.75, 4.6, 2.8, 1.12, crop=(0.044, 0.178, 0.031, 0.073), r=0.08)
    pic(sl, 's15_8c434017.png', 9.75, 5.78, 2.8, 1.12, fit='contain', r=0.08)


# 16 ─ Комьюнити
def s16(prs):
    sl = S(prs, 'clean')
    title(sl, 'Платформа геймификации и комьюнити')
    laptop(sl, 's16_fba72120.png', 0.45, 1.55, 6.6, crop=(0.0, 0.0, 0.265, 0.0))
    txt(sl, 0.6, 6.12, 6.2, 0.35, 'Собственная платформа геймификации', size=15, bold=True, font=TH['head'],
        align='c')
    num(sl, 7.35, 1.5, 3.3, '>1 млн', 'просмотров в год', size=36, color=TH['red'], capsize=12)
    num(sl, 10.15, 1.5, 2.7, '>18 000', 'просмотров постов\nкоманды обучения', size=28, capsize=11, gap=0.12)
    phones = [('s16_5b27c59f.jpg', 'Канал бизнес-линии'), ('s16_a03b2323.jpg', 'Канал ДКЦ'),
              ('s16_f841ca60.jpg', 'Детский канал')]
    for i, (p, c) in enumerate(phones):
        x = 7.2 + i * 1.88
        phone(sl, p, x, 2.85, 3.5, align_y=0.0)
        txt(sl, x, 6.38, 2.33, 0.3, c, size=11.5, med=True, align='c')
    chip(sl, 7.4, 2.6, 1.55, 0.34, 'ER 22,36%', size=11)


# 17 ─ Мероприятия
def s17(prs):
    sl = S(prs, 'clean')
    title(sl, 'Мероприятия')
    h, g = 1.66, 0.12
    W = h * 2.06
    X0, Y0 = 0.6, 1.5
    rows = [
        [('s17_e8168c44.png', 'W'), ('s17_3b3d706e.png', 'S'), ('s17_8eecf8ca.png', 'S'), ('s17_57f12a92.png', 'W'),
         ('s17_bde11bb3.png', 'S')],
        [('s17_661f606f.png', 'S'), ('s17_1a67bf9c.png', 'W'), ('s17_b68d2267.png', 'S'), ('s17_a7583424.png', 'S'),
         ('s17_c51dccf8.png', 'W')],
        [('s17_29ecbc7f.png', 'S'), ('s17_3f4dd70e.png', 'W'), ('s17_a1eaf7ca.png', 'S'), ('STAT', 'X')],
    ]
    for ri, row in enumerate(rows):
        x = X0
        y = Y0 + ri * (h + g)
        for p, k in row:
            if k == 'X':
                ww = 12.75 - x
                card(sl, x, y, ww, h, tint=TH['tint_red'], a=66)
                txt(sl, x + 0.3, y + 0.22, ww - 0.5, 0.8, '11', size=48, bold=True, font=TH['head'],
                    color=TH['red'])
                txt(sl, x + 1.35, y + 0.5, ww - 1.5, 0.8, 'демо-дней', size=16, bold=True)
                continue
            ww = W if k == 'W' else h
            pic(sl, p, x, y, ww, h, r=0.14, sh=True, sha=14)
            x += ww + g


# 18 ─ AI-тренажёры
def s18(prs):
    sl = S(prs, 'clean')
    title(sl, 'AI-тренажёры и AI-экзаменаторы')
    pic(sl, 'ic_pesochnye.png', 0.5, 1.75, 1.5, 1.5, fit='contain')
    txt(sl, 0.6, 3.3, 4.2, 1.0, '10 000', size=60, bold=True, font=TH['head'], color=TH['red'])
    txt(sl, 0.62, 4.32, 3.9, 0.7, ['часов экономии', 'на приёме экзамена'], size=17, bold=True, ls=1.05)
    rh = gen('ai_ruka_robota.png', None)
    if rh:
        pic(sl, rh, 0.3, 5.0, 4.3, 2.4, fit='contain')
    else:
        pic(sl, 's18_50d18c2c.png', -0.2, 5.05, 5.0, 2.5, crop=(0.0, 0.22, 0.0, 0.0), fit='cover', align_y=0.3)
    shot(sl, 's18_9c6af066.png', 4.85, 1.5, 3.85, 2.7)
    shot(sl, 's18_35ed5dae.png', 8.9, 1.5, 3.85, 2.7)
    shot(sl, 's18_26ee3c0b.png', 4.85, 4.4, 3.85, 2.6, fit='contain')
    card(sl, 8.9, 4.4, 3.85, 2.6)
    txt(sl, 9.12, 4.55, 3.4, 0.3, 'Рекомендация после экзамена', size=12, med=True, color=TH['sub'])
    pic(sl, 's18_86f50f23.png', 9.05, 4.95, 3.55, 0.8, fit='contain', r=0.06)
    txt(sl, 9.12, 5.95, 3.45, 0.9, 'AI-экзаменатор подтверждает квалификацию и сразу назначает тему для доработки',
        size=11.5, ls=1.08)


# 19 ─ Почему мы лучшие
def s19(prs):
    sl = S(prs, 'glow')
    title(sl, 'Почему наш подход лучший')
    s = rect(sl, 0.6, 1.5, 4.6, 5.5, fill=TH['red'], r=0.3)
    shadow(s, a=26, color=TH['red2'])
    pic(sl, 'ic_serdce_ladoni.png', 2.85, 1.7, 2.2, 2.2, fit='contain')
    txt(sl, 0.95, 4.1, 4.0, 1.6, ['Синергия', 'технологий', 'и людей'], size=34, bold=True, font=TH['head'],
        color='FFFFFF', ls=0.95)
    items = [('ic_lupa.png', 'Микросегментация', 'Каждый получает тот контент, который нужен ему здесь '
                                                           'и сейчас'),
             ('ic_moneta.png', 'Игровая мотивация', 'Своя платформа чемпионатов на любое число команд, '
                                                    'ачивки и коины'),
             ('ic_serdce.png', 'Персонализация опыта', 'От ИИ-поддержки до скилла Kids'),
             ('ic_spidometr.png', 'Прозрачность', 'Дашборды, VOE с индексом честности, рекомендательные модели')]
    for i, (ic, h, d) in enumerate(items):
        cx = 5.45 + (i % 2) * 3.7
        cy = 1.5 + (i // 2) * 2.83
        card(sl, cx, cy, 3.55, 2.67)
        pic(sl, ic, cx + 0.2, cy + 0.2, 0.95, 0.95, fit='contain')
        txt(sl, cx + 0.25, cy + 1.25, 3.1, 0.4, h, size=15, bold=True, font=TH['head'])
        txt(sl, cx + 0.25, cy + 1.62, 3.1, 0.9, d, size=12, color=TH['sub'], ls=1.08)


# 20 ─ Награды
def s20(prs):
    sl = S(prs, 'clean')
    title(sl, 'Наши награды')
    items = [
        ('Лучший работодатель', 'РБК — 4 года подряд · hh.ru — 3 года · Forbes — 3 года'),
        ('«Хрустальная пирамида» 2026', 'победа: система управления талантами'),
        ('«Хрустальная гарнитура» 2026', 'высокая оценка: лучшая практика работы с талантами'),
        ('>20 наград «Хрустальной гарнитуры»', '2025/2026: большой контактный центр — 4-й год, '
                                                'лучшая команда обучения, лучшая программа обучения'),
    ]
    y = 1.55
    for i, (h, d) in enumerate(items):
        rect(sl, 0.62, y + 0.05, 0.06, 0.95, fill=TH['red'], r=0.03)
        txt(sl, 0.88, y, 4.75, 0.4, h, size=15, bold=True, font=TH['head'])
        txt(sl, 0.88, y + 0.4, 4.5, 0.7, d, size=12, color=TH['sub'], ls=1.08)
        y += 1.22
    pic(sl, 'ic_medal.png', 4.55, 6.2, 0.95, 0.95, fit='contain')
    # мозаика фото
    pic(sl, 's20_cff07d8a.jpg', 5.75, 1.5, 4.25, 2.75, r=0.18, sh=True, sha=16)
    pic(sl, 's20_b5494db6.jpg', 10.15, 1.5, 2.6, 2.75, r=0.18, sh=True, sha=16)
    pic(sl, 's20_c809bd35.jpg', 5.75, 4.4, 2.3, 2.6, r=0.18, sh=True, sha=16)
    pic(sl, 's20_5f7badfc.jpg', 8.2, 4.4, 2.2, 2.6, r=0.18, sh=True, sha=16)
    pic(sl, 's20_25d53d75.jpg', 10.55, 4.4, 2.2, 2.6, r=0.18, sh=True, sha=16, align_y=0.35)


ALL = [s01, s02, s03, s04, s05, s06, s07, s08, s09, s10, s11, s12, s13, s14, s15, s16, s17, s18, s19, s20]
