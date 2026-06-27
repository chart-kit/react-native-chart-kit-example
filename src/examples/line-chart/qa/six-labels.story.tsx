import { pickStory } from "../../../showcase/registry/pickStory";
import { lineQaStories as sourceStories } from "./components";

// Teaching note: Caps the visible label count to prove predictable axis density.
export const sixLabelsStory = pickStory(sourceStories, "v2-six-labels");
