import axiosInstance from "axios";
import { ResponseTradingOrders } from "../types/types";

export const getKlines = async (
  symbol: string,
  klinesInterval: number,
  strategy: number
) => {
  return axiosInstance.get<ResponseTradingOrders>(
    `${process.env.NEXT_PUBLIC_TRADING_API_URL}/api/trading/klines/${symbol}/interval/${klinesInterval}/strategy/${strategy}?includeOrders=true`
  );
};
