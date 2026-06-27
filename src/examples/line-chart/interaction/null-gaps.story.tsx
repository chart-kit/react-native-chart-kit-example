import { pickStory } from "../../../showcase/registry/pickStory";
import { lineInteractionStories as sourceStories } from "./components";

// Teaching note: Keeps missing values explicit instead of interpolating through absent data.
export const nullGapsStory = pickStory(sourceStories, "v2-null-gaps");
