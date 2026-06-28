import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  ChartSelectionProvider,
  LineChart,
  useChartKitTheme,
  useDismissChartSelection,
} from "react-native-chart-kit/v2";
import { multiSeriesRevenue, revenueWithGaps } from "../../../fixtures/v2Line";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";

const ScopeDismissButton = ({ onDismiss }: { onDismiss: () => void }) => {
  const dismissChartSelection = useDismissChartSelection();
  const { mode } = useChartKitTheme();
  const isDark = mode === "dark";

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => {
        dismissChartSelection();
        onDismiss();
      }}
      style={({ pressed }) => [
        scopeStyles.button,
        isDark && scopeStyles.darkButton,
        pressed && scopeStyles.buttonPressed,
      ]}
    >
      <Text style={[scopeStyles.buttonText, isDark && scopeStyles.darkText]}>
        Clear
      </Text>
    </Pressable>
  );
};
const V2SelectionScope = ({ width }: NativeStoryProps) => {
  const [summary, setSummary] = useState("Tap or scrub either chart");
  const { mode } = useChartKitTheme();
  const isDark = mode === "dark";

  return (
    <ChartSection title="Selection scope" kicker="Cross-chart dismissal">
      <ChartSelectionProvider
        dismissOnPressOutside
        style={[scopeStyles.scope, { width }]}
      >
        <View style={scopeStyles.scopeHeader}>
          <Text
            style={[scopeStyles.scopeSummary, isDark && scopeStyles.darkText]}
          >
            {summary}
          </Text>
          <ScopeDismissButton
            onDismiss={() => {
              setSummary("Selection cleared");
            }}
          />
        </View>
        <LineChart
          id="portfolio-scope"
          data={multiSeriesRevenue}
          xKey="month"
          width={width}
          height={210}
          showDots={false}
          curve="monotone"
          interaction={{
            mode: "scrub",
            onDeselect: () => {
              setSummary("Selection cleared");
            },
            onSelect: (event) => {
              setSummary(
                `Portfolio ${event.xLabel}: ${
                  event.series[0]?.formattedValue ?? "—"
                }`,
              );
            },
          }}
          crosshair={{ strokeDasharray: [4, 4] }}
          tooltip={{ width: 138 }}
          activeDot={{ radius: 5.5, fill: "background", strokeWidth: 2.5 }}
          series={[
            { yKey: "actual", label: "Actual", strokeWidth: 3 },
            { yKey: "forecast", label: "Forecast", strokeWidth: 2 },
          ]}
        />
        <LineChart
          id="gap-scope"
          data={revenueWithGaps}
          xKey="month"
          yKey="actual"
          width={width}
          height={196}
          yDomain={[0, "dataMax"]}
          interaction={{
            mode: "tap",
            onDeselect: () => {
              setSummary("Selection cleared");
            },
            onSelect: (event) => {
              setSummary(
                `Readings ${event.xLabel}: ${
                  event.series[0]?.formattedValue ?? "—"
                }`,
              );
            },
          }}
          crosshair={{ strokeDasharray: [4, 4] }}
          tooltip={{ width: 128 }}
        />
      </ChartSelectionProvider>
    </ChartSection>
  );
};
const scopeStyles = StyleSheet.create({
  scope: {
    gap: 14,
  },
  scopeHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  scopeSummary: {
    color: "#334155",
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderColor: "#dbe3ed",
    borderRadius: 8,
    borderWidth: 1,
    height: 34,
    justifyContent: "center",
    minWidth: 72,
    paddingHorizontal: 14,
  },
  darkButton: {
    backgroundColor: "#111827",
    borderColor: "#334155",
  },
  buttonPressed: {
    opacity: 0.72,
  },
  buttonText: {
    color: "#334155",
    fontSize: 13,
    fontWeight: "800",
  },
  darkText: {
    color: "#e5e7eb",
  },
});

// Teaching note: Scopes selection state so nearby charts do not fight over active data points.
export const selectionScopeStory: ShowcaseStory = {
  id: "v2-selection-scope",
  title: "Selection Scope",
  Component: V2SelectionScope,
};
