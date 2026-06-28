import { LineChart } from "react-native-chart-kit/v2";
import { sixMonthRevenue } from "../../../fixtures/v2Line";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";

const V2RotatedSixLabels = ({ width }: NativeStoryProps) => (
  <ChartSection title="Six month labels" kicker="Steep rotation">
    <LineChart
      data={sixMonthRevenue}
      xKey="month"
      yKey="actual"
      width={width}
      height={250}
      showDots={false}
      curve="monotone"
      labelStrategy="rotate"
      labelRotation={-70}
      labelMinGap={0}
    />
  </ChartSection>
);

// Teaching note: Caps the visible label count to prove predictable axis density.
export const sixLabelsStory: ShowcaseStory = {
  id: "v2-six-labels",
  title: "Six Labels",
  Component: V2RotatedSixLabels,
};
