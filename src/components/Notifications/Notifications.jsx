import React from "react";
import PropTypes from "prop-types";
import { Typography, withStyles } from "@material-ui/core";
import SectionHeader from "../SectionHeader";
import MailIcon from "@material-ui/icons/Mail";
import Notification from "../Notification";

const styles = theme => ({
  body: {
    alignSelf: "center",
    margin: theme.spacing(3)
  },
  container: {
    display: "flex",
    flexDirection: "column"
  },
  header: {
    marginBottom: theme.spacing(1)
  }
});

function Notifications(props) {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <SectionHeader className={classes.header} Icon={MailIcon}>
        Invitations
      </SectionHeader>
      <Notification />
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
