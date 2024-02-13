import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/store';
import { fetchKlines } from '../store/binance.actions';
import { getKlines } from '../store/binance.selectors';

export const useBinanceData = (symbol: string, klinesInterval: number) => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [error, setError] = useState<unknown>();

  const binanceData = useSelector(getKlines);
  const dispatch = useAppDispatch();

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
