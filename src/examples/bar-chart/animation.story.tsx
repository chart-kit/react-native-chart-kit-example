import { useEffect, useMemo, useState } from "react";
import { Pressable, Text } from "react-native";
import { BarChart } from "react-native-chart-kit/v2";
import {
  ChartSection,
  storyStyles,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../showcase/shared/storyPrimitives";

const animatedBarDuration = 1450;
const animatedBarStagger = 0.055;
type PipelinePoint = {
  stage: string;
  accounts: number;
};
const pipelineStart: PipelinePoint[] = [
  { stage: "Lead", accounts: 18 },
  { stage: "Trial", accounts: 12 },
  { stage: "Active", accounts: 8 },
  { stage: "Paid", accounts: 5 },
  { stage: "Retain", accounts: 4 },
];
const pipelineEnd: PipelinePoint[] = [
  { stage: "Lead", accounts: 82 },
  { stage: "Trial", accounts: 64 },
  { stage: "Active", accounts: 49 },
  { stage: "Paid", accounts: 34 },
  { stage: "Retain", accounts: 27 },
];
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
const V2AnimatedBar = ({ isVisualMode, width }: NativeStoryProps) => {
  const { data, replay } = useAnimatedBarRows({
    endData: pipelineEnd,
    isVisualMode,
    startData: pipelineStart,
    valueKeys: ["accounts"],
  });

  return (
    <ChartSection title="Pipeline conversion" kicker="Animated bars">
      <BarChart
        data={data}
        height={250}
        series={[{ yKey: "accounts", label: "Accounts" }]}
        width={width}
        xKey="stage"
        yDomain={{ min: 0, max: 90, nice: true }}
        formatYLabel={(value) => `${Math.round(value)}k`}
      />
      <ReplayButton isVisualMode={isVisualMode} replay={replay} />
    </ChartSection>
  );
};

// Teaching note: Keeps bar motion isolated to value transitions so layout does not jump.
export const animationStory: ShowcaseStory = {
  id: "v2-bar-animation",
  title: "Animated Bars",
  Component: V2AnimatedBar,
};
