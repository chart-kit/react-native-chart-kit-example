import { pickStory } from "../../../showcase/registry/pickStory";
import { lineQaStories as sourceStories } from "./components";

// Teaching note: Exercises dark theme tokens for chart text, grid, and plot background.
export const darkModeStory = pickStory(sourceStories, "v2-dark-mode");
