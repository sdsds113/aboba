// Слой «планов» поверх ведущего плана (Макс справа, элементы слева).
// Каждый план закрывает кадр своим фоном: крупный Макс, инфографика на весь кадр,
// сплит-экран, Макс в полный рост. Плюс крупные слова на весь кадр.
// Время везде в секундах озвучки (vo.m4a), как в timeline.ts.
import { Audio } from "@remotion/media";
import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { LEAD_IN } from "./timeline";

const RED = "#EF3124";
const INK = "#1B1B21";
const LIME = "#B6F03A";
const FONT = "Styrene, Arial, sans-serif";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const smooth = Easing.bezier(0.16, 1, 0.3, 1);

const useT = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps - LEAD_IN;
};

// Мягкое появление с лёгкой пружиной
const usePop = () => {
  const { fps } = useVideoConfig();
  const t = useT();
  return (at: number, damping = 14) =>
    t < at ? 0 : spring({ frame: Math.round((t - at) * fps), fps, config: { damping, stiffness: 120, mass: 0.8 } });
};

type Enter = "fade" | "circle" | "wipe" | "up";

// Обёртка плана: фон с медленным наездом, вход через маску, уход растворением
const Shot: React.FC<{
  start: number;
  end: number;
  bg: string;
  enter?: Enter;
  origin?: [number, number];
  children: (lt: number, t: number) => React.ReactNode;
}> = ({ start, end, bg, enter = "fade", origin = [50, 50], children }) => {
  const t = useT();
  if (t < start - 0.05 || t > end + 0.3) return null;
  const lt = t - start;
  const p = interpolate(lt, [0, enter === "fade" ? 0.22 : 0.42], [0, 1], { ...clamp, easing: smooth });
  const out = interpolate(t, [end, end + 0.25], [1, 0], clamp);
  const clip =
    enter === "circle"
      ? `circle(${p * 130}% at ${origin[0]}% ${origin[1]}%)`
      : enter === "wipe"
        ? `inset(0 ${(1 - p) * 100}% 0 0)`
        : enter === "up"
          ? `inset(${(1 - p) * 100}% 0 0 0)`
          : undefined;
  return (
    <AbsoluteFill style={{ zIndex: 90, clipPath: clip, opacity: (enter === "fade" ? p : 1) * out }}>
      <Img
        src={staticFile(bg)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          scale: String(1.08 - 0.04 * Math.min(lt / 8, 1)),
        }}
      />
      {/* медленный наезд камеры на всё содержимое плана */}
      <AbsoluteFill style={{ scale: String(1 + 0.035 * Math.min(lt / 6, 1)), transformOrigin: "50% 60%" }}>
        {children(lt, t)}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Картинка с появлением, плаванием и уходом
const Sprite: React.FC<{
  src: string;
  x: number;
  y: number;
  size: number;
  at: number;
  until?: number;
  from?: "pop" | "top" | "bottom" | "left" | "right";
  rot?: number;
  float?: number;
  flip?: boolean;
  dx?: number;
  dy?: number;
  extraScale?: number;
  opacity?: number;
  z?: number;
}> = ({ src, x, y, size, at, until = 9999, from = "pop", rot = 0, float = 8, flip, dx = 0, dy = 0, extraScale = 1, opacity = 1, z = 1 }) => {
  const t = useT();
  const pop = usePop();
  if (t < at - 0.02 || t > until + 0.35) return null;
  const e = pop(at);
  const off = 1 - e;
  const ox = from === "left" ? -320 * off : from === "right" ? 320 * off : 0;
  const oy = from === "top" ? -360 * off : from === "bottom" ? 300 * off : 24 * off;
  const s0 = from === "pop" ? 0.7 : 0.92;
  const leave = interpolate(t, [until, until + 0.3], [0, 1], clamp);
  const lt = t - at;
  const ph = (x * 7 + y * 3) % 6.28;
  return (
    <Img
      src={staticFile(src)}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        zIndex: z,
        opacity: Math.min(1, lt / 0.15) * (1 - leave) * opacity,
        translate: `${ox + dx}px ${oy + dy + Math.sin(lt * 1.7 + ph) * float - 20 * leave}px`,
        rotate: `${rot + Math.sin(lt * 1.3 + ph) * (float > 0 ? 1.6 : 0)}deg`,
        scale: `${(flip ? -1 : 1) * (s0 + (1 - s0) * e) * extraScale * (1 - 0.1 * leave)} ${(s0 + (1 - s0) * e) * extraScale * (1 - 0.1 * leave)}`,
      }}
    />
  );
};

// Крупный Макс: низ картинки всегда ниже кадра, лёгкое «дыхание» и наезд
const BigMax: React.FC<{ src: string; left: number; size: number; at: number; flip?: boolean }> = ({ src, left, size, at, flip }) => {
  const t = useT();
  const pop = usePop();
  const e = pop(at, 16);
  const lt = t - at;
  return (
    <Img
      src={staticFile(`char/${src}.png`)}
      style={{
        position: "absolute",
        left,
        top: 1080 + 50 - size,
        width: size,
        height: size,
        zIndex: 5,
        opacity: Math.min(1, Math.max(0, lt / 0.18)),
        translate: `0px ${60 * (1 - e) + Math.sin(lt * 1.5) * 4}px`,
        scale: `${flip ? -1 : 1} 1`,
        transformOrigin: "50% 100%",
      }}
    />
  );
};

// Макс в полный рост: ступни у нижнего края, мягкий подпрыг при появлении
const FullMax: React.FC<{ src: string; left: number; size: number; at: number; until?: number; flip?: boolean }> = ({ src, left, size, at, until = 9999, flip }) => {
  const t = useT();
  const pop = usePop();
  if (t < at - 0.02 || t > until + 0.3) return null;
  const e = pop(at, 12);
  const lt = t - at;
  const leave = interpolate(t, [until, until + 0.25], [1, 0], clamp);
  return (
    <Img
      src={staticFile(`char/${src}.png`)}
      style={{
        position: "absolute",
        left,
        top: 1050 - size * (972 / 1024),
        width: size,
        height: size,
        zIndex: 5,
        opacity: Math.min(1, lt / 0.15) * leave,
        translate: `0px ${80 * (1 - e) + Math.sin(lt * 1.6) * 5}px`,
        scale: `${flip ? -1 : 1} 1`,
      }}
    />
  );
};

// Строка «крестик/галочка + подпись»
const Row: React.FC<{ kind: "cross" | "check"; text: string; x: number; y: number; at: number; dark?: boolean }> = ({ kind, text, x, y, at, dark }) => {
  const t = useT();
  const pop = usePop();
  if (t < at - 0.02) return null;
  const e = pop(at);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        display: "flex",
        alignItems: "center",
        gap: 18,
        opacity: Math.min(1, (t - at) / 0.15),
        translate: `${-40 * (1 - e)}px 0px`,
        zIndex: 6,
      }}
    >
      <Img src={staticFile(`el/${kind === "cross" ? "el_33_cross" : "el_34_check"}.png`)} style={{ width: 92, height: 92, scale: String(0.6 + 0.4 * e) }} />
      <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 46, color: dark ? INK : "#FFFFFF", whiteSpace: "nowrap" }}>{text}</span>
    </div>
  );
};

// Поток монет по кривой Безье: из точки A в точку B через две опорные
const CoinStream: React.FC<{
  pts: [number, number][];
  from: number;
  until: number;
  n?: number;
  speed?: number;
  size?: number;
}> = ({ pts, from, until, n = 9, speed = 0.55, size = 92 }) => {
  const t = useT();
  if (t < from || t > until + 1.5) return null;
  const [p0, p1, p2, p3] = pts;
  const bez = (u: number, i: 0 | 1) =>
    (1 - u) ** 3 * p0[i] + 3 * (1 - u) ** 2 * u * p1[i] + 3 * (1 - u) * u ** 2 * p2[i] + u ** 3 * p3[i];
  return (
    <>
      {Array.from({ length: n }).map((_, k) => {
        const born = from + (k / n) / speed;
        const age = (t - born) * speed;
        if (age < 0) return null;
        const cyc = Math.floor(age);
        const u = age - cyc;
        // новые монеты перестают вылетать после until
        if (born + cyc / speed > until) return null;
        const a = Math.min(1, u / 0.08) * Math.min(1, (1 - u) / 0.1);
        return (
          <Img
            key={k}
            src={staticFile("el/el_30_coin.png")}
            style={{
              position: "absolute",
              left: bez(u, 0) - size / 2,
              top: bez(u, 1) - size / 2,
              width: size,
              height: size,
              opacity: a,
              rotate: `${(u * 540 + k * 40) % 360}deg`,
              scale: String(0.75 + 0.35 * Math.sin(u * Math.PI)),
              zIndex: 4,
            }}
          />
        );
      })}
    </>
  );
};

// Дождь из монет
const CoinRain: React.FC<{ from: number; x0: number; x1: number; n?: number }> = ({ from, x0, x1, n = 14 }) => {
  const t = useT();
  if (t < from) return null;
  return (
    <>
      {Array.from({ length: n }).map((_, k) => {
        const r = Math.abs(Math.sin(k * 12.9898 + 4.1) * 43758.5453) % 1;
        const delay = (Math.abs(Math.sin(k * 78.233) * 437.585) % 1) * 1.6;
        const life = (t - from - delay) * (0.55 + r * 0.25);
        if (life < 0) return null;
        const u = life % 1.0;
        const x = x0 + r * (x1 - x0);
        const y = -140 + u * 1350;
        return (
          <Img
            key={k}
            src={staticFile("el/el_30_coin.png")}
            style={{ position: "absolute", left: x, top: y, width: 70 + r * 50, height: 70 + r * 50, rotate: `${u * 400 + k * 30}deg`, zIndex: 3 }}
          />
        );
      })}
    </>
  );
};

// Расходящееся кольцо щита
const Ring: React.FC<{ cx: number; cy: number; at: number; size?: number }> = ({ cx, cy, at, size = 700 }) => {
  const t = useT();
  const lt = t - at;
  if (lt < 0 || lt > 1.2) return null;
  const p = interpolate(lt, [0, 1.2], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <Img
      src={staticFile("el/el_40_ring.png")}
      style={{ position: "absolute", left: cx - size / 2, top: cy - size / 2, width: size, height: size, scale: String(0.25 + 1.6 * p), opacity: 1 - p, zIndex: 7 }}
    />
  );
};

const Label: React.FC<{ text: string; x: number; y: number; at: number; color?: string; bg?: string; size?: number }> = ({ text, x, y, at, color = "#FFFFFF", bg = RED, size = 44 }) => {
  const t = useT();
  const pop = usePop();
  if (t < at - 0.02) return null;
  const e = pop(at);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        padding: "14px 28px 16px",
        borderRadius: 999,
        background: bg,
        color,
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: size,
        whiteSpace: "nowrap",
        opacity: Math.min(1, (t - at) / 0.15),
        scale: String(0.7 + 0.3 * e),
        boxShadow: "0 16px 36px rgba(0,0,0,0.18)",
        zIndex: 8,
      }}
    >
      {text}
    </div>
  );
};

// Крупное слово на весь кадр
const BigWord: React.FC<{ text: string; start: number; end: number; color?: string }> = ({ text, start, end, color = "#FFFFFF" }) => {
  const t = useT();
  if (t < start - 0.02 || t > end + 0.2) return null;
  const lt = t - start;
  const inP = interpolate(lt, [0, 0.12], [0, 1], clamp);
  const out = interpolate(t, [end, end + 0.18], [1, 0], clamp);
  const s = interpolate(lt, [0, 0.3, end - start], [1.25, 1.0, 0.94], { ...clamp, easing: smooth });
  return (
    <AbsoluteFill style={{ zIndex: 115, opacity: inP * out }}>
      <Img src={staticFile("bg_graphite.png")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 250,
            letterSpacing: "-0.03em",
            color,
            scale: String(s),
            textShadow: "0 24px 60px rgba(0,0,0,0.45)",
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Шкала цели: заполняется от 0 до 100%
const GoalBar: React.FC<{ from: number; to: number; at: number }> = ({ from, to, at }) => {
  const t = useT();
  const pop = usePop();
  if (t < at - 0.02) return null;
  const e = pop(at);
  const p = interpolate(t, [from, to], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const W = 980;
  return (
    <div style={{ position: "absolute", left: 580, top: 860, width: W, zIndex: 8, opacity: Math.min(1, (t - at) / 0.2), translate: `0px ${60 * (1 - e)}px` }}>
      <div style={{ height: 66, borderRadius: 33, background: "rgba(255,255,255,0.95)", boxShadow: "0 16px 40px rgba(0,0,0,0.25), inset 0 0 0 4px rgba(200,200,210,0.9)", overflow: "hidden" }}>
        <div style={{ width: `${Math.max(6, p * 100)}%`, height: "100%", borderRadius: 33, background: `linear-gradient(180deg, #D4FF6E 0%, ${LIME} 55%, #8FD11C 100%)` }} />
      </div>
      <Img src={staticFile("el/el_30_coin.png")} style={{ position: "absolute", left: Math.max(6, p * 100) * (W / 100) - 55, top: -22, width: 110, height: 110, rotate: `${p * 720}deg` }} />
      <div style={{ position: "absolute", right: -190, top: 2, fontFamily: FONT, fontWeight: 900, fontSize: 56, color: "#FFFFFF" }}>{Math.round(p * 100)}%</div>
    </div>
  );
};

// Точки ПИН-кода загораются по одной
const PinDots: React.FC<{ x: number; y: number; at: number }> = ({ x, y, at }) => {
  const t = useT();
  if (t < at - 0.02) return null;
  return (
    <div style={{ position: "absolute", left: x, top: y, display: "flex", gap: 26, zIndex: 8 }}>
      {[0, 1, 2, 3].map((i) => {
        const on = interpolate(t, [at + i * 0.16, at + i * 0.16 + 0.12], [0, 1], clamp);
        return (
          <div
            key={i}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              border: "4px solid rgba(255,255,255,0.85)",
              background: on > 0 ? `rgba(182,240,58,${on})` : "transparent",
              boxShadow: on > 0.5 ? `0 0 24px rgba(182,240,58,0.7)` : undefined,
              scale: String(1 + 0.25 * Math.sin(on * Math.PI)),
            }}
          />
        );
      })}
    </div>
  );
};

// Отрезки, где план закрывает ведущий: по ним глушим старые звуки элементов
export const SHOT_RANGES: [number, number][] = [
  [0, 3.0],
  [21.45, 27.84],
  [27.84, 43.81],
  [43.81, 51.15],
  [51.15, 54.77],
  [54.77, 63.51],
  [63.51, 67.26],
  [78.66, 87.9],
  [87.9, 90.67],
  [90.67, 107.95],
  [107.95, 117.9],
  [117.9, 126.76],
  [126.76, 999],
];

export const Shots: React.FC = () => {
  return (
    <>
      {/* 1. Крупный Макс с картой */}
      <Shot start={0} end={3.0} bg="bg_red.png" enter="fade">
        {() => (
          <>
            <Sprite src="el/el_01_card.png" x={110} y={250} size={600} at={0.15} rot={-8} from="left" />
            <Sprite src="el/el_02_sparkles.png" x={560} y={170} size={260} at={0.9} />
            <Sprite src="el/el_41_question.png" x={640} y={560} size={260} at={2.24} rot={10} />
            <BigMax src="max_cu_card" left={840} size={1060} at={0.05} />
          </>
        )}
      </Shot>

      {/* 2. Деньги текут из сейфа в карту и телефон */}
      <Shot start={21.45} end={27.84} bg="bg_light.png" enter="wipe">
        {() => (
          <>
            <Sprite src="el/el_03_safe.png" x={60} y={390} size={500} at={21.5} from="left" />
            <Sprite src="el/el_32_tube.png" x={520} y={260} size={760} at={21.9} float={0} />
            <Sprite src="el/el_06_remote.png" x={1260} y={330} size={560} at={24.0} from="right" />
            <CoinStream pts={[[440, 600], [700, 330], [1000, 760], [1420, 600]]} from={22.3} until={27.4} />
            <Label text="деньги в банке" x={150} y={330} at={23.08} />
            <Label text="карта и смартфон: пульт" x={1150} y={250} at={25.2} />
          </>
        )}
      </Shot>

      {/* 3. Сплит-экран: наличка против карты */}
      <Shot start={27.84} end={43.81} bg="bg_light.png" enter="circle" origin={[50, 50]}>
        {(lt) => {
          const split = interpolate(lt, [0, 0.6], [0, 1], { ...clamp, easing: smooth });
          return (
            <>
              <div style={{ position: "absolute", left: 0, top: 0, width: 960 * split, height: 1080, overflow: "hidden" }}>
                <Img src={staticFile("bg_red.png")} style={{ width: 1920, height: 1080, objectFit: "cover" }} />
              </div>
              <div style={{ position: "absolute", right: 0, top: 0, width: 960 * split, height: 1080, overflow: "hidden" }}>
                <Img src={staticFile("bg_lime.png")} style={{ position: "absolute", right: 0, width: 1920, height: 1080, objectFit: "cover" }} />
              </div>
              <Label text="Наличка" x={110} y={210} at={29.36} bg="#FFFFFF" color={INK} size={52} />
              <Label text="Карта" x={1510} y={210} at={30.16} bg={RED} size={52} />
              <Sprite src="el/el_07_cash_crumpled.png" x={140} y={250} size={430} at={28.9} rot={-6} />
              <Sprite src="el/el_08_coins_fall.png" x={430} y={330} size={300} at={35.9} from="top" />
              <Sprite src="el/el_01_card.png" x={1320} y={200} size={430} at={30.16} rot={6} from="right" />
              <Row kind="cross" text="Мнутся" x={100} y={660} at={34.1} />
              <Row kind="cross" text="Теряются" x={100} y={760} at={34.9} />
              <Row kind="cross" text="Звенят в кармане" x={100} y={860} at={36.62} />
              <Row kind="cross" text="Не оплатить онлайн" x={100} y={960} at={39.56} />
              <Row kind="check" text="Подписки" x={1330} y={600} at={40.62} dark />
              <Row kind="check" text="Маркетплейсы" x={1330} y={700} at={41.76} dark />
              <Row kind="check" text="Игры" x={1330} y={800} at={43.16} dark />
              <BigMax src="max_cu_question" left={700} size={560} at={31.0} />
            </>
          );
        }}
      </Shot>

      {/* 4. Влёт в телефон: баланс под рукой и щит */}
      <Shot start={43.81} end={51.15} bg="bg_light.png" enter="circle" origin={[50, 45]}>
        {(lt) => {
          const z = interpolate(lt, [0, 0.8], [0.55, 1], { ...clamp, easing: smooth });
          return (
            <>
              <div style={{ position: "absolute", left: 300, top: 40, width: 1000, height: 1000, scale: String(z) }}>
                <Img src={staticFile("el/el_37_phone_front.png")} style={{ width: 1000, height: 1000 }} />
              </div>
              <Sprite src="el/el_01_card.png" x={610} y={330} size={380} at={45.48} rot={-4} />
              <Sprite src="el/el_14_shield.png" x={650} y={330} size={300} at={49.6} z={3} />
              <Ring cx={800} cy={480} at={49.7} />
              <FullMax src="max_fb_phone_tap" left={1150} size={960} at={44.3} />
            </>
          );
        }}
      </Shot>

      {/* 5. Крупный Макс: купюру потерял, прощай */}
      <Shot start={51.15} end={54.77} bg="bg_light.png" enter="wipe">
        {(_, t) => {
          const fly = interpolate(t, [53.6, 54.6], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
          return (
            <>
              <BigMax src="max_cu_shrug" left={-40} size={1060} at={51.2} />
              <Sprite src="el/el_31_banknote.png" x={1180} y={360} size={420} at={51.8} rot={-8} dx={700 * fly} dy={-700 * fly} />
            </>
          );
        }}
      </Shot>

      {/* 6. Блокировка в один тап */}
      <Shot start={54.77} end={63.51} bg="bg_graphite.png" enter="circle" origin={[35, 50]}>
        {(_, t) => {
          const tap = interpolate(t, [56.3, 56.8, 57.0, 57.4], [-420, 0, -14, 0], clamp);
          const locked = interpolate(t, [59.3, 59.55], [0, 1], clamp);
          return (
            <>
              <div style={{ position: "absolute", left: 180, top: 40, width: 1000, height: 1000 }}>
                <Img src={staticFile("el/el_37_phone_front.png")} style={{ position: "absolute", width: 1000, height: 1000, opacity: 1 - locked }} />
                <Img src={staticFile("el/el_36_phone_lock.png")} style={{ position: "absolute", width: 1000, height: 1000, opacity: locked }} />
              </div>
              {t > 56.1 && t < 58.6 ? (
                <Img src={staticFile("el/el_35_finger.png")} style={{ position: "absolute", left: 560, top: 300 + tap, width: 420, height: 420, zIndex: 6, opacity: interpolate(t, [56.1, 56.3, 58.2, 58.6], [0, 1, 1, 0], clamp) }} />
              ) : null}
              <Ring cx={680} cy={560} at={56.85} size={420} />
              <Ring cx={680} cy={520} at={59.45} />
              <Ring cx={680} cy={520} at={61.0} />
              <FullMax src="max_fb_shield_card" left={1130} size={940} at={61.0} />
            </>
          );
        }}
      </Shot>

      {/* 7. Три крутых плюса: Макс прыгает, цифры падают */}
      <Shot start={63.51} end={67.26} bg="bg_red.png" enter="up">
        {(_, t) => (
          <>
            {[66.08, 66.32, 66.68].map((at, i) => {
              const p = t < at ? 0 : spring({ frame: Math.round((t - at) * 60), fps: 60, config: { damping: 9, stiffness: 140 } });
              return t < at ? null : (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: 160 + i * 300,
                    top: 400,
                    width: 230,
                    height: 230,
                    borderRadius: 115,
                    background: "#FFFFFF",
                    color: RED,
                    fontFamily: FONT,
                    fontWeight: 900,
                    fontSize: 150,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    translate: `0px ${-600 * (1 - p)}px`,
                    boxShadow: "0 24px 50px rgba(80,0,0,0.3)",
                    zIndex: 6,
                  }}
                >
                  {i + 1}
                </div>
              );
            })}
            <FullMax src="max_fb_jump" left={1060} size={960} at={63.6} />
          </>
        )}
      </Shot>

      {/* 8. Кэшбэк: покупки в корзину, монеты обратно на карту */}
      <Shot start={78.66} end={87.9} bg="bg_lime.png" enter="circle" origin={[30, 60]}>
        {(_, t) => {
          const intoCart = interpolate(t, [82.9, 83.7], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
          return (
            <>
              <Sprite src="el/el_38_cart.png" x={250} y={430} size={560} at={78.8} from="left" />
              {t < 83.8 ? (
                <Sprite src="el/el_17_snacks.png" x={120} y={60} size={820} at={80.3} dy={330 * intoCart} extraScale={1 - 0.6 * intoCart} opacity={1 - intoCart} />
              ) : null}
              <Sprite src="el/el_01_card.png" x={1220} y={250} size={520} at={84.3} rot={6} from="right" />
              <CoinStream pts={[[560, 640], [760, 260], [1100, 200], [1460, 470]]} from={84.46} until={87.4} n={8} speed={0.7} />
              <Label text="часть денег обратно" x={1150} y={760} at={84.8} />
            </>
          );
        }}
      </Shot>

      {/* 9. Крупный Макс: вау, бонус */}
      <Shot start={87.9} end={90.67} bg="bg_violet.png" enter="circle" origin={[70, 60]}>
        {() => (
          <>
            <CoinRain from={88.0} x0={40} x1={760} />
            <BigMax src="max_cu_wow" left={760} size={1060} at={87.95} />
          </>
        )}
      </Shot>

      {/* 10. Цели: Макс на копилке, ПК и кроссовки на подиумах, шкала до 100% */}
      <Shot start={90.67} end={107.95} bg="bg_violet.png" enter="wipe">
        {(_, t) => {
          const done = t > 107.0;
          return (
            <>
              <FullMax src="max_fb_sit_piggy" left={-60} size={900} at={90.9} />
              <Sprite src="el/el_39_podium.png" x={760} y={520} size={420} at={93.2} float={0} from="bottom" />
              <Sprite src="el/el_39_podium.png" x={1260} y={520} size={420} at={93.5} float={0} from="bottom" />
              <Sprite src="el/el_18_pc.png" x={790} y={230} size={380} at={94.54} from="top" float={5} />
              <Sprite src="el/el_19_sneakers.png" x={1290} y={300} size={380} at={95.42} from="top" float={5} />
              <GoalBar at={96.9} from={100.84} to={107.0} />
              {done ? <Sprite src="el/el_34_check.png" x={1390} y={220} size={170} at={107.0} /> : null}
              {done ? <Sprite src="el/el_29_confetti.png" x={540} y={-40} size={1100} at={107.05} from="top" float={0} /> : null}
            </>
          );
        }}
      </Shot>

      {/* 11. Безопасность: ПИН, СМС, CVV закрываются замками */}
      <Shot start={107.95} end={117.9} bg="bg_graphite.png" enter="circle" origin={[50, 50]}>
        {() => (
          <>
            <Sprite src="el/el_23_pin_pad.png" x={110} y={320} size={440} at={110.88} />
            <PinDots x={170} y={250} at={110.95} />
            <Sprite src="el/el_24_sms.png" x={700} y={300} size={420} at={111.58} />
            <Sprite src="el/el_22_card_back.png" x={1250} y={300} size={520} at={112.82} from="right" />
            <Sprite src="el/el_13_lock.png" x={1000} y={540} size={180} at={112.3} />
            <Sprite src="el/el_13_lock.png" x={1600} y={560} size={190} at={114.6} />
            <Label text="ПИН-код" x={200} y={790} at={110.95} bg="#FFFFFF" color={INK} />
            <Label text="код из СМС" x={760} y={790} at={111.7} bg="#FFFFFF" color={INK} />
            <Label text="CVV-код" x={1380} y={790} at={114.42} bg="#FFFFFF" color={INK} />
          </>
        )}
      </Shot>

      {/* 12. Крупный Макс «тсс» и крючок с приманкой */}
      <Shot start={117.9} end={126.76} bg="bg_red.png" enter="wipe">
        {(_, t) => {
          const drop = interpolate(t, [121.96, 122.6], [-700, 0], { ...clamp, easing: Easing.out(Easing.back(1.4)) });
          return (
            <>
              <BigMax src="max_cu_shh" left={860} size={1060} at={117.95} />
              {t > 121.9 ? (
                <Img src={staticFile("el/el_25_hook.png")} style={{ position: "absolute", left: 170, top: 120 + drop, width: 600, height: 600, rotate: `${Math.sin((t - 122) * 2.2) * 5}deg`, transformOrigin: "50% 0%", zIndex: 4 }} />
              ) : null}
              <Sprite src="el/el_33_cross.png" x={330} y={330} size={300} at={124.1} z={6} />
              <Label text="лёгкие деньги = ловушка" x={110} y={820} at={124.3} bg="#FFFFFF" color={INK} />
            </>
          );
        }}
      </Shot>

      {/* 13. Финал: Макс в полный рост машет, книги, кубок, конфетти */}
      <Shot start={126.76} end={999} bg="bg_lime.png" enter="circle" origin={[70, 50]}>
        {() => (
          <>
            <Sprite src="el/el_27_skill.png" x={120} y={330} size={480} at={128.96} from="bottom" />
            <Sprite src="el/el_28_trophy.png" x={600} y={290} size={450} at={132.02} />
            <Sprite src="el/el_29_confetti.png" x={20} y={-60} size={1150} at={132.1} from="top" float={0} />
            <FullMax src="max_fb_wave" left={1120} size={980} at={126.9} />
          </>
        )}
      </Shot>

      {/* Крупные слова на весь кадр */}
      <BigWord text="НЕ ДЕНЬГИ" start={17.9} end={18.66} />
      <BigWord text="КЛЮЧ" start={19.24} end={20.05} color={LIME} />
      <BigWord text="КЭШБЭК" start={79.46} end={80.25} color={LIME} />
      <BigWord text="НИКОМУ" start={118.74} end={119.5} />
    </>
  );
};

// Звуки планов
const SHOT_SFX: { t: number; sfx: string; vol?: number }[] = [
  { t: 0.15, sfx: "whoosh_soft" },
  { t: 2.24, sfx: "pop_soft" },
  { t: 17.9, sfx: "whoosh_slide" },
  { t: 19.24, sfx: "whoosh_slide" },
  { t: 21.45, sfx: "whoosh_soft" },
  { t: 22.3, sfx: "coins_clink" },
  { t: 25.2, sfx: "coins_clink" },
  { t: 27.84, sfx: "whoosh_soft" },
  { t: 28.9, sfx: "paper_crumple" },
  { t: 34.1, sfx: "error_soft" },
  { t: 34.9, sfx: "error_soft" },
  { t: 35.9, sfx: "pocket_coins" },
  { t: 36.62, sfx: "error_soft" },
  { t: 39.56, sfx: "error_soft" },
  { t: 40.62, sfx: "pop_soft_2" },
  { t: 41.76, sfx: "pop_soft_2" },
  { t: 43.16, sfx: "pop_soft_2" },
  { t: 43.81, sfx: "whoosh_slide" },
  { t: 45.48, sfx: "notification" },
  { t: 49.6, sfx: "shield_on" },
  { t: 51.15, sfx: "whoosh_soft" },
  { t: 51.8, sfx: "paper_crumple" },
  { t: 53.6, sfx: "whoosh_slide" },
  { t: 54.77, sfx: "whoosh_soft" },
  { t: 56.8, sfx: "ui_tap" },
  { t: 59.4, sfx: "card_lock" },
  { t: 61.0, sfx: "shield_on" },
  { t: 63.51, sfx: "whoosh_soft" },
  { t: 66.08, sfx: "pop_soft" },
  { t: 66.32, sfx: "pop_soft_2" },
  { t: 66.68, sfx: "chime_positive" },
  { t: 78.66, sfx: "whoosh_soft" },
  { t: 79.46, sfx: "whoosh_slide" },
  { t: 80.3, sfx: "pop_soft" },
  { t: 83.2, sfx: "whoosh_slide" },
  { t: 84.6, sfx: "coins_clink" },
  { t: 85.9, sfx: "coins_clink" },
  { t: 87.9, sfx: "sparkle" },
  { t: 88.1, sfx: "coins_clink" },
  { t: 90.67, sfx: "whoosh_soft" },
  { t: 94.54, sfx: "pop_soft" },
  { t: 95.42, sfx: "pop_soft_2" },
  { t: 100.84, sfx: "progress_fill" },
  { t: 107.0, sfx: "success_unlock" },
  { t: 107.95, sfx: "whoosh_soft" },
  { t: 108.1, sfx: "alert_soft" },
  { t: 110.95, sfx: "ui_tap" },
  { t: 111.27, sfx: "ui_tap" },
  { t: 111.58, sfx: "pop_soft" },
  { t: 112.3, sfx: "card_lock" },
  { t: 112.82, sfx: "card_swipe" },
  { t: 114.6, sfx: "card_lock" },
  { t: 117.9, sfx: "whoosh_soft" },
  { t: 118.74, sfx: "whoosh_slide" },
  { t: 121.96, sfx: "whoosh_soft" },
  { t: 124.1, sfx: "error_soft" },
  { t: 126.76, sfx: "whoosh_soft" },
  { t: 132.02, sfx: "success_unlock" },
];

export const ShotsAudio: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <>
      {SHOT_SFX.map((s, i) => (
        <Sequence key={i} name={`shot sfx ${s.sfx}`} from={Math.round((s.t + LEAD_IN) * fps)} durationInFrames={fps * 3}>
          <Audio src={staticFile(`sfx/${s.sfx}.mp3`)} volume={(s.vol ?? 0.42) * 0.65} />
        </Sequence>
      ))}
    </>
  );
};
