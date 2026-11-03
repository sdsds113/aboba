# Регистрирует клип сцены в монтаже: находит склейки (ffmpeg scene detect), раскладывает планы сцены по кускам,
# пишет scene_clips.json и пересобирает timeline.json.  Запуск: python3 register_clip.py G05 [порог]
import json, os, re, subprocess, sys
D = os.path.dirname(os.path.abspath(__file__))
g = sys.argv[1]; thr = float(sys.argv[2]) if len(sys.argv) > 2 else 0.3
plan = json.load(open(f"{D}/kling_plan.json"))
T = {s["id"]: s for s in json.load(open(f"{D}/timeline.json"))["shots"]}
clip = f"{D}/clips/{g}.mp4"
cuts_ids = plan[g]["cuts"] if "cuts" in plan[g] else json.load(open(f"{D}/scene_clips.json"))[g]["shots"].keys()
cuts_ids = list(cuts_ids); durs = [T[c]["dur"] for c in cuts_ids]; n = len(cuts_ids)

dur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", clip]))
o = subprocess.run(["ffmpeg", "-hide_banner", "-i", clip, "-vf", f"select='gt(scene,{thr})',showinfo", "-f", "null", "-"],
                   capture_output=True, text=True).stderr
cuts = [float(x) for x in re.findall(r"pts_time:([\d.]+)", o)]
cuts = [c for c in cuts if 0.4 < c < dur - 0.4]
warn = ""
if len(cuts) != n - 1:
    warn = f"найдено склеек {len(cuts)}, ожидалось {n-1}: раскладка по пропорциям, проверить глазами"
    tot = sum(durs); acc = 0; cuts = []
    for d in durs[:-1]: acc += d; cuts.append(dur * acc / tot)
edges = [0.0] + cuts + [dur]
shots = {}
for i, (cid, d) in enumerate(zip(cuts_ids, durs)):
    s, e = edges[i], edges[i + 1]
    room = (e - s) - d
    if room >= 0:
        ci = s + min(0.4, max(0.1, room / 2)) if room > 0.2 else s + room / 2
    else:
        ci = max(0.0, e - d); warn += f" | {cid}: кусок {e-s:.2f}с короче плана {d:.2f}с"
    shots[cid] = round(ci, 2)
SC = json.load(open(f"{D}/scene_clips.json")) if os.path.exists(f"{D}/scene_clips.json") else {}
SC[g] = {"file": f"clips/{g}.mp4", "shots": shots, "clip_dur": round(dur, 2), "cuts": [round(c, 2) for c in cuts]}
json.dump(SC, open(f"{D}/scene_clips.json", "w"), ensure_ascii=False, indent=1)
subprocess.run([sys.executable, f"{D}/build_storyboard.py"], check=True, capture_output=True)
print(g, f"{dur:.2f}s", "cuts", [round(c, 2) for c in cuts], "shots", shots, ("WARN: " + warn) if warn else "")
