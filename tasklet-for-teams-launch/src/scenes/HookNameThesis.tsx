import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { BodyText, DisplayText, FadeUp, SoftGlow, Stage } from "../components/Primitives";
import { colors, easeOut } from "../theme";

const WORD = "Introducing";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const chars = Math.floor(
    interpolate(frame, [4, 42], [0, WORD.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const caretOn = Math.floor(frame / 8) % 2 === 0;
  const caretOpacity = interpolate(frame, [48, 58], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Stage bg={colors.bgLight}>
      <SoftGlow color={colors.mint} x="18%" y="78%" />
      <SoftGlow color="rgba(78,129,78,0.28)" x="82%" y="22%" />
      <FadeUp delay={0} distance={18}>
        <DisplayText size={108} color={colors.textDark}>
          {WORD.slice(0, chars)}
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 96,
              marginLeft: 6,
              background: colors.fern,
              verticalAlign: "middle",
              opacity: caretOpacity * (caretOn ? 1 : 0.15),
              transform: "translateY(-4px)",
            }}
          />
        </DisplayText>
      </FadeUp>
      <FadeUp delay={36} distance={16} style={{ marginTop: 28 }}>
        <BodyText>The next evolution of Tasklet</BodyText>
      </FadeUp>
    </Stage>
  );
};

export const NameScene: React.FC = () => {
  const frame = useCurrentFrame();
  const arc = interpolate(frame, [8, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...easeOut),
  });

  return (
    <Stage bg={colors.bgWhite}>
      <SoftGlow color={colors.mint} x="50%" y="85%" />
      <FadeUp delay={2}>
        <div
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: colors.fern,
            marginBottom: 24,
          }}
        >
          Available now
        </div>
      </FadeUp>
      <FadeUp delay={8} distance={30}>
        <DisplayText size={120} color={colors.textDark}>
          Tasklet for Teams
        </DisplayText>
      </FadeUp>
      <svg
        width="520"
        height="40"
        viewBox="0 0 520 40"
        style={{ marginTop: 18, opacity: arc }}
      >
        <path
          d="M20 28 C 160 2, 360 2, 500 28"
          fill="none"
          stroke={colors.fern}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="520"
          strokeDashoffset={520 * (1 - arc)}
        />
      </svg>
    </Stage>
  );
};

export const ThesisScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Stage bg={colors.bgDark}>
      <SoftGlow color="rgba(192,255,171,0.22)" x="70%" y="30%" />
      <SoftGlow color="rgba(78,129,78,0.35)" x="20%" y="75%" />
      {[...Array(18)].map((_, i) => {
        const x = 12 + ((i * 47) % 76);
        const y = 18 + ((i * 29) % 64);
        const o = interpolate(frame, [4 + i * 1.5, 18 + i * 1.5], [0, 0.55], {
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
              width: 8 + (i % 3) * 4,
              height: 8 + (i % 3) * 4,
              borderRadius: 3,
              background: i % 4 === 0 ? colors.mint : "rgba(245,245,245,0.28)",
              opacity: o,
            }}
          />
        );
      })}
      <FadeUp delay={4} distance={24}>
        <DisplayText size={78} color={colors.textLight} style={{ maxWidth: 1400 }}>
          Your company’s AI
          <br />
          command center.
        </DisplayText>
      </FadeUp>
      <FadeUp delay={18} style={{ marginTop: 28 }}>
        <BodyText color={colors.textSoft} size={34}>
          Shared agents. Shared context. Leverage that compounds.
        </BodyText>
      </FadeUp>
    </Stage>
  );
};
