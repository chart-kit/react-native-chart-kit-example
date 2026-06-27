import { Platform } from "react-native";
import type { CartesianChartTheme } from "react-native-chart-kit/v2";

import type { OrderType, TimeframeOption } from "./types";

export const marketBackground = "#0f1629";
export const marketDivider = "#172238";
export const marketMuted = "#8e99af";
export const marketText = "#f4f7ff";
export const upColor = "#70d0b0";
export const downColor = "#d84070";
const amberColor = "#f09838";
export const cyanColor = "#4088f8";

export const marketNumberFontFamily = Platform.select({
  android: "sans-serif-condensed",
  ios: "DIN Alternate",
  default: "Arial"
});

export const timeframeOptions: TimeframeOption[] = [
  "5m",
  "1h",
  "1d",
  "1w",
  "1m",
  "1q"
];
export const orderTypeOptions: OrderType[] = ["Limit", "Market", "Stop"];
export const quantityPresetOptions = ["1", "5", "10", "50", "100"];

export const livePriceUpdateMs = 1000;
export const priceActionVolatilityMultiplier = 2;
export const tradingHistoryEndDateUtc = Date.UTC(2026, 5, 12, 20, 0, 0);
export const visualPriceActionSeed = 521117;

export const getShouldRandomizeVisualPriceAction = () =>
  Platform.OS === "web" &&
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).get("randomPriceAction") === "1";

export const chartTheme: CartesianChartTheme = {
  axis: "#263451",
  background: marketBackground,
  grid: marketDivider,
  mutedText: marketMuted,
  plotBackground: marketBackground,
  series: [upColor, downColor, amberColor, cyanColor],
  text: marketText,
  tooltip: {
    background: "#111b32",
    border: "#2a3856",
    mutedText: marketMuted,
    text: marketText
  },
  typography: {
    axisLabelSize: 10,
    legendLabelSize: 11
  }
};
