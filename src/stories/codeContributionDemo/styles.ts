import { Platform, StyleSheet } from "react-native";

export const uiFontFamily = Platform.select({
  android: "sans-serif",
  ios: "Helvetica Neue",
  default: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
});

export const styles = StyleSheet.create({
  chartCard: {
    alignItems: "center",
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    elevation: 3,
    overflow: "visible",
    padding: 12,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    width: "100%"
  },
  chartHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    marginBottom: 10,
    width: "100%"
  },
  chartTitle: {
    flexShrink: 0,
    fontFamily: uiFontFamily,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 16
  },
  selectedContributionMeta: {
    flexShrink: 1,
    fontFamily: uiFontFamily,
    fontSize: 12,
    fontVariant: ["tabular-nums"],
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 16,
    textAlign: "right"
  },
  content: {
    alignSelf: "center",
    paddingBottom: 20,
    paddingTop: 36
  },
  donutCenter: {
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 150
  },
  donutCenterLabel: {
    fontFamily: uiFontFamily,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 16,
    textAlign: "center"
  },
  donutCenterValue: {
    fontFamily: uiFontFamily,
    fontSize: 26,
    fontVariant: ["tabular-nums"],
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 31,
    textAlign: "center"
  },
  languageCard: {
    marginTop: 14,
    paddingBottom: 10
  },
  screen: {
    minHeight: "100%"
  }
});
