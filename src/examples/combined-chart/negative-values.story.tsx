import { pickStory } from "../../showcase/registry/pickStory";
import { combinedOverviewStories as sourceStories } from "./components";

// Teaching note: Exercises mixed positive and negative domains across combined marks.
export const negativeValuesStory = pickStory(
  sourceStories,
  "v2-combined-negative-values",
);
