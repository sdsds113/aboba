// Всё, что может понадобиться подкрутить руками, — здесь.

/** Ручная правка точки входа в клип Flow (сек), если нужный момент в клипе оказался не там: { "S03-02": 0.6 } */
export const CLIP_IN_OVERRIDES: Record<string, number> = {};

/** Имена и роли для плашек. Заглушки — заменить на реальные. */
export const PEOPLE: Record<string, { name: string; role: string }> = {
  BOSS: { name: "Имя Фамилия", role: "Руководитель" },
  GLASSES: { name: "Имя Фамилия", role: "Департамент" },
  VEST: { name: "Имя Фамилия", role: "Департамент" },
  SMILE: { name: "Имя Фамилия", role: "Департамент" },
  BLONDE: { name: "Имя Фамилия", role: "Департамент" },
  BEARD: { name: "Имя Фамилия", role: "Департамент" },
  ROUND: { name: "Имя Фамилия", role: "Департамент" },
  SPEAKER: { name: "Имя Фамилия", role: "Департамент" },
  BALD: { name: "Имя Фамилия", role: "Департамент" },
};

/** Плашки с именами отключены по просьбе заказчика. Чтобы вернуть: { "S02-03": ["BOSS"], ... } */
export const LOWER_THIRDS: Record<string, string[]> = {};

/** Название в начале (S01-01). null — не показывать */
export const OPENING_TITLE: string | null = null;

/** Финальная плашка */
export const END_CARD = { title: "С днём рождения!", subtitle: "Твоя команда" };

/** Календарь S06-01: годы до/после */
export const CALENDAR = { from: "2025", to: "2026", tearAt: 0.45 };

/** Звезда S07-10: следует за звездой в клипе G18 (камера наклоняется). track: [сек от начала плана, y px] */
export const STAR = {
  x: 1252,
  track: [[0, 64], [0.6, 96], [1.2, 121], [1.8, 136], [2.2, 140]] as [number, number][],
  size: 240,
  appearAt: 0.2,
};

/** Гирлянда: на каких планах висит */
export const STRING_LIGHTS_SHOTS = [
  "S08-02", "S08-03", "S08-04", "S08-05", "S08-08", "S08-09", "S09-02", "S09-03", "S09-04", "S09-05",
];

/** Звуковые эффекты: включены; групповой смех убран по просьбе заказчика */
export const SFX_ENABLED = false; // только голос и музыка, без шумов (решение заказчика)
export const SFX_EXCLUDE: string[] = ["group_laugh"];

/** Единый «кинолук» поверх клипов */
export const LOOK = {
  filter: "saturate(1.05) contrast(1.03)",
  vignette: 0.32,
  grain: 0.05,
};
