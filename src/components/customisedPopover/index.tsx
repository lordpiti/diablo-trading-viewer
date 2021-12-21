const CustomizedPopover = (props: any) => {
  const { payload }: any = props;

  const createOrderPopoverContent = (item: any) => (
    <div
      style={{
        border: '#bbb 3px solid',
        padding: '3px 7.5px',
        backgroundColor: 'white',
      }}
    >
      <p style={{ fontWeight: 'bold' }}>{`${
        item.order.isBuy ? 'PURCHASE' : 'SALE'
      } ORDER`}</p>
      <p>{item.date}</p>
      <p>Change: {item.order.value}</p>
      <p>Crypto quantity: {item.order.quantityCrypto}</p>
      <p>USDT quantity: {item.order.quantityMoney}</p>
      <p>USDT after order: {item.order.moneyAfterOrder}</p>
    </div>
  );

  const createStandardPopoverContent = (payload: any) => (
    <div
      style={{
        border: '#bbb 1.5px solid',
        padding: '3px 7.5px',
        backgroundColor: 'white',
      }}
    >
      <p>{payload[0].payload.date}</p>
      {payload.map((x: any) => (
        <p
          style={{
            padding: '3px 7.5px',
            margin: '0 0',
            color: x.color,
          }}
        >
          {x.name} : {x.value}
        </p>
      ))}
    </div>
  );

  if (payload && payload.length) {
    if (payload[0].payload && payload[0].payload.order) {
      return createOrderPopoverContent(payload[0].payload);
    }
    return createStandardPopoverContent(payload);
  }
  return <></>;
};

export default CustomizedPopover;
