"""Generate Remotion data: voice placements, subtitle chunks (from TTS char alignment), cleanup rects, wipe mask."""
import json, os, re, subprocess

ACH = os.environ.get('ACH_WORK', 'work')  # папка с tts/, lines.json, wipe_mask.json
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'src', 'data')
FPS = 60
lines = json.load(open(f'{ACH}/lines.json'))

ALIAS = {'1': 'один', '2': 'два', '3': 'три', 'wow': 'вау', 'alfa': 'альфа', 'people': 'пипл'}


def norm(w):
    w = w.lower().replace('ё', 'е')
    w = re.sub(r'[^\wа-я-]', '', w)
    return ALIAS.get(w, w)


voice, subs = [], []
for li, ln in enumerate(lines):
    al = json.load(open(f"{ACH}/tts/{ln['id']}.align.json"))
    chars, st, en = al['characters'], al['character_start_times_seconds'], al['character_end_times_seconds']
    text = ''.join(chars)
    # words with char spans
    words = [(m.start(), m.end(), norm(m.group())) for m in re.finditer(r'[\wЁёА-Яа-я-]+', text)]
    speech = [i for i, c in enumerate(chars) if c.strip() and c not in '.,!?:;—«»']
    s0 = ln['slot'][0]
    speech_end = s0 + en[speech[-1]]
    voice.append({'id': ln['id'], 'src': f"generated/voice/{ln['id']}.mp3", 'start': round(s0, 3), 'speechEnd': round(speech_end, 3)})
    nxt_start = lines[li + 1]['slot'][0] if li + 1 < len(lines) else 1e9
    ptr = 0
    starts = []
    for k, chunk in enumerate(ln['sub']):
        first = norm(re.findall(r'[\wЁёА-Яа-я-]+', chunk)[0])
        if k == 0:
            starts.append(s0 + st[speech[0]])
            ptr = 1
            continue
        for wi in range(ptr, len(words)):
            if words[wi][2] == first or words[wi][2].startswith(first) or first.startswith(words[wi][2]):
                starts.append(s0 + st[words[wi][0]])
                ptr = wi + 1
                break
        else:
            raise SystemExit(f"{ln['id']}: chunk '{chunk}' not found")
    for k, chunk in enumerate(ln['sub']):
        a = starts[k] - 0.04
        b = starts[k + 1] - 0.02 if k + 1 < len(starts) else min(speech_end + 0.35, nxt_start - 0.06)
        subs.append({'line': ln['id'], 'text': chunk, 'from': round(a, 3), 'to': round(b, 3)})

json.dump(voice, open(f'{OUT}/voice.json', 'w'), ensure_ascii=False, indent=1)
for s in subs:
    print(f"{s['from']:6.2f}-{s['to']:6.2f} {s['text']}")

# Old burned-in narrator subtitles to erase (seconds, full-res px). Meme line 37.5–39.47 is kept on purpose.
# Screen 21.90–32.77 is fully replaced, so no cleanup is needed there.
old = [
    (0.05, 2.58, 484, 1436, 918, 1040), (2.58, 4.65, 482, 1438, 942, 1016), (4.65, 6.55, 582, 1338, 942, 1016),
    (15.15, 18.35, 650, 1270, 928, 1032),
    (32.75, 33.75, 530, 1390, 918, 1040), (33.75, 37.35, 660, 1260, 918, 1044),
    (39.52, 41.64, 686, 1234, 918, 1040), (41.6, 42.31, 856, 1063, 940, 1018), (42.28, 43.86, 638, 1282, 918, 1040),
    (43.84, 45.56, 700, 1220, 918, 1040), (45.53, 46.17, 856, 1063, 940, 1018), (46.14, 48.65, 494, 1426, 918, 1040),
    (48.64, 49.94, 594, 1326, 940, 1018), (49.9, 50.54, 856, 1063, 940, 1018), (50.51, 53.25, 570, 1350, 918, 1040),
    (53.24, 56.22, 474, 1446, 918, 1040), (56.21, 56.96, 600, 1320, 940, 1018), (56.94, 59.33, 586, 1334, 918, 1040),
    (59.6, 60.83, 464, 1456, 940, 1018), (60.81, 62.96, 506, 1414, 940, 1018), (63.2, 65.09, 496, 1424, 940, 1018),
    (65.07, 67.16, 564, 1356, 918, 1040), (67.7, 70.16, 518, 1402, 918, 1040), (70.14, 71.8, 514, 1406, 940, 1018),
    (71.78, 74.6, 544, 1378, 918, 1040), (74.58, 76.16, 480, 1440, 940, 1018), (76.14, 79.1, 504, 1416, 918, 1044),
    (80.98, 82.96, 694, 1226, 918, 1040), (82.94, 85.35, 612, 1308, 905, 1028),
]
M = 8  # margin px
clean = [{'from': a, 'to': b, 'x': x0 - M, 'y': y0 - M, 'w': x1 - x0 + 2 * M, 'h': y1 - y0 + 2 * M} for a, b, x0, x1, y0, y1 in old]
json.dump(clean, open(f'{OUT}/cleanup.json', 'w'), indent=1)
# Новая плашка не меньше старой, которую она закрывает: зона очистки всегда остаётся под ней.
for sb in subs:
    if sb['line'] == 'L06' and sb['to'] > 37.45:
        sb['to'] = 37.45
    ov = [r for r in old if r[0] < sb['to'] and r[1] > sb['from'] and min(r[1], sb['to']) - max(r[0], sb['from']) > min(0.5, 0.45 * (sb['to'] - sb['from']))]
    sb['minW'] = max([r[3] - r[2] for r in ov], default=0)
    sb['minH'] = max([r[5] - r[4] for r in ov], default=0)
    best = max(ov, key=lambda r: min(r[1], sb['to']) - max(r[0], sb['from']), default=None)
    sb['cy'] = (best[4] + best[5]) / 2 if best else 979
json.dump(subs, open(f'{OUT}/subtitles.json', 'w'), ensure_ascii=False, indent=1)

# Wipe mask for the 79–80 s patch: per frame, y of the green wipe edge per column.
wm = json.load(open(f'{ACH}/wipe_mask.json'))
mask = {int(k): v for k, v in wm['mask'].items() if 4819 <= int(k) <= 4836}
json.dump({'cols': wm['cols'], 'frames': mask}, open(f'{OUT}/wipeMask.json', 'w'))
print('voice', len(voice), 'subs', len(subs), 'clean', len(clean), 'mask frames', len(mask))
