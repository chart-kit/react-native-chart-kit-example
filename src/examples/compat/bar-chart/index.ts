import { basicStory } from "./basic.story";
import { longLabelsStory } from "./long-labels.story";
import { denseDataStory } from "./dense-data.story";
import { negativeValuesStory } from "./negative-values.story";
import { emptyStateStory } from "./empty-state.story";
import { darkModeStory } from "./dark-mode.story";
import { tinyWidthStory } from "./tiny-width.story";
import { stackedBasicStory } from "./stacked-basic.story";
import { stackedPercentileStory } from "./stacked-percentile.story";

export const compatBarStories = [
  basicStory,
  longLabelsStory,
  denseDataStory,
  negativeValuesStory,
  emptyStateStory,
  darkModeStory,
  tinyWidthStory,
];

export const compatStackedBarStories = [
  stackedBasicStory,
  stackedPercentileStory,
];
