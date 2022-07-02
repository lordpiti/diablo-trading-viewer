import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchKlines } from '../store/binance.actions';
import { getKlines } from '../store/binance.selectors';

export const BinanceDataContainer = (props: any) => {
  const { symbol, klinesInterval, children } = props;
  const binanceData = useSelector(getKlines);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!binanceData) {
      dispatch(fetchKlines({ symbol, klinesInterval }));
    }
  }, [binanceData, symbol, klinesInterval, dispatch]);

  return (<div>{children({ currentData: binanceData })}</div>);
};