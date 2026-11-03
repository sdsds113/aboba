import { Video } from "@remotion/media";
import {
  AbsoluteFill,
  Composition,
  Freeze,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { SpamInsert } from "./Insert";

// Source: «ИИ тётка» ролик, 1920x1080, 30 fps, 50.5 s (1515 frames).
// Edit 1: the repeated "guy holding his head" shot (src 7.53–12.8 s) is covered
//         by a new motion-graphics insert; the original audio keeps playing.
// Edit 2: the final «Постановление» card (src 41.33–49.0 s) is played 1.6x
//         faster and followed by a short hold + fade instead of ~9 s on screen.

const SRC = staticFile("source.mp4");

const FadeOut: React.FC<{ children: React.ReactNode; frames: number; total: number }> = ({
  children,
  frames,
  total,
}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [total - frames, total], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ opacity: o }}>{children}</AbsoluteFill>;
};

export const Edit: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Sequence name="Оригинал 0–41.3 с" durationInFrames={1240}>
        <Video src={SRC} trimBefore={0} />
      </Sequence>

      <Sequence name="Новая вставка (вместо повтора)" from={226} durationInFrames={158}>
        <SpamInsert />
      </Sequence>

      <Sequence name="Постановление x1.6" from={1240} durationInFrames={143}>
        <Video src={SRC} trimBefore={1240} playbackRate={1.6} />
      </Sequence>

      <Sequence name="Постановление: стоп-кадр" from={1383} durationInFrames={36}>
        <FadeOut frames={18} total={36}>
          <Freeze frame={0}>
            <Video src={SRC} trimBefore={1470} muted />
          </Freeze>
        </FadeOut>
      </Sequence>
    </AbsoluteFill>
  );
};

export const MyComposition = () => {
  return (
    <>
      <Composition
        id="Edit"
        component={Edit}
        durationInFrames={1419}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Insert"
        component={SpamInsert}
        durationInFrames={158}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
