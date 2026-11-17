import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, H, W } from "../lib/core";

export const Backdrop: React.FC = () => (
  <AbsoluteFill style={{ background: C.ink }} />
);

/** Film grain + vignette over everything. */
export const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame / 4) % 97;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <svg width={W} height={H} style={{ position: "absolute", inset: 0, mixBlendMode: "overlay", opacity: 0.14 }}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={seed} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width={W} height={H} filter="url(#grain)" />
      </svg>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 75% 70% at 50% 48%, rgba(0,0,0,0) 55%, rgba(0,0,0,.42) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
