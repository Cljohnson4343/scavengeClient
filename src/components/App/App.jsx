import React, { useState } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Router } from "@reach/router";
import AppBar from "../AppBar";
import { withStyles } from "@material-ui/core";
import MuiTheme from "../../theme";
import Login from "../Login";
import HomePage from "../HomePage";
import CreateHunt from "../CreateHunt";
import Location from "../Location";
import grey from "@material-ui/core/colors/grey";

const styles = {
  pageWrapper: {
    backgroundColor: grey[200],
    boxSizing: "border-box",
    height: "100vh",
    width: "100vw"
  }
};

function App(props) {
  const [user, setUser] = useState(null);

  const { classes } = props;

  return (
    <MuiThemeProvider theme={MuiTheme}>
      <Location>
        <div className={classes.pageWrapper}>
          <AppBar user={user} setUser={setUser} />
          <Router>
            <HomePage path="/" />
            <CreateHunt path="/hunts/create" />
            <Login path="/login" setUser={setUser} user={user} />
          </Router>
        </div>
      </Location>
    </MuiThemeProvider>
  );
}

export default withStyles(styles)(App);
