import React from "react";
import { Img, interpolate, staticFile } from "remotion";
import { Video } from "@remotion/media";
import { fx, Word } from "../components/Elements";
import { ClickRipple, contentToScreen, LoopMark, MacWindow, Spotlight, srcBox, srcPt } from "../components/MacWindow";
import { Thread } from "../components/Thread";
import { C, clamp, EASE, EASE_IN_OUT, FONT_A, keyframes, ramp, springAt, useVT } from "../lib/core";

/** Scenes 7–8 (voice 40.0 … 53.2): training setup screencast, "10" lifts out, tea & "3", roll to "10". */

const camAt = (t: number) =>
  keyframes(t, [
    { t: 40.0, zoom: 1, fx: 575, fy: 540 },
    { t: 40.8, zoom: 1, fx: 575, fy: 540 },
    { t: 41.9, zoom: 1.35, fx: 600, fy: 360 },
    { t: 43.6, zoom: 1.35, fx: 600, fy: 360 },
    { t: 44.2, zoom: 1.8, fx: 430, fy: 337 },
    { t: 45.1, zoom: 1.8, fx: 430, fy: 337 },
    { t: 45.7, zoom: 1.8, fx: 360, fy: 430 },
    { t: 47.2, zoom: 1.8, fx: 360, fy: 430 },
  ]);

export const WIN_R = { cx: 1240, cy: 500, scale: 0.76 };

export const ActDBack: React.FC = () => {
  const t = useVT();
  const cam = camAt(t);
  const inP = interpolate(t, [40.0, 40.6], [0, 1], { ...clamp, easing: EASE });
  const outP = interpolate(t, [47.18, 47.7], [0, 1], { ...clamp, easing: EASE });
  const sceneOut = interpolate(t, [52.7, 53.2], [1, 0], { ...clamp, easing: EASE });
  return (
    <div style={{ position: "absolute", inset: 0, opacity: sceneOut }}>
      {outP < 1 ? (
        <MacWindow cx={WIN_R.cx} cy={WIN_R.cy + (1 - inP) * 30} scale={WIN_R.scale} cam={cam} opacity={inP * (1 - outP)}>
          <Video src={staticFile("video/sc07_setup.mp4")} muted style={{ position: "absolute", left: 0, top: 0, width: 1150, height: 1080 }} />
          <Spotlight id="d1" t={t} t0={42.2} t1={43.5} box={srcBox(534, 322, 996, 394)} />
          <LoopMark t={t} t0={42.25} t1={43.5} box={srcBox(534, 322, 996, 394)} zoom={cam.zoom} seed={3} />
          <ClickRipple t={t} t0={42.36} x={srcPt(973, 358)[0]} y={358} zoom={cam.zoom} />
          <ClickRipple t={t} t0={43.36} x={srcPt(1424, 423)[0]} y={423} zoom={cam.zoom} />
          <Spotlight id="d2" t={t} t0={44.2} t1={45.1} box={srcBox(534, 316, 1060, 358)} />
          <ClickRipple t={t} t0={44.12} x={srcPt(707, 337)[0]} y={337} zoom={cam.zoom} />
          <Spotlight id="d3" t={t} t0={45.2} t1={46.4} box={srcBox(534, 410, 840, 452)} />
          <Spotlight id="d4" t={t} t0={46.4} t1={47.2} box={srcBox(530, 452, 622, 476)} pad={10} />
          <LoopMark t={t} t0={46.47} t1={47.2} box={srcBox(530, 454, 622, 476)} zoom={cam.zoom} seed={5} pad={10} />
        </MacWindow>
      ) : null}
      <SteamThree t={t} />
    </div>
  );
};

const NX = 1330;

/** "10" lifts out of the UI; steam becomes "3"; numbers roll to "10". */
export const ActDFront: React.FC = () => {
  const t = useVT();
  const cam = camAt(Math.min(t, 47.2));
  const startPt = contentToScreen(srcPt(600, 465), { ...WIN_R, cam });
  const fly = interpolate(t, [46.55, 47.5], [0, 1], { ...clamp, easing: EASE_IN_OUT });
  const tenOut = ramp(t, 47.9, 48.3);
  const sceneOut = interpolate(t, [52.7, 53.2], [1, 0], { ...clamp, easing: EASE });
  const startSize = 18 * WIN_R.scale * cam.zoom;
  const ten =
    t >= 46.5 && t < 48.4 ? (
      <div
        style={{
          position: "absolute",
          left: interpolate(fly, [0, 1], [startPt[0], NX]),
          top: interpolate(fly, [0, 1], [startPt[1], 420]),
          translate: "-50% -50%",
          fontFamily: FONT_A,
          fontWeight: 900,
          fontSize: interpolate(fly, [0, 1], [startSize, 340]),
          lineHeight: 1,
          letterSpacing: "-0.04em",
          color: fly < 0.1 ? "#1b1b1f" : C.violet,
          opacity: 1 - tenOut,
          filter: `blur(${tenOut * 12}px)`,
        }}
      >
        10
      </div>
    ) : null;
  const roll = interpolate(t, [50.5, 51.3], [0, 1], { ...clamp, easing: EASE_IN_OUT });
  const digits = ["3", "4", "5", "6", "7", "8", "9", "10"];
  const settle = springAt(t, 52.25, { damping: 24, stiffness: 90 });
  const rollOn = t >= 50.45;
  const size = 340;
  const pos = (digits.length - 1) * roll;
  return (
    <div style={{ position: "absolute", inset: 0, opacity: sceneOut }}>
      {ten}
      {t > 52.2 ? (
        <Img src={fx("B03_paint_splat_violet")} style={{ position: "absolute", left: NX - 300, top: 420 - 300, width: 600, height: 600, scale: 0.85 + 0.15 * settle, opacity: Math.min(1, settle * 1.3), rotate: "12deg" }} />
      ) : null}
      {rollOn ? (
        <div style={{ position: "absolute", left: NX - 330, top: 420 - size / 2, width: 660, height: size, overflow: "hidden", opacity: ramp(t, 50.45, 50.7) }}>
          <div style={{ position: "absolute", left: 0, top: -pos * size, width: 660 }}>
            {digits.map((d) => (
              <div key={d} style={{ height: size, textAlign: "center", fontFamily: FONT_A, fontWeight: 900, fontSize: size, lineHeight: `${size}px`, letterSpacing: "-0.04em", color: t > 52.25 ? C.white : C.violet }}>
                {d}
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <Word t={t} text="наверняка" x={NX} y={640} size={80} t0={52.3} align="center" stagger={0.02} seed={97} weight={700} />
    </div>
  );
};

/** Steam over the mug that turns into the digit 3, then cools off. */
const SteamThree: React.FC<{ t: number }> = ({ t }) => {
  if (t < 47.5 || t > 51) return null;
  const mx = 755;
  const my = 120 + 0.49 * 960;
  const d = [
    `M ${mx} ${my}`,
    `C ${mx - 40} ${my - 60} ${mx + 40} ${my - 110} ${mx} ${my - 170}`,
    `C ${mx - 40} ${my - 230} ${mx + 60} ${my - 300} ${mx + 160} ${my - 330}`,
    `C 1070 130 1240 180 1250 230`,
    `C 1320 170 1460 210 1430 320`,
    `C 1410 380 1350 395 1295 400`,
    `C 1370 405 1470 450 1450 550`,
    `C 1430 650 1280 680 1210 600`,
  ].join(" ");
  const draw = interpolate(t, [47.55, 48.9], [0, 1], { ...clamp, easing: EASE_IN_OUT });
  const cool = interpolate(t, [49.1, 50.5], [0, 1], { ...clamp, easing: EASE });
  return <Thread d={d} to={draw} from={cool} width={10} />;
};
