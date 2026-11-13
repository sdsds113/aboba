import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "./Common";
import { anim, C, IN, STYRENE } from "./theme";

// Заставка: «РЕДИЗАЙН КК» крупно и жирно, около 3 с
export const Intro: React.FC<{ bg?: boolean }> = ({ bg = true }) => {
  const f = useCurrentFrame();
  const { durationInFrames: d } = useVideoConfig();

  const word = (from: number): React.CSSProperties => ({
    opacity: anim(f, from, from + 40, 0, 1),
    // GPU-слой: текст не перерастрируется и не прыгает по пикселям
    transform: `translate3d(0, ${anim(f, from, from + 54, 40, 0)}px, 0)`,
    filter: `blur(${anim(f, from, from + 44, 14, 0)}px)`,
    willChange: "transform, opacity, filter",
  });

  const exit = anim(f, d - 18, d, 0, 1, IN);
  const drift = interpolate(f, [0, d], [1, 1.025]);

  return (
    <AbsoluteFill>
      {bg ? <Background /> : null}
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          transform: `scale3d(${drift}, ${drift}, 1)`,
          willChange: "transform",
          opacity: 1 - exit,
          filter: `blur(${exit * 10}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 40,
            fontFamily: STYRENE,
            fontWeight: 700,
            fontSize: 150,
            lineHeight: 1,
            letterSpacing: -4,
            color: C.white,
          }}
        >
          <div style={word(4)}>РЕДИЗАЙН</div>
          <div style={{ ...word(14), color: C.red }}>КК</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
