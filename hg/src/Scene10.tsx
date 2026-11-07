import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  } from "remotion";
import { DISPLAY, Reveal, useT, K } from "./premium";

// Кадр 10б «Финал» (озвучка v2). «Моя главная награда — это благодарность от бизнеса и признание
// своего вклада в обучение и развитие сотрудников.»
// Слова (30 fps): «благодарность» 50, «сотрудников» 182, конец речи ≈ 205.
// Клип HeyGen 6,96 с; затем живой клип без речи (HeyGen, тишина). Справа тёмный «экран»: логотип и «НЕ ЗА ЧТО КРАСНЕТЬ!»,
// в конце мягкое затемнение. Кадр 10а (вручение) добавится перед этим, когда будет клип.

const TALK = 208;
const XFADE = 8;

const IdleIn: React.FC = () => {
  const o = interpolate(useT(), [0, XFADE], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <OffthreadVideo src={staticFile("scene10b_idle.mp4")} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </AbsoluteFill>
  );
};
const HOLD = 132;
export const SCENE10B_LEN = TALK + HOLD;

const RED = "#EF3124";

export const Scene10b: React.FC = () => {
  const frame = useT();
  const fade = interpolate(frame, [SCENE10B_LEN - 36, SCENE10B_LEN - 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Sequence durationInFrames={TALK * K}>
        <OffthreadVideo
          src={staticFile("scene10b_talk.mp4")}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Sequence>
      {/* после речи — «живой» клип HeyGen без слов (дышит, улыбается), стык через короткий наплыв */}
      <Sequence from={(TALK - XFADE) * K}>
        <IdleIn />
      </Sequence>

      {/* слоган на тёмном экране справа */}
      <div
        style={{
          position: "absolute",
          left: 960,
          right: 70,
          top: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: DISPLAY,
          textAlign: "center",
        }}
      >
        <Reveal at={186} dur={30} rise={10}>
          <Img src={staticFile("alfa_logo.png")} style={{ height: 120, marginBottom: 54 }} />
        </Reveal>
        <Reveal at={204} dur={32}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 600,
              letterSpacing: "0.01em",
              lineHeight: 1.05,
              color: "#FFFFFF",
              textTransform: "uppercase",
            }}
          >
            Не за что
          </div>
        </Reveal>
        <Reveal at={218} dur={32}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 600,
              letterSpacing: "0.01em",
              lineHeight: 1.05,
              color: RED,
              textTransform: "uppercase",
            }}
          >
            краснеть!
          </div>
        </Reveal>
      </div>

      <AbsoluteFill style={{ backgroundColor: "#000", opacity: fade }} />
      <Audio src={staticFile("vo_10.mp3")} />
    </AbsoluteFill>
  );
};

// Кадр 10а — вручение (клип из Flow/Kling, 4,96 с, без речи). Затем 10б.
export const SCENE10_HANDOVER = 148;
const HANDOVER = SCENE10_HANDOVER;

export const Scene10a: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    <OffthreadVideo
      src={staticFile("scene10a_handover.mp4")}
      muted
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  </AbsoluteFill>
);

export const SCENE10_LEN = HANDOVER + SCENE10B_LEN;

export const Scene10: React.FC = () => (
  <AbsoluteFill>
    <Sequence durationInFrames={HANDOVER * K}>
      <Scene10a />
    </Sequence>
    <Sequence from={HANDOVER * K}>
      <Scene10b />
    </Sequence>
  </AbsoluteFill>
);
