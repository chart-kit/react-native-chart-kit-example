import {
  ProgressChart,
  getProgressChartDataTable,
} from "react-native-chart-kit/v2";
import { activityProgress } from "../../fixtures/v2Progress";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../showcase/shared/storyPrimitives";
import { ChartDataDetails } from "../../showcase/shared/dataDetails";

const activityProgressTable = getProgressChartDataTable({
  data: activityProgress,
  labelKey: "metric",
  valueKey: "progress",
});
const activityProgressDetails = {
  columns: [
    { key: "metric", label: "Metric" },
    { key: "progress", label: "Progress" },
  ],
  rows: activityProgressTable.rows.map((row) => ({
    key: `${row.index}`,
    values: [row.label, row.formattedValue],
  })),
};
const V2ProgressActivity = ({ isVisualMode, width }: NativeStoryProps) => (
  <ChartSection title="Activity rings" kicker="Progress chart">
    <ProgressChart
      animation={isVisualMode ? false : { duration: 1400, stagger: 0.08 }}
      centerLabel={({ average }) => `${Math.round(average * 100)}%`}
      data={activityProgress}
      height={260}
      labelKey="metric"
      strokeWidth={16}
      testID="activity-progress-chart"
      valueKey="progress"
      width={width}
    />
  </ChartSection>
);
const V2ProgressActivityDetails = () => (
  <ChartDataDetails title="Activity rings" {...activityProgressDetails} />
);

// Teaching note: Uses concentric rings for parallel goal progress in a compact space.
export const activityStory: ShowcaseStory = {
  id: "v2-progress-activity",
  title: "Activity Rings",
  Component: V2ProgressActivity,
  Details: V2ProgressActivityDetails,
};
