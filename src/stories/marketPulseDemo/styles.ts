import { Platform, StyleSheet } from "react-native";

export const marketFontFamily = Platform.select({
  android: "sans-serif",
  ios: "Helvetica Neue",
  default:
    "-apple-system, BlinkMacSystemFont, Segoe UI, ui-sans-serif, system-ui, sans-serif"
});

export const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: 14,
    overflow: "visible",
    padding: 12,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.26,
    shadowRadius: 24,
    width: "100%"
  },
  cardHeader: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    marginBottom: 10,
    width: "100%"
  },
  cardMeta: {
    fontFamily: marketFontFamily,
    fontSize: 12,
    fontVariant: ["tabular-nums"],
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 16,
    textAlign: "right"
  },
  cardTitle: {
    flexShrink: 0,
    fontFamily: marketFontFamily,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 17
  },
  content: {
    alignSelf: "center",
    paddingBottom: 18,
    paddingTop: 20
  },
  header: {
    paddingHorizontal: 2
  },
  leadCenter: {
    alignItems: "center",
    justifyContent: "center"
  },
  leadCenterCaption: {
    fontFamily: marketFontFamily,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 14
  },
  leadCenterValue: {
    fontFamily: marketFontFamily,
    fontSize: 26,
    fontVariant: ["tabular-nums"],
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 30
  },
  screen: {
    minHeight: "100%"
  },
  title: {
    fontFamily: marketFontFamily,
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 34
  }
});
