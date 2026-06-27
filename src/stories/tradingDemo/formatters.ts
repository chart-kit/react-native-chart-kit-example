export const formatTradingPrice = (value: number) =>
  "$" + Math.round(value).toLocaleString("en-US");

export const formatTradingHeaderPrice = (value: number) =>
  Math.round(value).toLocaleString("en-US");

export const formatTradingVolume = (value: number) => Math.round(value) + "K";

export const formatTradingHeaderVolume = (value: number) =>
  value >= 1000 ? (value / 1000).toFixed(2) + "M" : Math.round(value) + "K";

export const formatTradingMarketCap = (price: number) =>
  "$" + ((price * 19_700_000) / 1_000_000_000_000).toFixed(2) + "T";

export const formatMove = (value: number, percent: number) =>
  (value >= 0 ? "+" : "-") +
  "$" +
  Math.abs(value).toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }) +
  " " +
  (value >= 0 ? "+" : "-") +
  (Math.abs(percent) * 100).toFixed(2) +
  "%";

export const formatInspectPrice = (value: number) =>
  value >= 1000
    ? (value / 1000).toFixed(1) + "K"
    : value.toLocaleString("en-US", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      });

export const formatInspectPercent = (value: number) =>
  (value >= 0 ? "+" : "") + (value * 100).toFixed(2) + "%";
