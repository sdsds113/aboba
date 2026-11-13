import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "./Common";
import { anim, C, IN, STYRENE, blp, fb, fx, mv } from "./theme";

// Заставка: «РЕДИЗАЙН КК» крупно и жирно, около 3 с
export const Intro: React.FC<{ bg?: boolean }> = ({ bg = true }) => {
  const f = useCurrentFrame();
  const { durationInFrames: d } = useVideoConfig();

  const word = (from: number): React.CSSProperties => ({
    opacity: anim(f, from, from + 40, 0, 1),
    // GPU-слой: текст не перерастрируется и не прыгает по пикселям
    ...mv(true, 0, anim(f, from, from + 54, 40, 0)),
    filter: `${blp(fb(anim(f, from, from + 44, 0, 1)) * 14)}`,
  });

  const exit = anim(f, d - 18, d, 0, 1, IN);

  return (
    <AbsoluteFill>
      {bg ? <Background /> : null}
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          opacity: 1 - exit,
          filter: `${blp(fx(exit) * 10)}`,
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
