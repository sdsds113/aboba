import React from "react";
import { interpolate } from "remotion";
import { BlobField } from "../components/Blobs";
import { Prop, prop, Word } from "../components/Elements";
import { C, clamp, EASE, EASE_IN, keyframes, ramp, springAt, useVT } from "../lib/core";

/**
 * Scenes 1–3 (voice −0.5 … 18.6): hang-up, "one, two, three" questions, exhale + first blue.
 * Back layer = blobs and props behind the character.
 */

const tilt = (t: number) => interpolate(t, [18.2, 18.75], [0, 1], { ...clamp, easing: EASE_IN });

export const ActABack: React.FC = () => {
  const t = useVT();
  const out = tilt(t);
  // the main red pool follows the character
  const pos = keyframes(t, [
    { t: -0.5, x: 1090, y: 330, r: 360 },
    { t: 7.6, x: 1090, y: 330, r: 360 },
    { t: 8.3, x: 830, y: 420, r: 290 },
    { t: 13.9, x: 830, y: 420, r: 290 },
    { t: 14.6, x: 430, y: 380, r: 330 },
  ]);
  const grow = springAt(t, 0.02, { damping: 13, stiffness: 70 });
  const pulse = Math.exp(-Math.pow((t - 15.75) / 0.18, 2)) * 0.1;
  const dropY = interpolate(t, [-0.5, 0.05], [-160, 560], { ...clamp, easing: EASE_IN });
  const blue = springAt(t, 17.2, { damping: 14, stiffness: 80 });
  const blueX = interpolate(blue, [0, 1], [2250, 1330]);
  const camPush = interpolate(t, [1.36, 6.9], [1, 1.06], { ...clamp, easing: EASE }) * interpolate(t, [7.6, 8.4], [1, 1 / 1.06], { ...clamp, easing: EASE });
  return (
    <div style={{ position: "absolute", inset: 0, scale: camPush, translate: `0 ${out * 900}px`, filter: out > 0 ? `blur(${out * 14}px)` : undefined }}>
      {/* far, blurred pools */}
      <BlobField
        id="a-far"
        t={t}
        blur={36}
        opacity={0.85}
        blobs={[
          { x: 330 + Math.sin(t / 3) * 30, y: 290, r: 170, color: C.red, seed: 11, wobble: 0.22 },
          { x: 560, y: 860, r: 110, color: C.red, seed: 12, wobble: 0.25 },
          { x: 1720, y: 170, r: 90, color: C.red, seed: 13, wobble: 0.25, opacity: ramp(t, 8, 9) },
        ]}
      />
      {/* main pool + the drop that creates it */}
      <BlobField
        id="a-main"
        t={t}
        goo={20}
        blobs={[
          { x: pos.x, y: Math.min(dropY, pos.y), r: t < 0.1 ? 46 : 46 * (1 - grow), sy: 1.25, color: C.red, seed: 1, wobble: 0.05 },
          { x: pos.x, y: pos.y, r: pos.r * grow * (1 + pulse), color: C.red, seed: 2, wobble: 0.16 + (1 - Math.min(1, grow)) * 0.2 },
          { x: pos.x + 330, y: pos.y + 300, r: 64 * grow, color: C.red, seed: 3, wobble: 0.3 },
          { x: blueX, y: 470, r: 380 * blue, color: C.blue, seed: 4, wobble: 0.2 },
        ]}
      />
      {/* stack of tabs fans out behind the character */}
      <Prop
        t={t}
        src={prop("P03_browser_tabs_stack")}
        x={1360}
        y={470}
        size={520}
        enter={10.6}
        exit={13.99}
        exitStyle="fall"
        seed={4}
        rotate={
          -8 +
          12 * (springAt(t, 11.72, { damping: 9, stiffness: 200 }) - springAt(t, 12.1, { damping: 9, stiffness: 200 }) + springAt(t, 12.5, { damping: 9, stiffness: 200 })) / 1.3
        }
      />
      {/* far "second" question */}
      <Prop t={t} src={prop("P01_bubble_violet")} x={560} y={330} size={210} enter={9.0} exit={13.99} exitStyle="fall" seed={6} blur={5} enterStyle="pop" rotate={-6} />
      {/* "пора освежить" on the blue pool */}
      <Word t={t} text="пора" x={1330} y={330} size={120} t0={17.3} color={C.ink} align="center" mode="rise" seed={21} />
      <Word t={t} text="освежить" x={1330} y={450} size={120} t0={17.55} color={C.ink} align="center" mode="rise" stagger={0.04} seed={22} />
    </div>
  );
};

export const ActAFront: React.FC = () => {
  const t = useVT();
  const out = tilt(t);
  return (
    <div style={{ position: "absolute", inset: 0, translate: `0 ${out * 900}px`, filter: out > 0 ? `blur(${out * 14}px)` : undefined }}>
      {/* "зависаешь" — letters hang half-way */}
      <Word t={t} text="зависаешь" x={90} y={380} size={150} t0={6.98} mode="freeze" freezeAt={7.33} stagger={0.03} exit={7.75} exitStyle="fall" seed={9} />
      <Prop t={t} src={prop("P02_hourglass")} x={1580} y={300} size={250} enter={6.98} exit={7.8} seed={2} rotate={interpolate(t, [6.98, 7.8], [-20, 160])} />
      {/* one, two, three */}
      <Prop t={t} src={prop("P01_bubble_red")} x={1330} y={250} size={250} enter={7.83} exit={13.99} exitStyle="fall" seed={3} enterStyle="pop" rotate={8} />
      <Prop t={t} src={prop("P01_bubble_red")} x={330} y={800} size={470} enter={9.68} exit={13.99} exitStyle="fall" seed={8} blur={12} enterStyle="pop" rotate={-10} flip />
    </div>
  );
};
