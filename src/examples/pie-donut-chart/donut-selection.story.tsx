import { pickStory } from "../../showcase/registry/pickStory";
import { pieOverviewStories as sourceStories } from "./components";

// Teaching note: Updates the center label from controlled slice selection.
export const donutSelectionStory = pickStory(
  sourceStories,
  "v2-donut-selection",
);
