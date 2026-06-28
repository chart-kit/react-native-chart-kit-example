import { useCallback, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useChartKitTheme } from "react-native-chart-kit/v2";
import {
  CandlestickChart,
  getCandlestickChartDataTable,
} from "@chart-kit/pro/react-native";
import type { CandlestickChartViewportConfig } from "@chart-kit/pro/react-native";
import {
  getStockCandlePriceDomain,
  getStockCandlesForInterval,
  stockCandles,
  type StockCandleInterval,
} from "../../fixtures/v2Finance";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../showcase/shared/storyPrimitives";
import { ChartDataDetails } from "../../showcase/shared/dataDetails";

const formatPrice = (value: number) => `$${Math.round(value)}`;
const intervalLabels: Array<{ label: string; value: StockCandleInterval }> = [
  { label: "1 Day", value: "1D" },
  { label: "1 Week", value: "1W" },
  { label: "1 Month", value: "1M" },
];
const intervalVisiblePoints: Record<StockCandleInterval, number> = {
  "1D": 72,
  "1M": 12,
  "1W": 28,
};
const intervalMinimumVisiblePoints: Record<StockCandleInterval, number> = {
  "1D": 18,
  "1M": 4,
  "1W": 8,
};
const intervalCandleWidthRatio: Record<StockCandleInterval, number> = {
  "1D": 0.36,
  "1M": 0.58,
  "1W": 0.46,
};
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const formatTradingDay = (
  value: unknown,
  interval: StockCandleInterval = "1D",
) => {
  if (typeof value !== "string") {
    return `${value}`;
  }

  const date = new Date(`${value}T00:00:00Z`);

  if (!Number.isFinite(date.getTime())) {
    return value;
  }

  const month = monthNames[date.getUTCMonth()];

  if (interval === "1M") {
    return `${month} '${`${date.getUTCFullYear()}`.slice(2)}`;
  }

  return `${month} ${date.getUTCDate()}`;
};
const getInitialCandlestickViewport = (
  pointCount: number,
  interval: StockCandleInterval,
): CandlestickChartViewportConfig => {
  const visiblePoints = Math.min(pointCount, intervalVisiblePoints[interval]);

  return {
    endIndex: Math.max(0, pointCount - 1),
    startIndex: Math.max(0, pointCount - visiblePoints),
  };
};
const CandleIntervalControl = ({
  onChange,
  value,
}: {
  onChange: (value: StockCandleInterval) => void;
  value: StockCandleInterval;
}) => {
  const { mode } = useChartKitTheme();
  const isDark = mode === "dark";

  return (
    <View style={styles.intervalControls}>
      {intervalLabels.map((option) => {
        const isSelected = option.value === value;

        return (
          <Pressable
            key={option.value}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            onPress={() => onChange(option.value)}
            style={[
              styles.intervalButton,
              isDark && styles.darkIntervalButton,
              isSelected && styles.activeIntervalButton,
              isDark && isSelected && styles.darkActiveIntervalButton,
            ]}
          >
            <Text
              style={[
                styles.intervalButtonText,
                isDark && styles.darkIntervalButtonText,
                isSelected && styles.activeIntervalButtonText,
                isDark && isSelected && styles.darkActiveIntervalButtonText,
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};
const priceActionTable = getCandlestickChartDataTable({
  closeKey: "close",
  data: stockCandles,
  formatXLabel: (value) => formatTradingDay(value),
  formatYLabel: formatPrice,
  highKey: "high",
  lowKey: "low",
  openKey: "open",
  xKey: "day",
});
const priceActionDetails = {
  columns: [
    { key: "day", label: "Day" },
    { key: "open", label: "Open" },
    { key: "high", label: "High" },
    { key: "low", label: "Low" },
    { key: "close", label: "Close" },
  ],
  rows: priceActionTable.rows.slice(-8).map((row) => ({
    key: `${row.index}`,
    values: [
      row.xLabel,
      row.formattedOpen,
      row.formattedHigh,
      row.formattedLow,
      row.formattedClose,
    ],
  })),
};
const V2CandlestickPriceAction = ({
  onScrubEnd,
  onScrubStart,
  width,
}: NativeStoryProps) => {
  const [candleInterval, setCandleInterval] =
    useState<StockCandleInterval>("1D");
  const candleData = useMemo(
    () => getStockCandlesForInterval(stockCandles, candleInterval),
    [candleInterval],
  );
  const candleYDomain = useMemo(
    () => getStockCandlePriceDomain(candleData),
    [candleData],
  );
  const [viewport, setViewport] = useState<CandlestickChartViewportConfig>(() =>
    getInitialCandlestickViewport(stockCandles.length, "1D"),
  );
  const handleViewportChange = useCallback(
    (event: { viewport: CandlestickChartViewportConfig }) => {
      setViewport(event.viewport);
    },
    [],
  );
  const handleCandleIntervalChange = useCallback(
    (nextInterval: StockCandleInterval) => {
      const nextData = getStockCandlesForInterval(stockCandles, nextInterval);

      setCandleInterval(nextInterval);
      setViewport(getInitialCandlestickViewport(nextData.length, nextInterval));
    },
    [],
  );

  return (
    <ChartSection title="One-year candles" kicker="Candlestick">
      <CandleIntervalControl
        value={candleInterval}
        onChange={handleCandleIntervalChange}
      />
      <CandlestickChart
        key={candleInterval}
        candleWidthRatio={intervalCandleWidthRatio[candleInterval]}
        closeKey="close"
        data={candleData}
        downColor="#ef4444"
        formatXLabel={(value) => formatTradingDay(value, candleInterval)}
        formatYLabel={formatPrice}
        height={336}
        highKey="high"
        interaction="tap"
        lowKey="low"
        openKey="open"
        defaultSelectedIndex={Math.max(0, candleData.length - 2)}
        onViewportChange={handleViewportChange}
        rangeSelector={{
          gap: 9,
          height: 72,
          interactive: true,
          minVisiblePoints: intervalMinimumVisiblePoints[candleInterval],
          onGestureEnd: onScrubEnd,
          onGestureStart: onScrubStart,
        }}
        sessionGaps={false}
        testID="stock-candlestick-chart"
        tooltip={{ width: 154 }}
        upColor="#16a34a"
        viewport={viewport}
        viewportInteraction={{
          pan: true,
          pinchZoom: true,
          minVisiblePoints: intervalMinimumVisiblePoints[candleInterval],
          onGestureEnd: onScrubEnd,
          onGestureStart: onScrubStart,
        }}
        volumeKey="volume"
        width={width}
        xKey="day"
        yDomain={candleYDomain}
      />
    </ChartSection>
  );
};
const V2CandlestickPriceActionDetails = () => (
  <ChartDataDetails title="Price action" {...priceActionDetails} />
);
const styles = StyleSheet.create({
  activeIntervalButton: {
    backgroundColor: "#0f172a",
    borderColor: "#0f172a",
  },
  activeIntervalButtonText: {
    color: "#ffffff",
  },
  darkActiveIntervalButton: {
    backgroundColor: "#f8fafc",
    borderColor: "#f8fafc",
  },
  darkActiveIntervalButtonText: {
    color: "#0f172a",
  },
  darkIntervalButton: {
    backgroundColor: "#111827",
    borderColor: "#334155",
  },
  darkIntervalButtonText: {
    color: "#cbd5e1",
  },
  intervalButton: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#dbe3ef",
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 32,
    paddingHorizontal: 12,
  },
  intervalButtonText: {
    color: "#334155",
    fontSize: 12,
    fontWeight: "800",
  },
  intervalControls: {
    alignSelf: "stretch",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },
});

// Teaching note: Shows the base OHLCV candlestick contract with a price-aware domain.
export const priceActionStory: ShowcaseStory = {
  id: "v2-candlestick-price-action",
  title: "Candlestick",
  Component: V2CandlestickPriceAction,
  Details: V2CandlestickPriceActionDetails,
};
