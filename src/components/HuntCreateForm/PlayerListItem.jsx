import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import {
  FormControl,
  Input,
  InputLabel,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  MenuItem,
  Select
} from "@material-ui/core";
import DeleteItemButton from "./DeleteItemButton";
import * as action from "./actions";

const styles = theme => ({
  secondary: {
    right: theme.spacing(1)
  },
  select: {
    width: `100px`,
    marginRight: theme.spacing(3)
  }
});

function PlayerListItem(props) {
  const { classes, dispatch, email, teamName, teams } = props;

  return (
    <ListItem button disableGutters>
      <ListItemText primary={email} />
      <FormControl className={classes.select}>
        <InputLabel htmlFor="team-helper">Team</InputLabel>
        <Select
          onChange={e => {
            dispatch(action.changePlayersTeam(email, e.target.value));
          }}
          value={teamName ? teamName : ""}
          input={<Input name="team" id="team-helper" />}
        >
          <MenuItem value="" />
          {teams &&
            teams.map(t => (
              <MenuItem key={t.name} value={t.name}>
                {t.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <ListItemSecondaryAction className={classes.secondary}>
        <DeleteItemButton
          handleDelete={e => dispatch(action.removePlayer(email))}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

PlayerListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  teamName: PropTypes.string,
  teams: PropTypes.array
};

export default withStyles(styles)(PlayerListItem);
