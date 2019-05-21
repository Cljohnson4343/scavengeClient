import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import FAB from "@material-ui/core/Fab";

const styles = theme => ({
  fab: {
    position: "fixed",
    bottom: "16px",
    right: "16px"
  }
});

function Fab(props) {
  const { classes, icon, inError } = props;

  return (
    <FAB
      aria-label="Add"
      className={classes.fab}
      color={inError ? "inherit" : "primary"}
      disabled={inError}
    >
      {icon}
    </FAB>
  );
}

Fab.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.node,
  inError: PropTypes.bool
};

export default withStyles(styles)(Fab);
