import { useCallback, useMemo, useState } from "react";
import { resolveChartViewportPresetWindow } from "@chart-kit/core";
import {
  LineChart,
  resolveCartesianChartThemeConfig,
  type LineChartViewportChangeEvent,
  type LineChartViewportConfig,
  useChartKitTheme,
} from "react-native-chart-kit/v2";
import { portfolioRangeHistory } from "../../../fixtures/v2Line";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";
import {
  createRangeSelectorHandleRenderer,
  createRangeSelectorLineRenderer,
} from "../../../showcase/shared/rangeSelectorRenderers";

const rangeSelectorXValues = portfolioRangeHistory.map((point) => point.date);
const getInitialRangeSelectorViewport = (): LineChartViewportConfig =>
  resolveChartViewportPresetWindow({
    preset: "1M",
    xValues: rangeSelectorXValues,
  });
const V2RangeSelectorOverview = ({
  isVisualMode,
  onScrubEnd,
  onScrubStart,
  width,
}: NativeStoryProps) => {
  const chartKitTheme = useChartKitTheme();
  const resolvedTheme = useMemo(
    () => resolveCartesianChartThemeConfig(chartKitTheme),
    [chartKitTheme],
  );
  const rangeSelectorPalette = {
    backgroundFill: resolvedTheme.background,
    benchmarkColor: resolvedTheme.series[1] ?? resolvedTheme.mutedText,
    handleColor: resolvedTheme.series[0] ?? resolvedTheme.text,
    handleGripColor: resolvedTheme.background,
    outsideFill: resolvedTheme.grid,
    plotFill: resolvedTheme.plotBackground,
    windowFill: resolvedTheme.series[0] ?? resolvedTheme.text,
    windowStroke: resolvedTheme.series[0] ?? resolvedTheme.text,
  };
  const [viewport, setViewport] = useState<LineChartViewportConfig>(() =>
    getInitialRangeSelectorViewport(),
  );
  const handleViewportChange = useCallback(
    (event: LineChartViewportChangeEvent) => {
      setViewport(event.viewport);
    },
    [],
  );

  return (
    <ChartSection title="Portfolio range" kicker="Overview window">
      <LineChart
        data={portfolioRangeHistory}
        xKey="date"
        width={width}
        height={isVisualMode ? 326 : 312}
        onViewportChange={handleViewportChange}
        testID="range-selector-chart"
        viewport={viewport}
        yAxisLabelWidth="stable"
        axisLabelAnimation={{ duration: 180 }}
        interaction={{
          mode: "scrub",
          selectionPersistence: "persist",
          deselectOnOutsidePress: true,
          onGestureEnd: onScrubEnd,
          onGestureStart: onScrubStart,
        }}
        crosshair={{ strokeDasharray: [4, 4] }}
        tooltip={{ positionAnimationDuration: 260, width: 168 }}
        activeDot={{ radius: 5.5, fill: "background", strokeWidth: 2.5 }}
        rangeSelector={{
          height: 66,
          gap: 10,
          interactive: true,
          backgroundFill: rangeSelectorPalette.backgroundFill,
          plotFill: rangeSelectorPalette.plotFill,
          plotRadius: 9,
          lineMinStrokeWidth: 1.2,
          lineStrokeWidthScale: 0.52,
          series: {
            portfolio: { opacity: 0.9, strokeWidth: 1.8 },
            benchmark: {
              color: rangeSelectorPalette.benchmarkColor,
              opacity: 0.72,
              strokeDasharray: [4, 4],
              strokeWidth: 1.4,
            },
          },
          handleHitSlop: 28,
          handleHeight: 28,
          handleRadius: 5,
          handleWidth: 6,
          handleColor: rangeSelectorPalette.handleColor,
          onGestureEnd: onScrubEnd,
          onGestureStart: onScrubStart,
          outsideFill: rangeSelectorPalette.outsideFill,
          outsideOpacity: 0.4,
          windowFill: rangeSelectorPalette.windowFill,
          windowStroke: rangeSelectorPalette.windowStroke,
          windowOpacity: 0.12,
          windowRadius: 9,
          windowStrokeOpacity: 0.72,
          windowStrokeWidth: 1.5,
          renderLine: createRangeSelectorLineRenderer(),
          renderHandle: createRangeSelectorHandleRenderer({
            handleGripColor: rangeSelectorPalette.handleGripColor,
          }),
        }}
        curve="monotone"
        showDots={false}
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
        series={[
          { yKey: "portfolio", label: "Portfolio", strokeWidth: 3 },
          { yKey: "benchmark", label: "Benchmark", strokeWidth: 2.5 },
        ]}
      />
    </ChartSection>
  );
};

// Teaching note: Pairs a detail chart with an overview range selector for large time-series navigation.
export const rangeSelectorStory: ShowcaseStory = {
  id: "v2-range-selector",
  title: "Portfolio Range",
  Component: V2RangeSelectorOverview,
};
