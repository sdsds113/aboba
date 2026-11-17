import React from "react";
import { Img, interpolate, staticFile } from "remotion";
import { Video } from "@remotion/media";
import { BlobField } from "../components/Blobs";
import { Droplets, Prop, prop } from "../components/Elements";
import { ClickRipple, LoopMark, MacWindow, Spotlight, srcBox, srcPt } from "../components/MacWindow";
import { Thread, wavyThrough } from "../components/Thread";
import { C, clamp, EASE, EASE_IN, EASE_IN_OUT, keyframes, ramp, springAt, useVT } from "../lib/core";

/** Scene 11 (voice 63.4 … 71.2): where to find it — the cord walks the route through the real UI. */

export const ACT_F_START = 63.4;

const LOGO = srcBox(405, 35, 580, 80);
const TAB = srcBox(1020, 146, 1136, 180);
const CHIP = srcBox(658, 343, 792, 395);
const CARD = srcBox(430, 492, 678, 796);
const mid = (b: number[]): [number, number] => [(b[0] + b[2]) / 2, (b[1] + b[3]) / 2];

const camAt = (t: number) =>
  keyframes(t, [
    { t: 63.4, zoom: 1, fx: 575, fy: 540 },
    { t: 63.85, zoom: 1, fx: 575, fy: 540 },
    { t: 64.45, zoom: 2.0, fx: 160, fy: 110 },
    { t: 65.2, zoom: 2.0, fx: 160, fy: 110 },
    { t: 65.75, zoom: 2.0, fx: 708, fy: 170 },
    { t: 67.15, zoom: 2.0, fx: 708, fy: 170 },
    { t: 67.7, zoom: 1.9, fx: 355, fy: 369 },
    { t: 68.65, zoom: 1.9, fx: 355, fy: 369 },
    { t: 69.2, zoom: 1.45, fx: 184, fy: 640 },
    { t: 70.3, zoom: 1.45, fx: 184, fy: 640 },
    { t: 70.7, zoom: 1.15, fx: 450, fy: 360 },
  ]);

const seg = (a: [number, number], b: [number, number], seed: number) => wavyThrough([a, b], 34, seed);

export const ActFBack: React.FC = () => {
  const t = useVT();
  const cam = camAt(t);
  const inP = springAt(t, 63.45, { damping: 18, stiffness: 80 });
  const whip = interpolate(t, [70.62, 70.95], [0, 1], { ...clamp, easing: EASE_IN });
  const pLogo = mid(LOGO);
  const pTab = mid(TAB);
  const pChip = mid(CHIP);
  const pCard: [number, number] = [mid(CARD)[0], CARD[1] + 10];
  return (
    <div style={{ position: "absolute", inset: 0, translate: `${-whip * 1700}px 0`, scale: `${1 + whip * 0.15} 1`, filter: whip > 0 ? `blur(${whip * 16}px)` : undefined }}>
      <BlobField
        id="f-back"
        t={t}
        goo={24}
        blobs={[
          { x: 960, y: 560, r: 600 * inP, sx: 1.3, color: C.red, seed: 121, wobble: 0.12 },
          { x: 300, y: 900, r: 170 * inP, color: C.red, seed: 122, wobble: 0.28 },
          { x: 1690, y: 180, r: 120 * inP, color: C.red, seed: 123, wobble: 0.3 },
        ]}
      />
      <MacWindow cx={940} cy={545} scale={0.89} cam={cam} rotX={(1 - inP) * 10} blur={(1 - Math.min(1, inP)) * 14} opacity={Math.min(1, inP * 1.4)}>
        <Video src={staticFile("video/sc11_route.mp4")} muted style={{ position: "absolute", left: 0, top: 0, width: 1150, height: 1080 }} />
        <Spotlight id="f1" t={t} t0={63.95} t1={65.25} box={LOGO} />
        <LoopMark t={t} t0={64.0} box={LOGO} zoom={cam.zoom} seed={21} t1={69.9} />
        <Thread d={seg(pLogo, pTab, 1)} to={ramp(t, 65.2, 65.8, EASE_IN_OUT)} from={ramp(t, 69.9, 70.3)} width={4.2 / cam.zoom} w={1150} h={1080} />
        <Spotlight id="f2" t={t} t0={65.25} t1={67.2} box={TAB} />
        <LoopMark t={t} t0={65.75} box={TAB} zoom={cam.zoom} seed={22} t1={69.9} />
        <Thread d={seg(pTab, pChip, 2)} to={ramp(t, 67.15, 67.75, EASE_IN_OUT)} from={ramp(t, 69.9, 70.3)} width={4.2 / cam.zoom} w={1150} h={1080} />
        <Spotlight id="f3" t={t} t0={67.2} t1={68.7} box={CHIP} />
        <LoopMark t={t} t0={67.7} box={CHIP} zoom={cam.zoom} seed={23} t1={69.9} />
        <Thread d={seg(pChip, pCard, 3)} to={ramp(t, 68.65, 69.2, EASE_IN_OUT)} from={ramp(t, 69.9, 70.3)} width={4.2 / cam.zoom} w={1150} h={1080} />
        <Spotlight id="f4" t={t} t0={68.7} t1={70.25} box={CARD} />
        <LoopMark t={t} t0={69.2} box={CARD} zoom={cam.zoom} seed={24} t1={69.9} />
        <ClickRipple t={t} t0={70.15} x={srcPt(535, 765)[0]} y={765} zoom={cam.zoom} />
      </MacWindow>
    </div>
  );
};

export const ActFFront: React.FC = () => null;

/** Scene 12 (voice 70.6 … 79.6): faster way — «Рабочее», the widget, one click → blue flood. */
const NAV = srcBox(1030, 44, 1092, 70);

export const ActGBack: React.FC = () => {
  const t = useVT();
  const whipIn = interpolate(t, [70.62, 71.0], [1, 0], { ...clamp, easing: EASE });
  const cam = keyframes(t, [
    { t: 70.6, zoom: 1, fx: 575, fy: 540 },
    { t: 72.6, zoom: 1, fx: 575, fy: 540 },
    { t: 73.3, zoom: 2.3, fx: 690, fy: 70 },
    { t: 75.0, zoom: 2.3, fx: 690, fy: 70 },
  ]);
  const winAway = interpolate(t, [75.15, 75.75], [0, 1], { ...clamp, easing: EASE_IN_OUT });
  const blob = springAt(t, 70.7, { damping: 16, stiffness: 70 });
  return (
    <div style={{ position: "absolute", inset: 0, translate: `${whipIn * 1700}px 0`, filter: whipIn > 0.01 ? `blur(${whipIn * 16}px)` : undefined }}>
      <BlobField
        id="g-back"
        t={t}
        goo={22}
        blobs={[
          { x: 1360, y: 500, r: 430 * blob, sx: 1.15, color: C.blue, seed: 131, wobble: 0.15 },
          { x: 1700, y: 900, r: 180 * blob, color: C.blue, seed: 132, wobble: 0.26 },
          { x: 1050, y: 180, r: 90 * blob, color: C.blue, seed: 133, wobble: 0.3 },
        ]}
      />
      {winAway < 1 ? (
        <MacWindow cx={1360 + winAway * 200} cy={500 - winAway * 60} scale={0.62 * (1 - 0.4 * winAway)} cam={cam} rotY={-12} blur={winAway * 20} opacity={1 - winAway}>
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
  const X = 1330;
  const Y = 450;
  const press = t > 78.32 ? 1 - 0.08 * Math.sin(Math.min(1, (t - 78.32) / 0.22) * Math.PI) : 1;
  const cur = keyframes(t, [
    { t: 77.4, x: 1900, y: 980 },
    { t: 78.25, x: X + 40, y: Y + 70 },
    { t: 79.5, x: X + 40, y: Y + 70 },
  ]);
  return (
    <>
      <div style={{ position: "absolute", inset: 0, scale: press, transformOrigin: `${X}px ${Y}px` }}>
        <Prop t={t} src={prop("P10_ai_nastavnik_icon_hd")} x={X} y={Y} size={400} enter={75.3} seed={134} amp={8} />
        <Thread d={loopRound(X, Y, 235)} to={ramp(t, 76.5, 77.1)} width={6} />
      </div>
      {t > 77.35 ? <Img src={prop("P18_cursor_hand")} style={{ position: "absolute", left: cur.x - 70, top: cur.y - 20, width: 240, height: 240, rotate: "-10deg", scale: t > 78.3 && t < 78.45 ? 0.9 : 1, filter: "drop-shadow(0 20px 26px rgba(0,0,0,.45))" }} /> : null}
      <Droplets t={t} t0={78.32} x={X + 40} y={Y + 70} color={C.blue} count={8} spread={260} seed={135} size={28} />
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

/** Blue flood from the click (on top of scene 12), drains away at the start of the finale. */
export const ClickFlood: React.FC = () => {
  const t = useVT();
  const grow = interpolate(t, [78.32, 79.15], [0, 1], { ...clamp, easing: EASE_IN_OUT });
  const drain = interpolate(t, [79.3, 80.2], [0, 1], { ...clamp, easing: EASE_IN });
  if (grow <= 0 || drain >= 1) return null;
  return (
    <BlobField
      id="g-flood"
      t={t}
      blobs={[{ x: 1370, y: 520 + drain * 2600, r: 2300 * grow, color: C.blue, seed: 136, wobble: 0.1 + 0.1 * (1 - grow) }]}
    />
  );
};
