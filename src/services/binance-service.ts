import axiosInstance from 'axios';
import { ResponseTradingOrders } from '../interfaces/types';

export const getKlines = (symbol: string, klinesInterval: number, strategy: number) =>{
  return axiosInstance.get<ResponseTradingOrders>(
    `${process.env.REACT_APP_TRADING_API_URL}/api/trading/klines/${symbol}/interval/${klinesInterval}/strategy/${strategy}?includeOrders=true`
  );
}