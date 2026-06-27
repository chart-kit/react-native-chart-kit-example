import { pickStory } from "../../../showcase/registry/pickStory";
import { compatBarAndStackedStories as sourceStories } from "../components";

// Teaching note: Keeps old BarChart colors visible under dark mode.
export const darkModeStory = pickStory(sourceStories, "bar-dark-mode");
