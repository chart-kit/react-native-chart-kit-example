import { pickStory } from "../../../showcase/registry/pickStory";
import { lineOverviewStories as sourceStories } from "./components";

// Teaching note: Separates actuals and forecast values visually without changing the data shape.
export const dashedForecastStory = pickStory(
  sourceStories,
  "v2-dashed-forecast",
);
