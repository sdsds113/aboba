import React from "react";
import { AbsoluteFill, Audio, OffthreadVideo, staticFile } from "remotion";
import { DISPLAY, INK, Reveal } from "./premium";

// Кадр 3. «По ту сторону провода всегда человек со своей трудной историей. А по эту —
// оператор, который должен сохранять баланс между интересами бизнеса и уважением к клиенту.»
// Слова (30 fps): «баланс» ≈ 194, «бизнеса» ≈ 232, «уважением» ≈ 254, конец ≈ 290.
// Клип HeyGen + Omni 1920×1080, 9,79 с. Звук — чистая дорожка, сдвиг 1 кадр под губы.

export const SCENE3_LEN = 293;

export const Scene3: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#FFF" }}>
    <OffthreadVideo
      src={staticFile("scene3_talk.mp4")}
      muted
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(90deg, rgba(255,255,255,0) 48%, rgba(255,255,255,0.55) 68%, rgba(255,255,255,0.7) 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 1150, top: 360, width: 700, fontFamily: DISPLAY, color: INK }}>
      <Reveal at={188} dur={30}>
        <div style={{ fontSize: 124, fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1 }}>Баланс</div>
      </Reveal>
      <div style={{ marginTop: 30, fontSize: 52, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
        <Reveal at={228} dur={28} rise={12}>
          интересов бизнеса
        </Reveal>
        <Reveal at={250} dur={28} rise={12}>
          и уважения к клиенту
        </Reveal>
      </div>
    </div>
    <Audio src={staticFile("vo_03.mp3")} />
  </AbsoluteFill>
);
