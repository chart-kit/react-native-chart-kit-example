import { pickStory } from "../../showcase/registry/pickStory";
import { financialOverviewStories as sourceStories } from "./components";

// Teaching note: Uses external legend state to summarize the selected candle.
export const legendInspectorStory = pickStory(
  sourceStories,
  "v2-candlestick-legend-inspector",
);
