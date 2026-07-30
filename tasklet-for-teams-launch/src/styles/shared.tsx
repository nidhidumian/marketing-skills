import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

export const { fontFamily: inter } = loadFont("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const monoEase = Easing.bezier(0.22, 1, 0.36, 1);
export const punchEase = Easing.bezier(0.16, 1, 0.3, 1);

export const BW = {
  white: "#FFFFFF",
  off: "#F4F4F5",
  black: "#000000",
  ink: "#111111",
  mute: "#8A8A8E",
  line: "#D4D4D8",
  blue: "#6B7CFF",
  red: "#C45C5C",
};

export const TypeCaret: React.FC<{
  text: string;
  start?: number;
  end?: number;
  color?: string;
  caretColor?: string;
  size?: number;
  weight?: number;
  prefix?: React.ReactNode;
  ghost?: string;
  ghostColor?: string;
}> = ({
  text,
  start = 2,
  end = 36,
  color = BW.ink,
  caretColor,
  size = 96,
  weight = 500,
  prefix,
  ghost,
  ghostColor = BW.blue,
}) => {
  const frame = useCurrentFrame();
  const chars = Math.floor(
    interpolate(frame, [start, end], [0, text.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const typed = text.slice(0, chars);
  const ghostChars = ghost
    ? Math.floor(
        interpolate(frame, [end, end + 16], [0, ghost.length], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      )
    : 0;
  const blink = Math.floor(frame / 8) % 2 === 0;

  return (
    <div
      style={{
        fontFamily: inter,
        fontSize: size,
        fontWeight: weight,
        letterSpacing: "-0.04em",
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 1.05,
      }}
    >
      {prefix}
      <span>{typed}</span>
      {ghost ? (
        <span style={{ color: ghostColor }}>{ghost.slice(0, ghostChars)}</span>
      ) : null}
      <span
        style={{
          display: "inline-block",
          width: Math.max(3, size * 0.045),
          height: size * 0.85,
          marginLeft: 4,
          background: caretColor ?? color,
          opacity: blink ? 1 : 0.12,
          transform: "translateY(2px)",
        }}
      />
    </div>
  );
};

export const FadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  dur?: number;
  y?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, dur = 14, y = 18, style }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [delay, delay + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: monoEase,
  });
  return (
    <div
      style={{
        opacity: t,
        transform: `translateY(${(1 - t) * y}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Full: React.FC<{
  bg: string;
  children: React.ReactNode;
  color?: string;
}> = ({ bg, children, color = BW.ink }) => (
  <AbsoluteFill
    style={{
      backgroundColor: bg,
      color,
      fontFamily: inter,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    }}
  >
    {children}
  </AbsoluteFill>
);

export const DashedRing: React.FC<{
  label: string;
  color?: string;
  size?: number;
}> = ({ label, color = BW.white, size = 420 }) => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [4, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: monoEase,
  });
  const r = size / 2 - 8;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ position: "absolute", inset: 0 }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeDasharray={`${10} ${14}`}
          strokeDashoffset={c * (1 - draw)}
          opacity={0.85}
        />
        <line
          x1={0}
          y1={size / 2}
          x2={size * 0.18}
          y2={size / 2}
          stroke={color}
          strokeWidth={1.5}
          strokeDasharray="6 10"
          opacity={draw * 0.7}
        />
        <line
          x1={size * 0.82}
          y1={size / 2}
          x2={size}
          y2={size / 2}
          stroke={color}
          strokeWidth={1.5}
          strokeDasharray="6 10"
          opacity={draw * 0.7}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          fontSize: 72,
          fontWeight: 600,
          letterSpacing: "-0.04em",
          color,
          opacity: interpolate(frame, [10, 24], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const NodeField: React.FC<{ light?: boolean; accent?: string }> = ({
  light = true,
  accent = BW.ink,
}) => {
  const frame = useCurrentFrame();
  return (
    <>
      {[...Array(22)].map((_, i) => {
        const x = 8 + ((i * 37) % 84);
        const y = 10 + ((i * 53) % 78);
        const o = interpolate(frame, [2 + i, 14 + i], [0, i % 5 === 0 ? 0.9 : 0.35], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: 7 + (i % 3) * 3,
              height: 7 + (i % 3) * 3,
              background: i % 5 === 0 ? accent : light ? "#A1A1AA" : "#3F3F46",
              opacity: o,
            }}
          />
        );
      })}
    </>
  );
};
