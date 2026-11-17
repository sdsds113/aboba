"""Retime the screencast into per-scene clips that match the voiceover.

Each clip is a list of segments in VOICE time: (v_start, v_end, src_start, src_end).
src_start == src_end means a freeze frame. Output: 60 fps, full 1920x1080 frame.
Usage: python build_screencast_clips.py <frames_dir (60fps jpg, 1-based)> <out_dir> [data/time_map.json]
"""
import os, subprocess, sys, tempfile

FPS_OUT, FPS_SRC = 60, 60
CLIPS = {
    # scene 7: mode -> rubric (fast) -> topic typing -> freeze on stepper
    "sc07_setup": (40.00, 48.00, [
        (40.00, 42.19, 1.20, 1.20),
        (42.19, 43.62, 1.90, 4.40),
        (43.62, 44.10, 4.42, 7.45),
        (44.10, 45.10, 8.40, 9.75),
        (45.10, 48.00, 9.75, 9.75),
    ]),
    # scene 9: start training -> materials -> feedback with bold text
    "sc09_answer": (53.00, 60.60, [
        (53.00, 54.30, 10.55, 12.13),
        (54.30, 55.00, 12.13, 12.60),
        (55.00, 57.90, 12.60, 12.60),
        (57.90, 60.60, 13.60, 13.60),
    ]),
    # scene 11: catalog route, then click "Новый чат"
}

def src_at(segs, v):
    for a, b, s0, s1 in segs:
        if a - 1e-9 <= v < b:
            return s0 if b == a else s0 + (s1 - s0) * (v - a) / (b - a)
    return segs[-1][3]

def load_map(path):
    """old->new voice-time anchors (data/time_map.json); identity when absent."""
    if not path:
        return lambda t: t, lambda t: t
    import json
    A = json.load(open(path))["anchors"]
    def lerp(t, f, g):
        if t <= A[0][f]:
            return A[0][g] + t - A[0][f]
        for a, b in zip(A, A[1:]):
            if t <= b[f]:
                return a[g] + (t - a[f]) * (b[g] - a[g]) / max(1e-6, b[f] - a[f])
        return A[-1][g] + t - A[-1][f]
    return (lambda t: lerp(t, 0, 1)), (lambda t: lerp(t, 1, 0))

def main(frames, out, tmap=None):
    os.makedirs(out, exist_ok=True)
    nframes = len(os.listdir(frames))
    o2n, n2o = load_map(tmap)
    for name, (v0, v1, segs) in CLIPS.items():
        n0, n1 = o2n(v0), o2n(v1)
        n = round((n1 - n0) * FPS_OUT)
        lines = []
        for i in range(n):
            s = src_at(segs, n2o(n0 + i / FPS_OUT))
            idx = min(nframes, max(1, round(s * FPS_SRC) + 1))
            lines.append(f"file '{os.path.join(frames, f'{idx:05d}.jpg')}'\nduration {1/FPS_OUT:.6f}")
        lines.append(lines[-1].split("\n")[0])
        with tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False) as f:
            f.write("\n".join(lines) + "\n")
            lst = f.name
        dst = os.path.join(out, f"{name}.mp4")
        subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-f", "concat", "-safe", "0",
                        "-i", lst, "-r", str(FPS_OUT), "-frames:v", str(n), "-c:v", "libx264", "-crf", "12",
                        "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart", dst], check=True)
        print(name, n, "frames", f"{v0}->{v1}")

if __name__ == "__main__":
    main(*sys.argv[1:4])
