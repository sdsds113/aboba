"""Проверка плавности рендера.

Считает среднюю разницу соседних кадров (уменьшенных до 480×270, серые)
и ищет:
  * подтормаживания: кадр без изменений посреди движения (дубль);
  * рывки: разница кадра резко больше, чем у соседей (скачок, обрыв).

Запуск: python3 -I tools/smoothness.py out/video.mp4
"""

import subprocess
import sys

import numpy as np

path = sys.argv[1]
W, H = 480, 270
proc = subprocess.Popen(
    ["ffmpeg", "-v", "error", "-i", path, "-vf", f"scale={W}:{H},format=gray", "-f", "rawvideo", "-"],
    stdout=subprocess.PIPE,
)
prev = None
diffs = []
while True:
    buf = proc.stdout.read(W * H)
    if len(buf) < W * H:
        break
    fr = np.frombuffer(buf, np.uint8).astype(np.float32)
    if prev is not None:
        diffs.append(float(np.abs(fr - prev).mean()))
    prev = fr
d = np.array(diffs)
fps = 60
print(f"кадров: {len(d) + 1}, длительность {(len(d) + 1) / fps:.2f} с")

# Подтормаживания: d≈0, а у соседей заметное движение
stalls = []
for i in range(2, len(d) - 2):
    around = [d[i - 2], d[i - 1], d[i + 1], d[i + 2]]
    if d[i] < 0.02 and min(around) > 0.15:
        stalls.append(i + 1)
print("подтормаживания (дубль посреди движения):", [f"{s / fps:.2f}с" for s in stalls] or "нет")

# Рывки: всплеск относительно медианы окна ±6 кадров
jumps = []
for i in range(6, len(d) - 6):
    win = np.concatenate([d[i - 6 : i], d[i + 1 : i + 7]])
    med = np.median(win)
    if d[i] > 1.2 and d[i] > 4 * max(med, 0.08):
        jumps.append((i + 1, d[i], med))
print("рывки:")
for f, v, m in jumps:
    print(f"  {f / fps:7.2f} с  разница {v:.2f} при фоне {m:.2f}")
if not jumps:
    print("  нет")
np.save(path + ".diffs.npy", d)
