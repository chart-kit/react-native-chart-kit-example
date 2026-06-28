import { BarChart } from "react-native-chart-kit/v2";
import { campaignSpend } from "../../fixtures/v2Bar";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../showcase/shared/storyPrimitives";

const V2ScrollableBar = ({ width }: NativeStoryProps) => (
  <ChartSection title="Campaign spend" kicker="Scrollable bars">
    <BarChart
      data={campaignSpend}
      height={250}
      initialIndex="end"
      scrollable
      series={[{ yKey: "spend", label: "Spend" }]}
      visiblePoints={5}
      width={width}
      xKey="week"
      yDomain={{ min: 0, max: "dataMax", nice: true }}
      formatYLabel={(value) => `$${value}k`}
    />
  </ChartSection>
);

// Teaching note: Uses visiblePoints to keep long bar series readable on phone widths.
export const scrollableStory: ShowcaseStory = {
  id: "v2-bar-scrollable",
  title: "Scrollable Bars",
  Component: V2ScrollableBar,
};
