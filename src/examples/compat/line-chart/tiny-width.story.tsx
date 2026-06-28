import { LineChart as CompatLineChart } from "react-native-chart-kit";
import type { BarChartFixture } from "../../../fixtures/compatBar";
import {
  fixtures as lineFixtures,
  type LineChartFixture,
} from "../../../fixtures/compatLine";
import type { StackedBarChartFixture } from "../../../fixtures/compatStackedBar";
import {
  ChartSection,
  EmptyState,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../../showcase/shared/storyPrimitives";

const hasLineData = (fixture: LineChartFixture) =>
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
const CompatLineStory = ({
  fixture,
  title,
}: {
  fixture: LineChartFixture;
  title: string;
}) => {
  const Story = ({ width }: NativeStoryProps) => {
    const chartWidth = resolveLegacyWidth(width, fixture);

    return (
      <ChartSection title={title} kicker="Compat LineChart">
        {hasLineData(fixture) ? (
          <CompatLineChart
            data={fixture.data}
            width={chartWidth}
            height={fixture.height}
            chartConfig={fixture.chartConfig}
            style={legacyChartStyle(fixture)}
            segments={fixture.segments}
            bezier={fixture.bezier}
            fromZero={fixture.fromZero}
            withDots={fixture.withDots}
            withInnerLines={fixture.withInnerLines}
            withOuterLines={fixture.withOuterLines}
            verticalLabelRotation={fixture.verticalLabelRotation}
            xLabelsOffset={fixture.xLabelsOffset}
            yAxisSuffix={fixture.yAxisSuffix}
          />
        ) : (
          <EmptyState
            copy="The compatibility fixture contains zero points."
            height={fixture.height}
          />
        )}
      </ChartSection>
    );
  };

  return Story;
};

// Teaching note: Confirms the legacy facade survives very narrow containers.
export const tinyWidthStory: ShowcaseStory = {
  id: "line-tiny-width",
  title: "Tiny Width",
  Component: CompatLineStory({
    title: "Tiny Width",
    fixture: lineFixtures.tinyWidth,
  }),
};
