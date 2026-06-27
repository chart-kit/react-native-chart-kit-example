import { pickStory } from "../../../showcase/registry/pickStory";
import { compatBarAndStackedStories as sourceStories } from "../components";

// Teaching note: Keeps percentile stacking available for label-collision regression tests.
export const stackedPercentileStory = pickStory(
  sourceStories,
  "stacked-bar-percentile",
);
