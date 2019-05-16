import { Player, Team } from "../../models";

export function addTeam(teamName) {
  return {
    type: "add_team",
    payload: new Team(teamName)
  };
}

export function removeTeam(teamName) {
  return {
    type: "remove_team",
    payload: new Team(teamName)
  };
}

export function changeTeamName(oldName, newName) {
  return {
    type: "change_team_name",
    payload: {
      oldName: oldName,
      newName: newName
    }
  };
}

export function changePlayersTeam(player, team) {
  return {
    type: "change_players_team",
    payload: {
      player: player,
      team: team
    }
  };
}

export function addPlayer(email) {
  return {
    type: "add_player",
    payload: new Player(email)
  };
}

export function removePlayer(email) {
  return {
    type: "remove_player",
    payload: new Player(email)
  };
}

export function updateHuntName(name) {
  return {
    type: "update_hunt_name",
    payload: String(name)
  };
}

export function updateMaxTeams(numTeams) {
  return {
    type: "update_max_teams",
    payload: Number(numTeams)
  };
}

export function updateStart(startDate) {
  return {
    type: "update_start",
    payload: startDate
  };
}

export function updateEnd(endDate) {
  return {
    type: "update_end",
    payload: endDate
  };
}
