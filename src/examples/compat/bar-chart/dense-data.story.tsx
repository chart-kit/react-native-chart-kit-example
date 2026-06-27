import { pickStory } from "../../../showcase/registry/pickStory";
import { compatBarAndStackedStories as sourceStories } from "../components";

// Teaching note: Keeps the dense legacy bar fixture available for screenshot checks.
export const denseDataStory = pickStory(sourceStories, "bar-dense-data");
