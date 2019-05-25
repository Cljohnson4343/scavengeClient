import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  withStyles
} from "@material-ui/core";
import classNames from "classnames";
import {
  Notification as NotificationModel,
  Notifications as NotificationsModel
} from "../../models";
import InfoIcon from "@material-ui/icons/Info";

const styles = theme => ({
  actionContainer: {
    display: "flex",
    flexDirection: "row-reverse"
  },
  button: {
    fontWeight: theme.typography.fontWeightRegular
  },
  container: {
    display: "flex",
    justifyItems: "center",
    alignItems: "center"
  },
  icon: {
    margin: `0 ${theme.spacing(0.5)}px`
  },
  join: {
    color: theme.palette.primary.main
  },
  msg: {
    justifySelf: "center",
    alignSelf: "center"
  },
  notification: {
    margin: theme.spacing(1)
  }
});

function Notification(props) {
  const { classes, notification, notifications, setNotifications } = props;

  return (
    <Card className={classes.notification}>
      <CardContent className={classes.container}>
        <Typography className={classes.msg}>
          {notification.inviterUsername} has invited you to join hunt{" "}
          {notification.huntName}
          <InfoIcon fontSize="small" color="primary" />.
        </Typography>
      </CardContent>
      <CardActions className={classes.actionContainer}>
        <Button className={classNames(classes.button, classes.join)}>
          ACCEPT
        </Button>
        <Button
          className={classNames(classes.button, classes.devline)}
          onClick={e => {
            notification
              .apiDeleteNotification()
              .then(response => {
                setNotifications(notifications.remove(notification));
              })
              .catch(err => {});
          }}
        >
          DECLINE
        </Button>
      </CardActions>
    </Card>
  );
}

Notification.propTypes = {
  classes: PropTypes.object.isRequired,
  notification: PropTypes.instanceOf(NotificationModel).isRequired,
  notifications: PropTypes.instanceOf(NotificationsModel).isRequired,
  setNotifications: PropTypes.func.isRequired
};

export default withStyles(styles)(Notification);
