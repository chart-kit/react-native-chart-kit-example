import { pickStory } from "../../showcase/registry/pickStory";
import { performanceStories as sourceStories } from "./components";

// Teaching note: Measures the small-line baseline before stressing larger datasets.
export const line100Story = pickStory(sourceStories, "v2-perf-line-100");
