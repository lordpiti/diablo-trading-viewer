import axiosInstance, { AxiosResponse } from 'axios';
import { ResponseTradingOrders } from '../components/interfaces/types';

export const getKlines = (
  symbol: string,
  klinesInterval: number,
  strategy: number
) => {
  return axiosInstance.get<ResponseTradingOrders>(
    `${process.env.REACT_APP_TRADING_API_URL}/api/trading/klines/${symbol}/interval/${klinesInterval}/strategy/${strategy}?includeOrders=true`
  );
};

export class BinanceService {
  public async getKlines(
    symbol: string,
    klinesInterval: number,
    strategy: number
  ): Promise<AxiosResponse<ResponseTradingOrders>> {
    return await axiosInstance.get<ResponseTradingOrders>(
      `${process.env.REACT_APP_TRADING_API_URL}/api/trading/klines/${symbol}/interval/${klinesInterval}/strategy/${strategy}?includeOrders=true`
    );
  }
}
