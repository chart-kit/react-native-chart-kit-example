import { LineChart } from "react-native-chart-kit/v2";
import { msftVsGoogHistory } from "../../../fixtures/v2Line";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";

const V2ScrollableStockComparison = ({ width }: NativeStoryProps) => (
  <ChartSection title="MSFT vs GOOG" kicker="Scrollable">
    <LineChart
      data={msftVsGoogHistory}
      xKey="date"
      width={width}
      height={262}
      scrollable
      visiblePoints={16}
      initialIndex="end"
      curve="monotone"
      showHorizontalGridLines
      yDomain={{ min: "dataMin", max: "dataMax", nice: true }}
      formatXLabel={(value) =>
        value instanceof Date
          ? value.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          : String(value)
      }
      formatYLabel={(value) => `$${Math.round(value)}`}
      dots={{ radius: 3.5, strokeWidth: 1.75 }}
      series={[
        {
          yKey: "msft",
          label: "MSFT",
          strokeWidth: 3,
          dot: { shape: "circle", fill: "background", stroke: "series" },
        },
        {
          yKey: "goog",
          label: "GOOG",
          strokeWidth: 2.5,
          dot: {
            shape: "diamond",
            fill: "series",
            radius: 3.8,
            stroke: "background",
            strokeWidth: 1.5,
          },
        },
      ]}
    />
  </ChartSection>
);

// Teaching note: Compares two stocks in a passive scrollable chart with no default selection.
export const scrollableStockComparisonStory: ShowcaseStory = {
  id: "v2-scrollable-stock-comparison",
  title: "Scrollable",
  Component: V2ScrollableStockComparison,
};
