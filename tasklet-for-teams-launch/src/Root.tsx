import React from "react";
import { Composition, Folder } from "remotion";
import { TaskletForTeams, TASKLET_DURATION_FRAMES } from "./TaskletForTeams";
import { HookScene, NameScene, ThesisScene } from "./scenes/HookNameThesis";
import {
  AgentsScene,
  KnowledgeScene,
  ToolsScene,
} from "./scenes/Features";
import { EndScene, ModelsScene } from "./scenes/ModelsEnd";
import { EditorialMono, EDITORIAL_FRAMES } from "./styles/EditorialMono";
import { TerminalPrompt, TERMINAL_FRAMES } from "./styles/TerminalPrompt";
import { UIChrome, UICHROME_FRAMES } from "./styles/UIChrome";
import { PunchCut, PUNCH_FRAMES } from "./styles/PunchCut";
import { FPS, HEIGHT, WIDTH } from "./theme";
import { ensureSeasonMix } from "./fonts";

ensureSeasonMix();

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Styles">
        <Composition
          id="Style-SoftBrand"
          component={TaskletForTeams}
          durationInFrames={TASKLET_DURATION_FRAMES}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Style-EditorialMono"
          component={EditorialMono}
          durationInFrames={EDITORIAL_FRAMES}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Style-TerminalPrompt"
          component={TerminalPrompt}
          durationInFrames={TERMINAL_FRAMES}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Style-UIChrome"
          component={UIChrome}
          durationInFrames={UICHROME_FRAMES}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="Style-PunchCut"
          component={PunchCut}
          durationInFrames={PUNCH_FRAMES}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
      </Folder>

      {/* Keep original id for backwards compatibility */}
      <Composition
        id="TaskletForTeams"
        component={TaskletForTeams}
        durationInFrames={TASKLET_DURATION_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      <Folder name="SoftBrand-Scenes">
        <Composition id="Hook" component={HookScene} durationInFrames={72} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Name" component={NameScene} durationInFrames={78} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Thesis" component={ThesisScene} durationInFrames={84} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Tools" component={ToolsScene} durationInFrames={88} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Knowledge" component={KnowledgeScene} durationInFrames={88} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Agents" component={AgentsScene} durationInFrames={82} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="Models" component={ModelsScene} durationInFrames={78} fps={FPS} width={WIDTH} height={HEIGHT} />
        <Composition id="End" component={EndScene} durationInFrames={86} fps={FPS} width={WIDTH} height={HEIGHT} />
      </Folder>
    </>
  );
};
