import { green, indigo } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const pxToRem = (value) => `${value / 16}rem`;
const lineHeight = (value) => pxToRem(value * 1.8);

let theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: green[500],
    },
  },
  typography: {
    fontFamily: "Lato, sans-serif",
    h1: {
      fontWeight: 700,
      lineHeight: lineHeight(40),
      fontSize: pxToRem(40),
    },
    h2: {
      fontWeight: 700,
      lineHeight: lineHeight(24),
      fontSize: pxToRem(24),
    },
    h3: {
      fontWeight: 400,
      lineHeight: lineHeight(20),
      fontSize: pxToRem(20),
    },
    h4: {
      fontWeight: 400,
      lineHeight: lineHeight(18),
      fontSize: pxToRem(18),
    },
    h5: undefined,
    h6: undefined,
    body1: {
      lineHeight: lineHeight(16),
      fontSize: pxToRem(16),
    },
    body2: {
      lineHeight: lineHeight(14),
      fontSize: pxToRem(14),
    },
    caption: {
      lineHeight: lineHeight(12),
      fontSize: pxToRem(12),
    },
  },
});

export default theme;
