#!/usr/bin/env node
// Обмен медиа и рендерами между репозиторием и папкой Google Drive на компьютере.
//
//   node scripts/pipeline.mjs pull    <проект>                 Drive → <проект>/public
//   node scripts/pipeline.mjs render  <проект> [--only <Comp>] рендер задач из <проект>/render.json + выкладка в Drive
//   node scripts/pipeline.mjs publish <проект> <файл>          положить готовый файл в Drive/<проект>/renders
//
// Папка проекта на Drive: <driveRoot>/<имя папки проекта>/
//   public/   зеркало <проект>/public (исходники, музыка, SFX, картинки, голос)
//   renders/  готовые рендеры: <имя>_v01.mp4, <имя>_v02.mp4, ...
//
// driveRoot задаётся один раз в remotion.local.json в корне репозитория (файл не коммитится):
//   { "driveRoot": "G:\\Мой диск\\Remotion", "fontsDir": "D:\\Шрифты" }
//
// Фирменные шрифты живут только на компьютере пользователя (не в git и не на Drive).
// <проект>/fonts.json перечисляет нужные файлы; pull копирует их в <проект>/public/fonts/
// из fontsDir (с подпапками) и из системных папок шрифтов Windows. render не стартует,
// если какого-то файла нет.

import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cfgPath = path.join(repoRoot, 'remotion.local.json');

const fail = (msg) => {
  console.error(`✖ ${msg}`);
  process.exit(1);
};

function config() {
  if (!fs.existsSync(cfgPath)) {
    fail(`Нет ${cfgPath}. Создай его: { "driveRoot": "G:\\\\Мой диск\\\\Remotion" } (путь к папке Remotion на Google Drive).`);
  }
  const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
  if (!cfg.driveRoot || !fs.existsSync(cfg.driveRoot)) {
    fail(`driveRoot не найден: ${cfg.driveRoot}. Проверь, что Google Drive запущен и путь верный.`);
  }
  return cfg;
}

function projectDir(name) {
  if (!name) fail('Укажи папку проекта, например: montage');
  const dir = path.resolve(repoRoot, name);
  if (!fs.existsSync(path.join(dir, 'package.json'))) fail(`В ${dir} нет package.json — это не проект Remotion.`);
  return dir;
}

function driveProject(cfg, dir) {
  return path.join(cfg.driveRoot, path.basename(dir));
}

// Копирует дерево, пропуская файлы с тем же размером и не более новые.
function copyTree(src, dst) {
  let copied = 0;
  let skipped = 0;
  fs.mkdirSync(dst, {recursive: true});
  for (const e of fs.readdirSync(src, {withFileTypes: true})) {
    if (e.name.startsWith('.') || e.name === 'desktop.ini' || e.name.startsWith('~$')) continue;
    const s = path.join(src, e.name);
    const d = path.join(dst, e.name);
    if (e.isDirectory()) {
      const r = copyTree(s, d);
      copied += r.copied;
      skipped += r.skipped;
      continue;
    }
    const st = fs.statSync(s);
    if (fs.existsSync(d)) {
      const dt = fs.statSync(d);
      if (dt.size === st.size && dt.mtimeMs >= st.mtimeMs - 1000) {
        skipped++;
        continue;
      }
    }
    fs.copyFileSync(s, d);
    fs.utimesSync(d, st.atime, st.mtime);
    console.log(`  ↓ ${path.relative(dst, d) || e.name}`);
    copied++;
  }
  return {copied, skipped};
}

function fontList(dir) {
  const p = path.join(dir, 'fonts.json');
  if (!fs.existsSync(p)) return [];
  return JSON.parse(fs.readFileSync(p, 'utf8')).fonts ?? [];
}

function findFile(roots, fileName) {
  const want = fileName.toLowerCase();
  const stack = roots.filter((r) => r && fs.existsSync(r));
  while (stack.length) {
    const d = stack.pop();
    let entries;
    try {
      entries = fs.readdirSync(d, {withFileTypes: true});
    } catch {
      continue;
    }
    for (const e of entries) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) stack.push(full);
      else if (e.name.toLowerCase() === want) return full;
    }
  }
  return null;
}

function pullFonts(cfg, dir) {
  const fonts = fontList(dir);
  if (fonts.length === 0) return;
  const roots = [
    cfg.fontsDir,
    process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, 'Microsoft', 'Windows', 'Fonts'),
    process.env.WINDIR && path.join(process.env.WINDIR, 'Fonts'),
  ];
  const dst = path.join(dir, 'public', 'fonts');
  fs.mkdirSync(dst, {recursive: true});
  const missing = [];
  for (const f of fonts) {
    const target = path.join(dst, f.file);
    const src = findFile(roots, f.file);
    if (!src) {
      if (!fs.existsSync(target)) missing.push(f.file);
      continue;
    }
    fs.copyFileSync(src, target);
    console.log(`  ↓ fonts/${f.file}  (${f.family} ${f.weight ?? ''} ${f.style ?? ''})`);
  }
  if (missing.length) {
    fail(`Не найдены шрифты: ${missing.join(', ')}. Положи их в fontsDir (${cfg.fontsDir ?? 'не задан в remotion.local.json'}) или установи в Windows.`);
  }
  console.log(`✔ шрифты: ${fonts.length} файл(ов) в public/fonts`);
}

function checkFonts(dir) {
  const missing = fontList(dir).filter((f) => !fs.existsSync(path.join(dir, 'public', 'fonts', f.file)));
  if (missing.length) {
    fail(`В public/fonts нет: ${missing.map((f) => f.file).join(', ')}. Сначала выполни pull — без фирменных шрифтов не рендерим.`);
  }
}

function pull(name) {
  const cfg = config();
  const dir = projectDir(name);
  const src = path.join(driveProject(cfg, dir), 'public');
  if (!fs.existsSync(src)) fail(`На Drive нет папки ${src}. Создай её и положи туда медиа проекта.`);
  const r = copyTree(src, path.join(dir, 'public'));
  console.log(`✔ pull ${name}: скопировано ${r.copied}, без изменений ${r.skipped}`);
  pullFonts(cfg, dir);
}

// Следующая версия: edit.mp4 → edit_v03.mp4, если в renders уже есть v01 и v02.
function nextVersionName(rendersDir, file) {
  const ext = path.extname(file);
  const base = path.basename(file, ext);
  const re = new RegExp(`^${base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}_v(\\d+)${ext.replace('.', '\\.')}$`);
  let max = 0;
  if (fs.existsSync(rendersDir)) {
    for (const f of fs.readdirSync(rendersDir)) {
      const m = f.match(re);
      if (m) max = Math.max(max, Number(m[1]));
    }
  }
  return `${base}_v${String(max + 1).padStart(2, '0')}${ext}`;
}

function publish(name, file) {
  const cfg = config();
  const dir = projectDir(name);
  const abs = path.resolve(dir, file);
  if (!fs.existsSync(abs)) fail(`Нет файла ${abs}`);
  const rendersDir = path.join(driveProject(cfg, dir), 'renders');
  fs.mkdirSync(rendersDir, {recursive: true});
  const target = path.join(rendersDir, nextVersionName(rendersDir, path.basename(abs)));
  fs.copyFileSync(abs, target);
  const mb = (fs.statSync(target).size / 1e6).toFixed(1);
  console.log(`✔ publish → ${target} (${mb} МБ)`);
  return target;
}

function render(name, only) {
  const dir = projectDir(name);
  const jobsPath = path.join(dir, 'render.json');
  if (!fs.existsSync(jobsPath)) fail(`Нет ${jobsPath} — список задач рендера.`);
  const {jobs} = JSON.parse(fs.readFileSync(jobsPath, 'utf8'));
  const todo = jobs.filter((j) => !only || j.composition === only);
  if (todo.length === 0) fail(only ? `В render.json нет композиции ${only}` : 'render.json пуст');
  checkFonts(dir);

  const results = [];
  for (const job of todo) {
    const out = path.join('out', job.output);
    const args = ['remotion', 'render', job.composition, out, ...(job.flags ?? [])];
    console.log(`\n▶ npx ${args.join(' ')}`);
    const t0 = Date.now();
    const r = spawnSync('npx', args, {cwd: dir, stdio: 'inherit', shell: process.platform === 'win32'});
    const sec = ((Date.now() - t0) / 1000).toFixed(0);
    if (r.status !== 0) {
      results.push({composition: job.composition, ok: false, sec});
      console.error(`✖ ${job.composition} упал (код ${r.status}) за ${sec} с`);
      continue;
    }
    const target = job.publish === false ? null : publish(name, out);
    results.push({composition: job.composition, ok: true, sec, target});
  }

  console.log('\nИтог:');
  for (const r of results) {
    console.log(`  ${r.ok ? '✔' : '✖'} ${r.composition} — ${r.sec} с${r.target ? ` → ${path.basename(r.target)}` : ''}`);
  }
  if (results.some((r) => !r.ok)) process.exit(1);
}

const [cmd, name, ...rest] = process.argv.slice(2);
const flag = (k) => {
  const i = rest.indexOf(k);
  return i >= 0 ? rest[i + 1] : undefined;
};

switch (cmd) {
  case 'pull':
    pull(name);
    break;
  case 'render':
    render(name, flag('--only'));
    break;
  case 'publish':
    publish(name, rest[0]);
    break;
  default:
    console.log('Команды: pull <проект> | render <проект> [--only <Comp>] | publish <проект> <файл>');
    process.exit(cmd ? 1 : 0);
}
