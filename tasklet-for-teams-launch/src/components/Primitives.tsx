import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { colors, easeOut, fonts } from "../theme";
import { ensureSeasonMix, interFamily } from "../fonts";

ensureSeasonMix();

export const FadeUp: React.FC<{
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  duration?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, distance = 28, duration = 18, style }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...easeOut),
  });

  return (
    <div
      style={{
        opacity: t,
        transform: `translateY(${(1 - t) * distance}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Stage: React.FC<{
  bg: string;
  children: React.ReactNode;
}> = ({ bg, children }) => (
  <AbsoluteFill
    style={{
      backgroundColor: bg,
      color: bg === colors.bgDark || bg === colors.bgDeep ? colors.textLight : colors.textDark,
      fontFamily: interFamily,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    }}
  >
    {children}
  </AbsoluteFill>
);

export const DisplayText: React.FC<{
  children: React.ReactNode;
  size?: number;
  color?: string;
  weight?: number;
  italic?: boolean;
  style?: React.CSSProperties;
}> = ({
  children,
  size = 92,
  color,
  weight = 600,
  italic = false,
  style,
}) => (
  <div
    style={{
      fontFamily: fonts.display,
      fontSize: size,
      fontWeight: weight,
      fontStyle: italic ? "italic" : "normal",
      letterSpacing: "-0.03em",
      lineHeight: 1.05,
      color,
      textAlign: "center",
      ...style,
    }}
  >
    {children}
  </div>
);

export const BodyText: React.FC<{
  children: React.ReactNode;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({ children, size = 36, color = colors.textMuted, style }) => (
  <div
    style={{
      fontFamily: interFamily,
      fontSize: size,
      fontWeight: 500,
      letterSpacing: "-0.02em",
      lineHeight: 1.35,
      color,
      textAlign: "center",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Eyebrow: React.FC<{
  children: React.ReactNode;
  dark?: boolean;
}> = ({ children, dark }) => (
  <div
    style={{
      fontFamily: fonts.mono,
      fontSize: 22,
      fontWeight: 500,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: dark ? colors.mint : colors.fern,
      marginBottom: 28,
    }}
  >
    {children}
  </div>
);

export const SoftGlow: React.FC<{ color: string; x: string; y: string }> = ({
  color,
  x,
  y,
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: 720,
      height: 720,
      borderRadius: "50%",
      background: color,
      filter: "blur(90px)",
      opacity: 0.45,
      pointerEvents: "none",
      transform: "translate(-50%, -50%)",
    }}
  />
);
