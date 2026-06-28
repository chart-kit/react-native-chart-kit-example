import { useEffect, useMemo, useState } from "react";
import { Pressable, Text } from "react-native";
import { LineChart } from "react-native-chart-kit/v2";
import {
  ChartSection,
  storyStyles,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";

type AnimatedPreviewPoint = {
  month: string;
  actual: number;
  forecast: number;
};
const animationStartData: AnimatedPreviewPoint[] = [
  { month: "Jan", actual: 22, forecast: 20 },
  { month: "Feb", actual: 23, forecast: 22 },
  { month: "Mar", actual: 24, forecast: 23 },
  { month: "Apr", actual: 25, forecast: 24 },
  { month: "May", actual: 27, forecast: 25 },
  { month: "Jun", actual: 28, forecast: 27 },
  { month: "Jul", actual: 29, forecast: 28 },
];
const animationEndData: AnimatedPreviewPoint[] = [
  { month: "Jan", actual: 22, forecast: 20 },
  { month: "Feb", actual: 31, forecast: 26 },
  { month: "Mar", actual: 28, forecast: 31 },
  { month: "Apr", actual: 47, forecast: 38 },
  { month: "May", actual: 53, forecast: 44 },
  { month: "Jun", actual: 62, forecast: 51 },
  { month: "Jul", actual: 76, forecast: 57 },
];
const animationPreviewDuration = 1850;
const animationPreviewPointDelay = 0.04;
const animationPreviewYMax = 84;
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
const useAnimatedPreviewData = (isVisualMode?: boolean) => {
  const [progress, setProgress] = useState(isVisualMode ? 1 : 0);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    if (isVisualMode) {
      return;
    }

    let frameId = 0;
    let startTime: number | undefined;

    const tick = (timestamp: number) => {
      startTime ??= timestamp;

      const elapsed = timestamp - startTime;
      const nextProgress = clamp01(elapsed / animationPreviewDuration);
      setProgress(nextProgress);

      if (nextProgress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isVisualMode, runId]);

  const data = useMemo(
    () =>
      animationEndData.map((target, index) => {
        const start = animationStartData[index];
        const delay = index * animationPreviewPointDelay;
        const localProgress = smootherStep((progress - delay) / (1 - delay));

        return {
          month: target.month,
          actual: interpolate(start.actual, target.actual, localProgress),
          forecast: interpolate(start.forecast, target.forecast, localProgress),
        };
      }),
    [progress],
  );

  return {
    data,
    replay: () => setRunId((currentRunId) => currentRunId + 1),
  };
};
const V2LineAnimation = ({ isVisualMode, width }: NativeStoryProps) => {
  const { data, replay } = useAnimatedPreviewData(isVisualMode);

  return (
    <ChartSection title="Portfolio growth" kicker="Pro animation preview">
      <LineChart
        data={data}
        xKey="month"
        width={width}
        height={248}
        curve="monotone"
        area
        showDots={false}
        yDomain={[0, animationPreviewYMax]}
        formatYLabel={(value) => `$${Math.round(value)}k`}
        series={[
          { yKey: "actual", label: "Portfolio", strokeWidth: 3 },
          { yKey: "forecast", label: "Benchmark", strokeWidth: 2 },
        ]}
      />
      {isVisualMode ? null : (
        <Pressable
          accessibilityRole="button"
          onPress={replay}
          style={({ pressed }) => [
            storyStyles.replayButton,
            pressed && storyStyles.replayButtonPressed,
          ]}
        >
          <Text style={storyStyles.replayButtonText}>Replay</Text>
        </Pressable>
      )}
    </ChartSection>
  );
};

// Teaching note: Keeps animation deterministic in visual mode so screenshot tests remain stable.
export const lineAnimationStory: ShowcaseStory = {
  id: "v2-line-animation",
  title: "Line Animation",
  Component: V2LineAnimation,
};
