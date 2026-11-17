import React from "react";
import { Img, interpolate } from "remotion";
import { openSmoothPath } from "../components/Blobs";
import { Prop, prop, Word } from "../components/Elements";
import { Thread } from "../components/Thread";
import { clamp, EASE, EASE_IN_OUT, float, ramp, springAt, useVT } from "../lib/core";

/** Scene 6 (voice 32.4 … 40.4): "AI-наставник", personal trainer, "где ты плаваешь". */

const wave = (x: number, t: number) => 840 + Math.sin(x / 150 - t * 1.6) * 18 + Math.sin(x / 70 - t * 0.9) * 4;

const wavePath = (t: number) => {
  const pts: [number, number][] = [];
  for (let x = -40; x <= 1960; x += 40) pts.push([x, wave(x, t)]);
  return openSmoothPath(pts);
};

export const ActCBack: React.FC = () => {
  const t = useVT();
  const sceneIn = interpolate(t, [32.6, 33.1], [0, 1], { ...clamp, easing: EASE });
  const sceneOut = interpolate(t, [39.9, 40.4], [1, 0], { ...clamp, easing: EASE });
  const titleOut = ramp(t, 35.0, 35.5);
  const icon = springAt(t, 33.5, { damping: 26, stiffness: 70 });
  const fl = float(t, 5, 6, 5);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: sceneIn * sceneOut }}>
      {t < 35.6 ? (
        <div style={{ position: "absolute", inset: 0, opacity: 1 - titleOut }}>
          <Img
            src={prop("P10_ai_nastavnik_icon_hd")}
            style={{
              position: "absolute",
              left: 700 - 130,
              top: 250 - 130,
              width: 260,
              height: 260,
              scale: 0.9 + 0.1 * icon,
              opacity: Math.min(1, icon * 1.3),
              translate: `${fl.x}px ${fl.y}px`,
              filter: `blur(${(1 - Math.min(1, icon)) * 10}px) drop-shadow(0 26px 30px rgba(0,0,0,.45))`,
            }}
          />
          <Word t={t} text="AI-наставник" x={700} y={430} size={150} t0={33.92} align="center" stagger={0.03} seed={83} />
        </div>
      ) : null}
      <Word t={t} text="тренажёр" x={110} y={150} size={130} t0={35.5} exit={37.6} seed={84} />
      <Thread d={wavePath(t)} to={ramp(t, 37.55, 38.35, EASE_IN_OUT)} from={ramp(t, 39.6, 40.2)} width={4} />
      <Lifebuoy t={t} />
    </div>
  );
};

const Lifebuoy: React.FC<{ t: number }> = ({ t }) => {
  if (t < 37.85) return null;
  const toss = interpolate(t, [38.74, 39.5], [0, 1], { ...clamp, easing: EASE_IN_OUT });
  const bx = interpolate(toss, [0, 1], [1460, 1300]);
  const by = interpolate(toss, [0, 1], [wave(1460, t) - 60, 600]) - Math.sin(toss * Math.PI) * 60;
  return <Prop t={t} src={prop("P12_lifebuoy")} x={bx} y={by} size={240} enter={37.9} seed={86} amp={3} rotate={Math.sin(t * 1.6) * 5 + toss * 40} />;
};
