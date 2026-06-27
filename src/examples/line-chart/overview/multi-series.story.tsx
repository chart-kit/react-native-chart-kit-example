import { pickStory } from "../../../showcase/registry/pickStory";
import { lineOverviewStories as sourceStories } from "./components";

// Teaching note: Uses multiple y-series on one x-domain for direct trend comparison.
export const multiSeriesStory = pickStory(sourceStories, "v2-multi-series");
