import { createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: green[300],
      main: green[500],
      dark: green[700],
      contrastText: green[50]
    }
  },
  typography: {
    useNextVariants: true,
    fontSize: 10,
    fontWeightLight: 100,
    fontWeightMedium: 200,
    fontWeightRegular: 300
  },
  shape: {
    borderRadius: 6
  }
});

export default theme;
