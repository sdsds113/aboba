import sys; sys.path.insert(0,'/tmp/claude-0/-home-user-aboba/cefc6c93-fcfa-542d-804e-c0535ad09f32/scratchpad/cvlib')
import cv2, numpy as np, json
im=cv2.imread(sys.argv[1]); g=cv2.GaussianBlur(cv2.cvtColor(im,cv2.COLOR_BGR2GRAY).astype(float),(3,3),0)
est=dict(t=750,b=1025,l=758,r=1177)
gy=np.diff(g,axis=0); gx=np.diff(g,axis=1)
def line_h(y_est, xs, sign):
    pts=[]
    for x in xs:
        seg=gy[y_est-18:y_est+18,x]*sign
        pts.append((x,y_est-18+np.argmax(seg)+0.5))
    p=np.array(pts); k,b=np.polyfit(p[:,0],p[:,1],1)
    r=p[:,1]-(k*p[:,0]+b); keep=np.abs(r)<2; k,b=np.polyfit(p[keep,0],p[keep,1],1); return k,b
def line_v(x_est, ys, sign):
    pts=[]
    for y in ys:
        seg=gx[y,x_est-18:x_est+18]*sign
        pts.append((y,x_est-18+np.argmax(seg)+0.5))
    p=np.array(pts); k,b=np.polyfit(p[:,0],p[:,1],1)
    r=p[:,1]-(k*p[:,0]+b); keep=np.abs(r)<2; k,b=np.polyfit(p[keep,0],p[keep,1],1); return k,b
# paper is brighter than frame: top edge dark->bright going down (+), bottom bright->dark (-)
kt,bt=line_h(est['t'],range(850,1100),+1)
kb,bb=line_h(est['b'],range(880,1080),-1)
kl,bl=line_v(est['l'],range(780,880),+1)
kr,br=line_v(est['r'],range(770,880),-1)
def inter(kh,bh,kv,bv):
    y=(kh*bv+bh)/(1-kh*kv);return (kv*y+bv,y)
q=[inter(kt,bt,kl,bl),inter(kt,bt,kr,br),inter(kb,bb,kr,br),inter(kb,bb,kl,bl)]
print([tuple(round(float(v),1) for v in p) for p in q]); json.dump([[float(a),float(b)] for a,b in q],open(sys.argv[2],'w'))
vis=im.copy(); cv2.polylines(vis,[np.array(q,np.int32)],True,(0,255,0),1)
cv2.imwrite(sys.argv[2]+'.png',cv2.resize(vis[700:1080,700:1240],None,fx=1.2,fy=1.2))
