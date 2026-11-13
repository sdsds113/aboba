"""Одиночные «щелчки»: блок 60×60 меняется в одном кадре, а за 2 кадра до и после неподвижен.
Запуск: python3 -I tools/pops.py video.mp4"""
import subprocess, sys
import numpy as np
W, H = 960, 540
p = subprocess.Popen(["ffmpeg", "-v", "error", "-i", sys.argv[1], "-vf", f"scale={W}:{H},format=gray", "-f", "rawvideo", "-"], stdout=subprocess.PIPE)
prev, hist = None, []
while True:
    b = p.stdout.read(W * H)
    if len(b) < W * H:
        break
    fr = np.frombuffer(b, np.uint8).astype(np.float32).reshape(H, W)
    if prev is not None:
        hist.append(np.abs(fr - prev).reshape(H // 60, 60, W // 60, 60).mean(axis=(1, 3)))
    prev = fr
h = np.array(hist)
off = float(sys.argv[2]) if len(sys.argv) > 2 else 0
pops = []
for k in range(2, len(h) - 2):
    m = (h[k] > 0.25) & (h[k - 1] < 0.02) & (h[k + 1] < 0.02) & (h[k - 2] < 0.02) & (h[k + 2] < 0.02)
    if m.any():
        pops.append((k + 1, int(m.sum()), float(h[k][m].max())))
print("щелчков:", len(pops))
for f, n, v in pops:
    print(f"  {off + f / 60:.2f} с, блоков {n}, сила {v:.2f}")
