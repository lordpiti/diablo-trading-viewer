import axiosInstance from "axios";
import {
  AllData,
  EmaData,
  EmaStrategyResult,
  MacData,
  MacdStrategyResult,
  ResponseTradingOrders,
} from "../types/types";
import {
  COMBINED_STRATEGY_VALUE,
  EMA_STRATEGY_VALUE,
  MACD_STRATEGY_VALUE,
} from "@/constants/constants";
import { formatDate } from "@/utils/formatters";

export const getKlines = async (
  symbol: string,
  klinesInterval: number,
  strategy: number
) => {
  return await axiosInstance.get<ResponseTradingOrders>(
    `${
      import.meta.env.VITE_TRADING_API_URL
    }/api/trading/klines/${symbol}/interval/${klinesInterval}/strategy/${strategy}?includeOrders=true`
  );
};

export const getBinanceData = async (
  symbol: string,
  klinesInterval: number
) => {
  const responseEma = await getKlines(
    symbol,
    klinesInterval,
    EMA_STRATEGY_VALUE
  );
  const responseMacd = await getKlines(
    symbol,
    klinesInterval,
    MACD_STRATEGY_VALUE
  );
  const responseCombined = await getKlines(
    symbol,
    klinesInterval,
    COMBINED_STRATEGY_VALUE
  );

  const emaStrategyResult = responseEma.data
    .strategyResults as EmaStrategyResult;
  const emaData = responseEma.data.tradingData.candles.map<EmaData>(
    (x, index: number) => ({
      ...x,
      date: formatDate(x.date),
      ema: emaStrategyResult.ema10[index].ema,
      ema2: emaStrategyResult.ema55[index].ema,
      order: responseEma.data.orders.find((y) => y.timeStamp === x.date),
    })
  );

  const macStrategyResults = responseMacd.data
    .strategyResults as MacdStrategyResult;
  const macdData = macStrategyResults.macd.map<MacData>((x) => ({
    ...x,
    date: formatDate(x.date),
    order: responseMacd.data.orders.find((y) => y.timeStamp === x.date),
  }));

  const combinedStrategyResults = responseCombined.data
    .strategyResults as MacdStrategyResult;
  const combinedData = combinedStrategyResults.macd.map<MacData>((x) => ({
    ...x,
    date: formatDate(x.date),
    order: responseCombined.data.orders.find((y) => y.timeStamp === x.date),
  }));

  const fulobj = {
    candles: emaData,
    macd: macdData,
    combined: combinedData,
  } as AllData;

  return fulobj;
};
