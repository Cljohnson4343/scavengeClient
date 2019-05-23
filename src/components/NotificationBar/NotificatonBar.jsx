import React from "react";
import PropTypes from "prop-types";
import { Typography, withStyles } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";

const styles = theme => ({
  container: {
    display: "flex",
    alignItems: "center"
  },
  header: {
    margin: `0 ${theme.spacing(1)}px`
  },
  icon: {
    margin: `${theme.spacing(2)}px 0 ${theme.spacing(2)}px ${theme.spacing(
      2
    )}px`
  }
});

function NotificationBar(props) {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <MailIcon className={classes.icon} color="primary" fontSize="small" />
      <Typography className={classes.header} color="primary">
        Invitations
      </Typography>
    </div>
  );
}

NotificationBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NotificationBar);
