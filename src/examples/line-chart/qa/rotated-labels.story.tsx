import { LineChart } from "react-native-chart-kit/v2";
import { longRangeRevenue } from "../../../fixtures/v2Line";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";

const V2RotatedLabels = ({ width }: NativeStoryProps) => (
  <ChartSection title="Monthly expansion" kicker="Rotated labels">
    <LineChart
      data={longRangeRevenue}
      xKey="month"
      yKey="actual"
      width={width}
      height={260}
      showDots={false}
      curve="monotone"
      labelStrategy="rotate"
      labelRotation={-35}
    />
  </ChartSection>
);

// Teaching note: Uses rotation as a layout tool for long categorical labels.
export const rotatedLabelsStory: ShowcaseStory = {
  id: "v2-rotated-labels",
  title: "Rotated Labels",
  Component: V2RotatedLabels,
};
