import {
  ContributionGraph,
  getContributionGraphDataTable,
} from "react-native-chart-kit/v2";
import {
  productUsage,
  productUsageEndDate,
  productUsageNumDays,
} from "../../fixtures/v2Contribution";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../showcase/shared/storyPrimitives";
import { ChartDataDetails } from "../../showcase/shared/dataDetails";

const productUsageTable = getContributionGraphDataTable({
  endDate: productUsageEndDate,
  formatValue: (value) => `${value} events`,
  numDays: productUsageNumDays,
  values: productUsage,
});
const productUsageDetails = {
  columns: [
    { key: "date", label: "Date" },
    { key: "events", label: "Events" },
  ],
  rows: productUsageTable.rows.slice(-8).map((row) => ({
    key: `${row.index}`,
    values: [row.dateLabel, row.formattedValue],
  })),
};
const V2ContributionUsage = ({ width }: NativeStoryProps) => (
  <ChartSection title="Product usage" kicker="Contribution heatmap">
    <ContributionGraph
      endDate={productUsageEndDate}
      height={162}
      numDays={productUsageNumDays}
      testID="product-usage-heatmap"
      values={productUsage}
      weekStartsOn={1}
      width={width}
    />
  </ChartSection>
);
const V2ContributionUsageDetails = () => (
  <ChartDataDetails title="Product usage" {...productUsageDetails} />
);

// Teaching note: Maps dates to stable cells so calendar density is easy to validate.
export const usageStory: ShowcaseStory = {
  id: "v2-contribution-usage",
  title: "Product Usage Heatmap",
  Component: V2ContributionUsage,
  Details: V2ContributionUsageDetails,
};
