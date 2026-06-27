import { describe, expect, it } from "vitest";

import {
  createShowcaseSearchParams,
  getPresetFromParams,
  getShowcaseSearchParamsFromBuildEnv,
  getShowcaseSearchParamsFromUrl,
  getThemeModeFromParams
} from "./showcaseNavigation";

describe("showcase navigation helpers", () => {
  it("parses web and native deep-link query params", () => {
    const params = getShowcaseSearchParamsFromUrl(
      "chartkitshowcase://showcase?page=bar-charts&theme=dark&preset=studio"
    );

    expect(params?.get("page")).toBe("bar-charts");
    expect(getThemeModeFromParams(params)).toBe("dark");
    expect(getPresetFromParams(params)).toBe("studio");
  });

  it("decodes query values without relying on URL globals", () => {
    const params = createShowcaseSearchParams(
      "?story=v2-selected-tooltip&note=Line+Charts%20QA"
    );

    expect(params.get("story")).toBe("v2-selected-tooltip");
    expect(params.get("note")).toBe("Line Charts QA");
  });

  it("parses build-time QA query params for native launch automation", () => {
    const params = getShowcaseSearchParamsFromBuildEnv({
      EXPO_PUBLIC_CHARTKIT_SHOWCASE_QA_QUERY:
        "view=charts&page=bar&theme=dark&preset=spectrum"
    });

    expect(params?.get("view")).toBe("charts");
    expect(params?.get("page")).toBe("bar");
    expect(getThemeModeFromParams(params)).toBe("dark");
    expect(getPresetFromParams(params)).toBe("spectrum");
  });

  it("reads public Expo QA query params from process env by default", () => {
    const previousQuery = process.env.EXPO_PUBLIC_CHARTKIT_SHOWCASE_QA_QUERY;
    process.env.EXPO_PUBLIC_CHARTKIT_SHOWCASE_QA_QUERY =
      "view=charts&page=bar&theme=dark&preset=spectrum";

    try {
      const params = getShowcaseSearchParamsFromBuildEnv();

      expect(params?.get("view")).toBe("charts");
      expect(params?.get("page")).toBe("bar");
      expect(getThemeModeFromParams(params)).toBe("dark");
      expect(getPresetFromParams(params)).toBe("spectrum");
    } finally {
      if (previousQuery === undefined) {
        delete process.env.EXPO_PUBLIC_CHARTKIT_SHOWCASE_QA_QUERY;
      } else {
        process.env.EXPO_PUBLIC_CHARTKIT_SHOWCASE_QA_QUERY = previousQuery;
      }
    }
  });

  it("parses full URLs from the build-time QA query env var", () => {
    const params = getShowcaseSearchParamsFromBuildEnv({
      EXPO_PUBLIC_CHARTKIT_SHOWCASE_QA_QUERY:
        "chartkitshowcase://showcase?story=v2-range-selector"
    });

    expect(params?.get("story")).toBe("v2-range-selector");
  });

  it("falls back to safe preview defaults for unsupported values", () => {
    const params = createShowcaseSearchParams(
      "?theme=system&preset=unsupported"
    );

    expect(getThemeModeFromParams(params)).toBe("light");
    expect(getPresetFromParams(params)).toBe("default");
  });

  it("does not preserve removed alpha preset names", () => {
    expect(
      getPresetFromParams(createShowcaseSearchParams("?preset=analytics"))
    ).toBe("default");
    expect(
      getPresetFromParams(createShowcaseSearchParams("?preset=dark-fintech"))
    ).toBe("default");
    expect(
      getPresetFromParams(createShowcaseSearchParams("?preset=high-contrast"))
    ).toBe("default");
  });
});
