import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import FAB from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
  fab: {
    position: "fixed",
    bottom: "16px",
    right: "16px"
  }
});

function Fab(props) {
  const { classes, inError } = props;

  return (
    <FAB
      aria-label="Add"
      className={classes.fab}
      color={inError ? "inherit" : "primary"}
      disabled={inError}
    >
      <AddIcon />
    </FAB>
  );
}

Fab.propTypes = {
  classes: PropTypes.object.isRequired,
  inError: PropTypes.bool
};

export default withStyles(styles)(Fab);
