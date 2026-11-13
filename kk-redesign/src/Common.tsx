import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { HAS, type AssetName } from "./assets";
import { anim, C, IN, OUT, STYRENE } from "./theme";

// Живой, но тихий фон: чёрный, два медленных красных свечения и виньетка
export const Background: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / 60;
  const ax = 22 + Math.sin(t * 0.13) * 8;
  const ay = 18 + Math.cos(t * 0.11) * 6;
  const bx = 82 + Math.cos(t * 0.09) * 7;
  const by = 88 + Math.sin(t * 0.12) * 6;
  return (
    <AbsoluteFill style={{ backgroundColor: C.black }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(42% 52% at ${ax}% ${ay}%, rgba(239,49,36,0.16), rgba(239,49,36,0) 70%),
            radial-gradient(46% 56% at ${bx}% ${by}%, rgba(239,49,36,0.11), rgba(239,49,36,0) 70%)`,
        }}
      />
      <AbsoluteFill
        style={{ background: "radial-gradient(120% 90% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.6) 100%)" }}
      />
    </AbsoluteFill>
  );
};

// Вход и выход сцены: прозрачность, размытие и лёгкий масштаб
export const SceneShell: React.FC<{ children: React.ReactNode; fadeIn?: number; fadeOut?: number }> = ({
  children,
  fadeIn = 24,
  fadeOut = 22,
}) => {
  const f = useCurrentFrame();
  const { durationInFrames: d } = useVideoConfig();
  const i = anim(f, 0, fadeIn, 0, 1);
  const o = anim(f, d - fadeOut, d, 1, 0, IN);
  return (
    <AbsoluteFill
      style={{
        opacity: Math.min(i, o),
        filter: `blur(${(1 - i) * 10 + (1 - o) * 12}px)`,
        scale: 1.015 - 0.015 * i + (1 - o) * -0.02,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// Дорогое появление: прозрачность + сдвиг + размытие
export const Reveal: React.FC<{
  at: number;
  dur?: number;
  dy?: number;
  blur?: number;
  out?: number; // кадр начала ухода
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ at, dur = 40, dy = 34, blur = 14, out, style, children }) => {
  const f = useCurrentFrame();
  const p = anim(f, at, at + dur, 0, 1);
  const q = out === undefined ? 0 : anim(f, out, out + 22, 0, 1, IN);
  return (
    <div
      style={{
        opacity: p * (1 - q),
        translate: `0 ${(1 - p) * dy - q * dy * 0.6}px`,
        filter: `blur(${(1 - p) * blur + q * 10}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Заголовок, который появляется по словам
export const Words: React.FC<{
  text: string;
  at: number;
  step?: number;
  size: number;
  weight?: number;
  color?: string;
  out?: number;
  style?: React.CSSProperties;
}> = ({ text, at, step = 5, size, weight = 500, color = C.white, out, style }) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      columnGap: size * 0.26,
      fontFamily: STYRENE,
      fontSize: size,
      fontWeight: weight,
      lineHeight: 1.12,
      letterSpacing: -size * 0.015,
      color,
      ...style,
    }}
  >
    {text.split(" ").map((w, i) => (
      <Reveal key={i} at={at + i * step} dur={44} dy={size * 0.32} blur={12} out={out}>
        {w}
      </Reveal>
    ))}
  </div>
);

// Маленькая надпись над заголовком (глава)
export const Kicker: React.FC<{ text: string; at: number; out?: number }> = ({ text, at, out }) => {
  const f = useCurrentFrame();
  const line = anim(f, at, at + 36, 0, 1);
  return (
    <Reveal at={at + 4} out={out} dy={16}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ width: 44 * line, height: 3, background: C.red, borderRadius: 2 }} />
        <div style={{ fontFamily: STYRENE, fontSize: 26, fontWeight: 500, color: C.red, letterSpacing: 0.4 }}>
          {text}
        </div>
      </div>
    </Reveal>
  );
};

// Сгенерированный элемент или векторная заглушка
export const Asset: React.FC<{ name: AssetName; size: number; fallback: React.ReactNode; style?: React.CSSProperties }> = ({
  name,
  size,
  fallback,
  style,
}) =>
  HAS[name] ? (
    <Img src={staticFile(`els/${name}.png`)} style={{ width: size, height: size, objectFit: "contain", ...style }} />
  ) : (
    <div style={{ width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center", ...style }}>
      {fallback}
    </div>
  );

// Векторная «объёмная» плитка-иконка для заглушек
export const Tile: React.FC<{ size: number; tone?: "red" | "dark" | "white"; children: React.ReactNode }> = ({
  size,
  tone = "red",
  children,
}) => {
  const bg =
    tone === "red"
      ? "linear-gradient(160deg, #FF6A5E 0%, #EF3124 45%, #B8180F 100%)"
      : tone === "dark"
        ? "linear-gradient(160deg, #3A3A3E 0%, #1A1A1C 55%, #0E0E10 100%)"
        : "linear-gradient(160deg, #FFFFFF 0%, #F1F1F3 60%, #DADADF 100%)";
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.27,
        background: bg,
        boxShadow: `0 ${size * 0.12}px ${size * 0.3}px rgba(0,0,0,0.55), inset 0 ${size * 0.02}px 0 rgba(255,255,255,0.45), inset 0 -${size * 0.03}px ${size * 0.08}px rgba(0,0,0,0.25)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 42%)",
        }}
      />
      {children}
    </div>
  );
};

// Плавающее «дыхание» объекта
export const useFloat = (amp = 8, speed = 0.5) => {
  const f = useCurrentFrame();
  return Math.sin((f / 60) * Math.PI * speed) * amp;
};

export { OUT };
