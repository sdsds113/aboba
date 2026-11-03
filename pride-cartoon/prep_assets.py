# Предобработка PNG перед монтажом (оригиналы в assets/ не трогаются, результат — assets/processed/).
# 1) E03: обнуляем остаточную альфу (<=20) внутри отверстия рамки.
# 2) E02: подгоняем оттенок бумаги под E01.
import os, numpy as np
from PIL import Image
D=os.path.dirname(os.path.abspath(__file__)); A=f"{D}/assets"; O=f"{A}/processed"; os.makedirs(O,exist_ok=True)
HOLE=(365,312,1160,779)   # x0,y0,x1,y1 отверстия E03 в исходных пикселях 1536x1024

a=np.array(Image.open(f"{A}/E03_photo_frame.png").convert("RGBA"))
x0,y0,x1,y1=HOLE; h=a[y0:y1,x0:x1,3]; h[h<=20]=0; a[y0:y1,x0:x1,3]=h
Image.fromarray(a).save(f"{O}/E03_photo_frame.png")

def med(path,box): return np.median(np.array(Image.open(path).convert("RGB").crop(box)).reshape(-1,3),0)
t=med(f"{A}/E01_calendar_page.png",(400,500,800,900)); s=med(f"{A}/E02_calendar_page_torn.png",(500,500,800,800))
k=t/s; b=np.array(Image.open(f"{A}/E02_calendar_page_torn.png").convert("RGBA")).astype(float)
b[...,:3]=np.clip(b[...,:3]*k,0,255); Image.fromarray(b.astype(np.uint8)).save(f"{O}/E02_calendar_page_torn.png")
print("E02 channel gains", k.round(3))
