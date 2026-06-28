import { StyleSheet, Text, View } from "react-native";
import { DonutChart } from "react-native-chart-kit/v2";
import { retentionSegments } from "../../fixtures/v2Pie";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../showcase/shared/storyPrimitives";

const formatPiePercentage = (value: number) => `${Math.round(value * 100)}%`;
const V2CustomLegendDonut = ({ width }: NativeStoryProps) => (
  <ChartSection title="Retention quality" kicker="Custom legend">
    <DonutChart
      data={retentionSegments}
      height={300}
      labelKey="status"
      valueKey="accounts"
      width={width}
      centerLabel={({ theme, total }) => (
        <View style={pieStoryStyles.centerLabel}>
          <Text style={[pieStoryStyles.centerValue, { color: theme.text }]}>
            {total}
          </Text>
          <Text
            style={[pieStoryStyles.centerCaption, { color: theme.mutedText }]}
          >
            accounts
          </Text>
        </View>
      )}
      formatPercentage={formatPiePercentage}
      legend={{
        itemGap: 6,
        maxItemWidth: "100%",
        renderItem: ({ item, theme }) => (
          <View style={pieStoryStyles.customLegendItem}>
            <View
              style={[
                pieStoryStyles.customLegendSwatch,
                { backgroundColor: item.color },
              ]}
            />
            <Text
              numberOfLines={1}
              style={[pieStoryStyles.customLegendLabel, { color: theme.text }]}
            >
              {item.label}
            </Text>
            <Text
              style={[
                pieStoryStyles.customLegendValue,
                { color: theme.mutedText },
              ]}
            >
              {item.percentageLabel}
            </Text>
          </View>
        ),
      }}
    />
  </ChartSection>
);
const pieStoryStyles = StyleSheet.create({
  centerCaption: {
    fontSize: 10,
    fontWeight: "700",
    marginTop: -2,
  },
  centerLabel: {
    alignItems: "center",
    justifyContent: "center",
  },
  centerValue: {
    fontSize: 22,
    fontWeight: "900",
    lineHeight: 26,
  },
  customLegendItem: {
    alignItems: "center",
    flexDirection: "row",
    gap: 7,
    minHeight: 18,
    width: "100%",
  },
  customLegendLabel: {
    flex: 1,
    fontSize: 11,
    fontWeight: "700",
  },
  customLegendSwatch: {
    borderRadius: 3,
    height: 9,
    width: 9,
  },
  customLegendValue: {
    fontSize: 10,
    fontWeight: "800",
  },
  selectableLegendItem: {
    alignItems: "center",
    borderRadius: 7,
    borderWidth: 1,
    flexDirection: "row",
    gap: 5,
    minHeight: 26,
    paddingHorizontal: 7,
    width: "100%",
  },
  selectableLegendLabel: {
    flex: 1,
    fontSize: 11,
    fontWeight: "800",
  },
  selectableLegendSwatch: {
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  selectableLegendValue: {
    fontSize: 10,
    fontWeight: "900",
  },
});

// Teaching note: Pairs donut geometry with a custom legend for richer labels.
export const donutCustomLegendStory: ShowcaseStory = {
  id: "v2-donut-custom-legend",
  title: "Custom Legend",
  Component: V2CustomLegendDonut,
};
