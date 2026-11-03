import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { STYRENE_B } from "../fonts";
import { CONDITIONS, FPS } from "../timeline";
import { ARTICLE, ConditionsArticle, layout, spanOf, Weigher } from "./ConditionsArticle";

// Замена экрана 21,90–32,77 с: та же страница Alfa People (шапка, меню, заголовок, картинка
// с сердцами — кадр исходника на 79,3 с), но с актуальными условиями. Камера и фокус
// повторяют приём оригинала: наезд на нужный блок, остальное уходит в размытие.

type Focus = "all" | "thanks" | "top" | "wow" | "master";
type Shot = { at: number; cx: number; cy: number; s: number; focus: Focus };

const all = spanOf(() => true);
const thanks = spanOf((l) => l.group === "thanks");
const top = spanOf((l) => l.group === "top");
const wow = spanOf((l) => l.group === "wow");
const fit = (h: number, pad: number, max: number) => Math.min(max, 1080 / (h + pad));

// at — секунда ролика (по словам новой озвучки, см. src/data/subtitles.json)
const SHOTS: Shot[] = [
  { at: 21.9, cx: 1250, cy: 860, s: 1.25, focus: "all" }, // «Давай посмотрим, что за ачивки»
  { at: 23.48, cx: 1180, cy: all.center, s: fit(all.bottom - all.top, 150, 1), focus: "all" }, // «Условия зависят от направления»
  { at: 25.05, cx: 1250, cy: thanks.center, s: fit(thanks.bottom - thanks.top, 170, 1.45), focus: "thanks" }, // «благодарности клиентов»
  { at: 26.2, cx: 1250, cy: top.center, s: 1.6, focus: "top" }, // «топ по положительным оценкам»
  { at: 27.46, cx: 1250, cy: wow.center, s: fit(wow.bottom - wow.top, 190, 1.45), focus: "wow" }, // «или зачтённые WOW-диалоги»
  { at: 29.52, cx: 1250, cy: 600, s: 1.0, focus: "all" }, // «Точные условия — в описании ачивки»
  { at: 31.72, cx: 1180, cy: all.center, s: fit(all.bottom - all.top, 150, 1), focus: "master" }, // «Ну а стать мастером сервиса…»
];
const MOVE = 0.7; // с, длительность перехода камеры
const LEAD = 0.12; // камера трогается чуть раньше слова

const ease = Easing.bezier(0.65, 0, 0.35, 1);

const focusWeight = (f: Focus): Weigher => {
  switch (f) {
    case "all":
      return () => 1;
    case "master":
      return (l) => ("level" in l && l.level === "master" ? 1 : l.kind === "h" ? 0.55 : 0);
    default:
      return (l) => (l.group === f ? 1 : 0);
  }
};

const camera = (t: number) => {
  let i = 0;
  while (i + 1 < SHOTS.length && t >= SHOTS[i + 1].at - LEAD) i++;
  const cur = SHOTS[i];
  const prev = SHOTS[Math.max(0, i - 1)];
  const p = i === 0 ? 1 : interpolate(t, [cur.at - LEAD, cur.at - LEAD + MOVE], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const lerp = (a: number, b: number) => a + (b - a) * p;
  // лёгкий постоянный наезд, чтобы кадр не стоял мёртво (как в оригинальном скринкасте)
  const drift = 1 + 0.012 * Math.max(0, t - cur.at);
  const wPrev = focusWeight(prev.focus);
  const wCur = focusWeight(cur.focus);
  const bgBlur = lerp(prev.focus === "all" ? 0 : 2, cur.focus === "all" ? 0 : 2);
  return {
    cx: lerp(prev.cx, cur.cx),
    cy: lerp(prev.cy, cur.cy),
    s: lerp(prev.s, cur.s) * drift,
    weight: ((l) => lerp(wPrev(l), wCur(l))) as Weigher,
    bgBlur,
  };
};

const PAGE_H = ARTICLE.y + layout.height + 300;

// Продолжение левого меню ниже кадра-подложки (в оригинале на этих позициях раздел «Ачивки и конкурсы»).
const MENU = [
  { y: 1098, text: "Безопасность", chevron: "down" },
  { y: 1166, text: "Ачивки и конкурсы", chevron: "up", dark: true },
  { y: 1234, text: "Как работают ачивки", sub: true },
  { y: 1302, text: "Как получить мерч за ачивку", sub: true },
  { y: 1370, text: "Ачивки для всех сотрудников", chevron: "down" },
];

const Chevron: React.FC<{ up?: boolean }> = ({ up }) => (
  <svg width="22" height="14" viewBox="0 0 22 14" style={{ position: "absolute", left: 600, top: 10, rotate: up ? "180deg" : "0deg" }}>
    <path d="M2 2l9 9 9-9" fill="none" stroke="#5f6a74" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ConditionsPage: React.FC<{ weight?: Weigher; bgBlur?: number }> = ({ weight, bgBlur = 0 }) => (
  <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: PAGE_H, background: "white" }}>
    <div style={{ position: "absolute", inset: 0, filter: bgBlur > 0.01 ? `blur(${bgBlur.toFixed(2)}px)` : undefined }}>
      <Img src={staticFile("generated/page79.png")} style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080 }} />
      {/* закрываем старый текст статьи и полосу прокрутки (её положение относится к другой странице) */}
      <div style={{ position: "absolute", left: 800, top: 700, width: 1120, height: PAGE_H - 700, background: "white" }} />
      <div style={{ position: "absolute", left: 1893, top: 0, width: 27, height: 700, background: "white" }} />
      <div style={{ position: "absolute", left: 0, top: 1080, width: 800, height: PAGE_H - 1080, background: "white" }} />
      {MENU.map((m) => (
        <div
          key={m.y}
          style={{
            position: "absolute",
            left: m.sub ? 146 : 122,
            top: m.y,
            width: 640,
            height: 34,
            fontFamily: STYRENE_B,
            fontSize: 22,
            lineHeight: "34px",
            color: m.dark ? "#0b1f35" : "#5f6a74",
            fontWeight: m.dark ? 700 : 400,
          }}
        >
          {m.text}
          {m.chevron ? <Chevron up={m.chevron === "up"} /> : null}
        </div>
      ))}
    </div>
    <ConditionsArticle weight={weight} />
  </div>
);

export const ConditionsScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const t = (CONDITIONS.from + frame) / FPS;
  const cam = camera(t);
  return (
    <AbsoluteFill style={{ background: "white", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          transformOrigin: "0 0",
          transform: `translate(960px, 540px) scale(${cam.s}) translate(${-cam.cx}px, ${-cam.cy}px)`,
        }}
      >
        <ConditionsPage weight={cam.weight} bgBlur={cam.bgBlur} />
      </div>
    </AbsoluteFill>
  );
};
