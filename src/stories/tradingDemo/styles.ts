import { StyleSheet } from "react-native";

import {
  cyanColor,
  downColor,
  marketBackground,
  marketDivider,
  marketMuted,
  marketNumberFontFamily,
  marketText,
  upColor
} from "./constants";

export const styles = StyleSheet.create({
  activeOrderTypeButton: {
    backgroundColor: "#20314f"
  },
  activeOrderTypeText: {
    color: marketText
  },
  activeQuantityPreset: {
    backgroundColor: "#20314f"
  },
  activeQuantityPresetText: {
    color: marketText
  },
  activeSellText: {
    color: marketBackground
  },
  activeSellToggle: {
    backgroundColor: downColor,
    borderColor: downColor
  },
  activeTimeframeSliderText: {
    color: "#ffffff"
  },
  ask: {
    color: downColor
  },
  battery: {
    borderColor: marketText,
    borderRadius: 4,
    borderWidth: 1,
    height: 12,
    padding: 2,
    width: 24
  },
  batteryFill: {
    backgroundColor: marketText,
    borderRadius: 2,
    flex: 1
  },
  bid: {
    color: upColor
  },
  buyToggle: {
    alignItems: "center",
    backgroundColor: upColor,
    borderRadius: 6,
    flex: 1,
    justifyContent: "center",
    minHeight: 26
  },
  buyToggleText: {
    color: marketBackground,
    fontFamily: marketNumberFontFamily,
    fontSize: 12,
    fontWeight: "900"
  },
  chartBand: {
    alignItems: "center",
    backgroundColor: marketBackground,
    marginTop: 0,
    overflow: "hidden",
    paddingBottom: 8,
    paddingTop: 0
  },
  controlLabel: {
    color: marketMuted,
    fontFamily: marketNumberFontFamily,
    fontSize: 9,
    fontWeight: "900",
    marginBottom: 3,
    textTransform: "uppercase"
  },
  emptyTradesState: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  emptyTradesText: {
    color: marketMuted,
    fontFamily: marketNumberFontFamily,
    fontSize: 11,
    fontWeight: "800",
    textAlign: "center"
  },
  inactiveBuyText: {
    color: upColor
  },
  inactiveTradeToggle: {
    backgroundColor: "#121d34",
    borderColor: "#283653",
    borderWidth: 1
  },
  inputBoxRow: {
    alignItems: "center",
    backgroundColor: "#111b32",
    borderColor: "#24334f",
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    minHeight: 24,
    paddingHorizontal: 7
  },
  inspectColumn: {
    alignItems: "flex-start",
    flexShrink: 1,
    gap: 0,
    minWidth: 30
  },
  inspectDateBlock: {
    alignItems: "flex-start",
    flexShrink: 0,
    gap: 0,
    width: 56
  },
  inspectDateText: {
    color: "#c0c7d8",
    fontFamily: marketNumberFontFamily,
    fontSize: 11,
    fontVariant: ["tabular-nums"],
    fontWeight: "400",
    lineHeight: 14,
    textAlign: "left"
  },
  inspectHeader: {
    alignItems: "center",
    backgroundColor: marketBackground,
    flex: 1,
    flexDirection: "row",
    gap: 5,
    height: "100%",
    justifyContent: "flex-start",
    minWidth: 0,
    paddingBottom: 0,
    paddingTop: 0
  },
  inspectHeaderPlaceholder: {
    flex: 1,
    minWidth: 0
  },
  inspectMetric: {
    color: marketText,
    fontFamily: marketNumberFontFamily,
    fontSize: 9,
    fontVariant: ["tabular-nums"],
    fontWeight: "400",
    lineHeight: 13,
    textAlign: "left"
  },
  inspectMetricLabel: {
    color: "#c0c7d8"
  },
  inspectMetricValue: {
    color: marketText
  },
  latestPrice: {
    color: marketText,
    fontFamily: marketNumberFontFamily,
    fontSize: 32,
    fontVariant: ["tabular-nums"],
    fontWeight: "500",
    lineHeight: 36
  },
  marketHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    marginTop: 12,
    paddingBottom: 10
  },
  marketStatLabel: {
    color: marketMuted,
    fontSize: 12,
    fontWeight: "400"
  },
  marketStatRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between"
  },
  marketStatValue: {
    color: marketText,
    flexShrink: 1,
    fontFamily: marketNumberFontFamily,
    fontSize: 12,
    fontVariant: ["tabular-nums"],
    fontWeight: "400",
    textAlign: "right"
  },
  marketStats: {
    flexShrink: 1,
    gap: 4,
    minWidth: 124
  },
  myTradeMeta: {
    minWidth: 42
  },
  myTradePrice: {
    color: marketText,
    flex: 1,
    fontFamily: marketNumberFontFamily,
    fontSize: 11,
    fontVariant: ["tabular-nums"],
    fontWeight: "800",
    textAlign: "right"
  },
  myTradeRow: {
    alignItems: "center",
    borderBottomColor: marketDivider,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    gap: 8,
    minHeight: 26
  },
  myTradeSide: {
    fontFamily: marketNumberFontFamily,
    fontSize: 11,
    fontWeight: "900"
  },
  myTradeStatus: {
    color: marketMuted,
    fontFamily: marketNumberFontFamily,
    fontSize: 10,
    fontWeight: "800",
    minWidth: 38,
    textAlign: "right"
  },
  myTradeTime: {
    color: marketMuted,
    fontFamily: marketNumberFontFamily,
    fontSize: 9,
    fontVariant: ["tabular-nums"],
    fontWeight: "700"
  },
  myTradeValue: {
    color: marketText,
    flex: 1,
    fontFamily: marketNumberFontFamily,
    fontSize: 11,
    fontWeight: "800"
  },
  myTradesList: {
    backgroundColor: "#0c1426",
    borderRadius: 6,
    flex: 1,
    marginBottom: -4,
    marginTop: 4,
    overflow: "hidden"
  },
  myTradesPanel: {
    backgroundColor: marketBackground,
    flex: 1,
    paddingTop: 8
  },
  orderTypeButton: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    minHeight: 24
  },
  orderTypeText: {
    color: marketMuted,
    fontFamily: marketNumberFontFamily,
    fontSize: 10,
    fontWeight: "900"
  },
  orderTypeToggle: {
    backgroundColor: "#111b32",
    borderRadius: 7,
    flexDirection: "row",
    marginBottom: 6,
    overflow: "hidden"
  },
  panelHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5
  },
  panelMeta: {
    color: marketMuted,
    fontFamily: marketNumberFontFamily,
    fontSize: 11,
    fontWeight: "900"
  },
  panelTitle: {
    color: marketText,
    fontFamily: marketNumberFontFamily,
    fontSize: 13,
    fontWeight: "900"
  },
  placeSellButton: {
    backgroundColor: downColor
  },
  placeTradeButton: {
    alignItems: "center",
    backgroundColor: upColor,
    borderRadius: 6,
    justifyContent: "center",
    marginTop: 4,
    minHeight: 22
  },
  placeTradeText: {
    color: marketBackground,
    fontFamily: marketNumberFontFamily,
    fontSize: 11,
    fontWeight: "900"
  },
  pressedControl: {
    opacity: 0.68
  },
  priceInput: {
    color: marketText,
    flex: 1,
    fontFamily: marketNumberFontFamily,
    fontSize: 11,
    fontVariant: ["tabular-nums"],
    fontWeight: "800",
    padding: 0,
    textAlign: "right"
  },
  priceStepButton: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 18,
    width: 18
  },
  priceStepText: {
    color: marketMuted,
    fontFamily: marketNumberFontFamily,
    fontSize: 12,
    fontWeight: "900",
    lineHeight: 14
  },
  priceSummary: {
    flex: 1,
    minWidth: 118
  },
  quantityPresetButton: {
    alignItems: "center",
    backgroundColor: "#111b32",
    borderRadius: 5,
    flex: 1,
    justifyContent: "center",
    minHeight: 20
  },
  quantityPresetRow: {
    flexDirection: "row",
    gap: 3,
    marginBottom: 6,
    marginTop: 4
  },
  quantityPresetText: {
    color: marketMuted,
    fontFamily: marketNumberFontFamily,
    fontSize: 9,
    fontWeight: "900"
  },
  screen: {
    alignSelf: "center",
    backgroundColor: marketBackground,
    borderWidth: 0,
    paddingBottom: 0,
    paddingHorizontal: 14,
    paddingTop: 12,
    shadowOpacity: 0
  },
  sellToggle: {
    alignItems: "center",
    backgroundColor: "#24162a",
    borderColor: "#573157",
    borderRadius: 6,
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    minHeight: 26
  },
  sellToggleText: {
    color: downColor,
    fontFamily: marketNumberFontFamily,
    fontSize: 12,
    fontWeight: "900"
  },
  sessionMove: {
    fontFamily: marketNumberFontFamily,
    fontSize: 12,
    fontVariant: ["tabular-nums"],
    fontWeight: "400",
    lineHeight: 16,
    marginTop: 2
  },
  sideToggle: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 5
  },
  signalBar: {
    backgroundColor: marketText,
    borderRadius: 2,
    height: 10,
    width: 4
  },
  signalBarMid: {
    height: 8
  },
  signalBarShort: {
    height: 6
  },
  signalBars: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: 2
  },
  statusBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8
  },
  statusCluster: {
    alignItems: "center",
    flexDirection: "row",
    gap: 7
  },
  statusText: {
    color: marketText,
    fontSize: 10,
    fontWeight: "900"
  },
  statusTime: {
    color: marketText,
    fontSize: 13,
    fontWeight: "900"
  },
  takeoverScreen: {
    alignSelf: "stretch",
    borderRadius: 0,
    borderWidth: 0,
    flex: 1,
    paddingBottom: 0,
    shadowOpacity: 0
  },
  takeoverScroll: {
    flex: 1
  },
  takeoverScrollContent: {
    paddingBottom: 10
  },
  timeframeSlider: {
    alignSelf: "flex-end",
    backgroundColor: "#111b32",
    borderRadius: 7,
    flexDirection: "row",
    flexShrink: 0,
    height: 24,
    overflow: "hidden",
    position: "relative",
    width: "42%"
  },
  timeframeSliderIndicator: {
    backgroundColor: cyanColor,
    borderRadius: 6,
    bottom: 0,
    position: "absolute",
    top: 0
  },
  timeframeSliderOption: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    minHeight: 24,
    zIndex: 1
  },
  timeframeSliderText: {
    color: "#aab3c8",
    fontSize: 9,
    fontWeight: "900"
  },
  timeframeSlot: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    height: 28,
    justifyContent: "center",
    marginTop: 8
  },
  tradeInput: {
    color: marketText,
    flex: 1,
    fontFamily: marketNumberFontFamily,
    fontSize: 12,
    fontVariant: ["tabular-nums"],
    fontWeight: "800",
    padding: 0,
    textAlign: "right"
  },
  tradeInputPrefix: {
    color: marketMuted,
    fontFamily: marketNumberFontFamily,
    fontSize: 11,
    fontWeight: "900",
    marginRight: 3
  },
  tradeInputsGrid: {
    gap: 0
  },
  tradePanel: {
    backgroundColor: marketBackground,
    flex: 1,
    paddingTop: 8
  },
  tradeSplit: {
    alignItems: "stretch",
    flexDirection: "row",
    gap: 10,
    marginTop: 8
  }
});
