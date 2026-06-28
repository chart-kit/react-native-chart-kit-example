import { AreaChart } from "react-native-chart-kit/v2";
import { scrollablePriceHistory } from "../../../fixtures/v2Line";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";

const V2ScrollablePriceHistory = ({ width }: NativeStoryProps) => (
  <ChartSection title="Stock price history" kicker="Scrollable viewport">
    <AreaChart
      data={scrollablePriceHistory}
      xKey="date"
      yKey="price"
      width={width}
      height={248}
      scrollable
      visiblePoints={18}
      initialIndex="end"
      curve="monotone"
      showDots={false}
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
    />
  </ChartSection>
);

// Teaching note: Uses a visible window over a longer dataset for mobile-friendly price history.
export const scrollablePriceStory: ShowcaseStory = {
  id: "v2-scrollable-price",
  title: "Scrollable Price",
  Component: V2ScrollablePriceHistory,
};
