import { Pressable, Text, TextInput, View } from "react-native";

import { orderTypeOptions, quantityPresetOptions } from "./constants";
import { styles } from "./styles";
import type {
  MyTradeRow,
  OrderType,
  TimeframeOption,
  TradeSide
} from "./types";

const TradePanel = ({
  activeTimeframe,
  limitStopPrice,
  onChangeLimitStopPrice,
  onChangeOrderType,
  onChangeQuantity,
  onChangeTradeSide,
  onAdjustLimitStopPrice,
  onPlaceTrade,
  orderType,
  quantityValue,
  tradeSide
}: {
  activeTimeframe: TimeframeOption;
  limitStopPrice: string;
  onChangeLimitStopPrice: (value: string) => void;
  onChangeOrderType: (value: OrderType) => void;
  onChangeQuantity: (value: string) => void;
  onChangeTradeSide: (value: TradeSide) => void;
  onAdjustLimitStopPrice: (step: number) => void;
  onPlaceTrade: () => void;
  orderType: OrderType;
  quantityValue: string;
  tradeSide: TradeSide;
}) => (
  <View style={styles.tradePanel}>
    <View style={styles.panelHeader}>
      <Text style={styles.panelTitle}>Trade</Text>
      <Text style={styles.panelMeta}>{activeTimeframe}</Text>
    </View>
    <Text style={styles.controlLabel}>Side</Text>
    <View style={styles.sideToggle}>
      <Pressable
        accessibilityLabel="Buy BTC"
        accessibilityRole="button"
        accessibilityState={{ selected: tradeSide === "buy" }}
        onPress={() => onChangeTradeSide("buy")}
        style={({ pressed }) => [
          styles.buyToggle,
          tradeSide !== "buy" && styles.inactiveTradeToggle,
          pressed && styles.pressedControl
        ]}
      >
        <Text
          style={[
            styles.buyToggleText,
            tradeSide !== "buy" && styles.inactiveBuyText
          ]}
        >
          Buy
        </Text>
      </Pressable>
      <Pressable
        accessibilityLabel="Sell BTC"
        accessibilityRole="button"
        accessibilityState={{ selected: tradeSide === "sell" }}
        onPress={() => onChangeTradeSide("sell")}
        style={({ pressed }) => [
          styles.sellToggle,
          tradeSide === "sell" && styles.activeSellToggle,
          pressed && styles.pressedControl
        ]}
      >
        <Text
          style={[
            styles.sellToggleText,
            tradeSide === "sell" && styles.activeSellText
          ]}
        >
          Sell
        </Text>
      </Pressable>
    </View>

    <Text style={styles.controlLabel}>Order type</Text>
    <View style={styles.orderTypeToggle}>
      {orderTypeOptions.map((item) => {
        const isActive = item === orderType;

        return (
          <Pressable
            key={item}
            accessibilityLabel={"Use " + item.toLowerCase() + " order"}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            onPress={() => onChangeOrderType(item)}
            style={({ pressed }) => [
              styles.orderTypeButton,
              isActive && styles.activeOrderTypeButton,
              pressed && styles.pressedControl
            ]}
          >
            <Text
              numberOfLines={1}
              style={[
                styles.orderTypeText,
                isActive && styles.activeOrderTypeText
              ]}
            >
              {item}
            </Text>
          </Pressable>
        );
      })}
    </View>

    <Text style={styles.controlLabel}>Quantity</Text>
    <View style={styles.tradeInputsGrid}>
      <View style={styles.inputBoxRow}>
        <TextInput
          accessibilityLabel="Order quantity"
          keyboardType="decimal-pad"
          onChangeText={onChangeQuantity}
          style={styles.tradeInput}
          value={quantityValue}
        />
      </View>
      <View style={styles.quantityPresetRow}>
        {quantityPresetOptions.map((item) => (
          <Pressable
            key={item}
            accessibilityLabel={"Set quantity to " + item}
            accessibilityRole="button"
            onPress={() => onChangeQuantity(item)}
            style={({ pressed }) => [
              styles.quantityPresetButton,
              quantityValue === item && styles.activeQuantityPreset,
              pressed && styles.pressedControl
            ]}
          >
            <Text
              style={[
                styles.quantityPresetText,
                quantityValue === item && styles.activeQuantityPresetText
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.controlLabel}>Limit/Stop price</Text>
      <View style={styles.inputBoxRow}>
        <Pressable
          accessibilityLabel="Decrease limit or stop price by 100 dollars"
          accessibilityRole="button"
          onPress={() => onAdjustLimitStopPrice(-100)}
          style={({ pressed }) => [
            styles.priceStepButton,
            pressed && styles.pressedControl
          ]}
        >
          <Text style={styles.priceStepText}>-</Text>
        </Pressable>
        <Text style={styles.tradeInputPrefix}>$</Text>
        <TextInput
          accessibilityLabel="Limit or stop price"
          keyboardType="decimal-pad"
          onChangeText={onChangeLimitStopPrice}
          style={styles.priceInput}
          value={limitStopPrice}
        />
        <Pressable
          accessibilityLabel="Increase limit or stop price by 100 dollars"
          accessibilityRole="button"
          onPress={() => onAdjustLimitStopPrice(100)}
          style={({ pressed }) => [
            styles.priceStepButton,
            pressed && styles.pressedControl
          ]}
        >
          <Text style={styles.priceStepText}>+</Text>
        </Pressable>
      </View>
      <Pressable
        accessibilityLabel={"Place " + tradeSide + " trade"}
        accessibilityRole="button"
        onPress={onPlaceTrade}
        style={({ pressed }) => [
          styles.placeTradeButton,
          tradeSide === "sell" && styles.placeSellButton,
          pressed && styles.pressedControl
        ]}
      >
        <Text style={styles.placeTradeText}>
          Place {tradeSide === "buy" ? "Buy" : "Sell"}
        </Text>
      </Pressable>
    </View>
  </View>
);

const MyTradesPanel = ({ rows }: { rows: MyTradeRow[] }) => (
  <View style={styles.myTradesPanel}>
    <View style={styles.panelHeader}>
      <Text style={styles.panelTitle}>My trades</Text>
      <Text style={styles.panelMeta}>{rows.length}</Text>
    </View>
    <View style={styles.myTradesList}>
      {rows.length === 0 ? (
        <View style={styles.emptyTradesState}>
          <Text style={styles.emptyTradesText}>No trades yet</Text>
        </View>
      ) : (
        rows.map((row) => (
          <View key={row.id} style={styles.myTradeRow}>
            <View style={styles.myTradeMeta}>
              <Text
                numberOfLines={1}
                style={[
                  styles.myTradeSide,
                  row.side === "buy" ? styles.bid : styles.ask
                ]}
              >
                {row.side === "buy" ? "Buy" : "Sell"}
              </Text>
              <Text numberOfLines={1} style={styles.myTradeTime}>
                {row.time}
              </Text>
            </View>
            <Text numberOfLines={1} style={styles.myTradeValue}>
              {row.size}
            </Text>
            <Text numberOfLines={1} style={styles.myTradePrice}>
              {row.price}
            </Text>
            <Text numberOfLines={1} style={styles.myTradeStatus}>
              {row.status}
            </Text>
          </View>
        ))
      )}
    </View>
  </View>
);

export const TradeDesk = ({
  activeTimeframe,
  limitStopPrice,
  onChangeLimitStopPrice,
  onChangeOrderType,
  onChangeQuantity,
  onChangeTradeSide,
  onAdjustLimitStopPrice,
  onPlaceTrade,
  orderType,
  quantityValue,
  rows,
  tradeSide
}: {
  activeTimeframe: TimeframeOption;
  limitStopPrice: string;
  onChangeLimitStopPrice: (value: string) => void;
  onChangeOrderType: (value: OrderType) => void;
  onChangeQuantity: (value: string) => void;
  onChangeTradeSide: (value: TradeSide) => void;
  onAdjustLimitStopPrice: (step: number) => void;
  onPlaceTrade: () => void;
  orderType: OrderType;
  quantityValue: string;
  rows: MyTradeRow[];
  tradeSide: TradeSide;
}) => (
  <View style={styles.tradeSplit}>
    <TradePanel
      activeTimeframe={activeTimeframe}
      limitStopPrice={limitStopPrice}
      onChangeLimitStopPrice={onChangeLimitStopPrice}
      onChangeOrderType={onChangeOrderType}
      onChangeQuantity={onChangeQuantity}
      onChangeTradeSide={onChangeTradeSide}
      onAdjustLimitStopPrice={onAdjustLimitStopPrice}
      onPlaceTrade={onPlaceTrade}
      orderType={orderType}
      quantityValue={quantityValue}
      tradeSide={tradeSide}
    />
    <MyTradesPanel rows={rows} />
  </View>
);
