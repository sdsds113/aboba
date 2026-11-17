import React from "react";
import { Img, interpolate } from "remotion";
import { BlobField } from "../components/Blobs";
import { Droplets, Prop, prop, Word } from "../components/Elements";
import { loopAround, Thread } from "../components/Thread";
import { C, clamp, EASE, EASE_IN, float, keyframes, ramp, springAt, useVT } from "../lib/core";

/** Scenes 4–5 (voice 18.2 … 33.2): the pile of materials, "долго и скучно", the puzzle gap. */

const enterTilt = (t: number) => interpolate(t, [18.2, 18.8], [1, 0], { ...clamp, easing: EASE });

// falling materials: [src, landing x, landing y, size, depth blur, enter delay]
const PILE: [string, number, number, number, number, number][] = [
  ["P04_folder_violet", 420, 250, 190, 8, 0.0],
  ["P05_paper_sheet_a", 1530, 220, 170, 8, 0.1],
  ["P06_sticky_note_violet", 1720, 600, 180, 7, 0.22],
  ["P04_folder_red", 560, 640, 280, 0, 0.12],
  ["P05_paper_sheet_b", 1340, 520, 250, 0, 0.3],
  ["P06_sticky_note_violet", 700, 330, 200, 0, 0.42],
  ["P04_folder_red", 1450, 820, 260, 0, 0.5],
  ["P05_paper_sheet_a", 330, 470, 230, 3, 0.36],
];
const PILE_NEAR: [string, number, number, number, number, number][] = [
  ["P04_folder_red", 230, 900, 430, 13, 0.25],
  ["P05_paper_sheet_b", 1700, 960, 400, 14, 0.55],
];

// puzzle placement (screen); hole measured in P08 image px: centre (719,516), 228x356 of 1024
const PZ = { x: 620, y: 470, size: 640 };
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
  const tilt = enterTilt(t);
  const scatter = interpolate(t, [21.0, 22.2], [0, 1], { ...clamp, easing: EASE });
  const suck = interpolate(t, [27.63, 27.95], [0, 1], { ...clamp, easing: EASE_IN });
  const violetOut = 1 - ramp(t, 27.6, 28.2);
  const blueIn = ramp(t, 27.9, 28.7);
  return (
    <div style={{ position: "absolute", inset: 0, translate: `0 ${-tilt * 900}px`, filter: tilt > 0.01 ? `blur(${tilt * 14}px)` : undefined }}>
      <BlobField
        id="b-far"
        t={t}
        blur={34}
        blobs={[
          { x: 300, y: 250, r: 230 * violetOut, color: C.violet, seed: 31, wobble: 0.2 },
          { x: 1650, y: 900, r: 270, color: C.red, seed: 32, wobble: 0.2 },
          { x: PZ.x, y: PZ.y, r: 360 * blueIn, color: C.blue, seed: 33, wobble: 0.18, opacity: 0.55 },
        ]}
      />
      <BlobField
        id="b-mid"
        t={t}
        goo={18}
        blobs={[
          { x: 960, y: 640, r: 400 * (1 - ramp(t, 27.4, 28.0)), color: C.violet, seed: 34, wobble: 0.15 },
          { x: 1180, y: 900, r: 160 * (1 - ramp(t, 27.4, 28.0)), color: C.violet, seed: 35, wobble: 0.25 },
          { x: 1440, y: 650, r: 330 * ramp(t, 27.7, 28.4), color: C.red, seed: 36, wobble: 0.16 },
        ]}
      />
      {/* pile: rain in, scatter into depth, get sucked away */}
      {PILE.map(([src, x, y, size, blur, d], i) => {
        const sx = 960 + (x - 960) * (1 + 0.55 * scatter);
        const sy = 540 + (y - 540) * (1 + 0.45 * scatter);
        const k = 1 - suck;
        return (
          <Prop
            key={i}
            t={t}
            src={prop(src)}
            x={960 + (sx - 960) * k}
            y={540 + (sy - 540) * k}
            size={size * (1 - 0.3 * scatter) * (0.2 + 0.8 * k)}
            blur={blur + scatter * 6}
            enter={19.9 + d}
            enterStyle="drop"
            seed={40 + i}
            rotate={(i % 2 ? 1 : -1) * (8 + i * 3)}
            exit={27.85}
            exitStyle="shrink"
          />
        );
      })}
      {/* the question mark drawn by the cord */}
      <Thread d={qPath(1380, 260)} to={ramp(t, 22.73, 23.4)} from={ramp(t, 24.8, 25.2)} width={9} />
      {t > 23.3 && t < 25.2 ? (
        <div style={{ position: "absolute", left: 1385 - 9, top: 260 + 125 - 9, width: 18, height: 18, borderRadius: 9, background: "#fff", scale: springAt(t, 23.3, { damping: 9 }) * (1 - ramp(t, 24.9, 25.15)) }} />
      ) : null}
      {/* долго / скучно */}
      <Word t={t} text="долго" x={150} y={250} size={210} t0={25.1} stretchAt={25.55} exit={27.6} seed={51} />
      <Word t={t} text="и скучно" x={150} y={500} size={150} t0={26.79} droopAt={27.05} exit={27.6} seed={52} stagger={0.03} />
      <Puzzle t={t} />
    </div>
  );
};

const Puzzle: React.FC<{ t: number }> = ({ t }) => {
  if (t < 27.9) return null;
  const e = springAt(t, 28.0, { damping: 15, stiffness: 90 });
  const f = float(t, 61, 8, 5);
  const squash = t > 31.62 ? 1 - 0.06 * Math.sin(Math.min(1, (t - 31.62) / 0.25) * Math.PI) : 1;
  const shake = t > 31.62 && t < 31.78 ? Math.sin((t - 31.62) * 120) * 6 : 0;
  // magnifier glides over the board and parks on the gap
  const mag = keyframes(t, [
    { t: 28.5, x: 260, y: 860 },
    { t: 29.2, x: 430, y: 560 },
    { t: 29.9, x: 560, y: 380 },
    { t: 30.4, x: HOLE.x, y: HOLE.y },
    { t: 31.3, x: HOLE.x, y: HOLE.y },
    { t: 31.55, x: HOLE.x - 120, y: HOLE.y + 520 },
  ]);
  const magOn = ramp(t, 28.5, 28.9) * (1 - ramp(t, 31.3, 31.6));
  const MAG = 380;
  const lensR = MAG * 0.215;
  const lensCx = mag.x;
  const lensCy = mag.y;
  const magLeft = lensCx - MAG * 0.386;
  const magTop = lensCy - MAG * 0.38;
  const zoom = 1.6;
  // puzzle piece flies in from behind the character
  const pp = interpolate(t, [31.28, 31.62], [0, 1], { ...clamp, easing: EASE_IN });
  // piece bbox in its 1024 canvas is 816 px tall and centred; scale it to the gap height
  const pieceImg = ((HOLE.h * 1.04) * 1024) / 816;
  const px = interpolate(pp, [0, 1], [1440, HOLE.x]);
  const py = interpolate(pp, [0, 1], [380, HOLE.y]) - Math.sin(pp * Math.PI) * 160;
  const boardStyle: React.CSSProperties = {
    position: "absolute",
    left: PZ.x - PZ.size / 2,
    top: PZ.y - PZ.size / 2,
    width: PZ.size,
    height: PZ.size,
  };
  const exitFlood = ramp(t, 32.4, 32.9);
  return (
    <div style={{ position: "absolute", inset: 0, translate: `${f.x + shake}px ${f.y}px`, opacity: Math.min(1, e * 1.5) * (1 - exitFlood) }}>
      <div style={{ position: "absolute", inset: 0, scale: `${(0.6 + 0.4 * e) * squash} ${(0.6 + 0.4 * e) * (2 - squash)}`, transformOrigin: `${PZ.x}px ${PZ.y}px`, rotate: `${f.r * 2 - 4}deg`, filter: `blur(${(1 - Math.min(1, e)) * 18}px)` }}>
        <Img src={prop("P08_puzzle_board")} style={{ ...boardStyle, filter: "drop-shadow(0 30px 40px rgba(0,0,0,.5))" }} />
        {/* gap call-out */}
        <Thread d={loopAround(HOLE.x - HOLE.w / 2, HOLE.y - HOLE.h / 2, HOLE.x + HOLE.w / 2, HOLE.y + HOLE.h / 2, 7, 26)} to={ramp(t, 30.39, 30.9)} from={ramp(t, 31.2, 31.5)} width={7} />
        {pp > 0 ? (
          <Img
            src={prop("P09_puzzle_piece_red")}
            style={{
              position: "absolute",
              left: px - pieceImg / 2,
              top: py - pieceImg / 2,
              width: pieceImg,
              height: pieceImg,
              rotate: `${(1 - pp) * -140}deg`,
              filter: `drop-shadow(0 16px 20px rgba(0,0,0,.45)) blur(${(1 - pp) * 3}px)`,
            }}
          />
        ) : null}
      </div>
      <Droplets t={t} t0={31.62} x={HOLE.x} y={HOLE.y} color={C.red} count={7} spread={240} seed={77} size={26} />
      {/* magnifier with a real lens: a zoomed copy of the board inside the ring */}
      {magOn > 0.01 ? (
        <div style={{ position: "absolute", inset: 0, opacity: magOn }}>
          <div style={{ position: "absolute", left: lensCx - lensR, top: lensCy - lensR, width: lensR * 2, height: lensR * 2, borderRadius: "50%", overflow: "hidden", background: "rgba(255,255,255,.04)" }}>
            <div style={{ position: "absolute", left: -(lensCx - lensR), top: -(lensCy - lensR), width: 1920, height: 1080, scale: zoom * (0.6 + 0.4 * e), transformOrigin: `${lensCx}px ${lensCy}px` }}>
              <Img src={prop("P08_puzzle_board")} style={boardStyle} />
            </div>
          </div>
          <Img src={prop("P07_magnifier")} style={{ position: "absolute", left: magLeft, top: magTop, width: MAG, height: MAG, filter: "drop-shadow(0 26px 30px rgba(0,0,0,.5))" }} />
        </div>
      ) : null}
    </div>
  );
};

export const ActBFront: React.FC = () => {
  const t = useVT();
  const tilt = enterTilt(t);
  const scatter = interpolate(t, [21.0, 22.2], [0, 1], { ...clamp, easing: EASE });
  return (
    <div style={{ position: "absolute", inset: 0, translate: `0 ${-tilt * 900}px` }}>
      {PILE_NEAR.map(([src, x, y, size, blur, d], i) => (
        <Prop
          key={i}
          t={t}
          src={prop(src)}
          x={960 + (x - 960) * (1 + 0.8 * scatter)}
          y={540 + (y - 540) * (1 + 0.6 * scatter)}
          size={size}
          blur={blur}
          enter={19.9 + d}
          enterStyle="drop"
          seed={70 + i}
          rotate={i ? 14 : -18}
          exit={22.0}
          exitStyle="pastCamera"
        />
      ))}
    </div>
  );
};
