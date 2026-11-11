import React from "react";
import { AbsoluteFill, Audio, OffthreadVideo, staticFile } from "remotion";
import { DISPLAY, Reveal } from "./premium";

// Кадр 4 «Миссия» (озвучка v2), премиальный стиль, без липсинка.
// «Моя главная миссия как тренера — превратить выгорание в вовлечённость, а страх перед сложными
// звонками — в азарт и мастерство.»
// Слова (30 fps): «миссия» 23, «выгорание» 73, «страх» 130, «азарт» 182, «мастерство» 200, конец ≈ 220.
// Клип супергероини (Kling, 8 с) замедлен до 0,7 — берём первые ~5,3 с, где лицо самое похожее.

export const SCENE4_LEN = 228;

const SHADOW = "0 2px 30px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.5)";
const PHRASE: React.CSSProperties = {
  fontSize: 64,
  fontWeight: 600,
  letterSpacing: "-0.03em",
  lineHeight: 1.04,
  color: "#FFFFFF",
  textShadow: SHADOW,
};

export const Scene4: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    <OffthreadVideo
      src={staticFile("scene4_hero.mp4")}
      muted
      playbackRate={0.7}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
    {/* мягкое затемнение по краям, чтобы белый текст спокойно читался на огне */}
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 32%, rgba(0,0,0,0) 68%, rgba(0,0,0,0.5) 100%)",
      }}
    />

    <div style={{ fontFamily: DISPLAY }}>
      <Reveal at={18} dur={28} rise={10} style={{ position: "absolute", left: 110, top: 300 }}>
        <div style={{ fontSize: 34, fontWeight: 500, letterSpacing: "0.02em", color: "rgba(255,255,255,0.8)", textShadow: SHADOW }}>
          Миссия
        </div>
      </Reveal>

      {/* было */}
      <Reveal at={70} dur={30} outAt={176} outDur={22} style={{ position: "absolute", left: 110, top: 360 }}>
        <div style={PHRASE}>
          От страха
          <br />и выгорания
        </div>
      </Reveal>

      {/* стало */}
      <Reveal at={178} dur={30} style={{ position: "absolute", right: 80, top: 360, textAlign: "right" }}>
        <div style={PHRASE}>
          к азарту
          <br />и мастерству
        </div>
      </Reveal>
    </div>

    <Audio src={staticFile("vo_04v2.mp3")} />
  </AbsoluteFill>
);
