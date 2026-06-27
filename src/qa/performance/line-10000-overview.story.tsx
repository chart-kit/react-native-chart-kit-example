import { pickStory } from "../../showcase/registry/pickStory";
import { performanceStories as sourceStories } from "./components";

// Teaching note: Checks overview rendering against a very dense line dataset.
export const line10000OverviewStory = pickStory(
  sourceStories,
  "v2-perf-line-10000-overview",
);
