import { PieChart, getPieChartDataTable } from "react-native-chart-kit/v2";
import { acquisitionShare } from "../../fixtures/v2Pie";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../showcase/shared/storyPrimitives";
import { ChartDataDetails } from "../../showcase/shared/dataDetails";

const formatPiePercentage = (value: number) => `${Math.round(value * 100)}%`;
const acquisitionShareTable = getPieChartDataTable({
  data: acquisitionShare,
  formatPercentage: formatPiePercentage,
  formatValue: (value) => `${value}`,
  labelKey: "channel",
  valueKey: "share",
});
const acquisitionShareDetails = {
  columns: [
    { key: "channel", label: "Channel" },
    { key: "share", label: "Share" },
    { key: "percent", label: "Percent" },
  ],
  rows: acquisitionShareTable.rows.map((row) => ({
    key: `${row.index}`,
    values: [row.label, row.formattedValue, row.percentageLabel],
  })),
};
const V2PieAcquisition = ({ width }: NativeStoryProps) => (
  <ChartSection title="Acquisition share" kicker="Pie chart">
    <PieChart
      data={acquisitionShare}
      height={260}
      labelKey="channel"
      valueKey="share"
      width={width}
      formatPercentage={formatPiePercentage}
    />
  </ChartSection>
);
const V2PieAcquisitionDetails = () => (
  <ChartDataDetails title="Acquisition share" {...acquisitionShareDetails} />
);

// Teaching note: Uses slices for part-to-whole acquisition share with theme-driven colors.
export const pieAcquisitionStory: ShowcaseStory = {
  id: "v2-pie-acquisition",
  title: "Acquisition Pie",
  Component: V2PieAcquisition,
  Details: V2PieAcquisitionDetails,
};
