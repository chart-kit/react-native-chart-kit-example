import { pickStory } from "../../../showcase/registry/pickStory";
import { lineQaStories as sourceStories } from "./components";

// Teaching note: Keeps animation deterministic in visual mode so screenshot tests remain stable.
export const lineAnimationStory = pickStory(sourceStories, "v2-line-animation");
