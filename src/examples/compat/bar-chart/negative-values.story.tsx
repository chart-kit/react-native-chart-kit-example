import { pickStory } from "../../../showcase/registry/pickStory";
import { compatBarAndStackedStories as sourceStories } from "../components";

// Teaching note: Verifies negative legacy bars around the shared baseline.
export const negativeValuesStory = pickStory(
  sourceStories,
  "bar-negative-values",
);
