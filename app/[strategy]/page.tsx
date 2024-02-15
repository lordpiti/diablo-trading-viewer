import { getBinanceData } from "@/actions/getBinanceData";
import OrdersAccordion from "@/components/orders-accordion";
import EmaChart from "@/components/ema-chart";
import MacdChart from "@/components/macd-chart";

import {
  COMBINED_STRATEGY_KEY,
  EMA_STRATEGY_KEY,
  MACD_STRATEGY_KEY,
} from "@/constants/constants";
import { Paper } from "@mui/material";
import { EmaData, MacData } from "@/types/types";

export default async function Page({
  params,
  searchParams,
}: {
  params: { [strategy: string]: string };
  searchParams: {
    symbol: string;
    interval: string;
  };
}) {
  const strategy = params.strategy ?? "";
  const symbol = searchParams.symbol ?? "";
  const interval = parseInt(searchParams.interval ?? "0");
  const data = await getBinanceData(strategy, symbol, interval);
  const orders = data?.filter((x) => x.order).map((x) => x.order!);

  return (
    <>
      {data && (
        <Paper>
          {strategy === EMA_STRATEGY_KEY && (
            <EmaChart candleData={data as EmaData[]} />
          )}
          {strategy === MACD_STRATEGY_KEY && (
            <MacdChart data={data as MacData[]} />
          )}
          {strategy === COMBINED_STRATEGY_KEY && (
            <MacdChart data={data as MacData[]} />
          )}
          {strategy}
        </Paper>
      )}
      <br />
      {orders && <OrdersAccordion orders={orders} />}
      <br />
    </>
  );
}
