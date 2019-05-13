import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  MenuItem,
  Select
} from "@material-ui/core";
import DeleteItemButton from "./DeleteItemButton";
import { Player } from "../../models";

const styles = theme => ({
  secondary: {
    right: theme.spacing(1)
  }
});

function getTeam(teams, teamName) {
  if (!teams) {
    return null;
  }

  let ts = teams.filter(team => team.name === teamName);
  if (ts && ts.length > 0) {
    return ts[0];
  }

  return null;
}

function PlayerListItem(props) {
  const {
    classes,
    handleDeletePlayer,
    handleUpdateTeamPlayers,
    player,
    team,
    teams
  } = props;

  return (
    <ListItem button disableGutters>
      <ListItemText primary={player.email} />
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="team-helper">Team</InputLabel>
        <Select
          onChange={e => {
            if (team) {
              team.removePlayer(player);
              handleUpdateTeamPlayers(team);
            }

            let newTeam = getTeam(teams, e.target.value);
            if (newTeam) {
              newTeam.addPlayer(player);
              handleUpdateTeamPlayers(newTeam);
            }
          }}
          value={team ? team.email : "None"}
          input={<Input name="team" id="team-helper" />}
        >
          <MenuItem value="None" />
          {teams &&
            teams.map(t => (
              <MenuItem key={t.name} value={t.name}>
                {t.name}
              </MenuItem>
            ))}
        </Select>
        <FormHelperText>Select the team for this player</FormHelperText>
      </FormControl>
      <ListItemSecondaryAction className={classes.secondary}>
        <DeleteItemButton handleDelete={handleDeletePlayer} />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

PlayerListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  handleDeletePlayer: PropTypes.func.isRequired,
  handleUpdateTeamPlayers: PropTypes.func.isRequired,
  player: PropTypes.instanceOf(Player).isRequired,
  team: PropTypes.string,
  teams: PropTypes.array
};

export default withStyles(styles)(PlayerListItem);
