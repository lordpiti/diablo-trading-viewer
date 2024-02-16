// Symbols
export const symbols = ["BTCUSDT", "ETHUSDT", "BNBUSDT"];

// Intervals
export const intervals = [
  { name: "1 min", value: 60 },
  { name: "3 min", value: 180 },
  { name: "5 min", value: 300 },
  { name: "15 min", value: 900 },
  { name: "30 min", value: 1800 },
  { name: "1 hour", value: 3600 },
  { name: "2 hours", value: 7200 },
  { name: "4 hours", value: 14400 },
  { name: "1 day", value: 86400 },
  { name: "3 days", value: 259200 },
  { name: "1 week", value: 604800 },
];
export const intervalValues = intervals.map((i) => i.value);

// Strategies
export const EMA_STRATEGY_VALUE = 0;
export const MACD_STRATEGY_VALUE = 1;
export const COMBINED_STRATEGY_VALUE = 2;
export const EMA_STRATEGY_KEY = "ema";
export const MACD_STRATEGY_KEY = "macd";
export const COMBINED_STRATEGY_KEY = "combined";
export const EMA_STRATEGY_LABEL = "Exponential Medium Average";
export const MACD_STRATEGY_LABEL = "MACD";
export const COMBINED_STRATEGY_LABEL = "MACD with EMAs guard";
export const strategyValueDictionary: Record<string, number> = {
  [EMA_STRATEGY_KEY]: EMA_STRATEGY_VALUE,
  [MACD_STRATEGY_KEY]: MACD_STRATEGY_VALUE,
  [COMBINED_STRATEGY_KEY]: COMBINED_STRATEGY_VALUE,
};
export const strategyList = Object.keys(strategyValueDictionary);
export const strategyLabelDictionary: Record<string, string> = {
  [EMA_STRATEGY_KEY]: EMA_STRATEGY_LABEL,
  [MACD_STRATEGY_KEY]: MACD_STRATEGY_LABEL,
  [COMBINED_STRATEGY_KEY]: COMBINED_STRATEGY_LABEL,
};

// Default values
export const DEFAULT_STRATEGY = strategyList[0];
export const DEFAULT_SYMBOL = symbols[0];
export const DEFAULT_INTERVAL = intervalValues[5];
