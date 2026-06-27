import { pickStory } from "../../showcase/registry/pickStory";
import { performanceStories as sourceStories } from "./components";

// Teaching note: Keeps panning behavior measurable on a large dataset.
export const line10000PanStory = pickStory(
  sourceStories,
  "v2-perf-line-10000-pan",
);
