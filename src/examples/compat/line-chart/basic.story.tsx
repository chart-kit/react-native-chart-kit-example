import { pickStory } from "../../../showcase/registry/pickStory";
import { compatLineStories as sourceStories } from "../components";

// Teaching note: Preserves the legacy LineChart baseline for upgrade comparisons.
export const basicStory = pickStory(sourceStories, "line-basic");
