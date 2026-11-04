import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { STAR } from "../config";
import { theme } from "../theme";
import { asset, clamp, ConfettiBurst } from "./common";

/** S09-05: лента E11 + «С днём рождения!» по буквам + конфетти */
export const BigTitle: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const W = 1700;
  const k = W / 2172;
  const H = 724 * k;
  const ribbon = spring({ frame, fps, config: { damping: 13, stiffness: 140 } });
  const letters = Array.from(text);
  return (
    <AbsoluteFill>
      <ConfettiBurst seed="final" count={80} originY={0.62} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            position: "relative",
            width: W,
            height: H,
            scale: interpolate(ribbon, [0, 1], [0.6, 1]),
            opacity: interpolate(frame, [0, 4], [0, 1], clamp),
            filter: "drop-shadow(0 16px 30px rgba(0,0,0,0.45))",
          }}
        >
          <Img src={asset("E11_ribbon_banner.png")} style={{ width: W, height: H }} />
          {/* ровная середина ленты: x 586–1586, y 135–500 в исходных 2172x724 */}
          <div
            style={{
              position: "absolute",
              left: 586 * k,
              top: 135 * k,
              width: 1000 * k,
              height: 365 * k,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: theme.fontDisplay,
              fontWeight: 900,
              fontSize: 82,
              color: theme.colorCream,
              textShadow: "0 3px 0 rgba(120,60,0,0.55), 0 6px 16px rgba(0,0,0,0.35)",
              whiteSpace: "pre",
            }}
          >
            {letters.map((ch, i) => {
              const s = spring({ frame: frame - 4 - i * 2, fps, config: { damping: 10, stiffness: 200 } });
              return (
                <span key={i} style={{ display: "inline-block", scale: s, translate: `0px ${(1 - s) * 30}px` }}>
                  {ch}
                </span>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Гирлянда E15 по верху кадра. globalFrame — чтобы покачивание не прыгало на склейках */
export const StringLights: React.FC<{ globalFrom: number }> = ({ globalFrom }) => {
  const frame = useCurrentFrame() + globalFrom;
  const { fps } = useVideoConfig();
  const W = 2050;
  const H = (W * 724) / 2172;
  const glow = 0.85 + 0.15 * Math.sin((frame / fps) * Math.PI * 1.6);
  return (
    <div
      style={{
        position: "absolute",
        left: (1920 - W) / 2,
        top: -190,
        width: W,
        height: H,
        rotate: `${Math.sin((frame / fps) * 1.3) * 0.5}deg`,
        transformOrigin: "50% 0%",
        mixBlendMode: "screen",
        opacity: glow,
      }}
    >
      <Img src={asset("E15_string_lights.png")} style={{ width: W, height: H }} />
    </div>
  );
};

/** S07-10: путеводная звезда E12 над домом */
export const GuidingStar: React.FC<{ length: number }> = ({ length }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = Math.round(length * STAR.appearAt);
  const o = interpolate(frame, [start, start + 10], [0, 1], clamp);
  const pulse = 1 + 0.03 * Math.sin(((frame - start) / fps / 1.2) * Math.PI * 2);
  const pop = spring({ frame: frame - start, fps, config: { damping: 9, stiffness: 160 } });
  return (
    <Img
      src={asset("E12_guiding_star.png")}
      style={{
        position: "absolute",
        left: STAR.x - STAR.size / 2,
        top:
          interpolate(frame / fps, STAR.track.map((p) => p[0]), STAR.track.map((p) => p[1]), clamp) -
          STAR.size / 2,
        width: STAR.size,
        height: STAR.size,
        mixBlendMode: "screen",
        opacity: o,
        scale: pulse * interpolate(pop, [0, 1], [0.4, 1]),
      }}
    />
  );
};
