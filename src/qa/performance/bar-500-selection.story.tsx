import { BarChart } from "react-native-chart-kit/v2";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../showcase/shared/storyPrimitives";
import performanceMetadata from "./metadata.json";

type PerfBarPoint = {
  spend: number;
  week: string;
};
const createBarData = (count: number): PerfBarPoint[] =>
  Array.from({ length: count }, (_, index) => ({
    spend: Math.round(42 + Math.sin(index / 4) * 14 + Math.cos(index / 19) * 9),
    week: `W${index + 1}`,
  }));
const getStoryMetadata = (storyId: string) => {
  const metadata = performanceMetadata.stories.find(
    (story) => story.id === storyId,
  );

  if (!metadata) {
    throw new Error(`Missing performance story metadata for ${storyId}`);
  }

  return metadata;
};
const barMetadata = getStoryMetadata("v2-perf-bar-500-selection");
const bars500 = createBarData(barMetadata.totalPoints);
const PerfScrollableBars = ({ width }: NativeStoryProps) => (
  <ChartSection title="500 scrollable bars" kicker="Native performance">
    <BarChart
      data={bars500}
      defaultSelectedBar={{ dataIndex: 490, seriesKey: "spend" }}
      height={252}
      initialIndex="end"
      interaction={{ mode: "tap", deselectOnOutsidePress: true }}
      scrollable
      selectionAnimation={{ duration: 200 }}
      series={[{ yKey: "spend", label: "Spend" }]}
      tooltip={{ positionAnimationDuration: 220, width: 128 }}
      visiblePoints={24}
      width={width}
      xKey="week"
      yDomain={{ min: 0, max: "dataMax", nice: true }}
      formatYLabel={(value) => `$${Math.round(value)}k`}
    />
  </ChartSection>
);

// Teaching note: Checks tap selection on a long scrollable bar dataset.
export const bar500SelectionStory: ShowcaseStory = {
  id: "v2-perf-bar-500-selection",
  title: "500 Bar Selection",
  Component: PerfScrollableBars,
};
