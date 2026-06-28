import { LineChart } from "react-native-chart-kit/v2";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../showcase/shared/storyPrimitives";
import performanceMetadata from "./metadata.json";

type PerfLinePoint = {
  benchmark: number;
  index: number;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  value: number;
};
const formatCompactCurrency = (value: number) =>
  value >= 1000
    ? `$${Math.round(value / 100) / 10}M`
    : `$${Math.round(value)}k`;
const createLineData = (count: number): PerfLinePoint[] =>
  Array.from({ length: count }, (_, index) => {
    const trend = 180 + index * 0.095;
    const cycle = Math.sin(index / 13) * 18 + Math.cos(index / 37) * 12;
    const fasterCycle = Math.sin(index / 5) * 4;
    const value = Math.max(12, trend + cycle + fasterCycle);

    return {
      benchmark: Math.max(12, 170 + index * 0.085 + Math.cos(index / 29) * 10),
      index,
      s1: Math.max(12, value),
      s2: Math.max(12, value * 0.86 + Math.sin(index / 17) * 15),
      s3: Math.max(12, value * 1.08 + Math.cos(index / 21) * 20),
      s4: Math.max(12, value * 0.72 + Math.sin(index / 9) * 11),
      s5: Math.max(12, value * 1.18 + Math.cos(index / 33) * 24),
      value,
    };
  });
const getStoryMetadata = (storyId: string) => {
  const metadata = performanceMetadata.stories.find(
    (story) => story.id === storyId,
  );

  if (!metadata) {
    throw new Error(`Missing performance story metadata for ${storyId}`);
  }

  return metadata;
};
const line1000Metadata = getStoryMetadata("v2-perf-line-1000-scrub");
const line1000 = createLineData(line1000Metadata.totalPoints);
const PerfMultiLineSharedTooltip = ({
  onScrubEnd,
  onScrubStart,
  width,
}: NativeStoryProps) => (
  <ChartSection title="5 x 1,000 shared tooltip" kicker="Native performance">
    <LineChart
      data={line1000}
      height={258}
      width={width}
      xKey="index"
      curve="monotone"
      showDots={false}
      labelStrategy="hide"
      defaultSelectedIndex={620}
      interaction={{
        mode: "scrub",
        onGestureEnd: onScrubEnd,
        onGestureStart: onScrubStart,
      }}
      crosshair={{ strokeDasharray: [4, 4] }}
      tooltip={{ width: 166 }}
      formatYLabel={formatCompactCurrency}
      series={[
        { yKey: "s1", label: "North" },
        { yKey: "s2", label: "South" },
        { yKey: "s3", label: "East" },
        { yKey: "s4", label: "West" },
        { yKey: "s5", label: "Enterprise" },
      ]}
    />
  </ChartSection>
);

// Teaching note: Exercises shared tooltip cost across five thousand visible series points.
export const line5x1000TooltipStory: ShowcaseStory = {
  id: "v2-perf-line-5x1000-tooltip",
  title: "5 x 1,000 Tooltip",
  Component: PerfMultiLineSharedTooltip,
};
