import sys
from PIL import Image, ImageDraw
out=sys.argv[1]; fs=sys.argv[2:]
ims=[Image.open(f) for f in fs]
w,h=ims[0].size; cols=3
rows=(len(ims)+cols-1)//cols
S=Image.new('RGB',(w*cols,h*rows),(30,30,30)); d=ImageDraw.Draw(S)
for i,(f,im) in enumerate(zip(fs,ims)):
    x,y=(i%cols)*w,(i//cols)*h; S.paste(im,(x,y)); d.text((x+8,y+8),f.split('/')[-1],fill=(255,255,0))
S.thumbnail((2400,2400)); S.save(out,quality=78)
