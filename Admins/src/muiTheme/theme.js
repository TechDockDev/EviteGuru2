import { createTheme } from "@mui/material";

const theme = createTheme({
  breakpoints: {
    keys: ["xs","mxs", "sm", "md", "xxmd", "xmd", "lg", "xlg", "xl"],
    values: {
      xs: 0,
      mxs:450,
      sm: 600,
      md: 900,
      xxmd: 1000,
      xmd: 1100,
      lg: 1200,
      xlg: 1300,
      xl: 1440,
    },
  },

  palette: {
    mode: "light",
    common: {
      black: "#000000",
      white: "#ffffff",
    },
    primary: {
      main: "#795DA8",
      contrastText: "#000",
    },
    secondary: {
      main: "#fff",
      contrastText: "#000",
    },
    text: {
      primary: "#000",
      secondary: "#795DA8",
    },
    divider: "#795DA8",
    background: {
      paper: "#CEC5DC",
      // default: "#",
    },
  },
  typography: {
    fontFamily: ["Montserrat", "Comforter Brush", "Abhaya Libre"].join(","),
    fontSize: 14,
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        variant: "outlined",
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "12px",
          transition: "all 0.3s",
          fontWeight: "700",
          borderRadius: "5px",
        },
      },
    },
  },
  //  ==============
});
export default theme;
