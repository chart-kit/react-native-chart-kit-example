import { pickStory } from "../../../showcase/registry/pickStory";
import { lineViewportStories as sourceStories } from "./components";

// Teaching note: Uses a visible window over a longer dataset for mobile-friendly price history.
export const scrollablePriceStory = pickStory(
  sourceStories,
  "v2-scrollable-price",
);
