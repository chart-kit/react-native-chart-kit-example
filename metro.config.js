const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const projectRoot = __dirname;
const chartKitRoot = path.resolve(projectRoot, "../react-native-chart-kit");

const config = getDefaultConfig(projectRoot);

config.watchFolders = [chartKitRoot];
config.resolver.disableHierarchicalLookup = true;
config.resolver.nodeModulesPaths = [path.resolve(projectRoot, "node_modules")];
config.resolver.extraNodeModules = {
  react: path.resolve(projectRoot, "node_modules/react"),
  "react-native": path.resolve(projectRoot, "node_modules/react-native"),
  "react-native-svg": path.resolve(projectRoot, "node_modules/react-native-svg")
};

module.exports = config;
