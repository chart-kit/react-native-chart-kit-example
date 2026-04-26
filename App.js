import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  BarChart,
  ContributionGraph,
  LineChart,
  PieChart,
  ProgressChart,
  StackedBarChart
} from "react-native-chart-kit";

import {
  barData,
  contributionData,
  data,
  pieChartData,
  progressChartData,
  stackedBarGraphData
} from "./data";

const chartConfig = {
  backgroundColor: "#102b33",
  backgroundGradientFrom: "#102b33",
  backgroundGradientTo: "#1b6b7a",
  decimalPlaces: 2,
  color: (opacity = 1, index = 0) =>
    [
      `rgba(124, 92, 255, ${opacity})`,
      `rgba(32, 214, 197, ${opacity})`,
      `rgba(92, 209, 132, ${opacity})`
    ][index % 3],
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.65,
  propsForBackgroundLines: {
    stroke: "rgba(255,255,255,0.18)",
    strokeDasharray: "4 8"
  },
  propsForLabels: {
    fontSize: 11
  }
};

function ChartSection({ title, subtitle, children, message }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>{title}</Text>
          {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
        </View>
        {message ? <Text style={styles.sectionMessage}>{message}</Text> : null}
      </View>
      <View style={styles.chartWrap}>{children}</View>
    </View>
  );
}

export default function App() {
  const { width: windowWidth } = useWindowDimensions();
  const [selectedPoint, setSelectedPoint] = useState("Tap a line dot");
  const [selectedDay, setSelectedDay] = useState("Tap a contribution day");

  const chartWidth = Math.min(windowWidth - 32, 430);
  const chartHeight = 220;
  const graphStyle = useMemo(() => ({ borderRadius: 8 }), []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>React Native Chart Kit</Text>
            <Text style={styles.subtitle}>Native validation app</Text>
          </View>

          <ChartSection
            title="Bezier Line Chart"
            subtitle="Dots, legends, gradients, and press handling"
            message={selectedPoint}
          >
            <LineChart
              bezier
              data={data}
              width={chartWidth}
              height={chartHeight}
              chartConfig={chartConfig}
              style={graphStyle}
              onDataPointClick={({ value, index }) =>
                setSelectedPoint(`Point ${index + 1}: ${value}`)
              }
            />
          </ChartSection>

          <ChartSection title="Bar Chart" subtitle="Negative values and axis labels">
            <BarChart
              data={barData}
              width={chartWidth}
              height={chartHeight}
              chartConfig={chartConfig}
              yAxisLabel="$"
              yAxisSuffix="k"
              style={graphStyle}
              showValuesOnTopOfBars
            />
          </ChartSection>

          <ChartSection title="Progress Chart" subtitle="Rings and legend labels">
            <ProgressChart
              data={progressChartData}
              width={chartWidth}
              height={chartHeight}
              chartConfig={chartConfig}
              style={graphStyle}
            />
          </ChartSection>

          <ChartSection title="Stacked Bar Chart" subtitle="Stacked segments and legend">
            <StackedBarChart
              data={stackedBarGraphData}
              width={chartWidth}
              height={chartHeight}
              chartConfig={chartConfig}
              style={graphStyle}
              hideLegend={false}
            />
          </ChartSection>

          <ChartSection title="Pie Chart" subtitle="Slices, labels, and legend layout">
            <PieChart
              data={pieChartData}
              width={chartWidth}
              height={chartHeight}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="#ffffff"
              paddingLeft="12"
              style={graphStyle}
            />
          </ChartSection>

          <ChartSection
            title="Contribution Graph"
            subtitle="Calendar cells, gradients, and day presses"
            message={selectedDay}
          >
            <ContributionGraph
              values={contributionData}
              width={chartWidth}
              height={chartHeight}
              endDate={new Date("2016-05-01")}
              numDays={105}
              chartConfig={chartConfig}
              style={graphStyle}
              onDayPress={value =>
                setSelectedDay(
                  `${value.date.toISOString().slice(0, 10)}: ${value.count}`
                )
              }
            />
          </ChartSection>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#eef3f7"
  },
  content: {
    padding: 16,
    gap: 16
  },
  header: {
    paddingTop: 8,
    paddingBottom: 4
  },
  title: {
    color: "#17232c",
    fontSize: 28,
    fontWeight: "800"
  },
  subtitle: {
    color: "#586775",
    fontSize: 15,
    marginTop: 4
  },
  section: {
    backgroundColor: "#ffffff",
    borderColor: "#d8e0e7",
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: "hidden"
  },
  sectionHeader: {
    alignItems: "flex-start",
    borderBottomColor: "#e6edf3",
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 8,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14
  },
  sectionTitle: {
    color: "#17232c",
    fontSize: 16,
    fontWeight: "700"
  },
  sectionSubtitle: {
    color: "#657482",
    fontSize: 12,
    marginTop: 3
  },
  sectionMessage: {
    color: "#116275",
    fontSize: 12,
    fontWeight: "700"
  },
  chartWrap: {
    alignItems: "center",
    paddingVertical: 14
  }
});
