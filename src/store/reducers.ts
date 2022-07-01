import { combineReducers } from '@reduxjs/toolkit';
import binanceReducer from '../binance-module/store/binance.reducer';

export const reducers = combineReducers({
  binanceState: binanceReducer,
});
