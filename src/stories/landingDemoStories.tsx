import {
  useEffect,
  useRef,
  useState
} from "react";
import {
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import {
  GlassContainer,
  GlassView,
  isGlassEffectAPIAvailable
} from "expo-glass-effect";

import {
  BarChart,
  ProgressChart,
  type CartesianChartTheme
} from "react-native-chart-kit/v2";
import { CombinedChart } from "@chart-kit/pro/react-native";

import { CodeContributionScreen } from "./codeContributionDemo";
import { MarketPulseScreen } from "./marketPulseDemo";
import { TradingAppScreen } from "./tradingDemo";
import { WebsiteAnalyticsScreen } from "./websiteAnalyticsDemo";
import type { NativeStoryProps, ShowcaseStory } from "./storyPrimitives";

type HealthRangeOption = "Day" | "Week" | "Month";

type HealthRingPoint = {
  color: string;
  metric: string;
  progress: number;
  target: string;
  value: string;
};

type HealthActivityPoint = {
  day: string;
  exercise: number;
  move: number;
  stand: number;
};

type HealthCombinedPoint = {
  energy: number;
  heartRate: number;
  minutes: number;
  time: string;
};

type HealthRangeSummary = {
  activity: HealthActivityPoint[];
  activityKicker: string;
  combined: HealthCombinedPoint[];
  combinedKicker: string;
  rings: HealthRingPoint[];
};

const healthMoveColor = "#ff2d55";
const healthExerciseColor = "#30d158";
const healthStandColor = "#64d2ff";
const healthEnergyColor = "#ff9f0a";
const healthRangeOptions: HealthRangeOption[] = ["Day", "Week", "Month"];
const healthRangeSegmentGap = 4;
const AnimatedGlassView = Animated.createAnimatedComponent(GlassView);
const healthActivityValueKeys: Array<keyof HealthActivityPoint & string> = [
  "exercise",
  "move",
  "stand"
];
const healthRingValueKeys: Array<keyof HealthRingPoint & string> = [
  "progress"
];
const healthCombinedValueKeys: Array<keyof HealthCombinedPoint & string> = [
  "energy",
  "heartRate",
  "minutes"
];
const healthRangeAnimationDuration = 720;
const healthChartTheme: CartesianChartTheme = {
  axis: "#dce2ec",
  background: "transparent",
  grid: "#edf1f7",
  mutedText: "#7d8797",
  plotBackground: "transparent",
  series: [
    healthMoveColor,
    healthExerciseColor,
    healthStandColor,
    healthEnergyColor
  ],
  text: "#11131a",
  tooltip: {
    background: "#11131a",
    border: "#11131a",
    mutedText: "#c8ced9",
    text: "#ffffff"
  },
  typography: {
    axisLabelSize: 10,
    legendLabelSize: 11
  }
};

const healthRangeSummaries: Record<HealthRangeOption, HealthRangeSummary> = {
  Day: {
    activityKicker: "Today",
    combinedKicker: "Live",
    rings: [
      {
        color: healthMoveColor,
        metric: "Move",
        progress: 0.62,
        target: "650 kcal",
        value: "404"
      },
      {
        color: healthExerciseColor,
        metric: "Exercise",
        progress: 0.48,
        target: "30 min",
        value: "14"
      },
      {
        color: healthStandColor,
        metric: "Stand",
        progress: 0.58,
        target: "12 hr",
        value: "7"
      }
    ],
    activity: [
      { day: "6a", exercise: 8, move: 18, stand: 18 },
      { day: "8a", exercise: 16, move: 30, stand: 25 },
      { day: "10a", exercise: 42, move: 52, stand: 34 },
      { day: "12p", exercise: 48, move: 58, stand: 42 },
      { day: "2p", exercise: 48, move: 68, stand: 50 },
      { day: "4p", exercise: 66, move: 92, stand: 58 },
      { day: "6p", exercise: 76, move: 101, stand: 58 }
    ],
    combined: [
      { energy: 22, heartRate: 68, minutes: 14, time: "6a" },
      { energy: 46, heartRate: 82, minutes: 21, time: "8a" },
      { energy: 88, heartRate: 118, minutes: 36, time: "10a" },
      { energy: 42, heartRate: 91, minutes: 18, time: "12p" },
      { energy: 72, heartRate: 108, minutes: 28, time: "2p" },
      { energy: 128, heartRate: 136, minutes: 44, time: "4p" },
      { energy: 58, heartRate: 98, minutes: 24, time: "6p" },
      { energy: 30, heartRate: 74, minutes: 12, time: "8p" }
    ]
  },
  Week: {
    activityKicker: "This week",
    combinedKicker: "This week",
    rings: [
      {
        color: healthMoveColor,
        metric: "Move",
        progress: 0.86,
        target: "650 kcal",
        value: "562"
      },
      {
        color: healthExerciseColor,
        metric: "Exercise",
        progress: 0.73,
        target: "30 min",
        value: "22"
      },
      {
        color: healthStandColor,
        metric: "Stand",
        progress: 0.92,
        target: "12 hr",
        value: "11"
      }
    ],
    activity: [
      { day: "Mon", exercise: 64, move: 78, stand: 86 },
      { day: "Tue", exercise: 88, move: 104, stand: 100 },
      { day: "Wed", exercise: 42, move: 66, stand: 72 },
      { day: "Thu", exercise: 100, move: 114, stand: 100 },
      { day: "Fri", exercise: 76, move: 94, stand: 84 },
      { day: "Sat", exercise: 122, move: 126, stand: 108 },
      { day: "Sun", exercise: 73, move: 86, stand: 92 }
    ],
    combined: [
      { energy: 72, heartRate: 78, minutes: 24, time: "Mon" },
      { energy: 104, heartRate: 92, minutes: 36, time: "Tue" },
      { energy: 64, heartRate: 76, minutes: 18, time: "Wed" },
      { energy: 118, heartRate: 104, minutes: 41, time: "Thu" },
      { energy: 91, heartRate: 88, minutes: 29, time: "Fri" },
      { energy: 134, heartRate: 112, minutes: 46, time: "Sat" },
      { energy: 82, heartRate: 84, minutes: 25, time: "Sun" }
    ]
  },
  Month: {
    activityKicker: "This month",
    combinedKicker: "Monthly",
    rings: [
      {
        color: healthMoveColor,
        metric: "Move",
        progress: 0.94,
        target: "19.5k kcal",
        value: "18.4k"
      },
      {
        color: healthExerciseColor,
        metric: "Exercise",
        progress: 0.88,
        target: "900 min",
        value: "795"
      },
      {
        color: healthStandColor,
        metric: "Stand",
        progress: 0.81,
        target: "360 hr",
        value: "292"
      }
    ],
    activity: [
      { day: "W1", exercise: 82, move: 92, stand: 77 },
      { day: "W2", exercise: 94, move: 108, stand: 86 },
      { day: "W3", exercise: 78, move: 98, stand: 81 },
      { day: "W4", exercise: 106, move: 118, stand: 92 },
      { day: "W5", exercise: 88, move: 104, stand: 78 }
    ],
    combined: [
      { energy: 74, heartRate: 78, minutes: 23, time: "W1" },
      { energy: 92, heartRate: 86, minutes: 31, time: "W2" },
      { energy: 86, heartRate: 82, minutes: 27, time: "W3" },
      { energy: 108, heartRate: 94, minutes: 39, time: "W4" },
      { energy: 98, heartRate: 88, minutes: 33, time: "W5" }
    ]
  }
};

const formatHealthPercent = (value: number) => `${Math.round(value)}%`;
const formatHealthEnergy = (value: number) => `${Math.round(value)} kcal`;
const formatHeartRate = (value: number) => `${Math.round(value)} bpm`;

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

const smootherStep = (value: number) => {
  const clampedValue = clamp01(value);

  return (
    clampedValue *
    clampedValue *
    clampedValue *
    (clampedValue * (clampedValue * 6 - 15) + 10)
  );
};

const interpolate = (from: number, to: number, progress: number) =>
  from + (to - from) * progress;

const supportsNativeLiquidGlass = () => {
  if (Platform.OS !== "ios") {
    return false;
  }

  try {
    return isGlassEffectAPIAvailable();
  } catch {
    return false;
  }
};

const useAnimatedHealthRows = <TData extends Record<string, unknown>>({
  isVisualMode,
  targetData,
  valueKeys
}: {
  isVisualMode?: boolean;
  targetData: TData[];
  valueKeys: Array<keyof TData & string>;
}) => {
  const [animatedData, setAnimatedData] = useState(targetData);
  const currentDataRef = useRef(targetData);

  useEffect(() => {
    if (isVisualMode) {
      currentDataRef.current = targetData;
      setAnimatedData(targetData);
      return undefined;
    }

    const startData = currentDataRef.current;
    let frameId = 0;
    let startTime: number | undefined;

    const tick = (timestamp: number) => {
      startTime ??= timestamp;

      const progress = clamp01(
        (timestamp - startTime) / healthRangeAnimationDuration
      );
      const easedProgress = smootherStep(progress);

      const nextData = targetData.map((target, index) => {
        const start = startData[index] ?? target;
        const row = { ...target };

        valueKeys.forEach((key) => {
          row[key] = interpolate(
            Number(start[key] ?? target[key] ?? 0),
            Number(target[key] ?? 0),
            easedProgress
          ) as TData[typeof key];
        });

        return row;
      });

      currentDataRef.current = nextData;
      setAnimatedData(nextData);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
        return;
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isVisualMode, targetData, valueKeys]);

  return animatedData;
};

const HealthStatusBar = () => (
  <View style={styles.healthStatusBar}>
    <Text style={styles.healthStatusTime}>9:41</Text>
    <View style={styles.healthStatusCluster}>
      <View style={styles.healthSignalBars}>
        <View style={[styles.healthSignalBar, styles.healthSignalBarShort]} />
        <View style={[styles.healthSignalBar, styles.healthSignalBarMid]} />
        <View style={styles.healthSignalBar} />
      </View>
      <Text style={styles.healthStatusText}>5G</Text>
      <View style={styles.healthBattery}>
        <View style={styles.healthBatteryFill} />
      </View>
    </View>
  </View>
);

const HealthRangeToggle = ({
  activeRange,
  onSelectRange,
  width
}: {
  activeRange: HealthRangeOption;
  onSelectRange: (range: HealthRangeOption) => void;
  width: number;
}) => {
  const activeIndex = Math.max(0, healthRangeOptions.indexOf(activeRange));
  const segmentWidth =
    (width - healthRangeSegmentGap * (healthRangeOptions.length - 1)) /
    healthRangeOptions.length;
  const segmentStride = segmentWidth + healthRangeSegmentGap;
  const highlightX = useRef(new Animated.Value(activeIndex * segmentStride))
    .current;
  const hasNativeLiquidGlass = supportsNativeLiquidGlass();

  useEffect(() => {
    const animation = Animated.spring(highlightX, {
      damping: 20,
      mass: 0.7,
      stiffness: 230,
      toValue: activeIndex * segmentStride,
      useNativeDriver: true
    });

    animation.start();

    return () => {
      animation.stop();
    };
  }, [activeIndex, highlightX, segmentStride]);

  const content = (
    <>
      {hasNativeLiquidGlass ? (
        <AnimatedGlassView
          colorScheme="light"
          glassEffectStyle={{
            animate: true,
            animationDuration: 0.18,
            style: "regular"
          }}
          isInteractive
          pointerEvents="none"
          style={[
            styles.healthRangeActiveGlass,
            {
              transform: [{ translateX: highlightX }],
              width: segmentWidth
            }
          ]}
          tintColor="rgba(255, 255, 255, 0.08)"
        >
          <View pointerEvents="none" style={styles.healthRangeActiveShine} />
        </AnimatedGlassView>
      ) : (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.healthRangeActiveGlass,
            {
              transform: [{ translateX: highlightX }],
              width: segmentWidth
            }
          ]}
        >
          <View pointerEvents="none" style={styles.healthRangeActiveShine} />
        </Animated.View>
      )}
      {healthRangeOptions.map((range) => {
        const isActive = range === activeRange;

        return (
          <Pressable
            key={range}
            accessibilityLabel={`Show ${range.toLowerCase()} health summary`}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            onPress={() => onSelectRange(range)}
            style={({ pressed }) => [
              styles.healthRangeButton,
              { width: segmentWidth },
              pressed && styles.healthPressedControl
            ]}
          >
            <Text
              numberOfLines={1}
              style={[
                styles.healthRangeButtonText,
                isActive && styles.healthRangeButtonTextActive
              ]}
            >
              {range}
            </Text>
          </Pressable>
        );
      })}
    </>
  );

  if (hasNativeLiquidGlass) {
    return (
      <GlassContainer
        spacing={healthRangeSegmentGap}
        style={[styles.healthRangeToggleDock, { width }]}
      >
        {content}
      </GlassContainer>
    );
  }

  return (
    <View style={[styles.healthRangeToggleDock, { width }]}>
      {content}
    </View>
  );
};

const HealthRingMetric = ({
  item
}: {
  item: HealthRingPoint;
}) => (
  <View style={styles.healthRingMetric}>
    <View style={styles.healthRingMetricHeader}>
      <View style={[styles.healthMetricDot, { backgroundColor: item.color }]} />
      <Text numberOfLines={1} style={styles.healthRingMetricLabel}>
        {item.metric}
      </Text>
    </View>
    <View style={styles.healthRingValueRow}>
      <Text numberOfLines={1} style={styles.healthRingMetricValue}>
        {item.value}
      </Text>
      <Text numberOfLines={1} style={styles.healthRingMetricTarget}>
        / {item.target}
      </Text>
    </View>
    <View style={styles.healthMetricTrack}>
      <View
        style={[
          styles.healthMetricFill,
          {
            backgroundColor: item.color,
            width: `${Math.round(clamp01(item.progress) * 100)}%`
          }
        ]}
      />
    </View>
  </View>
);

const HealthActivityAppScreen = ({
  isTakeoverMode = false,
  isVisualMode = false,
  width
}: NativeStoryProps) => {
  const [activeRange, setActiveRange] = useState<HealthRangeOption>("Week");
  const activeSummary = healthRangeSummaries[activeRange];
  const animatedRings = useAnimatedHealthRows({
    isVisualMode,
    targetData: activeSummary.rings,
    valueKeys: healthRingValueKeys
  });
  const animatedActivity = useAnimatedHealthRows({
    isVisualMode,
    targetData: activeSummary.activity,
    valueKeys: healthActivityValueKeys
  });
  const animatedCombined = useAnimatedHealthRows({
    isVisualMode,
    targetData: activeSummary.combined,
    valueKeys: healthCombinedValueKeys
  });
  const screenWidth = isTakeoverMode
    ? Math.max(280, width)
    : Math.max(280, Math.min(width, 430));
  const contentWidth = isTakeoverMode
    ? Math.max(280, Math.min(screenWidth - 32, 520))
    : Math.max(280, screenWidth - 24);
  const isCompactHealth = contentWidth < 350;
  const chartWidth = Math.max(246, contentWidth - 8);
  const ringSize = isCompactHealth ? 184 : 216;
  const rangeToggleWidth = Math.min(172, Math.max(150, contentWidth * 0.44));
  const ringAverage = Math.round(
    (animatedRings.reduce((total, item) => total + item.progress, 0) /
      animatedRings.length) *
      100
  );

  const content = (
    <View style={[styles.healthContent, { width: contentWidth }]}>
      {isTakeoverMode ? null : <HealthStatusBar />}

      <View style={styles.healthHeroPanel}>
        <View style={styles.healthPanelHeader}>
          <View>
            <Text style={styles.healthPanelKicker}>Activity</Text>
            <Text style={styles.healthPanelTitle}>Rings</Text>
          </View>
          <HealthRangeToggle
            activeRange={activeRange}
            onSelectRange={setActiveRange}
            width={rangeToggleWidth}
          />
        </View>

        <View
          style={[
            styles.healthRingLayout,
            isCompactHealth && styles.healthRingLayoutStacked
          ]}
        >
          <View style={styles.healthRingChartSlot}>
            <View style={{ height: ringSize, width: ringSize }}>
              <ProgressChart
                accessibilityLabel="Move exercise and stand activity rings"
                animation={false}
                backgroundRingColor="#edf1f7"
                colorKey="color"
                data={animatedRings}
                height={ringSize}
                hideLegend
                labelKey="metric"
                ringGap={7}
                strokeLinecap="round"
                strokeWidth={16}
                testID="landing-health-activity-rings"
                theme={healthChartTheme}
                valueKey="progress"
                width={ringSize}
              />
              <View pointerEvents="none" style={styles.healthRingCenterLabel}>
                <Text style={styles.healthRingCenterLabelText}>
                  {ringAverage}%
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.healthRingMetrics}>
            {animatedRings.map((item) => (
              <HealthRingMetric
                key={item.metric}
                item={item}
              />
            ))}
          </View>
        </View>
      </View>

      <View style={styles.healthCard}>
        <View style={styles.healthPanelHeader}>
          <View>
            <Text style={styles.healthPanelKicker}>
              {activeSummary.activityKicker}
            </Text>
            <Text style={styles.healthPanelTitle}>Activity load</Text>
          </View>
        </View>
        <BarChart
          accessibilityLabel="Weekly activity completion bar chart"
          barRadius={8}
          barWidthRatio={0.66}
          data={animatedActivity}
          formatYLabel={formatHealthPercent}
          height={180}
          legend={false}
          mode="grouped"
          series={[
            { yKey: "move", label: "Move", color: healthMoveColor },
            { yKey: "exercise", label: "Exercise", color: healthExerciseColor },
            { yKey: "stand", label: "Stand", color: healthStandColor }
          ]}
          showHorizontalGridLines
          showYAxisLabels={false}
          testID="landing-health-activity-bars"
          theme={healthChartTheme}
          width={chartWidth}
          xKey="day"
          yDomain={{ min: 0, max: 130, nice: true }}
        />
      </View>

      <View style={styles.healthCard}>
        <View style={styles.healthPanelHeader}>
          <View>
            <Text style={styles.healthPanelKicker}>
              {activeSummary.combinedKicker}
            </Text>
            <Text style={styles.healthPanelTitle}>Energy and heart rate</Text>
          </View>
        </View>
        <CombinedChart
          accessibilityLabel="Active energy and heart rate combined chart"
          barRadius={7}
          barWidthRatio={0.54}
          bars={[{ yKey: "energy", label: "Energy", color: healthEnergyColor }]}
          data={animatedCombined}
          formatLeftYLabel={formatHealthEnergy}
          formatRightYLabel={formatHeartRate}
          height={216}
          interaction="tap"
          leftYDomain={[0, 160]}
          legend={false}
          lines={[
            {
              yKey: "heartRate",
              label: "Heart rate",
              color: healthMoveColor,
              curve: "monotone",
              strokeWidth: 3.5
            }
          ]}
          rightYDomain={[50, 150]}
          showHorizontalGridLines
          testID="landing-health-activity-combined"
          theme={healthChartTheme}
          tooltip={{ width: 148 }}
          width={chartWidth}
          xKey="time"
        />
      </View>

    </View>
  );

  return (
    <View
      style={[
        styles.healthScreen,
        isTakeoverMode && styles.healthTakeoverScreen,
        { width: screenWidth }
      ]}
    >
      {isTakeoverMode ? (
        <ScrollView
          bounces
          contentContainerStyle={styles.healthTakeoverScrollContent}
          showsVerticalScrollIndicator={false}
          style={styles.healthTakeoverScroll}
        >
          {content}
        </ScrollView>
      ) : (
        <View>{content}</View>
      )}
    </View>
  );
};

export const landingDemoStories: ShowcaseStory[] = [
  {
    id: "landing-market-pulse-app",
    title: "Market Pulse App",
    Component: MarketPulseScreen,
    presentation: "takeover"
  },
  {
    id: "landing-code-contribution-app",
    title: "Code Contribution App",
    Component: CodeContributionScreen,
    presentation: "takeover"
  },
  {
    id: "landing-health-activity-app",
    title: "Native Health Activity App",
    Component: HealthActivityAppScreen,
    presentation: "takeover"
  },
  {
    id: "landing-trading-app",
    title: "Native Trading App",
    Component: TradingAppScreen,
    presentation: "takeover"
  },
  {
    id: "landing-website-analytics-app",
    title: "Website Analytics",
    Component: WebsiteAnalyticsScreen,
    presentation: "takeover"
  }
];

const styles = StyleSheet.create({
  healthBattery: {
    borderColor: "#11131a",
    borderRadius: 4,
    borderWidth: 1,
    height: 12,
    padding: 2,
    width: 24
  },
  healthBatteryFill: {
    backgroundColor: "#11131a",
    borderRadius: 2,
    flex: 1
  },
  healthCard: {
    backgroundColor: "transparent",
    borderRadius: 0,
    marginTop: 11,
    overflow: "hidden",
    paddingHorizontal: 2,
    paddingVertical: 2
  },
  healthContent: {
    alignSelf: "center",
    paddingBottom: 4,
    paddingTop: 10
  },
  healthHeroPanel: {
    backgroundColor: "transparent",
    borderRadius: 0,
    marginTop: 0,
    overflow: "hidden",
    paddingHorizontal: 2,
    paddingVertical: 3
  },
  healthMetricDot: {
    borderRadius: 4,
    height: 8,
    width: 8
  },
  healthMetricFill: {
    borderRadius: 99,
    height: "100%"
  },
  healthMetricTrack: {
    backgroundColor: "rgba(17, 19, 26, 0.08)",
    borderRadius: 99,
    height: 4,
    marginTop: 4,
    overflow: "hidden",
    width: "100%"
  },
  healthPanelHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5
  },
  healthPanelKicker: {
    color: "#7d8797",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0,
    textTransform: "uppercase"
  },
  healthPanelTitle: {
    color: "#11131a",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 0,
    marginTop: 2
  },
  healthPressedControl: {
    opacity: 0.68
  },
  healthRangeButton: {
    alignItems: "center",
    borderRadius: 999,
    height: 32,
    justifyContent: "center",
    zIndex: 3
  },
  healthRangeButtonText: {
    color: "rgba(17, 19, 26, 0.58)",
    fontSize: 11,
    fontWeight: "900",
    position: "relative",
    zIndex: 2
  },
  healthRangeButtonTextActive: {
    color: "#11131a"
  },
  healthRangeActiveGlass: {
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    borderColor: "rgba(255, 255, 255, 0.72)",
    borderRadius: 999,
    borderWidth: 1,
    bottom: 0,
    left: 0,
    overflow: "hidden",
    position: "absolute",
    shadowColor: "#30394a",
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 0.13,
    shadowRadius: 12,
    top: 0,
    zIndex: 1
  },
  healthRangeActiveShine: {
    backgroundColor: "rgba(255, 255, 255, 0.34)",
    borderRadius: 999,
    height: 8,
    left: 8,
    position: "absolute",
    right: 8,
    top: 3
  },
  healthRangeToggleDock: {
    alignSelf: "center",
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderRadius: 999,
    borderWidth: 0,
    flexDirection: "row",
    gap: healthRangeSegmentGap,
    height: 32,
    marginLeft: 12,
    overflow: "visible",
    padding: 0,
    shadowColor: "#465267",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    zIndex: 2
  },
  healthRingChartSlot: {
    alignItems: "center",
    justifyContent: "center"
  },
  healthRingCenterLabel: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0
  },
  healthRingCenterLabelText: {
    color: "#11131a",
    fontSize: 16,
    fontWeight: "900",
    lineHeight: 20
  },
  healthRingLayout: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between"
  },
  healthRingLayoutStacked: {
    alignItems: "stretch",
    flexDirection: "column"
  },
  healthRingMetric: {
    backgroundColor: "transparent",
    borderRadius: 0,
    paddingHorizontal: 0,
    paddingVertical: 3
  },
  healthRingMetricHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6
  },
  healthRingMetricLabel: {
    color: "#515a67",
    flexShrink: 1,
    fontSize: 11,
    fontWeight: "900"
  },
  healthRingMetricTarget: {
    color: "#8b95a5",
    flexShrink: 1,
    fontSize: 10,
    fontWeight: "800",
    marginLeft: 3
  },
  healthRingMetricValue: {
    color: "#11131a",
    fontSize: 15,
    fontWeight: "900"
  },
  healthRingMetrics: {
    flex: 1,
    gap: 3,
    minWidth: 148
  },
  healthRingValueRow: {
    alignItems: "flex-end",
    flexDirection: "row",
    marginTop: 2
  },
  healthScreen: {
    alignSelf: "center",
    backgroundColor: "#f4f7fb",
    borderColor: "#e8edf5",
    borderRadius: 30,
    borderWidth: 1,
    overflow: "hidden",
    paddingBottom: 14,
    paddingHorizontal: 12,
    paddingTop: 12,
    position: "relative",
    shadowColor: "#8b95a5",
    shadowOffset: { height: 18, width: 0 },
    shadowOpacity: 0.16,
    shadowRadius: 30
  },
  healthSignalBar: {
    backgroundColor: "#11131a",
    borderRadius: 2,
    height: 10,
    width: 4
  },
  healthSignalBarMid: {
    height: 8
  },
  healthSignalBarShort: {
    height: 6
  },
  healthSignalBars: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: 2
  },
  healthStatusBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8
  },
  healthStatusCluster: {
    alignItems: "center",
    flexDirection: "row",
    gap: 7
  },
  healthStatusText: {
    color: "#11131a",
    fontSize: 10,
    fontWeight: "900"
  },
  healthStatusTime: {
    color: "#11131a",
    fontSize: 13,
    fontWeight: "900"
  },
  healthTakeoverScreen: {
    alignSelf: "stretch",
    borderRadius: 0,
    borderWidth: 0,
    flex: 1,
    paddingBottom: 0,
    shadowOpacity: 0
  },
  healthTakeoverScroll: {
    flex: 1
  },
  healthTakeoverScrollContent: {
    alignItems: "center",
    paddingBottom: 22
  },
});
