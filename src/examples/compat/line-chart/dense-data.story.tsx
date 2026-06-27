import { pickStory } from "../../../showcase/registry/pickStory";
import { compatLineStories as sourceStories } from "../components";

// Teaching note: Keeps the dense legacy fixture available for visual regression checks.
export const denseDataStory = pickStory(sourceStories, "line-dense-data");
