import { pickStory } from "../../../showcase/registry/pickStory";
import { lineOverviewStories as sourceStories } from "./components";

// Teaching note: Adds reference bands and labels to make target thresholds explicit.
export const referenceTargetsStory = pickStory(
  sourceStories,
  "v2-reference-targets",
);
