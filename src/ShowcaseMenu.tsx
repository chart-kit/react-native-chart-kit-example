import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Modal,
  PanResponder,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import type { ShowcasePage } from "./stories/storyPrimitives";

type ShowcaseMenuTheme = {
  axis: string;
  background: string;
  mutedText: string;
  plotBackground: string;
  series: string[];
  text: string;
};

type ShowcaseMenuOption<TValue extends string> = {
  id: TValue;
  title: string;
};

type ShowcaseRendererMode = "svg" | "skia";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];
type MenuTab = "app-demos" | "chart-types" | "settings";

const appDemoPageId = "app-demos";
const drawerHiddenOffset = -330;
const tabs: Array<{ id: MenuTab; label: string }> = [
  { id: "app-demos", label: "App Demos" },
  { id: "chart-types", label: "Chart Types" },
  { id: "settings", label: "Settings" }
];

type AppDemoRow = {
  description: string;
  id: string;
  page: ShowcasePage;
  storyId: string;
  title: string;
};

export const ShowcaseMenu = ({
  appTheme,
  chartPreset,
  currentPageId,
  currentStoryId,
  onSelectAppDemo,
  onSelectChartPreset,
  onSelectPage,
  onSelectRendererMode,
  onSelectThemeMode,
  onToggleTouchTracing,
  pages,
  presetOptions,
  rendererMode,
  themeMode,
  touchTracingEnabled
}: {
  appTheme: ShowcaseMenuTheme;
  chartPreset: string;
  currentPageId: string;
  currentStoryId?: string;
  onSelectAppDemo: (page: ShowcasePage, storyId: string) => void;
  onSelectChartPreset: (preset: string) => void;
  onSelectPage: (page: ShowcasePage) => void;
  onSelectRendererMode: (mode: ShowcaseRendererMode) => void;
  onSelectThemeMode: (mode: "dark" | "light") => void;
  onToggleTouchTracing: (enabled: boolean) => void;
  pages: ShowcasePage[];
  presetOptions: Array<ShowcaseMenuOption<string>>;
  rendererMode: ShowcaseRendererMode;
  themeMode: "dark" | "light";
  touchTracingEnabled: boolean;
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<MenuTab>(
    currentPageId === appDemoPageId ? "app-demos" : "chart-types"
  );
  const edgePull = useRef(new Animated.Value(0)).current;
  const drawerProgress = useRef(new Animated.Value(0)).current;
  const selectedControlTextColor = appTheme.background;
  const selectedPage = pages.find((page) => page.id === currentPageId);
  const appDemoRows = useMemo<AppDemoRow[]>(
    () =>
      pages
        .filter((page) => page.id === appDemoPageId)
        .flatMap((page) => {
          if (page.storyGroups?.length) {
            return page.storyGroups.flatMap((group) => {
              const storyId = group.storyIds[0];

              return storyId
                ? [
                    {
                      description: group.description ?? page.description,
                      id: `${page.id}:${group.id}`,
                      page,
                      storyId,
                      title: group.title
                    }
                  ]
                : [];
            });
          }

          const storyId = page.storyIds?.[0];

          return storyId
            ? [
                {
                  description: page.description,
                  id: page.id,
                  page,
                  storyId,
                  title: page.title
                }
              ]
            : [];
        }),
    [pages]
  );
  const chartTypePages = useMemo(
    () => pages.filter((page) => page.id !== appDemoPageId),
    [pages]
  );

  useEffect(() => {
    if (!isDrawerOpen) {
      setActiveTab(currentPageId === appDemoPageId ? "app-demos" : "chart-types");
    }
  }, [currentPageId, isDrawerOpen]);

  const animateDrawer = useCallback(
    (toValue: number, onComplete?: () => void) => {
      drawerProgress.stopAnimation();
      Animated.timing(drawerProgress, {
        duration: toValue === 1 ? 230 : 180,
        toValue,
        useNativeDriver: true
      }).start(({ finished }) => {
        if (finished) {
          onComplete?.();
        }
      });
    },
    [drawerProgress]
  );

  const openMenu = useCallback(() => {
    edgePull.setValue(0);
    drawerProgress.setValue(0);
    setIsDrawerOpen(true);
  }, [drawerProgress, edgePull]);

  const closeDrawer = useCallback(() => {
    animateDrawer(0, () => setIsDrawerOpen(false));
  }, [animateDrawer]);

  const resetEdgePull = useCallback(() => {
    Animated.timing(edgePull, {
      duration: 120,
      toValue: 0,
      useNativeDriver: true
    }).start();
  }, [edgePull]);

  const drawerTranslateX = drawerProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [drawerHiddenOffset, 0]
  });
  const backdropOpacity = drawerProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  const edgePanResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_event, gestureState) =>
          gestureState.dx > 4 &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
        onPanResponderMove: (_event, gestureState) => {
          edgePull.setValue(Math.min(Math.max(gestureState.dx, 0), 54));
        },
        onPanResponderRelease: (_event, gestureState) => {
          resetEdgePull();
          if (gestureState.dx > 26 || gestureState.vx > 0.55) {
            openMenu();
          }
        },
        onPanResponderTerminate: () => {
          resetEdgePull();
        },
        onStartShouldSetPanResponder: () => false
      }),
    [edgePull, openMenu, resetEdgePull]
  );

  return (
    <>
      <Animated.View
        {...edgePanResponder.panHandlers}
        style={[
          styles.edgePull,
          {
            shadowColor: appTheme.text,
            transform: [{ translateX: edgePull }]
          }
        ]}
      >
        <Pressable
          accessibilityHint="Drag to move, tap to open navigation drawer"
          accessibilityLabel="Open preview navigation"
          accessibilityRole="button"
          onPress={openMenu}
          style={({ pressed }) => [
            styles.edgePullPressable,
            pressed && styles.pressed
          ]}
        >
          <View style={styles.edgePullHitArea} />
        </Pressable>
      </Animated.View>
      <Modal
        animationType="none"
        onRequestClose={closeDrawer}
        onShow={() => animateDrawer(1)}
        statusBarTranslucent
        transparent
        visible={isDrawerOpen}
      >
        <View style={styles.modalRoot}>
          <Animated.View
            pointerEvents="none"
            style={[styles.backdrop, { opacity: backdropOpacity }]}
          />
          <Pressable
            accessibilityLabel="Close preview navigation"
            onPress={closeDrawer}
            style={StyleSheet.absoluteFill}
          />
          <Animated.View
            accessibilityViewIsModal
            style={[
              styles.drawer,
              {
                backgroundColor: appTheme.plotBackground,
                borderColor: appTheme.axis,
                transform: [{ translateX: drawerTranslateX }]
              }
            ]}
          >
            <View style={styles.drawerHeader}>
              <View style={styles.drawerTitleBlock}>
                <Text
                  numberOfLines={1}
                  style={[styles.drawerEyebrow, { color: appTheme.mutedText }]}
                >
                  Preview navigation
                </Text>
                <Text
                  numberOfLines={1}
                  style={[styles.drawerTitle, { color: appTheme.text }]}
                >
                  {selectedPage?.title ?? "Charts"}
                </Text>
              </View>
              <Pressable
                accessibilityLabel="Close preview navigation"
                accessibilityRole="button"
                onPress={closeDrawer}
                style={({ pressed }) => [
                  styles.drawerCloseButton,
                  { borderColor: appTheme.axis },
                  pressed && styles.pressed
                ]}
              >
                <Ionicons name="close" size={20} color={appTheme.text} />
              </Pressable>
            </View>

            <View
              style={[
                styles.tabGroup,
                {
                  backgroundColor: appTheme.background,
                  borderColor: appTheme.axis
                }
              ]}
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const selectedControlColor = appTheme.series[0] ?? appTheme.text;

                return (
                  <Pressable
                    key={tab.id}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isActive }}
                    onPress={() => setActiveTab(tab.id)}
                    style={({ pressed }) => [
                      styles.tabButton,
                      isActive && { backgroundColor: selectedControlColor },
                      pressed && styles.pressed
                    ]}
                  >
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.tabButtonText,
                        {
                          color: isActive
                            ? selectedControlTextColor
                            : appTheme.text
                        }
                      ]}
                    >
                      {tab.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <ScrollView
              bounces={false}
              contentContainerStyle={styles.drawerRows}
              showsVerticalScrollIndicator={false}
            >
              {activeTab === "app-demos" ? (
                appDemoRows.map((row) => (
                  <DrawerRow
                    key={row.id}
                    appTheme={appTheme}
                    description={row.description}
                    iconName="phone-portrait-outline"
                    isSelected={
                      currentPageId === row.page.id &&
                      currentStoryId === row.storyId
                    }
                    label={row.title}
                    onPress={() => {
                      onSelectAppDemo(row.page, row.storyId);
                      closeDrawer();
                    }}
                  />
                ))
              ) : activeTab === "chart-types" ? (
                chartTypePages.map((page) => (
                  <DrawerRow
                    key={page.id}
                    appTheme={appTheme}
                    description={page.description}
                    iconName="stats-chart-outline"
                    isSelected={page.id === currentPageId}
                    label={page.title}
                    onPress={() => {
                      onSelectPage(page);
                      closeDrawer();
                    }}
                  />
                ))
              ) : (
                <>
                  <DrawerSwitchRow
                    appTheme={appTheme}
                    iconName={
                      themeMode === "dark" ? "moon-outline" : "sunny-outline"
                    }
                    label="Dark mode"
                    onValueChange={(value) =>
                      onSelectThemeMode(value ? "dark" : "light")
                    }
                    value={themeMode === "dark"}
                  />
                  <DrawerSwitchRow
                    appTheme={appTheme}
                    iconName="speedometer-outline"
                    label="Skia renderer"
                    onValueChange={(value) =>
                      onSelectRendererMode(value ? "skia" : "svg")
                    }
                    value={rendererMode === "skia"}
                  />
                  <DrawerSwitchRow
                    appTheme={appTheme}
                    iconName="radio-button-on-outline"
                    label="Touch Trace"
                    onValueChange={onToggleTouchTracing}
                    value={touchTracingEnabled}
                  />

                  <DrawerSectionTitle appTheme={appTheme} label="Theme preset" />
                  {presetOptions.map((option) => (
                    <DrawerRow
                      key={option.id}
                      appTheme={appTheme}
                      iconName="color-palette-outline"
                      isSelected={option.id === chartPreset}
                      label={option.title}
                      onPress={() => onSelectChartPreset(option.id)}
                    />
                  ))}
                </>
              )}
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
};

const DrawerSwitchRow = ({
  appTheme,
  iconName,
  label,
  onValueChange,
  value
}: {
  appTheme: ShowcaseMenuTheme;
  iconName: IoniconName;
  label: string;
  onValueChange: (value: boolean) => void;
  value: boolean;
}) => {
  const accentColor = appTheme.series[0] ?? appTheme.text;

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      onPress={() => onValueChange(!value)}
      style={({ pressed }) => [
        styles.row,
        {
          backgroundColor: value ? appTheme.background : "transparent"
        },
        pressed && styles.pressed
      ]}
    >
      <View
        style={[
          styles.rowIcon,
          {
            backgroundColor: value ? accentColor : appTheme.background,
            borderColor: appTheme.axis
          }
        ]}
      >
        <Ionicons
          name={iconName}
          size={18}
          color={value ? appTheme.background : appTheme.text}
        />
      </View>
      <View style={styles.rowTextBlock}>
        <Text
          numberOfLines={1}
          style={[styles.rowLabel, { color: appTheme.text }]}
        >
          {label}
        </Text>
      </View>
      <View
        style={[
          styles.compactSwitchTrack,
          {
            backgroundColor: value ? accentColor : appTheme.axis
          }
        ]}
      >
        <View
          style={[
            styles.compactSwitchThumb,
            {
              backgroundColor: value ? appTheme.background : appTheme.mutedText,
              transform: [{ translateX: value ? 14 : 0 }]
            }
          ]}
        />
      </View>
    </Pressable>
  );
};

const DrawerSectionTitle = ({
  appTheme,
  label
}: {
  appTheme: ShowcaseMenuTheme;
  label: string;
}) => (
  <Text style={[styles.sectionTitle, { color: appTheme.mutedText }]}>
    {label}
  </Text>
);

const DrawerRow = ({
  appTheme,
  description,
  iconName,
  isSelected = false,
  label,
  onPress
}: {
  appTheme: ShowcaseMenuTheme;
  description?: string;
  iconName: IoniconName;
  isSelected?: boolean;
  label: string;
  onPress: () => void;
}) => {
  const accentColor = appTheme.series[0] ?? appTheme.text;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        {
          backgroundColor: isSelected ? appTheme.background : "transparent"
        },
        pressed && styles.pressed
      ]}
    >
      <View
        style={[
          styles.rowIcon,
          {
            backgroundColor: isSelected ? accentColor : appTheme.background,
            borderColor: appTheme.axis
          }
        ]}
      >
        <Ionicons
          name={iconName}
          size={15}
          color={isSelected ? appTheme.background : appTheme.text}
        />
      </View>
      <View style={styles.rowTextBlock}>
        <Text
          numberOfLines={1}
          style={[styles.rowLabel, { color: appTheme.text }]}
        >
          {label}
        </Text>
        {description ? (
          <Text
            numberOfLines={1}
            style={[styles.rowDescription, { color: appTheme.mutedText }]}
          >
            {description}
          </Text>
        ) : null}
      </View>
      {isSelected ? (
        <Ionicons name="checkmark" size={17} color={accentColor} />
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  edgePull: {
    alignItems: "center",
    bottom: 0,
    elevation: 0,
    height: "100%",
    justifyContent: "center",
    left: 0,
    position: "absolute",
    shadowOpacity: 0,
    top: 0,
    width: 18,
    zIndex: 30
  },
  edgePullPressable: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    width: "100%"
  },
  edgePullHitArea: {
    height: "100%",
    width: "100%"
  },
  modalRoot: {
    flex: 1
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(2, 6, 23, 0.34)"
  },
  drawer: {
    borderRightWidth: 1,
    bottom: 0,
    elevation: 24,
    left: 0,
    maxWidth: 318,
    paddingBottom: Platform.OS === "ios" ? 22 : 16,
    paddingHorizontal: 10,
    paddingTop: Platform.OS === "ios" ? 48 : 26,
    position: "absolute",
    shadowColor: "#020617",
    shadowOffset: { height: 0, width: 14 },
    shadowOpacity: 0.2,
    shadowRadius: 22,
    top: 0,
    width: "84%"
  },
  drawerHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
    marginBottom: 10
  },
  drawerTitleBlock: {
    flex: 1,
    minWidth: 0
  },
  drawerEyebrow: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0,
    marginBottom: 2,
    textTransform: "uppercase"
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0
  },
  drawerCloseButton: {
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    height: 30,
    justifyContent: "center",
    width: 30
  },
  tabGroup: {
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 2,
    marginBottom: 8,
    padding: 2
  },
  tabButton: {
    alignItems: "center",
    borderRadius: 6,
    flex: 1,
    justifyContent: "center",
    minHeight: 30,
    paddingHorizontal: 5
  },
  tabButtonText: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0
  },
  drawerRows: {
    gap: 4,
    paddingBottom: 8
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0,
    marginTop: 8,
    paddingHorizontal: 4,
    textTransform: "uppercase"
  },
  row: {
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
    gap: 8,
    minHeight: 42,
    paddingHorizontal: 7,
    paddingVertical: 6
  },
  rowIcon: {
    alignItems: "center",
    borderRadius: 7,
    borderWidth: 1,
    height: 26,
    justifyContent: "center",
    width: 26
  },
  rowTextBlock: {
    flex: 1,
    minWidth: 0
  },
  rowLabel: {
    fontSize: 13,
    fontWeight: "900"
  },
  rowDescription: {
    fontSize: 10,
    fontWeight: "600",
    lineHeight: 13,
    marginTop: 1
  },
  compactSwitchTrack: {
    borderRadius: 10,
    height: 18,
    justifyContent: "center",
    paddingHorizontal: 2,
    width: 34
  },
  compactSwitchThumb: {
    borderRadius: 7,
    height: 14,
    width: 14
  },
  pressed: {
    opacity: 0.72
  }
});
