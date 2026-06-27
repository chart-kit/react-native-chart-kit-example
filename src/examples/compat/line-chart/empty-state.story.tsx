import { pickStory } from "../../../showcase/registry/pickStory";
import { compatLineStories as sourceStories } from "../components";

// Teaching note: Documents the compatibility empty-state fallback.
export const emptyStateStory = pickStory(sourceStories, "line-empty-state");
