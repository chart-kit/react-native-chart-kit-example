import * as React from "react";

type MockGesture = Record<string, (...args: unknown[]) => MockGesture>;

const createGesture = (): MockGesture => {
  const gesture: MockGesture = {};
  const methods = [
    "activateAfterLongPress",
    "activeOffsetX",
    "activeOffsetY",
    "enabled",
    "maxDistance",
    "maxDuration",
    "maxPointers",
    "minDuration",
    "minPointers",
    "numberOfPointers",
    "onEnd",
    "onFinalize",
    "onStart",
    "onUpdate",
    "runOnJS",
  ];

  for (const method of methods) {
    gesture[method] = () => gesture;
  }

  return gesture;
};

export const Gesture = {
  LongPress: createGesture,
  Pan: createGesture,
  Race: (..._gestures: unknown[]) => createGesture(),
  Simultaneous: (..._gestures: unknown[]) => createGesture(),
  Tap: createGesture,
};

export const GestureDetector = ({
  children,
}: {
  children?: React.ReactNode;
}) => <>{children}</>;
