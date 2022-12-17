import { createTheme } from "@mui/material/styles";

export const formTheme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
        },
        input: {
          background: "#1B2028",
          outline: "none",
          border: "none",
          borderRadius: "5px",
          height: "20px",
          width: "400px",
          color: "white",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "#6c757d",
        },
      },
    },
  },
});
