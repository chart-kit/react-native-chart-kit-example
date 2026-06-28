import { LineChart } from "react-native-chart-kit/v2";
import { denseRevenue } from "../../../fixtures/v2Line";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";

const V2ScrollableDenseLine = ({ width }: NativeStoryProps) => (
  <ChartSection title="Scrollable weekly trend" kicker="Visible points">
    <LineChart
      data={denseRevenue}
      xKey="month"
      yKey="actual"
      width={width}
      height={230}
      scrollable
      visiblePoints={6}
      initialIndex="start"
      showDots={false}
      curve="monotone"
      showHorizontalGridLines
      labelStrategy="auto"
      formatXLabel={(_, index) => `W${index + 1}`}
    />
  </ChartSection>
);

// Teaching note: Stress-tests dense labels in a scrollable viewport instead of shrinking text.
export const scrollableDenseStory: ShowcaseStory = {
  id: "v2-scrollable-dense",
  title: "Scrollable Dense",
  Component: V2ScrollableDenseLine,
};
