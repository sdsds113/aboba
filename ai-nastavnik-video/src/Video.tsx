import React from "react";
import { AbsoluteFill, interpolate, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { Backdrop, Grain } from "./components/Backdrop";
import { Subtitles } from "./components/Subtitles";
import { FPS, Scene, TOTAL_FRAMES, VO_OFFSET } from "./lib/core";
import { ActABack, ActAFront } from "./scenes/ActA";
import { ActBBack, ActBFront } from "./scenes/ActB";
import { ActCBack } from "./scenes/ActC";
import { ActDBack, ActDFront } from "./scenes/ActD";
import { ActEBack, ActEFront } from "./scenes/ActE";
import { ActFBack, ActGBack, ClickFlood } from "./scenes/ActF";
import { ActHBack, ActHFront } from "./scenes/ActH";
import { CharacterTrack } from "./scenes/CharacterTrack";

/** Music level: low under the voice, lifts on the end card, fades out. */
const musicVolume = (f: number) => {
  const s = f / FPS;
  return interpolate(s, [0, 0.6, 89.0, 89.8, 91.4, 93.4], [0.3, 0.15, 0.15, 0.32, 0.32, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

export const AINastavnik: React.FC<{ subtitles?: boolean }> = ({ subtitles = true }) => {
  return (
    <AbsoluteFill style={{ background: "#0B0B0E", overflow: "hidden" }}>
      <Backdrop />
      {/* back layers (behind the character), in time order */}
      <Scene name="S1-3 back" start={-0.5} end={18.8}>
        <ActABack />
      </Scene>
      <Scene name="S4-5 back" start={18.2} end={33.2}>
        <ActBBack />
      </Scene>
      <Scene name="S6 back" start={32.3} end={40.6}>
        <ActCBack />
      </Scene>
      <Scene name="S7-8 back" start={40.0} end={53.4}>
        <ActDBack />
      </Scene>
      <Scene name="S9-10 back" start={53.0} end={64.0}>
        <ActEBack />
      </Scene>
      <Scene name="S11 back" start={63.4} end={71.0}>
        <ActFBack />
      </Scene>
      <Scene name="S12 back" start={70.6} end={79.4}>
        <ActGBack />
      </Scene>
      <Scene name="S13-14 back" start={79.0} end={93.0}>
        <ActHBack />
      </Scene>

      <CharacterTrack />

      {/* front layers (in front of the character) */}
      <Scene name="S1-3 front" start={-0.5} end={18.8}>
        <ActAFront />
      </Scene>
      <Scene name="S4-5 front" start={18.2} end={23.0}>
        <ActBFront />
      </Scene>
      <Scene name="S7-8 front" start={40.0} end={53.4}>
        <ActDFront />
      </Scene>
      <Scene name="S10 front" start={62.0} end={64.0}>
        <ActEFront />
      </Scene>
      <Scene name="S12 flood" start={78.2} end={80.4}>
        <ClickFlood />
      </Scene>
      <Scene name="S13 front" start={83.3} end={85.0}>
        <ActHFront />
      </Scene>

      {subtitles ? <Subtitles /> : null}
      <Grain />

      <Sequence name="Voice" from={Math.round(VO_OFFSET * FPS)}>
        <Audio src={staticFile("audio/voice_edit.wav")} />
      </Sequence>
      <Audio src={staticFile("audio/music_chill.mp3")} volume={musicVolume} />
      <Sequence name="end" from={TOTAL_FRAMES - 1} durationInFrames={1}>
        <AbsoluteFill />
      </Sequence>
    </AbsoluteFill>
  );
};
