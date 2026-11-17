import React from "react";
import { Img, interpolate } from "remotion";
import { Prop, prop, Word } from "../components/Elements";
import { loopAround, Thread } from "../components/Thread";
import { clamp, EASE, EASE_IN_OUT, float, keyframes, ramp, springAt, useVT } from "../lib/core";

/** Scenes 4–5 (voice 18.2 … 33.0): the pile of materials, "долго и скучно", the puzzle gap. */

const fadeIn = (t: number) => interpolate(t, [18.3, 18.8], [0, 1], { ...clamp, easing: EASE });
const fadeOut = (t: number) => interpolate(t, [32.35, 32.9], [1, 0], { ...clamp, easing: EASE });

// materials: [src, x, y, size, enter delay]
const PILE: [string, number, number, number, number][] = [
  ["P04_folder_violet", 430, 260, 190, 0.0],
  ["P05_paper_sheet_a", 1520, 230, 170, 0.12],
  ["P06_sticky_note_violet", 1700, 600, 180, 0.24],
  ["P04_folder_red", 560, 650, 250, 0.16],
  ["P05_paper_sheet_b", 1360, 540, 230, 0.32],
  ["P06_sticky_note_violet", 720, 330, 180, 0.44],
  ["P04_folder_red", 1470, 820, 230, 0.52],
  ["P05_paper_sheet_a", 330, 480, 210, 0.38],
];

const PZ = { x: 620, y: 470, size: 620 };
const HOLE = {
  x: PZ.x + ((719 - 512) / 1024) * PZ.size,
  y: PZ.y + ((516 - 512) / 1024) * PZ.size,
  w: (228 / 1024) * PZ.size,
  h: (356 / 1024) * PZ.size,
};

const qPath = (x: number, y: number) =>
  `M ${x - 70} ${y - 40} C ${x - 80} ${y - 150} ${x + 90} ${y - 170} ${x + 95} ${y - 60} C ${x + 100} ${y + 10} ${x + 10} ${y + 20} ${x + 5} ${y + 90}`;

export const ActBBack: React.FC = () => {
  const t = useVT();
  const spread = interpolate(t, [21.0, 22.4], [0, 1], { ...clamp, easing: EASE });
  return (
    <div style={{ position: "absolute", inset: 0, opacity: fadeIn(t) * fadeOut(t) }}>
      {PILE.map(([src, x, y, size, d], i) => (
        <Prop
          key={i}
          t={t}
          src={prop(src)}
          x={960 + (x - 960) * (1 + 0.18 * spread)}
          y={540 + (y - 540) * (1 + 0.12 * spread)}
          size={size}
          enter={19.9 + d}
          enterStyle="drop"
          seed={40 + i}
          rotate={(i % 2 ? 1 : -1) * (6 + i * 2)}
          exit={24.85 + i * 0.03}
        />
      ))}
      <Thread d={qPath(1380, 270)} to={ramp(t, 22.73, 23.5)} from={ramp(t, 24.8, 25.2)} width={8} />
      {t > 23.3 && t < 25.3 ? (
        <div style={{ position: "absolute", left: 1385 - 9, top: 270 + 125 - 9, width: 18, height: 18, borderRadius: 9, background: "#fff", opacity: ramp(t, 23.35, 23.6) * (1 - ramp(t, 24.9, 25.2)) }} />
      ) : null}
      <Word t={t} text="долго" x={150} y={250} size={190} t0={25.1} stretchAt={25.55} exit={27.55} seed={51} />
      <Word t={t} text="и скучно" x={150} y={480} size={130} t0={26.79} droopAt={27.05} exit={27.55} seed={52} stagger={0.03} />
      <Puzzle t={t} />
    </div>
  );
};

const Puzzle: React.FC<{ t: number }> = ({ t }) => {
  if (t < 27.9) return null;
  const e = springAt(t, 28.0, { damping: 26, stiffness: 70 });
  const f = float(t, 61, 5, 6);
  const mag = keyframes(t, [
    { t: 28.5, x: 330, y: 800 },
    { t: 29.4, x: 470, y: 560 },
    { t: 30.4, x: HOLE.x, y: HOLE.y },
    { t: 31.2, x: HOLE.x, y: HOLE.y },
    { t: 31.6, x: HOLE.x - 80, y: HOLE.y + 420 },
  ]);
  const magOn = ramp(t, 28.5, 29.0) * (1 - ramp(t, 31.2, 31.6));
  const MAG = 360;
  const lensR = MAG * 0.215;
  const zoom = 1.5;
  const pp = interpolate(t, [31.0, 31.62], [0, 1], { ...clamp, easing: EASE_IN_OUT });
  const pieceImg = (HOLE.h * 1.04 * 1024) / 816;
  const px = interpolate(pp, [0, 1], [1100, HOLE.x]);
  const py = interpolate(pp, [0, 1], [300, HOLE.y]) - Math.sin(pp * Math.PI) * 60;
  const boardStyle: React.CSSProperties = { position: "absolute", left: PZ.x - PZ.size / 2, top: PZ.y - PZ.size / 2, width: PZ.size, height: PZ.size };
  return (
    <div style={{ position: "absolute", inset: 0, translate: `${f.x}px ${f.y}px`, opacity: Math.min(1, e * 1.3) }}>
      <div style={{ position: "absolute", inset: 0, scale: 0.85 + 0.15 * e, transformOrigin: `${PZ.x}px ${PZ.y}px`, rotate: `${f.r - 3}deg`, filter: `blur(${(1 - Math.min(1, e)) * 10}px)` }}>
        <Img src={prop("P08_puzzle_board")} style={{ ...boardStyle, filter: "drop-shadow(0 30px 40px rgba(0,0,0,.5))" }} />
        <Thread d={loopAround(HOLE.x - HOLE.w / 2, HOLE.y - HOLE.h / 2, HOLE.x + HOLE.w / 2, HOLE.y + HOLE.h / 2, 7, 26)} to={ramp(t, 30.39, 30.95)} from={ramp(t, 31.1, 31.5)} width={6} />
        {pp > 0 ? (
          <Img
            src={prop("P09_puzzle_piece_red")}
            style={{
              position: "absolute",
              left: px - pieceImg / 2,
              top: py - pieceImg / 2,
              width: pieceImg,
              height: pieceImg,
              opacity: Math.min(1, pp * 3),
              rotate: `${(1 - pp) * -40}deg`,
              filter: "drop-shadow(0 16px 20px rgba(0,0,0,.45))",
            }}
          />
        ) : null}
      </div>
      {magOn > 0.01 ? (
        <div style={{ position: "absolute", inset: 0, opacity: magOn }}>
          <div style={{ position: "absolute", left: mag.x - lensR, top: mag.y - lensR, width: lensR * 2, height: lensR * 2, borderRadius: "50%", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: -(mag.x - lensR), top: -(mag.y - lensR), width: 1920, height: 1080, scale: zoom, transformOrigin: `${mag.x}px ${mag.y}px` }}>
              <Img src={prop("P08_puzzle_board")} style={boardStyle} />
            </div>
          </div>
          <Img src={prop("P07_magnifier")} style={{ position: "absolute", left: mag.x - MAG * 0.386, top: mag.y - MAG * 0.38, width: MAG, height: MAG, filter: "drop-shadow(0 26px 30px rgba(0,0,0,.5))" }} />
        </div>
      ) : null}
    </div>
  );
};

export const ActBFront: React.FC = () => null;
