import { LineChart } from "react-native-chart-kit/v2";
import { multiSeriesRevenue } from "../../../fixtures/v2Line";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";

const V2DotStyles = ({ width }: NativeStoryProps) => (
  <ChartSection title="Marker styles" kicker="Circle and diamond markers">
    <LineChart
      data={multiSeriesRevenue.map((point) => ({
        ...point,
        forecast:
          typeof point.forecast === "number"
            ? point.forecast - 8
            : point.forecast,
      }))}
      xKey="month"
      width={width}
      height={238}
      curve="monotone"
      dots={{
        radius: 4,
        fill: "background",
        strokeWidth: 2,
      }}
      series={[
        {
          yKey: "actual",
          label: "Actual",
          strokeWidth: 3,
          dot: {
            shape: "circle",
            radius: 4.5,
          },
        },
        {
          yKey: "forecast",
          label: "Forecast",
          strokeWidth: 2,
          dot: {
            shape: "diamond",
            radius: 4,
            fill: "series",
            stroke: "background",
            strokeWidth: 1.5,
          },
        },
      ]}
    />
  </ChartSection>
);

// Teaching note: Shows how marker shape and stroke choices can encode series meaning.
export const dotStylesStory: ShowcaseStory = {
  id: "v2-dot-styles",
  title: "Marker Styles",
  Component: V2DotStyles,
};
