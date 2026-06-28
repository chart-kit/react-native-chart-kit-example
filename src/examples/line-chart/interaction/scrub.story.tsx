import { LineChart } from "react-native-chart-kit/v2";
import { multiSeriesRevenue } from "../../../fixtures/v2Line";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";

const V2ScrubInteraction = ({
  onScrubEnd,
  onScrubStart,
  width,
}: NativeStoryProps) => (
  <ChartSection title="Tap and scrub" kicker="Persistent selection">
    <LineChart
      data={multiSeriesRevenue}
      xKey="month"
      width={width}
      height={238}
      showDots={false}
      curve="monotone"
      defaultSelectedIndex={3}
      interaction={{
        mode: "scrub",
        selectionPersistence: "persist",
        deselectOnOutsidePress: true,
        onGestureEnd: onScrubEnd,
        onGestureStart: onScrubStart,
      }}
      crosshair={{ strokeDasharray: [4, 4] }}
      tooltip={{
        width: 138,
        anchor: "pointer",
        placement: "above",
        offset: 18,
        positionAnimationDuration: 260,
      }}
      activeDot={{
        radius: 5.5,
        fill: "background",
        strokeWidth: 2.5,
      }}
      series={[
        { yKey: "actual", label: "Actual", strokeWidth: 3 },
        { yKey: "forecast", label: "Forecast", strokeWidth: 2 },
      ]}
    />
  </ChartSection>
);

// Teaching note: Demonstrates continuous pointer inspection while preserving chart layout.
export const scrubStory: ShowcaseStory = {
  id: "v2-scrub",
  title: "Tap and Scrub",
  Component: V2ScrubInteraction,
};
