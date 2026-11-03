import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import subtitles from "../data/subtitles.json";
import { STYRENE_A } from "../fonts";
import { FPS } from "../timeline";

// Субтитры новой озвучки. Тайминг каждой плашки — по посимвольной разметке ElevenLabs
// (src/data/subtitles.json). Внешний вид повторяет исходные вшитые плашки: тёмная
// полупрозрачная подложка со скруглением по центру внизу; появление и смена — склейкой,
// как в оригинале. Реплика мема «А чё так можно было что ли?» остаётся исходной (в видео).

// Старые плашки стёрты из видео (delogo). Чтобы след стирания не проступал по краям,
// новая плашка не меньше той, что была на этом месте: minW/minH/cy из src/data/subtitles.json
// (+8 px запаса с каждой стороны — столько же, сколько у зоны очистки).
const CLEAN_MARGIN = 8;

export const Subtitles: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const cur = subtitles.find((s) => t >= s.from && t < s.to);
  if (!cur) return null;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: cur.cy,
          translate: "0 -50%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            boxSizing: "border-box",
            minWidth: cur.minW ? cur.minW + 2 * CLEAN_MARGIN : undefined,
            minHeight: cur.minH ? cur.minH + 2 * CLEAN_MARGIN : undefined,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: 1000,
            padding: "11px 24px 13px",
            borderRadius: 14,
            background: "rgba(16, 16, 16, 0.62)",
            color: "white",
            fontFamily: STYRENE_A,
            fontWeight: 700,
            fontSize: 40,
            lineHeight: "48px",
            textAlign: "center",
            textWrap: "balance",
          }}
        >
          {cur.text}
        </div>
      </div>
    </AbsoluteFill>
  );
};
