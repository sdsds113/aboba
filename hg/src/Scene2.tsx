import React from "react";
import { AbsoluteFill, Audio, OffthreadVideo, Sequence, staticFile } from "remotion";
import { DISPLAY, INK, INK_2, Reveal , K } from "./premium";

// Кадр 2. «Когда люди слышат слово «взыскание», они часто представляют себе железную
// строгость и сухие скрипты. Но моя работа каждый день доказывает обратное.
// Урегулирование обязательств — это про человечность, эмпатию и тонкую психологию.»
// Слова (30 fps): «строгость» ≈ 123, «Но моя» ≈ 179, «Урегулирование» ≈ 269,
// «человечность» ≈ 327, «эмпатию» ≈ 357, «психологию» ≈ 394.
// Клип HeyGen + Omni 1920×1080, 14,13 с. Звук — чистая дорожка, сдвиг 1 кадр под губы.

export const SCENE2_LEN = 424;

const WORD: React.CSSProperties = {
  fontSize: 104,
  fontWeight: 600,
  letterSpacing: "-0.03em",
  lineHeight: 1.04,
  color: INK,
};

export const Scene2: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#FFF" }}>
    <OffthreadVideo
      src={staticFile("scene2_talk.mp4")}
      muted
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(270deg, rgba(255,255,255,0) 48%, rgba(255,255,255,0.4) 70%, rgba(255,255,255,0.55) 100%)",
      }}
    />

    <div style={{ position: "absolute", left: 132, top: 0, bottom: 0, width: 820, fontFamily: DISPLAY }}>
      {/* стереотип: тихо проявляется и уходит */}
      <Reveal at={118} dur={30} outAt={176} outDur={24} style={{ position: "absolute", top: 470 }}>
        <div style={{ fontSize: 60, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.15, color: "#5E5E63" }}>
          Строгость
          <br />и сухие скрипты
        </div>
      </Reveal>

      {/* ответ */}
      <div style={{ position: "absolute", top: 330 }}>
        <Reveal at={266} dur={30} rise={12}>
          <div style={{ fontSize: 34, fontWeight: 400, letterSpacing: "-0.005em", color: INK_2, marginBottom: 26 }}>
            В основе взыскания
          </div>
        </Reveal>
        <Reveal at={322} dur={28}>
          <div style={WORD}>Человечность</div>
        </Reveal>
        <Reveal at={352} dur={28}>
          <div style={WORD}>Эмпатия</div>
        </Reveal>
        <Reveal at={389} dur={28}>
          <div style={WORD}>Психология</div>
        </Reveal>
      </div>
    </div>

    <Sequence from={K}>
      <Audio src={staticFile("vo_02.mp3")} />
    </Sequence>
  </AbsoluteFill>
);
