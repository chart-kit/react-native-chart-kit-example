import type { CandlestickChartPriceLineConfig } from "@chart-kit/pro/react-native";

import { formatTradingPrice } from "./formatters";
import type { MyTradeRow, OrderType, TradeSide } from "./types";

type CreateMockTradeOrderInput = {
  id: string;
  latestPrice: number;
  limitStopPrice: string;
  orderType: OrderType;
  quantityValue: string;
  side: TradeSide;
  time: string;
};

type FillMockTradeOrdersInput = {
  currentPrice: number;
  previousPrice: number;
  rows: readonly MyTradeRow[];
  time: string;
};

type TradingRangeInput = {
  high: number;
  low: number;
};

type FillMockTradeOrderInput = {
  id: string;
  rows: readonly MyTradeRow[];
  time: string;
};

type PendingTradePriceLineTheme = {
  buyColor: string;
  labelTextColor: string;
  sellColor: string;
};

export const demoOrderFillDelayMs = 2000;

const parseTradingNumber = (value: string) => {
  const parsed = Number(value.replace(/[$,\s]/g, ""));

  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
};

export const formatTradingInputPrice = (value: number) =>
  Math.max(1, Math.round(value)).toLocaleString("en-US");

export const stepTradingInputPrice = ({
  fallback,
  step,
  value
}: {
  fallback: number;
  step: number;
  value: string;
}) => formatTradingInputPrice((parseTradingNumber(value) ?? fallback) + step);

const formatTradeSize = (value: number) =>
  value.toLocaleString("en-US", {
    maximumFractionDigits: 4,
    minimumFractionDigits: 0
  });

export const createMockTradeOrder = ({
  id,
  latestPrice,
  limitStopPrice,
  orderType,
  quantityValue,
  side,
  time
}: CreateMockTradeOrderInput): MyTradeRow | undefined => {
  const quantity = parseTradingNumber(quantityValue);
  const requestedPrice =
    orderType === "Market" ? latestPrice : parseTradingNumber(limitStopPrice);

  if (quantity === undefined || requestedPrice === undefined) {
    return undefined;
  }

  return {
    ...(orderType === "Market"
      ? {
          fillPrice: requestedPrice,
          fillTime: time
        }
      : {}),
    id,
    orderType,
    price: formatTradingPrice(requestedPrice),
    side,
    size: formatTradeSize(quantity),
    status: orderType === "Market" ? "Filled" : "Open",
    time,
    ...(orderType === "Market" ? {} : { triggerPrice: requestedPrice })
  };
};

const shouldFillMockOrder = ({
  currentPrice,
  previousPrice,
  row
}: {
  currentPrice: number;
  previousPrice: number;
  row: MyTradeRow;
}) => {
  if (row.status !== "Open" || row.triggerPrice === undefined) {
    return false;
  }

  const crossedDown =
    previousPrice > row.triggerPrice && currentPrice <= row.triggerPrice;
  const crossedUp =
    previousPrice < row.triggerPrice && currentPrice >= row.triggerPrice;

  if (row.orderType === "Limit") {
    return row.side === "buy" ? crossedDown : crossedUp;
  }

  if (row.orderType === "Stop") {
    return row.side === "buy" ? crossedUp : crossedDown;
  }

  return false;
};

export const fillMockTradeOrders = ({
  currentPrice,
  previousPrice,
  rows,
  time
}: FillMockTradeOrdersInput): MyTradeRow[] => {
  let didFill = false;

  const nextRows = rows.map((row) => {
    if (!shouldFillMockOrder({ currentPrice, previousPrice, row })) {
      return row;
    }

    didFill = true;
    const fillPrice = row.triggerPrice ?? currentPrice;

    return {
      ...row,
      fillPrice,
      fillTime: time,
      price: formatTradingPrice(fillPrice),
      status: "Filled" as const,
      time
    };
  });

  return didFill ? nextRows : (rows as MyTradeRow[]);
};

export const isMockOrderInsideTradingRange = (
  row: MyTradeRow,
  range: TradingRangeInput
) =>
  row.status === "Open" &&
  row.triggerPrice !== undefined &&
  row.triggerPrice >= range.low &&
  row.triggerPrice <= range.high;

export const fillMockTradeOrder = ({
  id,
  rows,
  time
}: FillMockTradeOrderInput): MyTradeRow[] => {
  let didFill = false;

  const nextRows = rows.map((row) => {
    if (row.id !== id || row.status !== "Open") {
      return row;
    }

    didFill = true;
    const fillPrice = row.triggerPrice ?? parseTradingNumber(row.price);

    return {
      ...row,
      ...(fillPrice === undefined
        ? {}
        : {
            fillPrice,
            price: formatTradingPrice(fillPrice)
          }),
      fillTime: time,
      status: "Filled" as const,
      time
    };
  });

  return didFill ? nextRows : (rows as MyTradeRow[]);
};

export const getPendingTradePriceLines = (
  rows: readonly MyTradeRow[],
  theme: PendingTradePriceLineTheme
): CandlestickChartPriceLineConfig[] =>
  rows.flatMap((row) => {
    if (row.status !== "Open" || row.triggerPrice === undefined) {
      return [];
    }

    const color = row.side === "buy" ? theme.buyColor : theme.sellColor;
    const sideLabel = row.side === "buy" ? "Buy" : "Sell";

    return [
      {
        color,
        id: row.id,
        label: sideLabel + " " + row.orderType,
        labelFill: color,
        labelTextColor: theme.labelTextColor,
        lineOpacity: 0.76,
        price: row.triggerPrice,
        strokeDasharray: [5, 4],
        strokeWidth: 1
      }
    ];
  });
