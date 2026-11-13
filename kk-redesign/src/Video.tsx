import { Audio } from "@remotion/media";
import React from "react";
import { AbsoluteFill, interpolate, Sequence, staticFile } from "remotion";
import { Background } from "./Common";
import { Intro } from "./Intro";
import { SceneContext, SceneFL, SceneHover, SceneIMSI, SceneLinks, SceneOutro, SceneSwitch, SceneYL } from "./Scenes";
import { FPS } from "./theme";
import { sceneDur, sceneFrom, TOTAL, VO, VO_AT, type SceneId } from "./timeline";

const SCENE_COMP: Record<Exclude<SceneId, "intro">, React.FC> = {
  context: SceneContext,
  fl: SceneFL,
  hover: SceneHover,
  yl: SceneYL,
  imsi: SceneIMSI,
  sw: SceneSwitch,
  links: SceneLinks,
  outro: SceneOutro,
};

const voStart = Math.round(VO_AT * FPS);
const voEnd = Math.round((VO_AT + VO[VO.length - 1].end) * FPS);

// Музыка: громче на заставке и финале, под голосом уходит вниз
const musicVolume = (f: number) =>
  interpolate(
    f,
    [0, 20, voStart - 30, voStart + 10, voEnd + 10, voEnd + 50, TOTAL - 100, TOTAL - 4],
    [0, 0.42, 0.42, 0.11, 0.11, 0.36, 0.36, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

export const KKVideo: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0A0A0B" }}>
    <Background />
    <Sequence name="Заставка" durationInFrames={sceneDur("intro")}>
      <Intro bg={false} />
    </Sequence>
    {(Object.keys(SCENE_COMP) as (keyof typeof SCENE_COMP)[]).map((id) => {
      const C = SCENE_COMP[id];
      return (
        <Sequence key={id} name={id} from={sceneFrom(id)} durationInFrames={sceneDur(id)}>
          <C />
        </Sequence>
      );
    })}
    <Sequence name="Голос" from={voStart}>
      <Audio src={staticFile("vo/voice.wav")} volume={1.2} />
    </Sequence>
    <Audio src={staticFile("music/music.mp3")} volume={musicVolume} />
  </AbsoluteFill>
);
