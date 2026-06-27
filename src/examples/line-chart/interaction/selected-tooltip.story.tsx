import { pickStory } from "../../../showcase/registry/pickStory";
import { lineInteractionStories as sourceStories } from "./components";

// Teaching note: Uses a controlled default selection so tooltip rendering is easy to inspect.
export const selectedTooltipStory = pickStory(
  sourceStories,
  "v2-selected-tooltip",
);
