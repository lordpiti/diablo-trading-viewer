const CustomizedPopover = (props: any) => {
  const { payload }: any = props;

  const createOrderPopoverContent = (item: any) => (
    <>
      <p style={{ fontWeight: 'bold' }}>{`${
        item.order.isBuy ? 'PURCHASE' : 'SALE'
      } ORDER`}</p>
      <p>{item.date}</p>
      <p>Change: {item.order.value}</p>
      <p>Crypto quantity: {item.order.quantityCrypto}</p>
      <p>USDT quantity: {item.order.quantityMoney}</p>
      <p>USDT after order: {item.order.moneyAfterOrder}</p>
    </>
  );

  const createStandardPopoverContent = (payload: any) => (
    <>
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
    </>
  );

  if (payload && payload.length) {
    const isOrder = payload[0].payload && payload[0].payload.order;
    return (
      <div
        style={{
          border: `#bbb ${isOrder ? 3 : 1.5}px solid`,
          padding: '3px 7.5px',
          backgroundColor: 'white',
        }}
      >
        {isOrder
          ? createOrderPopoverContent(payload[0].payload)
          : createStandardPopoverContent(payload)}
      </div>
    );
  }
  return <></>;
};

export default CustomizedPopover;
