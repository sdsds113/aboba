import React from "react";
import { AbsoluteFill, interpolate, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { Backdrop, Grain } from "./components/Backdrop";
import { SidePools } from "./components/Pools";
import { Subtitles } from "./components/Subtitles";
import { FPS, Scene, TOTAL_SECONDS, VO_OFFSET, VOICE_DURATION } from "./lib/core";
import { SceneAnswer, SceneChat, SceneRoute, SceneSetup } from "./scenes/Screens";
import { SivLogo } from "./components/Logo";
import { SceneFinale, SceneHero, ScenePile, ScenePuzzle, SceneQuestions, SceneTea } from "./scenes/Story";
import { TitleIntroOutro } from "./scenes/Title";

/** Music: full on the title, ducked under the voice, back up on the end title, fades out. */
const musicVolume = (f: number) => {
  const s = f / FPS;
  const voEnd = VO_OFFSET + VOICE_DURATION + 0.02;
  return interpolate(
    s,
    [0, VO_OFFSET - 0.4, VO_OFFSET + 0.2, voEnd, voEnd + 0.6, TOTAL_SECONDS - 1.6, TOTAL_SECONDS - 0.05],
    [0.32, 0.32, 0.13, 0.13, 0.32, 0.32, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
};

/** Element-only cut: no character, no on-screen words (subtitles carry the text). */
export const AINastavnik: React.FC<{ subtitles?: boolean }> = ({ subtitles = true }) => {
  return (
    <AbsoluteFill style={{ background: "#0B0B0E", overflow: "hidden" }}>
      <Backdrop />
      <SidePools />
      <Scene name="S1-3 questions" start={-0.5} end={18.6}>
        <SceneQuestions />
      </Scene>
      <Scene name="S4 pile" start={18.2} end={28.0}>
        <ScenePile />
      </Scene>
      <Scene name="S5 puzzle" start={27.7} end={32.9}>
        <ScenePuzzle />
      </Scene>
      <Scene name="S6 hero" start={32.4} end={40.5}>
        <SceneHero />
      </Scene>
      <Scene name="S7 setup" start={40.0} end={47.7}>
        <SceneSetup />
      </Scene>
      <Scene name="S8 tea" start={47.2} end={53.3}>
        <SceneTea />
      </Scene>
      <Scene name="S9 answer" start={53.0} end={60.2}>
        <SceneAnswer />
      </Scene>
      <Scene name="S10 chat" start={59.6} end={64.0}>
        <SceneChat />
      </Scene>
      <Scene name="S11 route" start={63.4} end={70.9}>
        <SceneRoute />
      </Scene>
      <Scene name="S13 finale" start={70.3} end={80.6}>
        <SceneFinale />
      </Scene>

      <SivLogo />
      <TitleIntroOutro />
      {subtitles ? <Subtitles /> : null}
      <Grain />

      <Sequence name="Voice" from={Math.round(VO_OFFSET * FPS)}>
        <Audio src={staticFile("audio/voice_edit.wav")} />
      </Sequence>
      <Audio src={staticFile("audio/music_upbeat.mp3")} volume={musicVolume} />
    </AbsoluteFill>
  );
};
