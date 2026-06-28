import { BarChart } from "react-native-chart-kit/v2";
import { campaignSpend } from "../../fixtures/v2Bar";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../showcase/shared/storyPrimitives";

const V2ScrollableSelectableBar = ({ width }: NativeStoryProps) => (
  <ChartSection title="Spend inspection" kicker="Scrollable selection">
    <BarChart
      data={campaignSpend}
      defaultSelectedBar={{ dataIndex: 15, seriesKey: "spend" }}
      height={260}
      initialIndex="end"
      interaction={{ mode: "tap", deselectOnOutsidePress: true }}
      scrollable
      selectionAnimation={{ duration: 220 }}
      series={[{ yKey: "spend", label: "Spend" }]}
      testID="scrollable-selectable-bar-chart"
      tooltip={{ positionAnimationDuration: 260, width: 128 }}
      visiblePoints={5}
      width={width}
      xKey="week"
      yDomain={{ min: 0, max: "dataMax", nice: true }}
      formatYLabel={(value) => `$${value}k`}
    />
  </ChartSection>
);

// Teaching note: Combines horizontal scrolling with tap selection for inspection workflows.
export const scrollableSelectionStory: ShowcaseStory = {
  id: "v2-bar-scrollable-selection",
  title: "Scrollable Selection",
  Component: V2ScrollableSelectableBar,
};
