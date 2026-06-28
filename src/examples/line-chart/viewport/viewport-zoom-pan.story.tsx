import { useCallback, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  resolveChartViewportWindow,
  resolveChartViewportWindowFromPanDelta,
  resolveChartViewportWindowFromZoom,
  type ResolvedChartViewportWindow,
} from "@chart-kit/core";
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

const getZoomPanInitialViewport = (): LineChartViewportConfig =>
  resolveChartViewportWindow({
    itemCount: portfolioRangeHistory.length,
    initialIndex: "end",
    visiblePoints: 18,
  });
const toViewportConfig = (
  window: ResolvedChartViewportWindow,
): LineChartViewportConfig => ({
  startIndex: window.startIndex,
  endIndex: window.endIndex,
});
const resolveCurrentViewportWindow = (viewport: LineChartViewportConfig) =>
  resolveChartViewportWindow({
    itemCount: portfolioRangeHistory.length,
    startIndex: viewport.startIndex,
    endIndex: viewport.endIndex,
    visiblePoints: viewport.visiblePoints,
    initialIndex: viewport.initialIndex,
  });
const V2ViewportZoomPan = ({
  onScrubEnd,
  onScrubStart,
  width,
}: NativeStoryProps) => {
  const chartKitTheme = useChartKitTheme();
  const resolvedTheme = useMemo(
    () => resolveCartesianChartThemeConfig(chartKitTheme),
    [chartKitTheme],
  );
  const [viewport, setViewport] = useState<LineChartViewportConfig>(() =>
    getZoomPanInitialViewport(),
  );
  const buttonStyle = useMemo(
    () => [
      zoomStyles.button,
      {
        backgroundColor: resolvedTheme.plotBackground,
        borderColor: resolvedTheme.grid,
      },
    ],
    [resolvedTheme.grid, resolvedTheme.plotBackground],
  );
  const buttonTextStyle = useMemo(
    () => [zoomStyles.buttonText, { color: resolvedTheme.text }],
    [resolvedTheme.text],
  );
  const panViewport = useCallback((deltaPoints: number) => {
    setViewport((current) =>
      toViewportConfig(
        resolveChartViewportWindowFromPanDelta({
          currentWindow: resolveCurrentViewportWindow(current),
          deltaPoints,
          itemCount: portfolioRangeHistory.length,
        }),
      ),
    );
  }, []);
  const zoomViewport = useCallback((zoomFactor: number) => {
    setViewport((current) =>
      toViewportConfig(
        resolveChartViewportWindowFromZoom({
          currentWindow: resolveCurrentViewportWindow(current),
          itemCount: portfolioRangeHistory.length,
          minVisibleCount: 6,
          zoomFactor,
        }),
      ),
    );
  }, []);
  const handleViewportChange = useCallback(
    (event: LineChartViewportChangeEvent) => {
      setViewport(event.viewport);
    },
    [],
  );

  return (
    <ChartSection title="Controlled viewport" kicker="Drag or pinch">
      <LineChart
        data={portfolioRangeHistory}
        xKey="date"
        width={width}
        height={248}
        onViewportChange={handleViewportChange}
        testID="viewport-pan-chart"
        viewport={viewport}
        viewportInteraction={{
          pan: true,
          pinchZoom: true,
          minVisiblePoints: 6,
          onGestureEnd: onScrubEnd,
          onGestureStart: onScrubStart,
        }}
        yAxisLabelWidth="stable"
        axisLabelAnimation={{ duration: 160 }}
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
        referenceLines={[
          {
            y: 900,
            label: "Goal",
            strokeDasharray: [5, 5],
            opacity: 0.78,
          },
        ]}
        series={[
          { yKey: "portfolio", label: "Portfolio", strokeWidth: 3 },
          {
            yKey: "benchmark",
            label: "Benchmark",
            strokeDasharray: [4, 4],
            strokeWidth: 2,
          },
        ]}
      />
      <View style={zoomStyles.controls}>
        <Pressable style={buttonStyle} onPress={() => panViewport(-4)}>
          <Text style={buttonTextStyle}>Prev</Text>
        </Pressable>
        <Pressable style={buttonStyle} onPress={() => zoomViewport(0.72)}>
          <Text style={buttonTextStyle}>Zoom out</Text>
        </Pressable>
        <Pressable style={buttonStyle} onPress={() => zoomViewport(1.4)}>
          <Text style={buttonTextStyle}>Zoom in</Text>
        </Pressable>
        <Pressable style={buttonStyle} onPress={() => panViewport(4)}>
          <Text style={buttonTextStyle}>Next</Text>
        </Pressable>
      </View>
    </ChartSection>
  );
};
const zoomStyles = StyleSheet.create({
  controls: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
    marginTop: 10,
  },
  button: {
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 32,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "800",
  },
});

// Teaching note: Keeps pan and pinch zoom controlled through viewport callbacks.
export const viewportZoomPanStory: ShowcaseStory = {
  id: "v2-viewport-zoom-pan",
  title: "Zoom and Pan",
  Component: V2ViewportZoomPan,
};
