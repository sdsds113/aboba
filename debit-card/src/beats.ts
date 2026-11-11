// Сетка долей музыки: 120 ударов в минуту, доли на каждые 0,5 с видео.
// Сильная доля раз в секунду (0,5; 1,5; 2,5 …), слабая между ними.
import { LEAD_IN } from "./timeline";

export const BEAT = 0.5;

const mod1 = (v: number) => v - Math.floor(v);

// Импульс 1 → 0 после каждой доли. На вход время озвучки (с).
export const beatPulse = (voT: number) => {
  const vt = voT + LEAD_IN;
  const strong = Math.exp(-mod1(vt - 0.5) * 7);
  const weak = 0.35 * Math.exp(-mod1(vt) * 7);
  return Math.min(1, strong + weak);
};
