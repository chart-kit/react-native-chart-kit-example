import { pickStory } from "../../../showcase/registry/pickStory";
import { lineViewportStories as sourceStories } from "./components";

// Teaching note: Compares two stocks in a passive scrollable chart with no default selection.
export const scrollableStockComparisonStory = pickStory(
  sourceStories,
  "v2-scrollable-stock-comparison",
);
