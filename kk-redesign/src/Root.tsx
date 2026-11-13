import React from "react";
import { Composition } from "remotion";
import "./fonts";
import { Intro } from "./Intro";
import { FPS, H, W } from "./theme";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Intro" component={Intro} durationInFrames={3 * FPS} fps={FPS} width={W} height={H} />
  </>
);
