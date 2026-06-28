import { PieChart } from "react-native-chart-kit/v2";
import { acquisitionShare } from "../../fixtures/v2Pie";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../showcase/shared/storyPrimitives";

const formatPiePercentage = (value: number) => `${Math.round(value * 100)}%`;
const V2PieExternalLabels = ({ width }: NativeStoryProps) => (
  <ChartSection title="Lead sources" kicker="External labels">
    <PieChart
      arcLabels={{
        connectorColor: "#475569",
        connectorOpacity: 0.9,
        connectorWidth: 1.8,
        fontSize: 11,
        minPercentage: 0.09,
        offset: 14,
        reservedWidth: 108,
        formatLabel: ({ label, percentageLabel }) =>
          `${label.split(" ")[0]} ${percentageLabel}`,
      }}
      data={acquisitionShare}
      height={272}
      labelKey="channel"
      legend={false}
      valueKey="share"
      width={width}
      formatPercentage={formatPiePercentage}
    />
  </ChartSection>
);

// Teaching note: Moves labels outside slices when the chart needs more text room.
export const pieExternalLabelsStory: ShowcaseStory = {
  id: "v2-pie-external-labels",
  title: "External Labels",
  Component: V2PieExternalLabels,
};
