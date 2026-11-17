import React from "react";
import { Composition } from "remotion";
import { FPS, H, TOTAL_FRAMES, W } from "./lib/core";
import { AINastavnik } from "./Video";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="AINastavnik" component={AINastavnik} durationInFrames={TOTAL_FRAMES} fps={FPS} width={W} height={H} defaultProps={{ subtitles: true }} />
      <Composition id="AINastavnikNoSubs" component={AINastavnik} durationInFrames={TOTAL_FRAMES} fps={FPS} width={W} height={H} defaultProps={{ subtitles: false }} />
    </>
  );
};
