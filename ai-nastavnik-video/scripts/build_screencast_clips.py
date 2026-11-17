"""Retime the screencast into per-scene clips that match the voiceover.

Each clip is a list of segments in VOICE time: (v_start, v_end, src_start, src_end).
src_start == src_end means a freeze frame. Output: 60 fps, cropped x 370..1520.
Usage: python build_screencast_clips.py <frames_dir (60fps jpg, 1-based)> <out_dir>
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
    "sc11_route": (63.40, 71.20, [
        (63.40, 69.60, 0.20, 0.20),
        (69.60, 70.40, 0.20, 1.00),
        (70.40, 71.20, 1.00, 1.80),
    ]),
}

def src_at(segs, v):
    for a, b, s0, s1 in segs:
        if a - 1e-9 <= v < b:
            return s0 if b == a else s0 + (s1 - s0) * (v - a) / (b - a)
    return segs[-1][3]

def main(frames, out):
    os.makedirs(out, exist_ok=True)
    nframes = len(os.listdir(frames))
    for name, (v0, v1, segs) in CLIPS.items():
        n = round((v1 - v0) * FPS_OUT)
        lines = []
        for i in range(n):
            s = src_at(segs, v0 + i / FPS_OUT)
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
    main(*sys.argv[1:3])
