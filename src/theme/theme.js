import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import red from "@material-ui/core/colors/red";
import lime from "@material-ui/core/colors/lime";

const theme = createMuiTheme({
  barHeight: "48px",
  input: {
    width: "300px"
  },
  palette: {
    background: {
      errorField: red[100],
      field: green[50],
      form: grey[50],
      main: grey[200]
    },
    divider: grey[400],
    link: blue[500],
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
    fontSize: 12,
    fontWeightLight: 200,
    fontWeightMedium: 300,
    fontWeightRegular: 400
  },
  shape: {
    borderRadius: 6
  }
});

export default theme;
