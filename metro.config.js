/* eslint-disable @typescript-eslint/no-require-imports */

const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const projectRoot = __dirname;
const config = getDefaultConfig(projectRoot);

config.resolver.extraNodeModules = {
  "@chart-kit/pro/react-native": path.resolve(
    projectRoot,
    "src/previewChartKitReactNative.tsx"
  )
};

module.exports = config;
