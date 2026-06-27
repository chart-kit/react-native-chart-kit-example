import { pickStory } from "../../showcase/registry/pickStory";
import { performanceStories as sourceStories } from "./components";

// Teaching note: Pairs dense detail and overview ranges for performance validation.
export const range2x10000Story = pickStory(
  sourceStories,
  "v2-perf-range-2x10000",
);
