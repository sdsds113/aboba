import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import words from "../../data/words_timing.json";
import { clamp, EASE, FONT_A, FPS, VO_OFFSET } from "../lib/core";

type Wd = { text: string; start: number; end: number };
export type Cue = { start: number; end: number; words: Wd[] };

const MAX_CHARS = 46;

/** Split the voiceover into one-line cues: break on pauses, sentence ends and length. */
export const buildCues = (): Cue[] => {
  const ws = (words as { words: Wd[] }).words;
  const cues: Cue[] = [];
  let cur: Wd[] = [];
  const flush = () => {
    if (cur.length) cues.push({ start: cur[0].start, end: cur[cur.length - 1].end, words: cur });
    cur = [];
  };
  for (let i = 0; i < ws.length; i++) {
    const w = ws[i];
    const len = cur.map((c) => c.text).join(" ").length;
    if (cur.length && len + 1 + w.text.length > MAX_CHARS) flush();
    cur.push(w);
    const next = ws[i + 1];
    const gap = next ? next.start - w.end : 1;
    const curLen = cur.map((c) => c.text).join(" ").length;
    if (/[.?!:]$/.test(w.text) && curLen > 12) flush();
    else if (gap > 0.3 && curLen > 18) flush();
  }
  flush();
  // keep each cue on screen until shortly before the next one
  for (let i = 0; i < cues.length; i++) {
    const next = cues[i + 1];
    cues[i].end = next ? Math.min(next.start - 0.04, cues[i].end + 0.6) : cues[i].end + 0.8;
  }
  return cues;
};

const CUES = buildCues();

/** Burned-in captions: words light up as they are spoken; no boxes, just a soft shadow. */
export const Subtitles: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS - VO_OFFSET;
  const cue = CUES.find((c) => t >= c.start - 0.08 && t <= c.end);
  if (!cue) return null;
  const inP = interpolate(t, [cue.start - 0.08, cue.start + 0.12], [0, 1], { ...clamp, easing: EASE });
  const outP = interpolate(t, [cue.end - 0.12, cue.end], [0, 1], clamp);
  const tokens = cue.words.map((w) => w.text);
  const starts = cue.words.map((w) => w.start);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 48,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        opacity: inP * (1 - outP),
        translate: `0 ${(1 - inP) * 6}px`,
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          textAlign: "center",
          fontFamily: FONT_A,
          fontWeight: 700,
          fontSize: 40,
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
          color: "#fff",
          background: "rgba(11,11,14,.8)",
          padding: "12px 28px 14px",
          borderRadius: 16,
          boxShadow: "0 10px 30px rgba(0,0,0,.35)",
        }}
      >
        {tokens.map((tok, i) => {
          const lit = interpolate(t, [starts[i] - 0.02, starts[i] + 0.12], [0.55, 1], clamp);
          return (
            <span key={i} style={{ opacity: lit }}>
              {tok}
              {i < tokens.length - 1 ? " " : ""}
            </span>
          );
        })}
      </div>
    </div>
  );
};
