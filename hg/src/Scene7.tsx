import React from "react";
import { AbsoluteFill, Audio, Easing, OffthreadVideo, interpolate, staticFile, useCurrentFrame } from "remotion";
import { DISPLAY, INK, INK_2, Reveal } from "./premium";

// Кадр 7 (озвучка v2). «Мы внедрили более тридцати пяти умных учебных единиц: от курсов и игр
// до ИИ-экзаменаторов и голосовых роботов. Этот подход вывел нас на абсолютно новый уровень.»
// Слова (30 fps): «тридцати» 31, «умных» 61, «курсов» 112, «ИИ-экзаменаторов» 151,
// «голосовых» 188, «новый» 290. Клип HeyGen Avatar III 720p, звук без сдвига.

export const SCENE7_LEN = 320;

const Count: React.FC<{ to: number; at: number; dur: number }> = ({ to, at, dur }) => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [at, at + dur], [0, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return <span style={{ fontVariantNumeric: "tabular-nums" }}>{Math.round(v)}</span>;
};

const AI_ITEMS = ["ИИ-экзаменаторы", "Голосовые ИИ-тренажёры", "Текстовые ИИ-тренажёры", "ИИ-наставник"];

export const Scene7: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#FFF" }}>
    <OffthreadVideo
      src={staticFile("scene7_talk.mp4")}
      muted
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
    <div style={{ position: "absolute", left: 132, top: 150, width: 860, fontFamily: DISPLAY, color: INK }}>
      <Reveal at={26} dur={28}>
        <div style={{ fontSize: 230, fontWeight: 600, letterSpacing: "-0.05em", lineHeight: 0.9 }}>
          <Count to={35} at={26} dur={40} />+
        </div>
      </Reveal>
      <Reveal at={58} dur={26} rise={12}>
        <div style={{ fontSize: 44, fontWeight: 500, letterSpacing: "-0.02em", marginTop: 18 }}>
          умных учебных единиц
        </div>
      </Reveal>

      <div style={{ marginTop: 54 }}>
        {AI_ITEMS.map((t, i) => (
          <Reveal key={t} at={148 + i * 12} dur={24} rise={10}>
            <div style={{ fontSize: 40, fontWeight: 500, letterSpacing: "-0.015em", lineHeight: 1.36 }}>{t}</div>
          </Reveal>
        ))}
      </div>

      <Reveal at={108} dur={28} rise={10} style={{ marginTop: 26 }}>
        <div style={{ fontSize: 32, fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.4, color: INK_2 }}>
          курсы, игры, тренинги, траектории, тестирования
        </div>
      </Reveal>
    </div>
    <Audio src={staticFile("vo_07.mp3")} />
  </AbsoluteFill>
);
