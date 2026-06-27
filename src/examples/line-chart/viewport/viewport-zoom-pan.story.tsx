import { pickStory } from "../../../showcase/registry/pickStory";
import { lineViewportStories as sourceStories } from "./components";

// Teaching note: Keeps pan and pinch zoom controlled through viewport callbacks.
export const viewportZoomPanStory = pickStory(
  sourceStories,
  "v2-viewport-zoom-pan",
);
