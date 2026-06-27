import { pickStory } from "../../showcase/registry/pickStory";
import { contributionOverviewStories as sourceStories } from "./components";

// Teaching note: Keeps the empty heatmap shape stable when no contribution data exists.
export const emptyStory = pickStory(sourceStories, "v2-contribution-empty");
