import { pickStory } from "../../../showcase/registry/pickStory";
import { lineInteractionStories as sourceStories } from "./components";

// Teaching note: Demonstrates continuous pointer inspection while preserving chart layout.
export const scrubStory = pickStory(sourceStories, "v2-scrub");
