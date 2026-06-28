import { LineChart } from "react-native-chart-kit/v2";
import { multiSeriesRevenue } from "../../../fixtures/v2Line";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";

const V2SelectedTooltip = ({ width }: NativeStoryProps) => (
  <ChartSection title="Shared tooltip" kicker="Selection model">
    <LineChart
      data={multiSeriesRevenue}
      xKey="month"
      width={width}
      height={238}
      showDots={false}
      curve="monotone"
      selectedIndex={2}
      crosshair={{ strokeDasharray: [4, 4] }}
      tooltip={{ width: 138 }}
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

// Teaching note: Uses a controlled default selection so tooltip rendering is easy to inspect.
export const selectedTooltipStory: ShowcaseStory = {
  id: "v2-selected-tooltip",
  title: "Shared Tooltip",
  Component: V2SelectedTooltip,
};
