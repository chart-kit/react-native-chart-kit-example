import { pickStory } from "../../showcase/registry/pickStory";
import { performanceStories as sourceStories } from "./components";

// Teaching note: Keeps scrub interaction measurable on a thousand points.
export const line1000ScrubStory = pickStory(
  sourceStories,
  "v2-perf-line-1000-scrub",
);
