import { pickStory } from "../../../showcase/registry/pickStory";
import { lineViewportStories as sourceStories } from "./components";

// Teaching note: Adds area fill as presentation only; the source line data remains unchanged.
export const areaFillStory = pickStory(sourceStories, "v2-area");
