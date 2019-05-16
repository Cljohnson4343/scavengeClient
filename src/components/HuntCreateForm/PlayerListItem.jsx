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
import { Player, Team, Teams } from "../../models";

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
  const { classes, dispatch, player, teams } = props;

  return (
    <ListItem button disableGutters>
      <ListItemText primary={player.email} />
      <FormControl className={classes.select}>
        <InputLabel htmlFor="team-helper">Team</InputLabel>
        <Select
          onChange={e => {
            dispatch(action.changePlayersTeam(player, e.target.value));
          }}
          value={player.team}
          renderValue={team => team.name}
          input={<Input name="team" id="team-helper" />}
        >
          <MenuItem value={new Team()}>Unassigned</MenuItem>
          {teams.array.map(t => (
            <MenuItem key={t.name} value={t}>
              {t.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ListItemSecondaryAction className={classes.secondary}>
        <DeleteItemButton
          handleDelete={e => dispatch(action.removePlayer(player.email))}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

PlayerListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  player: PropTypes.instanceOf(Player).isRequired,
  teams: PropTypes.instanceOf(Teams).isRequired
};

export default withStyles(styles)(PlayerListItem);
