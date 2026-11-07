import React from "react";
import { Composition, Series } from "remotion";
import { BalanceCard, CareCard, GameCard, TechCard } from "./Cards";
import { SCENE4_LEN, Scene4 } from "./Scene4";
import { SCENE1_LEN, Scene1 } from "./Scene1";
import { SCENE2_LEN, Scene2 } from "./Scene2";
import { SCENE3_LEN, Scene3 } from "./Scene3";

const FPS = 30;
const LEN = 7 * FPS; // 7 s each; trim in the edit to match the voice

const AllCards: React.FC = () => (
  <Series>
    <Series.Sequence durationInFrames={LEN}>
      <BalanceCard />
    </Series.Sequence>
    <Series.Sequence durationInFrames={LEN}>
      <TechCard />
    </Series.Sequence>
    <Series.Sequence durationInFrames={LEN}>
      <GameCard />
    </Series.Sequence>
    <Series.Sequence durationInFrames={LEN}>
      <CareCard />
    </Series.Sequence>
  </Series>
);

export const RemotionRoot: React.FC = () => {
  const common = { fps: FPS, width: 1920, height: 1080, durationInFrames: LEN };
  return (
    <>
      <Composition id="B1-Balans" component={BalanceCard} {...common} />
      <Composition id="B2-Tehnologii" component={TechCard} {...common} />
      <Composition id="B3-Azart" component={GameCard} {...common} />
      <Composition id="B4-Zabota" component={CareCard} {...common} />
      <Composition id="AllCards" component={AllCards} {...common} durationInFrames={LEN * 4} />
      <Composition id="Scene1-Znakomstvo" component={Scene1} {...common} durationInFrames={SCENE1_LEN} />
      <Composition id="Scene2-Vzyskanie" component={Scene2} {...common} durationInFrames={SCENE2_LEN} />
      <Composition id="Scene3-Balans" component={Scene3} {...common} durationInFrames={SCENE3_LEN} />
      <Composition id="Scene4-Missiya" component={Scene4} {...common} durationInFrames={SCENE4_LEN} />
    </>
  );
};
