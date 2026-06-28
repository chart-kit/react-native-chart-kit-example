import { BarChart } from "react-native-chart-kit/v2";
import { SvgRect } from "@chart-kit/svg-renderer";
import { campaignSpend } from "../../fixtures/v2Bar";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../showcase/shared/storyPrimitives";

const V2CustomBarRenderer = ({ width }: NativeStoryProps) => (
  <ChartSection title="Weekly spend" kicker="Custom bars">
    <BarChart
      data={campaignSpend.slice(10, 16)}
      height={250}
      renderBar={({ bar, fill, radius }) => (
        <SvgRect
          x={bar.x}
          y={bar.y}
          width={bar.width}
          height={bar.height}
          rx={radius}
          fill={fill}
        />
      )}
      series={[{ yKey: "spend", label: "Spend" }]}
      width={width}
      xKey="week"
      yDomain={{ min: 0, max: "dataMax", nice: true }}
      formatYLabel={(value) => `$${value}k`}
    />
  </ChartSection>
);

// Teaching note: Shows how to customize individual bars without replacing chart layout logic.
export const customRendererStory: ShowcaseStory = {
  id: "v2-bar-custom-renderer",
  title: "Custom Renderer",
  Component: V2CustomBarRenderer,
};
