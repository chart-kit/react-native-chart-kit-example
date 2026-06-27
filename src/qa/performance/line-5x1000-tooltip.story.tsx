import { pickStory } from "../../showcase/registry/pickStory";
import { performanceStories as sourceStories } from "./components";

// Teaching note: Exercises shared tooltip cost across five thousand visible series points.
export const line5x1000TooltipStory = pickStory(
  sourceStories,
  "v2-perf-line-5x1000-tooltip",
);
