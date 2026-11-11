// Таймлайн ролика «Первая карта». Все времена в секундах по озвучке vo.m4a
// (сжатая версия, 2:14). В композиции к ним прибавляется LEAD_IN.

export const FPS = 60;
export const INTRO_S = 3.5; // заставка «Твоя первая карта»
export const LEAD_IN = INTRO_S + 0.5; // заставка + пауза перед первой фразой
export const VO_END = 134.66;
export const TAIL = 6.34; // финальная плашка, ролик кончается вместе с музыкой (145,0 с)
export const DURATION_S = LEAD_IN + VO_END + TAIL;

export type Bg = "red" | "violet" | "light";

export type Scene = {
  start: number;
  end: number;
  bg: Bg;
  max: string; // файл персонажа в public/char
};

// Смена фона и эмоции Макса
export const SCENES: Scene[] = [
  { start: 0.0, end: 9.5, bg: "red", max: "max_01_hello" },
  { start: 9.5, end: 28.0, bg: "light", max: "max_02_explain" },
  { start: 28.0, end: 44.0, bg: "violet", max: "max_03_skeptic" },
  { start: 44.0, end: 51.0, bg: "light", max: "max_04_phone" },
  { start: 51.0, end: 55.0, bg: "light", max: "max_05_shrug" },
  { start: 55.0, end: 63.5, bg: "light", max: "max_04_phone" },
  { start: 63.5, end: 67.5, bg: "red", max: "max_06_wow" },
  { start: 67.5, end: 78.5, bg: "violet", max: "max_06_wow" },
  { start: 78.5, end: 90.5, bg: "light", max: "max_06_wow" },
  { start: 90.5, end: 108.0, bg: "violet", max: "max_07_dream" },
  { start: 108.0, end: 127.0, bg: "red", max: "max_08_secret" },
  { start: 127.0, end: VO_END + TAIL, bg: "light", max: "max_09_bye" },
];

// Заголовки-плашки слева сверху
export type Title = { t: number; text: string };
export const TITLES: Title[] = [
  { t: 0.25, text: "Твоя первая карта" },
  { t: 9.82, text: "Прошлый выпуск: счета" },
  { t: 14.66, text: "Главное правило" },
  { t: 17.36, text: "Карта не деньги, а ключ к счёту" },
  { t: 21.58, text: "Смартфон и карта: пульт от счёта" },
  { t: 28.0, text: "Наличка против карты" },
  { t: 30.98, text: "В чём проблема налички" },
  { t: 38.32, text: "Онлайн наличкой не заплатишь" },
  { t: 44.0, text: "Как работает карта" },
  { t: 45.48, text: "Баланс всегда под рукой" },
  { t: 49.32, text: "И это безопасно" },
  { t: 51.32, text: "Потерял купюру? Прощай" },
  { t: 55.06, text: "Потерял карту? Блок в один тап" },
  { t: 61.0, text: "Деньги целы на счёте" },
  { t: 63.6, text: "Три крутых плюса" },
  { t: 67.34, text: "Плюс 1: дизайн под себя" },
  { t: 78.78, text: "Плюс 2: кэшбэк" },
  { t: 87.94, text: "Бонус за обычные траты" },
  { t: 90.82, text: "Плюс 3: цели и автокопилки" },
  { t: 100.84, text: "Копится само, понемногу" },
  { t: 108.08, text: "Правило безопасности" },
  { t: 115.42, text: "Это твой пароль от счёта" },
  { t: 117.9, text: "Никому не сообщай" },
  { t: 126.94, text: "Основа финансовой грамотности" },
  { t: 132.02, text: "Пользуйся с умом" },
];

// Элементы. x, y, size в пикселях кадра 1920×1080 (квадрат картинки).
// in/out в секундах озвучки. from: откуда въезжает.
export type El = {
  id: string;
  src?: string; // файл в public/el
  text?: string; // текстовая пилюля вместо картинки
  x: number;
  y: number;
  size: number;
  in: number;
  out: number;
  from?: "bottom" | "top" | "left" | "right" | "pop";
  exit?: "fade" | "flyUp";
  rot?: number;
  sfx?: string;
  dim?: boolean;
};

export const ELEMENTS: El[] = [
  // 1. Вступление
  { id: "card", src: "el_01_card", x: 150, y: 250, size: 640, in: 0.18, out: 9.39, from: "bottom", rot: -6, sfx: "whoosh_soft" },
  { id: "spark1", src: "el_02_sparkles", x: 620, y: 200, size: 300, in: 1.66, out: 9.39, from: "pop", sfx: "sparkle" },
  { id: "p1", text: "Как устроена", x: 96, y: 860, size: 0, in: 4.02, out: 9.39, from: "pop", sfx: "pop_soft" },
  { id: "p2", text: "Зачем нужна", x: 436, y: 860, size: 0, in: 5.12, out: 9.39, from: "pop", sfx: "pop_soft_2" },
  { id: "p3", text: "Чем удобнее", x: 770, y: 860, size: 0, in: 6.08, out: 9.39, from: "pop", sfx: "pop_soft" },

  // 2. Счета и карта-ключ
  { id: "safe", src: "el_03_safe", x: 90, y: 330, size: 500, in: 11.12, out: 27.74, from: "bottom", sfx: "whoosh_slide" },
  { id: "piggy", src: "el_05_piggy", x: 560, y: 380, size: 420, in: 11.82, out: 16.95, from: "pop", rot: 4, sfx: "pop_soft" },
  { id: "key", src: "el_04_key", x: 560, y: 300, size: 440, in: 19.09, out: 23.68, from: "right", rot: -8, sfx: "whoosh_slide" },
  { id: "remote", src: "el_06_remote", x: 540, y: 330, size: 480, in: 24.02, out: 27.74, from: "pop", sfx: "notification" },

  // 3. Наличка
  { id: "cash", src: "el_07_cash_crumpled", x: 90, y: 330, size: 440, in: 33.72, out: 38.25, from: "top", rot: -5, sfx: "paper_crumple" },
  { id: "coins", src: "el_08_coins_fall", x: 520, y: 230, size: 380, in: 35.9, out: 38.25, from: "top", sfx: "pocket_coins" },
  { id: "pocket", src: "el_09_pocket", x: 560, y: 560, size: 400, in: 37.14, out: 38.25, from: "bottom" },
  { id: "icons", src: "el_10_cart_fail", x: 90, y: 230, size: 520, in: 40.0, out: 43.71, from: "pop", sfx: "pop_soft" },
  { id: "nocash", src: "el_11_no_cash", x: 560, y: 420, size: 480, in: 41.72, out: 43.71, from: "bottom", sfx: "error_soft" },

  // 4. Как работает карта
  { id: "phone", src: "el_12_phone_card", x: 110, y: 300, size: 560, in: 45.48, out: 51.06, from: "bottom", sfx: "whoosh_slide" },
  { id: "card2", src: "el_01_card", x: 560, y: 520, size: 420, in: 48.44, out: 51.06, from: "right", rot: 8, sfx: "card_swipe" },
  { id: "shield", src: "el_14_shield", x: 600, y: 210, size: 340, in: 50.04, out: 51.06, from: "pop", sfx: "shield_on" },

  // 5. Потерял купюру
  { id: "cashlost", src: "el_07_cash_crumpled", x: 220, y: 320, size: 520, in: 51.6, out: 53.84, from: "pop", exit: "flyUp", rot: 6, sfx: "paper_crumple" },

  // 6. Потерял карту
  { id: "phone2", src: "el_12_phone_card", x: 110, y: 300, size: 560, in: 55.24, out: 63.42, from: "bottom", sfx: "whoosh_slide" },
  { id: "lock", src: "el_13_lock", x: 570, y: 320, size: 400, in: 59.2, out: 60.95, from: "pop", sfx: "card_lock" },
  { id: "shield2", src: "el_14_shield", x: 580, y: 300, size: 420, in: 61.0, out: 63.42, from: "pop", sfx: "shield_on" },

  // 7. Три плюса
  { id: "n1", text: "1", x: 190, y: 470, size: 0, in: 66.08, out: 67.15, from: "pop", sfx: "pop_soft" },
  { id: "n2", text: "2", x: 450, y: 470, size: 0, in: 66.32, out: 67.15, from: "pop", sfx: "pop_soft_2" },
  { id: "n3", text: "3", x: 710, y: 470, size: 0, in: 66.53, out: 67.15, from: "pop", sfx: "chime_positive" },

  // 8. Дизайн
  { id: "plain", src: "el_01_card", x: 230, y: 320, size: 520, in: 69.06, out: 71.77, from: "bottom", dim: true, rot: -4 },
  { id: "fan", src: "el_15_cards_fan", x: 150, y: 210, size: 760, in: 71.86, out: 78.57, from: "pop", sfx: "card_swipe" },

  // 9. Кэшбэк
  { id: "snacks", src: "el_17_snacks", x: 80, y: 150, size: 860, in: 78.96, out: 84.04, from: "pop", sfx: "pop_soft" },
  { id: "cashback", src: "el_16_cashback", x: 170, y: 260, size: 660, in: 84.26, out: 90.57, from: "pop", sfx: "coins_clink" },

  // 10. Цели
  { id: "pc", src: "el_18_pc", x: 90, y: 290, size: 460, in: 94.14, out: 96.77, from: "bottom", sfx: "pop_soft" },
  { id: "sneakers", src: "el_19_sneakers", x: 540, y: 360, size: 440, in: 95.42, out: 96.77, from: "right", rot: -4, sfx: "pop_soft_2" },
  { id: "jar", src: "el_20_jar", x: 100, y: 300, size: 480, in: 96.9, out: 107.86, from: "bottom", sfx: "whoosh_slide" },
  { id: "progress", src: "el_21_progress", x: 500, y: 330, size: 520, in: 99.08, out: 107.86, from: "left", sfx: "progress_fill" },
  { id: "spark2", src: "el_02_sparkles", x: 380, y: 220, size: 260, in: 105.96, out: 107.86, from: "pop", sfx: "success_unlock" },

  // 11. Безопасность
  { id: "pin", src: "el_23_pin_pad", x: 90, y: 270, size: 380, in: 110.88, out: 117.77, from: "pop", sfx: "ui_tap" },
  { id: "sms", src: "el_24_sms", x: 500, y: 250, size: 380, in: 111.58, out: 117.77, from: "pop", sfx: "pop_soft" },
  { id: "cardback", src: "el_22_card_back", x: 280, y: 560, size: 440, in: 112.82, out: 117.77, from: "bottom", sfx: "card_swipe" },
  { id: "hook", src: "el_25_hook", x: 170, y: 260, size: 600, in: 121.96, out: 126.66, from: "top", sfx: "whoosh_soft" },
  { id: "stop", src: "el_26_stop", x: 620, y: 470, size: 320, in: 124.1, out: 126.66, from: "pop", sfx: "error_soft" },

  // 12. Финал
  { id: "skill", src: "el_27_skill", x: 110, y: 330, size: 470, in: 128.96, out: 999, from: "bottom", sfx: "whoosh_slide" },
  { id: "trophy", src: "el_28_trophy", x: 560, y: 290, size: 440, in: 132.02, out: 999, from: "pop", sfx: "success_unlock" },
  { id: "confetti", src: "el_29_confetti", x: 30, y: 60, size: 1000, in: 132.15, out: 999, from: "top" },
];

// Звуки без привязки к элементам
export const EXTRA_SFX: { t: number; sfx: string; vol?: number }[] = [
  { t: 9.55, sfx: "whoosh_soft", vol: 0.35 },
  { t: 27.89, sfx: "whoosh_soft", vol: 0.35 },
  { t: 43.87, sfx: "whoosh_soft", vol: 0.35 },
  { t: 57.3, sfx: "ui_tap" },
  { t: 63.55, sfx: "whoosh_soft", vol: 0.35 },
  { t: 67.31, sfx: "whoosh_soft", vol: 0.35 },
  { t: 73.77, sfx: "card_swipe" },
  { t: 74.86, sfx: "card_swipe" },
  { t: 78.71, sfx: "whoosh_soft", vol: 0.35 },
  { t: 90.72, sfx: "whoosh_soft", vol: 0.35 },
  { t: 100.84, sfx: "coins_clink", vol: 0.4 },
  { t: 108.0, sfx: "alert_soft" },
  { t: 126.81, sfx: "whoosh_soft", vol: 0.35 },
];
