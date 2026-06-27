import { pickStory } from "../../showcase/registry/pickStory";
import { financialOverviewStories as sourceStories } from "./components";

// Teaching note: Uses long-press crosshair mode for deliberate market inspection.
export const crosshairInspectorStory = pickStory(
  sourceStories,
  "v2-candlestick-crosshair-inspector",
);
