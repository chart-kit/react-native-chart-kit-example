import type { ShowcaseStory } from "../../../showcase/shared/storyPrimitives";
import { CodeContributionScreen } from "./CodeContributionScreen";

// Teaching note: Combines heatmap and donut charts to teach repository activity through an app-like screen.
export const codeContributionStory: ShowcaseStory = {
  id: "landing-code-contribution-app",
  title: "Code Contribution App",
  Component: CodeContributionScreen,
  presentation: "takeover",
};
