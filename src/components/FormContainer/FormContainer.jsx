import React from "react";
import PropTypes from "prop-types";
import { Divider, withStyles } from "@material-ui/core";

const styles = theme => ({
  container: {
    margin: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    border: `thin outset ${theme.palette.divider}`
  },
  header: {
    fontSize: theme.typography.fontSize * 1.5,
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.primary.main,
    margin: theme.spacing(2)
  }
});

function FormControl(props) {
  const { classes, label } = props;

  return (
    <div className={classes.container}>
      <div className={classes.header}>{label}</div>
      <Divider variant="fullWidth" />
      {props.children}
    </div>
  );
}

FormControl.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired
};

export default withStyles(styles)(FormControl);
