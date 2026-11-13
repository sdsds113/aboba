// Какие сгенерированные элементы уже лежат в public/els/.
// Когда файл появится, ставим true: сцена возьмёт картинку вместо векторной заглушки.
export const HAS = {
  macbook: false,
  fl: false,
  ul: false,
  yl: false,
  switch: false,
  cursor: false,
  copy: false,
  bell: false,
  link: false,
  card: false,
};

export type AssetName = keyof typeof HAS;

// Экран MacBook внутри картинки macbook.png (доли от ширины и высоты),
// заполняется после того, как придёт файл и найдём зелёную область.
export const MACBOOK_SCREEN = { x: 0.1, y: 0.06, w: 0.8, h: 0.78 };
