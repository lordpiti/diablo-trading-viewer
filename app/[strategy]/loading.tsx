"use client";

import { Backdrop, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: 10 }} open>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
