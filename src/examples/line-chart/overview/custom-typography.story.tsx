import { LineChart } from "react-native-chart-kit/v2";
import { multiSeriesRevenue } from "../../../fixtures/v2Line";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";

const V2CustomTypography = ({ width }: NativeStoryProps) => (
  <ChartSection title="Typography" kicker="Font token mapping">
    <LineChart
      data={multiSeriesRevenue}
      xKey="month"
      width={width}
      height={238}
      showDots={false}
      curve="monotone"
      theme={{
        typography: {
          fontFamily: "Georgia",
          axisLabelSize: 12,
          legendLabelSize: 13,
        },
      }}
      legend={{
        align: "center",
        marker: "circle",
      }}
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

// Teaching note: Demonstrates theme-aware text sizing without hard-coding global app styles.
export const customTypographyStory: ShowcaseStory = {
  id: "v2-custom-typography",
  title: "Custom Typography",
  Component: V2CustomTypography,
};
