import { pickStory } from "../../showcase/registry/pickStory";
import { exportWorkflowStories as sourceStories } from "./components";

// Teaching note: Keeps snapshot, share, and headless SVG export paths in one workflow story.
export const exportWorkflowStory = pickStory(
  sourceStories,
  "pro-export-workflow",
);
