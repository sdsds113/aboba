import { loadFont } from "@remotion/google-fonts/Inter";
import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const { fontFamily } = loadFont("normal", {
  weights: ["600", "700", "800", "900"],
  subsets: ["cyrillic", "latin"],
});
const { fontFamily: italicFamily } = loadFont("italic", {
  weights: ["900"],
  subsets: ["cyrillic", "latin"],
});

const RED = "#e3261f";

// Replaces the repeated "guy holding his head" shot (7.53s–12.8s).
// Voice over it: «Каждый седьмой вызов в России — от навязчивых продавцов или мошенников».

const PhoneGlyph: React.FC<{ size: number; color: string; crossed?: boolean }> = ({
  size,
  color,
  crossed,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"
      fill={color}
    />
    {crossed ? (
      <path d="M3 3l18 18" stroke={color} strokeWidth={2.4} strokeLinecap="round" />
    ) : null}
  </svg>
);

const NUMBERS = [
  "+7 916 ••• •• 12",
  "+7 495 ••• •• 87",
  "+7 903 ••• •• 40",
  "+7 925 ••• •• 63",
  "+7 812 ••• •• 05",
  "+7 977 ••• •• 91",
  "+7 800 ••• •• 34",
];

const CallRow: React.FC<{ index: number; appearAt: number; spam: boolean }> = ({
  index,
  appearAt,
  spam,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame: frame - appearAt, fps, config: { damping: 14, stiffness: 160 } });
  // after the 7th call lands, the regular ones fade back and the spam one takes focus
  const focus = interpolate(frame, [44, 58], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dim = spam ? 1 : interpolate(focus, [0, 1], [1, 0.38]);
  const pulse = spam ? 1 + 0.035 * Math.max(0, Math.sin(((frame - 40) / fps) * Math.PI * 3)) * focus : 1;
  const shake = spam && frame > 36 && frame < 46 ? Math.sin(frame * 2.3) * 6 : 0;

  return (
    <div
      style={{
        height: 96,
        borderRadius: 24,
        display: "flex",
        alignItems: "center",
        padding: "0 26px",
        gap: 22,
        background: spam
          ? `linear-gradient(90deg, ${RED}, #a5130e)`
          : "rgba(22,22,26,0.82)",
        border: spam ? "2px solid rgba(255,255,255,0.45)" : "1px solid rgba(255,255,255,0.12)",
        boxShadow: spam
          ? `0 0 ${40 + 30 * focus}px rgba(227,38,31,${0.55 + 0.3 * focus})`
          : "0 10px 30px rgba(0,0,0,0.35)",
        opacity: enter * dim,
        transform: `translateY(${(1 - enter) * 70}px) translateX(${shake}px) scale(${pulse})`,
        transformOrigin: "50% 50%",
      }}
    >
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: spam ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.1)",
          border: spam ? "none" : "1px solid rgba(255,255,255,0.25)",
        }}
      >
        <PhoneGlyph size={30} color={spam ? RED : "#e9e9e9"} crossed={spam} />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ fontFamily, fontWeight: 800, fontSize: 30, color: "white" }}>
          Неизвестный номер
        </div>
        <div
          style={{
            fontFamily,
            fontWeight: 600,
            fontSize: 21,
            color: spam ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.55)",
          }}
        >
          {NUMBERS[index]} · входящий
        </div>
      </div>
      {spam ? (
        <div
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 22,
            letterSpacing: 1,
            color: RED,
            background: "white",
            padding: "8px 14px",
            borderRadius: 6,
          }}
        >
          СПАМ
        </div>
      ) : (
        <div style={{ fontFamily, fontWeight: 600, fontSize: 22, color: "rgba(255,255,255,0.5)" }}>
          {`21:${String(4 + index * 3).padStart(2, "0")}`}
        </div>
      )}
    </div>
  );
};

const Tag: React.FC<{
  text: string;
  at: number;
  rotate: number;
  red?: boolean;
}> = ({ text, at, rotate, red }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - at, fps, config: { damping: 11, stiffness: 220 } });
  const scale = interpolate(s, [0, 1], [1.8, 1]);
  return (
    <div
      style={{
        alignSelf: "flex-start",
        fontFamily,
        fontWeight: 900,
        fontSize: 52,
        letterSpacing: 1,
        textTransform: "uppercase",
        padding: "12px 26px",
        background: red ? RED : "white",
        color: red ? "white" : "#111",
        border: red ? "3px solid white" : "3px solid #111",
        boxShadow: "8px 8px 0 rgba(0,0,0,0.55)",
        opacity: interpolate(s, [0, 0.15], [0, 1], { extrapolateRight: "clamp" }),
        transform: `rotate(${rotate}deg) scale(${scale})`,
      }}
    >
      {text}
    </div>
  );
};

export const SpamInsert: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const bgZoom = interpolate(frame, [0, durationInFrames], [1.12, 1.24]);
  const listPush = interpolate(frame, [60, durationInFrames], [1, 1.07], {
    extrapolateLeft: "clamp",
  });

  const head = spring({ frame: frame - 2, fps, config: { damping: 16, stiffness: 140 } });
  const counter = Math.min(7, Math.max(0, Math.floor((frame - 4) / 5) + 1));

  const sub = spring({ frame: frame - 62, fps, config: { damping: 16 } });

  // red flash leading into the red "2026" scene
  const flash = interpolate(frame, [durationInFrames - 7, durationInFrames - 1], [0, 0.85], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0b0d", overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${bgZoom})` }}>
        <Img
          src={staticFile("room.jpg")}
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(22px) saturate(1.2)" }}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 72% 50%, rgba(227,38,31,0.32), rgba(0,0,0,0) 55%), linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* year badge, same as the surrounding 2025 shots */}
      <div
        style={{
          position: "absolute",
          left: 56,
          top: 56,
          padding: "10px 34px",
          background: RED,
          transform: "skewX(-12deg)",
          boxShadow: "0 6px 24px rgba(0,0,0,0.4)",
        }}
      >
        <div
          style={{
            fontFamily: italicFamily,
            fontStyle: "italic",
            fontWeight: 900,
            fontSize: 52,
            color: "white",
            transform: "skewX(12deg)",
          }}
        >
          2025
        </div>
      </div>

      {/* left: headline + tags */}
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 250,
          width: 900,
          display: "flex",
          flexDirection: "column",
          gap: 30,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            opacity: head,
            transform: `translateX(${(1 - head) * -80}px)`,
            fontFamily: italicFamily,
            fontStyle: "italic",
            fontWeight: 900,
            textTransform: "uppercase",
            color: "white",
            textShadow: "0 6px 20px rgba(0,0,0,0.6)",
          }}
        >
          <div style={{ fontSize: 72, lineHeight: 1 }}>Каждый</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <div
              style={{
                fontSize: 210,
                lineHeight: 0.95,
                color: RED,
                textShadow: "0 0 40px rgba(227,38,31,0.6)",
                width: 140,
                textAlign: "center",
              }}
            >
              {counter}
            </div>
            <div style={{ fontSize: 96, lineHeight: 1 }}>-й звонок</div>
          </div>
          <div
            style={{
              fontFamily,
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: 36,
              textTransform: "none",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            в России
          </div>
        </div>

        <div
          style={{
            fontFamily,
            fontWeight: 700,
            fontSize: 36,
            color: "rgba(255,255,255,0.85)",
            opacity: sub,
            transform: `translateY(${(1 - sub) * 20}px)`,
            marginTop: 10,
          }}
        >
          от кого:
        </div>
        <Tag text="Навязчивые продавцы" at={64} rotate={-3} />
        <Tag text="Мошенники" at={102} rotate={2.5} red />
      </div>

      {/* right: incoming calls feed */}
      <div
        style={{
          position: "absolute",
          right: 110,
          top: 150,
          width: 640,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          transform: `scale(${listPush})`,
          transformOrigin: "50% 85%",
        }}
      >
        <CallRow index={0} appearAt={4} spam={false} />
        <CallRow index={1} appearAt={9} spam={false} />
        <CallRow index={2} appearAt={14} spam={false} />
        <CallRow index={3} appearAt={19} spam={false} />
        <CallRow index={4} appearAt={24} spam={false} />
        <CallRow index={5} appearAt={29} spam={false} />
        <CallRow index={6} appearAt={34} spam />
      </div>

      <AbsoluteFill style={{ backgroundColor: RED, opacity: flash, mixBlendMode: "screen" }} />
    </AbsoluteFill>
  );
};
