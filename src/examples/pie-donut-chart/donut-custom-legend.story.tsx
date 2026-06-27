import { pickStory } from "../../showcase/registry/pickStory";
import { pieOverviewStories as sourceStories } from "./components";

// Teaching note: Pairs donut geometry with a custom legend for richer labels.
export const donutCustomLegendStory = pickStory(
  sourceStories,
  "v2-donut-custom-legend",
);
