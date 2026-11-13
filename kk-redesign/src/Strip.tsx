import React from "react";
import { C, UI } from "./theme";
import {
  IconBell,
  IconBuilding,
  IconFlame,
  IconHistory,
  IconMail,
  IconMailPlus,
  IconPencil,
  IconScan,
  IconStar,
  IconUser,
  IconVideo,
} from "./Icons";

// Векторная копия «короткой карточки» (шапки клиента) SFACall.
// Раскладка детерминированная: у каждого элемента фиксированная ширина,
// поэтому координаты известны заранее и по ним ездят фокус, курсор и подсказки.

export const STRIP_W = 1680;
export const STRIP_H = 104;
const PAD = 40;
const GAP_L = 20;
const GAP_R = 16;

export type ItemKind = "name" | "icon" | "voc" | "meta" | "badge" | "chips" | "check" | "topic" | "switch";

export type Item = {
  id: string;
  kind: ItemKind;
  w: number;
  text?: string;
  icon?: React.FC<{ size?: number; color?: string }>;
  label: string; // подпись для зрителя
  tone?: "red" | "green";
};

export type Variant = {
  left: Item[];
  right: Item[];
};

const voc: Item = { id: "voc", kind: "voc", w: 64, text: "4,7", label: "Оценка VOC за месяц" };
const notSolved: Item = { id: "ns", kind: "check", w: 138, text: "Не решено", label: "Не решено" };
const topic: Item = { id: "topic", kind: "topic", w: 132, text: "Тематика", label: "Тематика" };

export const FL: Variant = {
  left: [
    { id: "name", kind: "name", w: 430, text: "МОРОЗОВА ГАЛИНА АНАТОЛЬЕВНА", label: "ФИО клиента" },
    { id: "card", kind: "icon", w: 40, icon: IconUser, label: "Полная карточка клиента" },
    { id: "hist", kind: "icon", w: 40, icon: IconHistory, label: "История коммуникаций" },
    voc,
    { id: "meta", kind: "meta", w: 272, text: "AAAAAC  ·  ПУ Технический  ·  M", label: "PIN, пакет услуг и сегмент" },
    { id: "mark", kind: "badge", w: 64, text: "СИМ", tone: "red", label: "Маркеры" },
  ],
  right: [
    { id: "auth", kind: "icon", w: 40, icon: IconScan, label: "Доавторизация" },
    { id: "msg", kind: "icon", w: 40, icon: IconMailPlus, label: "Сообщение клиенту" },
    { id: "bell", kind: "icon", w: 40, icon: IconBell, label: "Уведомления" },
    notSolved,
    topic,
  ],
};

export const FL2: Variant = {
  left: [
    { id: "name", kind: "name", w: 430, text: "АЛЕКСЕЕВА АНАСТАСИЯ ЯКОВЛЕВНА", label: "ФИО клиента" },
    { id: "card", kind: "icon", w: 40, icon: IconUser, label: "Полная карточка клиента" },
    { id: "hist", kind: "icon", w: 40, icon: IconHistory, label: "История коммуникаций" },
    voc,
    { id: "meta", kind: "meta", w: 300, text: "AHIBQ9  ·  Пакет «Оптимум»  ·  MA", label: "PIN, пакет услуг и сегмент" },
    { id: "mark", kind: "badge", w: 64, text: "СИМ", tone: "green", label: "Маркеры" },
  ],
  right: FL.right,
};

export const UL: Variant = {
  left: [
    { id: "name", kind: "name", w: 430, text: "РОМАНОВА ЖАННА ВАЛЕНТИНОВНА", label: "ФИО уполномоченного лица" },
    { id: "card", kind: "icon", w: 40, icon: IconUser, label: "Полная карточка клиента" },
    { id: "hist", kind: "icon", w: 40, icon: IconHistory, label: "История коммуникаций" },
    voc,
    { id: "meta", kind: "meta", w: 86, text: "XC83A1", label: "PIN" },
    { id: "mark", kind: "badge", w: 72, text: "IMSI", tone: "red", label: "Маркеры" },
  ],
  right: [
    { id: "ident", kind: "icon", w: 40, icon: IconScan, label: "Идентификация" },
    { id: "bell", kind: "icon", w: 40, icon: IconBell, label: "Уведомления" },
    { id: "msg", kind: "icon", w: 40, icon: IconMailPlus, label: "Сообщение клиенту" },
    { id: "urgent", kind: "icon", w: 40, icon: IconFlame, label: "Срочно связаться" },
    notSolved,
    topic,
  ],
};

export const YL: Variant = {
  left: [
    { id: "name", kind: "name", w: 196, text: "ООО «АР Фэшн»", label: "Название компании" },
    { id: "card", kind: "icon", w: 40, icon: IconBuilding, label: "Полная карточка клиента" },
    { id: "hist", kind: "icon", w: 40, icon: IconHistory, label: "История коммуникаций" },
    voc,
    { id: "meta", kind: "meta", w: 252, text: "UAH185  ·  7725719187  ·  СБ", label: "PIN, ИНН и сегмент" },
    { id: "mark", kind: "chips", w: 206, label: "Маркеры" },
  ],
  right: [
    { id: "ask", kind: "icon", w: 40, icon: IconScan, label: "Контрольные вопросы" },
    { id: "mail", kind: "icon", w: 40, icon: IconMail, label: "Письма клиента" },
    { id: "bell", kind: "icon", w: 40, icon: IconBell, label: "Уведомления" },
    { id: "msg", kind: "icon", w: 40, icon: IconMailPlus, label: "Сообщение клиенту" },
    { id: "urgent", kind: "icon", w: 40, icon: IconFlame, label: "Срочно связаться" },
    { id: "video", kind: "icon", w: 40, icon: IconVideo, label: "Видеозвонки" },
    notSolved,
    topic,
  ],
};

export type Box = { x: number; w: number };

// Координаты элементов внутри полосы (x от левого края полосы)
export const layout = (v: Variant, extraRight = 0, width = STRIP_W): Record<string, Box> => {
  const out: Record<string, Box> = {};
  let x = PAD;
  for (const it of v.left) {
    out[it.id] = { x, w: it.w };
    x += it.w + GAP_L;
  }
  let r = width - PAD - extraRight;
  for (const it of [...v.right].reverse()) {
    r -= it.w;
    out[it.id] = { x: r, w: it.w };
    r -= GAP_R;
  }
  return out;
};

const ItemView: React.FC<{ it: Item; checked?: boolean }> = ({ it, checked }) => {
  const base: React.CSSProperties = {
    width: it.w,
    height: STRIP_H,
    display: "flex",
    alignItems: "center",
    justifyContent: it.kind === "icon" ? "center" : "flex-start",
    fontFamily: UI,
    color: C.uiText,
    whiteSpace: "nowrap",
  };
  switch (it.kind) {
    case "name":
      return <div style={{ ...base, fontWeight: 700, fontSize: 22, letterSpacing: 0.2 }}>{it.text}</div>;
    case "icon": {
      const I = it.icon!;
      return (
        <div style={base}>
          <I size={30} />
        </div>
      );
    }
    case "voc":
      return (
        <div style={{ ...base, gap: 6, fontSize: 18, fontWeight: 600 }}>
          <IconStar size={22} />
          {it.text}
        </div>
      );
    case "meta":
      return <div style={{ ...base, fontSize: 18, fontWeight: 500, color: "#3A3A3C" }}>{it.text}</div>;
    case "badge":
      return (
        <div style={base}>
          <div
            style={{
              padding: "5px 12px",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: 0.6,
              color: it.tone === "green" ? C.green : C.red,
              background: it.tone === "green" ? C.greenSoft : C.pinkSoft,
            }}
          >
            {it.text}
          </div>
        </div>
      );
    case "chips":
      return (
        <div style={{ ...base, gap: 8 }}>
          {["КЛИЕНТ С РКО", "КЛИЕНТ С ЗП"].map((t) => (
            <div
              key={t}
              style={{
                padding: "5px 9px",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 700,
                color: "white",
                background: C.green,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      );
    case "check":
      return (
        <div style={{ ...base, gap: 10, fontSize: 18, fontWeight: 500 }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 5,
              border: `1.8px solid ${checked ? C.uiText : "#9A9AA0"}`,
              background: checked ? C.uiText : "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {checked ? (
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3.2}>
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
            ) : null}
          </div>
          {it.text}
        </div>
      );
    case "topic":
      return (
        <div style={{ ...base, gap: 8, fontSize: 18, fontWeight: 500 }}>
          <IconPencil size={24} />
          {it.text}
        </div>
      );
    default:
      return null;
  }
};

export const Strip: React.FC<{
  v: Variant;
  checked?: boolean;
  extraRight?: number;
  width?: number;
  contentOpacity?: number;
  children?: React.ReactNode; // оверлеи в координатах полосы
}> = ({ v, checked, extraRight = 0, width = STRIP_W, contentOpacity = 1, children }) => {
  const L = layout(v, extraRight, width);
  return (
    <div
      style={{
        position: "relative",
        width,
        height: STRIP_H,
        borderRadius: 26,
        background: "white",
        boxShadow: "0 40px 90px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.9)",
      }}
    >
      {[...v.left, ...v.right].map((it) => (
        <div key={it.id} style={{ position: "absolute", left: L[it.id].x, top: 0, opacity: contentOpacity }}>
          <ItemView it={it} checked={it.kind === "check" ? checked : false} />
        </div>
      ))}
      {children}
    </div>
  );
};

// Подсказка в стиле SFACall: тёмная плашка со стрелкой
export const Tooltip: React.FC<{ x: number; text: string; opacity: number; lines?: string[] }> = ({
  x,
  text,
  opacity,
  lines,
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: STRIP_H - 6,
      translate: "-50% 0",
      opacity,
      scale: 0.94 + 0.06 * opacity,
      transformOrigin: "50% 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      pointerEvents: "none",
      zIndex: 5,
    }}
  >
    <div style={{ width: 0, height: 0, borderLeft: "9px solid transparent", borderRight: "9px solid transparent", borderBottom: `9px solid ${C.tip}` }} />
    <div
      style={{
        background: C.tip,
        color: "white",
        fontFamily: UI,
        fontWeight: 500,
        fontSize: 17,
        lineHeight: 1.3,
        padding: "9px 14px",
        borderRadius: 9,
        whiteSpace: "nowrap",
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
      }}
    >
      {lines ? lines.map((l) => <div key={l}>{l}</div>) : text}
    </div>
  </div>
);

// ЮЛ без плашек-маркеров: для сцены с переключалкой, где справа нужно место
export const YL_S: Variant = { left: YL.left.filter((i) => i.id !== "mark"), right: YL.right };
