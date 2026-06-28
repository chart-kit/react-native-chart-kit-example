import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit/v2";
import { acquisitionShare } from "../../fixtures/v2Pie";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../showcase/shared/storyPrimitives";

const formatPiePercentage = (value: number) => `${Math.round(value * 100)}%`;
const V2SelectablePie = ({ width }: NativeStoryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <ChartSection title="Channel selection" kicker="Selectable pie">
      <PieChart
        activeSlice={{
          activeOffset: 7,
          activeScale: 1.035,
          inactiveOpacity: 0.7,
        }}
        data={acquisitionShare}
        height={294}
        interaction={{
          mode: "tap",
          onSelect: (event) => setSelectedIndex(event.index),
        }}
        labelKey="channel"
        legend={{
          itemGap: 6,
          maxItemWidth: "48%",
          reservedHeight: 96,
          renderItem: ({ item, selected, theme }) => (
            <View
              style={[
                pieStoryStyles.selectableLegendItem,
                {
                  backgroundColor: selected
                    ? theme.tooltip.background
                    : "transparent",
                  borderColor: selected ? item.color : theme.axis,
                  opacity: selected ? 1 : 0.72,
                },
              ]}
            >
              <View
                style={[
                  pieStoryStyles.selectableLegendSwatch,
                  { backgroundColor: item.color },
                ]}
              />
              <Text
                numberOfLines={1}
                style={[
                  pieStoryStyles.selectableLegendLabel,
                  { color: selected ? theme.text : theme.mutedText },
                ]}
              >
                {item.label}
              </Text>
              <Text
                style={[
                  pieStoryStyles.selectableLegendValue,
                  { color: selected ? item.color : theme.mutedText },
                ]}
              >
                {item.percentageLabel}
              </Text>
            </View>
          ),
        }}
        selectedIndex={selectedIndex}
        selectionAnimation={{ duration: 220 }}
        testID="selectable-pie-chart"
        valueKey="share"
        width={width}
        formatPercentage={formatPiePercentage}
      />
    </ChartSection>
  );
};
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

// Teaching note: Makes active slices explicit without changing the source data array.
export const pieSelectionStory: ShowcaseStory = {
  id: "v2-pie-selection",
  title: "Pie Selection",
  Component: V2SelectablePie,
};
