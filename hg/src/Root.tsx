import React from "react";
import { Composition, Series } from "remotion";
import { BalanceCard, CareCard, GameCard, TechCard } from "./Cards";

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
    </>
  );
};
