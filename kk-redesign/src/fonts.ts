import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Все шрифты локальные, из public/fonts (в git не храним):
// Styrene A LC с Google Drive, Inter (переменный, OFL) с github.com/rsms/inter.
const FILES: { family: string; file: string; weight: string }[] = [
  { family: "Styrene A LC", file: "StyreneALC-Light.otf", weight: "300" },
  { family: "Styrene A LC", file: "StyreneALC-Regular.otf", weight: "400" },
  { family: "Styrene A LC", file: "StyreneALC-Medium.otf", weight: "500" },
  { family: "Styrene A LC", file: "StyreneALC-Bold.otf", weight: "700" },
  { family: "Inter", file: "InterVariable.woff2", weight: "100 900" },
];

for (const f of FILES) {
  loadFont({ family: f.family, url: staticFile(`fonts/${f.file}`), weight: f.weight, style: "normal" }).catch(() => {
    // файла нет: сработает запасной шрифт из стека
  });
}
