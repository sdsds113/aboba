import json, subprocess, sys
import numpy as np
SRC, OUT = sys.argv[1:3]
W, H, FPS = 960, 540, 30
cmd = ['ffmpeg','-v','error','-i',SRC,'-vf',f'fps={FPS},scale={W}:{H}','-pix_fmt','gray','-f','rawvideo','-']
p = subprocess.Popen(cmd, stdout=subprocess.PIPE)
# candidate edge rows (half-res): top 457-462 (2-line ~459, 1-line ~471), bottom 506-522
res=[]; i=0
def runs(mask):
    d=np.diff(np.concatenate([[0],mask.astype(np.int8),[0]])); s=np.where(d==1)[0]; e=np.where(d==-1)[0]
    return [(a,b) for a,b in zip(s,e) if b-a>=12]
while True:
    buf=p.stdout.read(W*H)
    if len(buf)<W*H: break
    f=np.frombuffer(buf,np.uint8).reshape(H,W).astype(np.float32)
    best=None
    for top,bot in ((459,520),(471,508)):
        # use 3-row windows
        rt=((f[top+1:top+4].mean(0)+4)/(f[top-4:top-1].mean(0)+4))
        rb=((f[bot-3:bot].mean(0)+4)/(f[bot+1:bot+4].mean(0)+4))
        m=(rt<0.7)|(rb<0.7)
        m[:232]=False; m[728:]=False   # x 464..1456 full-res
        rr=runs(m)
        cov=sum(b-a for a,b in rr)
        if not rr: continue
        x0=min(a for a,b in rr); x1=max(b for a,b in rr)
        # both edges must show along most of span
        both=((rt<0.7)[x0:x1].mean(), (rb<0.7)[x0:x1].mean())
        score=cov*min(both)
        if x1-x0>=150 and min(both)>0.45 and abs((x0+x1)/2-480)<40 and (best is None or score>best[0]):
            best=(score,top,bot,x0,x1)
    t=round(i/FPS,4)
    res.append({'t':t} if best is None else {'t':t,'y0':best[1]*2,'y1':best[2]*2,'x0':int(best[3])*2,'x1':int(best[4])*2})
    i+=1
json.dump(res,open(OUT,'w')); print(i,sum('x0' in r for r in res))
