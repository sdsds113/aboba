import { loadFont } from "@remotion/google-fonts/Nunito";

// Шрифт-заглушка до фирменного: округлый Nunito с кириллицей.
// Чтобы поставить фирменный — заменить fontDisplay/fontText (локальный шрифт: @remotion/fonts + staticFile).
const { fontFamily } = loadFont("normal", {
  weights: ["700", "800", "900"],
  subsets: ["cyrillic", "latin"],
});

export const theme = {
  fontDisplay: fontFamily,
  fontText: fontFamily,
  colorAccent: "#C8102E",
  colorText: "#FFFFFF",
  colorCream: "#F6E7C8",
  colorInk: "#3B2414",
  colorShadow: "rgba(0,0,0,0.55)",
};
