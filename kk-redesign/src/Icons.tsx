import React from "react";
import { C } from "./theme";

type P = { size?: number; color?: string };

const Svg: React.FC<P & { children: React.ReactNode }> = ({ size = 28, color = C.uiText, children }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

export const IconUser: React.FC<P> = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="10" r="3" />
    <path d="M6.5 18.2c1.3-2 3.2-3 5.5-3s4.2 1 5.5 3" />
  </Svg>
);

export const IconBuilding: React.FC<P> = (p) => (
  <Svg {...p}>
    <rect x="5" y="3.5" width="10" height="17" rx="1.2" />
    <path d="M15 9h3.5a.5.5 0 0 1 .5.5v11" />
    <path d="M8.5 7.5h3M8.5 11h3M8.5 14.5h3M3.5 20.5h17" />
  </Svg>
);

export const IconHistory: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M3.5 12a8.5 8.5 0 1 0 2.5-6" />
    <path d="M3.5 4v4h4" />
    <path d="M12 7.5V12l3 2" />
  </Svg>
);

export const IconScan: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" />
    <circle cx="12" cy="10" r="2.6" />
    <path d="M7.8 16.5c1-1.6 2.4-2.4 4.2-2.4s3.2.8 4.2 2.4" />
  </Svg>
);

export const IconMail: React.FC<P> = (p) => (
  <Svg {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="1.6" />
    <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
  </Svg>
);

export const IconMailPlus: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M14 18.5H4.6A1.6 1.6 0 0 1 3 16.9V7.1a1.6 1.6 0 0 1 1.6-1.6h14.8A1.6 1.6 0 0 1 21 7.1V12" />
    <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    <path d="M19 15v6M16 18h6" />
  </Svg>
);

export const IconBell: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15z" />
    <path d="M10 20.5a2 2 0 0 0 4 0" />
  </Svg>
);

export const IconFlame: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M12 21c-3.9 0-6.5-2.6-6.5-6.2 0-3.4 2.4-5.4 3.6-8.8.4 1.9 1.4 3.2 2.6 3.9.3-2.6 1.6-4.9 3.5-6.4-.2 2.9 1.1 4.5 2.4 6.2 1 1.4 1.9 3 1.9 5.1C19.5 18.4 16 21 12 21z" />
  </Svg>
);

export const IconVideo: React.FC<P> = (p) => (
  <Svg {...p}>
    <rect x="3" y="6" width="13" height="12" rx="2" />
    <path d="m16 10.5 5-3v9l-5-3" />
  </Svg>
);

export const IconPencil: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M4 20l1-4.5L15.5 5a2.1 2.1 0 0 1 3 3L8 18.5z" />
    <path d="M13.5 7l3 3M4 20h16" />
  </Svg>
);

export const IconStar: React.FC<P> = ({ size = 22, color = C.green }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path
      d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z"
      fill={color}
    />
  </svg>
);

export const IconSearch: React.FC<P> = (p) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </Svg>
);

export const IconCheck: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Svg>
);

export const IconChevron: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="m7 10 5 5 5-5" />
  </Svg>
);

// Курсор: стрелка и рука
export const Cursor: React.FC<{ hand?: boolean; press?: number }> = ({ hand, press = 0 }) => (
  <div style={{ scale: 1 - press * 0.12, transformOrigin: "20% 10%" }}>
    {hand ? (
      <svg width={40} height={44} viewBox="0 0 24 26">
        <path
          d="M9 2.6c.9 0 1.6.7 1.6 1.6v7l.5-.1V8.9c0-.9.7-1.6 1.6-1.6s1.6.7 1.6 1.6v2.4l.4-.1v-1c0-.9.7-1.6 1.6-1.6s1.6.7 1.6 1.6v1.6l.3-.1c.9 0 1.6.7 1.6 1.6v4.3c0 3.6-2.6 6.4-6.2 6.4h-1.3c-2 0-3.5-.8-4.6-2.4L3.4 15c-.5-.8-.3-1.8.4-2.3.8-.5 1.7-.3 2.2.4l1.4 2V4.2c0-.9.7-1.6 1.6-1.6z"
          fill="white"
          stroke="#111"
          strokeWidth={1.2}
          strokeLinejoin="round"
        />
      </svg>
    ) : (
      <svg width={36} height={44} viewBox="0 0 20 26">
        <path d="M2 1.5v19.2l4.8-4.6 3 7 3.2-1.4-3-6.8h6.6z" fill="#111" stroke="white" strokeWidth={1.4} strokeLinejoin="round" />
      </svg>
    )}
  </div>
);
