import { Easing, interpolate } from "remotion";

export const FPS = 60;
export const W = 1920;
export const H = 1080;

export const C = {
  black: "#0A0A0B",
  ink: "#141416",
  red: "#EF3124",
  redDeep: "#B8180F",
  white: "#FFFFFF",
  // UI-макет карточки (светлая тема SFACall)
  uiText: "#1C1C1E",
  uiMuted: "#6E6E73",
  uiLine: "#E6E6EA",
  uiBg: "#F3F3F5",
  tip: "#1E1E20",
  green: "#21A038",
  greenSoft: "#E3F5E7",
  pinkSoft: "#FDE8E7",
};

export const STYRENE = "'Styrene A LC', 'Inter', sans-serif";
export const UI = "'Inter', sans-serif";

// Главная кривая: быстрый старт, долгое мягкое торможение
export const OUT = Easing.bezier(0.16, 1, 0.3, 1);
export const IN = Easing.bezier(0.7, 0, 0.84, 0);
export const INOUT = Easing.bezier(0.65, 0, 0.35, 1);

export const s = (sec: number) => Math.round(sec * FPS);

export const anim = (
  f: number,
  from: number,
  to: number,
  a: number,
  b: number,
  easing: (t: number) => number = OUT,
) =>
  interpolate(f, [from, to], [a, b], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

// Ключевые кадры с собственной кривой на каждом отрезке
export const keys = (
  f: number,
  frames: number[],
  values: number[],
  easing: (t: number) => number = INOUT,
) =>
  interpolate(f, frames, values, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });
