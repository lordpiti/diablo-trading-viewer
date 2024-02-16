import { useQuery } from "@tanstack/react-query";

import { getBinanceData } from "@/services/binance-service";

export const useBinanceData = (
  strategy: string,
  symbol: string,
  interval: number
) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["binanceData", strategy, symbol, interval],
    queryFn: () => getBinanceData(strategy, symbol, interval),
  });

  return {
    isLoading: isPending,
    data,
    error,
  };
};
