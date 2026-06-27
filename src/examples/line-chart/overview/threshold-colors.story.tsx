import { pickStory } from "../../../showcase/registry/pickStory";
import { lineOverviewStories as sourceStories } from "./components";

// Teaching note: Splits stroke styling at thresholds while keeping one logical series.
export const thresholdColorsStory = pickStory(
  sourceStories,
  "v2-threshold-colors",
);
