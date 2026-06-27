import { pickStory } from "../../../showcase/registry/pickStory";
import { lineViewportStories as sourceStories } from "./components";

// Teaching note: Stress-tests dense labels in a scrollable viewport instead of shrinking text.
export const scrollableDenseStory = pickStory(
  sourceStories,
  "v2-scrollable-dense",
);
