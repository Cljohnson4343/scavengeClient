import React from "react";
import PropTypes from "prop-types";
import { Button, withStyles } from "@material-ui/core";
import { AppBar } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { User } from "../../models";
import NotificationIcon from "@material-ui/icons/Notifications";
import { navigate } from "@reach/router";

const styles = theme => ({
  avatar: {
    width: "35px",
    height: "35px",
    margin: theme.spacing(1)
  },
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

function ScavengeAppBar(props) {
  const { classes, setUser, user } = props;

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
      <TextButton
        key="out"
        onClick={e => {
          user
            .apiLogout()
            .then(response => {
              setUser(null);
              navigate("/");
            })
            .catch(e => console.log(e));
        }}
      >
        Sign Out
      </TextButton>,
      <Button className={classes.button} key="icon">
        <NotificationIcon fontSize="large" />
      </Button>
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
        className={classes.homeIcon}
        aria-label="Home"
        color="primary"
        classes={{ colorPrimary: classes.homeIconColor }}
      >
        Scavenge
      </IconButton>
      <div className={classes.buttonWrap}>{renderProps}</div>
    </AppBar>
  );
}

ScavengeAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  setUser: PropTypes.func,
  user: PropTypes.instanceOf(User)
};

export default withStyles(styles)(ScavengeAppBar);
