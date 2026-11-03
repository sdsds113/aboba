import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import wipe from "../data/wipeMask.json";
import { PAGE79 } from "../timeline";
import { ConditionsArticle } from "./ConditionsArticle";

// 78,67–80,58 с: страница статьи перед зелёной шторкой. Старый блок с порогами закрываем
// белой плашкой с актуальными условиями в той же раскладке (масштаб страницы 1:1).
// Когда сверху наезжает шторка, плашка обрезается по её краю (маска снята покадрово
// из исходника: src/data/wipeMask.json), чтобы новый текст не лёг поверх зелёного.

const PATCH = { x: 815, y: 700, w: 1105, h: 380 };
const frames = wipe.frames as Record<string, number[]>;

const clipFor = (absFrame: number): string | undefined => {
  const edge = frames[String(absFrame)];
  if (!edge) return undefined;
  const pts = wipe.cols.map((x, i) => `${x - PATCH.x}px ${Math.max(0, edge[i] + 1 - PATCH.y)}px`);
  // края маски растягиваем до краёв плашки
  const first = Math.max(0, edge[0] + 1 - PATCH.y);
  const last = Math.max(0, edge[edge.length - 1] + 1 - PATCH.y);
  return `polygon(0px ${first}px, ${pts.join(", ")}, ${PATCH.w}px ${last}px, ${PATCH.w}px ${PATCH.h}px, 0px ${PATCH.h}px)`;
};

export const Page79Patch: React.FC = () => {
  const frame = useCurrentFrame();
  const abs = PAGE79.loadingFrom + frame;
  const loading = abs < PAGE79.loadedFrom;
  return (
    <AbsoluteFill>
      {loading ? <Img src={staticFile("generated/page79.png")} style={{ width: 1920, height: 1080 }} /> : null}
      <div
        style={{
          position: "absolute",
          left: PATCH.x,
          top: PATCH.y,
          width: PATCH.w,
          height: PATCH.h,
          overflow: "hidden",
          background: "white",
          clipPath: clipFor(abs),
        }}
      >
        <div style={{ position: "absolute", left: -PATCH.x, top: -PATCH.y }}>
          <ConditionsArticle />
        </div>
      </div>
    </AbsoluteFill>
  );
};
