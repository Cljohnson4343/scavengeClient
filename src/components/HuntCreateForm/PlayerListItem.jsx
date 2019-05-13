import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import DeleteItemButton from "./DeleteItemButton";

const styles = theme => ({
  secondary: {
    right: theme.spacing(1)
  }
});

function PlayerListItem(props) {
  const { classes, handleDeleteItem, email } = props;

  return (
    <ListItem button disableGutters>
      <ListItemText primary={email} />
      <ListItemSecondaryAction className={classes.secondary}>
        <DeleteItemButton handleDelete={handleDeleteItem} />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

PlayerListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired
};

export default withStyles(styles)(PlayerListItem);
