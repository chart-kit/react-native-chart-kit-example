import { StackedBarChart as CompatStackedBarChart } from "react-native-chart-kit";
import type { BarChartFixture } from "../../../fixtures/compatBar";
import type { LineChartFixture } from "../../../fixtures/compatLine";
import {
  fixtures as stackedBarFixtures,
  type StackedBarChartFixture,
} from "../../../fixtures/compatStackedBar";
import {
  ChartSection,
  EmptyState,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";

const hasStackedBarData = (fixture: StackedBarChartFixture) =>
  fixture.data.data.some((group) => group.length > 0);
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
const CompatStackedBarStory = ({
  fixture,
  title,
}: {
  fixture: StackedBarChartFixture;
  title: string;
}) => {
  const Story = ({ width }: NativeStoryProps) => {
    const chartWidth = resolveLegacyWidth(width, fixture);

    return (
      <ChartSection title={title} kicker="Compat StackedBarChart">
        {hasStackedBarData(fixture) ? (
          <CompatStackedBarChart
            data={fixture.data}
            width={chartWidth}
            height={fixture.height}
            chartConfig={fixture.chartConfig}
            hideLegend={fixture.hideLegend}
            percentile={fixture.percentile}
            segments={fixture.segments}
            style={legacyChartStyle(fixture)}
            yAxisSuffix={fixture.yAxisSuffix}
          />
        ) : (
          <EmptyState
            copy="The compatibility fixture contains zero stacked bars."
            height={fixture.height}
          />
        )}
      </ChartSection>
    );
  };

  return Story;
};

// Teaching note: Keeps percentile stacking available for label-collision regression tests.
export const stackedPercentileStory: ShowcaseStory = {
  id: "stacked-bar-percentile",
  title: "Stacked Percentile",
  Component: CompatStackedBarStory({
    title: "Stacked Percentile",
    fixture: stackedBarFixtures.percentile,
  }),
};
