import { useEffect, useMemo, useState } from "react";
import { Pressable, Text } from "react-native";
import { BarChart } from "react-native-chart-kit/v2";
import { acquisitionByChannel } from "../../fixtures/v2Bar";
import {
  ChartSection,
  storyStyles,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../showcase/shared/storyPrimitives";

const formatThousands = (value: number) => `${value}k`;
const animatedBarDuration = 1450;
const animatedBarStagger = 0.055;
const channelStart = acquisitionByChannel.map((point) => ({
  ...point,
  organic: Math.round(point.organic * 0.48),
  paid: Math.round(point.paid * 0.42),
}));
const channelEnd = acquisitionByChannel.map((point, index) => ({
  ...point,
  organic: point.organic + index * 2,
  paid: point.paid + index * 3 + 4,
}));
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
const useAnimatedBarRows = <TData extends Record<string, unknown>>({
  duration = animatedBarDuration,
  endData,
  isVisualMode,
  startData,
  valueKeys,
}: {
  duration?: number;
  endData: TData[];
  isVisualMode?: boolean;
  startData: TData[];
  valueKeys: Array<keyof TData & string>;
}) => {
  const [progress, setProgress] = useState(isVisualMode ? 1 : 0);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    if (isVisualMode) {
      return undefined;
    }

    let frameId = 0;
    let startTime: number | undefined;

    const tick = (timestamp: number) => {
      startTime ??= timestamp;

      const elapsed = timestamp - startTime;
      const nextProgress = clamp01(elapsed / duration);
      setProgress(nextProgress);

      if (nextProgress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [duration, isVisualMode, runId]);

  const data = useMemo(
    () =>
      endData.map((target, index) => {
        const start = startData[index] ?? target;
        const delay = index * animatedBarStagger;
        const localProgress = smootherStep((progress - delay) / (1 - delay));
        const row = { ...target };

        valueKeys.forEach((key) => {
          row[key] = interpolate(
            Number(start[key] ?? 0),
            Number(target[key] ?? 0),
            localProgress,
          ) as TData[typeof key];
        });

        return row;
      }),
    [endData, progress, startData, valueKeys],
  );

  return {
    data,
    replay: () => setRunId((currentRunId) => currentRunId + 1),
  };
};
const ReplayButton = ({
  isVisualMode,
  replay,
}: {
  isVisualMode?: boolean;
  replay: () => void;
}) =>
  isVisualMode ? null : (
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
  );
const V2AnimatedGroupedBar = ({ isVisualMode, width }: NativeStoryProps) => {
  const { data, replay } = useAnimatedBarRows({
    endData: channelEnd,
    isVisualMode,
    startData: channelStart,
    valueKeys: ["organic", "paid"],
  });

  return (
    <ChartSection title="Channel lift" kicker="Animated grouped bars">
      <BarChart
        data={data}
        height={276}
        mode="grouped"
        series={[
          { yKey: "organic", label: "Organic" },
          { yKey: "paid", label: "Paid" },
        ]}
        width={width}
        xKey="month"
        yDomain={{ min: 0, max: 90, nice: true }}
        formatYLabel={formatThousands}
      />
      <ReplayButton isVisualMode={isVisualMode} replay={replay} />
    </ChartSection>
  );
};

// Teaching note: Animates grouped bars while preserving category ordering.
export const groupedAnimationStory: ShowcaseStory = {
  id: "v2-bar-grouped-animation",
  title: "Animated Grouped",
  Component: V2AnimatedGroupedBar,
};
