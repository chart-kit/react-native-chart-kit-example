import { pickStory } from "../../showcase/registry/pickStory";
import { barOverviewStories as sourceStories } from "./components";

// Teaching note: Keeps bar motion isolated to value transitions so layout does not jump.
export const animationStory = pickStory(sourceStories, "v2-bar-animation");
