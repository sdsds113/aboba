import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { LOOK, LOWER_THIRDS, OPENING_TITLE, STRING_LIGHTS_SHOTS } from "./config";
import { Look } from "./Look";
import { Calendar } from "./overlays/Calendar";
import { clamp } from "./overlays/common";
import { BigTitle, GuidingStar, StringLights } from "./overlays/Festive";
import { FinalWall, PhotoWall } from "./overlays/PhotoWall";
import { LowerThird, OpeningTitle, PunchWord, YearSign } from "./overlays/Titles";
import { ShotVideo } from "./Shot";
import { Sound } from "./Sound";
import { f, lengthOf, Shot, shotById, SHOTS, startOf } from "./timeline";

/** Видео плана + оверлей поверх (локальное время внутри плана) */
const ShotLayer: React.FC<{ shot: Shot }> = ({ shot }) => {
  const len = lengthOf(shot);
  const o = shot.overlay;

  if (shot.id === "S06-02") return <PhotoWall length={len} />;
  if (shot.id === "S09-06") return <FinalWall length={len} />;

  const video = (
    <AbsoluteFill style={{ filter: o?.type === "calendar" ? `${LOOK.filter} blur(6px)` : LOOK.filter }}>
      <ShotVideo shot={shot} />
    </AbsoluteFill>
  );

  const who = LOWER_THIRDS[shot.id] ?? [];
  return (
    <AbsoluteFill>
      {video}
      {o?.type === "title" && OPENING_TITLE ? (
        <Sequence from={f(o.in ?? 0) - startOf(shot)} durationInFrames={f((o.out ?? 1) - (o.in ?? 0))} name="Титр">
          <OpeningTitle text={OPENING_TITLE} length={f((o.out ?? 1) - (o.in ?? 0))} />
        </Sequence>
      ) : null}
      {o?.type === "year" && o.text ? <YearSign year={o.text} sub={o.sub} length={len} /> : null}
      {o?.type === "calendar" ? <Calendar length={len} /> : null}
      {o?.type === "punch_word" && o.text ? <PunchWord text={o.text} /> : null}
      {o?.type === "big_title" && o.text ? <BigTitle text={o.text} /> : null}
      {shot.id === "S07-10" ? <GuidingStar length={len} /> : null}
      {who.map((w, i) => (
        <LowerThird key={w} who={w} side={i === 0 ? "left" : "right"} length={len} />
      ))}
    </AbsoluteFill>
  );
};

/** Переходы поверх склеек: затемнение перед сценой 6 и белая вспышка в конце S09-05 */
const Transitions: React.FC = () => {
  const s6 = startOf(shotById("S06-01"));
  const flashEnd = startOf(shotById("S09-06"));
  return (
    <>
      <Sequence from={s6 - 6} durationInFrames={12} name="Затемнение → сцена 6" layout="absolute-fill">
        <DipToBlack />
      </Sequence>
      <Sequence from={flashEnd - 8} durationInFrames={12} name="Вспышка камеры" layout="absolute-fill">
        <WhiteFlash />
      </Sequence>
    </>
  );
};

const DipToBlack: React.FC = () => <Fader color="black" points={[0, 6, 12]} />;
const WhiteFlash: React.FC = () => <Fader color="white" points={[0, 7, 12]} />;
const Fader: React.FC<{ color: string; points: [number, number, number] }> = ({ color, points }) => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{ backgroundColor: color, opacity: interpolate(frame, points, [0, 1, 0], clamp) }} />;
};

export const Birthday: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {SHOTS.map((s) => (
        <Sequence key={s.id} from={startOf(s)} durationInFrames={lengthOf(s)} name={`${s.id} · ${s.vo}`}>
          <ShotLayer shot={s} />
        </Sequence>
      ))}

      {STRING_LIGHTS_SHOTS.map((id) => {
        const s = shotById(id);
        return (
          <Sequence key={`lights-${id}`} from={startOf(s)} durationInFrames={lengthOf(s)} name={`Гирлянда ${id}`} layout="absolute-fill">
            <StringLights globalFrom={startOf(s)} />
          </Sequence>
        );
      })}

      <Transitions />
      <Look />
      <Sound />
    </AbsoluteFill>
  );
};
