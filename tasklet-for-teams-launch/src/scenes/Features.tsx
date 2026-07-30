import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import {
  BodyText,
  DisplayText,
  Eyebrow,
  FadeUp,
  SoftGlow,
  Stage,
} from "../components/Primitives";
import { colors, easeOut, fonts } from "../theme";
import { interFamily } from "../fonts";

const Pill: React.FC<{ label: string; delay: number; icon: string }> = ({
  label,
  delay,
  icon,
}) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [delay, delay + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...easeOut),
  });
  return (
    <div
      style={{
        opacity: t,
        transform: `translateY(${(1 - t) * 18}px) scale(${0.96 + t * 0.04})`,
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "18px 28px",
        borderRadius: 999,
        background: colors.bgWhite,
        border: `1px solid ${colors.borderLight}`,
        boxShadow: "0 12px 40px rgba(18,18,21,0.06)",
        fontFamily: interFamily,
        fontSize: 28,
        fontWeight: 600,
        color: colors.textDark,
      }}
    >
      <span
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: colors.mint,
          color: colors.bgDeep,
          display: "grid",
          placeItems: "center",
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        {icon}
      </span>
      {label}
    </div>
  );
};

export const ToolsScene: React.FC = () => {
  return (
    <Stage bg={colors.bgLight}>
      <SoftGlow color={colors.mint} x="15%" y="20%" />
      <div style={{ width: "100%", maxWidth: 1500, padding: "0 80px" }}>
        <FadeUp delay={0}>
          <Eyebrow>Share access</Eyebrow>
        </FadeUp>
        <FadeUp delay={4}>
          <DisplayText
            size={72}
            color={colors.textDark}
            style={{ textAlign: "left", maxWidth: 1100 }}
          >
            Connect once.
            <br />
            Share safely.
          </DisplayText>
        </FadeUp>
        <FadeUp delay={14} style={{ marginTop: 18 }}>
          <BodyText
            color={colors.textMuted}
            size={30}
            style={{ textAlign: "left", maxWidth: 900 }}
          >
            CRM, calendar, files, data — without handing out API keys.
          </BodyText>
        </FadeUp>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            marginTop: 48,
          }}
        >
          <Pill label="CRM" delay={20} icon="◎" />
          <Pill label="Calendar" delay={26} icon="◷" />
          <Pill label="Projects" delay={32} icon="▦" />
          <Pill label="Files & data" delay={38} icon="⌘" />
        </div>
      </div>
    </Stage>
  );
};

export const KnowledgeScene: React.FC = () => {
  const items = [
    "Operating manuals",
    "Brand guidelines",
    "Product specs",
    "Approved talk tracks",
  ];
  const frame = useCurrentFrame();

  return (
    <Stage bg={colors.bgWhite}>
      <SoftGlow color="rgba(154,162,255,0.25)" x="85%" y="70%" />
      <div
        style={{
          display: "flex",
          gap: 72,
          alignItems: "center",
          width: "100%",
          maxWidth: 1600,
          padding: "0 96px",
        }}
      >
        <div style={{ flex: 1 }}>
          <FadeUp delay={0}>
            <Eyebrow>Share knowledge & skills</Eyebrow>
          </FadeUp>
          <FadeUp delay={4}>
            <DisplayText
              size={68}
              color={colors.textDark}
              style={{ textAlign: "left" }}
            >
              Every agent
              <br />
              knows the business.
            </DisplayText>
          </FadeUp>
          <FadeUp delay={14} style={{ marginTop: 20 }}>
            <BodyText
              size={30}
              style={{ textAlign: "left", maxWidth: 640 }}
            >
              Workspace Knowledge compounds. Skills teach agents to work your
              way.
            </BodyText>
          </FadeUp>
        </div>
        <div
          style={{
            width: 520,
            borderRadius: 28,
            background: colors.bgDeep,
            padding: 36,
            boxShadow: "0 30px 80px rgba(9,52,42,0.28)",
          }}
        >
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 18,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: colors.mint,
              marginBottom: 22,
            }}
          >
            Workspace Knowledge
          </div>
          {items.map((item, i) => {
            const t = interpolate(frame, [12 + i * 6, 24 + i * 6], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(...easeOut),
            });
            return (
              <div
                key={item}
                style={{
                  opacity: t,
                  transform: `translateX(${(1 - t) * 16}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "16px 0",
                  borderTop: i === 0 ? "none" : "1px solid rgba(192,255,171,0.15)",
                  color: colors.textLight,
                  fontFamily: interFamily,
                  fontSize: 26,
                  fontWeight: 500,
                }}
              >
                <span style={{ color: colors.mint }}>✓</span>
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </Stage>
  );
};

export const AgentsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = interpolate(frame % 40, [0, 20, 40], [0.55, 1, 0.55], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Stage bg={colors.bgDark}>
      <SoftGlow color="rgba(192,255,171,0.18)" x="50%" y="40%" />
      <FadeUp delay={0}>
        <Eyebrow dark>Share agents</Eyebrow>
      </FadeUp>
      <FadeUp delay={4}>
        <DisplayText size={76} color={colors.textLight}>
          Build once.
          <br />
          The whole team upgrades.
        </DisplayText>
      </FadeUp>
      <FadeUp delay={16} style={{ marginTop: 36 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            padding: "16px 28px",
            borderRadius: 999,
            border: `1px solid ${colors.borderDark}`,
            background: "rgba(192,255,171,0.08)",
            color: colors.mint,
            fontFamily: interFamily,
            fontSize: 28,
            fontWeight: 600,
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: colors.mint,
              boxShadow: `0 0 ${18 * pulse}px ${colors.mint}`,
              opacity: pulse,
            }}
          />
          Cloud agents · running 24/7
        </div>
      </FadeUp>
      <FadeUp delay={24} style={{ marginTop: 22 }}>
        <BodyText color={colors.textSoft} size={30}>
          Talk to the agent — or just use the UI it built.
        </BodyText>
      </FadeUp>
    </Stage>
  );
};
