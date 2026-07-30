/**
 * Style C — UI Chrome
 * Craft from X launch film: floating pills, black CTA capsules,
 * prompt bars, soft shadows on white — product UI as the hero.
 */
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { BW, FadeIn, Full, inter, monoEase } from "./shared";

const t = linearTiming({ durationInFrames: 8 });

const Pill: React.FC<{ label: string; delay: number; icon?: string }> = ({
  label,
  delay,
  icon = "●",
}) => {
  const frame = useCurrentFrame();
  const a = interpolate(frame, [delay, delay + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: monoEase,
  });
  return (
    <div
      style={{
        opacity: a,
        transform: `translateY(${(1 - a) * 16}px) scale(${0.96 + a * 0.04})`,
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        padding: "16px 26px",
        borderRadius: 999,
        background: BW.white,
        border: `1px solid ${BW.line}`,
        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        fontFamily: inter,
        fontSize: 26,
        fontWeight: 600,
        color: BW.ink,
      }}
    >
      <span style={{ color: BW.mute, fontSize: 14 }}>{icon}</span>
      {label}
    </div>
  );
};

const BlackCTA: React.FC<{ label: string; delay?: number }> = ({
  label,
  delay = 8,
}) => {
  const frame = useCurrentFrame();
  const a = interpolate(frame, [delay, delay + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  return (
    <div
      style={{
        opacity: a,
        transform: `scale(${0.92 + a * 0.08})`,
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        padding: "22px 40px",
        borderRadius: 999,
        background: BW.black,
        color: BW.white,
        fontFamily: inter,
        fontSize: 34,
        fontWeight: 600,
        letterSpacing: "-0.02em",
      }}
    >
      {label}
    </div>
  );
};

const PromptBar: React.FC<{ text: string; delay?: number }> = ({
  text,
  delay = 6,
}) => {
  const frame = useCurrentFrame();
  const a = interpolate(frame, [delay, delay + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: monoEase,
  });
  const chars = Math.floor(
    interpolate(frame, [delay + 8, delay + 40], [0, text.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  return (
    <div
      style={{
        opacity: a,
        transform: `translateY(${(1 - a) * 20}px)`,
        width: 980,
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "22px 26px",
        borderRadius: 999,
        background: BW.white,
        border: `1px solid ${BW.line}`,
        boxShadow: "0 18px 50px rgba(0,0,0,0.08)",
        fontFamily: inter,
      }}
    >
      <span style={{ color: BW.mute, fontSize: 28, fontWeight: 500 }}>+</span>
      <span
        style={{
          flex: 1,
          fontSize: 28,
          fontWeight: 500,
          color: BW.ink,
          letterSpacing: "-0.02em",
        }}
      >
        {text.slice(0, chars)}
        <span
          style={{
            display: "inline-block",
            width: 2,
            height: 26,
            background: BW.ink,
            marginLeft: 2,
            verticalAlign: "middle",
            opacity: Math.floor(frame / 8) % 2 ? 1 : 0.15,
          }}
        />
      </span>
      <span style={{ fontSize: 18, color: BW.mute, fontWeight: 600 }}>
        Tasklet
      </span>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: BW.black,
          color: BW.white,
          display: "grid",
          placeItems: "center",
          fontSize: 18,
        }}
      >
        ↑
      </div>
    </div>
  );
};

const Hook: React.FC = () => (
  <Full bg={BW.off}>
    <FadeIn delay={2}>
      <div
        style={{
          fontFamily: inter,
          fontSize: 28,
          fontWeight: 600,
          color: BW.mute,
          marginBottom: 28,
          letterSpacing: "-0.01em",
        }}
      >
        Agent Builder
      </div>
    </FadeIn>
    <BlackCTA label="Create Team Agent +" delay={8} />
  </Full>
);

const Name: React.FC = () => (
  <Full bg={BW.white}>
    <FadeIn delay={2}>
      <div
        style={{
          fontFamily: inter,
          fontSize: 72,
          fontWeight: 650,
          letterSpacing: "-0.04em",
          marginBottom: 40,
        }}
      >
        Tasklet for Teams
      </div>
    </FadeIn>
    <PromptBar text="Build a Company Pulse agent for our workspace" />
  </Full>
);

const Tools: React.FC = () => (
  <Full bg={BW.off}>
    <FadeIn delay={0}>
      <div
        style={{
          fontFamily: inter,
          fontSize: 48,
          fontWeight: 600,
          letterSpacing: "-0.035em",
          marginBottom: 36,
        }}
      >
        Share access to every tool
      </div>
    </FadeIn>
    <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", maxWidth: 1100 }}>
      <Pill label="CRM" delay={10} icon="◎" />
      <Pill label="Calendar" delay={16} icon="◷" />
      <Pill label="Projects" delay={22} icon="▦" />
      <Pill label="Files" delay={28} icon="⌘" />
      <Pill label="Slack" delay={34} icon="◈" />
    </div>
  </Full>
);

const KnowledgeRow: React.FC<{ item: string; index: number }> = ({
  item,
  index,
}) => {
  const frame = useCurrentFrame();
  const a = interpolate(frame, [10 + index * 6, 20 + index * 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        opacity: a,
        padding: "14px 0",
        borderTop: index ? `1px solid ${BW.line}` : "none",
        fontFamily: inter,
        fontSize: 28,
        fontWeight: 500,
        color: BW.ink,
      }}
    >
      {item}
    </div>
  );
};

const Knowledge: React.FC = () => (
  <Full bg={BW.white}>
    <FadeIn delay={2}>
      <div
        style={{
          width: 720,
          borderRadius: 28,
          background: BW.white,
          border: `1px solid ${BW.line}`,
          boxShadow: "0 24px 60px rgba(0,0,0,0.08)",
          padding: 36,
          textAlign: "left",
        }}
      >
        <div
          style={{
            fontFamily: inter,
            fontSize: 18,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: BW.mute,
            marginBottom: 18,
          }}
        >
          Workspace Knowledge
        </div>
        {["Operating manuals", "Brand guidelines", "Product specs", "Talk tracks"].map(
          (item, i) => (
            <KnowledgeRow key={item} item={item} index={i} />
          ),
        )}
      </div>
    </FadeIn>
  </Full>
);

const Agents: React.FC = () => (
  <Full bg={BW.off}>
    <FadeIn delay={2}>
      <div
        style={{
          fontFamily: inter,
          fontSize: 52,
          fontWeight: 600,
          letterSpacing: "-0.035em",
          marginBottom: 32,
          textAlign: "center",
        }}
      >
        Build once. Whole team upgrades.
      </div>
    </FadeIn>
    <BlackCTA label="Share agent →" delay={12} />
  </Full>
);

const End: React.FC = () => (
  <Full bg={BW.white}>
    <FadeIn delay={2}>
      <div
        style={{
          fontFamily: inter,
          fontSize: 64,
          fontWeight: 600,
          letterSpacing: "-0.04em",
          marginBottom: 36,
        }}
      >
        Available now
      </div>
    </FadeIn>
    <BlackCTA label="Open tasklet.ai →" delay={10} />
  </Full>
);

export const UIChrome: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: BW.off }}>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={90} name="Hook">
        <Hook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence durationInFrames={100} name="Name">
        <Name />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence durationInFrames={100} name="Tools">
        <Tools />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence durationInFrames={110} name="Knowledge">
        <Knowledge />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence durationInFrames={100} name="Agents">
        <Agents />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence durationInFrames={140} name="End">
        <End />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);

export const UICHROME_FRAMES = 600;
