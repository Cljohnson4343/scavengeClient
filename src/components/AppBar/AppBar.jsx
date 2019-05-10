import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
import { AppBar } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";

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
    margin: theme.spacing.unit
  },
  homeIconColor: {
    color: theme.palette.primary.contrastText
  },
  homeIcon: {
    padding: theme.spacing.unit
  }
});

function ScavengeAppBar(props) {
  const { classes } = props;

  return (
    <AppBar className={classes.root} position="static">
      <IconButton
        className={classes.homeIcon}
        aria-label="Home"
        color="primary"
        classes={{ colorPrimary: classes.homeIconColor }}
      >
        <LocationSearchingIcon fontSize="large" />
      </IconButton>
      <UserAvatar className={classes.avatar} />
    </AppBar>
  );
}

ScavengeAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withTheme()(withStyles(styles)(ScavengeAppBar));