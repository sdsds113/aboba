import React from "react";
import { interpolate } from "remotion";
import { Prop, prop, Word } from "../components/Elements";
import { clamp, EASE, springAt, useVT } from "../lib/core";

/** Scenes 1–3 (voice −0.5 … 18.8): hang-up, "one, two, three" questions, exhale. */

const fadeOut = (t: number) => interpolate(t, [18.1, 18.6], [1, 0], { ...clamp, easing: EASE });

export const ActABack: React.FC = () => {
  const t = useVT();
  const shuffle = (a: number) => springAt(t, a, { damping: 22, stiffness: 120 });
  return (
    <div style={{ position: "absolute", inset: 0, opacity: fadeOut(t) }}>
      {/* stack of tabs behind the character, cards shuffle gently */}
      <Prop
        t={t}
        src={prop("P03_browser_tabs_stack")}
        x={1380}
        y={460}
        size={500}
        enter={10.6}
        exit={13.99}
        seed={4}
        rotate={-6 + 6 * (shuffle(11.72) - shuffle(12.1) + shuffle(12.5))}
      />
      <Prop t={t} src={prop("P01_bubble_violet")} x={560} y={330} size={210} enter={9.0} exit={13.99} seed={6} rotate={-6} />
      <Word t={t} text="пора освежить" x={1330} y={300} size={96} t0={17.3} align="center" stagger={0.025} seed={21} />
    </div>
  );
};

export const ActAFront: React.FC = () => {
  const t = useVT();
  return (
    <div style={{ position: "absolute", inset: 0, opacity: fadeOut(t) }}>
      {/* "зависаешь" — letters hang half-way, like a frozen UI */}
      <Word t={t} text="зависаешь" x={110} y={380} size={140} t0={6.98} mode="freeze" freezeAt={7.3} stagger={0.03} exit={7.75} seed={9} />
      <Prop t={t} src={prop("P02_hourglass")} x={1810} y={330} size={210} enter={6.98} exit={7.8} seed={2} rotate={interpolate(t, [6.98, 7.8], [-10, 30])} />
      {/* one, two, three */}
      <Prop t={t} src={prop("P01_bubble_red")} x={1330} y={250} size={240} enter={7.83} exit={13.99} seed={3} rotate={8} />
      <Prop t={t} src={prop("P01_bubble_red")} x={420} y={760} size={300} enter={9.68} exit={13.99} seed={8} rotate={-10} flip />
    </div>
  );
};
