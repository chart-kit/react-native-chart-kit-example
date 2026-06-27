import { pickStory } from "../../../showcase/registry/pickStory";
import { compatBarAndStackedStories as sourceStories } from "../components";

// Teaching note: Documents the compatibility empty-state fallback for bars.
export const emptyStateStory = pickStory(sourceStories, "bar-empty-state");
