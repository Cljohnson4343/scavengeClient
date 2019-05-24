import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  withStyles
} from "@material-ui/core";

const styles = theme => ({
  notification: {
    margin: theme.spacing(1)
  }
});

function Notification(props) {
  const { classes } = props;

  return (
    <Card className={classes.notification}>
      <CardContent>
        <Typography>You have been invited to join hunt #.</Typography>
      </CardContent>
      <CardActions />
    </Card>
  );
}

Notification.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Notification);
