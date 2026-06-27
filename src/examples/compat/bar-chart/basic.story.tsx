import { pickStory } from "../../../showcase/registry/pickStory";
import { compatBarAndStackedStories as sourceStories } from "../components";

// Teaching note: Preserves the legacy BarChart baseline for upgrade comparisons.
export const basicStory = pickStory(sourceStories, "bar-basic");
