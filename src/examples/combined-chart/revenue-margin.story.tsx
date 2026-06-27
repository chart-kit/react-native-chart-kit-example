import { pickStory } from "../../showcase/registry/pickStory";
import { combinedOverviewStories as sourceStories } from "./components";

// Teaching note: Combines bars and lines for related metrics with different units.
export const revenueMarginStory = pickStory(
  sourceStories,
  "v2-combined-revenue-margin",
);
