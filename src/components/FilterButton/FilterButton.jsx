import React from "react";
import PropTypes from "prop-types";
import { Button, withStyles } from "@material-ui/core";

const styles = theme => ({
  root: {
    borderColor: theme.palette.primary.main,
    minWidth: "26px",
    height: "26px",
    padding: "unset"
  },
  font: {
    color: theme.palette.primary.main
  }
});

function HuntsAddFilterButton(props) {
  const { children, classes, ...other } = props;

  return (
    <Button variant="outlined" className={classes.root} {...other}>
      {React.cloneElement(children, { classes: { root: classes.font } })}
    </Button>
  );
}

HuntsAddFilterButton.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
};

export default withStyles(styles)(HuntsAddFilterButton);
