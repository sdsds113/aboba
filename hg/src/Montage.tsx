import React from "react";
import { Series } from "remotion";
import { SCENE1_LEN, Scene1 } from "./Scene1";
import { SCENE2_LEN, Scene2 } from "./Scene2";
import { SCENE3_LEN, Scene3 } from "./Scene3";
import { SCENE4_LEN, Scene4 } from "./Scene4";
import { SCENE5_LEN, Scene5 } from "./Scene5";
import { SCENE6_LEN, Scene6 } from "./Scene6";
import { SCENE7_LEN, Scene7 } from "./Scene7";
import { SCENE8_LEN, Scene8 } from "./Scene8";
import { SCENE9_LEN, Scene9 } from "./Scene9";
import { SCENE10_LEN, Scene10 } from "./Scene10";

// Полный ролик: 10 сцен встык, прямые склейки. Шрифт Styrene B (см. premium.tsx).
export const MONTAGE_SCENES: [React.FC, number][] = [
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

export const MONTAGE_LEN = MONTAGE_SCENES.reduce((s, [, l]) => s + l, 0);

export const Montage: React.FC = () => (
  <Series>
    {MONTAGE_SCENES.map(([C, len], i) => (
      <Series.Sequence key={i} durationInFrames={len}>
        <C />
      </Series.Sequence>
    ))}
  </Series>
);
