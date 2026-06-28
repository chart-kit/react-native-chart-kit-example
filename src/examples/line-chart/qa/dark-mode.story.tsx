import { LineChart } from "react-native-chart-kit/v2";
import { multiSeriesRevenue } from "../../../fixtures/v2Line";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";

const V2DarkMode = ({ width }: NativeStoryProps) => (
  <ChartSection title="Dark mode" kicker="Area and multi-series">
    <LineChart
      data={multiSeriesRevenue}
      xKey="month"
      width={width}
      height={238}
      theme="dark"
      curve="monotone"
      area
      series={[
        { yKey: "actual", label: "Actual", color: "#38bdf8", strokeWidth: 3 },
        { yKey: "forecast", label: "Target", color: "#a78bfa", strokeWidth: 2 },
      ]}
    />
  </ChartSection>
);

// Teaching note: Exercises dark theme tokens for chart text, grid, and plot background.
export const darkModeStory: ShowcaseStory = {
  id: "v2-dark-mode",
  title: "Dark Mode",
  Component: V2DarkMode,
};
