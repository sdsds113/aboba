import React from "react";
import { interpolate } from "remotion";
import { C, clamp, EASE, FONT_A, hexA } from "../lib/core";
import { loopAround, Thread } from "./Thread";

/** Screencast content size (full source frame). */
export const CW = 1920;
export const CH = 1080;
export const BAR = 40;

export type Box = [number, number, number, number];
/** Convert a box from source-screencast pixels (1920 wide) to content pixels. */
export const srcBox = (x0: number, y0: number, x1: number, y1: number): Box => [x0, y0, x1, y1];
export const srcPt = (x: number, y: number): [number, number] => [x, y];

export type Cam = { zoom: number; fx: number; fy: number };

/** Camera translation (content units) that centres the focus, clamped to keep the viewport covered. */
export const camShift = (cam: Cam, viewH = CH) => {
  const z = cam.zoom;
  let tx = CW / 2 - cam.fx * z;
  let ty = viewH / 2 - cam.fy * z;
  tx = Math.min(0, Math.max(CW - CW * z, tx));
  ty = Math.min(0, Math.max(viewH - CH * z, ty));
  return { tx, ty };
};

/** Screen position of a content point for an un-rotated window (used to launch overlays out of the UI). */
export const contentToScreen = (p: [number, number], win: { cx: number; cy: number; scale: number; cam: Cam; viewH?: number }) => {
  const viewH = win.viewH ?? CH;
  const { tx, ty } = camShift(win.cam, viewH);
  const h = viewH * win.scale + BAR;
  const w = CW * win.scale;
  return [
    win.cx - w / 2 + win.scale * (win.cam.zoom * p[0] + tx),
    win.cy - h / 2 + BAR + win.scale * (win.cam.zoom * p[1] + ty),
  ] as [number, number];
};

/**
 * macOS-style window. Children are rendered in CONTENT coordinates (CW x CH) inside the camera,
 * so overlays (spotlights, loops, clicks) stay locked to the screencast pixels at any zoom.
 */
export const MacWindow: React.FC<{
  cx: number;
  cy: number;
  scale: number;
  cam?: Cam;
  rotX?: number;
  rotY?: number;
  rotZ?: number;
  blur?: number;
  opacity?: number;
  children: React.ReactNode;
  /** rendered above the camera layer, in window (screen) space */
  chrome?: React.ReactNode;
  viewH?: number;
}> = ({ cx, cy, scale, cam = { zoom: 1, fx: CW / 2, fy: CH / 2 }, rotX = 0, rotY = 0, rotZ = 0, blur = 0, opacity = 1, children, chrome, viewH = CH }) => {
  const w = CW * scale;
  const h = viewH * scale + BAR;
  const z = cam.zoom;
  const { tx, ty } = camShift(cam, viewH);
  return (
    <div
      style={{
        position: "absolute",
        left: cx - w / 2,
        top: cy - h / 2,
        width: w,
        height: h,
        transform: `perspective(2400px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`,
        filter: blur > 0.2 ? `blur(${blur}px)` : undefined,
        opacity,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 18,
          overflow: "hidden",
          background: "#fff",
          boxShadow: "0 50px 120px rgba(0,0,0,.55), 0 8px 24px rgba(0,0,0,.35)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: w,
            height: BAR,
            background: "#F2F2F4",
            borderBottom: "1px solid #E2E2E6",
            zIndex: 2,
          }}
        >
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
            <div
              key={c}
              style={{
                position: "absolute",
                left: 18 + i * 22,
                top: BAR / 2 - 7,
                width: 14,
                height: 14,
                borderRadius: 7,
                background: c,
                boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,.15)",
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              inset: 0,
              textAlign: "center",
              lineHeight: `${BAR}px`,
              fontFamily: FONT_A,
              fontWeight: 500,
              fontSize: 16,
              color: "#6B6B70",
            }}
          >
            Alfa People
          </div>
        </div>
        <div style={{ position: "absolute", left: 0, top: BAR, width: w, height: h - BAR, overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: CW,
              height: CH,
              transformOrigin: "0 0",
              transform: `scale(${scale}) translate(${tx}px, ${ty}px) scale(${z})`,
            }}
          >
            {children}
          </div>
        </div>
      </div>
      {chrome}
    </div>
  );
};

/** Dim everything except a rounded window around the box; the hole grows open from its centre. */
export const Spotlight: React.FC<{ t: number; t0: number; t1?: number; box: Box; pad?: number; dim?: number; id: string }> = ({
  t,
  t0,
  t1,
  box,
  pad = 12,
  dim = 0.36,
  id,
}) => {
  const on = interpolate(t, [t0, t0 + 0.35], [0, 1], { ...clamp, easing: EASE });
  const off = t1 === undefined ? 0 : interpolate(t, [t1, t1 + 0.3], [0, 1], { ...clamp, easing: EASE });
  const a = on * (1 - off);
  if (a <= 0.001) return null;
  const [x0, y0, x1, y1] = box;
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  const hw = ((x1 - x0) / 2 + pad) * (0.4 + 0.6 * on);
  const hh = ((y1 - y0) / 2 + pad) * (0.4 + 0.6 * on);
  return (
    <svg width={CW} height={CH} style={{ position: "absolute", left: 0, top: 0 }}>
      <defs>
        <filter id={`fe-${id}`}>
          <feGaussianBlur stdDeviation={6} />
        </filter>
        <mask id={`m-${id}`}>
          <rect x={-200} y={-200} width={CW + 400} height={CH + 400} fill="#fff" />
          <rect x={cx - hw} y={cy - hh} width={hw * 2} height={hh * 2} rx={14} fill="#000" filter={`url(#fe-${id})`} />
        </mask>
      </defs>
      <rect x={-200} y={-200} width={CW + 400} height={CH + 400} fill={hexA(C.ink, dim * a)} mask={`url(#m-${id})`} />
    </svg>
  );
};

/** Hand-drawn loop drawn around a box, in content coords. Stroke compensates zoom. */
export const LoopMark: React.FC<{ t: number; t0: number; t1?: number; box: Box; zoom: number; seed?: number; color?: string; dur?: number; pad?: number }> = ({
  t,
  t0,
  t1,
  box,
  zoom,
  seed = 1,
  color = C.white,
  dur = 0.5,
  pad = 12,
}) => {
  const p = interpolate(t, [t0, t0 + dur], [0, 1], { ...clamp, easing: EASE });
  const e = t1 === undefined ? 0 : interpolate(t, [t1, t1 + 0.35], [0, 1], { ...clamp, easing: EASE });
  if (p <= 0) return null;
  const d = loopAround(box[0], box[1], box[2], box[3], seed, pad);
  return (
    <>
      <Thread d={d} to={p} from={e} width={7 / zoom} color="rgba(11,11,14,.35)" w={CW} h={CH} style={{ filter: `blur(${3 / zoom}px)` }} />
      <Thread d={d} to={p} from={e} width={4.2 / zoom} color={color} w={CW} h={CH} />
    </>
  );
};

/** Paint-ring click ripple at a content point. */
export const ClickRipple: React.FC<{ t: number; t0: number; x: number; y: number; color?: string; zoom?: number }> = ({ t, t0, x, y, color = C.blue, zoom = 1 }) => {
  const dt = t - t0;
  if (dt < 0 || dt > 0.7) return null;
  const rings = [0, 0.1];
  return (
    <>
      {rings.map((d, i) => {
        const p = interpolate(dt - d, [0, 0.45], [0, 1], { ...clamp, easing: EASE });
        const r = (10 + 46 * p) / zoom;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x - r,
              top: y - r,
              width: r * 2,
              height: r * 2,
              borderRadius: "50%",
              border: `${(i === 0 ? 5 : 3) / zoom}px solid ${color}`,
              opacity: (1 - p) * (dt - d >= 0 ? 1 : 0),
            }}
          />
        );
      })}
      <div
        style={{
          position: "absolute",
          left: x - 9 / zoom,
          top: y - 9 / zoom,
          width: 18 / zoom,
          height: 18 / zoom,
          borderRadius: "50%",
          background: color,
          opacity: interpolate(dt, [0, 0.05, 0.25], [0, 0.9, 0], clamp),
        }}
      />
    </>
  );
};

/** Highlighter bars laid exactly over text boxes, swept left to right one after another. */
export const HighlightBars: React.FC<{ t: number; t0: number; boxes: Box[]; color?: string; per?: number }> = ({ t, t0, boxes, color = C.violet, per = 0.28 }) => (
  <>
    {boxes.map((b, i) => {
      const p = interpolate(t, [t0 + i * per, t0 + i * per + per * 1.1], [0, 1], { ...clamp, easing: EASE });
      if (p <= 0) return null;
      return (
        <div
          key={i}
          style={{
            position: "absolute",
            left: b[0] - 4,
            top: b[1] - 1,
            width: (b[2] - b[0] + 8) * p,
            height: b[3] - b[1] + 2,
            background: hexA(color, 0.42),
            mixBlendMode: "multiply",
            borderRadius: 4,
          }}
        />
      );
    })}
  </>
);
