import { Text, View } from "react-native";

import {
  formatTradingHeaderPrice,
  formatTradingHeaderVolume,
  formatTradingMarketCap,
  formatMove
} from "./formatters";
import { styles } from "./styles";
import type { TradingCandlePoint } from "./types";

export const MarketHeader = ({
  latestCandle,
  marketMoveColor,
  priceMove,
  priceMovePercent,
  sessionHigh,
  sessionLow,
  sessionVolume
}: {
  latestCandle: TradingCandlePoint;
  marketMoveColor: string;
  priceMove: number;
  priceMovePercent: number;
  sessionHigh: number;
  sessionLow: number;
  sessionVolume: number;
}) => (
  <View style={styles.marketHeader}>
    <View style={styles.priceSummary}>
      <Text
        numberOfLines={1}
        style={[styles.latestPrice, { color: marketMoveColor }]}
      >
        {formatTradingHeaderPrice(latestCandle.close)}
      </Text>
      <Text
        numberOfLines={1}
        style={[styles.sessionMove, { color: marketMoveColor }]}
      >
        {priceMove >= 0 ? "▲" : "▼"} {formatMove(priceMove, priceMovePercent)}
      </Text>
    </View>
    <View style={styles.marketStats}>
      <View style={styles.marketStatRow}>
        <Text style={styles.marketStatLabel}>H/L</Text>
        <Text numberOfLines={1} style={styles.marketStatValue}>
          {formatTradingHeaderPrice(sessionHigh)}-
          {formatTradingHeaderPrice(sessionLow)}
        </Text>
      </View>
      <View style={styles.marketStatRow}>
        <Text style={styles.marketStatLabel}>Volume</Text>
        <Text numberOfLines={1} style={styles.marketStatValue}>
          {formatTradingHeaderVolume(sessionVolume)}
        </Text>
      </View>
      <View style={styles.marketStatRow}>
        <Text style={styles.marketStatLabel}>Mkt Cap</Text>
        <Text numberOfLines={1} style={styles.marketStatValue}>
          {formatTradingMarketCap(latestCandle.close)}
        </Text>
      </View>
    </View>
  </View>
);
