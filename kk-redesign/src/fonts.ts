import { loadFont } from "@remotion/fonts";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { staticFile } from "remotion";

// Styrene A LC лежит в public/fonts (в git не храним, файлы с Google Drive).
const STYRENE_FILES: { file: string; weight: string }[] = [
  { file: "StyreneALC-Light.otf", weight: "300" },
  { file: "StyreneALC-Regular.otf", weight: "400" },
  { file: "StyreneALC-Medium.otf", weight: "500" },
  { file: "StyreneALC-Bold.otf", weight: "700" },
];

for (const f of STYRENE_FILES) {
  loadFont({
    family: "Styrene A LC",
    url: staticFile(`fonts/${f.file}`),
    weight: f.weight,
    style: "normal",
  }).catch(() => {
    // нет файла: сработает запасной Inter из стека
  });
}

// Inter для макета интерфейса: он ближе всего к шрифту самой SFACall
loadInter("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["cyrillic", "latin"],
});
