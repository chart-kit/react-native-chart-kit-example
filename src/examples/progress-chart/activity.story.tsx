import { pickStory } from "../../showcase/registry/pickStory";
import { progressOverviewStories as sourceStories } from "./components";

// Teaching note: Uses concentric rings for parallel goal progress in a compact space.
export const activityStory = pickStory(sourceStories, "v2-progress-activity");
