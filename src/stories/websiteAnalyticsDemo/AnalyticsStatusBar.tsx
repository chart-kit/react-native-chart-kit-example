import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { analyticsInk } from "./constants";
import { styles } from "./styles";

export const AnalyticsStatusBar = () => (
  <View style={styles.statusBar}>
    <Text style={styles.statusTime}>9:41</Text>
    <View style={styles.statusCluster}>
      <View style={styles.statusSignal}>
        <View style={[styles.statusSignalBar, styles.statusSignalBarShort]} />
        <View style={[styles.statusSignalBar, styles.statusSignalBarMid]} />
        <View style={styles.statusSignalBar} />
      </View>
      <Text style={styles.statusText}>5G</Text>
      <Ionicons name="battery-full" size={18} color={analyticsInk} />
    </View>
  </View>
);
