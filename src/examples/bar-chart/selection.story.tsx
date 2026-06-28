import { BarChart } from "react-native-chart-kit/v2";
import { acquisitionByChannel } from "../../fixtures/v2Bar";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../showcase/shared/storyPrimitives";

const formatThousands = (value: number) => `${value}k`;
const V2SelectableBar = ({ width }: NativeStoryProps) => (
  <ChartSection title="Paid acquisition" kicker="Tap selection">
    <BarChart
      data={acquisitionByChannel}
      defaultSelectedBar={{ dataIndex: 0, seriesKey: "paid" }}
      height={260}
      interaction={{ mode: "tap", deselectOnOutsidePress: true }}
      series={[
        { yKey: "organic", label: "Organic" },
        { yKey: "paid", label: "Paid" },
      ]}
      testID="selectable-bar-chart"
      tooltip={{
        anchor: "pointer",
        borderColor: "transparent",
        placement: "above",
        width: 132,
      }}
      width={width}
      xKey="month"
      yDomain={{ min: 0, max: "dataMax", nice: true }}
      formatYLabel={formatThousands}
    />
  </ChartSection>
);

// Teaching note: Starts with a default selected bar to make tap-selection state obvious.
export const selectionStory: ShowcaseStory = {
  id: "v2-bar-selection",
  title: "Tap Selection",
  Component: V2SelectableBar,
};
