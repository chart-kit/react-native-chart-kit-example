import { useEffect, useRef } from "react";
import { Animated, Easing, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { analyticsMuted } from "./constants";
import type { RealtimeCountryRow } from "./data";
import { styles } from "./styles";

const countryAnimationMs = 900;

const AnimatedCountryFill = ({
  country,
  isVisualMode,
  percent
}: {
  country: string;
  isVisualMode?: boolean;
  percent: number;
}) => {
  const animatedPercent = useRef(new Animated.Value(percent)).current;

  useEffect(() => {
    animatedPercent.stopAnimation();

    if (isVisualMode) {
      animatedPercent.setValue(percent);

      return undefined;
    }

    const animation = Animated.timing(animatedPercent, {
      duration: countryAnimationMs,
      easing: Easing.out(Easing.cubic),
      toValue: percent,
      useNativeDriver: false
    });

    animation.start();

    return () => {
      animation.stop();
    };
  }, [animatedPercent, isVisualMode, percent]);

  return (
    <Animated.View
      style={[
        styles.countryFill,
        {
          width: animatedPercent.interpolate({
            extrapolate: "clamp",
            inputRange: [0, 100],
            outputRange: ["0%", "100%"]
          })
        }
      ]}
      testID={`country-fill-${country}`}
    />
  );
};

export const RealtimeCountries = ({
  isVisualMode,
  rows
}: {
  isVisualMode?: boolean;
  rows: RealtimeCountryRow[];
}) => {
  const maxUsers = Math.max(1, ...rows.map((row) => row.users));

  return (
    <View style={styles.countryTable}>
      <View style={styles.countryHeader}>
        <View style={styles.countryHeaderCell}>
          <Text style={styles.countryHeaderText}>Country</Text>
          <Ionicons name="caret-down" size={13} color={analyticsMuted} />
        </View>
        <View style={[styles.countryHeaderCell, styles.countryHeaderCellEnd]}>
          <Text style={styles.countryHeaderText}>Active users</Text>
          <Ionicons name="caret-down" size={13} color={analyticsMuted} />
        </View>
      </View>
      {rows.map((row) => (
        <View key={row.country} style={styles.countryRow} testID="country-row">
          <View style={styles.countryRowText}>
            <Text numberOfLines={1} style={styles.countryName}>
              {row.country}
            </Text>
            <Text style={styles.countryUsers}>{row.users}</Text>
          </View>
          <View style={styles.countryTrack}>
            <AnimatedCountryFill
              country={row.country}
              isVisualMode={isVisualMode}
              percent={Math.max(6, (row.users / maxUsers) * 100)}
            />
          </View>
        </View>
      ))}
    </View>
  );
};
