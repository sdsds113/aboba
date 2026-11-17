import React from "react";
import { Img, interpolate, useCurrentFrame } from "remotion";
import { prop, Word } from "../components/Elements";
import { Thread, wavyThrough } from "../components/Thread";
import { C, clamp, EASE, float, FPS, springAt, TOTAL_SECONDS, VO_OFFSET, VOICE_DURATION } from "../lib/core";

const ringPath = (x: number, y: number, r: number) => {
  const pts: string[] = [];
  for (let i = 0; i <= 36; i++) {
    const a = -2.4 + (i / 36) * Math.PI * 2 * 1.08;
    const rr = r * (1 + 0.03 * Math.sin(i * 1.7) + (i / 36) * 0.05);
    pts.push(`${i === 0 ? "M" : "L"} ${(x + Math.cos(a) * rr).toFixed(1)} ${(y + Math.sin(a) * rr * 0.96).toFixed(1)}`);
  }
  return pts.join(" ");
};

/**
 * Title card «AI-наставник»: opens the video (until the voice starts) and returns at the end.
 * Driven by a local clock `lt` (seconds since this appearance started).
 */
const TitleCard: React.FC<{ lt: number; opacity: number }> = ({ lt, opacity }) => {
  if (opacity <= 0.001) return null;
  const icon = springAt(lt, 0.3, { damping: 24, stiffness: 60 });
  const draw = interpolate(lt, [0.6, 2.2], [0, 1], { ...clamp, easing: EASE });
  const ring = interpolate(lt, [0.9, 2.0], [0, 1], { ...clamp, easing: EASE });
  const fi = float(lt, 3, 8, 5);
  const IX = 1480;
  const IY = 470;
  const IS = 480;
  const d = wavyThrough(
    [
      [-40, 760],
      [520, 700],
      [1000, 760],
      [1300, 720],
    ],
    26,
    4,
  );
  return (
    <div style={{ position: "absolute", inset: 0, opacity }}>
      <Thread d={d} to={draw} width={4} opacity={0.9} />
      <Thread d={ringPath(IX, IY + fi.y, IS * 0.56)} to={ring} width={5} />
      <Img
        src={prop("P10_ai_nastavnik_icon_hd")}
        style={{
          position: "absolute",
          left: IX - IS / 2,
          top: IY - IS / 2,
          width: IS,
          height: IS,
          opacity: Math.min(1, icon * 1.3),
          scale: 0.9 + 0.1 * icon,
          translate: `${fi.x}px ${fi.y}px`,
          filter: `blur(${(1 - Math.min(1, icon)) * 10}px) drop-shadow(0 30px 40px rgba(0,0,0,.5))`,
        }}
      />
      <Word t={lt} text="AI-наставник" x={120} y={420} size={140} t0={0.45} stagger={0.03} seed={301} />
    </div>
  );
};

/** Opening: title until the voice starts. Ending: back to the title, then fade to black. */
export const TitleIntroOutro: React.FC = () => {
  const s = useCurrentFrame() / FPS;
  const introOut = interpolate(s, [VO_OFFSET - 0.6, VO_OFFSET - 0.05], [1, 0], { ...clamp, easing: EASE });
  const outroStart = VO_OFFSET + VOICE_DURATION + 0.28;
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
