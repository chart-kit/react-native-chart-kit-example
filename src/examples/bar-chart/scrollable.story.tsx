import { pickStory } from "../../showcase/registry/pickStory";
import { barOverviewStories as sourceStories } from "./components";

// Teaching note: Uses visiblePoints to keep long bar series readable on phone widths.
export const scrollableStory = pickStory(sourceStories, "v2-bar-scrollable");
