import { useEffect, useState } from "react";
import * as binanceService from "@/binance-module/services/binance-service";
import { formatDate } from "@/utils/formatters";
import {
  EMA_STRATEGY,
  MACD_STRATEGY,
  COMBINED_STRATEGY,
} from "../components/crypto-dashboard";
import {
  EmaStrategyResult,
  EmaData,
  MacdStrategyResult,
  MacData,
  AllData,
} from "../types/types";

export const useBinanceData = (symbol: string, klinesInterval: number) => {
  const [binanceData, setBinanceData] = useState<AllData>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const getBinanceData = async () => {
      try {
        setIsLoading(true);

        const responseEma = await binanceService.getKlines(
          symbol,
          klinesInterval,
          EMA_STRATEGY
        );
        const responseMacd = await binanceService.getKlines(
          symbol,
          klinesInterval,
          MACD_STRATEGY
        );
        const responseCombined = await binanceService.getKlines(
          symbol,
          klinesInterval,
          COMBINED_STRATEGY
        );

        const emaStrategyResult = responseEma.data
          .strategyResults as EmaStrategyResult;
        const emaData = responseEma.data.tradingData.candles.map<EmaData>(
          (x, index: number) => ({
            ...x,
            date: formatDate(x.date),
            ema: emaStrategyResult.ema10[index].ema,
            ema2: emaStrategyResult.ema55[index].ema,
            order: responseEma.data.orders.find((y) => y.timeStamp === x.date),
          })
        );

        const macStrategyResults = responseMacd.data
          .strategyResults as MacdStrategyResult;
        const macdData = macStrategyResults.macd.map<MacData>((x) => ({
          ...x,
          date: formatDate(x.date),
          order: responseMacd.data.orders.find((y) => y.timeStamp === x.date),
        }));

        const combinedStrategyResults = responseCombined.data
          .strategyResults as MacdStrategyResult;
        const combinedData = combinedStrategyResults.macd.map<MacData>((x) => ({
          ...x,
          date: formatDate(x.date),
          order: responseCombined.data.orders.find(
            (y) => y.timeStamp === x.date
          ),
        }));

        const data = {
          candles: emaData,
          macd: macdData,
          combined: combinedData,
        } as AllData;

        setBinanceData(data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    getBinanceData();
  }, [symbol, klinesInterval]);

  return {
    isLoading,
    binanceData,
    error,
  };
};
