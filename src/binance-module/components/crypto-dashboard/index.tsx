import React, { useState } from 'react';
import Chart from '../ema-chart';
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
} from '@mui/material';
import Macd from '../macd-chart';
import OrdersAccordion from '../orders-accordion';
import { BinanceDataContainer } from '../../containers/binanceDataContainer';
import { WithOrderData } from '../../types/types';

const intervals = [
  { name: '1 min', value: 60 },
  { name: '3 min', value: 180 },
  { name: '5 min', value: 300 },
  { name: '15 min', value: 900 },
  { name: '30 min', value: 1800 },
  { name: '1 hour', value: 3600 },
  { name: '2 hours', value: 7200 },
  { name: '4 hours', value: 14400 },
  { name: '1 day', value: 86400 },
  { name: '3 days', value: 259200 },
  { name: '1 week', value: 604800 },
];
export const DEFAULT_INTERVAL = intervals[5].value;

export const EMA_STRATEGY = 0;
export const MACD_STRATEGY = 1;
export const COMBINED_STRATEGY = 2;

const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT'];
export const DEFAULT_SYMBOL = symbols[0];

const styles = {
  heading: {
    fontSize: 23,
    fontWeight: 'bold',
    padding: '10px',
    marginBottom: '10px',
  },
  settings: {
    minWidth: 120
  },
};

const CryptoDashboard = () => {
  const [strategy, setStrategy] = useState(MACD_STRATEGY);
  const [currentSymbol, setCurrentSymbol] = useState(DEFAULT_SYMBOL);
  const [currentKlinesInterval, setCurrentKlinesInterval] =
    useState(DEFAULT_INTERVAL);
  const [open, setOpen] = useState(false);

  const onChangeStrategy = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStrategy(parseInt(event.target.value));
  };

  const handleCloseBackdrop = () => {
    setOpen(false);
  };

  return (
    <BinanceDataContainer symbol={currentSymbol} klinesInterval={currentKlinesInterval}>
      {({ currentData }) => {
        const getCurrentOrders = () => {
          if (currentData) {
            const getOrdersFromData = (strategyData: WithOrderData[]) => {
              const orders = strategyData.filter(x => x.order).map((x) => x.order!);
              return orders;
            };

            switch (strategy) {
              case EMA_STRATEGY:
                return getOrdersFromData(currentData.candles);
              case MACD_STRATEGY:
                return getOrdersFromData(currentData.macd);
              case COMBINED_STRATEGY:
                return getOrdersFromData(currentData.combined);
              default:
                return [];
            }
          }
          return [];
        };

        const handleChangeSymbol = (event: SelectChangeEvent) => {
          setCurrentSymbol(event.target.value as string);
        };

        const handleChangeInterval = (event: SelectChangeEvent<number>) => {
          setCurrentKlinesInterval(event.target.value as number);
        };

        return <>
          {currentData && (
            <div style={{ paddingTop: '20px' }}>
              <Container maxWidth={false}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3}>
                    <Paper>
                      <Box sx={styles.heading}>Settings</Box>
                      <Grid
                        container
                        spacing={2}
                        sx={styles.settings}
                        justifyContent={'space-evenly'}
                      >
                        <Grid item>
                          <FormControl>
                            <InputLabel id='symbol-select-label'>
                              Select symbol
                            </InputLabel>
                            <Select
                              value={currentSymbol}
                              onChange={handleChangeSymbol}
                              label='Select symbol'
                              labelId='symbol-select-label'
                              inputProps={{
                                name: 'item',
                                id: 'item',
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
                              id='interval-select-label'
                              htmlFor='currentKlinesInterval'
                            >
                              Select interval
                            </InputLabel>
                            <Select
                              value={currentKlinesInterval}
                              label='Select interval'
                              onChange={handleChangeInterval}
                              labelId='interval-select-label'
                              inputProps={{
                                name: 'item',
                                id: 'item',
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
                        component='fieldset'
                        style={{ marginTop: '20px' }}
                      >
                        <FormLabel color='primary' component='legend'>Strategy</FormLabel>
                        <RadioGroup
                          aria-label='strategy'
                          name='strategys'
                          value={strategy}
                          onChange={onChangeStrategy}
                        >
                          <FormControlLabel
                            value={EMA_STRATEGY}
                            control={<Radio />}
                            label='Exponential Medium Average'
                          />
                          <FormControlLabel
                            value={MACD_STRATEGY}
                            control={<Radio />}
                            label='MACD'
                          />
                          <FormControlLabel
                            value={COMBINED_STRATEGY}
                            control={<Radio />}
                            label='MACD with EMAs guard'
                          />
                        </RadioGroup>
                      </FormControl>
                    </Paper>
                    <br></br>
                    <OrdersAccordion orders={getCurrentOrders()} />
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Paper>
                      {strategy === EMA_STRATEGY && (
                        <Chart candleData={currentData.candles} />
                      )}
                      {strategy === MACD_STRATEGY && <Macd data={currentData.macd} />}
                      {strategy === COMBINED_STRATEGY && (
                        <Macd data={currentData.combined} />
                      )}
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
            </div>
          )}
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleCloseBackdrop}
          >
            <CircularProgress color='inherit' />
          </Backdrop>
        </>;
      }
      }
    </BinanceDataContainer>
  );
};

export default CryptoDashboard;
