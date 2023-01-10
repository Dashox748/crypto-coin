import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: "light",
    text: {
      primary: `#ffffff`,
      secondary: `#6c757d`,
    },

    secondary: {
      main: `rgba(108,117,125,.5)`,
    },
    background: {
      default: `#262528`,
      paper: `rgb(27, 26, 29)`,
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: `#1976d2`,
    },
    secondary: {
      main: `rgba(108,117,125,.5)`,
    },
    text: {
      primary: `#ffffff`,
      secondary: `#6c757d`,
    },
    background: {
      default: `rgb(49, 53, 63)`,
      paper: `#1B2028`,
    },
    action: {
      disabledBackground: `gray`,
      disabled: `white`,
    },
  },
});
