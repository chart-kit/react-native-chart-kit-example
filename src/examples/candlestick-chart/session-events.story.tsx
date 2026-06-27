import { pickStory } from "../../showcase/registry/pickStory";
import { financialOverviewStories as sourceStories } from "./components";

// Teaching note: Annotates exchange sessions without mutating the candle data.
export const sessionEventsStory = pickStory(
  sourceStories,
  "v2-candlestick-session-events",
);
