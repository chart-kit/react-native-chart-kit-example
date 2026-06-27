import { StyleSheet } from "react-native";

import {
  analyticsBorder,
  analyticsInk,
  analyticsMuted,
  analyticsPage,
  analyticsPanel
} from "./constants";

export const styles = StyleSheet.create({
  chartSlot: {
    alignItems: "center",
    marginHorizontal: -4
  },
  content: {
    alignSelf: "center",
    paddingBottom: 14,
    paddingTop: 10
  },
  countryFill: {
    backgroundColor: "#1a73e8",
    borderRadius: 99,
    height: "100%"
  },
  countryHeader: {
    alignItems: "center",
    borderBottomColor: "#d7dce3",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 7
  },
  countryHeaderCell: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5
  },
  countryHeaderCellEnd: {
    justifyContent: "flex-end"
  },
  countryHeaderText: {
    color: analyticsMuted,
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0,
    lineHeight: 15
  },
  countryName: {
    color: analyticsInk,
    flex: 1,
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 15
  },
  countryRow: {
    paddingTop: 8
  },
  countryRowText: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between"
  },
  countryTable: {
    borderTopColor: "#eef3fb",
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: 4,
    paddingTop: 8
  },
  countryTrack: {
    backgroundColor: "#edf3fb",
    borderRadius: 99,
    height: 3,
    marginTop: 5,
    overflow: "hidden",
    width: "100%"
  },
  countryUsers: {
    color: analyticsInk,
    fontSize: 11,
    fontVariant: ["tabular-nums"],
    fontWeight: "700",
    lineHeight: 15,
    textAlign: "right"
  },
  panel: {
    backgroundColor: analyticsPanel,
    borderColor: analyticsBorder,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 12,
    overflow: "hidden",
    padding: 14,
    shadowColor: "#174ea6",
    shadowOffset: { height: 10, width: 0 },
    shadowOpacity: 0.07,
    shadowRadius: 18
  },
  panelHeader: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    marginBottom: 10
  },
  panelMeta: {
    color: analyticsMuted,
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16
  },
  panelTitle: {
    color: analyticsInk,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0,
    lineHeight: 20
  },
  screen: {
    alignSelf: "center",
    backgroundColor: analyticsPage,
    borderColor: "#dce6f3",
    borderRadius: 24,
    borderWidth: 1,
    paddingBottom: 14,
    paddingHorizontal: 12,
    paddingTop: 12,
    shadowColor: "#174ea6",
    shadowOffset: { height: 18, width: 0 },
    shadowOpacity: 0.11,
    shadowRadius: 28
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
  statusSignal: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: 2
  },
  statusSignalBar: {
    backgroundColor: analyticsInk,
    borderRadius: 2,
    height: 10,
    width: 4
  },
  statusSignalBarMid: {
    height: 8
  },
  statusSignalBarShort: {
    height: 6
  },
  statusText: {
    color: analyticsInk,
    fontSize: 10,
    fontWeight: "700"
  },
  statusTime: {
    color: analyticsInk,
    fontSize: 13,
    fontWeight: "700"
  },
  takeOverScreen: {
    alignSelf: "stretch",
    borderRadius: 0,
    borderWidth: 0,
    flex: 1,
    paddingBottom: 0,
    shadowOpacity: 0
  },
  takeOverScroll: {
    flex: 1
  },
  takeOverScrollContent: {
    alignItems: "center",
    paddingBottom: 18
  }
});
