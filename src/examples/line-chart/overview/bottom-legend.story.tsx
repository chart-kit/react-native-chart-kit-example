import { LineChart } from "react-native-chart-kit/v2";
import { multiSeriesRevenue } from "../../../fixtures/v2Line";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";

const V2BottomLegend = ({ width }: NativeStoryProps) => (
  <ChartSection title="Plan vs actual" kicker="Bottom legend">
    <LineChart
      data={multiSeriesRevenue}
      xKey="month"
      width={width}
      height={248}
      showDots={false}
      curve="monotone"
      legend={{
        position: "bottom",
        align: "center",
        marker: "line",
        itemGap: 18,
        fontSize: 12,
      }}
      series={[
        { yKey: "actual", label: "Actual" },
        {
          yKey: "forecast",
          label: "Forecast",
          strokeWidth: 2,
        },
      ]}
    />
  </ChartSection>
);

// Teaching note: Keeps legend content outside the plot so labels stay readable on compact widths.
export const bottomLegendStory: ShowcaseStory = {
  id: "v2-bottom-legend",
  title: "Bottom Legend",
  Component: V2BottomLegend,
};
