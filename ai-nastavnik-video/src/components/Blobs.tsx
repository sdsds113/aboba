import React from "react";
import { noise3D } from "@remotion/noise";
import { H, W } from "../lib/core";

export type BlobSpec = {
  x: number;
  y: number;
  r: number;
  color: string;
  seed: number;
  /** relative edge wobble amplitude (0.08 calm .. 0.3 splashy) */
  wobble?: number;
  /** add the finer, higher-frequency edge detail (off = smooth) */
  detail?: boolean;
  /** time speed multiplier of edge motion */
  speed?: number;
  opacity?: number;
  /** horizontal/vertical stretch */
  sx?: number;
  sy?: number;
  rot?: number;
};

type Pt = [number, number];

const closedSmoothPath = (pts: Pt[]) => {
  const n = pts.length;
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d + " Z";
};

export const openSmoothPath = (pts: Pt[]) => {
  const n = pts.length;
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(n - 1, i + 2)];
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
};

/** Organic liquid blob outline, edges drift with 3D noise over time t (seconds). */
export const blobPath = (b: BlobSpec, t: number, points = 12) => {
  const wobble = b.wobble ?? 0.16;
  const speed = b.speed ?? 1;
  const sx = b.sx ?? 1;
  const sy = b.sy ?? 1;
  const rot = ((b.rot ?? 0) * Math.PI) / 180;
  const pts: Pt[] = [];
  for (let i = 0; i < points; i++) {
    const a = (i / points) * Math.PI * 2;
    const nx = Math.cos(a) * 0.9;
    const ny = Math.sin(a) * 0.9;
    const n1 = noise3D(`b${b.seed}`, nx, ny, (t * speed) / 7);
    const n2 = b.detail === false ? 0 : noise3D(`c${b.seed}`, nx * 2.2, ny * 2.2, (t * speed) / 4) * 0.35;
    const rr = b.r * (1 + wobble * (n1 + n2));
    const px = Math.cos(a) * rr * sx;
    const py = Math.sin(a) * rr * sy;
    pts.push([
      b.x + px * Math.cos(rot) - py * Math.sin(rot),
      b.y + px * Math.sin(rot) + py * Math.cos(rot),
    ]);
  }
  return closedSmoothPath(pts);
};

/**
 * A full-frame layer of liquid paint blobs.
 * goo > 0 makes neighbouring blobs merge like liquid. blur softens the whole layer (depth).
 */
export const BlobField: React.FC<{
  id: string;
  blobs: BlobSpec[];
  t: number;
  goo?: number;
  blur?: number;
  opacity?: number;
  style?: React.CSSProperties;
}> = ({ id, blobs, t, goo = 0, blur = 0, opacity = 1, style }) => {
  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "visible",
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
        opacity,
        ...style,
      }}
    >
      {goo > 0 ? (
        <defs>
          <filter id={`goo-${id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={goo} result="b" />
            <feColorMatrix
              in="b"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -11"
            />
          </filter>
        </defs>
      ) : null}
      <g filter={goo > 0 ? `url(#goo-${id})` : undefined}>
        {blobs.map((b, i) =>
          b.r <= 0.5 || (b.opacity ?? 1) <= 0 ? null : (
            <path
              key={i}
              d={blobPath(b, t)}
              fill={b.color}
              opacity={b.opacity ?? 1}
            />
          ),
        )}
      </g>
    </svg>
  );
};
