import { LineChart } from "react-native-chart-kit/v2";
import { basicRevenue } from "../../../fixtures/v2Line";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";

const V2GridLines = ({ width }: NativeStoryProps) => (
  <ChartSection title="Grid lines" kicker="Opt-in horizontal and vertical grid">
    <LineChart
      data={basicRevenue}
      xKey="month"
      yKey="actual"
      width={width}
      height={230}
      curve="monotone"
      showDots={false}
      showHorizontalGridLines
      showVerticalGridLines
    />
  </ChartSection>
);

// Teaching note: Verifies grid styling stays aligned with the computed plot area.
export const gridLinesStory: ShowcaseStory = {
  id: "v2-grid-lines",
  title: "Grid Lines",
  Component: V2GridLines,
};
