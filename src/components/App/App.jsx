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
import { Notifications as NotificationsModel } from "../../models";

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

  const [user, setUser] = useState();
  const [notifications, setNotifications] = useState(new NotificationsModel());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    new User()
      .apiRetrieveCurrentUser()
      .then(response => {
        setUser(new User(response.data));
        setIsLoading(false);
      })
      .catch(err => {
        navigate("/signup");
      });
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

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
          <CreateHunt path="/hunts/create" user={user} />
          <Hunt path="/:username/:huntName" />
          <Notifications
            path="/:username/notifications"
            notifications={notifications}
            setNotifications={setNotifications}
            userID={user ? user.userID : 0}
          />
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
