"use client";

import {
  intervals,
  strategyLabelDictionary,
  strategyList,
  symbols,
} from "@/constants/constants";
import {
  Paper,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import useSettings from "./useSettings";
import useParamsSettings from "./useSettings";

const styles = {
  heading: {
    fontSize: 23,
    fontWeight: "bold",
    padding: "10px",
    marginBottom: "10px",
  },
  settings: {
    minWidth: 120,
    paddingBottom: "1rem",
  },
};

export default function Settings() {
  const {
    currentStrategy,
    currentSymbol,
    currentInterval,
    onChangeStrategy,
    onChangeSymbol,
    onChangeInterval,
  } = useParamsSettings();

  return (
    <Paper>
      <Box sx={styles.heading}>Settings</Box>
      <Grid
        container
        spacing={2}
        sx={styles.settings}
        justifyContent={"space-evenly"}
      >
        <Grid item>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel
              id="symbol-select-label"
              htmlFor="symbol"
              shrink
              disableAnimation
            >
              Select symbol
            </InputLabel>
            <Select
              label="Select symbol"
              labelId="symbol-select-label"
              inputProps={{
                name: "symbol",
                id: "symbol",
              }}
              placeholder="Add Symbol"
              value={currentSymbol}
              onChange={onChangeSymbol}
            >
              <MenuItem key="empty" value="empty" disabled hidden></MenuItem>
              {symbols.map((symbol) => (
                <MenuItem key={symbol} value={symbol}>
                  {symbol}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel
              id="interval-select-label"
              htmlFor="currentKlinesInterval"
            >
              Select interval
            </InputLabel>
            <Select
              label="Select interval"
              labelId="interval-select-label"
              inputProps={{
                name: "item",
                id: "item",
              }}
              value={currentInterval.toString()}
              onChange={onChangeInterval}
            >
              {intervals.map((interval, index: number) => (
                <MenuItem key={index} value={interval.value}>
                  {interval.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <FormControl component="fieldset" style={{ marginTop: "20px" }}>
        <FormLabel color="primary" component="legend">
          Strategy
        </FormLabel>
        <RadioGroup
          aria-label="strategy"
          name="strategies"
          value={currentStrategy}
          onChange={onChangeStrategy}
        >
          {strategyList.map((strategyKey) => (
            <FormControlLabel
              key={strategyKey}
              value={strategyKey}
              control={<Radio />}
              label={strategyLabelDictionary[strategyKey]}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Paper>
  );
}
