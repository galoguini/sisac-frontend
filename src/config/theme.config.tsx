import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";

type ThemeProps = {
    children: JSX.Element
};

enum themePalette {
    BG = '#053545',
    LIME = '#C8FA5F',
    FONT_GLOBAL = 'Roboto',
}

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: themePalette.BG,
        },
        primary: {
            main: themePalette.LIME,
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