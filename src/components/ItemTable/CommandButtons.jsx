import React from "react";
import { IconButton, withStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import classNames from "classnames";

export const styles = theme => ({
  button: {
    padding: `${theme.spacing(0.25)}px ${theme.spacing(0.6)}px`
  },
  label: {
    color: theme.palette.primary.main
  }
});

export const GenButton = withStyles(styles)(
  ({ children, classes, onExecute, ...restProps }) => (
    <IconButton
      className={classNames(classes.label, classes.button)}
      size="small"
      onClick={onExecute}
      {...restProps}
    >
      {children}
    </IconButton>
  )
);

export const AddButton = withStyles(styles)(({ classes, onExecute }) => (
  <GenButton onExecute={onExecute} title="Add row">
    <AddIcon classes={{ root: classes.label }} />
  </GenButton>
));

export const CancelButton = withStyles(styles)(({ classes, onExecute }) => (
  <GenButton onExecute={onExecute} title="Cancel changes">
    <CancelIcon classes={{ root: classes.label }} />
  </GenButton>
));

export const CommitButton = withStyles(styles)(({ classes, onExecute }) => (
  <GenButton onExecute={onExecute} title="Save changes">
    <SaveIcon classes={{ root: classes.label }} />
  </GenButton>
));

export const DeleteButton = withStyles(styles)(({ classes, onExecute }) => (
  <GenButton
    onExecute={() => {
      if (window.confirm("Are you sure you want to delete this row?")) {
        onExecute();
      }
    }}
    title="Delete row"
  >
    <DeleteIcon classes={{ root: classes.label }} />
  </GenButton>
));

export const EditButton = withStyles(styles)(({ classes, onExecute }) => (
  <GenButton onExecute={onExecute} title="Edit row">
    <EditIcon classes={{ root: classes.label }} />
  </GenButton>
));
