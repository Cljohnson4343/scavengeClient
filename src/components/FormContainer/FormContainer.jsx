import React from "react";
import PropTypes from "prop-types";
import { Divider, withStyles } from "@material-ui/core";

const styles = theme => ({
  container: {
    margin: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
    backgroundColor: theme.palette.background.form,
    borderRadius: theme.shape.borderRadius,
    border: `2px solid ${theme.palette.divider}`
  },
  header: {
    color: theme.palette.primary.dark,
    fontSize: theme.typography.fontSize * 1.5,
    fontWeight: theme.typography.fontWeightMedium,
    padding: theme.spacing(2)
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
