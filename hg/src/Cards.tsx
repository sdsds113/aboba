import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Check, Chip, GREY, Header, INK, LIGHT, RED, RED_DARK, WhiteBg, fadeUp, useSpring } from "./ui";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/* ───────────── Б1. Баланс (кадр 3) ───────────── */
export const BalanceCard: React.FC = () => {
  const frame = useCurrentFrame();
  // beam starts tilted, swings and settles level
  const settle = useSpring(25, 6);
  const angle = interpolate(settle, [0, 1], [-11, 0]);
  const cx = 960;
  const cy = 600;
  const half = 520;
  const rad = (angle * Math.PI) / 180;
  const lx = cx - half * Math.cos(rad);
  const ly = cy - half * Math.sin(rad);
  const rx = cx + half * Math.cos(rad);
  const ry = cy + half * Math.sin(rad);
  const appear = useSpring(12);
  const eq = useSpring(110, 12);
  const glow = interpolate(frame, [110, 140], [0, 1], clamp);

  const Pan: React.FC<{ x: number; y: number; text: string; sub: string; accent?: boolean }> = ({
    x,
    y,
    text,
    sub,
    accent,
  }) => (
    <div
      style={{
        position: "absolute",
        left: x - 230,
        top: y + 70,
        width: 460,
        padding: "30px 24px",
        borderRadius: 32,
        textAlign: "center",
        background: accent ? RED : "#FFFFFF",
        color: accent ? "#FFF" : INK,
        boxShadow: "0 20px 60px rgba(17,17,17,0.12)",
        opacity: appear,
      }}
    >
      <div style={{ fontSize: 30, fontWeight: 600, opacity: 0.75, marginBottom: 6 }}>{sub}</div>
      <div style={{ fontSize: 46, fontWeight: 800, lineHeight: 1.1 }}>{text}</div>
    </div>
  );

  return (
    <WhiteBg>
      <Header eyebrow="ВЗЫСКАНИЕ — ЭТО ЧЕЛОВЕЧНОСТЬ" title="Баланс интересов" />
      <svg width={1920} height={1080} style={{ position: "absolute", opacity: appear }}>
        {/* stand */}
        <path d={`M${cx} ${cy} L${cx - 70} 960 L${cx + 70} 960 Z`} fill={INK} />
        <rect x={cx - 180} y={955} width={360} height={16} rx={8} fill={INK} />
        {/* strings */}
        <line x1={lx} y1={ly} x2={lx} y2={ly + 72} stroke={INK} strokeWidth={5} />
        <line x1={rx} y1={ry} x2={rx} y2={ry + 72} stroke={INK} strokeWidth={5} />
        {/* beam */}
        <line x1={lx} y1={ly} x2={rx} y2={ry} stroke={INK} strokeWidth={16} strokeLinecap="round" />
        <circle cx={cx} cy={cy} r={30 + glow * 10} fill={RED} opacity={0.18 * glow} />
        <circle cx={cx} cy={cy} r={22} fill={RED} />
      </svg>
      <Pan x={lx} y={ly} sub="Интересы" text="бизнеса" />
      <Pan x={rx} y={ry} sub="Уважение" text="к клиенту" accent />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 470,
          textAlign: "center",
          ...fadeUp(eq, 20),
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            padding: "14px 30px",
            borderRadius: 999,
            background: LIGHT,
            fontSize: 34,
            fontWeight: 700,
          }}
        >
          <Check size={36} /> В равновесии
        </span>
      </div>
    </WhiteBg>
  );
};

/* ───────────── Б2. Технологии: AI-тренажёры (кадр 6) ───────────── */
const Bubble: React.FC<{ who: string; text: string; delay: number; right?: boolean }> = ({
  who,
  text,
  delay,
  right,
}) => {
  const p = useSpring(delay, 13);
  return (
    <div
      style={{
        alignSelf: right ? "flex-end" : "flex-start",
        maxWidth: 640,
        opacity: p,
        transform: `translateY(${(1 - p) * 30}px) scale(${0.92 + 0.08 * p})`,
        transformOrigin: right ? "right bottom" : "left bottom",
      }}
    >
      <div style={{ fontSize: 26, fontWeight: 700, color: GREY, marginBottom: 8, textAlign: right ? "right" : "left" }}>
        {who}
      </div>
      <div
        style={{
          padding: "26px 34px",
          borderRadius: 30,
          borderBottomLeftRadius: right ? 30 : 8,
          borderBottomRightRadius: right ? 8 : 30,
          background: right ? RED : "#FFFFFF",
          color: right ? "#FFF" : INK,
          fontSize: 40,
          fontWeight: 700,
          boxShadow: "0 16px 44px rgba(17,17,17,0.10)",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const TechCard: React.FC = () => {
  const frame = useCurrentFrame();
  const wave = useSpring(10);
  const fear = interpolate(frame, [130, 185], [1, 0], clamp);
  const fearIn = useSpring(120);
  const done = useSpring(185, 10);
  const bars = 34;
  return (
    <WhiteBg>
      <Header eyebrow="01 · ТЕХНОЛОГИИ" title="AI-тренажёры" />
      {/* AI voice orb + waveform */}
      <div style={{ position: "absolute", left: 120, top: 470, width: 700, opacity: wave }}>
        <div style={{ display: "flex", alignItems: "center", gap: 28, marginBottom: 40 }}>
          <div style={{ position: "relative", width: 110, height: 110 }}>
            {[0, 1].map((i) => {
              const t = ((frame + i * 25) % 50) / 50;
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    border: `4px solid ${RED}`,
                    transform: `scale(${1 + t * 0.7})`,
                    opacity: 1 - t,
                  }}
                />
              );
            })}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${RED}, ${RED_DARK})`,
                color: "#FFF",
                fontSize: 44,
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              AI
            </div>
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, color: GREY }}>Голосовой тренажёр</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 9, height: 170 }}>
          {Array.from({ length: bars }).map((_, i) => {
            const env = Math.sin((i / (bars - 1)) * Math.PI);
            const h = 16 + env * 150 * Math.abs(Math.sin(i * 0.55 + frame * 0.22)) * wave;
            return <div key={i} style={{ width: 12, height: h, borderRadius: 6, background: i % 3 === 0 ? INK : RED }} />;
          })}
        </div>
        {/* fear meter */}
        <div style={{ marginTop: 56, ...fadeUp(fearIn, 20) }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 700, marginBottom: 14 }}>
            <span>Страх первого звонка</span>
            <span style={{ color: RED, opacity: done }}>снят</span>
          </div>
          <div style={{ height: 22, borderRadius: 11, background: LIGHT, overflow: "hidden" }}>
            <div style={{ width: `${fear * 100}%`, height: "100%", borderRadius: 11, background: INK }} />
          </div>
        </div>
      </div>
      {/* dialog */}
      <div
        style={{
          position: "absolute",
          right: 120,
          top: 300,
          width: 760,
          display: "flex",
          flexDirection: "column",
          gap: 34,
        }}
      >
        <Bubble who="AI-клиент" text="Я не буду платить!" delay={35} />
        <Bubble who="Новичок" text="Давайте вместе найдём решение" delay={70} right />
        <div style={{ alignSelf: "flex-end", ...fadeUp(useSpring(105, 12), 20) }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 16,
              padding: "16px 30px",
              borderRadius: 999,
              background: LIGHT,
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            <Check size={38} /> Возражение отработано
          </span>
        </div>
      </div>
    </WhiteBg>
  );
};

/* ───────────── Б3. Азарт: геймификация (кадр 6) ───────────── */
const Star: React.FC<{ size: number; fill: string }> = ({ size, fill }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" fill={fill} />
  </svg>
);

const SkillRow: React.FC<{ label: string; level: number; target: number; delay: number }> = ({
  label,
  level,
  target,
  delay,
}) => {
  const frame = useCurrentFrame();
  const inn = useSpring(delay, 14);
  const fill = interpolate(frame, [delay + 8, delay + 58], [0.12, target], {
    ...clamp,
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
  const pop = useSpring(delay + 58, 9);
  return (
    <div style={{ ...fadeUp(inn, 30), display: "flex", alignItems: "center", gap: 36 }}>
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: 30,
          background: LIGHT,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
        }}
      >
        <div style={{ fontSize: 22, color: GREY }}>LVL</div>
        <div style={{ fontSize: 50, lineHeight: 1 }}>{fill >= target - 0.001 ? level + 1 : level}</div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 40, fontWeight: 700, marginBottom: 16 }}>
          <span>{label}</span>
          <span style={{ color: RED }}>{Math.round(fill * 100)}%</span>
        </div>
        <div style={{ height: 30, borderRadius: 15, background: LIGHT, overflow: "hidden" }}>
          <div
            style={{
              width: `${fill * 100}%`,
              height: "100%",
              borderRadius: 15,
              background: `linear-gradient(90deg, ${RED_DARK}, ${RED})`,
            }}
          />
        </div>
      </div>
      <div style={{ width: 90, transform: `scale(${pop}) rotate(${(1 - pop) * -60}deg)` }}>
        <Star size={90} fill={RED} />
      </div>
    </div>
  );
};

export const GameCard: React.FC = () => {
  const mot = useSpring(150, 11);
  return (
    <WhiteBg>
      <Header eyebrow="02 · АЗАРТ" title="Геймификация вместо рутины" />
      <div
        style={{
          position: "absolute",
          left: 120,
          right: 560,
          top: 420,
          display: "flex",
          flexDirection: "column",
          gap: 50,
        }}
      >
        <SkillRow label="Регламенты" level={2} target={1} delay={20} />
        <SkillRow label="Работа с возражениями" level={3} target={1} delay={45} />
        <SkillRow label="Сложные диалоги" level={4} target={1} delay={70} />
      </div>
      <div style={{ position: "absolute", right: 120, top: 640, ...fadeUp(mot, 30) }}>
        <Chip text="Мотивация ↑" delay={150} accent />
      </div>
    </WhiteBg>
  );
};

/* ───────────── Б4. Забота: выгорание (кадр 6) ───────────── */
export const CareCard: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [15, 70], [1, 0], { ...clamp, easing: (t) => 1 - Math.pow(1 - t, 2) });
  const heart = useSpring(65, 9);
  const beat = 1 + 0.06 * Math.max(0, Math.sin((frame - 80) / 6)) * (frame > 80 ? 1 : 0);
  const SHIELD = "M200 30 L350 90 V210 C350 300 285 360 200 395 C115 360 50 300 50 210 V90 Z";
  return (
    <WhiteBg>
      <Header eyebrow="03 · ЗАБОТА" title="Защита от выгорания" />
      <svg width={400} height={430} viewBox="0 0 400 430" style={{ position: "absolute", left: 160, top: 420 }}>
        <path d={SHIELD} fill={`${RED}14`} opacity={1 - draw} />
        <path
          d={SHIELD}
          fill="none"
          stroke={RED}
          strokeWidth={14}
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={draw}
        />
        <g transform={`translate(200 215) scale(${heart * beat}) translate(-60 -55)`}>
          <path
            d="M60 105 C20 75 0 52 0 30 C0 12 14 0 31 0 C44 0 54 7 60 18 C66 7 76 0 89 0 C106 0 120 12 120 30 C120 52 100 75 60 105 Z"
            fill={RED}
          />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          left: 720,
          top: 440,
          display: "flex",
          flexDirection: "column",
          gap: 36,
        }}
      >
        <Chip text="Психологическая броня" delay={70} icon={<Check />} />
        <Chip text="Экологичная разгрузка" delay={95} icon={<Check />} />
        <Chip text="Эмпатия в трудных диалогах" delay={120} icon={<Check />} />
      </div>
    </WhiteBg>
  );
};
