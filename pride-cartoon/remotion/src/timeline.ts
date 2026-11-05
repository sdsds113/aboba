import timeline from "./data/timeline.json";
import offsets from "./data/offsets.json";
import available from "./data/available.json";
import { CLIP_IN_OVERRIDES } from "./config";

export const FPS: number = timeline.fps;
export const WIDTH: number = timeline.width;
export const HEIGHT: number = timeline.height;

/** секунды таймлайна → кадр */
export const f = (sec: number) => Math.round(sec * FPS);

export type Overlay = {
  type: string;
  text?: string;
  sub?: string;
  note?: string;
  in?: number;
  out?: number;
  labels?: string[];
};

export type Shot = {
  id: string;
  gen: string | null;
  src: string;
  tl_in: number;
  tl_out: number;
  dur: number;
  clip_in: number | null;
  vo: string;
  desc: string;
  overlay: Overlay | null;
};

export const SHOTS = timeline.shots as Shot[];
export const TOTAL_FRAMES = f(timeline.duration);

export const shotById = (id: string): Shot => {
  const s = SHOTS.find((x) => x.id === id);
  if (!s) throw new Error(`Нет плана ${id} в timeline.json`);
  return s;
};

/** первый кадр плана на общем таймлайне */
export const startOf = (s: Shot) => f(s.tl_in);
/** длина плана в кадрах (конец = начало следующего, без дыр) */
export const lengthOf = (s: Shot) => f(s.tl_out) - f(s.tl_in);

/** с какой секунды клипа Flow брать план (с учётом ручных правок в config.ts) */
export const clipInOf = (s: Shot) => CLIP_IN_OVERRIDES[s.id] ?? s.clip_in ?? 0;

export const hasClip = (gen: string | null) => !!gen && (available.clips as string[]).includes(gen);

/** интервалы голоса диктора (сек) — для приглушения музыки */
export const VOICE_INTERVALS: [number, number][] = Object.keys(offsets.offsets).map((k) => {
  const start = (offsets.offsets as Record<string, number>)[k];
  const len = (offsets.scene_durations as Record<string, number>)[k];
  return [start, start + len];
});
