import { useCallback, useState } from "react";
import {
  LineChart,
  type LineChartViewportChangeEvent,
  type LineChartViewportConfig,
} from "react-native-chart-kit/v2";
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
const line10000Metadata = getStoryMetadata("v2-perf-line-10000-overview");
const panLineMetadata = getStoryMetadata("v2-perf-line-10000-pan");
const line10000 = createLineData(line10000Metadata.totalPoints);
const PerfPanLine = ({ onScrubEnd, onScrubStart, width }: NativeStoryProps) => {
  const [viewport, setViewport] = useState<LineChartViewportConfig>({
    endIndex: panLineMetadata.totalPoints - 1,
    startIndex: panLineMetadata.totalPoints - panLineMetadata.visiblePoints,
  });
  const handleViewportChange = useCallback(
    (event: LineChartViewportChangeEvent) => setViewport(event.viewport),
    [],
  );

  return (
    <ChartSection title="10,000 point pan" kicker="Native performance">
      <LineChart
        data={line10000}
        height={258}
        width={width}
        xKey="index"
        yKey="value"
        curve="monotone"
        decimation="auto"
        showDots={false}
        labelStrategy="hide"
        onViewportChange={handleViewportChange}
        viewport={viewport}
        viewportInteraction={{
          onGestureEnd: onScrubEnd,
          onGestureStart: onScrubStart,
          pan: true,
        }}
        yAxisLabelWidth="stable"
        yDomain={{ min: "dataMin", max: "dataMax", nice: true }}
        formatYLabel={formatCompactCurrency}
      />
    </ChartSection>
  );
};

// Teaching note: Keeps panning behavior measurable on a large dataset.
export const line10000PanStory: ShowcaseStory = {
  id: "v2-perf-line-10000-pan",
  title: "10,000 Point Pan",
  Component: PerfPanLine,
};
