import { ContributionGraph } from "react-native-chart-kit/v2";
import {
  quietProductUsage,
  quietUsageEndDate,
  quietUsageNumDays,
} from "../../fixtures/v2Contribution";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../showcase/shared/storyPrimitives";

const V2ContributionQuiet = ({ width }: NativeStoryProps) => (
  <ChartSection title="Quiet workspace" kicker="Empty heatmap">
    <ContributionGraph
      endDate={quietUsageEndDate}
      height={150}
      numDays={quietUsageNumDays}
      showOutOfRangeDays
      testID="quiet-usage-heatmap"
      values={quietProductUsage}
      weekStartsOn={1}
      width={width}
    />
  </ChartSection>
);

// Teaching note: Keeps the empty heatmap shape stable when no contribution data exists.
export const emptyStory: ShowcaseStory = {
  id: "v2-contribution-empty",
  title: "Empty Heatmap",
  Component: V2ContributionQuiet,
};
