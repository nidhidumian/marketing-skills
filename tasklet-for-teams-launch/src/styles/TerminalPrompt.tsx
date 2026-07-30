/**
 * Style B — Terminal Prompt
 * Craft from X launch film: `>` prompt, caret typing, ghost autocomplete,
 * light↔dark terminal flips, mono-ish Inter UI.
 */
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { BW, FadeIn, Full, TypeCaret, inter } from "./shared";

const t = linearTiming({ durationInFrames: 7 });

const PromptLine: React.FC<{
  typed: string;
  ghost?: string;
  dark?: boolean;
  size?: number;
  start?: number;
  end?: number;
}> = ({ typed, ghost, dark, size = 72, start = 4, end = 40 }) => (
  <TypeCaret
    text={typed}
    ghost={ghost}
    ghostColor={dark ? "#9AA2FF" : BW.blue}
    color={dark ? BW.white : BW.ink}
    caretColor={dark ? BW.white : BW.ink}
    size={size}
    weight={500}
    start={start}
    end={end}
    prefix={
      <span
        style={{
          color: dark ? BW.mute : "#A1A1AA",
          marginRight: 18,
          fontWeight: 400,
        }}
      >
        ›
      </span>
    }
  />
);

const Hook: React.FC = () => (
  <Full bg={BW.white}>
    <PromptLine typed="Introducing" ghost=" Tasklet" size={88} end={34} />
  </Full>
);

const Name: React.FC = () => (
  <Full bg={BW.black} color={BW.white}>
    <PromptLine
      typed="Tasklet for Teams"
      dark
      size={78}
      start={2}
      end={38}
    />
  </Full>
);

const Thesis: React.FC = () => {
  const frame = useCurrentFrame();
  const lines = [
    { t: "workspace.create --org", d: 4 },
    { t: "workspace.share --tools --knowledge", d: 18 },
    { t: "agents.deploy --team", d: 32 },
  ];
  return (
    <Full bg={BW.white}>
      <div style={{ width: 1100 }}>
        {lines.map((line, i) => {
          const o = interpolate(frame, [line.d, line.d + 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={line.t}
              style={{
                opacity: o,
                fontFamily: inter,
                fontSize: 40,
                fontWeight: 500,
                letterSpacing: "-0.03em",
                padding: "14px 0",
                color: BW.ink,
                display: "flex",
                gap: 16,
              }}
            >
              <span style={{ color: "#A1A1AA" }}>›</span>
              <span>
                {line.t}
                {i === lines.length - 1 && frame > 44 ? (
                  <span
                    style={{
                      display: "inline-block",
                      width: 3,
                      height: 34,
                      background: BW.ink,
                      marginLeft: 4,
                      verticalAlign: "middle",
                      opacity: Math.floor(frame / 8) % 2 ? 1 : 0.15,
                    }}
                  />
                ) : null}
              </span>
            </div>
          );
        })}
      </div>
    </Full>
  );
};

const Block: React.FC<{ title: string; body: string; dark?: boolean }> = ({
  title,
  body,
  dark,
}) => (
  <Full bg={dark ? BW.black : BW.off} color={dark ? BW.white : BW.ink}>
    <div style={{ width: 1200 }}>
      <FadeIn delay={2}>
        <div
          style={{
            fontFamily: inter,
            fontSize: 22,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: dark ? BW.mute : "#71717A",
            marginBottom: 20,
          }}
        >
          {title}
        </div>
      </FadeIn>
      <FadeIn delay={8}>
        <div
          style={{
            fontFamily: inter,
            fontSize: 56,
            fontWeight: 550,
            letterSpacing: "-0.035em",
            lineHeight: 1.15,
          }}
        >
          {body}
        </div>
      </FadeIn>
    </div>
  </Full>
);

const End: React.FC = () => (
  <Full bg={BW.black} color={BW.white}>
    <PromptLine typed="Available now" dark size={84} end={32} />
    <FadeIn delay={36} style={{ marginTop: 28 }}>
      <div
        style={{
          fontFamily: inter,
          fontSize: 28,
          color: BW.mute,
        }}
      >
        › open tasklet.ai
      </div>
    </FadeIn>
  </Full>
);

export const TerminalPrompt: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: BW.black }}>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={85} name="Hook">
        <Hook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence durationInFrames={85} name="Name">
        <Name />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence durationInFrames={95} name="Thesis">
        <Thesis />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence durationInFrames={85} name="Tools">
        <Block
          title="share access"
          body="Connect once. Share safely — no API keys for everyone."
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence durationInFrames={85} name="Knowledge">
        <Block
          title="share knowledge"
          body="Workspace Knowledge compounds. Skills teach agents your way."
          dark
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence durationInFrames={85} name="Agents">
        <Block
          title="share agents"
          body="Build once. The whole team upgrades — 24/7 in the cloud."
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence durationInFrames={122} name="End">
        <End />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);

export const TERMINAL_FRAMES = 600;
