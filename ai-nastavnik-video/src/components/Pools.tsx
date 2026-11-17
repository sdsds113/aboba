import React from "react";
import { interpolate, interpolateColors, useCurrentFrame } from "remotion";
import { BlobField } from "./Blobs";
import { C, clamp, EASE, FPS, VO_OFFSET } from "../lib/core";

/**
 * Two spilled-paint pools at the frame edges (bottom-left and top-right).
 * They don't travel: edges breathe very slowly and the colour changes gently with the story.
 * Colours: [voiceTime, left, right]
 */
const COLORS: [number, string, string][] = [
  [-10, C.red, C.blue],
  [0.0, C.red, C.red],
  [17.2, C.red, C.blue],
  [18.4, C.violet, C.red],
  [27.7, C.red, C.blue],
  [32.5, C.blue, C.violet],
  [47.3, C.violet, C.violet],
  [53.1, C.blue, C.violet],
  [59.7, C.red, C.red],
  [70.8, C.blue, C.blue],
  [79.3, C.red, C.blue],
  [89.0, C.red, C.blue],
];
const FADE = 0.8;

const colorAt = (t: number, side: 1 | 2) => {
  let i = 0;
  for (let k = 0; k < COLORS.length; k++) if (COLORS[k][0] <= t) i = k;
  const cur = COLORS[i][side];
  const prev = i > 0 ? COLORS[i - 1][side] : cur;
  const p = interpolate(t, [COLORS[i][0], COLORS[i][0] + FADE], [0, 1], { ...clamp, easing: EASE });
  return interpolateColors(p, [0, 1], [prev, cur]);
};

export const SidePools: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS - VO_OFFSET;
  // spill in at the very start
  const spill = interpolate(frame / FPS, [0.1, 1.6], [0, 1], { ...clamp, easing: EASE });
  const left = colorAt(t, 1);
  const right = colorAt(t, 2);
  const slow = { speed: 0.25, wobble: 0.09 };
  return (
    <BlobField
      id="pools"
      t={t}
      goo={16}
      blobs={[
        { x: -30, y: 960, r: 360 * spill, sx: 1.25, sy: 0.9, color: left, seed: 201, ...slow },
        { x: 360, y: 1040, r: 70 * spill, color: left, seed: 202, ...slow },
        { x: 460, y: 960, r: 22 * spill, color: left, seed: 203, ...slow },
        { x: 1960, y: 100, r: 330 * spill, sx: 1.2, sy: 0.9, color: right, seed: 204, ...slow },
        { x: 1590, y: 40, r: 60 * spill, color: right, seed: 205, ...slow },
        { x: 1720, y: 330, r: 26 * spill, color: right, seed: 206, ...slow },
      ]}
    />
  );
};
