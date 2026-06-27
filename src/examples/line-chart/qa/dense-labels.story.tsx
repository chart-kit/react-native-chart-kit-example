import { pickStory } from "../../../showcase/registry/pickStory";
import { lineQaStories as sourceStories } from "./components";

// Teaching note: Exercises the collision policy for labels that compete for the same x-space.
export const denseLabelsStory = pickStory(sourceStories, "v2-dense-labels");
