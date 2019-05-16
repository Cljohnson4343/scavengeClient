import React from "react";
import PropTypes from "prop-types";
import { Button, withStyles } from "@material-ui/core";

const styles = theme => ({
  add: {
    fontWeight: "bold"
  }
});

function TextAddButton(props) {
  const { classes, handleClick, isDisabled = false } = props;

  return (
    <Button
      size="small"
      color="primary"
      className={classes.add}
      onClick={() => handleClick()}
      disabled={isDisabled}
    >
      Add
    </Button>
  );
}

TextAddButton.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool
};

export default withStyles(styles)(TextAddButton);
