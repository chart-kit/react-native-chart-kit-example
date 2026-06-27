import { pickStory } from "../../../showcase/registry/pickStory";
import { lineQaStories as sourceStories } from "./components";

// Teaching note: Staggers labels when rotation would make the chart harder to scan.
export const staggeredLabelsStory = pickStory(
  sourceStories,
  "v2-staggered-labels",
);
