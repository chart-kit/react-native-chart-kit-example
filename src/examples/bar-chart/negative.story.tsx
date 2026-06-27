import { pickStory } from "../../showcase/registry/pickStory";
import { barOverviewStories as sourceStories } from "./components";

// Teaching note: Exercises positive and negative bars around a shared zero baseline.
export const negativeStory = pickStory(sourceStories, "v2-bar-negative");
