import React from "react";
import { AbsoluteFill, interpolate, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { Backdrop, Grain } from "./components/Backdrop";
import { SidePools } from "./components/Pools";
import { Subtitles } from "./components/Subtitles";
import { FPS, Scene, TOTAL_SECONDS, VO_OFFSET } from "./lib/core";
import { ActABack, ActAFront } from "./scenes/ActA";
import { ActBBack } from "./scenes/ActB";
import { ActCBack } from "./scenes/ActC";
import { ActDBack, ActDFront } from "./scenes/ActD";
import { ActEBack, ActEFront } from "./scenes/ActE";
import { ActFBack, ActGBack } from "./scenes/ActF";
import { ActHBack } from "./scenes/ActH";
import { CharacterTrack } from "./scenes/CharacterTrack";
import { TitleIntroOutro } from "./scenes/Title";

/** Music: full on the title, ducked under the voice, back up on the end title, fades out. */
const musicVolume = (f: number) => {
  const s = f / FPS;
  const voEnd = VO_OFFSET + 88.75;
  return interpolate(
    s,
    [0, VO_OFFSET - 0.4, VO_OFFSET + 0.2, voEnd, voEnd + 0.6, TOTAL_SECONDS - 1.6, TOTAL_SECONDS - 0.05],
    [0.32, 0.32, 0.13, 0.13, 0.32, 0.32, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
};

export const AINastavnik: React.FC<{ subtitles?: boolean }> = ({ subtitles = true }) => {
  return (
    <AbsoluteFill style={{ background: "#0B0B0E", overflow: "hidden" }}>
      <Backdrop />
      <SidePools />
      {/* back layers (behind the character) */}
      <Scene name="S1-3 back" start={-0.5} end={18.8}>
        <ActABack />
      </Scene>
      <Scene name="S4-5 back" start={18.2} end={33.0}>
        <ActBBack />
      </Scene>
      <Scene name="S6 back" start={32.4} end={40.5}>
        <ActCBack />
      </Scene>
      <Scene name="S7-8 back" start={40.0} end={53.3}>
        <ActDBack />
      </Scene>
      <Scene name="S9-10 back" start={53.0} end={64.0}>
        <ActEBack />
      </Scene>
      <Scene name="S11 back" start={63.4} end={71.1}>
        <ActFBack />
      </Scene>
      <Scene name="S12 back" start={70.6} end={79.5}>
        <ActGBack />
      </Scene>
      <Scene name="S13 back" start={79.0} end={89.3}>
        <ActHBack />
      </Scene>

      <CharacterTrack />

      {/* front layers */}
      <Scene name="S1-3 front" start={-0.5} end={18.8}>
        <ActAFront />
      </Scene>
      <Scene name="S7-8 front" start={40.0} end={53.3}>
        <ActDFront />
      </Scene>
      <Scene name="S10 front" start={62.0} end={64.0}>
        <ActEFront />
      </Scene>

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
