import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, useCurrentFrame } from "remotion";
import { CALENDAR } from "../config";
import { theme } from "../theme";
import { asset, clamp } from "./common";

// E01 1254x1254: кремовый лист под красной шапкой
const SRC = 1254;
const PAGE = { x0: 122, y0: 345, x1: 1122, y1: 1150 };

const Year: React.FC<{ text: string; k: number; local?: boolean }> = ({ text, k, local }) => (
  <div
    style={{
      position: "absolute",
      left: local ? 0 : PAGE.x0 * k,
      top: local ? 0 : PAGE.y0 * k,
      width: (PAGE.x1 - PAGE.x0) * k,
      height: (PAGE.y1 - PAGE.y0) * k,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: theme.fontDisplay,
      fontWeight: 900,
      fontSize: 250 * (k / 0.6),
      color: theme.colorInk,
      textShadow: "0 2px 0 rgba(255,255,255,0.6), 0 -1px 0 rgba(0,0,0,0.15)",
      letterSpacing: -4,
    }}
  >
    {text}
  </div>
);

/** S06-01: отрывной календарь поверх размытого плана. «2025» отрывается, под ним «2026» */
export const Calendar: React.FC<{ length: number }> = ({ length }) => {
  const frame = useCurrentFrame();
  const size = 1080; // перекрывает календарь из клипа G09 целиком
  const k = size / SRC;
  const tear = Math.round(length * CALENDAR.tearAt);
  const fly = interpolate(frame, [tear, tear + 16], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
  const enter = interpolate(frame, [0, 8], [0, 1], { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const pw = (PAGE.x1 - PAGE.x0) * k;
  const ph = (PAGE.y1 - PAGE.y0) * k;
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          position: "relative",
          width: size,
          height: size,
          opacity: enter,
          scale: interpolate(enter, [0, 1], [0.92, 1]),
          filter: "drop-shadow(0 18px 40px rgba(0,0,0,0.45))",
        }}
      >
        <Img src={asset("E01_calendar_page.png")} style={{ width: size, height: size }} />
        <Year text={frame < tear ? CALENDAR.from : CALENDAR.to} k={k} />

        {frame >= tear && fly < 1 ? (
          <div
            style={{
              position: "absolute",
              left: PAGE.x0 * k,
              top: PAGE.y0 * k,
              width: pw,
              height: ph,
              transformOrigin: "100% 0%",
              rotate: `${fly * 32}deg`,
              translate: `${fly * 260}px ${fly * 760}px`,
              opacity: interpolate(fly, [0, 0.7, 1], [1, 1, 0]),
              filter: `drop-shadow(${8 + fly * 30}px ${8 + fly * 40}px 18px rgba(0,0,0,0.35))`,
            }}
          >
            {/* лист с «2025»: первые кадры — плоский кусок E01, затем изогнутый оторванный E02 */}
            <div style={{ position: "absolute", inset: 0, overflow: "hidden", opacity: interpolate(fly, [0.22, 0.32], [1, 0], clamp) }}>
              <Img
                src={asset("E01_calendar_page.png")}
                style={{ position: "absolute", left: -PAGE.x0 * k, top: -PAGE.y0 * k, width: size, height: size, maxWidth: "none" }}
              />
              <Year text={CALENDAR.from} k={k} local />
            </div>
            <Img
              src={asset("processed/E02_calendar_page_torn.png")}
              style={{
                position: "absolute",
                left: -pw * 0.08,
                top: -ph * 0.12,
                width: pw * 1.16,
                height: ph * 1.24,
                opacity: interpolate(fly, [0.04, 0.2], [0, 1], clamp),
              }}
            />
            {/* «2025» на оторванном листе (E02 в PNG наклонён — текст доворачиваем) */}
            <div style={{ position: "absolute", inset: 0, rotate: "14deg", opacity: interpolate(fly, [0.04, 0.2], [0, 1], clamp) }}>
              <Year text={CALENDAR.from} k={k * 0.92} local />
            </div>
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
