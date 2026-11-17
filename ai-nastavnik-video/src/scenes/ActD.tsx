import React from "react";
import { Img, interpolate, staticFile } from "remotion";
import { Video } from "@remotion/media";
import { BlobField } from "../components/Blobs";
import { Droplets, fx, Word } from "../components/Elements";
import { ClickRipple, contentToScreen, LoopMark, MacWindow, Spotlight, srcBox, srcPt } from "../components/MacWindow";
import { Thread } from "../components/Thread";
import { C, clamp, EASE, EASE_IN_OUT, FONT_A, keyframes, ramp, springAt, useVT } from "../lib/core";

/** Scenes 7–8 (voice 40.0 … 53.4): training setup screencast, "10" pops out, tea & "3", roll to "10". */

export const ACT_D_START = 40.0;

const camAt = (t: number) =>
  keyframes(t, [
    { t: 40.0, zoom: 1, fx: 575, fy: 540 },
    { t: 40.7, zoom: 1, fx: 575, fy: 540 },
    { t: 41.9, zoom: 1.35, fx: 630, fy: 360 },
    { t: 43.6, zoom: 1.35, fx: 630, fy: 360 },
    { t: 44.15, zoom: 1.9, fx: 430, fy: 337 },
    { t: 45.1, zoom: 1.9, fx: 430, fy: 337 },
    { t: 45.6, zoom: 1.9, fx: 330, fy: 440 },
    { t: 47.2, zoom: 1.9, fx: 330, fy: 440 },
  ]);

const WIN = { cx: 1130, cy: 540, scale: 0.86 };

export const ActDBack: React.FC = () => {
  const t = useVT();
  const cam = camAt(t);
  const inP = springAt(t, 40.0, { damping: 18, stiffness: 70 });
  const away = interpolate(t, [47.18, 47.9], [0, 1], { ...clamp, easing: EASE_IN_OUT });
  const gone = ramp(t, 47.5, 48.0);
  const sceneOut = ramp(t, 52.9, 53.4);
  const blueBlob = 1 - ramp(t, 47.3, 48.2);
  const violet = springAt(t, 47.25, { damping: 15, stiffness: 70 });
  return (
    <div style={{ position: "absolute", inset: 0, opacity: 1 - sceneOut, filter: sceneOut > 0 ? `blur(${sceneOut * 12}px)` : undefined }}>
      <BlobField
        id="d-back"
        t={t}
        goo={22}
        blobs={[
          { x: 1150, y: 520, r: 520 * inP * blueBlob, sx: 1.25, color: C.blue, seed: 91, wobble: 0.14 },
          { x: 1640, y: 860, r: 230 * inP * blueBlob, color: C.violet, seed: 92, wobble: 0.22 },
          { x: 760, y: 640, r: 430 * violet, color: C.violet, seed: 93, wobble: 0.16 },
          { x: 1240, y: 440, r: 330 * springAt(t, 52.25, { damping: 9, stiffness: 160 }) * (1 - sceneOut), sx: 1.2, sy: 0.8, color: C.violet, seed: 94, wobble: 0.24 },
        ]}
      />
      {gone < 1 ? (
        <MacWindow
          cx={WIN.cx + away * 330}
          cy={WIN.cy - away * 110 + (1 - inP) * 420}
          scale={WIN.scale * (1 - away * 0.42)}
          cam={cam}
          rotX={(1 - inP) * 14}
          rotY={-4 * (1 - inP) - 4 + away * 4}
          blur={(1 - Math.min(1, inP)) * 12 + away * 18}
          opacity={Math.min(1, inP * 1.4) * (1 - away * 0.6) * (1 - gone)}
        >
          <Video src={staticFile("video/sc07_setup.mp4")} muted style={{ position: "absolute", left: 0, top: 0, width: 1150, height: 1080 }} />
          <Spotlight id="d1" t={t} t0={42.2} t1={43.5} box={srcBox(534, 322, 996, 394)} />
          <LoopMark t={t} t0={42.25} t1={43.5} box={srcBox(534, 322, 996, 394)} zoom={cam.zoom} seed={3} />
          <ClickRipple t={t} t0={42.36} x={srcPt(973, 358)[0]} y={358} zoom={cam.zoom} />
          <ClickRipple t={t} t0={43.36} x={srcPt(1424, 423)[0]} y={423} zoom={cam.zoom} />
          <Spotlight id="d2" t={t} t0={44.15} t1={45.1} box={srcBox(534, 316, 1060, 358)} />
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

/** "10" flies out of the UI, crumbles; steam becomes "3"; slot-roll back to "10"; slam. */
export const ActDFront: React.FC = () => {
  const t = useVT();
  const cam = camAt(Math.min(t, 47.2));
  const startPt = contentToScreen(srcPt(600, 465), { ...WIN, cam });
  const fly = interpolate(t, [46.55, 47.15], [0, 1], { ...clamp, easing: EASE });
  const crumble = ramp(t, 48.05, 48.4);
  const sceneOut = ramp(t, 52.9, 53.3);
  const startSize = 18 * WIN.scale * cam.zoom;
  // ---- the "10" out of the UI
  const ten =
    t >= 46.5 && t < 48.45 ? (
      <div
        style={{
          position: "absolute",
          left: interpolate(fly, [0, 1], [startPt[0], 1640]),
          top: interpolate(fly, [0, 1], [startPt[1], 330]),
          translate: "-50% -50%",
          fontFamily: FONT_A,
          fontWeight: 900,
          fontSize: interpolate(fly, [0, 1], [startSize, 400]),
          lineHeight: 1,
          letterSpacing: "-0.04em",
          color: fly < 0.15 ? "#1b1b1f" : C.violet,
          opacity: 1 - crumble,
          scale: 1 + crumble * 0.25,
          filter: `blur(${crumble * 18}px) drop-shadow(0 20px 30px rgba(0,0,0,.4))`,
          rotate: `${interpolate(fly, [0, 1], [0, -6])}deg`,
        }}
      >
        10
      </div>
    ) : null;
  // ---- slot roll 3 → 10, then slam onto a splat
  const roll = interpolate(t, [50.6, 51.15], [0, 1], { ...clamp, easing: EASE });
  const digits = ["3", "4", "5", "6", "7", "8", "9", "10"];
  const slam = springAt(t, 52.25, { damping: 9, stiffness: 260 });
  const rollOn = t >= 50.55;
  const size = 380;
  const pos = (digits.length - 1) * roll;
  const speed = t > 50.6 && t < 51.15 ? 1 : 0;
  return (
    <div style={{ position: "absolute", inset: 0, opacity: 1 - sceneOut }}>
      {ten}
      <Droplets t={t} t0={48.1} x={1640} y={330} color={C.violet} count={9} spread={300} seed={95} size={30} />
      {t > 52.2 ? (
        <Img src={fx("B03_paint_splat_violet")} style={{ position: "absolute", left: 1330 - 330, top: 450 - 330, width: 660, height: 660, scale: slam * 1, opacity: Math.min(1, slam * 2), rotate: "12deg" }} />
      ) : null}
      {rollOn ? (
        <div
          style={{
            position: "absolute",
            left: 1330 - 330,
            top: 450 - size / 2,
            width: 660,
            height: size,
            overflow: "hidden",
            translate: `0 ${t > 52.25 ? (1 - Math.min(1, slam)) * -60 : 0}px`,
            scale: t > 52.25 ? 1.12 - 0.12 * slam : 1,
          }}
        >
          <div style={{ position: "absolute", left: 0, top: -pos * size, width: 660, filter: speed ? `blur(${4 + 6 * Math.sin(roll * Math.PI)}px)` : undefined }}>
            {digits.map((d) => (
              <div key={d} style={{ height: size, textAlign: "center", fontFamily: FONT_A, fontWeight: 900, fontSize: size, lineHeight: `${size}px`, letterSpacing: "-0.04em", color: t > 52.25 ? C.white : C.violet }}>
                {d}
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <Droplets t={t} t0={52.27} x={1330} y={460} color={C.violet} count={8} spread={360} seed={96} size={34} />
      <Word t={t} text="наверняка" x={1330} y={680} size={86} t0={52.3} align="center" mode="slam" stagger={0.02} seed={97} weight={700} />
    </div>
  );
};

/** Steam over the mug that turns into the digit 3, then cools off. */
const SteamThree: React.FC<{ t: number }> = ({ t }) => {
  if (t < 47.5 || t > 51) return null;
  // mug top in E13 at ~ (x, top + 0.49 h); character at x 760, h 960, bottom 1080
  const mx = 755;
  const my = 120 + 0.49 * 960;
  const d = [
    `M ${mx} ${my}`,
    `C ${mx - 40} ${my - 60} ${mx + 40} ${my - 110} ${mx} ${my - 170}`,
    `C ${mx - 40} ${my - 230} ${mx + 60} ${my - 300} ${mx + 160} ${my - 330}`,
    // digit 3 around (1250, 400)
    `C ${1070} ${130} ${1240} ${180} ${1250} ${230}`,
    `C ${1320} ${170} ${1460} ${210} ${1430} ${320}`,
    `C ${1410} ${380} ${1350} ${395} ${1295} ${400}`,
    `C ${1370} ${405} ${1470} ${450} ${1450} ${550}`,
    `C ${1430} ${650} ${1280} ${680} ${1210} ${600}`,
  ].join(" ");
  const draw = interpolate(t, [47.55, 48.7], [0, 1], { ...clamp, easing: EASE_IN_OUT });
  const cool = interpolate(t, [49.1, 50.5], [0, 1], { ...clamp, easing: EASE });
  return <Thread d={d} to={draw} from={cool} width={11} />;
};
