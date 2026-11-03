import { Video } from "@remotion/media";
import React from "react";
import { AbsoluteFill, Freeze, staticFile } from "remotion";
import { clipInOf, f, hasClip, lengthOf, Shot } from "./timeline";
import { theme } from "./theme";

const PALETTE = ["#3a2a2e", "#2c3340", "#2f3a2e", "#40322a", "#352c40", "#2a3a3a"];

/** Заглушка, пока клипа из Flow нет: служебный текст, в финале его не будет */
export const Placeholder: React.FC<{ shot: Shot }> = ({ shot }) => {
  const n = parseInt(shot.id.replace(/\D/g, ""), 10) || 0;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 40%, ${PALETTE[n % PALETTE.length]}, #121014 75%)`,
        justifyContent: "center",
        alignItems: "center",
        padding: 160,
        gap: 18,
        fontFamily: theme.fontText,
        color: "rgba(255,255,255,0.75)",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: 3, color: "rgba(255,255,255,0.45)" }}>
        {shot.id}
      </div>
      <div style={{ fontSize: 44, fontWeight: 700, lineHeight: 1.25, maxWidth: 1400 }}>{shot.desc}</div>
    </AbsoluteFill>
  );
};

/** Видео плана: кусок клипа Flow с нужной секунды, без звука */
export const ShotVideo: React.FC<{ shot: Shot; offsetFrames?: number }> = ({ shot, offsetFrames = 0 }) => {
  if (!hasClip(shot.gen)) return <Placeholder shot={shot} />;
  return (
    <AbsoluteFill>
      <Video
        src={staticFile(`clips/${shot.gen}.mp4`)}
        trimBefore={f(clipInOf(shot)) + offsetFrames}
        muted
        objectFit="cover"
        style={{ width: "100%", height: "100%" }}
      />
    </AbsoluteFill>
  );
};

/** Стоп-кадр плана: at = доля длины плана (0…1) */
export const ShotStill: React.FC<{ shot: Shot; at?: number; style?: React.CSSProperties }> = ({
  shot,
  at = 0.5,
  style,
}) => {
  const offset = Math.max(0, Math.min(lengthOf(shot) - 1, Math.round(lengthOf(shot) * at)));
  return (
    <AbsoluteFill style={style}>
      <Freeze frame={0}>
        <ShotVideo shot={shot} offsetFrames={offset} />
      </Freeze>
    </AbsoluteFill>
  );
};
