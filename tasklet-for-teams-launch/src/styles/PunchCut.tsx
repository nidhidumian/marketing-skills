/**
 * Style D — Punch Cut
 * Craft from X launch film: rapid single-word punches, dashed rings,
 * alternating black/white, "Faster." / "Now live" energy.
 */
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { BW, DashedRing, FadeIn, Full, TypeCaret, inter } from "./shared";

const t = linearTiming({ durationInFrames: 5 });

const Word: React.FC<{
  text: string;
  dark?: boolean;
  size?: number;
}> = ({ text, dark, size = 110 }) => (
  <Full bg={dark ? BW.black : BW.white} color={dark ? BW.white : BW.ink}>
    <FadeIn delay={1} y={8} dur={10}>
      <div
        style={{
          fontFamily: inter,
          fontSize: size,
          fontWeight: 600,
          letterSpacing: "-0.045em",
          textAlign: "center",
        }}
      >
        {text}
      </div>
    </FadeIn>
  </Full>
);

const ArcIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [20, 48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <Full bg={BW.white}>
      <TypeCaret text="Introducing" size={96} end={32} />
      <svg
        width="640"
        height="48"
        viewBox="0 0 640 48"
        style={{ marginTop: 12, opacity: 0.9 }}
      >
        <path
          d="M40 34 C 180 4, 460 4, 600 34"
          fill="none"
          stroke={BW.red}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="700"
          strokeDashoffset={700 * (1 - draw)}
        />
        <path
          d="M80 20 C 220 44, 420 44, 560 20"
          fill="none"
          stroke={BW.line}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="700"
          strokeDashoffset={700 * (1 - draw * 0.85)}
        />
      </svg>
    </Full>
  );
};

const RingPunch: React.FC<{ word: string }> = ({ word }) => (
  <Full bg={BW.black} color={BW.white}>
    {[...Array(36)].map((_, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: `${(i * 19) % 100}%`,
          top: `${(i * 31) % 100}%`,
          width: 2,
          height: 2,
          borderRadius: "50%",
          background: BW.white,
          opacity: 0.4,
        }}
      />
    ))}
    <DashedRing label={word} size={460} />
  </Full>
);

const SplitLine: React.FC = () => (
  <Full bg={BW.off}>
    <FadeIn delay={2}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 36,
          fontFamily: inter,
          fontSize: 40,
          fontWeight: 500,
          letterSpacing: "-0.03em",
          color: BW.ink,
        }}
      >
        <span>shared tools</span>
        <div
          style={{
            width: 88,
            height: 64,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 4,
            alignContent: "center",
          }}
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                width: 14,
                height: 14,
                background: i < 3 ? BW.blue : BW.ink,
                opacity: i < 3 ? 1 : 0.75,
              }}
            />
          ))}
        </div>
        <span>shared agents</span>
      </div>
    </FadeIn>
  </Full>
);

const End: React.FC = () => (
  <Full bg={BW.black} color={BW.white}>
    <FadeIn delay={2} y={8}>
      <div
        style={{
          fontFamily: inter,
          fontSize: 108,
          fontWeight: 550,
          letterSpacing: "-0.045em",
        }}
      >
        Now live
      </div>
    </FadeIn>
    <FadeIn delay={16} style={{ marginTop: 20 }}>
      <div style={{ fontFamily: inter, fontSize: 28, color: BW.mute }}>
        Tasklet for Teams · tasklet.ai
      </div>
    </FadeIn>
  </Full>
);

export const PunchCut: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: BW.black }}>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={82} name="Hook">
        <ArcIntro />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence durationInFrames={70} name="Name">
        <Word text="Tasklet for Teams" size={88} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence durationInFrames={68} name="Command">
        <Word text="AI command center" dark size={84} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence durationInFrames={72} name="Shared">
        <RingPunch word="Shared" />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence durationInFrames={68} name="Split">
        <SplitLine />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence durationInFrames={70} name="Agents">
        <RingPunch word="Agents" />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence durationInFrames={65} name="Once">
        <Word text="Build once." size={100} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence durationInFrames={65} name="Upgrade">
        <Word text="Team upgrades." dark size={92} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence durationInFrames={80} name="End">
        <End />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);

export const PUNCH_FRAMES = 600;
