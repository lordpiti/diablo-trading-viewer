import React, { useEffect, useState } from 'react';
import Chart from '../chart';
import {
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
import './crypto-demo.scss';
import Macd from '../macd';
import SimpleAccordion from '../orders-accordion';
import { formatDate } from '../../utils/formatters';
import { getKlines } from '../../services/binance-service';

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

const EMA_STRATEGY = 0;
const MACD_STRATEGY = 1;

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
  });

const CryptoDemo = (props: Props) => {
  const [allData, setAllData] = useState(null as any);
  const [strategy, setStrategy] = useState(MACD_STRATEGY);
  const [currentSymbol, setCurrentSymbol] = useState(DEFAULT_SYMBOL);
  const [currentKlinesInterval, setCurrentKlinesInterval] = useState(5);
  // const [symbols, setSymbols] = useState([] as string[]);

  const getData = async (symbol: string, klinesInterval: number) => {
    setCurrentSymbol(symbol);
    setCurrentKlinesInterval(klinesInterval);
    const responseEma = await getKlines(symbol, klinesInterval, EMA_STRATEGY);
    const responseMacd = await getKlines(symbol, klinesInterval, MACD_STRATEGY);

    const candles = responseEma.data.tradingData.candles.map(
      (x: any, index: number) => ({
        ...x,
        ts: formatDate(x.date),
        ema: responseEma.data.strategyResults.ema10[index].ema,
        ema2: responseEma.data.strategyResults.ema55[index].ema,
        order: responseEma.data.orders.find((y: any) => y.timeStamp === x.date),
      })
    );

    const macdData = responseMacd.data.strategyResults.macd.map((x: any) => ({
      ...x,
      date: formatDate(x.date),
      order: responseMacd.data.orders.find((y: any) => y.timeStamp === x.date),
    }));

    const fulobj = {
      candles: candles,
      macd: macdData,
    };

    setAllData(fulobj);
  };

  useEffect(() => {
    getData(currentSymbol, currentKlinesInterval);
  }, [currentSymbol, currentKlinesInterval]);

  // useEffect(() => {
  //   (async () => {
  //     const responseSymbols = await axiosInstance.get(
  //       `${process.env.REACT_APP_TRADING_API_URL}/api/trading/symbols/USDT`
  //     );

  //     const loadedSymbols = responseSymbols.data.symbols;
  //     setSymbols(loadedSymbols);
  //   })();
  // }, []);

  const onChangeStrategy = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStrategy(parseInt(event.target.value));
  };

  const getCurrentOrders = () => {
    const strategyData =
      strategy === EMA_STRATEGY ? allData.candles : allData.macd;
    const orders = strategyData
      .filter((x: any) => x.order)
      .map((x: any) => x.order);
    return orders;
  };

  const { classes } = props;

  if (allData) {
    return (
      <div style={{ paddingTop: '20px' }}>
        <Container maxWidth={false}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Paper>
                <div className={classes.heading}>Settings</div>
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
                <FormControl component='fieldset' style={{ marginTop: '20px' }}>
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
                  </RadioGroup>
                </FormControl>
              </Paper>
              <br></br>
              <SimpleAccordion orders={getCurrentOrders()} />
            </Grid>
            <Grid item xs={12} md={9}>
              <Paper>
                {strategy === EMA_STRATEGY && (
                  <Chart candleData={allData.candles} />
                )}
                {strategy === MACD_STRATEGY && <Macd data={allData.macd} />}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
  return <div></div>;
};

export default withStyles(styles)(CryptoDemo);
