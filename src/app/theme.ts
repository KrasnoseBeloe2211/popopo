'use client'

import { createTheme } from "@mui/material/styles";

export const Theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#13a749",
    },
    background: {
      default: "#000000",
      paper: "#0a0a0a",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b3b3b3",
    },
  },
  typography: {
    fontFamily: `"Inter", "SF Pro Display", sans-serif`,
    h1: {
      fontSize: "72px",
      fontWeight: 600,
      lineHeight: 1.1,
    },
    body1: {
      fontSize: "18px",
    },
  },
});