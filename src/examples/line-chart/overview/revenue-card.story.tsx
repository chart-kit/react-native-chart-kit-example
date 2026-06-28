import { LineChart } from "react-native-chart-kit/v2";
import { subscriptionMetrics } from "../../../fixtures/v2Line";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";

const V2RevenueCard = ({ width }: NativeStoryProps) => (
  <ChartSection title="MRR growth" kicker="Multi-metric">
    <LineChart
      data={subscriptionMetrics}
      xKey="month"
      width={width}
      height={230}
      showDots={false}
      curve="monotone"
      formatYLabel={(value) => `$${Math.round(value)}k`}
      series={[
        { yKey: "revenue", label: "Revenue" },
        {
          yKey: "netRetention",
          label: "Retention",
          strokeWidth: 2,
        },
      ]}
    />
  </ChartSection>
);

// Teaching note: Wraps a chart in product-card chrome without changing the chart API surface.
export const revenueCardStory: ShowcaseStory = {
  id: "v2-revenue-card",
  title: "MRR Growth",
  Component: V2RevenueCard,
};
