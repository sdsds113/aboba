# Вшивает шрифты в pptx: OTF(CFF) -> TTF -> EOT (.fntdata), embeddedFontLst в presentation.xml.
import sys, os, struct, zipfile, shutil, re, io
from fontTools.ttLib import TTFont, newTable
from fontTools.pens.cu2quPen import Cu2QuPen
from fontTools.pens.ttGlyphPen import TTGlyphPen

FD = '/tmp/claude-0/-home-user-aboba/96efd652-46b7-5ea6-ad9b-7fe08ad790c2/scratchpad/fonts/'
CACHE = '/tmp/claude-0/-home-user-aboba/96efd652-46b7-5ea6-ad9b-7fe08ad790c2/scratchpad/fonts_ttf/'
os.makedirs(CACHE, exist_ok=True)


def find(name):
    for r, _, fs in os.walk(FD):
        if name in fs:
            return os.path.join(r, name)
    raise FileNotFoundError(name)


def otf2ttf(src, dst):
    f = TTFont(src)
    if 'CFF ' not in f:
        f.save(dst)
        return
    go = f.getGlyphOrder()
    gs = f.getGlyphSet()
    glyf = {}
    for n in go:
        pen = TTGlyphPen(gs)
        cpen = Cu2QuPen(pen, 1.0, reverse_direction=True)
        gs[n].draw(cpen)
        glyf[n] = pen.glyph()
    f['loca'] = newTable('loca')
    f['glyf'] = g = newTable('glyf')
    g.glyphOrder = go
    g.glyphs = glyf
    del f['CFF ']
    if 'VORG' in f:
        del f['VORG']
    f['maxp'] = m = newTable('maxp')
    m.tableVersion = 0x00010000
    for a in ('maxZones', 'maxTwilightPoints', 'maxStorage', 'maxFunctionDefs', 'maxInstructionDefs',
              'maxStackElements', 'maxSizeOfInstructions', 'maxComponentElements'):
        setattr(m, a, 0)
    m.maxZones = 1
    m.maxComponentDepth = 0
    f['head'].glyphDataFormat = 0
    post = f['post']
    post.formatType = 2.0
    post.extraNames = []
    post.mapping = {}
    post.glyphOrder = go
    f['OS/2'].fsType = 0
    f.sfntVersion = '\x00\x01\x00\x00'
    f.save(dst)


def eot(ttf_path):
    data = open(ttf_path, 'rb').read()
    f = TTFont(ttf_path)
    os2 = f['OS/2']
    nm = f['name']

    def name(i):
        r = nm.getName(i, 3, 1, 0x409) or nm.getName(i, 1, 0, 0)
        return str(r) if r else ''
    fam, sty, ver, full = name(1), name(2), name(5), name(4)

    def s(x):
        b = x.encode('utf-16-le')
        return struct.pack('<H', len(b)) + b
    panose = os2.panose
    pan = bytes([panose.bFamilyType, panose.bSerifStyle, panose.bWeight, panose.bProportion, panose.bContrast,
                 panose.bStrokeVariation, panose.bArmStyle, panose.bLetterForm, panose.bMidline, panose.bXHeight])
    body = b''
    body += struct.pack('<I', len(data))          # FontDataSize
    body += struct.pack('<I', 0x00020001)         # Version
    body += struct.pack('<I', 0)                  # Flags
    body += pan
    body += struct.pack('<B', 1)                  # Charset DEFAULT
    body += struct.pack('<B', 1 if (os2.fsSelection & 1) else 0)
    body += struct.pack('<I', os2.usWeightClass)
    body += struct.pack('<H', 0)                  # fsType
    body += struct.pack('<H', 0x504C)
    body += struct.pack('<IIII', os2.ulUnicodeRange1, os2.ulUnicodeRange2, os2.ulUnicodeRange3,
                        os2.ulUnicodeRange4)
    body += struct.pack('<II', getattr(os2, 'ulCodePageRange1', 1), getattr(os2, 'ulCodePageRange2', 0))
    body += struct.pack('<I', f['head'].checkSumAdjustment)
    body += struct.pack('<IIII', 0, 0, 0, 0)
    body += struct.pack('<H', 0) + s(fam)
    body += struct.pack('<H', 0) + s(sty)
    body += struct.pack('<H', 0) + s(ver)
    body += struct.pack('<H', 0) + s(full)
    body += struct.pack('<H', 0) + struct.pack('<H', 0)  # Padding5 + RootStringSize
    total = 4 + len(body) + len(data)
    return struct.pack('<I', total) + body + data


# typeface -> {slot: otf}
FONTS = {
    'Styrene A LC': {'regular': 'StyreneALC-Regular.otf', 'bold': 'StyreneALC-Bold.otf'},
    'Styrene B LC': {'regular': 'StyreneBLC-Regular.otf', 'bold': 'StyreneBLC-Bold.otf'},
    'Styrene B LC Medium': {'regular': 'StyreneBLC-Medium.otf'},
    'Styrene A LC Medium': {'regular': 'StyreneALC-Medium.otf'},
}


def main(path):
    tmp = path + '.tmp'
    zin = zipfile.ZipFile(path)
    names = zin.namelist()
    files = {n: zin.read(n) for n in names}
    zin.close()
    pres = files['ppt/presentation.xml'].decode('utf8')
    rels = files['ppt/_rels/presentation.xml.rels'].decode('utf8')
    ct = files['[Content_Types].xml'].decode('utf8')
    if 'fntdata' not in ct:
        ct = ct.replace('<Default Extension="xml"',
                        '<Default Extension="fntdata" ContentType="application/x-fontdata"/><Default Extension="xml"')
    ids = [int(x) for x in re.findall(r'Id="rId(\d+)"', rels)]
    nid = max(ids) + 1
    k = 1
    lst = '<p:embeddedFontLst>'
    for face, slots in FONTS.items():
        lst += '<p:embeddedFont><p:font typeface="%s" pitchFamily="2" charset="0"/>' % face
        for slot in ('regular', 'bold'):
            if slot not in slots:
                continue
            src = find(slots[slot])
            ttf = CACHE + slots[slot].replace('.otf', '.ttf')
            if not os.path.exists(ttf):
                otf2ttf(src, ttf)
            fn = 'fonts/font%d.fntdata' % k
            files['ppt/' + fn] = eot(ttf)
            rels = rels.replace('</Relationships>',
                                '<Relationship Id="rId%d" Type="http://schemas.openxmlformats.org/officeDocument/'
                                '2006/relationships/font" Target="%s"/></Relationships>' % (nid, fn))
            lst += '<p:%s r:id="rId%d"/>' % (slot, nid)
            nid += 1
            k += 1
        lst += '</p:embeddedFont>'
    lst += '</p:embeddedFontLst>'
    pres = re.sub(r'<p:embeddedFontLst>.*?</p:embeddedFontLst>', '', pres)
    pres = re.sub(r'(<p:notesSz[^>]*/>)', r'\1' + lst, pres, count=1)
    pres = re.sub(r'\s(embedTrueTypeFonts|saveSubsetFonts)="[^"]*"', '', pres)
    pres = pres.replace('<p:presentation ', '<p:presentation embedTrueTypeFonts="1" saveSubsetFonts="0" ', 1)
    files['ppt/presentation.xml'] = pres.encode('utf8')
    files['ppt/_rels/presentation.xml.rels'] = rels.encode('utf8')
    files['[Content_Types].xml'] = ct.encode('utf8')
    with zipfile.ZipFile(tmp, 'w', zipfile.ZIP_DEFLATED) as z:
        z.writestr('[Content_Types].xml', files.pop('[Content_Types].xml'))
        for n, b in files.items():
            z.writestr(n, b)
    shutil.move(tmp, path)
    print('embedded', k - 1, 'font files')


if __name__ == '__main__':
    main(sys.argv[1])
