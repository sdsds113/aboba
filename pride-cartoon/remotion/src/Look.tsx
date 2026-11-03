import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { LOOK } from "./config";

/** Единый «кинолук»: виньетка + плёночное зерно поверх всего видео */
export const Look: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,${LOOK.vignette}) 100%)`,
        }}
      />
      <AbsoluteFill style={{ opacity: LOOK.grain, mixBlendMode: "overlay" }}>
        <svg width="100%" height="100%">
          <filter id={`grain-${frame}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={frame % 97} stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#grain-${frame})`} />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
