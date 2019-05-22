import React from "react";
import PropTypes from "prop-types";
import { TextField, withStyles } from "@material-ui/core";
import classNames from "classnames";

const styles = theme => ({
  field: {
    backgroundColor: theme.palette.background.field,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "300px"
  }
});

function ScavengeInput(props) {
  const {
    classes,
    className,
    id,
    label,
    margin,
    onChange,
    required,
    type,
    value,
    variant,
    ...other
  } = props;

  return (
    <TextField
      id={id}
      label={label}
      type={type ? type : "text"}
      className={classNames(className, classes.field)}
      margin={margin ? margin : "normal"}
      onChange={e => onChange(e.currentTarget.value)}
      value={value}
      variant={variant ? variant : "outlined"}
      required={required}
      {...other}
    />
  );
}

ScavengeInput.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  margin: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.any.isRequired,
  variant: PropTypes.string
};

export default withStyles(styles)(ScavengeInput);
