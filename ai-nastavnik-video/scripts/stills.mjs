// Render a set of still frames (voice-time seconds) to out/stills for visual checks.
// Usage: node scripts/stills.mjs 0.5 7.4 12 ...
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import path from "node:path";
import fs from "node:fs";

const times = process.argv.slice(2).map(Number);
const entry = path.resolve("src/index.ts");
const serveUrl = await bundle({ entryPoint: entry, publicDir: path.resolve("public") });
const composition = await selectComposition({ serveUrl, id: "AINastavnik", inputProps: {} });
fs.mkdirSync("out/stills", { recursive: true });
for (const t of times) {
  const frame = Math.round((t + 3.0) * 60);
  const output = `out/stills/t${t.toFixed(2)}.jpeg`;
  await renderStill({ composition, serveUrl, frame, output, imageFormat: "jpeg", jpegQuality: 80, scale: 0.4, chromiumOptions: { gl: "swangle" } });
  console.log("ok", t, frame, output);
}
