import React from "react";
import { Img, interpolate, staticFile } from "remotion";
import { Video } from "@remotion/media";
import { Prop, prop } from "../components/Elements";
import { Box, Cam, ClickRipple, HighlightBars, LoopMark, MacWindow, Spotlight, srcBox } from "../components/MacWindow";
import { Thread, wavyThrough } from "../components/Thread";
import { C, clamp, EASE, EASE_IN_OUT, float, FONT_A, keyframes, ramp, springAt, useVT } from "../lib/core";

/** Screencast scenes: one big 16:9 window in the centre, the AI-наставник icon rides on its corner. */

export const WIN = { cx: 1000, cy: 500, scale: 0.8 };
const winW = 1920 * WIN.scale;
const winH = 1080 * WIN.scale + 40;
const CORNER = { x: WIN.cx - winW / 2 - 105, y: WIN.cy - winH / 2 + 110 };

/** The hero icon pinned to the window's top-left corner. */
const HeroBadge: React.FC<{ t: number; t0: number; opacity: number }> = ({ t, t0, opacity }) => {
  const e = springAt(t, t0, { damping: 24, stiffness: 80 });
  const f = float(t, 33, 4, 5);
  const S = 140;
  return (
    <Img
      src={prop("P10_ai_nastavnik_icon_hd")}
      style={{ position: "absolute", left: CORNER.x - S / 2, top: CORNER.y - S / 2, width: S, height: S, translate: `${f.x}px ${f.y}px`, opacity: Math.min(1, e * 1.3) * opacity, scale: 0.85 + 0.15 * e, filter: "drop-shadow(0 16px 22px rgba(0,0,0,.5))" }}
    />
  );
};

const Win: React.FC<{ t: number; cam: Cam; inAt: number; outAt: number; children: React.ReactNode }> = ({ t, cam, inAt, outAt, children }) => {
  const inP = interpolate(t, [inAt, inAt + 0.5], [0, 1], { ...clamp, easing: EASE });
  const outP = interpolate(t, [outAt, outAt + 0.5], [0, 1], { ...clamp, easing: EASE });
  const op = inP * (1 - outP);
  if (op <= 0) return null;
  return (
    <>
      <MacWindow cx={WIN.cx} cy={WIN.cy + (1 - inP) * 24} scale={WIN.scale} cam={cam} opacity={op}>
        {children}
      </MacWindow>
      <HeroBadge t={t} t0={inAt + 0.2} opacity={op} />
    </>
  );
};

const video = (file: string) => <Video src={staticFile(`video/${file}`)} muted style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080 }} />;

/* ---------- S7: training setup (voice 40.0 … 47.6) ---------- */
export const SceneSetup: React.FC = () => {
  const t = useVT();
  const cam = keyframes(t, [
    { t: 40.0, zoom: 1, fx: 960, fy: 540 },
    { t: 41.0, zoom: 1, fx: 960, fy: 540 },
    { t: 41.9, zoom: 1.4, fx: 1000, fy: 360 },
    { t: 43.6, zoom: 1.4, fx: 1000, fy: 360 },
    { t: 44.2, zoom: 1.6, fx: 800, fy: 360 },
    { t: 45.1, zoom: 1.6, fx: 800, fy: 360 },
    { t: 45.7, zoom: 1.6, fx: 760, fy: 430 },
  ]);
  return (
    <Win t={t} cam={cam} inAt={40.0} outAt={47.15}>
      {video("sc07_setup.mp4")}
      <Spotlight id="d1" t={t} t0={42.2} t1={43.5} box={srcBox(534, 322, 996, 394)} />
      <LoopMark t={t} t0={42.25} t1={43.5} box={srcBox(534, 322, 996, 394)} zoom={cam.zoom} seed={3} />
      <ClickRipple t={t} t0={42.36} x={973} y={358} zoom={cam.zoom} />
      <ClickRipple t={t} t0={43.36} x={1424} y={423} zoom={cam.zoom} />
      <Spotlight id="d2" t={t} t0={44.2} t1={45.1} box={srcBox(534, 316, 1060, 358)} />
      <ClickRipple t={t} t0={44.12} x={707} y={337} zoom={cam.zoom} />
      <Spotlight id="d3" t={t} t0={45.2} t1={46.4} box={srcBox(534, 410, 840, 452)} />
      <Spotlight id="d4" t={t} t0={46.4} t1={47.2} box={srcBox(530, 452, 622, 476)} pad={10} />
      <LoopMark t={t} t0={46.47} t1={47.2} box={srcBox(530, 454, 622, 476)} zoom={cam.zoom} seed={5} pad={10} />
    </Win>
  );
};

/* ---------- S9: the answer from the knowledge base (voice 53.0 … 60.1) ---------- */
const BOLD: Box[] = [srcBox(1283, 389, 1356, 408), srcBox(545, 414, 955, 433), srcBox(1012, 414, 1333, 433), srcBox(545, 439, 903, 458)];

export const SceneAnswer: React.FC = () => {
  const t = useVT();
  const cam = keyframes(t, [
    { t: 53.0, zoom: 1.35, fx: 890, fy: 470 },
    { t: 53.6, zoom: 1.35, fx: 890, fy: 470 },
    { t: 54.5, zoom: 1, fx: 960, fy: 540 },
    { t: 55.2, zoom: 1.45, fx: 840, fy: 560 },
    { t: 57.75, zoom: 1.45, fx: 840, fy: 560 },
    { t: 57.9, zoom: 1.4, fx: 950, fy: 440 },
  ]);
  const dip = 1 - Math.exp(-Math.pow((t - 57.88) / 0.07, 2)) * 0.9;
  return (
    <>
      <Win t={t} cam={cam} inAt={53.0} outAt={59.67}>
        <div style={{ position: "absolute", inset: 0, opacity: dip }}>{video("sc09_answer.mp4")}</div>
        <ClickRipple t={t} t0={53.12} x={1019} y={502} zoom={cam.zoom} />
        <Spotlight id="e1" t={t} t0={55.2} t1={57.75} box={srcBox(545, 365, 1092, 460)} />
        <LoopMark t={t} t0={56.19} t1={56.62} box={srcBox(560, 390, 1090, 410)} zoom={cam.zoom} seed={11} dur={0.32} pad={6} />
        <LoopMark t={t} t0={56.6} t1={57.02} box={srcBox(560, 415, 1066, 435)} zoom={cam.zoom} seed={12} dur={0.32} pad={6} />
        <LoopMark t={t} t0={57.0} t1={57.4} box={srcBox(560, 440, 880, 460)} zoom={cam.zoom} seed={13} dur={0.32} pad={6} />
        <Spotlight id="e2" t={t} t0={57.35} t1={57.75} box={srcBox(663, 760, 778, 782)} pad={8} />
        <LoopMark t={t} t0={57.38} t1={57.75} box={srcBox(663, 760, 778, 782)} zoom={cam.zoom} seed={14} dur={0.3} pad={8} />
        <HighlightBars t={t} t0={58.3} boxes={BOLD} per={0.24} />
        <Highlighter t={t} t0={58.3} boxes={BOLD} per={0.24} zoom={cam.zoom} />
      </Win>
      <Prop t={t} src={prop("P16_open_book")} x={1640} y={150} size={220} enter={55.21} exit={56.8} seed={105} rotate={-8} />
    </>
  );
};

const Highlighter: React.FC<{ t: number; t0: number; boxes: Box[]; per: number; zoom: number }> = ({ t, t0, boxes, per, zoom }) => {
  const total = boxes.length * per + per * 0.1;
  if (t < t0 - 0.1 || t > t0 + total + 0.5) return null;
  const k = Math.min(boxes.length - 1, Math.max(0, Math.floor((t - t0) / per)));
  const p = interpolate(t, [t0 + k * per, t0 + k * per + per * 1.1], [0, 1], { ...clamp, easing: EASE });
  const b = boxes[k];
  const x = b[0] + (b[2] - b[0]) * p;
  const y = (b[1] + b[3]) / 2;
  const s = 150 / zoom;
  const out = ramp(t, t0 + total, t0 + total + 0.4);
  const inn = ramp(t, t0 - 0.1, t0 + 0.05);
  return <Img src={prop("P15_highlighter")} style={{ position: "absolute", left: x - s * 0.1, top: y - s * 0.88, width: s, height: s, opacity: inn * (1 - out), filter: "drop-shadow(0 10px 12px rgba(0,0,0,.35))" }} />;
};

/* ---------- S10: looks like a normal chat; five minutes (voice 59.7 … 63.8) ---------- */
export const SceneChat: React.FC = () => {
  const t = useVT();
  if (t < 59.7 || t > 63.9) return null;
  const cards = [
    { src: "stills/ui_user_msg.png", w: 267 * 1.9, h: 104 * 1.9, x: 1290, y: 300, d: 0 },
    { src: "stills/ui_question.png", w: 836 * 1.0, h: 100 * 1.0, x: 760, y: 520, d: 0.25 },
    { src: "stills/ui_input.png", w: 1026 * 0.85, h: 56 * 0.85, x: 960, y: 740, d: 0.5 },
  ];
  const out = interpolate(t, [62.1, 62.6], [0, 1], { ...clamp, easing: EASE });
  return (
    <>
      {cards.map((c, i) => {
        const e = springAt(t, 59.8 + c.d, { damping: 26, stiffness: 70 });
        const f = float(t, 110 + i, 4, 5.5);
        return (
          <div key={i} style={{ position: "absolute", left: c.x - c.w / 2, top: c.y - c.h / 2 + (1 - e) * 30, width: c.w, height: c.h, translate: `${f.x}px ${f.y}px`, opacity: Math.min(1, e * 1.3) * (1 - out), filter: `blur(${(1 - Math.min(1, e)) * 8 + out * 10}px)`, borderRadius: 18, overflow: "hidden", boxShadow: "0 30px 60px rgba(0,0,0,.5)", background: "#fff" }}>
            <Img src={staticFile(c.src)} style={{ width: "100%", height: "100%" }} />
          </div>
        );
      })}
      <Stopwatch t={t} />
    </>
  );
};

const Stopwatch: React.FC<{ t: number }> = ({ t }) => {
  if (t < 62.3) return null;
  const S = 440;
  const X = 960;
  const Y = 470;
  const e = springAt(t, 62.35, { damping: 26, stiffness: 80 });
  const out = interpolate(t, [63.3, 63.8], [0, 1], { ...clamp, easing: EASE });
  const f = float(t, 120, 5, 5);
  const faceY = Y - S / 2 + S * 0.6;
  const faceR = S * 0.3;
  const sweep = interpolate(t, [62.5, 63.6], [0, 360], { ...clamp, easing: EASE_IN_OUT });
  return (
    <div style={{ position: "absolute", inset: 0, translate: `${f.x}px ${f.y}px`, scale: 0.9 + 0.1 * e, transformOrigin: `${X}px ${Y}px`, opacity: Math.min(1, e * 1.3) * (1 - out), filter: `blur(${(1 - Math.min(1, e)) * 8 + out * 10}px)` }}>
      <Img src={prop("P17_stopwatch")} style={{ position: "absolute", left: X - S / 2, top: Y - S / 2, width: S, height: S, filter: "drop-shadow(0 30px 40px rgba(0,0,0,.5))" }} />
      <div style={{ position: "absolute", left: X, top: faceY, translate: "-50% -54%", fontFamily: FONT_A, fontWeight: 900, fontSize: faceR * 1.45, lineHeight: 1, color: C.red, letterSpacing: "-0.04em" }}>5</div>
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <line x1={X} y1={faceY} x2={X + Math.sin((sweep * Math.PI) / 180) * faceR * 0.86} y2={faceY - Math.cos((sweep * Math.PI) / 180) * faceR * 0.86} stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
        <circle cx={X} cy={faceY} r={9} fill={C.ink} />
      </svg>
    </div>
  );
};

/* ---------- S11: the route Alfa People → AI-ассистенты → AI-ментор → AI-наставник (voice 63.6 … 70.9) ---------- */
const LOGO = srcBox(405, 35, 580, 80);
const TAB = srcBox(1020, 146, 1136, 180);
const CHIP = srcBox(658, 343, 792, 395);
const CARD = srcBox(430, 492, 678, 796);
const mid = (b: number[]): [number, number] => [(b[0] + b[2]) / 2, (b[1] + b[3]) / 2];
const seg = (a: [number, number], b: [number, number], seed: number) => wavyThrough([a, b], 30, seed);

export const SceneRoute: React.FC = () => {
  const t = useVT();
  const cam = keyframes(t, [
    { t: 63.4, zoom: 1, fx: 960, fy: 540 },
    { t: 63.9, zoom: 1, fx: 960, fy: 540 },
    { t: 64.6, zoom: 1.7, fx: 560, fy: 120 },
    { t: 65.2, zoom: 1.7, fx: 560, fy: 120 },
    { t: 65.85, zoom: 1.7, fx: 1000, fy: 200 },
    { t: 67.15, zoom: 1.7, fx: 1000, fy: 200 },
    { t: 67.8, zoom: 1.6, fx: 760, fy: 380 },
    { t: 68.65, zoom: 1.6, fx: 760, fy: 380 },
    { t: 69.3, zoom: 1.35, fx: 640, fy: 640 },
  ]);
  const w = 4.2 / cam.zoom;
  const pCard: [number, number] = [mid(CARD)[0], CARD[1] + 10];
  return (
    <Win t={t} cam={cam} inAt={63.5} outAt={70.55}>
      {video("sc11_route.mp4")}
      <Spotlight id="f1" t={t} t0={63.95} t1={65.25} box={LOGO} />
      <LoopMark t={t} t0={64.1} box={LOGO} zoom={cam.zoom} seed={21} t1={69.9} />
      <Thread d={seg(mid(LOGO), mid(TAB), 1)} to={ramp(t, 65.2, 65.9, EASE_IN_OUT)} from={ramp(t, 69.9, 70.3)} width={w} w={1920} h={1080} />
      <Spotlight id="f2" t={t} t0={65.25} t1={67.2} box={TAB} />
      <LoopMark t={t} t0={65.85} box={TAB} zoom={cam.zoom} seed={22} t1={69.9} />
      <Thread d={seg(mid(TAB), mid(CHIP), 2)} to={ramp(t, 67.15, 67.85, EASE_IN_OUT)} from={ramp(t, 69.9, 70.3)} width={w} w={1920} h={1080} />
      <Spotlight id="f3" t={t} t0={67.2} t1={68.7} box={CHIP} />
      <LoopMark t={t} t0={67.8} box={CHIP} zoom={cam.zoom} seed={23} t1={69.9} />
      <Thread d={seg(mid(CHIP), pCard, 3)} to={ramp(t, 68.65, 69.3, EASE_IN_OUT)} from={ramp(t, 69.9, 70.3)} width={w} w={1920} h={1080} />
      <Spotlight id="f4" t={t} t0={68.7} t1={70.25} box={CARD} />
      <LoopMark t={t} t0={69.3} box={CARD} zoom={cam.zoom} seed={24} t1={69.9} />
      <ClickRipple t={t} t0={70.15} x={535} y={765} zoom={cam.zoom} />
    </Win>
  );
};

/* ---------- S12: faster — «Рабочее» and the widget (voice 70.8 … 79.3) ---------- */
const NAV = srcBox(1030, 44, 1092, 70);

export const SceneWidget: React.FC = () => {
  const t = useVT();
  const cam = keyframes(t, [
    { t: 70.8, zoom: 1, fx: 960, fy: 540 },
    { t: 72.6, zoom: 1, fx: 960, fy: 540 },
    { t: 73.3, zoom: 2.0, fx: 1060, fy: 90 },
  ]);
  const X = 960;
  const Y = 470;
  const cur = keyframes(t, [
    { t: 77.2, x: 1560, y: 920 },
    { t: 78.2, x: X + 40, y: Y + 80 },
  ]);
  const sceneOut = interpolate(t, [78.9, 79.4], [1, 0], { ...clamp, easing: EASE });
  return (
    <div style={{ position: "absolute", inset: 0, opacity: sceneOut }}>
      <Win t={t} cam={cam} inAt={70.8} outAt={75.1}>
        <Img src={staticFile("stills/src_1_20.jpg")} style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080 }} />
        <Spotlight id="g1" t={t} t0={73.45} box={NAV} pad={10} />
        <LoopMark t={t} t0={73.51} box={NAV} zoom={cam.zoom} seed={31} pad={10} />
      </Win>
      {/* stand-in for the widget until the «Рабочее» recording arrives */}
      <Prop t={t} src={prop("P10_ai_nastavnik_icon_hd")} x={X} y={Y} size={400} enter={75.4} seed={134} amp={4} />
      {t > 77.15 ? <Img src={prop("P18_cursor_hand")} style={{ position: "absolute", left: cur.x - 70, top: cur.y - 20, width: 220, height: 220, rotate: "-10deg", scale: t > 78.3 && t < 78.5 ? 0.94 : 1, opacity: ramp(t, 77.15, 77.5), filter: "drop-shadow(0 20px 26px rgba(0,0,0,.45))" }} /> : null}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        {[0, 0.12].map((d, i) => {
          const p = interpolate(t, [78.32 + d, 78.95 + d], [0, 1], { ...clamp, easing: EASE });
          if (p <= 0 || p >= 1) return null;
          return <circle key={i} cx={X + 40} cy={Y + 80} r={20 + 160 * p} fill="none" stroke={C.blue} strokeWidth={6 - 4 * p} opacity={1 - p} />;
        })}
      </svg>
    </div>
  );
};
