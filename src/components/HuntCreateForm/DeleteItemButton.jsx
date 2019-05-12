import React from "react";
import PropTypes from "prop-types";
import { Button, withStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = {
  button: {
    padding: `0px`,
    minWidth: `0px`
  }
};

function DeleteItemButton(props) {
  const { classes, handleDelete } = props;

  return (
    <Button className={classes.button} onClick={e => handleDelete()}>
      <DeleteIcon color="action" />
    </Button>
  );
}

DeleteItemButton.propTypes = {
  classes: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default withStyles(styles)(DeleteItemButton);
