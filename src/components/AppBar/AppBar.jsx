import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { AppBar } from "@material-ui/core";
import { IconButton } from "@material-ui/core";

import UserAvatar from "../UserAvatar";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  avatar: {
    width: "35px",
    height: "35px",
    margin: theme.spacing(1)
  },
  homeIconColor: {
    color: theme.palette.primary.contrastText
  },
  homeIcon: {
    padding: theme.spacing(1)
  }
});

function ScavengeAppBar(props) {
  const { classes } = props;

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
      <UserAvatar className={classes.avatar} />
    </AppBar>
  );
}

ScavengeAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScavengeAppBar);
