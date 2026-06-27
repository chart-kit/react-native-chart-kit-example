import { pickStory } from "../../showcase/registry/pickStory";
import { combinedOverviewStories as sourceStories } from "./components";

// Teaching note: Keeps series visibility controlled by local state for predictable toggles.
export const legendTogglesStory = pickStory(
  sourceStories,
  "v2-combined-legend-toggles",
);
