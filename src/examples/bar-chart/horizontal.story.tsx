import { BarChart } from "react-native-chart-kit/v2";
import { supportVolume } from "../../fixtures/v2Bar";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../showcase/shared/storyPrimitives";

const V2HorizontalBar = ({ width }: NativeStoryProps) => (
  <ChartSection title="Support volume" kicker="Horizontal bars">
    <BarChart
      data={supportVolume}
      height={260}
      labelStrategy="show"
      orientation="horizontal"
      series={[{ yKey: "tickets", label: "Tickets" }]}
      showValuesOnTopOfBars
      width={width}
      xKey="channel"
      yDomain={{ min: 0, max: "dataMax", nice: true }}
      formatYLabel={(value) => `${value}`}
    />
  </ChartSection>
);

// Teaching note: Switches orientation for ranked labels that need more horizontal reading space.
export const horizontalStory: ShowcaseStory = {
  id: "v2-bar-horizontal",
  title: "Horizontal Bars",
  Component: V2HorizontalBar,
};
