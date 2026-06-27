import type { ShowcaseStory } from "../../../showcase/shared/storyPrimitives";
import { MarketPulseScreen } from "./MarketPulseScreen";

// Teaching note: Uses a full app screen to show charts in a premium finance workflow instead of an isolated card.
export const marketPulseStory: ShowcaseStory = {
  id: "landing-market-pulse-app",
  title: "Market Pulse App",
  Component: MarketPulseScreen,
  presentation: "takeover",
};
