import { pickStory } from "../../showcase/registry/pickStory";
import { progressOverviewStories as sourceStories } from "./components";

// Teaching note: Keeps zero and missing values visually distinct for honest progress reporting.
export const zeroMissingStory = pickStory(
  sourceStories,
  "v2-progress-zero-missing",
);
