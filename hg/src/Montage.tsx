import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { K } from "./premium";
import { SCENE1_LEN, Scene1 } from "./Scene1";
import { SCENE2_LEN, Scene2 } from "./Scene2";
import { SCENE3_LEN, Scene3 } from "./Scene3";
import { SCENE4_LEN, Scene4 } from "./Scene4";
import { SCENE5_LEN, Scene5 } from "./Scene5";
import { SCENE6A_LEN, SCENE6B_LEN, SCENE6_LEN, Scene6 } from "./Scene6";
import { SCENE7_LEN, Scene7 } from "./Scene7";
import { SCENE8_LEN, Scene8 } from "./Scene8";
import { SCENE9_LEN, Scene9 } from "./Scene9";
import { SCENE10_HANDOVER, SCENE10_LEN, Scene10 } from "./Scene10";
import { Sound, Starts } from "./Sound";

// Полный ролик: 10 сцен встык, прямые склейки, звуковой слой (музыка и эффекты ElevenLabs).
// Длины сцен — в кадрах 30 fps, рендер в 60 fps (K = 2).
const SCENES: [React.FC, number][] = [
  [Scene1, SCENE1_LEN],
  [Scene2, SCENE2_LEN],
  [Scene3, SCENE3_LEN],
  [Scene4, SCENE4_LEN],
  [Scene5, SCENE5_LEN],
  [Scene6, SCENE6_LEN],
  [Scene7, SCENE7_LEN],
  [Scene8, SCENE8_LEN],
  [Scene9, SCENE9_LEN],
  [Scene10, SCENE10_LEN],
];

const at: number[] = [];
SCENES.reduce((acc, [, l]) => {
  at.push(acc);
  return acc + l;
}, 0);

export const MONTAGE_LEN = SCENES.reduce((s, [, l]) => s + l, 0);

const STARTS: Starts = {
  s1: at[0], s2: at[1], s3: at[2], s4: at[3], s5: at[4],
  s6a: at[5], s6b: at[5] + SCENE6A_LEN, s6c: at[5] + SCENE6A_LEN + SCENE6B_LEN,
  s7: at[6], s8: at[7], s9: at[8],
  s10a: at[9], s10b: at[9] + SCENE10_HANDOVER, end: MONTAGE_LEN,
};

export const Montage: React.FC = () => (
  <AbsoluteFill>
    <Series>
      {SCENES.map(([C, len], i) => (
        <Series.Sequence key={i} durationInFrames={len * K}>
          <C />
        </Series.Sequence>
      ))}
    </Series>
    <Sound s={STARTS} />
  </AbsoluteFill>
);
