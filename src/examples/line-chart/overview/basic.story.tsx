import { pickStory } from "../../../showcase/registry/pickStory";
import { lineOverviewStories as sourceStories } from "./components";

// Teaching note: Shows the smallest useful LineChart contract: data, xKey, series, and width-driven layout.
export const basicStory = pickStory(sourceStories, "v2-basic");
