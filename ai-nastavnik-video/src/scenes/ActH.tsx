import React from "react";
import { interpolate } from "remotion";
import { Word } from "../components/Elements";
import { clamp, EASE, useVT } from "../lib/core";

/** Scene 13 (voice 79.2 … 89.2): calm finale; key words only. The title card returns afterwards. */
export const ActHBack: React.FC = () => {
  const t = useVT();
  const inP = interpolate(t, [79.3, 79.8], [0, 1], { ...clamp, easing: EASE });
  return (
    <div style={{ position: "absolute", inset: 0, opacity: inP }}>
      <Word t={t} text="не откладывай" x={960} y={60} size={120} t0={82.4} align="center" stagger={0.02} exit={83.9} seed={146} />
      <Word t={t} text="спокойно" x={960} y={60} size={130} t0={86.77} mode="buoy" align="center" stagger={0.04} exit={88.7} seed={147} />
    </div>
  );
};
