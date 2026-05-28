import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  BarChart as LegacyBarChart,
  ContributionGraph as LegacyContributionGraph,
  LineChart as LegacyLineChart,
  PieChart as LegacyPieChart,
  ProgressChart as LegacyProgressChart,
  StackedBarChart as LegacyStackedBarChart,
} from "react-native-chart-kit";
import {
  BarChart,
  ChartKitProvider,
  ContributionGraph,
  DonutChart,
  LineChart,
  PieChart,
  ProgressChart,
  StackedBarChart,
} from "react-native-chart-kit/v2";

import {
  barData,
  contributionData,
  data,
  pieChartData,
  progressChartData,
  stackedBarGraphData,
} from "./data";

const pages = [
  { key: "modern", label: "V2 API" },
  { key: "compat", label: "V2 Compat" },
  { key: "legacy", label: "Legacy" },
];

const legacySeriesRgb = [
  [124, 92, 255],
  [32, 214, 197],
  [92, 209, 132],
];

const getLegacySeriesColor = (opacity = 1, index = 0) => {
  const [red, green, blue] = legacySeriesRgb[index % legacySeriesRgb.length];

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
};

const legacySeriesColors = legacySeriesRgb.map((_, index) =>
  getLegacySeriesColor(1, index),
);

const chartConfig = {
  backgroundColor: "#102b33",
  backgroundGradientFrom: "#102b33",
  backgroundGradientTo: "#1b6b7a",
  decimalPlaces: 2,
  color: getLegacySeriesColor,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.65,
  propsForBackgroundLines: {
    stroke: "rgba(255,255,255,0.18)",
    strokeDasharray: "4 8",
  },
  propsForLabels: {
    fontSize: 11,
  },
};

const legacyV2Theme = {
  background: chartConfig.backgroundColor,
  plotBackground: chartConfig.backgroundGradientTo,
  grid: "rgba(255,255,255,0.18)",
  axis: "rgba(255,255,255,0.24)",
  text: "#ffffff",
  mutedText: "rgba(255,255,255,0.76)",
  series: legacySeriesColors,
  typography: {
    axisLabelSize: 11,
    legendLabelSize: 11,
  },
};

const modernSeriesColors = ["#2563eb", "#0891b2", "#7c3aed", "#16a34a"];

const modernV2Theme = {
  background: "#ffffff",
  plotBackground: "#ffffff",
  grid: "#e6edf6",
  axis: "#dbe3ef",
  text: "#101828",
  mutedText: "#526176",
  series: modernSeriesColors,
  typography: {
    axisLabelSize: 11,
    legendLabelSize: 11,
  },
  tooltip: {
    background: "#ffffff",
    border: "#dbe3ef",
    text: "#101828",
    mutedText: "#526176",
  },
};

const legacyPieV2Theme = {
  ...modernV2Theme,
  text: "#39434d",
  mutedText: "#657482",
  series: pieChartData.map((item) => item.color),
};

const legacyContributionColors = [
  "rgba(124, 92, 255, 0.32)",
  "rgba(124, 92, 255, 0.52)",
  "rgba(32, 214, 197, 0.72)",
  "rgba(92, 209, 132, 0.9)",
];

const modernContributionColors = ["#dbeafe", "#93c5fd", "#2563eb", "#0f3a78"];

const revenueData = [
  { month: "Jan", actual: 42, forecast: 38 },
  { month: "Feb", actual: 48, forecast: 43 },
  { month: "Mar", actual: 44, forecast: 46 },
  { month: "Apr", actual: 59, forecast: 52 },
  { month: "May", actual: 64, forecast: 58 },
  { month: "Jun", actual: 71, forecast: 63 },
];

const profitData = [
  { month: "Jan", profit: -18 },
  { month: "Feb", profit: 12 },
  { month: "Mar", profit: 28 },
  { month: "Apr", profit: 34 },
  { month: "May", profit: 48 },
  { month: "Jun", profit: 62 },
];

const platformData = [
  { quarter: "Q1", ios: 42, android: 38, web: 20 },
  { quarter: "Q2", ios: 48, android: 33, web: 19 },
  { quarter: "Q3", ios: 51, android: 31, web: 18 },
];

const progressData = [
  { metric: "API", progress: 0.86, color: modernSeriesColors[0] },
  { metric: "Docs", progress: 0.72, color: modernSeriesColors[1] },
  { metric: "QA", progress: 0.64, color: modernSeriesColors[3] },
];

const planMixData = [
  { plan: "Starter", revenue: 24, color: modernSeriesColors[0] },
  { plan: "Growth", revenue: 46, color: modernSeriesColors[1] },
  { plan: "Enterprise", revenue: 30, color: modernSeriesColors[3] },
];

const getLegacyLineRows = (legacyData) =>
  legacyData.labels.map((label, index) =>
    legacyData.datasets.reduce(
      (row, dataset, datasetIndex) => ({
        ...row,
        [`series${datasetIndex}`]: dataset.data[index],
      }),
      { label },
    ),
  );

const getLegacyLineSeries = (legacyData) =>
  legacyData.datasets.map((dataset, index) => ({
    yKey: `series${index}`,
    label: legacyData.legend?.[index] ?? `Series ${index + 1}`,
    color: dataset.color?.(1) ?? chartConfig.color(1, index),
    strokeWidth: dataset.strokeWidth ?? chartConfig.strokeWidth,
  }));

const getLegacyBarRows = (legacyData) =>
  legacyData.labels.map((label, index) => ({
    label,
    value: legacyData.datasets[0]?.data[index] ?? null,
  }));

function ChartSection({ title, subtitle, children, message }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionText}>
          <Text style={styles.sectionTitle}>{title}</Text>
          {subtitle ? (
            <Text style={styles.sectionSubtitle}>{subtitle}</Text>
          ) : null}
        </View>
        {message ? <Text style={styles.sectionMessage}>{message}</Text> : null}
      </View>
      <View style={styles.chartWrap}>{children}</View>
    </View>
  );
}

function ProgressWithCenterLabel({
  centerLabel,
  height,
  labelStyle,
  width,
  ...props
}) {
  const chartAreaHeight = height - 50;

  return (
    <View style={{ height, width }}>
      <ProgressChart {...props} width={width} height={height} />
      <View
        pointerEvents="none"
        style={[
          styles.progressCenterLabelOverlay,
          {
            height: chartAreaHeight,
            top: 0,
            width,
          },
        ]}
      >
        <Text style={[styles.progressCenterLabel, labelStyle]}>
          {centerLabel}
        </Text>
      </View>
    </View>
  );
}

function PageTabs({ activePage, onChange }) {
  return (
    <View style={styles.tabs}>
      {pages.map((page) => {
        const active = page.key === activePage;

        return (
          <Pressable
            key={page.key}
            accessibilityRole="button"
            onPress={() => onChange(page.key)}
            style={[styles.tabButton, active ? styles.tabButtonActive : null]}
          >
            <Text
              style={[styles.tabLabel, active ? styles.tabLabelActive : null]}
            >
              {page.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function LegacyChartsPage({
  chartHeight,
  chartWidth,
  graphStyle,
  legacySelectedDay,
  legacySelectedPoint,
  setLegacySelectedDay,
  setLegacySelectedPoint,
}) {
  return (
    <>
      <ChartSection
        title="Line Chart"
        subtitle="Root import, legacy data object"
        message={legacySelectedPoint}
      >
        <LegacyLineChart
          bezier
          data={data}
          width={chartWidth}
          height={chartHeight}
          chartConfig={chartConfig}
          style={graphStyle}
          onDataPointClick={({ value, index }) =>
            setLegacySelectedPoint(`Point ${index + 1}: ${value}`)
          }
        />
      </ChartSection>

      <ChartSection title="Bar Chart" subtitle="Root import, legacy bar props">
        <LegacyBarChart
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

      <ChartSection
        title="Progress Chart"
        subtitle="Root import, legacy progress data"
      >
        <LegacyProgressChart
          data={progressChartData}
          width={chartWidth}
          height={chartHeight}
          chartConfig={chartConfig}
          style={graphStyle}
        />
      </ChartSection>

      <ChartSection
        title="Stacked Bar Chart"
        subtitle="Root import, legacy stacked data"
      >
        <LegacyStackedBarChart
          data={stackedBarGraphData}
          width={chartWidth}
          height={chartHeight}
          chartConfig={chartConfig}
          style={graphStyle}
          hideLegend={false}
        />
      </ChartSection>

      <ChartSection title="Pie Chart" subtitle="Root import, legacy accessor">
        <LegacyPieChart
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
        subtitle="Root import, legacy contribution values"
        message={legacySelectedDay}
      >
        <LegacyContributionGraph
          values={contributionData}
          width={chartWidth}
          height={chartHeight}
          endDate={new Date("2016-05-01")}
          numDays={105}
          chartConfig={chartConfig}
          style={graphStyle}
          onDayPress={(value) =>
            setLegacySelectedDay(
              `${value.date.toISOString().slice(0, 10)}: ${value.count}`,
            )
          }
        />
      </ChartSection>
    </>
  );
}

function V2CompatPage({
  chartHeight,
  chartWidth,
  compatSelectedBar,
  compatSelectedDay,
  compatSelectedPoint,
  compatSelectedSlice,
  legacyBarRows,
  legacyLineRows,
  legacyLineSeries,
  setCompatSelectedBar,
  setCompatSelectedDay,
  setCompatSelectedPoint,
  setCompatSelectedSlice,
}) {
  return (
    <>
      <ChartSection
        title="Line Chart"
        subtitle="v2 component, legacy data adapted"
        message={compatSelectedPoint}
      >
        <LineChart
          data={legacyLineRows}
          xKey="label"
          series={legacyLineSeries}
          curve="monotone"
          legend={{ position: "bottom" }}
          theme={legacyV2Theme}
          interaction={{
            mode: "tap",
            onSelect: (event) =>
              setCompatSelectedPoint(
                `${event.xLabel}: ${event.series
                  .map((item) => `${item.label} ${item.formattedValue}`)
                  .join(" / ")}`,
              ),
          }}
          width={chartWidth}
          height={chartHeight}
        />
      </ChartSection>

      <ChartSection
        title="Bar Chart"
        subtitle="v2 component, legacy bar data adapted"
        message={compatSelectedBar}
      >
        <BarChart
          data={legacyBarRows}
          xKey="label"
          yKey="value"
          theme={legacyV2Theme}
          showValuesOnTopOfBars
          interaction={{
            mode: "tap",
            onSelect: (event) =>
              setCompatSelectedBar(`${event.xLabel}: ${event.formattedValue}`),
          }}
          formatYLabel={(value) =>
            value < 0 ? `-$${Math.abs(value)}k` : `$${value}k`
          }
          width={chartWidth}
          height={chartHeight}
        />
      </ChartSection>

      <ChartSection
        title="Progress Chart"
        subtitle="v2 component, legacy data object"
      >
        <ProgressWithCenterLabel
          data={progressChartData}
          colors={legacySeriesColors}
          width={chartWidth}
          height={chartHeight}
          theme={legacyV2Theme}
          centerLabel={`${Math.round(
            (progressChartData.data.reduce((sum, value) => sum + value, 0) /
              progressChartData.data.length) *
              100,
          )}%`}
        />
      </ChartSection>

      <ChartSection
        title="Stacked Bar Chart"
        subtitle="v2 StackedBarChart legacy props"
      >
        <StackedBarChart
          data={stackedBarGraphData}
          width={chartWidth}
          height={chartHeight}
          chartConfig={chartConfig}
          hideLegend={false}
          theme={legacyV2Theme}
        />
      </ChartSection>

      <ChartSection
        title="Pie Chart"
        subtitle="v2 component, legacy pie rows adapted"
        message={pieChartData[compatSelectedSlice]?.name}
      >
        <PieChart
          data={pieChartData}
          valueKey="population"
          labelKey="name"
          colorKey="color"
          selectedIndex={compatSelectedSlice}
          theme={legacyPieV2Theme}
          interaction={{
            mode: "tap",
            onSelect: (event) => setCompatSelectedSlice(event.index),
          }}
          activeSlice={{
            activeOffset: 0,
            activeScale: 1,
            inactiveOpacity: 1,
            strokeWidth: 0,
          }}
          selectionAnimation={false}
          width={chartWidth}
          height={chartHeight}
        />
      </ChartSection>

      <ChartSection
        title="Contribution Graph"
        subtitle="v2 component, legacy contribution values"
        message={compatSelectedDay}
      >
        <ContributionGraph
          values={contributionData}
          width={chartWidth}
          height={162}
          endDate="2016-05-01"
          numDays={105}
          weekStartsOn={1}
          theme={legacyV2Theme}
          colors={legacyContributionColors}
          emptyColor="rgba(255,255,255,0.16)"
          onDayPress={(event) =>
            setCompatSelectedDay(
              `${event.date.toISOString().slice(0, 10)}: ${event.value ?? 0}`,
            )
          }
        />
      </ChartSection>
    </>
  );
}

function V2ModernPage({
  chartHeight,
  chartWidth,
  progressCenterLabel,
  selectedBar,
  selectedDay,
  selectedPlan,
  selectedPoint,
  setSelectedBar,
  setSelectedDay,
  setSelectedPlan,
  setSelectedPoint,
}) {
  return (
    <>
      <ChartSection
        title="Line Chart"
        subtitle="Object rows, multi-series legend, and tap selection"
        message={selectedPoint}
      >
        <LineChart
          data={revenueData}
          xKey="month"
          series={[
            { yKey: "actual", label: "Actual", color: modernSeriesColors[0] },
            {
              yKey: "forecast",
              label: "Forecast",
              color: modernSeriesColors[1],
              strokeDasharray: [6, 4],
            },
          ]}
          legend={{ position: "bottom" }}
          theme={modernV2Theme}
          interaction={{
            mode: "tap",
            onSelect: (event) =>
              setSelectedPoint(
                `${event.xLabel}: ${event.series
                  .map((item) => `${item.label} ${item.formattedValue}`)
                  .join(" / ")}`,
              ),
          }}
          width={chartWidth}
          height={chartHeight}
        />
      </ChartSection>

      <ChartSection
        title="Bar Chart"
        subtitle="Negative values, value labels, and tap tooltips"
        message={selectedBar}
      >
        <BarChart
          data={profitData}
          xKey="month"
          yKey="profit"
          theme={modernV2Theme}
          showValuesOnTopOfBars
          interaction={{
            mode: "tap",
            onSelect: (event) =>
              setSelectedBar(`${event.xLabel}: ${event.formattedValue}`),
          }}
          formatYLabel={(value) =>
            value < 0 ? `-$${Math.abs(value)}k` : `$${value}k`
          }
          width={chartWidth}
          height={chartHeight}
        />
      </ChartSection>

      <ChartSection
        title="Stacked Bar Chart"
        subtitle="v2 stacked100 mode through BarChart"
      >
        <BarChart
          data={platformData}
          xKey="quarter"
          mode="stacked100"
          series={[
            { yKey: "ios", label: "iOS", color: modernSeriesColors[0] },
            { yKey: "android", label: "Android", color: modernSeriesColors[1] },
            { yKey: "web", label: "Web", color: modernSeriesColors[3] },
          ]}
          theme={modernV2Theme}
          formatYLabel={(value) => `${value}%`}
          width={chartWidth}
          height={chartHeight}
        />
      </ChartSection>

      <ChartSection
        title="Progress Chart"
        subtitle="Object rows and center label"
      >
        <ProgressWithCenterLabel
          data={progressData}
          valueKey="progress"
          labelKey="metric"
          colorKey="color"
          width={chartWidth}
          height={chartHeight}
          theme={modernV2Theme}
          centerLabel={progressCenterLabel}
          labelStyle={styles.modernProgressCenterLabel}
        />
      </ChartSection>

      <ChartSection
        title="Donut Chart"
        subtitle="Active slice, legend, and controlled selection"
        message={planMixData[selectedPlan]?.plan}
      >
        <DonutChart
          data={planMixData}
          valueKey="revenue"
          labelKey="plan"
          colorKey="color"
          selectedIndex={selectedPlan}
          theme={modernV2Theme}
          interaction={{
            mode: "tap",
            onSelect: (event) => setSelectedPlan(event.index),
          }}
          activeSlice={{ inactiveOpacity: 0.42, strokeWidth: 4 }}
          centerLabel={
            <Text style={styles.donutCenterLabel}>
              {planMixData[selectedPlan]?.plan}
            </Text>
          }
          width={chartWidth}
          height={chartHeight}
        />
      </ChartSection>

      <ChartSection
        title="Contribution Graph"
        subtitle="Calendar cells and day presses"
        message={selectedDay}
      >
        <ContributionGraph
          values={contributionData}
          width={chartWidth}
          height={162}
          endDate="2016-05-01"
          numDays={105}
          weekStartsOn={1}
          theme={modernV2Theme}
          colors={modernContributionColors}
          emptyColor="#eff6ff"
          onDayPress={(event) =>
            setSelectedDay(
              `${event.date.toISOString().slice(0, 10)}: ${event.value ?? 0}`,
            )
          }
        />
      </ChartSection>
    </>
  );
}

export default function App() {
  const { width: windowWidth } = useWindowDimensions();
  const [activePage, setActivePage] = useState("modern");
  const [legacySelectedPoint, setLegacySelectedPoint] =
    useState("Tap a line dot");
  const [legacySelectedDay, setLegacySelectedDay] = useState(
    "Tap a contribution day",
  );
  const [compatSelectedPoint, setCompatSelectedPoint] =
    useState("Tap the line chart");
  const [compatSelectedBar, setCompatSelectedBar] = useState("Tap a bar");
  const [compatSelectedSlice, setCompatSelectedSlice] = useState(1);
  const [compatSelectedDay, setCompatSelectedDay] = useState(
    "Tap a contribution day",
  );
  const [selectedPoint, setSelectedPoint] = useState("Tap the line chart");
  const [selectedBar, setSelectedBar] = useState("Tap a bar");
  const [selectedPlan, setSelectedPlan] = useState(1);
  const [selectedDay, setSelectedDay] = useState("Tap a contribution day");

  const chartWidth = Math.min(windowWidth - 64, 430);
  const chartHeight = 220;
  const graphStyle = useMemo(() => ({ borderRadius: 8 }), []);
  const legacyLineRows = useMemo(() => getLegacyLineRows(data), []);
  const legacyLineSeries = useMemo(() => getLegacyLineSeries(data), []);
  const legacyBarRows = useMemo(() => getLegacyBarRows(barData), []);
  const progressCenterLabel = useMemo(
    () =>
      `${Math.round(
        (progressData.reduce((sum, item) => sum + item.progress, 0) /
          progressData.length) *
          100,
      )}%`,
    [],
  );

  const pageContent =
    activePage === "legacy" ? (
      <LegacyChartsPage
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        graphStyle={graphStyle}
        legacySelectedDay={legacySelectedDay}
        legacySelectedPoint={legacySelectedPoint}
        setLegacySelectedDay={setLegacySelectedDay}
        setLegacySelectedPoint={setLegacySelectedPoint}
      />
    ) : activePage === "compat" ? (
      <V2CompatPage
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        compatSelectedBar={compatSelectedBar}
        compatSelectedDay={compatSelectedDay}
        compatSelectedPoint={compatSelectedPoint}
        compatSelectedSlice={compatSelectedSlice}
        legacyBarRows={legacyBarRows}
        legacyLineRows={legacyLineRows}
        legacyLineSeries={legacyLineSeries}
        setCompatSelectedBar={setCompatSelectedBar}
        setCompatSelectedDay={setCompatSelectedDay}
        setCompatSelectedPoint={setCompatSelectedPoint}
        setCompatSelectedSlice={setCompatSelectedSlice}
      />
    ) : (
      <V2ModernPage
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        progressCenterLabel={progressCenterLabel}
        selectedBar={selectedBar}
        selectedDay={selectedDay}
        selectedPlan={selectedPlan}
        selectedPoint={selectedPoint}
        setSelectedBar={setSelectedBar}
        setSelectedDay={setSelectedDay}
        setSelectedPlan={setSelectedPlan}
        setSelectedPoint={setSelectedPoint}
      />
    );

  return (
    <SafeAreaProvider>
      <ChartKitProvider preset="analytics">
        <SafeAreaView style={styles.safeArea}>
          <StatusBar style="dark" />
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>React Native Chart Kit</Text>
            </View>
            <PageTabs activePage={activePage} onChange={setActivePage} />
            {pageContent}
          </ScrollView>
        </SafeAreaView>
      </ChartKitProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f7fb",
  },
  content: {
    gap: 16,
    padding: 16,
  },
  header: {
    paddingBottom: 4,
    paddingTop: 8,
  },
  title: {
    color: "#17232c",
    fontSize: 28,
    fontWeight: "800",
  },
  tabs: {
    backgroundColor: "#dfe8ef",
    borderRadius: 8,
    flexDirection: "row",
    gap: 4,
    padding: 4,
  },
  tabButton: {
    alignItems: "center",
    borderRadius: 6,
    flex: 1,
    minHeight: 40,
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  tabButtonActive: {
    backgroundColor: "#ffffff",
  },
  tabLabel: {
    color: "#526372",
    fontSize: 13,
    fontWeight: "700",
  },
  tabLabelActive: {
    color: "#17232c",
  },
  section: {
    backgroundColor: "#ffffff",
    borderColor: "#d8e0e7",
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: "hidden",
  },
  sectionHeader: {
    alignItems: "flex-start",
    borderBottomColor: "#e6edf3",
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 8,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  sectionText: {
    maxWidth: "100%",
  },
  sectionTitle: {
    color: "#17232c",
    fontSize: 16,
    fontWeight: "700",
  },
  sectionSubtitle: {
    color: "#657482",
    fontSize: 12,
    marginTop: 3,
  },
  sectionMessage: {
    color: "#116275",
    fontSize: 12,
    fontWeight: "700",
  },
  chartWrap: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  progressCenterLabelOverlay: {
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    position: "absolute",
  },
  progressCenterLabel: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "800",
    lineHeight: 14,
  },
  modernProgressCenterLabel: {
    color: modernV2Theme.text,
  },
  donutCenterLabel: {
    color: modernV2Theme.text,
    fontSize: 12,
    fontWeight: "800",
    lineHeight: 15,
    textAlign: "center",
  },
});
