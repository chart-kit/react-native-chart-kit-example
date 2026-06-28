import { LineChart } from "react-native-chart-kit/v2";
import { denseRevenue } from "../../../fixtures/v2Line";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";

const V2StaggeredLabels = ({ width }: NativeStoryProps) => (
  <ChartSection title="Weekly retention" kicker="Staggered labels">
    <LineChart
      data={denseRevenue}
      xKey="month"
      yKey="actual"
      width={width}
      height={248}
      showDots={false}
      curve="monotone"
      labelStrategy="stagger"
    />
  </ChartSection>
);

// Teaching note: Staggers labels when rotation would make the chart harder to scan.
export const staggeredLabelsStory: ShowcaseStory = {
  id: "v2-staggered-labels",
  title: "Staggered Labels",
  Component: V2StaggeredLabels,
};
