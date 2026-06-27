import { useMemo, useRef, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import ViewShot, {
  captureRef,
  type CaptureOptions,
  type ViewShotRef,
} from "react-native-view-shot";

import {
  resolveCartesianChartThemeConfig,
  useChartKitTheme,
} from "react-native-chart-kit/v2";
import {
  CombinedChart,
  createChartExportController,
  renderCombinedChartSvg,
  type ChartExportResult,
  type ChartPngCaptureRef,
  type ChartShareAdapter,
} from "@chart-kit/pro/react-native";

import { revenueMargin } from "../../fixtures/v2Combined";
import type {
  NativeStoryProps,
  ShowcaseStory,
} from "../../showcase/shared/storyPrimitives";

type ExportStatus = {
  label: string;
  tone: "error" | "success";
};

const exportSvgHeight = 220;
const exportSvgWidth = 380;
const pngResultMode = Platform.OS === "web" ? "data-uri" : "tmpfile";

const formatCurrency = (value: number) => `$${Math.round(value)}k`;
const formatPercent = (value: number) => `${Math.round(value)}%`;

const webPreviewShare: ChartShareAdapter = () => ({
  action: "web-preview-share",
});

const getResultSummary = (result: ChartExportResult) => {
  if (result.format === "svg") {
    return `${result.fileName} · SVG ${result.svg.length} chars`;
  }

  if (result.uri) {
    return `${result.fileName} · PNG ${result.uri.slice(0, 42)}`;
  }

  return `${result.fileName} · PNG data URI ${result.dataUri?.length ?? 0} chars`;
};

const getCaptureOptions = (
  options: Parameters<ChartPngCaptureRef>[1],
): CaptureOptions => ({
  format: "png",
  result: options.result,
  ...(options.fileName ? { fileName: options.fileName } : {}),
  ...(options.height ? { height: options.height } : {}),
  ...(options.quality ? { quality: options.quality } : {}),
  ...(options.width ? { width: options.width } : {}),
});

const ExportWorkflowDemo = ({ width }: NativeStoryProps) => {
  const chartRef = useRef<ViewShotRef>(null);
  const chartKitTheme = useChartKitTheme();
  const resolvedTheme = useMemo(
    () => resolveCartesianChartThemeConfig(chartKitTheme),
    [chartKitTheme],
  );
  const [status, setStatus] = useState<ExportStatus>({
    label: "",
    tone: "success",
  });
  const demoWidth = Math.min(width, 430);
  const chartWidth = Math.max(demoWidth - 8, 280);
  const chartHeight = 300;
  const exportSvg = useMemo(
    () =>
      renderCombinedChartSvg({
        bars: [{ yKey: "revenue", label: "Revenue" }],
        data: revenueMargin,
        formatLeftYLabel: formatCurrency,
        formatRightYLabel: formatPercent,
        height: exportSvgHeight,
        leftYDomain: [0, "dataMax"],
        lines: [
          {
            yKey: "margin",
            label: "Margin",
            curve: "monotone",
            strokeWidth: 3.5,
          },
        ],
        rightYDomain: [0, 40],
        theme: resolvedTheme,
        title: "Revenue and margin",
        width: exportSvgWidth,
        xKey: "month",
      }),
    [resolvedTheme],
  );
  const controller = useMemo(
    () =>
      createChartExportController({
        captureRef: (target, options) =>
          captureRef(target as ViewShotRef, getCaptureOptions(options)),
        renderSvg: () => exportSvg,
        serializeSvg: () => exportSvg,
      }),
    [exportSvg],
  );

  const runExport = async (
    label: string,
    action: () => Promise<ChartExportResult | unknown>,
  ) => {
    try {
      const result = await action();

      setStatus({
        label:
          result && typeof result === "object" && "format" in result
            ? `${label}: ${getResultSummary(result as ChartExportResult)}`
            : `${label}: opened share sheet`,
        tone: "success",
      });
    } catch (error) {
      setStatus({
        label: `${label}: ${
          error instanceof Error ? error.message : "export failed"
        }`,
        tone: "error",
      });
    }
  };

  const exportPng = () =>
    runExport("PNG snapshot", () =>
      controller.snapshot({
        fileName: "revenue-margin.png",
        format: "png",
        height: chartHeight,
        quality: 1,
        result: pngResultMode,
        target: chartRef,
        width: chartWidth,
      }),
    );

  const exportSvgSnapshot = () =>
    runExport("SVG snapshot", () =>
      controller.snapshot({
        fileName: "revenue-margin.svg",
        format: "svg",
        height: exportSvgHeight,
        target: revenueMargin,
        width: exportSvgWidth,
      }),
    );

  const sharePng = () =>
    runExport("Share PNG", async () => {
      const result = await controller.snapshot({
        fileName: "revenue-margin.png",
        format: "png",
        height: chartHeight,
        quality: 1,
        result: pngResultMode,
        target: chartRef,
        width: chartWidth,
      });

      return controller.share({
        message: "Revenue and margin chart",
        result,
        ...(Platform.OS === "web" ? { share: webPreviewShare } : {}),
        title: "Revenue and margin",
      });
    });

  const exportHeadlessSvg = () =>
    runExport("Headless SVG", () =>
      controller.exportHeadless({
        fileName: "revenue-margin-headless.svg",
        format: "svg",
        height: exportSvgHeight,
        width: exportSvgWidth,
      }),
    );

  const isDark = chartKitTheme.mode === "dark";

  return (
    <View style={[styles.root, { width: demoWidth }]}>
      <ViewShot
        ref={chartRef}
        options={{
          format: "png",
          quality: 1,
          result: pngResultMode,
        }}
        style={[
          styles.captureSurface,
          {
            backgroundColor: resolvedTheme.background,
          },
        ]}
      >
        <CombinedChart
          bars={[{ yKey: "revenue", label: "Revenue" }]}
          data={revenueMargin}
          formatLeftYLabel={formatCurrency}
          formatRightYLabel={formatPercent}
          height={chartHeight}
          leftYDomain={[0, "dataMax"]}
          lines={[
            {
              yKey: "margin",
              label: "Margin",
              curve: "monotone",
              strokeWidth: 3.5,
            },
          ]}
          rightYDomain={[0, 40]}
          width={chartWidth}
          xKey="month"
        />
      </ViewShot>

      <View style={styles.actions}>
        <ExportButton label="PNG" onPress={exportPng} />
        <ExportButton label="SVG" onPress={exportSvgSnapshot} />
        <ExportButton label="Share" onPress={sharePng} />
        <ExportButton label="Headless" onPress={exportHeadlessSvg} />
      </View>

      {status.label ? (
        <Text
          style={[
            styles.status,
            {
              color:
                status.tone === "error"
                  ? isDark
                    ? "#fca5a5"
                    : "#b91c1c"
                  : resolvedTheme.mutedText,
            },
          ]}
        >
          {status.label}
        </Text>
      ) : null}
    </View>
  );
};

const ExportButton = ({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) => (
  <Pressable
    accessibilityRole="button"
    onPress={onPress}
    style={({ pressed }) => [
      styles.button,
      pressed ? styles.buttonPressed : null,
    ]}
  >
    <Text style={styles.buttonText}>{label}</Text>
  </Pressable>
);

export const exportWorkflowStories: ShowcaseStory[] = [
  {
    id: "pro-export-workflow",
    title: "Export Image Demo",
    Component: ExportWorkflowDemo,
  },
];

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#0f172a",
    borderRadius: 8,
    minHeight: 34,
    minWidth: 76,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  buttonPressed: {
    opacity: 0.72,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "800",
  },
  captureSurface: {
    overflow: "hidden",
  },
  root: {
    alignSelf: "center",
  },
  status: {
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 17,
    marginTop: 10,
  },
});
