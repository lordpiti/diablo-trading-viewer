import {
  COMBINED_STRATEGY_KEY,
  DEFAULT_INTERVAL,
  DEFAULT_STRATEGY,
  DEFAULT_SYMBOL,
  EMA_STRATEGY_KEY,
  MACD_STRATEGY_KEY,
  intervals,
  strategyLabelDictionary,
  strategyList,
  symbols,
} from "@/constants/constants";
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
import React, { useState } from "react";
import { useBinanceData } from "../../hooks/useBinanceData";
import { EmaData, MacData } from "../../types/types";
import EmaChart from "../ema-chart";
import MacdChart from "../macd-chart";
import OrdersAccordion from "../orders-accordion";

const styles = {
  heading: {
    fontSize: 23,
    fontWeight: "bold",
    padding: "10px",
    marginBottom: "10px",
  },
  settings: {
    minWidth: 120,
  },
};

export const CryptoDashboard = () => {
  const [currentStrategy, setCurrentStrategy] = useState(DEFAULT_STRATEGY);
  const [currentSymbol, setCurrentSymbol] = useState(DEFAULT_SYMBOL);
  const [currentKlinesInterval, setCurrentInterval] =
    useState(DEFAULT_INTERVAL);
  const { isLoading, data } = useBinanceData(
    currentStrategy,
    currentSymbol,
    currentKlinesInterval
  );
  const orders = data?.filter((x) => x.order).map((x) => x.order!);

  const handleChangeStrategy = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStrategy = event.target.value;

    setCurrentStrategy(newStrategy);
  };

  const handleChangeSymbol = (event: SelectChangeEvent) => {
    const newSymbol = event.target.value;

    setCurrentSymbol(newSymbol);
  };

  const handleChangeInterval = (event: SelectChangeEvent<number>) => {
    const newInterval = event.target.value as number;

    setCurrentInterval(newInterval);
  };

  return (
    <>
      {data && (
        <div style={{ paddingTop: "20px" }}>
          <Container maxWidth={false}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Paper>
                  <Box sx={styles.heading}>Settings</Box>
                  <Grid
                    container
                    spacing={2}
                    sx={styles.settings}
                    justifyContent={"space-evenly"}
                  >
                    <Grid item>
                      <FormControl>
                        <InputLabel id="symbol-select-label">
                          Select symbol
                        </InputLabel>
                        <Select
                          value={currentSymbol}
                          onChange={handleChangeSymbol}
                          label="Select symbol"
                          labelId="symbol-select-label"
                          inputProps={{
                            name: "item",
                            id: "item",
                          }}
                        >
                          {symbols.map((symbol, index: number) => (
                            <MenuItem key={index} value={symbol}>
                              {symbol}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel
                          id="interval-select-label"
                          htmlFor="currentKlinesInterval"
                        >
                          Select interval
                        </InputLabel>
                        <Select
                          value={currentKlinesInterval}
                          label="Select interval"
                          onChange={handleChangeInterval}
                          labelId="interval-select-label"
                          inputProps={{
                            name: "item",
                            id: "item",
                          }}
                        >
                          {intervals.map((interval, index: number) => (
                            <MenuItem key={index} value={interval.value}>
                              {interval.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <FormControl
                    component="fieldset"
                    style={{ marginTop: "20px" }}
                  >
                    <FormLabel color="primary" component="legend">
                      Strategy
                    </FormLabel>
                    <RadioGroup
                      aria-label="strategy"
                      name="strategys"
                      value={currentStrategy}
                      onChange={handleChangeStrategy}
                    >
                      {strategyList.map((strategyKey) => (
                        <FormControlLabel
                          key={strategyKey}
                          value={strategyKey}
                          control={<Radio />}
                          label={strategyLabelDictionary[strategyKey]}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Paper>
                <br></br>
                {orders && <OrdersAccordion orders={orders} />}
              </Grid>
              <Grid item xs={12} md={9}>
                <Paper>
                  {currentStrategy === EMA_STRATEGY_KEY && (
                    <EmaChart candleData={data as EmaData[]} />
                  )}
                  {currentStrategy === MACD_STRATEGY_KEY && (
                    <MacdChart data={data as MacData[]} />
                  )}
                  {currentStrategy === COMBINED_STRATEGY_KEY && (
                    <MacdChart data={data as MacData[]} />
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </div>
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
