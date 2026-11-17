import React from "react";
import { Img, interpolate } from "remotion";
import { noise2D } from "@remotion/noise";
import { BlobField } from "../components/Blobs";
import { Droplets, prop, Word } from "../components/Elements";
import { Thread, wavyThrough } from "../components/Thread";
import { C, clamp, EASE, EASE_IN_OUT, float, FONT_A, ramp, springAt, useVT } from "../lib/core";

/** Scenes 13–14 (voice 79.0 … end): the three colours finally meet; end card with the route. */

export const ActHBack: React.FC = () => {
  const t = useVT();
  const settle = interpolate(t, [88.6, 89.6], [0, 1], { ...clamp, easing: EASE_IN_OUT });
  const a = (t - 79) * 0.28;
  const orbit = (k: number, rad: number, ph: number): [number, number] => [960 + Math.cos(a + ph) * rad * 1.35, 560 + Math.sin(a + ph) * rad * 0.55];
  const o1 = orbit(0, 520, 0);
  const o2 = orbit(1, 470, 2.2);
  const o3 = orbit(2, 560, 4.2);
  const lerp = (p: [number, number], q: [number, number]): [number, number] => [p[0] + (q[0] - p[0]) * settle, p[1] + (q[1] - p[1]) * settle];
  const red = lerp(o1, [300, 860]);
  const blue = lerp(o2, [1600, 240]);
  const violet = lerp(o3, [1560, 930]);
  const appear = springAt(t, 79.4, { damping: 15, stiffness: 60 });
  const pulse = 1 + Math.exp(-Math.pow((t - 81.95) / 0.2, 2)) * 0.12;
  const fadeEnd = ramp(t, 92.4, 93.0);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: 1 - fadeEnd }}>
      <BlobField
        id="h-far"
        t={t}
        blur={38}
        opacity={0.7}
        blobs={[
          { x: 220, y: 200, r: 140 * appear, color: C.violet, seed: 141, wobble: 0.25 },
          { x: 1760, y: 620, r: 120 * appear, color: C.red, seed: 142, wobble: 0.25 },
        ]}
      />
      <BlobField
        id="h-main"
        t={t}
        goo={26}
        blobs={[
          { x: red[0], y: red[1], r: 270 * appear * pulse, color: C.red, seed: 143, wobble: 0.17 },
          { x: blue[0], y: blue[1], r: (250 + settle * 70) * appear, color: C.blue, seed: 144, wobble: 0.17 },
          { x: violet[0], y: violet[1], r: (230 - settle * 30) * appear, color: C.violet, seed: 145, wobble: 0.19 },
        ]}
      />
      <Word t={t} text="не откладывай" x={960} y={42} size={124} t0={82.4} mode="slam" align="center" stagger={0.018} exit={83.75} seed={146} />
      <Word t={t} text="спокойно" x={960} y={36} size={140} t0={86.77} mode="buoy" align="center" stagger={0.05} exit={88.55} seed={147} />
      <Nerves t={t} />
      <EndCard t={t} />
    </div>
  );
};

/** Flicker of "nervous" glyphs that dissolve into drops on "без лишнего стресса". */
const Nerves: React.FC<{ t: number }> = ({ t }) => {
  if (t < 87.5 || t > 88.7) return null;
  const glyphs = ["!", "?", "#", "!", "~", "?", "!"];
  const dissolve = ramp(t, 88.0, 88.3);
  return (
    <>
      {glyphs.map((g, i) => {
        const a = (i / glyphs.length) * Math.PI * 2;
        const x = 960 + Math.cos(a) * 330;
        const y = 330 + Math.sin(a) * 170;
        const flick = noise2D("n", i, Math.floor(t * 20)) > -0.2 ? 1 : 0.2;
        return (
          <React.Fragment key={i}>
            <div style={{ position: "absolute", left: x, top: y, translate: "-50% -50%", fontFamily: FONT_A, fontWeight: 900, fontSize: 70, color: C.white, opacity: flick * (1 - dissolve), rotate: `${noise2D("r", i, t) * 30}deg` }}>{g}</div>
            <Droplets t={t} t0={88.0} x={x} y={y} color={[C.red, C.blue, C.violet][i % 3]} count={3} spread={70} seed={150 + i} size={14} />
          </React.Fragment>
        );
      })}
    </>
  );
};

const NODES: { x: number; y: number; label: string; color: string }[] = [
  { x: 250, y: 640, label: "Alfa People", color: C.red },
  { x: 640, y: 600, label: "AI-ассистенты", color: C.violet },
  { x: 1030, y: 650, label: "AI-ментор", color: C.blue },
  { x: 1420, y: 600, label: "AI-наставник", color: C.red },
];

const EndCard: React.FC<{ t: number }> = ({ t }) => {
  if (t < 88.7) return null;
  const draw = interpolate(t, [89.25, 90.5], [0, 1], { ...clamp, easing: EASE_IN_OUT });
  const d = wavyThrough([[40, 690], ...NODES.map((n) => [n.x, n.y] as [number, number]), [1560, 520]], 30, 9);
  const out = ramp(t, 92.2, 92.9);
  const icon = springAt(t, 88.85, { damping: 13, stiffness: 110 });
  const f = float(t, 160, 8, 4.5);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: 1 - out }}>
      <Img
        src={prop("P10_ai_nastavnik_icon_hd")}
        style={{
          position: "absolute",
          left: 250 - 95,
          top: 230 - 95,
          width: 190,
          height: 190,
          scale: 0.5 + 0.5 * icon,
          opacity: Math.min(1, icon * 1.5),
          translate: `${f.x}px ${f.y}px`,
          filter: `blur(${(1 - Math.min(1, icon)) * 12}px) drop-shadow(0 20px 26px rgba(0,0,0,.4))`,
        }}
      />
      <Word t={t} text="AI-наставник" x={380} y={170} size={150} t0={88.95} stagger={0.035} seed={161} />
      <Word t={t} text="Знай больше, переживай меньше" x={386} y={320} size={46} t0={89.5} weight={500} stagger={0.012} seed={162} />
      <Thread d={d} to={draw} width={5} />
      {NODES.map((n, i) => {
        const at = 89.25 + (1.25 * (i + 1)) / (NODES.length + 1);
        const p = springAt(t, at, { damping: 10, stiffness: 180 });
        return (
          <React.Fragment key={n.label}>
            <div style={{ position: "absolute", left: n.x - 20, top: n.y - 20, width: 40, height: 40, borderRadius: "46% 54% 52% 48% / 50% 44% 56% 50%", background: n.color, scale: p, boxShadow: `0 0 30px ${n.color}88` }} />
            <Word t={t} text={n.label} x={n.x} y={n.y + 44} size={42} t0={at + 0.05} align="center" weight={700} stagger={0.015} seed={170 + i} />
          </React.Fragment>
        );
      })}
      <Word t={t} text="или виджет в разделе «Рабочее»" x={640} y={800} size={34} t0={90.7} weight={500} align="center" stagger={0.01} seed={180} color="rgba(255,255,255,.8)" />
    </div>
  );
};

/** Stopwatch zips past the camera on "пять минут". */
export const ActHFront: React.FC = () => {
  const t = useVT();
  if (t < 83.5 || t > 84.9) return null;
  const p = interpolate(t, [83.55, 84.75], [0, 1], { ...clamp, easing: EASE });
  return (
    <Img
      src={prop("P17_stopwatch")}
      style={{
        position: "absolute",
        left: interpolate(p, [0, 1], [-420, 2100]),
        top: interpolate(p, [0, 1], [760, 360]) - Math.sin(p * Math.PI) * 120,
        width: 380,
        height: 380,
        rotate: `${p * 70 - 20}deg`,
        filter: "blur(9px) drop-shadow(0 30px 40px rgba(0,0,0,.5))",
      }}
    />
  );
};
