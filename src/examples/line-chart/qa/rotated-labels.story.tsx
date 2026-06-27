import { pickStory } from "../../../showcase/registry/pickStory";
import { lineQaStories as sourceStories } from "./components";

// Teaching note: Uses rotation as a layout tool for long categorical labels.
export const rotatedLabelsStory = pickStory(sourceStories, "v2-rotated-labels");
