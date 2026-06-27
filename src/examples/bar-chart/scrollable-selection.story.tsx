import { pickStory } from "../../showcase/registry/pickStory";
import { barOverviewStories as sourceStories } from "./components";

// Teaching note: Combines horizontal scrolling with tap selection for inspection workflows.
export const scrollableSelectionStory = pickStory(
  sourceStories,
  "v2-bar-scrollable-selection",
);
