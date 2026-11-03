import React from "react";
import { Composition, Folder } from "remotion";
import { Achievements } from "./Achievements";
import { ConditionsScreen } from "./components/ConditionsScreen";
import { Page79Patch } from "./components/Page79Patch";
import { CONDITIONS, DURATION, FPS, PAGE79 } from "./timeline";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="Achievements" component={Achievements} durationInFrames={DURATION} fps={FPS} width={1920} height={1080} />
      <Folder name="Scenes">
        <Composition
          id="ConditionsScreen"
          component={ConditionsScreen}
          durationInFrames={CONDITIONS.to - CONDITIONS.from}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="Page79Patch"
          component={Page79Patch}
          durationInFrames={PAGE79.to - PAGE79.loadingFrom}
          fps={FPS}
          width={1920}
          height={1080}
        />
      </Folder>
    </>
  );
};
