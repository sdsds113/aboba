// Заставка «Твоя первая карта»: красный фон из ролика, слева название,
// справа Макс машет рукой, сверху справа белый логотип СиВ, по краям пара 3D-предметов.
// Показывается в начале и ещё раз в конце ролика.
import React from "react";
import { Easing, Img, interpolate, spring, staticFile, useVideoConfig } from "remotion";

const FONT = "Styrene, Arial, sans-serif";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const smooth = Easing.bezier(0.16, 1, 0.3, 1);
const BOUNCY = { damping: 8, stiffness: 150, mass: 0.6 };

// Макс на ведущем плане и в заставке стоит в одном месте
export const MAX_BOX = { left: 1077, top: 320, size: 800 };

const ITEMS: { src: string; x: number; y: number; size: number; at: number; rot: number }[] = [
  { src: "el_01_card", x: 10, y: 730, size: 380, at: 0.0, rot: -14 },
  { src: "el_08_coins_fall", x: 520, y: 820, size: 220, at: 0.5, rot: 8 },
  { src: "el_02_sparkles", x: 880, y: 190, size: 190, at: 1.0, rot: 0 },
];

// lt: секунды от начала заставки; out: 0..1, уход в конце первой заставки
export const IntroContent: React.FC<{ lt: number; out?: number }> = ({ lt, out = 0 }) => {
  const { fps } = useVideoConfig();
  const t = lt;
  const titleLines = ["Твоя первая", "карта"];
  return (
    <>
      {ITEMS.map((it, i) => {
        const local = t - it.at;
        if (local < 0) return null;
        const enter = spring({ frame: Math.round(local * fps), fps, config: BOUNCY });
        const fl = Math.sin(local * 1.4 + i) * 8;
        return (
          <Img
            key={it.src}
            src={staticFile(`el/${it.src}.png`)}
            style={{
              position: "absolute",
              left: it.x,
              top: it.y,
              width: it.size,
              height: it.size,
              opacity: Math.min(1, local / 0.2) * (1 - out),
              scale: String((0.6 + 0.4 * enter) * (1 - 0.15 * out)),
              filter: "drop-shadow(0 26px 24px rgba(60, 0, 0, 0.25))",
              translate: `0px ${fl + 40 * (1 - enter) - 60 * out}px`,
              rotate: `${it.rot + Math.sin(local * 1.1 + i) * 2}deg`,
            }}
          />
        );
      })}

      <div
        style={{
          position: "absolute",
          left: 120,
          top: 330,
          width: 900,
          // название по центру свободной части кадра, слева от Макса
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 136,
          lineHeight: 1.0,
          letterSpacing: "-0.02em",
          color: "#FFFFFF",
          textShadow: "0 18px 50px rgba(90, 0, 0, 0.35)",
          opacity: 1 - out,
          translate: `0px ${-30 * out}px`,
        }}
      >
        {titleLines.map((line, li) => {
          const p = interpolate(t, [0.5 + li * 0.5, 1.0 + li * 0.5], [0, 1], { ...clamp, easing: smooth });
          return (
            <div key={li} style={{ opacity: p, translate: `0px ${50 * (1 - p)}px`, scale: String(0.94 + 0.06 * p) }}>
              {line}
            </div>
          );
        })}
      </div>

      {/* белый логотип СиВ справа сверху */}
      <Img
        src={staticFile("logo_siv_white.png")}
        style={{
          position: "absolute",
          right: 96,
          top: 84,
          height: 72,
          opacity: interpolate(t, [2.0, 2.4], [0, 1], clamp) * (1 - out),
          translate: `0px ${interpolate(t, [2.0, 2.4], [-12, 0], { ...clamp, easing: smooth })}px`,
        }}
      />

      <Img
        src={staticFile("char/max_09_bye.png")}
        style={{
          position: "absolute",
          left: MAX_BOX.left,
          top: MAX_BOX.top,
          width: MAX_BOX.size,
          height: MAX_BOX.size,
          opacity: interpolate(t, [1.5, 1.7], [0, 1], clamp) * (1 - out),
          translate: `0px ${interpolate(t, [1.5, 1.65, 1.9], [30, -14, 0], { ...clamp, easing: Easing.inOut(Easing.quad) }) + Math.sin(t * 1.6) * 3}px`,
        }}
      />
    </>
  );
};
