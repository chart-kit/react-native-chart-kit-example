import * as React from "react";

export const ChartKitProvider = ({ children }: { children?: React.ReactNode }) =>
  <>{children}</>;

export const useChartKitTheme = () => ({ mode: "light" });

export const CandlestickChart = () => null;
export const CombinedChart = () => null;

export const Realtime = {
  BarChart: () => null
};

export const proCartesianChartPresetOptions = [
  { id: "pro-product-pulse", title: "Product Pulse" },
  { id: "pro-finance", title: "Finance" }
];

export const proCartesianChartPresets = {
  "pro-product-pulse": {
    light: {},
    dark: {}
  },
  "pro-finance": {
    light: {},
    dark: {}
  }
};

export const proCartesianChartPresetRegistry = proCartesianChartPresets;
