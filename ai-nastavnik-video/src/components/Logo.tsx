import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { clamp, EASE, float, FPS, TOTAL_SECONDS, VO_OFFSET, VOICE_DURATION } from "../lib/core";

/** White «СВ» logo — only on the opening and closing title cards. */
export const SivLogo: React.FC = () => {
  const s = useCurrentFrame() / FPS;
  const outroStart = VO_OFFSET + VOICE_DURATION + 0.28;
  const intro = interpolate(s, [0.3, 1.0, VO_OFFSET - 0.6, VO_OFFSET - 0.05], [0, 1, 1, 0], { ...clamp, easing: EASE });
  const outro = interpolate(s, [outroStart, outroStart + 0.8, TOTAL_SECONDS - 1.3, TOTAL_SECONDS - 0.1], [0, 1, 1, 0], { ...clamp, easing: EASE });
  const op = Math.max(intro, outro);
  if (op <= 0) return null;
  const f = float(s, 17, 3, 6);
  const H = 64;
  return <Img src={staticFile("assets/props/logo_sv_white.png")} style={{ position: "absolute", left: 70, top: 60, height: H, width: "auto", opacity: op, translate: `${f.x}px ${f.y}px` }} />;
};
