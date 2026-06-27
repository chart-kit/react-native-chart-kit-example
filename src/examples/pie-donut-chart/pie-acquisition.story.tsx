import { pickStory } from "../../showcase/registry/pickStory";
import { pieOverviewStories as sourceStories } from "./components";

// Teaching note: Uses slices for part-to-whole acquisition share with theme-driven colors.
export const pieAcquisitionStory = pickStory(
  sourceStories,
  "v2-pie-acquisition",
);
