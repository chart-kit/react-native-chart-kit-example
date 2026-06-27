import { pickStory } from "../../../showcase/registry/pickStory";
import { compatLineStories as sourceStories } from "../components";

// Teaching note: Keeps old LineChart colors visible under dark mode.
export const darkModeStory = pickStory(sourceStories, "line-dark-mode");
