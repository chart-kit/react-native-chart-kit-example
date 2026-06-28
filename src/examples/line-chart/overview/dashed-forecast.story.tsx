import { LineChart } from "react-native-chart-kit/v2";
import { multiSeriesRevenue } from "../../../fixtures/v2Line";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";

const V2DashedForecast = ({ width }: NativeStoryProps) => (
  <ChartSection title="Forecast variance" kicker="Straight and dashed lines">
    <LineChart
      data={multiSeriesRevenue}
      xKey="month"
      width={width}
      height={238}
      showDots={false}
      curve="linear"
      legend={{
        marker: "line",
        itemGap: 18,
      }}
      series={[
        {
          yKey: "actual",
          label: "Actual",
          strokeWidth: 3,
          strokeLinecap: "round",
        },
        {
          yKey: "forecast",
          label: "Forecast",
          color: "#64748B",
          strokeDasharray: [6, 5],
          strokeLinecap: "butt",
          strokeOpacity: 0.82,
          strokeWidth: 2.5,
        },
      ]}
    />
  </ChartSection>
);

// Teaching note: Separates actuals and forecast values visually without changing the data shape.
export const dashedForecastStory: ShowcaseStory = {
  id: "v2-dashed-forecast",
  title: "Dashed Forecast",
  Component: V2DashedForecast,
};
