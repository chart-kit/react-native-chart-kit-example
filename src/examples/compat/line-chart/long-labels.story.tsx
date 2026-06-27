import { pickStory } from "../../../showcase/registry/pickStory";
import { compatLineStories as sourceStories } from "../components";

// Teaching note: Exercises long compatibility labels without changing old props.
export const longLabelsStory = pickStory(sourceStories, "line-long-labels");
