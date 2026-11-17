import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { clamp, EASE, float, FPS, TOTAL_SECONDS } from "../lib/core";

/** White «СВ · А» logo hanging in the top-left corner for the whole video. */
export const SivLogo: React.FC = () => {
  const s = useCurrentFrame() / FPS;
  const op = interpolate(s, [0.3, 1.1, TOTAL_SECONDS - 1.3, TOTAL_SECONDS - 0.1], [0, 0.95, 0.95, 0], { ...clamp, easing: EASE });
  const f = float(s, 17, 3, 6);
  const W = 150;
  return (
    <Img
      src={staticFile("assets/props/logo_siv_white.png")}
      style={{ position: "absolute", left: 56, top: 44, width: W, height: (W * 110) / 263, opacity: op, translate: `${f.x}px ${f.y}px` }}
    />
  );
};
