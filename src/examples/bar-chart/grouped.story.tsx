import { pickStory } from "../../showcase/registry/pickStory";
import { barOverviewStories as sourceStories } from "./components";

// Teaching note: Places related series side by side so category comparison beats stacked totals.
export const groupedStory = pickStory(sourceStories, "v2-bar-grouped");
