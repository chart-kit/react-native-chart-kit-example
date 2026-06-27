import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { CandlestickChart } from "@chart-kit/pro/react-native";
import type { CandlestickChartViewportConfig } from "@chart-kit/pro/react-native";

import type { NativeStoryProps } from "../storyPrimitives";
import {
  chartTheme,
  downColor,
  getShouldRandomizeVisualPriceAction,
  livePriceUpdateMs,
  marketBackground,
  marketText,
  upColor,
  visualPriceActionSeed
} from "./constants";
import { MarketHeader } from "./MarketHeader";
import { MarketStatusBar } from "./MarketStatusBar";
import { TimeframeInspectionRow } from "./TimeframeInspectionRow";
import { TradeDesk } from "./TradeDesk";
import { formatTradingPrice } from "./formatters";
import {
  createTradingCandles,
  createTradingMarketSessionCandles,
  getInitialTradingViewport,
  getTradingMaxVisiblePoints,
  getTradingMinVisiblePoints
} from "./marketData";
import { styles } from "./styles";
import {
  createMockTradeOrder,
  demoOrderFillDelayMs,
  fillMockTradeOrder,
  fillMockTradeOrders,
  formatTradingInputPrice,
  getPendingTradePriceLines,
  isMockOrderInsideTradingRange,
  stepTradingInputPrice
} from "./tradingOrders";
import type {
  MyTradeRow,
  OrderType,
  TimeframeOption,
  TradeSide
} from "./types";

const dateBasedTimeframes = new Set<TimeframeOption>(["1d", "1w", "1m", "1q"]);

export const TradingAppScreen = ({
  isTakeoverMode = false,
  isVisualMode = false,
  width
}: NativeStoryProps) => {
  const useFixedPriceActionSeed =
    isVisualMode && !getShouldRandomizeVisualPriceAction();
  const [priceActionSeed] = useState(() =>
    useFixedPriceActionSeed
      ? visualPriceActionSeed
      : visualPriceActionSeed + Math.floor(Math.random() * 1_000_000)
  );
  const [priceActionTick, setPriceActionTick] = useState(0);
  const [activeTimeframe, setActiveTimeframe] = useState<TimeframeOption>("1h");
  const initialTradingCandles = useMemo(
    () => createTradingCandles("1h", priceActionSeed, 0),
    [priceActionSeed]
  );
  const initialMarketSessionCandles = useMemo(
    () => createTradingMarketSessionCandles(priceActionSeed, 0),
    [priceActionSeed]
  );
  const [selectedInspectionIndex, setSelectedInspectionIndex] = useState<
    number | undefined
  >();
  const [isChartGestureActive, setIsChartGestureActive] = useState(false);
  const [chartViewport, setChartViewport] =
    useState<CandlestickChartViewportConfig>(() =>
      getInitialTradingViewport(initialTradingCandles.length, "1h")
    );
  const [limitStopPrice, setLimitStopPrice] = useState(() =>
    formatTradingInputPrice(
      initialMarketSessionCandles[initialMarketSessionCandles.length - 1]!.close
    )
  );
  const [orderType, setOrderType] = useState<OrderType>("Limit");
  const [quantityValue, setQuantityValue] = useState("1");
  const [tradeSide, setTradeSide] = useState<TradeSide>("buy");
  const [tradeRows, setTradeRows] = useState<MyTradeRow[]>([]);
  const demoFillTimeoutsRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const nextTradeId = useRef(1);

  // Avoid live-price churn while the user is inspecting or panning the chart.
  useEffect(() => {
    if (isVisualMode || !isTakeoverMode || isChartGestureActive) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setPriceActionTick((tick) => tick + 1);
    }, livePriceUpdateMs);

    return () => clearInterval(intervalId);
  }, [isChartGestureActive, isTakeoverMode, isVisualMode]);

  const screenWidth = isTakeoverMode
    ? Math.max(280, width)
    : Math.max(280, Math.min(width, 430));
  const chartWidth = Math.max(252, screenWidth - 28);
  const chartHeight = isTakeoverMode
    ? screenWidth < 340
      ? 264
      : 304
    : screenWidth < 340
      ? 238
      : 272;
  const tradingCandles = useMemo(
    () =>
      createTradingCandles(activeTimeframe, priceActionSeed, priceActionTick),
    [activeTimeframe, priceActionSeed, priceActionTick]
  );
  const marketSessionCandles = useMemo(
    () => createTradingMarketSessionCandles(priceActionSeed, priceActionTick),
    [priceActionSeed, priceActionTick]
  );
  const latestMarketCandle =
    marketSessionCandles[marketSessionCandles.length - 1]!;
  const previousMarketPriceRef = useRef(latestMarketCandle.close);
  const latestTradeTime = latestMarketCandle.time;
  const marketSessionOpen = marketSessionCandles[0]!.open;
  const priceMove = latestMarketCandle.close - marketSessionOpen;
  const priceMovePercent = priceMove / marketSessionOpen;
  const sessionHigh = Math.max(
    ...marketSessionCandles.map((candle) => candle.high)
  );
  const sessionLow = Math.min(
    ...marketSessionCandles.map((candle) => candle.low)
  );
  const sessionVolume = marketSessionCandles.reduce(
    (total, candle) => total + candle.volume,
    0
  );
  const marketMoveColor = priceMove >= 0 ? upColor : downColor;

  useEffect(() => {
    const previousPrice = previousMarketPriceRef.current;

    setTradeRows((rows) =>
      fillMockTradeOrders({
        currentPrice: latestMarketCandle.close,
        previousPrice,
        rows,
        time: latestTradeTime
      })
    );
    previousMarketPriceRef.current = latestMarketCandle.close;
  }, [latestMarketCandle.close, latestTradeTime]);

  useEffect(
    () => () => {
      demoFillTimeoutsRef.current.forEach((timeoutId) =>
        clearTimeout(timeoutId)
      );
      demoFillTimeoutsRef.current = [];
    },
    []
  );

  const selectedInspectionCandle =
    selectedInspectionIndex === undefined
      ? undefined
      : tradingCandles[
          Math.max(
            0,
            Math.min(
              selectedInspectionIndex,
              Math.max(0, tradingCandles.length - 1)
            )
          )
        ];
  const selectedInspectionMove = selectedInspectionCandle
    ? selectedInspectionCandle.close - selectedInspectionCandle.open
    : 0;
  const selectedInspectionPercent = selectedInspectionCandle
    ? selectedInspectionMove / selectedInspectionCandle.open
    : 0;
  const selectedInspectionColor =
    selectedInspectionMove >= 0 ? upColor : downColor;
  const pendingTradePriceLines = useMemo(
    () =>
      getPendingTradePriceLines(tradeRows, {
        buyColor: upColor,
        labelTextColor: marketBackground,
        sellColor: downColor
      }),
    [tradeRows]
  );
  const formatTradingXLabel = (_value: unknown, index: number) => {
    const candle = tradingCandles[index];

    if (!candle) {
      return "";
    }

    return dateBasedTimeframes.has(activeTimeframe) ? candle.date : candle.time;
  };

  const handleSelectTimeframe = (timeframe: TimeframeOption) => {
    const nextCandles = createTradingCandles(
      timeframe,
      priceActionSeed,
      priceActionTick
    );

    setActiveTimeframe(timeframe);
    setSelectedInspectionIndex(undefined);
    setChartViewport(getInitialTradingViewport(nextCandles.length, timeframe));
  };
  const handleChartGestureEnd = () => {
    setIsChartGestureActive(false);
  };
  const handleChartGestureStart = () => setIsChartGestureActive(true);
  const handleAdjustLimitStopPrice = (step: number) => {
    setLimitStopPrice((value) =>
      stepTradingInputPrice({
        fallback: latestMarketCandle.close,
        step,
        value
      })
    );
  };
  const handlePlaceTrade = () => {
    const order = createMockTradeOrder({
      id: "trade-" + nextTradeId.current,
      latestPrice: latestMarketCandle.close,
      limitStopPrice,
      orderType,
      quantityValue,
      side: tradeSide,
      time: latestTradeTime
    });

    if (!order) {
      return;
    }

    nextTradeId.current += 1;
    setTradeRows((rows) => [order, ...rows]);

    if (
      isMockOrderInsideTradingRange(order, {
        high: latestMarketCandle.high,
        low: latestMarketCandle.low
      })
    ) {
      const timeoutId = setTimeout(() => {
        setTradeRows((rows) =>
          fillMockTradeOrder({
            id: order.id,
            rows,
            time: latestTradeTime
          })
        );
      }, demoOrderFillDelayMs);

      demoFillTimeoutsRef.current.push(timeoutId);
    }
  };

  const content = (
    <>
      {isTakeoverMode ? null : <MarketStatusBar />}
      <MarketHeader
        latestCandle={latestMarketCandle}
        marketMoveColor={marketMoveColor}
        priceMove={priceMove}
        priceMovePercent={priceMovePercent}
        sessionHigh={sessionHigh}
        sessionLow={sessionLow}
        sessionVolume={sessionVolume}
      />

      <TimeframeInspectionRow
        activeTimeframe={activeTimeframe}
        onSelectTimeframe={handleSelectTimeframe}
        selectedCandle={selectedInspectionCandle}
        selectedInspectionColor={selectedInspectionColor}
        selectedInspectionPercent={selectedInspectionPercent}
      />

      <View style={styles.chartBand}>
        <CandlestickChart
          accessibilityLabel="BTC USDT candlestick chart"
          candleWidthRatio={0.5}
          closeKey="close"
          data={tradingCandles}
          downColor={downColor}
          formatXLabel={formatTradingXLabel}
          formatYLabel={formatTradingPrice}
          gridLineOpacity={0.38}
          height={chartHeight}
          highKey="high"
          interaction={{
            activation: "longPress",
            deselectOnOutsidePress: true,
            longPressDelayMs: 160,
            longPressMoveTolerance: 18,
            mode: "crosshair",
            onDeselect: () => setSelectedInspectionIndex(undefined),
            onGestureEnd: handleChartGestureEnd,
            onGestureStart: handleChartGestureStart,
            onSelect: (event) => setSelectedInspectionIndex(event.dataIndex)
          }}
          key={activeTimeframe}
          lowKey="low"
          openKey="open"
          priceLines={pendingTradePriceLines}
          rangeSelector={{
            backgroundFill: marketBackground,
            gap: 8,
            handleColor: marketText,
            handleHeight: 22,
            height: isTakeoverMode ? 44 : 34,
            interactive: isTakeoverMode,
            maxOverviewPoints: 80,
            minVisiblePoints: getTradingMinVisiblePoints(activeTimeframe),
            onGestureEnd: handleChartGestureEnd,
            onGestureStart: handleChartGestureStart,
            outsideFill: "#0b1122",
            outsideOpacity: 0.58,
            plotFill: marketBackground,
            plotRadius: 0,
            volumeOpacity: 0.28,
            windowFill: upColor,
            windowOpacity: 0.1,
            windowRadius: 0,
            windowStroke: upColor,
            windowStrokeOpacity: 0.8,
            windowStrokeWidth: 1
          }}
          selectedIndex={selectedInspectionIndex}
          selectionPriceLabel
          showHorizontalGridLines
          showVerticalGridLines
          showYAxisLabels
          testID="landing-trading-candlestick"
          theme={chartTheme}
          tooltip={false}
          upColor={upColor}
          volumeHeightRatio={0.17}
          volumeKey="volume"
          volumeOpacity={0.32}
          width={chartWidth}
          xKey="slot"
          yTickCount={4}
          {...(isTakeoverMode
            ? {
                onViewportChange: (event) => setChartViewport(event.viewport),
                viewport: chartViewport,
                viewportInteraction: {
                  lockParentScroll: true,
                  maxVisiblePoints: getTradingMaxVisiblePoints(activeTimeframe),
                  minVisiblePoints: getTradingMinVisiblePoints(activeTimeframe),
                  onGestureEnd: handleChartGestureEnd,
                  onGestureStart: handleChartGestureStart,
                  pan: true,
                  pinchZoom: true
                }
              }
            : {})}
        />
      </View>

      <TradeDesk
        activeTimeframe={activeTimeframe}
        limitStopPrice={limitStopPrice}
        onChangeLimitStopPrice={setLimitStopPrice}
        onChangeOrderType={setOrderType}
        onChangeQuantity={setQuantityValue}
        onChangeTradeSide={setTradeSide}
        onAdjustLimitStopPrice={handleAdjustLimitStopPrice}
        onPlaceTrade={handlePlaceTrade}
        orderType={orderType}
        quantityValue={quantityValue}
        rows={tradeRows}
        tradeSide={tradeSide}
      />
    </>
  );

  return (
    <View
      style={[
        styles.screen,
        isTakeoverMode && styles.takeoverScreen,
        { width: screenWidth }
      ]}
    >
      {isTakeoverMode ? (
        <ScrollView
          bounces
          contentContainerStyle={styles.takeoverScrollContent}
          scrollEnabled={!isChartGestureActive}
          showsVerticalScrollIndicator={false}
          style={styles.takeoverScroll}
        >
          {content}
        </ScrollView>
      ) : (
        <View>{content}</View>
      )}
    </View>
  );
};
