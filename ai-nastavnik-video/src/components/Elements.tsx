import React from "react";
import { Img, interpolate, staticFile } from "remotion";
import { noise2D } from "@remotion/noise";
import {
  C,
  clamp,
  EASE,
  EASE_IN,
  float,
  FONT_A,
  hexA,
  Hue,
  springAt,
} from "../lib/core";

export const STICKERS = {
  E01: "E01_tired_rubbing_forehead",
  E02: "E02_frozen",
  E03: "E03_overwhelmed_looking_around",
  E04: "E04_scratching_head",
  E05: "E05_relaxed_shrug",
  E06: "E06_surprised_looking_up",
  E07: "E07_bored",
  E08: "E08_idea_finger_up",
  E09: "E09_presenting_open_palm",
  E10: "E10_flex_dumbbell",
  E11: "E11_thumbs_up",
  E12: "E12_pointing_side",
  E13: "E13_tea_mug",
  E14: "E14_fist_pump",
  E15: "E15_amazed_wow",
  E16: "E16_phone_chatting",
  E17: "E17_watch_wink",
  E18: "E18_pointing_up",
  E19: "E19_tap_click",
  E20: "E20_hand_on_chest",
  E21: "E21_pointing_at_viewer",
  E22: "E22_chill_hands_behind_head",
  E23: "E23_wink_thumbs_up",
} as const;
export type StickerId = keyof typeof STICKERS;

export const sticker = (id: StickerId) =>
  staticFile(`assets/stickers/${STICKERS[id]}.png`);
export const prop = (name: string) => staticFile(`assets/props/${name}.png`);
export const fx = (name: string) => staticFile(`assets/fx/${name}.png`);

/** Small paint droplets bursting outward from a point. */
export const Droplets: React.FC<{
  t: number;
  t0: number;
  x: number;
  y: number;
  color: string;
  count?: number;
  spread?: number;
  seed?: number;
  size?: number;
}> = ({ t, t0, x, y, color, count = 5, spread = 160, seed = 1, size = 18 }) => {
  const dt = t - t0;
  if (dt < 0 || dt > 0.9) return null;
  const p = interpolate(dt, [0, 0.7], [0, 1], { ...clamp, easing: EASE });
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const a = ((i + noise2D(`d${seed}`, i, 0) * 0.6) / count) * Math.PI * 2 - Math.PI / 2;
        const dist = spread * (0.6 + 0.5 * Math.abs(noise2D(`e${seed}`, i, 1)));
        const s = size * (0.5 + Math.abs(noise2D(`f${seed}`, i, 2)));
        const gx = Math.cos(a) * dist * p;
        const gy = Math.sin(a) * dist * p + 120 * dt * dt;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + gx - s / 2,
              top: y + gy - s / 2,
              width: s,
              height: s * 1.15,
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              background: color,
              opacity: interpolate(dt, [0, 0.05, 0.6, 0.9], [0, 1, 1, 0], clamp),
              scale: interpolate(dt, [0, 0.9], [1, 0.4], clamp),
              filter: "blur(0.5px)",
            }}
          />
        );
      })}
    </>
  );
};

/**
 * Character sticker. Bottom-anchored. Swaps emotions with a squash-pop + droplets.
 * timeline: [[voiceTime, stickerId], ...] ascending.
 */
export const Character: React.FC<{
  t: number;
  timeline: [number, StickerId][];
  x: number;
  /** y of the sticker's bottom edge */
  bottom?: number;
  height: number;
  enter?: number;
  exit?: number;
  mirror?: boolean;
  hue?: Hue;
  glow?: number;
  /** enter direction */
  from?: "below" | "focus";
  blur?: number;
  rotate?: number;
  opacity?: number;
}> = ({
  t,
  timeline,
  x,
  bottom = 1080,
  height,
  enter,
  exit,
  mirror,
  hue = "red",
  glow = 0.32,
  from = "below",
  blur = 0,
  rotate = 0,
  opacity = 1,
}) => {
  let idx = 0;
  for (let i = 0; i < timeline.length; i++) if (timeline[i][0] <= t) idx = i;
  const [tSwap, id] = timeline[idx];
  const width = (height * 1024) / 1536;
  const swapDt = t - tSwap;
  const isFirst = idx === 0;
  const pop = isFirst ? 1 : springAt(t, tSwap, { damping: 20, stiffness: 160 });
  const squash = false;
  const sX = squash ? 1 : 0.985 + 0.015 * pop;
  const sY = squash ? 1 : 0.985 + 0.015 * pop;
  const bright = isFirst ? 1 : interpolate(swapDt, [0, 0.2], [1.06, 1], clamp);

  const e = enter === undefined ? 1 : springAt(t, enter, { damping: 26, stiffness: 70 });
  const xOut = exit === undefined ? 0 : interpolate(t, [exit, exit + 0.5], [0, 1], { ...clamp, easing: EASE_IN });
  const enterY = from === "below" ? (1 - e) * height * 0.75 : 0;
  const enterScale = from === "focus" ? 0.85 + 0.15 * e : 1;
  const enterBlur = (1 - Math.min(1, e)) * 16;
  const breath = Math.sin(t * 1.9) * 0.006;
  const sway = float(t, 7, 3, 6);
  const color = C[hue];
  return (
    <div
      style={{
        position: "absolute",
        left: x - width / 2,
        top: bottom - height,
        width,
        height,
        translate: `${sway.x}px ${enterY + sway.y * 0.5 + xOut * height * 0.8}px`,
        rotate: `${rotate + sway.r * 0.3}deg`,
        transformOrigin: "50% 100%",
        opacity: opacity * (from === "focus" ? Math.min(1, e * 1.5) : 1),
      }}
    >
      <Img
        src={sticker(id)}
        style={{
          width: "100%",
          height: "100%",
          scale: `${(mirror ? -1 : 1) * sX * enterScale * (1 + breath)} ${sY * enterScale * (1 + breath)}`,
          transformOrigin: "50% 100%",
          filter: `brightness(${bright}) drop-shadow(0 0 28px rgba(0,0,0,.55)) drop-shadow(0 0 60px ${hexA(color, glow)}) blur(${enterBlur + blur}px)`,
        }}
      />
      {false && !isFirst ? (
        <Droplets
          t={t}
          t0={tSwap}
          x={width * 0.5}
          y={height * 0.28}
          color={color}
          count={5}
          spread={width * 0.55}
          seed={idx * 7 + 3}
          size={height * 0.018}
        />
      ) : null}
    </div>
  );
};

/** A floating 3D prop that focuses in from depth and can leave in several ways. */
export const Prop: React.FC<{
  t: number;
  src: string;
  x: number;
  y: number;
  size: number;
  enter: number;
  exit?: number;
  exitStyle?: "fall" | "focusOut" | "pastCamera" | "shrink";
  seed?: number;
  rotate?: number;
  blur?: number;
  amp?: number;
  flip?: boolean;
  opacity?: number;
  enterStyle?: "focus" | "pop" | "drop";
  style?: React.CSSProperties;
}> = ({
  t,
  src,
  x,
  y,
  size,
  enter,
  exit,
  exitStyle = "focusOut",
  seed = 1,
  rotate = 0,
  blur = 0,
  amp = 6,
  flip,
  opacity = 1,
  enterStyle = "focus",
  style,
}) => {
  if (t < enter - 0.05) return null;
  const e = springAt(t, enter, { damping: 26, stiffness: 70 });
  const x0 = exit === undefined ? 0 : interpolate(t, [exit, exit + 0.6], [0, 1], { ...clamp, easing: EASE });
  if (x0 >= 1) return null;
  const f = float(t, seed, amp, 3.8 + (seed % 3) * 0.7);
  let sc = enterStyle === "drop" ? 1 : 0.82 + 0.18 * e;
  let bl = blur + (1 - Math.min(1, e)) * 10;
  let op = Math.min(1, e * 1.6) * opacity;
  let dx = 0;
  let dy = enterStyle === "drop" ? -(1 - e) * 260 : 0;
  let rot = rotate + f.r + (enterStyle === "drop" ? (1 - e) * 12 : 0);
  if (exitStyle === "focusOut") {
    sc *= 1 - 0.25 * x0;
    bl += 20 * x0;
    op *= 1 - x0;
  } else if (exitStyle === "fall") {
    dy += 120 * x0;
    op *= 1 - x0;
    bl += 10 * x0;
  } else if (exitStyle === "pastCamera") {
    sc *= 1 + 0.2 * x0;
    bl += 14 * x0;
    op *= 1 - x0;
  } else if (exitStyle === "shrink") {
    sc *= 1 - 0.3 * x0;
    op *= 1 - x0;
    bl += 8 * x0;
  }
  return (
    <Img
      src={src}
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        translate: `${f.x + dx}px ${f.y + dy}px`,
        rotate: `${rot}deg`,
        scale: `${flip ? -sc : sc} ${sc}`,
        filter: `blur(${bl}px) drop-shadow(0 24px 30px rgba(0,0,0,.45))`,
        opacity: op,
        ...style,
      }}
    />
  );
};

type WordMode = "rise" | "drop" | "freeze" | "slam" | "buoy";

/**
 * Kinetic word, split into letters. Extra behaviours:
 * stretchAt — word stretches horizontally; droopAt — letters sag and turn grey;
 * freeze — letters stop half-way like a hung UI.
 */
export const Word: React.FC<{
  t: number;
  text: string;
  x: number;
  y: number;
  size: number;
  t0: number;
  exit?: number;
  mode?: WordMode;
  color?: string;
  weight?: number;
  align?: "left" | "center" | "right";
  stagger?: number;
  freezeAt?: number;
  stretchAt?: number;
  droopAt?: number;
  seed?: number;
  style?: React.CSSProperties;
  exitStyle?: "fall" | "fade" | "suck";
}> = ({
  t,
  text,
  x,
  y,
  size,
  t0,
  exit,
  mode = "rise",
  color = C.white,
  weight = 900,
  align = "left",
  stagger = 0.035,
  freezeAt,
  stretchAt,
  droopAt,
  seed = 5,
  style,
  exitStyle = "fade",
}) => {
  if (t < t0 - 0.05) return null;
  const letters = Array.from(text);
  const xo = exit === undefined ? 0 : interpolate(t, [exit, exit + 0.5], [0, 1], { ...clamp, easing: EASE });
  if (xo >= 1) return null;
  const stretch = stretchAt === undefined ? 0 : interpolate(t, [stretchAt, stretchAt + 1.3], [0, 1], { ...clamp, easing: EASE });
  const droop = droopAt === undefined ? 0 : interpolate(t, [droopAt, droopAt + 0.9], [0, 1], { ...clamp, easing: EASE });
  const flt = float(t, seed, 2, 6);
  const anchor = align === "left" ? "0%" : align === "center" ? "-50%" : "-100%";
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        translate: `${anchor} ${flt.y}px`,
        fontFamily: FONT_A,
        fontWeight: weight,
        fontSize: size,
        lineHeight: 0.9,
        letterSpacing: "-0.03em",
        color,
        whiteSpace: "pre",
        scale: `${1 + stretch * 0.55} 1`,
        transformOrigin: align === "left" ? "0% 50%" : "50% 50%",
        opacity: exitStyle === "fade" ? 1 - xo : 1,
        filter: exitStyle === "fade" ? `blur(${xo * 14}px)` : undefined,
        ...style,
      }}
    >
      {letters.map((ch, i) => {
        const ti = t0 + i * stagger;
        const rnd = noise2D(`k${seed}`, i, 0);
        let p: number;
        p = springAt(t, ti, { damping: 26, stiffness: mode === "freeze" ? 110 : 90 });
        let ty = 0;
        let rot = 0;
        let sc = 1;
        if (mode === "slam") {
          ty = (1 - p) * size * 0.3;
        } else if (mode === "drop") {
          ty = (1 - p) * size * 0.3;
        } else if (mode === "freeze") {
          const stuck = 0.35 + 0.55 * Math.abs(rnd);
          const pf = freezeAt !== undefined && t >= freezeAt ? Math.min(p, stuck) : p;
          ty = -(1 - pf) * size * 0.7;
          rot = freezeAt !== undefined && t >= freezeAt ? rnd * 6 : 0;
        } else if (mode === "rise") {
          ty = (1 - p) * size * 0.3;
        }
        if (mode === "buoy") {
          ty = (1 - p) * size * 0.3 + Math.sin(t * 1.6 + i * 0.7) * size * 0.025;
          rot = Math.sin(t * 1.2 + i * 0.9) * 1.5;
        }
        if (droop > 0) {
          ty += droop * size * (0.08 + 0.18 * Math.abs(rnd));
          rot += droop * rnd * 14;
        }
        if (exitStyle === "fall" && xo > 0) {
          ty += xo * size * 0.4;
        }
        const op = Math.min(1, p * 1.3) * (exitStyle === "fall" ? 1 - xo : 1);
        const bl = (1 - Math.min(1, p)) * 8;
        const col = droop > 0 ? mix(color, "#5A5A60", droop) : color;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              translate: `0 ${ty}px`,
              rotate: `${rot}deg`,
              scale: sc,
              opacity: op,
              filter: bl > 0.2 ? `blur(${bl}px)` : undefined,
              color: col,
            }}
          >
            {ch}
          </span>
        );
      })}
    </div>
  );
};

const mix = (a: string, b: string, p: number) => {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  const c = pa.map((v, i) => Math.round(v + (pb[i] - v) * p));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
};
