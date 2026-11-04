import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { PEOPLE } from "../config";
import { theme } from "../theme";
import { asset, clamp, swing, TextShadow } from "./common";

/** «Наш дом» в начале */
export const OpeningTitle: React.FC<{ text: string; length: number }> = ({ text, length }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          fontFamily: theme.fontDisplay,
          fontWeight: 900,
          fontSize: 132,
          color: theme.colorCream,
          textShadow: TextShadow,
          letterSpacing: 2,
          opacity: interpolate(frame, [0, 8, length - 8, length], [0, 1, 1, 0], clamp),
          scale: interpolate(frame, [0, length], [0.96, 1.02], clamp),
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

/** Деревянная табличка E05 с годом, спускается на верёвках в левый верхний угол */
export const YearSign: React.FC<{ year: string; length: number }> = ({ year, length }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const drop = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const W = 520;
  const H = (W * 1024) / 1536;
  const out = interpolate(frame, [length - 8, length], [0, -H - 40], clamp);
  return (
    <div
      style={{
        position: "absolute",
        left: 110,
        top: -24,
        width: W,
        height: H,
        translate: `0px ${interpolate(drop, [0, 1], [-H - 40, 0]) + out}px`,
        rotate: `${swing(frame, fps, 4)}deg`,
        transformOrigin: "50% 0%",
      }}
    >
      <Img src={asset("E05_year_sign.png")} style={{ width: W, height: H }} />
      <div
        style={{
          position: "absolute",
          left: 0,
          width: W,
          top: H * 0.565,
          translate: "0 -50%",
          rotate: "-3.3deg",
          textAlign: "center",
          fontFamily: theme.fontDisplay,
          fontWeight: 900,
          fontSize: 120,
          lineHeight: 1,
          color: theme.colorCream,
          textShadow: "0 3px 0 rgba(60,25,10,0.65), 0 6px 14px rgba(0,0,0,0.45)",
        }}
      >
        {year}
      </div>
    </div>
  );
};

/** Плашка с именем на подложке E06 */
const PLATE_W = 660;
const PLATE_H = (PLATE_W * 724) / 2172;
export const LowerThird: React.FC<{ who: string; side: "left" | "right"; length: number }> = ({ who, side, length }) => {
  const frame = useCurrentFrame();
  const p = PEOPLE[who] ?? { name: who, role: "" };
  const inX = interpolate(frame, [2, 10], [side === "left" ? -PLATE_W - 120 : PLATE_W + 120, 0], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const outO = interpolate(frame, [length - 8, length - 2], [1, 0], clamp);
  const k = PLATE_W / 2172;
  return (
    <div
      style={{
        position: "absolute",
        bottom: 64,
        [side]: 80,
        width: PLATE_W,
        height: PLATE_H,
        translate: `${inX}px 0px`,
        opacity: outO,
        filter: "drop-shadow(0 10px 22px rgba(0,0,0,0.35))",
      }}
    >
      <Img src={asset("E06_lower_third_plate.png")} style={{ width: PLATE_W, height: PLATE_H }} />
      <div
        style={{
          position: "absolute",
          left: 262 * k,
          right: 70 * k,
          top: 96 * k,
          height: (605 - 96) * k,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          fontFamily: theme.fontText,
          color: theme.colorInk,
          lineHeight: 1.1,
        }}
      >
        <div style={{ fontSize: 44, fontWeight: 900 }}>{p.name}</div>
        <div style={{ fontSize: 30, fontWeight: 700, opacity: 0.75 }}>{p.role}</div>
      </div>
    </div>
  );
};

const EMBLEM: Record<string, string> = {
  "Семья?": "E07_emblem_family.png",
  "Клан?": "E08_emblem_clan.png",
  "Династия?": "E09_emblem_dynasty.png",
};

/** «Семья? / Клан? / Династия?» — эмблема + слово, удар в кадр */
export const PunchWord: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 4], [1.35, 1], { ...clamp, easing: Easing.bezier(0.2, 1.4, 0.4, 1) });
  const shake = frame < 8 ? Math.sin(frame * 2.7) * (8 - frame) * 1.6 : 0;
  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 70,
        background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 38%)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 28,
          scale,
          translate: `${shake}px 0px`,
          opacity: interpolate(frame, [0, 2], [0, 1], clamp),
        }}
      >
        <Img
          src={asset(EMBLEM[text] ?? "E07_emblem_family.png")}
          style={{ height: 230, filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.45))" }}
        />
        <div
          style={{
            fontFamily: theme.fontDisplay,
            fontWeight: 900,
            fontSize: 150,
            lineHeight: 1,
            color: theme.colorCream,
            textShadow: TextShadow,
          }}
        >
          {text}
        </div>
      </div>
    </AbsoluteFill>
  );
};
