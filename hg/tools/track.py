import sys, json, glob; sys.path.insert(0,'/tmp/claude-0/-home-user-aboba/cefc6c93-fcfa-542d-804e-c0535ad09f32/scratchpad/cvlib')
import cv2, numpy as np
frames=sorted(glob.glob('fr/*.png')); q0=np.array(json.load(open('q0.json')),np.float32)
X0,Y0,X1,Y1=640,660,1300,1080   # рабочая область вокруг рамки
off=np.array([X0,Y0],np.float32)
def crop(f): return cv2.imread(f)[Y0:Y1,X0:X1]
def skin(img):
    ycc=cv2.cvtColor(img,cv2.COLOR_BGR2YCrCb); Y,Cr,Cb=ycc[...,0],ycc[...,1],ycc[...,2]
    return ((Cr>=143)&(Cr<=185)&(Cb>=78)&(Cb<=127)&(Y>60)).astype(np.uint8)
f0=crop(frames[0]); g0=cv2.cvtColor(f0,cv2.COLOR_BGR2GRAY).astype(np.float32)
reg=np.zeros(g0.shape,np.uint8); cv2.fillPoly(reg,[(q0-off).astype(np.int32)],255); reg=cv2.dilate(reg,np.ones((31,31),np.uint8))
tmask=((reg>0)&(cv2.dilate(skin(f0),np.ones((13,13),np.uint8))==0)).astype(np.uint8)
warp=np.eye(3,dtype=np.float32); quads=[]; crit=(cv2.TERM_CRITERIA_EPS|cv2.TERM_CRITERIA_COUNT,60,1e-5)
for i,f in enumerate(frames):
    g=cv2.cvtColor(crop(f),cv2.COLOR_BGR2GRAY).astype(np.float32)
    try: _,warp=cv2.findTransformECC(g0,g,warp,cv2.MOTION_HOMOGRAPHY,crit,tmask,5)
    except cv2.error: print('ecc fail',i,flush=True)
    quads.append(cv2.perspectiveTransform((q0-off)[None],warp)[0]+off)
    if i%40==0: print(i,flush=True)
Q=np.array(quads); k=5; P=np.pad(Q,((k//2,k//2),(0,0),(0,0)),mode='edge'); Qs=np.stack([P[i:i+k].mean(0) for i in range(len(Q))])
np.save('quads_raw.npy',Q); np.save('quads.npy',Qs)
print('max drift px',np.abs(Q-Q[0]).max().round(1),'jitter',np.abs(Q-Qs).max().round(2))
