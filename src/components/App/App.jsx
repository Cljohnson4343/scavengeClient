import React, { useState, useEffect } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Match, navigate, Router } from "@reach/router";
import { withStyles } from "@material-ui/core";

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
import { Notifications as NotificationsModel } from "../../models";

require("dotenv").config();

const styles = theme => ({
  pageWrapper: {
    backgroundColor: theme.palette.background.main,
    boxSizing: "border-box",
    width: "100vw",
    minHeight: "100vh"
  }
});

const ThemedApp = withStyles(styles)(function(props) {
  const { classes } = props;

  const [user, setUser] = useState();
  const [notifications, setNotifications] = useState(new NotificationsModel());

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
        <Match path="/hunts/:creator/:huntName">
          {props => (
            <AppBar
              user={user}
              setUser={setUser}
              notifications={notifications}
              setNotifications={setNotifications}
              {...props}
            />
          )}
        </Match>
        <Router>
          <Home path="/" user={user} />
          <CreateHunt path="/hunts/create" user={user} />
          <Hunt path="/hunts/:creator/:huntName" user={user} />
          <Notifications
            path="/:username/notifications"
            notifications={notifications}
            setNotifications={setNotifications}
          />
          <SignIn path="/signin" setUser={setUser} isLoggedIn={Boolean(user)} />
          <SignUp path="/signup" setUser={setUser} isLoggedIn={Boolean(user)} />
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
