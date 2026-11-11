import React from "react";
import { AbsoluteFill, Audio, Easing, OffthreadVideo, interpolate, staticFile, } from "remotion";
import { DISPLAY, INK, INK_2, Reveal, useT } from "./premium";

// Кадр 5 (озвучка v4, ElevenLabs). «За время работы в банке я обучила более полутора тысяч сотрудников
// и провела свыше двухсот обучений. И главное — качество! Моя оценка VOE составила
// пять из пяти при таргете четыре и восемьдесят восемь.»
// Слова (30 fps): «полутора» 83, «двухсот» 163, «главное» 212, «качество» 241,
// «оценка» 277, «пять» 323, «таргете» 356, «восемь» 402.
// Клип HeyGen Avatar III 720p (образ «Сцена 5 Цифры»), звук без сдвига.

export const SCENE5_LEN = 426;

const APPLE = Easing.bezier(0.25, 0.1, 0.25, 1);

const CountUp: React.FC<{ from: number; to: number; at: number; dur: number; suffix?: string; decimals?: number }> = ({
  from,
  to,
  at,
  dur,
  suffix = "",
  decimals = 0,
}) => {
  const frame = useT();
  const v = interpolate(frame, [at, at + dur], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const s = v
    .toFixed(decimals)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return (
    <span style={{ fontVariantNumeric: "tabular-nums" }}>
      {s}
      {suffix}
    </span>
  );
};

const BIG: React.CSSProperties = {
  fontSize: 150,
  fontWeight: 600,
  letterSpacing: "-0.04em",
  lineHeight: 1,
  color: INK,
};
const LABEL: React.CSSProperties = {
  fontSize: 36,
  fontWeight: 400,
  letterSpacing: "-0.01em",
  color: INK_2,
  marginTop: 12,
};

export const Scene5: React.FC = () => {
  const frame = useT();
  // первые две цифры мягко уходят перед блоком про качество
  const outP = interpolate(frame, [224, 248], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: APPLE });
  return (
    <AbsoluteFill style={{ backgroundColor: "#FFF" }}>
      <OffthreadVideo
        src={staticFile("scene5_talk.mp4")}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(270deg, rgba(255,255,255,0) 44%, rgba(255,255,255,0.62) 66%, rgba(255,255,255,0.78) 100%)",
        }}
      />

      <div style={{ position: "absolute", left: 132, top: 0, width: 820, height: "100%", fontFamily: DISPLAY }}>
        {/* масштаб */}
        <div style={{ position: "absolute", top: 250, opacity: outP }}>
          <Reveal at={77} dur={28}>
            <div style={BIG}>
              <CountUp from={0} to={1500} at={77} dur={36} suffix="+" />
            </div>
            <div style={LABEL}>сотрудников обучено</div>
          </Reveal>
          <Reveal at={156} dur={28} style={{ marginTop: 70 }}>
            <div style={BIG}>
              <CountUp from={0} to={200} at={156} dur={32} suffix="+" />
            </div>
            <div style={LABEL}>обучений проведено</div>
          </Reveal>
        </div>

        {/* качество */}
        <div style={{ position: "absolute", top: 330 }}>
          <Reveal at={238} dur={28} rise={12}>
            <div style={{ fontSize: 36, fontWeight: 400, color: INK_2, letterSpacing: "-0.01em", marginBottom: 18 }}>
              Качество обучения
            </div>
          </Reveal>
          <Reveal at={316} dur={30}>
            <div style={{ ...BIG, fontSize: 190 }}>
              <CountUp from={4.0} to={5.0} at={316} dur={30} decimals={1} />
              <span style={{ fontSize: 64, fontWeight: 400, color: INK_2, letterSpacing: "-0.02em" }}> из 5</span>
            </div>
            <div style={LABEL}>оценка сотрудников (VOE)</div>
          </Reveal>
          <Reveal at={352} dur={28} rise={10} style={{ marginTop: 28 }}>
            <div style={{ fontSize: 40, fontWeight: 500, letterSpacing: "-0.015em", color: INK }}>
              при таргете 4,88
            </div>
          </Reveal>
        </div>
      </div>

      <Audio src={staticFile("vo_05.mp3")} />
    </AbsoluteFill>
  );
};
