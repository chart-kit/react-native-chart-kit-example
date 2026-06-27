import * as React from "react";

type MockSvgProps = {
  children?: React.ReactNode;
  [key: string]: unknown;
};

const createSvgComponent =
  (name: string) =>
  ({ children, ...props }: MockSvgProps) =>
    React.createElement(name, props, children);

const Svg = createSvgComponent("Svg");

export const Circle = createSvgComponent("Circle");
export const ClipPath = createSvgComponent("ClipPath");
export const Defs = createSvgComponent("Defs");
export const G = createSvgComponent("G");
export const Line = createSvgComponent("Line");
export const LinearGradient = createSvgComponent("LinearGradient");
export const Path = createSvgComponent("Path");
export const Rect = createSvgComponent("Rect");
export const Stop = createSvgComponent("Stop");
export const Text = createSvgComponent("SvgText");

export default Svg;
