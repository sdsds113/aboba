// Копирует медиа и данные из папки pride-cartoon/ в проект Remotion.
// Запускать после любых изменений в ../audio, ../assets, ../clips, ../timeline.json.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const proj = path.resolve(here, "..");
const root = path.resolve(proj, "..");
const pub = path.join(proj, "public");
const data = path.join(proj, "src", "data");

const copy = (from, to) => {
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
};
const copyDir = (from, to, filter = () => true) => {
  if (!fs.existsSync(from)) return [];
  const out = [];
  for (const f of fs.readdirSync(from)) {
    const src = path.join(from, f);
    if (fs.statSync(src).isDirectory()) continue;
    if (!filter(f)) continue;
    copy(src, path.join(to, f));
    out.push(f);
  }
  return out;
};

// аудио
copy(path.join(root, "audio/voiceover_full.mp3"), path.join(pub, "audio/voiceover_full.mp3"));
copy(path.join(root, "audio/music.mp3"), path.join(pub, "audio/music.mp3"));
copyDir(path.join(root, "audio/sfx"), path.join(pub, "audio/sfx"), (f) => f.endsWith(".mp3"));

// графика (processed — исправленные E02/E03, см. ../prep_assets.py)
copyDir(path.join(root, "assets"), path.join(pub, "assets"), (f) => f.endsWith(".png"));
copyDir(path.join(root, "assets/processed"), path.join(pub, "assets/processed"), (f) => f.endsWith(".png"));

// клипы: ../clips/S01-01.mp4 … S09-05.mp4 (один файл на план)
const clips = copyDir(path.join(root, "clips"), path.join(pub, "clips"), (f) => /^(S\d\d-\d\d[a-z]?|SPR-\d\d|G\d\d[a-z]?)\.mp4$/i.test(f));

// данные
for (const f of ["timeline.json", "photo_wall_layout.json"]) copy(path.join(root, f), path.join(data, f));
for (const f of ["offsets.json", "sfx_cues.json", "mix.json"]) copy(path.join(root, "audio", f), path.join(data, f));
fs.writeFileSync(
  path.join(data, "available.json"),
  JSON.stringify({ clips: clips.map((c) => c.replace(/\.mp4$/i, "")).sort() }, null, 1),
);
console.log(`sync: ${clips.length} клипов найдено`, clips.join(", "));
