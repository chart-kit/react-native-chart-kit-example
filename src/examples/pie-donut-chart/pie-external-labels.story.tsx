import { pickStory } from "../../showcase/registry/pickStory";
import { pieOverviewStories as sourceStories } from "./components";

// Teaching note: Moves labels outside slices when the chart needs more text room.
export const pieExternalLabelsStory = pickStory(
  sourceStories,
  "v2-pie-external-labels",
);
