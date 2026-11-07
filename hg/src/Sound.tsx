import React from "react";
import { Audio, Sequence, interpolate, staticFile } from "remotion";
import { K } from "./premium";

// Звуковой слой полного ролика: музыка и эффекты из ElevenLabs.
// Все моменты — в кадрах 30 fps от начала ролика (см. starts в Montage).

export type Starts = {
  s1: number; s2: number; s3: number; s4: number; s5: number;
  s6a: number; s6b: number; s6c: number; s7: number; s8: number; s9: number;
  s10a: number; s10b: number; end: number;
};

const Fx: React.FC<{ src: string; at: number; vol: number; dur?: number }> = ({ src, at, vol, dur }) => (
  <Sequence from={Math.round(at * K)} durationInFrames={dur ? Math.round(dur * K) : undefined}>
    <Audio src={staticFile(`sfx/${src}.mp3`)} volume={vol} />
  </Sequence>
);

export const Sound: React.FC<{ s: Starts }> = ({ s }) => {
  const speechEnd = s.s10b + 205; // конец последней фразы, дальше финальный экран
  // музыка: тихо под голос, громче на вручении и после финальной фразы, уход в конце
  const musicVol = (f: number) => {
    const t = f / K;
    const base = 0.075;
    const lift = interpolate(t, [s.s10a - 6, s.s10a + 12, s.s10b - 6, s.s10b + 10], [base, 0.22, 0.22, base], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const hero = interpolate(t, [s.s4, s.s4 + 10, s.s5 - 10, s.s5], [0, 0.05, 0.05, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const outro = interpolate(t, [speechEnd, speechEnd + 15], [0, 0.17], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const fade = interpolate(t, [s.end - 40, s.end], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return (Math.max(base, lift) + hero + outro) * fade;
  };

  const cuts = [s.s2, s.s3, s.s4, s.s5, s.s6a, s.s6b, s.s6c, s.s7, s.s8, s.s9, s.s10a];
  return (
    <>
      <Audio src={staticFile("sfx/music.mp3")} volume={musicVol} />

      {/* мягкие whoosh на склейках */}
      {cuts.map((c, i) => (
        <Fx key={i} src="whoosh" at={c - 8} vol={0.22} />
      ))}

      {/* сцена 4: огонь, нарастание и удар на «азарт» */}
      <Fx src="fire" at={s.s4} vol={0.07} dur={228} />
      <Fx src="riser" at={s.s4 + 106} vol={0.2} />
      <Fx src="impact" at={s.s4 + 178} vol={0.24} />

      {/* сцена 5: цифры */}
      <Fx src="pop" at={s.s5 + 70} vol={0.3} />
      <Fx src="pop" at={s.s5 + 148} vol={0.3} />
      <Fx src="pop" at={s.s5 + 306} vol={0.32} />

      {/* сцена 6: заголовки китов */}
      <Fx src="pop" at={s.s6a + 140} vol={0.22} />
      <Fx src="pop" at={s.s6a + 192} vol={0.25} />
      <Fx src="pop" at={s.s6b + 18} vol={0.25} />
      <Fx src="pop" at={s.s6c + 22} vol={0.25} />

      {/* сцена 7: 35+ и ИИ-продукты */}
      <Fx src="pop" at={s.s7 + 26} vol={0.3} />
      {[148, 160, 172, 184].map((d) => (
        <Fx key={d} src="tick" at={s.s7 + d} vol={0.22} />
      ))}

      {/* сцена 8: «под звук клика» на каждой метрике */}
      {[164, 233, 306, 386].map((d) => (
        <Fx key={d} src="tick" at={s.s8 + d + 6} vol={0.4} />
      ))}

      {/* сцена 9 */}
      <Fx src="pop" at={s.s9 + 98} vol={0.28} />
      <Fx src="pop" at={s.s9 + 452} vol={0.3} />

      {/* финал: аплодисменты на вручении, звон на слогане */}
      <Fx src="applause" at={s.s10a} vol={0.38} />
      <Fx src="chime" at={s.s10b + 208 + 20} vol={0.42} />
    </>
  );
};
