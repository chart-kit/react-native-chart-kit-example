import { BarChart, getBarChartDataTable } from "react-native-chart-kit/v2";
import { acquisitionByChannel } from "../../fixtures/v2Bar";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../showcase/shared/storyPrimitives";
import {
  ChartDataDetails,
  createFormattedValueDetails,
} from "../../showcase/shared/dataDetails";

const formatThousands = (value: number) => `${value}k`;
const V2GroupedBar = ({ width }: NativeStoryProps) => (
  <ChartSection title="Acquisition mix" kicker="Grouped bars">
    <BarChart
      data={acquisitionByChannel}
      height={300}
      series={[
        { yKey: "organic", label: "Organic" },
        { yKey: "paid", label: "Paid" },
      ]}
      showValuesOnTopOfBars
      width={width}
      xKey="month"
      yDomain={{ min: 0, max: "dataMax", nice: true }}
      formatYLabel={formatThousands}
    />
  </ChartSection>
);
const acquisitionMixDetails = createFormattedValueDetails({
  categoryLabel: "Month",
  table: getBarChartDataTable({
    data: acquisitionByChannel,
    formatYLabel: formatThousands,
    xKey: "month",
    yKeys: ["organic", "paid"],
  }),
});
const V2GroupedBarDetails = () => (
  <ChartDataDetails title="Acquisition mix" {...acquisitionMixDetails} />
);

// Teaching note: Places related series side by side so category comparison beats stacked totals.
export const groupedStory: ShowcaseStory = {
  id: "v2-bar-grouped",
  title: "Grouped Bars",
  Component: V2GroupedBar,
  Details: V2GroupedBarDetails,
};
