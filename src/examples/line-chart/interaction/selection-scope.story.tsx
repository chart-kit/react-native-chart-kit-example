import { pickStory } from "../../../showcase/registry/pickStory";
import { lineInteractionStories as sourceStories } from "./components";

// Teaching note: Scopes selection state so nearby charts do not fight over active data points.
export const selectionScopeStory = pickStory(
  sourceStories,
  "v2-selection-scope",
);
