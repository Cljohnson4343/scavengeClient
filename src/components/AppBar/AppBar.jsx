import React from "react";
import PropTypes from "prop-types";
import { Button, withStyles } from "@material-ui/core";
import { AppBar } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { User } from "../../models";
import NotificationIcon from "@material-ui/icons/Notifications";

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
        variant="outlined"
      >
        {props.children}
      </Button>
    );
  }

  const isLoggedIn = true;
  let renderProps;

  if (isLoggedIn) {
    renderProps = [
      <TextButton>Sign Out</TextButton>,
      <Button className={classes.button}>
        <NotificationIcon fontSize="large" />
      </Button>
    ];
  } else {
    renderProps = [
      <TextButton key="up">Sign Up</TextButton>,
      <TextButton key="in">Sign In</TextButton>
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
