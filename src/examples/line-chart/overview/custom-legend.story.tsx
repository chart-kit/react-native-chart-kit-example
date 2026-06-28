import { LineChart } from "react-native-chart-kit/v2";
import { SvgCircle, SvgGroup, SvgRect, SvgText } from "@chart-kit/svg-renderer";
import { multiSeriesRevenue } from "../../../fixtures/v2Line";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";

const V2CustomLegend = ({ width }: NativeStoryProps) => (
  <ChartSection title="Custom legend" kicker="Composable legend item">
    <LineChart
      data={multiSeriesRevenue}
      xKey="month"
      width={width}
      height={238}
      showDots={false}
      curve="monotone"
      legend={{
        align: "center",
        marker: "circle",
        fontSize: 12,
        itemGap: 18,
        itemPaddingHorizontal: 10,
        itemPaddingVertical: 4,
        renderItem: (item) => (
          <SvgGroup key={item.key}>
            <SvgRect
              x={item.x}
              y={item.y}
              width={item.width}
              height={item.height}
              rx={8}
              fill={item.color}
              opacity={0.1}
            />
            <SvgCircle
              cx={item.contentX + item.markerSize / 2}
              cy={item.contentY + item.contentHeight / 2}
              r={item.markerSize / 2}
              fill={item.color}
            />
            <SvgText
              x={item.contentX + item.markerSize + item.labelGap}
              y={item.contentY + item.contentHeight / 2 + item.fontSize * 0.36}
              fill={item.color}
              fontSize={item.fontSize}
              fontWeight="600"
            >
              {item.label}
            </SvgText>
          </SvgGroup>
        ),
      }}
      series={[
        { yKey: "actual", label: "Actual", strokeWidth: 3 },
        {
          yKey: "forecast",
          label: "Forecast",
          strokeWidth: 2,
        },
      ]}
    />
  </ChartSection>
);

// Teaching note: Uses custom overlay composition when the default legend is not enough.
export const customLegendStory: ShowcaseStory = {
  id: "v2-custom-legend",
  title: "Custom Legend",
  Component: V2CustomLegend,
};
