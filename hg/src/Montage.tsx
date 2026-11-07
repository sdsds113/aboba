import React from "react";
import { Series } from "remotion";
import { SCENE1_LEN, Scene1 } from "./Scene1";
import { SCENE2_LEN, Scene2 } from "./Scene2";
import { SCENE3_LEN, Scene3 } from "./Scene3";

// Черновая склейка готовых сцен в новом стиле. Прямые склейки встык фраз.
export const MONTAGE_SCENES: [React.FC, number][] = [
  [Scene1, SCENE1_LEN],
  [Scene2, SCENE2_LEN],
  [Scene3, SCENE3_LEN],
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
