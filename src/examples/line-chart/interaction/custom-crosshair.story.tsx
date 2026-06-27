import { pickStory } from "../../../showcase/registry/pickStory";
import { lineInteractionStories as sourceStories } from "./components";

// Teaching note: Replaces the default crosshair renderer while keeping the interaction model intact.
export const customCrosshairStory = pickStory(
  sourceStories,
  "v2-custom-crosshair",
);
