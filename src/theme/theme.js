import { createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import red from "@material-ui/core/colors/red";
import lime from "@material-ui/core/colors/lime";

const theme = createMuiTheme({
  palette: {
    background: {
      errorField: red[100],
      field: green[50],
      form: grey[50],
      main: grey[200]
    },
    divider: grey[400],
    primary: {
      background: green[50],
      light: green[300],
      main: green[500],
      dark: green[700],
      contrastText: "#fafafa"
    },
    secondary: {
      light: lime[300],
      main: lime[500],
      dark: lime[700],
      contrastText: "#fafafa"
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
