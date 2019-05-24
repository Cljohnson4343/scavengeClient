import React from "react";
import PropTypes from "prop-types";
import { Badge, IconButton, withStyles } from "@material-ui/core";
import NotificationIcon from "@material-ui/icons/Notifications";
import { navigate } from "@reach/router";

const styles = theme => ({
  badge: {
    color: theme.palette.primary.main,
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.fontWeightLight * 3,
    right: "6px",
    top: "6px"
  },
  button: {
    color: theme.palette.primary.contrastText,
    fontSize: theme.typography.fontSize * 0.85,
    margin: `${theme.spacing(1.5)}px ${theme.spacing(0.4)}px`,
    minWidth: "42px",
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`
  }
});

function NotificationButton(props) {
  const { classes, notifications, username } = props;

  return (
    <IconButton
      className={classes.button}
      key="icon"
      onClick={e => navigate(`/${username}/notifications`)}
    >
      <Badge
        badgeContent={notifications.length}
        classes={{ badge: classes.badge }}
        color="secondary"
      >
        <NotificationIcon fontSize="large" />
      </Badge>
    </IconButton>
  );
}

NotificationButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NotificationButton);
