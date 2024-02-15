import { useEffect, useState } from "react";
import { getBinanceData } from "../services/binance-service";
import { AllData } from "../types/types";

export const useBinanceData = (symbol: string, klinesInterval: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<AllData>();
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const binanceData = await getBinanceData(symbol, klinesInterval);
        setData(binanceData);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    getData();
  }, [symbol, klinesInterval]);

  return {
    isLoading,
    binanceData: data,
    error,
  };
};
