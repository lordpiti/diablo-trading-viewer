import { TooltipProps } from 'recharts';
import {
  NameType,
  Payload,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';
import { WithOrderData } from '../../types/types';


const CustomizedPopover = (props: TooltipProps<ValueType, NameType>) => {
  const { active, payload, label } = props;

  const createOrderPopoverContent = (item: WithOrderData) =>
    item.order && (
      <>
        <p style={{ fontWeight: 'bold' }}>{`${item.order.isBuy ? 'PURCHASE' : 'SALE'
          } ORDER`}</p>
        <p>{item.date}</p>
        <p>Change: {item.order.value}</p>
        <p>Crypto quantity: {item.order.quantityCrypto}</p>
        <p>USDT quantity: {item.order.quantityMoney}</p>
        <p>USDT after order: {item.order.moneyAfterOrder}</p>
      </>
    );


  const createStandardPopoverContent = (
    payload: Payload<ValueType, NameType>[]
  ) => (
    <>
      <p>{payload[0].payload.date}</p>
      {payload.map((x, index: number) => (
        <p
          key={`popoverproperty-${index}`}
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
    const isOrder = (payload[0].payload && payload[0].payload.order) as boolean;
    return (
      <div
        style={{
          border: `#bbb ${isOrder ? 3 : 1.5}px solid`,
          padding: '3px 7.5px',
          backgroundColor: 'white',
        }}
      >
        {isOrder
          ? createOrderPopoverContent(payload[0].payload as WithOrderData)
          : createStandardPopoverContent(payload)}
      </div>
    );
  }
  return <></>;
};

export default CustomizedPopover;
