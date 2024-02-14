import { DotProps } from "recharts";
import { WithOrderData } from "../../types/types";

interface Props extends DotProps {
  payload?: WithOrderData;
}

const CustomizedDot = (props: Props) => {
  const { cx, cy, stroke, payload } = props;
  if (payload && payload.order && cx && cy) {
    return (
      <svg x={cx - 15} y={cy - 15} width={30} height={30}>
        <circle
          cx="15"
          cy="15"
          r="7.5"
          fill={payload.order.isBuy ? "red" : "green"}
        />
      </svg>
    );
  } else return <></>;
};

export default CustomizedDot;
