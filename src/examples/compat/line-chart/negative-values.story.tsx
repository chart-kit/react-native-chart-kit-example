import { pickStory } from "../../../showcase/registry/pickStory";
import { compatLineStories as sourceStories } from "../components";

// Teaching note: Verifies legacy negative values still render around the baseline.
export const negativeValuesStory = pickStory(
  sourceStories,
  "line-negative-values",
);
