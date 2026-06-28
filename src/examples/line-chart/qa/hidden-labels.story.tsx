import { LineChart } from "react-native-chart-kit/v2";
import { denseRevenue } from "../../../fixtures/v2Line";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";

const V2HiddenLabels = ({ width }: NativeStoryProps) => (
  <ChartSection title="Spark trend" kicker="Hidden labels">
    <LineChart
      data={denseRevenue}
      xKey="month"
      yKey="actual"
      width={width}
      height={220}
      showDots={false}
      curve="monotone"
      labelStrategy="hide"
    />
  </ChartSection>
);

// Teaching note: Confirms the chart can hide axis labels without changing the data model.
export const hiddenLabelsStory: ShowcaseStory = {
  id: "v2-hidden-labels",
  title: "Hidden Labels",
  Component: V2HiddenLabels,
};
