import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import DeleteItemButton from "./DeleteItemButton";
import * as action from "./actions";
import EditableHeading from "./EditableHeading";

const styles = theme => ({
  secondary: {
    right: theme.spacing(1)
  }
});

function TeamListItem(props) {
  const { avatarColor, classes, dispatch, label, name, validateName } = props;

  return (
    <ListItem disableGutters>
      <ListItemAvatar>
        <Avatar style={{ backgroundColor: avatarColor }}>{label}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <EditableHeading
            dispatch={dispatch}
            createAction={action.updateTeam}
            name={name}
            validate={validateName}
          />
        }
      />
      <ListItemSecondaryAction className={classes.secondary}>
        <DeleteItemButton
          handleDelete={() => dispatch(action.removeTeam(name))}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

TeamListItem.propTypes = {
  avatarColor: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  validateName: PropTypes.func.isRequired
};

export default withStyles(styles)(TeamListItem);
