import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  resolveCartesianChartThemeConfig,
  useChartKitTheme,
} from "react-native-chart-kit/v2";
import { CombinedChart } from "@chart-kit/pro/react-native";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../showcase/shared/storyPrimitives";

const formatCurrency = (value: number) => `$${value}k`;
const formatPercent = (value: number) => `${value}%`;
const channelPlan = [
  { month: "Jan", direct: 46, enterprise: 154, margin: 17 },
  { month: "Feb", direct: 52, enterprise: 172, margin: 19 },
  { month: "Mar", direct: 58, enterprise: 198, margin: 21 },
  { month: "Apr", direct: 64, enterprise: 222, margin: 24 },
  { month: "May", direct: 72, enterprise: 238, margin: 27 },
  { month: "Jun", direct: 78, enterprise: 262, margin: 30 },
];
const toggleItems = [
  { key: "bar-direct", label: "Direct" },
  { key: "bar-enterprise", label: "Enterprise" },
  { key: "line-margin", label: "Margin" },
];
const V2CombinedLegendToggles = ({ width }: NativeStoryProps) => {
  const chartKitTheme = useChartKitTheme();
  const resolvedTheme = useMemo(
    () => resolveCartesianChartThemeConfig(chartKitTheme),
    [chartKitTheme],
  );
  const isDark = chartKitTheme.mode === "dark";
  const seriesColors =
    resolvedTheme.series.length > 0
      ? resolvedTheme.series
      : [resolvedTheme.text];
  const themedToggleItems = toggleItems.map((item, index) => ({
    ...item,
    color: seriesColors[index % seriesColors.length] ?? resolvedTheme.text,
  }));
  const [visibleKeys, setVisibleKeys] = useState(
    toggleItems.map((item) => item.key),
  );
  const toggleKey = (key: string) => {
    setVisibleKeys((currentKeys) => {
      const nextKeys = currentKeys.includes(key)
        ? currentKeys.filter((item) => item !== key)
        : [...currentKeys, key];

      return nextKeys.length > 0 ? nextKeys : currentKeys;
    });
  };

  return (
    <ChartSection title="Channel plan" kicker="Legend toggles">
      <View style={styles.toggleRow}>
        {themedToggleItems.map((item) => {
          const active = visibleKeys.includes(item.key);

          return (
            <Pressable
              key={item.key}
              accessibilityRole="button"
              onPress={() => toggleKey(item.key)}
              style={[
                styles.toggle,
                isDark ? styles.darkToggle : styles.lightToggle,
                {
                  backgroundColor: active
                    ? isDark
                      ? "rgba(255, 255, 255, 0.04)"
                      : "rgba(15, 23, 42, 0.025)"
                    : "transparent",
                  borderColor: active
                    ? item.color
                    : isDark
                      ? "rgba(148, 163, 184, 0.34)"
                      : "rgba(100, 116, 139, 0.26)",
                },
              ]}
            >
              <View
                style={[
                  styles.toggleSwatch,
                  { backgroundColor: item.color },
                  !active && styles.inactiveToggleSwatch,
                ]}
              />
              <Text
                style={[
                  styles.toggleText,
                  {
                    color: active
                      ? resolvedTheme.text
                      : resolvedTheme.mutedText,
                  },
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <CombinedChart
        bars={[
          { yKey: "direct", label: "Direct" },
          { yKey: "enterprise", label: "Enterprise" },
        ]}
        data={channelPlan}
        formatLeftYLabel={formatCurrency}
        formatRightYLabel={formatPercent}
        height={284}
        leftYDomain={[0, "dataMax"]}
        lines={[{ yKey: "margin", label: "Margin", curve: "monotone" }]}
        rightYDomain={[0, 40]}
        testID="combined-legend-toggle-chart"
        visibleSeriesKeys={visibleKeys}
        width={width}
        xKey="month"
      />
    </ChartSection>
  );
};
const styles = StyleSheet.create({
  darkToggle: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
  },
  inactiveToggleSwatch: {
    opacity: 0.34,
  },
  lightToggle: {
    backgroundColor: "rgba(15, 23, 42, 0.02)",
  },
  toggle: {
    alignItems: "center",
    borderRadius: 999,
    borderStyle: "solid",
    borderWidth: 1,
    flexDirection: "row",
    gap: 6,
    height: 28,
    justifyContent: "center",
    paddingBottom: 0,
    paddingHorizontal: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 0,
    paddingVertical: 0,
  },
  toggleRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
    width: "100%",
  },
  toggleSwatch: {
    borderRadius: 999,
    height: 7,
    width: 7,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 14,
  },
});

// Teaching note: Keeps series visibility controlled by local state for predictable toggles.
export const legendTogglesStory: ShowcaseStory = {
  id: "v2-combined-legend-toggles",
  title: "Legend Toggles",
  Component: V2CombinedLegendToggles,
};
