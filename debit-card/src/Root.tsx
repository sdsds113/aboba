import { Composition } from "remotion";
import { DURATION_S, FPS } from "./timeline";
import { DebitCardVideo } from "./Video";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="DebitCard"
      component={DebitCardVideo}
      durationInFrames={Math.ceil(DURATION_S * FPS)}
      fps={FPS}
      width={1920}
      height={1080}
    />
  );
};
