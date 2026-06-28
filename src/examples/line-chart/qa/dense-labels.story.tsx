import { LineChart } from "react-native-chart-kit/v2";
import { denseRevenue } from "../../../fixtures/v2Line";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";

const V2DenseLabels = ({ width }: NativeStoryProps) => (
  <ChartSection title="Weekly trend" kicker="Dense labels">
    <LineChart
      data={denseRevenue}
      xKey="month"
      yKey="actual"
      width={width}
      height={230}
      showDots={false}
      curve="linear"
    />
  </ChartSection>
);

// Teaching note: Exercises the collision policy for labels that compete for the same x-space.
export const denseLabelsStory: ShowcaseStory = {
  id: "v2-dense-labels",
  title: "Dense Labels",
  Component: V2DenseLabels,
};
