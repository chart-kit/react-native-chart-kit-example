import type { ShowcaseStory } from "../../../showcase/shared/storyPrimitives";
import { WebsiteAnalyticsScreen } from "./WebsiteAnalyticsScreen";

// Teaching note: Uses trend and realtime bars together so analytics readers see both history and live state.
export const websiteAnalyticsStory: ShowcaseStory = {
  id: "landing-website-analytics-app",
  title: "Website Analytics",
  Component: WebsiteAnalyticsScreen,
  presentation: "takeover",
};
