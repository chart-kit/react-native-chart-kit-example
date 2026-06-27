import { pickStory } from "../../showcase/registry/pickStory";
import { barOverviewStories as sourceStories } from "./components";

// Teaching note: Animates grouped bars while preserving category ordering.
export const groupedAnimationStory = pickStory(
  sourceStories,
  "v2-bar-grouped-animation",
);
