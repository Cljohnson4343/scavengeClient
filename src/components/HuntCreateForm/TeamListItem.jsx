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

const styles = theme => ({
  secondary: {
    right: theme.spacing(1)
  }
});

function TeamListItem(props) {
  const { classes, getLabel, handleDeleteItem, name } = props;

  return (
    <ListItem button disableGutters>
      <ListItemAvatar>
        <Avatar>{getLabel(name)}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={name} />
      <ListItemSecondaryAction className={classes.secondary}>
        <DeleteItemButton handleDelete={handleDeleteItem} />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

TeamListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  getLabel: PropTypes.func.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default withStyles(styles)(TeamListItem);
