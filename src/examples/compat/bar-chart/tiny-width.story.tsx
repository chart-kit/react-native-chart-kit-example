import { pickStory } from "../../../showcase/registry/pickStory";
import { compatBarAndStackedStories as sourceStories } from "../components";

// Teaching note: Confirms the legacy bar facade survives very narrow containers.
export const tinyWidthStory = pickStory(sourceStories, "bar-tiny-width");
