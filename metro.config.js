/* eslint-disable @typescript-eslint/no-require-imports */

const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const projectRoot = __dirname;
const publicRepoRoot = path.resolve(projectRoot, "../react-native-chart-kit");
const config = getDefaultConfig(projectRoot);

config.watchFolders = [publicRepoRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(publicRepoRoot, "node_modules")
];
config.resolver.extraNodeModules = {
  "@chart-kit/core": path.resolve(
    publicRepoRoot,
    "packages/core/src/index.ts"
  ),
  "@chart-kit/pro/react-native": path.resolve(
    projectRoot,
    "src/previewChartKitReactNative.tsx"
  ),
  "@chart-kit/svg-renderer": path.resolve(
    publicRepoRoot,
    "packages/svg-renderer/src/index.ts"
  ),
  "react-native-chart-kit": path.resolve(publicRepoRoot, "src/index.ts"),
  "react-native-chart-kit/v2": path.resolve(
    publicRepoRoot,
    "packages/react-native/src/index.ts"
  )
};

module.exports = config;
