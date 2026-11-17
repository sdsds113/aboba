"""Rewire the route sentence to the fastest path and drop the widget lines:
"Заходишь в Alfa People, открываешь | раздел «Рабочее», | дальше AI-ментор и внутри будет AI-наставник. | В общем, …"
Segments are cut from the same speaker's take (voice_edit_v1.wav) with short fades at every splice.
Usage: python splice_route.py <in.wav> <in_words.json> <out.wav> <out_words.json>
"""
import json, subprocess, sys

SRC, WIN, OUT, WOUT = sys.argv[1:5]
dur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", SRC]).decode())
# (old_start, old_end, pause_after)
SEGS = [(0.0, 65.86, 0.0), (73.11, 74.085, 0.15), (67.10, 70.60, 0.0), (79.25, dur, 0.0)]
FADE = 0.012

parts, fc, new_t = [], [], 0.0
mapping = []
for i, (a, b, pause) in enumerate(SEGS):
    fc.append(f"[0:a]atrim={a:.4f}:{b:.4f},asetpts=PTS-STARTPTS,afade=t=in:d={FADE},afade=t=out:st={b - a - FADE:.4f}:d={FADE}[s{i}]")
    parts.append(f"[s{i}]")
    mapping.append((a, b, new_t))
    new_t += b - a
    if pause > 0:
        fc.append(f"aevalsrc=0|0:d={pause}:s=44100,aformat=channel_layouts=stereo[p{i}]")
        parts.append(f"[p{i}]")
        new_t += pause
fc.append("".join(parts) + f"concat=n={len(parts)}:v=0:a=1[out]")
subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", SRC, "-filter_complex", ";".join(fc), "-map", "[out]", "-c:a", "pcm_s16le", "-ar", "44100", OUT], check=True)

d = json.load(open(WIN))
words = []
for a, b, n0 in mapping:
    for w in d["words"]:
        if w["start"] >= a - 1e-3 and w["end"] <= b + 1e-3:
            nw = dict(w)
            nw["start"] = round(n0 + w["start"] - a, 3)
            nw["end"] = round(n0 + w["end"] - a, 3)
            words.append(nw)
d["words"] = words
d["duration"] = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", OUT]).decode())
d["route_splice"] = [{"old": [a, b], "new_start": round(n0, 3)} for a, b, n0 in mapping]
json.dump(d, open(WOUT, "w"), ensure_ascii=False, indent=1)
print("new duration", d["duration"])
print(" ".join(f"{w['text']}@{w['start']}" for w in words if 63 < w["start"] < 72))
