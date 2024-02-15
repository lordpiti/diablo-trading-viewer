"use client";

import React, { useState } from "react";
import Chart from "../ema-chart";
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Macd from "../macd-chart";
import OrdersAccordion from "../orders-accordion";
import { WithOrderData } from "../../types/types";
import { useBinanceData } from "../../hooks/useBinanceData";
import Settings from "../settings";
import {
  COMBINED_STRATEGY_LABEL,
  DEFAULT_INTERVAL,
  DEFAULT_STRATEGY,
  DEFAULT_SYMBOL,
  EMA_STRATEGY_LABEL,
  MACD_STRATEGY_LABEL,
  strategyDictionary,
} from "@/constants/constants";

export const CryptoDashboard = () => {
  const { isLoading, binanceData } = useBinanceData(
    currentSymbol,
    currentKlinesInterval
  );

  const getCurrentOrders = () => {
    if (binanceData) {
      const getOrdersFromData = (strategyData: WithOrderData[]) => {
        const orders = strategyData.filter((x) => x.order).map((x) => x.order!);
        return orders;
      };

      switch (currentStrategy) {
        case EMA_STRATEGY_LABEL:
          return getOrdersFromData(binanceData.candles);
        case MACD_STRATEGY_LABEL:
          return getOrdersFromData(binanceData.macd);
        case COMBINED_STRATEGY_LABEL:
          return getOrdersFromData(binanceData.combined);
        default:
          return [];
      }
    }
    return [];
  };

  return (
    <>
      {binanceData && (
        <>
          <Grid item xs={12} md={3}>
            <Settings />
            <br></br>
            <OrdersAccordion orders={getCurrentOrders()} />
          </Grid>
          <Grid item xs={12} md={9}>
            <Paper>
              {currentStrategy === EMA_STRATEGY_LABEL && (
                <Chart candleData={binanceData.candles} />
              )}
              {currentStrategy === MACD_STRATEGY_LABEL && (
                <Macd data={binanceData.macd} />
              )}
              {currentStrategy === COMBINED_STRATEGY_LABEL && (
                <Macd data={binanceData.combined} />
              )}
            </Paper>
          </Grid>
        </>
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 10 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
