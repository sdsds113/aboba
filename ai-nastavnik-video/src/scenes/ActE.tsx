import React from "react";
import { Img, interpolate, staticFile } from "remotion";
import { Video } from "@remotion/media";
import { BlobField } from "../components/Blobs";
import { Prop, prop } from "../components/Elements";
import { Box, ClickRipple, HighlightBars, LoopMark, MacWindow, Spotlight, srcBox, srcPt } from "../components/MacWindow";
import { C, clamp, EASE, EASE_IN, EASE_IN_OUT, float, FONT_A, keyframes, ramp, springAt, useVT } from "../lib/core";

/** Scenes 9–10 (voice 53.0 … 64.0): answer from the knowledge base, highlights, "обычный чат", 5 minutes. */

export const ACT_E_START = 53.0;

const BOLD: Box[] = [
  srcBox(1283, 389, 1356, 408),
  srcBox(545, 414, 955, 433),
  srcBox(1012, 414, 1333, 433),
  srcBox(545, 439, 903, 458),
];

const camAt = (t: number) =>
  keyframes(t, [
    { t: 53.0, zoom: 1.3, fx: 520, fy: 470 },
    { t: 53.6, zoom: 1.3, fx: 520, fy: 470 },
    { t: 54.4, zoom: 1, fx: 575, fy: 540 },
    { t: 55.05, zoom: 1.4, fx: 450, fy: 560 },
    { t: 57.85, zoom: 1.4, fx: 450, fy: 560 },
    { t: 57.9, zoom: 1.3, fx: 575, fy: 440 },
    { t: 59.6, zoom: 1.35, fx: 575, fy: 440 },
  ]);

export const ActEBack: React.FC = () => {
  const t = useVT();
  const cam = camAt(t);
  const inP = springAt(t, 53.0, { damping: 18, stiffness: 75 });
  const toBg = interpolate(t, [59.67, 60.3], [0, 1], { ...clamp, easing: EASE_IN_OUT });
  const out = ramp(t, 63.4, 63.9);
  const swipe = interpolate(t, [57.72, 58.1], [0, 1], { ...clamp, easing: EASE_IN_OUT });
  const redIn = springAt(t, 59.8, { damping: 15, stiffness: 70 });
  return (
    <div style={{ position: "absolute", inset: 0, opacity: 1 - out }}>
      <BlobField
        id="e-back"
        t={t}
        goo={22}
        blobs={[
          { x: 700, y: 520, r: 560 * inP * (1 - toBg), sx: 1.2, color: C.blue, seed: 101, wobble: 0.14 },
          { x: 1520, y: 600, r: 380 * inP * (1 - toBg), color: C.violet, seed: 102, wobble: 0.18 },
          { x: 900, y: 330, r: 400 * redIn, color: C.red, seed: 103, wobble: 0.15 },
          { x: 1500, y: 300, r: 150 * redIn, color: C.red, seed: 104, wobble: 0.26 },
        ]}
      />
      <MacWindow
        cx={interpolate(toBg, [0, 1], [760, 960]) - (1 - inP) * 1300}
        cy={interpolate(toBg, [0, 1], [540, 500])}
        scale={0.86 * (1 - toBg * 0.25)}
        cam={cam}
        rotY={8 * (1 - toBg)}
        blur={(1 - Math.min(1, inP)) * 14 + toBg * 16}
        opacity={Math.min(1, inP * 1.5) * (1 - toBg)}
      >
        <Video src={staticFile("video/sc09_answer.mp4")} muted style={{ position: "absolute", left: 0, top: 0, width: 1150, height: 1080 }} />
        <ClickRipple t={t} t0={53.12} x={srcPt(1019, 502)[0]} y={502} zoom={cam.zoom} />
        <Spotlight id="e1" t={t} t0={55.2} t1={57.75} box={srcBox(545, 365, 1092, 460)} />
        <LoopMark t={t} t0={56.19} t1={56.62} box={srcBox(560, 390, 1090, 410)} zoom={cam.zoom} seed={11} dur={0.32} pad={6} />
        <LoopMark t={t} t0={56.6} t1={57.02} box={srcBox(560, 415, 1066, 435)} zoom={cam.zoom} seed={12} dur={0.32} pad={6} />
        <LoopMark t={t} t0={57.0} t1={57.4} box={srcBox(560, 440, 880, 460)} zoom={cam.zoom} seed={13} dur={0.32} pad={6} />
        <Spotlight id="e2" t={t} t0={57.35} t1={57.75} box={srcBox(663, 760, 778, 782)} pad={8} />
        <LoopMark t={t} t0={57.38} t1={57.75} box={srcBox(663, 760, 778, 782)} zoom={cam.zoom} seed={14} dur={0.3} pad={8} />
        <HighlightBars t={t} t0={58.3} boxes={BOLD} per={0.24} />
        <Highlighter t={t} t0={58.3} boxes={BOLD} per={0.24} zoom={cam.zoom} />
        {/* paint swipe that hides the jump in the recording */}
        {swipe > 0 && swipe < 1 ? (
          <div style={{ position: "absolute", left: -400 + swipe * 2200, top: -300, width: 700, height: 1700, rotate: "18deg", background: C.violet, borderRadius: "48% 52% 46% 54% / 12% 10% 14% 12%" }} />
        ) : null}
      </MacWindow>
      <BookPop t={t} />
      <UiCards t={t} />
    </div>
  );
};

/** 3D marker that rides along the highlight bars (content coords). */
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
  // marker tip sits at ~ (0.1, 0.88) of the image
  return (
    <Img
      src={prop("P15_highlighter")}
      style={{
        position: "absolute",
        left: x - s * 0.1,
        top: y - s * 0.88 - 40 * out / zoom,
        width: s,
        height: s,
        opacity: inn * (1 - out),
        filter: "drop-shadow(0 10px 12px rgba(0,0,0,.35))",
      }}
    />
  );
};

const BookPop: React.FC<{ t: number }> = ({ t }) => (
  <Prop t={t} src={prop("P16_open_book")} x={1300} y={250} size={290} enter={55.21} exit={56.6} exitStyle="focusOut" enterStyle="pop" seed={105} rotate={-8} />
);

/** Real UI crops float around the character like a chat. */
const UiCards: React.FC<{ t: number }> = ({ t }) => {
  if (t < 59.7 || t > 62.9) return null;
  const cards: { src: string; w: number; h: number; x: number; y: number; d: number; r: number }[] = [
    { src: "stills/ui_user_msg.png", w: 267 * 1.8, h: 104 * 1.8, x: 1500, y: 330, d: 0, r: 5 },
    { src: "stills/ui_question.png", w: 836 * 0.88, h: 100 * 0.88, x: 470, y: 250, d: 0.12, r: -4 },
    { src: "stills/ui_input.png", w: 1026 * 0.62, h: 56 * 0.62, x: 1450, y: 690, d: 0.24, r: 3 },
  ];
  const scatter = interpolate(t, [62.3, 62.85], [0, 1], { ...clamp, easing: EASE_IN });
  return (
    <>
      {cards.map((c, i) => {
        const e = springAt(t, 59.75 + c.d, { damping: 15, stiffness: 100 });
        const f = float(t, 110 + i, 10, 4.2);
        const fromX = 960;
        const fromY = 500;
        const x = fromX + (c.x - fromX) * e + (c.x - 960) * scatter * 1.2;
        const y = fromY + (c.y - fromY) * e + (c.y - 540) * scatter * 1.2;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x - c.w / 2,
              top: y - c.h / 2,
              width: c.w,
              height: c.h,
              translate: `${f.x}px ${f.y}px`,
              rotate: `${c.r + f.r}deg`,
              scale: (0.4 + 0.6 * e) * (1 + scatter * 0.5),
              opacity: Math.min(1, e * 1.5) * (1 - scatter),
              filter: `blur(${(1 - Math.min(1, e)) * 10 + scatter * 16}px)`,
              borderRadius: 18,
              overflow: "hidden",
              boxShadow: "0 30px 60px rgba(0,0,0,.5)",
              background: "#fff",
            }}
          >
            <Img src={staticFile(c.src)} style={{ width: "100%", height: "100%" }} />
          </div>
        );
      })}
    </>
  );
};

/** Stopwatch with a big "5" and an animated hand. */
export const ActEFront: React.FC = () => {
  const t = useVT();
  if (t < 62.3) return null;
  const S = 440;
  const X = 1380;
  const Y = 480;
  const e = springAt(t, 62.35, { damping: 11, stiffness: 150 });
  const out = interpolate(t, [63.45, 63.95], [0, 1], { ...clamp, easing: EASE_IN });
  const f = float(t, 120, 8, 4);
  const faceX = X;
  const faceY = Y - S / 2 + S * 0.6;
  const faceR = S * 0.3;
  const sweep = interpolate(t, [62.5, 63.6], [0, 360], { ...clamp, easing: EASE_IN_OUT });
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        translate: `${f.x + out * 700}px ${f.y - out * 200}px`,
        scale: (0.5 + 0.5 * e) * (1 + out * 0.8),
        transformOrigin: `${X}px ${Y}px`,
        opacity: Math.min(1, e * 1.6) * (1 - out),
        filter: `blur(${(1 - Math.min(1, e)) * 10 + out * 20}px)`,
      }}
    >
      <Img src={prop("P17_stopwatch")} style={{ position: "absolute", left: X - S / 2, top: Y - S / 2, width: S, height: S, filter: "drop-shadow(0 30px 40px rgba(0,0,0,.5))" }} />
      <div style={{ position: "absolute", left: faceX, top: faceY, translate: "-50% -54%", fontFamily: FONT_A, fontWeight: 900, fontSize: faceR * 1.45, lineHeight: 1, color: C.red, letterSpacing: "-0.04em" }}>5</div>
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <line
          x1={faceX}
          y1={faceY}
          x2={faceX + Math.sin((sweep * Math.PI) / 180) * faceR * 0.86}
          y2={faceY - Math.cos((sweep * Math.PI) / 180) * faceR * 0.86}
          stroke={C.ink}
          strokeWidth={7}
          strokeLinecap="round"
        />
        <circle cx={faceX} cy={faceY} r={9} fill={C.ink} />
      </svg>
    </div>
  );
};
