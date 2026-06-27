import { pickStory } from "../../showcase/registry/pickStory";
import { performanceStories as sourceStories } from "./components";

// Teaching note: Checks tap selection on a long scrollable bar dataset.
export const bar500SelectionStory = pickStory(
  sourceStories,
  "v2-perf-bar-500-selection",
);
