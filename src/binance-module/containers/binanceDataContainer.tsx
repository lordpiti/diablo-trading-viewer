import React, { ReactNode, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { fetchKlines } from '../store/binance.actions';
import { getKlines } from '../store/binance.selectors';
import { AllData } from '../types/types';

interface BinanceDataContainerProps {
  symbol: string;
  klinesInterval: number;
  children: (props: BinanceDataChildProps) => ReactNode;
}

export interface BinanceDataChildProps {
  currentData?: AllData;
}

export const BinanceDataContainer = (props: BinanceDataContainerProps) => {
  const { symbol, klinesInterval, children } = props;
  const binanceData = useSelector(getKlines);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchKlines({ symbol, klinesInterval }));
  }, [symbol, klinesInterval, dispatch]);

  return (children({ currentData: binanceData }));
};