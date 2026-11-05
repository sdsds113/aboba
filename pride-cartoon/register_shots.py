# Подключает поплановые клипы clips/Sxx-yy.mp4 (раунд 3) в монтаж: scene_clips.json -> build_storyboard.py
import json, os, subprocess, sys, glob, re
D = os.path.dirname(os.path.abspath(__file__))
T = {s["id"]: s for s in json.load(open(f"{D}/timeline.json"))["shots"]}
SC = json.load(open(f"{D}/scene_clips.json"))
IN = {"S09-05": 0.2}  # финал: берём с начала, стоп-кадр в конце
for f in sorted(glob.glob(f"{D}/clips/S??-??.mp4")):
    sid = os.path.basename(f)[:-4]
    if sid not in T: continue
    dur = float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",f]))
    need = T[sid]["dur"]
    ci = IN.get(sid, 0.3)
    ci = round(max(0.0, min(ci, dur - need - 0.05)), 2)
    SC[sid] = {"file": f"clips/{sid}.mp4", "shots": {sid: ci}, "clip_dur": round(dur, 2), "note": "раунд 3, Kling 4.0, отдельный клип на план"}
    print(sid, f"{dur:.2f}s", "in", ci, "need", need)
json.dump(SC, open(f"{D}/scene_clips.json", "w"), ensure_ascii=False, indent=1)
subprocess.run([sys.executable, f"{D}/build_storyboard.py"], check=True, capture_output=True)
print("ok")
