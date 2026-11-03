# Раскладка «один план = одна генерация». Каждый план: стартовый кадр (картинка с референсами) → image-to-video, без склеек.
# Тайминги и оверлеи берутся из текущего timeline.json; скрипт переписывает в нём источник клипа и пишет storyboard.md.
import json, os
from sb_common import STYLE_IMG, CH, LOC, ch

D = os.path.dirname(os.path.abspath(__file__))
CLIP_LEN = 5.0  # длина генерации, с (Kling 5 с; во Flow можно 8 с)

STYLE_VID = ("Single continuous shot, no cuts, no scene changes. Keep the characters' faces, proportions, outfits and the "
             "Pixar-style 3D look exactly as in the start frame. Weighted natural character acting, subtle secondary motion in hair "
             "and fabric, cinematic camera. Characters never talk: mouths closed except for smiles and laughter. No text, letters, "
             "numbers or logos appear. Audio: none needed.")

TEAM = "the whole team of nine characters from the references (BOSS, GLASSES, VEST, SMILE, BLONDE, BEARD, ROUND, SPEAKER, BALD)"
KIDS = "the child versions of the team (from the kids lineup reference P02: same faces, hairstyles, glasses and outfit colors as the adults, no beards)"
KID_BOSS = "a 6-year-old girl version of BOSS from the kids lineup reference P02 (dark hair, warm brown eyes, a big black bow in her hair)"

# (id, референсы, стартовый кадр, анимация)
P = [
 ("S01-01", ["L03"],
  f"Wide establishing shot at early dawn: {LOC['RED_EXT']}, on a quiet street with a few trees, soft pink-gold sky, light mist, one window glowing warm. Low camera, slightly heroic angle.",
  "Slow cinematic push-in toward the red house. Mist drifts, a few leaves fall, windows light up warm one after another, a bird flies across the sky."),
 ("S02-01", ["L01"],
  f"Morning, high view from the treetops toward {LOC['BLUE_EXT']}. Sunlight, a bicycle leaning on the porch, a small potted plant by the door.",
  "Slow crane down from the treetops to the porch of the sky-blue house, sun flickers through leaves, birds."),
 ("S02-02", ["L02", "BOSS", "GLASSES", "BLONDE"],
  f"{LOC['BLUE_INT']}. {ch('BOSS')} stands at the cork board pinning a hand-drawn sketch of a little house (simple lines, no words). Behind her at two desks sit {ch('GLASSES')} and {ch('BLONDE')}.",
  "BOSS pins the sketch, steps back and looks at it with a quiet confident smile; GLASSES and BLONDE look up from their work and smile at her. Slow sideways dolly."),
 ("S02-03", ["L02", "BOSS"],
  f"Close-up portrait of {ch('BOSS')} by a small white-framed window inside the cozy blue house, golden morning light on her face, looking out of the window. Blurred desks and boxes behind.",
  "She slowly turns her head from the window toward camera and a confident warm smile forms. Dust particles glow in the sunbeam. Very slow push-in."),
 ("S03-01", ["L02", "BOSS", "SMILE"],
  f"Medium shot of the front door of the blue house from inside, the door half-open with bright daylight pouring in; in the doorway {ch('SMILE')} holding a cardboard box with a red tumbler cup on top, grinning; {ch('BOSS')} at the left edge of frame.",
  "SMILE steps inside grinning widely; BOSS steps toward him and welcomes him with an open hand gesture."),
 ("S03-02", ["L02", "VEST"],
  f"Medium shot in the doorway of the blue house, bright daylight behind: {ch('VEST')} standing with arms crossed, sizing up the room.",
  "Right away he slowly raises one eyebrow, then gives a tiny approving nod. Camera holds, very slight push-in."),
 ("S03-03", ["L02", "ROUND"],
  f"Medium shot in the doorway of the blue house: {ch('ROUND')} stepping in carrying a tall wobbly stack of books.",
  "Right away he stops, the book stack wobbles, he pushes his round glasses up with one finger and beams."),
 ("S03-04", ["L02", "SPEAKER"],
  f"Medium shot in the doorway of the blue house: {ch('SPEAKER')} walking in mid-gesture, a presentation clicker in his hand, eyes bright with enthusiasm.",
  "He walks in passionately explaining something with expressive hand gestures (mouth closed), eyebrows raised."),
 ("S03-05", ["L02", "BALD", "BEARD"],
  f"Comedic medium shot: {ch('BALD')} and {ch('BEARD')} both trying to squeeze through the narrow front door of the blue house at the same time, stuck shoulder to shoulder.",
  "They wiggle, turn their heads to look at each other in surprise, and both burst out laughing."),
 ("S03-06", ["L02", "все 9 персонажей"],
  f"Wide shot: {TEAM} crammed into the small cozy blue room around one wooden table, boxes everywhere, warm daylight, everyone laughing.",
  "Slow pull-back revealing the crowded little room; everyone laughs together, someone pats a shoulder."),
 ("S04-01", ["L02", "GLASSES", "BLONDE"],
  f"Night, view through a rain-streaked small white-framed window into the cozy blue house: desk lamps glowing, coffee mugs, {ch('GLASSES')} and {ch('BLONDE')} working late at the wooden desks, tired but focused.",
  "Slow push-in through the rainy glass; GLASSES rubs his tired eyes under his glasses, BLONDE keeps working. Quiet blue-and-amber late-night mood."),
 ("S04-02", ["L02", "VEST", "SPEAKER"],
  f"Night, inside the blue house: {ch('VEST')} and {ch('SPEAKER')} facing each other in front of a whiteboard covered only with arrows, circles and boxes (no words), lamp light.",
  "They argue with big passionate hand gestures and expressive faces (mouths closed)."),
 ("S04-03", ["L02", "BLONDE", "SMILE"],
  f"Night, inside the blue house: {ch('BLONDE')} crumpling a sheet of paper, {ch('SMILE')} next to her.",
  "BLONDE tosses the crumpled paper over her shoulder; SMILE catches it, unfolds it, they look at each other and laugh."),
 ("S04-04", ["BOSS", "VEST", "SMILE", "ROUND"],
  "Top-down close-up of a wooden table at night: several hands in different sleeves (cream tweed with black trim, navy suit, brown blazer, black blazer, white shirt) about to stack on top of each other.",
  "The hands stack one on top of another, then press down together. Warm lamp light."),
 ("S04-05", ["L02", "все 9 персонажей"],
  f"Dawn light bursting through the window of the blue house: {TEAM}, tired, at their desks.",
  "Everyone cheers, high-fives and hugs as the golden dawn light fills the room."),
 ("S05-01", ["L01"],
  f"Comedic exterior: {LOC['BLUE_EXT']}, visibly overstuffed — boxes pressed against every window, an elbow sticking out of one window, the roof slightly lifted. Daylight.",
  "The overstuffed little house wobbles, a window pops open and papers flutter out, the roof lifts a little and settles back."),
 ("S05-02", ["L03", "BOSS", "все 9 персонажей"],
  f"Wide shot: {TEAM} walking up a path carrying cardboard boxes and potted plants toward {LOC['RED_EXT']}; {ch('BOSS')} walks first, reaching the big doors.",
  "BOSS swings the big doors open, warm golden light pours out onto everyone; tracking shot."),
 ("S05-03", ["L04"],
  f"High wide shot of {LOC['RED_INT']}, the team as small figures unpacking boxes, hanging lamps, placing plants, sunlight streaming in.",
  "Crane shot rising up and back, revealing the huge bright space; someone on a ladder hangs a pendant lamp."),
 ("S06-01", ["L04"],
  "Close-up of a warm walnut wood wall inside the red house with a plain empty spot in the center, soft window light, shallow depth of field. (Remotion puts a calendar on top.)",
  "Locked-off static camera. Only soft light shifts slightly; dust particles float."),
 ("S06-03", ["L04", "BOSS", "все 9 персонажей"],
  f"Group photo pose in {LOC['RED_INT']}: {TEAM} hugging each other warmly like a big family, BOSS in the center, everyone laughing. Frontal, symmetrical, chest-height camera.",
  "Everyone squeezes closer in a warm family hug and laughs; tiny camera push-in."),
 ("S06-04", ["L04", "все 9 персонажей"],
  f"Same group in {LOC['RED_INT']}, now a serious 'clan' movie-poster pose: {TEAM} with arms crossed, stern faces, dramatic backlight.",
  "Slow-motion step toward camera, stern faces, coats sway; dramatic backlight."),
 ("S06-05", ["L04", "BOSS", "все 9 персонажей"],
  f"Formal 'dynasty' royal-portrait pose in {LOC['RED_INT']}: {ch('BOSS')} seated in a grand armchair in the center, the rest of {TEAM} standing around her, dignified, chins up.",
  "Everyone holds the dignified pose; a tiny proud chin-lift; soft painterly light."),
 ("S06-06", ["L03", "все 9 персонажей"],
  "View from outside through a big window of the red house: the team inside laughing together; a pigeon on the windowsill in the foreground.",
  "The pigeon tilts its head, watching them curiously; the team keeps laughing inside."),
 ("S06-07", ["L04"],
  f"Close-up of a shelf in {LOC['RED_INT']}: abstract golden and glass trophies and a monitor with colorful rising bar charts (shapes only, no numbers or words); behind them, out of focus, the team chatting with coffee mugs.",
  "Slow lateral dolly along the shelf, then a smooth rack focus to the background where the team shares a warm laugh over coffee."),
 ("S06-08", ["L04", "SPEAKER", "BEARD", "BLONDE"],
  f"{ch('SPEAKER')} tripping on a step while carrying a tall stack of folders; {ch('BEARD')} and {ch('BLONDE')} beside him.",
  "BEARD and BLONDE instantly reach out and catch him and the folders; relieved smiles."),
 ("S06-09", ["L04", "SMILE", "BALD"],
  f"Medium shot in {LOC['RED_INT']}: {ch('SMILE')} sneaking up behind {ch('BALD')} holding a striped paper party hat above his bald head, mischievous grin.",
  "SMILE pops the hat onto BALD's head; BALD sees himself in a glass partition reflection and bursts out laughing at himself, SMILE laughs too."),
 ("S06-10", ["L04", "ROUND", "VEST"],
  f"Evening, warm desk lamp: {ch('ROUND')} sitting alone at his desk, head in his hands, exhausted; in the background doorway {ch('VEST')}.",
  "VEST stops in the doorway and notices him, concern on his face; ROUND sighs."),
 ("S06-11", ["L04", "VEST", "ROUND", "GLASSES"],
  f"Evening: {ch('VEST')} sitting down next to {ch('ROUND')} at his desk, hand on his shoulder; {ch('GLASSES')} approaching with two steaming mugs of tea.",
  "GLASSES sets the tea down; ROUND looks up and smiles gratefully."),
 ("S06-12", ["L04", "BOSS", "все 9 персонажей"],
  f"Wide warm evening shot of {LOC['RED_INT']}: the long wooden table set with simple dishes, teapots and bread; {TEAM} pulling out chairs and sitting down, BOSS at the head of the table.",
  "Slow dolly along the table as everyone sits down and passes plates; someone pours tea; friendly laughter."),
 ("S07-01", ["L04", "BOSS"],
  f"Hero shot: {ch('BOSS')} walking toward camera through {LOC['RED_INT']}, warm backlight, people at desks in the soft-focus background.",
  "Slow push-in as she walks confidently; team members look up and turn toward her with smiles; gentle lens flare."),
 ("S07-02", ["L04", "BOSS", "все 9 персонажей"],
  f"Low-angle shot: {ch('BOSS')} in the center, {TEAM} gathered around her in a circle, looking at her, inspired.",
  "Camera slowly circles around her; the team leans in, inspired smiles."),
 ("S07-03", ["L04", "BOSS", "SPEAKER"],
  f"Medium two-shot: {ch('BOSS')} handing a large rolled blueprint tied with a red ribbon to {ch('SPEAKER')}.",
  "He takes it carefully, surprised by its weight, and looks at her."),
 ("S07-04", ["L04", "SPEAKER", "BOSS"],
  f"Close-up of {ch('SPEAKER')} holding the rolled blueprint, doubt in his eyes; BOSS out of focus in the foreground (over-the-shoulder).",
  "BOSS gives a calm reassuring nod; his face changes, he smiles, straightens his shoulders and grips the blueprint with confidence."),
 ("S07-05", ["L04", "BOSS", "BEARD"],
  f"Sunny corner of {LOC['RED_INT']}: {ch('BOSS')} gently guiding {ch('BEARD')} by the shoulder toward a desk by a big window, a beam of sunlight on the empty chair.",
  "He sits down, looks around — it fits him perfectly — and smiles; sunlight warms the frame."),
 ("S07-06", ["L04", "BOSS", "ROUND"],
  f"Over-the-shoulder: {ch('BOSS')} leaning behind {ch('ROUND')}, looking at his drawing tablet full of bright abstract colorful shapes (no text).",
  "She nods proudly; he turns and smiles back."),
 ("S07-07", ["L04"],
  "Macro close-up of a tiny green sprout in a small ceramic pot on a walnut desk, warm sunlight, dust particles glowing, red wall softly blurred behind.",
  "Magical time-lapse growth: the sprout grows into a small blooming tree with little white flowers, leaves unfurling."),
 ("S07-08", ["L04", "все 9 персонажей"],
  "Close shot of several team members standing side by side, all looking slightly off-camera toward someone they love and respect, warm grateful smiles.",
  "Slow lateral dolly across their faces; warm light."),
 ("S07-09", ["BOSS"],
  f"Emotional close-up of {ch('BOSS')}, warm soft light, eyes glistening, touched smile.",
  "Her eyes glisten, she slowly places her hand on her heart and smiles warmly."),
 ("S07-10", ["L03"],
  f"Night exterior: {LOC['RED_EXT']} with all windows glowing, starry sky above.",
  "Camera slowly tilts up from the roof to the starry sky. (Remotion adds the bright star.)"),
 ("S08-01", ["L04", "SMILE", "BALD"],
  f"Medium close-up in {LOC['RED_INT']}: {ch('SMILE')} with {ch('BALD')} beside him.",
  "SMILE turns to look directly into the camera, breaks the fourth wall, shrugs with a mischievous grin and raised eyebrows; BALD nods along."),
 ("S08-02", ["L04"],
  "An office desk in the red house with papers and a monitor showing a simple bar chart (shapes only).",
  "Magical transformation: papers fly up and turn into colorful confetti, the bar chart lines stretch out of the screen and become glowing string-light garlands, balloons pop into existence."),
 ("S08-03", ["L04", "GLASSES", "P02"],
  f"Medium shot in the festive red house: {ch('GLASSES')} standing next to a 7-year-old boy version of himself (same hair, tiny rectangular glasses, tiny suit), both looking at camera.",
  "They push their glasses up their noses at exactly the same moment, notice each other and grin."),
 ("S08-04", ["L04", "P02"],
  f"Festively decorated red house: {KIDS} running laughing with balloons, kid-height camera.",
  "Tracking shot at kid height as they run past laughing, balloons bobbing."),
 ("S08-05", ["L04", "BOSS", "P02", "все 9 персонажей"],
  f"Festive red house: the adults and their child versions holding hands in a big circle around a decorated table, {ch('BOSS')} in the middle, string lights, balloons.",
  "Slow circular camera move around the circle; BOSS laughs; string lights twinkle."),
 ("S08-06", ["P02"],
  f"Warm nostalgic cozy home with vintage furniture and soft golden lamp light: {KID_BOSS} running toward two adults seen only from the waist down (faces out of frame).",
  "The adults crouch and lift her up into a hug; she laughs."),
 ("S08-07", ["P02"],
  f"Close-up of {KID_BOSS}, gentle closed-lip smile, warm vintage lamp light.",
  "She smiles a little wider; soft light flickers."),
 ("S08-08", ["L04", "BOSS", "все 9 персонажей"],
  f"Close-up of {ch('BOSS')} smiling gently, in the red house, holding the edge of a large white tablecloth with a red ornamental folk pattern.",
  "Camera pulls back as she and the team spread the tablecloth over the long table; team members bring a big homemade pie and teapots."),
 ("S08-09", ["L04", "BOSS", "все 9 персонажей"],
  f"Warm lamp-lit group hug: {TEAM} embracing {ch('BOSS')} in the center, cozy red house interior, string lights bokeh.",
  "The hug tightens, she laughs softly with happy tears; slow push-in."),
 ("S09-01", ["L03"],
  f"Dusk exterior with light first snow falling: {LOC['RED_EXT']}, windows still dark, blue-hour sky, a few street lamps on.",
  "Gentle snowfall; the windows light up warm one after another until the whole house glows."),
 ("S09-02", ["L04", "SMILE", "BLONDE", "все 9 персонажей"],
  f"Festive long table full of people in the red house: {ch('SMILE')} and {ch('BLONDE')} carrying in a big birthday cake with plain candles (no numbers).",
  "Everyone at the table turns and cheers as the cake arrives."),
 ("S09-03", ["E13 (модель домика)", "L04"],
  "Close-up of a small handmade model of the sky-blue wooden house on a walnut shelf, warm candle glow; behind it, out of focus, a festive table with people and string lights.",
  "Slow rack focus from the little house to the celebrating team behind it."),
 ("S09-04", ["L04", "BOSS"],
  f"Close-up of {ch('BOSS')} leaning toward the birthday cake candles, team faces around her, smiling.",
  "She blows out the candles, everyone around smiles and cheers softly."),
 ("S09-05", ["L04", "все 9 персонажей"],
  f"Wide festive shot in the red house: {TEAM} around the table under string lights.",
  "A burst of confetti, everyone throws their arms up and cheers; a bright camera flash at the very end."),
]

T = json.load(open(f"{D}/timeline.json"))
by = {p[0]: p for p in P}
need = [s["id"] for s in T["shots"] if s["src"] != "REMOTION"]
assert sorted(need) == sorted(by), set(need) ^ set(by)

for s in T["shots"]:
    if s["src"] == "REMOTION":
        continue
    s["gen"] = s["id"]
    s["src"] = f"clips/{s['id']}.mp4"
    s["clip_in"] = round(max(0.0, min(0.3, CLIP_LEN - 0.1 - s["dur"])), 2)
SC = json.load(open(f"{D}/scene_clips.json")) if os.path.exists(f"{D}/scene_clips.json") else {}
for g, info in SC.items():
    if g.startswith("_"): continue
    for s in T["shots"]:
        if s["id"] in info["shots"]:
            s["gen"] = g; s["src"] = info["file"]; s["clip_in"] = info["shots"][s["id"]]
json.dump(T, open(f"{D}/timeline.json", "w"), ensure_ascii=False, indent=1)

def fmt(t): return f"{int(t//60)}:{t%60:05.2f}"
REF = {"L01": "L01 синий домик снаружи", "L02": "L02 синий домик внутри", "L03": "L03 красный дом снаружи", "L04": "L04 красный дом внутри",
       "P02": "P02 детские версии"}
REF.update({k: f"{k} (`{v[0]}`)" for k, v in CH.items()})

L = []; w = L.append
gens = [s for s in T["shots"] if s["src"] != "REMOTION"]
w("# Раскадровка: один план = одна генерация\n")
w(f"Ролик 16:9, {fmt(T['duration'])[:4]}. Генераций: **{len(gens)}**, по одной на план, без склеек внутри. Ещё 2 плана (стена с фото и финал) собирает Remotion из графики.\n")
w("## Почему так\nКогда в одну генерацию просят несколько планов через «CUT TO», после склейки модель рисует кадр заново, и лица со стилем уплывают. Здесь каждая генерация — это **один непрерывный план от готового стартового кадра**, а склейки делает монтаж.\n")
w("## Как генерировать каждый план\n")
w("1. **Стартовый кадр (картинка).** Nano Banana Pro во Flow, ChatGPT или Kling Image. Прикрепить референсы из столбца «Референсы»: персонажи — файлы из папки «Мультяшные для прайда», локации L01–L04 и лист детей P02 — из прошлых генераций. Для планов «все 9 персонажей» прикрепить всех девятерых: Nano Banana Pro принимает до 14 картинок.")
w("2. **Проверить картинку.** Лица похожи, стиль Pixar, текста нет. Если не так, перегенерировать: исправлять дальше на видео поздно.")
w("3. **Анимация.** Image-to-video, стартовый кадр — эта картинка, промпт — из блока «Анимация». Длина **5 с** (во Flow можно 8 с, лишнее обрежется).")
w("   - **Kling:** режим Image to Video. Если есть Elements, загрузить туда персонажей, тогда лица держатся ещё лучше.")
w("   - **Flow (Veo):** режим Frames to Video, только стартовый кадр.")
w("4. **Сохранить клип** под именем плана: `S03-02.mp4` и т. д. Положить в `pride-cartoon/clips/`. Монтаж подхватит его сам.\n")
w("**Главное правило:** в анимации одно действие и одно движение камеры. Если план очень короткий (меньше 1,5 с, отмечено ⚡), действие должно начинаться сразу.\n")
w("**Стиль стартового кадра** (уже вставлен в каждый промпт):\n```\n" + STYLE_IMG + "\n```\n")
w("**Хвост промпта анимации** (уже вставлен):\n```\n" + STYLE_VID + "\n```\n")
w("## Персонажи\n\n| Код | Файл на Диске |\n|---|---|")
for k, (f_, _) in CH.items(): w(f"| {k} | `{f_}` |")
w("\nЛокации L01–L04 и лист детских версий P02 — промпты в `legacy/storyboard_v1_multicut.md`, раздел «Подготовка». Сгенерировать их один раз и прикладывать как референсы.\n")
w("---\n## Планы\n")
cur = None
for s in T["shots"]:
    sc = s["id"][:3]
    if sc != cur:
        cur = sc; w(f"\n### Сцена {int(sc[1:])}\n")
    if s["src"] == "REMOTION":
        w(f"#### {s['id']} · {fmt(s['tl_in'])} · {s['dur']:.1f} с — собирает Remotion, не генерировать\n«{s['vo']}» — {s['desc']}\n"); continue
    _, refs, img, vid = by[s["id"]]
    flash = " ⚡" if s["dur"] < 1.5 else ""
    w(f"#### {s['id']} · {fmt(s['tl_in'])} · {s['dur']:.1f} с{flash}\n")
    w(f"Голос: «{s['vo']}»  ")
    w(f"Референсы: {', '.join(REF.get(r, r) for r in refs)}\n")
    w(f"**Стартовый кадр:**\n```\n{img} {STYLE_IMG}\n```")
    w(f"**Анимация (5 с):**\n```\n{vid} {STYLE_VID}\n```\n")
open(f"{D}/storyboard.md", "w").write("\n".join(L) + "\n")
print(len(gens), "generations")
