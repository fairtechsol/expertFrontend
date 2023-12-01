import { createTheme, responsiveFontSizes } from "@mui/material/styles";

type PaletteColorOptions = {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
};

type CustomPaletteColorOptions = PaletteColorOptions & {
  cardGradient: string;
  headerGradient: string;
  headerGradientAdmin: string;
  homeBodyGradient: string;
  mainGradient: string;
  font: string;
  shade1: string;
  shade2: string;
  shade3: string;
};

let theme = createTheme({
  palette: {
    primary: {
      main: "#004A25",
      contrastText: "#ffffff",
      cardGradient: `linear-gradient(360deg,#fde3a2 5%,#fde3a2 100% )`,
      headerGradient: `linear-gradient(90deg,#004A25 5%,#FDCB52 100% )`,
      headerGradientAdmin: `linear-gradient(50deg,#004A25 40%,#FDCB52 100% )`,
      homeBodyGradient: `linear-gradient(180deg,#004A25 5%,#1D1D1D 100% )`,
      mainGradient: `linear-gradient(1deg,rgba(0, 74, 37,0.8) 5%, rgba(0,0,0,0.8) 100%)`,
      font: "serif",
      shade1: "#fde3a2",
      shade2: "#fddc8b",
      shade3: "#FDCB52",
      white: "#fff",
    } as CustomPaletteColorOptions,
    secondary: {
      main: "#FDF21A",
      contrastText: "#000",
    },
    error: {
      main: "#fa1e1e",
      light: `linear-gradient(1deg,rgba(0, 74, 37,0.8) 5%, rgba(0,0,0,0.8) 100%)`,
    },
  },
  typography: {
    fontFamily: `Poppins, sans-serif`,
    h5: {
      fontSize: "12px",
      fontWeight: "600",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 1024,
      lg: 1200,
      xl: 1400,
    },
  },
});
theme = responsiveFontSizes(theme);
export default theme;
