import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import DeleteItemButton from "./DeleteItemButton";
import * as action from "./actions";

const styles = theme => ({
  secondary: {
    right: theme.spacing(1)
  }
});

function TeamListItem(props) {
  const { classes, dispatch, label, name } = props;

  return (
    <ListItem button disableGutters>
      <ListItemAvatar>
        <Avatar>{label}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={name} />
      <ListItemSecondaryAction className={classes.secondary}>
        <DeleteItemButton
          handleDelete={() => dispatch(action.removeTeam(name))}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

TeamListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default withStyles(styles)(TeamListItem);
