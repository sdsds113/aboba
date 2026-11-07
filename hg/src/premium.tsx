import React from "react";
import { Easing, continueRender, delayRender, interpolate, staticFile, useCurrentFrame } from "remotion";

// Premium style: Inter Tight (display cut, close to SF Pro), calm Apple-like reveals.
export const DISPLAY = "InterTightLocal";

const FILES: [string, string][] = [
  ["fonts/intertight-cyrillic.woff2", "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116"],
  ["fonts/intertight-latin.woff2", "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2190-2199, U+2212, U+2215, U+FEFF, U+FFFD"],
];
if (typeof document !== "undefined") {
  const h = delayRender("Loading Inter Tight");
  Promise.all(
    FILES.map(([file, range]) => {
      const face = new FontFace(DISPLAY, `url(${staticFile(file)}) format("woff2")`, {
        weight: "300 700",
        unicodeRange: range,
      });
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
