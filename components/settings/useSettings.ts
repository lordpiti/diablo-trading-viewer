import {
  usePathname,
  useRouter,
  useSelectedLayoutSegment,
} from "next/navigation";
import { ChangeEvent, startTransition, useEffect } from "react";
import { SelectChangeEvent } from "@mui/material";
import {
  DEFAULT_INTERVAL,
  DEFAULT_STRATEGY,
  DEFAULT_SYMBOL,
  intervalValues,
  strategyList,
  symbols,
} from "@/constants/constants";
import useCleanSearchParams from "@/hooks/useCleanSearchParams";

export default function useParamsSettings() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useCleanSearchParams();
  const currentStrategy = useSelectedLayoutSegment() ?? "";
  const currentSymbol = searchParams.get("symbol") ?? "empty";
  const currentInterval = parseInt(searchParams.get("interval") ?? "0");

  const handleChangeStrategy = (event: ChangeEvent<HTMLInputElement>) => {
    const newStrategy = event.target.value;

    replace(`/${newStrategy}?${searchParams.toString()}`);
  };
  const handleChangeSymbol = (event: SelectChangeEvent) => {
    const newSymbol = event.target.value;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("symbol", newSymbol);

    replace(`${pathname}?${newSearchParams.toString()}`);
  };
  const handleChangeInterval = (event: SelectChangeEvent) => {
    const newInterval = event.target.value;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("interval", newInterval);

    replace(`${pathname}?${newSearchParams.toString()}`);
  };

  // Check whether the url is fine if the user edits it
  useEffect(() => {
    const newStrategy = strategyList.includes(currentStrategy)
      ? currentStrategy
      : DEFAULT_STRATEGY;
    const newSymbol = symbols.includes(currentSymbol)
      ? currentSymbol
      : DEFAULT_SYMBOL;
    const newInterval = intervalValues.includes(currentInterval)
      ? currentInterval
      : DEFAULT_INTERVAL;

    if (
      newStrategy !== currentStrategy ||
      newSymbol !== currentSymbol ||
      newInterval !== currentInterval
    ) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("symbol", newSymbol);
      newSearchParams.set("interval", newInterval.toString());

      startTransition(() => {
        replace(`/${newStrategy}?${newSearchParams.toString()}`);
      });
    }
  }, []);

  return {
    currentStrategy,
    currentSymbol,
    currentInterval,
    onChangeStrategy: handleChangeStrategy,
    onChangeSymbol: handleChangeSymbol,
    onChangeInterval: handleChangeInterval,
  };
}
