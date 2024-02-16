import axiosInstance from "axios";

import { strategyValueDictionary } from "@/constants/constants";
import * as binanceService from "@/services/binance-service";
import { ResponseTradingOrders } from "@/types/types";
import { formatBinanceDataByStrategy } from "@/utils/formatters";

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
  strategy: string,
  symbol: string,
  interval: number
) => {
  try {
    const res = await binanceService.getKlines(
      symbol,
      interval,
      strategyValueDictionary[strategy]
    );

    return formatBinanceDataByStrategy[strategy](res.data);
  } catch (e: unknown) {
    throw new Error((e as Error).message);
  }
};
