import { LineChart } from "react-native-chart-kit/v2";
import { planAttainment } from "../../../fixtures/v2Line";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";

const V2ThresholdColors = ({ width }: NativeStoryProps) => (
  <ChartSection title="Plan health" kicker="Threshold coloring">
    <LineChart
      data={planAttainment}
      xKey="month"
      yKey="attainment"
      width={width}
      height={238}
      area
      curve="monotone"
      showDots={false}
      showHorizontalGridLines
      yDomain={[80, 115]}
      formatYLabel={(value) => `${Math.round(value)}%`}
      series={[
        {
          yKey: "attainment",
          label: "Attainment",
          strokeWidth: 3,
          threshold: {
            y: 100,
            aboveColor: "#16A34A",
            belowColor: "#DC2626",
            areaAboveColor: "#22C55E",
            areaBelowColor: "#EF4444",
            areaOpacity: 0.11,
          },
        },
      ]}
      referenceLines={[
        {
          y: 100,
          label: "Plan",
          labelOffset: 12,
          labelPlacement: "below",
          labelPosition: "end",
          strokeDasharray: [5, 5],
          strokeWidth: 1.25,
        },
      ]}
    />
  </ChartSection>
);

// Teaching note: Splits stroke styling at thresholds while keeping one logical series.
export const thresholdColorsStory: ShowcaseStory = {
  id: "v2-threshold-colors",
  title: "Threshold Colors",
  Component: V2ThresholdColors,
};
