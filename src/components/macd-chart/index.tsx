import { Box } from "@mui/material";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import CustomizedDot from "@/components/customisedDot";
import CustomisedPopover from "@/components/customisedPopover";
import { MacData } from "@/types/types";

const styles = {
  chartTitle: {
    fontSize: "24px",
    fontWeight: "bold",
  },
};

const MacdChart = (props: { data: MacData[] }) => {
  const { data } = props;

  const minValueMacd = Math.min(...data.map((x) => x.macd));
  const maxValueMacd = Math.max(...data.map((x) => x.macd));

  const minValueSignal = Math.min(...data.map((x) => x.signal));
  const maxValueSignal = Math.max(...data.map((x) => x.signal));

  return (
    <>
      <Box
        sx={styles.chartTitle}
        // style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
      >
        MacD Indicator
      </Box>
      <div style={{ height: "500px", paddingRight: "20px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              domain={[
                Math.floor(Math.min(minValueMacd, minValueSignal)),
                Math.ceil(Math.max(maxValueMacd, maxValueSignal)),
              ]}
            />
            <Tooltip content={<CustomisedPopover />} />
            <Legend />
            <Line
              name="MACD"
              type="monotone"
              dataKey="macd"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              dot={false}
            />
            <Line
              name="Signal"
              type="monotone"
              dataKey="signal"
              stroke="#e28743"
              activeDot={{ r: 8 }}
              dot={<CustomizedDot />}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default MacdChart;
