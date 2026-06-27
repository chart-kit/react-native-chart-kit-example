import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Linking,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import {
  ChartKitProvider as PublicChartKitProvider,
  resolveCartesianChartThemeConfig,
} from "react-native-chart-kit/v2";
import { createSkiaRenderer } from "@chart-kit/skia-renderer";
import * as SkiaModule from "@shopify/react-native-skia";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { ChartKitProvider as ProChartKitProvider } from "@chart-kit/pro/react-native";

import { styles } from "./src/showcase/appStyles";
import {
  ShowcaseMode,
  ShowcasePage,
  ShowcaseStory,
  getShowcasePageStoryGroups,
  getShowcasePageStoryIds,
  publicChartMode,
  showcaseModes,
  stories,
  storyFeatureTags,
} from "./src/showcase/registry";
import {
  showcaseCustomPresets,
  showcasePresetOptions,
  type ShowcasePresetId,
  type ShowcaseThemeMode,
} from "./src/showcase/theme";
import { ShowcaseMenu } from "./src/showcase/ShowcaseMenu";
import { TouchTraceSurface } from "./src/showcase/TouchTraceSurface";
import {
  getPresetFromParams,
  getShowcaseSearchParamsFromBuildEnv,
  getShowcaseSearchParamsFromUrl,
  getThemeModeFromParams,
  type ShowcaseSearchParams,
} from "./src/showcase/navigation";

const defaultStory =
  stories.find((story) => story.id === "v2-basic") ?? stories[0];
const defaultMode = publicChartMode;
const allShowcaseModes = [publicChartMode, ...showcaseModes];

const isWebRuntime = Platform.OS === "web" && typeof window !== "undefined";

const getWebSearchParams = (): URLSearchParams | null => {
  if (!isWebRuntime) {
    return null;
  }

  return new URLSearchParams(window.location.search);
};

const getInitialSearchParams = (): ShowcaseSearchParams | null =>
  getWebSearchParams() ?? getShowcaseSearchParamsFromBuildEnv();

const getInitialStory = () => {
  const storyId = getInitialSearchParams()?.get("story");

  return stories.find((story) => story.id === storyId) ?? defaultStory;
};

const getStoryFromParams = (
  params: ShowcaseSearchParams | null | undefined,
) => {
  const storyId = params?.get("story");

  return stories.find((story) => story.id === storyId) ?? defaultStory;
};

const getInitialVisualMode = () => {
  const params = getInitialSearchParams();

  return params?.get("visual") === "1" || params?.get("mode") === "visual";
};

const getInitialThemeMode = (): ShowcaseThemeMode => {
  return getThemeModeFromParams(getInitialSearchParams());
};

const getInitialPreset = (): ShowcasePresetId => {
  return getPresetFromParams(getInitialSearchParams());
};

type PreviewRendererMode = "svg" | "skia";
type PreviewSkiaFont = NonNullable<
  Parameters<typeof createSkiaRenderer>[0]["font"]
>;
type PreviewSkiaFontResolver = NonNullable<
  Parameters<typeof createSkiaRenderer>[0]["getFont"]
>;
type PreviewSkiaFontManager = NonNullable<PreviewSkiaFont["typefaceProvider"]>;

const previewSkiaFontSource = {
  __esModule: true,
  default: "/Roboto-Regular.ttf",
} as const;
const previewSkiaFontFamilies = ["Roboto"] as const;

const svgOnlyStoryIds = new Set([
  "v2-bar-custom-renderer",
  "v2-custom-crosshair",
  "v2-custom-legend",
  "v2-range-selector",
]);

const getRendererModeFromParams = (
  params: ShowcaseSearchParams | null | undefined,
): PreviewRendererMode => (params?.get("renderer") === "skia" ? "skia" : "svg");

const getInitialRendererMode = (): PreviewRendererMode =>
  getRendererModeFromParams(getInitialSearchParams());

const createPreviewSkiaFontResolver = (
  fontManager: PreviewSkiaFontManager,
): PreviewSkiaFontResolver => {
  const skiaWithFontMatching = SkiaModule as typeof SkiaModule & {
    matchFont?: (
      style?: {
        fontFamily?: string;
        fontSize?: number;
        fontStyle?: "normal";
        fontWeight?: "normal";
      },
      fontManager?: PreviewSkiaFontManager,
    ) => unknown;
  };
  const fontsBySize = new Map<number, PreviewSkiaFont | undefined>();
  const fontFamilies = previewSkiaFontFamilies;
  const isUsableFont = (font: PreviewSkiaFont | undefined) => {
    return Boolean(font);
  };

  return (options = {}) => {
    const fontSize = options.fontSize ?? 12;

    const loadedFont = fontsBySize.get(fontSize);

    if (loadedFont) {
      return loadedFont;
    }

    for (const fontFamily of fontFamilies) {
      try {
        const matchedFont = skiaWithFontMatching.matchFont?.(
          {
            fontFamily,
            fontSize,
            fontStyle: "normal",
            fontWeight: "normal",
          },
          fontManager,
        ) as PreviewSkiaFont | undefined;

        if (isUsableFont(matchedFont)) {
          fontsBySize.set(fontSize, matchedFont);

          return fontsBySize.get(fontSize);
        }
      } catch {
        // Try the next native family.
      }
    }

    try {
      const font = SkiaModule.Skia.Font(undefined, fontSize) as PreviewSkiaFont;

      fontsBySize.set(fontSize, isUsableFont(font) ? font : undefined);

      return fontsBySize.get(fontSize);
    } catch {
      fontsBySize.set(fontSize, undefined);

      return undefined;
    }
  };
};

type PageSelection = {
  mode: ShowcaseMode;
  page: ShowcasePage;
};

const getPageSelectionForStory = (
  storyId: string | null | undefined,
): PageSelection | undefined => {
  if (!storyId) {
    return undefined;
  }

  for (const mode of allShowcaseModes) {
    for (const page of mode.pages) {
      if (getShowcasePageStoryIds(page).includes(storyId)) {
        return { mode, page };
      }
    }
  }

  return undefined;
};

const getPageSelection = ({
  pageId,
  storyId,
  viewId,
}: {
  pageId?: string | null;
  storyId?: string | null;
  viewId?: string | null;
}): PageSelection => {
  const storySelection = getPageSelectionForStory(storyId);

  if (storySelection) {
    return storySelection;
  }

  const mode =
    allShowcaseModes.find((currentMode) => currentMode.id === viewId) ??
    defaultMode;
  const page =
    mode.pages.find((currentPage) => currentPage.id === pageId) ??
    mode.pages[0];

  return { mode, page };
};

const getInitialPageSelection = () => {
  const params = getInitialSearchParams();

  return getPageSelection({
    pageId: params?.get("page"),
    storyId: params?.get("story"),
    viewId: params?.get("view"),
  });
};

const updateShowcaseUrl = ({
  chartPreset,
  isVisualMode,
  rendererMode,
  selection,
  storyId,
  themeMode,
}: {
  chartPreset: ShowcasePresetId;
  isVisualMode: boolean;
  rendererMode: PreviewRendererMode;
  selection: PageSelection;
  storyId?: string;
  themeMode: ShowcaseThemeMode;
}) => {
  if (!isWebRuntime || isVisualMode) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  params.set("view", selection.mode.id);
  params.set("page", selection.page.id);
  params.set("theme", themeMode);
  params.set("preset", chartPreset);
  params.set("renderer", rendererMode);
  if (storyId) {
    params.set("story", storyId);
  } else {
    params.delete("story");
  }
  window.history.replaceState(null, "", `?${params.toString()}`);
};

const PreviewChartKitProvider = ({
  chartPreset,
  children,
  renderer,
  themeMode,
}: {
  chartPreset: ShowcasePresetId;
  children: React.ReactNode;
  renderer?: React.ComponentProps<typeof PublicChartKitProvider>["renderer"];
  themeMode: ShowcaseThemeMode;
}) => (
  <PublicChartKitProvider
    mode={themeMode}
    preset={chartPreset}
    presets={showcaseCustomPresets}
    renderer={renderer}
  >
    <ProChartKitProvider
      mode={themeMode}
      preset={chartPreset}
      presets={showcaseCustomPresets}
      renderer={renderer}
    >
      {children}
    </ProChartKitProvider>
  </PublicChartKitProvider>
);

export default function App() {
  const { width } = useWindowDimensions();
  const [isVisualMode, setIsVisualMode] = useState(getInitialVisualMode);
  const [visualStory, setVisualStory] =
    useState<ShowcaseStory>(getInitialStory);
  const [pageSelection, setPageSelection] = useState<PageSelection>(
    getInitialPageSelection,
  );
  const [themeMode, setThemeMode] =
    useState<ShowcaseThemeMode>(getInitialThemeMode);
  const [chartPreset, setChartPreset] =
    useState<ShowcasePresetId>(getInitialPreset);
  const [rendererMode, setRendererMode] = useState<PreviewRendererMode>(
    getInitialRendererMode,
  );
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [touchTracingEnabled, setTouchTracingEnabled] = useState(false);
  const isDarkApp = themeMode === "dark";
  const isExportDemoPage = pageSelection.page.id === "export-workflows";
  const appTheme = useMemo(
    () =>
      resolveCartesianChartThemeConfig({
        mode: themeMode,
        preset: chartPreset,
        presets: showcaseCustomPresets,
      }),
    [chartPreset, themeMode],
  );

  const pageStoryGroups = useMemo(
    () =>
      getShowcasePageStoryGroups(pageSelection.page).map((group) => ({
        ...group,
        stories: group.storyIds
          .map((storyId) => stories.find((story) => story.id === storyId))
          .filter((story): story is ShowcaseStory => story !== undefined),
      })),
    [pageSelection.page],
  );
  const takeoverStories = useMemo(
    () =>
      pageStoryGroups
        .flatMap((group) => group.stories)
        .filter((story) => story.presentation === "takeover"),
    [pageStoryGroups],
  );
  const takeoverStory = useMemo(
    () =>
      takeoverStories.find((story) => story.id === visualStory.id) ??
      takeoverStories[0],
    [takeoverStories, visualStory.id],
  );

  const isWideLayout = width >= 860;
  const previewWidth = Math.max(
    280,
    Math.min(width - 40, isWideLayout ? 940 : 430),
  );
  const storyGap = 16;
  const storyBlockWidth = isWideLayout
    ? Math.floor((previewWidth - storyGap) / 2)
    : previewWidth;
  const chartWidth = Math.max(256, storyBlockWidth);
  const VisualStoryComponent = visualStory.Component;
  const skiaFontManager = SkiaModule.useFonts({
    Roboto: [previewSkiaFontSource],
  });
  const skiaRenderer = useMemo(() => {
    if (!skiaFontManager) {
      return undefined;
    }

    const getFont = createPreviewSkiaFontResolver(skiaFontManager);

    return createSkiaRenderer({
      ...(isWebRuntime ? { destroyWebGLContextAfterRender: true } : {}),
      fontFamilies: previewSkiaFontFamilies,
      getFont,
      skia: SkiaModule,
      typefaceProvider: skiaFontManager,
    });
  }, [skiaFontManager]);
  const activeSkiaRenderer = skiaRenderer;
  const activeRenderer =
    rendererMode === "skia" ? activeSkiaRenderer : undefined;
  const getStoryRenderer = (story: ShowcaseStory) =>
    rendererMode === "skia" && !svgOnlyStoryIds.has(story.id)
      ? activeSkiaRenderer
      : undefined;

  const applySearchParams = useCallback(
    (params: ShowcaseSearchParams | null | undefined) => {
      if (!params) {
        return;
      }

      setIsScrubbing(false);
      setIsVisualMode(
        params.get("visual") === "1" || params.get("mode") === "visual",
      );
      setVisualStory(getStoryFromParams(params));
      setPageSelection(
        getPageSelection({
          pageId: params.get("page"),
          storyId: params.get("story"),
          viewId: params.get("view"),
        }),
      );
      setThemeMode(getThemeModeFromParams(params));
      setChartPreset(getPresetFromParams(params));
      setRendererMode(getRendererModeFromParams(params));
    },
    [],
  );

  useEffect(() => {
    if (isWebRuntime) {
      return undefined;
    }

    let isMounted = true;
    const applyUrl = (url: string | null | undefined) => {
      if (isMounted) {
        applySearchParams(getShowcaseSearchParamsFromUrl(url));
      }
    };
    const subscription = Linking.addEventListener("url", ({ url }) => {
      applyUrl(url);
    });

    Linking.getInitialURL()
      .then(applyUrl)
      .catch(() => {
        // The default preview page is still valid if the native shell cannot
        // provide the initial URL.
      });

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, [applySearchParams]);

  const selectPage = (selection: PageSelection, storyId?: string) => {
    const nextStoryId = storyId ?? getShowcasePageStoryIds(selection.page)[0];
    const nextStory = stories.find((story) => story.id === nextStoryId);

    setIsScrubbing(false);
    if (nextStory) {
      setVisualStory(nextStory);
    }
    setPageSelection(selection);
    updateShowcaseUrl({
      chartPreset,
      isVisualMode,
      rendererMode,
      selection,
      storyId,
      themeMode,
    });
  };
  const selectAppDemo = (page: ShowcasePage, storyId: string) => {
    selectPage({ mode: publicChartMode, page }, storyId);
  };
  const selectThemeMode = (mode: ShowcaseThemeMode) => {
    setThemeMode(mode);
    updateShowcaseUrl({
      chartPreset,
      isVisualMode,
      rendererMode,
      selection: pageSelection,
      themeMode: mode,
    });
  };
  const selectChartPreset = (preset: string) => {
    const nextPreset =
      showcasePresetOptions.find((option) => option.id === preset)?.id ??
      chartPreset;

    setChartPreset(nextPreset);
    updateShowcaseUrl({
      chartPreset: nextPreset,
      isVisualMode,
      rendererMode,
      selection: pageSelection,
      themeMode,
    });
  };
  const selectRendererMode = (mode: PreviewRendererMode) => {
    setRendererMode(mode);
    updateShowcaseUrl({
      chartPreset,
      isVisualMode,
      rendererMode: mode,
      selection: pageSelection,
      themeMode,
    });
  };
  const exitTakeover = () => {
    const fallbackPage =
      publicChartMode.pages.find((page) => page.id !== pageSelection.page.id) ??
      publicChartMode.pages[0];

    if (fallbackPage) {
      selectPage({ mode: publicChartMode, page: fallbackPage });
    }
  };

  if (isVisualMode) {
    const visualWidth = Math.min(previewWidth, 430);

    return (
      <GestureHandlerRootView style={styles.gestureRoot}>
        <TouchTraceSurface enabled={touchTracingEnabled}>
          <View style={styles.visualRoot}>
            <View
              testID="visual-frame"
              style={[styles.visualFrame, { width: visualWidth }]}
            >
              <PreviewChartKitProvider
                chartPreset={chartPreset}
                renderer={getStoryRenderer(visualStory)}
                themeMode={themeMode}
              >
                <VisualStoryComponent width={visualWidth} isVisualMode />
              </PreviewChartKitProvider>
            </View>
          </View>
        </TouchTraceSurface>
      </GestureHandlerRootView>
    );
  }

  if (takeoverStory) {
    const TakeoverStoryComponent = takeoverStory.Component;
    const isCodeContributionTakeover =
      takeoverStory.id === "landing-code-contribution-app";
    const isMarketPulseTakeover =
      takeoverStory.id === "landing-market-pulse-app";
    const isLightTakeover =
      takeoverStory.id === "landing-health-activity-app" ||
      takeoverStory.id === "landing-website-analytics-app";
    const takeoverBackgroundColor = isMarketPulseTakeover
      ? "#06100d"
      : isCodeContributionTakeover
        ? isDarkApp
          ? "#07101d"
          : "#f3f6fb"
        : isLightTakeover
          ? "#f7f8fc"
          : "#0f1629";
    const takeoverStatusBarStyle = isMarketPulseTakeover
      ? "light-content"
      : isCodeContributionTakeover
        ? isDarkApp
          ? "light-content"
          : "dark-content"
        : isLightTakeover
          ? "dark-content"
          : "light-content";

    return (
      <GestureHandlerRootView style={styles.gestureRoot}>
        <TouchTraceSurface enabled={touchTracingEnabled}>
          <View
            style={[
              styles.takeoverRoot,
              { backgroundColor: takeoverBackgroundColor },
            ]}
          >
            <StatusBar
              backgroundColor={takeoverBackgroundColor}
              barStyle={takeoverStatusBarStyle}
            />
            <PreviewChartKitProvider
              chartPreset={chartPreset}
              renderer={getStoryRenderer(takeoverStory)}
              themeMode={themeMode}
            >
              <TakeoverStoryComponent
                width={width}
                isTakeoverMode
                onExitTakeover={exitTakeover}
              />
            </PreviewChartKitProvider>
            <ShowcaseMenu
              appTheme={appTheme}
              chartPreset={chartPreset}
              currentPageId={pageSelection.page.id}
              currentStoryId={takeoverStory.id}
              onSelectAppDemo={selectAppDemo}
              onSelectChartPreset={selectChartPreset}
              onSelectPage={(page) =>
                selectPage({ mode: publicChartMode, page })
              }
              onSelectRendererMode={selectRendererMode}
              onSelectThemeMode={selectThemeMode}
              onToggleTouchTracing={setTouchTracingEnabled}
              pages={publicChartMode.pages}
              presetOptions={showcasePresetOptions}
              rendererMode={rendererMode}
              themeMode={themeMode}
              touchTracingEnabled={touchTracingEnabled}
            />
          </View>
        </TouchTraceSurface>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={styles.gestureRoot}>
      <TouchTraceSurface enabled={touchTracingEnabled}>
        <View
          style={[styles.safeArea, { backgroundColor: appTheme.background }]}
        >
          <StatusBar barStyle={isDarkApp ? "light-content" : "dark-content"} />
          <View style={styles.appShell}>
            {isExportDemoPage ? null : (
              <View style={styles.header}>
                <View style={styles.headerText}>
                  <Text style={[styles.eyebrow, { color: appTheme.mutedText }]}>
                    Chart Kit Pro
                  </Text>
                  <Text style={[styles.title, { color: appTheme.text }]}>
                    Preview
                  </Text>
                </View>
              </View>
            )}

            <ScrollView
              testID="preview-scroll"
              style={styles.previewScroll}
              contentContainerStyle={styles.previewContent}
              scrollEnabled={!isScrubbing}
              showsVerticalScrollIndicator
            >
              <PreviewChartKitProvider
                chartPreset={chartPreset}
                renderer={activeRenderer}
                themeMode={themeMode}
              >
                <View style={[styles.pageContent, { width: previewWidth }]}>
                  <View style={styles.pageIntro}>
                    <Text style={[styles.pageTitle, { color: appTheme.text }]}>
                      {pageSelection.page.title}
                    </Text>
                  </View>

                  {pageStoryGroups.map((group) => (
                    <View key={group.id} style={styles.storyGroup}>
                      {group.title ? (
                        <View style={styles.storyGroupHeader}>
                          <Text
                            style={[
                              styles.storyGroupTitle,
                              { color: appTheme.text },
                            ]}
                          >
                            {group.title}
                          </Text>
                        </View>
                      ) : null}
                      <View style={styles.storyGrid}>
                        {group.stories.map((story) => {
                          const StoryComponent = story.Component;
                          const StoryDetails = story.Details;
                          const storyRenderer = getStoryRenderer(story);
                          const tags = storyFeatureTags[story.id] ?? [];

                          return (
                            <View
                              key={story.id}
                              style={[
                                styles.storyBlock,
                                { borderTopColor: appTheme.grid },
                                isExportDemoPage && {
                                  borderTopWidth: 0,
                                  paddingTop: 0,
                                },
                                { width: storyBlockWidth },
                              ]}
                            >
                              <PreviewChartKitProvider
                                chartPreset={chartPreset}
                                renderer={storyRenderer}
                                themeMode={themeMode}
                              >
                                <StoryComponent
                                  width={chartWidth}
                                  onScrubStart={() => setIsScrubbing(true)}
                                  onScrubEnd={() => setIsScrubbing(false)}
                                />
                                {StoryDetails ? (
                                  <StoryDetails width={chartWidth} />
                                ) : null}
                              </PreviewChartKitProvider>
                              {!isExportDemoPage && tags.length > 0 ? (
                                <Text
                                  style={[
                                    styles.featureTags,
                                    { color: appTheme.mutedText },
                                  ]}
                                >
                                  {tags.join(" / ")}
                                </Text>
                              ) : null}
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  ))}
                </View>
              </PreviewChartKitProvider>
            </ScrollView>
            <ShowcaseMenu
              appTheme={appTheme}
              chartPreset={chartPreset}
              currentPageId={pageSelection.page.id}
              currentStoryId={visualStory.id}
              onSelectAppDemo={selectAppDemo}
              onSelectChartPreset={selectChartPreset}
              onSelectPage={(page) =>
                selectPage({ mode: publicChartMode, page })
              }
              onSelectRendererMode={selectRendererMode}
              onSelectThemeMode={selectThemeMode}
              onToggleTouchTracing={setTouchTracingEnabled}
              pages={publicChartMode.pages}
              presetOptions={showcasePresetOptions}
              rendererMode={rendererMode}
              themeMode={themeMode}
              touchTracingEnabled={touchTracingEnabled}
            />
          </View>
        </View>
      </TouchTraceSurface>
    </GestureHandlerRootView>
  );
}
