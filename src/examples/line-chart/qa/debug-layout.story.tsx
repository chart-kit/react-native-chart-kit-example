import { LineChart } from "react-native-chart-kit/v2";
import { multiSeriesRevenue } from "../../../fixtures/v2Line";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";

const V2DebugLayout = ({ width }: NativeStoryProps) => (
  <ChartSection
    title="Layout debug"
    kicker="Plot, label, legend, tooltip boxes"
  >
    <LineChart
      data={multiSeriesRevenue}
      xKey="month"
      width={width}
      height={260}
      curve="monotone"
      defaultSelectedIndex={3}
      debugLayout
      legend={{ position: "bottom" }}
      tooltip={{ shared: true }}
      series={[
        { yKey: "actual", label: "Actual", strokeWidth: 3 },
        { yKey: "forecast", label: "Target", strokeWidth: 2 },
      ]}
    />
  </ChartSection>
);

// Teaching note: Shows layout guides that are useful when tuning chart padding.
export const debugLayoutStory: ShowcaseStory = {
  id: "v2-debug-layout",
  title: "Debug Layout",
  Component: V2DebugLayout,
};
