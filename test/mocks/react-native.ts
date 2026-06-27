import * as React from "react";

type MockProps = {
  children?: React.ReactNode;
  [key: string]: unknown;
};

const createMockComponent =
  (name: string) =>
  ({ children, ...props }: MockProps) =>
    React.createElement(name, props, children);

export const View = createMockComponent("View");
export const Text = createMockComponent("Text");
export const ScrollView = createMockComponent("ScrollView");

export const StyleSheet = {
  absoluteFillObject: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  create: <T extends Record<string, unknown>>(styles: T) => styles,
  flatten: (style: unknown) => style,
  hairlineWidth: 1,
};

export const Platform = {
  OS: "ios",
  select: <T>(options: Record<string, T>) => options.ios ?? options.default,
};

export const PanResponder = {
  create: (handlers: Record<string, unknown>) => ({
    panHandlers: handlers,
  }),
};

export const Share = {
  share: (content: Record<string, unknown>, options?: Record<string, unknown>) =>
    Promise.resolve({
      action: "sharedAction",
      content,
      options,
    }),
};

export const useColorScheme = () => "light";

export default {
  PanResponder,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
  useColorScheme,
};
