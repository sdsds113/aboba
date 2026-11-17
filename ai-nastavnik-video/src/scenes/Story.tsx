import React from "react";
import { Img, interpolate } from "remotion";
import { openSmoothPath } from "../components/Blobs";
import { Character, Prop, prop, propOr } from "../components/Elements";
import { loopAround, Thread } from "../components/Thread";
import { clamp, EASE, EASE_IN_OUT, float, keyframes, ramp, springAt, useVT } from "../lib/core";

/**
 * Element-only scenes (no character, no on-screen words). Voice time.
 * S1–S3 consultations & questions · S4 pile · S5 puzzle · S6 AI-наставник · S8 tea · S13 finale.
 */

const fade = (t: number, a: number, b: number, c: number, d: number) =>
  interpolate(t, [a, b, c, d], [0, 1, 1, 0], { ...clamp, easing: EASE });

const loopCircle = (x: number, y: number, r: number, turns = 1.1, start = -2.4) => {
  const pts: string[] = [];
  const N = 36;
  for (let i = 0; i <= N; i++) {
    const a = start + (i / N) * Math.PI * 2 * turns;
    const rr = r * (1 + 0.035 * Math.sin(i * 1.7) + (i / N) * 0.05);
    pts.push(`${i === 0 ? "M" : "L"} ${(x + Math.cos(a) * rr).toFixed(1)} ${(y + Math.sin(a) * rr * 0.96).toFixed(1)}`);
  }
  return pts.join(" ");
};

/* ---------------- S1–S3: consultations, questions, a signal to refresh ---------------- */
export const SceneQuestions: React.FC = () => {
  const t = useVT();
  const op = fade(t, -0.4, 0.1, 18.0, 18.5);
  const headset = keyframes(t, [
    { t: 0, x: 560, y: 470, s: 460 },
    { t: 7.6, x: 560, y: 470, s: 460 },
    { t: 8.4, x: 960, y: 500, s: 400 },
    { t: 13.9, x: 960, y: 500, s: 400 },
    { t: 14.6, x: 640, y: 480, s: 420 },
  ]);
  // loading arc that stalls on "зависаешь"
  const spin = interpolate(t, [6.98, 7.35], [0, 0.55], { ...clamp, easing: EASE });
  return (
    <div style={{ position: "absolute", inset: 0, opacity: op }}>
      <Prop t={t} src={propOr("N01_headset", "P01_bubble_blue")} x={headset.x} y={headset.y} size={headset.s} enter={0.1} exit={17.0} seed={1} />
      {/* Max opens the story */}
      {t < 8.3 ? <Character t={t} timeline={[[-0.5, "E01"], [6.98, "E02"]]} x={1400} bottom={1100} height={1180} enter={0.0} exit={7.55} hue="red" /> : null}
      {/* three consultations in a row */}
      <Prop t={t} src={prop("P01_bubble_blue")} x={260} y={270} size={180} enter={2.0} exit={6.2} seed={11} rotate={-6} />
      <Prop t={t} src={prop("P01_bubble_violet")} x={860} y={240} size={180} enter={2.6} exit={6.3} seed={12} rotate={6} />
      <Prop t={t} src={prop("P01_bubble_blue")} x={880} y={720} size={180} enter={3.2} exit={6.4} seed={13} rotate={4} flip />
      {/* stalled loader + hourglass */}
      <Thread d={loopCircle(560, 470, 300, 1, -Math.PI / 2)} to={spin} from={ramp(t, 7.6, 7.9) * spin} width={7} opacity={1 - ramp(t, 7.6, 7.9)} />
      <Prop t={t} src={prop("P02_hourglass")} x={900} y={300} size={230} enter={6.98} exit={7.85} seed={2} rotate={-8} />
      {/* one, two, three questions */}
      <Prop t={t} src={prop("P01_bubble_red")} x={560} y={300} size={230} enter={7.83} exit={13.99} seed={3} rotate={-8} />
      <Prop t={t} src={prop("P01_bubble_red")} x={1360} y={260} size={230} enter={9.0} exit={13.99} seed={4} rotate={7} flip />
      <Prop t={t} src={prop("P01_bubble_red")} x={1420} y={700} size={230} enter={9.68} exit={13.99} seed={5} rotate={-4} />
      {/* "in which tab was it" */}
      <Prop
        t={t}
        src={prop("P03_browser_tabs_stack")}
        x={520}
        y={690}
        size={380}
        enter={10.4}
        exit={13.99}
        seed={6}
        rotate={-5 + 5 * (springAt(t, 11.72, { damping: 22, stiffness: 120 }) - springAt(t, 12.1, { damping: 22, stiffness: 120 }) + springAt(t, 12.5, { damping: 22, stiffness: 120 }))}
      />
      {/* just a signal → time to refresh */}
      <Prop t={t} src={propOr("N02_bell", "P02_hourglass")} x={1260} y={460} size={460} enter={15.5} exit={17.1} seed={7} rotate={Math.sin(t * 9) * 6 * Math.exp(-Math.max(0, t - 15.7) * 2)} />
      <Prop t={t} src={propOr("N03_refresh", "P10_ai_nastavnik_icon_hd")} x={1260} y={460} size={480} enter={17.2} seed={8} rotate={interpolate(t, [17.2, 18.5], [0, 140], { ...clamp, easing: EASE_IN_OUT })} />
    </div>
  );
};

/* ---------------- S4: the pile of materials, long & boring ---------------- */
const PILE: [string, number, number, number, number][] = [
  ["P04_folder_violet", 470, 270, 220, 0.0],
  ["P05_paper_sheet_a", 1450, 240, 200, 0.12],
  ["P06_sticky_note_violet", 1600, 600, 200, 0.24],
  ["P04_folder_red", 640, 650, 280, 0.16],
  ["P05_paper_sheet_b", 1250, 560, 260, 0.32],
  ["P06_sticky_note_violet", 900, 330, 200, 0.44],
  ["P04_folder_red", 1350, 820, 240, 0.52],
  ["P05_paper_sheet_a", 330, 520, 230, 0.38],
  ["P04_folder_violet", 960, 600, 300, 0.6],
];

const qPath = (x: number, y: number) =>
  `M ${x - 70} ${y - 40} C ${x - 80} ${y - 150} ${x + 90} ${y - 170} ${x + 95} ${y - 60} C ${x + 100} ${y + 10} ${x + 10} ${y + 20} ${x + 5} ${y + 90}`;

export const ScenePile: React.FC = () => {
  const t = useVT();
  const op = fade(t, 18.2, 18.8, 27.4, 27.9);
  const spread = interpolate(t, [21.0, 22.4], [0, 1], { ...clamp, easing: EASE });
  const crawl = interpolate(t, [25.0, 27.6], [0, 1], { ...clamp });
  return (
    <div style={{ position: "absolute", inset: 0, opacity: op }}>
      {PILE.map(([src, x, y, size, d], i) => (
        <Prop key={i} t={t} src={prop(src)} x={960 + (x - 960) * (1 + 0.2 * spread)} y={540 + (y - 540) * (1 + 0.14 * spread)} size={size} enter={19.9 + d} enterStyle="drop" seed={40 + i} rotate={(i % 2 ? 1 : -1) * (6 + i * 2)} exit={24.85 + i * 0.03} />
      ))}
      <Thread d={qPath(960, 250)} to={ramp(t, 22.73, 23.5)} from={ramp(t, 24.8, 25.2)} width={9} />
      {t > 23.3 && t < 25.3 ? (
        <div style={{ position: "absolute", left: 965 - 10, top: 250 + 125 - 10, width: 20, height: 20, borderRadius: 10, background: "#fff", opacity: ramp(t, 23.35, 23.6) * (1 - ramp(t, 24.9, 25.2)) }} />
      ) : null}
      {/* a snail crawls across — long and boring */}
      <Prop t={t} src={propOr("N04_snail", "P02_hourglass")} x={interpolate(crawl, [0, 1], [620, 1300])} y={540} size={560} enter={25.1} seed={9} amp={2} />
    </div>
  );
};

/* ---------------- S5: find the gap and close it ---------------- */
const PZ = { x: 960, y: 480, size: 780 };
const HOLE = { x: PZ.x + ((719 - 512) / 1024) * PZ.size, y: PZ.y + (4 / 1024) * PZ.size, w: (228 / 1024) * PZ.size, h: (356 / 1024) * PZ.size };

export const ScenePuzzle: React.FC = () => {
  const t = useVT();
  if (t < 27.8) return null;
  const op = fade(t, 27.8, 28.3, 32.3, 32.8);
  const e = springAt(t, 27.9, { damping: 26, stiffness: 70 });
  const f = float(t, 61, 5, 6);
  const mag = keyframes(t, [
    { t: 28.5, x: 600, y: 800 },
    { t: 29.4, x: 760, y: 560 },
    { t: 30.4, x: HOLE.x, y: HOLE.y },
    { t: 31.2, x: HOLE.x, y: HOLE.y },
    { t: 31.6, x: HOLE.x + 300, y: HOLE.y + 380 },
  ]);
  const magOn = ramp(t, 28.5, 29.0) * (1 - ramp(t, 31.2, 31.6));
  const MAG = 430;
  const lensR = MAG * 0.215;
  const pp = interpolate(t, [31.0, 31.62], [0, 1], { ...clamp, easing: EASE_IN_OUT });
  const pieceImg = (HOLE.h * 1.04 * 1024) / 816;
  const px = interpolate(pp, [0, 1], [1550, HOLE.x]);
  const py = interpolate(pp, [0, 1], [260, HOLE.y]) - Math.sin(pp * Math.PI) * 60;
  const boardStyle: React.CSSProperties = { position: "absolute", left: PZ.x - PZ.size / 2, top: PZ.y - PZ.size / 2, width: PZ.size, height: PZ.size };
  return (
    <div style={{ position: "absolute", inset: 0, translate: `${f.x}px ${f.y}px`, opacity: op * Math.min(1, e * 1.3) }}>
      <div style={{ position: "absolute", inset: 0, scale: 0.88 + 0.12 * e, transformOrigin: `${PZ.x}px ${PZ.y}px`, rotate: `${f.r - 2}deg` }}>
        <Img src={prop("P08_puzzle_board")} style={{ ...boardStyle, filter: "drop-shadow(0 30px 40px rgba(0,0,0,.5))" }} />
        <Thread d={loopAround(HOLE.x - HOLE.w / 2, HOLE.y - HOLE.h / 2, HOLE.x + HOLE.w / 2, HOLE.y + HOLE.h / 2, 7, 26)} to={ramp(t, 30.39, 30.95)} from={ramp(t, 31.1, 31.5)} width={6} />
        {pp > 0 ? (
          <Img src={prop("P09_puzzle_piece_red")} style={{ position: "absolute", left: px - pieceImg / 2, top: py - pieceImg / 2, width: pieceImg, height: pieceImg, opacity: Math.min(1, pp * 3), rotate: `${(1 - pp) * -40}deg`, filter: "drop-shadow(0 16px 20px rgba(0,0,0,.45))" }} />
        ) : null}
      </div>
      {magOn > 0.01 ? (
        <div style={{ position: "absolute", inset: 0, opacity: magOn }}>
          <div style={{ position: "absolute", left: mag.x - lensR, top: mag.y - lensR, width: lensR * 2, height: lensR * 2, borderRadius: "50%", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: -(mag.x - lensR), top: -(mag.y - lensR), width: 1920, height: 1080, scale: 1.5, transformOrigin: `${mag.x}px ${mag.y}px` }}>
              <Img src={prop("P08_puzzle_board")} style={boardStyle} />
            </div>
          </div>
          <Img src={prop("P07_magnifier")} style={{ position: "absolute", left: mag.x - MAG * 0.386, top: mag.y - MAG * 0.38, width: MAG, height: MAG, filter: "drop-shadow(0 26px 30px rgba(0,0,0,.5))" }} />
        </div>
      ) : null}
    </div>
  );
};

/* ---------------- S6: AI-наставник — the hero ---------------- */
const wave = (x: number, t: number) => 860 + Math.sin(x / 150 - t * 1.6) * 18 + Math.sin(x / 70 - t * 0.9) * 4;
const wavePath = (t: number) => {
  const pts: [number, number][] = [];
  for (let x = -40; x <= 1960; x += 40) pts.push([x, wave(x, t)]);
  return openSmoothPath(pts);
};

export const SceneHero: React.FC = () => {
  const t = useVT();
  const op = fade(t, 32.5, 33.1, 39.9, 40.4);
  const e = springAt(t, 33.2, { damping: 26, stiffness: 60 });
  const pos = keyframes(t, [
    { t: 33.2, x: 960, y: 470, s: 600 },
    { t: 37.4, x: 960, y: 470, s: 600 },
    { t: 38.2, x: 960, y: 390, s: 480 },
  ]);
  const f = float(t, 70, 8, 5);
  const orbit = (k: number) => {
    const a = (t - 35.4) * 0.6 + k * Math.PI;
    return [960 + Math.cos(a) * 500, 470 + Math.sin(a) * 170] as [number, number];
  };
  const o1 = orbit(0);
  const o2 = orbit(1);
  const toss = interpolate(t, [38.74, 39.5], [0, 1], { ...clamp, easing: EASE_IN_OUT });
  return (
    <div style={{ position: "absolute", inset: 0, opacity: op }}>
      <Thread d={loopCircle(pos.x, pos.y + f.y, pos.s * 0.56, 1.08)} to={ramp(t, 33.9, 34.7)} from={ramp(t, 37.3, 37.7)} width={6} />
      <Img
        src={prop("P10_ai_nastavnik_icon_hd")}
        style={{ position: "absolute", left: pos.x - pos.s / 2, top: pos.y - pos.s / 2, width: pos.s, height: pos.s, translate: `${f.x}px ${f.y}px`, opacity: Math.min(1, e * 1.3), scale: 0.88 + 0.12 * e, filter: `blur(${(1 - Math.min(1, e)) * 10}px) drop-shadow(0 30px 40px rgba(0,0,0,.5))` }}
      />
      {/* personal trainer: dumbbell and cap circle the hero */}
      <Prop t={t} src={prop("P11_dumbbell_blue")} x={o1[0]} y={o1[1]} size={280} enter={35.43} exit={37.5} seed={71} />
      <Prop t={t} src={prop("P13_graduation_cap")} x={o2[0]} y={o2[1]} size={270} enter={35.7} exit={37.5} seed={72} />
      {/* where you "swim" — a life ring on the wave */}
      <Thread d={wavePath(t)} to={ramp(t, 37.55, 38.35, EASE_IN_OUT)} from={ramp(t, 39.6, 40.2)} width={4} />
      {t > 37.85 ? (
        <Prop t={t} src={prop("P12_lifebuoy")} x={interpolate(toss, [0, 1], [1450, 1220])} y={interpolate(toss, [0, 1], [wave(1450, t) - 70, 440])} size={260} enter={37.9} seed={86} amp={3} rotate={Math.sin(t * 1.6) * 5 + toss * 40} />
      ) : null}
    </div>
  );
};

/* ---------------- S8: three questions while the tea cools — or all ten ---------------- */
export const SceneTea: React.FC = () => {
  const t = useVT();
  const op = fade(t, 47.3, 47.8, 52.7, 53.2);
  const mugX = 560;
  const mugY = 560;
  const steam = [
    `M ${mugX - 30} ${mugY - 170} C ${mugX - 70} ${mugY - 230} ${mugX + 10} ${mugY - 280} ${mugX - 30} ${mugY - 340} C ${mugX - 70} ${mugY - 400} ${mugX + 10} ${mugY - 440} ${mugX - 20} ${mugY - 500}`,
    `M ${mugX + 40} ${mugY - 170} C ${mugX} ${mugY - 230} ${mugX + 80} ${mugY - 290} ${mugX + 40} ${mugY - 350} C ${mugX} ${mugY - 410} ${mugX + 80} ${mugY - 450} ${mugX + 50} ${mugY - 500}`,
  ];
  const cool = interpolate(t, [49.1, 50.6], [0, 1], { ...clamp, easing: EASE });
  // 10 bubbles in a 5×2 grid; the first three come on "трём", the rest on "все десять"
  const cells = Array.from({ length: 10 }).map((_, i) => ({ x: 980 + (i % 5) * 190, y: 390 + Math.floor(i / 5) * 210 }));
  const order = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div style={{ position: "absolute", inset: 0, opacity: op }}>
      <Prop t={t} src={prop("P14_tea_mug")} x={mugX} y={mugY} size={470} enter={47.4} seed={81} amp={3} />
      {steam.map((d, i) => (
        <Thread key={i} d={d} to={ramp(t, 47.7 + i * 0.15, 48.9 + i * 0.15, EASE_IN_OUT)} from={cool} width={6} opacity={0.9} />
      ))}
      {order.map((k, i) => {
        const at = i < 3 ? 48.12 + i * 0.18 : 50.65 + (i - 3) * 0.07;
        return <Prop key={k} t={t} src={prop(i % 2 ? "P01_bubble_violet" : "P01_bubble_blue")} x={cells[k].x} y={cells[k].y} size={175} enter={at} seed={90 + i} amp={4} rotate={(i % 3) * 4 - 4} />;
      })}
      <Thread d={loopAround(890, 290, 1850, 690, 4, 20)} to={ramp(t, 52.2, 52.8)} width={5} />
    </div>
  );
};

/* ---------------- S13: finale ---------------- */
/** The widget lines were cut from the voice: the finale keeps its original timings, shifted back. */
const FINALE_SHIFT = 79.25 - 70.485;

export const SceneFinale: React.FC = () => {
  const tv = useVT();
  const t = tv + FINALE_SHIFT;
  const op = fade(t, 79.3, 79.8, 88.6, 89.2);
  const X = 1290;
  const Y = 470;
  return (
    <div style={{ position: "absolute", inset: 0, opacity: op }}>
      {/* Max closes the story */}
      <Character t={tv} timeline={[[70.3, "E20"], [73.635, "E21"], [77.545, "E22"]]} x={540} bottom={1100} height={1180} enter={70.55} hue="blue" />
      {/* there's a gap → the piece is ready */}
      <Prop t={t} src={prop("P09_puzzle_piece_red")} x={X} y={Y} size={480} enter={80.0} exit={83.2} seed={101} />
      {/* don't put it off: five minutes */}
      <Prop t={t} src={prop("P17_stopwatch")} x={X} y={Y} size={500} enter={83.3} exit={84.6} seed={102} />
      {/* next consultation — calm, no stress */}
      <Prop t={t} src={propOr("N01_headset", "P01_bubble_blue")} x={X} y={Y} size={540} enter={84.7} seed={103} />
      <Prop t={t} src={propOr("N05_check_badge", "P10_ai_nastavnik_icon_hd")} x={X + 170} y={Y - 150} size={220} enter={86.77} seed={104} amp={4} />
      <Thread d={loopCircle(X, Y, 360, 1.08)} to={ramp(t, 87.4, 88.2)} width={6} />
    </div>
  );
};

