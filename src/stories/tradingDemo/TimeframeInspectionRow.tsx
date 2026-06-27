import { Pressable, Text, View } from "react-native";
import type { DimensionValue } from "react-native";

import {
  downColor,
  marketText,
  timeframeOptions,
  upColor
} from "./constants";
import {
  formatTradingVolume,
  formatInspectPercent,
  formatInspectPrice
} from "./formatters";
import { getTradingCandleTimeRange } from "./marketData";
import { styles } from "./styles";
import type { TradingCandlePoint, TimeframeOption } from "./types";

const InspectMetric = ({
  label,
  value,
  valueColor = marketText
}: {
  label: string;
  value: string;
  valueColor?: string;
}) => (
  <Text numberOfLines={1} style={styles.inspectMetric}>
    <Text style={styles.inspectMetricLabel}>{label} </Text>
    <Text style={[styles.inspectMetricValue, { color: valueColor }]}>
      {value}
    </Text>
  </Text>
);

export const TimeframeInspectionRow = ({
  activeTimeframe,
  onSelectTimeframe,
  selectedCandle,
  selectedInspectionColor,
  selectedInspectionPercent
}: {
  activeTimeframe: TimeframeOption;
  onSelectTimeframe: (timeframe: TimeframeOption) => void;
  selectedCandle?: TradingCandlePoint;
  selectedInspectionColor: string;
  selectedInspectionPercent: number;
}) => {
  const activeTimeframeIndex = Math.max(
    0,
    timeframeOptions.indexOf(activeTimeframe)
  );
  const optionWidthPercent = 100 / timeframeOptions.length;
  const indicatorLeft =
    `${activeTimeframeIndex * optionWidthPercent}%` as DimensionValue;
  const indicatorWidth = `${optionWidthPercent}%` as DimensionValue;

  return (
    <View style={styles.timeframeSlot}>
      {selectedCandle ? (
        <View style={styles.inspectHeader}>
          <View style={styles.inspectDateBlock}>
            <Text numberOfLines={1} style={styles.inspectDateText}>
              {selectedCandle.date + "/" + selectedCandle.year.slice(2)}
            </Text>
            <Text numberOfLines={1} style={styles.inspectDateText}>
              {getTradingCandleTimeRange(selectedCandle, activeTimeframe)}
            </Text>
          </View>
          <View style={styles.inspectColumn}>
            <InspectMetric
              label="O"
              value={formatInspectPrice(selectedCandle.open)}
              valueColor={selectedInspectionColor}
            />
            <InspectMetric
              label="C"
              value={formatInspectPrice(selectedCandle.close)}
              valueColor={selectedInspectionColor}
            />
          </View>
          <View style={styles.inspectColumn}>
            <InspectMetric
              label="H"
              value={formatInspectPrice(selectedCandle.high)}
              valueColor={upColor}
            />
            <InspectMetric
              label="L"
              value={formatInspectPrice(selectedCandle.low)}
              valueColor={downColor}
            />
          </View>
          <View style={styles.inspectColumn}>
            <InspectMetric
              label="%"
              value={formatInspectPercent(selectedInspectionPercent)}
              valueColor={selectedInspectionColor}
            />
            <InspectMetric
              label="Vol"
              value={formatTradingVolume(selectedCandle.volume)}
            />
          </View>
        </View>
      ) : (
        <View style={styles.inspectHeaderPlaceholder} />
      )}

      {/* Keep the selector mounted so inspect mode never shifts the chart. */}
      <View style={styles.timeframeSlider}>
        <View
          pointerEvents="none"
          style={[
            styles.timeframeSliderIndicator,
            {
              left: indicatorLeft,
              width: indicatorWidth
            }
          ]}
        />
        {timeframeOptions.map((item) => {
          const isActive = item === activeTimeframe;

          return (
            <Pressable
              key={item}
              accessibilityLabel={"Show " + item + " candles"}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              onPress={() => onSelectTimeframe(item)}
              style={({ pressed }) => [
                styles.timeframeSliderOption,
                pressed && styles.pressedControl
              ]}
            >
              <Text
                numberOfLines={1}
                style={[
                  styles.timeframeSliderText,
                  isActive && styles.activeTimeframeSliderText
                ]}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
