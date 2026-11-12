// Слой «планов» поверх ведущего плана (Макс справа, элементы слева).
// Каждый план закрывает кадр своим фоном: крупный Макс, инфографика на весь кадр,
// сплит-экран, Макс в полный рост. Плюс крупные слова, переходы через объект
// (карта, телефон, монета), кинетические заголовки и финальная плашка.
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
const inOut = Easing.bezier(0.7, 0, 0.2, 1);

export const OUTRO_AT = 135.5;

const useT = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps - LEAD_IN;
};

// Характер движения: тяжёлые предметы без отскока, лёгкие прыгают
export type Feel = "pop" | "heavy" | "bouncy" | "snappy";
export const FEEL: Record<Feel, { damping: number; stiffness: number; mass: number }> = {
  pop: { damping: 14, stiffness: 120, mass: 0.8 },
  heavy: { damping: 22, stiffness: 70, mass: 1.5 },
  bouncy: { damping: 8, stiffness: 150, mass: 0.6 },
  snappy: { damping: 19, stiffness: 230, mass: 0.6 },
};

const usePop = () => {
  const { fps } = useVideoConfig();
  const t = useT();
  return (at: number, feel: Feel = "pop", shift = 0) =>
    t - shift < at ? 0 : spring({ frame: Math.round((t - shift - at) * fps), fps, config: FEEL[feel] });
};

// Блик, пробегающий по картинке (маска по её альфе)
export const Shine: React.FC<{ src: string; lt: number; every?: number }> = ({ src, lt, every = 4 }) => {
  const u = ((lt % every) + every) % every;
  const p = interpolate(u, [0.6, 1.5], [0, 1], clamp);
  if (p <= 0 || p >= 1) return null;
  const url = `url(${staticFile(src)})`;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        background: `linear-gradient(110deg, transparent ${p * 140 - 40}%, rgba(255,255,255,0.75) ${p * 140 - 20}%, transparent ${p * 140}%)`,
        mixBlendMode: "screen",
      }}
    />
  );
};

// Кинетический заголовок: слова выезжают из-под маски по очереди
export const Head: React.FC<{
  text: string;
  x: number;
  y: number;
  at: number;
  until?: number;
  color?: string;
  size?: number;
  width?: number;
  align?: "left" | "center";
  z?: number;
}> = ({ text, x, y, at, until = 9999, color = "#FFFFFF", size = 64, width, align = "left", z = 9 }) => {
  const t = useT();
  if (t < at - 0.02 || t > until + 0.3) return null;
  const leave = interpolate(t, [until, until + 0.26], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  let k = 0;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        textAlign: align,
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: size,
        lineHeight: 1.12,
        letterSpacing: "-0.02em",
        color,
        zIndex: z,
        opacity: 1 - leave,
      }}
    >
      {text.split("\n").map((line, li) => (
        <div key={li} style={{ whiteSpace: "nowrap" }}>
          {line.split(" ").map((w, wi) => {
            const i = k++;
            const p = interpolate(t, [at + i * 0.07, at + i * 0.07 + 0.42], [0, 1], { ...clamp, easing: smooth });
            return (
              <span key={wi} style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.16em", marginBottom: "-0.16em", marginRight: "0.24em", verticalAlign: "top" }}>
                <span style={{ display: "inline-block", translate: `0px ${(1 - p) * 110 - leave * 110}%` }}>{w}</span>
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

type Enter = "fade" | "cut" | "circle" | "coin" | "wipe" | "up" | "whip";
type Exit = "hold" | "fade" | "whip";

// Обёртка плана: фон с медленным наездом, вход и уход, лёгкий свет на долю
const Shot: React.FC<{
  start: number;
  end: number;
  bg: string;
  enter?: Enter;
  exit?: Exit;
  dir?: 1 | -1;
  exitDir?: 1 | -1;
  origin?: [number, number];
  children: (lt: number, t: number) => React.ReactNode;
}> = ({ start, end, bg, enter = "fade", exit = "hold", dir = 1, exitDir = 1, origin = [50, 50], children }) => {
  const t = useT();
  if (t < start - 0.05 || t > end + 0.6) return null;
  const lt = t - start;
  const dur = enter === "cut" ? 0.12 : enter === "fade" ? 0.22 : enter === "whip" ? 0.4 : enter === "coin" ? 0.62 : 0.5;
  const p = interpolate(lt, [0, dur], [0, 1], { ...clamp, easing: enter === "whip" ? inOut : enter === "coin" ? Easing.inOut(Easing.quad) : smooth });
  const pe = exit === "whip" ? interpolate(t, [end, end + 0.4], [0, 1], { ...clamp, easing: inOut }) : 0;
  const fadeOut = exit === "fade" ? interpolate(t, [end, end + 0.25], [1, 0], clamp) : 1;
  const clip =
    enter === "circle" || enter === "coin"
      ? `circle(${p * 130}% at ${origin[0]}% ${origin[1]}%)`
      : enter === "wipe"
        ? `inset(0 ${(1 - p) * 100}% 0 0)`
        : enter === "up"
          ? `inset(${(1 - p) * 100}% 0 0 0)`
          : undefined;
  const tx = (enter === "whip" ? dir * 1920 * (1 - p) : 0) - exitDir * 1920 * pe;
  const blur = (enter === "whip" ? Math.sin(Math.PI * p) : 0) + Math.sin(Math.PI * pe);
  // радиус круга в пикселях: проценты clip-path считаются от диагонали / √2
  const r = p * 1.3 * 1557;
  return (
    <>
      <AbsoluteFill
        style={{
          zIndex: 90,
          clipPath: clip,
          opacity: (enter === "fade" || enter === "cut" ? p : 1) * fadeOut,
          translate: `${tx}px 0px`,
          filter: blur > 0.02 ? `blur(${blur * 22}px)` : undefined,
        }}
      >
        <Img
          src={staticFile(bg)}
          style={{ width: "100%", height: "100%", objectFit: "cover", scale: String(1.1 - 0.05 * Math.min(lt / 8, 1)) }}
        />
        <AbsoluteFill style={{ scale: String(1 + 0.035 * Math.min(lt / 6, 1)), transformOrigin: "50% 60%" }}>
          {children(lt, t)}
        </AbsoluteFill>
      </AbsoluteFill>
      {enter === "coin" && p < 1 ? (
        <div
          style={{
            position: "absolute",
            left: (origin[0] / 100) * 1920 - r,
            top: (origin[1] / 100) * 1080 - r,
            width: 2 * r,
            height: 2 * r,
            borderRadius: "50%",
            boxSizing: "border-box",
            border: "26px solid #F6BE2C",
            boxShadow: "0 0 0 8px #D99A12, inset 0 0 0 8px #FFE27A, 0 0 60px rgba(246,190,44,0.6)",
            opacity: interpolate(p, [0.8, 1], [1, 0], clamp),
            zIndex: 91,
          }}
        />
      ) : null}
    </>
  );
};

// Картинка: появление со своим характером, плавание, тень, блик, размытие на скорости
const Sprite: React.FC<{
  src: string;
  x: number;
  y: number;
  size: number;
  at: number;
  until?: number;
  from?: "pop" | "top" | "bottom" | "left" | "right";
  feel?: Feel;
  rot?: number;
  float?: number;
  flip?: boolean;
  dx?: number;
  dy?: number;
  extraScale?: number;
  opacity?: number;
  z?: number;
  shadow?: boolean;
  shine?: boolean;
  glow?: string;
  beat?: boolean;
}> = ({ src, x, y, size, at, until = 9999, from = "pop", feel = "pop", rot = 0, float = 8, flip, dx = 0, dy = 0, extraScale = 1, opacity = 1, z = 1, shadow = true, shine, glow, beat = true }) => {
  const t = useT();
  const pop = usePop();
  if (t < at - 0.02 || t > until + 0.35) return null;
  const e = pop(at, feel);
  const ePrev = pop(at, feel, 1 / 60);
  const off = 1 - e;
  const dist = from === "left" || from === "right" ? 360 : from === "top" ? 420 : from === "bottom" ? 340 : 0;
  const ox = from === "left" ? -dist * off : from === "right" ? dist * off : 0;
  const oy = from === "top" ? -dist * off : from === "bottom" ? dist * off : 24 * off;
  const s0 = from === "pop" ? 0.6 : 0.92;
  const leave = interpolate(t, [until, until + 0.3], [0, 1], clamp);
  const lt = t - at;
  const ph = (x * 7 + y * 3) % 6.28;
  const vel = Math.abs(e - ePrev) * dist;
  const sc = (s0 + (1 - s0) * e) * extraScale * (1 - 0.1 * leave);
  const filters = [
    vel > 4 ? `blur(${Math.min(12, vel * 0.28)}px)` : "",
    shadow ? "drop-shadow(0 26px 24px rgba(20, 0, 40, 0.2))" : "",
    glow ? `drop-shadow(0 0 22px ${glow})` : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        zIndex: z,
        opacity: Math.min(1, lt / 0.12) * (1 - leave) * opacity,
        translate: `${ox + dx}px ${oy + dy + Math.sin(lt * 1.7 + ph) * float - 20 * leave}px`,
        rotate: `${rot + Math.sin(lt * 1.3 + ph) * (float > 0 ? 1.6 : 0)}deg`,
        scale: `${(flip ? -1 : 1) * sc} ${sc}`,
        filter: filters || undefined,
      }}
    >
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%" }} />
      {shine ? <Shine src={src} lt={lt} /> : null}
    </div>
  );
};

// Размытый объект на переднем плане: даёт глубину и параллакс
const Fore: React.FC<{ src: string; x: number; y: number; size: number; blur?: number; drift?: [number, number]; rot?: number }> = ({ src, x, y, size, blur = 10, drift = [-14, -6], rot = 0 }) => {
  const t = useT();
  return (
    <Img
      src={staticFile(src)}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        zIndex: 20,
        filter: `blur(${blur}px)`,
        translate: `${Math.sin(t * 0.5 + y) * drift[0] * 2}px ${Math.cos(t * 0.6 + x) * drift[1] * 3}px`,
        rotate: `${rot + Math.sin(t * 0.7 + y) * 4}deg`,
      }}
    />
  );
};

// Крупный Макс: низ картинки всегда ниже кадра
const BigMax: React.FC<{ src: string; left: number; size: number; at: number; flip?: boolean }> = ({ src, left, size, at, flip }) => {
  const t = useT();
  const pop = usePop();
  const e = pop(at, "pop");
  const lt = t - at;
  // лёгкое сжатие и растяжение при появлении
  const sy = 1 + 0.035 * Math.sin(Math.min(lt / 0.5, 1) * Math.PI);
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
        opacity: Math.min(1, Math.max(0, lt / 0.16)),
        translate: `0px ${70 * (1 - e) + Math.sin(lt * 1.5) * 4}px`,
        scale: `${(flip ? -1 : 1) * (2 - sy)} ${sy}`,
        transformOrigin: "50% 100%",
      }}
    />
  );
};

// Макс в полный рост: ступни у нижнего края, тень под ногами
const FullMax: React.FC<{ src: string; left: number; size: number; at: number; until?: number; flip?: boolean; air?: boolean }> = ({ src, left, size, at, until = 9999, flip, air }) => {
  const t = useT();
  const pop = usePop();
  if (t < at - 0.02 || t > until + 0.3) return null;
  const e = pop(at, "bouncy");
  const lt = t - at;
  const leave = interpolate(t, [until, until + 0.25], [1, 0], clamp);
  const a = Math.min(1, lt / 0.15) * leave;
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: left + size * (air ? 0.36 : 0.3),
          top: 1024,
          width: size * (air ? 0.28 : 0.4),
          height: 30,
          borderRadius: "50%",
          background: "rgba(10, 0, 30, 0.28)",
          filter: "blur(14px)",
          opacity: a * (air ? 0.6 : 1),
          zIndex: 4,
        }}
      />
      <Img
        src={staticFile(`char/${src}.png`)}
        style={{
          position: "absolute",
          left,
          top: 1050 - size * (972 / 1024),
          width: size,
          height: size,
          zIndex: 5,
          opacity: a,
          translate: `0px ${90 * (1 - e) + Math.sin(lt * 1.6) * (air ? 9 : 4)}px`,
          scale: `${flip ? -1 : 1} 1`,
        }}
      />
    </>
  );
};

// Строка «крестик/галочка + подпись»
const Row: React.FC<{ kind: "cross" | "check"; text: string; x: number; y: number; at: number; dark?: boolean }> = ({ kind, text, x, y, at, dark }) => {
  const t = useT();
  const pop = usePop();
  if (t < at - 0.02) return null;
  const e = pop(at, "snappy");
  const b = pop(at, "bouncy");
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        display: "flex",
        alignItems: "center",
        gap: 18,
        opacity: Math.min(1, (t - at) / 0.12),
        translate: `${-60 * (1 - e)}px 0px`,
        zIndex: 6,
      }}
    >
      <Img
        src={staticFile(`el/${kind === "cross" ? "el_33_cross" : "el_34_check"}.png`)}
        style={{ width: 80, height: 80, scale: String(0.4 + 0.6 * b), filter: kind === "check" ? "drop-shadow(0 0 14px rgba(182,240,58,0.8))" : "drop-shadow(0 8px 10px rgba(60,0,0,0.25))" }}
      />
      <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 42, color: dark ? INK : "#FFFFFF", whiteSpace: "nowrap" }}>{text}</span>
    </div>
  );
};

// Поток монет по кривой Безье
const CoinStream: React.FC<{ pts: [number, number][]; from: number; until: number; n?: number; speed?: number; size?: number }> = ({ pts, from, until, n = 9, speed = 0.55, size = 92 }) => {
  const t = useT();
  if (t < from || t > until + 1.5) return null;
  const [p0, p1, p2, p3] = pts;
  const bez = (u: number, i: 0 | 1) =>
    (1 - u) ** 3 * p0[i] + 3 * (1 - u) ** 2 * u * p1[i] + 3 * (1 - u) * u ** 2 * p2[i] + u ** 3 * p3[i];
  return (
    <>
      {Array.from({ length: n }).map((_, k) => {
        const born = from + k / n / speed;
        const age = (t - born) * speed;
        if (age < 0) return null;
        const cyc = Math.floor(age);
        const u = age - cyc;
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
              filter: "blur(1.2px) drop-shadow(0 10px 10px rgba(60,30,0,0.25))",
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
        const near = r > 0.7;
        return (
          <Img
            key={k}
            src={staticFile("el/el_30_coin.png")}
            style={{
              position: "absolute",
              left: x0 + r * (x1 - x0),
              top: -160 + u * 1380,
              width: near ? 170 : 70 + r * 50,
              height: near ? 170 : 70 + r * 50,
              rotate: `${u * 400 + k * 30}deg`,
              filter: near ? "blur(7px)" : "blur(1px)",
              zIndex: near ? 20 : 3,
            }}
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
      style={{ position: "absolute", left: cx - size / 2, top: cy - size / 2, width: size, height: size, scale: String(0.25 + 1.6 * p), opacity: 1 - p, filter: "drop-shadow(0 0 18px rgba(182,240,58,0.9))", zIndex: 7 }}
    />
  );
};

const Label: React.FC<{ text: string; x: number; y: number; at: number; color?: string; bg?: string; size?: number }> = ({ text, x, y, at, color = "#FFFFFF", bg = RED, size = 44 }) => {
  const t = useT();
  const pop = usePop();
  if (t < at - 0.02) return null;
  const e = pop(at, "bouncy");
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
        opacity: Math.min(1, (t - at) / 0.12),
        scale: String(0.6 + 0.4 * e),
        rotate: `${-4 * (1 - e)}deg`,
        boxShadow: "0 16px 36px rgba(0,0,0,0.18)",
        zIndex: 8,
      }}
    >
      {text}
    </div>
  );
};

// Мягкий акцент поверх текущей сцены: сцена чуть затемняется,
// по центру выплывает белая карточка с фразой, рядом плавает предмет.
// Фраз может быть несколько: они сменяют друг друга внутри одной карточки.
const Accent: React.FC<{
  start: number;
  end: number;
  phrases: { at: number; text: string; hi: string; obj: string }[];
}> = ({ start, end, phrases }) => {
  const t = useT();
  if (t < start - 0.02 || t > end + 0.5) return null;
  const inP = interpolate(t, [start, start + 0.45], [0, 1], { ...clamp, easing: smooth });
  const outP = interpolate(t, [end, end + 0.45], [0, 1], { ...clamp, easing: Easing.inOut(Easing.quad) });
  const vis = inP * (1 - outP);
  return (
    <AbsoluteFill style={{ zIndex: 112 }}>
      {/* мягкое затемнение сцены под карточкой (размытие фона рендерер рисует с отражениями) */}
      <AbsoluteFill style={{ background: "radial-gradient(75% 70% at 50% 50%, rgba(20, 12, 40, 0.42), rgba(20, 12, 40, 0.28))", opacity: vis }} />
      {phrases.map((ph, i) => {
        const next = phrases[i + 1]?.at ?? 9999;
        if (t < ph.at - 0.02 || t > next + 0.4) return null;
        const pIn = i === 0 ? inP : interpolate(t, [ph.at, ph.at + 0.4], [0, 1], { ...clamp, easing: smooth });
        const pOut = i === phrases.length - 1 ? outP : interpolate(t, [next, next + 0.3], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
        const a = pIn * (1 - pOut);
        const lt = t - ph.at;
        const [before, after] = ph.text.split(ph.hi);
        return (
          <AbsoluteFill key={i} style={{ alignItems: "center", justifyContent: "center" }}>
            <div
              style={{
                position: "relative",
                padding: "38px 70px 44px",
                borderRadius: 48,
                background: "#FFFFFF",
                boxShadow: "0 40px 90px rgba(20, 0, 40, 0.35)",
                fontFamily: FONT,
                fontWeight: 900,
                fontSize: 120,
                letterSpacing: "-0.025em",
                lineHeight: 1.0,
                color: INK,
                whiteSpace: "nowrap",
                opacity: a,
                translate: `0px ${40 * (1 - pIn) - 24 * pOut + Math.sin(lt * 1.4) * 5}px`,
                scale: String(0.94 + 0.06 * pIn),
              }}
            >
              {before}
              <span style={{ color: RED }}>{ph.hi}</span>
              {after}
              <Img
                src={staticFile(ph.obj)}
                style={{
                  position: "absolute",
                  right: -150,
                  top: -150,
                  width: 260,
                  height: 260,
                  rotate: `${-10 + Math.sin(lt * 1.2) * 6}deg`,
                  translate: `${30 * (1 - pIn)}px ${Math.sin(lt * 1.6 + 1) * 10 - 20 * (1 - pIn)}px`,
                  filter: "drop-shadow(0 24px 24px rgba(20,0,40,0.3))",
                }}
              />
            </div>
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};

// Предмет увеличивается на весь кадр и становится следующей сценой
const ZoomThrough: React.FC<{ src: string; from: number; to: number; x0: number; y0: number; size: number; maxScale: number; rot?: number }> = ({ src, from, to, x0, y0, size, maxScale, rot = 0 }) => {
  const t = useT();
  if (t < from - 0.02 || t > to + 0.4) return null;
  const p = interpolate(t, [from, to], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  const appear = interpolate(t, [from, from + 0.12], [0, 1], clamp);
  const out = interpolate(t, [to + 0.06, to + 0.32], [1, 0], clamp);
  const cx = x0 + (960 - x0) * p;
  const cy = y0 + (540 - y0) * p;
  return (
    <Img
      src={staticFile(src)}
      style={{
        position: "absolute",
        left: cx - size / 2,
        top: cy - size / 2,
        width: size,
        height: size,
        scale: String(Math.pow(maxScale, p)),
        rotate: `${rot * (1 - p)}deg`,
        translate: `0px ${60 * (1 - appear)}px`,
        opacity: appear * out,
        zIndex: 95,
      }}
    />
  );
};

// Шкала цели: заполняется от 0 до 100%
const GoalBar: React.FC<{ from: number; to: number; at: number }> = ({ from, to, at }) => {
  const t = useT();
  const pop = usePop();
  if (t < at - 0.02) return null;
  const e = pop(at, "heavy");
  const p = interpolate(t, [from, to], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const W = 980;
  return (
    <div style={{ position: "absolute", left: 580, top: 860, width: W, zIndex: 8, opacity: Math.min(1, (t - at) / 0.2), translate: `0px ${60 * (1 - e)}px` }}>
      <div style={{ height: 66, borderRadius: 33, background: "rgba(255,255,255,0.95)", boxShadow: "0 16px 40px rgba(0,0,0,0.25), inset 0 0 0 4px rgba(200,200,210,0.9)", overflow: "hidden" }}>
        <div style={{ width: `${Math.max(6, p * 100)}%`, height: "100%", borderRadius: 33, background: `linear-gradient(180deg, #D4FF6E 0%, ${LIME} 55%, #8FD11C 100%)`, boxShadow: "0 0 30px rgba(182,240,58,0.9)" }} />
      </div>
      <Img src={staticFile("el/el_30_coin.png")} style={{ position: "absolute", left: Math.max(6, p * 100) * (W / 100) - 55, top: -22, width: 110, height: 110, rotate: `${p * 720}deg` }} />
      <div style={{ position: "absolute", right: -240, top: 2, fontFamily: FONT, fontWeight: 900, fontSize: 56, color: "#FFFFFF" }}>{Math.round(p * 100)}%</div>
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
              boxShadow: on > 0.5 ? "0 0 24px rgba(182,240,58,0.7)" : undefined,
              scale: String(1 + 0.25 * Math.sin(on * Math.PI)),
            }}
          />
        );
      })}
    </div>
  );
};

// Счётчик баланса внутри «экрана»
const Balance: React.FC<{ x: number; y: number; at: number; from: number; to: number }> = ({ x, y, at, from, to }) => {
  const t = useT();
  const pop = usePop();
  if (t < at - 0.02) return null;
  const e = pop(at, "snappy");
  const v = Math.round(interpolate(t, [from, to], [0, 2450], { ...clamp, easing: Easing.out(Easing.cubic) }));
  const txt = v >= 1000 ? `${Math.floor(v / 1000)} ${String(v % 1000).padStart(3, "0")}` : String(v);
  return (
    <div style={{ position: "absolute", left: x, top: y, opacity: Math.min(1, (t - at) / 0.15), translate: `0px ${40 * (1 - e)}px`, zIndex: 8, fontFamily: FONT, color: INK }}>
      <div style={{ fontWeight: 700, fontSize: 40, opacity: 0.55 }}>Баланс</div>
      <div style={{ fontWeight: 900, fontSize: 150, letterSpacing: "-0.03em", lineHeight: 1.05, whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>{txt} ₽</div>
    </div>
  );
};

// Отрезки, где план закрывает ведущий. Границы стоят на долях музыки.
export const SHOT_RANGES: [number, number][] = [
  [0, 3.0],
  [21.5, 28.0],
  [28.0, 44.0],
  [44.0, 51.0],
  [51.0, 55.0],
  [55.0, 63.5],
  [63.5, 67.5],
  [78.5, 88.0],
  [88.0, 90.5],
  [90.5, 108.0],
  [108.0, 118.0],
  [118.0, 127.0],
  [127.0, 999],
];

export const Shots: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <>
      {/* 1. Крупный Макс с картой */}
      <Shot start={-0.5} end={3.0} bg="bg_red.png" enter="fade" exit="whip">
        {() => (
          <>
            <Head text="Твоя первая карта" x={110} y={90} at={0.0} />
            <Sprite src="el/el_01_card.png" x={110} y={250} size={600} at={-0.3} rot={-8} from="left" feel="snappy" shine />
            <Sprite src="el/el_02_sparkles.png" x={560} y={170} size={260} at={1.0} feel="bouncy" shadow={false} glow="rgba(255,255,255,0.6)" />
            <Sprite src="el/el_41_question.png" x={640} y={560} size={260} at={2.24} rot={10} feel="bouncy" />
            <BigMax src="max_cu_card" left={840} size={1060} at={-0.4} />
            <Fore src="el/el_30_coin.png" x={-110} y={810} size={380} />
            <Fore src="el/el_30_coin.png" x={700} y={-150} size={260} blur={7} drift={[8, 4]} />
          </>
        )}
      </Shot>

      {/* 2. Деньги текут из сейфа в карту и телефон */}
      <Shot start={21.5} end={28.0} bg="bg_light.png" enter="coin" origin={[18, 55]}>
        {() => (
          <>
            <Head text="Деньги лежат в банке" x={110} y={90} at={21.7} color={INK} />
            <Sprite src="el/el_03_safe.png" x={60} y={390} size={500} at={21.55} from="left" feel="heavy" />
            <Sprite src="el/el_32_tube.png" x={520} y={260} size={760} at={21.9} float={0} feel="snappy" />
            <Sprite src="el/el_06_remote.png" x={1260} y={330} size={560} at={24.0} from="right" feel="snappy" />
            <CoinStream pts={[[440, 600], [700, 330], [1000, 760], [1420, 600]]} from={22.3} until={27.4} />
            <Label text="карта и смартфон: пульт" x={1150} y={250} at={25.2} />
            <Fore src="el/el_30_coin.png" x={-130} y={830} size={380} drift={[10, -5]} />
          </>
        )}
      </Shot>

      {/* 3. Сплит-экран: наличка против карты. В конце телефон увеличивается на весь кадр */}
      <Shot start={28.0} end={44.0} bg="bg_light.png" enter="fade">
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
              <Head text="Наличка против карты" x={110} y={90} at={28.3} />
              <Label text="Наличка" x={110} y={260} at={29.36} bg="#FFFFFF" color={INK} size={46} />
              <Label text="Карта" x={1560} y={260} at={30.16} bg={RED} size={46} />
              <Sprite src="el/el_07_cash_crumpled.png" x={120} y={330} size={360} at={28.9} rot={-6} feel="bouncy" />
              <Sprite src="el/el_08_coins_fall.png" x={450} y={360} size={280} at={35.9} from="top" feel="bouncy" />
              <Sprite src="el/el_01_card.png" x={1300} y={330} size={400} at={30.16} rot={6} from="right" feel="snappy" shine />
              <Row kind="cross" text="Мнутся" x={100} y={690} at={34.1} />
              <Row kind="cross" text="Теряются" x={100} y={778} at={34.9} />
              <Row kind="cross" text="Звенят в кармане" x={100} y={866} at={36.62} />
              <Row kind="cross" text="Не оплатить онлайн" x={100} y={954} at={39.56} />
              <Row kind="check" text="Подписки" x={1330} y={690} at={40.62} dark />
              <Row kind="check" text="Маркетплейсы" x={1330} y={778} at={41.76} dark />
              <Row kind="check" text="Игры" x={1330} y={866} at={43.16} dark />
              <BigMax src="max_cu_question" left={700} size={560} at={31.0} />
            </>
          );
        }}
      </Shot>
      <ZoomThrough src="el/el_37_phone_front.png" from={43.42} to={44.0} x0={960} y0={560} size={560} maxScale={9} />

      {/* 4. Внутри экрана телефона: баланс, карта, щит */}
      <Shot start={44.0} end={51.0} bg="bg_light.png" enter="cut" exit="whip">
        {() => (
          <>
            <div style={{ position: "absolute", inset: 36, borderRadius: 80, border: "14px solid rgba(27,27,33,0.06)" }} />
            <Head text="Баланс всегда под рукой" x={130} y={110} at={44.25} until={49.1} color={INK} />
            <Head text="И это безопасно" x={130} y={110} at={49.4} color={INK} />
            <Balance x={140} y={250} at={45.48} from={46.04} to={47.5} />
            <Sprite src="el/el_01_card.png" x={110} y={470} size={500} at={45.6} rot={-4} from="bottom" feel="snappy" shine />
            <Sprite src="el/el_14_shield.png" x={640} y={420} size={400} at={49.6} z={3} feel="bouncy" glow="rgba(182,240,58,0.7)" />
            <Ring cx={840} cy={620} at={49.75} />
            <FullMax src="max_fb_phone_tap" left={1150} size={960} at={44.3} />
          </>
        )}
      </Shot>

      {/* 5. Крупный Макс: купюру потерял, прощай */}
      <Shot start={51.0} end={55.0} bg="bg_light.png" enter="whip" exit="whip" exitDir={-1}>
        {(_, t) => {
          const fly = interpolate(t, [53.6, 54.6], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
          return (
            <>
              <BigMax src="max_cu_shrug" left={-40} size={1060} at={51.1} />
              <Head text="Потерял купюру?" x={1040} y={150} at={51.4} color={INK} />
              <Head text="Прощай" x={1040} y={236} at={53.22} color={RED} />
              <Sprite src="el/el_31_banknote.png" x={1180} y={400} size={420} at={51.8} rot={-8 - 40 * fly} dx={700 * fly} dy={-760 * fly} feel="bouncy" />
            </>
          );
        }}
      </Shot>

      {/* 6. Блокировка в один тап. В конце карта из рук Макса увеличивается на весь кадр */}
      <Shot start={55.0} end={63.5} bg="bg_graphite.png" enter="whip" dir={-1}>
        {(_, t) => {
          const tap = interpolate(t, [56.3, 56.8, 57.0, 57.4], [-420, 0, -14, 0], clamp);
          const locked = interpolate(t, [59.3, 59.55], [0, 1], clamp);
          const shake = t > 59.3 && t < 59.9 ? Math.sin((t - 59.3) * 60) * 10 * (1 - (t - 59.3) / 0.6) : 0;
          return (
            <>
              <div style={{ position: "absolute", left: 180, top: 40, width: 1000, height: 1000, translate: `${shake}px 0px`, filter: "drop-shadow(0 40px 50px rgba(0,0,0,0.45))" }}>
                <Img src={staticFile("el/el_37_phone_front.png")} style={{ position: "absolute", width: 1000, height: 1000, opacity: 1 - locked }} />
                <Img src={staticFile("el/el_36_phone_lock.png")} style={{ position: "absolute", width: 1000, height: 1000, opacity: locked }} />
              </div>
              {t > 56.1 && t < 58.6 ? (
                <Img src={staticFile("el/el_35_finger.png")} style={{ position: "absolute", left: 560, top: 300 + tap, width: 420, height: 420, zIndex: 6, opacity: interpolate(t, [56.1, 56.3, 58.2, 58.6], [0, 1, 1, 0], clamp), filter: "drop-shadow(0 20px 20px rgba(0,0,0,0.35))" }} />
              ) : null}
              <Ring cx={680} cy={560} at={56.85} size={420} />
              <Ring cx={680} cy={520} at={59.45} />
              <Ring cx={680} cy={520} at={61.0} />
              <Head text="Потерял карту?" x={1040} y={150} at={55.24} until={60.7} />
              <Head text="Блок в один тап" x={1040} y={236} at={56.8} until={60.7} color={LIME} />
              <Head text="Деньги целы на счёте" x={1000} y={80} at={61.0} size={56} />
              <FullMax src="max_fb_shield_card" left={1130} size={940} at={61.0} />
            </>
          );
        }}
      </Shot>
      <ZoomThrough src="el/el_01_card.png" from={62.95} to={63.5} x0={1600} y0={575} size={330} maxScale={13} rot={-4} />

      {/* 7. Три крутых плюса: Макс прыгает, цифры падают */}
      <Shot start={63.5} end={67.5} bg="bg_red.png" enter="cut" exit="whip">
        {(_, t) => (
          <>
            <Head text="Три крутых плюса" x={110} y={90} at={64.6} />
            {[66.08, 66.32, 66.68].map((at, i) => {
              const p = t < at ? 0 : spring({ frame: Math.round((t - at) * fps), fps, config: FEEL.bouncy });
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
                    translate: `0px ${-640 * (1 - p)}px`,
                    rotate: `${(i - 1) * 6 * p}deg`,
                    boxShadow: "0 24px 50px rgba(80,0,0,0.3)",
                    zIndex: 6,
                  }}
                >
                  {i + 1}
                </div>
              );
            })}
            <FullMax src="max_fb_jump" left={1060} size={960} at={63.6} air />
            <Fore src="el/el_02_sparkles.png" x={-120} y={760} size={420} blur={8} drift={[6, -4]} />
          </>
        )}
      </Shot>

      {/* 8. Кэшбэк: покупки в корзину, монеты обратно на карту */}
      <Shot start={78.5} end={88.0} bg="bg_lime.png" enter="coin" origin={[30, 60]} exit="whip">
        {(_, t) => {
          const intoCart = interpolate(t, [82.9, 83.7], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
          return (
            <>
              <Head text="Плюс 2: кэшбэк" x={110} y={90} at={80.75} color={INK} />
              <Sprite src="el/el_38_cart.png" x={250} y={430} size={560} at={78.8} from="left" feel="heavy" />
              {t < 83.8 ? (
                <Sprite src="el/el_17_snacks.png" x={120} y={60} size={820} at={80.3} dy={330 * intoCart} extraScale={1 - 0.6 * intoCart} opacity={1 - intoCart} feel="bouncy" />
              ) : null}
              <Sprite src="el/el_01_card.png" x={1220} y={250} size={520} at={84.3} rot={6} from="right" feel="snappy" shine />
              <CoinStream pts={[[560, 640], [760, 260], [1100, 200], [1460, 470]]} from={84.46} until={87.4} n={8} speed={0.7} />
              <Label text="часть денег обратно" x={1150} y={760} at={84.8} />
            </>
          );
        }}
      </Shot>

      {/* 9. Крупный Макс: вау, бонус */}
      <Shot start={88.0} end={90.5} bg="bg_violet.png" enter="whip" exit="whip" exitDir={-1}>
        {() => (
          <>
            <CoinRain from={88.05} x0={40} x1={760} />
            <Head text={"Бонус\nза обычные траты"} x={110} y={380} at={88.15} size={60} z={25} />
            <BigMax src="max_cu_wow" left={760} size={1060} at={88.05} />
          </>
        )}
      </Shot>

      {/* 10. Цели: Макс на копилке, ПК и кроссовки на подиумах, шкала до 100% */}
      <Shot start={90.5} end={108.0} bg="bg_violet.png" enter="whip" dir={-1}>
        {(_, t) => {
          const done = t > 107.0;
          return (
            <>
              <Head text="Плюс 3: цели и автокопилки" x={110} y={84} at={90.9} until={100.5} size={58} />
              <Head text="Копится само, понемногу" x={110} y={84} at={100.84} size={58} />
              <FullMax src="max_fb_sit_piggy" left={-60} size={900} at={90.9} />
              <Sprite src="el/el_39_podium.png" x={760} y={520} size={420} at={93.2} float={0} from="bottom" feel="heavy" beat={false} />
              <Sprite src="el/el_39_podium.png" x={1260} y={520} size={420} at={93.5} float={0} from="bottom" feel="heavy" beat={false} />
              <Sprite src="el/el_18_pc.png" x={790} y={230} size={380} at={94.54} from="top" float={5} feel="bouncy" glow="rgba(160,110,255,0.6)" />
              <Sprite src="el/el_19_sneakers.png" x={1290} y={300} size={380} at={95.42} from="top" float={5} feel="bouncy" />
              <GoalBar at={96.9} from={100.84} to={107.0} />
              {done ? <Sprite src="el/el_34_check.png" x={1390} y={220} size={170} at={107.0} feel="bouncy" glow="rgba(182,240,58,0.9)" /> : null}
              {done ? <Sprite src="el/el_29_confetti.png" x={540} y={-40} size={1100} at={107.05} from="top" float={0} shadow={false} beat={false} /> : null}
            </>
          );
        }}
      </Shot>

      {/* 11. Безопасность: ПИН, СМС, CVV закрываются замками */}
      <Shot start={108.0} end={118.0} bg="bg_graphite.png" enter="circle" origin={[50, 50]} exit="whip">
        {() => (
          <>
            <Head text="Правило безопасности" x={110} y={90} at={108.2} />
            <Sprite src="el/el_23_pin_pad.png" x={110} y={320} size={440} at={110.88} feel="snappy" />
            <PinDots x={170} y={250} at={110.95} />
            <Sprite src="el/el_24_sms.png" x={700} y={300} size={420} at={111.58} feel="bouncy" />
            <Sprite src="el/el_22_card_back.png" x={1250} y={300} size={520} at={112.82} from="right" feel="snappy" shine />
            <Sprite src="el/el_13_lock.png" x={1000} y={540} size={180} at={112.3} feel="heavy" z={3} />
            <Sprite src="el/el_13_lock.png" x={1600} y={560} size={190} at={114.6} feel="heavy" z={3} />
            <Label text="ПИН-код" x={200} y={790} at={110.95} bg="#FFFFFF" color={INK} />
            <Label text="код из СМС" x={760} y={790} at={111.7} bg="#FFFFFF" color={INK} />
            <Label text="CVV-код" x={1380} y={790} at={114.42} bg="#FFFFFF" color={INK} />
          </>
        )}
      </Shot>

      {/* 12. Крупный Макс «тсс» и крючок с приманкой */}
      <Shot start={118.0} end={127.0} bg="bg_red.png" enter="whip">
        {(_, t) => {
          const drop = interpolate(t, [121.96, 122.6], [-760, 0], { ...clamp, easing: Easing.out(Easing.back(1.4)) });
          return (
            <>
              <Head text="Никому не сообщай" x={110} y={90} at={120.2} />
              <BigMax src="max_cu_shh" left={860} size={1060} at={118.05} />
              {t > 121.9 ? (
                <Img src={staticFile("el/el_25_hook.png")} style={{ position: "absolute", left: 170, top: 210 + drop, width: 600, height: 600, rotate: `${Math.sin((t - 122) * 2.2) * 5}deg`, transformOrigin: "50% 0%", zIndex: 4, filter: "drop-shadow(0 24px 22px rgba(60,0,0,0.3))" }} />
              ) : null}
              <Sprite src="el/el_33_cross.png" x={330} y={420} size={300} at={124.1} z={6} feel="bouncy" />
              <Label text="лёгкие деньги = ловушка" x={110} y={880} at={124.3} bg="#FFFFFF" color={INK} />
            </>
          );
        }}
      </Shot>

      {/* 13. Финал: Макс в полный рост машет, книги, кубок, конфетти */}
      <Shot start={127.0} end={OUTRO_AT} bg="bg_lime.png" enter="coin" origin={[70, 50]}>
        {() => (
          <>
            <Head text="Основа финансовой грамотности" x={110} y={90} at={127.3} until={131.7} color={INK} size={58} />
            <Head text="Пользуйся с умом" x={110} y={90} at={132.02} color={INK} />
            <Sprite src="el/el_27_skill.png" x={120} y={330} size={480} at={128.96} from="bottom" feel="heavy" />
            <Sprite src="el/el_28_trophy.png" x={600} y={290} size={450} at={132.02} feel="bouncy" glow="rgba(255,210,80,0.6)" />
            <Sprite src="el/el_29_confetti.png" x={20} y={-60} size={1150} at={132.1} from="top" float={0} shadow={false} beat={false} />
            <FullMax src="max_fb_wave" left={1120} size={980} at={127.1} />
          </>
        )}
      </Shot>

      {/* 14. Финальная плашка: логотипы и призыв подписаться */}
      <Shot start={OUTRO_AT} end={999} bg="bg_red.png" enter="coin" origin={[50, 50]}>
        {(lt) => (
          <>
            <div
              style={{
                position: "absolute",
                left: 130,
                top: 150,
                height: 96,
                display: "flex",
                alignItems: "center",
                gap: 30,
                opacity: interpolate(lt, [1.5, 1.9], [0, 1], clamp),
                translate: `0px ${interpolate(lt, [1.5, 1.9], [-14, 0], { ...clamp, easing: smooth })}px`,
              }}
            >
              <Img src={staticFile("logo_siv_white.png")} style={{ height: 72 }} />
              <Img src={staticFile("logo_alfa_white.png")} style={{ height: 94 }} />
            </div>
            <Head text={"Подписывайся\nна канал"} x={120} y={340} at={OUTRO_AT + 0.5} size={132} />
            <Sprite src="el/el_01_card.png" x={-40} y={720} size={460} at={OUTRO_AT + 0.4} rot={-14} from="left" feel="snappy" shine />
            <Sprite src="el/el_08_coins_fall.png" x={470} y={760} size={300} at={OUTRO_AT + 0.7} rot={8} feel="bouncy" />
            <Sprite src="el/el_02_sparkles.png" x={900} y={150} size={240} at={OUTRO_AT + 1.0} feel="bouncy" shadow={false} glow="rgba(255,255,255,0.6)" />
            <FullMax src="max_fb_jump" left={1080} size={960} at={OUTRO_AT + 0.5} air />
          </>
        )}
      </Shot>

      {/* Крупные слова на весь кадр */}
      {/* Мягкие акценты на ключевых словах */}
      <Accent
        start={17.75}
        end={20.6}
        phrases={[
          { at: 17.75, text: "Карта не деньги", hi: "не деньги", obj: "el/el_31_banknote.png" },
          { at: 19.2, text: "Карта = ключ к счёту", hi: "ключ", obj: "el/el_04_key.png" },
        ]}
      />
      <Accent start={79.3} end={80.6} phrases={[{ at: 79.3, text: "Кэшбэк", hi: "Кэшбэк", obj: "el/el_30_coin.png" }]} />
      <Accent start={118.6} end={120.0} phrases={[{ at: 118.6, text: "Никому не говори", hi: "Никому", obj: "el/el_13_lock.png" }]} />
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
