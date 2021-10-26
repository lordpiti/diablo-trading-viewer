const CustomizedDot = (props: any) => {
  const { cx, cy, stroke, payload, value }: any = props;
  if (payload.order) {
    return (
      <svg x={cx - 15} y={cy - 15} width={30} height={30}>
        <circle
          cx='15'
          cy='15'
          r='7.5'
          fill={payload.order.isBuy ? 'green' : 'red'}
        />
      </svg>
    );
  } else return <></>;
};

export default CustomizedDot;
