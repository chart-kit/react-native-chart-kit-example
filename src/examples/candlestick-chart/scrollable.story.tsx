import { CandlestickChart } from "@chart-kit/pro/react-native";
import {
  stockCandles,
  type StockCandleInterval,
} from "../../fixtures/v2Finance";
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
const V2CandlestickScrollable = ({ width }: NativeStoryProps) => (
  <ChartSection title="Scrollable candles" kicker="Candlestick">
    <CandlestickChart
      closeKey="close"
      data={stockCandles}
      downColor="#ef4444"
      candleWidthRatio={0.4}
      formatXLabel={(value) => formatTradingDay(value)}
      formatYLabel={formatPrice}
      height={278}
      highKey="high"
      initialIndex="end"
      interaction="tap"
      lowKey="low"
      openKey="open"
      scrollable
      sessionGaps={{ exchange: "nyse" }}
      testID="scrollable-candlestick-chart"
      tooltip={{ width: 154 }}
      upColor="#16a34a"
      visiblePoints={48}
      volumeKey="volume"
      width={width}
      xKey="day"
      yDomain={{ min: "dataMin", max: "dataMax", nice: true }}
    />
  </ChartSection>
);

// Teaching note: Constrains visible candles so long price history stays navigable.
export const scrollableStory: ShowcaseStory = {
  id: "v2-candlestick-scrollable",
  title: "Scrollable Candles",
  Component: V2CandlestickScrollable,
};
