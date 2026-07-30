import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { ensureSeasonMix } from "./fonts";
import { HookScene, NameScene, ThesisScene } from "./scenes/HookNameThesis";
import {
  AgentsScene,
  KnowledgeScene,
  ToolsScene,
} from "./scenes/Features";
import { EndScene, ModelsScene } from "./scenes/ModelsEnd";

ensureSeasonMix();

const fadeTiming = linearTiming({ durationInFrames: 8 });

export const TaskletForTeams: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#121215" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={72} name="Hook">
          <HookScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        <TransitionSeries.Sequence durationInFrames={78} name="Name">
          <NameScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        <TransitionSeries.Sequence durationInFrames={84} name="Thesis">
          <ThesisScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        <TransitionSeries.Sequence durationInFrames={88} name="Tools">
          <ToolsScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        <TransitionSeries.Sequence durationInFrames={88} name="Knowledge">
          <KnowledgeScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        <TransitionSeries.Sequence durationInFrames={82} name="Agents">
          <AgentsScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        <TransitionSeries.Sequence durationInFrames={78} name="Models">
          <ModelsScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        <TransitionSeries.Sequence durationInFrames={86} name="End">
          <EndScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

// Sum of sequences = 656; 7 fades × 8 = 56 overlap → 600 frames = 20.0s @ 30fps
export const TASKLET_DURATION_FRAMES = 600;
