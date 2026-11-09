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
  LEAD_IN,
  SCENES,
  TITLES,
  VO_END,
} from "./timeline";
import { CAPTIONS } from "./captions";

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
  useEffect(() => {
    const faces = [
      ["StyreneALC-Medium.otf", "500"],
      ["StyreneALC-Bold.otf", "700"],
      ["StyreneALC-Black.otf", "900"],
    ].map(([file, weight]) => new FontFace("Styrene", `url(${staticFile(`fonts/${file}`)})`, { weight }));
    Promise.all(faces.map((f) => f.load()))
      .then((loaded) => {
        loaded.forEach((f) => document.fonts.add(f));
        continueRender(handle);
      })
      .catch((e) => {
        console.error(e);
        continueRender(handle);
      });
  }, [handle]);
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
        if (t < r.start - 0.1 || t > r.end + 0.5) return null;
        const local = t - r.start;
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

const Element: React.FC<{ el: El; index: number }> = ({ el, index }) => {
  const { fps } = useVideoConfig();
  const t = useT();
  if (t < el.in - 0.05 || t > el.out + 0.6) return null;

  const local = t - el.in;
  const enter = spring({
    frame: Math.round(local * fps),
    fps,
    config: { damping: 15, stiffness: 110, mass: 0.9 },
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

  const scale = (startScale + (1 - startScale) * enter) * (1 - 0.08 * exitP);
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

  return (
    <Img
      src={staticFile(`el/${el.src}.png`)}
      style={{
        ...style,
        width: el.size,
        height: el.size,
        filter: el.dim ? "grayscale(0.75) brightness(1.08)" : undefined,
      }}
    />
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

const Titles: React.FC = () => {
  const t = useT();
  return (
    <>
      {TITLES.map((ti, i) => {
        const next = TITLES[i + 1]?.t ?? DURATION_S;
        if (t < ti.t - 0.05 || t > next + 0.3) return null;
        const local = t - ti.t;
        const appear = interpolate(local, [0.08, 0.5], [0, 1], { ...clamp, easing: smooth });
        const leave = interpolate(t, [next - 0.02, next + 0.16], [0, 1], clamp);
        const onRed = bgAt(ti.t) !== "light";
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 96,
              top: 84,
              padding: "22px 38px 24px",
              borderRadius: 30,
              background: onRed ? "#FFFFFF" : RED,
              color: onRed ? INK : "#FFFFFF",
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 58,
              letterSpacing: "-0.01em",
              lineHeight: 1.05,
              whiteSpace: "nowrap",
              boxShadow: "0 20px 44px rgba(30, 0, 40, 0.16)",
              opacity: appear * (1 - leave),
              translate: `${-18 * leave}px ${24 * (1 - appear)}px`,
              scale: String(0.96 + 0.04 * appear),
              transformOrigin: "left center",
              zIndex: 100,
            }}
          >
            {ti.text}
          </div>
        );
      })}
    </>
  );
};

// Субтитры в духе Apple: стеклянная тёмная плашка под Максом, фраза в 1–2 строки
// по центру. Ещё не сказанные слова еле видны, сказанное слово мягко поднимается
// снизу, проявляется и становится резким. Размер плашки по всей фразе, без прыжков.
const SUB_FONT_SIZE = 38;
const WEAK = new Set(["в", "с", "и", "к", "а", "о", "у", "на", "за", "не", "ни", "по", "из", "от", "до", "или", "про", "под", "как", "где", "что", "чем", "это", "их"]);
// Делим фразу на 1–2 ровные строки, предлоги и союзы не оставляем в конце строки
const splitLines = (words: string[]): number[][] => {
  const all = words.map((_, i) => i);
  const len = (a: number, b: number) => words.slice(a, b).join(" ").length;
  if (len(0, words.length) <= 26 || words.length < 2) return [all];
  let best = 1;
  let bestScore = Infinity;
  for (let k = 1; k < words.length; k++) {
    const last = words[k - 1].toLowerCase().replace(/[.,:;?!]/g, "");
    const weakEnd = WEAK.has(last) && !/[.,:;?!]$/.test(words[k - 1]);
    const score = Math.abs(len(0, k) - len(k, words.length)) + (weakEnd ? 100 : 0) - (/[,:;]$/.test(words[k - 1]) ? 4 : 0);
    if (score < bestScore) {
      bestScore = score;
      best = k;
    }
  }
  return [all.slice(0, best), all.slice(best)];
};

const Subtitles: React.FC = () => {
  const t = useT();
  return (
    <>
      {CAPTIONS.map((c, i) => {
        const start = c[0].s - 0.2;
        const nextStart = CAPTIONS[i + 1]?.[0].s ?? Infinity;
        // фраза уходит раньше, чем начнёт появляться следующая
        const end = Math.min(c[c.length - 1].e + 0.5, nextStart - 0.42);
        if (t < start - 0.02 || t > end + 0.22) return null;
        const appear = interpolate(t, [start, start + 0.26], [0, 1], { ...clamp, easing: smooth });
        const leave = interpolate(t, [end, end + 0.2], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 1477,
              bottom: 44,
              translate: `-50% ${16 * (1 - appear) - 10 * leave}px`,
              scale: String(0.97 + 0.03 * appear),
              opacity: appear * (1 - leave),
              width: "max-content",
              padding: "16px 30px 19px",
              borderRadius: 26,
              background: "rgba(18, 16, 24, 0.68)",
              backdropFilter: "blur(18px) saturate(140%)",
              boxShadow: "0 14px 34px rgba(0, 0, 0, 0.18)",
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: SUB_FONT_SIZE,
              lineHeight: 1.22,
              letterSpacing: "-0.005em",
              color: "#FFFFFF",
              textAlign: "center",
              zIndex: 150,
            }}
          >
            {splitLines(c.map((w) => w.t)).map((line, li) => (
              <div key={li} style={{ whiteSpace: "nowrap" }}>
                {line.map((j, k) => {
                  const w = c[j];
                  const p = interpolate(t, [w.s - 0.08, w.s + 0.3], [0, 1], { ...clamp, easing: Easing.bezier(0.22, 1, 0.36, 1) });
                  return (
                    <span
                      key={j}
                      style={{
                        display: "inline-block",
                        marginRight: k < line.length - 1 ? "0.26em" : 0,
                        opacity: 0.22 + 0.78 * p,
                        translate: `0px ${0.42 * SUB_FONT_SIZE * (1 - p)}px`,
                        filter: p < 0.999 ? `blur(${3 * (1 - p)}px)` : undefined,
                      }}
                    >
                      {w.t}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
};

const AudioTrack: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  const f = (s: number) => Math.round((s + LEAD_IN) * fps);
  const sfx = [
    ...ELEMENTS.filter((e) => e.sfx).map((e) => ({ t: e.in, sfx: e.sfx as string, vol: undefined as number | undefined })),
    ...EXTRA_SFX,
  ];
  return (
    <>
      <Sequence name="Озвучка" from={f(0)}>
        <Audio src={staticFile("vo.m4a")} />
      </Sequence>
      <Audio
        src={staticFile("music.mp3")}
        volume={(fr) =>
          0.12 *
          interpolate(fr, [0, fps * 1.2], [0.5, 1], clamp) *
          interpolate(fr, [f(VO_END), durationInFrames - 1], [1, 0.6], clamp) *
          interpolate(fr, [durationInFrames - fps * 1.6, durationInFrames - 1], [1, 0], clamp)
        }
      />
      {sfx.map((s, i) => (
        <Sequence key={i} name={`sfx ${s.sfx}`} from={f(s.t)} durationInFrames={fps * 3}>
          <Audio src={staticFile(`sfx/${s.sfx}.mp3`)} volume={(s.vol ?? 0.42) * 0.65} />
        </Sequence>
      ))}
    </>
  );
};

const FadeOut: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const o = interpolate(frame, [durationInFrames - fps * 0.8, durationInFrames - 1], [0, 1], clamp);
  return <AbsoluteFill style={{ background: "#FFFFFF", opacity: o, zIndex: 200 }} />;
};

export const DebitCardVideo: React.FC = () => {
  useFonts();
  return (
    <AbsoluteFill style={{ backgroundColor: "#F1F2EA", overflow: "hidden" }}>
      <Background />
      <Max />
      {ELEMENTS.map((el, i) => (
        <Element key={el.id} el={el} index={i} />
      ))}
      <Titles />
      <Subtitles />
      <FadeOut />
      <AudioTrack />
    </AbsoluteFill>
  );
};
