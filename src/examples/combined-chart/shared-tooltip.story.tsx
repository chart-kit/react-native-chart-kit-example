import { CombinedChart } from "@chart-kit/pro/react-native";
import { revenueMargin } from "../../fixtures/v2Combined";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../showcase/shared/storyPrimitives";

const formatCurrency = (value: number) => `$${value}k`;
const formatPercent = (value: number) => `${value}%`;
const V2CombinedSharedTooltip = ({ width }: NativeStoryProps) => (
  <ChartSection title="Pipeline inspection" kicker="Shared tooltip">
    <CombinedChart
      bars={[{ yKey: "revenue", label: "Revenue" }]}
      data={revenueMargin}
      defaultSelectedIndex={3}
      formatLeftYLabel={formatCurrency}
      formatRightYLabel={formatPercent}
      height={280}
      interaction="tap"
      leftYDomain={[0, "dataMax"]}
      lines={[
        {
          yKey: "margin",
          label: "Margin",
          curve: "monotone",
          strokeWidth: 3.5,
        },
      ]}
      rightYDomain={[0, 40]}
      testID="combined-shared-tooltip-chart"
      tooltip={{ width: 142 }}
      width={width}
      xKey="month"
    />
  </ChartSection>
);

// Teaching note: Uses one tooltip model to inspect bar and line values together.
export const sharedTooltipStory: ShowcaseStory = {
  id: "v2-combined-shared-tooltip",
  title: "Shared Tooltip",
  Component: V2CombinedSharedTooltip,
};
