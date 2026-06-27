import { pickStory } from "../../../showcase/registry/pickStory";
import { compatLineStories as sourceStories } from "../components";

// Teaching note: Confirms the legacy facade survives very narrow containers.
export const tinyWidthStory = pickStory(sourceStories, "line-tiny-width");
