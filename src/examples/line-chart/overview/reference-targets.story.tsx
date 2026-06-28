import { LineChart } from "react-native-chart-kit/v2";
import { planAttainment } from "../../../fixtures/v2Line";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";

const V2ReferenceTargets = ({ width }: NativeStoryProps) => (
  <ChartSection title="Quota attainment" kicker="Reference overlays">
    <LineChart
      data={planAttainment}
      xKey="month"
      yKey="attainment"
      width={width}
      height={238}
      curve="monotone"
      showDots={false}
      showHorizontalGridLines
      yDomain={[80, 115]}
      formatYLabel={(value) => `${Math.round(value)}%`}
      referenceBands={[
        {
          y1: 90,
          y2: 110,
          label: "Target range",
          opacity: 0.09,
        },
      ]}
      referenceLines={[
        {
          y: 100,
          label: "Plan",
          labelOffset: 12,
          labelPlacement: "below",
          labelPosition: "end",
          strokeDasharray: [5, 5],
          strokeWidth: 1.25,
        },
      ]}
    />
  </ChartSection>
);

// Teaching note: Adds reference bands and labels to make target thresholds explicit.
export const referenceTargetsStory: ShowcaseStory = {
  id: "v2-reference-targets",
  title: "Reference Targets",
  Component: V2ReferenceTargets,
};
