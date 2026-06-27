import type { ShowcaseStory } from "../../../showcase/shared/storyPrimitives";
import { TradingAppScreen } from "./TradingAppScreen";

// Teaching note: Keeps candlestick inspection, timeframe state, and trade controls together as one native workflow.
export const tradingStory: ShowcaseStory = {
  id: "landing-trading-app",
  title: "Native Trading App",
  Component: TradingAppScreen,
  presentation: "takeover",
};
