import { pickStory } from "../../../showcase/registry/pickStory";
import { lineViewportStories as sourceStories } from "./components";

// Teaching note: Pairs a detail chart with an overview range selector for large time-series navigation.
export const rangeSelectorStory = pickStory(sourceStories, "v2-range-selector");
