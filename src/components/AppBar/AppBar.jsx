import React from "react";
import PropTypes from "prop-types";
import { AppBar, Button, IconButton, withStyles } from "@material-ui/core";
import { Notifications, User } from "../../models";
import NotificationsButton from "../NotificationButton";
import { navigate } from "@reach/router";
import ExploreIcon from "@material-ui/icons/Explore";

const styles = theme => ({
  border: {
    border: `1px solid ${theme.palette.primary.contrastText}`
  },
  button: {
    color: theme.palette.primary.contrastText,
    fontSize: theme.typography.fontSize * 0.85,
    margin: `${theme.spacing(1.5)}px ${theme.spacing(0.4)}px`,
    minWidth: "42px",
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`
  },
  buttonWrap: {
    marginRight: theme.spacing(1)
  },
  homeIconColor: {
    color: theme.palette.primary.contrastText
  },
  homeIcon: {
    padding: theme.spacing(1)
  },
  root: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    maxHeight: "48px"
  },
  title: {
    alignSelf: "center"
  }
});

function ScavengeAppBar(props) {
  const { classes, match, notifications, setNotifications, user } = props;

  const title = match
    ? `${match.creator}/${match.huntName}`
    : user
    ? user.username
    : null;

  function TextButton(props) {
    return (
      <Button
        className={classes.button}
        classes={{ outlined: classes.border }}
        onClick={props.onClick}
        variant="outlined"
      >
        {props.children}
      </Button>
    );
  }

  const isLoggedIn = Boolean(user);

  let renderProps;
  if (isLoggedIn) {
    renderProps = [
      <NotificationsButton
        key="notification-button"
        notifications={notifications}
        setNotifications={setNotifications}
        username={user.username}
        userID={user.userID}
      />
    ];
  } else {
    renderProps = [
      <TextButton key="up" onClick={e => navigate("/signup")}>
        Sign Up
      </TextButton>,
      <TextButton key="in" onClick={e => navigate("/signin")}>
        Sign In
      </TextButton>
    ];
  }

  return (
    <AppBar className={classes.root} position="static" elevation={3}>
      <IconButton
        aria-label="Home"
        classes={{ colorPrimary: classes.homeIconColor }}
        className={classes.homeIcon}
        color="primary"
        onClick={e => navigate("/")}
      >
        <ExploreIcon fontSize="large" />
      </IconButton>
      <div className={classes.title}>{title}</div>
      <div className={classes.buttonWrap}>{renderProps}</div>
    </AppBar>
  );
}

ScavengeAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  notifications: PropTypes.instanceOf(Notifications).isRequired,
  setNotifications: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(User)
};

export default withStyles(styles)(ScavengeAppBar);
