import { pickStory } from "../../showcase/registry/pickStory";
import { pieOverviewStories as sourceStories } from "./components";

// Teaching note: Makes active slices explicit without changing the source data array.
export const pieSelectionStory = pickStory(sourceStories, "v2-pie-selection");
