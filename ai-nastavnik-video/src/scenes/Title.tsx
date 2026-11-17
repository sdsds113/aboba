import React from "react";
import { Img, interpolate, useCurrentFrame } from "remotion";
import { prop, sticker, Word } from "../components/Elements";
import { Thread, wavyThrough } from "../components/Thread";
import { C, clamp, EASE, float, FPS, springAt, TOTAL_SECONDS, VO_OFFSET } from "../lib/core";

/**
 * Title card «AI-наставник»: opens the video (until the voice starts) and returns at the end.
 * Driven by a local clock `lt` (seconds since this appearance started).
 */
const TitleCard: React.FC<{ lt: number; opacity: number }> = ({ lt, opacity }) => {
  if (opacity <= 0.001) return null;
  const icon = springAt(lt, 0.35, { damping: 24, stiffness: 70 });
  const max = springAt(lt, 0.5, { damping: 26, stiffness: 60 });
  const draw = interpolate(lt, [0.6, 2.2], [0, 1], { ...clamp, easing: EASE });
  const fi = float(lt, 3, 6, 5);
  const fm = float(lt, 9, 3, 6);
  const d = wavyThrough(
    [
      [-40, 760],
      [520, 700],
      [1000, 760],
      [1400, 690],
    ],
    26,
    4,
  );
  return (
    <div style={{ position: "absolute", inset: 0, opacity }}>
      <Thread d={d} to={draw} width={4} opacity={0.9} />
      <Img
        src={prop("P10_ai_nastavnik_icon_hd")}
        style={{
          position: "absolute",
          left: 150,
          top: 250,
          width: 190,
          height: 190,
          opacity: Math.min(1, icon * 1.3),
          scale: 0.9 + 0.1 * icon,
          translate: `${fi.x}px ${fi.y}px`,
          filter: `blur(${(1 - Math.min(1, icon)) * 10}px) drop-shadow(0 20px 26px rgba(0,0,0,.45))`,
        }}
      />
      <Word t={lt} text="AI-наставник" x={120} y={480} size={128} t0={0.45} stagger={0.03} seed={301} />
      <Img
        src={sticker("E09")}
        style={{
          position: "absolute",
          left: 1450 - 1000 / 3,
          top: 80 + (1 - max) * 80,
          width: 2000 / 3,
          height: 1000,
          opacity: Math.min(1, max * 1.3),
          translate: `${fm.x}px ${fm.y * 0.5}px`,
          transformOrigin: "50% 100%",
          filter: `drop-shadow(0 0 28px rgba(0,0,0,.55)) drop-shadow(0 0 60px ${C.red}44) blur(${(1 - Math.min(1, max)) * 10}px)`,
        }}
      />
    </div>
  );
};

/** Opening: title until the voice starts. Ending: back to the title, then fade to black. */
export const TitleIntroOutro: React.FC = () => {
  const s = useCurrentFrame() / FPS;
  const introOut = interpolate(s, [VO_OFFSET - 0.6, VO_OFFSET - 0.05], [1, 0], { ...clamp, easing: EASE });
  const outroStart = VO_OFFSET + 89.0;
  const outroIn = interpolate(s, [outroStart, outroStart + 0.8], [0, 1], { ...clamp, easing: EASE });
  const black = interpolate(s, [TOTAL_SECONDS - 1.3, TOTAL_SECONDS - 0.1], [0, 1], { ...clamp, easing: EASE });
  return (
    <>
      {s < VO_OFFSET ? <TitleCard lt={s} opacity={introOut} /> : null}
      {s >= outroStart ? <TitleCard lt={s - outroStart + 0.3} opacity={outroIn} /> : null}
      <div style={{ position: "absolute", inset: 0, background: C.ink, opacity: black, pointerEvents: "none" }} />
    </>
  );
};
