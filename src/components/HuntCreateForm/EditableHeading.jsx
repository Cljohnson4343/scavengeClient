import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, TextField, Typography, withStyles } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const styles = theme => ({
  button: {
    padding: `0 ${theme.spacing(0.5)}px`,
    minWidth: "0px"
  },
  icon: {
    color: theme.palette.primary.main,
    fontSize: theme.typography.fontSize * 1.2
  }
});

function EditableHeading(props) {
  const { classes, name, validate } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState(name);

  const err = validate(inputText);

  if (isEditing) {
    return (
      <TextField
        id="editable_heading"
        type="text"
        classes={{ root: classes.font }}
        margin="normal"
        onChange={e => setInputText(e.currentTarget.value)}
        value={inputText}
        error={err.inError ? true : null}
        FormHelperTextProps={err.inError ? { error: true } : null}
        helperText={err.msg}
        variant="standard"
      />
    );
  }

  return (
    <Typography>
      {name}
      <Button className={classes.button} onClick={e => setIsEditing(true)}>
        <EditIcon classes={{ root: classes.icon }} />
      </Button>
    </Typography>
  );
}

EditableHeading.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  validate: PropTypes.func.isRequired
};

export default withStyles(styles)(EditableHeading);
