// theme.js
import { createTheme } from "@mui/material/styles";


export const colorTheme = {
    grey: {
        0: "#FFFFFF",
        10: "#FCFCFC",
        50: "#F0F0F0",
        100: "#E0E0E0",
        200: "#D0D0D0",
        300: "#BEBEBE",
        400: "#ADADAD",
        500: "#9D9D9D",
        600: "#8E8E8E",
        700: "#7B7B7B",
        800: "#6C6C6C",
        900: "#3C3C3C",
        1000: "#000000",
    },
    primary: {
        50: "#FFBFFF",
        100: "#FF8EFF",
        200: "#FF77FF",
        300: "#FF44FF",
        400: "#FF00FF",
        500: "#E800E8",
        600: "#D200D2",
        700: "#AE00AE",
        800: "#930093",
        900: "#5E005E",
    },
    secodary: {
        50: "#BBFFBB",
        100: "#A6FFA6",
        200: "#93FF93",
        300: "#79FF79",
        400: "#53FF53",
        500: "#28FF28",
        600: "#00EC00",
        700: "#00BB00",
        800: "#00A600",
        900: "#007500",
    },
};

export const themeSettings = () => {
    return createTheme({
        palette: {
            primary: {
                dark: "#930093",
                main: "#E800E8",
                medium: "#FF77FF",
                light: "#FF77FF",
            },
            secondary: {
                dark: "#00BB00",
                main: "#28FF28",
                light: "#93FF93",
            },
            neutral: {
                dark: "#3C3C3C",
                main: "#8E8E8E",
                mediumMain: "#9D9D9D",
                medium: "#ADADAD",
                light: "#D0D0D0",
            },
            background: {
                default: "#F0F0F0",
                dark: "#AE00AE",
                medium: "#28FF28",
                main: "#79FF79",
                light: "#BBFFBB",
                alt: "#FFFFFF",
                fresh: "#FAF4FF"
            },

        },
        typography: {
            fontFamily: ["Mukta", "Georgia"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Mukta", "Georgia"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Mukta", "Georgia"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Mukta", "Georgia"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Mukta", "Georgia"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Mukta", "Georgia"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Mukta", "Georgia"].join(","),
                fontSize: 14,
            },
        },
    });
};