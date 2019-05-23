import React from "react";
import PropTypes from "prop-types";
import { Divider, Typography, withStyles } from "@material-ui/core";
import NotificationBar from "../NotificationBar";

const styles = theme => ({
  body: {
    alignSelf: "center",
    margin: theme.spacing(3)
  },
  container: {
    display: "flex",
    flexDirection: "column"
  }
});

function Notifications(props) {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <NotificationBar />
      <Divider variant="middle" />
      <Typography className={classes.body} color="textSecondary" variant="h5">
        No invitations.
      </Typography>
    </div>
  );
}

Notifications.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Notifications);
