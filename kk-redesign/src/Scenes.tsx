import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Chapter, El, Reveal, SceneShell, SideHint, Walk } from "./Common";
import { Cursor, IconCheck, IconChevron, IconSearch } from "./Icons";
import { MACBOOK, SHOT } from "./assets";
import { FL, layout, Strip, STRIP_H, STRIP_W, Tooltip, UL, YL } from "./Strip";
import { anim, C, IN, INOUT, keys, STYRENE, UI, blp, fb } from "./theme";
import { at } from "./timeline";

const SX = (1920 - STRIP_W) / 2; // левый край полосы
const SY = 440; // верх полосы

// Полоса, которая мягко появляется
const StripIn: React.FC<{ from: number; out?: number; children: React.ReactNode; y?: number }> = ({
  from,
  out,
  children,
  y = SY,
}) => {
  const f = useCurrentFrame();
  const p = anim(f, from, from + 50, 0, 1);
  const q = out === undefined ? 0 : anim(f, out, out + 24, 0, 1, IN);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        transform: `translate3d(${SX}px, ${y + (1 - p) * 60 - q * 30}px, 0)`, willChange: "transform",
        opacity: p * (1 - q),
              }}
    >
      {children}
    </div>
  );
};

// Курсор, который ездит по ключевым точкам (координаты полосы)
type CP = { f: number; x: number; y: number };
const useCursor = (pts: CP[]) => {
  const f = useCurrentFrame();
  const fr = pts.map((p) => p.f);
  return { x: keys(f, fr, pts.map((p) => p.x)), y: keys(f, fr, pts.map((p) => p.y)) };
};
const press = (f: number, t: number) => anim(f, t, t + 5, 0, 1) * (1 - anim(f, t + 5, t + 14, 0, 1));
const between = (f: number, a: number, b: number, fade = 10) => anim(f, a, a + fade, 0, 1) * (1 - anim(f, b, b + fade, 0, 1, IN));

// ───────── 1. Контекст: MacBook с интерфейсом, подсветка строки ─────────
export const SceneContext: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames: d } = useVideoConfig();
  const t = at("context");
  const LW = 1400; // ширина ноутбука
  const k = LW / MACBOOK.w;
  const LH = MACBOOK.h * k;
  const scr = { x: MACBOOK.screen.x * k, y: MACBOOK.screen.y * k, w: MACBOOK.screen.w * k, h: MACBOOK.screen.h * k };
  const ks = scr.w / SHOT.w;
  const hd = {
    x: scr.x + SHOT.header.x * ks,
    y: scr.y + SHOT.header.y * ks,
    w: SHOT.header.w * ks,
    h: SHOT.header.h * ks,
  };
  const left = (1920 - LW) / 2;
  const top = 196;

  const enter = anim(f, 6, 70, 0, 1);
  const hl = anim(f, t.w(1, "одной") - 14, t.w(1, "одной") + 44, 0, 1, INOUT); // «в одной строке»
  // наезд на шапку в конце сцены
  const push = anim(f, d - 70, d, 0, 1, Easing3);
  const cx = left + hd.x + hd.w / 2;
  const cy = top + hd.y + hd.h / 2;
  const camS = (1 + 0.025 * anim(f, 0, d, 0, 1, (x) => x)) * (1 + 1.5 * push);
  const camX = (960 - cx) * push;
  const camY = (540 - cy) * push;

  return (
    <SceneShell>
      <AbsoluteFill
        style={{
          transformOrigin: `${cx}px ${cy}px`,
          transform: `translate3d(${camX}px, ${camY}px, 0) scale(${camS})`, willChange: "transform",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: LW,
            height: LH,
            transform: `translate3d(${left}px, ${top + (1 - enter) * 90}px, 0)`, willChange: "transform",
            opacity: enter,
            filter: `${blp(fb(enter) * 16)}`,
          }}
        >
          <Img
            src={staticFile("shots/workspace_mac.jpg")}
            style={{ position: "absolute", left: scr.x, top: scr.y, width: scr.w, height: scr.h }}
          />
          {/* затемнение всего, кроме шапки */}
          <div
            style={{
              position: "absolute",
              left: scr.x,
              top: scr.y,
              width: scr.w,
              height: scr.h,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: hd.x - scr.x - 4,
                top: hd.y - scr.y - 4,
                width: hd.w + 8,
                height: hd.h + 8,
                borderRadius: 10,
                boxShadow: `0 0 0 3000px rgba(10,10,11,${0.62 * hl})`,
              }}
            />
          </div>
          <Img src={staticFile("els/macbook_keyed.png")} style={{ position: "absolute", left: 0, top: 0, width: LW, height: LH }} />
          {/* красная рамка вокруг шапки */}
          <div
            style={{
              position: "absolute",
              left: hd.x - 6,
              top: hd.y - 6,
              width: hd.w + 12,
              height: hd.h + 12,
              borderRadius: 12,
              border: `2.5px solid ${C.red}`,
              boxShadow: `0 0 0 6px rgba(239,49,36,0.14), 0 0 34px rgba(239,49,36,0.55)`,
              opacity: hl,
              transform: `scale(${1.04 - 0.04 * hl})`,
            }}
          />
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: 1 - push }}>
        <div style={{ position: "absolute", left: 0, top: 74, width: 1920, textAlign: "center" }}>
          <Reveal at={t.w(0, "мы") - 4} out={t.w(1, "теперь") - 10}>
            <Title>Новая короткая карточка клиента</Title>
          </Reveal>
        </div>
        <div style={{ position: "absolute", left: 0, top: 74, width: 1920, textAlign: "center" }}>
          <Reveal at={t.w(1, "теперь") + 8}>
            <Title>
              Всё о клиенте <span style={{ color: C.red }}>в одной строке</span>
            </Title>
          </Reveal>
        </div>
        <div style={{ position: "absolute", left: 0, top: 172, width: 1920, textAlign: "center" }}>
          <Reveal at={t.w(1, "видны") - 4} dy={18}>
            <Sub>и на любой странице</Sub>
          </Reveal>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};

const Easing3 = INOUT;

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontFamily: STYRENE, fontWeight: 700, fontSize: 76, letterSpacing: -1.8, color: C.white, lineHeight: 1.1 }}>
    {children}
  </div>
);
const Sub: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontFamily: STYRENE, fontWeight: 400, fontSize: 40, color: "rgba(255,255,255,0.66)" }}>{children}</div>
);

// ───────── 2. Физические лица ─────────
export const SceneFL: React.FC = () => {
  const t = at("fl");
  const L = layout(FL);
  const left = [
    { id: "name", at: t.w(3, "фио"), label: "ФИО" },
    { id: "meta", at: t.w(3, "pin"), label: "PIN" },
    { id: "meta", at: t.w(3, "сегмент"), label: "Сегмент" },
    { id: "voc", at: t.w(3, "оценка"), label: "Оценка VOC" },
    { id: "mark", at: t.w(3, "маркеры"), label: "Маркеры" },
    { id: "hist", at: t.w(3, "историю"), label: "История коммуникаций" },
    { id: "card", at: t.w(3, "полную"), label: "Полная карточка клиента" },
  ];
  const right = [
    { id: "auth", at: t.w(4, "доавторизация"), label: "Доавторизация" },
    { id: "msg", at: t.w(4, "сообщение"), label: "Сообщение клиенту" },
    { id: "bell", at: t.w(4, "уведомлен"), label: "Уведомления" },
    { id: "ns", at: t.w(4, "не"), label: "Не решено" },
    { id: "topic", at: t.w(4, "тематика"), label: "Тематика" },
  ];
  const stripFrom = t.w(3) - 40;
  return (
    <SceneShell>
      <Chapter icons={["fl"]} title="Физические лица" at={6} settle={t.w(3) - 56} />
      <SideHint text="Слева" at={t.w(3) - 6} out={t.w(4) - 20} x={SX + L.name.x} align="left" />
      <SideHint text="Справа" at={t.w(4) - 6} x={SX + L.topic.x + L.topic.w} align="right" />
      <StripIn from={stripFrom}>
        <Strip v={FL} />
      </StripIn>
      <Walk v={FL} steps={left} end={t.w(4) - 14} stripX={SX} stripY={SY} />
      <Walk v={FL} steps={right} end={t.end(4) + 30} stripX={SX} stripY={SY} />
    </SceneShell>
  );
};

// ───────── 3. Подсказки и копирование ─────────
export const SceneHover: React.FC = () => {
  const f = useCurrentFrame();
  const t = at("hover");
  const L = layout(FL);
  const auth = { x: L.auth.x + 20, y: 54 };
  const pin = { x: L.meta.x + 32, y: 56 };
  const name = { x: L.name.x + 190, y: 56 };
  const tHover = t.w(5, "наведении");
  const tTip = t.w(5, "появляется");
  const tPin = t.w(5, "pin");
  const tName = t.w(5, "фио");
  const tCopy = t.w(5, "копируются");
  const cur = useCursor([
    { f: 0, x: 1180, y: 300 },
    { f: tHover - 6, x: 1180, y: 300 },
    { f: tHover + 30, x: auth.x, y: auth.y },
    { f: tPin - 14, x: auth.x, y: auth.y },
    { f: tPin + 18, x: pin.x, y: pin.y },
    { f: tName - 4, x: pin.x, y: pin.y },
    { f: tName + 26, x: name.x, y: name.y },
  ]);
  const pinClick = tPin + 24;
  const nameClick = tCopy + 4;
  const p1 = press(f, pinClick);
  const p2 = press(f, nameClick);
  const curVis = anim(f, 4, 24, 0, 1);
  return (
    <SceneShell>
      <div style={{ position: "absolute", left: 120, top: 64, display: "flex", alignItems: "center", gap: 28 }}>
        <Reveal at={6} out={tPin - 10}>
          <HeadRow icon="cursor" text="Подсказка при наведении" />
        </Reveal>
      </div>
      <div style={{ position: "absolute", left: 120, top: 64 }}>
        <Reveal at={tPin + 2}>
          <HeadRow icon="copy" text="Копирование в один клик" />
        </Reveal>
      </div>
      <StripIn from={0}>
        <Strip v={FL}>
          <Tooltip x={L.auth.x + 20} text="Доавторизация" opacity={between(f, tTip - 8, tPin - 10)} />
          <Tooltip x={L.meta.x + 30} text="Скопировать" opacity={between(f, tPin + 16, pinClick + 3, 8)} />
          <Tooltip
            x={L.meta.x + 30}
            text="Скопировано"
            opacity={between(f, pinClick + 4, tName - 2, 8)}
          />
          <Tooltip x={L.name.x + 190} text="Скопировано" opacity={between(f, nameClick + 4, nameClick + 120, 8)} />
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              transform: `translate3d(${cur.x - 8}px, ${cur.y - 4}px, 0)`, willChange: "transform",
              opacity: curVis,
              zIndex: 10,
            }}
          >
            <Cursor hand={f > tHover + 20} press={Math.max(p1, p2)} />
          </div>
        </Strip>
      </StripIn>
      <div style={{ position: "absolute", left: 0, top: SY + STRIP_H + 150, width: 1920, textAlign: "center" }}>
        <Reveal at={tTip}>
          <Sub>Наведите курсор на иконку, чтобы увидеть подсказку</Sub>
        </Reveal>
      </div>
    </SceneShell>
  );
};

const HeadRow: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
    <El name={icon} size={96} style={{ filter: "drop-shadow(0 14px 24px rgba(0,0,0,0.5))" }} />
    <div style={{ fontFamily: STYRENE, fontWeight: 700, fontSize: 52, letterSpacing: -1, color: C.white }}>{text}</div>
  </div>
);

// ───────── 4. Юридические лица: УЛ и компания ─────────
export const SceneYL: React.FC = () => {
  const f = useCurrentFrame();
  const t = at("yl");
  const swap = t.w(9) - 30; // переход УЛ → компания
  const ul1 = [
    { id: "name", at: t.w(7, "фио"), label: "ФИО" },
    { id: "meta", at: t.w(7, "pin"), label: "PIN" },
    { id: "voc", at: t.w(7, "оценка"), label: "Оценка VOC" },
    { id: "mark", at: t.w(7, "маркеры"), label: "Маркеры" },
    { id: "hist", at: t.w(7, "история"), label: "История коммуникаций" },
    { id: "card", at: t.w(7, "полная"), label: "Полная карточка" },
  ];
  const ul2 = [
    { id: "ident", at: t.w(8, "идентификация"), label: "Идентификация" },
    { id: "msg", at: t.w(8, "сообщение"), label: "Сообщение клиенту" },
    { id: "urgent", at: t.w(8, "срочно"), label: "Срочно связаться" },
    { id: "bell", at: t.w(8, "уведомлен"), label: "Уведомления" },
    { id: "ns", at: t.w(8, "не"), label: "Не решено" },
    { id: "topic", at: t.w(8, "тематика"), label: "Тематика" },
  ];
  const yl1 = [
    { id: "name", at: t.w(9, "название"), label: "Название компании" },
    { id: "meta", at: t.w(9, "инн"), label: "ИНН" },
    { id: "meta", at: t.w(9, "pin"), label: "PIN" },
    { id: "meta", at: t.w(9, "сегмент"), label: "Сегмент" },
    { id: "mark", at: t.w(9, "маркеры"), label: "Маркеры" },
  ];
  const yl2 = [
    { id: "ask", at: t.w(10, "контрольные"), label: "Контрольные вопросы" },
    { id: "mail", at: t.w(10, "письма"), label: "Письма клиента" },
    { id: "msg", at: t.w(10, "сообщение"), label: "Сообщение клиенту" },
    { id: "urgent", at: t.w(10, "срочно"), label: "Срочно связаться" },
    { id: "video", at: t.w(10, "видеозвонки"), label: "Видеозвонки" },
    { id: "bell", at: t.w(10, "уведомлен"), label: "Уведомления" },
    { id: "ns", at: t.w(10, "не"), label: "Не решено" },
    { id: "topic", at: t.w(10, "тематика"), label: "Тематика" },
  ];
  const LU = layout(UL);
  const LY = layout(YL);
  const p = anim(f, swap, swap + 40, 0, 1, INOUT);
  return (
    <SceneShell>
      <Chapter
        icons={["ul", "yl"]}
        title="Юридические лица"
        at={6}
        settle={t.w(7) - 56}
        sub={[
          { text: "Уполномоченное лицо", at: t.w(7) - 20 },
          { text: "Компания", at: swap + 10 },
        ]}
      />
      <SideHint text="Слева" at={t.w(7) - 6} out={t.w(8) - 20} x={SX + LU.name.x} align="left" />
      <SideHint text="Справа" at={t.w(8) - 6} out={swap - 10} x={SX + LU.topic.x + LU.topic.w} align="right" />
      <SideHint text="Слева" at={t.w(9) - 6} out={t.w(10) - 20} x={SX + LY.name.x} align="left" />
      <SideHint text="Справа" at={t.w(10) - 6} x={SX + LY.topic.x + LY.topic.w} align="right" />
      <StripIn from={t.w(7) - 40}>
        <div style={{ position: "relative", width: STRIP_W, height: STRIP_H }}>
          <Strip v={UL} contentOpacity={1 - p} />
          <div style={{ position: "absolute", inset: 0, opacity: p }}>
            <Strip v={YL} contentOpacity={1} />
          </div>
        </div>
      </StripIn>
      <Walk v={UL} steps={ul1} end={t.w(8) - 14} stripX={SX} stripY={SY} />
      <Walk v={UL} steps={ul2} end={swap - 6} stripX={SX} stripY={SY} />
      <Walk v={YL} steps={yl1} end={t.w(10) - 14} stripX={SX} stripY={SY} />
      <Walk v={YL} steps={yl2} end={t.end(10) + 30} stripX={SX} stripY={SY} />
    </SceneShell>
  );
};

// ───────── 5. Маркер IMSI ведёт в УКД ─────────
export const SceneIMSI: React.FC = () => {
  const f = useCurrentFrame();
  const t = at("imsi");
  const L = layout(UL);
  const Y = 300;
  const badge = { x: L.mark.x + 36, y: 56 };
  const tI = t.w(12, "imsi");
  const tClick = t.w(12, "нажмите") + 6;
  const tOpen = t.w(12, "откроется");
  const cur = useCursor([
    { f: 0, x: 1100, y: 330 },
    { f: tI - 30, x: 1100, y: 330 },
    { f: tI + 6, x: badge.x, y: badge.y },
  ]);
  const panel = anim(f, tOpen - 6, tOpen + 50, 0, 1);
  return (
    <SceneShell>
      <div style={{ position: "absolute", left: 120, top: 64 }}>
        <Reveal at={t.w(11) - 6}>
          <HeadRow icon="bell" text="Статусы видны сразу" />
        </Reveal>
      </div>
      <StripIn from={4} y={Y}>
        <Strip v={UL}>
          <Tooltip
            x={badge.x}
            text=""
            lines={["Требуется обновление IMSI", "Нажмите для перехода в УКД"]}
            opacity={between(f, tI + 4, tOpen - 4, 10)}
          />
          <div
            style={{
              position: "absolute",
              left: L.mark.x - 6,
              top: 26,
              width: 84,
              height: 52,
              borderRadius: 14,
              border: `2.5px solid ${C.red}`,
              boxShadow: "0 0 26px rgba(239,49,36,0.45)",
              opacity: between(f, tI - 4, tOpen + 40, 12),
              transform: `scale(${1 + 0.08 * press(f, tClick)})`,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              transform: `translate3d(${cur.x - 8}px, ${cur.y - 4}px, 0)`, willChange: "transform",
              opacity: anim(f, tI - 34, tI - 20, 0, 1) * (1 - anim(f, tOpen + 20, tOpen + 34, 0, 1)),
              zIndex: 10,
            }}
          >
            <Cursor hand={f > tI} press={press(f, tClick)} />
          </div>
        </Strip>
      </StripIn>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          transform: `translate3d(${SX}px, ${Y + STRIP_H + 30 + (1 - panel) * 120}px, 0)`, willChange: "transform",
          opacity: panel,
                  }}
      >
        <UkdPanel />
      </div>
    </SceneShell>
  );
};

const UkdPanel: React.FC = () => (
  <div
    style={{
      width: STRIP_W,
      height: 520,
      borderRadius: 26,
      background: "white",
      padding: "34px 44px",
      boxSizing: "border-box",
      fontFamily: UI,
      color: C.uiText,
      boxShadow: "0 40px 90px rgba(0,0,0,0.55)",
      WebkitMaskImage: "linear-gradient(180deg, #000 70%, rgba(0,0,0,0) 100%)",
    }}
  >
    <div style={{ fontSize: 30, fontWeight: 700 }}>Удалённые каналы доступа</div>
    <div
      style={{
        marginTop: 22,
        padding: "16px 20px",
        borderRadius: 12,
        background: C.greenSoft,
        border: "1.5px solid #9BD8A7",
        fontSize: 20,
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div style={{ width: 24, height: 24, borderRadius: 12, background: C.green, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <IconCheck size={16} color="white" />
      </div>
      Доступ уполномоченного лица к интернет-банку <b>не блокирован</b>
    </div>
    <div style={{ marginTop: 22, fontSize: 19, color: C.uiMuted }}>Выберите вопрос, с которым обратился клиент</div>
    <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
      {["Подключённые компании", "Обновить IMSI", "Проверить IMSI", "Сбросить пароль"].map((c) => (
        <div
          key={c}
          style={{
            padding: "10px 16px",
            borderRadius: 20,
            fontSize: 18,
            fontWeight: 500,
            background: c === "Обновить IMSI" ? C.uiText : C.uiBg,
            color: c === "Обновить IMSI" ? "white" : C.uiText,
          }}
        >
          {c}
        </div>
      ))}
    </div>
    {["Проверка ФИО", "Проверка номера телефона УКД", "Автоматические проверки"].map((s) => (
      <div
        key={s}
        style={{ marginTop: 16, padding: "18px 22px", borderRadius: 14, border: `1.5px solid ${C.uiLine}`, fontSize: 21, fontWeight: 600 }}
      >
        {s}
      </div>
    ))}
  </div>
);

// ───────── 6. Переключалка ФЛ / УЛ / ЮЛ ─────────
const SW_W = 1880;
const SW_SCALE = 0.95;
const BTN = 84;
const BTN_GAP = 10;
const SW_EXTRA = BTN * 3 + BTN_GAP * 2 + 24;

export const SceneSwitch: React.FC = () => {
  const f = useCurrentFrame();
  const t = at("sw");
  const sx = (1920 - SW_W * SW_SCALE) / 2;
  const sy = SY;
  const btnX = (i: number) => SW_W - 40 - (BTN * 3 + BTN_GAP * 2) + i * (BTN + BTN_GAP);
  const marks = [t.w(14, "fl"), t.w(14, "ul", 0), t.w(14, "ul", 1)];
  const tList = t.w(16, "список");
  const tOpen = t.w(16, "открывается");
  const hoverB = { x: btnX(2) + BTN / 2, y: 56 };
  const cur = useCursor([
    { f: 0, x: 1500, y: 300 },
    { f: tList - 30, x: 1500, y: 300 },
    { f: tOpen - 4, x: hoverB.x, y: hoverB.y },
    { f: tOpen + 60, x: hoverB.x, y: hoverB.y },
    { f: tOpen + 110, x: btnX(2) - 120, y: 210 },
  ]);
  const drop = anim(f, tOpen - 4, tOpen + 26, 0, 1, INOUT);
  return (
    <SceneShell>
      <div style={{ position: "absolute", left: 120, top: 64 }}>
        <Reveal at={t.w(13) - 6}>
          <HeadRow icon="switch" text="Переключение ФЛ, УЛ и ЮЛ" />
        </Reveal>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          transformOrigin: "0 0",
          transform: `translate3d(${sx}px, ${sy}px, 0) scale(${SW_SCALE})`, willChange: "transform",
        }}
      >
        <StripLocalIn from={4}>
          <Strip v={FL} width={SW_W} extraRight={SW_EXTRA}>
            {["ФЛ", "УЛ", "ЮЛ"].map((b, i) => {
              const m = between(f, marks[i] - 4, marks[i] + 34, 8);
              const hov = i === 2 ? anim(f, tOpen - 8, tOpen + 6, 0, 1) : 0;
              return (
                <div
                  key={b}
                  style={{
                    position: "absolute",
                    left: btnX(i),
                    top: 28,
                    width: BTN,
                    height: 48,
                    borderRadius: 12,
                    background: i === 0 ? C.uiText : hov > 0 ? `rgba(28,28,30,${0.08 + 0.06 * hov})` : C.uiBg,
                    color: i === 0 ? "white" : C.uiText,
                    fontFamily: UI,
                    fontWeight: 600,
                    fontSize: 19,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 0 0 ${3 * m}px ${C.red}, 0 0 ${28 * m}px rgba(239,49,36,${0.5 * m})`,
                    transform: `scale(${1 + 0.06 * m})`,
                  }}
                >
                  {b}
                </div>
              );
            })}
            <div
              style={{
                position: "absolute",
                left: btnX(2) + BTN - 440,
                top: STRIP_H + 6,
                width: 440,
                opacity: drop * (1 - anim(f, tOpen + 150, tOpen + 172, 0, 1, INOUT)),
                transform: `translate3d(0, ${(1 - drop) * -14}px, 0)`, willChange: "transform",
                                transformOrigin: "100% 0",
              }}
            >
              <Dropdown hl={anim(f, tOpen + 96, tOpen + 110, 0, 1)} />
            </div>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                transform: `translate3d(${cur.x - 8}px, ${cur.y - 4}px, 0)`, willChange: "transform",
                opacity: anim(f, tList - 34, tList - 20, 0, 1),
                zIndex: 10,
              }}
            >
              <Cursor hand={f > tOpen - 10} />
            </div>
          </Strip>
        </StripLocalIn>
      </div>
      <div style={{ position: "absolute", left: 0, top: SY + STRIP_H + 300, width: 1920, textAlign: "center" }}>
        <Reveal at={t.w(15) - 4} out={tList - 14}>
          <Sub>Искать клиента заново не нужно</Sub>
        </Reveal>
      </div>
      <div style={{ position: "absolute", left: 0, top: SY + STRIP_H + 300, width: 1920, textAlign: "center" }}>
        <Reveal at={tList + 2}>
          <Sub>Список открывается при наведении</Sub>
        </Reveal>
      </div>
    </SceneShell>
  );
};

const StripLocalIn: React.FC<{ from: number; children: React.ReactNode }> = ({ from, children }) => {
  const f = useCurrentFrame();
  const p = anim(f, from, from + 50, 0, 1);
  return (
    <div
      style={{
        transform: `translate3d(0, ${(1 - p) * 60}px, 0)`, willChange: "transform",
        opacity: p,
              }}
    >
      {children}
    </div>
  );
};

const Dropdown: React.FC<{ hl: number }> = ({ hl }) => (
  <div
    style={{
      background: "white",
      borderRadius: 16,
      padding: 14,
      boxShadow: "0 24px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.05)",
      fontFamily: UI,
      color: C.uiText,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 14px",
        borderRadius: 10,
        background: C.uiBg,
        fontSize: 18,
        color: C.uiMuted,
      }}
    >
      Поиск
      <IconSearch size={20} color={C.uiMuted} />
    </div>
    {[
      { n: "ООО «АР Фэшн»", d: "ИНН 7725719187" },
      { n: "ООО «Новый агрокомплекс»", d: "ИНН 7700011111" },
    ].map((r, i) => (
      <div
        key={r.n}
        style={{
          marginTop: 8,
          padding: "12px 14px",
          borderRadius: 10,
          background: i === 0 ? `rgba(28,28,30,${0.06 * hl})` : "transparent",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontSize: 19, fontWeight: 600 }}>{r.n}</div>
          <div style={{ fontSize: 15, color: C.uiMuted, marginTop: 3 }}>{r.d}</div>
        </div>
        {i === 0 ? <IconCheck size={20} color={C.uiText} /> : null}
      </div>
    ))}
  </div>
);

// ───────── 7. «Полезные ссылки» ─────────
export const SceneLinks: React.FC = () => {
  const f = useCurrentFrame();
  const t = at("links");
  const tNew = t.w(16, "полезные") - 4;
  const m = anim(f, tNew, tNew + 40, 0, 1, INOUT);
  const fontPx = 46;
  const wOld = 250;
  const wNew = 470;
  const ic = anim(f, 0, 50, 0, 1);
  return (
    <SceneShell>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 70 }}>
        <div
          style={{
            opacity: ic,
            transform: `translate3d(0, ${(1 - ic) * 40}px, 0) scale(${0.88 + 0.12 * ic})`, willChange: "transform",
            filter: `${blp(fb(ic) * 10)} drop-shadow(0 24px 40px rgba(0,0,0,0.5))`,
          }}
        >
          <El name="link" size={220} />
        </div>
        <Reveal at={t.w(16, "раздел") - 4}>
          <div
            style={{
              position: "relative",
              width: wOld + (wNew - wOld) * m,
              height: 104,
              borderRadius: 52,
              background: "white",
              boxShadow: "0 30px 70px rgba(0,0,0,0.5)",
              fontFamily: UI,
              fontWeight: 600,
              fontSize: fontPx,
              color: C.uiText,
              overflow: "hidden",
            }}
          >
            <PillText text="Ссылки" o={1 - m} y={-m * 30} />
            <PillText text="Полезные ссылки" o={m} y={(1 - m) * 30} />
          </div>
        </Reveal>
      </AbsoluteFill>
    </SceneShell>
  );
};

const PillText: React.FC<{ text: string; o: number; y: number }> = ({ text, o, y }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      opacity: o,
      transform: `translate3d(0, ${y}px, 0)`, willChange: "transform",
      filter: `${blp(fb(o) * 6)}`,
      whiteSpace: "nowrap",
    }}
  >
    {text}
    <IconChevron size={34} color={C.uiText} />
  </div>
);

// ───────── 8. Финал ─────────
export const SceneOutro: React.FC = () => {
  const f = useCurrentFrame();
  const { durationInFrames: d } = useVideoConfig();
  const ic = anim(f, 6, 60, 0, 1);
  const fl = Math.sin((f / 60) * Math.PI * 0.45) * 8;
  const end = anim(f, d - 50, d - 4, 0, 1, INOUT);
  return (
    <SceneShell fade={18}>
      <AbsoluteFill style={{ opacity: 1 - end, alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div
          style={{
            opacity: ic,
            transform: `translate3d(0, ${(1 - ic) * 50 + fl}px, 0) scale(${0.92 + 0.08 * ic})`, willChange: "transform",
            filter: `${blp(fb(ic) * 12)} drop-shadow(0 30px 50px rgba(0,0,0,0.55))`,
          }}
        >
          <Img src={staticFile("els/card.png")} style={{ width: 900, height: 225 }} />
        </div>
        <div style={{ height: 70 }} />
        <Reveal at={22}>
          <div style={{ fontFamily: STYRENE, fontWeight: 700, fontSize: 96, letterSpacing: -2.4, color: C.white }}>
            Короткая карточка
          </div>
        </Reveal>
        <div style={{ height: 18 }} />
        <Reveal at={34} dy={18}>
          <Sub>уже в SFACall</Sub>
        </Reveal>
      </AbsoluteFill>
    </SceneShell>
  );
};

export { YL };
