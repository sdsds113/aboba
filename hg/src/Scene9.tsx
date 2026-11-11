import React from "react";
import { AbsoluteFill, Audio, Easing, OffthreadVideo, interpolate, staticFile, } from "remotion";
import { DISPLAY, INK, INK_2, Reveal, useT } from "./premium";

// Кадр 9 (озвучка v5, ElevenLabs: «и-эн-пи-эс», «десять месяцев» спокойно). «Это позволило нам увеличить срок жизни сотрудников в компании на один год
// и десять месяцев. Что это даёт? Высокую экспертизу, рост KPI и искреннюю лояльность. Ведь довольный
// сотрудник — это довольный клиент. Наш eNPS вырос до девяноста пяти с половиной процентов.
// Нам точно есть чем гордиться и не за что краснеть.»
// Слова (30 fps): «срок» 53, «один год» 114, «Что это» 184, «экспертизу» 234, «KPI» 275,
// «лояльность» 318, «довольный» 356, «клиент» 409, «eNPS» 448, «девяноста» 481, «гордиться» 587.
// Текст идёт сменяющимися блоками на одном месте слева (в левом верхнем углу блик — текст ниже).

export const SCENE9_LEN = 654;

const LABEL: React.CSSProperties = { fontSize: 36, fontWeight: 400, letterSpacing: "-0.01em", color: INK_2 };
const BIG: React.CSSProperties = { fontSize: 98, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1, color: INK };
const ITEM: React.CSSProperties = { fontSize: 54, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.18, color: INK };

const ENps: React.FC = () => {
  const frame = useT();
  const v = interpolate(frame, [478, 520], [92.2, 95.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return <span style={{ fontVariantNumeric: "tabular-nums" }}>{v.toFixed(1).replace(".", ",")}%</span>;
};

export const Scene9: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#FFF" }}>
    <OffthreadVideo
      src={staticFile("scene9_talk.mp4")}
      muted
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(270deg, rgba(255,255,255,0) 52%, rgba(255,255,255,0.25) 70%, rgba(255,255,255,0.35) 100%)",
      }}
    />
    <div style={{ position: "absolute", left: 132, top: 0, width: 820, height: "100%", fontFamily: DISPLAY }}>
      {/* 1. Срок жизни */}
      <div style={{ position: "absolute", top: 380 }}>
        <Reveal at={50} dur={26} rise={12} outAt={172} outDur={16}>
          <div style={LABEL}>Срок жизни сотрудника в компании</div>
        </Reveal>
        <Reveal at={109} dur={28} outAt={172} outDur={16}>
          <div style={{ ...BIG, marginTop: 16 }}>+1 год 10 мес</div>
        </Reveal>
      </div>

      {/* 2. Что это даёт */}
      <div style={{ position: "absolute", top: 360 }}>
        <Reveal at={184} dur={24} rise={12} outAt={340} outDur={16}>
          <div style={{ ...LABEL, marginBottom: 20 }}>Что это даёт</div>
        </Reveal>
        <Reveal at={228} dur={24} outAt={340} outDur={16}>
          <div style={ITEM}>Высокая экспертиза</div>
        </Reveal>
        <Reveal at={269} dur={24} outAt={340} outDur={16}>
          <div style={ITEM}>Рост KPI</div>
        </Reveal>
        <Reveal at={312} dur={24} outAt={340} outDur={16}>
          <div style={ITEM}>Искренняя лояльность</div>
        </Reveal>
      </div>

      {/* 3. Довольный сотрудник = довольный клиент */}
      <div style={{ position: "absolute", top: 400 }}>
        <Reveal at={352} dur={26} outAt={432} outDur={16}>
          <div style={{ ...ITEM, fontSize: 54 }}>Довольный сотрудник</div>
        </Reveal>
        <Reveal at={392} dur={26} outAt={432} outDur={16}>
          <div style={{ ...ITEM, fontSize: 54, color: INK_2 }}>=&nbsp;довольный клиент</div>
        </Reveal>
      </div>

      {/* 4. eNPS */}
      <div style={{ position: "absolute", top: 380 }}>
        <Reveal at={442} dur={26} rise={12}>
          <div style={LABEL}>eNPS</div>
        </Reveal>
        <Reveal at={472} dur={28}>
          <div style={{ ...BIG, fontSize: 170, marginTop: 10 }}>
            <ENps />
          </div>
        </Reveal>
        <Reveal at={498} dur={26} rise={10}>
          <div style={{ ...LABEL, marginTop: 14 }}>было 92,2%</div>
        </Reveal>
      </div>
    </div>
    <Audio src={staticFile("vo_09.mp3")} />
  </AbsoluteFill>
);
