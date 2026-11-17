import React, { useMemo } from "react";
import { getLength } from "@remotion/paths";
import { noise2D } from "@remotion/noise";
import { openSmoothPath } from "./Blobs";

type Pt = [number, number];

/** Hand-drawn loop around a rectangle: ~1.15 turns, slightly wobbly, open ends. */
export const loopAround = (
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  seed = 1,
  pad = 14,
) => {
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  const rx = (x1 - x0) / 2 + pad + Math.min(40, (x1 - x0) * 0.06);
  const ry = (y1 - y0) / 2 + pad + Math.min(30, (y1 - y0) * 0.12);
  const pts: Pt[] = [];
  const N = 26;
  const start = -2.6 + noise2D(`s${seed}`, 0, 0) * 0.3;
  const turns = 1.12;
  for (let i = 0; i <= N; i++) {
    const p = i / N;
    const a = start + p * Math.PI * 2 * turns;
    const j = 1 + noise2D(`l${seed}`, p * 3, 0) * 0.05 + p * 0.06;
    pts.push([cx + Math.cos(a) * rx * j, cy + Math.sin(a) * ry * j]);
  }
  return openSmoothPath(pts);
};

/** Wavy cord that travels through the given points (like the cords between photos in the posts). */
export const wavyThrough = (points: Pt[], amp = 40, seed = 3) => {
  const pts: Pt[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const [ax, ay] = points[i];
    const [bx, by] = points[i + 1];
    const dx = bx - ax;
    const dy = by - ay;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    pts.push([ax, ay]);
    const k = 3;
    for (let j = 1; j <= k; j++) {
      const p = j / (k + 1);
      const s = (j % 2 === 0 ? -1 : 1) * amp * (0.7 + 0.6 * Math.abs(noise2D(`w${seed}`, i, j)));
      pts.push([ax + dx * p + nx * s, ay + dy * p + ny * s]);
    }
  }
  pts.push(points[points.length - 1]);
  return openSmoothPath(pts);
};

/** White cord that draws itself. from/to = visible portion of the path (0..1). */
export const Thread: React.FC<{
  d: string;
  from?: number;
  to: number;
  width?: number;
  color?: string;
  opacity?: number;
  style?: React.CSSProperties;
  viewBox?: string;
  w?: number;
  h?: number;
}> = ({
  d,
  from = 0,
  to,
  width = 4,
  color = "#fff",
  opacity = 1,
  style,
  viewBox,
  w = 1920,
  h = 1080,
}) => {
  const len = useMemo(() => getLength(d), [d]);
  const a = Math.max(0, Math.min(1, from));
  const b = Math.max(a, Math.min(1, to));
  if (b - a <= 0.0005 || opacity <= 0) return null;
  return (
    <svg
      width={w}
      height={h}
      viewBox={viewBox ?? `0 0 ${w} ${h}`}
      style={{ position: "absolute", left: 0, top: 0, overflow: "visible", pointerEvents: "none", ...style }}
    >
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={`${len * (b - a)} ${len * 2}`}
        strokeDashoffset={-len * a}
        opacity={opacity}
      />
    </svg>
  );
};
