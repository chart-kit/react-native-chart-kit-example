import { pickStory } from "../../../showcase/registry/pickStory";
import { compatBarAndStackedStories as sourceStories } from "../components";

// Teaching note: Preserves the legacy stacked bar baseline.
export const stackedBasicStory = pickStory(sourceStories, "stacked-bar-basic");
