import { Audio } from "@remotion/media";
import React from "react";
import { interpolate, Sequence, staticFile } from "remotion";
import cues from "./data/sfx_cues.json";
import mix from "./data/mix.json";
import { SFX_ENABLED, SFX_EXCLUDE } from "./config";
import { f, FPS, TOTAL_FRAMES, VOICE_INTERVALS } from "./timeline";

/** громкость музыки: тише под голосом, плавные переходы, затухание в конце */
const musicVolume = (frame: number) => {
  const t = frame / FPS;
  const r = mix.duck_ramp_s;
  // 1 — голос звучит, 0 — тишина; плавно на краях интервалов
  let voice = 0;
  for (const [a, b] of VOICE_INTERVALS) {
    const v = interpolate(t, [a - r, a, b, b + r], [0, 1, 1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    voice = Math.max(voice, v);
  }
  const base = interpolate(voice, [0, 1], [mix.music_no_voice, mix.music_under_voice]);
  const fade = interpolate(frame, [TOTAL_FRAMES - f(mix.music_fade_out_s), TOTAL_FRAMES], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return base * fade;
};

export const Sound: React.FC = () => {
  return (
    <>
      <Audio src={staticFile("audio/voiceover_full.mp3")} volume={mix.vo_gain} name="Голос диктора" />
      <Audio src={staticFile("audio/music.mp3")} volume={musicVolume} name="Музыка" />
      {SFX_ENABLED && cues.filter((c) => !SFX_EXCLUDE.includes(c.sfx)).map((c, i) => (
        <Sequence key={i} from={f(c.t)} name={`SFX ${c.sfx}`} layout="none">
          <Audio src={staticFile(`audio/sfx/${c.sfx}.mp3`)} volume={c.vol} />
        </Sequence>
      ))}
    </>
  );
};
