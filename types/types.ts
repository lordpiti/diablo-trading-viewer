export interface ResponseTradingOrders {
  tradingData: TradingData;
  strategyResults: MacdStrategyResult | EmaStrategyResult;
  orders: Order[];
}

export interface StrategyResult {
  name: string;
}

export interface ResultBase {
  date: string;
}

export interface EmaResult extends ResultBase {
  ema: number;
}

export interface MacdResult extends ResultBase {
  macd: number;
  signal: number;
}

export type EmaMacdResult = MacdResult | EmaResult;

export interface MacdStrategyResult extends StrategyResult {
  macd: MacdResult[];
}

export interface EmaStrategyResult extends StrategyResult {
  ema10: EmaResult[];
  ema55: EmaResult[];
}

export interface Order {
  isBuy: boolean;
  timeStamp: string;
  value: number;
  cryptoAfterOrder: number;
  moneyAfterOrder: number;
  quantityMoney: number;
  quantityCrypto: number;
}

export interface TradingData {
  candles: Quote[];
}

export interface Quote {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface WithOrderData {
  order?: Order;
  date: string;
}
export interface EmaData extends WithOrderData {
  ema: number;
  ema2: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface MacData extends WithOrderData {
  macd: number;
  signal: number;
}

export interface AllData {
  candles: EmaData[];
  macd: MacData[];
  combined: MacData[];
}
