import { useCallback, useMemo } from "react";

import {
  CandlestickChart as BaseCandlestickChart,
  type CandlestickChartInteractionConfig,
  type CandlestickChartProps,
  type CandlestickChartRangeSelectorConfig,
  type CandlestickChartSelectEvent,
  type CandlestickChartViewportInteractionConfig
} from "@chart-kit/pro";

import { useTouchTrace } from "./TouchTraceSurface";

export * from "@chart-kit/pro";

const tracePointId = "candlestick-crosshair";

export const CandlestickChart = <TData extends Record<string, unknown>>(
  props: CandlestickChartProps<TData>
) => {
  const touchTrace = useTouchTrace();
  const { interaction, rangeSelector, viewportInteraction } = props;

  const traceSelect = useCallback(
    (event: CandlestickChartSelectEvent<TData>) => {
      if (event.pointer?.page) {
        touchTrace.setTracePoint({
          id: tracePointId,
          x: event.pointer.page.x,
          y: event.pointer.page.y
        });
      }
    },
    [touchTrace]
  );
  const traceEnd = useCallback(() => {
    touchTrace.scheduleClearTrace();
  }, [touchTrace]);

  const tracedInteraction = useMemo(() => {
    if (!touchTrace.enabled || typeof interaction !== "object") {
      return interaction;
    }

    const config = interaction as CandlestickChartInteractionConfig<TData>;

    return {
      ...config,
      onGestureEnd: () => {
        config.onGestureEnd?.();
        traceEnd();
      },
      onSelect: (event: CandlestickChartSelectEvent<TData>) => {
        traceSelect(event);
        config.onSelect?.(event);
      }
    };
  }, [interaction, touchTrace.enabled, traceEnd, traceSelect]);

  const tracedRangeSelector = useMemo(() => {
    if (!touchTrace.enabled || typeof rangeSelector !== "object") {
      return rangeSelector;
    }

    const config = rangeSelector as CandlestickChartRangeSelectorConfig;

    return {
      ...config,
      onGestureEnd: (
        event: Parameters<NonNullable<typeof config.onGestureEnd>>[0]
      ) => {
        config.onGestureEnd?.(event);
        traceEnd();
      }
    };
  }, [rangeSelector, touchTrace.enabled, traceEnd]);

  const tracedViewportInteraction = useMemo(() => {
    if (!touchTrace.enabled || typeof viewportInteraction !== "object") {
      return viewportInteraction;
    }

    const config =
      viewportInteraction as CandlestickChartViewportInteractionConfig;

    return {
      ...config,
      onGestureEnd: (
        event: Parameters<NonNullable<typeof config.onGestureEnd>>[0]
      ) => {
        config.onGestureEnd?.(event);
        traceEnd();
      }
    };
  }, [viewportInteraction, touchTrace.enabled, traceEnd]);

  return (
    <BaseCandlestickChart
      {...props}
      interaction={tracedInteraction}
      rangeSelector={tracedRangeSelector}
      viewportInteraction={tracedViewportInteraction}
    />
  );
};
