import React from "react";
import { Composition, Folder } from "remotion";
import { Birthday } from "./Birthday";
import { FinalWall, PhotoWall } from "./overlays/PhotoWall";
import { FPS, HEIGHT, lengthOf, shotById, TOTAL_FRAMES, WIDTH } from "./timeline";

export const RemotionRoot: React.FC = () => {
  const wall = lengthOf(shotById("S06-02"));
  const fin = lengthOf(shotById("S09-06"));
  return (
    <>
      <Composition id="Birthday" component={Birthday} durationInFrames={TOTAL_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
      <Folder name="Scenes">
        <Composition id="PhotoWall" component={() => <PhotoWall length={wall} />} durationInFrames={wall} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="FinalWall" component={() => <FinalWall length={fin} />} durationInFrames={fin} fps={FPS} width={WIDTH} height={HEIGHT} />
      </Folder>
    </>
  );
};
