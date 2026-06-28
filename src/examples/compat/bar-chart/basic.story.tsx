import { BarChart as CompatBarChart } from "react-native-chart-kit";
import {
  fixtures as barFixtures,
  type BarChartFixture,
} from "../../../fixtures/compatBar";
import type { LineChartFixture } from "../../../fixtures/compatLine";
import type { StackedBarChartFixture } from "../../../fixtures/compatStackedBar";
import {
  ChartSection,
  EmptyState,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";

const hasBarData = (fixture: BarChartFixture) =>
  fixture.data.datasets.some((dataset) => dataset.data.length > 0);
const resolveLegacyWidth = (
  availableWidth: number,
  fixture: Pick<
    LineChartFixture | BarChartFixture | StackedBarChartFixture,
    "width"
  >,
) => Math.min(availableWidth, fixture.width);
const legacyChartStyle = (
  fixture: Pick<
    LineChartFixture | BarChartFixture | StackedBarChartFixture,
    "style"
  >,
) => ({
  ...fixture.style,
  paddingRight: Math.max(fixture.style?.paddingRight ?? 44, 44),
  width: undefined,
});
const CompatBarStory = ({
  fixture,
  title,
}: {
  fixture: BarChartFixture;
  title: string;
}) => {
  const Story = ({ width }: NativeStoryProps) => {
    const chartWidth = resolveLegacyWidth(width, fixture);

    return (
      <ChartSection title={title} kicker="Compat BarChart">
        {hasBarData(fixture) ? (
          <CompatBarChart
            data={fixture.data}
            width={chartWidth}
            height={fixture.height}
            chartConfig={fixture.chartConfig}
            style={legacyChartStyle(fixture)}
            fromZero={fixture.fromZero}
            flatColor={fixture.flatColor}
            horizontalLabelRotation={fixture.horizontalLabelRotation}
            segments={fixture.segments}
            showBarTops={fixture.showBarTops}
            showValuesOnTopOfBars={fixture.showValuesOnTopOfBars}
            verticalLabelRotation={fixture.verticalLabelRotation}
            withCustomBarColorFromData={fixture.withCustomBarColorFromData}
            withHorizontalLabels={fixture.withHorizontalLabels}
            withInnerLines={fixture.withInnerLines}
            withVerticalLabels={fixture.withVerticalLabels}
            yAxisLabel={fixture.yAxisLabel ?? ""}
            yAxisSuffix={fixture.yAxisSuffix ?? ""}
          />
        ) : (
          <EmptyState
            copy="The compatibility fixture contains zero bars."
            height={fixture.height}
          />
        )}
      </ChartSection>
    );
  };

  return Story;
};

// Teaching note: Preserves the legacy BarChart baseline for upgrade comparisons.
export const basicStory: ShowcaseStory = {
  id: "bar-basic",
  title: "Basic",
  Component: CompatBarStory({ title: "Basic", fixture: barFixtures.basic }),
};
