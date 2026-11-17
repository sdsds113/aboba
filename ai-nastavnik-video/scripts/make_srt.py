"""Build subtitles (.srt) from data/words_timing.json using the same cue rules as src/components/Subtitles.tsx.
Times are shifted by the voiceover offset (0.5 s) so they match the rendered video."""
import json, re, sys

VO_OFFSET = 3.0
MAX_CHARS = 46

def cues(words):
    out, cur = [], []
    def flush():
        nonlocal cur
        if cur: out.append({"start": cur[0]["start"], "end": cur[-1]["end"], "words": cur})
        cur = []
    for i, w in enumerate(words):
        if cur and len(" ".join(c["text"] for c in cur)) + 1 + len(w["text"]) > MAX_CHARS: flush()
        cur.append(w)
        nxt = words[i + 1] if i + 1 < len(words) else None
        gap = nxt["start"] - w["end"] if nxt else 1
        L = len(" ".join(c["text"] for c in cur))
        if re.search(r"[.?!:]$", w["text"]) and L > 12: flush()
        elif gap > 0.3 and L > 18: flush()
    flush()
    for i, c in enumerate(out):
        n = out[i + 1] if i + 1 < len(out) else None
        c["end"] = min(n["start"] - 0.04, c["end"] + 0.6) if n else c["end"] + 0.8
    return out

def ts(s):
    ms = int(round(s * 1000)); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); sec, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{sec:02d},{ms:03d}"

words = json.load(open(sys.argv[1]))["words"]
lines = []
for i, c in enumerate(cues(words), 1):
    lines += [str(i), f"{ts(c['start'] + VO_OFFSET)} --> {ts(c['end'] + VO_OFFSET)}", " ".join(w["text"] for w in c["words"]), ""]
open(sys.argv[2], "w", encoding="utf-8").write("\n".join(lines))
print(len([l for l in lines if "-->" in l]), "cues")
