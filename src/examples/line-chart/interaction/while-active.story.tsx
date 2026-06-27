import { pickStory } from "../../../showcase/registry/pickStory";
import { lineInteractionStories as sourceStories } from "./components";

// Teaching note: Limits the tooltip to active gestures for passive dashboards.
export const whileActiveStory = pickStory(sourceStories, "v2-while-active");
