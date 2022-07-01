// import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AllData,
  COMBINED_STRATEGY,
  EmaData,
  EMA_STRATEGY,
  MacData,
  MACD_STRATEGY,
} from '../../components/crypto-dashboard';
import {
  EmaStrategyResult,
  MacdStrategyResult,
} from '../../components/interfaces/types';
import { AppDispatch, BinanceThunk } from '../../store/store';
import { formatDate } from '../../utils/formatters';
import { fetchKlinesSuccess } from './binance.reducer';

export const fetchKlines = (
  symbol: string,
  klinesInterval: number
): BinanceThunk => {
  return async (dispatch: AppDispatch, _, { binanceService }) => {
    const responseEma = await binanceService.getKlines(
      symbol,
      klinesInterval,
      EMA_STRATEGY
    );
    const responseMacd = await binanceService.getKlines(
      symbol,
      klinesInterval,
      MACD_STRATEGY
    );
    const responseCombined = await binanceService.getKlines(
      symbol,
      klinesInterval,
      COMBINED_STRATEGY
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
    dispatch(fetchKlinesSuccess(fulobj));
  };
};

// First, create the thunk
// export const fetchBinanceData = createAsyncThunk(
//     'binance/fetchData',
//     async (userId: number, thunkAPI) => {
//       const response = await userAPI.fetchById(userId)
//       return response.data
//     }
//   )
