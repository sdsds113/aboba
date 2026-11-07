import React from "react";
import { AbsoluteFill, Audio, Easing, OffthreadVideo, interpolate, staticFile, } from "remotion";
import { DISPLAY, INK, INK_2, Reveal, useT } from "./premium";

// Кадр 8 (озвучка v2). «Посмотрите на эти цифры за моей спиной. Это чистый бизнес-эффект от нашей
// стратегии. Сбор увеличен на двадцать процентов, средний чек вырос на семнадцать процентов,
// претензии снизились на тринадцать процентов, а отток снижен до трёх с половиной процентов.»
// Слова (30 fps): «бизнес-эффект» 101, «Сбор» 168, «средний» 237, «претензии» 310, «отток» 390.
// Клип HeyGen Avatar III 720p, звук без сдвига. Она слева, справа ровная стена под график.

export const SCENE8_LEN = 470;

const ease = Easing.bezier(0.25, 0.1, 0.25, 1);

const Row: React.FC<{
  label: string;
  at: number;
  from: number;
  to: number;
  sign: string;
  barFrom: number;
  barTo: number;
  note?: string;
}> = ({ label, at, from, to, sign, barFrom, barTo, note }) => {
  const frame = useT();
  const p = interpolate(frame, [at + 6, at + 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const v = from + (to - from) * p;
  const shown = (Math.abs(v) % 1 === 0 && Number.isInteger(to) ? Math.round(v).toString() : v.toFixed(1)).replace(
    ".",
    ",",
  );
  const bar = barFrom + (barTo - barFrom) * p;
  return (
    <Reveal at={at} dur={24} rise={12} style={{ marginBottom: 46 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <div style={{ fontSize: 36, fontWeight: 500, letterSpacing: "-0.015em", color: INK }}>
          {label}
          {note ? <span style={{ fontSize: 28, fontWeight: 400, color: INK_2 }}>{"  " + note}</span> : null}
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: INK,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {sign}
          {shown}%
        </div>
      </div>
      <div style={{ marginTop: 10, height: 10, borderRadius: 5, background: "rgba(29,29,31,0.10)" }}>
        <div style={{ width: `${bar * 100}%`, height: "100%", borderRadius: 5, background: INK }} />
      </div>
    </Reveal>
  );
};

export const Scene8: React.FC = () => {
  const frame = useT();
  const wash = interpolate(frame, [80, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  return (
    <AbsoluteFill style={{ backgroundColor: "#FFF" }}>
      <OffthreadVideo
        src={staticFile("scene8_talk.mp4")}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      {/* стена справа чуть светлеет, когда появляется график */}
      <AbsoluteFill
        style={{
          opacity: wash,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.4) 55%, rgba(255,255,255,0.5) 100%)",
        }}
      />
      <div style={{ position: "absolute", left: 1000, top: 150, width: 790, fontFamily: DISPLAY }}>
        <Reveal at={96} dur={28}>
          <div style={{ fontSize: 64, fontWeight: 600, letterSpacing: "-0.03em", color: INK }}>Бизнес-эффект</div>
        </Reveal>
        <Reveal at={128} dur={26} rise={10}>
          <div style={{ fontSize: 32, fontWeight: 400, color: INK_2, marginTop: 8, marginBottom: 54 }}>
            от нашей стратегии
          </div>
        </Reveal>
        <Row label="Сбор" at={164} from={0} to={20} sign="+" barFrom={0} barTo={1} />
        <Row label="Средний чек" at={233} from={0} to={17} sign="+" barFrom={0} barTo={0.85} />
        <Row label="Претензии" at={306} from={0} to={13} sign="−" barFrom={0} barTo={0.65} />
        <Row label="Отток" note="было 5%" at={386} from={5} to={3.5} sign="" barFrom={1} barTo={0.7} />
      </div>
      <Audio src={staticFile("vo_08.mp3")} />
    </AbsoluteFill>
  );
};
