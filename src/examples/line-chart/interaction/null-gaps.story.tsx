import { LineChart } from "react-native-chart-kit/v2";
import { revenueWithGaps } from "../../../fixtures/v2Line";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";

const V2NullGaps = ({ width }: NativeStoryProps) => (
  <ChartSection title="Missing readings" kicker="Null gap handling">
    <LineChart
      data={revenueWithGaps}
      xKey="month"
      yKey="actual"
      width={width}
      height={230}
      yDomain={[0, "dataMax"]}
      showDots
      selectedIndex={3}
      crosshair={{ strokeDasharray: [4, 4] }}
      tooltip
    />
  </ChartSection>
);

// Teaching note: Keeps missing values explicit instead of interpolating through absent data.
export const nullGapsStory: ShowcaseStory = {
  id: "v2-null-gaps",
  title: "Null Gaps",
  Component: V2NullGaps,
};
