import React from "react";
import { useCurrentFrame } from "remotion";
import { Character, StickerId } from "../components/Elements";
import { FPS, Hue, keyframes, VO_OFFSET } from "../lib/core";

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
  [53.0, "E15"],
  [59.67, "E16"],
  [62.35, "E17"],
  [63.89, "E18"],
  [70.79, "E19"],
  [79.31, "E20"],
  [82.4, "E21"],
  [86.31, "E22"],
  [88.73, "E23"],
];

/** Where the character stands (x = centre, h = sticker height, b = bottom edge y, r = tilt). */
const PLACES = [
  { t: -0.5, x: 1240, h: 1000, b: 1080, r: 0 },
  { t: 7.6, x: 1240, h: 1000, b: 1080, r: 0 },
  { t: 8.3, x: 960, h: 800, b: 1080, r: 0 },
  { t: 13.9, x: 960, h: 800, b: 1080, r: 0 },
  { t: 14.6, x: 560, h: 900, b: 1080, r: 0 },
  { t: 18.2, x: 560, h: 900, b: 1080, r: 0 },
  { t: 18.9, x: 960, h: 980, b: 1100, r: 0 },
  { t: 24.8, x: 960, h: 980, b: 1100, r: 0 },
  { t: 25.3, x: 1330, h: 900, b: 1080, r: 0 },
  { t: 27.5, x: 1330, h: 900, b: 1080, r: 0 },
  { t: 28.0, x: 1440, h: 860, b: 1080, r: 0 },
  { t: 32.35, x: 1440, h: 860, b: 1080, r: 0 },
  // sinks under the blue flood, re-surfaces peeking from the right edge
  { t: 32.8, x: 1500, h: 860, b: 1980, r: 0 },
  { t: 33.5, x: 1700, h: 820, b: 1980, r: -6 },
  { t: 34.1, x: 1700, h: 820, b: 1330, r: -6 },
  { t: 35.0, x: 1700, h: 820, b: 1330, r: -6 },
  { t: 35.5, x: 960, h: 900, b: 1080, r: 0 },
  { t: 39.9, x: 960, h: 900, b: 1080, r: 0 },
  { t: 40.6, x: 470, h: 600, b: 1080, r: 0 },
  { t: 47.1, x: 470, h: 600, b: 1080, r: 0 },
  { t: 47.6, x: 760, h: 960, b: 1080, r: 0 },
  { t: 52.9, x: 760, h: 960, b: 1080, r: 0 },
  { t: 53.4, x: 1520, h: 820, b: 1080, r: 0 },
  { t: 59.6, x: 1520, h: 820, b: 1080, r: 0 },
  { t: 60.1, x: 960, h: 880, b: 1080, r: 0 },
  { t: 62.2, x: 960, h: 880, b: 1080, r: 0 },
  { t: 62.6, x: 720, h: 900, b: 1080, r: 0 },
  { t: 63.5, x: 720, h: 900, b: 1080, r: 0 },
  // dips out, pops up behind the window corner
  { t: 63.75, x: 1200, h: 560, b: 1700, r: 0 },
  { t: 64.0, x: 1590, h: 560, b: 1700, r: 4 },
  { t: 64.5, x: 1590, h: 560, b: 1180, r: 4 },
  { t: 70.5, x: 1590, h: 560, b: 1180, r: 4 },
  { t: 70.8, x: 1200, h: 800, b: 1700, r: 0 },
  { t: 71.0, x: 560, h: 1000, b: 1700, r: 0 },
  { t: 71.5, x: 560, h: 1000, b: 1080, r: 0 },
  { t: 79.0, x: 560, h: 1000, b: 1080, r: 0 },
  { t: 79.7, x: 960, h: 980, b: 1080, r: 0 },
  { t: 88.5, x: 960, h: 980, b: 1080, r: 0 },
  { t: 89.2, x: 1730, h: 470, b: 1080, r: 0 },
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
  const mirror = t >= 63.75 && t < 70.7;
  // a hair of rgb-split jitter on "зависаешь"
  const jitter = t > 7.35 && t < 7.47 ? (Math.floor(t * 60) % 2 === 0 ? 7 : -7) : 0;
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
      />
    </div>
  );
};
