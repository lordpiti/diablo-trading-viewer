import moment from "moment";

import {
  COMBINED_STRATEGY_KEY,
  EMA_STRATEGY_KEY,
  MACD_STRATEGY_KEY,
  strategyValueDictionary,
} from "@/constants/constants";
import {
  BinanceFormatter,
  EmaData,
  EmaStrategyResult,
  MacData,
  MacdStrategyResult,
  ResponseTradingOrders,
} from "@/types/types";

export const formatDate = (date: string) =>
  moment(new Date(date)).format("D/M/yyyy hh:mm");

export const formatEMAData = (data: ResponseTradingOrders) => {
  const emaStrategyResult = data.strategyResults as EmaStrategyResult;

  return data.tradingData.candles.map<EmaData>((x, index: number) => ({
    ...x,
    date: formatDate(x.date),
    ema: emaStrategyResult.ema10[index].ema,
    ema2: emaStrategyResult.ema55[index].ema,
    order: data.orders.find((y) => y.timeStamp === x.date),
  }));
};
export const formatMACDData = (data: ResponseTradingOrders) => {
  const macStrategyResults = data.strategyResults as MacdStrategyResult;

  return macStrategyResults.macd.map<MacData>((x) => ({
    ...x,
    date: formatDate(x.date),
    order: data.orders.find((y) => y.timeStamp === x.date),
  }));
};
export const formatCombinedData = (data: ResponseTradingOrders) => {
  const combinedStrategyResults = data.strategyResults as MacdStrategyResult;

  return combinedStrategyResults.macd.map<MacData>((x) => ({
    ...x,
    date: formatDate(x.date),
    order: data.orders.find((y) => y.timeStamp === x.date),
  }));
};

export const formatBinanceDataByStrategy: Record<
  keyof typeof strategyValueDictionary,
  BinanceFormatter
> = {
  [EMA_STRATEGY_KEY]: formatEMAData,
  [MACD_STRATEGY_KEY]: formatMACDData,
  [COMBINED_STRATEGY_KEY]: formatCombinedData,
};
