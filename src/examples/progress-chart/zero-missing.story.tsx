import { ProgressChart } from "react-native-chart-kit/v2";
import { goalReadinessProgress } from "../../fixtures/v2Progress";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../showcase/shared/storyPrimitives";

const V2ProgressZeroMissing = ({ width }: NativeStoryProps) => (
  <ChartSection title="Launch readiness" kicker="Zero-value ring">
    <ProgressChart
      centerLabel={({ average }) => `${Math.round(average * 100)}%`}
      data={goalReadinessProgress}
      height={260}
      labelKey="metric"
      strokeWidth={16}
      testID="zero-missing-progress-chart"
      valueKey="progress"
      width={width}
    />
  </ChartSection>
);

// Teaching note: Keeps zero and missing values visually distinct for honest progress reporting.
export const zeroMissingStory: ShowcaseStory = {
  id: "v2-progress-zero-missing",
  title: "Launch Readiness",
  Component: V2ProgressZeroMissing,
};
