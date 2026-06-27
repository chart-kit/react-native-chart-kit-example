import { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { LineChart } from "react-native-chart-kit/v2";
import { Realtime } from "@chart-kit/pro/react-native";

import type { NativeStoryProps } from "../storyPrimitives";
import { AnalyticsStatusBar } from "./AnalyticsStatusBar";
import { RealtimeCountries } from "./RealtimeCountries";
import {
  analyticsBlue,
  analyticsChartTheme
} from "./constants";
import {
  analyticsTrend,
  createRealtimeCountryRows
} from "./data";
import {
  formatCompactUsers,
  formatRealtimeAgeLabel,
  formatWholeNumber
} from "./formatters";
import { realtimeAnimationMs, useRealtimeFeed } from "./realtimeFeed";
import { styles } from "./styles";

const trendChartTestId = "landing-website-analytics-active-users";
const realtimeChartTestId = "landing-website-analytics-realtime-bars";

export const WebsiteAnalyticsScreen = ({
  isTakeoverMode = false,
  isVisualMode = false,
  width
}: NativeStoryProps) => {
  const [selectedTrendIndex, setSelectedTrendIndex] = useState<
    number | undefined
  >();
  const {
    rows: realtimeRows,
    tick: realtimeTick
  } = useRealtimeFeed(isVisualMode);
  const realtimeCountryRows = useMemo(
    () => createRealtimeCountryRows(realtimeTick),
    [realtimeTick]
  );
  const screenWidth = isTakeoverMode
    ? Math.max(280, width)
    : Math.max(280, Math.min(width, 430));
  const contentWidth = isTakeoverMode
    ? Math.max(280, Math.min(screenWidth - 32, 520))
    : Math.max(280, screenWidth - 24);
  const chartWidth = Math.max(252, contentWidth - 36);
  const isCompact = contentWidth < 360;
  const realtimeTotal = realtimeRows.reduce(
    (total, row) => total + row.users,
    0
  );

  useEffect(() => {
    if (typeof document === "undefined") {
      return undefined;
    }

    const handleDocumentInteraction = (event: Event) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      if (!event.target.closest(`[data-testid="${trendChartTestId}"]`)) {
        setSelectedTrendIndex(undefined);
      }
    };

    document.addEventListener("pointerdown", handleDocumentInteraction, true);
    document.addEventListener("mousedown", handleDocumentInteraction, true);
    document.addEventListener("touchstart", handleDocumentInteraction, true);

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleDocumentInteraction,
        true
      );
      document.removeEventListener("mousedown", handleDocumentInteraction, true);
      document.removeEventListener("touchstart", handleDocumentInteraction, true);
    };
  }, []);

  const handleSelectTrendPoint = (index: number) => {
    setSelectedTrendIndex(index);
  };
  const handleInteractWithRealtimeChart = () => {
    setSelectedTrendIndex(undefined);
  };
  const formatRealtimeXLabel = useCallback(
    (value: string | number) => {
      const pointIndex =
        typeof value === "number" ? value : Number.parseInt(value, 10);
      const minutesAgo = Number.isFinite(pointIndex)
        ? Math.max(0, realtimeTick + 29 - pointIndex)
        : 0;

      return formatRealtimeAgeLabel(minutesAgo);
    },
    [realtimeTick]
  );

  const content = (
    <View style={[styles.content, { width: contentWidth }]}>
      {isTakeoverMode ? null : <AnalyticsStatusBar />}

      <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <View>
            <Text style={styles.panelTitle}>Active users</Text>
            <Text style={styles.panelMeta}>Current week vs last week</Text>
          </View>
        </View>
        <View style={styles.chartSlot}>
          <LineChart
            accessibilityLabel="Active users for the current week compared with the previous week"
            crosshair={{ strokeDasharray: [4, 4] }}
            data={analyticsTrend}
            edgeLabelPolicy="shift"
            formatYLabel={formatCompactUsers}
            height={226}
            interaction={{
              mode: "tap",
              deselectOnOutsidePress: true,
              onDeselect: () => setSelectedTrendIndex(undefined),
              onSelect: ({ index }) => handleSelectTrendPoint(index)
            }}
            labelStrategy={isCompact ? "skip" : "show"}
            legend={{
              align: "start",
              fontSize: 11,
              itemGap: 14,
              marker: "line",
              position: "bottom"
            }}
            series={[
              {
                yKey: "currentWeek",
                label: "Current week",
                color: analyticsBlue,
                curve: "monotone",
                strokeWidth: 3.25
              },
              {
                yKey: "previousWeek",
                label: "Last week",
                color: "#7baaf7",
                curve: "monotone",
                strokeDasharray: [6, 5],
                strokeLinecap: "butt",
                strokeWidth: 2.5
              }
            ]}
            showDots={false}
            showHorizontalGridLines
            // -1 keeps the chart controlled after dismissal; undefined would
            // hand selection back to the chart's internal tap state.
            selectedIndex={selectedTrendIndex ?? -1}
            testID={trendChartTestId}
            theme={analyticsChartTheme}
            tooltip={{ width: 140 }}
            width={chartWidth}
            xKey="day"
            yDomain={[6000, 14500]}
          />
        </View>
      </View>

      <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <View>
            <Text style={styles.panelTitle}>
              Active users in the last 30 min
            </Text>
            <Text style={styles.panelMeta}>Per-minute realtime feed</Text>
          </View>
          <Text style={styles.panelMeta}>{formatWholeNumber(realtimeTotal)}</Text>
        </View>
        <View style={styles.chartSlot}>
          <Realtime.BarChart
            accessibilityLabel="Active users per minute over the last thirty minutes"
            animation={
              isVisualMode
                ? false
                : { duration: realtimeAnimationMs, mode: "slide" }
            }
            barRadius={3}
            barWidthRatio={0.82}
            data={realtimeRows}
            formatXLabel={formatRealtimeXLabel}
            formatYLabel={formatWholeNumber}
            height={132}
            interaction={{
              mode: "tap",
              deselectOnOutsidePress: true,
              onSelect: handleInteractWithRealtimeChart
            }}
            labelStrategy="hide"
            liveKey="pointIndex"
            series={[{ yKey: "users", label: "Users", color: analyticsBlue }]}
            showHorizontalGridLines
            showXAxisLabels={false}
            showYAxisLabels={false}
            testID={realtimeChartTestId}
            theme={analyticsChartTheme}
            tooltip={{
              anchor: "bar",
              borderRadius: 8,
              labelFontSize: 10,
              placement: "top",
              positionAnimationDuration: 160,
              width: 104
            }}
            width={chartWidth}
            windowSize={30}
            xKey="pointIndex"
            yDomain={[0, 100]}
            yKey="users"
          />
        </View>
        <RealtimeCountries
          isVisualMode={isVisualMode}
          rows={realtimeCountryRows}
        />
      </View>
    </View>
  );

  return (
    <View
      style={[
        styles.screen,
        isTakeoverMode && styles.takeOverScreen,
        { width: screenWidth }
      ]}
    >
      {isTakeoverMode ? (
        <ScrollView
          bounces
          contentContainerStyle={styles.takeOverScrollContent}
          showsVerticalScrollIndicator={false}
          style={styles.takeOverScroll}
        >
          {content}
        </ScrollView>
      ) : (
        <View>{content}</View>
      )}
    </View>
  );
};
