import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "./Common";
import { anim, C, IN, STYRENE, blp, fb, fx, mv } from "./theme";

// Заставка: «РЕДИЗАЙН КОРОТКОЙ КАРТОЧКИ КЛИЕНТА» крупно и жирно, около 3 с
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
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            fontFamily: STYRENE,
            fontWeight: 700,
            fontSize: 118,
            lineHeight: 1.04,
            letterSpacing: -3,
            color: C.white,
            textAlign: "center",
          }}
        >
          <div style={word(4)}>РЕДИЗАЙН КОРОТКОЙ</div>
          <div style={{ ...word(14), color: C.red }}>КАРТОЧКИ КЛИЕНТА</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
