import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { reducers } from './reducers';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { BinanceState } from '../binance-module/store/binance.reducer';
import { BinanceService } from '../services/binance-service';

export type ThunkArguments = {
  binanceService: BinanceService;
};

export type TradingDispatch = ThunkDispatch<BinanceState, ThunkArguments, any>;

export type BinanceThunk = ThunkAction<
  Promise<void> | Promise<any>,
  BinanceState,
  ThunkArguments,
  any
>;

const thunkMiddware = thunk.withExtraArgument<ThunkArguments>({
  binanceService: new BinanceService(),
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => {
    // const reduxDefaultMiddleware = getDefaultMiddleware();
    return [thunkMiddware];
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
