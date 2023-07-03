import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { fetchKlines } from '../store/binance.actions';
import { getKlines } from '../store/binance.selectors';

export const useBinanceData = (symbol: string, klinesInterval: number) => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [error, setError] = useState<unknown>();

  const binanceData = useSelector(getKlines);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    try {
      setIsLoading(true);
      dispatch(fetchKlines({ symbol, klinesInterval }));
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }, [symbol, klinesInterval, dispatch]);

  return {
    isLoading,
    binanceData,
    error,
  };
};
