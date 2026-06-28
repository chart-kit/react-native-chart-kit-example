import {
  CombinedChart,
  getCombinedChartDataTable,
} from "@chart-kit/pro/react-native";
import { revenueMargin } from "../../fixtures/v2Combined";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../showcase/shared/storyPrimitives";
import {
  ChartDataDetails,
  createFormattedValueDetails,
} from "../../showcase/shared/dataDetails";

const formatCurrency = (value: number) => `$${value}k`;
const formatPercent = (value: number) => `${value}%`;
const V2CombinedRevenueMargin = ({ width }: NativeStoryProps) => (
  <ChartSection title="Revenue and margin" kicker="Dual-axis combined">
    <CombinedChart
      bars={[{ yKey: "revenue", label: "Revenue" }]}
      data={revenueMargin}
      formatLeftYLabel={formatCurrency}
      formatRightYLabel={formatPercent}
      height={280}
      leftYDomain={[0, "dataMax"]}
      lines={[
        {
          yKey: "margin",
          label: "Margin",
          curve: "monotone",
          strokeWidth: 3.5,
        },
      ]}
      rightYDomain={[0, 40]}
      testID="combined-revenue-margin-chart"
      width={width}
      xKey="month"
    />
  </ChartSection>
);
const revenueMarginDetails = createFormattedValueDetails({
  categoryLabel: "Month",
  table: getCombinedChartDataTable({
    bars: [{ yKey: "revenue", label: "Revenue" }],
    data: revenueMargin,
    formatLeftYLabel: formatCurrency,
    formatRightYLabel: formatPercent,
    lines: [{ yKey: "margin", label: "Margin" }],
    xKey: "month",
  }),
});
const V2CombinedRevenueMarginDetails = () => (
  <ChartDataDetails title="Revenue and margin" {...revenueMarginDetails} />
);

// Teaching note: Combines bars and lines for related metrics with different units.
export const revenueMarginStory: ShowcaseStory = {
  id: "v2-combined-revenue-margin",
  title: "Revenue + Margin",
  Component: V2CombinedRevenueMargin,
  Details: V2CombinedRevenueMarginDetails,
};
