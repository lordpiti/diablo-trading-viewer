import {
  Bar,
  XAxis,
  YAxis,
  Line,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  ComposedChart,
  Tooltip,
  Legend,
} from 'recharts';
import CandleStick from '../candle-stick';
import CustomizedDot from '../customisedDot';
import CustomisedPopover from '../customisedPopover';
import { makeStyles } from '@material-ui/core/styles';
import { EmaData } from '../../types/types';

const useStyles = makeStyles((_) => ({
  chartTitle: {
    fontSize: 'larger',
    fontWeight: 'bold',
  },
}));

const colors = [
  '#1f77b4',
  '#ff7f0e',
  '#2ca02c',
  '#d62728',
  '#9467bd',
  '#8c564b',
  '#e377c2',
  '#7f7f7f',
  '#bcbd22',
  '#17becf',
];

const prepareData = (data: EmaData[]) => {
  return data.map((x) => {
    return {
      ...x,
      openClose: [x.open, x.close],
    };
  });
};

interface Props {
  candleData: EmaData[];
}

const EmaChart = ({ candleData }: Props) => {
  const classes = useStyles();
  const data = prepareData(candleData);

  const minValue = data.reduce(
    (
      minValue: any,
      { low, openClose: [open, close] }: { low: number; openClose: number[] }
    ) => {
      const currentMin = Math.min(low, open, close);
      return minValue === null || currentMin < minValue ? currentMin : minValue;
    },
    null
  );
  const maxValue = data.reduce(
    (
      maxValue: any,
      { high, openClose: [open, close] }: { high: number; openClose: number[] }
    ) => {
      const currentMax = Math.max(high, open, close);
      return currentMax > maxValue ? currentMax : maxValue;
    },
    minValue
  );

  return (
    <>
      <span className={classes.chartTitle}>Ema Indicator</span>
      <div style={{ height: '500px', paddingRight: '20px' }}>
        <ResponsiveContainer width='100%' height='100%'>
          <ComposedChart
            // width={600}
            height={300}
            data={data}
            // barCategoryGap={0}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey='date' />
            <YAxis domain={[minValue, maxValue]} />
            <CartesianGrid strokeDasharray='3 3' />
            <Bar
              name='Klines'
              dataKey='openClose'
              fill='#8884d8'
              shape={<CandleStick />}
            // label={{ position: 'top' }}
            >
              {data.map((_, index: number) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))}
            </Bar>
            <Tooltip content={<CustomisedPopover />} />
            <Legend />
            <Line
              name='Exponential Moving Average 55'
              type='monotone'
              dataKey='ema'
              stroke='#8884d8'
              activeDot={{ r: 8 }}
              dot={false}
            />

            <Line
              name='Exponential Moving Average 10'
              type='monotone'
              dataKey='ema2'
              stroke='#e28743'
              activeDot={{ r: 8 }}
              dot={<CustomizedDot />}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default EmaChart;
