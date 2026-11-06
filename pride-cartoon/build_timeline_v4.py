# Раунд 4: перестраивает timeline.json под озвучку v3 (новая хронология + «Прайд»).
# Берёт timeline_v2.json (монтаж v2), сдвигает/растягивает сцены под новые отметки голоса,
# вставляет новые планы и подставляет новые клипы раунда 4.
import json, os
D = os.path.dirname(os.path.abspath(__file__))
OLD = json.load(open(f"{D}/timeline_v2.json"))
NEW_OFF = json.load(open(f"{D}/audio/v3/offsets.json"))
oo, no = OLD["vo_offsets"]["offsets"], NEW_OFF["offsets"]
shots = {s["id"]: s for s in OLD["shots"]}
order = [s["id"] for s in OLD["shots"]]
scene_of = lambda sid: "s0" + sid[2]

# старые начала сцен (первый план сцены) и новые
A = {}
for sid in order:
    A.setdefault(scene_of(sid), shots[sid]["tl_in"])
scenes = sorted(A)
B = {k: (0.0 if k == "s01" else round(A[k] + no[k] - oo[k], 3)) for k in scenes}
PRIDE_IN = round(no["s085"] - 0.25, 3)
TOTAL = NEW_OFF["total"]
OLD_TOTAL = OLD["duration"]

def warp_scene(k):
    a0 = A[k]; a1 = A[scenes[scenes.index(k) + 1]] if k != "s09" else OLD_TOTAL
    b0 = B[k]; b1 = PRIDE_IN if k == "s08" else (B[scenes[scenes.index(k) + 1]] if k != "s09" else TOTAL)
    return lambda t: b0 + (t - a0) * (b1 - b0) / (a1 - a0)

def mk(id_, gen, clip_in, vo, desc, overlay=None):
    return {"id": id_, "gen": gen, "src": f"clips/{gen}.mp4" if gen else None, "clip_in": clip_in,
            "vo": vo, "desc": desc, "overlay": overlay}

def lay(seq, t0, t1):
    """seq: [(shot, вес)] → раскладывает план за планом в окне [t0, t1]"""
    W = sum(w for _, w in seq); t = t0; out = []
    for s, w in seq:
        d = (t1 - t0) * w / W
        s = dict(s); s["tl_in"] = round(t, 3); s["tl_out"] = round(t + d, 3); s["dur"] = round(d, 3)
        out.append(s); t += d
    out[-1]["tl_out"] = round(t1, 3); out[-1]["dur"] = round(t1 - out[-1]["tl_in"], 3)
    return out

def S(id_, **kw):
    s = dict(shots[id_]); s.update(kw)
    if "gen" in kw: s["src"] = f"clips/{kw['gen']}.mp4"
    return s

R4 = 0.3  # clip_in для новых клипов раунда 4
out = []
for k in scenes:
    ids = [i for i in order if scene_of(i) == k]
    w = warp_scene(k)
    t0 = B[k]; t1 = PRIDE_IN if k == "s08" else (B[scenes[scenes.index(k) + 1]] if k != "s09" else TOTAL)
    if k == "s02":
        seq = [(S("S02-01", gen="S02-01", clip_in=R4, desc="Крошечный зелёный домик (Секвойя) снаружи, кран вниз",
                  overlay={"type": "year", "text": "2007", "sub": "Секвойя"}), shots["S02-01"]["dur"]),
               (S("S02-02", gen="S02-02", clip_in=R4, desc="Зелёный домик внутри: Нино прикалывает набросок, Маша за столом",
                  overlay=None), shots["S02-02"]["dur"]),
               (S("S02-03", gen="S02-03", clip_in=R4, desc="Нино у окна в зелёном домике", overlay=None), shots["S02-03"]["dur"])]
        out += lay(seq, t0, t1); continue
    if k == "s03":
        ext = mk("S03-00", "G02", 0.13, "Дальше был синий домик побольше…", "Синий домик (Восточный) снаружи, кран вниз",
                 {"type": "year", "text": "2014", "sub": "Восточный"})
        vova = mk("S03-04b", "S03-04b", R4, "", "Вова входит в дверь, поправляет красный платок")
        seq = [(ext, 2.0), (S("S03-01", overlay=None), 1.8), (S("S03-02", overlay=None), 1.3), (S("S03-03", overlay=None), 1.0),
               (S("S03-04", overlay=None), 1.0), (vova, 1.0), (S("S03-05", overlay=None), 1.3),
               (S("S03-06", gen="S03-06", clip_in=R4, desc="Вся команда Восточного (7) за столом"), 2.45)]
        out += lay(seq, t0, t1); continue
    if k == "s05":
        doors = mk("S05-02b", "S05-02b", R4, "", "Нино распахивает двери красного дома, шестеро входят за ней")
        seq = [(S("S05-01"), 1.8),
               (S("S05-02", gen="S05-02", clip_in=R4, desc="Семеро с коробками стоят у красного дома (без ходьбы)",
                  overlay={"type": "year", "text": "2019", "sub": "Альфа"}), 2.0),
               (doors, 1.4),
               (S("S05-03", gen="S05-03", clip_in=R4, desc="Обживают красный дом всемером"), 1.9)]
        out += lay(seq, t0, t1); continue
    for i in ids:
        s = dict(shots[i])
        s["tl_in"] = round(w(s["tl_in"]), 3); s["tl_out"] = round(w(s["tl_out"]), 3); s["dur"] = round(s["tl_out"] - s["tl_in"], 3)
        if i == "S06-02":
            s["overlay"] = {"type": "photo_wall", "labels": ["2007", "2014", "2019", "2023", "2025"]}
        if i in ("S06-07", "S07-09", "S08-04", "S08-05", "S08-08", "S08-09", "S09-02"):
            s["gen"] = i; s["src"] = f"clips/{i}.mp4"; s["clip_in"] = R4
        if i == "S06-07": s["desc"] = "Команда с кофе на фоне стены наград, камера стоит"
        if i == "S07-09": s["desc"] = "Крупно Нино: тронута, рука на сердце, без слёз"
        if i == "S08-08": s["desc"] = "Нино в торце стола набрасывает скатерть на весь стол"
        if i == "S09-02": s["desc"] = "Маша и Миша несут торт к Нино"
        out.append(s)
    if k == "s08":
        seq = [(mk("SPR-01", "SPR-01", R4, "Тут появился тот самый Прайд —", "Львиный прайд идёт клином, львица впереди"), 2.2),
               (mk("SPR-02", "SPR-02", R4, "твоя преданная, смелая и неустрашимая", "Команда идёт тем же клином, Нино впереди"), 2.6),
               (mk("SPR-03", "SPR-03", R4, "первая линия.", "Крупно Нино во главе клина"), 1.87)]
        out += lay(seq, PRIDE_IN, B["s09"])

# проверка: без дыр и нахлёстов
for a, b in zip(out, out[1:]):
    assert abs(a["tl_out"] - b["tl_in"]) < 0.002, (a["id"], b["id"], a["tl_out"], b["tl_in"])
NEWT = {k: OLD[k] for k in ("fps", "width", "height")}
NEWT.update(duration=TOTAL, voiceover="audio/voiceover_full.mp3", vo_offsets=NEW_OFF, shots=out)
json.dump(NEWT, open(f"{D}/timeline.json", "w"), ensure_ascii=False, indent=1)
for s in out:
    print(f'{s["id"]:8} {s["tl_in"]:7.2f} {s["dur"]:5.2f} {str(s["gen"]):8} {s["clip_in"]}  {(s.get("overlay") or {}).get("text","")}')
print("total", out[-1]["tl_out"], "shots", len(out))
