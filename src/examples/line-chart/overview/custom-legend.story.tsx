import { pickStory } from "../../../showcase/registry/pickStory";
import { lineOverviewStories as sourceStories } from "./components";

// Teaching note: Uses custom overlay composition when the default legend is not enough.
export const customLegendStory = pickStory(sourceStories, "v2-custom-legend");
