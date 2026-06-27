import {
  createChartPreset,
  type CartesianChartPresetName,
  type CartesianChartPresetRegistry,
  type ResolvedChartKitThemeMode
} from "react-native-chart-kit/v2";
import {
  proCartesianChartPresetOptions,
  proCartesianChartPresets,
  type ProCartesianChartPresetName
} from "@chart-kit/pro/react-native";

// Shared by the Expo showcase and the Astro docs examples. Curate chart
// theme modes, preset labels, and custom presets here.
export type ShowcaseThemeMode = ResolvedChartKitThemeMode;
export type ShowcasePresetId =
  | CartesianChartPresetName
  | "studio"
  | ProCartesianChartPresetName;

export const showcasePresetOptions: Array<{
  id: ShowcasePresetId;
  title: string;
}> = [
  { id: "default", title: "Base" },
  { id: "spectrum", title: "Spectrum" },
  { id: "aurora", title: "Aurora" },
  { id: "verdant", title: "Verdant" },
  { id: "cupertino", title: "Cupertino" },
  { id: "material", title: "Material" },
  { id: "graphite", title: "Graphite" },
  { id: "contrast", title: "Contrast" },
  { id: "midnight", title: "Midnight" },
  { id: "studio", title: "Studio" },
  ...proCartesianChartPresetOptions.map((option) => ({
    id: option.id,
    title: `${option.title} (Pro)`
  }))
];

export const showcaseCustomPresets: CartesianChartPresetRegistry = {
  studio: createChartPreset({
    light: {
      background: "#fffdf8",
      plotBackground: "#ffffff",
      grid: "#eadfca",
      axis: "#dccdaf",
      text: "#18130c",
      mutedText: "#7a6748",
      series: ["#a16207", "#be123c", "#0369a1", "#4d7c0f"],
      typography: {
        axisLabelSize: 11,
        legendLabelSize: 12
      }
    },
    dark: {
      background: "#18130c",
      plotBackground: "#22190f",
      grid: "#574124",
      axis: "#765b34",
      text: "#fff7ed",
      mutedText: "#dbc6a0",
      series: ["#fbbf24", "#fb7185", "#38bdf8", "#a3e635"],
      typography: {
        axisLabelSize: 11,
        legendLabelSize: 12
      }
    }
  }),
  ...proCartesianChartPresets
};
