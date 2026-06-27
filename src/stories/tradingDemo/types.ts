export type TradingCandlePoint = {
  close: number;
  date: string;
  high: number;
  low: number;
  open: number;
  slot: number;
  timestamp: number;
  time: string;
  volume: number;
  year: string;
};

export type TimeframeOption = "5m" | "1h" | "1d" | "1w" | "1m" | "1q";
export type OrderType = "Limit" | "Market" | "Stop";
export type TradeSide = "buy" | "sell";
type TradeStatus = "Filled" | "Open";

export type MyTradeRow = {
  fillPrice?: number;
  fillTime?: string;
  id: string;
  orderType: OrderType;
  price: string;
  side: TradeSide;
  size: string;
  status: TradeStatus;
  time: string;
  triggerPrice?: number;
};
