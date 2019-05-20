import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import AppBar from "../AppBar";
import { withStyles } from "@material-ui/core";
import MuiTheme from "../../theme";
import LoginPage from "../LoginPage";
import Location from "../Location";
import { grey } from "@material-ui/core/colors";

const styles = {
  pageWrapper: {
    backgroundColor: grey[200],
    boxSizing: "border-box",
    height: "100vh",
    width: "100vw"
  }
};

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={MuiTheme}>
        <Location>
          <div className={classes.pageWrapper}>
            <AppBar />
            <LoginPage />
          </div>
        </Location>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
