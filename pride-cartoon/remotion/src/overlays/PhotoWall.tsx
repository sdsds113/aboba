import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import layout from "../data/photo_wall_layout.json";
import { END_CARD } from "../config";
import { ShotStill } from "../Shot";
import { shotById } from "../timeline";
import { theme } from "../theme";
import { asset, clamp, swing, TextShadow } from "./common";

type Slot = (typeof layout.slots)[number];
const [FW, FH] = layout.frame_png_size;
const [HX0, HY0, HX1, HY1] = layout.frame_hole_px;

const photoShot = (slot: Slot) => {
  const m = slot.photo_from.match(/S\d\d-\d\d/);
  return m ? shotById(m[0]) : null;
};
const holeRect = (slot: Slot) => {
  const k = slot.width / FW;
  return { left: slot.left + HX0 * k, top: slot.top + HY0 * k, width: (HX1 - HX0) * k, height: (HY1 - HY0) * k };
};

/** Рамка E03 с фото внутри и табличкой E04 под ней. Координаты — в системе стены 1920x1080 */
const FramedPhoto: React.FC<{ slot: Slot; at?: number; rot?: number; dy?: number; frameOpacity?: number; hidePhoto?: boolean }> = ({
  slot,
  at = 0.5,
  rot = 0,
  dy = 0,
  frameOpacity = 1,
  hidePhoto = false,
}) => {
  const k = slot.width / FW;
  const h = FH * k;
  const hole = holeRect(slot);
  const s = photoShot(slot);
  const plaqueW = slot.width * 0.32;
  const plaqueH = (plaqueW * 887) / 1774;
  return (
    <div
      style={{
        position: "absolute",
        left: slot.left,
        top: slot.top + dy,
        width: slot.width,
        height: h + plaqueH + 20,
        rotate: `${rot}deg`,
        transformOrigin: `50% ${(0.02 * h) | 0}px`,
      }}
    >
      {!hidePhoto && s ? (
        <div
          style={{
            position: "absolute",
            left: hole.left - slot.left,
            top: hole.top - slot.top,
            width: hole.width,
            height: hole.height,
            overflow: "hidden",
            filter: slot.label && /20(14|19)/.test(slot.label) ? "sepia(0.15)" : undefined,
          }}
        >
          <ShotStill shot={s} at={at} />
        </div>
      ) : null}
      <Img
        src={asset("processed/E03_photo_frame.png")}
        style={{ position: "absolute", left: 0, top: 0, width: slot.width, height: h, opacity: frameOpacity }}
      />
      {slot.label ? (
        <div
          style={{
            position: "absolute",
            left: (slot.width - plaqueW) / 2,
            top: 996 * k + 4,
            width: plaqueW,
            height: plaqueH,
            opacity: frameOpacity,
          }}
        >
          <Img src={asset("E04_year_plaque.png")} style={{ width: plaqueW, height: plaqueH }} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: theme.fontDisplay,
              fontWeight: 900,
              fontSize: plaqueH * 0.42,
              color: theme.colorInk,
              textShadow: "0 1px 0 rgba(255,240,200,0.6)",
            }}
          >
            {slot.label}
          </div>
        </div>
      ) : null}
    </div>
  );
};

const Wall: React.FC<{ children: React.ReactNode; scale: number; x: number }> = ({ children, scale, x }) => (
  <AbsoluteFill style={{ scale, translate: `${x}px 0px`, transformOrigin: "50% 50%" }}>
    <Img src={asset("P01_photo_wall.png")} style={{ position: "absolute", width: 1920, height: 1080 }} />
    {children}
  </AbsoluteFill>
);

/** S06-02: стена с фото разных лет, на середине плана вешают новое общее фото */
export const PhotoWall: React.FC<{ length: number }> = ({ length }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const hangAt = Math.round(length / 2);
  const local = frame - hangAt;
  const drop = interpolate(local, [0, 8], [-160, 0], { ...clamp, easing: Easing.out(Easing.back(1.4)) });
  return (
    <Wall scale={interpolate(frame, [0, length], [1.06, 1.1])} x={interpolate(frame, [0, length], [30, -30])}>
      {layout.slots.slice(0, 3).map((s) => (
        <FramedPhoto key={s.id} slot={s} />
      ))}
      {frame >= hangAt ? (
        <FramedPhoto
          slot={layout.slots[3]}
          dy={drop}
          rot={local > 6 ? swing(local - 6, fps, 5, 0.7, 0.5) : 0}
          frameOpacity={interpolate(local, [0, 3], [0, 1], clamp)}
        />
      ) : null}
    </Wall>
  );
};

/** S09-06: стоп-кадр праздника улетает в рамку 5, затем финальная плашка и затемнение */
export const FinalWall: React.FC<{ length: number }> = ({ length }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const slot = layout.slots[4];
  const fin = shotById("S09-05");
  const flyEnd = 24;
  const camScale = interpolate(frame, [0, flyEnd, length], [1.1, 1.1, 1.0], { ...clamp, easing: Easing.inOut(Easing.quad) });
  // отверстие слота 5 в экранных координатах при текущем масштабе «камеры»
  const hole = holeRect(slot);
  const scr = {
    left: width / 2 + (hole.left - width / 2) * camScale,
    top: height / 2 + (hole.top - height / 2) * camScale,
    width: hole.width * camScale,
    height: hole.height * camScale,
  };
  const p = interpolate(frame, [0, flyEnd], [0, 1], { ...clamp, easing: Easing.bezier(0.65, 0, 0.35, 1) });
  const fly = {
    left: interpolate(p, [0, 1], [0, scr.left]),
    top: interpolate(p, [0, 1], [0, scr.top]),
    width: interpolate(p, [0, 1], [width, scr.width]),
    height: interpolate(p, [0, 1], [height, scr.height]),
  };
  const landed = frame >= flyEnd;
  const card = interpolate(frame, [length - 66, length - 50], [0, 1], clamp);
  const black = interpolate(frame, [length - 12, length], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Wall scale={camScale} x={0}>
        {layout.slots.slice(0, 4).map((s) => (
          <FramedPhoto key={s.id} slot={s} />
        ))}
        {landed ? (
          <FramedPhoto slot={slot} at={1} rot={swing(frame - flyEnd, fps, 4, 0.7, 0.5)} frameOpacity={interpolate(frame, [flyEnd, flyEnd + 4], [0, 1], clamp)} />
        ) : null}
      </Wall>
      {!landed ? (
        <div
          style={{
            position: "absolute",
            ...fly,
            overflow: "hidden",
            boxShadow: `0 ${20 * p}px ${50 * p}px rgba(0,0,0,${0.5 * p})`,
            border: `${8 * p}px solid ${theme.colorCream}`,
          }}
        >
          <ShotStill shot={fin} at={0.95} />
        </div>
      ) : null}

      {/* финальная плашка */}
      <AbsoluteFill style={{ backgroundColor: `rgba(20,6,8,${0.8 * card})` }} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          opacity: card,
          translate: `0px ${interpolate(card, [0, 1], [30, 0])}px`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          <Img src={asset("E13_house_blue.png")} style={{ height: 230 }} />
          <div style={{ fontFamily: theme.fontDisplay, fontWeight: 900, fontSize: 90, color: theme.colorCream, textShadow: TextShadow }}>
            →
          </div>
          <Img src={asset("E14_house_red.png")} style={{ height: 270 }} />
        </div>
        <div style={{ fontFamily: theme.fontDisplay, fontWeight: 900, fontSize: 118, color: theme.colorCream, textShadow: TextShadow, lineHeight: 1 }}>
          {END_CARD.title}
        </div>
        <div style={{ fontFamily: theme.fontText, fontWeight: 800, fontSize: 52, color: theme.colorCream, opacity: 0.9, textShadow: TextShadow }}>
          {END_CARD.subtitle}
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: "black", opacity: black }} />
    </AbsoluteFill>
  );
};
