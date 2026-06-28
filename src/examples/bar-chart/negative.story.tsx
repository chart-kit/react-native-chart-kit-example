import { BarChart } from "react-native-chart-kit/v2";
import { monthlyProfit } from "../../fixtures/v2Bar";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../showcase/shared/storyPrimitives";

const formatSignedCurrency = (value: number) =>
  value < 0 ? `-$${Math.abs(value)}k` : `$${value}k`;
const V2NegativeBar = ({ width }: NativeStoryProps) => (
  <ChartSection title="Monthly profit" kicker="Negative values">
    <BarChart
      data={monthlyProfit}
      height={250}
      series={[{ yKey: "profit", label: "Profit" }]}
      showValuesOnTopOfBars
      width={width}
      xKey="month"
      formatYLabel={formatSignedCurrency}
    />
  </ChartSection>
);

// Teaching note: Exercises positive and negative bars around a shared zero baseline.
export const negativeStory: ShowcaseStory = {
  id: "v2-bar-negative",
  title: "Negative Bars",
  Component: V2NegativeBar,
};
