import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AllData } from '../components/crypto-dashboard';

export type BinanceState = {
  allData?: AllData;
  loading: boolean;
  error: string;
};

export const EMA_STRATEGY = 0;
export const MACD_STRATEGY = 1;
export const COMBINED_STRATEGY = 2;

export const INITIAL_STATE: BinanceState = {
  allData: undefined,
  loading: false,
  error: '',
};
const binanceReducer = createSlice({
  name: 'binance',
  initialState: INITIAL_STATE,
  reducers: {
    fetchKlines: (state) => {
      state.loading = true;
      state.error = '';
    },
    fetchKlinesSuccess: (state, { payload }: PayloadAction<AllData>) => {
      return {
        ...state,
        allData: payload,
        loading: false,
        error: '',
      };
    },
    fetchKlinesError: (state, { payload }: PayloadAction<string>) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { fetchKlines, fetchKlinesError, fetchKlinesSuccess } =
  binanceReducer.actions;

export default binanceReducer.reducer;
