import { AreaChart } from "react-native-chart-kit/v2";
import { priceHistory } from "../../../fixtures/v2Line";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";

const V2AreaFill = ({ width }: NativeStoryProps) => (
  <ChartSection title="Price history" kicker="Area chart">
    <AreaChart
      data={priceHistory}
      xKey="date"
      yKey="price"
      width={width}
      height={230}
      curve="monotone"
      areaFill={{ fromOpacity: 0.32, toOpacity: 0.05 }}
      formatYLabel={(value) => `$${Math.round(value)}`}
    />
  </ChartSection>
);

// Teaching note: Adds area fill as presentation only; the source line data remains unchanged.
export const areaFillStory: ShowcaseStory = {
  id: "v2-area",
  title: "Area Fill",
  Component: V2AreaFill,
};
