import React from "react";
import { Img, interpolate } from "remotion";
import { BlobField } from "../components/Blobs";
import { Prop, prop, Word } from "../components/Elements";
import { openSmoothPath } from "../components/Blobs";
import { Thread } from "../components/Thread";
import { C, clamp, EASE, EASE_IN_OUT, float, ramp, springAt, useVT } from "../lib/core";

/** Scene 6 (voice 32.3 … 40.6): blue flood, "AI-наставник", personal trainer, "где ты плаваешь". */

const HOLE = { x: 620 + ((719 - 512) / 1024) * 640, y: 470 + (4 / 1024) * 640 };

const wave = (x: number, t: number) => 840 + Math.sin(x / 140 - t * 2.6) * 22 + Math.sin(x / 61 - t * 1.3) * 6;

export const ActCBack: React.FC = () => {
  const t = useVT();
  // flood from the puzzle gap, then retract to a pool behind the character
  const fill = interpolate(t, [32.38, 33.25], [0, 1], { ...clamp, easing: EASE_IN_OUT });
  const retract = interpolate(t, [35.0, 35.7], [0, 1], { ...clamp, easing: EASE });
  const cx = interpolate(retract, [0, 1], [HOLE.x, 960]);
  const cy = interpolate(retract, [0, 1], [HOLE.y, 560]);
  const r = t < 35 ? 2300 * fill : interpolate(retract, [0, 1], [2300, 470]);
  const exit = ramp(t, 39.9, 40.5);
  const titleOut = ramp(t, 34.9, 35.4);
  const icon = springAt(t, 33.55, { damping: 13, stiffness: 110 });
  const fl = float(t, 5, 10, 4);
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <BlobField
        id="c-flood"
        t={t}
        goo={0}
        opacity={1 - exit * 0.6}
        blobs={[
          { x: cx, y: cy, r: r * (1 - exit * 0.4), color: C.blue, seed: 81, wobble: 0.12 + 0.12 * fill * (1 - retract) },
          { x: 1500, y: 260, r: 120 * retract * (1 - exit), color: C.blue, seed: 82, wobble: 0.3 },
        ]}
      />
      {/* AI-наставник title on the blue */}
      {t < 35.5 ? (
        <div style={{ position: "absolute", inset: 0, opacity: 1 - titleOut, scale: 1 - 0.15 * titleOut, filter: titleOut > 0 ? `blur(${titleOut * 16}px)` : undefined }}>
          <Img
            src={prop("P10_ai_nastavnik_icon_hd")}
            style={{
              position: "absolute",
              left: 960 - 140,
              top: 150 - 140,
              width: 280,
              height: 280,
              scale: 0.5 + 0.5 * icon,
              opacity: Math.min(1, icon * 1.5),
              translate: `${fl.x}px ${fl.y}px`,
              filter: `blur(${(1 - Math.min(1, icon)) * 14}px) drop-shadow(0 26px 30px rgba(0,0,0,.35))`,
            }}
          />
          <Word t={t} text="AI-наставник" x={960} y={380} size={196} t0={33.92} mode="drop" align="center" color={C.ink} stagger={0.045} seed={83} />
        </div>
      ) : null}
      {/* personal trainer word does push-ups */}
      <div style={{ position: "absolute", inset: 0, translate: `0 ${pushups(t) * 26}px` }}>
        <Word t={t} text="тренажёр" x={110} y={130} size={140} t0={35.5} exit={37.6} seed={84} />
      </div>
      {/* the cord becomes water, a life ring bobs on it */}
      <Thread d={wavePath(t)} to={ramp(t, 37.55, 38.15, EASE_IN_OUT)} from={ramp(t, 39.6, 40.2)} width={5} />
      <Lifebuoy t={t} />
    </div>
  );
};

const pushups = (t: number) => {
  if (t < 35.9 || t > 36.9) return 0;
  return Math.max(0, Math.sin(((t - 35.9) / 0.5) * Math.PI * 2 - Math.PI / 2) * 0.5 + 0.5);
};

const wavePath = (t: number) => {
  const pts: [number, number][] = [];
  for (let x = -40; x <= 1960; x += 40) pts.push([x, wave(x, t)]);
  return openSmoothPath(pts);
};

const Lifebuoy: React.FC<{ t: number }> = ({ t }) => {
  if (t < 37.85) return null;
  const toss = interpolate(t, [38.74, 39.2], [0, 1], { ...clamp, easing: EASE });
  const bx = interpolate(toss, [0, 1], [1460, 1270]);
  const by = interpolate(toss, [0, 1], [wave(1460, t) - 60, 560]) - Math.sin(toss * Math.PI) * 180;
  const out = ramp(t, 39.9, 40.4);
  return (
    <Prop
      t={t}
      src={prop("P12_lifebuoy")}
      x={bx}
      y={by + out * 900}
      size={250}
      enter={37.9}
      enterStyle="pop"
      seed={86}
      amp={4}
      rotate={Math.sin(t * 2.6) * 8 + toss * 200}
    />
  );
};

export const ActCFront: React.FC = () => null;
