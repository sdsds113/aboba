# Общие помощники сборки: фон, стекло, текст, картинки, графики.
import os, copy
from PIL import Image
from lxml import etree
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE, MSO_CONNECTOR
from pptx.chart.data import CategoryChartData
from pptx.enum.chart import XL_CHART_TYPE, XL_LABEL_POSITION
from pptx.oxml.ns import qn

SP = '/tmp/claude-0/-home-user-aboba/96efd652-46b7-5ea6-ad9b-7fe08ad790c2/scratchpad'
YM = SP + '/ym/'
AS = SP + '/assets/'
TMP = SP + '/tmpimg/'
os.makedirs(TMP, exist_ok=True)

TH = dict(  # тема; тёмная версия подменит словарь
    ink='15151F', sub='5B5B70', mute='8C8CA1', red='EF3124', red2='C8102E',
    card='FFFFFF', card_a=58, line='FFFFFF', line_a=85, shadow='6D5BA8', shadow_a=16,
    tint_red='FFE3DF', tint_lav='ECE6FF', chip='FFFFFF',
    head='Styrene A LC', body='Styrene B LC', bodym='Styrene B LC Medium', headm='Styrene A LC Medium',
    grid='D9D5E6', bgs={})


def I(v):
    return Inches(v)


def rgb(h):
    return RGBColor.from_string(h)


# ---------- низкоуровневое XML ----------
A = 'http://schemas.openxmlformats.org/drawingml/2006/main'


def _alpha(clr_el, a):
    if a is None or a >= 100:
        return
    e = etree.SubElement(clr_el, qn('a:alpha'))
    e.set('val', str(int(a * 1000)))


def set_fill(shape, hexc, a=None):
    shape.fill.solid()
    shape.fill.fore_color.rgb = rgb(hexc)
    _alpha(shape.fill._xPr.find(qn('a:solidFill')).find(qn('a:srgbClr')), a)


def set_grad(shape, stops, ang=90):
    """stops: [(pos0..100, hex, alpha)]"""
    spPr = shape._element.spPr
    for t in ('a:solidFill', 'a:gradFill', 'a:noFill'):
        for e in spPr.findall(qn(t)):
            spPr.remove(e)
    g = etree.Element(qn('a:gradFill'))
    g.set('rotWithShape', '1')
    gl = etree.SubElement(g, qn('a:gsLst'))
    for pos, h, a in stops:
        gs = etree.SubElement(gl, qn('a:gs'))
        gs.set('pos', str(int(pos * 1000)))
        c = etree.SubElement(gs, qn('a:srgbClr'))
        c.set('val', h)
        _alpha(c, a)
    lin = etree.SubElement(g, qn('a:lin'))
    lin.set('ang', str(int(ang * 60000)))
    lin.set('scaled', '0')
    # вставить после геометрии
    geom = spPr.find(qn('a:prstGeom'))
    geom.addnext(g)


def set_line(shape, hexc=None, w=1.0, a=None, dash=None):
    ln = shape.line
    if hexc is None:
        ln.fill.background()
        return
    ln.color.rgb = rgb(hexc)
    ln.width = Pt(w)
    _alpha(shape._element.spPr.find(qn('a:ln')).find(qn('a:solidFill')).find(qn('a:srgbClr')), a)
    if dash:
        lnel = shape._element.spPr.find(qn('a:ln'))
        d = etree.SubElement(lnel, qn('a:prstDash'))
        d.set('val', dash)


def shadow(shape, blur=22, dist=6, a=None, color=None, spPr=None):
    spPr = spPr if spPr is not None else shape._element.spPr
    for e in spPr.findall(qn('a:effectLst')):
        spPr.remove(e)
    eff = etree.SubElement(spPr, qn('a:effectLst'))
    s = etree.SubElement(eff, qn('a:outerShdw'))
    s.set('blurRad', str(int(Pt(blur))))
    s.set('dist', str(int(Pt(dist))))
    s.set('dir', '5400000')
    s.set('algn', 't')
    s.set('rotWithShape', '0')
    c = etree.SubElement(s, qn('a:srgbClr'))
    c.set('val', color or TH['shadow'])
    _alpha(c, a if a is not None else TH['shadow_a'])


def round_adj(shape, r_in, w, h):
    v = int(min(50000, r_in / min(w, h) * 100000))
    try:
        shape.adjustments[0] = v / 100000
    except Exception:
        pass


# ---------- примитивы ----------
def rect(sl, x, y, w, h, fill=None, a=None, r=None, line=None, lw=1, la=None, shape=None):
    st = shape or (MSO_SHAPE.ROUNDED_RECTANGLE if r else MSO_SHAPE.RECTANGLE)
    s = sl.shapes.add_shape(st, I(x), I(y), I(w), I(h))
    if r and st == MSO_SHAPE.ROUNDED_RECTANGLE:
        round_adj(s, r, w, h)
    if fill:
        set_fill(s, fill, a)
    else:
        s.fill.background()
    set_line(s, line, lw, la)
    s.shadow.inherit = False
    s.text_frame.text = ''
    return s


def card(sl, x, y, w, h, tint=None, r=0.22, sh=True, a=None):
    """Стеклянная карточка: молочное стекло, светлая кромка, мягкая тень."""
    s = rect(sl, x, y, w, h, fill=tint or TH['card'], a=a if a is not None else TH['card_a'], r=r,
             line=TH['line'], lw=1.25, la=TH['line_a'])
    if sh:
        shadow(s)
    return s


def txt(sl, x, y, w, h, content, size=14, bold=False, color=None, font=None, align='l', anchor='t',
        ls=None, med=False, sp_after=0, wrap=True, autofit=False):
    """content: str или список абзацев; абзац = str или список ранов (text, {opts})."""
    tb = sl.shapes.add_textbox(I(x), I(y), I(w), I(h))
    tf = tb.text_frame
    tf.word_wrap = wrap
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    tf.vertical_anchor = {'t': MSO_ANCHOR.TOP, 'm': MSO_ANCHOR.MIDDLE, 'b': MSO_ANCHOR.BOTTOM}[anchor]
    paras = content if isinstance(content, list) else [content]
    for i, p in enumerate(paras):
        para = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        para.alignment = {'l': PP_ALIGN.LEFT, 'c': PP_ALIGN.CENTER, 'r': PP_ALIGN.RIGHT}[align]
        if ls:
            para.line_spacing = ls
        if sp_after:
            para.space_after = Pt(sp_after)
        runs = p if isinstance(p, list) else [(p, {})]
        for t, o in runs:
            r = para.add_run()
            r.text = t
            f = r.font
            f.size = Pt(o.get('size', size))
            b = o.get('bold', bold)
            m = o.get('med', med)
            fam = o.get('font', font) or TH['body']
            if m and not b:
                fam = TH['bodym'] if fam == TH['body'] else (TH['headm'] if fam == TH['head'] else fam)
            f.name = fam
            f.bold = b
            f.color.rgb = rgb(o.get('color', color or TH['ink']))
    return tb


def title(sl, text, y=0.5, size=30, w=10.9, kicker=None):
    if kicker:
        txt(sl, 0.6, y - 0.05, w, 0.3, kicker, size=12, color=TH['red'], med=True)
        y += 0.3
    return txt(sl, 0.6, y, w, 0.9, text, size=size, bold=True, font=TH['head'], ls=0.95)


# ---------- картинки ----------
def _src(path):
    return path if os.path.isabs(path) else (YM + path if os.path.exists(YM + path) else AS + path)


def gen(name, fallback):
    """Сгенерированный элемент из assets/gen, пока его нет — исходник Юли."""
    p = AS + 'gen/' + name
    return p if os.path.exists(p) else fallback


def img_size(path):
    with Image.open(_src(path)) as im:
        return im.size


def pic(sl, path, x, y, w=None, h=None, fit='cover', r=None, sh=False, border=None, crop=None, sha=None,
        align_y=0.5, align_x=0.5):
    """fit=cover: заполнить рамку с обрезкой; contain: вписать целиком (рамка = размер картинки)."""
    p = _src(path)
    iw, ih = img_size(p)
    l = t = rr = b = 0.0
    if crop:
        l, t, rr, b = crop
    vw, vh = iw * (1 - l - rr), ih * (1 - t - b)
    ar = vw / vh
    if w is None:
        w = h * ar
    if h is None:
        h = w / ar
    if fit == 'contain':
        bw, bh = w, h
        if w / h > ar:
            w = h * ar
            x += (bw - w) / 2
        else:
            h = w / ar
            y += (bh - h) / 2
    else:
        box = w / h
        if ar > box:  # шире: режем бока
            extra = 1 - box / ar
            l += extra * align_x * (1 - l - rr) if False else 0
            cut = (vw - vh * box) / iw
            l += cut * align_x
            rr += cut * (1 - align_x)
        else:
            cut = (vh - vw / box) / ih
            t += cut * align_y
            b += cut * (1 - align_y)
    s = sl.shapes.add_picture(p, I(x), I(y), I(w), I(h))
    s.crop_left, s.crop_top, s.crop_right, s.crop_bottom = l, t, rr, b
    if r:
        geom = s._element.spPr.find(qn('a:prstGeom'))
        geom.set('prst', 'roundRect')
        av = geom.find(qn('a:avLst'))
        if av is None:
            av = etree.SubElement(geom, qn('a:avLst'))
        gd = etree.SubElement(av, qn('a:gd'))
        gd.set('name', 'adj')
        gd.set('fmla', 'val %d' % int(min(50000, r / min(w, h) * 100000)))
    if border:
        ln = etree.SubElement(s._element.spPr, qn('a:ln'))
        ln.set('w', str(int(Pt(border[1]))))
        sf = etree.SubElement(ln, qn('a:solidFill'))
        c = etree.SubElement(sf, qn('a:srgbClr'))
        c.set('val', border[0])
        if len(border) > 2:
            _alpha(c, border[2])
    if sh:
        shadow(s, blur=26, dist=8, a=sha if sha is not None else 22)
    return s


def shot(sl, path, x, y, w=None, h=None, fit='cover', r=0.12, crop=None, align_y=0.0, pad=0.0):
    """Скриншот в аккуратной белой рамке с тенью."""
    s = pic(sl, path, x, y, w, h, fit=fit, r=r, sh=True, border=('FFFFFF', 2.5), crop=crop, align_y=align_y)
    return s


LAPTOP = (0.1745, 0.1309, 0.8236, 0.7207)  # доли экрана в мокапе
PHONE = (0.2002, 0.1029, 0.7988, 0.8991)


def laptop(sl, path, x, y, w, crop=None, align_y=0.0):
    h = w * 1024 / 1536
    pic(sl, 'laptop.png', x, y, w, h, fit='contain')
    l, t, r, b = LAPTOP
    pic(sl, path, x + w * l, y + h * t, w * (r - l), h * (b - t), fit='cover', crop=crop, align_y=align_y)
    return h


def phone(sl, path, x, y, h, crop=None, align_y=0.0):
    w = h * 1024 / 1536
    pic(sl, 'phone.png', x, y, w, h, fit='contain')
    l, t, r, b = PHONE
    pic(sl, path, x + w * l, y + h * t, w * (r - l), h * (b - t), fit='cover', crop=crop, r=0.08,
        align_y=align_y)
    return w


def bg(sl, name):
    p = AS + name
    out = TMP + '169_' + name.replace('.png', '.jpg')
    if not os.path.exists(out):
        im = Image.open(p).convert('RGB')
        W, H = im.size
        nh = int(W * 9 / 16)
        top = (H - nh) // 2
        im = im.crop((0, top, W, top + nh)).resize((2400, 1350), Image.LANCZOS)
        im.save(out, quality=92)
    s = sl.shapes.add_picture(out, 0, 0, I(13.333), I(7.5))
    return s


def logo(sl):
    pic(sl, 's01_36177d30.png', 12.0, 0.47, w=0.46, fit='contain')
    pic(sl, 's01_8021c07c.png', 12.43, 0.35, w=0.56, fit='contain')


def flip_h(path):
    out = TMP + 'flip_' + os.path.basename(path)
    if not os.path.exists(out):
        Image.open(_src(path)).transpose(Image.FLIP_LEFT_RIGHT).save(out)
    return out


# ---------- фигуры-указатели ----------
def arrow(sl, x1, y1, x2, y2, color=None, w=1.75, dash=None, head=True):
    c = sl.shapes.add_connector(MSO_CONNECTOR.STRAIGHT, I(x1), I(y1), I(x2), I(y2))
    c.line.color.rgb = rgb(color or TH['red'])
    c.line.width = Pt(w)
    ln = c.line._get_or_add_ln()
    if dash:
        d = etree.SubElement(ln, qn('a:prstDash'))
        d.set('val', dash)
    if head:
        t = etree.SubElement(ln, qn('a:tailEnd'))
        t.set('type', 'triangle')
        t.set('w', 'med')
        t.set('len', 'med')
    return c


def dot(sl, x, y, d=0.11, color=None):
    s = sl.shapes.add_shape(MSO_SHAPE.OVAL, I(x), I(y), I(d), I(d))
    set_fill(s, color or TH['red'])
    set_line(s, None)
    return s


def chip(sl, x, y, w, h, text, fill=None, color=None, size=12, a=None, bold=True, line=None):
    s = rect(sl, x, y, w, h, fill=fill or TH['red'], a=a, r=h / 2, line=line, la=80)
    tf = s.text_frame
    tf.margin_left = tf.margin_right = I(0.12)
    tf.margin_top = tf.margin_bottom = 0
    tf.vertical_anchor = MSO_ANCHOR.MIDDLE
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = text
    r.font.size = Pt(size)
    r.font.bold = bold
    r.font.name = TH['body']
    r.font.color.rgb = rgb(color or 'FFFFFF')
    return s


# ---------- графики ----------
def _chart_clean(chart):
    cs = chart._chartSpace
    spPr = cs.find(qn('c:spPr'))
    if spPr is None:
        spPr = etree.SubElement(cs, qn('c:spPr'))
    for e in list(spPr):
        spPr.remove(e)
    etree.SubElement(spPr, qn('a:noFill'))
    ln = etree.SubElement(spPr, qn('a:ln'))
    etree.SubElement(ln, qn('a:noFill'))
    pa = chart._chartSpace.chart.plotArea
    pspPr = pa.find(qn('c:spPr'))
    if pspPr is None:
        pspPr = etree.SubElement(pa, qn('c:spPr'))
    for e in list(pspPr):
        pspPr.remove(e)
    etree.SubElement(pspPr, qn('a:noFill'))


def line_chart(sl, x, y, w, h, cats, series, colors=None, lw=2.5, labels='ends', fmt='0%', ymin=None, ymax=None,
               cat_labels=True, smooth=True, label_size=10, dash=None, show_cats_every=1, target=None):
    """series: [(name, values)]. labels: 'ends' | 'all' | 'last' | None"""
    cd = CategoryChartData()
    cd.categories = cats
    for n, v in series:
        cd.add_series(n, v, number_format=fmt)
    if target is not None:
        cd.add_series('target', [target] * len(cats), number_format=fmt)
    gf = sl.shapes.add_chart(XL_CHART_TYPE.LINE, I(x), I(y), I(w), I(h), cd)
    ch = gf.chart
    _chart_clean(ch)
    ch.has_title = False
    ch.has_legend = False
    ch.font.size = Pt(label_size)
    ch.font.name = TH['body']
    ch.font.color.rgb = rgb(TH['sub'])
    va = ch.value_axis
    va.visible = False
    va.has_major_gridlines = False
    if ymin is not None:
        va.minimum_scale = ymin
    if ymax is not None:
        va.maximum_scale = ymax
    ca = ch.category_axis
    ca.has_major_gridlines = False
    ca.format.line.fill.background()
    ca.tick_labels.font.size = Pt(9)
    ca.tick_labels.font.name = TH['body']
    ca.tick_labels.font.color.rgb = rgb(TH['mute'])
    from pptx.enum.chart import XL_TICK_MARK, XL_TICK_LABEL_POSITION
    ca.major_tick_mark = XL_TICK_MARK.NONE
    if not cat_labels:
        ca.tick_label_position = XL_TICK_LABEL_POSITION.NONE
    colors = colors or [TH['red'], TH['mute']]
    plot = ch.plots[0]
    for i, s in enumerate(plot.series):
        is_t = target is not None and i == len(plot.series) - 1
        s.smooth = smooth and not is_t
        s.format.line.width = Pt(1.25 if is_t else lw)
        s.format.line.color.rgb = rgb(TH['mute'] if is_t else colors[i % len(colors)])
        if is_t or (dash and i in dash):
            lnel = s.format.line._get_or_add_ln()
            d = etree.SubElement(lnel, qn('a:prstDash'))
            d.set('val', 'dash')
        from pptx.enum.chart import XL_MARKER_STYLE
        s.marker.style = XL_MARKER_STYLE.NONE
        if is_t:
            continue
        vals = series[i][1]
        idx = []
        if labels == 'all':
            idx = range(len(vals))
        elif labels == 'ends':
            idx = [0, len(vals) - 1]
        elif labels == 'last':
            idx = [len(vals) - 1]
        elif isinstance(labels, (list, tuple)):
            idx = labels
        for k in idx:
            if vals[k] is None:
                continue
            pt = s.points[k]
            pt.marker.style = XL_MARKER_STYLE.CIRCLE
            pt.marker.size = 6
            pt.marker.format.fill.solid()
            pt.marker.format.fill.fore_color.rgb = rgb(colors[i % len(colors)])
            pt.marker.format.line.color.rgb = rgb('FFFFFF')
            dl = pt.data_label
            dl.has_text_frame = False
            dl.number_format = fmt
            dl.number_format_is_linked = False
            dl.show_value = True
            dl.position = XL_LABEL_POSITION.ABOVE
            dl.font.size = Pt(label_size)
            dl.font.name = TH['body']
            dl.font.bold = True
            dl.font.color.rgb = rgb(colors[i % len(colors)] if i == 0 else TH['sub'])
    return ch


def bar_chart(sl, x, y, w, h, cats, vals, fmt='0%', hi=None, color=None, hicolor=None, ymax=None, gap=60,
              label_size=11):
    cd = CategoryChartData()
    cd.categories = cats
    cd.add_series('s', vals, number_format=fmt)
    gf = sl.shapes.add_chart(XL_CHART_TYPE.COLUMN_CLUSTERED, I(x), I(y), I(w), I(h), cd)
    ch = gf.chart
    _chart_clean(ch)
    ch.has_title = False
    ch.has_legend = False
    ch.font.name = TH['body']
    ch.font.size = Pt(label_size)
    va = ch.value_axis
    va.visible = False
    va.has_major_gridlines = False
    va.minimum_scale = 0
    if ymax:
        va.maximum_scale = ymax
    ca = ch.category_axis
    ca.format.line.fill.background()
    from pptx.enum.chart import XL_TICK_MARK
    ca.major_tick_mark = XL_TICK_MARK.NONE
    ca.tick_labels.font.size = Pt(9.5)
    ca.tick_labels.font.name = TH['body']
    ca.tick_labels.font.color.rgb = rgb(TH['mute'])
    pl = ch.plots[0]
    pl.gap_width = gap
    s = pl.series[0]
    s.format.fill.solid()
    s.format.fill.fore_color.rgb = rgb(color or 'D8D0F2')
    pl.has_data_labels = True
    dls = pl.data_labels
    dls.number_format = fmt
    dls.number_format_is_linked = False
    dls.position = XL_LABEL_POSITION.OUTSIDE_END
    dls.font.size = Pt(label_size)
    dls.font.bold = True
    dls.font.color.rgb = rgb(TH['ink'])
    for k in range(len(vals)):
        pt = s.points[k]
        dl = pt.data_label
        dl.has_text_frame = False
        dl.number_format = fmt
        dl.number_format_is_linked = False
        dl.show_value = True
        dl.position = XL_LABEL_POSITION.OUTSIDE_END
        dl.font.size = Pt(label_size)
        dl.font.name = TH['body']
        dl.font.bold = True
        dl.font.color.rgb = rgb(TH['ink'])
        if k in (hi or []):
            pt.format.fill.solid()
            pt.format.fill.fore_color.rgb = rgb(hicolor or TH['red'])
            dl.font.color.rgb = rgb(hicolor or TH['red'])
    return ch


def new_deck():
    prs = Presentation()
    prs.slide_width = I(13.333)
    prs.slide_height = I(7.5)
    return prs


def blank(prs):
    return prs.slides.add_slide(prs.slide_layouts[6])
