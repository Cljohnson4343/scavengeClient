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
  const { classes, createAction, dispatch, name, validate } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState(name);

  const err = validate(inputText, name);

  if (isEditing) {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          dispatch(createAction(inputText));
          setIsEditing(false);
        }}
      >
        <TextField
          autoFocus={true}
          classes={{ root: classes.font }}
          error={err.inError ? true : null}
          FormHelperTextProps={err.inError ? { error: true } : null}
          helperText={err.msg}
          id="editable_heading"
          margin="normal"
          onBlur={e => {
            dispatch(createAction(name, inputText));
            setIsEditing(false);
          }}
          onChange={e => setInputText(e.currentTarget.value)}
          type="text"
          value={inputText}
          variant="standard"
        />
      </form>
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
  createAction: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  validate: PropTypes.func.isRequired
};

export default withStyles(styles)(EditableHeading);
