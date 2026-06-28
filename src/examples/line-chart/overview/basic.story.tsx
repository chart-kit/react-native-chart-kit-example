import { LineChart, getLineChartDataTable } from "react-native-chart-kit/v2";
import { basicRevenue } from "../../../fixtures/v2Line";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";
import {
  ChartDataDetails,
  createFormattedValueDetails,
} from "../../../showcase/shared/dataDetails";

const V2Basic = ({ width }: NativeStoryProps) => (
  <ChartSection title="Revenue" kicker="Basic">
    <LineChart
      data={basicRevenue}
      xKey="month"
      yKey="actual"
      width={width}
      height={230}
      curve="monotone"
    />
  </ChartSection>
);
const basicRevenueDetails = createFormattedValueDetails({
  categoryLabel: "Month",
  table: getLineChartDataTable({
    data: basicRevenue,
    formatYLabel: (value) => `$${value}k`,
    xKey: "month",
    yKeys: ["actual"],
  }),
});
const V2BasicDetails = () => (
  <ChartDataDetails title="Revenue" {...basicRevenueDetails} />
);

// Teaching note: Shows the smallest useful LineChart contract: data, xKey, series, and width-driven layout.
export const basicStory: ShowcaseStory = {
  id: "v2-basic",
  title: "Basic",
  Component: V2Basic,
  Details: V2BasicDetails,
};
