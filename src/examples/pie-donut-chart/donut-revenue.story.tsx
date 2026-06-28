import { DonutChart } from "react-native-chart-kit/v2";
import { subscriptionMix } from "../../fixtures/v2Pie";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../showcase/shared/storyPrimitives";

const formatPiePercentage = (value: number) => `${Math.round(value * 100)}%`;
const V2DonutRevenue = ({ width }: NativeStoryProps) => (
  <ChartSection title="Revenue mix" kicker="Donut chart">
    <DonutChart
      centerLabel="$1.5M"
      data={subscriptionMix}
      height={260}
      labelKey="plan"
      valueKey="revenue"
      width={width}
      formatPercentage={formatPiePercentage}
    />
  </ChartSection>
);

// Teaching note: Uses a center label to summarize the donut without a separate card.
export const donutRevenueStory: ShowcaseStory = {
  id: "v2-donut-revenue",
  title: "Revenue Donut",
  Component: V2DonutRevenue,
};
