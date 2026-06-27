import { useMemo, useState } from "react";
import { Text, View } from "react-native";

import { proCartesianChartPresets } from "@chart-kit/pro/react-native";
import {
  ContributionGraph,
  DonutChart,
  resolveCartesianChartThemeConfig,
  useChartKitTheme,
  type CartesianChartTheme,
  type ContributionGraphDayPressEvent,
} from "react-native-chart-kit/v2";

import type { NativeStoryProps } from "../../../showcase/shared/storyPrimitives";
import {
  repoContributionEndDate,
  repoContributions,
  repoLanguages,
  type RepoContributionDay,
} from "./data";
import { styles, uiFontFamily } from "./styles";

const repoChartPreset = "pro-product-pulse";
const contributionDays = 182;
const chartCardPadding = 12;
const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatLanguagePercent = (value: number) =>
  `${Number.isInteger(value) ? value : value.toFixed(1)}%`;

const formatContributionDateLabel = (dateKey: string) => {
  const [year, month, day] = dateKey.split("-").map(Number);

  if (!year || !month || !day) {
    return dateKey;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
};

const formatCommitLabel = (commits: number) =>
  `${commits} ${commits === 1 ? "commit" : "commits"}`;

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const createRepoChartTheme = ({
  isDark,
  mutedText,
  text,
}: {
  isDark: boolean;
  mutedText: string;
  text: string;
}): CartesianChartTheme => ({
  background: "transparent",
  plotBackground: "transparent",
  grid: isDark ? "#22334e" : "#dce6f5",
  axis: isDark ? "#334967" : "#c9d4e8",
  text,
  mutedText,
  series: repoLanguages.map((language) => language.color),
  typography: {
    ...(uiFontFamily ? { fontFamily: uiFontFamily } : {}),
    axisLabelSize: 10,
    legendLabelSize: 11,
  },
  tooltip: {
    background: isDark ? "#111d30" : "#0d1728",
    border: isDark ? "#3b5b86" : "#2f4f78",
    text: "#f8fbff",
    mutedText: isDark ? "#adc0d8" : "#bdc9db",
  },
});

export const CodeContributionScreen = ({
  isTakeoverMode = false,
  width,
}: NativeStoryProps) => {
  const chartKitTheme = useChartKitTheme();
  const presetRegistry = useMemo(
    () => ({
      ...proCartesianChartPresets,
      ...chartKitTheme.presets,
    }),
    [chartKitTheme.presets],
  );
  const resolvedTheme = useMemo(
    () =>
      resolveCartesianChartThemeConfig({
        mode: chartKitTheme.mode,
        preset: repoChartPreset,
        presets: presetRegistry,
        theme: chartKitTheme.theme,
      }),
    [chartKitTheme.mode, chartKitTheme.theme, presetRegistry],
  );
  const isDark = chartKitTheme.mode === "dark";
  const chartTheme = useMemo(
    () =>
      createRepoChartTheme({
        isDark,
        mutedText: resolvedTheme.mutedText,
        text: resolvedTheme.text,
      }),
    [isDark, resolvedTheme.mutedText, resolvedTheme.text],
  );
  const [selectedContributionDate, setSelectedContributionDate] = useState(
    repoContributions[repoContributions.length - 3]?.date ??
      repoContributionEndDate,
  );
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(0);
  const screenWidth = isTakeoverMode
    ? Math.max(280, width)
    : Math.max(280, Math.min(width, 430));
  const contentWidth = isTakeoverMode
    ? Math.max(280, Math.min(screenWidth - 24, 720))
    : Math.max(280, screenWidth - 24);
  const chartWidth = Math.max(240, contentWidth - chartCardPadding * 2);
  const visibleContributions = useMemo(
    () => repoContributions.slice(-contributionDays),
    [],
  );
  const selectedContribution = useMemo(
    () =>
      visibleContributions.find(
        (contribution) => contribution.date === selectedContributionDate,
      ),
    [selectedContributionDate, visibleContributions],
  );
  const selectedLanguage =
    repoLanguages[selectedLanguageIndex] ?? repoLanguages[0];
  const heatmapGutter = 1.5;
  const heatmapWeeks = Math.ceil((contributionDays + 6) / 7);
  const heatmapCellSize = clamp(
    (chartWidth - 34 - (heatmapWeeks - 1) * heatmapGutter) / heatmapWeeks,
    8,
    12,
  );
  const heatmapHeight = 24 + heatmapCellSize * 7 + heatmapGutter * 6 + 12;
  const donutSize = Math.min(224, Math.max(208, chartWidth * 0.62));
  const heatmapPalette = isDark
    ? ["#173154", "#1e5f8f", "#2786c7", "#2dd4bf", "#a7f3d0"]
    : ["#cfe2ff", "#96c6ff", "#5aa7f5", "#12a594", "#047857"];
  const emptyCellColor = isDark ? "#111d30" : "#edf3fb";
  const selectedCellColor = isDark ? "#eef6ff" : "#0d1728";
  const panelFill = isDark ? "#07101d" : "#f3f6fb";
  const cardFill = isDark ? "#0b1728" : "#ffffff";
  const cardBorder = isDark ? "#1f3553" : "#dde7f3";
  const cardShadow = isDark ? "#020711" : "#9aa9bd";

  const handleContributionPress = (
    event: ContributionGraphDayPressEvent<RepoContributionDay>,
  ) => {
    if (event.index >= 0) {
      setSelectedContributionDate(formatDateKey(event.date));
    }
  };

  return (
    <View
      style={[
        styles.screen,
        {
          backgroundColor: panelFill,
          width: screenWidth,
        },
      ]}
    >
      <View style={[styles.content, { width: contentWidth }]}>
        <View
          style={[
            styles.chartCard,
            {
              backgroundColor: cardFill,
              borderColor: cardBorder,
              shadowColor: cardShadow,
            },
          ]}
        >
          <View style={styles.chartHeader}>
            <Text
              numberOfLines={1}
              style={[styles.chartTitle, { color: resolvedTheme.mutedText }]}
            >
              Contributions
            </Text>
            <Text
              numberOfLines={1}
              style={[
                styles.selectedContributionMeta,
                { color: resolvedTheme.text },
              ]}
            >
              {formatContributionDateLabel(selectedContributionDate)} ·{" "}
              {formatCommitLabel(selectedContribution?.commits ?? 0)}
            </Text>
          </View>
          <ContributionGraph
            accessibilityLabel="Selectable contribution heatmap for chart-kit"
            activeCell={{
              date: selectedContributionDate,
              scale: 1.2,
              strokeColor: panelFill,
              strokeWidth: 2,
            }}
            cellSize={heatmapCellSize}
            colorForValue={({ cell, valueMax }) => {
              if (formatDateKey(cell.date) === selectedContributionDate) {
                return selectedCellColor;
              }

              if (
                !cell.defined ||
                cell.value === null ||
                cell.value <= 0 ||
                valueMax <= 0
              ) {
                return emptyCellColor;
              }

              const colorIndex = clamp(
                Math.ceil((cell.value / valueMax) * heatmapPalette.length) - 1,
                0,
                heatmapPalette.length - 1,
              );

              return heatmapPalette[colorIndex] ?? heatmapPalette[0];
            }}
            emptyColor={emptyCellColor}
            endDate={repoContributionEndDate}
            getMonthLabel={(monthIndex, date) =>
              date.getDate() === 1 ? (monthLabels[monthIndex] ?? "") : ""
            }
            getWeekdayLabel={(dayIndex) => {
              const label = weekdayLabels[dayIndex] ?? "";

              return label === "Sun" || label === "Tue" || label === "Thu"
                ? ""
                : label;
            }}
            gutterSize={heatmapGutter}
            height={heatmapHeight}
            interaction={{
              mode: "pressAndDrag",
              pointerOffset: { x: -6, y: -6 },
            }}
            numDays={contributionDays}
            onDayPress={handleContributionPress}
            preset={repoChartPreset}
            testID="landing-code-contribution-heatmap"
            theme={chartTheme}
            values={visibleContributions}
            weekStartsOn={0}
            width={chartWidth}
          />
        </View>

        <View
          style={[
            styles.chartCard,
            styles.languageCard,
            {
              backgroundColor: cardFill,
              borderColor: cardBorder,
              shadowColor: cardShadow,
            },
          ]}
        >
          <View style={styles.chartHeader}>
            <Text
              numberOfLines={1}
              style={[styles.chartTitle, { color: resolvedTheme.mutedText }]}
            >
              Languages
            </Text>
          </View>
          <DonutChart
            accessibilityLabel="Selectable language usage donut chart"
            activeSlice={{
              activeOffset: 8,
              activeScale: 1.035,
              inactiveOpacity: 0.58,
              strokeColor: panelFill,
              strokeWidth: 2,
            }}
            centerLabel={({ selectedArc, theme }) => (
              <View style={styles.donutCenter}>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.donutCenterValue,
                    { color: selectedArc?.color ?? theme.text },
                  ]}
                >
                  {formatLanguagePercent(
                    Number(
                      selectedArc?.raw?.percent ?? selectedLanguage.percent,
                    ),
                  )}
                </Text>
                <Text
                  numberOfLines={2}
                  style={[styles.donutCenterLabel, { color: theme.mutedText }]}
                >
                  {String(
                    selectedArc?.raw?.language ?? selectedLanguage.language,
                  )}
                </Text>
              </View>
            )}
            colorKey="color"
            data={repoLanguages}
            formatPercentage={(percentage) =>
              formatLanguagePercent(percentage * 100)
            }
            formatValue={(value) => formatLanguagePercent(value)}
            height={donutSize}
            innerRadiusRatio={0.62}
            interaction={{
              mode: "tap",
              onSelect: (event) => setSelectedLanguageIndex(event.index),
            }}
            labelKey="language"
            legend={false}
            preset={repoChartPreset}
            selectedIndex={selectedLanguageIndex}
            selectionAnimation={{ duration: 180 }}
            sliceSeparator={{
              color: panelFill,
              opacity: 1,
              visible: true,
              width: 2,
            }}
            testID="landing-code-contribution-languages"
            theme={chartTheme}
            valueKey="percent"
            width={donutSize}
          />
        </View>
      </View>
    </View>
  );
};
