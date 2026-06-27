import { pickStory } from "../../../showcase/registry/pickStory";
import { lineQaStories as sourceStories } from "./components";

// Teaching note: Confirms the chart can hide axis labels without changing the data model.
export const hiddenLabelsStory = pickStory(sourceStories, "v2-hidden-labels");
