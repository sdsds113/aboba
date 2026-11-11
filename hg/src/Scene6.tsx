import React from "react";
import { AbsoluteFill, Audio, OffthreadVideo, Sequence, Series, staticFile } from "remotion";
import { DISPLAY, INK, INK_2, Reveal , K } from "./premium";

// Кадр 6 «Три кита» (озвучка v2), три клипа HeyGen Avatar III 720p, звук совпадает без сдвига.
// 6а (озвучка v4): «За этот год… на трёх китах. Первый — технологии…» 19,57 с
// 6б: «Второй — азарт…» 10,64 с
// 6в: «И третий — забота…» 11,48 с

export const SCENE6A_LEN = 584;
export const SCENE6B_LEN = 318;
export const SCENE6C_LEN = 343;
// Обрезка тишины в начале/конце кусков (кадры 30 fps): [голова, хвост].
export const TRIM6 = { a: [6, 6], b: [0, 0], c: [0, 1] } as const;
const eff = (len: number, t: readonly [number, number]) => len - t[0] - t[1];
export const SCENE6A_EFF = eff(SCENE6A_LEN, TRIM6.a);
export const SCENE6B_EFF = eff(SCENE6B_LEN, TRIM6.b);
export const SCENE6C_EFF = eff(SCENE6C_LEN, TRIM6.c);
export const SCENE6_LEN = SCENE6A_EFF + SCENE6B_EFF + SCENE6C_EFF;

const TITLE: React.CSSProperties = { fontSize: 104, fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1, color: INK };
const POINT: React.CSSProperties = { fontSize: 46, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.2, color: INK };
const NOTE: React.CSSProperties = { fontSize: 36, fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.3, color: INK_2 };

const Clip: React.FC<{ video: string; audio: string; wash: string; children: React.ReactNode }> = ({
  video,
  audio,
  wash,
  children,
}) => (
  <AbsoluteFill style={{ backgroundColor: "#FFF" }}>
    <OffthreadVideo src={staticFile(video)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    <AbsoluteFill style={{ background: wash }} />
    <div style={{ fontFamily: DISPLAY }}>{children}</div>
    <Audio src={staticFile(audio)} />
  </AbsoluteFill>
);

// 6а. Она слева; справа внизу оператор с монитором, поэтому текст в верхней правой части.
// Слова: «прорыв» 112, «китах» 164, «Первый» 191, «технологии» 219, «ИИ-тренажёры» 263, «страх» 515.
export const Scene6a: React.FC = () => (
  <Clip
    video="scene6a_talk.mp4"
    audio="vo_06a.mp3"
    wash="linear-gradient(90deg, rgba(255,255,255,0) 45%, rgba(255,255,255,0.5) 65%, rgba(255,255,255,0.6) 100%)"
  >
    <div style={{ position: "absolute", left: 1130, top: 150, width: 720 }}>
      <Reveal at={150} dur={28} outAt={180} outDur={16}>
        <div style={TITLE}>Три кита</div>
      </Reveal>
    </div>
    <div style={{ position: "absolute", left: 1130, top: 150, width: 720 }}>
      <Reveal at={212} dur={28}>
        <div style={TITLE}>Технологии</div>
      </Reveal>
      <Reveal at={258} dur={26} rise={12} style={{ marginTop: 26 }}>
        <div style={POINT}>ИИ-тренажёры</div>
      </Reveal>
      <Reveal at={510} dur={26} rise={10} style={{ marginTop: 10 }}>
        <div style={NOTE}>Страх первого звонка снят</div>
      </Reveal>
    </div>
  </Clip>
);

// 6б. Она справа; слева светлая стена, экран с бейджами начинается правее ~940 px.
// Слова: «азарт» 23, «геймификации» 94, «Мотивация» 261.
export const Scene6b: React.FC = () => (
  <Clip
    video="scene6b_talk.mp4"
    audio="vo_06b.mp3"
    wash="linear-gradient(270deg, rgba(255,255,255,0) 46%, rgba(255,255,255,0.6) 68%, rgba(255,255,255,0.72) 100%)"
  >
    <div style={{ position: "absolute", left: 120, top: 150, width: 780 }}>
      <Reveal at={18} dur={28}>
        <div style={TITLE}>Азарт</div>
      </Reveal>
      <Reveal at={90} dur={26} rise={12} style={{ marginTop: 26 }}>
        <div style={POINT}>
          Геймификация
          <br />
          вместо рутины
        </div>
      </Reveal>
      <Reveal at={256} dur={26} rise={10} style={{ marginTop: 14 }}>
        <div style={NOTE}>
          Мотивация
          <br />
          сотрудников выросла
        </div>
      </Reveal>
    </div>
  </Clip>
);

// 6в. Она слева крупно; справа спокойный лаунж.
// Слова: «забота» 27, «выгоранием» 103, «броне» 181, «эмпатию» 269.
export const Scene6c: React.FC = () => (
  <Clip
    video="scene6c_talk.mp4"
    audio="vo_06c.mp3"
    wash="linear-gradient(90deg, rgba(255,255,255,0) 48%, rgba(255,255,255,0.45) 68%, rgba(255,255,255,0.55) 100%)"
  >
    <div style={{ position: "absolute", left: 1150, top: 290, width: 700 }}>
      <Reveal at={22} dur={28}>
        <div style={TITLE}>Забота</div>
      </Reveal>
      <Reveal at={98} dur={26} rise={12} style={{ marginTop: 26 }}>
        <div style={POINT}>Защита от выгорания</div>
      </Reveal>
      <Reveal at={176} dur={26} rise={10} style={{ marginTop: 18 }}>
        <div style={NOTE}>Психологическая броня</div>
      </Reveal>
      <Reveal at={264} dur={26} rise={10} style={{ marginTop: 4 }}>
        <div style={NOTE}>Эмпатия в трудных диалогах</div>
      </Reveal>
    </div>
  </Clip>
);

export const Scene6: React.FC = () => (
  <Series>
    <Series.Sequence durationInFrames={SCENE6A_EFF * K}>
      <Sequence from={-TRIM6.a[0] * K}>
        <Scene6a />
      </Sequence>
    </Series.Sequence>
    <Series.Sequence durationInFrames={SCENE6B_EFF * K}>
      <Sequence from={-TRIM6.b[0] * K}>
        <Scene6b />
      </Sequence>
    </Series.Sequence>
    <Series.Sequence durationInFrames={SCENE6C_EFF * K}>
      <Sequence from={-TRIM6.c[0] * K}>
        <Scene6c />
      </Sequence>
    </Series.Sequence>
  </Series>
);
