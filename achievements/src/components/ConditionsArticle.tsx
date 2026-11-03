import React from "react";
import { STYRENE_B } from "../fonts";

// Актуальные условия (public/references/current-conditions.png), набраны в стиле статьи Alfa People.
// Переносы строк ручные: высота каждой строки фиксирована, поэтому координаты блоков
// известны заранее и по ним наводится камера.

export type Group = "thanks" | "top" | "wow";
export type Level = "expert" | "pro" | "master";

type Line =
  | { kind: "h"; text: string; group: Group }
  | { kind: "li"; marker: string; strong: string; rest: string; group: Group; level: Level }
  | { kind: "step"; marker: string; text: string; group: Group }
  | { kind: "p"; strong?: string; text: string; group: Group; level?: Level; indent?: boolean };

export const LINES: Line[] = [
  { kind: "h", text: "Для сотрудников контактного центра с 01.08.2026:", group: "thanks" },
  { kind: "li", marker: "•", strong: "Эксперт сервиса", rest: " — за 1 благодарность от клиента", group: "thanks", level: "expert" },
  { kind: "li", marker: "•", strong: "Профи сервиса", rest: " — за каждые 5 благодарностей от клиента", group: "thanks", level: "pro" },
  { kind: "li", marker: "•", strong: "Мастер сервиса", rest: " — за каждые 10 благодарностей от клиента", group: "thanks", level: "master" },
  { kind: "h", text: "Для сотрудников направления Онбординг РБ и Первичка КН1/КК1:", group: "thanks" },
  { kind: "li", marker: "•", strong: "Эксперт сервиса", rest: " — 5 подтверждённых благодарностей", group: "thanks", level: "expert" },
  { kind: "li", marker: "•", strong: "Профи сервиса", rest: " — 7 подтверждённых благодарностей", group: "thanks", level: "pro" },
  { kind: "li", marker: "•", strong: "Мастер сервиса", rest: " — 9 подтверждённых благодарностей", group: "thanks", level: "master" },
  { kind: "h", text: "Для сотрудников направления Сохранение РБ:", group: "thanks" },
  { kind: "li", marker: "1.", strong: "Эксперт сервиса", rest: " — 2 подтверждённые благодарности", group: "thanks", level: "expert" },
  { kind: "li", marker: "2.", strong: "Профи сервиса", rest: " — 3 подтверждённые благодарности", group: "thanks", level: "pro" },
  { kind: "li", marker: "3.", strong: "Мастер сервиса", rest: " — 4 подтверждённые благодарности", group: "thanks", level: "master" },
  { kind: "h", text: "Для сотрудников направления Онбординг ММБ и Сохранение ММБ:", group: "top" },
  { kind: "p", strong: "Профи сервиса", text: " — войдите в 5 лучших сотрудников по проценту", group: "top", level: "pro" },
  { kind: "p", text: "положительных оценок (5) VoC от общего числа полученных оценок", group: "top", level: "pro" },
  { kind: "p", text: "(не менее 30 оценок за месяц).", group: "top", level: "pro" },
  { kind: "h", text: "Для сотрудников УИУКО:", group: "wow" },
  { kind: "step", marker: "1.", text: "Проведите качественную отработку негативного VOC-опроса", group: "wow" },
  { kind: "step", marker: "2.", text: "Получите благодарность от клиента — клиент добровольно оставляет", group: "wow" },
  { kind: "p", text: "положительный отзыв.", group: "wow", indent: true },
  { kind: "step", marker: "3.", text: "Проверьте соответствие условиям ниже", group: "wow" },
  { kind: "step", marker: "4.", text: "Дождитесь проверки — эксперт контроля качества проверит", group: "wow" },
  { kind: "p", text: "коммуникацию и подтвердит WOW-диалог", group: "wow", indent: true },
  { kind: "li", marker: "•", strong: "Эксперт сервиса", rest: " — 2 зачтённых WOW-диалога", group: "wow", level: "expert" },
  { kind: "li", marker: "•", strong: "Профи сервиса", rest: " — 3 зачтённых WOW-диалога", group: "wow", level: "pro" },
  { kind: "li", marker: "•", strong: "Мастер сервиса", rest: " — более 3 зачтённых WOW-диалогов", group: "wow", level: "master" },
];

/** Координаты в системе страницы (1920 px шириной, как кадр исходника на 79 с). */
export const ARTICLE = { x: 832, y: 728, width: 1060 } as const;
const LINE_H = 36;
const H_GAP = 24; // отступ над заголовком секции (кроме первого)
const H_AFTER = 8; // отступ после заголовка
const FONT = 22;
const COLOR = "#0b1f35";

/** y (верх строки) для каждой строки и полная высота блока. */
export const layout = (() => {
  let y = 0;
  const tops: number[] = [];
  LINES.forEach((l, i) => {
    if (l.kind === "h" && i > 0) y += H_GAP;
    tops.push(y);
    y += LINE_H + (l.kind === "h" ? H_AFTER : 0);
  });
  return { tops, height: y };
})();

/** Вертикальный диапазон (в координатах страницы) строк, удовлетворяющих условию. */
export const spanOf = (pred: (l: Line) => boolean) => {
  const idx = LINES.map((l, i) => (pred(l) ? i : -1)).filter((i) => i >= 0);
  const top = ARTICLE.y + layout.tops[idx[0]];
  const bottom = ARTICLE.y + layout.tops[idx[idx.length - 1]] + LINE_H;
  return { top, bottom, center: (top + bottom) / 2 };
};

export type Weigher = (l: Line) => number;

/** Блок текста. weight(l): 1 — в фокусе (резко), 0 — вне фокуса (размыто и бледно). */
export const ConditionsArticle: React.FC<{ weight?: Weigher }> = ({ weight = () => 1 }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: ARTICLE.x,
        top: ARTICLE.y,
        width: ARTICLE.width,
        height: layout.height,
        fontFamily: STYRENE_B,
        fontSize: FONT,
        lineHeight: `${LINE_H}px`,
        color: COLOR,
        whiteSpace: "nowrap",
      }}
    >
      {LINES.map((l, i) => {
        const w = Math.max(0, Math.min(1, weight(l)));
        const style: React.CSSProperties = {
          position: "absolute",
          top: layout.tops[i],
          left: 0,
          height: LINE_H,
          opacity: 0.38 + 0.62 * w,
          filter: w < 0.999 ? `blur(${((1 - w) * 2.6).toFixed(2)}px)` : undefined,
        };
        if (l.kind === "h") {
          return (
            <div key={i} style={{ ...style, fontWeight: 700 }}>
              {l.text}
            </div>
          );
        }
        if (l.kind === "li" || l.kind === "step") {
          return (
            <div key={i} style={{ ...style, left: 34 }}>
              <span style={{ position: "absolute", left: l.marker === "•" ? 0 : -6, fontWeight: l.marker === "•" ? 700 : 400 }}>
                {l.marker}
              </span>
              <span style={{ position: "absolute", left: 24 }}>
                {l.kind === "li" ? (
                  <>
                    <b>{l.strong}</b>
                    {l.rest}
                  </>
                ) : (
                  l.text
                )}
              </span>
            </div>
          );
        }
        return (
          <div key={i} style={{ ...style, left: l.indent ? 58 : 0 }}>
            {l.strong ? <b>{l.strong}</b> : null}
            {l.text}
          </div>
        );
      })}
    </div>
  );
};
