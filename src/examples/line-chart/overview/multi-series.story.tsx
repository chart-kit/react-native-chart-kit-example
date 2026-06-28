import { LineChart } from "react-native-chart-kit/v2";
import { multiSeriesRevenue } from "../../../fixtures/v2Line";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";

const V2MultiSeries = ({ width }: NativeStoryProps) => (
  <ChartSection title="Plan vs actual" kicker="Multi-series">
    <LineChart
      data={multiSeriesRevenue}
      xKey="month"
      width={width}
      height={238}
      showDots={false}
      curve="monotone"
      series={[
        { yKey: "actual", label: "Actual", strokeWidth: 3 },
        {
          yKey: "forecast",
          label: "Forecast",
          strokeWidth: 2,
        },
      ]}
    />
  </ChartSection>
);

// Teaching note: Uses multiple y-series on one x-domain for direct trend comparison.
export const multiSeriesStory: ShowcaseStory = {
  id: "v2-multi-series",
  title: "Multi Series",
  Component: V2MultiSeries,
};
