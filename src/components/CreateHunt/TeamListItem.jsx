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
import { Team } from "../../models";

const styles = theme => ({
  secondary: {
    right: theme.spacing(1)
  }
});

function TeamListItem(props) {
  const { avatarColor, classes, dispatch, label, team, validateName } = props;

  return (
    <ListItem disableGutters>
      <ListItemAvatar>
        <Avatar style={{ backgroundColor: avatarColor }}>{label}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <EditableHeading
            dispatch={dispatch}
            createAction={action.changeTeamName.bind(null, team.teamName)}
            name={team.teamName}
            validate={validateName}
          />
        }
      />
      <ListItemSecondaryAction className={classes.secondary}>
        <DeleteItemButton
          handleDelete={() => dispatch(action.removeTeam(team))}
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
  team: PropTypes.instanceOf(Team).isRequired,
  validateName: PropTypes.func.isRequired
};

export default withStyles(styles)(TeamListItem);
