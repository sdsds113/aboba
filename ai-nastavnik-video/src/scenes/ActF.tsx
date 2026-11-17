import React from "react";
import { Img, interpolate, staticFile } from "remotion";
import { Video } from "@remotion/media";
import { Prop, prop } from "../components/Elements";
import { ClickRipple, LoopMark, MacWindow, Spotlight, srcBox, srcPt } from "../components/MacWindow";
import { Thread, wavyThrough } from "../components/Thread";
import { C, clamp, EASE, EASE_IN_OUT, keyframes, ramp, useVT } from "../lib/core";
import { WIN_R } from "./ActD";

/** Scene 11 (voice 63.4 … 71.0): where to find it — the cord walks the route through the real UI. */

const LOGO = srcBox(405, 35, 580, 80);
const TAB = srcBox(1020, 146, 1136, 180);
const CHIP = srcBox(658, 343, 792, 395);
const CARD = srcBox(430, 492, 678, 796);
const mid = (b: number[]): [number, number] => [(b[0] + b[2]) / 2, (b[1] + b[3]) / 2];

const camAt = (t: number) =>
  keyframes(t, [
    { t: 63.4, zoom: 1, fx: 575, fy: 540 },
    { t: 63.9, zoom: 1, fx: 575, fy: 540 },
    { t: 64.6, zoom: 1.9, fx: 160, fy: 110 },
    { t: 65.2, zoom: 1.9, fx: 160, fy: 110 },
    { t: 65.85, zoom: 1.9, fx: 708, fy: 170 },
    { t: 67.15, zoom: 1.9, fx: 708, fy: 170 },
    { t: 67.8, zoom: 1.8, fx: 355, fy: 369 },
    { t: 68.65, zoom: 1.8, fx: 355, fy: 369 },
    { t: 69.3, zoom: 1.4, fx: 184, fy: 640 },
    { t: 70.3, zoom: 1.4, fx: 184, fy: 640 },
  ]);

const seg = (a: [number, number], b: [number, number], seed: number) => wavyThrough([a, b], 30, seed);

export const ActFBack: React.FC = () => {
  const t = useVT();
  const cam = camAt(t);
  const inP = interpolate(t, [63.5, 64.0], [0, 1], { ...clamp, easing: EASE });
  const outP = interpolate(t, [70.55, 71.0], [0, 1], { ...clamp, easing: EASE });
  const pLogo = mid(LOGO);
  const pTab = mid(TAB);
  const pChip = mid(CHIP);
  const pCard: [number, number] = [mid(CARD)[0], CARD[1] + 10];
  const w = 4.2 / cam.zoom;
  return (
    <div style={{ position: "absolute", inset: 0, opacity: inP * (1 - outP) }}>
      <MacWindow cx={WIN_R.cx} cy={WIN_R.cy + (1 - inP) * 30} scale={WIN_R.scale} cam={cam}>
        <Video src={staticFile("video/sc11_route.mp4")} muted style={{ position: "absolute", left: 0, top: 0, width: 1150, height: 1080 }} />
        <Spotlight id="f1" t={t} t0={63.95} t1={65.25} box={LOGO} />
        <LoopMark t={t} t0={64.1} box={LOGO} zoom={cam.zoom} seed={21} t1={69.9} />
        <Thread d={seg(pLogo, pTab, 1)} to={ramp(t, 65.2, 65.9, EASE_IN_OUT)} from={ramp(t, 69.9, 70.3)} width={w} w={1150} h={1080} />
        <Spotlight id="f2" t={t} t0={65.25} t1={67.2} box={TAB} />
        <LoopMark t={t} t0={65.85} box={TAB} zoom={cam.zoom} seed={22} t1={69.9} />
        <Thread d={seg(pTab, pChip, 2)} to={ramp(t, 67.15, 67.85, EASE_IN_OUT)} from={ramp(t, 69.9, 70.3)} width={w} w={1150} h={1080} />
        <Spotlight id="f3" t={t} t0={67.2} t1={68.7} box={CHIP} />
        <LoopMark t={t} t0={67.8} box={CHIP} zoom={cam.zoom} seed={23} t1={69.9} />
        <Thread d={seg(pChip, pCard, 3)} to={ramp(t, 68.65, 69.3, EASE_IN_OUT)} from={ramp(t, 69.9, 70.3)} width={w} w={1150} h={1080} />
        <Spotlight id="f4" t={t} t0={68.7} t1={70.25} box={CARD} />
        <LoopMark t={t} t0={69.3} box={CARD} zoom={cam.zoom} seed={24} t1={69.9} />
        <ClickRipple t={t} t0={70.15} x={srcPt(535, 765)[0]} y={765} zoom={cam.zoom} />
      </MacWindow>
    </div>
  );
};

/** Scene 12 (voice 70.6 … 79.4): faster way — «Рабочее», the widget, one click. */
const NAV = srcBox(1030, 44, 1092, 70);

export const ActGBack: React.FC = () => {
  const t = useVT();
  const inP = interpolate(t, [70.75, 71.25], [0, 1], { ...clamp, easing: EASE });
  const cam = keyframes(t, [
    { t: 70.6, zoom: 1, fx: 575, fy: 540 },
    { t: 72.6, zoom: 1, fx: 575, fy: 540 },
    { t: 73.3, zoom: 2.2, fx: 690, fy: 70 },
    { t: 75.0, zoom: 2.2, fx: 690, fy: 70 },
  ]);
  const winAway = interpolate(t, [75.1, 75.6], [0, 1], { ...clamp, easing: EASE });
  const sceneOut = interpolate(t, [78.9, 79.4], [1, 0], { ...clamp, easing: EASE });
  return (
    <div style={{ position: "absolute", inset: 0, opacity: inP * sceneOut }}>
      {winAway < 1 ? (
        <MacWindow cx={WIN_R.cx} cy={WIN_R.cy} scale={WIN_R.scale} cam={cam} opacity={1 - winAway}>
          <Img src={staticFile("stills/src_1_20.jpg")} style={{ position: "absolute", left: 0, top: 0, width: 1150, height: 1080 }} />
          <Spotlight id="g1" t={t} t0={73.45} box={NAV} pad={10} />
          <LoopMark t={t} t0={73.51} box={NAV} zoom={cam.zoom} seed={31} pad={10} />
        </MacWindow>
      ) : null}
      <Widget t={t} />
    </div>
  );
};

/** Until the «Рабочее» recording arrives: the widget is shown as the assistant icon, clicked once. */
const Widget: React.FC<{ t: number }> = ({ t }) => {
  if (t < 75.2) return null;
  const X = 1240;
  const Y = 470;
  const cur = keyframes(t, [
    { t: 77.2, x: 1760, y: 900 },
    { t: 78.2, x: X + 40, y: Y + 70 },
    { t: 79.5, x: X + 40, y: Y + 70 },
  ]);
  const press = t > 78.3 && t < 78.5 ? 0.94 : 1;
  return (
    <>
      <Prop t={t} src={prop("P10_ai_nastavnik_icon_hd")} x={X} y={Y} size={380} enter={75.3} seed={134} amp={4} />
      <Thread d={loopRound(X, Y, 225)} to={ramp(t, 76.5, 77.2)} width={5} />
      {t > 77.15 ? <Img src={prop("P18_cursor_hand")} style={{ position: "absolute", left: cur.x - 70, top: cur.y - 20, width: 220, height: 220, rotate: "-10deg", scale: press, opacity: ramp(t, 77.15, 77.5), filter: "drop-shadow(0 20px 26px rgba(0,0,0,.45))" }} /> : null}
      <div style={{ position: "absolute", left: 0, top: 0 }}>
        <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
          {[0, 0.12].map((d, i) => {
            const p = interpolate(t, [78.32 + d, 78.95 + d], [0, 1], { ...clamp, easing: EASE });
            if (p <= 0 || p >= 1) return null;
            return <circle key={i} cx={X + 40} cy={Y + 70} r={20 + 160 * p} fill="none" stroke={C.blue} strokeWidth={6 - 4 * p} opacity={1 - p} />;
          })}
        </svg>
      </div>
    </>
  );
};

const loopRound = (x: number, y: number, r: number) => {
  const pts: string[] = [];
  const N = 30;
  for (let i = 0; i <= N; i++) {
    const a = -2.4 + (i / N) * Math.PI * 2 * 1.1;
    const rr = r * (1 + 0.04 * Math.sin(i * 1.7) + (i / N) * 0.05);
    pts.push(`${i === 0 ? "M" : "L"} ${(x + Math.cos(a) * rr).toFixed(1)} ${(y + Math.sin(a) * rr * 0.96).toFixed(1)}`);
  }
  return pts.join(" ");
};
