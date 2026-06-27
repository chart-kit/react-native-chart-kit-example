import { pickStory } from "../../showcase/registry/pickStory";
import { financialOverviewStories as sourceStories } from "./components";

// Teaching note: Shows the base OHLCV candlestick contract with a price-aware domain.
export const priceActionStory = pickStory(
  sourceStories,
  "v2-candlestick-price-action",
);
