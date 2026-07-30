/**
 * Style A — Editorial Mono
 * Craft from X launch film: pure B/W, Inter kinetic type, hard cuts,
 * dashed-ring punches, sparse node fields. Zero brand color.
 */
import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import {
  BW,
  DashedRing,
  FadeIn,
  Full,
  NodeField,
  TypeCaret,
  inter,
} from "./shared";

const t = linearTiming({ durationInFrames: 6 });

const Hook: React.FC = () => (
  <Full bg={BW.white}>
    <TypeCaret text="Introducing" size={104} weight={500} />
  </Full>
);

const Name: React.FC = () => (
  <Full bg={BW.white}>
    <FadeIn delay={2} y={12}>
      <div
        style={{
          fontFamily: inter,
          fontSize: 104,
          fontWeight: 600,
          letterSpacing: "-0.045em",
          textAlign: "center",
          lineHeight: 1.05,
        }}
      >
        Tasklet
        <br />
        for Teams
      </div>
    </FadeIn>
  </Full>
);

const Thesis: React.FC = () => (
  <Full bg={BW.off} color={BW.ink}>
    <NodeField light accent={BW.ink} />
    <FadeIn delay={4}>
      <div
        style={{
          fontFamily: inter,
          fontSize: 64,
          fontWeight: 500,
          letterSpacing: "-0.035em",
          textAlign: "center",
          maxWidth: 1200,
          lineHeight: 1.15,
          position: "relative",
        }}
      >
        Your company’s AI command center
      </div>
    </FadeIn>
  </Full>
);

const Share: React.FC<{ a: string; b: string }> = ({ a, b }) => (
  <Full bg={BW.white}>
    <FadeIn delay={2}>
      <div
        style={{
          display: "flex",
          gap: 48,
          alignItems: "center",
          fontFamily: inter,
          fontSize: 48,
          fontWeight: 500,
          letterSpacing: "-0.03em",
        }}
      >
        <span>{a}</span>
        <div
          style={{
            width: 72,
            height: 72,
            display: "grid",
            placeItems: "center",
          }}
        >
          <div
            style={{
              width: 48,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 6,
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: 18,
                  height: 18,
                  background: BW.ink,
                  opacity: 0.85 - i * 0.12,
                }}
              />
            ))}
          </div>
        </div>
        <span>{b}</span>
      </div>
    </FadeIn>
  </Full>
);

const Punch: React.FC<{ word: string }> = ({ word }) => (
  <Full bg={BW.black} color={BW.white}>
    {[...Array(40)].map((_, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: `${(i * 17) % 100}%`,
          top: `${(i * 29) % 100}%`,
          width: 2,
          height: 2,
          borderRadius: "50%",
          background: BW.white,
          opacity: 0.35,
        }}
      />
    ))}
    <DashedRing label={word} />
  </Full>
);

const End: React.FC = () => (
  <Full bg={BW.black} color={BW.white}>
    <FadeIn delay={2} y={10}>
      <div
        style={{
          fontFamily: inter,
          fontSize: 96,
          fontWeight: 500,
          letterSpacing: "-0.04em",
        }}
      >
        Now live
      </div>
    </FadeIn>
    <FadeIn delay={14} style={{ marginTop: 24 }}>
      <div
        style={{
          fontFamily: inter,
          fontSize: 28,
          fontWeight: 500,
          color: BW.mute,
          letterSpacing: "-0.01em",
        }}
      >
        tasklet.ai
      </div>
    </FadeIn>
  </Full>
);

export const EditorialMono: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: BW.black }}>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={75} name="Hook">
        <Hook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence durationInFrames={80} name="Name">
        <Name />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence durationInFrames={85} name="Thesis">
        <Thesis />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence durationInFrames={80} name="Tools">
        <Share a="on shared tools" b="and knowledge" />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence durationInFrames={75} name="Faster">
        <Punch word="Shared" />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence durationInFrames={75} name="Agents">
        <Punch word="Agents" />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence durationInFrames={80} name="Compound">
        <Share a="Build once." b="Team upgrades." />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence durationInFrames={92} name="End">
        <End />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);

// 75+80+85+80+75+75+80+92 = 642; 7 fades × 6 = 42 → 600 frames = 20.0s
export const EDITORIAL_FRAMES = 600;
