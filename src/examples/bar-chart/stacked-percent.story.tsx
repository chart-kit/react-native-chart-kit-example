import { pickStory } from "../../showcase/registry/pickStory";
import { barOverviewStories as sourceStories } from "./components";

// Teaching note: Normalizes stacked values to communicate composition instead of raw totals.
export const stackedPercentStory = pickStory(
  sourceStories,
  "v2-bar-stacked-percent",
);
