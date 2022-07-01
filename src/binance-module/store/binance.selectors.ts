import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { BinanceState } from './binance.reducer';

const binanceState = (state: RootState): BinanceState => state.binanceState;

export const getKlines = createSelector(binanceState, (slice) => slice.allData);
