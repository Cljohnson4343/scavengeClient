import React from "react";
import PropTypes from "prop-types";
import { TextField, withStyles } from "@material-ui/core";
import { ScavengeError } from "../../utils";

const styles = theme => ({
  field: {
    marginLeft: theme.spacing(1),
    marginTop: `0px`,
    paddingBottom: theme.spacing(1),
    marginRight: theme.spacing(2)
  },
  font: {
    fontWeight: theme.typography.fontWeightLight
  }
});

function InputField(props) {
  const {
    classes,
    error = new ScavengeError(),
    id,
    label,
    onChange,
    required,
    type,
    value,
    ...restProps
  } = props;

  return (
    <TextField
      id={id ? id : label}
      label={label}
      type={type ? type : "text"}
      classes={{ root: classes.font }}
      className={classes.field}
      error={error.inError ? true : false}
      FormHelperTextProps={error.inError ? { error: true } : null}
      helperText={error.msg}
      margin="normal"
      onChange={e => onChange(e)}
      value={value}
      required={required}
      {...restProps}
    />
  );
}

InputField.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.instanceOf(ScavengeError),
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default withStyles(styles)(InputField);
