import React, { useState } from 'react';
import Chart from '../ema-chart';
import {
  Backdrop,
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
import makeStyles from '@mui/styles/makeStyles';
import Macd from '../macd-chart';
import OrdersAccordion from '../orders-accordion';
import { BinanceDataContainer } from '../../containers/binanceDataContainer';
import { WithOrderData } from '../../types/types';

const intervals = [
  { name: '1 min', value: 0 },
  { name: '3 min', value: 1 },
  { name: '5 min', value: 2 },
  { name: '15 min', value: 3 },
  { name: '30 min', value: 4 },
  { name: '1 hour', value: 5 },
  { name: '2 hours', value: 6 },
  { name: '4 hours', value: 7 },
  { name: '1 day', value: 11 },
  { name: '3 days', value: 12 },
  { name: '1 week', value: 13 },
];
export const DEFAULT_INTERVAL = intervals[5].value;

export const EMA_STRATEGY = 0;
export const MACD_STRATEGY = 1;
export const COMBINED_STRATEGY = 2;

const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT'];
export const DEFAULT_SYMBOL = symbols[0];

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: 23,
    fontWeight: 'bold',
    padding: '10px',
    marginBottom: '10px',
  },
  settings: {},
}));

const CryptoDashboard = () => {
  const [strategy, setStrategy] = useState(MACD_STRATEGY);
  const [currentSymbol, setCurrentSymbol] = useState(DEFAULT_SYMBOL);
  const [currentKlinesInterval, setCurrentKlinesInterval] =
    useState(DEFAULT_INTERVAL);
  const [open, setOpen] = useState(false);
  const classes = useStyles();

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
                      <div className={classes.heading}>Settings</div>
                      <Grid
                        container
                        spacing={2}
                        className={classes.settings}
                        justifyContent={'space-evenly'}
                        sx={{ minWidth: 120 }}
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
