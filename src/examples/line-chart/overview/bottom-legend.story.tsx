import { pickStory } from "../../../showcase/registry/pickStory";
import { lineOverviewStories as sourceStories } from "./components";

// Teaching note: Keeps legend content outside the plot so labels stay readable on compact widths.
export const bottomLegendStory = pickStory(sourceStories, "v2-bottom-legend");
