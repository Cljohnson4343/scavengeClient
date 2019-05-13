import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, List, TextField, withStyles } from "@material-ui/core";
import classNames from "classnames";
import FormExpansion from "./FormExpansion";
import PlayerListItem from "./PlayerListItem";
import { Team } from "../../models";
import { Player } from "../../models";

const styles = theme => ({
  container: {
    display: "flex",
    justifyContent: "space-between"
  },
  list: {
    width: `100%`,
    maxWidth: `400px`
  },
  root: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  textField: {
    marginTop: `0px`,
    paddingTop: `0px`,
    paddingBottom: `0px`,
    width: 220
  }
});

function getTeam(teams, player) {
  if (!teams) {
    return null;
  }
  let ts = teams.filter(team => team.hasPlayer(player));

  if (ts && ts.length > 0) {
    return ts[0];
  }

  return null;
}

function PlayersContainer(props) {
  const { classes, players, setPlayers, setTeams, teams } = props;

  const [inputEmail, setInputEmail] = useState("");

  return (
    <FormExpansion label="Players">
      <List dense={true} className={classes.list}>
        {players.map(player => (
          <PlayerListItem
            player={player}
            key={player.email}
            handleDeletePlayer={() => {
              setPlayers(players.filter(plr => plr.equals(player)));
            }}
            handleUpdateTeamPlayers={updatedTeam => {
              let ts = teams.filter(team => team.equals(updatedTeam));
              setTeams(ts.concat(updatedTeam));
            }}
            teams={teams}
            team={getTeam(teams, player)}
          />
        ))}
        <div className={classes.container}>
          <TextField
            id="email"
            label="Email"
            type="email"
            className={classNames(classes.textField, classes.root)}
            margin="normal"
            onChange={e => setInputEmail(e.currentTarget.value)}
            value={inputEmail}
            required={true}
          />
          <Button
            size="small"
            color="primary"
            onClick={() => {
              setPlayers(players.concat(new Player(inputEmail)));
              setInputEmail("");
            }}
            disabled={inputEmail.length < 1 ? true : false}
          >
            Add
          </Button>
        </div>
      </List>
    </FormExpansion>
  );
}

PlayersContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  players: PropTypes.array,
  setPlayers: PropTypes.func.isRequired,
  setTeams: PropTypes.func.isRequired,
  teams: PropTypes.array,
  team: PropTypes.instanceOf(Team)
};

export default withStyles(styles)(PlayersContainer);
