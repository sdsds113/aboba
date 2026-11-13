# Ужимает тяжёлые картинки внутри pptx (до 2200 px по длинной стороне) и чинит sldSz.
import sys, zipfile, io, shutil, re
from PIL import Image
src = sys.argv[1]; tmp = src + '.tmp'; MAX = 2200
zin = zipfile.ZipFile(src)
with zipfile.ZipFile(tmp, 'w', zipfile.ZIP_DEFLATED) as z:
    for n in zin.namelist():
        b = zin.read(n)
        if n.startswith('ppt/media/') and n.lower().endswith(('.png', '.jpg', '.jpeg')) and len(b) > 400_000:
            im = Image.open(io.BytesIO(b))
            if max(im.size) > MAX:
                im.thumbnail((MAX, MAX), Image.LANCZOS)
            out = io.BytesIO()
            if n.lower().endswith('.png'):
                im.save(out, 'PNG', optimize=True)
            else:
                im.convert('RGB').save(out, 'JPEG', quality=88, optimize=True)
            if out.tell() < len(b):
                b = out.getvalue()
        if n == 'ppt/presentation.xml':
            b = re.sub(rb' type="screen4x3"', b'', b)
        z.writestr(n, b)
shutil.move(tmp, src)
