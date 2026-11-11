import sys, glob; sys.path.insert(0,'/tmp/claude-0/-home-user-aboba/cefc6c93-fcfa-542d-804e-c0535ad09f32/scratchpad/cvlib')
import cv2, numpy as np
frames=sorted(glob.glob('fr/*.png')); Qs=np.load('quads.npy')
cert=cv2.imread('../blag_hi-1.png'); cert=cv2.resize(cert,(1100,int(1100*cert.shape[0]/cert.shape[1])),interpolation=cv2.INTER_AREA)
ch,cw=cert.shape[:2]; src=np.float32([[0,0],[cw,0],[cw,ch],[0,ch]])
X0,Y0,X1,Y1=640,660,1300,1080
def skin(img):
    ycc=cv2.cvtColor(img,cv2.COLOR_BGR2YCrCb); Y,Cr,Cb=ycc[...,0],ycc[...,1],ycc[...,2]
    return ((Cr>=157)&(Cr<=190)&(Cb>=88)&(Cb<=106)&(Y>70)).astype(np.uint8)
INSET=float(sys.argv[1]) if len(sys.argv)>1 else 5
for i,f in enumerate(frames):
    im=cv2.imread(f); sub=im[Y0:Y1,X0:X1].astype(np.float32)
    q=Qs[i]-np.float32([X0,Y0]); c=q.mean(0)
    q=np.float32([p+(c-p)/np.linalg.norm(c-p)*INSET*1.41 for p in q])
    M=cv2.getPerspectiveTransform(src,q)
    w=cv2.warpPerspective(cert,M,(X1-X0,Y1-Y0),flags=cv2.INTER_LINEAR).astype(np.float32)
    quad=np.zeros(sub.shape[:2],np.uint8); cv2.fillPoly(quad,[np.round(q).astype(np.int32)],255)
    # пальцы: компоненты кожи, которые заходят в рамку снаружи
    sk=skin(im[Y0:Y1,X0:X1]); sk=cv2.morphologyEx(sk,cv2.MORPH_OPEN,np.ones((3,3),np.uint8))
    n,lab,st,_=cv2.connectedComponentsWithStats(sk,8)
    fing=np.zeros_like(sk)
    for j in range(1,n):
        comp=lab==j
        if st[j,4]>150 and (comp&(quad==0)).sum()>40: fing[comp]=1
    # пальцы бывают только у левого и правого краёв, в нижней части листа
    zone=np.zeros_like(fing); xs=q[:,0]; ys=q[:,1]; wq=xs.max()-xs.min(); hq=ys.max()-ys.min()
    zone[int(ys.min()+hq*0.35):, :int(xs.min()+wq*0.2)]=1; zone[int(ys.min()+hq*0.35):, int(xs.max()-wq*0.2):]=1
    fing=fing*zone
    fing=cv2.morphologyEx(fing,cv2.MORPH_CLOSE,np.ones((7,7),np.uint8))
    fing=cv2.dilate(fing,np.ones((5,5),np.uint8))
    m=((quad>0)&(fing==0)).astype(np.float32)
    m=cv2.GaussianBlur(m,(0,0),1.0)*(quad>0)
    # освещение: общий тон бумаги из кадра + мягкий градиент
    bright=(quad>0)&(fing==0)&(sub.mean(2)>170)
    paper=sub[bright].mean(0) if bright.sum()>500 else np.float32([215,225,235])
    shade=cv2.GaussianBlur(sub.mean(2),(0,0),45)/max(sub[bright].mean(),1)
    shade=np.clip(shade,0.88,1.1)[...,None]
    out=np.clip(w*(paper/236.0)*shade,0,255)
    sub=sub*(1-m[...,None])+out*m[...,None]
    im[Y0:Y1,X0:X1]=sub.astype(np.uint8); cv2.imwrite(f'out/{i+1:04d}.png',im)
print('ok')
