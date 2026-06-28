import { CombinedChart } from "@chart-kit/pro/react-native";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../showcase/shared/storyPrimitives";

const formatPercent = (value: number) => `${value}%`;
const formatSignedCurrency = (value: number) =>
  value < 0 ? `-$${Math.abs(value)}k` : `$${value}k`;
const profitMargin = [
  { month: "Jan", profit: -22, margin: 8 },
  { month: "Feb", profit: -8, margin: 12 },
  { month: "Mar", profit: 14, margin: 16 },
  { month: "Apr", profit: 32, margin: 20 },
  { month: "May", profit: 48, margin: 24 },
  { month: "Jun", profit: 38, margin: 22 },
];
const V2CombinedNegativeValues = ({ width }: NativeStoryProps) => (
  <ChartSection title="Profit recovery" kicker="Negative values">
    <CombinedChart
      bars={[{ yKey: "profit", label: "Profit" }]}
      data={profitMargin}
      formatLeftYLabel={formatSignedCurrency}
      formatRightYLabel={formatPercent}
      height={280}
      leftYDomain={{ min: "dataMin", max: "dataMax", nice: true }}
      lines={[{ yKey: "margin", label: "Margin", curve: "monotone" }]}
      rightYDomain={[0, 30]}
      testID="combined-negative-values-chart"
      width={width}
      xKey="month"
    />
  </ChartSection>
);

// Teaching note: Exercises mixed positive and negative domains across combined marks.
export const negativeValuesStory: ShowcaseStory = {
  id: "v2-combined-negative-values",
  title: "Negative Values",
  Component: V2CombinedNegativeValues,
};
