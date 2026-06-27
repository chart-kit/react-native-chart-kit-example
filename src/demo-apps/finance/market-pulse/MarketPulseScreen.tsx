import { useMemo, useState } from "react";
import { Text, View } from "react-native";

import { proCartesianChartPresets } from "@chart-kit/pro/react-native";
import {
  LineChart,
  PieChart,
  resolveCartesianChartThemeConfig,
  useChartKitTheme,
  type CartesianChartTheme,
  type LineChartViewportChangeEvent,
  type LineChartViewportConfig,
} from "react-native-chart-kit/v2";

import type { NativeStoryProps } from "../../../showcase/shared/storyPrimitives";
import { leadSources, marketIndexHistory } from "./data";
import { marketFontFamily, styles } from "./styles";

const marketPreset = "pro-market-terminal";
const cardPadding = 12;
const initialVisiblePoints = 72;
const initialViewport: LineChartViewportConfig = {
  startIndex: Math.max(0, marketIndexHistory.length - initialVisiblePoints),
  endIndex: marketIndexHistory.length - 1,
};

const formatDateLabel = (value: unknown) =>
  value instanceof Date
    ? value.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : String(value);

const formatIndexLabel = (value: number) => `${Math.round(value)}`;
const formatPercentage = (percentage: number) =>
  `${Math.round(percentage * 100)}%`;

const formatChange = (start: number, end: number) => {
  const change = ((end - start) / start) * 100;
  const sign = change >= 0 ? "+" : "";

  return `${sign}${change.toFixed(1)}%`;
};

const createMarketTheme = (
  theme: ReturnType<typeof resolveCartesianChartThemeConfig>,
): CartesianChartTheme => ({
  background: "transparent",
  plotBackground: "#0a1713",
  grid: "#17352d",
  axis: "#255345",
  text: theme.text,
  mutedText: theme.mutedText,
  series: ["#00d084", "#38bdf8", "#f7c948", "#a78bfa", "#ff4d5e"],
  typography: {
    ...(marketFontFamily ? { fontFamily: marketFontFamily } : {}),
    axisLabelSize: 10,
    legendLabelSize: 11,
  },
  tooltip: {
    background: "#10221b",
    border: "#2f6a55",
    text: "#f3fff8",
    mutedText: "#a9cfc0",
    shadowColor: "#000000",
    shadowOpacity: 0.3,
  },
});

export const MarketPulseScreen = ({
  isTakeoverMode = false,
  onScrubEnd,
  onScrubStart,
  width,
}: NativeStoryProps) => {
  const chartKitTheme = useChartKitTheme();
  const presetRegistry = useMemo(
    () => ({
      ...proCartesianChartPresets,
      ...chartKitTheme.presets,
    }),
    [chartKitTheme.presets],
  );
  const resolvedTheme = useMemo(
    () =>
      resolveCartesianChartThemeConfig({
        mode: "dark",
        preset: marketPreset,
        presets: presetRegistry,
      }),
    [presetRegistry],
  );
  const chartTheme = useMemo(
    () => createMarketTheme(resolvedTheme),
    [resolvedTheme],
  );
  const [viewport, setViewport] =
    useState<LineChartViewportConfig>(initialViewport);
  const screenWidth = isTakeoverMode
    ? Math.max(280, width)
    : Math.max(280, Math.min(width, 430));
  const contentWidth = isTakeoverMode
    ? Math.max(280, Math.min(screenWidth - 24, 720))
    : Math.max(280, screenWidth - 24);
  const chartWidth = Math.max(240, contentWidth - cardPadding * 2);
  const latestPoint = marketIndexHistory[marketIndexHistory.length - 1]!;
  const firstPoint = marketIndexHistory[0]!;
  const totalLeads = leadSources.reduce(
    (total, source) => total + source.leads,
    0,
  );
  const cardFill = "#0b1713";
  const cardBorder = "#1f3d34";
  const cardShadow = "#000000";
  const screenFill = "#06100d";

  const handleViewportChange = (event: LineChartViewportChangeEvent) => {
    setViewport(event.viewport);
  };

  return (
    <View
      style={[
        styles.screen,
        {
          backgroundColor: screenFill,
          width: screenWidth,
        },
      ]}
    >
      <View style={[styles.content, { width: contentWidth }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: resolvedTheme.text }]}>
            Index desk
          </Text>
        </View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: cardFill,
              borderColor: cardBorder,
              shadowColor: cardShadow,
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: resolvedTheme.text }]}>
              S&P 500 vs Dow
            </Text>
            <Text style={[styles.cardMeta, { color: resolvedTheme.series[0] }]}>
              S&P {formatChange(firstPoint.sp500, latestPoint.sp500)}
            </Text>
          </View>
          <LineChart
            activeDot={{
              fill: cardFill,
              radius: 5,
              strokeWidth: 2.4,
            }}
            axisLabelAnimation={{ duration: 180 }}
            crosshair={{ strokeDasharray: [4, 4] }}
            curve="monotone"
            data={marketIndexHistory}
            formatXLabel={formatDateLabel}
            formatYLabel={formatIndexLabel}
            height={306}
            interaction={{
              mode: "scrub",
              selectionPersistence: "persist",
              onGestureEnd: onScrubEnd,
              onGestureStart: onScrubStart,
            }}
            onViewportChange={handleViewportChange}
            preset={marketPreset}
            rangeSelector={{
              height: 54,
              gap: 8,
              interactive: true,
              backgroundFill: "#08140f",
              plotFill: "#0c1b15",
              plotRadius: 8,
              handleColor: resolvedTheme.series[0],
              handleHeight: 24,
              handleHitSlop: 26,
              handleRadius: 5,
              handleWidth: 6,
              lineMinStrokeWidth: 1.2,
              lineStrokeWidthScale: 0.48,
              outsideFill: "#10251f",
              outsideOpacity: 0.56,
              series: {
                sp500: { opacity: 0.95, strokeWidth: 1.8 },
                dow: {
                  color: resolvedTheme.series[2],
                  opacity: 0.78,
                  strokeDasharray: [4, 4],
                  strokeWidth: 1.5,
                },
              },
              windowFill: resolvedTheme.series[0],
              windowOpacity: 0.14,
              windowRadius: 8,
              windowStroke: resolvedTheme.series[0],
              windowStrokeOpacity: 0.72,
              windowStrokeWidth: 1.4,
              onGestureEnd: onScrubEnd,
              onGestureStart: onScrubStart,
            }}
            series={[
              { yKey: "sp500", label: "S&P 500", strokeWidth: 3 },
              {
                yKey: "dow",
                label: "Dow",
                strokeDasharray: [5, 4],
                strokeWidth: 2.4,
              },
            ]}
            showDots={false}
            showHorizontalGridLines
            testID="market-pulse-index-range"
            theme={chartTheme}
            tooltip={{ positionAnimationDuration: 240, width: 164 }}
            viewport={viewport}
            width={chartWidth}
            xKey="date"
            yAxisLabelWidth="stable"
            yDomain={{ min: "dataMin", max: "dataMax", nice: true }}
          />
        </View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: cardFill,
              borderColor: cardBorder,
              shadowColor: cardShadow,
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: resolvedTheme.text }]}>
              Lead sources
            </Text>
            <Text style={[styles.cardMeta, { color: resolvedTheme.mutedText }]}>
              {totalLeads} leads
            </Text>
          </View>
          <PieChart
            arcLabels={{
              connectorColor: resolvedTheme.axis,
              connectorOpacity: 0.92,
              connectorWidth: 1.6,
              fontSize: 10,
              minPercentage: 0.09,
              offset: 11,
              reservedWidth: 82,
              formatLabel: ({ label, percentageLabel }) =>
                `${String(label).split(" ")[0]} ${percentageLabel}`,
            }}
            colorKey="color"
            data={leadSources}
            formatPercentage={formatPercentage}
            formatValue={(value) => `${value}`}
            height={230}
            labelKey="source"
            legend={false}
            preset={marketPreset}
            sliceSeparator={{
              color: cardFill,
              opacity: 1,
              visible: true,
              width: 2,
            }}
            testID="market-pulse-lead-sources"
            theme={chartTheme}
            valueKey="leads"
            width={chartWidth}
          />
        </View>
      </View>
    </View>
  );
};
