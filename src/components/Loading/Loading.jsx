import React from "react";
import PropTypes from "prop-types";
import { CircularProgress, withStyles } from "@material-ui/core";

const styles = theme => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  },
  root: {}
});

function Loading(props) {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <CircularProgress
        className={classes.root}
        color="primary"
        variant="indeterminate"
      />
    </div>
  );
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loading);
