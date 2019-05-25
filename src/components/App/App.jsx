import React, { useState, useEffect } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Router } from "@reach/router";
import { withStyles } from "@material-ui/core";
import { navigate } from "@reach/router";

import AppBar from "../AppBar";
import CreateHunt from "../CreateHunt";
import Home from "../Home";
import Hunt from "../Hunt";
import Location from "../Location";
import MuiTheme from "../../theme";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import { User } from "../../models";
import Footer from "../Footer";
import Notifications from "../Notifications";

const styles = theme => ({
  pageWrapper: {
    backgroundColor: theme.palette.background.main,
    boxSizing: "border-box",
    height: "100vh",
    width: "100vw"
  }
});

const ThemedApp = withStyles(styles)(function(props) {
  const { classes } = props;

  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    new User()
      .apiRetrieveCurrentUser()
      .then(response => {
        setUser(new User(response.data));
      })
      .catch(err => {
        navigate("/signup");
      });
  }, []);

  return (
    <Location>
      <div className={classes.pageWrapper}>
        <AppBar
          user={user}
          setUser={setUser}
          notifications={notifications}
          setNotifications={setNotifications}
        />
        <Router>
          <Home path="/" user={user} />
          <CreateHunt path="/hunts/create" />
          <Hunt path="/:username/:huntName" />
          <Notifications path="/:username/notifications" />
          <SignIn path="/signin" setUser={setUser} user={user} />
          <SignUp path="/signup" setUser={setUser} user={user} />
        </Router>
        <Footer user={user} setUser={setUser} />
      </div>
    </Location>
  );
});

export default function App(props) {
  return (
    <MuiThemeProvider theme={MuiTheme}>
      <ThemedApp />
    </MuiThemeProvider>
  );
}
