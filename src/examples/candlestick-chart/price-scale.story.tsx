import { pickStory } from "../../showcase/registry/pickStory";
import { financialOverviewStories as sourceStories } from "./components";

// Teaching note: Separates price-scale gestures from candlestick viewport gestures.
export const priceScaleStory = pickStory(
  sourceStories,
  "v2-candlestick-price-scale",
);
