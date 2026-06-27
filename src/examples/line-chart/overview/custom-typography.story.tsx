import { pickStory } from "../../../showcase/registry/pickStory";
import { lineOverviewStories as sourceStories } from "./components";

// Teaching note: Demonstrates theme-aware text sizing without hard-coding global app styles.
export const customTypographyStory = pickStory(
  sourceStories,
  "v2-custom-typography",
);
