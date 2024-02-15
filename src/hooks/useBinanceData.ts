import { useEffect, useState } from "react";
import { getBinanceData } from "../services/binance-service";
import { BinanceData } from "../types/types";

export const useBinanceData = (
  strategy: string,
  symbol: string,
  klinesInterval: number
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<BinanceData>();
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const binanceData = await getBinanceData(
          strategy,
          symbol,
          klinesInterval
        );
        setData(binanceData);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    getData();
  }, [strategy, symbol, klinesInterval]);

  return {
    isLoading,
    data,
    error,
  };
};
