import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import {
  Platform,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

type ActiveTouch = {
  id: string;
  x: number;
  y: number;
};

type TraceGestureTouch = {
  absoluteX: number;
  absoluteY: number;
  id: number;
};

type TraceGestureEvent = {
  allTouches: TraceGestureTouch[];
  numberOfTouches: number;
};

type TracePoint = {
  id?: string;
  x: number;
  y: number;
};

type TouchTraceContextValue = {
  clearTrace: () => void;
  enabled: boolean;
  scheduleClearTrace: () => void;
  setTracePoint: (point: TracePoint) => void;
};

const touchSize = 46;
const touchOffsetX = -5;
const touchOffsetY = -7;
const traceCancelClearDelayMs = 900;
const defaultTraceContext: TouchTraceContextValue = {
  clearTrace: () => undefined,
  enabled: false,
  scheduleClearTrace: () => undefined,
  setTracePoint: () => undefined
};

const TouchTraceContext =
  React.createContext<TouchTraceContextValue>(defaultTraceContext);

export const useTouchTrace = () => useContext(TouchTraceContext);

const getActiveTouches = (event: TraceGestureEvent): ActiveTouch[] =>
  event.allTouches
    .slice(0, Math.max(0, event.numberOfTouches))
    .map((touch) => ({
      id: String(touch.id),
      x: touch.absoluteX,
      y: touch.absoluteY
    }));

const getDocumentTouches = (event: TouchEvent): ActiveTouch[] =>
  Array.from(event.touches).map((touch) => ({
    id: String(touch.identifier),
    x: touch.pageX,
    y: touch.pageY
  }));

const isTracePointer = (event: PointerEvent) =>
  event.pointerType === "touch" || event.pointerType === "pen";

export const TouchTraceSurface = ({
  children,
  enabled,
  style
}: {
  children: React.ReactNode;
  enabled: boolean;
  style?: StyleProp<ViewStyle>;
}) => {
  const [touches, setTouches] = useState<ActiveTouch[]>([]);
  const activePointersRef = useRef<Map<number, ActiveTouch>>(new Map());
  const clearTraceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const cancelScheduledClear = useCallback(() => {
    if (clearTraceTimeoutRef.current) {
      clearTimeout(clearTraceTimeoutRef.current);
      clearTraceTimeoutRef.current = null;
    }
  }, []);

  const updateTouches = useCallback(
    (event: TraceGestureEvent) => {
      if (enabled) {
        cancelScheduledClear();
        setTouches(getActiveTouches(event));
      }
    },
    [cancelScheduledClear, enabled]
  );

  const clearTouches = useCallback(() => {
    cancelScheduledClear();
    activePointersRef.current.clear();
    setTouches([]);
  }, [cancelScheduledClear]);

  const scheduleClearTouches = useCallback(() => {
    cancelScheduledClear();
    clearTraceTimeoutRef.current = setTimeout(() => {
      activePointersRef.current.clear();
      setTouches([]);
      clearTraceTimeoutRef.current = null;
    }, traceCancelClearDelayMs);
  }, [cancelScheduledClear]);

  const setTracePoint = useCallback(
    ({ id = "external", x, y }: TracePoint) => {
      if (!enabled || !Number.isFinite(x) || !Number.isFinite(y)) {
        return;
      }

      cancelScheduledClear();
      activePointersRef.current.clear();
      setTouches([{ id, x, y }]);
    },
    [cancelScheduledClear, enabled]
  );

  const traceContextValue = useMemo(
    () => ({
      clearTrace: clearTouches,
      enabled,
      scheduleClearTrace: scheduleClearTouches,
      setTracePoint
    }),
    [clearTouches, enabled, scheduleClearTouches, setTracePoint]
  );

  useEffect(() => {
    if (!enabled) {
      clearTouches();
    }
  }, [clearTouches, enabled]);

  useEffect(() => {
    if (Platform.OS !== "web" || !enabled || typeof document === "undefined") {
      return undefined;
    }

    const updatePointerTouches = (event: PointerEvent) => {
      if (!isTracePointer(event)) {
        return;
      }

      cancelScheduledClear();
      activePointersRef.current.set(event.pointerId, {
        id: String(event.pointerId),
        x: event.pageX,
        y: event.pageY
      });
      setTouches(Array.from(activePointersRef.current.values()));
    };
    const clearPointerTouch = (event: PointerEvent) => {
      if (!isTracePointer(event)) {
        return;
      }

      activePointersRef.current.delete(event.pointerId);
      setTouches(Array.from(activePointersRef.current.values()));
    };
    const cancelPointerTouch = (event: PointerEvent) => {
      if (!isTracePointer(event)) {
        return;
      }

      activePointersRef.current.delete(event.pointerId);
      scheduleClearTouches();
    };
    const updateDocumentTouches = (event: TouchEvent) => {
      cancelScheduledClear();
      setTouches(getDocumentTouches(event));
    };
    const cancelDocumentTouches = () => scheduleClearTouches();
    const options = { capture: true, passive: true };

    if (typeof window !== "undefined" && "PointerEvent" in window) {
      document.addEventListener("pointerdown", updatePointerTouches, options);
      document.addEventListener("pointermove", updatePointerTouches, options);
      document.addEventListener("pointerup", clearPointerTouch, options);
      document.addEventListener("pointercancel", cancelPointerTouch, options);
      window.addEventListener("pointermove", updatePointerTouches, options);
      window.addEventListener(
        "pointerrawupdate",
        updatePointerTouches,
        options
      );
    }

    document.addEventListener("touchstart", updateDocumentTouches, options);
    document.addEventListener("touchmove", updateDocumentTouches, options);
    document.addEventListener("touchend", updateDocumentTouches, options);
    document.addEventListener("touchcancel", cancelDocumentTouches, options);

    return () => {
      activePointersRef.current.clear();
      cancelScheduledClear();

      if (typeof window !== "undefined" && "PointerEvent" in window) {
        document.removeEventListener(
          "pointerdown",
          updatePointerTouches,
          options
        );
        document.removeEventListener(
          "pointermove",
          updatePointerTouches,
          options
        );
        document.removeEventListener("pointerup", clearPointerTouch, options);
        document.removeEventListener(
          "pointercancel",
          cancelPointerTouch,
          options
        );
        window.removeEventListener(
          "pointermove",
          updatePointerTouches,
          options
        );
        window.removeEventListener(
          "pointerrawupdate",
          updatePointerTouches,
          options
        );
      }

      document.removeEventListener("touchstart", updateDocumentTouches, options);
      document.removeEventListener("touchmove", updateDocumentTouches, options);
      document.removeEventListener("touchend", updateDocumentTouches, options);
      document.removeEventListener(
        "touchcancel",
        cancelDocumentTouches,
        options
      );
    };
  }, [cancelScheduledClear, enabled, scheduleClearTouches]);

  const touchTraceGesture = useMemo(
    () =>
      Gesture.Manual()
        .enabled(enabled)
        .runOnJS(true)
        .cancelsTouchesInView(false)
        .onTouchesDown(updateTouches)
        .onTouchesMove(updateTouches)
        .onTouchesUp(updateTouches)
        .onTouchesCancelled(scheduleClearTouches),
    [enabled, scheduleClearTouches, updateTouches]
  );

  return (
    <TouchTraceContext.Provider value={traceContextValue}>
      <GestureDetector gesture={touchTraceGesture}>
        <View
          onTouchCancel={scheduleClearTouches}
          style={[styles.surface, style]}
        >
          {children}
          {enabled ? (
            <View pointerEvents="none" style={StyleSheet.absoluteFill}>
              {touches.map((touch) => (
                <View
                  key={touch.id}
                  style={[
                    styles.touchHalo,
                    {
                      left: touch.x - touchSize / 2 + touchOffsetX,
                      top: touch.y - touchSize / 2 + touchOffsetY
                    }
                  ]}
                />
              ))}
            </View>
          ) : null}
        </View>
      </GestureDetector>
    </TouchTraceContext.Provider>
  );
};

const styles = StyleSheet.create({
  surface: {
    flex: 1
  },
  touchHalo: {
    backgroundColor: "rgba(148, 163, 184, 0.28)",
    borderRadius: touchSize / 2,
    height: touchSize,
    position: "absolute",
    shadowColor: "rgba(15, 23, 42, 0.34)",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.36,
    shadowRadius: 12,
    width: touchSize,
    zIndex: 1000
  }
});
