import { ProgressRing } from "react-native-chart-kit/v2";
import { onboardingProgress } from "../../fixtures/v2Progress";
import {
  ChartSection,
  type NativeStoryProps,
  type ShowcaseStory,
} from "../../showcase/shared/storyPrimitives";

const V2ProgressSingle = ({ width }: NativeStoryProps) => (
  <ChartSection title="Setup completion" kicker="Progress ring">
    <ProgressRing
      centerLabel={`${Math.round(onboardingProgress * 100)}%`}
      height={240}
      label="Workspace setup"
      ringGap={0}
      strokeWidth={18}
      value={onboardingProgress}
      width={width}
    />
  </ChartSection>
);

// Teaching note: Shows the simplest single-ring completion state.
export const singleStory: ShowcaseStory = {
  id: "v2-progress-single",
  title: "Single Progress Ring",
  Component: V2ProgressSingle,
};
