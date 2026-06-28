import { useState } from "react";
import { DonutChart } from "react-native-chart-kit/v2";
import { subscriptionMix } from "../../fixtures/v2Pie";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../showcase/shared/storyPrimitives";

const formatPiePercentage = (value: number) => `${Math.round(value * 100)}%`;
const V2SelectableDonut = ({ width }: NativeStoryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const selectedPlan = subscriptionMix[selectedIndex]?.plan ?? "Revenue";

  return (
    <ChartSection title="Plan mix" kicker="Tap selection">
      <DonutChart
        activeSlice={{
          activeOffset: 6,
          activeScale: 1.035,
          inactiveOpacity: 0.72,
        }}
        centerLabel={selectedPlan}
        data={subscriptionMix}
        height={260}
        interaction={{
          mode: "tap",
          onSelect: (event) => setSelectedIndex(event.index),
        }}
        labelKey="plan"
        selectedIndex={selectedIndex}
        selectionAnimation={{ duration: 220 }}
        testID="selectable-donut-chart"
        valueKey="revenue"
        width={width}
        formatPercentage={formatPiePercentage}
      />
    </ChartSection>
  );
};

// Teaching note: Updates the center label from controlled slice selection.
export const donutSelectionStory: ShowcaseStory = {
  id: "v2-donut-selection",
  title: "Donut Selection",
  Component: V2SelectableDonut,
};
