import voData from "./vo.json";
import { FPS } from "./theme";

type Word = { w: string; s: number; e: number };
type Sent = { start: number; end: number; words: Word[] };
export const VO = voData as Sent[];

// Голос (public/vo/voice.wav) стартует сразу после заставки
export const VO_AT = 3.0;
export const INTRO_DUR = 3.2;

const sec = (i: number, word?: string, nth = 0) => {
  const s = VO[i];
  if (!word) return VO_AT + s.start;
  const hits = s.words.filter((w) => w.w.startsWith(word));
  const w = hits[nth];
  if (!w) throw new Error(`Слово «${word}» (#${nth}) не найдено во фразе ${i}`);
  return VO_AT + w.s;
};
const endSec = (i: number) => VO_AT + VO[i].end;

// Абсолютный кадр слова
export const wordAt = (i: number, word?: string, nth = 0) => Math.round(sec(i, word, nth) * FPS);
export const sentEndAt = (i: number) => Math.round(endSec(i) * FPS);

// Сцены (секунды). Соседние перекрываются на 0,3 с: кроссфейд без чёрных кадров.
const X = 0.3;
const b = {
  context: sec(0) - 0.25,
  fl: sec(2) - 0.4,
  hover: sec(5) - 0.35,
  yl: sec(6) - 0.4,
  imsi: sec(11) - 0.4,
  sw: sec(13) - 0.4,
  links: sec(16, "а") - 0.25,
  outro: endSec(16) + 0.45,
};
export const TOTAL_SEC = b.outro + 3.9;

export const SCENES = {
  intro: [0, INTRO_DUR],
  context: [b.context, b.fl + X],
  fl: [b.fl, b.hover + X],
  hover: [b.hover, b.yl + X],
  yl: [b.yl, b.imsi + X],
  imsi: [b.imsi, b.sw + X],
  sw: [b.sw, b.links + X],
  links: [b.links, b.outro + X],
  outro: [b.outro, TOTAL_SEC],
} as const;

export type SceneId = keyof typeof SCENES;
export const TOTAL = Math.round(TOTAL_SEC * FPS);
export const sceneFrom = (id: SceneId) => Math.round(SCENES[id][0] * FPS);
export const sceneDur = (id: SceneId) => Math.round((SCENES[id][1] - SCENES[id][0]) * FPS);

// Хелперы «относительно начала сцены»
export const at = (id: SceneId) => {
  const s0 = sceneFrom(id);
  return {
    w: (i: number, word?: string, nth = 0) => wordAt(i, word, nth) - s0,
    end: (i: number) => sentEndAt(i) - s0,
  };
};
