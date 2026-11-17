import React, { createContext, useContext } from "react";
import {
  Easing,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { loadFont } from "@remotion/fonts";

export const FPS = 30;
export const W = 1920;
export const H = 1080;
/** Voiceover starts this many seconds into the video. */
export const VO_OFFSET = 0.5;
export const VOICE_DURATION = 88.73;
export const TOTAL_SECONDS = 93.5;
export const TOTAL_FRAMES = Math.round(TOTAL_SECONDS * FPS);

export const C = {
  red: "#FF2D1F",
  blue: "#0C8CF0",
  violet: "#A84CFC",
  ink: "#0B0B0E",
  white: "#FFFFFF",
};
export type Hue = "red" | "blue" | "violet";

export const FONT_A = "StyreneA";
export const FONT_B = "StyreneB";

const fonts: [string, string, string][] = [
  [FONT_A, "StyreneALC-Black.otf", "900"],
  [FONT_A, "StyreneALC-Bold.otf", "700"],
  [FONT_A, "StyreneALC-Medium.otf", "500"],
  [FONT_A, "StyreneALC-Regular.otf", "400"],
  [FONT_B, "StyreneBLC-Medium.otf", "500"],
  [FONT_B, "StyreneBLC-Regular.otf", "400"],
];
for (const [family, file, weight] of fonts) {
  loadFont({ family, url: staticFile(`fonts/${file}`), weight }).catch(
    () => undefined,
  );
}

/** Voice time (seconds) -> absolute video frame. */
export const vf = (t: number) => Math.round((t + VO_OFFSET) * FPS);

const SceneStart = createContext(0);

/** Voice-time scene wrapper: mounts children only between start and end (voice seconds). */
export const Scene: React.FC<{
  name: string;
  start: number;
  end: number;
  children: React.ReactNode;
}> = ({ name, start, end, children }) => {
  const from = Math.max(0, vf(start));
  return (
    <Sequence
      name={name}
      from={from}
      durationInFrames={Math.max(1, vf(end) - from)}
      layout="absolute-fill"
    >
      <SceneStart.Provider value={from}>{children}</SceneStart.Provider>
    </Sequence>
  );
};

/** Current voice time in seconds (works inside <Scene>). */
export const useVT = () => {
  const frame = useCurrentFrame();
  const start = useContext(SceneStart);
  return (frame + start) / FPS - VO_OFFSET;
};

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const EASE = Easing.bezier(0.16, 1, 0.3, 1);
export const EASE_IN_OUT = Easing.bezier(0.65, 0, 0.35, 1);
export const EASE_IN = Easing.bezier(0.55, 0, 0.9, 0.4);

/** 0..1 ramp between voice times a and b. */
export const ramp = (t: number, a: number, b: number, easing = EASE) =>
  interpolate(t, [a, b], [0, 1], { ...clamp, easing });

/** Spring driven by voice time, starting at t0. */
export const springAt = (
  t: number,
  t0: number,
  config: { damping?: number; stiffness?: number; mass?: number } = {},
) =>
  t < t0
    ? 0
    : spring({
        frame: (t - t0) * FPS,
        fps: FPS,
        config: { damping: 14, stiffness: 120, mass: 1, ...config },
      });

/** Interpolate through keyframes [{t, ...values}] with smooth easing between each pair. */
export function keyframes<K extends string>(
  t: number,
  frames: ({ t: number } & Record<K, number>)[],
  easing = EASE_IN_OUT,
): Record<K, number> {
  const keys = Object.keys(frames[0]).filter((k) => k !== "t") as K[];
  const out = {} as Record<K, number>;
  if (t <= frames[0].t) {
    for (const k of keys) out[k] = frames[0][k];
    return out;
  }
  for (let i = 0; i < frames.length - 1; i++) {
    const a = frames[i];
    const b = frames[i + 1];
    if (t <= b.t) {
      const p = easing(Math.min(1, Math.max(0, (t - a.t) / Math.max(1e-6, b.t - a.t))));
      for (const k of keys) out[k] = a[k] + (b[k] - a[k]) * p;
      return out;
    }
  }
  const last = frames[frames.length - 1];
  for (const k of keys) out[k] = last[k];
  return out;
}

/** Idle floating: smooth pseudo-random sway for an element with a given seed. */
export const float = (t: number, seed: number, amp = 10, period = 4.5) => {
  const p = (seed * 1.618) % 1;
  return {
    x: Math.sin((t / (period * 1.37) + p) * Math.PI * 2) * amp * 0.6,
    y: Math.sin((t / period + p * 2.3) * Math.PI * 2) * amp,
    r: Math.sin((t / (period * 1.21) + p * 3.1) * Math.PI * 2) * 1.4,
  };
};

export const hexA = (hex: string, a: number) =>
  hex + Math.round(Math.max(0, Math.min(1, a)) * 255).toString(16).padStart(2, "0");
