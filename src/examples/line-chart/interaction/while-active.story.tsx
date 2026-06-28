import { LineChart } from "react-native-chart-kit/v2";
import { multiSeriesRevenue } from "../../../fixtures/v2Line";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";

const V2WhileActiveScrub = ({
  onScrubEnd,
  onScrubStart,
  width,
}: NativeStoryProps) => (
  <ChartSection title="Hold to inspect" kicker="While-active selection">
    <LineChart
      data={multiSeriesRevenue}
      xKey="month"
      width={width}
      height={238}
      showDots={false}
      curve="monotone"
      interaction={{
        mode: "scrub",
        selectionPersistence: "whileActive",
        deselectOnOutsidePress: true,
        onGestureEnd: onScrubEnd,
        onGestureStart: onScrubStart,
      }}
      crosshair={{ strokeDasharray: [4, 4] }}
      tooltip={{ width: 138, positionAnimationDuration: 240 }}
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

// Teaching note: Limits the tooltip to active gestures for passive dashboards.
export const whileActiveStory: ShowcaseStory = {
  id: "v2-while-active",
  title: "While Active Scrub",
  Component: V2WhileActiveScrub,
};
