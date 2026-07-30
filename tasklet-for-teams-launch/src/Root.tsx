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
import { FPS, HEIGHT, WIDTH } from "./theme";
import { ensureSeasonMix } from "./fonts";

ensureSeasonMix();

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TaskletForTeams"
        component={TaskletForTeams}
        durationInFrames={TASKLET_DURATION_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Folder name="Scenes">
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
