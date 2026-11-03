import { loadFont } from "@remotion/fonts";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { getStaticFiles } from "@remotion/studio";
import { staticFile } from "remotion";
import fontsJson from "../fonts.json";

// Фирменные Styrene лежат только на ПК пользователя: Codex кладёт их в public/fonts
// (scripts/pipeline.mjs pull). В облачном превью их нет — тогда работает запасной Inter.
const { fontFamily: FALLBACK } = loadInter("normal", {
  weights: ["400", "700", "800"],
  subsets: ["cyrillic", "latin"],
});

const present = new Set(getStaticFiles().map((f) => f.name));

for (const f of fontsJson.fonts) {
  if (present.has(`fonts/${f.file}`)) {
    loadFont({
      family: f.family,
      url: staticFile(`fonts/${f.file}`),
      weight: f.weight,
      style: f.style,
    });
  }
}

export const BRAND_FONTS_PRESENT = fontsJson.fonts.every((f) =>
  present.has(`fonts/${f.file}`),
);

/** Субтитры: широкий жирный Styrene A — ближе всего к исходным плашкам. */
export const STYRENE_A = `"Styrene A LC", ${FALLBACK}, sans-serif`;
/** Текст статьи на странице Alfa People. */
export const STYRENE_B = `"Styrene B LC", ${FALLBACK}, sans-serif`;
