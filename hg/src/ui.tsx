import React from "react";
import {
  AbsoluteFill,
  Img,
  continueRender,
  delayRender,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Inter (variable 400–900) bundled locally in public/fonts, so rendering needs no network.
export const fontFamily = "InterLocal";
const FONT_FILES: [string, string][] = [
  ["fonts/inter-cyrillic.woff2", "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116"],
  ["fonts/inter-latin.woff2", "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2190-2199, U+2212, U+2215, U+FEFF, U+FFFD"],
];
if (typeof document !== "undefined") {
  const handle = delayRender("Loading local Inter font");
  Promise.all(
    FONT_FILES.map(([file, range]) => {
      const face = new FontFace(fontFamily, `url(${staticFile(file)}) format("woff2")`, {
        weight: "400 900",
        unicodeRange: range,
      });
      document.fonts.add(face);
      return face.load();
    }),
  )
    .then(() => continueRender(handle))
    .catch((err) => {
      console.error(err);
      continueRender(handle);
    });
}

export const RED = "#EF3124";
export const RED_DARK = "#C4161C";
export const INK = "#111111";
export const GREY = "#6B6F76";
export const LIGHT = "#F3F4F6";

export const useSpring = (delay: number, damping = 14, durationInFrames?: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping }, durationInFrames });
};

export const fadeUp = (p: number, dist = 40): React.CSSProperties => ({
  opacity: p,
  transform: `translateY(${(1 - p) * dist}px)`,
});

/** Clean white background: dot grid, soft drifting red glows, Alfa mark. */
export const WhiteBg: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const d1 = Math.sin(frame / 70) * 40;
  const d2 = Math.cos(frame / 90) * 50;
  const out = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const inn = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: "#FFFFFF", fontFamily, color: INK }}>
      <AbsoluteFill
        style={{
          backgroundImage: "radial-gradient(#E4E6EA 1.6px, transparent 1.6px)",
          backgroundSize: "36px 36px",
          opacity: 0.8,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          right: -300 + d1,
          top: -380 + d2,
          background: `radial-gradient(circle, ${RED}22 0%, ${RED}00 65%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          left: -320 - d2,
          bottom: -420 + d1,
          background: `radial-gradient(circle, ${RED}18 0%, ${RED}00 65%)`,
        }}
      />
      <Img
        src={staticFile("alfa_logo.png")}
        style={{ position: "absolute", right: 72, top: 60, height: 64 }}
      />
      <AbsoluteFill style={{ opacity: Math.min(out, inn) }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Eyebrow + big title, top-left, diploma-style red bar. */
export const Header: React.FC<{ eyebrow: string; title: string; delay?: number }> = ({
  eyebrow,
  title,
  delay = 0,
}) => {
  const bar = useSpring(delay, 200, 20);
  const eb = useSpring(delay + 4);
  const ti = useSpring(delay + 9);
  return (
    <div style={{ position: "absolute", left: 120, top: 110 }}>
      <div style={{ width: 160 * bar, height: 12, background: RED, marginBottom: 34 }} />
      <div
        style={{
          ...fadeUp(eb, 20),
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: 6,
          color: RED,
          marginBottom: 14,
        }}
      >
        {eyebrow}
      </div>
      <div style={{ ...fadeUp(ti), fontSize: 92, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2 }}>
        {title}
      </div>
    </div>
  );
};

export const Chip: React.FC<{
  text: string;
  delay: number;
  icon?: React.ReactNode;
  accent?: boolean;
  style?: React.CSSProperties;
}> = ({ text, delay, icon, accent, style }) => {
  const p = useSpring(delay, 13);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 24,
        padding: "26px 40px",
        borderRadius: 28,
        background: accent ? RED : "#FFFFFF",
        color: accent ? "#FFFFFF" : INK,
        boxShadow: "0 18px 50px rgba(17,17,17,0.10), 0 2px 6px rgba(17,17,17,0.06)",
        fontSize: 44,
        fontWeight: 700,
        opacity: p,
        transform: `translateX(${(1 - p) * 80}px) scale(${0.9 + 0.1 * p})`,
        ...style,
      }}
    >
      {icon}
      {text}
    </div>
  );
};

export const Check: React.FC<{ size?: number; color?: string; bg?: string }> = ({
  size = 44,
  color = "#FFFFFF",
  bg = RED,
}) => (
  <svg width={size} height={size} viewBox="0 0 44 44">
    <circle cx="22" cy="22" r="22" fill={bg} />
    <path d="M12 22.5l6.5 6.5L32 15.5" stroke={color} strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
