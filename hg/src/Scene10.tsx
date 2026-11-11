import React from "react";
import { AbsoluteFill, Audio, Img, OffthreadVideo, Sequence, interpolate, staticFile } from "remotion";
import { DISPLAY, Reveal, useT, K } from "./premium";

// Финал: 10а вручение (без речи) → 10б речь → отдельный экран со слоганом.
// 10б: «Моя главная награда — это благодарность от бизнеса и признание своего вклада в обучение
// и развитие сотрудников.» Слова (30 fps): «благодарность» 50, «сотрудников» 182, конец речи ≈ 205.

const RED = "#EF3124";

// ── 10а. Вручение (клип Flow/Kling 4,96 с) ──
export const SCENE10_HANDOVER = 148;

export const Scene10a: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    <OffthreadVideo src={staticFile("scene10a_handover.mp4")} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  </AbsoluteFill>
);

// ── 10б. Речь (клип HeyGen 6,96 с) ──
export const SCENE10B_LEN = 204; // хвост тишины обрезан

export const Scene10b: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    <OffthreadVideo src={staticFile("scene10b_talk.mp4")} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    <Audio src={staticFile("vo_10.mp3")} />
  </AbsoluteFill>
);

// ── Финальный экран со слоганом ──
export const SCENE10_CARD = 150;

export const EndCard: React.FC = () => {
  const t = useT();
  const fadeIn = interpolate(t, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(t, [SCENE10_CARD - 34, SCENE10_CARD - 2], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line: React.CSSProperties = {
    fontSize: 120,
    fontWeight: 600,
    letterSpacing: "0.01em",
    lineHeight: 1.04,
    textTransform: "uppercase",
  };
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <AbsoluteFill
        style={{
          opacity: Math.min(fadeIn, fadeOut),
          background: "radial-gradient(ellipse at 50% 55%, #1b1b1d 0%, #000 70%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: DISPLAY,
          textAlign: "center",
        }}
      >
        <Reveal at={6} dur={30} rise={10}>
          <Img src={staticFile("alfa_logo.png")} style={{ height: 140, marginBottom: 70 }} />
        </Reveal>
        <Reveal at={22} dur={32}>
          <div style={{ ...line, color: "#FFFFFF" }}>Не за что</div>
        </Reveal>
        <Reveal at={38} dur={32}>
          <div style={{ ...line, color: RED }}>краснеть</div>
        </Reveal>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const SCENE10_LEN = SCENE10_HANDOVER + SCENE10B_LEN + SCENE10_CARD;

export const Scene10: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    <Sequence durationInFrames={SCENE10_HANDOVER * K}>
      <Scene10a />
    </Sequence>
    <Sequence from={SCENE10_HANDOVER * K} durationInFrames={SCENE10B_LEN * K}>
      <Scene10b />
    </Sequence>
    <Sequence from={(SCENE10_HANDOVER + SCENE10B_LEN) * K}>
      <EndCard />
    </Sequence>
  </AbsoluteFill>
);
