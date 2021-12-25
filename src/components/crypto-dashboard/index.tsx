import React, { useEffect, useState } from 'react';
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
} from '@material-ui/core';
import {
  withStyles,
  Theme,
  createStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Macd from '../macd-chart';
import OrdersAccordion from '../orders-accordion';
import { formatDate } from '../../utils/formatters';
import { getKlines } from '../../services/binance-service';
import {
  EmaStrategyResult,
  MacdStrategyResult,
  Order,
} from '../../interfaces/types';

export interface WithOrderData {
  order?: Order;
  date: string;
}
export interface EmaData extends WithOrderData {
  ema: number;
  ema2: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface MacData extends WithOrderData {
  macd: number;
  signal: number;
}

interface AllData {
  candles: EmaData[];
  macd: MacData[];
  combined: MacData[];
}

interface Props extends WithStyles<typeof styles> {}

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
const DEFAULT_INTERVAL = intervals[5].value;

const EMA_STRATEGY = 0;
const MACD_STRATEGY = 1;
const COMBINED_STRATEGY = 2;

const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT'];
const DEFAULT_SYMBOL = symbols[0];

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    boxSelectRound: {
      marginBottom: 20,
      padding: 10,
    },
    heading: {
      fontSize: theme.typography.pxToRem(23),
      fontWeight: theme.typography.fontWeightBold,
      padding: '10px',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  });

const CryptoDashboard = (props: Props) => {
  const [allData, setAllData] = useState(undefined as AllData | undefined);
  const [strategy, setStrategy] = useState(MACD_STRATEGY);
  const [currentSymbol, setCurrentSymbol] = useState(DEFAULT_SYMBOL);
  const [currentKlinesInterval, setCurrentKlinesInterval] =
    useState(DEFAULT_INTERVAL);
  const [open, setOpen] = useState(false);

  const getData = async (symbol: string, klinesInterval: number) => {
    setCurrentSymbol(symbol);
    setCurrentKlinesInterval(klinesInterval);
    setOpen(true);
    const responseEma = await getKlines(symbol, klinesInterval, EMA_STRATEGY);
    const responseMacd = await getKlines(symbol, klinesInterval, MACD_STRATEGY);
    const responseCombined = await getKlines(
      symbol,
      klinesInterval,
      COMBINED_STRATEGY
    );

    const emaStrategyResult = responseEma.data
      .strategyResults as EmaStrategyResult;
    const emaData = responseEma.data.tradingData.candles.map<EmaData>(
      (x, index: number) => ({
        ...x,
        date: formatDate(x.date),
        ema: emaStrategyResult.ema10[index].ema,
        ema2: emaStrategyResult.ema55[index].ema,
        order: responseEma.data.orders.find((y) => y.timeStamp === x.date),
      })
    );

    const macStrategyResults = responseMacd.data
      .strategyResults as MacdStrategyResult;
    const macdData = macStrategyResults.macd.map<MacData>((x) => ({
      ...x,
      date: formatDate(x.date),
      order: responseMacd.data.orders.find((y) => y.timeStamp === x.date),
    }));

    const combinedStrategyResults = responseCombined.data
      .strategyResults as MacdStrategyResult;
    const combinedData = combinedStrategyResults.macd.map<MacData>((x) => ({
      ...x,
      date: formatDate(x.date),
      order: responseCombined.data.orders.find((y) => y.timeStamp === x.date),
    }));

    const fulobj = {
      candles: emaData,
      macd: macdData,
      combined: combinedData,
    } as AllData;

    setAllData(fulobj);
    setOpen(false);
  };

  useEffect(() => {
    getData(currentSymbol, currentKlinesInterval);
  }, [currentSymbol, currentKlinesInterval]);

  const onChangeStrategy = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStrategy(parseInt(event.target.value));
  };

  const getCurrentOrders = () => {
    if (allData) {
      const getOrdersFromData = (strategyData: WithOrderData[]) => {
        const orders = strategyData
          .filter((x) => x.order)
          .map((x) => x.order) as Order[];
        return orders;
      };

      switch (strategy) {
        case EMA_STRATEGY:
          return getOrdersFromData(allData.candles);
        case MACD_STRATEGY:
          return getOrdersFromData(allData.macd);
        case COMBINED_STRATEGY:
          return getOrdersFromData(allData.combined);
        default:
          return [];
      }
    }
    return [];
  };

  const handleCloseBackdrop = () => {
    setOpen(false);
  };

  const { classes } = props;

  return (
    <>
      {allData && (
        <div style={{ paddingTop: '20px' }}>
          <Container maxWidth={false}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Paper>
                  <div className={classes.heading}>Settings</div>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor='currentSymbol'>
                      Select symbol
                    </InputLabel>
                    <Select
                      value={currentSymbol}
                      onChange={(
                        event: React.ChangeEvent<{
                          name?: string;
                          value: unknown;
                        }>
                      ) => {
                        setCurrentSymbol(event.target.value as string);
                      }}
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
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor='currentKlinesInterval'>
                      Select interval
                    </InputLabel>
                    <Select
                      value={currentKlinesInterval}
                      onChange={(
                        event: React.ChangeEvent<{
                          name?: string;
                          value: unknown;
                        }>
                      ) => {
                        setCurrentKlinesInterval(event.target.value as number);
                      }}
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
                  <FormControl
                    component='fieldset'
                    style={{ marginTop: '20px' }}
                  >
                    <FormLabel component='legend'>Strategy</FormLabel>
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
                    <Chart candleData={allData.candles} />
                  )}
                  {strategy === MACD_STRATEGY && <Macd data={allData.macd} />}
                  {strategy === COMBINED_STRATEGY && (
                    <Macd data={allData.combined} />
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </div>
      )}
      <Backdrop
        className={classes.backdrop}
        open={open}
        onClick={handleCloseBackdrop}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  );
};

export default withStyles(styles)(CryptoDashboard);
