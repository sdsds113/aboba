import React from "react";
import { Img, interpolate, random, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import confetti from "../data/confetti.json";

export const asset = (name: string) => staticFile(`assets/${name}`);

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** затухающее покачивание (как табличка на верёвке): угол в градусах */
export const swing = (frame: number, fps: number, amp: number, periodS = 0.9, decayS = 0.7) =>
  amp * Math.cos((frame / fps / periodS) * Math.PI * 2) * Math.exp(-frame / fps / decayS);

/** Фигурка из листа конфетти E10 (2048x2048 исходник 1254x1254) */
const SHEET = 1254;
export const ConfettiPiece: React.FC<{ index: number; size: number; style?: React.CSSProperties }> = ({
  index,
  size,
  style,
}) => {
  const [x, y, w, h] = confetti[index % confetti.length];
  const k = size / Math.max(w, h);
  return (
    <div style={{ position: "absolute", width: w * k, height: h * k, overflow: "hidden", ...style }}>
      <Img
        src={asset("E10_confetti_sheet.png")}
        style={{ position: "absolute", left: -x * k, top: -y * k, width: SHEET * k, height: SHEET * k, maxWidth: "none" }}
      />
    </div>
  );
};

/** Взрыв конфетти из точки (или дождь сверху, если rain) */
export const ConfettiBurst: React.FC<{ count?: number; seed?: string; rain?: boolean; originY?: number }> = ({
  count = 70,
  seed = "c",
  rain = false,
  originY = 0.55,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const t = frame / fps;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {new Array(count).fill(0).map((_, i) => {
        const r = (k: string) => random(`${seed}-${i}-${k}`);
        const size = 34 + r("s") * 46;
        let x: number;
        let y: number;
        if (rain) {
          x = r("x") * width + Math.sin(t * 2 + r("p") * 6) * 40;
          y = -100 - r("d") * height * 0.8 + t * (260 + r("v") * 220);
        } else {
          const ang = -Math.PI / 2 + (r("a") - 0.5) * Math.PI * 1.3;
          const v = 900 + r("v") * 1100;
          const drag = (1 - Math.exp(-t * 2.2)) / 2.2;
          x = width / 2 + Math.cos(ang) * v * drag + Math.sin(t * 3 + r("p") * 6) * 30;
          y = height * originY + Math.sin(ang) * v * drag + 420 * t * t;
        }
        const rot = r("r0") * 360 + t * (r("r1") - 0.5) * 900;
        const opacity = interpolate(t, [0, 0.05, 2.4, 3.2], [0, 1, 1, 0], clamp);
        return (
          <ConfettiPiece
            key={i}
            index={i}
            size={size}
            style={{ left: x, top: y, rotate: `${rot}deg`, opacity, translate: "-50% -50%" }}
          />
        );
      })}
    </div>
  );
};

export const TextShadow = "0 4px 18px rgba(0,0,0,0.55), 0 2px 4px rgba(0,0,0,0.35)";
