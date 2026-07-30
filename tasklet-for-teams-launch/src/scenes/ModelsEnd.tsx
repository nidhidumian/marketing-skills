import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import {
  BodyText,
  DisplayText,
  FadeUp,
  SoftGlow,
  Stage,
} from "../components/Primitives";
import { colors, easeOut, fonts } from "../theme";
import { interFamily } from "../fonts";

const ModelChip: React.FC<{
  name: string;
  lab: string;
  delay: number;
  accent: string;
}> = ({ name, lab, delay, accent }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [delay, delay + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...easeOut),
  });
  return (
    <div
      style={{
        opacity: t,
        transform: `translateY(${(1 - t) * 20}px)`,
        width: 280,
        padding: "28px 26px",
        borderRadius: 24,
        background: colors.bgWhite,
        border: `1px solid ${colors.borderLight}`,
        boxShadow: "0 16px 48px rgba(18,18,21,0.06)",
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 12,
          background: accent,
          marginBottom: 18,
        }}
      />
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 16,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: colors.textMuted,
          marginBottom: 8,
        }}
      >
        {lab}
      </div>
      <div
        style={{
          fontFamily: interFamily,
          fontSize: 30,
          fontWeight: 650,
          color: colors.textDark,
        }}
      >
        {name}
      </div>
    </div>
  );
};

export const ModelsScene: React.FC = () => {
  return (
    <Stage bg={colors.bgLight}>
      <SoftGlow color={colors.mint} x="10%" y="80%" />
      <FadeUp delay={0}>
        <DisplayText size={68} color={colors.textDark}>
          Unlock every model.
          <br />
          Control every dollar.
        </DisplayText>
      </FadeUp>
      <div
        style={{
          display: "flex",
          gap: 20,
          marginTop: 48,
          justifyContent: "center",
        }}
      >
        <ModelChip name="Claude" lab="Anthropic" delay={10} accent="#D97757" />
        <ModelChip name="GPT" lab="OpenAI" delay={16} accent="#10A37F" />
        <ModelChip name="Gemini" lab="Google" delay={22} accent="#4285F4" />
      </div>
      <FadeUp delay={30} style={{ marginTop: 36 }}>
        <BodyText size={30}>
          Centralized billing · per-member limits · usage visibility
        </BodyText>
      </FadeUp>
    </Stage>
  );
};

export const EndScene: React.FC = () => {
  const frame = useCurrentFrame();
  const hold = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...easeOut),
  });

  return (
    <Stage bg={colors.bgDeep}>
      <SoftGlow color="rgba(192,255,171,0.28)" x="50%" y="55%" />
      <div style={{ opacity: hold, textAlign: "center" }}>
        <FadeUp delay={0} distance={20}>
          <DisplayText size={110} color={colors.mint}>
            Available now
          </DisplayText>
        </FadeUp>
        <FadeUp delay={10} style={{ marginTop: 18 }}>
          <BodyText color={colors.textSoft} size={34}>
            Create your organization. Invite the team. Build your first agent.
          </BodyText>
        </FadeUp>
        <FadeUp delay={20} style={{ marginTop: 48 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 16,
              padding: "22px 40px",
              borderRadius: 999,
              background: colors.mint,
              color: colors.bgDeep,
              fontFamily: interFamily,
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            tasklet.ai
          </div>
        </FadeUp>
        <FadeUp delay={28} style={{ marginTop: 28 }}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 20,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(192,255,171,0.7)",
            }}
          >
            Tasklet for Teams
          </div>
        </FadeUp>
      </div>
    </Stage>
  );
};
