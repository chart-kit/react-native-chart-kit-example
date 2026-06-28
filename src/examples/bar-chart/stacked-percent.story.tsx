import { BarChart } from "react-native-chart-kit/v2";
import { platformShare } from "../../fixtures/v2Bar";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../showcase/shared/storyPrimitives";

const formatPercent = (value: number) => `${value}%`;
const V2StackedPercentBar = ({ width }: NativeStoryProps) => (
  <ChartSection title="Platform share" kicker="100% stacked">
    <BarChart
      data={platformShare}
      height={250}
      mode="stacked100"
      series={[
        { yKey: "ios", label: "iOS" },
        { yKey: "android", label: "Android" },
      ]}
      width={width}
      xKey="month"
      formatYLabel={formatPercent}
    />
  </ChartSection>
);

// Teaching note: Normalizes stacked values to communicate composition instead of raw totals.
export const stackedPercentStory: ShowcaseStory = {
  id: "v2-bar-stacked-percent",
  title: "Stacked Percent",
  Component: V2StackedPercentBar,
};
