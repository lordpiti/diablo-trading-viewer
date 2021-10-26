import React, { useEffect, useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis, //
  YAxis,
} from 'recharts';
import axiosInstance from 'axios';
import Chart from '../chart';
import moment from 'moment';
import CustomizedDot from '../customisedDot';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from '@material-ui/core';
import {
  withStyles,
  Theme,
  createStyles,
  WithStyles,
} from '@material-ui/core/styles';
import './crypto-demo.scss';
import Macd from '../macd';

interface Props extends WithStyles<typeof styles> {
  data: any[];
}

const intervals = [
  { name: '1 min', value: 0 },
  { name: '3 min', value: 1 },
  { name: '5 min', value: 2 },
  { name: '15 min', value: 3 },
  { name: '30 min', value: 4 },
  { name: '1 hour', value: 5 },
  { name: '2 hours', value: 6 },
  { name: '4 hours', value: 7 },
  { name: '6 hours', value: 8 },
  { name: '8 hours', value: 9 },
  { name: '12 hours', value: 10 },
  { name: '1 day', value: 11 },
  { name: '3 days', value: 12 },
  { name: '1 week', value: 13 },
];

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
  });

const CryptoDemo = (props: Props) => {
  const [estao, setEstao] = useState(null as any);
  const [currentSymbol, setCurrentSymbol] = useState('BTCUSDT');
  const [currentKlinesInterval, setCurrentKlinesInterval] = useState(5);
  const [symbols, setSymbols] = useState([] as string[]);

  const getData = async (symbol: string, klinesInterval: number) => {
    setCurrentSymbol(symbol);
    setCurrentKlinesInterval(klinesInterval);
    const responseEma = await axiosInstance.get(
      `${process.env.REACT_APP_TRADING_API_URL}/api/trading/klines/${symbol}/interval/${klinesInterval}/strategy/0?includeOrders=true`
    );
    const responseMacd = await axiosInstance.get(
      `${process.env.REACT_APP_TRADING_API_URL}/api/trading/klines/${symbol}/interval/${klinesInterval}/strategy/1?includeOrders=true`
    );

    const candles = responseEma.data.tradingData.candles.map(
      (x: any, index: number) => {
        return {
          high: x.high,
          low: x.low,
          open: x.open,
          close: x.close,
          ts: moment(new Date(x.date)).format('D/M/yyyy hh:mm'),
          ema: responseEma.data.strategyResults.ema10[index].ema,
          ema2: responseEma.data.strategyResults.ema55[index].ema,
          order: responseEma.data.orders.find(
            (y: any) => y.timeStamp === x.date
          ),
        };
      }
    );

    const macdData = responseMacd.data.strategyResults.macd.map((x: any) => ({
      ...x,
      date: moment(new Date(x.date)).format('D/M/yyyy hh:mm'),
      order: responseMacd.data.orders.find((y: any) => y.timeStamp === x.date),
    }));

    const fulobj = {
      candles: candles,
      macd: macdData,
    };

    setEstao(fulobj);
  };

  useEffect(() => {
    getData(currentSymbol, currentKlinesInterval);
  }, [currentSymbol, currentKlinesInterval]);

  useEffect(() => {
    (async () => {
      const responseSymbols = await axiosInstance.get(
        `${process.env.REACT_APP_TRADING_API_URL}/api/trading/symbols/USDT`
      );

      const loadedSymbols = responseSymbols.data.symbols;
      setSymbols(loadedSymbols);
    })();
  }, []);

  const { classes } = props;

  if (estao) {
    return (
      <div className='crypto-demo'>
        <div className='left-sidebar-container'>
          <Paper>
            <div className='sidebar-content'>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor='currentSymbol'>Select symbol</InputLabel>
                <Select
                  value={currentSymbol}
                  onChange={(event: any) => {
                    setCurrentSymbol(event.target.value);
                  }}
                  inputProps={{
                    name: 'item',
                    id: 'item',
                  }}
                >
                  {symbols.map((symbol: any, index: number) => (
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
                  onChange={(event: any) => {
                    setCurrentKlinesInterval(event.target.value);
                  }}
                  inputProps={{
                    name: 'item',
                    id: 'item',
                  }}
                >
                  {intervals.map((interval: any, index: number) => (
                    <MenuItem key={index} value={interval.value}>
                      {interval.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </Paper>
        </div>
        <div className='main-diablo-content'>
          <Macd data={estao.macd} />
          <Chart candleData={estao.candles} />
        </div>
      </div>
    );
  }
  return <div></div>;
};

export default withStyles(styles)(CryptoDemo);
