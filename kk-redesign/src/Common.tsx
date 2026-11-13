import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { layout, STRIP_H, type Variant } from "./Strip";
import { anim, C, IN, INOUT, OUT, STYRENE, blp } from "./theme";

// Живой, но тихий фон: чёрный, два медленных красных свечения и виньетка
export const Background: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / 60;
  const ax = 22 + Math.sin(t * 0.13) * 8;
  const ay = 18 + Math.cos(t * 0.11) * 6;
  const bx = 82 + Math.cos(t * 0.09) * 7;
  const by = 88 + Math.sin(t * 0.12) * 6;
  return (
    <AbsoluteFill style={{ backgroundColor: C.black }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(42% 52% at ${ax}% ${ay}%, rgba(239,49,36,0.15), rgba(239,49,36,0) 70%),
            radial-gradient(46% 56% at ${bx}% ${by}%, rgba(239,49,36,0.10), rgba(239,49,36,0) 70%)`,
        }}
      />
      <AbsoluteFill
        style={{ background: "radial-gradient(120% 90% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.6) 100%)" }}
      />
    </AbsoluteFill>
  );
};

// Вход и выход сцены (кроссфейд с соседней)
export const SceneShell: React.FC<{ children: React.ReactNode; fade?: number }> = ({ children, fade = 18 }) => {
  const f = useCurrentFrame();
  const { durationInFrames: d } = useVideoConfig();
  const i = anim(f, 0, fade, 0, 1, INOUT);
  const o = anim(f, d - fade, d, 1, 0, INOUT);
  return <AbsoluteFill style={{ opacity: Math.min(i, o) }}>{children}</AbsoluteFill>;
};

const gpu = (x: number, y: number, s = 1): React.CSSProperties => ({
  transform: `translate(${x}px, ${y}px) scale(${s})`,
});

// Дорогое появление: прозрачность + сдвиг + размытие
export const Reveal: React.FC<{
  at: number;
  dur?: number;
  dy?: number;
  blur?: number;
  out?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ at, dur = 44, dy = 30, blur = 12, out, style, children }) => {
  const f = useCurrentFrame();
  const p = anim(f, at, at + dur, 0, 1);
  const q = out === undefined ? 0 : anim(f, out, out + 24, 0, 1, IN);
  return (
    <div
      style={{
        opacity: p * (1 - q),
        filter: `${blp((1 - p) * blur + q * 8)}`,
        ...gpu(0, (1 - p) * dy - q * dy * 0.5),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Сгенерированный элемент из public/els
export const El: React.FC<{ name: string; size: number; style?: React.CSSProperties }> = ({ name, size, style }) => (
  <Img src={staticFile(`els/${name}.png`)} style={{ width: size, height: size, objectFit: "contain", ...style }} />
);

// Ширина текста (для точной раскладки заголовков)
let ctx: CanvasRenderingContext2D | null = null;
export const textW = (text: string, size: number, weight = 700, family = STYRENE) => {
  if (!ctx) ctx = document.createElement("canvas").getContext("2d");
  ctx!.font = `${weight} ${size}px ${family}`;
  return ctx!.measureText(text).width;
};

// Глава: иконка и заголовок. Сначала крупно по центру, затем уезжают в левый верхний угол.
export const Chapter: React.FC<{
  icons: string[];
  title: string;
  sub?: { text: string; at: number }[];
  at: number; // появление
  settle?: number; // переезд в шапку (если нет, сразу шапка)
}> = ({ icons, title, sub = [], at, settle }) => {
  const f = useCurrentFrame();
  const ICON = 200;
  const GAP = 44;
  const T = 104;
  const iconsW = icons.length * ICON + (icons.length - 1) * 18;
  const gw = iconsW + GAP + textW(title, T, 700);
  const m = settle === undefined ? 1 : anim(f, settle, settle + 46, 0, 1, INOUT);
  const HEAD = 0.46;
  const left = (1920 - gw) / 2 + ((120 - (1920 - gw) / 2) * m);
  const top = 390 + (64 - 390) * m;
  const sc = 1 + (HEAD - 1) * m;
  const pIcon = anim(f, at, at + 50, 0, 1);
  const pTitle = anim(f, at + 8, at + 56, 0, 1);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        transformOrigin: "0 0",
        transform: `translate(${left}px, ${top}px) scale(${sc})`,
        display: "flex",
        alignItems: "center",
        gap: GAP,
      }}
    >
      <div style={{ display: "flex", gap: 18 }}>
        {icons.map((n, i) => {
          const p = anim(f, at + i * 6, at + i * 6 + 50, 0, 1);
          return (
            <div
              key={n}
              style={{
                opacity: p,
                transform: `translate(0, ${(1 - p) * 40}px) scale(${0.86 + 0.14 * p})`,
                filter: `${blp((1 - p) * 10)} drop-shadow(0 24px 40px rgba(0,0,0,0.5))`,
              }}
            >
              <El name={n} size={ICON} />
            </div>
          );
        })}
      </div>
      <div style={{ position: "relative" }}>
        <div
          style={{
            fontFamily: STYRENE,
            fontWeight: 700,
            fontSize: T,
            letterSpacing: -2.5,
            lineHeight: 1,
            color: C.white,
            whiteSpace: "nowrap",
            opacity: pTitle * (0.999 + 0 * pIcon),
            filter: `${blp((1 - pTitle) * 12)}`,
            transform: `translate(${(1 - pTitle) * 30}px, 0)`,
          }}
        >
          {title}
        </div>
        {sub.map((s, i) => {
          const next = sub[i + 1]?.at;
          const p = anim(f, s.at, s.at + 36, 0, 1);
          const q = next === undefined ? 0 : anim(f, next - 6, next + 16, 0, 1, IN);
          return (
            <div
              key={s.text}
              style={{
                position: "absolute",
                left: 0,
                top: T * 1.12,
                fontFamily: STYRENE,
                fontWeight: 500,
                fontSize: 64,
                color: C.red,
                whiteSpace: "nowrap",
                opacity: p * (1 - q),
                filter: `${blp((1 - p) * 10 + q * 8)}`,
                transform: `translate(0, ${(1 - p) * 20 - q * 14}px)`,
              }}
            >
              {s.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Подсказка «слева / справа» над полосой
export const SideHint: React.FC<{ text: string; at: number; out?: number; x: number; align: "left" | "right" }> = ({
  text,
  at,
  out,
  x,
  align,
}) => (
  <div style={{ position: "absolute", top: 352, ...(align === "left" ? { left: x } : { right: 1920 - x }) }}>
    <Reveal at={at} out={out} dy={16}>
      <div style={{ fontFamily: STYRENE, fontSize: 34, fontWeight: 400, color: "rgba(255,255,255,0.62)" }}>{text}</div>
    </Reveal>
  </div>
);

// Фокус по элементам полосы в такт голосу: красная рамка + подпись снизу
export type Step = { id: string; at: number; label: string };

export const Walk: React.FC<{
  v: Variant;
  steps: Step[];
  end: number;
  stripX: number;
  stripY: number;
  scale?: number;
  width?: number;
  extraRight?: number;
  labelY?: number;
}> = ({ v, steps, end, stripX, stripY, scale = 1, width, extraRight = 0, labelY }) => {
  const f = useCurrentFrame();
  const L = layout(v, extraRight, width);
  const LEAD = 6; // рамка приходит чуть раньше слова
  let idx = -1;
  steps.forEach((s, i) => {
    if (f >= s.at - LEAD) idx = i;
  });
  const first = steps[0].at - LEAD;
  const vis = anim(f, first - 10, first + 8, 0, 1) * (1 - anim(f, end, end + 18, 0, 1, IN));
  const i0 = Math.max(idx, 0);
  const cur = L[steps[i0].id];
  const prev = i0 > 0 ? L[steps[i0 - 1].id] : cur;
  const p = anim(f, steps[i0].at - LEAD, steps[i0].at - LEAD + 20, 0, 1, OUT);
  const x = prev.x + (cur.x - prev.x) * p;
  const w = prev.w + (cur.w - prev.w) * p;
  const PADX = 10;
  const ly = labelY ?? stripY + (STRIP_H + 64) * scale;
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: (w + PADX * 2) * scale,
          height: (STRIP_H - 24) * scale,
          transform: `translate(${stripX + (x - PADX) * scale}px, ${stripY + 12 * scale}px)`,
          borderRadius: 14 * scale,
          border: `${2.5 * scale}px solid ${C.red}`,
          background: "rgba(239,49,36,0.06)",
          boxShadow: `0 0 0 ${6 * scale}px rgba(239,49,36,0.12), 0 0 ${26 * scale}px rgba(239,49,36,0.35)`,
          opacity: vis,
        }}
      />
      {steps.map((s, i) => {
        const b = L[s.id];
        // Подписи сменяются по очереди: старая уходит за 8 кадров,
        // новая появляется только после неё, поэтому они не накладываются
        const OUTF = 8;
        const tOut = i < steps.length - 1 ? steps[i + 1].at - LEAD - OUTF : end;
        const tIn = s.at - LEAD;
        const pin = anim(f, tIn, tIn + 20, 0, 1);
        const pout = anim(f, tOut, tOut + OUTF, 0, 1, IN);
        const op = pin * (1 - pout);
        if (op <= 0.001) return null;
        const cx = Math.min(1500, Math.max(420, stripX + (b.x + b.w / 2) * scale));
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 0,
              top: ly,
              width: 1920,
              display: "flex",
              justifyContent: "center",
              transform: `translate(${cx - 960}px, ${(1 - pin) * 26 - pout * 16}px)`,
              opacity: op,
              filter: `${blp((1 - pin) * 10 + pout * 6)}`,
              fontFamily: STYRENE,
              fontWeight: 500,
              fontSize: 64,
              letterSpacing: -1,
              color: C.white,
              whiteSpace: "nowrap",
            }}
          >
            {s.label}
          </div>
        );
      })}
    </>
  );
};

export { OUT };
