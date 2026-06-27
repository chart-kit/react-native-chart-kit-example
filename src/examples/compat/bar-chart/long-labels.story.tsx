import { pickStory } from "../../../showcase/registry/pickStory";
import { compatBarAndStackedStories as sourceStories } from "../components";

// Teaching note: Exercises long compatibility bar labels without changing old props.
export const longLabelsStory = pickStory(sourceStories, "bar-long-labels");
