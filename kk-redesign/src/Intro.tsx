import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "./Common";
import { anim, C, IN, STYRENE } from "./theme";

// Заставка 3 с: «РЕДИЗАЙН КК» крупно и жирно
export const Intro: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames: d } = useVideoConfig();

  const word = (at: number) => ({
    opacity: anim(f, at, at + 34, 0, 1),
    translate: `0 ${anim(f, at, at + 40, 46, 0)}px`,
    filter: `blur(${anim(f, at, at + 36, 16, 0)}px)`,
  });

  const exit = anim(f, d - 16, d, 0, 1, IN);
  const drift = interpolate(f, [0, d], [1, 1.035]);

  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          scale: drift,
          opacity: 1 - exit,
          filter: `blur(${exit * 12}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 52,
            fontFamily: STYRENE,
            fontWeight: 700,
            fontSize: 200,
            lineHeight: 1,
            letterSpacing: -6,
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

