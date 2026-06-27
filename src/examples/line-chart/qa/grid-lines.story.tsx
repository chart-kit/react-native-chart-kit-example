import { pickStory } from "../../../showcase/registry/pickStory";
import { lineQaStories as sourceStories } from "./components";

// Teaching note: Verifies grid styling stays aligned with the computed plot area.
export const gridLinesStory = pickStory(sourceStories, "v2-grid-lines");
