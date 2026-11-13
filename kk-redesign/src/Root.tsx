import React from "react";
import { Composition } from "remotion";
import "./fonts";
import { Intro } from "./Intro";
import { FPS, H, W } from "./theme";
import { TOTAL } from "./timeline";
import { KKVideo } from "./Video";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="KK" component={KKVideo} durationInFrames={TOTAL} fps={FPS} width={W} height={H} />
    <Composition id="Intro" component={Intro} durationInFrames={3 * FPS} fps={FPS} width={W} height={H} />
  </>
);
