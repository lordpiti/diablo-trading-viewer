import React from 'react';
import CustomizedDot from '../customisedDot/index';
import {
  XAxis,
  YAxis,
  Line,
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

const Macd = (props: any) => {
  const { data } = props;

  const minValueMacd = Math.min(...data.map((x: any) => x.macd));
  const maxValueMacd = Math.max(...data.map((x: any) => x.macd));

  const minValueSignal = Math.min(...data.map((x: any) => x.signal));
  const maxValueSignal = Math.max(...data.map((x: any) => x.signal));

  return (
    <>
      <h1>MacD Indicator</h1>
      <ResponsiveContainer width='100%' height='50%'>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis
            domain={[
              Math.floor(Math.min(minValueMacd, minValueSignal)),
              Math.ceil(Math.max(maxValueMacd, maxValueSignal)),
            ]}
          />
          <Tooltip />
          <Legend />
          <Line
            name='MACD'
            type='monotone'
            dataKey='macd'
            stroke='#8884d8'
            activeDot={{ r: 8 }}
            //dot={false}
          />
          <Line
            name='Signal'
            type='monotone'
            dataKey='signal'
            stroke='#e28743'
            activeDot={{ r: 8 }}
            dot={<CustomizedDot />}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default Macd;
