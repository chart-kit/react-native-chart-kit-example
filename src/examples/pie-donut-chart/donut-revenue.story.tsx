import { pickStory } from "../../showcase/registry/pickStory";
import { pieOverviewStories as sourceStories } from "./components";

// Teaching note: Uses a center label to summarize the donut without a separate card.
export const donutRevenueStory = pickStory(sourceStories, "v2-donut-revenue");
