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

const styles = theme => ({
  actionContainer: {
    display: "flex",
    flexDirection: "row-reverse"
  },
  button: {
    fontWeight: theme.typography.fontWeightRegular
  },
  join: {
    color: theme.palette.primary.main
  },
  notification: {
    margin: theme.spacing(1)
  }
});

function Notification(props) {
  const { classes, notification, notifications, setNotifications } = props;

  return (
    <Card className={classes.notification}>
      <CardContent>
        <Typography>You have been invited to join hunt #.</Typography>
      </CardContent>
      <CardActions className={classes.actionContainer}>
        <Button className={classNames(classes.button, classes.join)}>
          JOIN
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
