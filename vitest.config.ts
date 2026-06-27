import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

const fromRoot = (path: string) =>
  fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@chart-kit/pro/react-native",
        replacement: fromRoot("./src/previewChartKitReactNative.tsx")
      },
      {
        find: "@chart-kit/pro",
        replacement: fromRoot("./test/mocks/pro-package.tsx")
      },
      {
        find: "react-native",
        replacement: fromRoot("./test/mocks/react-native.ts")
      },
      {
        find: "react-native-gesture-handler",
        replacement: fromRoot("./test/mocks/react-native-gesture-handler.tsx")
      },
      {
        find: "react-native-svg",
        replacement: fromRoot("./test/mocks/react-native-svg.tsx")
      }
    ]
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    server: {
      deps: {
        inline: [
          "@chart-kit/core",
          "@chart-kit/svg-renderer",
          "react-native-chart-kit"
        ]
      }
    }
  }
});
