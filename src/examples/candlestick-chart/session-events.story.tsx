import {
  CandlestickChart,
  getCandlestickEmergencyClosureSessions,
} from "@chart-kit/pro/react-native";
import type { StockCandleInterval } from "../../fixtures/v2Finance";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../showcase/shared/storyPrimitives";

const formatPrice = (value: number) => `$${Math.round(value)}`;
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
const addUtcDays = (date: Date, days: number) =>
  new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
const isTradingWeekday = (date: Date) => {
  const day = date.getUTCDay();

  return day !== 0 && day !== 6;
};
const createSessionEventCandles = () => {
  const candles = [];
  let date = new Date(Date.UTC(2026, 10, 9));
  const end = new Date(Date.UTC(2026, 11, 11));
  let price = 214;

  while (date.getTime() <= end.getTime()) {
    const day = date.toISOString().slice(0, 10);

    if (isTradingWeekday(date) && day !== "2026-11-26") {
      const index = candles.length;
      const open = price + Math.sin(index / 3) * 1.4;
      const move = Math.sin(index / 2.4) * 2.7 + Math.cos(index / 5.5) * 1.8;
      const close = open + move;
      const wick = 2.1 + Math.abs(move) * 0.34;
      const high = Math.max(open, close) + wick;
      const low = Math.min(open, close) - wick * 0.88;

      candles.push({
        close: Math.round(close * 100) / 100,
        day,
        high: Math.round(high * 100) / 100,
        low: Math.round(low * 100) / 100,
        open: Math.round(open * 100) / 100,
        volume: Math.round(72 + Math.abs(move) * 12 + Math.sin(index / 4) * 8),
      });
      price = close + Math.sin(index / 6) * 0.7;
    }

    date = addUtcDays(date, 1);
  }

  return candles;
};
const sessionEventCandles = createSessionEventCandles();
const sessionEventMarkers = [
  ...getCandlestickEmergencyClosureSessions([
    { date: "2026-11-26", reason: "Thanksgiving", width: 8 },
    { date: "2026-12-04", reason: "Halt", width: 6 },
  ]),
  {
    date: "2026-11-27",
    kind: "earlyClose" as const,
    label: false,
    width: 5,
  },
];
const V2CandlestickSessionEvents = ({ width }: NativeStoryProps) => (
  <ChartSection title="Market sessions" kicker="Candlestick">
    <CandlestickChart
      candleWidthRatio={0.42}
      closeKey="close"
      data={sessionEventCandles}
      downColor="#ef4444"
      formatXLabel={(value) => formatTradingDay(value)}
      formatYLabel={formatPrice}
      height={278}
      highKey="high"
      interaction="tap"
      lowKey="low"
      openKey="open"
      sessionGaps={{
        exchange: "nyse",
        label: false,
        specialSessions: sessionEventMarkers,
      }}
      testID="session-events-candlestick-chart"
      tooltip={{ width: 154 }}
      upColor="#16a34a"
      volumeKey="volume"
      width={width}
      xKey="day"
      yDomain={{ min: "dataMin", max: "dataMax", nice: true }}
    />
  </ChartSection>
);

// Teaching note: Annotates exchange sessions without mutating the candle data.
export const sessionEventsStory: ShowcaseStory = {
  id: "v2-candlestick-session-events",
  title: "Market Sessions",
  Component: V2CandlestickSessionEvents,
};
