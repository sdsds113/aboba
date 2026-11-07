import React from "react";
import { Easing, continueRender, delayRender, interpolate, staticFile, useCurrentFrame } from "remotion";

// Premium style: корпоративный шрифт Альфа-Банка Styrene B LC, calm Apple-like reveals.
// Файлы лежат в public/fonts/styrene (в git не хранятся — лицензия банка).
export const DISPLAY = "StyreneB";

// weight → файл. 600 (наш «полужирный» в титрах) берём из Medium: Bold у Styrene заметно тяжелее.
const FILES: [string, string][] = [
  ["fonts/styrene/StyreneBLC-Light.otf", "300"],
  ["fonts/styrene/StyreneBLC-Regular.otf", "400"],
  ["fonts/styrene/StyreneBLC-Medium.otf", "500 600"],
  ["fonts/styrene/StyreneBLC-Bold.otf", "700"],
];
if (typeof document !== "undefined") {
  const h = delayRender("Loading Styrene");
  Promise.all(
    FILES.map(([file, weight]) => {
      const face = new FontFace(DISPLAY, `url(${staticFile(file)}) format("opentype")`, { weight });
      document.fonts.add(face);
      return face.load();
    }),
  )
    .then(() => continueRender(h))
    .catch((e) => {
      console.error(e);
      continueRender(h);
    });
}

export const INK = "#1D1D1F"; // Apple-style near-black
export const INK_2 = "#6E6E73"; // secondary grey

const APPLE = Easing.bezier(0.25, 0.1, 0.25, 1);

/** Soft reveal: opacity + slight rise + blur clearing. No bounce. */
export const Reveal: React.FC<{
  at: number;
  dur?: number;
  rise?: number;
  outAt?: number;
  outDur?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ at, dur = 26, rise = 18, outAt, outDur = 18, children, style }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: APPLE,
  });
  const o =
    outAt === undefined
      ? 1
      : interpolate(frame, [outAt, outAt + outDur], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: APPLE,
        });
  return (
    <div
      style={{
        opacity: p * o,
        transform: `translateY(${(1 - p) * rise}px)`,
        filter: `blur(${(1 - p) * 10}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
