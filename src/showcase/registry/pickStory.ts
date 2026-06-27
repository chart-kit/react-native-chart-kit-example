import type { ShowcaseStory } from "../shared/storyPrimitives";

export const pickStory = (
  stories: readonly ShowcaseStory[],
  storyId: string,
): ShowcaseStory => {
  const story = stories.find((item) => item.id === storyId);

  if (!story) {
    throw new Error(`Missing showcase story: ${storyId}`);
  }

  return story;
};
