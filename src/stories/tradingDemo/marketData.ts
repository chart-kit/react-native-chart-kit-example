import type { CandlestickChartViewportConfig } from "@chart-kit/pro/react-native";

import {
  livePriceUpdateMs,
  priceActionVolatilityMultiplier,
  timeframeOptions,
  tradingHistoryEndDateUtc,
  visualPriceActionSeed
} from "./constants";
import type { TradingCandlePoint, TimeframeOption } from "./types";

const roundPrice = (value: number) => Math.round(value * 100) / 100;
const minutesPerDay = 24 * 60;
const minuteMs = 60 * 1000;
const canonicalIntervalMinutes = 5;
const canonicalIntervalMs = canonicalIntervalMinutes * minuteMs;
const marketSessionPointCount = 288;

const tradingInitialWindowPoints: Record<TimeframeOption, number> = {
  "5m": 12,
  "1h": 24,
  "1d": 30,
  "1w": 26,
  "1m": 6,
  "1q": 2
};

const tradingOverviewPoints: Record<TimeframeOption, number> = {
  "5m": 60,
  "1h": 120,
  "1d": 150,
  "1w": 104,
  "1m": 24,
  "1q": 8
};

// Keep the selected chart window focused while the minimap shows nearby context.
const timeframeHistory: Record<
  TimeframeOption,
  {
    initialVisiblePoints: number;
    intervalMinutes: number;
    minVisiblePoints: number;
    maxVisiblePoints: number;
    pointCount: number;
  }
> = {
  "5m": {
    initialVisiblePoints: tradingInitialWindowPoints["5m"],
    intervalMinutes: 5,
    minVisiblePoints: 8,
    maxVisiblePoints: tradingOverviewPoints["5m"],
    pointCount: tradingOverviewPoints["5m"]
  },
  "1h": {
    initialVisiblePoints: tradingInitialWindowPoints["1h"],
    intervalMinutes: 60,
    minVisiblePoints: 8,
    maxVisiblePoints: tradingOverviewPoints["1h"],
    pointCount: tradingOverviewPoints["1h"]
  },
  "1d": {
    initialVisiblePoints: tradingInitialWindowPoints["1d"],
    intervalMinutes: minutesPerDay,
    minVisiblePoints: 8,
    maxVisiblePoints: tradingOverviewPoints["1d"],
    pointCount: tradingOverviewPoints["1d"]
  },
  "1w": {
    initialVisiblePoints: tradingInitialWindowPoints["1w"],
    intervalMinutes: 7 * minutesPerDay,
    minVisiblePoints: 8,
    maxVisiblePoints: tradingOverviewPoints["1w"],
    pointCount: tradingOverviewPoints["1w"]
  },
  "1m": {
    initialVisiblePoints: tradingInitialWindowPoints["1m"],
    intervalMinutes: 30 * minutesPerDay,
    minVisiblePoints: 4,
    maxVisiblePoints: tradingOverviewPoints["1m"],
    pointCount: tradingOverviewPoints["1m"]
  },
  "1q": {
    initialVisiblePoints: tradingInitialWindowPoints["1q"],
    intervalMinutes: 91 * minutesPerDay,
    minVisiblePoints: 2,
    maxVisiblePoints: tradingOverviewPoints["1q"],
    pointCount: tradingOverviewPoints["1q"]
  }
};

const getSourceCandlesPerCandle = (timeframe: TimeframeOption) =>
  Math.max(
    1,
    Math.round(
      timeframeHistory[timeframe].intervalMinutes / canonicalIntervalMinutes
    )
  );

const maxCanonicalHistoryPoints = Math.max(
  marketSessionPointCount,
  ...timeframeOptions.map(
    (timeframe) =>
      timeframeHistory[timeframe].pointCount *
      getSourceCandlesPerCandle(timeframe)
  )
);

const baseCandleCache = new Map<string, TradingCandlePoint[]>();

const formatTwoDigit = (value: number) => String(value).padStart(2, "0");

const formatDateLabel = (timestamp: number) => {
  const date = new Date(timestamp);

  return (
    formatTwoDigit(date.getUTCMonth() + 1) +
    "/" +
    formatTwoDigit(date.getUTCDate())
  );
};

const formatYearLabel = (timestamp: number) =>
  String(new Date(timestamp).getUTCFullYear());

const formatTimeLabel = (timestamp: number) => {
  const date = new Date(timestamp);
  const hour = formatTwoDigit(date.getUTCHours());
  const minute = formatTwoDigit(date.getUTCMinutes());

  return hour + ":" + minute;
};

const formatTimeRangeLabel = (startTimestamp: number, endTimestamp: number) => {
  const start = new Date(startTimestamp);
  const end = new Date(endTimestamp);
  const startHour = formatTwoDigit(start.getUTCHours());
  const startMinute = formatTwoDigit(start.getUTCMinutes());
  const endHour = formatTwoDigit(end.getUTCHours());
  const endMinute = formatTwoDigit(end.getUTCMinutes());

  if (startHour === endHour) {
    return startHour + ":" + startMinute + "-" + endMinute;
  }

  return startHour + ":" + startMinute + "-" + endHour + ":" + endMinute;
};

const getCanonicalCandleTimestamp = ({
  index,
  totalPointCount
}: {
  index: number;
  totalPointCount: number;
}) =>
  tradingHistoryEndDateUtc -
  canonicalIntervalMs -
  (totalPointCount - 1 - index) * canonicalIntervalMs;

const createSeededRandom = (seed: number) => {
  let state = seed >>> 0;

  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;

    return state / 0x100000000;
  };
};

const getRandomImpulse = (random: () => number) =>
  random() + random() + random() + random() - 2;

const clampPrice = (value: number) => Math.max(52000, Math.min(84000, value));

const getCanonicalVolumeCycle = ({
  index,
  timestamp
}: {
  index: number;
  timestamp: number;
}) => {
  const date = new Date(timestamp);
  const minuteOfDay = date.getUTCHours() * 60 + date.getUTCMinutes();
  const dayPhase = (minuteOfDay / minutesPerDay) * Math.PI * 2;
  const weekPhase = (date.getUTCDay() / 7) * Math.PI * 2;
  const slowPhase = index / 950;
  const intraday = 0.88 + Math.sin(dayPhase - 0.7) * 0.24;
  const weekly = 0.92 + Math.cos(weekPhase + 0.4) * 0.16;
  const slowTrend = 0.94 + Math.sin(slowPhase) * 0.2;

  return Math.max(0.42, intraday * weekly * slowTrend);
};

const getCanonicalVolume = ({
  index,
  momentum,
  random,
  timestamp
}: {
  index: number;
  momentum: number;
  random: () => number;
  timestamp: number;
}) => {
  const activityCycle = getCanonicalVolumeCycle({ index, timestamp });
  const volatilityVolume = Math.abs(momentum) / 6;
  const noise = 0.58 + random() * 1.12;
  const burstVolume = random() > 0.986 ? 110 + random() * 260 : 0;

  return Math.round(
    Math.max(6, (34 + volatilityVolume) * activityCycle * noise + burstVolume)
  );
};

const applyLiveTicksToCandle = ({
  candle,
  random,
  tickCount,
  tickScale
}: {
  candle: TradingCandlePoint;
  random: () => number;
  tickCount: number;
  tickScale: number;
}): TradingCandlePoint => {
  let liveClose = candle.close;
  let liveHigh = candle.high;
  let liveLow = candle.low;
  let liveVolume = candle.volume;

  for (let tick = 0; tick < tickCount; tick += 1) {
    const meanReversion = (candle.open - liveClose) * 0.09;
    const tickMove = getRandomImpulse(random) * tickScale + meanReversion;

    liveClose = clampPrice(liveClose + tickMove);
    liveHigh = Math.max(liveHigh, liveClose + random() * tickScale * 1.3);
    liveLow = Math.min(liveLow, liveClose - random() * tickScale * 1.05);
    liveVolume += Math.round(1 + Math.abs(tickMove) / 42 + random() * 3);
  }

  return {
    ...candle,
    close: roundPrice(liveClose),
    high: roundPrice(liveHigh),
    low: roundPrice(liveLow),
    volume: liveVolume
  };
};

export const createTradingCandles = (
  timeframe: TimeframeOption = "1h",
  seed = visualPriceActionSeed,
  liveStep = 0
): TradingCandlePoint[] => {
  const history = timeframeHistory[timeframe];
  const pointCount = history.pointCount;
  const sourceCandlesPerPoint = getSourceCandlesPerCandle(timeframe);
  const sourcePointCount = pointCount * sourceCandlesPerPoint;
  const sourceCandles = createVisibleCanonicalCandles({
    liveStep,
    pointCount: sourcePointCount,
    seed
  });

  if (sourceCandlesPerPoint === 1) {
    return sourceCandles.map((candle, slot) => ({ ...candle, slot }));
  }

  return aggregateTradingCandles({
    sourceCandles,
    sourceCandlesPerPoint,
    timeframe
  });
};

export const createTradingMarketSessionCandles = (
  seed = visualPriceActionSeed,
  liveStep = 0
): TradingCandlePoint[] =>
  createVisibleCanonicalCandles({
    liveStep,
    pointCount: marketSessionPointCount,
    seed
  });

const createVisibleCanonicalCandles = ({
  liveStep,
  pointCount,
  seed
}: {
  liveStep: number;
  pointCount: number;
  seed: number;
}) => {
  const ticksPerCandle = Math.max(
    1,
    Math.round(canonicalIntervalMs / livePriceUpdateMs)
  );
  const closedCandleOffset = Math.floor(Math.max(0, liveStep) / ticksPerCandle);
  const liveTicksInCurrentCandle = Math.max(0, liveStep) % ticksPerCandle;
  const totalPointCount = maxCanonicalHistoryPoints + closedCandleOffset;
  const baseCandles = createBaseTradingCandles({
    seed,
    totalPointCount
  });
  const visibleCandles = baseCandles.slice(-pointCount);

  if (liveTicksInCurrentCandle <= 0 || visibleCandles.length === 0) {
    return visibleCandles;
  }

  const liveRandom = createSeededRandom(
    seed + closedCandleOffset * 7919 + 0x9e3779b9
  );

  visibleCandles[visibleCandles.length - 1] = applyLiveTicksToCandle({
    candle: visibleCandles[visibleCandles.length - 1]!,
    random: liveRandom,
    tickCount: liveTicksInCurrentCandle,
    tickScale: 34 * priceActionVolatilityMultiplier
  });

  return visibleCandles;
};

const aggregateTradingCandles = ({
  sourceCandles,
  sourceCandlesPerPoint,
  timeframe
}: {
  sourceCandles: TradingCandlePoint[];
  sourceCandlesPerPoint: number;
  timeframe: TimeframeOption;
}): TradingCandlePoint[] => {
  const candles: TradingCandlePoint[] = [];
  const pointCount = Math.floor(sourceCandles.length / sourceCandlesPerPoint);

  for (let pointIndex = 0; pointIndex < pointCount; pointIndex += 1) {
    const startIndex = pointIndex * sourceCandlesPerPoint;
    const group = sourceCandles.slice(
      startIndex,
      startIndex + sourceCandlesPerPoint
    );
    const first = group[0];
    const last = group[group.length - 1];

    if (!first || !last) {
      continue;
    }

    candles.push({
      close: last.close,
      date: formatDateLabel(first.timestamp),
      high: Math.max(...group.map((candle) => candle.high)),
      low: Math.min(...group.map((candle) => candle.low)),
      open: first.open,
      slot: candles.length,
      timestamp: first.timestamp,
      time: formatTimeLabel(first.timestamp),
      volume: group.reduce((total, candle) => total + candle.volume, 0),
      year: formatYearLabel(first.timestamp)
    });
  }

  return candles.slice(-timeframeHistory[timeframe].pointCount);
};

const createBaseTradingCandles = ({
  seed,
  totalPointCount
}: {
  seed: number;
  totalPointCount: number;
}) => {
  const cacheKey = "canonical:" + seed + ":" + totalPointCount;
  const cachedCandles = baseCandleCache.get(cacheKey);

  if (cachedCandles) {
    return cachedCandles;
  }

  // Seeded generation keeps the template deterministic for screenshots while
  // still letting the takeover demo advance with live ticks.
  const candles: TradingCandlePoint[] = [];
  const volatility = 0.16 * priceActionVolatilityMultiplier;
  const random = createSeededRandom(seed + 0x51f15e);
  const basePrice = 66600;
  const trendBias = (random() - 0.48) * 18 * volatility;
  let momentum = 0;
  let price = basePrice + (random() - 0.5) * 900;

  for (let index = 0; index < totalPointCount; index += 1) {
    const timestamp = getCanonicalCandleTimestamp({
      index,
      totalPointCount
    });
    const open = price + getRandomImpulse(random) * 22 * volatility;
    const newsImpulse =
      random() > 0.997 ? getRandomImpulse(random) * 520 * volatility : 0;
    const meanReversion = (basePrice - price) * 0.025;
    const move =
      getRandomImpulse(random) * 150 * volatility +
      trendBias +
      newsImpulse +
      meanReversion;
    momentum = momentum * 0.48 + move;
    const close = clampPrice(open + momentum);
    const wick =
      42 + Math.abs(momentum) * 0.12 + random() * 95 * volatility;
    const high = Math.max(open, close) + wick;
    const low = Math.min(open, close) - wick * 0.78;

    candles.push({
      close: roundPrice(close),
      date: formatDateLabel(timestamp),
      high: roundPrice(high),
      low: roundPrice(low),
      open: roundPrice(open),
      slot: index,
      timestamp,
      time: formatTimeLabel(timestamp),
      volume: getCanonicalVolume({
        index,
        momentum,
        random,
        timestamp
      }),
      year: formatYearLabel(timestamp)
    });
    price = close + getRandomImpulse(random) * 18 * volatility;
  }

  baseCandleCache.set(cacheKey, candles);

  return candles;
};

export const getInitialTradingViewport = (
  pointCount: number,
  timeframe: TimeframeOption
): CandlestickChartViewportConfig => {
  const visibleCount = Math.min(
    pointCount,
    timeframeHistory[timeframe].initialVisiblePoints
  );

  return {
    endIndex: Math.max(0, pointCount),
    startIndex: Math.max(0, pointCount - visibleCount)
  };
};

export const getTradingMaxVisiblePoints = (timeframe: TimeframeOption) =>
  timeframeHistory[timeframe].maxVisiblePoints;

export const getTradingMinVisiblePoints = (timeframe: TimeframeOption) =>
  timeframeHistory[timeframe].minVisiblePoints;

export const getTradingCandleTimeRange = (
  candle: TradingCandlePoint,
  timeframe: TimeframeOption
) =>
  formatTimeRangeLabel(
    candle.timestamp,
    candle.timestamp + timeframeHistory[timeframe].intervalMinutes * minuteMs
  );
