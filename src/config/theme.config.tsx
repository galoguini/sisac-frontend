import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";

type ThemeProps = {
    children: JSX.Element
};

enum themePalette {
    BG = '#053545',
    CRUNCHY = '#f47521',
    FONT_GLOBAL = 'Roboto',
    // alertas (fijate si lo usas)
    // FONT_COLOR = "#000000",
    // BG_ALERT = "#ffffff",
    // ERROR_MAIN = "#f44336",
    // BG_ERROR_MAIN = "rgba(244,67,54,0.1)"
}

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: themePalette.BG,
        },
        primary: {
            main: themePalette.CRUNCHY,
        },
    },

    typography: {
        fontFamily: themePalette.FONT_GLOBAL,
    },

    components: {
        MuiButton: {
            defaultProps: {
                style: {
                    boxShadow: 'none',
                    borderRadius: '0.5em',
                    textTransform: 'none',
                },
            },
        },
        MuiAlert: {
            defaultProps: {
                variant: "filled",
                // style: {
                //     borderRadius: "0.8em",
                //     fontSize: "1em"
                // },
            },
            // styleOverrides: {
            //     root: {
            //         backgroundColor: themePalette.BG_ALERT,
            //         color: themePalette.FONT_COLOR,
            //         border: `5px solid ${themePalette.ERROR_MAIN}`,
            //     }
            // }
            // styleOverrides: {
            //     standardError: {
            //         border: "1px solid ${themePalette.ERROR_MAIN}",
            //         background: themePalette.BG_ERROR_MAIN,
            //     },
            // },
        },
    },
});

export const ThemeConfig: React.FC<ThemeProps> = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}