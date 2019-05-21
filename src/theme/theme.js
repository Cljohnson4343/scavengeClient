import { createMuiTheme } from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import red from "@material-ui/core/colors/red";

const theme = createMuiTheme({
  palette: {
    background: {
      errorField: red[100],
      field: green[50],
      form: grey[50],
      main: grey[300]
    },
    divider: grey[400],
    primary: {
      light: green[300],
      main: green[500],
      dark: green[700],
      contrastText: blueGrey[50]
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
