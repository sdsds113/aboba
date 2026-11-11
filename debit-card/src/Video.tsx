import { Audio } from "@remotion/media";
import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  continueRender,
  delayRender,
  Easing,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  Bg,
  DURATION_S,
  El,
  ELEMENTS,
  EXTRA_SFX,
  INTRO_S,
  LEAD_IN,
  SCENES,
  TITLES,
  VO_END,
} from "./timeline";
import { CAPTIONS } from "./captions";
import { FEEL, Feel, Head, Shine, SHOT_RANGES, Shots, ShotsAudio } from "./Shots";
import { beatPulse } from "./beats";

const RED = "#EF3124";
const INK = "#1B1B21";
const FONT = "Styrene, Arial, sans-serif";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const smooth = Easing.bezier(0.16, 1, 0.3, 1);

// Время озвучки (с) для текущего кадра
const useT = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps - LEAD_IN;
};

const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 9973;
  return h / 9973;
};

const bgAt = (t: number): Bg => {
  const s = SCENES.find((sc) => t >= sc.start && t < sc.end);
  return (s ?? SCENES[t < 0 ? 0 : SCENES.length - 1]).bg;
};

// Подгружаем Styrene ALC до первого кадра
const useFonts = () => {
  const [handle] = useState(() => delayRender("Styrene"));
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const faces = [
      ["StyreneALC-Medium.otf", "500"],
      ["StyreneALC-Bold.otf", "700"],
      ["StyreneALC-Black.otf", "900"],
    ].map(([file, weight]) => new FontFace("Styrene", `url(${staticFile(`fonts/${file}`)})`, { weight }));
    Promise.all(faces.map((f) => f.load()))
      .then((loaded) => {
        loaded.forEach((f) => document.fonts.add(f));
        setReady(true);
        continueRender(handle);
      })
      .catch((e) => {
        console.error(e);
        setReady(true);
        continueRender(handle);
      });
  }, [handle]);
  return ready;
};

// Склеиваем подряд идущие сцены с одинаковым значением ключа
const runs = <K extends "bg" | "max">(key: K) => {
  const out: { value: string; start: number; end: number }[] = [];
  for (const s of SCENES) {
    const last = out[out.length - 1];
    if (last && last.value === s[key]) last.end = s.end;
    else out.push({ value: s[key], start: s.start, end: s.end });
  }
  return out;
};
const BG_RUNS = runs("bg");
const MAX_RUNS = runs("max");

const Background: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      {BG_RUNS.map((r, i) => {
        const fadeIn = i === 0 ? 1 : interpolate(t, [r.start - 0.05, r.start + 0.3], [0, 1], { ...clamp, easing: smooth });
        if ((i > 0 && t < r.start - 0.1) || t > r.end + 0.5) return null;
        const local = Math.max(t, -LEAD_IN) - r.start + LEAD_IN;
        return (
          <AbsoluteFill key={i} style={{ opacity: fadeIn }}>
            <Img
              src={staticFile(`bg_${r.value}.png`)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                scale: String(1.06 - Math.min(local, 20) * 0.0015),
                translate: `${Math.sin(local / 6) * 10}px ${Math.cos(local / 7) * 6}px`,
              }}
            />
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};

// Характер движения по типу предмета
const HEAVY = ["el_03_safe", "el_13_lock", "el_18_pc", "el_20_jar", "el_27_skill"];
const BOUNCY = ["el_02_sparkles", "el_05_piggy", "el_08_coins_fall", "el_07_cash_crumpled", "el_14_shield", "el_28_trophy", "el_15_cards_fan"];
const feelOf = (el: El): Feel =>
  el.text !== undefined ? "bouncy" : HEAVY.includes(el.src ?? "") ? "heavy" : BOUNCY.includes(el.src ?? "") ? "bouncy" : "snappy";

const Element: React.FC<{ el: El; index: number }> = ({ el, index }) => {
  const { fps } = useVideoConfig();
  const t = useT();
  if (t < el.in - 0.05 || t > el.out + 0.6) return null;

  const local = t - el.in;
  const enter = spring({
    frame: Math.round(local * fps),
    fps,
    config: FEEL[feelOf(el)],
  });
  const exitP = interpolate(t, [el.out, el.out + (el.exit === "flyUp" ? 0.55 : 0.3)], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.4, 0, 0.7, 0.2),
  });

  const from = el.from ?? "pop";
  const off = 1 - enter;
  const dx = from === "left" ? -260 * off : from === "right" ? 260 * off : 0;
  const dy = from === "bottom" ? 220 * off : from === "top" ? -260 * off : 30 * off;
  const startScale = from === "pop" ? 0.82 : 0.94;

  const phase = hash(el.id) * Math.PI * 2;
  const floatY = Math.sin(local * ((2 * Math.PI) / 3.6) + phase) * 9;
  const floatR = Math.sin(local * ((2 * Math.PI) / 4.4) + phase) * 1.8;

  const flyX = el.exit === "flyUp" ? -420 * exitP : 0;
  const flyY = el.exit === "flyUp" ? -520 * exitP : 0;
  const flyR = el.exit === "flyUp" ? -35 * exitP : 0;

  const scale = (startScale + (1 - startScale) * enter) * (1 - 0.08 * exitP) * (1 + 0.016 * beatPulse(t));
  const opacity = Math.min(1, local / 0.18) * (1 - exitP);

  const style: React.CSSProperties = {
    position: "absolute",
    left: el.x,
    top: el.y,
    translate: `${dx + flyX}px ${dy + floatY + flyY}px`,
    rotate: `${(el.rot ?? 0) + floatR + flyR}deg`,
    scale: String(scale),
    opacity,
    zIndex: 10 + index,
  };

  if (el.text !== undefined) {
    const isNumber = el.text.length <= 2;
    const onRed = bgAt(el.in) !== "light";
    return (
      <div
        style={{
          ...style,
          width: isNumber ? 190 : undefined,
          height: isNumber ? 190 : undefined,
          padding: isNumber ? 0 : "18px 28px",
          borderRadius: isNumber ? 95 : 999,
          background: onRed ? "#FFFFFF" : RED,
          color: onRed ? (isNumber ? RED : INK) : "#FFFFFF",
          fontFamily: FONT,
          fontWeight: isNumber ? 900 : 700,
          fontSize: isNumber ? 116 : 34,
          lineHeight: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          whiteSpace: "nowrap",
          boxShadow: "0 18px 40px rgba(40, 0, 0, 0.18)",
        }}
      >
        {el.text}
      </div>
    );
  }

  const src = `el/${el.src}.png`;
  return (
    <div
      style={{
        ...style,
        width: el.size,
        height: el.size,
        filter: `${el.dim ? "grayscale(0.75) brightness(1.08) " : ""}drop-shadow(0 26px 24px rgba(20, 0, 40, 0.2))`,
      }}
    >
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%" }} />
      {el.src === "el_01_card" && !el.dim ? <Shine src={src} lt={local} /> : null}
    </div>
  );
};

const Max: React.FC = () => {
  const t = useT();
  return (
    <>
      {MAX_RUNS.map((r, i) => {
        if (t < r.start - 0.1 || t > r.end + 0.3) return null;
        const local = t - r.start;
        const fadeIn = i === 0 ? interpolate(t, [0, 0.35], [0, 1], clamp) : interpolate(local, [0, 0.14], [0, 1], clamp);
        const fadeOut = interpolate(t, [r.end, r.end + 0.14], [1, 0], clamp);
        const hop = interpolate(local, [0, 0.12, 0.34], [0, -14, 0], { ...clamp, easing: Easing.inOut(Easing.quad) });
        const breathe = Math.sin(local * ((2 * Math.PI) / 4)) * 3;
        return (
          <Img
            key={i}
            src={staticFile(`char/${r.value}.png`)}
            style={{
              position: "absolute",
              left: 1035,
              // низ картинки на 40 px ниже кадра: при подпрыге и «дыхании» срез не виден
              top: 236,
              width: 884,
              height: 884,
              opacity: fadeIn * fadeOut,
              translate: `0px ${hop + breathe}px`,
              zIndex: 5,
            }}
          />
        );
      })}
    </>
  );
};

// Заголовки ведущего плана: кинетический текст. Под отдельными планами не показываются,
// у планов свои заголовки.
const uncoveredFrom = (t: number) => {
  let x = t;
  for (;;) {
    const r = SHOT_RANGES.find(([a, b]) => x >= a - 0.01 && x < b);
    if (!r) return x;
    x = r[1];
  }
};
const nextCover = (t: number) => Math.min(...SHOT_RANGES.filter(([a]) => a > t).map(([a]) => a), 9999);

const Titles: React.FC = () => (
  <>
    {TITLES.map((ti, i) => {
      const start = uncoveredFrom(ti.t);
      const end = Math.min(TITLES[i + 1]?.t ?? DURATION_S, nextCover(start));
      if (end - start < 0.8) return null;
      return (
        <Head
          key={i}
          text={ti.text}
          x={100}
          y={90}
          at={start + 0.12}
          until={end - 0.3}
          color={bgAt(start) === "light" ? INK : "#FFFFFF"}
          z={100}
        />
      );
    })}
  </>
);

// Субтитры как в первой версии: тёмная плашка, текущее слово лаймовое,
// сказанные белые, следующие приглушены. Стоят справа под Максом, в одну строку.
const LIME = "#B6F03A";
const Subtitles: React.FC = () => {
  const t = useT();
  return (
    <>
      {CAPTIONS.map((c, i) => {
        const start = c[0].s - 0.08;
        const nextStart = CAPTIONS[i + 1]?.[0].s ?? Infinity;
        // фраза уходит раньше, чем появится следующая, без наложений
        const end = Math.min(c[c.length - 1].e + 0.35, nextStart - 0.2);
        if (t < start - 0.02 || t > end + 0.15) return null;
        const appear = interpolate(t, [start, start + 0.16], [0, 1], { ...clamp, easing: smooth });
        const leave = interpolate(t, [end, end + 0.12], [0, 1], clamp);
        return (
          // зона под Максом: плашка центрируется в ней и не упирается в край кадра
          <div
            key={i}
            style={{
              position: "absolute",
              left: 1000,
              width: 900,
              bottom: 50,
              display: "flex",
              justifyContent: "center",
              zIndex: 150,
            }}
          >
            <div
              style={{
                translate: `0px ${14 * (1 - appear)}px`,
                scale: String(0.97 + 0.03 * appear),
                opacity: appear * (1 - leave),
                padding: "14px 28px 16px",
                borderRadius: 24,
                background: "rgba(24, 22, 30, 0.80)",
                boxShadow: "0 14px 34px rgba(0, 0, 0, 0.22)",
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: 37,
                lineHeight: 1.1,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {c.map((w, j) => {
                const active = t >= w.s - 0.04 && t < (c[j + 1]?.s ?? w.e + 0.3) - 0.04;
                const spoken = t >= w.s - 0.04;
                return (
                  <span
                    key={j}
                    style={{
                      color: active ? LIME : "#FFFFFF",
                      opacity: spoken ? 1 : 0.42,
                      marginRight: j < c.length - 1 ? "0.26em" : 0,
                    }}
                  >
                    {w.t}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

// Заставка: красный фон из ролика, по краям плавают 3D-элементы, слева название,
// справа Макс машет рукой. Потом всё мягко уходит, и начинается первая сцена.
// Справа сверху белые логотипы СиВ и Альфа-Банка.
const LOGO_SIV: string | null = "logo_siv_white.png"; // белый логотип СиВ
const INTRO_ITEMS: { src: string; x: number; y: number; size: number; at: number; rot: number }[] = [
  { src: "el_01_card", x: -40, y: 700, size: 460, at: 0.0, rot: -14 },
  { src: "el_08_coins_fall", x: 440, y: 780, size: 300, at: 0.5, rot: 8 },
  { src: "el_02_sparkles", x: 860, y: 150, size: 240, at: 1.5, rot: 0 },
  { src: "el_05_piggy", x: 790, y: 640, size: 300, at: 1.0, rot: -8 },
];
const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  if (t > INTRO_S + 0.6) return null;
  const out = interpolate(t, [INTRO_S - 0.3, INTRO_S + 0.25], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  const titleLines = ["Твоя первая", "карта"];
  return (
    <AbsoluteFill style={{ zIndex: 120 }}>
      {INTRO_ITEMS.map((it, i) => {
        const local = t - it.at;
        const enter = spring({ frame: Math.round(local * fps), fps, config: FEEL.bouncy });
        const fl = Math.sin(local * 1.7 + i) * 9;
        return (
          <Img
            key={it.src}
            src={staticFile(`el/${it.src}.png`)}
            style={{
              position: "absolute",
              left: it.x,
              top: it.y,
              width: it.size,
              height: it.size,
              opacity: Math.min(1, Math.max(0, local / 0.2)) * (1 - out),
              scale: String((0.6 + 0.4 * enter) * (1 - 0.15 * out) * (1 + 0.02 * beatPulse(t - LEAD_IN))),
              filter: "drop-shadow(0 26px 24px rgba(60, 0, 0, 0.25))",
              translate: `0px ${fl + 40 * (1 - enter) - 60 * out}px`,
              rotate: `${it.rot + Math.sin(local * 1.3 + i) * 2}deg`,
            }}
          />
        );
      })}

      <div
        style={{
          position: "absolute",
          left: 120,
          top: 330,
          width: 900,
          // название по центру свободной части кадра, слева от Макса
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 132,
          lineHeight: 1.0,
          letterSpacing: "-0.02em",
          color: "#FFFFFF",
          textShadow: "0 18px 50px rgba(90, 0, 0, 0.35)",
          opacity: 1 - out,
          translate: `0px ${-30 * out}px`,
        }}
      >
        {titleLines.map((line, li) => {
          const p = interpolate(t, [0.5 + li * 0.5, 1.0 + li * 0.5], [0, 1], { ...clamp, easing: smooth });
          return (
            <div key={li} style={{ opacity: p, translate: `0px ${50 * (1 - p)}px`, scale: String(0.94 + 0.06 * p) }}>
              {line}
            </div>
          );
        })}
      </div>

      {/* логотипы: белые, справа сверху, СиВ и Альфа рядом */}
      <div
        style={{
          position: "absolute",
          right: 96,
          top: 76,
          height: 92,
          display: "flex",
          alignItems: "center",
          gap: 28,
          opacity: interpolate(t, [2.0, 2.4], [0, 1], clamp) * (1 - out),
          translate: `0px ${interpolate(t, [2.0, 2.4], [-12, 0], { ...clamp, easing: smooth })}px`,
        }}
      >
        {LOGO_SIV ? (
<Img src={staticFile(LOGO_SIV)} style={{ height: 64 }} />
        ) : null}
        <Img src={staticFile("logo_alfa_white.png")} style={{ height: 84 }} />
      </div>

      <Img
        src={staticFile("char/max_09_bye.png")}
        style={{
          position: "absolute",
          left: 1035,
          top: 236,
          width: 884,
          height: 884,
          opacity: interpolate(t, [1.5, 1.7], [0, 1], clamp) * (1 - out),
          translate: `0px ${interpolate(t, [1.5, 1.65, 1.9], [30, -14, 0], { ...clamp, easing: Easing.inOut(Easing.quad) }) + Math.sin(t * 1.6) * 3}px`,
        }}
      />
    </AbsoluteFill>
  );
};

const IntroAudio: React.FC = () => {
  const { fps } = useVideoConfig();
  const cue = (s: number, sfx: string, vol: number) => (
    <Sequence key={sfx + s} from={Math.round(s * fps)} durationInFrames={fps * 3}>
      <Audio src={staticFile(`sfx/${sfx}.mp3`)} volume={vol} />
    </Sequence>
  );
  return (
    <>
      {cue(0.05, "whoosh_soft", 0.3)}
      {cue(0.4, "pop_soft", 0.25)}
      {cue(0.6, "sparkle", 0.25)}
      {cue(0.75, "pop_soft_2", 0.25)}
      {cue(INTRO_S - 0.3, "whoosh_slide", 0.25)}
    </>
  );
};

// Звуковые эффекты выключены: в ролике только голос и музыка
const SFX_ON = false;

// Паузы в речи длиннее 0,45 с: в них музыка чуть поднимается
const VO_GAPS: [number, number][] = (() => {
  const w = CAPTIONS.flat();
  const g: [number, number][] = [];
  for (let i = 1; i < w.length; i++) if (w[i].s - w[i - 1].e >= 0.45) g.push([w[i - 1].e, w[i].s]);
  return g;
})();
const musicVolume = (videoT: number, total: number) => {
  const t = videoT - LEAD_IN;
  const duck = interpolate(t, [-0.5, 0.15], [0.3, 0.115], clamp);
  const gap = Math.max(0, ...VO_GAPS.map(([a, b]) => Math.min(interpolate(t, [a, a + 0.25], [0, 1], clamp), interpolate(t, [b - 0.2, b + 0.05], [1, 0], clamp))));
  const finale = interpolate(t, [VO_END + 0.1, VO_END + 0.9], [0, 1], clamp);
  const base = duck + 0.05 * gap * (t > 0 ? 1 : 0);
  return (base + (0.32 - base) * finale) * interpolate(videoT, [total - 0.35, total], [1, 0], clamp);
};

const AudioTrack: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  const f = (s: number) => Math.round((s + LEAD_IN) * fps);
  // звуки ведущего плана глушим там, где его закрывает отдельный план со своими звуками
  const underShot = (t: number) => SHOT_RANGES.some(([a, b]) => t >= a - 0.05 && t < b);
  const sfx = [
    ...ELEMENTS.filter((e) => e.sfx).map((e) => ({ t: e.in, sfx: e.sfx as string, vol: undefined as number | undefined })),
    ...EXTRA_SFX,
  ].filter((s) => !underShot(s.t));
  return (
    <>
      <Sequence name="Озвучка" from={f(0)}>
        <Audio src={staticFile("vo.m4a")} />
      </Sequence>
      <Audio src={staticFile("music_ext.m4a")} volume={(fr) => musicVolume(fr / fps, durationInFrames / fps)} />
      {SFX_ON
        ? sfx.map((s, i) => (
            <Sequence key={i} name={`sfx ${s.sfx}`} from={f(s.t)} durationInFrames={fps * 3}>
              <Audio src={staticFile(`sfx/${s.sfx}.mp3`)} volume={(s.vol ?? 0.42) * 0.65} />
            </Sequence>
          ))
        : null}
    </>
  );
};

const FadeOut: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const o = interpolate(frame, [durationInFrames - fps * 0.4, durationInFrames - 1], [0, 1], clamp);
  return <AbsoluteFill style={{ background: "#FFFFFF", opacity: o, zIndex: 200 }} />;
};

// Камера ведущего плана: медленное покачивание и наезд, чтобы кадр не стоял
const Stage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const t = useT();
  return (
    <AbsoluteFill
      style={{
        scale: String(1.035 + 0.02 * Math.sin(t / 4.5)),
        translate: `${Math.sin(t / 6.1) * 14}px ${Math.cos(t / 5.3) * 8}px`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export const DebitCardVideo: React.FC = () => {
  const fontsReady = useFonts();
  return (
    <AbsoluteFill style={{ backgroundColor: "#F1F2EA", overflow: "hidden" }}>
      <Stage>
        <Background />
        <Max />
        {ELEMENTS.map((el, i) => (
          <Element key={el.id} el={el} index={i} />
        ))}
      </Stage>
      <Shots />
      <Titles />
      {fontsReady ? <Subtitles /> : null}
      <Intro />
      <FadeOut />
      <AudioTrack />
      {SFX_ON ? <IntroAudio /> : null}
      {SFX_ON ? <ShotsAudio /> : null}
    </AbsoluteFill>
  );
};
