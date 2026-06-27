import type { CartesianChartTheme } from "react-native-chart-kit/v2";

export const analyticsBlue = "#1a73e8";
export const analyticsInk = "#202124";
export const analyticsMuted = "#5f6368";
export const analyticsBorder = "#dfe6f1";
export const analyticsPage = "#f8fbff";
export const analyticsPanel = "#ffffff";
const analyticsPositive = "#188038";
const analyticsAccent = "#00acc1";

export const analyticsChartTheme: CartesianChartTheme = {
  axis: "#d8e2ef",
  background: "transparent",
  grid: "#e8eef7",
  mutedText: analyticsMuted,
  plotBackground: "transparent",
  series: [analyticsBlue, "#7baaf7", analyticsAccent, analyticsPositive],
  text: analyticsInk,
  tooltip: {
    background: analyticsPanel,
    border: analyticsBorder,
    borderRadius: 8,
    labelFontSize: 11,
    mutedText: analyticsMuted,
    shadowColor: "#174ea6",
    shadowOffsetY: 5,
    shadowOpacity: 0.11,
    text: analyticsInk
  },
  typography: {
    axisLabelSize: 10,
    legendLabelSize: 11
  }
};
