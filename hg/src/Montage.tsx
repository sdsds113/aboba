import React from "react";
import { AbsoluteFill, Sequence, Series } from "remotion";
import { K } from "./premium";
import { SCENE1_LEN, Scene1 } from "./Scene1";
import { SCENE2_LEN, Scene2 } from "./Scene2";
import { SCENE3_LEN, Scene3 } from "./Scene3";
import { SCENE4_LEN, Scene4 } from "./Scene4";
import { SCENE5_LEN, Scene5 } from "./Scene5";
import { SCENE6A_EFF, SCENE6B_EFF, SCENE6_LEN, Scene6, TRIM6 } from "./Scene6";
import { SCENE7_LEN, Scene7 } from "./Scene7";
import { SCENE8_LEN, Scene8 } from "./Scene8";
import { SCENE9_LEN, Scene9 } from "./Scene9";
import { SCENE10_HANDOVER, SCENE10_LEN, Scene10 } from "./Scene10";
import { Sound, Starts } from "./Sound";

// Полный ролик: 10 сцен встык, прямые склейки, звуковой слой (музыка и эффекты ElevenLabs).
// Длины сцен — в кадрах 30 fps, рендер в 60 fps (K = 2).
// [сцена, длина, обрезка головы, обрезка хвоста] — обрезается тишина, чтобы между фразами не было пауз.
const SCENES: [React.FC, number, number, number][] = [
  [Scene1, SCENE1_LEN, 0, 4],
  [Scene2, SCENE2_LEN, 0, 0],
  [Scene3, SCENE3_LEN, 0, 0],
  [Scene4, SCENE4_LEN, 0, 4],
  [Scene5, SCENE5_LEN, 6, 6],
  [Scene6, SCENE6_LEN, 0, 0],
  [Scene7, SCENE7_LEN, 0, 0],
  [Scene8, SCENE8_LEN, 3, 7],
  [Scene9, SCENE9_LEN, 6, 6],
  [Scene10, SCENE10_LEN, 0, 0],
];
const effLen = ([, l, h, t]: (typeof SCENES)[number]) => l - h - t;

const at: number[] = [];
SCENES.reduce((acc, sc) => {
  at.push(acc);
  return acc + effLen(sc);
}, 0);

export const MONTAGE_LEN = SCENES.reduce((s, sc) => s + effLen(sc), 0);

// начало содержимого сцены (с учётом обрезанной головы) — от него считаются звуки
const c = (i: number) => at[i] - SCENES[i][2];
const STARTS: Starts = {
  s1: c(0), s2: c(1), s3: c(2), s4: c(3), s5: c(4),
  s6a: at[5] - TRIM6.a[0], s6b: at[5] + SCENE6A_EFF - TRIM6.b[0], s6c: at[5] + SCENE6A_EFF + SCENE6B_EFF - TRIM6.c[0],
  s7: c(6), s8: c(7), s9: c(8),
  s10a: c(9), s10b: c(9) + SCENE10_HANDOVER, end: MONTAGE_LEN,
};

export const Montage: React.FC = () => (
  <AbsoluteFill>
    <Series>
      {SCENES.map((sc, i) => {
        const C = sc[0];
        return (
          <Series.Sequence key={i} durationInFrames={effLen(sc) * K}>
            <Sequence from={-sc[2] * K}>
              <C />
            </Sequence>
          </Series.Sequence>
        );
      })}
    </Series>
    <Sound s={STARTS} />
  </AbsoluteFill>
);
