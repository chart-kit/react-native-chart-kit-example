import { pickStory } from "../../showcase/registry/pickStory";
import { combinedOverviewStories as sourceStories } from "./components";

// Teaching note: Uses one tooltip model to inspect bar and line values together.
export const sharedTooltipStory = pickStory(
  sourceStories,
  "v2-combined-shared-tooltip",
);
