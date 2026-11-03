#!/usr/bin/env node
// Подготовка медиа перед рендером (запускается из scripts/pipeline.mjs render или вручную: node prepare.mjs).
//   public/source.mp4            — исходник «АЧИВКИ(8).mp4» (с Google Drive)
//   → public/source_clean.mp4    — тот же видеоряд без вшитых субтитров диктора (ffmpeg delogo по src/data/cleanup.json)
//   → public/generated/page79.png — кадр 4760 (79,33 с): подложка страницы Alfa People для экрана условий
// Пересобирается, только если входы новее результата. Нужен ffmpeg в PATH.

import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const pub = path.join(dir, 'public');
const src = path.join(pub, 'source.mp4');
const cleanupJson = path.join(dir, 'src', 'data', 'cleanup.json');
const clean = path.join(pub, 'source_clean.mp4');
const page = path.join(pub, 'generated', 'page79.png');
const force = process.argv.includes('--force');

const fail = (m) => {
  console.error(`✖ ${m}`);
  process.exit(1);
};
if (!fs.existsSync(src)) fail(`Нет ${src}. Выполни из корня репозитория: node scripts/pipeline.mjs pull achievements`);

// Озвучка и фон без диктора лежат на Drive в public/generated/ (их кладёт пользователь из архива облачного агента).
const voice = JSON.parse(fs.readFileSync(path.join(dir, 'src', 'data', 'voice.json'), 'utf8'));
const needAudio = ['generated/bed.mp3', ...voice.map((v) => v.src)].filter((f) => !fs.existsSync(path.join(pub, f)));
if (needAudio.length) {
  fail(`Нет аудио: ${needAudio.join(', ')}. Оно должно лежать на Drive в Remotion/achievements/public/generated/ — затем: node scripts/pipeline.mjs pull achievements`);
}

const mtime = (f) => (fs.existsSync(f) ? fs.statSync(f).mtimeMs : 0);
const stale = (out, ...inputs) => force || mtime(out) === 0 || inputs.some((i) => mtime(i) > mtime(out));

const run = (args) => {
  console.log(`▶ ffmpeg ${args.slice(0, 6).join(' ')} …`);
  const r = spawnSync('ffmpeg', args, {stdio: 'inherit'});
  if (r.error) fail(`ffmpeg не запустился: ${r.error.message}. Установи: winget install Gyan.FFmpeg`);
  if (r.status !== 0) fail(`ffmpeg завершился с кодом ${r.status}`);
};

if (stale(page, src)) {
  fs.mkdirSync(path.dirname(page), {recursive: true});
  run(['-v', 'error', '-y', '-i', src, '-vf', 'select=eq(n\\,4760)', '-frames:v', '1', page]);
  console.log(`✔ ${path.relative(dir, page)}`);
} else console.log(`• ${path.relative(dir, page)} актуален`);

if (stale(clean, src, cleanupJson)) {
  const rects = JSON.parse(fs.readFileSync(cleanupJson, 'utf8'));
  const filter = rects
    .map((r) => `delogo=x=${r.x}:y=${r.y}:w=${r.w}:h=${r.h}:enable='between(t,${r.from},${r.to})'`)
    .join(',');
  run([
    '-v', 'error', '-y', '-i', src,
    '-vf', filter,
    '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '12', '-pix_fmt', 'yuv420p', '-r', '60',
    clean,
  ]);
  console.log(`✔ ${path.relative(dir, clean)}`);
} else console.log(`• ${path.relative(dir, clean)} актуален`);
