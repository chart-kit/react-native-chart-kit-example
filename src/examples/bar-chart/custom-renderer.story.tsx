import { pickStory } from "../../showcase/registry/pickStory";
import { barOverviewStories as sourceStories } from "./components";

// Teaching note: Shows how to customize individual bars without replacing chart layout logic.
export const customRendererStory = pickStory(
  sourceStories,
  "v2-bar-custom-renderer",
);
