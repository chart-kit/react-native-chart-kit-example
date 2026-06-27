import { expect, test } from "@playwright/test";

import { skiaRendererStories } from "./stories";

test.describe("Skia renderer chart screenshots", () => {
  for (const storyId of skiaRendererStories) {
    test(storyId, async ({ page }) => {
      await page.goto(`/?story=${storyId}&visual=1&renderer=skia`);
      await page.addStyleTag({
        content: `
          *,
          *::before,
          *::after {
            animation-duration: 0s !important;
            animation-delay: 0s !important;
            transition-duration: 0s !important;
            transition-delay: 0s !important;
            caret-color: transparent !important;
          }
        `,
      });
      await page.evaluate(async () => {
        await document.fonts?.ready;
      });

      const frame = page.getByTestId("visual-frame");
      await expect(frame).toBeVisible();
      await expect(frame.locator("canvas").first()).toBeVisible();
      await page.waitForTimeout(500);
      await expect(frame).toHaveScreenshot(`skia-${storyId}.png`, {
        animations: "disabled",
        maxDiffPixelRatio: storyId.startsWith("v2-combined") ? 0.001 : 0.015,
      });
    });
  }
});
