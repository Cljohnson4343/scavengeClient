import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import FAB from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const styles = {
  fab: {
    position: "fixed",
    bottom: "16px",
    right: "16px"
  }
};

function Fab(props) {
  const { classes } = props;

  return (
    <FAB color="primary" aria-label="Add" className={classes.fab}>
      <AddIcon />
    </FAB>
  );
}

Fab.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Fab);
