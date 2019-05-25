import React from "react";
import PropTypes from "prop-types";
import { Typography, withStyles } from "@material-ui/core";
import SectionHeader from "../SectionHeader";
import MailIcon from "@material-ui/icons/Mail";
import Notification from "../Notification";
import { Notifications as NotificationsModel } from "../../models";

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
  const { classes, notifications, setNotifications, userID } = props;

  let renderProps;
  if (notifications.array.length > 0) {
    renderProps = notifications.array.map(n => (
      <Notification
        key={n.notificationID}
        notification={n}
        notifications={notifications}
        setNotifications={setNotifications}
      />
    ));
  } else {
    renderProps = (
      <Typography className={classes.body} color="textSecondary" variant="h5">
        No invitations.
      </Typography>
    );
  }
  return (
    <div className={classes.container}>
      <SectionHeader className={classes.header} Icon={MailIcon}>
        Invitations
      </SectionHeader>
      {renderProps}
    </div>
  );
}

Notifications.propTypes = {
  classes: PropTypes.object.isRequired,
  notifications: PropTypes.instanceOf(NotificationsModel).isRequired,
  setNotifications: PropTypes.func.isRequired,
  userID: PropTypes.number.isRequired
};

export default withStyles(styles)(Notifications);
