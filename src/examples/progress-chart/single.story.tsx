import { pickStory } from "../../showcase/registry/pickStory";
import { progressOverviewStories as sourceStories } from "./components";

// Teaching note: Shows the simplest single-ring completion state.
export const singleStory = pickStory(sourceStories, "v2-progress-single");
