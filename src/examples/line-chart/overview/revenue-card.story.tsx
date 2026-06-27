import { pickStory } from "../../../showcase/registry/pickStory";
import { lineOverviewStories as sourceStories } from "./components";

// Teaching note: Wraps a chart in product-card chrome without changing the chart API surface.
export const revenueCardStory = pickStory(sourceStories, "v2-revenue-card");
