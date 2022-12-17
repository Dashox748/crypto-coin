import {
    createTheme,
    ThemeProvider
} from "@mui/material";


export const darkTheme = createTheme({
    palette: {
        mode: "light",
        text: {
            primary: `#ffffff`,
            secondary: `#6c757d`,
        },
        background: {
            default: `#262528`,
            paper: `rgb(27, 26, 29)`
        }
    },
});

export const lightTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: `#1976d2`,
        },
        text: {
            primary: `#ffffff`,
            secondary: `#6c757d`,
        },
        background: {
            default: `rgb(49, 53, 63)`,
            paper: `#1B2028`
        }
    },
});