"""Full re-voice: compress long pauses in the new TTS take, build word timings with canonical spelling,
and an old(v4)->new time map so all scenes keep their beat.
Usage: python new_voice.py <raw.wav> <stt.json> <v4_words.json> <out.wav> <out_words.json> <out_map.json>
"""
import json, re, subprocess, sys, difflib

RAW, STT, V4, OUT, WOUT, MOUT = sys.argv[1:7]
MAX_PAUSE = 0.30
log = subprocess.run(["ffmpeg", "-hide_banner", "-i", RAW, "-af", "silencedetect=noise=-38dB:d=0.2", "-f", "null", "-"], capture_output=True, text=True).stderr
st = [float(x) for x in re.findall(r"silence_start: ([0-9.]+)", log)]
en = [float(x) for x in re.findall(r"silence_end: ([0-9.]+)", log)]
dur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", RAW]).decode())
stt = [w for w in json.load(open(STT))["words"] if w["type"] == "word"]
first, last = stt[0]["start"], stt[-1]["end"]
keep, cur = [], max(0, first - 0.06)
for a, b in zip(st, en):
    if b <= cur or a >= last:
        continue
    if b - a > MAX_PAUSE:
        h = MAX_PAUSE / 2
        keep += [(cur, a + h), ]
        cur = b - h
keep.append((cur, min(dur, last + 0.3)))
fc, parts = [], []
for i, (a, b) in enumerate(keep):
    fc.append(f"[0:a]atrim={a:.4f}:{b:.4f},asetpts=PTS-STARTPTS[s{i}]"); parts.append(f"[s{i}]")
fc.append("".join(parts) + f"concat=n={len(parts)}:v=0:a=1[o]")
subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", RAW, "-filter_complex", ";".join(fc), "-map", "[o]", "-c:a", "pcm_s16le", OUT], check=True)
segs, acc = [], 0.0
for a, b in keep:
    segs.append((a, b, acc)); acc += b - a
def m(t):
    for a, b, n in segs:
        if a - 1e-6 <= t <= b + 1e-6: return n + t - a
        if t < a: return n
    return acc
# canonical spelling from the v4 words (same text), aligned by normalised form
v4 = json.load(open(V4))
norm = lambda s: re.sub(r"[^a-zа-яё0-9]", "", s.lower().replace("ё", "е").replace("alpha", "alfa").replace("mentor", "ментор"))
a_words = [norm(w["text"]) for w in v4["words"]]
b_words = [norm(w["text"]) for w in stt]
sm = difflib.SequenceMatcher(a=a_words, b=b_words, autojunk=False)
words, anchors = [], []
for tag, i1, i2, j1, j2 in sm.get_opcodes():
    if tag == "equal":
        for k in range(i2 - i1):
            o, n = v4["words"][i1 + k], stt[j1 + k]
            ns, ne = round(m(n["start"]), 3), round(m(n["end"]), 3)
            words.append({"text": o["text"], "start": ns, "end": ne})
            anchors.append([o["start"], ns]); anchors.append([o["end"], ne])
    else:
        for k in range(j1, j2):
            words.append({"text": stt[k]["text"], "start": round(m(stt[k]["start"]), 3), "end": round(m(stt[k]["end"]), 3)})
        print("diff", tag, a_words[i1:i2], b_words[j1:j2])
newdur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", OUT]).decode())
anchors.sort()
clean = []
for o, n in anchors:
    if not clean or (o > clean[-1][0] + 1e-3 and n >= clean[-1][1]):
        clean.append([o, n])
json.dump({"duration": newdur, "voice": "ElevenLabs Nikolay, eleven_v4, speed 1.08, pauses <= 0.30 s", "words": words}, open(WOUT, "w"), ensure_ascii=False, indent=1)
json.dump({"note": "old (v4) voice time -> new voice time anchors", "anchors": clean, "old_duration": v4["duration"], "new_duration": newdur}, open(MOUT, "w"), indent=0)
print("new duration", newdur, "anchors", len(clean))
