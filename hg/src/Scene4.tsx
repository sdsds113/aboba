import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  OffthreadVideo,
  interpolate,
  random,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { RED, fontFamily } from "./ui";

// Кадр 4. «Моя главная миссия как тренера — превратить выгорание в вовлечённость,
// а страх перед сложными звонками — в азарт и мастерство».
// Тайминги слов (из выравнивания ElevenLabs, 30 fps): «выгорание» ≈ 74, «страх» ≈ 129,
// «азарт» ≈ 184, «мастерство» ≈ 202, конец реплики ≈ 227.

export const SCENE4_LEN = 240;
const IN_A = 62; // «ОТ СТРАХА И ВЫГОРАНИЯ» появляется
const BOOM = 168; // фраза взрывается
const IN_B = 180; // «К АЗАРТУ И МАСТЕРСТВУ» собирается

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const TEXT_SHADOW = "0 4px 24px rgba(0,0,0,0.75), 0 2px 4px rgba(0,0,0,0.6)";

/** Phrase that shatters letter by letter at `boom`. */
const ShatterText: React.FC<{ lines: string[]; appear: number; boom: number; style: React.CSSProperties }> = ({
  lines,
  appear,
  boom,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  let idx = 0;
  return (
    <div style={style}>
      {lines.map((line, li) => (
        <div key={li} style={{ display: "flex", whiteSpace: "pre" }}>
          {line.split("").map((ch, ci) => {
            const i = idx++;
            const inP = spring({ frame: frame - appear - i * 1.2, fps, config: { damping: 15 } });
            const p = interpolate(frame, [boom, boom + 22], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
            const ang = random(`a${i}`) * Math.PI * 2;
            const dist = 250 + random(`d${i}`) * 650;
            const dx = Math.cos(ang) * dist * p;
            const dy = Math.sin(ang) * dist * p - 120 * p;
            const rot = (random(`r${i}`) - 0.5) * 720 * p;
            const heat = interpolate(p, [0, 0.15, 1], [0, 1, 1], clamp);
            return (
              <span
                key={ci}
                style={{
                  display: "inline-block",
                  opacity: inP * (1 - p),
                  color: heat > 0 ? `rgb(255,${Math.round(255 - 120 * heat)},${Math.round(255 - 220 * heat)})` : "#FFFFFF",
                  transform: `translate(${dx}px, ${dy + (1 - inP) * 40}px) rotate(${rot}deg) scale(${1 + p * 0.6})`,
                  filter: `blur(${p * 6}px)`,
                  textShadow: heat > 0 ? `0 0 ${20 * heat}px rgba(255,140,40,0.9), ${TEXT_SHADOW}` : TEXT_SHADOW,
                }}
              >
                {ch}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

/** Phrase that assembles from scattered letters. */
const AssembleText: React.FC<{ lines: string[]; start: number; style: React.CSSProperties }> = ({
  lines,
  start,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  let idx = 0;
  const total = lines.join("").length;
  return (
    <div style={style}>
      {lines.map((line, li) => (
        <div key={li} style={{ display: "flex", whiteSpace: "pre", justifyContent: "flex-end" }}>
          {line.split("").map((ch, ci) => {
            const i = idx++;
            const p = spring({ frame: frame - start - (i / total) * 10, fps, config: { damping: 13, mass: 0.8 } });
            const ang = random(`b${i}`) * Math.PI * 2;
            const dist = (1 - p) * (300 + random(`e${i}`) * 500);
            const glow = interpolate(frame, [start + 14, start + 24, start + 50], [0, 1, 0.35], clamp);
            return (
              <span
                key={ci}
                style={{
                  display: "inline-block",
                  opacity: Math.min(1, p * 1.4),
                  transform: `translate(${Math.cos(ang) * dist}px, ${Math.sin(ang) * dist}px) rotate(${(1 - p) * (random(`s${i}`) - 0.5) * 540}deg)`,
                  filter: `blur(${(1 - p) * 8}px)`,
                  textShadow: `0 0 ${10 + 30 * glow}px rgba(239,49,36,${0.5 + 0.5 * glow}), ${TEXT_SHADOW}`,
                }}
              >
                {ch}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

/** Sparks flying out of the shattered phrase. */
const Sparks: React.FC<{ boom: number; cx: number; cy: number }> = ({ boom, cx, cy }) => {
  const frame = useCurrentFrame();
  const t = frame - boom;
  if (t < 0 || t > 40) return null;
  return (
    <>
      {Array.from({ length: 70 }).map((_, i) => {
        const ang = random(`sp${i}`) * Math.PI * 2;
        const speed = 18 + random(`sv${i}`) * 34;
        const life = 18 + random(`sl${i}`) * 22;
        const k = Math.min(t / life, 1);
        const x = cx + Math.cos(ang) * speed * t + (random(`sx${i}`) - 0.5) * 300;
        const y = cy + Math.sin(ang) * speed * t + 0.6 * t * t * 0.5 + (random(`sy${i}`) - 0.5) * 140;
        const size = 4 + random(`ss${i}`) * 7;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: i % 3 ? "#FFC46B" : "#FFFFFF",
              boxShadow: "0 0 12px 3px rgba(255,120,30,0.9)",
              opacity: 1 - k,
            }}
          />
        );
      })}
    </>
  );
};

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // camera shake at the shatter
  const sh = interpolate(frame, [BOOM, BOOM + 14], [1, 0], clamp);
  const shx = Math.sin(frame * 2.7) * 14 * sh;
  const shy = Math.cos(frame * 3.3) * 10 * sh;
  const flash = interpolate(frame, [BOOM, BOOM + 3, BOOM + 14], [0, 0.28, 0], clamp);
  const ring = interpolate(frame, [BOOM, BOOM + 22], [0, 1], { ...clamp, easing: Easing.out(Easing.quad) });

  const eyebrow = spring({ frame: frame - 8, fps, config: { damping: 200 }, durationInFrames: 20 });
  const fadeIn = interpolate(frame, [0, 6], [0, 1], clamp);
  const fadeOut = interpolate(frame, [durationInFrames - 8, durationInFrames], [1, 0], clamp);

  const phraseFont: React.CSSProperties = {
    position: "absolute",
    fontFamily,
    fontWeight: 900,
    fontSize: 88,
    lineHeight: 1.0,
    letterSpacing: -1,
    color: "#FFFFFF",
    textTransform: "uppercase",
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", opacity: Math.min(fadeIn, fadeOut) }}>
      <AbsoluteFill style={{ transform: `translate(${shx}px, ${shy}px) scale(1.03)` }}>
        <OffthreadVideo src={staticFile("scene4_hero.mp4")} muted playbackRate={0.7} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      {/* side vignettes for text readability */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 34%, rgba(0,0,0,0) 66%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* eyebrow */}
      <div style={{ position: "absolute", left: 96, top: 96, fontFamily, opacity: eyebrow }}>
        <div style={{ width: 140 * eyebrow, height: 10, background: RED, marginBottom: 22 }} />
        <div style={{ color: "#FFF", fontSize: 34, fontWeight: 800, letterSpacing: 8, textShadow: TEXT_SHADOW }}>
          МИССИЯ
        </div>
      </div>

      <ShatterText
        lines={["От страха", "и выгорания"]}
        appear={IN_A}
        boom={BOOM}
        style={{ ...phraseFont, left: 96, top: 330 }}
      />
      <Sparks boom={BOOM} cx={330} cy={420} />

      {/* shockwave ring */}
      {frame >= BOOM && frame < BOOM + 22 ? (
        <div
          style={{
            position: "absolute",
            left: 330 - 700 * ring,
            top: 420 - 700 * ring,
            width: 1400 * ring,
            height: 1400 * ring,
            borderRadius: "50%",
            border: `${10 * (1 - ring) + 2}px solid rgba(255,200,120,${0.8 * (1 - ring)})`,
          }}
        />
      ) : null}

      <AssembleText
        lines={["→ к азарту", "и мастерству"]}
        start={IN_B}
        style={{ ...phraseFont, right: 96, top: 400, textAlign: "right" }}
      />

      <AbsoluteFill style={{ backgroundColor: "#FFB25A", opacity: flash, mixBlendMode: "screen" }} />
      <Audio src={staticFile("vo_04.mp3")} />
    </AbsoluteFill>
  );
};
