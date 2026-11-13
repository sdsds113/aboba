import voData from "./vo.json";
import { FPS } from "./theme";

type Word = { w: string; s: number; e: number };
type Sent = { start: number; end: number; words: Word[] };
export const VO = voData as Sent[];

// Когда в ролике начинается каждая фраза диктора (секунды).
// Между смысловыми блоками паузы, чтобы картинка успевала «дышать».
export const PLACE = [1.0, 5.4, 14.6, 26.6, 35.6, 44.4, 56.8, 65.2, 71.6, 83.2, 93.0, 99.6, 105.0];

// Сцены: [начало, конец] в секундах. Соседние перекрываются на 0,3 с (кроссфейд).
export const SCENES = {
  intro: [0, 5.0],
  context: [4.7, 13.6],
  fl: [13.3, 34.6],
  hover: [34.3, 42.6],
  yl: [42.3, 81.6],
  imsi: [81.3, 92.2],
  sw: [91.9, 104.4],
  links: [104.1, 109.6],
  outro: [109.3, 114.0],
} as const;

export type SceneId = keyof typeof SCENES;

export const TOTAL = Math.round(SCENES.outro[1] * FPS);

export const sceneFrom = (id: SceneId) => Math.round(SCENES[id][0] * FPS);
export const sceneDur = (id: SceneId) => Math.round((SCENES[id][1] - SCENES[id][0]) * FPS);

// Кадр (абсолютный), на котором диктор произносит слово в фразе i
export const wordAt = (i: number, word: string, nth = 0): number => {
  const sent = VO[i];
  const hits = sent.words.filter((w) => w.w.startsWith(word));
  const w = hits[nth];
  if (!w) throw new Error(`Слово «${word}» (#${nth}) не найдено во фразе ${i}`);
  return Math.round((PLACE[i] + (w.s - sent.start)) * FPS);
};

// То же, но относительно начала сцены
export const wordIn = (id: SceneId, i: number, word: string, nth = 0) => wordAt(i, word, nth) - sceneFrom(id);
export const sentIn = (id: SceneId, i: number) => Math.round(PLACE[i] * FPS) - sceneFrom(id);
export const sentEndIn = (id: SceneId, i: number) =>
  Math.round((PLACE[i] + VO[i].end - VO[i].start) * FPS) - sceneFrom(id);
