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
  const { classes, handleDeleteItem, name } = props;

  return (
    <ListItem button disableGutters>
      <ListItemAvatar>
        <Avatar>A</Avatar>
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
  handleDeleteItem: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default withStyles(styles)(TeamListItem);
