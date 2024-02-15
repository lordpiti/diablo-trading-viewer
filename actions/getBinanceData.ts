import { strategyValueDictionary } from "@/constants/constants";
import * as binanceService from "@/services/binance-service";
import { formatBinanceDataByStrategy } from "@/utils/formatters";

export const getBinanceData = async (
  strategy: string,
  symbol: string,
  interval: number
) => {
  try {
    const res = await binanceService.getKlines(
      symbol,
      interval,
      strategyValueDictionary[strategy]
    );

    return formatBinanceDataByStrategy[strategy](res.data);
  } catch (e) {
    console.log(":P:");
  }
};
