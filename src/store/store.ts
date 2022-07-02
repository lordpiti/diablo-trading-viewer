import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { reducers } from './reducers';

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => {
    const reduxDefaultMiddleware = getDefaultMiddleware();
    return [...reduxDefaultMiddleware];
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
