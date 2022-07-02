import axiosInstance from 'axios';
import { ResponseTradingOrders } from '../../components/interfaces/types';

export const getKlines = async (
  symbol: string,
  klinesInterval: number,
  strategy: number
) => {
  return await axiosInstance.get<ResponseTradingOrders>(
    `${process.env.REACT_APP_TRADING_API_URL}/api/trading/klines/${symbol}/interval/${klinesInterval}/strategy/${strategy}?includeOrders=true`
  );
};
