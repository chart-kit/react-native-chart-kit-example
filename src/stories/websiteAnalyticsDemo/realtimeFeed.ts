import { useEffect, useMemo, useState } from "react";

import { createRealtimeMinuteRows } from "./data";

const realtimeUpdateMs = 2000;
export const realtimeAnimationMs = realtimeUpdateMs;

export const useRealtimeFeed = (isVisualMode?: boolean) => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (isVisualMode) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setTick((currentTick) => currentTick + 1);
    }, realtimeUpdateMs);

    return () => clearInterval(intervalId);
  }, [isVisualMode]);

  return useMemo(
    () => ({
      rows: createRealtimeMinuteRows(tick),
      tick
    }),
    [tick]
  );
};
