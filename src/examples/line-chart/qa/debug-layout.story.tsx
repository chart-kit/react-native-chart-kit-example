import { pickStory } from "../../../showcase/registry/pickStory";
import { lineQaStories as sourceStories } from "./components";

// Teaching note: Shows layout guides that are useful when tuning chart padding.
export const debugLayoutStory = pickStory(sourceStories, "v2-debug-layout");
