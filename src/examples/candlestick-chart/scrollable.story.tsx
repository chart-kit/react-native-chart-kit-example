import { pickStory } from "../../showcase/registry/pickStory";
import { financialOverviewStories as sourceStories } from "./components";

// Teaching note: Constrains visible candles so long price history stays navigable.
export const scrollableStory = pickStory(
  sourceStories,
  "v2-candlestick-scrollable",
);
