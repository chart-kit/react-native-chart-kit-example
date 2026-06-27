import { pickStory } from "../../showcase/registry/pickStory";
import { barOverviewStories as sourceStories } from "./components";

// Teaching note: Starts with a default selected bar to make tap-selection state obvious.
export const selectionStory = pickStory(sourceStories, "v2-bar-selection");
