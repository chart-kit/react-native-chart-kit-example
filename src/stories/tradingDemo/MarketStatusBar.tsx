import { Text, View } from "react-native";

import { styles } from "./styles";

export const MarketStatusBar = () => (
  <View style={styles.statusBar}>
    <Text style={styles.statusTime}>9:41</Text>
    <View style={styles.statusCluster}>
      <View style={styles.signalBars}>
        <View style={[styles.signalBar, styles.signalBarShort]} />
        <View style={[styles.signalBar, styles.signalBarMid]} />
        <View style={styles.signalBar} />
      </View>
      <Text style={styles.statusText}>5G</Text>
      <View style={styles.battery}>
        <View style={styles.batteryFill} />
      </View>
    </View>
  </View>
);
