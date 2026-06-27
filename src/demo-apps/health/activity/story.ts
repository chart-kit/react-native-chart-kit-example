import type { ShowcaseStory } from "../../../showcase/shared/storyPrimitives";
import { HealthActivityAppScreen } from "./HealthActivityAppScreen";

// Teaching note: Composes rings, bars, and combined charts to demonstrate a health dashboard workflow.
export const healthActivityStory: ShowcaseStory = {
  id: "landing-health-activity-app",
  title: "Native Health Activity App",
  Component: HealthActivityAppScreen,
  presentation: "takeover",
};
