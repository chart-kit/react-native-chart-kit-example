import { pickStory } from "../../showcase/registry/pickStory";
import { barOverviewStories as sourceStories } from "./components";

// Teaching note: Switches orientation for ranked labels that need more horizontal reading space.
export const horizontalStory = pickStory(sourceStories, "v2-bar-horizontal");
