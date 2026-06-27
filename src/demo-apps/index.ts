import { websiteAnalyticsStory } from "./analytics/website-analytics/story";
import { codeContributionStory } from "./development/code-contribution/story";
import { healthActivityStory } from "./health/activity/story";
import { marketPulseStory } from "./finance/market-pulse/story";
import { tradingStory } from "./finance/trading/story";

export const landingDemoStories = [
  marketPulseStory,
  codeContributionStory,
  healthActivityStory,
  tradingStory,
  websiteAnalyticsStory,
];
