import { pickStory } from "../../showcase/registry/pickStory";
import { contributionOverviewStories as sourceStories } from "./components";

// Teaching note: Maps dates to stable cells so calendar density is easy to validate.
export const usageStory = pickStory(sourceStories, "v2-contribution-usage");
