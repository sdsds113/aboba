import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Character, StickerId } from "../components/Elements";
import { clamp, EASE, FPS, Hue, keyframes, VO_OFFSET } from "../lib/core";

/** Emotion swaps, voice time. */
export const STICKER_TIMELINE: [number, StickerId][] = [
  [-0.5, "E01"],
  [6.98, "E02"],
  [7.83, "E03"],
  [10.34, "E04"],
  [13.99, "E05"],
  [18.39, "E06"],
  [25.04, "E07"],
  [27.63, "E08"],
  [31.59, "E11"],
  [33.8, "E09"],
  [35.43, "E10"],
  [37.85, "E03"],
  [38.74, "E11"],
  [40.1, "E12"],
  [47.42, "E13"],
  [51.37, "E14"],
  [53.0, "E12"],
  [58.28, "E15"],
  [59.67, "E16"],
  [62.35, "E17"],
  [63.89, "E12"],
  [70.79, "E19"],
  [73.4, "E12"],
  [79.31, "E20"],
  [82.4, "E21"],
  [86.31, "E22"],
  [88.73, "E23"],
];

/** Where the character stands (x = centre, h = sticker height, b = bottom edge y, r = tilt). */
const PLACES = [
  { t: -0.5, x: 1450, h: 1000, b: 1080, r: 0 },
  { t: 7.6, x: 1450, h: 1000, b: 1080, r: 0 },
  { t: 8.4, x: 960, h: 820, b: 1080, r: 0 },
  { t: 13.9, x: 960, h: 820, b: 1080, r: 0 },
  { t: 14.8, x: 560, h: 900, b: 1080, r: 0 },
  { t: 18.2, x: 560, h: 900, b: 1080, r: 0 },
  { t: 19.0, x: 960, h: 960, b: 1090, r: 0 },
  { t: 24.8, x: 960, h: 960, b: 1090, r: 0 },
  { t: 25.5, x: 1330, h: 900, b: 1080, r: 0 },
  { t: 27.5, x: 1330, h: 900, b: 1080, r: 0 },
  { t: 28.2, x: 1440, h: 860, b: 1080, r: 0 },
  { t: 32.4, x: 1440, h: 860, b: 1080, r: 0 },
  { t: 33.4, x: 1520, h: 880, b: 1080, r: 0 },
  { t: 35.0, x: 1520, h: 880, b: 1080, r: 0 },
  { t: 35.7, x: 960, h: 900, b: 1080, r: 0 },
  { t: 39.9, x: 960, h: 900, b: 1080, r: 0 },
  { t: 40.7, x: 400, h: 820, b: 1080, r: 0 },
  { t: 47.1, x: 400, h: 820, b: 1080, r: 0 },
  { t: 47.8, x: 760, h: 960, b: 1080, r: 0 },
  { t: 52.8, x: 760, h: 960, b: 1080, r: 0 },
  { t: 53.5, x: 400, h: 820, b: 1080, r: 0 },
  { t: 59.6, x: 400, h: 820, b: 1080, r: 0 },
  { t: 60.3, x: 960, h: 880, b: 1080, r: 0 },
  { t: 62.2, x: 960, h: 880, b: 1080, r: 0 },
  { t: 62.8, x: 720, h: 900, b: 1080, r: 0 },
  { t: 63.4, x: 720, h: 900, b: 1080, r: 0 },
  { t: 64.1, x: 400, h: 820, b: 1080, r: 0 },
  { t: 79.0, x: 400, h: 820, b: 1080, r: 0 },
  { t: 79.8, x: 960, h: 980, b: 1080, r: 0 },
];

const HUES: [number, Hue][] = [
  [-1, "red"],
  [32.4, "blue"],
  [47.2, "violet"],
  [59.6, "red"],
  [70.7, "blue"],
];

export const CharacterTrack: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS - VO_OFFSET;
  const p = keyframes(t, PLACES);
  let hue: Hue = "red";
  for (const [ht, h] of HUES) if (t >= ht) hue = h;
  const mirror = false;
  const jitter = 0;
  const vis = interpolate(t, [-0.3, 0.25], [0, 1], { ...clamp, easing: EASE }) * interpolate(t, [88.9, 89.5], [1, 0], { ...clamp, easing: EASE });
  if (vis <= 0) return null;
  return (
    <div style={{ position: "absolute", inset: 0, translate: `${jitter}px 0` }}>
      <Character
        t={t}
        timeline={STICKER_TIMELINE}
        x={p.x}
        bottom={p.b}
        height={p.h}
        rotate={p.r}
        enter={0.0}
        mirror={mirror}
        hue={hue}
        opacity={vis}
      />
    </div>
  );
};
