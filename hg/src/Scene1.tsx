import React from "react";
import { AbsoluteFill, Audio, OffthreadVideo, Sequence, staticFile } from "remotion";
import { DISPLAY, INK, INK_2, Reveal } from "./premium";

// Кадр 1. «Привет всем! Меня зовут Юлиана Неверова, я главный эксперт по обучению
// сотрудников дистанционного взыскания в Альфа-Банке.»
// Слова (30 fps): «Юлиана» ≈ 52, «главный» ≈ 94, конец ≈ 220.
// Клип HeyGen + Omni: 1920×1080, 7,58 с. Звук — чистая дорожка ElevenLabs,
// сдвинута на ~40 мс (1 кадр), чтобы совпасть с губами в клипе.

export const SCENE1_LEN = 228;

export const Scene1: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#FFF" }}>
    <OffthreadVideo
      src={staticFile("scene1_talk.mp4")}
      muted
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
    {/* very soft light wash on the right so dark type sits calmly on the busy office */}
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(90deg, rgba(255,255,255,0) 52%, rgba(255,255,255,0.38) 70%, rgba(255,255,255,0.5) 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 1170, top: 430, width: 700, fontFamily: DISPLAY }}>
      <Reveal at={46} dur={28}>
        <div style={{ fontSize: 64, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.02, color: INK, whiteSpace: "nowrap" }}>
          Юлиана Неверова
        </div>
      </Reveal>
      <Reveal at={88} dur={30} rise={12}>
        <div
          style={{
            marginTop: 26,
            fontSize: 27,
            fontWeight: 400,
            letterSpacing: "-0.005em",
            lineHeight: 1.38,
            color: INK_2,
          }}
        >
          Главный эксперт по обучению сотрудников
          <br />
          дистанционного взыскания Альфа-Банка
        </div>
      </Reveal>
    </div>
    <Sequence from={1}>
      <Audio src={staticFile("vo_01.mp3")} />
    </Sequence>
  </AbsoluteFill>
);
